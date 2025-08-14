-- AlterTable
ALTER TABLE "UserPreference" ADD COLUMN     "activateEmailNotifications" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "activateSmsNotifications" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cguAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "privacyPolicyAccepted" BOOLEAN NOT NULL DEFAULT false;
