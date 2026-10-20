-- Englische Feldnamen, internationale Anschrift, SEPA-Felder vollständig,
-- Altspalten aus dem Vorgängersystem entfernt. Spalten werden umbenannt statt
-- neu angelegt, damit keine Daten verloren gehen.

-- ─── Enums ───────────────────────────────────────────────────────────────
ALTER TYPE "Status" RENAME TO "MemberStatus";
ALTER TYPE "MemberStatus" RENAME VALUE 'ORDENTLICHES_MITGLIED' TO 'REGULAR_MEMBER';
ALTER TYPE "MemberStatus" RENAME VALUE 'EHRENMITGLIED' TO 'HONORARY_MEMBER';
ALTER TYPE "MemberStatus" RENAME VALUE 'KEIN_MITGLIED' TO 'NON_MEMBER';

ALTER TYPE "MembershipApplicationStatus" RENAME VALUE 'EINGEREICHT' TO 'SUBMITTED';
ALTER TYPE "MembershipApplicationStatus" RENAME VALUE 'ANGENOMMEN' TO 'ACCEPTED';
ALTER TYPE "MembershipApplicationStatus" RENAME VALUE 'ABGELEHNT' TO 'REJECTED';
ALTER TYPE "MembershipApplicationStatus" RENAME VALUE 'ZURUECKGEZOGEN' TO 'WITHDRAWN';

ALTER TYPE "MembershipTerminationStatus" RENAME VALUE 'EINGEREICHT' TO 'SUBMITTED';
ALTER TYPE "MembershipTerminationStatus" RENAME VALUE 'BESTAETIGT' TO 'CONFIRMED';
ALTER TYPE "MembershipTerminationStatus" RENAME VALUE 'ZURUECKGEZOGEN' TO 'WITHDRAWN';

CREATE TYPE "TerminationReason" AS ENUM ('RESIGNATION', 'EXCLUSION', 'DECEASED');
ALTER TABLE "MembershipTermination" ADD COLUMN "reason" "TerminationReason" NOT NULL DEFAULT 'RESIGNATION';

-- Das Versandprotokoll speichert die Empfängergruppe als Status-Namen.
UPDATE "SentMail" SET "recipientGroup" = CASE "recipientGroup"
  WHEN 'ORDENTLICHES_MITGLIED' THEN 'REGULAR_MEMBER'
  WHEN 'EHRENMITGLIED' THEN 'HONORARY_MEMBER'
  WHEN 'KEIN_MITGLIED' THEN 'NON_MEMBER'
  ELSE "recipientGroup" END;

-- ─── Ländercodes ─────────────────────────────────────────────────────────
-- Freitext → ISO 3166-1 alpha-2. Was sich nicht zuordnen lässt, bleibt als
-- Klartext stehen und wird beim nächsten Bearbeiten über die Länderauswahl
-- korrigiert.
CREATE FUNCTION pg_temp.country_code(value TEXT) RETURNS TEXT AS $$
  SELECT CASE
    WHEN value IS NULL OR btrim(value) = '' THEN NULL
    WHEN btrim(value) ~ '^[A-Za-z]{2}$' THEN upper(btrim(value))
    ELSE COALESCE((
      SELECT code FROM (VALUES
        ('deutschland', 'DE'), ('germany', 'DE'), ('d', 'DE'), ('brd', 'DE'),
        ('österreich', 'AT'), ('oesterreich', 'AT'), ('austria', 'AT'),
        ('schweiz', 'CH'), ('switzerland', 'CH'),
        ('liechtenstein', 'LI'), ('luxemburg', 'LU'), ('luxembourg', 'LU'),
        ('niederlande', 'NL'), ('netherlands', 'NL'), ('holland', 'NL'),
        ('belgien', 'BE'), ('belgium', 'BE'), ('frankreich', 'FR'), ('france', 'FR'),
        ('italien', 'IT'), ('italy', 'IT'), ('spanien', 'ES'), ('spain', 'ES'),
        ('portugal', 'PT'), ('irland', 'IE'), ('ireland', 'IE'),
        ('großbritannien', 'GB'), ('grossbritannien', 'GB'), ('vereinigtes königreich', 'GB'),
        ('united kingdom', 'GB'), ('uk', 'GB'), ('england', 'GB'),
        ('dänemark', 'DK'), ('daenemark', 'DK'), ('denmark', 'DK'),
        ('schweden', 'SE'), ('sweden', 'SE'), ('norwegen', 'NO'), ('norway', 'NO'),
        ('finnland', 'FI'), ('finland', 'FI'), ('polen', 'PL'), ('poland', 'PL'),
        ('tschechien', 'CZ'), ('czech republic', 'CZ'), ('czechia', 'CZ'),
        ('usa', 'US'), ('vereinigte staaten', 'US'), ('united states', 'US'),
        ('kanada', 'CA'), ('canada', 'CA'), ('australien', 'AU'), ('australia', 'AU'),
        ('singapur', 'SG'), ('singapore', 'SG'), ('china', 'CN'), ('japan', 'JP'),
        ('indien', 'IN'), ('india', 'IN')
      ) AS names(name, code)
      WHERE names.name = lower(btrim(value))
    ), btrim(value))
  END
