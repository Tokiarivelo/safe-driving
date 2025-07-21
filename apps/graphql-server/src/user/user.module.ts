import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './user.resolver';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { StorageService } from '../storage/storage.service';
import { StorageModule } from '../storage/storage.module';
import { VehicleModule } from '../vehicle/vehicle.module';

@Module({
  imports: [PrismaModule, StorageModule, VehicleModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
