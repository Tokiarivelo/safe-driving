import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { FileService } from './file.service';
import {
  FindManyFileArgs,
  File,
  FileCreateInput,
  User,
  FileUpdateInput,
} from 'src/dtos/@generated';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Resolver(() => File)
@UseGuards(JwtAuthGuard) // 👈 protège la route
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

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
    @Args('input') input: FileUpdateInput,
  ): Promise<File> {
    const File = await this.fileService.update(id, input);
    return File;
  }

  @Mutation(() => [File], { name: 'deleteFilesByUserId' })
  async deleteManyFilesByUserId(@CurrentUser() user: User): Promise<File[]> {
    return this.fileService.deleteManyFilesByUserId(user.id);
  }
}
