-- Sonderstatus nur noch in "User"."studentYears"; "MemberFee"."isStudent" entfällt.
BEGIN;

-- Bisher galt für ein Jahr die Beitragszeile, ohne Zeile die Erklärung. Genau
-- das wird jetzt festgeschrieben: Jahre mit Zeile nach deren Status, Jahre ohne
-- Zeile wie erklärt. Für kein Jahr mit Zeile ändert sich damit etwas.
UPDATE "User" u
SET "studentYears" = COALESCE((
  SELECT array_agg(y ORDER BY y)
  FROM (
    SELECT f."year" AS y FROM "MemberFee" f WHERE f."userId" = u."id" AND f."isStudent"
    UNION
    SELECT d.y FROM unnest(u."studentYears") AS d(y)
    WHERE NOT EXISTS (SELECT 1 FROM "MemberFee" f WHERE f."userId" = u."id" AND f."year" = d.y)
  ) s
), '{}');

-- Probe: Jede Zeile muss jetzt denselben Status ergeben wie vorher — sonst
-- bricht die ganze Migration ab, bevor die Spalte verschwindet.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM "MemberFee" f JOIN "User" u ON u."id" = f."userId"
    WHERE f."isStudent" <> (f."year" = ANY(COALESCE(u."studentYears", '{}')))
  ) THEN
    RAISE EXCEPTION 'studentYears weicht von MemberFee.isStudent ab — Migration abgebrochen';
  END IF;
END $$;

-- Vorab angelegte künftige Jahre tragen ohne Status keine Information mehr:
-- unbezahlt und ohne Sonderbetrag entstehen sie über „Jahr hinzufügen“ neu.
DELETE FROM "MemberFee"
WHERE "year" > EXTRACT(YEAR FROM now() AT TIME ZONE 'Europe/Berlin')
  AND NOT "paid"
  AND NOT "manualAmount";

ALTER TABLE "MemberFee" DROP COLUMN "isStudent";

COMMIT;
