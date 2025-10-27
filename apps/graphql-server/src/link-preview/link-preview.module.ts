import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '../redis/redis.module';
import { LinkPreviewService } from './link-preview.service';
import { LinkPreviewResolver } from './link-preview.resolver';

@Module({
  imports: [ConfigModule, RedisModule],
  providers: [LinkPreviewService, LinkPreviewResolver],
  exports: [LinkPreviewService],
})
export class LinkPreviewModule {}
