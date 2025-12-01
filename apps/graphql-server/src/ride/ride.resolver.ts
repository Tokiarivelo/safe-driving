import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GraphqlWsJwtGuard } from 'src/auth/guards/graphql-ws-jwt.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Ride, RideParticipant, User, RideStatus } from 'src/dtos/@generated';
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
  MockRidesResponse,
} from 'src/dtos/drivers/ride.output';
import { RideSearchResponse } from 'src/dtos/drivers/ride-search.output';
import { RideService } from './ride.service';
import { RideSearchService } from './ride-search.service';
import { RedisService } from 'src/redis/redis.service';

@Resolver(() => Ride)
export class RideResolver {
  constructor(
    private rideService: RideService,
    private rideSearchService: RideSearchService,
    private redisService: RedisService,
  ) {}

  // QUERIES

  @UseGuards(JwtAuthGuard)
  @Query(() => UserRidesResponse)
  async userRides(
    @CurrentUser() user: User,
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit: number,
    @Args('cursor', { nullable: true }) cursor?: string,
    @Args('filter', { nullable: true }) filter?: RideFilterInput,
  ): Promise<UserRidesResponse> {
    return this.rideService.getUserRides(user.id, limit, cursor, filter);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => RideWithDetails)
  async ride(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<RideWithDetails> {
    return this.rideService.getRideById(id, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => RideSearchResponse)
  async searchRides(
    @CurrentUser() user: User,
    @Args('q', { nullable: true }) q: string | null,
    @Args('status', { nullable: true }) status?: string,
    @Args('page', { type: () => Int, defaultValue: 0 }) page?: number,
    @Args('size', { type: () => Int, defaultValue: 20 }) size?: number,
  ): Promise<RideSearchResponse> {
    return this.rideSearchService.searchRides(q, {
      page,
      size,
      status,
      userId: user.id, // ✅ Sécurité: ne rechercher que les rides de l'utilisateur
    });
  }

  /**
   * Mock rides query for frontend development (no authentication required)
   */
  @Query(() => MockRidesResponse)
  async mockRides(
    @Args('status', { nullable: true }) status?: string,
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit?: number,
  ): Promise<MockRidesResponse> {
    // Mock data based on the UI mockup
    const mockRides = [
      {
        id: '1',
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
        vehicleType: 'Voiture',
        requiredSeats: 2,
        acceptsAnimals: false,
        acceptsBaggage: true,
        baggageDetails: 'valise, vélo',
        preferredLanguages: ['Malagasy', 'Française'],
        minDriverRating: 3,
        otherPreferences: 'Chauffeurs dynamique et cool et qui conduit prudemment',
        driver: {
          id: 'd1',
          firstName: 'John',
          lastName: 'Doe',
          phone: '(+261) 34 30 303 03',
          avatarUrl: null,
          rating: 4.2,
        },
        passengers: [
          {
            id: 'u1',
            firstName: 'Marie',
            lastName: 'Martin',
            avatarUrl: null,
          },
        ],
        vehicle: {
          brand: 'Peugeot',
          model: '205',
          seats: 4,
          type: 'Voiture',
        },
        createdAt: new Date(),
      },
      {
        id: '2',
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
        vehicleType: 'Voiture',
        requiredSeats: 2,
        acceptsAnimals: true,
        acceptsBaggage: true,
        preferredLanguages: ['Malagasy', 'Française'],
        driver: null,
        passengers: [
          {
            id: 'u2',
            firstName: 'Doe',
            lastName: '',
            avatarUrl: null,
          },
        ],
        vehicle: null,
        createdAt: new Date(),
      },
      {
        id: '3',
        status: RideStatus.COMPLETED,
        departureAddress: 'Anosy',
        departureLat: -18.9127,
        departureLng: 47.5209,
        arrivalAddress: 'Ankorondrano',
        arrivalLat: -18.8756,
        arrivalLng: 47.5256,
        scheduledDeparture: new Date('2025-07-12T12:00:00'),
        finishedAt: new Date('2025-07-11T15:00:00'),
        price: 20000,
        currency: 'MGA',
        vehicleType: 'Voiture',
        requiredSeats: 2,
        acceptsAnimals: true,
        acceptsBaggage: true,
        baggageDetails: 'valise, vélo',
        preferredLanguages: ['Malagasy', 'Française'],
        minDriverRating: 3,
        otherPreferences: 'Chauffeurs dynamique et cool et qui conduit prudemment',
        driver: {
          id: 'd2',
          firstName: 'Maria',
          lastName: 'Maria',
          phone: '(+261) 34 30 303 03',
          avatarUrl: null,
          rating: 4.2,
        },
        passengers: [
          {
            id: 'u1',
            firstName: 'Marie',
            lastName: 'Martin',
            avatarUrl: null,
          },
        ],
        vehicle: {
          brand: 'Peugeot',
          model: '205',
          seats: 4,
          type: 'Voiture',
        },
        createdAt: new Date(),
      },
      {
        id: '4',
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
        vehicleType: 'Voiture',
        requiredSeats: 1,
        acceptsAnimals: false,
        acceptsBaggage: true,
        driver: null,
        passengers: [],
        vehicle: null,
        createdAt: new Date(),
      },
      {
        id: '5',
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
        vehicleType: 'Voiture',
        requiredSeats: 1,
        acceptsAnimals: false,
        acceptsBaggage: false,
        driver: null,
        passengers: [],
        vehicle: null,
        createdAt: new Date(),
      },
    ];

    // Filter by status if provided
    let filteredRides = mockRides;
    if (status) {
      filteredRides = mockRides.filter(
        (r) => r.status === status.toUpperCase(),
      );
    }

    return {
      rides: filteredRides.slice(0, limit),
      total: filteredRides.length,
      hasMore: filteredRides.length > (limit || 20),
    };
  }

  // MUTATIONS

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Ride)
  async createRide(
    @Args('input') input: CreateRideInput,
    @CurrentUser() user: User,
  ): Promise<Ride> {
    const ride = await this.rideService.createRide(user.id, input);

    // Indexer dans Elasticsearch
    await this.rideSearchService.indexRide(ride.id, { refresh: true });

    return ride;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Ride)
  async updateRide(
    @Args('rideId') rideId: string,
    @Args('input') input: UpdateRideInput,
    @CurrentUser() user: User,
  ): Promise<Ride> {
    const ride = await this.rideService.updateRide(rideId, user.id, input);

    // Mettre à jour dans Elasticsearch
    await this.rideSearchService.indexRide(ride.id, { refresh: true });

    return ride;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Ride)
  async deleteRide(
    @Args('rideId') rideId: string,
    @CurrentUser() user: User,
  ): Promise<Ride> {
    const ride = await this.rideService.deleteRide(rideId, user.id);

    // Supprimer de Elasticsearch
    await this.rideSearchService.deleteOne('rides', rideId);

    return ride;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => RideParticipant)
  async addRideParticipant(
    @Args('input') input: AddRideParticipantInput,
    @CurrentUser() user: User,
  ): Promise<RideParticipant> {
    const participant = await this.rideService.addParticipant(input, user.id);

    // Mettre à jour dans Elasticsearch
    await this.rideSearchService.indexRide(input.rideId, { refresh: true });

    return participant;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => RideParticipant)
  async removeRideParticipant(
    @Args('input') input: RemoveRideParticipantInput,
    @CurrentUser() user: User,
  ): Promise<RideParticipant> {
    const participant = await this.rideService.removeParticipant(
      input,
      user.id,
    );

    // Mettre à jour dans Elasticsearch
    await this.rideSearchService.indexRide(input.rideId, { refresh: true });

    return participant;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async recreateAndBulkRides() {
    await this.rideSearchService.recreateAndBulkIndex();
    return true;
  }

  // SUBSCRIPTIONS

  @UseGuards(GraphqlWsJwtGuard)
  @Subscription(() => RidePayload, {
    filter: (payload, variables, context) => {
      // Filtrer pour envoyer uniquement aux participants de la course
      const userId = context.req.user?.id;
      if (!userId) return false;

      const ride = payload.rideUpdated.ride;
      return ride.RideParticipant?.some((p) => p.userId === userId) || false;
    },
  })
  rideUpdated(@CurrentUser() user: User) {
    return this.redisService.getPubSub().asyncIterator('rideUpdated');
  }

  @UseGuards(GraphqlWsJwtGuard)
  @Subscription(() => RideParticipantPayload, {
    filter: (payload, variables) => {
      // Filtrer par ID de course
      return payload.participantUpdated.rideId === variables.rideId;
    },
  })
  participantUpdated(@Args('rideId') rideId: string) {
    return this.redisService.getPubSub().asyncIterator('participantUpdated');
  }
}
