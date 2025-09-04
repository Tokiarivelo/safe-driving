// src/auth/ws-jwt.guard.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

/**
 * WsJwtGuard
 * - gère Socket.IO (handshake.auth, headers, query)
 * - gère GraphQL subscriptions (connectionParams)
 *
 * Usage:
 *  - @UseGuards(WsJwtGuard) sur ton Gateway (classe ou méthode)
 *  - ou l'ajouter dans le pipeline des resolvers subscription si tu veux
 */
@Injectable()
export class GraphqlWsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext() as any; // context GraphQL (req for HTTP, object returned by onConnect for WS)

    const rawToken = this.extractRawToken(ctx);

    if (!rawToken) {
      throw new UnauthorizedException('Authentication token not found');
    }

    const token = rawToken.replace(/^Bearer\s+/i, '').trim();

    try {
      // verifyAsync pour supporter async (si tu utilises secretOrKeyProvider, etc.)
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Attache l'utilisateur/claim au contexte pour l'utiliser dans les resolvers
      ctx.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * Tente d'extraire le header Authorization / token depuis :
   * - ctx.req.headers (HTTP)
   * - ctx.connection.context (apollo legacy)
   * - ctx.connectionParams / ctx (graphql-ws: ce que tu as retourné depuis onConnect)
   * - ctx.token / ctx.accessToken
   */
  private extractRawToken(ctx: any): string | null {
    // 1) HTTP request style
    if (ctx?.req?.headers) {
      const auth =
        ctx.req.headers.authorization ?? ctx.req.headers.Authorization;
      if (auth) return auth;
    }

    // 2) Apollo legacy (connection.context)
    if (ctx?.connection?.context) {
      const c = ctx.connection.context;
      if (c.authorization) return c.authorization;
      if (c.Authorization) return c.Authorization;
      if (c.headers?.authorization) return c.headers.authorization;
      if (c.headers?.Authorization) return c.headers.Authorization;
      if (c.token) return c.token;
      if (c.accessToken) return c.accessToken;
    }

    // 3) graphql-ws (onConnect return object becomes directly ctx)
    // certains setups renvoient { headers: {...} } depuis onConnect
    if (ctx?.headers) {
      const h = ctx.headers.authorization ?? ctx.headers.Authorization;
      if (h) return h;
    }

    // 4) connexion params direct (ex: connectionParams: { Authorization: 'Bearer ...' } )
    if (ctx?.authorization) return ctx.authorization;
    if (ctx?.Authorization) return ctx.Authorization;
    if (ctx?.req?.connectionParams?.headers) {
      const cp = ctx.req.connectionParams.headers;

      if (cp.authorization) return cp.authorization;
      if (cp.Authorization) return cp.Authorization;
      if (cp.token) return cp.token;
      if (cp.accessToken) return cp.accessToken;
    }

    // 5) fallback generic keys
    const possibleKeys = [
      'authorization',
      'Authorization',
      'token',
      'accessToken',
    ];
    for (const k of possibleKeys) {
      if (ctx?.[k]) return ctx[k];
    }

    return null;
  }
}
