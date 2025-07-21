import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';
import { StorageService } from '../storage/storage.service';
import { VehicleInput } from '../dtos/vehicle/vehicle.input';

@Injectable()
export class VehicleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async createVehicle(input: VehicleInput, id: string) {
    const vehicle = await this.prisma.driverVehicle.create({
      data: {
        userId: id,
        brand: input.brand,
        model: input.model,
        registrationNumber: input.registrationNumber,
        place: input.place,
        vehicleTypeId: input.vehicleType,
      },
    });

    for (const vehicleImage of input.vehicleImages) {
      const url = await this.storageService.uploadToMinIO(
        await vehicleImage,
        'vehicle',
      );
      await this.prisma.driverVehicleImg.create({
        data: {
          vehicleId: vehicle.id,
          category: 'vehicle',
          url: url,
        },
      });
    }

    for (const assuranceImage of input.assuranceImages) {
      const url = await this.storageService.uploadToMinIO(
        await assuranceImage,
        'assurance',
      );
      await this.prisma.driverVehicleImg.create({
        data: {
          vehicleId: vehicle.id,
          category: 'assurance',
          url: url,
        },
      });
    }

    for (const registrationImage of input.registrationImages) {
      const url = await this.storageService.uploadToMinIO(
        await registrationImage,
        'registration',
      );
      await this.prisma.driverVehicleImg.create({
        data: {
          vehicleId: vehicle.id,
          category: 'registration',
          url: url,
        },
      });
    }

    return vehicle;
  }
}
