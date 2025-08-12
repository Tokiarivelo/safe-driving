import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { FindManyUserArgs, User, UserCreateInput } from 'src/dtos/@generated';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  @Mutation(() => User, { name: 'createUser' })
  async create(@Args('input') input: UserCreateInput): Promise<User> {
    const user = await this.usersService.create(input);
    return user;
  }
}
