import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';
import {
  CreateDriverVehicleInput,
  UpdateDriverVehicleInput,
} from '../dtos/vehicle/vehicle.input';
import { UploadService } from 'src/upload/upload.service';
import { DriverVehicle } from 'src/dtos/@generated';

@Injectable()
export class VehicleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async findAllVehiclesByUserId(userId: string): Promise<DriverVehicle[]> {
    return this.prisma.driverVehicle.findMany({
      where: { userId },
      include: { type: true },
    });
  }

  async createDriverVehicle(userId: string, input: CreateDriverVehicleInput) {
    const { uploadDocuments, uploadImages, ...rest } = input;

    // Optionnel: vérifier existence des objets sur S3 si tu veux
    // const checks = await Promise.all(uploadedFiles.map(f => this.storage.headObjectExists(f.key)));
    // if (checks.includes(false)) throw new BadRequestException('One or more files missing on storage');

    return this.prisma.$transaction(async (tx) => {
      // créer DriverVehicle
      const vehicle = await tx.driverVehicle.create({
        data: {
          userId,
          brand: rest.brand,
          model: rest.model,
          registrationNumber: rest.registrationNumber,
          place: rest.place,
          vehicleTypeId: rest.vehicleTypeId,
        },
      });

      // Insert images/documents
      if (uploadDocuments) {
        for (const f of uploadDocuments) {
          if (f.type === 'image') {
            await tx.image.create({
              data: {
                url: f.url,
                type: 'VEHICULE', // ou ImageType enum
                name: f.name,
                userId,
                driverVehicleId: vehicle.id,
              },
            });
          }
        }

        if (uploadImages) {
          for (const f of uploadImages) {
            await tx.document.create({
              data: {
                uniqueId: f.uniqueId,
                url: f.url,
                type: f.type,
                userId,
                driverVehicleId: vehicle.id,
              },
            });
          }
        }
      }
      return tx.driverVehicle.findUnique({
        where: { id: vehicle.id },
        include: { images: true, documents: true },
      });
    });
  }

  async updateDriverVehicle(
    userId: string,
    vehicleId: string,
    input: UpdateDriverVehicleInput,
  ) {
    // check ownership
    const vehicle = await this.prisma.driverVehicle.findUnique({
      where: { id: vehicleId },
    });
    if (!vehicle || vehicle.userId !== userId) throw new NotFoundException();

    return this.prisma.$transaction(async (tx) => {
      // mise à jour champs simples
      await tx.driverVehicle.update({
        where: { id: vehicleId },
        data: { brand: input.brand, model: input.model, place: input.place },
      });

      // add new uploadedFiles
      if (input.uploadDocuments?.length) {
        for (const f of input.uploadDocuments) {
          if (f.type === 'image') {
            await tx.image.create({
              data: {
                id: f.uniqueId,
                url: f.url,
                type: 'VEHICULE',
                userId,
                driverVehicleId: vehicleId,
              },
            });
          }
        }
      }
      if (input.uploadImages?.length) {
        for (const f of input.uploadImages) {
          await tx.document.create({
            data: {
              id: f.uniqueId,
              uniqueId: f.uniqueId,
              url: f.url,
              type: f.type,
              userId,
              driverVehicleId: vehicleId,
            },
          });
        }
      }

      // deleteFiles: array of uniqueIds to remove
      if (input.deleteImagessUniqueIds?.length) {
        for (const uniqueId of input.deleteImagessUniqueIds) {
          // find in images
          const img = await tx.image.findUnique({ where: { id: uniqueId } });
          if (img) {
            // delete S3 then record
            const key = img.url.split('/').pop(); // assuming url is like 'https://bucket.s3.amazonaws.com/path/to/file.jpg'
            await this.uploadService.deleteObject(key);
            await tx.image.delete({ where: { id: uniqueId } });
            continue;
          }
        }
      }
      if (input.deleteDocumentsUniqueIds?.length) {
        for (const uniqueId of input.deleteDocumentsUniqueIds) {
          // find in documents
          const doc = await tx.document.findUnique({ where: { id: uniqueId } });
          if (doc) {
            // delete S3 then record
            const key = doc.url.split('/').pop(); // assuming url is like 'https://bucket.s3.amazonaws.com/path/to/file.jpg'
            await this.uploadService.deleteObject(key);
            await tx.document.delete({ where: { id: uniqueId } });
          }
        }
      }

      return tx.driverVehicle.findUnique({
        where: { id: vehicleId },
        include: { images: true, documents: true },
      });
    });
  }
}
