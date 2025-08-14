/*
  Warnings:

  - The values [VEHICULE] on the enum `ImageType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `_UserPreferencePreferedVehicules` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ImageType_new" AS ENUM ('USER', 'PROFILE', 'VEHICLE');
ALTER TABLE "File" ALTER COLUMN "type" TYPE "ImageType_new" USING ("type"::text::"ImageType_new");
ALTER TYPE "ImageType" RENAME TO "ImageType_old";
ALTER TYPE "ImageType_new" RENAME TO "ImageType";
DROP TYPE "ImageType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_UserPreferencePreferedVehicules" DROP CONSTRAINT "_UserPreferencePreferedVehicules_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserPreferencePreferedVehicules" DROP CONSTRAINT "_UserPreferencePreferedVehicules_B_fkey";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "url" DROP NOT NULL;

-- DropTable
DROP TABLE "_UserPreferencePreferedVehicules";

-- CreateTable
CREATE TABLE "_UserPreferencePreferedvelicles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserPreferencePreferedvelicles_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserPreferencePreferedvelicles_B_index" ON "_UserPreferencePreferedvelicles"("B");

-- AddForeignKey
ALTER TABLE "_UserPreferencePreferedvelicles" ADD CONSTRAINT "_UserPreferencePreferedvelicles_A_fkey" FOREIGN KEY ("A") REFERENCES "UserPreference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPreferencePreferedvelicles" ADD CONSTRAINT "_UserPreferencePreferedvelicles_B_fkey" FOREIGN KEY ("B") REFERENCES "VehicleType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
