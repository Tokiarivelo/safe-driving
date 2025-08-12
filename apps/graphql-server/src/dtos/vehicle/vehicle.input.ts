import { Field, InputType, Int } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { UploadedFileRefInput } from '../upload/upload.input';

@InputType()
export class CreateDriverVehicleInput {
  @Field({ nullable: true }) brand?: string;
  @Field({ nullable: true }) model?: string;
  @Field({ nullable: true }) registrationNumber?: string;
  @Field() place: number;
  @Field() vehicleTypeId: string;

  // Après upload client fournit l'url/key/uniqueId pour les fichiers
  @Field(() => [UploadedFileRefInput], { nullable: true })
  uploadDocuments?: UploadedFileRefInput[];
  @Field(() => [UploadedFileRefInput], { nullable: true })
  uploadImages?: UploadedFileRefInput[];
}

@InputType()
export class UpdateDriverVehicleInput {
  @Field({ nullable: true }) brand?: string;
  @Field({ nullable: true }) model?: string;
  @Field({ nullable: true }) registrationNumber?: string;
  @Field({ nullable: true }) place?: number;
  @Field({ nullable: true }) vehicleTypeId?: string;

  // nouveaux fichiers uploadés (client fournit uniqueId/url/type)
  @Field(() => [UploadedFileRefInput], { nullable: true })
  uploadDocuments?: UploadedFileRefInput[];
  @Field(() => [UploadedFileRefInput], { nullable: true })
  uploadImages?: UploadedFileRefInput[];

  // uniqueIds des fichiers DB à supprimer (images/documents)
  @Field(() => [String], { nullable: true })
  deleteDocumentsUniqueIds?: string[];
  // uniqueIds des fichiers DB à supprimer (images/documents)
  @Field(() => [String], { nullable: true })
  deleteImagessUniqueIds?: string[];
}
