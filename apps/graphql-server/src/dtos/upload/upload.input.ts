import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UploadedFileRefInput {
  @Field() key: string;
}
@InputType()
export class FileMetaInput {
  @Field({ nullable: true }) uniqueId?: string;
  @Field() contentType: string;
  @Field() originalName: string;
}
