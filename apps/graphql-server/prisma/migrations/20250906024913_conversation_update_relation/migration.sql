-- AlterTable
ALTER TABLE "public"."ConversationParticipant" ALTER COLUMN "isMuted" DROP NOT NULL,
ALTER COLUMN "joinedAt" DROP NOT NULL;
