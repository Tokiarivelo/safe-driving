import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { RoleEnum } from 'src/dtos/enums/role.enum';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { VehicleTypeEnum } from '../dtos/enums/vehicleType.enum';
import { RideStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedRoles();
    // Uncomment to seed rides (for development only)
    // await this.seedMockRides();
  }

  async seedRoles() {
    const existingRoles = await this.prisma.role.findMany();
    const existingRoleNames = existingRoles.map((r) => r.name);

    for (const role of Object.values(RoleEnum)) {
      if (!existingRoleNames.includes(role)) {
        await this.prisma.role.create({
          data: { name: role },
        });
      }
    }

    console.log('✅ Roles seeded');

    for (const vehicleTypeName of Object.values(VehicleTypeEnum)) {
      await this.prisma.vehicleType.upsert({
        where: { name: vehicleTypeName },
        update: {},
        create: {
          name: vehicleTypeName,
        },
      });
    }

    console.log('✅ Vehicle types seeded.');
  }

  /**
   * Seed mock rides for development/testing
   */
  async seedMockRides() {
    this.logger.log('Seeding mock rides...');

    // Check if rides already exist
    const existingRides = await this.prisma.ride.count();
    if (existingRides > 0) {
      this.logger.log('Rides already exist, skipping seed');
      return;
    }

    // First, ensure we have users and drivers
    const driverRole = await this.prisma.role.findFirst({
      where: { name: RoleEnum.DRIVER },
    });
    const userRole = await this.prisma.role.findFirst({
      where: { name: RoleEnum.USER },
    });

    if (!driverRole || !userRole) {
      this.logger.warn('Roles not found, skipping ride seed');
      return;
    }

    // Create mock users if they don't exist
    const hashedPassword = await bcrypt.hash('password123', 10);

    const mockDriver = await this.prisma.user.upsert({
      where: { email: 'driver@example.com' },
      update: {},
      create: {
        email: 'driver@example.com',
        firstName: 'Maria',
        lastName: 'Maria',
        phone: '(+261) 34 30 303 03',
        password: hashedPassword,
        isVerified: true,
        Role: {
          connect: { id: driverRole.id },
        },
      },
    });

    const mockUser = await this.prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '(+261) 34 00 000 00',
        password: hashedPassword,
        isVerified: true,
        Role: {
          connect: { id: userRole.id },
        },
      },
    });

    // Get vehicle type
    const vehicleType = await this.prisma.vehicleType.findFirst({
      where: { name: 'Voiture' },
    });

    // Create mock driver vehicle if doesn't exist
    const driverVehicle = await this.prisma.driverVehicle.upsert({
      where: { registrationNumber: 'TAB-1234' },
      update: {},
      create: {
        userId: mockDriver.id,
        brand: 'Peugeot',
        model: '205',
        registrationNumber: 'TAB-1234',
        place: 4,
        vehicleTypeId: vehicleType?.id || '',
      },
    });

    // Mock ride data based on the UI mockup
    const mockRides = [
      {
        driverId: mockDriver.id,
        status: RideStatus.IN_PROGRESS,
        departureAddress: 'Anosy',
        departureLat: -18.9127,
        departureLng: 47.5209,
        arrivalAddress: 'Ambatoroaka',
        arrivalLat: -18.8866,
        arrivalLng: 47.5189,
        scheduledDeparture: new Date('2025-07-12T08:40:00'),
        price: 10000,
        currency: 'MGA',
        vehicleTypeId: vehicleType?.id,
        requiredSeats: 2,
        acceptsAnimals: false,
        acceptsBaggage: true,
        baggageDetails: 'valise, vélo',
        preferredLanguages: ['Malagasy', 'Française'],
        minDriverRating: 3,
        otherPreferences: 'Chauffeurs dynamique et cool et qui conduit prudemment',
      },
      {
        driverId: null,
        status: RideStatus.PENDING,
        departureAddress: 'Ankatso',
        departureLat: -18.9056,
        departureLng: 47.5006,
        arrivalAddress: 'Antsakaviro',
        arrivalLat: -18.8978,
        arrivalLng: 47.5189,
        scheduledDeparture: new Date('2025-07-12T14:00:00'),
        price: 15000,
        currency: 'MGA',
        vehicleTypeId: vehicleType?.id,
        requiredSeats: 2,
        acceptsAnimals: true,
        acceptsBaggage: true,
        preferredLanguages: ['Malagasy', 'Française'],
      },
      {
        driverId: mockDriver.id,
        status: RideStatus.COMPLETED,
        departureAddress: 'Anosy',
        departureLat: -18.9127,
        departureLng: 47.5209,
        arrivalAddress: 'Ankorondrano',
        arrivalLat: -18.8756,
        arrivalLng: 47.5256,
        scheduledDeparture: new Date('2025-07-12T12:00:00'),
        startedAt: new Date('2025-07-12T12:00:00'),
        finishedAt: new Date('2025-07-11T15:00:00'),
        price: 20000,
        currency: 'MGA',
        vehicleTypeId: vehicleType?.id,
        requiredSeats: 2,
        acceptsAnimals: true,
        acceptsBaggage: true,
        baggageDetails: 'valise, vélo',
        preferredLanguages: ['Malagasy', 'Française'],
        minDriverRating: 3,
        otherPreferences: 'Chauffeurs dynamique et cool et qui conduit prudemment',
      },
      {
        driverId: null,
        status: RideStatus.PENDING,
        departureAddress: 'Behoririka',
        departureLat: -18.8945,
        departureLng: 47.5245,
        arrivalAddress: 'Ankazomanga',
        arrivalLat: -18.8823,
        arrivalLng: 47.5134,
        scheduledDeparture: new Date('2025-07-12T15:00:00'),
        price: 8000,
        currency: 'MGA',
        vehicleTypeId: vehicleType?.id,
        requiredSeats: 1,
      },
      {
        driverId: null,
        status: RideStatus.CANCELLED,
        departureAddress: 'Ambodrona',
        departureLat: -18.9034,
        departureLng: 47.5167,
        arrivalAddress: 'Anosy',
        arrivalLat: -18.9127,
        arrivalLng: 47.5209,
        scheduledDeparture: new Date('2025-07-12T08:00:00'),
        price: 2000,
        currency: 'MGA',
        vehicleTypeId: vehicleType?.id,
        requiredSeats: 1,
      },
    ];

    // Create rides with participants
    for (const rideData of mockRides) {
      const ride = await this.prisma.ride.create({
        data: {
          ...rideData,
          RideParticipant: {
            create: [
              {
                userId: mockUser.id,
                role: 'PASSENGER',
              },
              ...(rideData.driverId
                ? [
                    {
                      userId: mockDriver.id,
                      role: 'DRIVER',
                    },
                  ]
                : []),
            ],
          },
        },
      });

      this.logger.log(`Created ride: ${ride.id}`);
    }

    this.logger.log('✅ Mock rides seeded');
  }
}
