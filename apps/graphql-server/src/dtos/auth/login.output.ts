import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { User } from '../@generated';

@ObjectType()
export class LoginOutput {
  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
