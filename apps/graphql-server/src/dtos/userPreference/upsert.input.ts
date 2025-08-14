import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserPreferenceUpsertInput {
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => Boolean, { nullable: true })
  activateLocation?: boolean;
  @Field(() => Boolean, { nullable: true })
  activateNotifications?: boolean;
  @Field(() => String, { nullable: true })
  language?: string;
  @Field(() => String, { nullable: true })
  theme?: string;
  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;
  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;
  @Field(() => Boolean, { nullable: true })
  activateSmsNotifications?: boolean;
  @Field(() => Boolean, { nullable: true })
  activateEmailNotifications?: boolean;
  @Field(() => Boolean, { nullable: true })
  cguAccepted?: boolean;
  @Field(() => Boolean, { nullable: true })
  privacyPolicyAccepted?: boolean;

  @Field(() => [String], { nullable: true })
  preferedVehicleTypeIds?: string[]; // Assuming this is a list of vehicle type IDs
}
