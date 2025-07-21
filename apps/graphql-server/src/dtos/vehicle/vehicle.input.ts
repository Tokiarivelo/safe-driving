import { Field, InputType, Int } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@InputType()
export class VehicleInput {
  @Field()
  brand: string;

  @Field()
  model: string;

  @Field()
  registrationNumber: string;

  @Field(() => Int)
  place: number;

  @Field()
  vehicleType: string;

  @Field(() => [GraphQLUpload])
  vehicleImages: Promise<FileUpload>[];

  @Field(() => [GraphQLUpload])
  assuranceImages: Promise<FileUpload>[];

  @Field(() => [GraphQLUpload])
  registrationImages: Promise<FileUpload>[];
}
