#!/usr/bin/env ts-node
/**
 * Seed Drivers Script
 *
 * Generate and persist random driver positions to database for testing purposes.
 *
 * Usage:
 *   npm run seed:drivers -- --count=50 --lat=48.8566 --lng=2.3522 --radiusMeters=1500
 *
 * Options:
 *   --count         Number of drivers to generate (default: 50)
 *   --lat           Center latitude (default: 48.8566 - Paris)
 *   --lng           Center longitude (default: 2.3522 - Paris)
 *   --radiusMeters  Radius in meters (default: 1500)
 */

import { PrismaClient } from '@prisma/client';
import { generateRandomDriversAround } from '../src/drivers/drivers.utils';

interface SeedOptions {
  count: number;
  lat: number;
  lng: number;
  radiusMeters: number;
}

function parseArgs(): SeedOptions {
  const args = process.argv.slice(2);
  const options: SeedOptions = {
    count: 50,
    lat: 48.8566, // Paris
    lng: 2.3522, // Paris
    radiusMeters: 1500,
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
    }
  });

  return options;
}

async function seed() {
  const options = parseArgs();
  const prisma = new PrismaClient();

  console.log('🌱 Seeding drivers with options:');
  console.log(`   Count: ${options.count}`);
  console.log(`   Center: (${options.lat}, ${options.lng})`);
  console.log(`   Radius: ${options.radiusMeters}m`);
  console.log('');

  try {
    // Generate random drivers
    const drivers = generateRandomDriversAround(
      options.lat,
      options.lng,
      options.radiusMeters,
      options.count,
    );

    console.log('💾 Persisting drivers to database...');

    // Clear existing drivers
    await prisma.driver.deleteMany({});

    // Save drivers to database using Prisma
    const createPromises = drivers.map((driver) =>
      prisma.driver.create({
        data: {
          name: driver.name,
          vehicle: driver.vehicle,
          status: driver.status as any, // Will match UserDriverStatus enum
          rating: driver.rating,
          phone: driver.phone,
          nbPlaces: driver.nbPlaces,
          lat: driver.lat,
          lng: driver.lng,
        },
      }),
    );

    await Promise.all(createPromises);

    console.log(`✅ Successfully persisted ${drivers.length} drivers to database`);
  } catch (error) {
    console.error('❌ Error persisting drivers:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
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
