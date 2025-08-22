import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { QrResolver } from './qr.resolver';
import { QrService } from './qr.service';

@Module({
  imports: [PrismaModule],
  providers: [QrService, QrResolver],
  exports: [QrService],
})
export class QrModule {}
