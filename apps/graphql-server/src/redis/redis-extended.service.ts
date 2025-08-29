import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { RedisConfigService } from './config/redis-config.service';

@Injectable()
export class RedisExtendedService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisExtendedService.name);
  private pubSub: RedisPubSub;
  private publisher: Redis;
  private subscriber: Redis;
  cache: Redis; // Instance séparée pour le cache

  constructor(private configService: RedisConfigService) {}

  async onModuleInit() {
    const config = this.configService.getSingleNodeConfig();

    // Instance pour publisher
    this.publisher = new Redis(config);
    // Instance pour subscriber
    this.subscriber = new Redis(config);
    // Instance pour cache
    this.cache = new Redis(config);

    this.setupEventListeners();

    this.pubSub = new RedisPubSub({
      publisher: this.publisher,
      subscriber: this.subscriber,
    });

    this.logger.log('Redis connections initialized');
  }

  private setupEventListeners() {
    // Publisher events
    this.publisher.on('connect', () => this.logger.log('Publisher connected'));
    this.publisher.on('ready', () => this.logger.log('Publisher ready'));
    this.publisher.on('error', (err) =>
      this.logger.error('Publisher error:', err),
    );
    this.publisher.on('close', () =>
      this.logger.warn('Publisher connection closed'),
    );

    // Subscriber events
    this.subscriber.on('connect', () =>
      this.logger.log('Subscriber connected'),
    );
    this.subscriber.on('ready', () => this.logger.log('Subscriber ready'));
    this.subscriber.on('error', (err) =>
      this.logger.error('Subscriber error:', err),
    );
    this.subscriber.on('close', () =>
      this.logger.warn('Subscriber connection closed'),
    );

    // Cache events
    this.cache.on('connect', () => this.logger.log('Cache connected'));
    this.cache.on('ready', () => this.logger.log('Cache ready'));
    this.cache.on('error', (err) => this.logger.error('Cache error:', err));
    this.cache.on('close', () => this.logger.warn('Cache connection closed'));
  }

  // Getters
  getPubSub(): RedisPubSub {
    return this.pubSub;
  }
  getPublisher(): Redis {
    return this.publisher;
  }
  getSubscriber(): Redis {
    return this.subscriber;
  }
  getCache(): Redis {
    return this.cache;
  }

  // === OPERATIONS DE BASE ===

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.cache.setex(key, ttl, value);
    } else {
      await this.cache.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.cache.get(key);
  }

  async del(...keys: string[]): Promise<number> {
    return await this.cache.del(...keys);
  }

  async exists(...keys: string[]): Promise<number> {
    return await this.cache.exists(...keys);
  }

  async expire(key: string, seconds: number): Promise<number> {
    return await this.cache.expire(key, seconds);
  }

  async ttl(key: string): Promise<number> {
    return await this.cache.ttl(key);
  }

  // === OPERATIONS SUR LES SETS ===

  async sadd(key: string, ...members: string[]): Promise<number> {
    return await this.cache.sadd(key, ...members);
  }

  async srem(key: string, ...members: string[]): Promise<number> {
    return await this.cache.srem(key, ...members);
  }

  async smembers(key: string): Promise<string[]> {
    return await this.cache.smembers(key);
  }

  async sismember(key: string, member: string): Promise<number> {
    return await this.cache.sismember(key, member);
  }

  async scard(key: string): Promise<number> {
    return await this.cache.scard(key);
  }

  async spop(key: string, count?: number): Promise<string | string[]> {
    return await this.cache.spop(key, count);
  }

  async srandmember(key: string, count?: number): Promise<string | string[]> {
    return await this.cache.srandmember(key, count);
  }

  // ----- SCAN (non bloquant) -----
  // parcourt toute la keyspace et retourne les clés correspondant au pattern
  async scanKeys(pattern: string): Promise<string[]> {
    const stream = this.cache.scanStream({ match: pattern, count: 100 });
    const keys: string[] = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (resultKeys: string[]) => {
        for (const k of resultKeys) keys.push(k);
      });
      stream.on('end', () => resolve(keys));
      stream.on('error', (err) => reject(err));
    });
  }
  // === OPERATIONS SUR LES HASH ===

  async hset(key: string, field: string, value: string): Promise<number>;
  async hset(key: string, object: Record<string, string>): Promise<number>;
  async hset(key: string, ...args: any[]): Promise<number> {
    return await this.cache.hset(key, ...args);
  }

  async hget(key: string, field: string): Promise<string | null> {
    return await this.cache.hget(key, field);
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    return await this.cache.hgetall(key);
  }

  async hdel(key: string, ...fields: string[]): Promise<number> {
    return await this.cache.hdel(key, ...fields);
  }

  async hexists(key: string, field: string): Promise<number> {
    return await this.cache.hexists(key, field);
  }

  async hkeys(key: string): Promise<string[]> {
    return await this.cache.hkeys(key);
  }

  async hvals(key: string): Promise<string[]> {
    return await this.cache.hvals(key);
  }

  async hlen(key: string): Promise<number> {
    return await this.cache.hlen(key);
  }

  async hincrby(
    key: string,
    field: string,
    increment: number,
  ): Promise<number> {
    return await this.cache.hincrby(key, field, increment);
  }

  // === OPERATIONS SUR LES LISTES ===

  async lpush(key: string, ...elements: string[]): Promise<number> {
    return await this.cache.lpush(key, ...elements);
  }

  async rpush(key: string, ...elements: string[]): Promise<number> {
    return await this.cache.rpush(key, ...elements);
  }

  async lpop(key: string): Promise<string | null> {
    return await this.cache.lpop(key);
  }

  async rpop(key: string): Promise<string | null> {
    return await this.cache.rpop(key);
  }

  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    return await this.cache.lrange(key, start, stop);
  }

  async llen(key: string): Promise<number> {
    return await this.cache.llen(key);
  }

  async ltrim(key: string, start: number, stop: number): Promise<string> {
    return await this.cache.ltrim(key, start, stop);
  }

  // === OPERATIONS SUR LES SORTED SETS ===

  async zadd(key: string, score: number, member: string): Promise<number>;
  async zadd(key: string, ...args: (number | string)[]): Promise<number>;
  async zadd(key: string, ...args: any[]): Promise<number> {
    return await this.cache.zadd(key, ...args);
  }

  async zrem(key: string, ...members: string[]): Promise<number> {
    return await this.cache.zrem(key, ...members);
  }

  async zrange(
    key: string,
    start: number,
    stop: number,
    withScores?: 'WITHSCORES',
  ): Promise<string[]> {
    return await this.cache.zrange(key, start, stop, withScores);
  }

  async zrevrange(
    key: string,
    start: number,
    stop: number,
    withScores?: 'WITHSCORES',
  ): Promise<string[]> {
    return await this.cache.zrevrange(key, start, stop, withScores);
  }

  async zcard(key: string): Promise<number> {
    return await this.cache.zcard(key);
  }

  async zscore(key: string, member: string): Promise<string | null> {
    return await this.cache.zscore(key, member);
  }

  async zrank(key: string, member: string): Promise<number | null> {
    return await this.cache.zrank(key, member);
  }

  async zrevrank(key: string, member: string): Promise<number | null> {
    return await this.cache.zrevrank(key, member);
  }

  // === TRANSACTIONS ===

  async multi(commands: Array<[string, ...any[]]>): Promise<any[]> {
    const pipeline = this.cache.multi();
    commands.forEach(([command, ...args]) => {
      (pipeline as any)[command](...args);
    });
    const results = await pipeline.exec();
    return results.map(([err, result]) => {
      if (err) throw err;
      return result;
    });
  }

  // === PIPELINE ===
  async pipeline(commands: Array<[string, ...any[]]>): Promise<any[]> {
    if (!commands || commands.length === 0) return [];

    // Normalisation : s'assurer qu'on renvoie *toujours* un tableau d'items-array
    const normalized: Array<[string, ...any[]]> = commands.flatMap(
      ([cmd, ...args]) => {
        if (!cmd || typeof cmd !== 'string') {
          throw new Error(
            'Invalid pipeline command, expected string command as first element',
          );
        }

        const lc = cmd.toLowerCase();

        // Support historique 'setJSON' -> transform to JSON.SET + optional EXPIRE
        if (lc === 'setjson') {
          // args expected: [key, value, ttl?]
          const key = args[0];
          const value = args[1];
          const ttl = args[2]; // seconds (optional)

          if (typeof key !== 'string') {
            throw new Error('setJSON requires key as first arg');
          }

          // JSON.SET key . jsonString
          const jsonCmd: [string, ...any[]] = [
            'JSON.SET',
            key,
            '.',
            typeof value === 'string' ? value : JSON.stringify(value),
          ];

          if (ttl) {
            const expireCmd: [string, ...any[]] = ['EXPIRE', key, String(ttl)];
            return [jsonCmd, expireCmd];
          } else {
            return [jsonCmd];
          }
        }

        // Normal path: keep command as-is (return inner array)
        return [[cmd, ...args] as [string, ...any[]]];
      },
    );

    // Détecter si on a des commandes JSON.SET (module) dans le batch
    const hasJsonModuleCmd = normalized.some(
      ([cmd]) => typeof cmd === 'string' && cmd.toLowerCase() === 'json.set',
    );

    // Si on a pas de JSON.SET, on peut utiliser le pipeline array optimisé de ioredis
    if (!hasJsonModuleCmd) {
      const pipeline = this.cache.pipeline(normalized); // utilise la forme tableau
      const results = await pipeline.exec();
      return results.map(([err, result]) => {
        if (err) throw err;
        return result;
      });
    }

    // Sinon (il y a au moins JSON.SET), utilisons pipeline + call() — robuste pour les modules
    const p = this.cache.pipeline();
    for (const [cmd, ...args] of normalized) {
      // Utiliser call avec la casse CLI (JSON.SET) évite les erreurs d'apply sur méthodes non exposées
      // On envoie exactement la commande telle quelle (mais on garde l'argument cmd tel quel)
      // pour s'assurer de la compatibilité avec les modules.

      p.call(cmd, ...args);
    }

    const results = await p.exec();
    return results.map(([err, result]) => {
      if (err) throw err;
      return result;
    });
  }

  // === PATTERNS ET RECHERCHE ===

  async keys(pattern: string): Promise<string[]> {
    return await this.cache.keys(pattern);
  }

  async scan(
    cursor: number,
    pattern?: string,
    count?: number,
  ): Promise<[string, string[]]> {
    const args: any[] = [cursor];
    if (pattern) {
      args.push('MATCH', pattern);
    }
    if (count) {
      args.push('COUNT', count);
    }
    return await this.cache.scan(...(args as [number, ...any[]]));
  }

  // Scan all keys matching pattern (use with caution on large datasets)
  async scanAll(pattern?: string): Promise<string[]> {
    const keys: string[] = [];
    let cursor = 0;

    do {
      const [nextCursor, batchKeys] = await this.scan(cursor, pattern, 100);
      keys.push(...batchKeys);
      cursor = parseInt(nextCursor);
    } while (cursor !== 0);

    return keys;
  }

  // === UTILITAIRES DE HAUT NIVEAU ===

  // Cache avec JSON
  async setJSON(key: string, value: any, ttl?: number): Promise<void> {
    await this.set(key, JSON.stringify(value), ttl);
  }

  async getJSON<T>(key: string): Promise<T | null> {
    const value = await this.get(key);
    return value ? JSON.parse(value) : null;
  }

  // Cache avec compression (pour de gros objets)
  async setCompressed(key: string, value: string, ttl?: number): Promise<void> {
    const zlib = await import('zlib');
    const compressed = zlib.gzipSync(value);
    await this.cache.setex(key, ttl || 3600, compressed);
  }

  async getCompressed(key: string): Promise<string | null> {
    const compressed = await this.cache.getBuffer(key);
    if (!compressed) return null;

    const zlib = await import('zlib');
    return zlib.gunzipSync(compressed).toString();
  }

  // Rate limiting
  async rateLimit(
    key: string,
    limit: number,
    windowSeconds: number,
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const current = await this.cache.incr(key);

    if (current === 1) {
      await this.cache.expire(key, windowSeconds);
    }

    const ttl = await this.ttl(key);
    const resetTime = Date.now() + ttl * 1000;

    return {
      allowed: current <= limit,
      remaining: Math.max(0, limit - current),
      resetTime,
    };
  }

  // Distributed lock
  async acquireLock(key: string, ttl: number = 10): Promise<string | null> {
    const lockKey = `lock:${key}`;
    const lockValue = Math.random().toString(36);

    const result = await this.cache.set(lockKey, lockValue, 'EX', ttl, 'NX');
    return result === 'OK' ? lockValue : null;
  }

  async releaseLock(key: string, lockValue: string): Promise<boolean> {
    const lockKey = `lock:${key}`;
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;

    const result = await this.cache.eval(script, 1, lockKey, lockValue);
    return result === 1;
  }

  // Health check
  async healthCheck(): Promise<{
    publisher: boolean;
    subscriber: boolean;
    cache: boolean;
  }> {
    try {
      const [publisherPing, subscriberPing, cachePing] =
        await Promise.allSettled([
          this.publisher.ping(),
          this.subscriber.ping(),
          this.cache.ping(),
        ]);

      return {
        publisher:
          publisherPing.status === 'fulfilled' &&
          publisherPing.value === 'PONG',
        subscriber:
          subscriberPing.status === 'fulfilled' &&
          subscriberPing.value === 'PONG',
        cache: cachePing.status === 'fulfilled' && cachePing.value === 'PONG',
      };
    } catch (error) {
      this.logger.error('Health check failed:', error);
      return { publisher: false, subscriber: false, cache: false };
    }
  }

  // Statistics
  async getStats(): Promise<any> {
    try {
      const info = await this.cache.info();
      const dbSize = await this.cache.dbsize();
      const memory = await this.cache.info('memory');

      return {
        dbSize,
        info: this.parseRedisInfo(info),
        memory: this.parseRedisInfo(memory),
      };
    } catch (error) {
      this.logger.error('Failed to get Redis stats:', error);
      return null;
    }
  }

  private parseRedisInfo(info: string): Record<string, any> {
    const result: Record<string, any> = {};
    const lines = info.split('\r\n');

    for (const line of lines) {
      if (line && !line.startsWith('#')) {
        const [key, value] = line.split(':');
        if (key && value) {
          result[key] = isNaN(Number(value)) ? value : Number(value);
        }
      }
    }

    return result;
  }

  async onModuleDestroy() {
    await Promise.all([
      this.pubSub.close(),
      this.publisher.quit(),
      this.subscriber.quit(),
      this.cache.quit(),
    ]);
    this.logger.log('All Redis connections closed');
  }
}
