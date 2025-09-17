// src/drivers/drivers.module.ts
import { Module } from '@nestjs/common';
import { DriversGateway } from './drivers.gateway';
import { RedisModule } from '../redis/redis.module';
import { DriversResolver } from './drivers.resolver';
import { DriversService } from './drivers.service';

@Module({
  imports: [RedisModule],
  providers: [DriversGateway, DriversResolver, DriversService],
  exports: [DriversService],
})
export class DriversModule {}
