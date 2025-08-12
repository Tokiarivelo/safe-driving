import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User, UserPreference } from 'src/dtos/@generated';
import { UserPreferenceUpsertInput } from 'src/dtos/userPreference/upsert.input';
import { UserPreferenceService } from './preference.service';

@Resolver(() => UserPreference)
export class UsersResolver {
  constructor(private readonly userPreferenceService: UserPreferenceService) {}

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Query(() => UserPreference, { name: 'userPreference', nullable: true })
  userPreference(@CurrentUser() user: User): Promise<UserPreference | null> {
    return this.userPreferenceService.findByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard) // 👈 protège la route
  @Mutation(() => UserPreference, { name: 'upsertUserPreference' })
  async upsertUserPreference(
    @CurrentUser() user: User,
    @Args('input') input: UserPreferenceUpsertInput,
  ): Promise<UserPreference> {
    return this.userPreferenceService.upsertForUser(user.id, input);
  }
}
