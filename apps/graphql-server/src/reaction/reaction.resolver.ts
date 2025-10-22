import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Reaction, User } from 'src/dtos/@generated';
import {
  AddReactionInput,
  RemoveReactionInput,
  ToggleReactionInput,
} from 'src/dtos/reaction/reaction.input';
import {
  ReactionActionResult,
  ReactionStats,
  ReactionSummary,
} from 'src/dtos/reaction/reaction.output';

@Resolver(() => Reaction)
export class ReactionResolver {
  constructor(private readonly reactionService: ReactionService) {}

  // ==================== Mutations ====================

  @Mutation(() => ReactionActionResult, {
    description: 'Add a reaction to a message',
  })
  @UseGuards(JwtAuthGuard)
  async addReaction(
    @CurrentUser() user: User,
    @Args('input') input: AddReactionInput,
  ): Promise<ReactionActionResult> {
    return this.reactionService.addReaction(user.id, input);
  }

  @Mutation(() => ReactionActionResult, {
    description: 'Remove a reaction from a message',
  })
  @UseGuards(JwtAuthGuard)
  async removeReaction(
    @CurrentUser() user: User,
    @Args('input') input: RemoveReactionInput,
  ): Promise<ReactionActionResult> {
    return this.reactionService.removeReaction(user.id, input);
  }

  @Mutation(() => ReactionActionResult, {
    description: 'Toggle a reaction (add if not exists, remove if exists)',
  })
  @UseGuards(JwtAuthGuard)
  async toggleReaction(
    @CurrentUser() user: User,
    @Args('input') input: ToggleReactionInput,
  ): Promise<ReactionActionResult> {
    return this.reactionService.toggleReaction(user.id, input);
  }

  @Mutation(() => Int, {
    description:
      'Remove all reactions from a message (admin/cleanup operation)',
  })
  @UseGuards(JwtAuthGuard)
  async removeAllReactionsFromMessage(
    @Args('messageId') messageId: string,
    @CurrentUser() user: User,
  ): Promise<number> {
    // TODO: Add admin check if needed
    // const isAdmin = user.Role.find(role => role.name === 'ADMIN');
    // if (!isAdmin) throw new UnauthorizedException();

    return this.reactionService.removeAllReactionsFromMessage(messageId);
  }

  // ==================== Queries ====================

  @Query(() => [Reaction], {
    description: 'Get all reactions for a specific message',
  })
  @UseGuards(JwtAuthGuard)
  async getReactionsByMessage(
    @Args('messageId') messageId: string,
  ): Promise<Reaction[]> {
    return this.reactionService.getReactionsByMessage(messageId);
  }

  @Query(() => ReactionSummary, {
    description: 'Get reaction summary (grouped by type) for a message',
  })
  @UseGuards(JwtAuthGuard)
  async getReactionSummary(
    @Args('messageId') messageId: string,
    @CurrentUser() user: User,
  ): Promise<ReactionSummary> {
    return this.reactionService.getReactionSummary(messageId, user.id);
  }

  @Query(() => [Reaction], {
    description: 'Get all reactions by a specific user',
  })
  @UseGuards(JwtAuthGuard)
  async getReactionsByUser(
    @CurrentUser() user: User,
    @Args('limit', { type: () => Int, defaultValue: 50, nullable: true })
    limit?: number,
  ): Promise<Reaction[]> {
    return this.reactionService.getReactionsByUser(user.id, limit);
  }

  @Query(() => [Reaction], {
    description: 'Get all users who reacted with a specific type to a message',
  })
  @UseGuards(JwtAuthGuard)
  async getUsersByReactionType(
    @Args('messageId') messageId: string,
    @Args('type') type: string,
  ) {
    return this.reactionService.getUsersByReactionType(messageId, type);
  }

  @Query(() => [ReactionStats], {
    description: 'Get reaction statistics for a message',
  })
  @UseGuards(JwtAuthGuard)
  async getReactionStats(@Args('messageId') messageId: string) {
    return this.reactionService.getReactionStats(messageId);
  }

  // ==================== Field Resolvers ====================

  @ResolveField(() => User)
  async user(@Parent() reaction: Reaction) {
    // The user relation is typically already loaded via includes
    // But if needed, we can fetch it here
    return reaction.user;
  }

  @ResolveField(() => String)
  async message(@Parent() reaction: Reaction) {
    // The message relation is typically already loaded via includes
    return reaction.message;
  }
}
