import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
  Int,
} from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Message, User } from 'src/dtos/@generated';
import { SendMessageInput } from 'src/dtos/message/message.input';
import { MessagePayload } from 'src/dtos/message/message.output';
import { MessageService } from './messages.service';
import { MessageSearchService } from './message-search.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GraphqlWsJwtGuard } from 'src/auth/guards/graphql-ws-jwt.guard';
import { RedisExtendedService } from 'src/redis/redis-extended.service';
import { AddReactionInput } from 'src/dtos/reaction/reaction.input';
import {
  ReactionActionResult,
  ReactionSummary,
} from 'src/dtos/reaction/reaction.output';
import { MessageSearchResponse } from 'src/dtos/message/message-search.output';
import { CursorDirection } from 'src/dtos/enums/cursor-direction.enum';

@Resolver(() => Message)
export class MessageResolver {
  private readonly logger = new Logger(MessageResolver.name);

  constructor(
    private messageService: MessageService,
    private messageSearchService: MessageSearchService,
    private redisService: RedisExtendedService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Message])
  async messages(
    @Args('conversationId', { nullable: true }) conversationId?: string,
    @Args('rideId', { nullable: true }) rideId?: string,
    @Args('cursor', { nullable: true }) cursor?: string,
    @Args('limit', { defaultValue: 20 }) limit?: number,
    @Args('direction', {
      type: () => CursorDirection,
      nullable: true,
      defaultValue: CursorDirection.BEFORE,
      description:
        'Direction for pagination: BEFORE for older messages, AFTER for newer messages',
    })
    direction?: CursorDirection,
  ): Promise<Message[]> {
    return this.messageService.getMessages(
      conversationId,
      rideId,
      cursor,
      limit,
      direction,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Message)
  async sendMessage(
    @Args('input') input: SendMessageInput,
    @CurrentUser() user: User,
  ): Promise<Message> {
    const userId = user.id;
    return this.messageService.sendMessage(userId, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Message)
  async editMessage(
    @Args('messageId') messageId: string,
    @Args('content') content: string,
    @Args('filesKeys', { type: () => [String], nullable: true })
    filesKeys: string[],
    @CurrentUser() user: User,
  ): Promise<Message> {
    return this.messageService.editMessage(
      messageId,
      content,
      user.id,
      filesKeys,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Message)
  async markMessageAsDelivered(
    @Args('messageId') messageId: string,
  ): Promise<Message> {
    return this.messageService.markAsDelivered(messageId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Message)
  async deleteMessage(
    @Args('messageId') messageId: string,
    @CurrentUser() user: User,
  ): Promise<Message> {
    return this.messageService.deleteMessage(messageId, user.id);
  }

  // ==================== Reaction Mutations ====================

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ReactionActionResult, {
    description: 'Add a reaction to a message',
  })
  async addMessageReaction(
    @CurrentUser() user: User,
    @Args('input') input: AddReactionInput,
  ): Promise<ReactionActionResult> {
    return this.messageService.addMessageReaction(user.id, input);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ReactionActionResult, {
    description: 'Remove a reaction from a message',
  })
  async removeMessageReaction(
    @CurrentUser() user: User,
    @Args('messageId') messageId: string,
    @Args('reactionType') reactionType: string,
  ): Promise<ReactionActionResult> {
    return this.messageService.removeMessageReaction(
      user.id,
      messageId,
      reactionType,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ReactionActionResult, {
    description:
      'Toggle a reaction on a message (add if not exists, remove if exists)',
  })
  async toggleMessageReaction(
    @CurrentUser() user: User,
    @Args('messageId') messageId: string,
    @Args('reactionType') reactionType: string,
  ): Promise<ReactionActionResult> {
    return this.messageService.toggleMessageReaction(
      user.id,
      messageId,
      reactionType,
    );
  }

  // ==================== Reaction Queries ====================

  @UseGuards(JwtAuthGuard)
  @Query(() => ReactionSummary, {
    description: 'Get reaction summary for a message',
  })
  async getMessageReactionSummary(
    @Args('messageId') messageId: string,
    @CurrentUser() user: User,
  ): Promise<ReactionSummary> {
    return this.messageService.getMessageReactionSummary(messageId, user.id);
  }

  // ==================== Subscriptions ====================

  @UseGuards(GraphqlWsJwtGuard)
  @Subscription(() => MessagePayload, {
    filter: (payload, variables) => {
      const logger = new Logger('MessageSubscriptionFilter');

      try {
        logger.debug('Subscription filter triggered', {
          payload: JSON.stringify(payload),
          variables: JSON.stringify(variables),
        });

        // Filtrer les messages selon la conversation/ride
        const message = payload?.messageEvent?.message;

        if (!message) {
          logger.warn('No message found in payload', { payload });
          return false;
        }

        logger.debug('Processing message filter', {
          messageId: message.id,
          messageConversationId: message.conversationId,
          messageRideId: message.rideId,
          variablesConversationId: variables.conversationId,
          variablesRideId: variables.rideId,
        });

        if (variables.conversationId) {
          const match = message.conversationId === variables.conversationId;
          logger.debug('ConversationId filter result', {
            match,
            messageConversationId: message.conversationId,
            variablesConversationId: variables.conversationId,
          });

          return match;
        }

        if (variables.rideId) {
          const match = message.rideId === variables.rideId;
          logger.debug('RideId filter result', {
            match,
            messageRideId: message.rideId,
            variablesRideId: variables.rideId,
          });
          return match;
        }

        logger.debug('No matching filter criteria, returning false');
        return false;
      } catch (error) {
        logger.error('Error in subscription filter', {
          error: error.message,
          stack: error.stack,
          payload: JSON.stringify(payload),
          variables: JSON.stringify(variables),
        });
        return false;
      }
    },
  })
  messageEvent(
    @Args('conversationId', { nullable: true }) conversationId?: string,
    @Args('rideId', { nullable: true }) rideId?: string,
  ) {
    const channelName = conversationId
      ? `conversation_${conversationId}`
      : `ride_${rideId}`;

    this.logger.log('New subscription created', {
      channelName,
      conversationId,
      rideId,
    });

    const pubsub = this.redisService.getPubSub();
    this.logger.log('PubSub instance', {
      exists: !!pubsub,
      type: typeof pubsub,
    });

    const iterator = pubsub?.asyncIterator
      ? pubsub.asyncIterator(channelName)
      : null;
    this.logger.log('AsyncIterator', { iteratorExists: !!iterator });

    if (!iterator) {
      // Retourne une erreur claire si l'iterator n'existe pas (évite le null silencieux)
      throw new Error(
        `Could not create asyncIterator for channel "${channelName}"`,
      );
    }

    return iterator;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => MessageSearchResponse)
  async searchMessages(
    @CurrentUser() user: User,
    @Args('q', { nullable: true }) q: string | null,
    @Args('conversationId', { nullable: true }) conversationId?: string,
    @Args('page', { type: () => Int, defaultValue: 0 }) page?: number,
    @Args('size', { type: () => Int, defaultValue: 20 }) size?: number,
  ): Promise<MessageSearchResponse> {
    return this.messageSearchService.searchMessages(q, {
      page,
      size,
      conversationId,
      userId: user.id, // ✅ Sécurité: filtrer par utilisateur
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async recreateAndBulkMessages() {
    await this.messageSearchService.recreateAndBulkIndex();
    return true;
  }
}
