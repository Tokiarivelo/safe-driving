import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { Ride, RideParticipant, RideStatus } from '../@generated';

@ObjectType()
export class RidePayload {
  @Field(() => String)
  action: string; // CREATED, UPDATED, DELETED, PARTICIPANT_ADDED, PARTICIPANT_REMOVED

  @Field(() => Ride)
  ride: Ride;
}

@ObjectType()
export class RideParticipantPayload {
  @Field(() => String)
  action: string; // ADDED, REMOVED

  @Field(() => RideParticipant)
  participant: RideParticipant;

  @Field(() => String)
  rideId: string;
}

@ObjectType()
export class RideWithDetails extends Ride {
  @Field(() => Int)
  participantCount: number;

  @Field(() => Int)
  messageCount: number;
}

@ObjectType()
export class UserRidesResponse {
  @Field(() => [RideWithDetails])
  rides: RideWithDetails[];

  @Field(() => String, { nullable: true })
  nextCursor?: string | null;

  @Field(() => Boolean)
  hasMore: boolean;
}

// Mock types for frontend development
@ObjectType()
export class MockUser {
  @Field(() => String)
  id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Field(() => Float, { nullable: true })
  rating?: number;
}

@ObjectType()
export class MockVehicle {
  @Field(() => String)
  brand: string;

  @Field(() => String)
  model: string;

  @Field(() => Int)
  seats: number;

  @Field(() => String, { nullable: true })
  type?: string;
}

@ObjectType()
export class MockRide {
  @Field(() => String)
  id: string;

  @Field(() => RideStatus)
  status: RideStatus;

  @Field(() => String)
  departureAddress: string;

  @Field(() => Float)
  departureLat: number;

  @Field(() => Float)
  departureLng: number;

  @Field(() => String)
  arrivalAddress: string;

  @Field(() => Float)
  arrivalLat: number;

  @Field(() => Float)
  arrivalLng: number;

  @Field(() => Date)
  scheduledDeparture: Date;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  currency: string;

  @Field(() => String, { nullable: true })
  vehicleType?: string;

  @Field(() => Int)
  requiredSeats: number;

  @Field(() => Boolean)
  acceptsAnimals: boolean;

  @Field(() => Boolean)
  acceptsBaggage: boolean;

  @Field(() => String, { nullable: true })
  baggageDetails?: string;

  @Field(() => String, { nullable: true })
  otherPreferences?: string;

  @Field(() => [String], { nullable: true })
  preferredLanguages?: string[];

  @Field(() => Float, { nullable: true })
  minDriverRating?: number;

  @Field(() => MockUser, { nullable: true })
  driver?: MockUser;

  @Field(() => [MockUser])
  passengers: MockUser[];

  @Field(() => MockVehicle, { nullable: true })
  vehicle?: MockVehicle;

  @Field(() => Date, { nullable: true })
  finishedAt?: Date;

  @Field(() => Date)
  createdAt: Date;
}

@ObjectType()
export class MockRidesResponse {
  @Field(() => [MockRide])
  rides: MockRide[];

  @Field(() => Int)
  total: number;

  @Field(() => Boolean)
  hasMore: boolean;
}
