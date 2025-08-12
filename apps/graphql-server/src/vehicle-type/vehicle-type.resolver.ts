import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { VehicleTypeService } from './vehicle-type.service';
import {
  FindManyVehicleTypeArgs,
  VehicleType,
  VehicleTypeCreateInput,
} from 'src/dtos/@generated';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => VehicleType)
export class VehicleTypeResolver {
  constructor(private readonly VehicleTypeService: VehicleTypeService) {}

  @Query(() => [VehicleType], { name: 'vehicleTypes' })
  async vehicleTypes(
    @Args() manyVehicleTypeArgs: FindManyVehicleTypeArgs,
  ): Promise<VehicleType[] | null> {
    return this.VehicleTypeService.findAll(manyVehicleTypeArgs);
  }

  @Query(() => VehicleType, { name: 'VehicleType' })
  @UseGuards(JwtAuthGuard) // 👈 protège la route
  async getOne(@Args('id') id: string): Promise<VehicleType> {
    return this.VehicleTypeService.findById(id);
  }

  @Mutation(() => VehicleType, { name: 'createVehicleType' })
  async create(
    @Args('input') input: VehicleTypeCreateInput,
  ): Promise<VehicleType> {
    const VehicleType = await this.VehicleTypeService.create(input);
    return VehicleType;
  }

  @Mutation(() => VehicleType, { name: 'deleteVehicleType' })
  @UseGuards(JwtAuthGuard) // 👈 protège la route
  async delete(@Args('id') id: string): Promise<VehicleType> {
    return this.VehicleTypeService.delete(id);
  }
}
