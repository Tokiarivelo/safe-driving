-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "userCoverId" TEXT;

-- CreateTable
CREATE TABLE "public"."UserCover" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "UserCover_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCover_userId_key" ON "public"."UserCover"("userId");

-- AddForeignKey
ALTER TABLE "public"."UserCover" ADD CONSTRAINT "UserCover_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "public"."File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCover" ADD CONSTRAINT "UserCover_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
