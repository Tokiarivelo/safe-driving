import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from '../@generated';

@ObjectType()
export class MessagePayload {
  @Field(() => Message)
  message: Message;

  @Field()
  type: string; // 'NEW_MESSAGE', 'MESSAGE_UPDATED', 'MESSAGE_DELETED', 'MESSAGE_READ', etc.
}
