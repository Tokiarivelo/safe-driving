import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { UpdateStatisticInput } from 'src/dtos/statistics/statistics.input';
import {
  DriverStatisticsResponse,
  UserStatisticsResponse,
  TopDriversResponse,
  TopDriverStatistic,
} from 'src/dtos/statistics/statistics.output';
import { RideStatistic } from 'src/dtos/@generated';

@Injectable()
export class StatisticsService {
  private readonly logger = new Logger(StatisticsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get or create driver statistics
   */
  async getDriverStatistics(driverId: string): Promise<DriverStatisticsResponse> {
    try {
      this.logger.log(`Fetching statistics for driver ${driverId}`);

      // Check if driver exists
      const driver = await this.prisma.user.findUnique({
        where: { id: driverId },
      });

      if (!driver) {
        return {
          statistics: null,
          success: false,
          message: 'Driver not found',
        };
      }

      // Try to find existing statistics
      let statistics = await this.prisma.rideStatistic.findFirst({
        where: { driverId },
        include: {
          driver: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      // If no statistics exist, create them
      if (!statistics) {
        this.logger.log(`Creating new statistics for driver ${driverId}`);
        const newStats = await this.createDriverStatistics(driverId);
        // Re-fetch with includes to match the expected type
        statistics = await this.prisma.rideStatistic.findFirst({
          where: { id: newStats.id },
          include: {
            driver: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        });
      }

      return {
        statistics: statistics as any,
        success: true,
        message: 'Statistics retrieved successfully',
      };
    } catch (error) {
      this.logger.error(`Error fetching driver statistics: ${error.message}`);
      return {
        statistics: null,
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * Get or create user statistics
   */
  async getUserStatistics(userId: string): Promise<UserStatisticsResponse> {
    try {
      this.logger.log(`Fetching statistics for user ${userId}`);

      // Check if user exists
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return {
          statistics: null,
          success: false,
          message: 'User not found',
        };
      }

      // Try to find existing statistics
      let statistics = await this.prisma.rideStatistic.findFirst({
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      // If no statistics exist, create them
      if (!statistics) {
        this.logger.log(`Creating new statistics for user ${userId}`);
        const newStats = await this.createUserStatistics(userId);
        // Re-fetch with includes to match the expected type
        statistics = await this.prisma.rideStatistic.findFirst({
          where: { id: newStats.id },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        });
      }

      return {
        statistics: statistics as any,
        success: true,
        message: 'Statistics retrieved successfully',
      };
    } catch (error) {
      this.logger.error(`Error fetching user statistics: ${error.message}`);
      return {
        statistics: null,
        success: false,
        message: error.message,
      };
    }
  }

  /**
   * Get top drivers by revenue and rating
   */
  async getTopDrivers(limit: number = 10): Promise<TopDriversResponse> {
    try {
      this.logger.log(`Fetching top ${limit} drivers`);

      const statistics = await this.prisma.rideStatistic.findMany({
        where: {
          driverId: { not: null },
        },
        include: {
          driver: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatar: {
                select: {
                  url: true,
                },
              },
            },
          },
        },
        orderBy: [
          { revenue: 'desc' },
          { averageRating: 'desc' },
          { completedRides: 'desc' },
        ],
        take: limit,
      });

      const drivers: TopDriverStatistic[] = statistics.map((stat) => ({
        driverId: stat.driverId!,
        firstName: stat.driver?.firstName || '',
        lastName: stat.driver?.lastName || null,
        avatarUrl: stat.driver?.avatar?.url || null,
        completedRides: stat.completedRides,
        revenue: stat.revenue,
        averageRating: stat.averageRating,
        totalReviews: stat.totalReviews,
        motivationScore: stat.motivationScore,
      }));

      return {
        drivers,
        total: drivers.length,
      };
    } catch (error) {
      this.logger.error(`Error fetching top drivers: ${error.message}`);
      return {
        drivers: [],
        total: 0,
      };
    }
  }

  /**
   * Update driver statistics
   */
  async updateDriverStatistics(
    driverId: string,
    input: UpdateStatisticInput,
  ): Promise<RideStatistic> {
    this.logger.log(`Updating statistics for driver ${driverId}`);

    // Ensure statistics exist
    let statistics = await this.prisma.rideStatistic.findFirst({
      where: { driverId },
    });

    if (!statistics) {
      statistics = await this.createDriverStatistics(driverId);
    }

    return this.prisma.rideStatistic.update({
      where: { id: statistics.id },
      data: {
        completedRides: input.completedRides ?? statistics.completedRides,
        revenue: input.revenue ?? statistics.revenue,
        averageRating: input.averageRating ?? statistics.averageRating,
        totalReviews: input.totalReviews ?? statistics.totalReviews,
        motivationScore: input.motivationScore ?? statistics.motivationScore,
      },
      include: {
        driver: true,
      },
    });
  }

  /**
   * Update user statistics
   */
  async updateUserStatistics(
    userId: string,
    input: UpdateStatisticInput,
  ): Promise<RideStatistic> {
    this.logger.log(`Updating statistics for user ${userId}`);

    // Ensure statistics exist
    let statistics = await this.prisma.rideStatistic.findFirst({
      where: { userId },
    });

    if (!statistics) {
      statistics = await this.createUserStatistics(userId);
    }

    return this.prisma.rideStatistic.update({
      where: { id: statistics.id },
      data: {
        completedRides: input.completedRides ?? statistics.completedRides,
        revenue: input.revenue ?? statistics.revenue,
        averageRating: input.averageRating ?? statistics.averageRating,
        totalReviews: input.totalReviews ?? statistics.totalReviews,
        motivationScore: input.motivationScore ?? statistics.motivationScore,
      },
      include: {
        user: true,
      },
    });
  }

  /**
   * Calculate and update statistics based on actual data
   * Note: Review model currently only tracks review author (userId).
   * This calculates average of reviews GIVEN by the driver.
   * If you need reviews ABOUT the driver, update the Review model to include targetId.
   */
  async recalculateDriverStatistics(driverId: string): Promise<RideStatistic> {
    this.logger.log(`Recalculating statistics for driver ${driverId}`);

    // Get completed rides count
    const completedRides = await this.prisma.ride.count({
      where: {
        driverId,
        status: 'COMPLETED',
      },
    });

    // Calculate total revenue from completed rides
    const rides = await this.prisma.ride.findMany({
      where: {
        driverId,
        status: 'COMPLETED',
        price: { not: null },
      },
      select: {
        price: true,
      },
    });

    const revenue = rides.reduce((sum, ride) => {
      return sum + (ride.price ? parseFloat(ride.price.toString()) : 0);
    }, 0);

    // Get reviews given by this user (not about the user)
    // In the current schema, userId is the review author
    const reviews = await this.prisma.review.findMany({
      where: {
        userId: driverId,
      },
      select: {
        rating: true,
      },
    });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

    // Calculate motivation score (simple formula based on activity)
    const motivationScore = Math.min(
      100,
      Math.floor(
        (completedRides * 0.3 + totalReviews * 0.2 + averageRating * 10) * 2,
      ),
    );

    // Ensure statistics exist
    let statistics = await this.prisma.rideStatistic.findFirst({
      where: { driverId },
    });

    if (!statistics) {
      statistics = await this.createDriverStatistics(driverId);
    }

    return this.prisma.rideStatistic.update({
      where: { id: statistics.id },
      data: {
        completedRides,
        revenue,
        averageRating,
        totalReviews,
        motivationScore,
      },
      include: {
        driver: true,
      },
    });
  }

  /**
   * Calculate and update user statistics
   */
  async recalculateUserStatistics(userId: string): Promise<RideStatistic> {
    this.logger.log(`Recalculating statistics for user ${userId}`);

    // Get completed rides count as passenger
    const completedRides = await this.prisma.rideParticipant.count({
      where: {
        userId,
        ride: {
          status: 'COMPLETED',
        },
      },
    });

    // Get reviews given by this user
    const reviews = await this.prisma.review.findMany({
      where: {
        userId,
      },
      select: {
        rating: true,
      },
    });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

    // Calculate motivation score for users (based on ride participation)
    const motivationScore = Math.min(
      100,
      Math.floor((completedRides * 0.5 + totalReviews * 0.3) * 2),
    );

    // Ensure statistics exist
    let statistics = await this.prisma.rideStatistic.findFirst({
      where: { userId },
    });

    if (!statistics) {
      statistics = await this.createUserStatistics(userId);
    }

    return this.prisma.rideStatistic.update({
      where: { id: statistics.id },
      data: {
        completedRides,
        averageRating,
        totalReviews,
        motivationScore,
        revenue: 0, // Users don't have revenue
      },
      include: {
        user: true,
      },
    });
  }

  /**
   * Private helper to create driver statistics
   */
  private async createDriverStatistics(driverId: string): Promise<RideStatistic> {
    return this.prisma.rideStatistic.create({
      data: {
        driverId,
        completedRides: 0,
        revenue: 0,
        averageRating: 0,
        totalReviews: 0,
        motivationScore: 0,
      },
      include: {
        driver: true,
      },
    });
  }

  /**
   * Private helper to create user statistics
   */
  private async createUserStatistics(userId: string): Promise<RideStatistic> {
    return this.prisma.rideStatistic.create({
      data: {
        userId,
        completedRides: 0,
        revenue: 0,
        averageRating: 0,
        totalReviews: 0,
        motivationScore: 0,
      },
      include: {
        user: true,
      },
    });
  }
}
