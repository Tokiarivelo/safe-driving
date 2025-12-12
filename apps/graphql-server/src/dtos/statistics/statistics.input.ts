import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsOptional, IsInt, IsNumber, Min, Max } from 'class-validator';

@InputType()
export class UpdateStatisticInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  driverId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  userId?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  completedRides?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  revenue?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  averageRating?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  totalReviews?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  motivationScore?: number;
}
