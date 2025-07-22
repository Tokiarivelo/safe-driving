import { Module } from '@nestjs/common';
import { NestMinioModule } from 'nestjs-minio';
import { StorageService } from './storage.service';

@Module({
  imports: [
    NestMinioModule.register({
      endPoint: process.env.MINIO_HOST || 'localhost',
      port: process.env.MINIO_PORT
        ? parseInt(process.env.MINIO_PORT, 10)
        : 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY || 'sd_minio_usr',
      secretKey: process.env.MINIO_SECRET_KEY || 'sd_minio_pwd',
    }),
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
