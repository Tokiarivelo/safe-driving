import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind } from 'graphql';
import { GraphQLError } from 'graphql';

@Scalar('DateTime', () => Date)
export class DateTimeScalar implements CustomScalar<string, Date> {
  description =
    'DateTime scalar - accepts Date, ISO string or timestamp; throws on invalid date';

  // Server -> client (sérialisation)
  serialize(value: unknown): string {
    if (value instanceof Date) {
      if (Number.isNaN(value.getTime())) {
        throw new GraphQLError(
          `DateTime cannot represent an invalid Date: ${value}`,
        );
      }
      return value.toISOString();
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        throw new GraphQLError(
          `DateTime cannot represent an invalid Date: ${value}`,
        );
      }
      return date.toISOString();
    }

    throw new GraphQLError(`DateTime cannot represent value: ${value}`);
  }

  // Client -> server (variables GraphQL)
  parseValue(value: unknown): Date {
    if (value instanceof Date) {
      if (Number.isNaN(value.getTime())) {
        throw new GraphQLError(
          `DateTime cannot represent an invalid Date: ${value}`,
        );
      }
      return value;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        throw new GraphQLError(
          `DateTime cannot represent an invalid Date: ${value}`,
        );
      }
      return date;
    }

    throw new GraphQLError(`DateTime cannot represent value: ${value}`);
  }

  // Parsing des littéraux dans la query GraphQL
  parseLiteral(ast: any): Date {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
      const date = new Date(ast.value);
      if (Number.isNaN(date.getTime())) {
        throw new GraphQLError(
          `DateTime cannot represent an invalid Date: ${ast.value}`,
        );
      }
      return date;
    }

    throw new GraphQLError(`DateTime cannot represent literal: ${ast.kind}`);
  }
}
