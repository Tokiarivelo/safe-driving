import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class RideDriverSource {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  email?: string | null;

  @Field(() => String, { nullable: true })
  firstName?: string | null;

  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field(() => String, { nullable: true })
  username?: string | null;
}

@ObjectType()
export class RideParticipantSource {
  @Field(() => String)
  id: string;

  @Field(() => String)
  rideId: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  role: string;

  @Field(() => Date)
  joinedAt: Date;

  @Field(() => String, { nullable: true })
  firstName?: string | null;

  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field(() => String, { nullable: true })
  email?: string | null;
}

@ObjectType()
export class RideSource {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  driverId?: string | null;

  @Field(() => String)
  status: string;

  @Field(() => Date, { nullable: true })
  startedAt?: Date | null;

  @Field(() => Date, { nullable: true })
  finishedAt?: Date | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => RideDriverSource, { nullable: true })
  driver?: RideDriverSource | null;

  @Field(() => [RideParticipantSource])
  participants: RideParticipantSource[];
}

@ObjectType()
export class RideSearchHit {
  @Field(() => String)
  _index: string;

  @Field(() => String)
  _id: string;

  @Field(() => Number)
  _score: number;

  @Field(() => RideSource)
  _source: RideSource;
}

@ObjectType()
export class RideSearchResponse {
  @Field(() => Int)
  total: number;

  @Field(() => [RideSearchHit])
  hits: RideSearchHit[];
}
