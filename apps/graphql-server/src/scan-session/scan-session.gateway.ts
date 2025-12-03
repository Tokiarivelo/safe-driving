import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: [/http:\/\/localhost:\d{2,5}/, /http:\/\/127\.0\.0\.1:\d{2,5}/],
    credentials: true,
  },
  namespace: '/scan',
})
export class ScanSessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ScanSessionGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected to scan gateway: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected from scan gateway: ${client.id}`);
  }

  @SubscribeMessage('joinScanSession')
  handleJoinSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string },
  ) {
    const roomName = `scan_session_${data.sessionId}`;
    client.join(roomName);
    this.logger.log(
      `Client ${client.id} joined scan session room: ${roomName}`,
    );
    return { success: true, room: roomName };
  }

  @SubscribeMessage('leaveScanSession')
  handleLeaveSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string },
  ) {
    const roomName = `scan_session_${data.sessionId}`;
    client.leave(roomName);
    this.logger.log(`Client ${client.id} left scan session room: ${roomName}`);
    return { success: true };
  }

  /**
   * Broadcast scan result to all clients in the session room
   */
  broadcastScanResult(sessionId: string, scannedValue: string) {
    const roomName = `scan_session_${sessionId}`;
    this.server.to(roomName).emit('scan-result', {
      sessionId,
      scannedValue,
      timestamp: new Date().toISOString(),
    });
    this.logger.log(`Broadcasted scan result to room: ${roomName}`);
  }

  /**
   * Broadcast session expired event
   */
  broadcastSessionExpired(sessionId: string) {
    const roomName = `scan_session_${sessionId}`;
    this.server.to(roomName).emit('scan-session-expired', {
      sessionId,
      timestamp: new Date().toISOString(),
    });
    this.logger.log(`Broadcasted session expired to room: ${roomName}`);
  }
}
