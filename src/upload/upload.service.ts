// 4. Service pour gérer l'upload
// src/upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-ts';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

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

          this.cloudinaryService
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
}
