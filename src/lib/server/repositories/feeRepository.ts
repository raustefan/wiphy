import { prisma } from "@/lib/prisma";
import type { Role } from "@prisma/client";

/**
 * Mitglieder samt Beitragszeilen.
 *
 * Die Admin-Sicht zeigt nur ordentliche Mitglieder: alle anderen Konten sind
 * nach § 5 gar nicht beitragspflichtig (Ehrenmitglieder, fördernde Mitglieder)
 * oder noch keine Mitglieder — sie in der Zahlungsübersicht zu führen erzeugt
 * nur Zeilen, die dauerhaft „offen“ aussehen.
 */
export function findUsersWithFees(userId: string, role: Role) {
  return prisma.user.findMany({
    where: role === "ADMIN" ? { status: "ORDENTLICHES_MITGLIED" } : { id: userId },
    orderBy: { createdAt: "asc" },
    include: { fees: true },
  });
}

/** Beitragspflichtige Mitglieder — Zielgruppe beim Anlegen eines Geschäftsjahres. */
export function findFeeLiableUsers() {
  return prisma.user.findMany({
    where: { status: "ORDENTLICHES_MITGLIED" },
    select: { id: true, studentYears: true },
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
async function resolveIsStudentDefault(userId: string, jahr: number): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { studentYears: true },
  });
  if (user?.studentYears.length) return user.studentYears.includes(jahr);

  const lastFee = await prisma.memberFee.findFirst({
    where: { userId, jahr: { lt: jahr } },
    orderBy: { jahr: "desc" },
  });
  return lastFee?.isStudent ?? false;
}

/**
 * Hält `User.studentYears` mit der Beitragszeile in Deckung. Ohne diesen Abgleich
 * würde ein im Dashboard umgeschalteter Sonderstatus von der Erklärung des
 * Mitglieds überstimmt, sobald eine neue Zeile angelegt wird.
 */
async function syncStudentYear(userId: string, jahr: number, isStudent: boolean) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { studentYears: true },
  });
  if (!user) return;

  const years = new Set(user.studentYears);
  if (isStudent) years.add(jahr);
  else years.delete(jahr);

  await prisma.user.update({
    where: { id: userId },
    data: { studentYears: [...years].sort((a, b) => a - b) },
  });
}

export function upsertMemberFee(userId: string, jahr: number, bezahlt: boolean) {
  return prisma.memberFee.upsert({
    where: {
      userId_jahr: { userId, jahr },
    },
    update: { bezahlt },
    create: { userId, jahr, bezahlt },
  });
}

export async function upsertFeeStatus(userId: string, jahr: number, field: "paid" | "isStudent", value: boolean) {
  if (field === "isStudent") {
    await syncStudentYear(userId, jahr, value);
  }

  const existing = await prisma.memberFee.findUnique({
    where: { userId_jahr: { userId, jahr } },
  });

  if (existing) {
    return prisma.memberFee.update({
      where: { userId_jahr: { userId, jahr } },
      data: {
        [field === "paid" ? "bezahlt" : "isStudent"]: value,
      },
    });
  }

  return prisma.memberFee.create({
    data: {
      userId,
      jahr,
      bezahlt: field === "paid" ? value : false,
      isStudent:
        field === "isStudent" ? value : await resolveIsStudentDefault(userId, jahr),
      beitrag: 0,
    },
  });
}

/** Setzt einen abweichenden Betrag und markiert die Zeile als manuell gepflegt. */
export async function upsertFeeAmount(userId: string, jahr: number, beitrag: number) {
  const existing = await prisma.memberFee.findUnique({
    where: { userId_jahr: { userId, jahr } },
  });

  if (existing) {
    return prisma.memberFee.update({
      where: { userId_jahr: { userId, jahr } },
      data: { beitrag, beitragManuell: true },
    });
  }

  return prisma.memberFee.create({
    data: {
      userId,
      jahr,
      bezahlt: false,
      isStudent: await resolveIsStudentDefault(userId, jahr),
      beitrag,
      beitragManuell: true,
    },
  });
}

/** Hebt eine manuelle Festlegung auf; die Zeile folgt wieder dem Standardbeitrag. */
export function clearFeeAmountOverride(userId: string, jahr: number) {
  return prisma.memberFee.update({
    where: { userId_jahr: { userId, jahr } },
    data: { beitrag: 0, beitragManuell: false },
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
    distinct: ["jahr"],
    select: { jahr: true },
    orderBy: { jahr: "asc" },
  });
  return rows.map((row) => row.jahr);
}

export function updateFeeComment(userId: string, comment: string | null) {
  return prisma.user.update({
    where: { id: userId },
    data: { zahlungsKommentar: comment },
  });
}
