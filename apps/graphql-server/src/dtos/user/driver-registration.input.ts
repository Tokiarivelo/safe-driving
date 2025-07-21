import { Field, InputType, Int } from '@nestjs/graphql';
import { CarInput } from '../car/car.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@InputType()
export class DriverRegistrationInput {
  @Field(() => CarInput)
  car: CarInput;

  @Field(() => GraphQLUpload)
  idCardImage: Promise<FileUpload>[];

  @Field(() => GraphQLUpload)
  driverLicenseImage: Promise<FileUpload>;
}
