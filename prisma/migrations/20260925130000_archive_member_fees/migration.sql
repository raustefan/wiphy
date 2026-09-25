-- DropForeignKey
ALTER TABLE "MemberFee" DROP CONSTRAINT "MemberFee_userId_fkey";

-- AlterTable
ALTER TABLE "MemberFee" ADD COLUMN     "archivMitgliedId" INTEGER,
ADD COLUMN     "archivName" TEXT,
ADD COLUMN     "archivedAt" TIMESTAMP(3),
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "MemberFee_archivedAt_jahr_idx" ON "MemberFee"("archivedAt", "jahr");

-- AddForeignKey
ALTER TABLE "MemberFee" ADD CONSTRAINT "MemberFee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
