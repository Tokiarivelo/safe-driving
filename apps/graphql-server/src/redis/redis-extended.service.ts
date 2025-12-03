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
  private readonly dataFlowLogger = new Logger(
    `${RedisExtendedService.name}:DataFlow`,
  );
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
    this.setupDataFlowMonitoring();

    this.pubSub = new RedisPubSub({
      publisher: this.publisher,
      subscriber: this.subscriber,
    });

    this.logger.log('Redis connections initialized');
  }

  private setupDataFlowMonitoring() {
    // Monitoring des commandes sur l'instance cache
    this.cache.on('connect', () => {
      this.cache
        .monitor()
        .then((monitor) => {
          monitor.on('monitor', (time, args, source, database) => {
            const command = args[0];
            const key = args[1];
            const value = args[2];

            // Log flux entrant (SET, HSET, etc.)
            if (
              [
                'set',
                'setex',
                'hset',
                'sadd',
                'zadd',
                'lpush',
                'rpush',
              ].includes(command?.toLowerCase())
            ) {
              this.dataFlowLogger.log(
                `INBOUND: ${command} ${key} ${this.truncateValue(value)} [${source}]`,
              );
            }

            // Log flux sortant (GET, HGET, etc.)
            if (
              [
                'get',
                'hget',
                'hgetall',
                'smembers',
                'lrange',
                'zrange',
              ].includes(command?.toLowerCase())
            ) {
              this.dataFlowLogger.log(
                `OUTBOUND: ${command} ${key} [${source}]`,
              );
            }
          });
        })
        .catch(() => {
          // Monitor peut ne pas être disponible en mode cluster
          this.dataFlowLogger.warn('Redis monitor not available');
        });
    });
  }

  private truncateValue(value: any, maxLength: number = 100): string {
    if (!value) return '';
    const str = String(value);
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
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
    this.dataFlowLogger.debug(
      `INBOUND SET: key=${key}, value_length=${value?.length || 0}, ttl=${ttl}`,
    );
    if (ttl) {
      await this.cache.setex(key, ttl, value);
    } else {
      await this.cache.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    this.dataFlowLogger.debug(`OUTBOUND GET: key=${key}`);
    const result = await this.cache.get(key);
    this.dataFlowLogger.debug(
      `OUTBOUND GET RESULT: key=${key}, found=${!!result}, length=${result?.length || 0}`,
    );
    return result;
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
    if (withScores) {
      return await this.cache.zrevrange(key, start, stop, 'WITHSCORES');
    } else {
      return await this.cache.zrevrange(key, start, stop);
    }
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

    this.dataFlowLogger.log(`PIPELINE START: ${commands.length} commands`);
    commands.forEach(([cmd, key], index) => {
      this.dataFlowLogger.debug(`PIPELINE[${index}]: ${cmd} ${key}`);
    });

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
      ([cmd]) => typeof cmd === 'string' && cmd.toLowerCase().includes('json'),
    );

    let results: any[];

    // Si on a pas de JSON.SET, on peut utiliser le pipeline array optimisé de ioredis
    if (!hasJsonModuleCmd) {
      const pipeline = this.cache.pipeline(normalized); // utilise la forme tableau
      const pipelineResults = await pipeline.exec();
      results = pipelineResults.map(([err, result]) => {
        if (err) throw err;
        return result;
      });
    } else {
      // Sinon (il y a au moins JSON.SET), utilisons pipeline + call() — robuste pour les modules
      const p = this.cache.pipeline();
      for (const [cmd, ...args] of normalized) {
        p.call(cmd, ...args);
      }

      const pipelineResults = await p.exec();
      results = pipelineResults.map(([err, result]) => {
        if (err) throw err;
        return result;
      });
    }

    this.dataFlowLogger.log(
      `PIPELINE END: ${commands.length} commands executed, ${results.length} results`,
    );
    return results;
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
    const jsonString = JSON.stringify(value);
    this.dataFlowLogger.debug(
      `INBOUND SET_JSON: key=${key}, size=${jsonString.length} bytes, ttl=${ttl}`,
    );
    await this.set(key, jsonString, ttl);
  }

  async getJSON<T>(key: string): Promise<T | null> {
    this.dataFlowLogger.debug(`OUTBOUND GET_JSON: key=${key}`);
    const value = await this.get(key);
    const result = value ? JSON.parse(value) : null;
    this.dataFlowLogger.debug(
      `OUTBOUND GET_JSON RESULT: key=${key}, found=${!!result}`,
    );
    return result;
  }

  // Cache avec compression (pour de gros objets)
  async setCompressed(key: string, value: string, ttl?: number): Promise<void> {
    const originalSize = value.length;
    const zlib = await import('zlib');
    const compressed = zlib.gzipSync(value);
    const compressedSize = compressed.length;
    this.dataFlowLogger.log(
      `INBOUND SET_COMPRESSED: key=${key}, original=${originalSize} bytes, compressed=${compressedSize} bytes, ratio=${((1 - compressedSize / originalSize) * 100).toFixed(2)}%`,
    );
    await this.cache.setex(key, ttl || 3600, compressed);
  }

  async getCompressed(key: string): Promise<string | null> {
    this.dataFlowLogger.debug(`OUTBOUND GET_COMPRESSED: key=${key}`);
    const compressed = await this.cache.getBuffer(key);
    if (!compressed) {
      this.dataFlowLogger.debug(
        `OUTBOUND GET_COMPRESSED RESULT: key=${key}, found=false`,
      );
      return null;
    }

    const zlib = await import('zlib');
    const result = zlib.gunzipSync(compressed).toString();
    this.dataFlowLogger.debug(
      `OUTBOUND GET_COMPRESSED RESULT: key=${key}, found=true, decompressed=${result.length} bytes`,
    );
    return result;
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

  async cleanupOrphanSockets(batch = 500) {
    this.logger.log('Starting cleanup of orphan sockets...');
    // itérer sur les keys user:*:sockets
    let cursor = '0';
    do {
      const res = await this.cache.scan(
        cursor,
        'MATCH',
        'user:*:sockets',
        'COUNT',
        1000,
      );
      cursor = res[0];
      const keys: string[] = res[1];

      for (const key of keys) {
        // récupérer membres par batch (SSCAN si set gros)
        let sscanCursor = '0';
        do {
          const [next, members] = await this.cache.sscan(
            key,
            sscanCursor,
            'COUNT',
            batch,
          );
          sscanCursor = next;
          if (!members || members.length === 0) continue;

          const pipeline = this.cache.pipeline();
          // check existence de chaque drivers:<id>
          for (const sid of members) pipeline.exists(`socket:${sid}`);
          const existsRes = await pipeline.exec();
          // existsRes est array [[null, 1],[null,0],...]
          const pipelineRem = this.cache.pipeline();
          for (let i = 0; i < members.length; i++) {
            const sid = members[i];
            const exists = existsRes[i][1] as number;
            if (!exists) {
              // supprime l'id orphelin du set
              pipelineRem.srem(key, sid);
              // supprime la clé drivers:... au cas où
              pipelineRem.del(`socket:${sid}`);
              this.logger.debug(`Removed orphan socket ${sid} from ${key}`);
            }
          }
          if (pipelineRem.length) await pipelineRem.exec();
        } while (sscanCursor !== '0');
      }
    } while (cursor !== '0');

    // après nettoyage, recalcule online_users : on enlève users sans sockets
    await this.recalcOnlineUsers();
    this.logger.log('Finished cleanup of orphan sockets.');
  }

  async recalcOnlineUsers() {
    this.logger.log('Recalculating online_users set...');
    const tempSet = `online_users_temp:${Date.now()}`;
    let cursor = '0';
    do {
      const res = await this.cache.scan(
        cursor,
        'MATCH',
        'user:*:sockets',
        'COUNT',
        1000,
      );
      cursor = res[0];
      const keys: string[] = res[1];
      for (const key of keys) {
        const userId = key.split(':')[1]; // user:<id>:sockets
        const cardinal = await this.cache.scard(key);
        if (cardinal > 0) {
          await this.cache.sadd(tempSet, userId);
        }
      }
    } while (cursor !== '0');

    // remplacer l'ancien online_users par le nouveau atomiquement
    await this.cache
      .multi()
      .del('online_users')
      .sunionstore('online_users', tempSet)
      .del(tempSet)
      .exec();
    this.logger.log('Recalculated online_users.');
  }
}
