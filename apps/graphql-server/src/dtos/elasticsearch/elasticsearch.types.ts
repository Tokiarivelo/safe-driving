// src/elasticsearch/elasticsearch.types.ts
import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType({ description: 'Statut de santé du service' })
export class HealthCheckType {
  @Field(() => String)
  status: string;

  @Field(() => String)
  service: string;
}

@ObjectType({ description: 'Document de recherche' })
export class SearchDocumentType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Number, { nullable: true })
  score?: number;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: Record<string, any>;
}

@InputType({ description: 'Input pour créer/mettre à jour un document' })
export class SearchDocumentInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: Record<string, any>;
}

@ObjectType({ description: 'Résultat de recherche' })
export class SearchResultType {
  @Field(() => String)
  query: string;

  @Field(() => Int)
  total: number;

  @Field(() => [SearchDocumentType])
  results: SearchDocumentType[];
}
