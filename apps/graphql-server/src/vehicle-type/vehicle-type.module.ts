import { Module } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleTypeResolver } from './vehicle-type.resolver';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { VehicleModule } from '../vehicle/vehicle.module';

@Module({
  imports: [PrismaModule, VehicleModule],
  providers: [VehicleTypeService, VehicleTypeResolver],
})
export class VehicleTypeModule {}
