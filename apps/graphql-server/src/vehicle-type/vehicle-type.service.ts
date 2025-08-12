import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-module/prisma.service';
import {
  FindManyVehicleTypeArgs,
  VehicleType,
  VehicleTypeCreateInput,
} from '../dtos/@generated';

@Injectable()
export class VehicleTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    params: FindManyVehicleTypeArgs,
  ): Promise<VehicleType[] | null> {
    const { skip, take, cursor, where, orderBy } = params;
    const vehicleTypes = await this.prisma.vehicleType.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return vehicleTypes;
  }

  async findById(id: string): Promise<VehicleType> {
    const vehicleType = await this.prisma.vehicleType.findUnique({
      where: { id },
    });
    if (!vehicleType) {
      throw new NotFoundException(`VehicleType with id ${id} not found`);
    }
    return vehicleType;
  }

  async create(input: VehicleTypeCreateInput): Promise<VehicleType> {
    const vehicleType = await this.prisma.vehicleType.create({
      data: {
        ...input, // Assuming input contains the necessary fields for VehicleType
      },
    });
    return vehicleType;
  }

  async delete(id: string): Promise<VehicleType> {
    const vehicleType = await this.prisma.vehicleType.delete({
      where: { id },
    });
    if (!vehicleType) {
      throw new NotFoundException(`VehicleType with id ${id} not found`);
    }
    return vehicleType;
  }
}
