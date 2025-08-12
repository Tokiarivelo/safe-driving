/*
  Warnings:

  - You are about to drop the column `userPreferenceId` on the `VehicleType` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "VehicleType" DROP CONSTRAINT "VehicleType_userPreferenceId_fkey";

-- AlterTable
ALTER TABLE "VehicleType" DROP COLUMN "userPreferenceId";

-- CreateTable
CREATE TABLE "_UserPreferencePreferedVehicules" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserPreferencePreferedVehicules_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserPreferencePreferedVehicules_B_index" ON "_UserPreferencePreferedVehicules"("B");

-- AddForeignKey
ALTER TABLE "_UserPreferencePreferedVehicules" ADD CONSTRAINT "_UserPreferencePreferedVehicules_A_fkey" FOREIGN KEY ("A") REFERENCES "UserPreference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserPreferencePreferedVehicules" ADD CONSTRAINT "_UserPreferencePreferedVehicules_B_fkey" FOREIGN KEY ("B") REFERENCES "VehicleType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
