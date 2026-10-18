-- CreateTable
CREATE TABLE "BackupToken" (
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BackupToken_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "BackupToken_token_key" ON "BackupToken"("token");

-- AddForeignKey
ALTER TABLE "BackupToken" ADD CONSTRAINT "BackupToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

