// src/drivers/drivers.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { RideGateway } from './ride.gateway';
import { RedisModule } from '../redis/redis.module';
import { RideResolver } from './ride.resolver';
import { RideService } from './ride.service';
import { RideSearchService } from './ride-search.service';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [RedisModule, PrismaModule, AuthModule],
  providers: [RideGateway, RideResolver, RideService, RideSearchService],
  exports: [RideService, RideSearchService],
})
export class RideModule implements OnModuleInit {
  constructor(private readonly rideSearchService: RideSearchService) {}

  async onModuleInit() {
    await this.rideSearchService.createIndexIfNotExists();
  }
}
