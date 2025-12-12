import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsService } from './statistics.service';
import { PrismaService } from 'src/prisma-module/prisma.service';

describe('StatisticsService', () => {
  let service: StatisticsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
    rideStatistic: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    ride: {
      count: jest.fn(),
      findMany: jest.fn(),
    },
    review: {
      findMany: jest.fn(),
    },
    rideParticipant: {
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDriverStatistics', () => {
    it('should return driver statistics when they exist', async () => {
      const mockDriver = { id: 'driver-1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' };
      const mockStatistics = {
        id: 'stat-1',
        driverId: 'driver-1',
        userId: null,
        completedRides: 50,
        revenue: 250000,
        averageRating: 4.5,
        totalReviews: 40,
        motivationScore: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
        driver: mockDriver,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockDriver);
      mockPrismaService.rideStatistic.findFirst.mockResolvedValue(mockStatistics);

      const result = await service.getDriverStatistics('driver-1');

      expect(result.success).toBe(true);
      expect(result.statistics).toEqual(mockStatistics);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'driver-1' },
      });
    });

    it('should create new statistics if none exist', async () => {
      const mockDriver = { id: 'driver-1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' };
      const mockNewStatistics = {
        id: 'stat-1',
        driverId: 'driver-1',
        userId: null,
        completedRides: 0,
        revenue: 0,
        averageRating: 0,
        totalReviews: 0,
        motivationScore: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        driver: mockDriver,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockDriver);
      mockPrismaService.rideStatistic.findFirst.mockResolvedValue(null);
      mockPrismaService.rideStatistic.create.mockResolvedValue(mockNewStatistics);

      const result = await service.getDriverStatistics('driver-1');

      expect(result.success).toBe(true);
      expect(result.statistics?.completedRides).toBe(0);
      expect(mockPrismaService.rideStatistic.create).toHaveBeenCalled();
    });

    it('should return error when driver not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.getDriverStatistics('non-existent-driver');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Driver not found');
      expect(result.statistics).toBeNull();
    });
  });

  describe('getUserStatistics', () => {
    it('should return user statistics when they exist', async () => {
      const mockUser = { id: 'user-1', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' };
      const mockStatistics = {
        id: 'stat-2',
        driverId: null,
        userId: 'user-1',
        completedRides: 20,
        revenue: 0,
        averageRating: 4.2,
        totalReviews: 18,
        motivationScore: 65,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: mockUser,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.rideStatistic.findFirst.mockResolvedValue(mockStatistics);

      const result = await service.getUserStatistics('user-1');

      expect(result.success).toBe(true);
      expect(result.statistics).toEqual(mockStatistics);
    });

    it('should create new user statistics if none exist', async () => {
      const mockUser = { id: 'user-1', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' };
      const mockNewStatistics = {
        id: 'stat-2',
        driverId: null,
        userId: 'user-1',
        completedRides: 0,
        revenue: 0,
        averageRating: 0,
        totalReviews: 0,
        motivationScore: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: mockUser,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.rideStatistic.findFirst.mockResolvedValue(null);
      mockPrismaService.rideStatistic.create.mockResolvedValue(mockNewStatistics);

      const result = await service.getUserStatistics('user-1');

      expect(result.success).toBe(true);
      expect(mockPrismaService.rideStatistic.create).toHaveBeenCalled();
    });
  });

  describe('getTopDrivers', () => {
    it('should return top drivers sorted by revenue and rating', async () => {
      const mockTopDrivers = [
        {
          id: 'stat-1',
          driverId: 'driver-1',
          completedRides: 100,
          revenue: 500000,
          averageRating: 4.8,
          totalReviews: 90,
          motivationScore: 95,
          driver: {
            id: 'driver-1',
            firstName: 'John',
            lastName: 'Doe',
            avatar: { url: 'http://example.com/avatar1.jpg' },
          },
        },
        {
          id: 'stat-2',
          driverId: 'driver-2',
          completedRides: 80,
          revenue: 450000,
          averageRating: 4.7,
          totalReviews: 75,
          motivationScore: 90,
          driver: {
            id: 'driver-2',
            firstName: 'Jane',
            lastName: 'Smith',
            avatar: { url: 'http://example.com/avatar2.jpg' },
          },
        },
      ];

      mockPrismaService.rideStatistic.findMany.mockResolvedValue(mockTopDrivers);

      const result = await service.getTopDrivers(10);

      expect(result.drivers).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.drivers[0].revenue).toBeGreaterThanOrEqual(result.drivers[1].revenue);
    });

    it('should limit results to specified number', async () => {
      const mockDrivers = Array(15).fill(null).map((_, i) => ({
        id: `stat-${i}`,
        driverId: `driver-${i}`,
        completedRides: 50 - i,
        revenue: 300000 - (i * 10000),
        averageRating: 4.5,
        totalReviews: 40,
        motivationScore: 75,
        driver: {
          id: `driver-${i}`,
          firstName: `Driver${i}`,
          lastName: 'Test',
          avatar: { url: null },
        },
      }));

      mockPrismaService.rideStatistic.findMany.mockResolvedValue(mockDrivers.slice(0, 5));

      const result = await service.getTopDrivers(5);

      expect(result.drivers).toHaveLength(5);
      expect(mockPrismaService.rideStatistic.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ take: 5 })
      );
    });
  });

  describe('recalculateDriverStatistics', () => {
    it('should calculate statistics from actual ride data', async () => {
      const driverId = 'driver-1';
      const mockRides = [
        { price: 15000 },
        { price: 20000 },
        { price: 18000 },
      ];
      const mockReviews = [
        { rating: 5 },
        { rating: 4 },
        { rating: 5 },
      ];
      const mockStatistic = {
        id: 'stat-1',
        driverId,
        completedRides: 3,
        revenue: 53000,
        averageRating: 4.67,
        totalReviews: 3,
        motivationScore: expect.any(Number),
      };

      mockPrismaService.ride.count.mockResolvedValue(3);
      mockPrismaService.ride.findMany.mockResolvedValue(mockRides);
      mockPrismaService.review.findMany.mockResolvedValue(mockReviews);
      mockPrismaService.rideStatistic.findFirst.mockResolvedValue(null);
      mockPrismaService.rideStatistic.create.mockResolvedValue(mockStatistic);
      mockPrismaService.rideStatistic.update.mockResolvedValue(mockStatistic);

      const result = await service.recalculateDriverStatistics(driverId);

      expect(result.completedRides).toBe(3);
      expect(mockPrismaService.ride.count).toHaveBeenCalledWith({
        where: { driverId, status: 'COMPLETED' },
      });
      expect(mockPrismaService.review.findMany).toHaveBeenCalledWith({
        where: { userId: driverId },
        select: { rating: true },
      });
    });

    it('should handle drivers with no rides', async () => {
      const driverId = 'new-driver';
      const mockStatistic = {
        id: 'stat-1',
        driverId,
        completedRides: 0,
        revenue: 0,
        averageRating: 0,
        totalReviews: 0,
        motivationScore: 0,
      };

      mockPrismaService.ride.count.mockResolvedValue(0);
      mockPrismaService.ride.findMany.mockResolvedValue([]);
      mockPrismaService.review.findMany.mockResolvedValue([]);
      mockPrismaService.rideStatistic.findFirst.mockResolvedValue(null);
      mockPrismaService.rideStatistic.create.mockResolvedValue(mockStatistic);
      mockPrismaService.rideStatistic.update.mockResolvedValue(mockStatistic);

      const result = await service.recalculateDriverStatistics(driverId);

      expect(result.completedRides).toBe(0);
      expect(result.revenue).toBe(0);
      expect(result.averageRating).toBe(0);
    });
  });

  describe('updateDriverStatistics', () => {
    it('should update existing statistics', async () => {
      const driverId = 'driver-1';
      const existingStats = {
        id: 'stat-1',
        driverId,
        completedRides: 50,
        revenue: 250000,
        averageRating: 4.5,
        totalReviews: 40,
        motivationScore: 75,
      };
      const updatedStats = {
        ...existingStats,
        completedRides: 51,
        revenue: 255000,
      };

      mockPrismaService.rideStatistic.findFirst.mockResolvedValue(existingStats);
      mockPrismaService.rideStatistic.update.mockResolvedValue(updatedStats);

      const result = await service.updateDriverStatistics(driverId, {
        completedRides: 51,
        revenue: 255000,
      });

      expect(result.completedRides).toBe(51);
      expect(result.revenue).toBe(255000);
      expect(mockPrismaService.rideStatistic.update).toHaveBeenCalled();
    });

    it('should create statistics if they do not exist', async () => {
      const driverId = 'new-driver';
      const newStats = {
        id: 'stat-1',
        driverId,
        completedRides: 1,
        revenue: 5000,
        averageRating: 0,
        totalReviews: 0,
        motivationScore: 0,
      };

      mockPrismaService.rideStatistic.findFirst.mockResolvedValue(null);
      mockPrismaService.rideStatistic.create.mockResolvedValue(newStats);
      mockPrismaService.rideStatistic.update.mockResolvedValue(newStats);

      const result = await service.updateDriverStatistics(driverId, {
        completedRides: 1,
        revenue: 5000,
      });

      expect(result.completedRides).toBe(1);
      expect(mockPrismaService.rideStatistic.create).toHaveBeenCalled();
    });
  });
});
