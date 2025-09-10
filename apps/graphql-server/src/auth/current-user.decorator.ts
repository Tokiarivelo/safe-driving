import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/dtos/@generated';

/**
 * Custom parameter decorator to retrieve the current authenticated user from the GraphQL request context.
 *
 * @param data - Optional data passed to the decorator (unused).
 * @param ctx - The execution context of the request.
 * @returns {User} The currently authenticated user object.
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(ctx);
    const request = gqlCtx.getContext().req;

    return request.user as User;
  },
);
