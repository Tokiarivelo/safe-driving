import { Field, InputType } from '@nestjs/graphql';
import { UploadedFileRefInput } from '../upload/upload.input';
import { UserDocumentType } from '../@generated';

@InputType()
export class UploadUserDocumentsInput {
  @Field(() => UserDocumentType) documentType: UserDocumentType;
  @Field({ nullable: true }) name?: string;
  @Field(() => UploadedFileRefInput) file: UploadedFileRefInput;
}
