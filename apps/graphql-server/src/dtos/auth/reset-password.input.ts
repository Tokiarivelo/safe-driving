import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsUUID()
  userId!: string;

  @Field()
  @IsString()
  password!: string;
}
