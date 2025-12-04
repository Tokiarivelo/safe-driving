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
import { NotificationService } from './notification.service';
import { RedisExtendedService } from 'src/redis/redis-extended.service';
import { Notification } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  namespace: '/notifications',
})
@UseGuards(WsJwtGuard)
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationGateway.name);

  constructor(
    private readonly notificationService: NotificationService,
    private readonly redisService: RedisExtendedService,
    private readonly jwtService: JwtService,
  ) {}

  afterInit() {
    // Middleware for authentication during handshake
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
        const payload = this.jwtService.verify(token);
        socket.data.user = payload;
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

      if (!userId) {
        client.disconnect();
        return;
      }

      // Join user's personal notification room
      const roomName = `user_notifications_${userId}`;
      client.join(roomName);

      // Store socket connection in Redis
      await this.redisService.sadd(`user:${userId}:notificationSockets`, client.id);

      // Get unread count and send to client
      const unreadCount = await this.notificationService.getUnreadCount(userId);
      client.emit('unreadCount', { count: unreadCount });

      this.logger.log(
        `User ${userId} connected to notifications with socket ${client.id}`,
      );
    } catch (error) {
      this.logger.error('Connection error:', error);
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const userId = client.data.user?.sub;

      if (!userId) return;

      // Leave notification room
      const roomName = `user_notifications_${userId}`;
      client.leave(roomName);

      // Remove socket from Redis
      await this.redisService.srem(
        `user:${userId}:notificationSockets`,
        client.id,
      );

      this.logger.log(`User ${userId} disconnected from notifications`);
    } catch (error) {
      this.logger.error('Disconnect error:', error);
    }
  }

  @SubscribeMessage('getUnreadCount')
  async handleGetUnreadCount(@ConnectedSocket() client: Socket) {
    try {
      const userId = client.data.user?.sub;
      const count = await this.notificationService.getUnreadCount(userId);
      client.emit('unreadCount', { count });
    } catch (error) {
      this.logger.error('Get unread count error:', error);
    }
  }

  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { notificationId: string },
  ) {
    try {
      const userId = client.data.user?.sub;
      const result = await this.notificationService.markAsRead(
        data.notificationId,
        userId,
      );

      if (result.success) {
        // Broadcast to all user's sockets
        this.server
          .to(`user_notifications_${userId}`)
          .emit('notificationRead', {
            notificationId: data.notificationId,
            notification: result.notification,
          });

        // Update unread count
        const unreadCount =
          await this.notificationService.getUnreadCount(userId);
        this.server
          .to(`user_notifications_${userId}`)
          .emit('unreadCount', { count: unreadCount });
      }
    } catch (error) {
      this.logger.error('Mark as read error:', error);
    }
  }

  @SubscribeMessage('markAllAsRead')
  async handleMarkAllAsRead(@ConnectedSocket() client: Socket) {
    try {
      const userId = client.data.user?.sub;
      const result = await this.notificationService.markAllAsRead(userId);

      if (result.success) {
        // Broadcast to all user's sockets
        this.server
          .to(`user_notifications_${userId}`)
          .emit('allNotificationsRead', { count: result.count });

        // Update unread count
        this.server
          .to(`user_notifications_${userId}`)
          .emit('unreadCount', { count: 0 });
      }
    } catch (error) {
      this.logger.error('Mark all as read error:', error);
    }
  }

  // === Public methods for other services to send notifications ===

  /**
   * Send a notification to a specific user via Socket.IO
   */
  async sendNotification(userId: string, notification: Notification) {
    try {
      this.server.to(`user_notifications_${userId}`).emit('newNotification', {
        notification,
        timestamp: new Date().toISOString(),
      });

      // Update unread count
      const unreadCount = await this.notificationService.getUnreadCount(userId);
      this.server
        .to(`user_notifications_${userId}`)
        .emit('unreadCount', { count: unreadCount });

      this.logger.log(`Notification sent to user ${userId}`);
    } catch (error) {
      this.logger.error('Send notification error:', error);
    }
  }

  /**
   * Broadcast notification update (read, archived, deleted)
   */
  async broadcastNotificationUpdate(
    userId: string,
    eventType: string,
    notification: Notification,
  ) {
    try {
      this.server
        .to(`user_notifications_${userId}`)
        .emit('notificationUpdate', {
          type: eventType,
          notification,
          timestamp: new Date().toISOString(),
        });
    } catch (error) {
      this.logger.error('Broadcast notification update error:', error);
    }
  }
}
