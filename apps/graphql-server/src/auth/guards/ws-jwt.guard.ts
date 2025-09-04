// src/auth/ws-jwt.guard.ts
import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import type { Socket } from 'socket.io';

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
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1) Try to get socket (Socket.IO)
    const client = context.switchToWs().getClient<Socket>();

    if (!client) {
      throw new WsException('No socket client');
    }

    let token: string | undefined;

    try {
      if (client) {
        // socket.io: token sent in handshake.auth or authorization header or query
        token =
          client.handshake?.auth?.token ||
          client.handshake?.headers?.authorization ||
          client.handshake?.query?.token ||
          client.handshake?.headers?.Authorization;
        if (typeof token === 'string' && token.startsWith('Bearer ')) {
          token = token.slice(7);
        }
      }

      // 2) GraphQL subscriptions (Apollo/graphql-ws): connectionParams are usually in args[2]
      if (!token) {
        const gqlCtx = context.getArgByIndex?.(2) ?? null;
        const connectionParams =
          gqlCtx?.connectionParams ?? gqlCtx?.extra?.connectionParams ?? null;
        // sometimes authorization is under "authorization" or "Authorization"
        token =
          connectionParams?.authorization ||
          connectionParams?.Authorization ||
          connectionParams?.token ||
          undefined;
        if (typeof token === 'string' && token.startsWith('Bearer ')) {
          token = token.slice(7);
        }
      }

      if (!token) {
        throw new WsException('Unauthorized: token not provided');
      }

      // 3) Verify token
      const payload = await this.jwtService.verifyAsync(token).catch((err) => {
        throw new WsException('Unauthorized: invalid token');
      });

      // 4) Attach user to appropriate context for later use
      if (client) {
        // Socket.IO: attach to socket.data for later usage
        // (Nest recommends using client.data for arbitrary metadata)
        client.data = client.data || {};
        client.data.user = payload;
      }

      // GraphQL subscription context
      const maybeGqlCtx = context.getArgByIndex?.(2) ?? null;
      if (maybeGqlCtx) {
        // attach user in connection context so subscription resolvers can use it
        maybeGqlCtx.user = payload;
        // also set maybeGqlCtx.req.user if exists (some integrations use req)
        if (maybeGqlCtx.req) maybeGqlCtx.req.user = payload;
        // for graphql-ws extra: maybeGqlCtx.extra = maybeGqlCtx.extra || {}; maybeGqlCtx.extra.user = payload;
      }

      return true;
    } catch (err) {
      // convert to WsException so Nest WebSocket pipeline understands it
      if (err instanceof WsException) throw err;
      throw new WsException('Unauthorized');
    }
  }
}
