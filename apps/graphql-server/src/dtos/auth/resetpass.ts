import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsString()
  password!: string;

}
