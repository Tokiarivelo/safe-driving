import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
  @Field({ nullable: true })
  conversationId?: string;

  @Field({ nullable: true })
  rideId?: string;

  @Field({ nullable: true })
  recipientId?: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  clientTempId?: string;

  @Field({ nullable: true })
  parentMessageId?: string;
}
