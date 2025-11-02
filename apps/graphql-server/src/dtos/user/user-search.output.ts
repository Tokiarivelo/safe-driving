import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class UserRoleSource {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class UserSource {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field(() => String, { nullable: true })
  phone?: string | null;

  @Field(() => String, { nullable: true })
  username?: string | null;

  @Field(() => Boolean)
  isVerified: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;

  @Field(() => String, { nullable: true })
  status?: string | null;

  @Field(() => String, { nullable: true })
  driverStatus?: string | null;

  @Field(() => [UserRoleSource])
  roles: UserRoleSource[];
}

@ObjectType()
export class UserSearchHit {
  @Field(() => String)
  _index: string;

  @Field(() => String)
  _id: string;

  @Field(() => Number)
  _score: number;

  @Field(() => UserSource)
  _source: UserSource;
}

@ObjectType()
export class UserSearchResponse {
  @Field(() => Int)
  total: number;

  @Field(() => [UserSearchHit])
  hits: UserSearchHit[];
}
