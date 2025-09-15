import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Message, User } from 'src/dtos/@generated';
import { SendMessageInput } from 'src/dtos/message/message.input';
import { MessagePayload } from 'src/dtos/message/message.output';
import { MessageService } from './messages.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GraphqlWsJwtGuard } from 'src/auth/guards/graphql-ws-jwt.guard';
import { RedisExtendedService } from 'src/redis/redis-extended.service';

@Resolver(() => Message)
export class MessageResolver {
  private readonly logger = new Logger(MessageResolver.name);

  constructor(
    private messageService: MessageService,
    private redisService: RedisExtendedService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Message])
  async messages(
    @Args('conversationId', { nullable: true }) conversationId?: string,
    @Args('rideId', { nullable: true }) rideId?: string,
    @Args('cursor', { nullable: true }) cursor?: string,
    @Args('limit', { defaultValue: 20 }) limit?: number,
  ): Promise<Message[]> {
    return this.messageService.getMessages(
      conversationId,
      rideId,
      cursor,
      limit,
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
    @CurrentUser() user: User,
  ): Promise<Message> {
    return this.messageService.editMessage(messageId, content, user.id);
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
}
