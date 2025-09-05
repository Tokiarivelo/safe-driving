// s3.resolver.ts
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { S3Service } from './s3.service';
import {
  CompleteUploadOutput,
  PresignedUrl,
} from 'src/dtos/upload/upload.output';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { FileType, User } from 'src/dtos/@generated';
import { FileMetaInput } from 'src/dtos/upload/upload.input';

@Resolver()
@UseGuards(JwtAuthGuard)
export class S3Resolver {
  constructor(private readonly s3: S3Service) {}

  @Query(() => [String])
  async s3List(@Args('bucket') bucket: string) {
    const objs = await this.s3.listObjects(bucket);
    // Retourne uniquement les clés des objets
    return objs.map((o) => o.Key);
  }

  @Query(() => String)
  async s3EnsureBucket(@Args('bucket') bucket: string) {
    await this.s3.ensureBucket(bucket);
    return `Bucket ${bucket} ensured`;
  }

  @Mutation(() => String)
  async s3CreatePresignedUrl(
    @Args('key') key: string,
    @Args('contentType') contentType: string,
    @Args('expiresIn', { type: () => Number, nullable: true })
    expiresIn?: number,
  ): Promise<string> {
    return this.s3.createPresignedUrl(key, contentType, expiresIn);
  }

  @Mutation(() => [PresignedUrl])
  async s3CreateBatchPresignedUrls(
    @CurrentUser() user: User,
    @Args('type', { type: () => FileType }) type: FileType,
    @Args('files', { type: () => [FileMetaInput] })
    files: FileMetaInput[],
  ): Promise<PresignedUrl[]> {
    return this.s3.createBatchPresignedUrls(user.id, type, files);
  }

  @Mutation(() => [CompleteUploadOutput])
  async completeUploadBulk(
    @CurrentUser() user: User,
    @Args('keys', { type: () => [String] }) keys: string[],
    @Args('type', { type: () => FileType }) type: FileType,
  ) {
    return this.s3.completeUploadBulk(user.id, keys, type);
  }

  @Mutation(() => Boolean)
  async s3DeleteObject(@Args('key') key: string): Promise<boolean> {
    return this.s3.deleteObject(key);
  }

  // Vérifie si un objet existe dans le bucket
  @Query(() => Boolean)
  async s3HeadObjectExists(@Args('key') key: string): Promise<boolean> {
    return this.s3.headObjectExists(key);
  }
}
