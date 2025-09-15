// src/drivers/drivers.module.ts
import { Module } from '@nestjs/common';
import { DriversGateway } from './drivers.gateway';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [RedisModule],
  providers: [DriversGateway],
})
export class DriversModule {}
