// src/drivers/drivers.resolver.ts
import { Resolver, Mutation, Args, Query, Int, Float } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DriversInput, DriversResponse, NearbyDriversResult } from './drivers.dto';
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

  @Query(() => NearbyDriversResult)
  async nearbyDrivers(
    @Args('lat', { type: () => Float }) lat: number,
    @Args('lng', { type: () => Float }) lng: number,
    @Args('radiusMeters', { type: () => Int, nullable: true, defaultValue: 1500 })
    radiusMeters?: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 50 })
    limit?: number,
    @Args('mock', { type: () => Boolean, nullable: true, defaultValue: false })
    mock?: boolean,
  ): Promise<NearbyDriversResult> {
    return this.driversService.getNearbyDrivers(
      lat,
      lng,
      radiusMeters ?? 1500,
      limit ?? 50,
      mock ?? false,
    );
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
