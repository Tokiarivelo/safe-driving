import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './user.resolver';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { QrModule } from 'src/qr/qr.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [PrismaModule, QrModule, UploadModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
