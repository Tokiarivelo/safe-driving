// src/drivers/drivers.resolver.ts
import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DriversInput, DriversResponse } from './drivers.dto';
import { DriversService } from './drivers.service';
import { RideSearchService } from '../ride/ride-search.service';
import { RideSearchResponse } from 'src/dtos/drivers/ride-search.output';

@Resolver()
export class DriversResolver {
  constructor(
    private readonly driversService: DriversService,
    private readonly rideSearchService: RideSearchService,
  ) {}

  @Mutation(() => DriversResponse)
  createDrivers(@Args('input') input: DriversInput) {
    return this.driversService.saveDrivers(input.cars);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => RideSearchResponse)
  async searchRides(
    @Args('q', { nullable: true }) q: string | null,
    @Args('status', { nullable: true }) status?: string,
    @Args('page', { type: () => Int, defaultValue: 0 }) page?: number,
    @Args('size', { type: () => Int, defaultValue: 20 }) size?: number,
  ): Promise<RideSearchResponse> {
    return this.rideSearchService.searchRides(q, { page, size, status });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async recreateAndBulkRides() {
    await this.rideSearchService.recreateAndBulkIndex();
    return true;
  }
}
