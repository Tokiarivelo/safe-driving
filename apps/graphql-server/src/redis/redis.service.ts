import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private pubSub: RedisPubSub;
  private publisher: Redis;
  private subscriber: Redis;

  constructor(private config: ConfigService) {
    const redisOptions = {
      host: this.config.get<string>('REDIS_HOST', 'redis'),
      port: +this.config.get<number>('REDIS_PORT', 6379),
      password: this.config.get<string>('REDIS_PASSWORD') || undefined,
      // tls: { ... } si besoin
    };

    this.publisher = new Redis(redisOptions);
    this.subscriber = new Redis(redisOptions);

    this.pubSub = new RedisPubSub({
      publisher: this.publisher,
      subscriber: this.subscriber,
    });
  }

  async onModuleInit() {
    // Événements de connexion pour débugger
    this.publisher.on('connect', () => {
      Logger.log('Redis Publisher connected');
    });

    this.subscriber.on('connect', () => {
      Logger.log('Redis Subscriber connected');
    });

    this.publisher.on('error', (err) => {
      Logger.error('Redis Publisher error:', err);
    });

    this.subscriber.on('error', (err) => {
      Logger.error('Redis Subscriber error:', err);
    });
  }

  getPubSub(): RedisPubSub {
    return this.pubSub;
  }

  getPublisher(): Redis {
    return this.publisher;
  }

  getSubscriber(): Redis {
    return this.subscriber;
  }

  // Méthodes utilitaires pour le cache
  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.publisher.setex(key, ttl, value);
    } else {
      await this.publisher.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.publisher.get(key);
  }

  async del(key: string): Promise<number> {
    return await this.publisher.del(key);
  }

  async exists(key: string): Promise<number> {
    return await this.publisher.exists(key);
  }

  // Méthodes pour les sets (utilisateurs en ligne, etc.)
  async sadd(key: string, ...members: string[]): Promise<number> {
    return await this.publisher.sadd(key, ...members);
  }

  async srem(key: string, ...members: string[]): Promise<number> {
    return await this.publisher.srem(key, ...members);
  }

  async smembers(key: string): Promise<string[]> {
    return await this.publisher.smembers(key);
  }

  async sismember(key: string, member: string): Promise<number> {
    return await this.publisher.sismember(key, member);
  }

  // Méthodes pour les hashs (métadonnées utilisateur, etc.)
  async hset(key: string, field: string, value: string): Promise<number> {
    return await this.publisher.hset(key, field, value);
  }

  async hget(key: string, field: string): Promise<string | null> {
    return await this.publisher.hget(key, field);
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    return await this.publisher.hgetall(key);
  }

  async hdel(key: string, ...fields: string[]): Promise<number> {
    return await this.publisher.hdel(key, ...fields);
  }

  async onModuleDestroy() {
    try {
      await Promise.all([
        await this.pubSub
          .close()
          .catch((e) => Logger.error('Error closing PubSub', e)),
        await this.publisher.quit().catch(() => this.publisher.disconnect()),
        await this.subscriber.quit().catch(() => this.subscriber.disconnect()),
      ]);
    } catch (e) {
      // ignore, shutting down
      console.error('Error during Redis shutdown', e);
    }
  }
}
