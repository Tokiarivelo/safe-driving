import { Field, InputType, Int } from '@nestjs/graphql';
import { UploadedFileRefInput } from '../upload/upload.input';
import { VehicleDocumentType } from '../@generated';

@InputType()
export class UploadVehicleDocumentsInput {
  @Field(() => VehicleDocumentType) documentType: VehicleDocumentType;
  @Field({ nullable: true }) name?: string;
  @Field(() => UploadedFileRefInput) file: UploadedFileRefInput;
}
@InputType()
export class CreateDriverVehicleInput {
  @Field({ nullable: true }) brand?: string;
  @Field({ nullable: true }) model?: string;
  @Field({ nullable: true }) registrationNumber?: string;
  @Field() place: number;
  @Field() vehicleTypeId: string;

  // nouveaux fichiers uploadés (client fournit uniqueId/url/type)
  @Field(() => [UploadVehicleDocumentsInput], { nullable: true })
  uploadDocuments?: UploadVehicleDocumentsInput[];
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
  @Field(() => [UploadVehicleDocumentsInput], { nullable: true })
  uploadDocuments?: UploadVehicleDocumentsInput[];
  @Field(() => [UploadedFileRefInput], { nullable: true })
  uploadImages?: UploadedFileRefInput[];

  // uniqueIds des fichiers DB à supprimer (images/documents)
  @Field(() => [String], { nullable: true })
  deleteDocumentsByKeys?: string[];
  // uniqueIds des fichiers DB à supprimer (images/documents)
  @Field(() => [String], { nullable: true })
  deleteImagesByKeys?: string[];
}
