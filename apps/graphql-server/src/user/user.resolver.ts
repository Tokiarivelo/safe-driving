import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { FindManyUserArgs, User, UserCreateInput } from 'src/dtos/@generated';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { StorageService } from '../storage/storage.service';
import { FileCategoryInput } from '../dtos/storage/storage.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly storageService: StorageService,
  ) {}

  @Query(() => [User], { name: 'users' })
  async getAll(@Args() manyUserArgs: FindManyUserArgs): Promise<User[] | null> {
    return this.usersService.findAll(manyUserArgs);
  }

  @Query(() => [User], { name: 'usersForAdmin' })
  async getAllForAdmin(
    @Args() manyUserArgs: FindManyUserArgs,
  ): Promise<User[] | null> {
    return this.usersService.findAllForAdmin(manyUserArgs);
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard) // 👈 protège la route
  async getOne(@Args('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Query(() => User, { name: 'me' })
  me(@CurrentUser() user: User) {
    return this.usersService.findById(user.id);
  }

  @Mutation(() => User, { name: 'createUser' })
  async create(@Args('input') input: UserCreateInput): Promise<User> {
    return this.usersService.create(input);
  }

  @Mutation(() => [[String]])
  async uploadFilesByCategory(
    @Args({ name: 'categories', type: () => [FileCategoryInput] })
    categories: FileCategoryInput[],
  ) {
    return Promise.all(
      categories.map(async (group) => {
        const { category, files } = group;

        console.log(group);

        const urls = await Promise.all(
          files.map(async (filePromise) => {
            const file = await filePromise;
            return this.storageService.uploadToMinIO(file, category); // optionally pass category
          }),
        );

        return urls; // List of file URLs for this category
      }),
    );
  }
}
