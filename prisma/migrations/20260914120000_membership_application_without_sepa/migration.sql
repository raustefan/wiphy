-- Aufnahmeanträge ohne SEPA-Lastschriftmandat.
--
-- Wer kein Mandat erteilt, überweist den Beitrag selbst. Der Verein zieht dann
-- nichts ein und hat für Kontoinhaber, IBAN und Mandatsdatum keine Verwendung;
-- das Formular fragt sie in diesem Fall gar nicht ab. Die drei Spalten dürfen
-- deshalb leer bleiben.
--
-- Rein erweiternd: bestehende Zeilen behalten ihre Werte, nur der NOT-NULL-
-- Zwang entfällt.
ALTER TABLE "MembershipApplication" ALTER COLUMN "kontoinhaber" DROP NOT NULL;
ALTER TABLE "MembershipApplication" ALTER COLUMN "IBAN" DROP NOT NULL;
ALTER TABLE "MembershipApplication" ALTER COLUMN "mandatDatum" DROP NOT NULL;
