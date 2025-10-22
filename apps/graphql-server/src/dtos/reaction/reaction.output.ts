import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Reaction } from '../@generated';

@ObjectType()
export class ReactionGroup {
  @Field(() => String)
  type: string;

  @Field(() => Int)
  count: number;

  @Field(() => [String])
  userIds: string[];

  @Field(() => Boolean)
  hasReacted: boolean; // current user has reacted with this type
}

@ObjectType()
export class ReactionSummary {
  @Field(() => String)
  messageId: string;

  @Field(() => [ReactionGroup])
  reactions: ReactionGroup[];

  @Field(() => Int)
  totalReactions: number;
}

@ObjectType()
export class ReactionActionResult {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => Reaction, { nullable: true })
  reaction?: Reaction;

  @Field(() => ReactionSummary, { nullable: true })
  summary?: ReactionSummary;
}

@ObjectType()
export class ReactionStats {
  @Field(() => String)
  type: string;

  @Field(() => Int)
  count: number;
}
