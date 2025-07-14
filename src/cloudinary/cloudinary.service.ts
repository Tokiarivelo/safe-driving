// src/cloudinary/cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(private readonly config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.config.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.config.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
    const fileStream = Readable.from(file.buffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: path,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error)
            return reject(new Error(error.message || JSON.stringify(error)));
          return resolve(result.secure_url); // Lien HTTPS de l’image
        },
      );

      fileStream.pipe(uploadStream);
    });
  }
}
