import { Field, InputType, Int, Float } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsArray,
  IsDateString,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { RideStatus } from '../@generated';

@InputType()
export class CreateRideInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  driverId?: string;

  @Field(() => RideStatus, { nullable: true, defaultValue: RideStatus.PENDING })
  @IsOptional()
  status?: RideStatus;

  @Field(() => [String])
  @IsArray()
  participantIds: string[]; // IDs des participants initiaux

  // Locations
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  departureAddress?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  departureLat?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  departureLng?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  arrivalAddress?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  arrivalLat?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  arrivalLng?: number;

  // Scheduling
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsDateString()
  scheduledDeparture?: string;

  // Pricing
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  price?: number;

  @Field(() => String, { nullable: true, defaultValue: 'MGA' })
  @IsOptional()
  @IsString()
  currency?: string;

  // Vehicle requirements
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  vehicleTypeId?: string;

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @IsOptional()
  @IsNumber()
  requiredSeats?: number;

  // Preferences
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  acceptsAnimals?: boolean;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  acceptsBaggage?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  baggageDetails?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  otherPreferences?: string;

  // Driver preferences (for user rides)
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  minDriverRating?: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  preferredLanguages?: string[];
}

@InputType()
export class UpdateRideInput {
  @Field(() => RideStatus, { nullable: true })
  @IsOptional()
  status?: RideStatus;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsDateString()
  startedAt?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsDateString()
  finishedAt?: string;

  // Locations
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  departureAddress?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  departureLat?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  departureLng?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  arrivalAddress?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  arrivalLat?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  arrivalLng?: number;

  // Scheduling
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsDateString()
  scheduledDeparture?: string;

  // Pricing
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  price?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  currency?: string;

  // Preferences
  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  acceptsAnimals?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  acceptsBaggage?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  baggageDetails?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  otherPreferences?: string;
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
