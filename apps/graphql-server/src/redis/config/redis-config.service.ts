import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { Cluster } from 'ioredis';

export interface RedisConfig {
  host?: string;
  port?: number;
  password?: string;
  db?: number;
  retryDelayOnFailover?: number;
  enableReadyCheck?: boolean;
  maxRetriesPerRequest?: number;
  lazyConnect?: boolean;
  keepAlive?: number;
  family?: number;
  connectTimeout?: number;
  commandTimeout?: number;
}

@Injectable()
export class RedisConfigService {
  constructor(private config: ConfigService) {}

  // Configuration pour un seul serveur Redis
  getSingleNodeConfig(): RedisConfig {
    return {
      host: this.config.get<string>('REDIS_HOST', 'redis'),
      port: +this.config.get<number>('REDIS_PORT', 6379),
      password: this.config.get<string>('REDIS_PASSWORD') || undefined,
      db: this.config.get<number>('REDIS_DB', 0),
      retryDelayOnFailover: 100,
      enableReadyCheck: false,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      keepAlive: 30000,
      family: 4,
      connectTimeout: 10000,
      commandTimeout: 5000,
    };
  }

  // Configuration pour Redis Cluster
  getClusterConfig() {
    const nodes = process.env.REDIS_CLUSTER_NODES?.split(',').map((node) => {
      const [host, port] = node.trim().split(':');
      return { host, port: parseInt(port) };
    }) || [{ host: 'localhost', port: 6379 }];

    return {
      nodes,
      options: {
        password: process.env.REDIS_PASSWORD,
        keyPrefix: process.env.REDIS_KEY_PREFIX || 'chat:',
        retryDelayOnFailover: 100,
        enableReadyCheck: false,
        maxRetriesPerRequest: 3,
        redisOptions: {
          family: 4,
        },
      },
    };
  }

  // Configuration pour Redis Sentinel
  getSentinelConfig() {
    const sentinels = process.env.REDIS_SENTINELS?.split(',').map(
      (sentinel) => {
        const [host, port] = sentinel.trim().split(':');
        return { host, port: parseInt(port) };
      },
    ) || [{ host: 'localhost', port: 26379 }];

    return {
      sentinels,
      name: process.env.REDIS_SENTINEL_MASTER_NAME || 'mymaster',
      password: process.env.REDIS_PASSWORD,
      keyPrefix: process.env.REDIS_KEY_PREFIX || 'chat:',
      retryDelayOnFailover: 100,
      enableReadyCheck: false,
      maxRetriesPerRequest: 3,
      sentinelRetryDelayOnFailover: 100,
    };
  }
}
