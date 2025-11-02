import { Field, ObjectType, Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { ConversationType } from '@prisma/client';

@ObjectType()
export class ConversationParticipantSource {
  @Field(() => String)
  id: string;

  @Field(() => String)
  conversationId: string;

  @Field(() => String)
  userId: string;

  @Field(() => String, { nullable: true })
  role?: string | null;

  @Field(() => Boolean)
  isMuted: boolean;

  @Field(() => Date)
  joinedAt: Date;

  @Field(() => String, { nullable: true })
  displayName?: string | null;

  @Field(() => String, { nullable: true })
  username?: string | null;

  @Field(() => String, { nullable: true })
  email?: string | null;
}

@ObjectType()
export class ConversationSource {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  title?: string | null;

  @Field(() => String, { nullable: true })
  type?: ConversationType | null;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | null;

  @Field(() => String, { nullable: true })
  createdAt_text?: string | null;

  @Field(() => [ConversationParticipantSource])
  participants: ConversationParticipantSource[];

  @Field(() => Int)
  messageCount: number;
}

@ObjectType()
export class ConversationSearchHit {
  @Field(() => String)
  _index: string;

  @Field(() => String)
  _id: string;

  @Field(() => Number)
  _score: number;

  @Field(() => ConversationSource)
  _source: ConversationSource;
}

@ObjectType()
export class ConversationSearchResponse {
  @Field(() => Int)
  total: number;

  @Field(() => [ConversationSearchHit])
  hits: ConversationSearchHit[];
}
