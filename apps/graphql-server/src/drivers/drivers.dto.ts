// src/drivers/dto/driver.dto.ts
import { InputType, Field, ObjectType, Float, Int } from '@nestjs/graphql';

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
