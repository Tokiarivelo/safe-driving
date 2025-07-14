import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    // Créer un contexte GraphQL à partir du contexte d'exécution
    const ctx = GqlExecutionContext.create(context);

    // Récupérer la requête depuis le contexte GraphQL
    const request = ctx.getContext().req;

    return request;
  }
}
