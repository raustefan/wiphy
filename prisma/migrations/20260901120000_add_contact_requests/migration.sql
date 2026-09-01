-- AlterEnum
ALTER TYPE "FeatureFlagKey" ADD VALUE 'CONTACT_FORM';
ALTER TYPE "FeatureFlagKey" ADD VALUE 'CONTACT_FORM_MAIL';
ALTER TYPE "FeatureFlagKey" ADD VALUE 'CONTACT_FORM_STORAGE';

-- CreateTable
CREATE TABLE "ContactRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "spamScore" INTEGER NOT NULL DEFAULT 0,
    "mailedAt" TIMESTAMP(3),
    "handledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactRequest_createdAt_idx" ON "ContactRequest"("createdAt");
CREATE INDEX "ContactRequest_handledAt_idx" ON "ContactRequest"("handledAt");
