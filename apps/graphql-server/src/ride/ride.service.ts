import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import {
  CreateRideInput,
  UpdateRideInput,
  AddRideParticipantInput,
  RemoveRideParticipantInput,
  RideFilterInput,
} from 'src/dtos/drivers/ride.input';
import {
  RideWithDetails,
  UserRidesResponse,
  RidePayload,
  RideParticipantPayload,
} from 'src/dtos/drivers/ride.output';
import { Ride, RideParticipant } from 'src/dtos/@generated';

@Injectable()
export class RideService {
  private readonly logger = new Logger(RideService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * Créer une nouvelle course
   */
  async createRide(userId: string, input: CreateRideInput): Promise<Ride> {
    this.logger.log(`Creating ride for user ${userId}`);

    const ride = await this.prisma.ride.create({
      data: {
        driverId: input.driverId || null,
        status: input.status || 'PENDING',
        // Location fields
        departureAddress: input.departureAddress,
        departureLat: input.departureLat,
        departureLng: input.departureLng,
        arrivalAddress: input.arrivalAddress,
        arrivalLat: input.arrivalLat,
        arrivalLng: input.arrivalLng,
        // Scheduling
        scheduledDeparture: input.scheduledDeparture
          ? new Date(input.scheduledDeparture)
          : null,
        // Pricing
        price: input.price,
        currency: input.currency || 'MGA',
        // Vehicle requirements
        vehicleTypeId: input.vehicleTypeId,
        requiredSeats: input.requiredSeats || 1,
        // Preferences
        acceptsAnimals: input.acceptsAnimals ?? false,
        acceptsBaggage: input.acceptsBaggage ?? true,
        baggageDetails: input.baggageDetails,
        otherPreferences: input.otherPreferences,
        minDriverRating: input.minDriverRating,
        preferredLanguages: input.preferredLanguages || [],
        RideParticipant: {
          create: input.participantIds.map((participantId) => ({
            userId: participantId,
            role:
              participantId === (input.driverId || userId)
                ? 'DRIVER'
                : 'PASSENGER',
          })),
        },
      },
      include: {
        Driver: true,
        vehicleType: true,
        RideParticipant: {
          include: { user: true },
        },
      },
    });

    // Publier l'événement
    await this.publishRideEvent({
      action: 'CREATED',
      ride,
    });

    return ride;
  }

  /**
   * Récupérer une course par ID
   */
  async getRideById(rideId: string, userId: string): Promise<RideWithDetails> {
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: {
        Driver: {
          include: {
            avatar: true,
            vehicles: {
              include: {
                type: true,
              },
            },
            review: true,
          },
        },
        vehicleType: true,
        RideParticipant: {
          include: {
            user: {
              include: {
                avatar: true,
              },
            },
          },
        },
        Message: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: {
            RideParticipant: true,
            Message: true,
          },
        },
      },
    });

    if (!ride) {
      throw new NotFoundException(`Ride ${rideId} not found`);
    }

    // Vérifier que l'utilisateur est participant ou admin
    const isParticipant = ride.RideParticipant.some((p) => p.userId === userId);
    if (!isParticipant) {
      throw new ForbiddenException('You are not a participant of this ride');
    }

    return {
      ...ride,
      participantCount: ride._count.RideParticipant,
      messageCount: ride._count.Message,
    };
  }

  /**
   * Récupérer toutes les courses d'un utilisateur avec pagination
   */
  async getUserRides(
    userId: string,
    limit: number = 20,
    cursor?: string,
    filter?: RideFilterInput,
  ): Promise<UserRidesResponse> {
    const where: any = {
      RideParticipant: {
        some: {
          userId,
        },
      },
    };

    if (filter?.status) {
      where.status = filter.status;
    }

    if (filter?.driverId) {
      where.driverId = filter.driverId;
    }

    const rides = await this.prisma.ride.findMany({
      where,
      include: {
        Driver: {
          include: {
            avatar: true,
            vehicles: {
              include: {
                type: true,
              },
            },
            review: true,
          },
        },
        vehicleType: true,
        RideParticipant: {
          include: {
            user: {
              include: {
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            RideParticipant: true,
            Message: true,
          },
        },
      },
      orderBy: { scheduledDeparture: 'desc' },
      take: limit + 1,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
    });

    const hasMore = rides.length > limit;
    const ridesPage = hasMore ? rides.slice(0, -1) : rides;
    const nextCursor = hasMore ? ridesPage[ridesPage.length - 1]?.id : null;

    const ridesWithDetails: RideWithDetails[] = ridesPage.map((ride) => ({
      ...ride,
      participantCount: ride._count.RideParticipant,
      messageCount: ride._count.Message,
    }));

    return {
      rides: ridesWithDetails,
      nextCursor,
      hasMore,
    };
  }

  /**
   * Mettre à jour une course
   */
  async updateRide(
    rideId: string,
    userId: string,
    input: UpdateRideInput,
  ): Promise<Ride> {
    // Vérifier que l'utilisateur est le conducteur ou un participant
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: {
        Driver: true,
        RideParticipant: true,
      },
    });

    if (!ride) {
      throw new NotFoundException(`Ride ${rideId} not found`);
    }

    const isParticipant = ride.RideParticipant.some((p) => p.userId === userId);
    if (ride.driverId !== userId && !isParticipant) {
      throw new ForbiddenException('Only the driver or a participant can update the ride');
    }

    const updatedRide = await this.prisma.ride.update({
      where: { id: rideId },
      data: {
        ...(input.status && { status: input.status }),
        ...(input.startedAt && { startedAt: new Date(input.startedAt) }),
        ...(input.finishedAt && { finishedAt: new Date(input.finishedAt) }),
        ...(input.departureAddress !== undefined && { departureAddress: input.departureAddress }),
        ...(input.departureLat !== undefined && { departureLat: input.departureLat }),
        ...(input.departureLng !== undefined && { departureLng: input.departureLng }),
        ...(input.arrivalAddress !== undefined && { arrivalAddress: input.arrivalAddress }),
        ...(input.arrivalLat !== undefined && { arrivalLat: input.arrivalLat }),
        ...(input.arrivalLng !== undefined && { arrivalLng: input.arrivalLng }),
        ...(input.scheduledDeparture && { scheduledDeparture: new Date(input.scheduledDeparture) }),
        ...(input.price !== undefined && { price: input.price }),
        ...(input.currency !== undefined && { currency: input.currency }),
        ...(input.acceptsAnimals !== undefined && { acceptsAnimals: input.acceptsAnimals }),
        ...(input.acceptsBaggage !== undefined && { acceptsBaggage: input.acceptsBaggage }),
        ...(input.baggageDetails !== undefined && { baggageDetails: input.baggageDetails }),
        ...(input.otherPreferences !== undefined && { otherPreferences: input.otherPreferences }),
      },
      include: {
        Driver: {
          include: {
            avatar: true,
            vehicles: {
              include: {
                type: true,
              },
            },
          },
        },
        vehicleType: true,
        RideParticipant: {
          include: {
            user: {
              include: {
                avatar: true,
              },
            },
          },
        },
      },
    });

    // Publier l'événement
    await this.publishRideEvent({
      action: 'UPDATED',
      ride: updatedRide,
    });

    return updatedRide;
  }

  /**
   * Supprimer une course
   */
  async deleteRide(rideId: string, userId: string): Promise<Ride> {
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: {
        Driver: true,
        RideParticipant: true,
      },
    });

    if (!ride) {
      throw new NotFoundException(`Ride ${rideId} not found`);
    }

    if (ride.driverId !== userId) {
      throw new ForbiddenException('Only the driver can delete the ride');
    }

    const deletedRide = await this.prisma.ride.delete({
      where: { id: rideId },
      include: {
        Driver: true,
        RideParticipant: {
          include: { user: true },
        },
      },
    });

    // Publier l'événement
    await this.publishRideEvent({
      action: 'DELETED',
      ride: deletedRide,
    });

    return deletedRide;
  }

  /**
   * Ajouter un participant à une course
   */
  async addParticipant(
    input: AddRideParticipantInput,
    userId: string,
  ): Promise<RideParticipant> {
    // Vérifier que l'utilisateur est le conducteur
    const ride = await this.prisma.ride.findUnique({
      where: { id: input.rideId },
    });

    if (!ride) {
      throw new NotFoundException(`Ride ${input.rideId} not found`);
    }

    if (ride.driverId !== userId) {
      throw new ForbiddenException('Only the driver can add participants');
    }

    // Vérifier que le participant n'est pas déjà dans la course
    const existing = await this.prisma.rideParticipant.findUnique({
      where: {
        rideId_userId: {
          rideId: input.rideId,
          userId: input.userId,
        },
      },
    });

    if (existing) {
      throw new ForbiddenException('User is already a participant');
    }

    const participant = await this.prisma.rideParticipant.create({
      data: {
        rideId: input.rideId,
        userId: input.userId,
        role: input.role,
      },
      include: {
        user: true,
        ride: true,
      },
    });

    // Publier l'événement
    await this.publishParticipantEvent({
      action: 'ADDED',
      participant,
      rideId: input.rideId,
    });

    return participant;
  }

  /**
   * Retirer un participant d'une course
   */
  async removeParticipant(
    input: RemoveRideParticipantInput,
    userId: string,
  ): Promise<RideParticipant> {
    // Vérifier que l'utilisateur est le conducteur ou le participant lui-même
    const ride = await this.prisma.ride.findUnique({
      where: { id: input.rideId },
    });

    if (!ride) {
      throw new NotFoundException(`Ride ${input.rideId} not found`);
    }

    if (ride.driverId !== userId && input.userId !== userId) {
      throw new ForbiddenException(
        'Only the driver or the participant can remove themselves',
      );
    }

    const participant = await this.prisma.rideParticipant.delete({
      where: {
        rideId_userId: {
          rideId: input.rideId,
          userId: input.userId,
        },
      },
      include: {
        user: true,
        ride: true,
      },
    });

    // Publier l'événement
    await this.publishParticipantEvent({
      action: 'REMOVED',
      participant,
      rideId: input.rideId,
    });

    return participant;
  }

  /**
   * Publier un événement de ride via Redis
   */
  private async publishRideEvent(payload: RidePayload) {
    const channelName = `ride_${payload.ride.id}`;
    await this.redisService.getPubSub().publish('rideUpdated', payload);
    await this.redisService.getPubSub().publish(channelName, payload);
    this.logger.log(`Published ride event to ${channelName}`, {
      action: payload.action,
    });
  }

  /**
   * Publier un événement de participant via Redis
   */
  private async publishParticipantEvent(payload: RideParticipantPayload) {
    const channelName = `ride_${payload.rideId}`;
    await this.redisService.getPubSub().publish('participantUpdated', payload);
    await this.redisService.getPubSub().publish(channelName, payload);
    this.logger.log(`Published participant event to ${channelName}`, {
      action: payload.action,
    });
  }
}
