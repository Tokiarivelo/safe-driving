import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

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
@UseGuards(JwtAuthGuard) // 👈 protège la route
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @ResolveField(() => String, { nullable: true })
  UserPreference(@Parent() user: User, @CurrentUser() me: User) {
    if (!me) return null;
    const isAdmin = me.Role.find((role) => role.name === 'ADMIN');
    if (isAdmin || me.id === user.id) return user.UserPreference;
    return null;
  }

  @ResolveField(() => String, { nullable: true })
  UserDocument(@Parent() user: User, @CurrentUser() me: User) {
    if (!me) return null;
    const isAdmin = me.Role.find((role) => role.name === 'ADMIN');
    if (isAdmin || me.id === user.id) return user.UserDocument;
    return null;
  }

  @ResolveField(() => String, { nullable: true })
  Message(@Parent() user: User, @CurrentUser() me: User) {
    if (!me) return null;
    const isAdmin = me.Role.find((role) => role.name === 'ADMIN');
    if (isAdmin || me.id === user.id) return user.Message;
    return null;
  }

  @ResolveField(() => String, { nullable: true })
  Role(@Parent() user: User, @CurrentUser() me: User) {
    console.log('me :>> ', me);
    if (!me) return null;
    const isAdmin = me.Role.find((role) => role.name === 'ADMIN');
    if (isAdmin || me.id === user.id) return user.Role;
    return null;
  }

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
  async getOne(@Args('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Query(() => User, { name: 'me' })
  me(@CurrentUser() user: User) {
    return this.usersService.findById(user.id);
  }

  @Query(() => User, { name: 'userByToken' })
  userByToken(@Args('token') token: string) {
    return this.usersService.userByToken(token);
  }

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

  @Mutation(() => User, { name: 'uploadAvatar' })
  async uploadAvatar(
    @Args('key') key: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.uploadAvatar(user.id, key);
  }

  @Mutation(() => User, { name: 'uploadCover' })
  async uploadCover(
    @Args('key') key: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.uploadCover(user.id, key);
  }

  @Mutation(() => User, { name: 'removeAvatar' })
  async removeAvatar(@CurrentUser() user: User): Promise<User> {
    return this.usersService.removeAvatar(user.id);
  }

  @Mutation(() => User, { name: 'deleteCover' })
  async removeCover(@CurrentUser() user: User): Promise<User> {
    return this.usersService.deleteCover(user.id);
  }

  @Mutation(() => User, { name: 'uploadUserDocument' })
  async uploadUserDocument(
    @Args('input', { type: () => [UploadUserDocumentsInput] })
    input: UploadUserDocumentsInput[],
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.uploadUserDocument(user.id, input);
  }

  @Mutation(() => User, { name: 'deleteUserDocumentByKey' })
  async deleteUserDocumentByKey(
    @Args('documentId') documentId: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.deleteUserDocumentByKey(user.id, documentId);
  }

  @Mutation(() => User, { name: 'uploadUserImages' })
  async uploadUserImages(
    @Args('keys', { type: () => [String] }) keys: string[],
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.uploadUserImages(user.id, keys);
  }

  @Mutation(() => User, { name: 'deleteUserImageByKey' })
  async deleteUserImageByKey(
    @Args('key') key: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.deleteUserImageByKey(user.id, key);
  }
}
