-- CreateEnum
CREATE TYPE "public"."UserDriverStatus" AS ENUM ('AVAILABLE', 'BUSY', 'PAUSED', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('ONLINE', 'OFFLINE', 'DRIVING', 'DO_NOT_DISTURB');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "driverStatus" "public"."UserDriverStatus" DEFAULT 'AVAILABLE',
ADD COLUMN     "status" "public"."UserStatus" DEFAULT 'OFFLINE';
