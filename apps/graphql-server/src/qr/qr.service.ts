import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma-module/prisma.service';

@Injectable()
export class QrService {
  constructor(private readonly prisma: PrismaService) {}

  // génère token opaque long
  private generateToken(): string {
    return randomBytes(32).toString('hex'); // 64 chars
  }

  async createQrForUser(userId: string, baseUrl = process.env.FRONTEND_URL) {
    const token = this.generateToken();
    // stocke en DB
    await this.prisma.qrToken.create({
      data: { token, userId },
    });

    // url encodée qui sera scannée
    const targetUrl = `${baseUrl}?token=${encodeURIComponent(token)}`;

    // génère un data url PNG (si tu veux renvoyer image directement)
    const dataUrl = await QRCode.toDataURL(targetUrl, {
      errorCorrectionLevel: 'M',
      margin: 2,
    });

    return { token, dataUrl, targetUrl };
  }

  async revokeToken(token: string) {
    return this.prisma.qrToken.updateMany({
      where: { token },
      data: { revoked: true },
    });
  }

  async findUserIdByToken(token: string) {
    const t = await this.prisma.qrToken.findUnique({ where: { token } });
    if (!t || t.revoked) return null;
    return t.userId;
  }
}
