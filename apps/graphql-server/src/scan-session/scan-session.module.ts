import { Module } from '@nestjs/common';
import { ScanSessionService } from './scan-session.service';
import { ScanSessionResolver } from './scan-session.resolver';
import { ScanSessionGateway } from './scan-session.gateway';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [ScanSessionService, ScanSessionResolver, ScanSessionGateway],
  exports: [ScanSessionService, ScanSessionGateway],
})
export class ScanSessionModule {}
