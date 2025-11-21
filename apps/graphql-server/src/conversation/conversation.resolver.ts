import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GraphqlWsJwtGuard } from '../auth/guards/graphql-ws-jwt.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { ConversationParticipant, User } from '../dtos/@generated';
import {
  CreateConversationInput,
  UpdateConversationInput,
  AddParticipantInput,
  RemoveParticipantInput,
} from '../dtos/conversation/conversation.input';
import {
  ConversationPayload,
  UserConversationsResponse,
  ConversationParticipantPayload,
  UserConversation,
} from '../dtos/conversation/conversation.output';
import { ConversationSearchResponse } from '../dtos/conversation/conversation-search.output';
import {
  ConversationAttachmentsResponse,
  ConversationAttachmentsSummary,
  FileTypeFilter,
} from '../dtos/conversation/conversation-attachments.output';
import { RedisService } from '../redis/redis.service';
import { ConversationService } from './conversation.service';
import { ConversationSearchService } from './conversation-search.service';
import { GraphQLJSON } from 'graphql-type-json';

@Resolver(() => UserConversation)
export class ConversationResolver {
  constructor(
    private conversationService: ConversationService,
    private redisService: RedisService,
    private conversationSearchService: ConversationSearchService,
  ) {}

  // QUERIES

  @UseGuards(JwtAuthGuard)
  @Query(() => UserConversationsResponse)
  async userConversations(
    @CurrentUser() user: User,
    @Args('limit', { type: () => Int, defaultValue: 20 }) limit: number,
    @Args('cursor', { nullable: true }) cursor?: string,
  ): Promise<UserConversationsResponse> {
    return this.conversationService.getUserConversations(
      user.id,
      limit,
      cursor,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserConversation)
  async conversation(
    @Args('id') id: string,
    @CurrentUser() user: User,
  ): Promise<UserConversation> {
    return this.conversationService.getConversationById(id, user.id);
  }

  // MUTATIONS

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserConversation)
  async createConversation(
    @Args('input') input: CreateConversationInput,
    @CurrentUser() user: User,
  ): Promise<UserConversation> {
    return this.conversationService.createConversation(user.id, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserConversation)
  async updateConversation(
    @Args('conversationId') conversationId: string,
    @Args('input') input: UpdateConversationInput,
    @CurrentUser() user: User,
  ): Promise<UserConversation> {
    return this.conversationService.updateConversation(
      conversationId,
      user.id,
      input,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserConversation)
  async deleteConversation(
    @Args('conversationId') conversationId: string,
    @CurrentUser() user: User,
  ): Promise<UserConversation> {
    return this.conversationService.deleteConversation(conversationId, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ConversationParticipant)
  async addParticipant(
    @Args('input') input: AddParticipantInput,
    @CurrentUser() user: User,
  ): Promise<ConversationParticipant> {
    return this.conversationService.addParticipant(input, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ConversationParticipant)
  async removeParticipant(
    @Args('input') input: RemoveParticipantInput,
    @CurrentUser() user: User,
  ): Promise<ConversationParticipant> {
    return this.conversationService.removeParticipant(input, user.id);
  }

  // SUBSCRIPTIONS

  @UseGuards(GraphqlWsJwtGuard)
  @Subscription(() => ConversationPayload, {
    filter: (payload, variables, context) => {
      // Filter to only send updates to the user's conversations
      const userId = context.req.user?.id;
      if (!userId) return false;

      const conversation = payload.conversationUpdated.conversation;
      return (
        conversation.participants?.some((p) => p.userId === userId) || false
      );
    },
  })
  conversationUpdated(@CurrentUser() user: User) {
    return this.redisService
      .getPubSub()
      .asyncIterator(`user_conversations_${user.id}`);
  }

  @UseGuards(GraphqlWsJwtGuard)
  @Subscription(() => ConversationParticipantPayload, {
    filter: (payload, variables) => {
      // Filter by conversation ID
      return (
        payload.participantUpdated.conversationId === variables.conversationId
      );
    },
  })
  participantUpdated(@Args('conversationId') conversationId: string) {
    return this.redisService
      .getPubSub()
      .asyncIterator(`conversation_${conversationId}`);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ConversationSearchResponse)
  async searchConversations(
    @CurrentUser() user: User,
    @Args('q', { nullable: true }) q: string | null,
    @Args('page', { type: () => Int, defaultValue: 0 }) page: number,
    @Args('size', { type: () => Int, defaultValue: 20 }) size: number,
  ): Promise<ConversationSearchResponse> {
    return this.conversationSearchService.searchConversations(q, {
      page,
      size,
      userId: user.id, // ✅ Sécurité: ne rechercher que les conversations de l'utilisateur
    });
  }

  @Mutation(() => Boolean)
  async recreateAndBulkConversation() {
    await this.conversationSearchService.recreateAndBulkIndex();
    return true;
  }

  @Mutation(() => Boolean)
  async bulkIndexAllConversations() {
    await this.conversationSearchService.bulkIndexAllConversations({
      refresh: true,
    });
    return true;
  }

  // ATTACHMENTS QUERIES

  @UseGuards(JwtAuthGuard)
  @Query(() => ConversationAttachmentsResponse, {
    description:
      'Get all attachments (files, links, rides) from a conversation with filtering',
  })
  async conversationAttachments(
    @CurrentUser() user: User,
    @Args('conversationId') conversationId: string,
    @Args('filter', {
      type: () => FileTypeFilter,
      nullable: true,
      defaultValue: FileTypeFilter.ALL,
      description: 'Filter attachments by type (ALL, IMAGES, VIDEOS, etc.)',
    })
    filter: FileTypeFilter,
    @Args('limit', { type: () => Int, defaultValue: 20 })
    limit: number,
    @Args('cursor', { nullable: true })
    cursor?: string,
  ): Promise<ConversationAttachmentsResponse> {
    return this.conversationService.getConversationAttachments(
      conversationId,
      user.id,
      { filter, limit, cursor },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ConversationAttachmentsSummary, {
    description: 'Get summary of all attachment types in a conversation',
  })
  async conversationAttachmentsSummary(
    @CurrentUser() user: User,
    @Args('conversationId') conversationId: string,
  ): Promise<ConversationAttachmentsSummary> {
    return this.conversationService.getConversationAttachmentsSummary(
      conversationId,
      user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserConversation, {
    description: 'Get direct conversation between two users',
    nullable: true,
  })
  async directConversationBetweenUsers(
    @CurrentUser() user: User,
    @Args('otherUserId') otherUserId: string,
  ): Promise<UserConversation | null> {
    return this.conversationService.getDirectConversationBetweenUsers(
      user.id,
      otherUserId,
    );
  }

  // FIELD RESOLVERS (if needed for complex fields)

  // You can add field resolvers here if you need to resolve specific fields
  // For example, to resolve the last message of a conversation:
  /*
  @ResolveField('lastMessage', () => Message, { nullable: true })
  async getLastMessage(
    @Parent() conversation: Conversation,
  ): Promise<Message | null> {
    // Implementation to get the last message
    return null;
  }
  */
}
