import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UsersService } from './users.service';
import {
  FindManyUserArgs,
  User,
  UserCreateInput,
  UserUpdateInput,
} from 'src/dtos/@generated';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UploadUserDocumentsInput } from 'src/dtos/user/user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Query(() => User, { name: 'userByToken' })
  userByToken(@Args('token') token: string) {
    return this.usersService.userByToken(token);
  }

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Mutation(() => User, { name: 'updateUser' })
  async update(
    @Args('input') input: UserUpdateInput,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.update(user.id, input);
  }

  @Mutation(() => User, { name: 'createUser' })
  async create(@Args('input') input: UserCreateInput): Promise<User> {
    const user = await this.usersService.create(input);
    return user;
  }

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Mutation(() => User, { name: 'uploadAvatar' })
  async uploadAvatar(
    @Args('key') key: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.uploadAvatar(user.id, key);
  }

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Mutation(() => User, { name: 'uploadCover' })
  async uploadCover(
    @Args('key') key: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.uploadCover(user.id, key);
  }

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Mutation(() => User, { name: 'removeAvatar' })
  async removeAvatar(@CurrentUser() user: User): Promise<User> {
    return this.usersService.removeAvatar(user.id);
  }

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Mutation(() => User, { name: 'deleteCover' })
  async removeCover(@CurrentUser() user: User): Promise<User> {
    return this.usersService.deleteCover(user.id);
  }

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Mutation(() => User, { name: 'uploadUserDocument' })
  async uploadUserDocument(
    @Args('input', { type: () => [UploadUserDocumentsInput] })
    input: UploadUserDocumentsInput[],
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.uploadUserDocument(user.id, input);
  }

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Mutation(() => User, { name: 'deleteUserDocumentByKey' })
  async deleteUserDocumentByKey(
    @Args('documentId') documentId: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.deleteUserDocumentByKey(user.id, documentId);
  }

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Mutation(() => User, { name: 'uploadUserImages' })
  async uploadUserImages(
    @Args('keys', { type: () => [String] }) keys: string[],
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.uploadUserImages(user.id, keys);
  }

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Mutation(() => User, { name: 'deleteUserImageByKey' })
  async deleteUserImageByKey(
    @Args('key') key: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.deleteUserImageByKey(user.id, key);
  }
}
