import { Module, OnModuleInit } from '@nestjs/common';
import { MessageResolver } from 'src/message/messages.resolver';
import { MessageService } from 'src/message/messages.service';
import { MessageSearchService } from 'src/message/message-search.service';
import { ChatGateway } from '../chat/chat.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { ChatCacheService } from 'src/chat/chat-cache.service';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { RedisModule } from 'src/redis/redis.module';
import { ReactionModule } from 'src/reaction/reaction.module';
import { LinkPreviewModule } from 'src/link-preview';

@Module({
  providers: [
    MessageService,
    MessageResolver,
    MessageSearchService,
    ChatGateway,
    ChatCacheService,
  ],
  imports: [
    PrismaModule,
    AuthModule,
    RedisModule,
    ReactionModule,
    LinkPreviewModule,
  ],
  exports: [MessageService, ChatGateway, MessageSearchService],
})
export class MessageModule implements OnModuleInit {
  constructor(private readonly messageSearchService: MessageSearchService) {}

  async onModuleInit() {
    await this.messageSearchService.createIndexIfNotExists();
  }
}
