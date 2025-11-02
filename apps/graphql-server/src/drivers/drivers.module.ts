// src/drivers/drivers.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { DriversGateway } from './drivers.gateway';
import { RideGateway } from '../ride/ride.gateway';
import { RedisModule } from '../redis/redis.module';
import { DriversResolver } from './drivers.resolver';
import { DriversService } from './drivers.service';
import { RideResolver } from '../ride/ride.resolver';
import { RideService } from '../ride/ride.service';
import { RideSearchService } from '../ride/ride-search.service';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [RedisModule, PrismaModule, AuthModule],
  providers: [
    DriversGateway,
    RideGateway,
    DriversResolver,
    DriversService,
    RideResolver,
    RideService,
    RideSearchService,
  ],
  exports: [DriversService, RideService, RideSearchService],
})
export class DriversModule implements OnModuleInit {
  constructor(private readonly rideSearchService: RideSearchService) {}

  async onModuleInit() {
    await this.rideSearchService.createIndexIfNotExists();
  }
}
