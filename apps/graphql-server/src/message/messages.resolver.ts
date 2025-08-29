// messages.resolver.ts
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Message, User } from 'src/dtos/@generated';
import { SendMessageInput } from 'src/dtos/message/message.input';
import { MessagePayload } from 'src/dtos/message/message.output';
import { RedisService } from 'src/redis/redis.service';
import { MessageService } from './messages.service';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Resolver(() => Message)
@UseGuards(JwtAuthGuard)
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    private redisService: RedisService,
  ) {}

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

  @Mutation(() => Message)
  async sendMessage(
    @Args('input') input: SendMessageInput,
    @CurrentUser() user: User,
  ): Promise<Message> {
    const userId = user.id;
    return this.messageService.sendMessage(userId, input);
  }

  @Mutation(() => Message)
  async markMessageAsDelivered(
    @Args('messageId') messageId: string,
  ): Promise<Message> {
    return this.messageService.markAsDelivered(messageId);
  }

  @Subscription(() => MessagePayload, {
    filter: (payload, variables) => {
      // Filtrer les messages selon la conversation/ride
      const message = payload.messageReceived.message;
      if (variables.conversationId) {
        return message.conversationId === variables.conversationId;
      }
      if (variables.rideId) {
        return message.rideId === variables.rideId;
      }
      return false;
    },
  })
  messageReceived(
    @Args('conversationId', { nullable: true }) conversationId?: string,
    @Args('rideId', { nullable: true }) rideId?: string,
  ) {
    const channelName = conversationId
      ? `conversation_${conversationId}`
      : `ride_${rideId}`;

    return this.redisService.getPubSub().asyncIterator(channelName);
  }
}
