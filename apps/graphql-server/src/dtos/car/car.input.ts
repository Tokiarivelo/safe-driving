import { Field, InputType, Int } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@InputType()
export class CarInput {
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
  carImages: Promise<FileUpload>[];

  @Field(() => [GraphQLUpload])
  assuranceImages: Promise<FileUpload>[];

  @Field(() => [GraphQLUpload])
  registrationImages: Promise<FileUpload>[];
}
