import { prisma } from "@/lib/prisma";
import type { Prisma, Role } from "@prisma/client";
import { calculateFeeAmount } from "@/lib/feeCalculation";
import { resolveFeeDefault } from "@/lib/feeDefaults";
import { feeRetentionCutoffYear } from "@/lib/membershipTermination";

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
    select: { id: true, studentYears: true, joinedAt: true },
  });
}


/**
 * Sonderstatus-Vorbelegung für ein Jahr ohne eigene Beitragszeile.
 *
 * Vorrang hat die Erklärung des Mitglieds (`User.studentYears`) — sie deckt auch
 * künftige Jahre ab, für die es noch gar keine Zeile geben kann. Nur wenn dort
 * nichts hinterlegt ist, wird der Status des zuletzt erfassten Jahres
 * fortgeschrieben.
 */
async function resolveIsStudentDefault(userId: string, year: number): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { studentYears: true },
  });
  if (user?.studentYears.length) return user.studentYears.includes(year);

  const lastFee = await prisma.memberFee.findFirst({
    where: { userId, year: { lt: year } },
    orderBy: { year: "desc" },
  });
  return lastFee?.isStudent ?? false;
}

/**
 * Hält `User.studentYears` mit der Beitragszeile in Deckung. Ohne diesen Abgleich
 * würde ein im Dashboard umgeschalteter Sonderstatus von der Erklärung des
 * Mitglieds überstimmt, sobald eine neue Zeile angelegt wird.
 */
async function syncStudentYear(userId: string, year: number, isStudent: boolean) {
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

export async function upsertFeeStatus(userId: string, year: number, field: "paid" | "isStudent", value: boolean) {
  if (field === "isStudent") {
    await syncStudentYear(userId, year, value);
  }

  const existing = await prisma.memberFee.findUnique({
    where: { userId_year: { userId, year } },
  });

  if (existing) {
    return prisma.memberFee.update({
      where: { userId_year: { userId, year } },
      data: {
        [field === "paid" ? "paid" : "isStudent"]: value,
      },
    });
  }

  return prisma.memberFee.create({
    data: {
      userId,
      year,
      paid: field === "paid" ? value : false,
      isStudent:
        field === "isStudent" ? value : await resolveIsStudentDefault(userId, year),
      amount: 0,
    },
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
      isStudent: await resolveIsStudentDefault(userId, year),
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
    // Archivzeilen gelöschter Konten eröffnen kein Beitragsjahr.
    where: { archivedAt: null },
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

/**
 * Löst die Beitragszeilen vom Konto, bevor es gelöscht wird. Sie sind
 * Aufzeichnungen im Sinne von § 147 AO und müssen die Löschung überdauern.
 *
 * Eingefroren werden der tatsächlich fällige Betrag — im Regelfall wird er aus
 * den Standardsätzen und Kontodaten *berechnet*, die es danach nicht mehr gibt —
 * sowie Name und Mitgliedsnummer als Zuordnung. Alles andere am Konto fällt weg.
 * Läuft in der Transaktion der Löschung, damit kein halb archivierter Stand
 * einen noch lebenden Beitrag einfriert.
 */
export async function archiveFeesOfUser(tx: Prisma.TransactionClient, userId: string) {
  const user = await tx.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      memberNumber: true,
      directDebit: true,
      joinedAt: true,
      fees: true,
    },
  });
  if (!user || user.fees.length === 0) return;

  const defaults = await tx.feeDefault.findMany();
  const archivedAt = new Date();
  for (const fee of user.fees) {
    const rates = resolveFeeDefault(defaults, fee.year);
    const amount = fee.manualAmount
      ? fee.amount
      : calculateFeeAmount({
          monthlyRegular: rates.regular,
          monthlyStudent: rates.student,
          isStudent: fee.isStudent,
          directDebit: user.directDebit,
          year: fee.year,
          joinedAt: user.joinedAt,
        });
    await tx.memberFee.update({
      where: { id: fee.id },
      data: {
        amount,
        manualAmount: true,
        archivedName: `${user.firstName} ${user.lastName}`.trim(),
        archivedMemberNumber: user.memberNumber,
        archivedAt,
      },
    });
  }
}

/** Archivzeilen gelöschter Konten, nur lesend für Admins. */
export function findArchivedFees() {
  return prisma.memberFee.findMany({
    where: { archivedAt: { not: null } },
    orderBy: [{ archivedName: "asc" }, { year: "asc" }],
  });
}

/** Löscht Archivzeilen nach Ablauf der Aufbewahrungsfrist. */
export function pruneArchivedFees(now: Date = new Date()) {
  return prisma.memberFee.deleteMany({
    where: { archivedAt: { not: null }, year: { lt: feeRetentionCutoffYear(now) } },
  });
}