$$ LANGUAGE SQL IMMUTABLE;

-- ─── User ────────────────────────────────────────────────────────────────
-- Entfallende Altspalten, deren Inhalt für die Verwaltung noch zählt, wandern
-- vorher in den Admin-Kommentar.
UPDATE "User" SET "zahlungsKommentar" = NULLIF(concat_ws(E'\n',
    NULLIF(btrim("zahlungsKommentar"), ''),
    'Mahnung (Altdaten): ' || NULLIF(btrim("mahnung"), ''),
    CASE WHEN "IBAN" IS NULL AND (NULLIF(btrim("BLZ"), '') IS NOT NULL OR NULLIF(btrim("KTO"), '') IS NOT NULL)
      THEN 'Bankverbindung (Altdaten): BLZ ' || COALESCE(NULLIF(btrim("BLZ"), ''), '–')
        || ', Konto ' || COALESCE(NULLIF(btrim("KTO"), ''), '–') END,
    CASE WHEN "ausschluss" THEN 'Ausschluss (Altdaten)' END,
    CASE WHEN "datensperren" THEN 'Datensperre (Altdaten)' END
  ), '');

ALTER TABLE "User" RENAME COLUMN "password" TO "passwordHash";
ALTER TABLE "User" RENAME COLUMN "vorname" TO "firstName";
ALTER TABLE "User" RENAME COLUMN "name" TO "lastName";
ALTER TABLE "User" RENAME COLUMN "titel" TO "title";
ALTER TABLE "User" RENAME COLUMN "geburtsdatum" TO "birthDate";
ALTER TABLE "User" RENAME COLUMN "telefon" TO "phone";
ALTER TABLE "User" RENAME COLUMN "strasse" TO "addressLine1";
ALTER TABLE "User" ADD COLUMN "addressLine2" TEXT;
ALTER TABLE "User" RENAME COLUMN "plz" TO "postalCode";
ALTER TABLE "User" RENAME COLUMN "stadt" TO "city";
ALTER TABLE "User" ADD COLUMN "region" TEXT;
ALTER TABLE "User" ADD COLUMN "countryCode" TEXT;
UPDATE "User" SET "countryCode" = pg_temp.country_code("land");
ALTER TABLE "User" DROP COLUMN "land";

ALTER TABLE "User" RENAME COLUMN "mitgliedId" TO "memberNumber";
ALTER INDEX "User_mitgliedId_key" RENAME TO "User_memberNumber_key";
ALTER TABLE "User" RENAME COLUMN "aufnahmedatum" TO "joinedAt";
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'NON_MEMBER';
ALTER TABLE "User" RENAME COLUMN "kosmosSichtbar" TO "kosmosVisible";
ALTER TABLE "User" RENAME COLUMN "zahlungsKommentar" TO "adminNote";

