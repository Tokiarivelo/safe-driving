import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DriverVehicle, User, UserPreference } from 'src/dtos/@generated';
import { VehicleService } from './vehicle.service';
import { CreateDriverVehicleInput } from 'src/dtos/vehicle/vehicle.input';

@Resolver(() => DriverVehicle)
export class DriverVehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [DriverVehicle], { name: 'vehicles', nullable: true })
  vehicles(@CurrentUser() user: User): Promise<DriverVehicle[] | null> {
    return this.vehicleService.findAllVehiclesByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Mutation(() => UserPreference, { name: 'createDriverVehicle' })
  async createDriverVehicle(
    @CurrentUser() user: User,
    @Args('input') input: CreateDriverVehicleInput,
  ): Promise<DriverVehicle> {
    return this.vehicleService.createDriverVehicle(user.id, input);
  }

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Mutation(() => UserPreference, { name: 'createDriverVehicle' })
  async updateDriverVehicle(
    @CurrentUser() user: User,
    @Args('vehicleId') vehicleId: string,
    @Args('input') input: CreateDriverVehicleInput,
  ): Promise<DriverVehicle> {
    return this.vehicleService.updateDriverVehicle(user.id, vehicleId, input);
  }
}
