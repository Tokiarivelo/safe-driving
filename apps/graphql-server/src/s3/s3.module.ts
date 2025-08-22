import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [S3Service, PrismaService],
  exports: [S3Service],
})
export class S3Module {}
