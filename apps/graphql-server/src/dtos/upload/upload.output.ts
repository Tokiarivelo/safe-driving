import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileUploadResult {
  @Field(() => String)
  url: string;
}

// Presigned URL type for the upload
@ObjectType()
export class PresignedUrl {
  @Field() url: string;
  @Field() key: string;
  @Field() uniqueId: string;
  @Field() expiresIn: number;
}
