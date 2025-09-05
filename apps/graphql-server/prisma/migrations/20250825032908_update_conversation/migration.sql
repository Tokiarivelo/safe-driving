/*
  Warnings:

  - A unique constraint covering the columns `[directHash]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "directHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_directHash_key" ON "Conversation"("directHash");
