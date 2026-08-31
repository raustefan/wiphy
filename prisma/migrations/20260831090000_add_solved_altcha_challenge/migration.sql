-- CreateTable
CREATE TABLE "SolvedAltchaChallenge" (
    "signature" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SolvedAltchaChallenge_pkey" PRIMARY KEY ("signature")
);

-- CreateIndex
CREATE INDEX "SolvedAltchaChallenge_expiresAt_idx" ON "SolvedAltchaChallenge"("expiresAt");
