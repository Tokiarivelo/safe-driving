import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [PrismaModule, S3Module],
  providers: [FileService, FileResolver],
  exports: [FileService],
})
export class FileModule {}
