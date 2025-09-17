import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Message } from '../@generated';

export enum MessageEventType {
  NEW_MESSAGE = 'NEW_MESSAGE',
  MESSAGE_UPDATED = 'MESSAGE_UPDATED',
  MESSAGE_DELETED = 'MESSAGE_DELETED',
  MESSAGE_READ = 'MESSAGE_READ',
}

registerEnumType(MessageEventType, {
  name: 'MessageEventType',
  description: 'Types of message events',
});

@ObjectType()
export class MessagePayload {
  @Field(() => Message)
  message: Message;

  @Field(() => MessageEventType)
  type: MessageEventType;
}
