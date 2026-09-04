-- AlterTable
ALTER TABLE "MemberFee" ADD COLUMN "beitragManuell" BOOLEAN NOT NULL DEFAULT false;

-- Bestehende Beträge stammen aus der Zeit vor den Standard-Beitragssätzen und
-- sind teils historisch gewachsen. Sie werden als manuelle Festlegung markiert,
-- damit die Umstellung keine bereits abgerechneten Jahre neu bewertet.
UPDATE "MemberFee" SET "beitragManuell" = true WHERE "beitrag" <> 0;

-- Von der Mitgliederversammlung beschlossene Monatsbeiträge (§ 5): 2,- € für
-- ordentliche Mitglieder, 1,- € mit Sonderstatus. Ein einzelner Eintrag genügt —
-- `resolveFeeDefault` zieht ihn auch für frühere Jahre heran, bis ein neuerer
-- Beschluss hinterlegt wird.
INSERT INTO "FeeDefault" ("jahr", "regular", "student", "updatedAt", "createdAt")
VALUES (2026, 2, 1, NOW(), NOW())
ON CONFLICT ("jahr") DO NOTHING;
