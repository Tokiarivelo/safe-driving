import { Field, InputType, Int } from '@nestjs/graphql';
import { VehicleInput } from '../vehicle/vehicle.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@InputType()
export class DriverRegistrationInput {
  @Field(() => VehicleInput)
  vehicle: VehicleInput;

  @Field(() => GraphQLUpload)
  idCardImages: Promise<FileUpload>[];

  @Field(() => GraphQLUpload)
  driverLicenseImage: Promise<FileUpload>;
}
