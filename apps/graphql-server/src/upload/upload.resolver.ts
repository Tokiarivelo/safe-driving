/*
scalar Upload

type File {
  url: String!
}

type Mutation {
  uploadFile(file: Upload!, path: String): File!
}
*/

// src/upload/upload.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { FileUploadResult } from 'src/dtos/upload/upload.output';

@Resolver(() => FileUploadResult)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => FileUploadResult, { name: 'uploadFile' })
  async uploadFile(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
    @Args('path', { nullable: true }) path?: string,
  ): Promise<{ url: string }> {
    const url = await this.uploadService.uploadFile(file, path);
    return { url };
  }
}
