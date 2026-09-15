-- AlterEnum
ALTER TYPE "FeatureFlagKey" ADD VALUE 'BOARD_MANAGEMENT';

-- CreateTable
CREATE TABLE "BoardMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL DEFAULT '',
    "position" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "inSignature" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoardMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardMemberPhoto" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL DEFAULT 'image/webp',
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "byteSize" INTEGER NOT NULL,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoardMemberPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BoardMember_published_position_idx" ON "BoardMember"("published", "position");

-- CreateIndex
CREATE UNIQUE INDEX "BoardMemberPhoto_memberId_key" ON "BoardMemberPhoto"("memberId");

-- AddForeignKey
ALTER TABLE "BoardMemberPhoto" ADD CONSTRAINT "BoardMemberPhoto_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "BoardMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Übernahme der bisher im Code fest verdrahteten Vorstandsliste
-- (src/app/vorstand/page.tsx), damit /vorstand nach der Umstellung nicht leer
-- ist. Nur die zwei Vorsitzenden waren bisher Teil der Mail-Signatur
-- (VEREIN.board in src/lib/email/branding.ts) — das bleibt hiermit unverändert.
INSERT INTO "BoardMember" ("id", "name", "role", "linkedin", "position", "published", "inSignature", "updatedAt") VALUES
    ('board-seed-1', 'Nikolas Tomek', '1. Vorstandsvorsitzender', 'https://www.linkedin.com/in/nikolas-tomek/', 0, true, true, CURRENT_TIMESTAMP),
    ('board-seed-2', 'Jannes Weghake', '2. Vorstandsvorsitzender', 'https://www.linkedin.com/in/jannes-weghake-317b95274/', 1, true, true, CURRENT_TIMESTAMP),
    ('board-seed-3', 'Carsten Schäfer-Siebert', 'Finanzen', 'https://www.linkedin.com/in/carsten-sch%C3%A4fer-siebert/', 2, true, false, CURRENT_TIMESTAMP),
    ('board-seed-4', 'Stefan Rau', 'Medien & IT', 'https://www.linkedin.com/in/stefan-rau-91243721a/', 3, true, false, CURRENT_TIMESTAMP),
    ('board-seed-5', 'Andreas Dietrich', 'Schriftführer', 'https://www.linkedin.com/in/andreas-dietrich-3934282a6/', 4, true, false, CURRENT_TIMESTAMP),
    ('board-seed-6', 'André Knoll', 'Fachschaftsbotschafter', '', 5, true, false, CURRENT_TIMESTAMP);
