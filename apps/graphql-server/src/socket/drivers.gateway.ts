import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { RedisService } from '../redis/redis.service';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket'],
})
export class DriversGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly redis: RedisService) {}

  afterInit(server: Server) {
    // Subscribe to Redis Pub/Sub channel "drivers:updates"
    this.redis.subscribe('drivers:updates', (message: string) => {
      const update = JSON.parse(message);
      // Broadcast update to all connected clients
      server.emit('drivers:update', update);
    });
  }

  handleConnection(client: Socket) {
    // Optionally send a welcome message or do auth checks
  }

  handleDisconnect(client: Socket) {
    // Cleanup if needed
  }

  @SubscribeMessage('drivers:list')
  async handleDriversList(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    const pattern = body?.pattern || 'driver:*';

    try {
      // Fetch initial list from Redis
      const items = await this.redis.getEntitiesByPattern(pattern);

      // Send result back to requesting client
      client.emit('drivers:list:result', { items });

      // From now on, client will also receive updates via "drivers:update"
      return;
    } catch (err) {
      client.emit('drivers:list:error', {
        message: 'Failed to fetch drivers',
        details: err instanceof Error ? err.message : String(err),
      });
    }
  }
}
