import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class MessageSenderSource {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  email?: string | null;

  @Field(() => String, { nullable: true })
  firstName?: string | null;

  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field(() => String, { nullable: true })
  username?: string | null;

  @Field(() => String, { nullable: true })
  avatarUrl?: string | null;
}

@ObjectType()
export class MessageAttachmentSource {
  @Field(() => String)
  id: string;

  @Field(() => String)
  type: string;

  @Field(() => String, { nullable: true })
  fileId?: string | null;

  @Field(() => String, { nullable: true })
  url?: string | null;

  @Field(() => String, { nullable: true })
  linkTitle?: string | null;

  @Field(() => String, { nullable: true })
  rideId?: string | null;
}

@ObjectType()
export class MessageSource {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  conversationId?: string | null;

  @Field(() => String, { nullable: true })
  rideId?: string | null;

  @Field(() => String)
  senderId: string;

  @Field(() => String, { nullable: true })
  content?: string | null;

  @Field(() => String, { nullable: true })
  clientTempId?: string | null;

  @Field(() => String, { nullable: true })
  parentMessageId?: string | null;

  @Field(() => Boolean)
  edited: boolean;

  @Field(() => Date, { nullable: true })
  editedAt?: Date | null;

  @Field(() => Boolean)
  deleted: boolean;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  sentAt?: Date | null;

  @Field(() => Date, { nullable: true })
  deliveredAt?: Date | null;

  @Field(() => String)
  state: string;

  @Field(() => MessageSenderSource)
  sender: MessageSenderSource;

  @Field(() => [MessageAttachmentSource])
  attachments: MessageAttachmentSource[];
}

@ObjectType()
export class MessageSearchHit {
  @Field(() => String)
  _index: string;

  @Field(() => String)
  _id: string;

  @Field(() => Number)
  _score: number;

  @Field(() => MessageSource)
  _source: MessageSource;

  @Field(() => Int, {
    nullable: true,
    description: 'Position of the message in the conversation (0-based index)',
  })
  position?: number;
}

@ObjectType()
export class MessageSearchResponse {
  @Field(() => Int)
  total: number;

  @Field(() => [MessageSearchHit])
  hits: MessageSearchHit[];
}
