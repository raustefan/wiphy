-- Newsletter-Abo: per Default an, auch für alle bestehenden Konten.
ALTER TABLE "User" ADD COLUMN "newsletter" BOOLEAN NOT NULL DEFAULT true;
