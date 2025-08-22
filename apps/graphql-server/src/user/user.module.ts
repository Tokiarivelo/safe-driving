import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './user.resolver';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { QrModule } from 'src/qr/qr.module';

@Module({
  imports: [PrismaModule, QrModule],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
