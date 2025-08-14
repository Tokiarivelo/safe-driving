import { Field, Int, ObjectType } from '@nestjs/graphql';

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
  @Field() expiresIn: number;
}

// batch upload result type

@ObjectType()
export class CompleteUploadOutput {
  @Field()
  key: string;

  @Field(() => Int, { nullable: true })
  size?: number;

  @Field({ nullable: true })
  etag?: string;

  @Field({ nullable: true })
  contentType?: string;
}
