import { Injectable } from '@nestjs/common';
import { UserDriverStatus } from '@prisma/client';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '../prisma-module/prisma.service';
import { generateRandomDriversAround, randomPointAround } from './drivers.utils';
import { Driver, NearbyDriversResult } from './drivers.dto';

// Default rating for drivers without reviews
const DEFAULT_DRIVER_RATING = 4.2;
// Default phone placeholder when phone is not available
const DEFAULT_PHONE_PLACEHOLDER = '(+261) 34 ....';

@Injectable()
export class DriversService {
  constructor(
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
  ) {}

  async saveDrivers(cars: any[]) {
    const timestamp = Date.now();

    for (const car of cars) {
      const key = `driver:${car.id}`;

      // coords = [lat, lon] or (lat, lon)?
      const [lat, lon] = car.coords;

      // Store fields in hash
      await this.redis.hset(key, 'id', String(car.id));
      await this.redis.hset(key, 'lat', String(lat));
      await this.redis.hset(key, 'lon', String(lon));
      await this.redis.hset(key, 'timestamp', String(timestamp));

      // Expire after 30s
      await this.redis.getPublisher().expire(key, 30);

      // Also push into Redis GEO index for spatial queries
      await this.redis.getPublisher().geoadd(
        'drivers:geo',
        lon, // GEOADD expects lon first
        lat,
        String(car.id),
      );
    }

    // publish to socket subscribers
    await this.redis.publish('drivers:updates', {
      cars: cars.map((c) => ({ ...c, timestamp })),
    });

    return { message: 'Drivers saved successfully', cars };
  }

  /**
   * Get nearby drivers around a coordinate
   * Fetches users with DRIVER role from database and positions them randomly around the user's location
   */
  async getNearbyDrivers(
    lat: number,
    lng: number,
    radiusMeters: number = 1500,
    limit: number = 50,
    mock: boolean = false,
  ): Promise<NearbyDriversResult> {
    let drivers: Driver[] = [];

    if (!mock) {
      try {
        // Fetch users with DRIVER role from database
        const driverUsers = await this.prisma.user.findMany({
          where: {
            Role: {
              some: {
                name: 'DRIVER',
              },
            },
            driverStatus: {
              in: [UserDriverStatus.AVAILABLE, UserDriverStatus.BUSY],
            },
          },
          include: {
            vehicles: {
              include: {
                type: true,
              },
              take: 1,
            },
          },
          take: limit,
        });

        if (driverUsers && driverUsers.length > 0) {
          // Position each driver randomly around the user's location
          drivers = driverUsers.map((user) => {
            const position = randomPointAround(lat, lng, radiusMeters);
            const vehicle = user.vehicles[0];
            const fullName = user.lastName 
              ? `${user.firstName} ${user.lastName}` 
              : user.firstName;
            return {
              id: user.id,
              name: fullName,
              vehicle: vehicle?.type?.name || 'Sedan',
              lat: position.lat,
              lng: position.lng,
              status: user.driverStatus || UserDriverStatus.AVAILABLE,
              rating: DEFAULT_DRIVER_RATING,
              phone: user.phone || DEFAULT_PHONE_PLACEHOLDER,
              nbPlaces: vehicle?.place || 4,
            };
          });
        }
      } catch (error) {
        console.error('Error querying database for drivers:', error);
        // Fall through to mock data if database query fails
      }
    }

    // If mock is true or no drivers found, generate random drivers
    if (mock || drivers.length === 0) {
      const randomDrivers = generateRandomDriversAround(lat, lng, radiusMeters, limit);
      drivers = randomDrivers.map((d) => ({
        id: d.id,
        name: d.name,
        vehicle: d.vehicle,
        lat: d.lat,
        lng: d.lng,
        status: d.status,
        rating: d.rating,
        phone: d.phone,
        nbPlaces: d.nbPlaces,
      }));
    }

    return {
      count: drivers.length,
      drivers,
    };
  }
}
