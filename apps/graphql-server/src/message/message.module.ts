import { forwardRef, Module } from '@nestjs/common';
import { MessageResolver } from 'src/message/messages.resolver';
import { MessageService } from 'src/message/messages.service';
import { ChatGateway } from '../chat/chat.gateway';
import { WsJwtGuard } from 'src/auth/guards/ws-jwt.guard';
import { AuthModule } from 'src/auth/auth.module';
import { ChatCacheService } from 'src/chat/chat-cache.service';

@Module({
  providers: [
    MessageService,
    MessageResolver,
    ChatGateway,
    WsJwtGuard,
    ChatCacheService,
  ],
  imports: [
    forwardRef(() => AuthModule), // forwardRef si AuthModule importe MessageModule aussi
  ],
  exports: [MessageService, ChatGateway],
})
export class MessageModule {}
