import { Injectable } from '@nestjs/common';
import { RedisExtendedService } from 'src/redis/redis-extended.service';

interface UserPresence {
  status: 'online' | 'offline' | 'away';
  lastSeen: string;
  currentRoom?: string;
}

interface MessageCache {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  conversationId?: string;
  rideId?: string;
}

@Injectable()
export class ChatCacheService {
  constructor(private redis: RedisExtendedService) {}

  // === GESTION DE LA PRESENCE ===

  async setUserOnline(userId: string, socketId: string): Promise<void> {
    const userKey = `presence:${userId}`;
    const socketKey = `socket:${socketId}`;

    await this.redis.pipeline([
      [
        'hset',
        userKey,
        'status',
        'online',
        'lastSeen',
        new Date().toISOString(),
      ],
      ['sadd', 'online_users', userId],
      ['set', socketKey, userId, 'EX', 3600], // TTL 1 heure
      ['sadd', `user:${userId}:sockets`, socketId],
    ]);
  }

  async setUserOffline(userId: string, socketId: string): Promise<void> {
    const userKey = `presence:${userId}`;
    const socketKey = `socket:${socketId}`;

    // Retirer ce socket de l'utilisateur
    await this.redis.srem(`user:${userId}:sockets`, socketId);
    await this.redis.del(socketKey);

    // Vérifier s'il reste des sockets pour cet utilisateur
    const remainingSockets = await this.redis.scard(`user:${userId}:sockets`);

    if (remainingSockets === 0) {
      await this.redis.pipeline([
        [
          'hset',
          userKey,
          'status',
          'offline',
          'lastSeen',
          new Date().toISOString(),
        ],
        ['srem', 'online_users', userId],
        ['del', `user:${userId}:sockets`],
      ]);
    }
  }

  async getUserPresence(userId: string): Promise<UserPresence | null> {
    const presence = await this.redis.hgetall(`presence:${userId}`);
    return Object.keys(presence).length > 0
      ? (presence as unknown as UserPresence)
      : null;
  }

  async getOnlineUsers(): Promise<string[]> {
    return await this.redis.smembers('online_users');
  }

  async isUserOnline(userId: string): Promise<boolean> {
    return (await this.redis.sismember('online_users', userId)) === 1;
  }

  // === GESTION DES ROOMS ===

  async addUserToRoom(userId: string, roomId: string): Promise<void> {
    const roomKey = `room:${roomId}:users`;
    const userRoomsKey = `user:${userId}:rooms`;

    await this.redis.pipeline([
      ['sadd', roomKey, userId],
      ['sadd', userRoomsKey, roomId],
      ['hset', `presence:${userId}`, 'currentRoom', roomId],
    ]);
  }

  async removeUserFromRoom(userId: string, roomId: string): Promise<void> {
    const roomKey = `room:${roomId}:users`;
    const userRoomsKey = `user:${userId}:rooms`;

    await this.redis.pipeline([
      ['srem', roomKey, userId],
      ['srem', userRoomsKey, roomId],
      ['hdel', `presence:${userId}`, 'currentRoom'],
    ]);
  }

  async getRoomUsers(roomId: string): Promise<string[]> {
    return await this.redis.smembers(`room:${roomId}:users`);
  }

  async getUserRooms(userId: string): Promise<string[]> {
    return await this.redis.smembers(`user:${userId}:rooms`);
  }

  // === GESTION DU TYPING ===

  async setUserTyping(
    userId: string,
    roomId: string,
    isTyping: boolean,
  ): Promise<void> {
    const typingKey = `typing:${roomId}`;

    if (isTyping) {
      await this.redis.pipeline([
        ['hset', typingKey, userId, new Date().toISOString()],
        ['expire', typingKey, 10], // TTL 10 secondes
      ]);
    } else {
      await this.redis.hdel(typingKey, userId);
    }
  }

  async getTypingUsers(
    roomId: string,
  ): Promise<Array<{ userId: string; since: string }>> {
    const typing = await this.redis.hgetall(`typing:${roomId}`);
    return Object.entries(typing).map(([userId, since]) => ({ userId, since }));
  }

