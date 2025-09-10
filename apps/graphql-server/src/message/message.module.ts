import { forwardRef, Module } from '@nestjs/common';
import { MessageResolver } from 'src/message/messages.resolver';
import { MessageService } from 'src/message/messages.service';
import { ChatGateway } from '../chat/chat.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { ChatCacheService } from 'src/chat/chat-cache.service';
import { PrismaModule } from 'src/prisma-module/prisma.module';

@Module({
  providers: [MessageService, MessageResolver, ChatGateway, ChatCacheService],
  imports: [PrismaModule, AuthModule],
  exports: [MessageService, ChatGateway],
})
export class MessageModule {}
