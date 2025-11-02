import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { RideService } from './ride.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/rides',
})
export class RideGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(RideGateway.name);

  constructor(private readonly rideService: RideService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected to /rides: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected from /rides: ${client.id}`);
  }

  /**
   * Rejoindre une room pour une course spécifique
   */
  @SubscribeMessage('joinRide')
  handleJoinRide(
    @MessageBody() rideId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`ride_${rideId}`);
    this.logger.log(`Client ${client.id} joined ride_${rideId}`);
    return { event: 'joinedRide', data: { rideId } };
  }

  /**
   * Quitter une room de course
   */
  @SubscribeMessage('leaveRide')
  handleLeaveRide(
    @MessageBody() rideId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`ride_${rideId}`);
    this.logger.log(`Client ${client.id} left ride_${rideId}`);
    return { event: 'leftRide', data: { rideId } };
  }

  /**
   * Émettre une mise à jour de course à tous les participants
   */
  emitRideUpdate(rideId: string, data: any) {
    this.server.to(`ride_${rideId}`).emit('rideUpdate', data);
    this.logger.log(`Emitted ride update to ride_${rideId}`);
  }

  /**
   * Émettre une mise à jour de participant
   */
  emitParticipantUpdate(rideId: string, data: any) {
    this.server.to(`ride_${rideId}`).emit('participantUpdate', data);
    this.logger.log(`Emitted participant update to ride_${rideId}`);
  }

  /**
   * Émettre une mise à jour de position (pour le tracking GPS)
   */
  @SubscribeMessage('updatePosition')
  handleUpdatePosition(
    @MessageBody() data: { rideId: string; position: any },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(`ride_${data.rideId}`).emit('positionUpdate', data.position);
    return { event: 'positionUpdated', data: { success: true } };
  }
}
