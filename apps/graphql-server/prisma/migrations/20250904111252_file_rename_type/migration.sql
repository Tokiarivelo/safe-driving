/*
  Warnings:

  - Changed the type of `type` on the `File` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."FileType" AS ENUM ('MESSAGE', 'USER', 'AVATAR', 'COVER', 'VEHICLE', 'LANDING');

-- AlterTable
ALTER TABLE "public"."File" DROP COLUMN "type",
ADD COLUMN     "type" "public"."FileType" NOT NULL;

-- DropEnum
DROP TYPE "public"."ImageType";
