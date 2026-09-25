-- CreateEnum
CREATE TYPE "MembershipTerminationStatus" AS ENUM ('EINGEREICHT', 'BESTAETIGT', 'ZURUECKGEZOGEN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "loginDisabled" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "MembershipTermination" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "MembershipTerminationStatus" NOT NULL DEFAULT 'EINGEREICHT',
    "openForUserId" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveAt" TIMESTAMP(3) NOT NULL,
    "keepAccount" BOOLEAN NOT NULL DEFAULT false,
    "decidedAt" TIMESTAMP(3),
    "decidedById" TEXT,
    "decisionNote" TEXT,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MembershipTermination_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MembershipTermination_openForUserId_key" ON "MembershipTermination"("openForUserId");

-- CreateIndex
CREATE INDEX "MembershipTermination_status_effectiveAt_idx" ON "MembershipTermination"("status", "effectiveAt");

-- CreateIndex
CREATE INDEX "MembershipTermination_userId_idx" ON "MembershipTermination"("userId");

-- AddForeignKey
ALTER TABLE "MembershipTermination" ADD CONSTRAINT "MembershipTermination_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
