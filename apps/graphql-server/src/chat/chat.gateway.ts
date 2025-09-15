import { Logger, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwtGuard } from 'src/auth/guards/ws-jwt.guard';
import { ChatCacheService } from 'src/chat/chat-cache.service';
import { MessageService } from 'src/message/messages.service';
import { RedisExtendedService } from 'src/redis/redis-extended.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  namespace: '/chat',
})
@UseGuards(WsJwtGuard)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private activeUsers = new Map<string, Set<string>>(); // userId -> socketIds
  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private messageService: MessageService,
    private redisService: RedisExtendedService,
    private chatCache: ChatCacheService,
    private readonly jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.chatCache.cleanupOrphanSockets();
  }

  afterInit() {
    // middleware exécuté au handshake
    this.server.use((socket: Socket, next) => {
      try {
        const handshake = (socket as any).handshake || {};
        const raw =
          handshake.auth?.token ||
          handshake.headers?.authorization ||
          handshake.query?.token;
        if (!raw) return next(new Error('Missing token'));
        const token =
          typeof raw === 'string' && raw.startsWith('Bearer ')
            ? raw.slice(7)
            : raw;
        const payload = this.jwtService.verify(token); // throw si invalide
        socket.data.user = payload; // ATTACHE l'user avant handleConnection
        return next();
      } catch (err) {
        this.logger.error('WebSocket authentication error:', err);
        return next(new Error('Unauthorized'));
      }
    });
  }

  async handleConnection(client: Socket) {
    try {
      const userId = client.data.user?.sub;
      const userName = client.data.user?.name;

      if (!userId) {
        client.disconnect();
        return;
      }

      // Enregistrer la connexion dans le cache
      await this.chatCache.setUserOnline(userId, client.id);

      // Récupérer les salles précédentes de l'utilisateur
      const previousRooms = await this.chatCache.getUserRooms(userId);

      for (const roomId of previousRooms) {
        client.join(roomId);
        // Notifier les autres utilisateurs de la room
        client.to(roomId).emit('userReconnected', {
          userId,
          userName,
          timestamp: new Date().toISOString(),
        });
      }

      // Envoyer les utilisateurs en ligne au client connecté
      const onlineUsers = await this.chatCache.getOnlineUsers();
      client.emit('onlineUsers', onlineUsers);

      // Notifier globalement qu'un utilisateur est en ligne
      this.server.emit('userOnline', {
        userId,
        userName,
        timestamp: new Date().toISOString(),
      });

      this.logger.log(
        `User ${userId} (${userName}) connected with socket ${client.id}`,
      );
    } catch (error) {
      this.logger.error('Connection error:', error);
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const userId = client.data.user?.sub;
      const userName = client.data.user?.name;

      if (!userId) return;

      // Retirer de toutes les rooms
      const userRooms = await this.chatCache.getUserRooms(userId);
      for (const roomId of userRooms) {
        client.to(roomId).emit('userDisconnected', {
          userId,
          userName,
          timestamp: new Date().toISOString(),
        });
        await this.chatCache.removeUserFromRoom(userId, roomId);
      }

      // Marquer comme offline
      await this.chatCache.setUserOffline(userId, client.id);

      // Vérifier si l'utilisateur est toujours en ligne (autres connexions)
      const isStillOnline = await this.chatCache.isUserOnline(userId);

      if (!isStillOnline) {
        this.server.emit('userOffline', {
          userId,
          userName,
          timestamp: new Date().toISOString(),
        });
      }

      this.logger.log(`User ${userId} (${userName}) disconnected`);
    } catch (error) {
      this.logger.error('Disconnect error:', error);
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId?: string; rideId?: string },
  ) {
    try {
      const userId = client.data.user?.sub;
      const userName = client.data.user.name;

      // Vérifier le rate limit
      const rateLimitResult =
        await this.chatCache.checkRoomJoinRateLimit(userId);

      if (!rateLimitResult.allowed) {
        client.emit('error', {
          type: 'RATE_LIMIT',
          message: 'Too many room joins. Please wait.',
          retryAfter: 60,
        });
        return;
      }

      const roomName = data.conversationId
        ? `conversation_${data.conversationId}`
        : `ride_${data.rideId}`;

      // Rejoindre la room
      client.join(roomName);
      await this.chatCache.addUserToRoom(userId, roomName);

      // Charger les messages récents depuis le cache
      const type = data.conversationId ? 'conversation' : 'ride';
      const roomId = data.conversationId || data.rideId;
      const recentMessages = await this.chatCache.getRecentMessages(
        roomId,
        type,
        20,
      );

      console.log('recentMessages :>> ', recentMessages);

      // Envoyer les messages récents au client
      client.emit('recentMessages', recentMessages);

      // Obtenir les utilisateurs de la room
      const roomUsers = await this.chatCache.getRoomUsers(roomName);
      client.emit('roomUsers', roomUsers);

      // Obtenir les utilisateurs en train de taper
      const typingUsers = await this.chatCache.getTypingUsers(roomName);
      if (typingUsers.length > 0) {
        client.emit('currentlyTyping', typingUsers);
      }

      // Notifier les autres de la room
      client.to(roomName).emit('userJoinedRoom', {
        userId,
        userName,
        timestamp: new Date().toISOString(),
      });

      // Mettre à jour l'activité de la room
      await this.chatCache.setLastActivity(roomId, type);

      this.logger.log(`User ${userId} joined room: ${roomName}`);
    } catch (error) {
      this.logger.error('Join room error:', error);
      client.emit('error', {
        type: 'JOIN_ROOM_ERROR',
        message: 'Failed to join room',
      });
    }
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId?: string; rideId?: string },
  ) {
    try {
      const userId = client.data.user?.sub;
      const userName = client.data.user.name;

      const roomName = data.conversationId
        ? `conversation_${data.conversationId}`
        : `ride_${data.rideId}`;

      // Quitter la room
      client.leave(roomName);
      await this.chatCache.removeUserFromRoom(userId, roomName);

      // Arrêter l'indicateur de typing si actif
      await this.chatCache.setUserTyping(userId, roomName, false);

      // Notifier les autres de la room
      client.to(roomName).emit('userLeftRoom', {
        userId,
        userName,
        timestamp: new Date().toISOString(),
      });

      this.logger.log(`User ${userId} left room: ${roomName}`);
    } catch (error) {
      this.logger.error('Leave room error:', error);
    }
  }

  @SubscribeMessage('typing')
  async handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      conversationId?: string;
      rideId?: string;
      isTyping: boolean;
    },
  ) {
    try {
      const userId = client.data.user?.sub;
      const userName = client.data.user.username;

      const roomName = data.conversationId
        ? `conversation_${data.conversationId}`
        : `ride_${data.rideId}`;

      // Mettre à jour l'état de typing dans le cache
      await this.chatCache.setUserTyping(userId, roomName, data.isTyping);

      // Notifier les autres utilisateurs de la room
      client.to(roomName).emit('userTyping', {
        userId,
        userName,
        isTyping: data.isTyping,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error('Typing error:', error);
    }
  }

  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      messageId: string;
      conversationId?: string;
      rideId?: string;
    },
  ) {
    try {
      const userId = client.data.user?.sub;

      // Utiliser un lock distribué pour éviter les conflits
      const lockKey = `read_${data.messageId}_${userId}`;
      const lock = await this.redisService.acquireLock(lockKey, 5);

      if (!lock) {
        return; // Déjà en cours de traitement
      }

      try {
        // Marquer comme lu dans la DB et le cache
        await this.messageService.markAsRead(data.messageId, userId);

        // Mettre à jour le timestamp de dernière lecture
        const identifier = data.conversationId || data.rideId;
        const lastReadKey = `user:${userId}:lastRead:${identifier}`;
        await this.redisService.set(lastReadKey, new Date().toISOString());

        // Notifier dans la room
        const roomName = data.conversationId
          ? `conversation_${data.conversationId}`
          : `ride_${data.rideId}`;

        this.server.to(roomName).emit('messageRead', {
          messageId: data.messageId,
          userId,
          readAt: new Date().toISOString(),
        });
      } finally {
        await this.redisService.releaseLock(lockKey, lock);
      }
    } catch (error) {
      this.logger.error('Mark as read error:', error);
    }
  }

  @SubscribeMessage('getOnlineUsers')
  async handleGetOnlineUsers(@ConnectedSocket() client: Socket) {
    try {
      const onlineUsers = await this.chatCache.getOnlineUsers();
      client.emit('onlineUsers', onlineUsers);
    } catch (error) {
      this.logger.error('Get online users error:', error);
    }
  }

  @SubscribeMessage('getUserPresence')
  async handleGetUserPresence(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userId: string },
  ) {
    try {
      const presence = await this.chatCache.getUserPresence(data.userId);
      client.emit('userPresence', { userId: data.userId, presence });
    } catch (error) {
      this.logger.error('Get user presence error:', error);
    }
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket) {
    client.emit('pong', { timestamp: new Date().toISOString() });
  }

  // === MÉTHODES PUBLIQUES POUR LES SERVICES ===

  async notifyNewMessage(roomName: string, message: any) {
    try {
      // Mettre le message en cache
      await this.chatCache.cacheMessage({
        id: message.id,
        content: message.content,
        senderId: message.senderId,
        timestamp: message.createdAt,
        conversationId: message.conversationId,
        rideId: message.rideId,
      });

      // Incrémenter le compteur de messages
      const type = message.conversationId ? 'conversation' : 'ride';
      const roomId = message.conversationId || message.rideId;
      await this.chatCache.incrementMessageCount(roomId, type);

      // Notifier tous les clients de la room
      this.server.to(roomName).emit('newMessage', {
        message,
        type: 'NEW_MESSAGE',
        timestamp: new Date().toISOString(),
      });

      this.logger.log(`Message sent to room ${roomName}`);
    } catch (error) {
      this.logger.error('Notify new message error:', error);
    }
  }

  async notifyMessageUpdate(roomName: string, message: any) {
    try {
      // Mettre à jour le cache
      await this.chatCache.cacheMessage({
        id: message.id,
        content: message.content,
        senderId: message.senderId,
        timestamp: message.createdAt,
        conversationId: message.conversationId,
        rideId: message.rideId,
      });

      // Notifier la mise à jour
      this.server.to(roomName).emit('messageUpdated', {
        message,
        type: 'MESSAGE_UPDATED',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error('Notify message update error:', error);
    }
  }

  async notifyMessageDelete(
    roomName: string,
    messageId: string,
    conversationId?: string,
    rideId?: string,
  ) {
    try {
      // Supprimer du cache
      const type = conversationId ? 'conversation' : 'ride';
      const roomId = conversationId || rideId;
      await this.chatCache.deleteMessageFromCache(messageId, roomId, type);

      // Notifier la suppression
      this.server.to(roomName).emit('messageDeleted', {
        messageId,
        type: 'MESSAGE_DELETED',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error('Notify message delete error:', error);
    }
  }

  // === MÉTHODES UTILITAIRES ===

  async getRoomStats(roomName: string): Promise<{
    userCount: number;
    typingCount: number;
    messageCount: number;
    lastActivity: string | null;
  }> {
    try {
      const roomUsers = await this.chatCache.getRoomUsers(roomName);
      const typingUsers = await this.chatCache.getTypingUsers(roomName);

      // Extraire le type et l'ID de la room depuis le nom
      const [type, roomId] = roomName.split('_');
      const messageCount = await this.chatCache.getMessageCount(
        roomId,
        type as 'conversation' | 'ride',
      );
      const lastActivity = await this.chatCache.getLastActivity(
        roomId,
        type as 'conversation' | 'ride',
      );

      return {
        userCount: roomUsers.length,
        typingCount: typingUsers.length,
        messageCount,
        lastActivity,
      };
    } catch (error) {
      this.logger.error('Get room stats error:', error);
      return {
        userCount: 0,
        typingCount: 0,
        messageCount: 0,
        lastActivity: null,
      };
    }
  }

  async broadcastSystemMessage(
    roomName: string,
    message: string,
    type: 'info' | 'warning' | 'error' = 'info',
  ) {
    this.server.to(roomName).emit('systemMessage', {
      message,
      type,
      timestamp: new Date().toISOString(),
    });
  }

  async kickUserFromRoom(userId: string, roomName: string, reason?: string) {
    try {
      const userSockets = await this.redisService.smembers(
        `user:${userId}:sockets`,
      );

      for (const socketId of userSockets) {
        const socket = this.server.sockets.sockets.get(socketId);
        if (socket) {
          socket.leave(roomName);
          socket.emit('kickedFromRoom', {
            roomName,
            reason: reason || 'You have been removed from this room',
            timestamp: new Date().toISOString(),
          });
        }
      }

      await this.chatCache.removeUserFromRoom(userId, roomName);

      this.server.to(roomName).emit('userKicked', {
        userId,
        reason,
        timestamp: new Date().toISOString(),
      });

      this.logger.log(`User ${userId} kicked from room ${roomName}: ${reason}`);
    } catch (error) {
      this.logger.error('Kick user error:', error);
    }
  }

  // Health check pour Socket.IO
  async healthCheck(): Promise<{
    connected: number;
    rooms: number;
    redis: any;
  }> {
    try {
      const redisHealth = await this.redisService.healthCheck();

      return {
        connected: this.server.sockets.sockets.size,
        rooms: this.server.sockets.adapter.rooms.size,
        redis: redisHealth,
      };
    } catch (error) {
      this.logger.error('Health check error:', error);
      return {
        connected: 0,
        rooms: 0,
        redis: { publisher: false, subscriber: false, cache: false },
      };
    }
  }
}
