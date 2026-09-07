-- AlterEnum
ALTER TYPE "FeatureFlagKey" ADD VALUE 'REGISTRATION_CLEANUP';

-- AlterEnum
ALTER TYPE "SecurityEventType" ADD VALUE 'REGISTRATION_EXPIRED';

-- AlterTable
-- Bewusst ohne Backfill: bestehende Konten bleiben NULL und damit von der
-- automatischen Löschung unbestätigter Registrierungen ausgenommen.
ALTER TABLE "User" ADD COLUMN     "registrationPendingSince" TIMESTAMP(3);

-- CreateIndex
-- Der Aufräumlauf fragt genau danach; ohne Index wäre es ein Seq Scan über die
-- ganze Nutzertabelle bei jedem Durchlauf.
CREATE INDEX "User_registrationPendingSince_idx" ON "User"("registrationPendingSince");
