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
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket'],
})
export class DriversGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(DriversGateway.name);

  constructor(private readonly redis: RedisService) {}

  afterInit(server: Server) {
    this.redis.subscribe('drivers:updates', (message: string) => {
      const update = JSON.parse(message);

      if (Array.isArray(update.cars)) {
        for (const car of update.cars) {
          // Send one event per car with a proper key
          server.emit('drivers:update', {
            key: `driver:${car.id}`,
            value: car,
          });
        }
      }
    });
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
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
