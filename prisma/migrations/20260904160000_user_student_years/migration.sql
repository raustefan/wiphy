-- AlterTable
ALTER TABLE "User" ADD COLUMN "studentYears" INTEGER[];

-- Bestand übernehmen: Jahre, die bereits als Beitragsjahr mit Sonderstatus
-- erfasst sind, gelten auch als erklärter Sonderstatus des Mitglieds.
UPDATE "User" u
SET "studentYears" = COALESCE(sub.years, ARRAY[]::INTEGER[])
FROM (
  SELECT "userId", ARRAY_AGG(DISTINCT "jahr" ORDER BY "jahr") AS years
  FROM "MemberFee"
  WHERE "isStudent" = true
  GROUP BY "userId"
) AS sub
WHERE u."id" = sub."userId";
