// 4. Service pour gérer l'upload
// src/upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-ts';
import { ImageType } from 'src/dtos/@generated';
import { FileMetaInput } from 'src/dtos/upload/upload.input';
import {
  CompleteUploadOutput,
  PresignedUrl,
} from 'src/dtos/upload/upload.output';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class UploadService {
  constructor(private readonly s3Service: S3Service) {}

  // liste les objets dans le bucket
  async listObjects(bucket: string) {
    const objects = await this.s3Service.listObjects(bucket);

    return objects.map((obj) => obj.Key);
  }

  async uploadFile(
    file: FileUpload,
    path: string = 'uploads',
  ): Promise<string> {
    const { createReadStream, filename, mimetype } = file;

    // Convertir le stream en buffer
    const buffers = [];
    const stream = createReadStream();

    return new Promise((resolve, reject) => {
      stream.on('data', (data) => {
        buffers.push(data);
      });

      stream.on('end', () => {
        try {
          const buffer = Buffer.concat(buffers);
          const fileData: Express.Multer.File = {
            buffer,
            originalname: filename,
            mimetype,
            fieldname: 'file',
            encoding: '7bit',
            size: buffer.length,
            stream: null,
            destination: '',
            filename: '',
            path: '',
          };

          this.s3Service
            .uploadFile(fileData, path)
            .then((res) => {
              resolve(res);
            })
            .catch((error) => {
              reject(error instanceof Error ? error : new Error(String(error)));
            });
        } catch (error) {
          reject(error instanceof Error ? error : new Error(String(error)));
        }
      });

      stream.on('error', (error) => {
        reject(error instanceof Error ? error : new Error(String(error)));
      });
    });
  }

  async deleteObject(key: string): Promise<void> {
    await this.s3Service.deleteObject(key);
  }

  getPresignedUrl(
    key: string,
    contentType: string,
    expiresIn?: number,
  ): Promise<string> {
    return this.s3Service.createPresignedUrl(key, contentType, expiresIn);
  }

  async createBatchPresignedUrls(
    userId: string,
    type: ImageType,
    files: FileMetaInput[],
  ): Promise<PresignedUrl[]> {
    return this.s3Service.createBatchPresignedUrls(userId, type, files);
  }

  async completeUploadBulk(
    userId: string,
    keys: string[],
    type: ImageType,
  ): Promise<CompleteUploadOutput[]> {
    return this.s3Service.completeUploadBulk(userId, keys, type);
  }
}
