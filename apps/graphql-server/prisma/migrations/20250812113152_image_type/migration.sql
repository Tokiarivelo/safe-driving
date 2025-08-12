/*
  Warnings:

  - Changed the type of `type` on the `UserImage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('USER', 'PROFILE', 'VEHICULE');

-- AlterTable
ALTER TABLE "UserImage" DROP COLUMN "type",
ADD COLUMN     "type" "ImageType" NOT NULL;
