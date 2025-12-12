import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User, RideStatistic } from 'src/dtos/@generated';
import { UpdateStatisticInput } from 'src/dtos/statistics/statistics.input';
import {
  DriverStatisticsResponse,
  UserStatisticsResponse,
  TopDriversResponse,
} from 'src/dtos/statistics/statistics.output';
import { StatisticsService } from './statistics.service';

@Resolver(() => RideStatistic)
export class StatisticsResolver {
  constructor(private readonly statisticsService: StatisticsService) {}

  // QUERIES

  /**
   * Get driver statistics
   */
  @UseGuards(JwtAuthGuard)
  @Query(() => DriverStatisticsResponse, { name: 'getDriverStatistics' })
  async getDriverStatistics(
    @Args('driverId', { type: () => String, nullable: true }) driverId?: string,
    @CurrentUser() user?: User,
  ): Promise<DriverStatisticsResponse> {
    // If no driverId is provided, use the current user's ID
    const targetDriverId = driverId || user?.id;
    if (!targetDriverId) {
      return {
        statistics: null,
        success: false,
        message: 'Driver ID is required',
      };
    }
    return this.statisticsService.getDriverStatistics(targetDriverId);
  }

  /**
   * Get user statistics
   */
  @UseGuards(JwtAuthGuard)
  @Query(() => UserStatisticsResponse, { name: 'getUserStatistics' })
  async getUserStatistics(
    @Args('userId', { type: () => String, nullable: true }) userId?: string,
    @CurrentUser() user?: User,
  ): Promise<UserStatisticsResponse> {
    // If no userId is provided, use the current user's ID
    const targetUserId = userId || user?.id;
    if (!targetUserId) {
      return {
        statistics: null,
        success: false,
        message: 'User ID is required',
      };
    }
    return this.statisticsService.getUserStatistics(targetUserId);
  }

  /**
   * Get top drivers leaderboard
   */
  @Query(() => TopDriversResponse, { name: 'getTopDrivers' })
  async getTopDrivers(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<TopDriversResponse> {
    return this.statisticsService.getTopDrivers(limit);
  }

  // MUTATIONS

  /**
   * Update driver statistics
   */
  @UseGuards(JwtAuthGuard)
  @Mutation(() => RideStatistic, { name: 'updateDriverStatistics' })
  async updateDriverStatistics(
    @Args('driverId') driverId: string,
    @Args('input') input: UpdateStatisticInput,
    @CurrentUser() user: User,
  ): Promise<RideStatistic> {
    // Only allow drivers to update their own statistics
    // In production, add role-based access control
    return this.statisticsService.updateDriverStatistics(driverId, input);
  }

  /**
   * Update user statistics
   */
  @UseGuards(JwtAuthGuard)
  @Mutation(() => RideStatistic, { name: 'updateUserStatistics' })
  async updateUserStatistics(
    @Args('userId') userId: string,
    @Args('input') input: UpdateStatisticInput,
    @CurrentUser() user: User,
  ): Promise<RideStatistic> {
    // Only allow users to update their own statistics
    // In production, add role-based access control
    return this.statisticsService.updateUserStatistics(userId, input);
  }

  /**
   * Recalculate driver statistics from actual data
   */
  @UseGuards(JwtAuthGuard)
  @Mutation(() => RideStatistic, { name: 'recalculateDriverStatistics' })
  async recalculateDriverStatistics(
    @Args('driverId', { type: () => String, nullable: true }) driverId?: string,
    @CurrentUser() user?: User,
  ): Promise<RideStatistic> {
    const targetDriverId = driverId || user?.id;
    return this.statisticsService.recalculateDriverStatistics(targetDriverId);
  }

  /**
   * Recalculate user statistics from actual data
   */
  @UseGuards(JwtAuthGuard)
  @Mutation(() => RideStatistic, { name: 'recalculateUserStatistics' })
  async recalculateUserStatistics(
    @Args('userId', { type: () => String, nullable: true }) userId?: string,
    @CurrentUser() user?: User,
  ): Promise<RideStatistic> {
    const targetUserId = userId || user?.id;
    return this.statisticsService.recalculateUserStatistics(targetUserId);
  }
}
