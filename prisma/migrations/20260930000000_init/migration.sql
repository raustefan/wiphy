-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ORDENTLICHES_MITGLIED', 'EHRENMITGLIED', 'KEIN_MITGLIED');

-- CreateEnum
CREATE TYPE "FeatureFlagKey" AS ENUM ('LOGIN', 'PASSWORD_RESET', 'REGISTRATION', 'EMAIL_CHANGE', 'PROFILE_EDIT', 'FEE_CHANGES', 'MAIL_SERVICES', 'USER_CREATION', 'USER_DELETION', 'BLOG_MANAGEMENT', 'EMAIL_VERIFICATION', 'CONTACT_FORM', 'CONTACT_FORM_MAIL', 'CONTACT_FORM_STORAGE', 'MEMBERSHIP_APPLICATION', 'MEMBERSHIP_APPLICATION_MAIL', 'MEMBERSHIP_APPLICATION_CONFIRMATION_MAIL', 'REGISTRATION_CLEANUP', 'EVENT_MANAGEMENT', 'BOARD_MANAGEMENT', 'MEMBERSHIP_TERMINATION', 'MEMBERSHIP_TERMINATION_MAIL', 'MEMBERSHIP_TERMINATION_CONFIRMATION_MAIL', 'ACCOUNT_NOTICE_MAIL');

-- CreateEnum
CREATE TYPE "MembershipApplicationStatus" AS ENUM ('EINGEREICHT', 'ANGENOMMEN', 'ABGELEHNT', 'ZURUECKGEZOGEN');

-- CreateEnum
CREATE TYPE "MembershipTerminationStatus" AS ENUM ('EINGEREICHT', 'BESTAETIGT', 'ZURUECKGEZOGEN');

-- CreateEnum
CREATE TYPE "SecurityEventType" AS ENUM ('LOGIN', 'REGISTRATION', 'CONTACT_REQUEST', 'PASSWORD_RESET_REQUEST', 'PASSWORD_RESET_COMPLETE', 'EMAIL_VERIFICATION', 'EMAIL_CHANGE', 'REGISTRATION_EXPIRED');

