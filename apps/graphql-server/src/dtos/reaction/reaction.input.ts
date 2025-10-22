import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class AddReactionInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  messageId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  type: string; // ex: "❤️", "👍", "🚩", "like", "laugh"
}

@InputType()
export class RemoveReactionInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  messageId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  type: string;
}

@InputType()
export class ToggleReactionInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  messageId: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  type: string;
}
