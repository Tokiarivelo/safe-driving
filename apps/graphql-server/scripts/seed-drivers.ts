#!/usr/bin/env ts-node
/**
 * Seed Drivers Script
 *
 * Generate and optionally persist random driver positions for testing purposes.
 *
 * Usage:
 *   npm run seed:drivers -- --count=50 --lat=48.8566 --lng=2.3522 --radiusMeters=1500 --persist=true
 *
 * Options:
 *   --count         Number of drivers to generate (default: 50)
 *   --lat           Center latitude (default: 48.8566 - Paris)
 *   --lng           Center longitude (default: 2.3522 - Paris)
 *   --radiusMeters  Radius in meters (default: 1500)
 *   --persist       Whether to save to Redis (default: false)
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app/app.module';
import { DriversService } from '../src/drivers/drivers.service';
import { generateRandomDriversAround } from '../src/drivers/drivers.utils';

interface SeedOptions {
  count: number;
  lat: number;
  lng: number;
  radiusMeters: number;
  persist: boolean;
}

function parseArgs(): SeedOptions {
  const args = process.argv.slice(2);
  const options: SeedOptions = {
    count: 50,
    lat: 48.8566, // Paris
    lng: 2.3522, // Paris
    radiusMeters: 1500,
    persist: false,
  };

  args.forEach((arg) => {
    const [key, value] = arg.split('=');
    const normalizedKey = key.replace('--', '');

    switch (normalizedKey) {
      case 'count':
        options.count = parseInt(value, 10);
        break;
      case 'lat':
        options.lat = parseFloat(value);
        break;
      case 'lng':
        options.lng = parseFloat(value);
        break;
      case 'radiusMeters':
        options.radiusMeters = parseInt(value, 10);
        break;
      case 'persist':
        options.persist = value.toLowerCase() === 'true';
        break;
    }
  });

  return options;
}

async function seed() {
  const options = parseArgs();

  console.log('🌱 Seeding drivers with options:');
  console.log(`   Count: ${options.count}`);
  console.log(`   Center: (${options.lat}, ${options.lng})`);
  console.log(`   Radius: ${options.radiusMeters}m`);
  console.log(`   Persist: ${options.persist}`);
  console.log('');

  // Generate random drivers
  const drivers = generateRandomDriversAround(
    options.lat,
    options.lng,
    options.radiusMeters,
    options.count,
  );

  if (options.persist) {
    console.log('💾 Persisting drivers to Redis...');

    try {
      // Bootstrap NestJS app to get access to DriversService
      const app = await NestFactory.createApplicationContext(AppModule);
      const driversService = app.get(DriversService);

      // Convert drivers to the format expected by saveDrivers
      const cars = drivers.map((driver, index) => ({
        id: index + 1,
        coords: [driver.lat, driver.lng],
        name: driver.name,
        vehicle: driver.vehicle,
        status: driver.status,
      }));

      // Save to Redis
      await driversService.saveDrivers(cars);

      console.log(`✅ Successfully persisted ${drivers.length} drivers to Redis`);

      await app.close();
    } catch (error) {
      console.error('❌ Error persisting drivers:', error);
      process.exit(1);
    }
  } else {
    console.log('📋 Generated drivers (not persisted):');
    console.log(JSON.stringify(drivers, null, 2));
  }

  console.log('');
  console.log('✨ Done!');
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
