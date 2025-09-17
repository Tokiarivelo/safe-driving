// src/drivers/drivers.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { DriversInput, DriversResponse } from './drivers.dto';
import { DriversService } from './drivers.service';

@Resolver()
export class DriversResolver {
  constructor(private readonly driversService: DriversService) {}

  @Mutation(() => DriversResponse)
  createDrivers(@Args('input') input: DriversInput) {
    return this.driversService.saveDrivers(input.cars);
  }
}
