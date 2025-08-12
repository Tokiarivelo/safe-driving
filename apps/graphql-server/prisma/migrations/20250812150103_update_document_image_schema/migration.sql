/*
  Warnings:

  - You are about to drop the `Documets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DriverIDCards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DriverLicense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Documets" DROP CONSTRAINT "Documets_userId_relation";

-- DropForeignKey
ALTER TABLE "DriverIDCards" DROP CONSTRAINT "DriverIDCards_userId_relation";

-- DropForeignKey
ALTER TABLE "DriverLicense" DROP CONSTRAINT "DriverLicense_userId_relation";

-- DropForeignKey
ALTER TABLE "UserImage" DROP CONSTRAINT "UserImage_userId_relation";

-- DropTable
DROP TABLE "Documets";

-- DropTable
DROP TABLE "DriverIDCards";

-- DropTable
DROP TABLE "DriverLicense";

-- DropTable
DROP TABLE "UserImage";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "ImageType" NOT NULL,
    "name" TEXT,
    "userId" TEXT NOT NULL,
    "driverVehicleId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "driverVehicleId" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Image_userId_fkey" ON "Image"("userId");

-- CreateIndex
CREATE INDEX "Documets_userId_fkey" ON "Document"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Documets_uniqueId_userId_key" ON "Document"("uniqueId", "userId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_relation" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_driverVehicleId_fkey" FOREIGN KEY ("driverVehicleId") REFERENCES "DriverVehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Documets_userId_relation" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_driverVehicleId_fkey" FOREIGN KEY ("driverVehicleId") REFERENCES "DriverVehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
