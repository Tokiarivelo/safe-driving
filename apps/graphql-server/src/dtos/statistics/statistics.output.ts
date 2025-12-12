import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { RideStatistic } from '../@generated';

@ObjectType()
export class TopDriverStatistic {
  @Field(() => String)
  driverId: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Field(() => Int)
  completedRides: number;

  @Field(() => Float)
  revenue: number;

  @Field(() => Float)
  averageRating: number;

  @Field(() => Int)
  totalReviews: number;

  @Field(() => Int)
  motivationScore: number;
}

@ObjectType()
export class DriverStatisticsResponse {
  @Field(() => RideStatistic, { nullable: true })
  statistics?: RideStatistic;

  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}

@ObjectType()
export class UserStatisticsResponse {
  @Field(() => RideStatistic, { nullable: true })
  statistics?: RideStatistic;

  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}

@ObjectType()
export class TopDriversResponse {
  @Field(() => [TopDriverStatistic])
  drivers: TopDriverStatistic[];

  @Field(() => Int)
  total: number;
}
