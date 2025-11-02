import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Ride, RideParticipant } from '../@generated';

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
