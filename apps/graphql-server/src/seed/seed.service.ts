import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { RoleEnum } from 'src/dtos/enums/role.enum';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { VehicleTypeEnum } from '../dtos/enums/vehicleType.enum';
import { RideStatus, NotificationType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedRoles();
    // Seed FAQs
    await this.seedFaqs();
    // Uncomment to seed rides (for development only)
    await this.seedMockRides();
    // Seed notifications for development
    await this.seedMockNotifications();
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

    const mockUser = await this.prisma.user.findFirst({
      where: { email: 'test@email.com' },
    });

    if (!mockUser) {
      this.logger.warn('User not found, skipping ride seed');
      return;
    }

    // Get vehicle type
    const vehicleType = await this.prisma.vehicleType.findFirst();

    console.log('vehicleType :>> ', vehicleType?.id);

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
        otherPreferences:
          'Chauffeurs dynamique et cool et qui conduit prudemment',
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
        otherPreferences:
          'Chauffeurs dynamique et cool et qui conduit prudemment',
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

  /**
   * Seed mock notifications for development/testing
   * Based on the UI design with various notification types
   */
  async seedMockNotifications() {
    this.logger.log('Seeding mock notifications...');

    // Check if notifications already exist
    const existingNotifications = await this.prisma.notification.count();
    if (existingNotifications > 0) {
      this.logger.log('Notifications already exist, skipping seed');
      return;
    }

    // Get a user to receive notifications
    const mockUser = await this.prisma.user.findFirst({
      where: { email: 'test@email.com' },
    });

    if (!mockUser) {
      this.logger.warn('User not found, skipping notification seed');
      return;
    }

    // Get a driver to be the sender of some notifications
    const mockDriver = await this.prisma.user.findFirst({
      where: { email: 'driver@example.com' },
    });

    // Get a ride to link some notifications to
    const mockRide = await this.prisma.ride.findFirst();

    // Base date for notifications (today)
    const baseDate = new Date('2025-07-19T07:40:00');

    // Mock notification data based on the UI design
    const mockNotifications = [
      {
        userId: mockUser.id,
        type: NotificationType.RIDE_CONFIRMED,
        title: 'Course confirmée',
        message:
          'Andry Rakoto a confirmé votre réservation de Anosy à Ankorondrano pour le 20/07/2025 à 14h30',
        read: false,
        senderId: mockDriver?.id,
        rideId: mockRide?.id,
        createdAt: baseDate,
        metadata: {
          departure: 'Anosy',
          arrival: 'Ankorondrano',
          scheduledDate: '20/07/2025',
          scheduledTime: '14h30',
        },
      },
      {
        userId: mockUser.id,
        type: NotificationType.DRIVER_EN_ROUTE,
        title: 'Chauffeur en route',
        message:
          'Andry Rakoto se dirige vers vous, arrivée estimée dans 3 min.',
        read: false,
        senderId: mockDriver?.id,
        rideId: mockRide?.id,
        createdAt: baseDate,
        metadata: {
          estimatedArrival: '3 min',
          driverName: 'Andry Rakoto',
        },
      },
      {
        userId: mockUser.id,
        type: NotificationType.DRIVER_ARRIVED,
        title: 'Chauffeur arrivé',
        message: "Andry Rakoto est à l'emplacement indiqué. Bon trajet !",
        read: false,
        senderId: mockDriver?.id,
        rideId: mockRide?.id,
        createdAt: baseDate,
        metadata: {
          driverName: 'Andry Rakoto',
        },
      },
      {
        userId: mockUser.id,
        type: NotificationType.RIDE_STARTED,
        title: 'Course démarrée',
        message: 'Votre course pour Gare Soarano a débuté à 14h07.',
        read: true,
        rideId: mockRide?.id,
        createdAt: baseDate,
        metadata: {
          destination: 'Gare Soarano',
          startTime: '14h07',
        },
      },
      {
        userId: mockUser.id,
        type: NotificationType.RIDE_COMPLETED,
        title: 'Course terminée',
        message: 'Course terminée : 4 800 Ar. Merci et à bientôt !',
        read: false,
        rideId: mockRide?.id,
        createdAt: baseDate,
        metadata: {
          price: 4800,
          currency: 'Ar',
        },
      },
      {
        userId: mockUser.id,
        type: NotificationType.NEW_MESSAGE,
        title: 'Nouveau message',
        message:
          'Message de Andry : "Je suis un peu en retard, j\'arrive dans 2 min....."',
        read: false,
        senderId: mockDriver?.id,
        createdAt: baseDate,
        metadata: {
          senderName: 'Andry',
          messagePreview: "Je suis un peu en retard, j'arrive dans 2 min.....",
        },
      },
      {
        userId: mockUser.id,
        type: NotificationType.MISSED_CALL,
        title: 'Appel manqué',
        message: 'Vous avez manqué un appel de Andry.',
        read: false,
        senderId: mockDriver?.id,
        createdAt: baseDate,
        metadata: {
          callerName: 'Andry',
        },
      },
      {
        userId: mockUser.id,
        type: NotificationType.PROMOTION,
        title: 'Offre & promotion',
        message:
          'Andry Rakoto a posté une course promotionnelle de Tanjombato à Ankorondrano pour 10.000MGA',
        read: false,
        senderId: mockDriver?.id,
        createdAt: baseDate,
        metadata: {
          departure: 'Tanjombato',
          arrival: 'Ankorondrano',
          promotionalPrice: 10000,
          currency: 'MGA',
        },
      },
      {
        userId: mockUser.id,
        type: NotificationType.RIDE_REMINDER,
        title: 'Rappel de course programmée',
        message:
          "Rappel : votre course de 18h pour l'aéroport commence dans 30 min.",
        read: false,
        rideId: mockRide?.id,
        createdAt: baseDate,
        metadata: {
          destination: "l'aéroport",
          scheduledTime: '18h',
          reminderBefore: '30 min',
        },
      },
      {
        userId: mockUser.id,
        type: NotificationType.REVIEW_REQUEST,
        title: 'Invitation à donner un avis',
        message: "Comment s'est passée votre course ? Laissez un avis à Andry.",
        read: false,
        senderId: mockDriver?.id,
        rideId: mockRide?.id,
        createdAt: baseDate,
        metadata: {
          driverName: 'Andry',
        },
      },
      {
        userId: mockUser.id,
        type: NotificationType.DRIVER_REVIEW,
        title: "Avis reçu du chauffeur sur l'utilisateur",
        message:
          'Nouveau avis de Andry Rakoto : ⭐ 5/5 - "Utilisateur très courtois et ponctuel."',
        read: false,
        senderId: mockDriver?.id,
        createdAt: baseDate,
        metadata: {
          reviewerName: 'Andry Rakoto',
          rating: 5,
          comment: 'Utilisateur très courtois et ponctuel.',
        },
      },
      {
        userId: mockUser.id,
        type: NotificationType.SECURITY_ALERT,
        title: 'Alerte de sécurité / incident',
        message:
          "Signalement : un message d'alerte a été envoyé au support. Nous vous tenons informé.",
        read: false,
        createdAt: baseDate,
        metadata: {
          alertType: 'support_contacted',
        },
      },
    ];

    // Create notifications
    for (const notificationData of mockNotifications) {
      await this.prisma.notification.create({
        data: notificationData,
      });
    }

    this.logger.log(
      `✅ Mock notifications seeded (${mockNotifications.length} notifications)`,
    );
  }

  /**
   * Seed FAQ data with multilingual support
   */
  async seedFaqs() {
    // Check if FAQs already exist
    const existingFaqs = await this.prisma.faq.count();
    if (existingFaqs > 0) {
      this.logger.log('⏭️  FAQs already seeded, skipping...');
      return;
    }

    const faqData = [
      {
        order: 1,
        translations: [
          {
            locale: 'fr',
            question: 'Comment réserver une course ?',
            answer:
              "Ouvre l'app, saisis ta destination, choisis ton type de véhicule, puis confirme la réservation.",
          },
          {
            locale: 'en',
            question: 'How to book a ride?',
            answer:
              'Open the app, enter your destination, choose your vehicle type, then confirm the booking.',
          },
        ],
      },
      {
        order: 2,
        translations: [
          {
            locale: 'fr',
            question: 'Comment annuler une course ?',
            answer:
              "Depuis l'écran de suivi de course, appuie sur « Annuler la course ». Des frais peuvent s'appliquer selon le délai.",
          },
          {
            locale: 'en',
            question: 'How to cancel a ride?',
            answer:
              "From the ride tracking screen, tap 'Cancel ride'. Fees may apply depending on the delay.",
          },
        ],
      },
      {
        order: 3,
        translations: [
          {
            locale: 'fr',
            question: 'Quels modes de paiement sont disponibles ?',
            answer:
              'Nous acceptons les cartes bancaires, les portefeuilles mobiles et les paiements en espèces.',
          },
          {
            locale: 'en',
            question: 'What payment methods are available?',
            answer:
              'We accept credit cards, mobile wallets, and cash payments.',
          },
        ],
      },
      {
        order: 4,
        translations: [
          {
            locale: 'fr',
            question: 'Comment puis-je partager mon trajet avec un proche ?',
            answer:
              'Utilise la fonction de partage de trajet dans l'écran de course en cours pour envoyer ta position en temps réel.',
          },
          {
            locale: 'en',
            question: 'How can I share my trip with someone?',
            answer:
              'Use the trip sharing feature in the ongoing ride screen to send your real-time location.',
          },
        ],
      },
      {
        order: 5,
        translations: [
          {
            locale: 'fr',
            question: 'Que faire si le chauffeur est en retard ?',
            answer:
              "Tu peux contacter directement le chauffeur via l'app ou annuler la course si le délai dépasse 10 minutes.",
          },
          {
            locale: 'en',
            question: 'What to do if the driver is late?',
            answer:
              'You can contact the driver directly via the app or cancel the ride if the delay exceeds 10 minutes.',
          },
        ],
      },
    ];

    // Create FAQs with translations
    for (const faq of faqData) {
      await this.prisma.faq.create({
        data: {
          order: faq.order,
          isActive: true,
          translations: {
            create: faq.translations,
          },
        },
      });
    }

    this.logger.log(`✅ FAQs seeded (${faqData.length} FAQs with translations)`);
  }
}
