import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { QrService } from './qr.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/dtos/@generated';
import { Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
@UseGuards(JwtAuthGuard)
export class QrResolver {
  constructor(private qrService: QrService) {}

  // mutation pour créer QR (restreindre son usage)
  @Mutation(() => String)
  async createUserQr(
    @CurrentUser() user: User,
    @Args('type', { nullable: true }) type: 'png' | 'svg',
  ) {
    const { dataUrl } = await this.qrService.createQrForUser(user.id, type);
    return dataUrl; // renvoie "data:image/png;base64,...."
  }

  @Query(() => String)
  async getUserQr(
    @CurrentUser() user: User,
    @Args('type', { nullable: true }) type: 'png' | 'svg',
  ) {
    const { dataUrl } = await this.qrService.getUserQr(user.id, type);
    return dataUrl; // renvoie "data:image/png;base64,...."
  }
}
