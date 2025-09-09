import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import {
  ConversationCount,
  ConversationParticipant,
  ConversationType,
  File,
  Message,
} from '../@generated';

@ObjectType()
export class UserPartialAvatar extends PartialType(File) {}

@ObjectType()
export class PartialConversationCount extends PartialType(ConversationCount) {}

@ObjectType()
export class UserUserConversationParticipant {
  @Field(() => String, { nullable: false })
  id!: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  firstName?: string;
  @Field(() => String, { nullable: true })
  lastName?: string | null;
  @Field(() => String, { nullable: true })
  phone?: string | null;
  @Field(() => String, { nullable: true })
  username?: string | null;
  @Field(() => UserPartialAvatar, { nullable: true })
  avatar?: InstanceType<typeof UserPartialAvatar> | null;
}

@ObjectType()
export class UserConversation {
  @Field(() => String, { nullable: false })
  id!: string;
  @Field(() => String, { nullable: true })
  title!: string | null;
  @Field(() => String, { nullable: true })
  rideId!: string | null;
  @Field(() => String, { nullable: true })
  directHash!: string | null;
  @Field(() => Date, { nullable: true })
  createdAt!: Date;
  @Field(() => ConversationType, { defaultValue: 'DIRECT', nullable: false })
  type!: `${ConversationType}`;
  @Field(() => [UserConversationParticipant], { nullable: true })
  participants?: Array<UserConversationParticipant>;
  @Field(() => [Message], { nullable: true })
  messages?: Array<Message>;
  @Field(() => PartialConversationCount, { nullable: true })
  _count?: InstanceType<typeof PartialConversationCount> | null;
}

@ObjectType()
export class UserConversationParticipant {
  @Field(() => String, { nullable: false })
  id!: string;
  @Field(() => String, { nullable: true })
  conversationId?: string;
  @Field(() => String, { nullable: true })
  userId?: string;
  @Field(() => String, { nullable: true })
  role!: string | null;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  isMuted!: boolean | null;
  @Field(() => Date, { nullable: true })
  joinedAt!: Date | null;
  @Field(() => UserUserConversationParticipant, { nullable: false })
  user?: InstanceType<typeof UserUserConversationParticipant>;
  @Field(() => UserConversation, { nullable: true })
  conversation?: InstanceType<typeof UserConversation> | null;
}

@ObjectType()
export class UserConversationsResponse {
  @Field(() => [UserConversation])
  conversations: UserConversation[];

  @Field()
  hasNextPage: boolean;

  @Field({ nullable: true })
  cursor?: string;
}

@ObjectType()
export class ConversationParticipantPayload {
  @Field(() => ConversationParticipant)
  participant: ConversationParticipant;

  @Field()
  action: string; // 'ADDED', 'REMOVED'

  @Field()
  conversationId: string;
}

@ObjectType()
export class ConversationPayload {
  @Field(() => UserConversation)
  conversation: UserConversation;

  @Field()
  action: string; // 'CREATED', 'UPDATED', 'DELETED', 'PARTICIPANT_ADDED', 'PARTICIPANT_REMOVED'
}
