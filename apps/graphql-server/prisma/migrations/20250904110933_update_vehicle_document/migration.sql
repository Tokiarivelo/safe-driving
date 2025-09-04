/*
  Warnings:

  - A unique constraint covering the columns `[driverVehicleId,documentType]` on the table `VehicleDocument` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `documentType` to the `VehicleDocument` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."VehicleDocumentType" AS ENUM ('REGISTRATION', 'INSURANCE', 'CONTROL', 'OTHER');

-- AlterTable
ALTER TABLE "public"."VehicleDocument" ADD COLUMN     "documentType" "public"."VehicleDocumentType" NOT NULL,
ADD COLUMN     "name" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "VehicleDocument_driverVehicleId_documentType_key" ON "public"."VehicleDocument"("driverVehicleId", "documentType");
