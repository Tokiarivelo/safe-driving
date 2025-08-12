import { Module } from '@nestjs/common';
import { UserPreferenceService } from './preference.service';
import { UsersResolver } from './preference.resolver';
import { PrismaModule } from 'src/prisma-module/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserPreferenceService, UsersResolver],
  exports: [UserPreferenceService],
})
export class UserPreferenceModule {}
