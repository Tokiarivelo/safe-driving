import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@ObjectType()
export class ForgotPasswordOutput {
  @Field()
  @IsString()
  resetLink: string;

  @Field()
  @IsEmail()
  email: string;
}
