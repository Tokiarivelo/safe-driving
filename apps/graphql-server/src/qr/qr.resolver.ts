import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { QrService } from './qr.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/dtos/@generated';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class QrResolver {
  constructor(private qrService: QrService) {}

  // mutation pour créer QR (restreindre son usage)
  @Mutation(() => String)
  async createUserQr(@CurrentUser() user: User) {
    const { dataUrl } = await this.qrService.createQrForUser(user.id);
    return dataUrl; // renvoie "data:image/png;base64,...."
  }
}
