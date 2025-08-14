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
          await tx.vehicleDocument.create({
            data: {
              file: {
                connect: { key: f.key },
              },
            },
          });
        }

        if (uploadImages) {
          for (const f of uploadImages) {
            await tx.vehicleImage.create({
              data: {
                file: {
                  connect: { key: f.key },
                },
              },
            });
          }
        }
      }
      return tx.driverVehicle.findUnique({
        where: { id: vehicle.id },
        include: {
          VehicleDocument: {
            include: { file: true },
          },
          VehicleImage: {
            include: { file: true },
          },
        },
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
          await tx.vehicleDocument.create({
            data: {
              file: {
                connect: { key: f.key },
              },
            },
          });
        }
      }
      if (input.uploadImages?.length) {
        for (const f of input.uploadImages) {
          await tx.vehicleImage.create({
            data: {
              file: {
                connect: { key: f.key },
              },
            },
          });
        }
      }

      // deleteFiles: array of uniqueIds to remove
      if (input.deleteImagesByKeys?.length) {
        for (const key of input.deleteImagesByKeys) {
          // find in images
          const img = await tx.vehicleImage.findFirst({
            where: {
              file: { key },
            },
          });
          if (img) {
            // delete S3 then record
            await this.uploadService.deleteObject(key);
            await tx.vehicleImage.delete({
              where: { id: img.id },
              include: { file: true },
            });
            continue;
          }
        }
      }
      if (input.deleteDocumentsByKeys?.length) {
        for (const key of input.deleteDocumentsByKeys) {
          // find in documents
          const doc = await tx.vehicleDocument.findFirst({
            where: {
              file: { key },
            },
          });
          if (doc) {
            await this.uploadService.deleteObject(key);
            await tx.vehicleDocument.delete({
              where: { id: key },
              include: { file: true },
            });
          }
        }
      }

      return tx.driverVehicle.findUnique({
        where: { id: vehicleId },
        include: {
          VehicleImage: {
            include: { file: true },
          },
          VehicleDocument: {
            include: { file: true },
          },
        },
      });
    });
  }
}
