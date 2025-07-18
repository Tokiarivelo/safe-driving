import { Field, InputType } from '@nestjs/graphql';
import { ClientRegistrationInput } from './client-registration.input';
import { DriverRegistrationInput } from './driver-registration.input';

@InputType()
export class UserRegistrationInput {
  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field()
  phone: string;

  @Field()
  username: string;

  @Field()
  role: string;

  @Field()
  type: string;

  @Field(() => ClientRegistrationInput)
  client: ClientRegistrationInput;

  @Field(() => DriverRegistrationInput)
  driver: DriverRegistrationInput;
}
