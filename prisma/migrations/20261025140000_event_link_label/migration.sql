-- Online-Link wird zu einem frei beschrifteten Link
ALTER TABLE "Event" RENAME COLUMN "onlineUrl" TO "linkUrl";
ALTER TABLE "Event" ADD COLUMN "linkLabel" TEXT NOT NULL DEFAULT '';

-- Bestehende Online-Links behalten ihre bisherige Beschriftung.
UPDATE "Event" SET "linkLabel" = 'Online teilnehmen' WHERE "linkUrl" <> '';
