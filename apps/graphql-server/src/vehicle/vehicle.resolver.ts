import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  DriverVehicle,
  User,
  VehicleDocument,
  VehicleImage,
} from 'src/dtos/@generated';
import { VehicleService } from './vehicle.service';
import {
  CreateDriverVehicleInput,
  UpdateDriverVehicleInput,
  UploadVehicleDocumentsInput,
} from 'src/dtos/vehicle/vehicle.input';

@Resolver(() => DriverVehicle)
@UseGuards(JwtAuthGuard)
export class DriverVehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}
  @Query(() => [DriverVehicle], { name: 'vehicles', nullable: true })
  vehicles(@CurrentUser() user: User): Promise<DriverVehicle[] | null> {
    return this.vehicleService.findAllVehiclesByUserId(user.id);
  }

  @Mutation(() => DriverVehicle, { name: 'createDriverVehicle' })
  async createDriverVehicle(
    @CurrentUser() user: User,
    @Args('input') input: CreateDriverVehicleInput,
  ): Promise<DriverVehicle> {
    return this.vehicleService.createDriverVehicle(user.id, input);
  }

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Mutation(() => DriverVehicle, { name: 'updateDriverVehicle' })
  async updateDriverVehicle(
    @CurrentUser() user: User,
    @Args('vehicleId') vehicleId: string,
    @Args('input') input: UpdateDriverVehicleInput,
  ): Promise<DriverVehicle> {
    return this.vehicleService.updateDriverVehicle(user.id, vehicleId, input);
  }

  @Mutation(() => [VehicleImage], { name: 'uploadVehicleImages' })
  async uploadVehicleImages(
    @CurrentUser() user: User,
    @Args('vehicleId') vehicleId: string,
    @Args('keys', { type: () => [String] }) keys: string[],
  ): Promise<VehicleImage[]> {
    return this.vehicleService.uploadVehicleImages(user.id, vehicleId, keys);
  }

  @Mutation(() => VehicleImage, { name: 'deleteVehicleImageByKey' })
  async deleteVehicleImageByKey(
    @CurrentUser() user: User,
    @Args('vehicleId') vehicleId: string,
    @Args('key') key: string,
  ): Promise<VehicleImage> {
    return this.vehicleService.deleteVehicleImageByKey(user.id, vehicleId, key);
  }

  @Mutation(() => [VehicleDocument], { name: 'uploadVehicleDocuments' })
  async uploadVehicleDocuments(
    @CurrentUser() user: User,
    @Args('vehicleId') vehicleId: string,
    @Args('input', { type: () => [UploadVehicleDocumentsInput] })
    input: UploadVehicleDocumentsInput[],
  ): Promise<VehicleDocument[]> {
    return this.vehicleService.uploadVehicleDocuments(
      user.id,
      vehicleId,
      input,
    );
  }

  @Mutation(() => VehicleDocument, { name: 'deleteVehicleDocumentByKey' })
  async deleteVehicleDocumentByKey(
    @CurrentUser() user: User,
    @Args('vehicleId') vehicleId: string,
    @Args('key') key: string,
  ): Promise<VehicleDocument> {
    return this.vehicleService.deleteVehicleDocumentByKey(
      user.id,
      vehicleId,
      key,
    );
  }
}
