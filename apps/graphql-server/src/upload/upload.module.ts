import { Module } from '@nestjs/common';
import { UploadResolver } from './upload.resolver';
import { UploadService } from './upload.service';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [S3Module],
  providers: [UploadResolver, UploadService],
})
export class UploadModule {}
