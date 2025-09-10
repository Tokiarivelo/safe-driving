import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { PrismaModule } from '../prisma-module/prisma.module';
import { RedisModule } from '../redis/redis.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, RedisModule, AuthModule],
  providers: [ConversationService, ConversationResolver],
  exports: [ConversationService],
})
export class ConversationModule {}
