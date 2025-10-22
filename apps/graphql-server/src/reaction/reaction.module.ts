import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionResolver } from './reaction.resolver';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ReactionService, ReactionResolver],
  exports: [ReactionService],
})
export class ReactionModule {}
