import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { generateRandomDriversAround } from './drivers.utils';
import { Driver, NearbyDriversResult } from './drivers.dto';

@Injectable()
export class DriversService {
  constructor(private readonly redis: RedisService) {}

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
   * If mock is true or no real drivers exist, returns randomly generated drivers
   * Otherwise, queries Redis for real drivers within the radius
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
        // Query Redis for nearby drivers using GEORADIUS
        const nearbyKeys = await this.redis
          .getPublisher()
          .georadius(
            'drivers:geo',
            lng,
            lat,
            radiusMeters,
            'm',
            'WITHDIST',
            'COUNT',
            limit,
          );

        if (nearbyKeys && nearbyKeys.length > 0) {
          // Fetch driver details from Redis hashes
          for (const item of nearbyKeys as any[]) {
            const driverId = item[0];
            const key = `driver:${driverId}`;
            const driverData = await this.redis.hgetall(key);

            if (driverData && driverData.lat && driverData.lon) {
              drivers.push({
                id: driverData.id || driverId,
                name: driverData.name || `Driver ${driverId}`,
                vehicle: driverData.vehicle || 'Sedan',
                lat: parseFloat(driverData.lat),
                lng: parseFloat(driverData.lon),
                status: driverData.status || 'AVAILABLE',
                rating: driverData.rating ? parseFloat(driverData.rating) : 4.2,
                phone: driverData.phone || '(+261) 34 ....',
                nbPlaces: driverData.nbPlaces ? parseInt(driverData.nbPlaces) : 4,
              });
            }
          }
        }
      } catch (error) {
        console.error('Error querying Redis for drivers:', error);
        // Fall through to mock data if Redis query fails
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