ALTER TABLE "User" RENAME COLUMN "studiengang" TO "degreeProgram";
ALTER TABLE "User" RENAME COLUMN "studienbeginn" TO "studyStart";
ALTER TABLE "User" RENAME COLUMN "studienende" TO "studyEnd";
ALTER TABLE "User" RENAME COLUMN "arbeitgeber" TO "employer";
ALTER TABLE "User" RENAME COLUMN "berufsstand" TO "employmentStatus";
ALTER TABLE "User" RENAME COLUMN "berufszweig" TO "industry";
ALTER TABLE "User" RENAME COLUMN "position" TO "jobTitle";
ALTER TABLE "User" ADD COLUMN "linkedinUrl" TEXT;
UPDATE "User" SET "linkedinUrl" = btrim("website") WHERE "website" ILIKE '%linkedin.com/%';

ALTER TABLE "User" RENAME COLUMN "bankeinzug" TO "directDebit";
UPDATE "User" SET "directDebit" = false WHERE "directDebit" IS NULL;
ALTER TABLE "User" ALTER COLUMN "directDebit" SET NOT NULL, ALTER COLUMN "directDebit" SET DEFAULT false;
ALTER TABLE "User" ADD COLUMN "accountHolder" TEXT;
ALTER TABLE "User" RENAME COLUMN "IBAN" TO "iban";
ALTER TABLE "User" RENAME COLUMN "BIC" TO "bic";
ALTER TABLE "User" ADD COLUMN "mandateReference" TEXT;
ALTER TABLE "User" RENAME COLUMN "mandatserteilung" TO "mandateSignedAt";
-- Bisher ging der Kontoinhaber aus dem Antrag beim Übernehmen verloren, und
-- die Lastschrift lief auf den Namen des Mitglieds. Der jüngste Antrag weiß es
-- besser; sonst bleibt es beim Namen, mit dem bisher eingezogen wurde.
UPDATE "User" u SET
  "accountHolder" = COALESCE(
    (SELECT a."kontoinhaber" FROM "MembershipApplication" a
      WHERE a."userId" = u."id" AND a."IBAN" = u."iban" AND a."kontoinhaber" IS NOT NULL
      ORDER BY a."submittedAt" DESC LIMIT 1),
    btrim(u."firstName" || ' ' || u."lastName")),
  "mandateReference" = (SELECT a."mandatsreferenz" FROM "MembershipApplication" a
      WHERE a."userId" = u."id" AND a."IBAN" = u."iban" AND a."mandatsreferenz" IS NOT NULL
      ORDER BY a."submittedAt" DESC LIMIT 1)
WHERE u."iban" IS NOT NULL;

ALTER TABLE "User" RENAME COLUMN "lastLogin" TO "lastLoginAt";

ALTER TABLE "User"
  DROP COLUMN "user",
  DROP COLUMN "website",
  DROP COLUMN "diplomarbeit",
  DROP COLUMN "bachelorarbeit",
  DROP COLUMN "masterarbeit",
  DROP COLUMN "dissertation",
  DROP COLUMN "praktika",
  DROP COLUMN "berufserfahrung",
  DROP COLUMN "bank",
  DROP COLUMN "BLZ",
  DROP COLUMN "KTO",
  DROP COLUMN "zuwendungsbesch",
  DROP COLUMN "mahnung",
  DROP COLUMN "datensperren",
  DROP COLUMN "ausschluss";

-- ─── MemberFee / FeeDefault ──────────────────────────────────────────────
ALTER TABLE "MemberFee" RENAME COLUMN "jahr" TO "year";
ALTER TABLE "MemberFee" RENAME COLUMN "bezahlt" TO "paid";
ALTER TABLE "MemberFee" RENAME COLUMN "beitrag" TO "amount";
ALTER TABLE "MemberFee" RENAME COLUMN "beitragManuell" TO "manualAmount";
ALTER TABLE "MemberFee" RENAME COLUMN "archivName" TO "archivedName";
ALTER TABLE "MemberFee" RENAME COLUMN "archivMitgliedId" TO "archivedMemberNumber";
ALTER INDEX "MemberFee_userId_jahr_key" RENAME TO "MemberFee_userId_year_key";
ALTER INDEX "MemberFee_archivedAt_jahr_idx" RENAME TO "MemberFee_archivedAt_year_idx";

