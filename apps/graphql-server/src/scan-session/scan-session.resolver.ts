import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ScanSessionService } from './scan-session.service';
import { ScanSessionGateway } from './scan-session.gateway';
import {
  ScanSessionResult,
  ScanSessionStatus,
} from 'src/dtos/scan-session/scan-session.output';
import { SendScanResultInput } from 'src/dtos/scan-session/scan-session.input';

@Resolver()
export class ScanSessionResolver {
  constructor(
    private readonly scanSessionService: ScanSessionService,
    private readonly scanSessionGateway: ScanSessionGateway,
  ) {}

  /**
   * Create a new scan session and return the session ID with QR code
   * This mutation requires authentication
   */
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ScanSessionResult)
  async createScanSession(): Promise<ScanSessionResult> {
    return this.scanSessionService.createScanSession();
  }

  /**
   * Send the scan result from mobile app
   * No authentication required as the sessionId acts as a temporary token
   */
  @Mutation(() => Boolean)
  async sendScanResult(
    @Args('input') input: SendScanResultInput,
  ): Promise<boolean> {
    const { sessionId, scannedValue } = input;

    // Update the session with the scanned value
    const success = await this.scanSessionService.updateScanSession(
      sessionId,
      scannedValue,
    );

    if (success) {
      // Broadcast the result to all connected clients in the session room
      this.scanSessionGateway.broadcastScanResult(sessionId, scannedValue);
    }

    return success;
  }

  /**
   * Get the status of a scan session
   */
  @Query(() => ScanSessionStatus, { nullable: true })
  async getScanSessionStatus(
    @Args('sessionId') sessionId: string,
  ): Promise<ScanSessionStatus | null> {
    return this.scanSessionService.getScanSessionStatus(sessionId);
  }
}
