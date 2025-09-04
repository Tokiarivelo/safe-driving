// src/upload/upload.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UploadService } from './upload.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import {
  CompleteUploadOutput,
  FileUploadResult,
  PresignedUrl,
} from 'src/dtos/upload/upload.output';
import { Query } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileMetaInput } from 'src/dtos/upload/upload.input';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { FileType, User } from 'src/dtos/@generated';

@UseGuards(JwtAuthGuard)
@Resolver(() => FileUploadResult)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Query(() => [String], { name: 'listObjects' })
  async listObjects(@Args('bucket') bucket: string): Promise<string[]> {
    return await this.uploadService.listObjects(bucket);
  }

  @Mutation(() => FileUploadResult, { name: 'uploadFile' })
  async uploadFile(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
    @Args('path', { nullable: true }) path?: string,
  ): Promise<{ url: string }> {
    const url = await this.uploadService.uploadFile(file, path);
    return { url };
  }

  @Mutation(() => Boolean, { name: 'deleteObject' })
  async deleteObject(@Args('key') key: string): Promise<boolean> {
    await this.uploadService.deleteObject(key);
    return true;
  }

  @Mutation(() => String, { name: 'getPresignedUrl' })
  async getPresignedUrl(
    @Args('key') key: string,
    @Args('contentType') contentType: string,
    @Args('expiresIn', { type: () => Number, nullable: true })
    expiresIn?: number,
  ): Promise<string> {
    return this.uploadService.getPresignedUrl(key, contentType, expiresIn);
  }

  @Mutation(() => [PresignedUrl], { name: 'createBatchPresignedUrls' })
  async createBatchPresignedUrls(
    @CurrentUser() user: User,
    @Args('type', { type: () => FileType }) type: FileType,
    @Args('files', { type: () => [FileMetaInput] })
    files: FileMetaInput[],
  ): Promise<PresignedUrl[]> {
    const userId = user.id;
    return this.uploadService.createBatchPresignedUrls(userId, type, files);
  }

  @Mutation(() => [CompleteUploadOutput], { name: 'completeUploadBulk' })
  async completeUploadBulk(
    @CurrentUser() user: User,
    @Args('keys', { type: () => [String] }) keys: string[],
    @Args('type', { type: () => FileType }) type: FileType,
  ): Promise<CompleteUploadOutput[]> {
    const userId = user.id;
    return this.uploadService.completeUploadBulk(userId, keys, type);
  }
}
