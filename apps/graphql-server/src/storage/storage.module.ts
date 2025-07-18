import { Module } from '@nestjs/common';
import { NestMinioModule } from 'nestjs-minio';
import { StorageService } from './storage.service';

@Module({
  imports: [
    NestMinioModule.register({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'sd_minio_usr',
      secretKey: 'sd_minio_pwd',
    }),
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