-- CreateEnum
CREATE TYPE "SecurityEventOutcome" AS ENUM ('SUCCESS', 'FAILURE', 'BLOCKED');

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
    "studentYears" INTEGER[],
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
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "registrationPendingSince" TIMESTAMP(3),
    "passwordChangedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionVersion" INTEGER NOT NULL DEFAULT 0,
    "loginDisabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberFee" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "jahr" INTEGER NOT NULL,
    "bezahlt" BOOLEAN NOT NULL DEFAULT false,
    "isStudent" BOOLEAN NOT NULL DEFAULT false,
    "beitrag" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "beitragManuell" BOOLEAN NOT NULL DEFAULT false,
    "archivName" TEXT,
    "archivMitgliedId" INTEGER,
    "archivedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MemberFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "preview" TEXT NOT NULL DEFAULT '',
    "author" TEXT NOT NULL DEFAULT '',
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "allDay" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "onlineUrl" TEXT NOT NULL DEFAULT '',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogImage" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "coverForPostId" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "alt" TEXT NOT NULL DEFAULT '',
    "fileName" TEXT NOT NULL DEFAULT '',
    "mimeType" TEXT NOT NULL DEFAULT 'image/webp',
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "byteSize" INTEGER NOT NULL,
    "data" BYTEA NOT NULL,
    "thumbnail" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogImage_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "FeatureFlag" (
    "key" "FeatureFlagKey" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeatureFlag_pkey" PRIMARY KEY ("key")
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

-- CreateTable
CREATE TABLE "EmailVerificationToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailVerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolvedAltchaChallenge" (
    "signature" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SolvedAltchaChallenge_pkey" PRIMARY KEY ("signature")
);

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
    "kontoinhaber" TEXT,
    "IBAN" TEXT,
    "BIC" TEXT,
    "bank" TEXT,
    "bankeinzug" BOOLEAN NOT NULL DEFAULT true,
    "mandatDatum" TIMESTAMP(3),
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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mitgliedId_key" ON "User"("mitgliedId");

-- CreateIndex
CREATE INDEX "User_registrationPendingSince_idx" ON "User"("registrationPendingSince");

-- CreateIndex
CREATE INDEX "MemberFee_archivedAt_jahr_idx" ON "MemberFee"("archivedAt", "jahr");

-- CreateIndex
CREATE UNIQUE INDEX "MemberFee_userId_jahr_key" ON "MemberFee"("userId", "jahr");

-- CreateIndex
CREATE INDEX "BlogPost_eventId_idx" ON "BlogPost"("eventId");

-- CreateIndex
CREATE INDEX "Event_published_start_idx" ON "Event"("published", "start");

-- CreateIndex
CREATE INDEX "Event_start_idx" ON "Event"("start");

-- CreateIndex
CREATE UNIQUE INDEX "BlogImage_coverForPostId_key" ON "BlogImage"("coverForPostId");

-- CreateIndex
CREATE INDEX "BlogImage_postId_position_idx" ON "BlogImage"("postId", "position");

-- CreateIndex
CREATE INDEX "BoardMember_published_position_idx" ON "BoardMember"("published", "position");

-- CreateIndex
CREATE UNIQUE INDEX "BoardMemberPhoto_memberId_key" ON "BoardMemberPhoto"("memberId");

-- CreateIndex
CREATE INDEX "RateLimitEntry_resetAt_idx" ON "RateLimitEntry"("resetAt");

-- CreateIndex
CREATE INDEX "RateLimitEntry_blockedUntil_idx" ON "RateLimitEntry"("blockedUntil");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE INDEX "PasswordResetToken_email_idx" ON "PasswordResetToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationToken_token_key" ON "EmailVerificationToken"("token");

-- CreateIndex
CREATE INDEX "EmailVerificationToken_email_idx" ON "EmailVerificationToken"("email");

-- CreateIndex
CREATE INDEX "EmailVerificationToken_userId_idx" ON "EmailVerificationToken"("userId");

-- CreateIndex
CREATE INDEX "SolvedAltchaChallenge_expiresAt_idx" ON "SolvedAltchaChallenge"("expiresAt");

-- CreateIndex
CREATE INDEX "ContactRequest_createdAt_idx" ON "ContactRequest"("createdAt");

-- CreateIndex
CREATE INDEX "ContactRequest_handledAt_idx" ON "ContactRequest"("handledAt");

-- CreateIndex
CREATE UNIQUE INDEX "MembershipApplication_openForUserId_key" ON "MembershipApplication"("openForUserId");

-- CreateIndex
CREATE INDEX "MembershipApplication_status_submittedAt_idx" ON "MembershipApplication"("status", "submittedAt");

-- CreateIndex
CREATE INDEX "MembershipApplication_userId_idx" ON "MembershipApplication"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MembershipTermination_openForUserId_key" ON "MembershipTermination"("openForUserId");

-- CreateIndex
CREATE INDEX "MembershipTermination_status_effectiveAt_idx" ON "MembershipTermination"("status", "effectiveAt");

-- CreateIndex
CREATE INDEX "MembershipTermination_userId_idx" ON "MembershipTermination"("userId");

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

-- CreateIndex
CREATE INDEX "SentMail_createdAt_idx" ON "SentMail"("createdAt");

-- CreateIndex
CREATE INDEX "SentMail_recipientEmail_idx" ON "SentMail"("recipientEmail");

-- AddForeignKey
ALTER TABLE "MemberFee" ADD CONSTRAINT "MemberFee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogImage" ADD CONSTRAINT "BlogImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardMemberPhoto" ADD CONSTRAINT "BoardMemberPhoto_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "BoardMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipApplication" ADD CONSTRAINT "MembershipApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipTermination" ADD CONSTRAINT "MembershipTermination_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityEvent" ADD CONSTRAINT "SecurityEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;


-- Stammdaten: Beitragssätze (ordentlich 2,- €, Sonderstatus 1,- €)
INSERT INTO "FeeDefault" ("jahr", "regular", "student", "updatedAt", "createdAt")
VALUES (2026, 2, 1, NOW(), NOW())
ON CONFLICT ("jahr") DO NOTHING;

-- Stammdaten: Vorstand
INSERT INTO "BoardMember" ("id", "name", "role", "linkedin", "position", "published", "inSignature", "updatedAt") VALUES
    ('board-seed-1', 'Nikolas Tomek', '1. Vorstandsvorsitzender', 'https://www.linkedin.com/in/nikolas-tomek/', 0, true, true, CURRENT_TIMESTAMP),
    ('board-seed-2', 'Jannes Weghake', '2. Vorstandsvorsitzender', 'https://www.linkedin.com/in/jannes-weghake-317b95274/', 1, true, true, CURRENT_TIMESTAMP),
    ('board-seed-3', 'Carsten Schäfer-Siebert', 'Finanzen', 'https://www.linkedin.com/in/carsten-sch%C3%A4fer-siebert/', 2, true, false, CURRENT_TIMESTAMP),
    ('board-seed-4', 'Stefan Rau', 'Medien & IT', 'https://www.linkedin.com/in/stefan-rau-91243721a/', 3, true, false, CURRENT_TIMESTAMP),
    ('board-seed-5', 'Andreas Dietrich', 'Schriftführer', 'https://www.linkedin.com/in/andreas-dietrich-3934282a6/', 4, true, false, CURRENT_TIMESTAMP),
    ('board-seed-6', 'André Knoll', 'Fachschaftsbotschafter', '', 5, true, false, CURRENT_TIMESTAMP);
