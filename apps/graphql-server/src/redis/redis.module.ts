import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { PUB_SUB, REDIS_PUB, REDIS_SUB } from './config/redis.constants';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { RedisExtendedService } from './redis-extended.service';
import { RedisConfigService } from './config/redis-config.service';

@Global()
@Module({
  providers: [
    RedisService,
    RedisConfigService,
    RedisExtendedService,
    // export clients individually if tu veux les réutiliser directement
    {
      provide: REDIS_PUB,
      useFactory: (r: RedisService) => r.getPublisher(),
      inject: [RedisService],
    },
    {
      provide: REDIS_SUB,
      useFactory: (r: RedisService) => r.getSubscriber(),
      inject: [RedisService],
    },
    // provider PubSub
    {
      provide: PUB_SUB,
      useFactory: (pub: any, sub: any) => {
        // RedisPubSub attends des clients ioredis (publisher/subscriber)
        return new RedisPubSub({ publisher: pub, subscriber: sub });
      },
      inject: [REDIS_PUB, REDIS_SUB],
    },
  ],
  exports: [PUB_SUB, REDIS_PUB, REDIS_SUB, RedisService, RedisExtendedService],
})
export class RedisModule {}
