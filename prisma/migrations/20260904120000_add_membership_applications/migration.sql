-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.

ALTER TYPE "FeatureFlagKey" ADD VALUE 'MEMBERSHIP_APPLICATION';
ALTER TYPE "FeatureFlagKey" ADD VALUE 'MEMBERSHIP_APPLICATION_MAIL';
ALTER TYPE "FeatureFlagKey" ADD VALUE 'MEMBERSHIP_APPLICATION_CONFIRMATION_MAIL';

-- CreateEnum
CREATE TYPE "MembershipApplicationStatus" AS ENUM ('EINGEREICHT', 'ANGENOMMEN', 'ABGELEHNT', 'ZURUECKGEZOGEN');

-- CreateTable
CREATE TABLE "FeeDefault" (
    "jahr" INTEGER NOT NULL,
    "regular" DOUBLE PRECISION NOT NULL,
    "student" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeeDefault_pkey" PRIMARY KEY ("jahr")
);

-- CreateTable
CREATE TABLE "MembershipApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "MembershipApplicationStatus" NOT NULL DEFAULT 'EINGEREICHT',
    "openForUserId" TEXT,
    "vorname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "titel" TEXT,
    "geburtsdatum" TIMESTAMP(3) NOT NULL,
    "strasse" TEXT NOT NULL,
    "plz" TEXT NOT NULL,
    "stadt" TEXT NOT NULL,
    "land" TEXT NOT NULL,
    "telefon" TEXT,
    "studiengang" TEXT,
    "studienbeginn" TIMESTAMP(3),
    "studienende" TIMESTAMP(3),
    "arbeitgeber" TEXT,
    "berufsstand" TEXT,
    "berufszweig" TEXT,
    "position" TEXT,
    "studentYears" INTEGER[],
    "kontoinhaber" TEXT NOT NULL,
    "IBAN" TEXT NOT NULL,
    "BIC" TEXT,
    "bank" TEXT,
    "bankeinzug" BOOLEAN NOT NULL DEFAULT true,
    "mandatDatum" TIMESTAMP(3) NOT NULL,
    "mandatsreferenz" TEXT,
    "satzungAccepted" BOOLEAN NOT NULL,
    "datenschutzAccepted" BOOLEAN NOT NULL,
    "consentVersion" TEXT NOT NULL,
    "beitragRegularSnapshot" DOUBLE PRECISION NOT NULL,
    "beitragStudentSnapshot" DOUBLE PRECISION NOT NULL,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "decidedAt" TIMESTAMP(3),
    "decidedById" TEXT,
    "decisionNote" TEXT,
    "mailedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MembershipApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MembershipApplication_openForUserId_key" ON "MembershipApplication"("openForUserId");
CREATE INDEX "MembershipApplication_status_submittedAt_idx" ON "MembershipApplication"("status", "submittedAt");
CREATE INDEX "MembershipApplication_userId_idx" ON "MembershipApplication"("userId");

-- AddForeignKey
ALTER TABLE "MembershipApplication" ADD CONSTRAINT "MembershipApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
