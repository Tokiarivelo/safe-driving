import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsString()
  password!: string;

  @Field({ nullable: true })
  @IsString()
  username?: string;

  @Field({ nullable: true })
  @IsString()
  lastName?: string;

  @Field()
  @IsString()
  firstName!: string;
}
