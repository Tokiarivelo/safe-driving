import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma-module/prisma.module';
import { StorageModule } from '../storage/storage.module';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [PrismaModule, StorageModule],
  providers: [VehicleService],
  exports: [VehicleService],
})
export class VehicleModule {}
