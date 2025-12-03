import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as QRCode from 'qrcode';
import { RedisService } from 'src/redis/redis.service';
import {
  ScanSessionResult,
  ScanSessionStatus,
} from 'src/dtos/scan-session/scan-session.output';

// Redis key prefix and TTL for scan sessions
// These are intentionally constants as they define the contract for temporary scan sessions
const SCAN_SESSION_PREFIX = 'scan:session:';
const SCAN_SESSION_TTL = 60; // 60 seconds TTL for initial session
const SCAN_SESSION_EXTENDED_TTL = 30; // 30 seconds TTL after scan completion

export interface ScanSessionData {
  status: 'waiting' | 'scanned' | 'expired';
  scannedValue?: string;
  createdAt: string;
}

@Injectable()
export class ScanSessionService {
  private readonly logger = new Logger(ScanSessionService.name);

  constructor(private readonly redisService: RedisService) {}

  /**
   * Create a new scan session with a QR code containing a deep link
   */
  async createScanSession(): Promise<ScanSessionResult> {
    const sessionId = uuidv4();
    const sessionKey = `${SCAN_SESSION_PREFIX}${sessionId}`;

    // Store session data in Redis with TTL
    const sessionData: ScanSessionData = {
      status: 'waiting',
      createdAt: new Date().toISOString(),
    };

    await this.redisService.set(
      sessionKey,
      JSON.stringify(sessionData),
      SCAN_SESSION_TTL,
    );

    // Generate deep link URL
    const deepLink = `myapp://scan?sessionId=${sessionId}`;

    // Generate QR code as base64 data URL
    const qrBase64 = await QRCode.toDataURL(deepLink, {
      errorCorrectionLevel: 'M',
      margin: 2,
      width: 256,
    });

    this.logger.log(`Created scan session: ${sessionId}`);

    return {
      sessionId,
      qrBase64,
    };
  }

  /**
   * Get the status of a scan session
   */
  async getScanSessionStatus(
    sessionId: string,
  ): Promise<ScanSessionStatus | null> {
    const sessionKey = `${SCAN_SESSION_PREFIX}${sessionId}`;
    const data = await this.redisService.get(sessionKey);

    if (!data) {
      return null;
    }

    try {
      const sessionData: ScanSessionData = JSON.parse(data);
      return {
        sessionId,
        status: sessionData.status,
        scannedValue: sessionData.scannedValue,
      };
    } catch {
      this.logger.error(`Failed to parse session data for ${sessionId}`);
      return null;
    }
  }

  /**
   * Update the scan session with the scanned value
   */
  async updateScanSession(
    sessionId: string,
    scannedValue: string,
  ): Promise<boolean> {
    const sessionKey = `${SCAN_SESSION_PREFIX}${sessionId}`;
    const data = await this.redisService.get(sessionKey);

    if (!data) {
      this.logger.warn(`Scan session not found or expired: ${sessionId}`);
      return false;
    }

    try {
      const sessionData: ScanSessionData = JSON.parse(data);
      sessionData.status = 'scanned';
      sessionData.scannedValue = scannedValue;

      // Update with remaining TTL (keep the session alive for a bit longer after scan)
      await this.redisService.set(
        sessionKey,
        JSON.stringify(sessionData),
        SCAN_SESSION_EXTENDED_TTL,
      );

      this.logger.log(`Updated scan session: ${sessionId} with value`);
      return true;
    } catch {
      this.logger.error(`Failed to update session data for ${sessionId}`);
      return false;
    }
  }

  /**
   * Delete a scan session
   */
  async deleteScanSession(sessionId: string): Promise<void> {
    const sessionKey = `${SCAN_SESSION_PREFIX}${sessionId}`;
    await this.redisService.del(sessionKey);
    this.logger.log(`Deleted scan session: ${sessionId}`);
  }
}
