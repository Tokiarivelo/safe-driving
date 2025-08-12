// s3.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  HeadBucketCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private client: S3Client;
  private bucket: string;
  private endpoint: string;
  private bucketEnsured = false;

  constructor(private readonly config: ConfigService) {
    const endpoint =
      this.config.get<string>('S3_ENDPOINT') || 'http://localhost:4566';
    this.bucket = this.config.get<string>('S3_BUCKET') || 'safe-driving';
    this.endpoint = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint; // enlever le slash terminal si présent

    this.client = new S3Client({
      region: this.config.get<string>('AWS_REGION') || 'us-east-1',
      endpoint,
      credentials: {
        accessKeyId: this.config.get<string>('AWS_ACCESS_KEY_ID') || 'test',
        secretAccessKey:
          this.config.get<string>('AWS_SECRET_ACCESS_KEY') || 'test',
      },
      // si ton app tourne dans Docker et que localstack est sur le même réseau,
      // endpoint devrait être 'http://localstack:4566'
      forcePathStyle: true, // utile pour LocalStack (v3 accepte cette option)
    } as any);
  }

  private async ensureBucketExists(): Promise<void> {
    if (this.bucketEnsured) return;
    try {
      await this.client.send(new HeadBucketCommand({ Bucket: this.bucket }));
      this.bucketEnsured = true;
      this.logger.log(`Bucket "${this.bucket}" exists.`);
      return;
    } catch (err: any) {
      // HeadBucket échoue si le bucket n'existe pas
      this.logger.log(
        `Bucket "${this.bucket}" not found, attempting to create it...`,
      );
      try {
        await this.client.send(
          new CreateBucketCommand({ Bucket: this.bucket }),
        );
        this.bucketEnsured = true;
        this.logger.log(`Bucket "${this.bucket}" created.`);
        return;
      } catch (createErr: any) {
        // gérer condition de race (déjà créé par un autre process)
        const name = createErr?.name;
        if (
          name === 'BucketAlreadyOwnedByYou' ||
          name === 'BucketAlreadyExists'
        ) {
          this.bucketEnsured = true;
          this.logger.log(`Bucket "${this.bucket}" already exists (race).`);
          return;
        }
        this.logger.error('Error when creating bucket', createErr);
        throw createErr;
      }
    }
  }

  /**
   * Upload a multer file buffer to S3 (LocalStack).
   * Returns a publicly reachable URL (path-style).
   */
  async uploadFile(file: Express.Multer.File, path = ''): Promise<string> {
    // normaliser path sans slash initial/terminal
    const cleanPath = path.replace(/^\/+|\/+$/g, '');
    const key =
      (cleanPath ? `${cleanPath}/` : '') +
      `${Date.now()}-${crypto.randomUUID()}-${file.originalname}`;

    await this.ensureBucketExists();

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: 'public-read', // optionnel (attention en prod)
    });

    await this.client.send(command);

    // Construire une URL path-style (fonctionne avec LocalStack)
    // Exemple: http://localhost:4566/my-bucket/my-key.jpg
    const encodedKey = encodeURI(key);
    const publicUrl = `${this.endpoint}/${this.bucket}/${encodedKey}`;
    return publicUrl;
  }

  async list(bucket: string) {
    const resp = await this.client.send(
      new ListObjectsV2Command({ Bucket: bucket }),
    );
    return resp.Contents || [];
  }

  async ensureBucket(bucket: string): Promise<void> {
    this.bucket = bucket;
    await this.ensureBucketExists();
  }

  async getPresignedPut(key: string, contentType: string, expiresIn = 300) {
    const cmd = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });
    const url = await getSignedUrl(this.client, cmd, { expiresIn });
    return { url, key, expiresIn };
  }

  async deleteObject(key: string) {
    await this.client.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
    );
  }

  async headObjectExists(key: string) {
    try {
      await this.client.send(
        new HeadObjectCommand({ Bucket: this.bucket, Key: key }),
      );
      return true;
    } catch {
      return false;
    }
  }

  // utilitaires : makeKey(userId, type, originalName)
  makeKey(userId: string, uniqueId: string, originalName: string) {
    const safeName = encodeURIComponent(originalName);
    return `users/${userId}/${uniqueId}-${Date.now()}-${safeName}`;
  }
}
