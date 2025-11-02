import { Module, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './user.resolver';
import { UserSearchService } from './user-search.service';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { QrModule } from 'src/qr/qr.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [PrismaModule, QrModule, UploadModule],
  providers: [UsersService, UsersResolver, UserSearchService],
  exports: [UsersService, UserSearchService],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly userSearchService: UserSearchService) {}

  async onModuleInit() {
    await this.userSearchService.createIndexIfNotExists();
  }
}
