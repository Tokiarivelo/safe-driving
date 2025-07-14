import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileUploadResult {
  @Field(() => String)
  url: string;
}
