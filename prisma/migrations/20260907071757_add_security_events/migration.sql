-- CreateEnum
CREATE TYPE "SecurityEventType" AS ENUM ('LOGIN', 'REGISTRATION', 'CONTACT_REQUEST', 'PASSWORD_RESET_REQUEST', 'PASSWORD_RESET_COMPLETE');

-- CreateEnum
CREATE TYPE "SecurityEventOutcome" AS ENUM ('SUCCESS', 'FAILURE', 'BLOCKED');

-- CreateTable
CREATE TABLE "SecurityEvent" (
    "id" TEXT NOT NULL,
    "type" "SecurityEventType" NOT NULL,
    "outcome" "SecurityEventOutcome" NOT NULL,
    "reason" TEXT,
    "userId" TEXT,
    "subjectHash" TEXT,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SecurityEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SecurityEvent_createdAt_idx" ON "SecurityEvent"("createdAt");

-- CreateIndex
CREATE INDEX "SecurityEvent_type_outcome_createdAt_idx" ON "SecurityEvent"("type", "outcome", "createdAt");

-- CreateIndex
CREATE INDEX "SecurityEvent_userId_createdAt_idx" ON "SecurityEvent"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "SecurityEvent_subjectHash_createdAt_idx" ON "SecurityEvent"("subjectHash", "createdAt");

-- CreateIndex
CREATE INDEX "SecurityEvent_ipHash_createdAt_idx" ON "SecurityEvent"("ipHash", "createdAt");

-- AddForeignKey
ALTER TABLE "SecurityEvent" ADD CONSTRAINT "SecurityEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
