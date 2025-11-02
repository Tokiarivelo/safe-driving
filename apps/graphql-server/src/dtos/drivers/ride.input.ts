import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsArray, IsDateString } from 'class-validator';

@InputType()
export class CreateRideInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  driverId?: string;

  @Field(() => String)
  @IsString()
  status: string; // REQUESTED, ONGOING, FINISHED

  @Field(() => [String])
  @IsArray()
  participantIds: string[]; // IDs des participants initiaux
}

@InputType()
export class UpdateRideInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  status?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsDateString()
  startedAt?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsDateString()
  finishedAt?: string;
}

@InputType()
export class AddRideParticipantInput {
  @Field(() => String)
  @IsString()
  rideId: string;

  @Field(() => String)
  @IsString()
  userId: string;

  @Field(() => String)
  @IsString()
  role: string; // PASSENGER, GUIDE, OBSERVER
}

@InputType()
export class RemoveRideParticipantInput {
  @Field(() => String)
  @IsString()
  rideId: string;

  @Field(() => String)
  @IsString()
  userId: string;
}

@InputType()
export class RideFilterInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  status?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  driverId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  participantId?: string;
}
