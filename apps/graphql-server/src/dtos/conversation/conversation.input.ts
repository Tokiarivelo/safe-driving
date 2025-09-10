import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsEnum, IsArray, IsUUID } from 'class-validator';
import { ConversationType } from '../@generated';

@InputType()
export class CreateConversationInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => ConversationType)
  @IsEnum(ConversationType)
  type: ConversationType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  rideId?: string;

  @Field(() => [String])
  @IsArray()
  @IsUUID('4', { each: true })
  participantIds: string[];
}

@InputType()
export class UpdateConversationInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;
}

@InputType()
export class AddParticipantInput {
  @Field()
  @IsUUID()
  conversationId: string;

  @Field()
  @IsUUID()
  userId: string;
}

@InputType()
export class RemoveParticipantInput {
  @Field()
  @IsUUID()
  conversationId: string;

  @Field()
  @IsUUID()
  userId: string;
}
