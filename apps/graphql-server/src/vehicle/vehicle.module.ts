import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma-module/prisma.module';
import { VehicleService } from './vehicle.service';
import { DriverVehicleResolver } from './vehicle.resolver';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [PrismaModule, UploadModule],
  providers: [VehicleService, DriverVehicleResolver],
  exports: [VehicleService],
})
export class VehicleModule {}
