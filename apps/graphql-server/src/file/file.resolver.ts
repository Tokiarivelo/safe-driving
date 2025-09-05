import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { FileService } from './file.service';
import {
  FindManyFileArgs,
  File,
  FileCreateInput,
  User,
} from 'src/dtos/@generated';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CustomFileUpdateInput } from 'src/dtos/file/file.input';
import { ConfigService } from '@nestjs/config';

@Resolver(() => File)
@UseGuards(JwtAuthGuard) // 👈 protège la route
export class FileResolver {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  // set url to localstackurl + bucket + key by resolver
  @ResolveField(() => String)
  async url(@Parent() file: File): Promise<string> {
    const { key } = file;
    const awsUrl = this.configService.get<string>('AWS_ENDPOINT_URL');
    const bucket = this.configService.get<string>('S3_BUCKET_NAME');
    return `${awsUrl}/${bucket}/${key}`;
  }

  @Query(() => [File], { name: 'files' })
  async getAll(@Args() manyFileArgs: FindManyFileArgs): Promise<File[] | null> {
    return this.fileService.findAll(manyFileArgs);
  }

  @Query(() => File, { name: 'file' })
  async getOne(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<File> {
    return this.fileService.findById(user.id, id);
  }

  @Mutation(() => File, { name: 'createFile' })
  async create(@Args('input') input: FileCreateInput): Promise<File> {
    const File = await this.fileService.create(input);
    return File;
  }

  @Mutation(() => File, { name: 'updateFile' })
  async update(
    @Args('id') id: string,
    @Args('input') input: CustomFileUpdateInput,
  ): Promise<File> {
    const File = await this.fileService.update(id, input);
    return File;
  }

  @Mutation(() => [File], { name: 'deleteFilesByUserId' })
  async deleteManyFilesByUserId(@CurrentUser() user: User): Promise<File[]> {
    return this.fileService.deleteManyFilesByUserId(user.id);
  }
}
