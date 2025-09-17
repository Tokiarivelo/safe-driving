import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

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
}
