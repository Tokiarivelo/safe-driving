/*
  Warnings:

  - Added the required column `documentType` to the `UserDocument` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserDocumentType" AS ENUM ('ID_CARD', 'DRIVER_LICENSE', 'PASSPORT', 'OTHER');

-- DropIndex
DROP INDEX "public"."VehicleDocument_driverVehicleId_documentType_key";

-- AlterTable
ALTER TABLE "public"."UserDocument" ADD COLUMN     "documentType" "public"."UserDocumentType" NOT NULL,
ADD COLUMN     "name" TEXT;
