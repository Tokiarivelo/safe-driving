-- AlterTable
ALTER TABLE "VehicleType" ADD COLUMN     "userPreferenceId" TEXT;

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activateLocation" BOOLEAN NOT NULL DEFAULT false,
    "activateNotifications" BOOLEAN NOT NULL DEFAULT false,
    "language" TEXT DEFAULT 'fr',
    "theme" TEXT DEFAULT 'light',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documets" (
    "id" TEXT NOT NULL,
    "uniqueId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Documets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- CreateIndex
CREATE INDEX "UserPreference_userId_fkey" ON "UserPreference"("userId");

-- CreateIndex
CREATE INDEX "Documets_userId_fkey" ON "Documets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Documets_uniqueId_userId_key" ON "Documets"("uniqueId", "userId");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_relation" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleType" ADD CONSTRAINT "VehicleType_userPreferenceId_fkey" FOREIGN KEY ("userPreferenceId") REFERENCES "UserPreference"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documets" ADD CONSTRAINT "Documets_userId_relation" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
