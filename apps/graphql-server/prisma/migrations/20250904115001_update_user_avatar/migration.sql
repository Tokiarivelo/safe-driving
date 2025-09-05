-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "avatarId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "public"."File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
