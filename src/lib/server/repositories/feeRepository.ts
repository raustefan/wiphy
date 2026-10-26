import { prisma } from "@/lib/prisma";
import type { Role } from "@prisma/client";

/**
 * Konten samt Beitragszeilen.
 *
 * Mitglieder bekommen nur ihr eigenes Konto. Die Admin-Sicht ohne Jahr zeigt
 * nur ordentliche Mitglieder: alle anderen Konten sind nach § 5 gar nicht
 * beitragspflichtig (Ehrenmitglieder, fördernde Mitglieder) oder noch keine
 * Mitglieder. Mit Jahr kommen alle Konten — welche davon in der Beitragsliste
 * des Jahres stehen, entscheidet `isInFeeYear` im Service; die Benutzer-
 * verwaltung braucht auch die übrigen samt Beitragsverlauf.
 */
export function findUsersWithFees(userId: string, role: Role, year?: number) {
  return prisma.user.findMany({
    where:
      role !== "ADMIN"
        ? { id: userId }
        : year === undefined
          ? { status: "REGULAR_MEMBER" }
          : undefined,
    orderBy: { createdAt: "asc" },
    include: { fees: true },
  });
}

/** Beitragspflichtige Mitglieder — Zielgruppe beim Anlegen eines Geschäftsjahres. */
export function findFeeLiableUsers() {
  return prisma.user.findMany({
    where: { status: "REGULAR_MEMBER" },
    select: { id: true, joinedAt: true },
  });
}


/** Sonderstatus eines Jahres — er steht allein in `User.studentYears`. */
export async function setStudentYear(userId: string, year: number, isStudent: boolean) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { studentYears: true },
  });
  if (!user) return;

  const years = new Set(user.studentYears);
  if (isStudent) years.add(year);
  else years.delete(year);

  await prisma.user.update({
    where: { id: userId },
    data: { studentYears: [...years].sort((a, b) => a - b) },
  });
}

export function upsertFeePaid(userId: string, year: number, paid: boolean) {
  return prisma.memberFee.upsert({
    where: { userId_year: { userId, year } },
    update: { paid },
    create: { userId, year, paid, amount: 0 },
  });
}

/** Setzt einen abweichenden Betrag und markiert die Zeile als manuell gepflegt. */
export async function upsertFeeAmount(userId: string, year: number, amount: number) {
  const existing = await prisma.memberFee.findUnique({
    where: { userId_year: { userId, year } },
  });

  if (existing) {
    return prisma.memberFee.update({
      where: { userId_year: { userId, year } },
      data: { amount, manualAmount: true },
    });
  }

  return prisma.memberFee.create({
    data: {
      userId,
      year,
      paid: false,
      amount,
      manualAmount: true,
    },
  });
}

/** Hebt eine manuelle Festlegung auf; die Zeile folgt wieder dem Standardbeitrag. */
export function clearFeeAmountOverride(userId: string, year: number) {
  return prisma.memberFee.update({
    where: { userId_year: { userId, year } },
    data: { amount: 0, manualAmount: false },
  });
}

/**
 * Beitragsjahre, für die tatsächlich Zeilen existieren — aufsteigend.
 *
 * Der Jahresselektor listet genau diese: eine frei erfundene Spanne würde Jahre
 * anbieten, für die es nichts zu sehen gibt.
 */
export async function findExistingFeeYears(): Promise<number[]> {
  const rows = await prisma.memberFee.findMany({
    distinct: ["year"],
    select: { year: true },
    orderBy: { year: "asc" },
  });
  return rows.map((row) => row.year);
}

export function updateFeeComment(userId: string, comment: string | null) {
  return prisma.user.update({
    where: { id: userId },
    data: { adminNote: comment },
  });
}
