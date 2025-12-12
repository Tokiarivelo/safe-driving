-- CreateTable
CREATE TABLE "RideStatistic" (
    "id" TEXT NOT NULL,
    "driverId" TEXT,
    "userId" TEXT,
    "completedRides" INTEGER NOT NULL DEFAULT 0,
    "revenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "motivationScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RideStatistic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RideStatistic_driverId_idx" ON "RideStatistic"("driverId");

-- CreateIndex
CREATE INDEX "RideStatistic_userId_idx" ON "RideStatistic"("userId");

-- CreateIndex
CREATE INDEX "RideStatistic_revenue_idx" ON "RideStatistic"("revenue");

-- CreateIndex
CREATE INDEX "RideStatistic_averageRating_idx" ON "RideStatistic"("averageRating");

-- CreateIndex
CREATE INDEX "RideStatistic_motivationScore_idx" ON "RideStatistic"("motivationScore");

-- AddForeignKey
ALTER TABLE "RideStatistic" ADD CONSTRAINT "RideStatistic_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideStatistic" ADD CONSTRAINT "RideStatistic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