ALTER TABLE "FeeDefault" RENAME COLUMN "jahr" TO "year";

-- ─── MembershipApplication ───────────────────────────────────────────────
ALTER TABLE "MembershipApplication" ALTER COLUMN "status" SET DEFAULT 'SUBMITTED';
ALTER TABLE "MembershipApplication" RENAME COLUMN "vorname" TO "firstName";
ALTER TABLE "MembershipApplication" RENAME COLUMN "name" TO "lastName";
ALTER TABLE "MembershipApplication" RENAME COLUMN "titel" TO "title";
ALTER TABLE "MembershipApplication" RENAME COLUMN "geburtsdatum" TO "birthDate";
ALTER TABLE "MembershipApplication" RENAME COLUMN "strasse" TO "addressLine1";
ALTER TABLE "MembershipApplication" ADD COLUMN "addressLine2" TEXT;
ALTER TABLE "MembershipApplication" RENAME COLUMN "plz" TO "postalCode";
ALTER TABLE "MembershipApplication" ALTER COLUMN "postalCode" DROP NOT NULL;
ALTER TABLE "MembershipApplication" RENAME COLUMN "stadt" TO "city";
ALTER TABLE "MembershipApplication" ADD COLUMN "region" TEXT;
ALTER TABLE "MembershipApplication" RENAME COLUMN "land" TO "countryCode";
UPDATE "MembershipApplication" SET "countryCode" = pg_temp.country_code("countryCode");
ALTER TABLE "MembershipApplication" RENAME COLUMN "telefon" TO "phone";

ALTER TABLE "MembershipApplication" RENAME COLUMN "studiengang" TO "degreeProgram";
ALTER TABLE "MembershipApplication" RENAME COLUMN "studienbeginn" TO "studyStart";
ALTER TABLE "MembershipApplication" RENAME COLUMN "studienende" TO "studyEnd";
ALTER TABLE "MembershipApplication" RENAME COLUMN "arbeitgeber" TO "employer";
ALTER TABLE "MembershipApplication" RENAME COLUMN "berufsstand" TO "employmentStatus";
ALTER TABLE "MembershipApplication" RENAME COLUMN "berufszweig" TO "industry";
ALTER TABLE "MembershipApplication" RENAME COLUMN "position" TO "jobTitle";

ALTER TABLE "MembershipApplication" RENAME COLUMN "kontoinhaber" TO "accountHolder";
ALTER TABLE "MembershipApplication" RENAME COLUMN "IBAN" TO "iban";
ALTER TABLE "MembershipApplication" RENAME COLUMN "BIC" TO "bic";
ALTER TABLE "MembershipApplication" RENAME COLUMN "bankeinzug" TO "directDebit";
ALTER TABLE "MembershipApplication" RENAME COLUMN "mandatDatum" TO "mandateSignedAt";
ALTER TABLE "MembershipApplication" RENAME COLUMN "mandatsreferenz" TO "mandateReference";
ALTER TABLE "MembershipApplication" DROP COLUMN "bank";

ALTER TABLE "MembershipApplication" RENAME COLUMN "satzungAccepted" TO "bylawsAccepted";
ALTER TABLE "MembershipApplication" RENAME COLUMN "datenschutzAccepted" TO "privacyAccepted";
ALTER TABLE "MembershipApplication" RENAME COLUMN "beitragRegularSnapshot" TO "regularFeeSnapshot";
ALTER TABLE "MembershipApplication" RENAME COLUMN "beitragStudentSnapshot" TO "studentFeeSnapshot";

-- ─── MembershipTermination ───────────────────────────────────────────────
ALTER TABLE "MembershipTermination" ALTER COLUMN "status" SET DEFAULT 'SUBMITTED';
