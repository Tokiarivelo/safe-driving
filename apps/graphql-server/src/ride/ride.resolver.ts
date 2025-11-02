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
import { Ride, RideParticipant, User } from 'src/dtos/@generated';
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
