import { Field, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@InputType()
export class FileCategoryInput {
  @Field()
  category: string;

  @Field(() => [GraphQLUpload])
  files: Promise<FileUpload>[];
}
