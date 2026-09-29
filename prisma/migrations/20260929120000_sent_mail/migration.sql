-- CreateTable
CREATE TABLE "SentMail" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "recipientGroup" TEXT,
    "recipientCount" INTEGER NOT NULL,
    "recipientEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SentMail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SentMail_createdAt_idx" ON "SentMail"("createdAt");

-- CreateIndex
CREATE INDEX "SentMail_recipientEmail_idx" ON "SentMail"("recipientEmail");
