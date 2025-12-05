import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { NotificationGateway } from './notification.gateway';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [PrismaModule, AuthModule, RedisModule],
  providers: [NotificationService, NotificationResolver, NotificationGateway],
  exports: [NotificationService, NotificationGateway],
})
export class NotificationModule {}
