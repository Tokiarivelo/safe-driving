import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsResolver } from './statistics.resolver';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [StatisticsService, StatisticsResolver],
  exports: [StatisticsService],
})
export class StatisticsModule {}
