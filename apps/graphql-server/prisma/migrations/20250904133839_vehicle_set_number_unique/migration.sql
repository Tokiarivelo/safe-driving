/*
  Warnings:

  - A unique constraint covering the columns `[registrationNumber]` on the table `DriverVehicle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DriverVehicle_registrationNumber_key" ON "public"."DriverVehicle"("registrationNumber");
