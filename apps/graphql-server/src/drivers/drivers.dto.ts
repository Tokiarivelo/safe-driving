// src/drivers/dto/driver.dto.ts
import { InputType, Field, ObjectType, Float, Int, ID } from '@nestjs/graphql';

@InputType()
export class CarInput {
  @Field(() => Int)
  id: number;

  @Field(() => [Float])
  coords: number[]; // [lat, lng]
}

@InputType()
export class DriversInput {
  @Field(() => [CarInput])
  cars: CarInput[];
}

@ObjectType()
export class Car {
  @Field(() => Int)
  id: number;

  @Field(() => [Float])
  coords: number[];
}

@ObjectType()
export class DriversResponse {
  @Field()
  message: string;

  @Field(() => [Car])
  cars: Car[];
}

// New DTOs for nearby drivers feature
@ObjectType()
export class Driver {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  vehicle?: string;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;

  @Field({ nullable: true })
  status?: string;

  @Field(() => Float, { nullable: true })
  rating?: number;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => Int, { nullable: true })
  nbPlaces?: number;
}

@ObjectType()
export class NearbyDriversResult {
  @Field(() => Int)
  count: number;

  @Field(() => [Driver])
  drivers: Driver[];
}
