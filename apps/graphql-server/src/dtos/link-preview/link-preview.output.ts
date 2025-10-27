import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class LinkPreviewData {
  @Field()
  url: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  meta?: Record<string, any>;
}
