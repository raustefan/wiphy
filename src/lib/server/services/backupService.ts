import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/server/siteUrl";
import { hashToken, newToken } from "@/lib/server/tokens";

export const BACKUP_LINK_MINUTES = 15;
const BACKUP_PATH = "/api/dashboard/server/backup";

/** Neuer Einmal-Link; ein noch offener alter wird damit ungültig. */
export async function createBackupLink(userId: string): Promise<string> {
  const { token, hash } = newToken();
  const expires = new Date(Date.now() + BACKUP_LINK_MINUTES * 60_000);
  await prisma.backupToken.upsert({
    where: { userId },
    create: { userId, token: hash, expires },
    update: { token: hash, expires },
  });
  return siteUrl(`${BACKUP_PATH}?token=${token}`);
}

/**
 * Löst den Link ein — nur für das Konto, das ihn angefordert hat. Löschen und
 * Prüfen in einem Schritt, damit zwei gleichzeitige Klicks nicht beide
 * durchkommen.
 */
export async function consumeBackupToken(userId: string, token: string): Promise<boolean> {
  const { count } = await prisma.backupToken.deleteMany({
    where: { userId, token: hashToken(token), expires: { gt: new Date() } },
  });
  return count === 1;
}
