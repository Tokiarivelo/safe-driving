import { Module, OnModuleInit } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { PrismaModule } from '../prisma-module/prisma.module';
import { RedisModule } from '../redis/redis.module';
import { AuthModule } from 'src/auth/auth.module';
import { ElasticModule } from 'src/elasticsearch/elastic/elastic.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConversationSearchService } from './conversation-search.service';

@Module({
  imports: [
    ElasticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        node: cfg.get('ELASTICSEARCH_NODE'),
      }),
      inject: [ConfigService],
    }),

    PrismaModule,
    RedisModule,
    AuthModule,
  ],
  providers: [
    ConversationService,
    ConversationResolver,
    ConversationSearchService,
  ],
  exports: [ConversationService, ConversationSearchService],
})
export class ConversationModule implements OnModuleInit {
  constructor(
    private readonly conversationSearchService: ConversationSearchService,
  ) {}

  async onModuleInit() {
    await this.conversationSearchService.createIndexIfNotExists();
    // await this.conversationSearchService.bulkIndexAllConversations({
    //   refresh: true,
    // });
  }
}
