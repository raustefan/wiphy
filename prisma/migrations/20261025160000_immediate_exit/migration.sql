-- Sofortiger Austritt statt Kündigung zum Jahresende (siehe MembershipTermination).

-- Offene Kündigungen zum Jahresende gelten als bestätigt; vollzogen werden sie
-- wie bisher am Tag nach `effectiveAt`.
UPDATE "MembershipTermination"
SET "status" = 'CONFIRMED', "decidedAt" = COALESCE("decidedAt", NOW())
WHERE "status" = 'SUBMITTED';

-- Keine Zahlungshistorie gelöschter Konten mehr: archivierte Beitragszeilen weg.
DELETE FROM "MemberFee" WHERE "userId" IS NULL;

-- AlterEnum
BEGIN;
CREATE TYPE "MembershipTerminationStatus_new" AS ENUM ('CONFIRMED', 'WITHDRAWN');
ALTER TABLE "public"."MembershipTermination" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "MembershipTermination" ALTER COLUMN "status" TYPE "MembershipTerminationStatus_new" USING ("status"::text::"MembershipTerminationStatus_new");
ALTER TYPE "MembershipTerminationStatus" RENAME TO "MembershipTerminationStatus_old";
ALTER TYPE "MembershipTerminationStatus_new" RENAME TO "MembershipTerminationStatus";
DROP TYPE "public"."MembershipTerminationStatus_old";
ALTER TABLE "MembershipTermination" ALTER COLUMN "status" SET DEFAULT 'CONFIRMED';
COMMIT;

-- DropForeignKey
ALTER TABLE "MemberFee" DROP CONSTRAINT "MemberFee_userId_fkey";

-- DropIndex
DROP INDEX "MemberFee_archivedAt_year_idx";

-- AlterTable
ALTER TABLE "MemberFee" DROP COLUMN "archivedAt",
DROP COLUMN "archivedMemberNumber",
DROP COLUMN "archivedName",
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "MembershipTermination" ADD COLUMN     "deleteWhenSettled" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "status" SET DEFAULT 'CONFIRMED';

-- AddForeignKey
ALTER TABLE "MemberFee" ADD CONSTRAINT "MemberFee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

