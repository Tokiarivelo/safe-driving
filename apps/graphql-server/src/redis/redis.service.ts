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

  /**
   * SCAN all keys by pattern safely (avoids blocking like KEYS).
   * count: hint for batch size per cursor iteration.
   */
  async scanKeys(pattern: string, count = 500): Promise<string[]> {
    let cursor = '0';
    const keys: string[] = [];

    do {
      const [nextCursor, batch] = await this.publisher.scan(cursor, 'MATCH', pattern, 'COUNT', count);
      cursor = nextCursor;
      if (batch && batch.length) keys.push(...batch);
    } while (cursor !== '0');

    return keys;
  }

  /**
   * Fetch hash values for many keys using a pipeline.
   * Returns a map of key -> hash (empty object if not a hash or missing).
   */
  async mHGetAll(keys: string[]): Promise<Record<string, Record<string, string>>> {
    const result: Record<string, Record<string, string>> = {};
    if (!keys.length) return result;

    const pipeline = this.publisher.pipeline();
    keys.forEach((k) => pipeline.hgetall(k));
    const replies = await pipeline.exec();

    keys.forEach((k, i) => {
      const [, value] = replies[i] ?? [];
      result[k] = (value && typeof value === 'object') ? value as Record<string, string> : {};
    });

    return result;
  }

  /**
   * Fetch string values for many keys using MGET, returning a map key -> value|null.
   */
  async mGet(keys: string[]): Promise<Record<string, string | null>> {
    const map: Record<string, string | null> = {};
    if (!keys.length) return map;

    const values = await this.publisher.mget(...keys);
    keys.forEach((k, i) => { map[k] = values[i]; });
    return map;
  }

  /**
   * Helper to get driver entities by pattern.
   * - Tries HGETALL per key (hash storage)
   * - If empty, falls back to GET and JSON.parse if possible
   */
  async getEntitiesByPattern(pattern: string): Promise<Array<{ key: string; value: unknown }>> {
    const keys = await this.scanKeys(pattern);
    if (!keys.length) return [];

    const hashes = await this.mHGetAll(keys);
    const notHashes = keys.filter((k) => {
      const h = hashes[k];
      return !h || Object.keys(h).length === 0;
    });

    const stringValues = await this.mGet(notHashes);

    return keys.map((k) => {
      const hash = hashes[k];
      if (hash && Object.keys(hash).length > 0) {
        return { key: k, value: hash };
      }
      const str = stringValues[k];
      if (str != null) {
        try {
          return { key: k, value: JSON.parse(str) };
        } catch {
          return { key: k, value: str };
        }
      }
      return { key: k, value: null };
    });
  }

  async subscribe(channel: string, handler: (message: string) => void) {
    this.subscriber.subscribe(channel);
    this.subscriber.on('message', (ch, message) => {
      if (ch === channel) handler(message);
    });
  }

  async publish(channel: string, data: any) {
    return this.publisher.publish(channel, JSON.stringify(data));
  }

}
