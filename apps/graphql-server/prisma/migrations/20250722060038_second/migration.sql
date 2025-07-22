-- CreateTable
CREATE TABLE "VehicleType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverVehicle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "brand" TEXT,
    "model" TEXT,
    "registrationNumber" TEXT,
    "place" INTEGER NOT NULL,
    "vehicleTypeId" TEXT NOT NULL,

    CONSTRAINT "DriverVehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverIDCards" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "recto_url" TEXT,
    "verso_url" TEXT,

    CONSTRAINT "DriverIDCards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverLicense" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT,

    CONSTRAINT "DriverLicense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverVehicleImg" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "category" TEXT,
    "url" TEXT,

    CONSTRAINT "DriverVehicleImg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleType_name_key" ON "VehicleType"("name");

-- CreateIndex
CREATE INDEX "DriverVehicle_userId_fkey" ON "DriverVehicle"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DriverIDCards_userId_key" ON "DriverIDCards"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DriverLicense_userId_key" ON "DriverLicense"("userId");

-- AddForeignKey
ALTER TABLE "DriverVehicle" ADD CONSTRAINT "DriverCar_userId_relation" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverVehicle" ADD CONSTRAINT "DriverVehicle_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverIDCards" ADD CONSTRAINT "DriverIDCards_userId_relation" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverLicense" ADD CONSTRAINT "DriverLicense_userId_relation" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverVehicleImg" ADD CONSTRAINT "DriverVehicle_vehicleId_relation" FOREIGN KEY ("vehicleId") REFERENCES "DriverVehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
