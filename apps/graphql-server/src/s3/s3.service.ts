// s3.service.ts
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  HeadBucketCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import {
  CompleteUploadOutput,
  PresignedUrl,
} from 'src/dtos/upload/upload.output';
import { FileMetaInput } from 'src/dtos/upload/upload.input';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { FileType } from 'src/dtos/@generated';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private client: S3Client;
  private bucket: string;
  private endpoint: string;
  private bucketEnsured = false;
  private presignExpires = 300; // 5 minutes

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
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
      `${Date.now()}-${uuidv4()}-${file.originalname}`;

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

  async ensureBucket(bucket: string): Promise<void> {
    this.bucket = bucket;
    await this.ensureBucketExists();
  }

  async sanitizeFilename(name: string) {
    return name
      .normalize('NFKD') // sépare les diacritiques
      .replace(/[\u0300-\u036f]/g, '') // enlève accents
      .replace(/[^a-zA-Z0-9._-]+/g, '-') // espaces & caractères bizarres -> '-'
      .replace(/^-+|-+$/g, '') // trim des '-'
      .slice(0, 120);
  }

  // génère une key unique ( recommande stocker cette key en DB )
  async makeKey(
    userId: string,
    originalName: string,
    type: FileType,
    uniqueId?: string,
  ) {
    const uid = uniqueId ?? uuidv4();
    const safe = await this.sanitizeFilename(originalName);
    return `users/${userId}/${type}/${uid}-${Date.now()}-${safe}`;
  }

  async createPresignedUrl(
    key: string,
    contentType: string,
    expiresIn = this.presignExpires,
  ): Promise<string> {
    const cmd = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });
    const url = await getSignedUrl(this.client, cmd, { expiresIn });
    return url;
  }

  // génération batch : input = [{ originalName, contentType, uniqueId? }]
  async createBatchPresignedUrls(
    userId: string,
    type: FileType,
    files: FileMetaInput[],
  ): Promise<PresignedUrl[]> {
    if (!files || files.length === 0)
      throw new BadRequestException('files is required');

    // Optionnel : vérifier quota ici (ex: limit 10 fichiers)
    if (files.length > 20)
      throw new BadRequestException('Too many files at once (max 20)');

    const results = await Promise.all(
      files.map(async (f) => {
        const key = await this.makeKey(
          userId,
          f.originalName,
          type,
          f.uniqueId,
        );

        const url = await this.createPresignedUrl(key, f.contentType);

        // create DB record (pending)
        await this.prisma.file.create({
          data: {
            key,
            userId: userId,
            originalName: f.originalName,
            contentType: f.contentType,
            status: 'pending',
            type,
          },
        });

        return { url, key, expiresIn: this.presignExpires };
      }),
    );

    return results; // array of { url, key, expiresIn }
  }

  async completeUpload(
    userId: string,
    key: string,
    type: FileType,
  ): Promise<CompleteUploadOutput> {
    // Basic authorization check: the key must belong to the user prefix
    if (!key.startsWith(`users/${userId}/`)) {
      throw new ForbiddenException('Key does not belong to user');
    }

    // HeadObject to get size/etag
    const head = await this.client.send(
      new HeadObjectCommand({ Bucket: this.bucket, Key: key }),
    );

    // Update DB: status uploaded, size, etag, uploadedAt
    const updated = await this.prisma.file.updateMany({
      where: { key, userId },
      data: {
        status: 'uploaded',
        size: head.ContentLength ? Number(head.ContentLength) : undefined,
        etag: head.ETag,
        contentType: head.ContentType,
      },
    });

    // ensure at least one record updated
    if (updated.count === 0) {
      // no DB record found — you may decide to create one instead
      // create fallback (optional)
      await this.prisma.file.create({
        data: {
          key,
          type,
          userId,
          originalName: key.split('/').pop() || key,
          contentType: head.ContentType || 'application/octet-stream',
          status: 'uploaded',
          size: head.ContentLength ? Number(head.ContentLength) : undefined,
          etag: head.ETag,
        },
      });
    }

    return {
      key,
      size: head.ContentLength ? Number(head.ContentLength) : null,
      etag: head.ETag || null,
      contentType: head.ContentType || null,
    };
  }

  async completeUploadBulk(userId: string, keys: string[], type: FileType) {
    if (!Array.isArray(keys) || keys.length === 0)
      throw new BadRequestException('keys required');
    // limiter le nombre pour éviter abus
    if (keys.length > 50) throw new BadRequestException('Too many keys');

    const responses = await Promise.all(
      keys.map(async (key) => {
        if (!key.startsWith(`users/${userId}/`)) {
          // Ne pas révéler trop d'infos; retourne une erreur simple pour la clé
          return { key, error: 'forbidden' } as any;
        }
        try {
          const head = await this.client.send(
            new HeadObjectCommand({ Bucket: this.bucket, Key: key }),
          );
          // mettre à jour l'enregistrement (ou en créer un si absent)
          const updated = await this.prisma.file.updateMany({
            where: { key, userId },
            data: {
              status: 'uploaded',
              size: head.ContentLength ? Number(head.ContentLength) : undefined,
              etag: head.ETag,
              contentType: head.ContentType,
            },
          });
          if (updated.count === 0) {
            // fallback : créer
            await this.prisma.file.create({
              data: {
                key,
                userId,
                type,
                originalName: key.split('/').pop() || key,
                contentType: head.ContentType || 'application/octet-stream',
                status: 'uploaded',
                size: head.ContentLength
                  ? Number(head.ContentLength)
                  : undefined,
                etag: head.ETag,
              },
            });
          }

          return {
            key,
            size: head.ContentLength ? Number(head.ContentLength) : null,
            etag: head.ETag || null,
            contentType: head.ContentType || null,
          };
        } catch (err) {
          this.logger.warn(
            `completeUpload failed for ${key}: ${err?.message || err}`,
          );
          return { key, error: err?.message || 'headobject_failed' } as any;
        }
      }),
    );

    return responses;
  }

  async deleteObject(key: string) {
    return await this.client
      .send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }))
      .then(() => {
        this.logger.log(`Object ${key} deleted successfully.`);
        return true;
      });
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

  // liste les objets dans le bucket
  async listObjects(bucket: string) {
    // await this.ensureBucketExists();
    const command = new ListObjectsV2Command({ Bucket: bucket });
    const response = await this.client.send(command);
    return response.Contents || [];
  }

  async deleteManyObjects(keys: string[]): Promise<void> {
    if (!keys || keys.length === 0) return;

    const objects = keys.map((key) => ({ Key: key }));
    const command = new DeleteObjectsCommand({
      Bucket: this.bucket,
      Delete: {
        Objects: objects,
        Quiet: false, // true pour ne pas retourner les objets supprimés
      },
    });

    try {
      await this.client.send(command);
      this.logger.log(`Deleted ${keys.length} objects successfully.`);
    } catch (err) {
      this.logger.error(`Failed to delete objects: ${err}`);
      throw err;
    }
  }
}
