import { Field, InputType } from '@nestjs/graphql';
import {
  EnumImageTypeFieldUpdateOperationsInput,
  NullableIntFieldUpdateOperationsInput,
  NullableStringFieldUpdateOperationsInput,
  StringFieldUpdateOperationsInput,
} from '../@generated';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CustomFileUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: InstanceType<typeof StringFieldUpdateOperationsInput>;
  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  url?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  key?: InstanceType<typeof StringFieldUpdateOperationsInput>;
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  originalName?: InstanceType<typeof StringFieldUpdateOperationsInput>;
  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  contentType?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
  @Field(() => NullableIntFieldUpdateOperationsInput, { nullable: true })
  size?: InstanceType<typeof NullableIntFieldUpdateOperationsInput>;
  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  etag?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  status?: InstanceType<typeof StringFieldUpdateOperationsInput>;
  @Field(() => GraphQLJSON, { nullable: true })
  meta?: any;
  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  name?: InstanceType<typeof NullableStringFieldUpdateOperationsInput>;
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  userId?: InstanceType<typeof StringFieldUpdateOperationsInput>;
  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  driverVehicleId?: InstanceType<
    typeof NullableStringFieldUpdateOperationsInput
  >;
  @Field(() => EnumImageTypeFieldUpdateOperationsInput, { nullable: true })
  type?: InstanceType<typeof EnumImageTypeFieldUpdateOperationsInput>;
}