  // === CACHE DES MESSAGES ===

  async cacheMessage(message: MessageCache): Promise<void> {
    const messageKey = `message:${message.id}`;
    const roomKey = message.conversationId
      ? `conversation:${message.conversationId}:messages`
      : `ride:${message.rideId}:messages`;

    const result = await this.redis.pipeline([
      ['JSON.SET', messageKey, '.', JSON.stringify(message)], // JSON.SET avec chemin '.'
      ['expire', messageKey, '3600'], // TTL séparé avec EXPIRE
      ['zadd', roomKey, Date.now(), message.id], // Sorted set avec timestamp
    ]);
  }

  async getRecentMessages(
    roomId: string,
    type: 'conversation' | 'ride',
    limit = 50,
  ): Promise<MessageCache[]> {
    const roomKey = `${type}:${roomId}:messages`;
    const messageIds = await this.redis.zrevrange(roomKey, 0, limit - 1);

    if (messageIds.length === 0) return [];

    const pipeline: [string, ...any[]][] = messageIds.map((id) => [
      'JSON.GET',
      `message:${id}`,
    ]);
    const messages = await this.redis.pipeline(pipeline);

    return messages.filter((msg) => msg !== null) as MessageCache[];
  }

  async deleteMessageFromCache(
    messageId: string,
    roomId: string,
    type: 'conversation' | 'ride',
  ): Promise<void> {
    const messageKey = `message:${messageId}`;
    const roomKey = `${type}:${roomId}:messages`;

    await this.redis.pipeline([
      ['del', messageKey],
      ['zrem', roomKey, messageId],
    ]);
  }

  // === STATISTIQUES ===

  async incrementMessageCount(
    roomId: string,
    type: 'conversation' | 'ride',
  ): Promise<number> {
    const countKey = `${type}:${roomId}:message_count`;
    return await this.redis.cache.incr(countKey);
  }

  async getMessageCount(
    roomId: string,
    type: 'conversation' | 'ride',
  ): Promise<number> {
    const countKey = `${type}:${roomId}:message_count`;
    const count = await this.redis.get(countKey);
    return count ? parseInt(count) : 0;
  }

  async setLastActivity(
    roomId: string,
    type: 'conversation' | 'ride',
  ): Promise<void> {
    const activityKey = `${type}:${roomId}:last_activity`;
    await this.redis.set(activityKey, new Date().toISOString(), 86400); // TTL 24h
  }

  async getLastActivity(
    roomId: string,
    type: 'conversation' | 'ride',
  ): Promise<string | null> {
    const activityKey = `${type}:${roomId}:last_activity`;
    return await this.redis.get(activityKey);
  }

  // === RATE LIMITING ===

  async checkMessageRateLimit(
    userId: string,
  ): Promise<{ allowed: boolean; remaining: number }> {
    const key = `rate_limit:message:${userId}`;
    return await this.redis.rateLimit(key, 60, 60); // 60 messages par minute
  }

  async checkRoomJoinRateLimit(
    userId: string,
  ): Promise<{ allowed: boolean; remaining: number }> {
    const key = `rate_limit:join:${userId}`;
    return await this.redis.rateLimit(key, 10, 60); // 10 joins par minute
  }

  // === NETTOYAGE ===

  async cleanupExpiredData(): Promise<void> {
    // Nettoyer les indicateurs de typing expirés
    const typingPattern = 'typing:*';
    const typingKeys = await this.redis.keys(typingPattern);

    for (const key of typingKeys) {
      const ttl = await this.redis.ttl(key);
      if (ttl === -1) {
        // Pas de TTL défini
        await this.redis.expire(key, 10);
      }
    }

    // Nettoyer les anciennes données de présence
    const presenceKeys = await this.redis.keys('presence:*');
    for (const key of presenceKeys) {
      const presence = await this.redis.hgetall(key);
      if (presence.status === 'offline') {
        const lastSeen = new Date(presence.lastSeen);
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        if (lastSeen < dayAgo) {
          await this.redis.del(key);
        }
      }
    }
  }
}
