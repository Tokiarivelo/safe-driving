#!/usr/bin/env ts-node
/**
 * Seed Drivers Script
 *
 * Generate and persist driver users to database for testing purposes.
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
import * as bcrypt from 'bcrypt';

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
    // Generate random driver data
    const drivers = generateRandomDriversAround(
      options.lat,
      options.lng,
      options.radiusMeters,
      options.count,
    );

    console.log('💾 Persisting drivers to database...');

    // Get or create DRIVER role
    const driverRole = await prisma.role.upsert({
      where: { name: 'DRIVER' },
      update: {},
      create: { name: 'DRIVER' },
    });

    // Hash a default password for all test drivers
    const defaultPassword = await bcrypt.hash('driver123', 10);

    // Create users with DRIVER role
    let createdCount = 0;
    for (const driver of drivers) {
      const [firstName, lastName] = driver.name.split(' ');
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@driver.test`;
      const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${Date.now()}_${createdCount}`;

      try {
        await prisma.user.create({
          data: {
            email,
            firstName,
            lastName,
            phone: driver.phone,
            username,
            password: defaultPassword,
            isVerified: true,
            driverStatus: driver.status as any,
            Role: {
              connect: { id: driverRole.id },
            },
          },
        });
        createdCount++;
      } catch (error) {
        // Skip if user already exists
        console.log(`Skipping duplicate user: ${email}`);
      }
    }

    console.log(`✅ Successfully created ${createdCount} driver users in database`);
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
