-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "imageUrl";

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

-- CreateIndex
CREATE UNIQUE INDEX "BlogImage_coverForPostId_key" ON "BlogImage"("coverForPostId");

-- CreateIndex
CREATE INDEX "BlogImage_postId_position_idx" ON "BlogImage"("postId", "position");

-- AddForeignKey
ALTER TABLE "BlogImage" ADD CONSTRAINT "BlogImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

