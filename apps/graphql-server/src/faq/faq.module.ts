import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma-module/prisma.module';
import { FaqService } from './faq.service';
import { FaqResolver } from './faq.resolver';

@Module({
  imports: [PrismaModule],
  providers: [FaqService, FaqResolver],
  exports: [FaqService],
})
export class FaqModule {}
