import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Message } from '../@generated';

@ObjectType()
export class MessagesAroundOutput {
  @Field(() => [Message], {
    description: 'List of messages around the target message',
  })
  messages: Message[];

  @Field(() => String, {
    description: 'ID of the target message (the one that was clicked)',
  })
  targetMessageId: string;

  @Field(() => Int, {
    description:
      'Position of the target message in the conversation (0-based index)',
  })
  targetPosition: number;

  @Field(() => Int, {
    description: 'Number of messages loaded before the target message',
  })
  beforeCount: number;

  @Field(() => Int, {
    description: 'Number of messages loaded after the target message',
  })
  afterCount: number;

  @Field(() => Boolean, {
    description: 'Whether there are more messages before the loaded range',
  })
  hasMoreBefore: boolean;

  @Field(() => Boolean, {
    description: 'Whether there are more messages after the loaded range',
  })
  hasMoreAfter: boolean;
}
