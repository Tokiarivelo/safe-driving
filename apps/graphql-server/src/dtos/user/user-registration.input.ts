import { Field, InputType } from '@nestjs/graphql';
import { ClientRegistrationInput } from './client-registration.input';
import { DriverRegistrationInput } from './driver-registration.input';
import { UserCreateInput } from '../@generated';

@InputType()
export class UserRegistrationInput {
  @Field(() => UserCreateInput)
  user: UserCreateInput;

  @Field(() => ClientRegistrationInput)
  client: ClientRegistrationInput;

  @Field(() => DriverRegistrationInput)
  driver: DriverRegistrationInput;
}
