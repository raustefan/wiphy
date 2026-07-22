-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ORDENTLICHES_MITGLIED', 'EHRENMITGLIED', 'KEIN_MITGLIED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vorname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "titel" TEXT,
    "mitgliedId" INTEGER,
    "aufnahmedatum" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "status" "Status" NOT NULL DEFAULT 'KEIN_MITGLIED',
    "user" TEXT,
    "plz" TEXT,
    "stadt" TEXT,
    "strasse" TEXT,
    "telefon" TEXT,
    "geburtsdatum" TIMESTAMP(3),
    "land" TEXT,
    "website" TEXT,
    "studiengang" TEXT,
    "studienbeginn" TIMESTAMP(3),
    "studienende" TIMESTAMP(3),
    "diplomarbeit" TEXT,
    "bachelorarbeit" TEXT,
    "masterarbeit" TEXT,
    "dissertation" TEXT,
    "arbeitgeber" TEXT,
    "berufsstand" TEXT,
    "berufszweig" TEXT,
    "position" TEXT,
    "praktika" TEXT,
    "berufserfahrung" TEXT,
    "zahlungsKommentar" TEXT,
    "bank" TEXT,
    "BLZ" TEXT,
    "KTO" TEXT,
    "bankeinzug" BOOLEAN,
    "zuwendungsbesch" BOOLEAN,
    "mahnung" TEXT,
    "IBAN" TEXT,
    "BIC" TEXT,
    "mandatserteilung" TIMESTAMP(3),
    "datensperren" BOOLEAN,
    "ausschluss" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberFee" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jahr" INTEGER NOT NULL,
    "bezahlt" BOOLEAN NOT NULL DEFAULT false,
    "isStudent" BOOLEAN NOT NULL DEFAULT false,
    "beitrag" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MemberFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateLimitEntry" (
    "key" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "resetAt" TIMESTAMP(3) NOT NULL,
    "blockedUntil" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RateLimitEntry_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mitgliedId_key" ON "User"("mitgliedId");

-- CreateIndex
CREATE UNIQUE INDEX "MemberFee_userId_jahr_key" ON "MemberFee"("userId", "jahr");

-- CreateIndex
CREATE INDEX "RateLimitEntry_resetAt_idx" ON "RateLimitEntry"("resetAt");

-- CreateIndex
CREATE INDEX "RateLimitEntry_blockedUntil_idx" ON "RateLimitEntry"("blockedUntil");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE INDEX "PasswordResetToken_email_idx" ON "PasswordResetToken"("email");

-- AddForeignKey
ALTER TABLE "MemberFee" ADD CONSTRAINT "MemberFee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
