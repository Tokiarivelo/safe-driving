/*
  Warnings:

  - The `status` column on the `Ride` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RideStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Ride" ADD COLUMN     "acceptsAnimals" BOOLEAN DEFAULT false,
ADD COLUMN     "acceptsBaggage" BOOLEAN DEFAULT true,
ADD COLUMN     "arrivalAddress" TEXT,
ADD COLUMN     "arrivalLat" DECIMAL(10,7),
ADD COLUMN     "arrivalLng" DECIMAL(10,7),
ADD COLUMN     "baggageDetails" TEXT,
ADD COLUMN     "currency" TEXT DEFAULT 'MGA',
ADD COLUMN     "departureAddress" TEXT,
ADD COLUMN     "departureLat" DECIMAL(10,7),
ADD COLUMN     "departureLng" DECIMAL(10,7),
ADD COLUMN     "minDriverRating" DOUBLE PRECISION,
ADD COLUMN     "otherPreferences" TEXT,
ADD COLUMN     "preferredLanguages" TEXT[],
ADD COLUMN     "price" DECIMAL(10,2),
ADD COLUMN     "requiredSeats" INTEGER DEFAULT 1,
ADD COLUMN     "scheduledDeparture" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "vehicleTypeId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "RideStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "Ride_status_idx" ON "Ride"("status");

-- CreateIndex
CREATE INDEX "Ride_scheduledDeparture_idx" ON "Ride"("scheduledDeparture");

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
