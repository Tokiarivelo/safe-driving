import { Injectable } from '@nestjs/common';
import { InjectMinio } from 'nestjs-minio';
import { Client } from 'minio';
import { FileUpload } from 'graphql-upload-ts';

@Injectable()
export class StorageService {
  constructor(@InjectMinio() private readonly minioClient: Client) {}

  async uploadToMinIO(file: FileUpload, path: string): Promise<string> {
    const { createReadStream, filename, mimetype } = file;
    const bucket = process.env.MINIO_BUCKET;
    const objectName = path + '/' + `${crypto.randomUUID()}-${filename}`;
    const stream = createReadStream();

    const bucketExists = await this.minioClient.bucketExists(bucket);
    if (!bucketExists) {
      await this.minioClient.makeBucket(bucket);
    }

    await this.minioClient.putObject(bucket, objectName, stream);

    return `${process.env.MINIO_ENDPOINT}/${bucket}/${objectName}`;
  }
}
