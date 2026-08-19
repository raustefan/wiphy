-- CreateEnum
CREATE TYPE "FeatureFlagKey" AS ENUM ('LOGIN', 'PASSWORD_RESET', 'REGISTRATION', 'EMAIL_CHANGE', 'PROFILE_EDIT', 'FEE_CHANGES', 'MAIL_SERVICES');

-- CreateTable
CREATE TABLE "FeatureFlag" (
    "key" "FeatureFlagKey" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeatureFlag_pkey" PRIMARY KEY ("key")
);
