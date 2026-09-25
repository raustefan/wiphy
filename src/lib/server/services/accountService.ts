import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/server/errors";
import { consumeRateLimit } from "@/lib/server/rateLimit";
import { deleteUserById } from "@/lib/server/repositories/userRepository";

/**
 * Kündigen, Zugang sperren und Konto löschen verlangen das Passwort erneut:
 * eine übernommene Sitzung allein soll dafür nicht reichen. Die Drossel zählt
 * jeden Versuch, damit sich darüber kein Passwort raten lässt.
 */
export async function verifyPasswordForAccountAction(userId: string, password: string) {
  await consumeRateLimit({
    bucket: "account-action",
    keyParts: [userId],
    limit: 5,
    windowMs: 15 * 60 * 1000,
    blockMs: 15 * 60 * 1000,
    message: "Zu viele Versuche. Bitte versuche es in 15 Minuten erneut.",
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });
  if (!user || !password || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("FORBIDDEN", "Das Passwort stimmt nicht.");
  }
}

/**
 * „Konto löschen“ für Mitglieder: Die Mitgliedschaft besteht weiter, also
 * bleiben auch alle Daten, die der Verein dafür braucht (Art. 6 Abs. 1 lit. b
 * DSGVO). Gesperrt wird nur der Login; das Hochzählen von `sessionVersion`
 * beendet zusätzlich alle offenen Sitzungen. Admins heben die Sperre über
 * `loginDisabled` im Adminbereich wieder auf.
 */
export async function disableOwnLogin(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true, status: true, email: true, vorname: true, name: true },
  });
  if (!user) throw new AppError("NOT_FOUND", "Benutzerkonto nicht gefunden.");
  // Ein Admin könnte sich so selbst (und im Zweifel den Verein) aussperren.
  if (user.role === "ADMIN") {
    throw new AppError("FORBIDDEN", "Administratoren können ihren Zugang nicht selbst sperren.");
  }
  if (user.status === "KEIN_MITGLIED") {
    throw new AppError("FORBIDDEN", "Ohne Mitgliedschaft kannst du dein Konto vollständig löschen.");
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { loginDisabled: true, sessionVersion: { increment: 1 } },
    }),
    prisma.passwordResetToken.deleteMany({ where: { email: user.email } }),
  ]);
  return user;
}

/**
 * Restloses Löschen eines Kontos ohne Mitgliedschaft — durch den Nutzer selbst
 * oder einen Admin. Mit Mitgliedschaft wird stattdessen der Login gesperrt
 * (siehe `disableOwnLogin`): der Verein braucht die Daten, solange sie besteht.
 */
export async function deleteAccountWithoutMembership(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { status: true, email: true, vorname: true, name: true },
  });
  if (!user) throw new AppError("NOT_FOUND", "Benutzerkonto nicht gefunden.");
  if (user.status !== "KEIN_MITGLIED") {
    throw new AppError(
      "FORBIDDEN",
      "Solange eine Mitgliedschaft besteht, kann das Konto nicht gelöscht werden.",
    );
  }
  await deleteUserById(userId);
  return user;
}
