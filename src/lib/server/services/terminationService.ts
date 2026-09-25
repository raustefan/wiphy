import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/server/errors";
import { pruneArchivedFees } from "@/lib/server/repositories/feeRepository";
import {
  TERMINATION_RECORD_RETENTION_YEARS,
  terminationDate,
} from "@/lib/membershipTermination";

const DAY_MS = 24 * 60 * 60 * 1000;

const userSelect = {
  id: true,
  email: true,
  vorname: true,
  name: true,
  status: true,
  mitgliedId: true,
  loginDisabled: true,
} as const;

/** Die noch nicht vollzogene Kündigung eines Mitglieds, falls es eine gibt. */
export function getOpenTermination(userId: string) {
  return prisma.membershipTermination.findUnique({ where: { openForUserId: userId } });
}

export function getTerminations(limit = 200) {
  return prisma.membershipTermination.findMany({
    orderBy: { submittedAt: "desc" },
    take: limit,
    include: { user: { select: userSelect } },
  });
}

export function getTermination(id: string) {
  return prisma.membershipTermination.findUnique({
    where: { id },
    include: { user: { select: userSelect } },
  });
}

export function countOpenTerminations() {
  return prisma.membershipTermination.count({ where: { status: "EINGEREICHT" } });
}

/**
 * Nimmt die Austrittserklärung entgegen. Das Austrittsdatum ergibt sich aus
 * dem Eingangszeitpunkt (§ 6 Satzung) und wird sofort festgehalten — der
 * Zugang ist der rechtlich entscheidende Moment, nicht die spätere Bestätigung.
 */
export async function submitTermination(userId: string, keepAccount: boolean) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: userSelect });
  if (!user) throw new AppError("NOT_FOUND", "Benutzerkonto nicht gefunden.");
  if (user.status === "KEIN_MITGLIED") {
    throw new AppError("FORBIDDEN", "Für dieses Konto besteht keine Mitgliedschaft.");
  }

  const submittedAt = new Date();
  try {
    const termination = await prisma.membershipTermination.create({
      data: {
        userId,
        openForUserId: userId,
        submittedAt,
        effectiveAt: terminationDate(submittedAt),
        keepAccount,
      },
    });
    return { termination, user };
  } catch (error) {
    // Unique auf `openForUserId`: es liegt bereits eine Kündigung vor.
    if ((error as { code?: string }).code === "P2002") {
      throw new AppError("CONFLICT", "Deine Kündigung liegt uns bereits vor.");
    }
    throw error;
  }
}

/**
 * Rücknahme durch das Mitglied. Nach dem Zugang bräuchte sie rechtlich die
 * Zustimmung des Vereins — die gilt als erteilt, solange der Vorstand die
 * Kündigung noch nicht bestätigt hat. Danach nur noch über den Vorstand.
 */
export async function withdrawTermination(id: string, userId: string) {
  const { count } = await prisma.membershipTermination.updateMany({
    where: { id, userId, status: "EINGEREICHT" },
    data: { status: "ZURUECKGEZOGEN", openForUserId: null, decidedAt: new Date() },
  });
  if (count === 0) {
    throw new AppError("CONFLICT", "Diese Kündigung kann nicht mehr zurückgenommen werden.");
  }
}

/** Eingangsbestätigung durch den Vorstand, optional mit korrigiertem Austrittsdatum. */
export async function confirmTermination(params: {
  id: string;
  adminId: string;
  effectiveAt: Date;
  note: string | null;
}) {
  const { count } = await prisma.membershipTermination.updateMany({
    where: { id: params.id, status: "EINGEREICHT" },
    data: {
      status: "BESTAETIGT",
      effectiveAt: params.effectiveAt,
      decidedAt: new Date(),
      decidedById: params.adminId,
      decisionNote: params.note,
    },
  });
  if (count === 0) {
    throw new AppError("CONFLICT", "Diese Kündigung wurde bereits bearbeitet.");
  }
}

/** Höchstens alle 15 Minuten — häufiger wäre reine DB-Last. */
const RUN_INTERVAL_MS = 15 * 60 * 1000;
let lastRunAt = 0;

/**
 * Vollzieht bestätigte Kündigungen, deren Austrittstag vorbei ist: Status auf
 * KEIN_MITGLIED, und ohne Wunsch nach Weiterführung wird der Login gesperrt.
 * Die Daten bleiben für den Vorstand stehen (offene Beiträge, Buchhaltung) —
 * endgültig löschen kann er das Konto danach, weil keine Mitgliedschaft mehr
 * besteht.
 *
 * Außerdem verschwinden Kündigungsnachweise und archivierte Beitragszeilen
 * gelöschter Konten nach Ablauf ihrer Aufbewahrungsfristen.
 *
 * Läuft huckepack auf Dashboard-Aufrufen (gleiches Muster wie
 * `pruneUnverifiedRegistrations`), Fehler werden geschluckt.
 */
export async function processTerminations(force = false): Promise<void> {
  const now = Date.now();
  if (!force && now - lastRunAt < RUN_INTERVAL_MS) return;
  lastRunAt = now;

  try {
    const due = await prisma.membershipTermination.findMany({
      where: {
        status: "BESTAETIGT",
        completedAt: null,
        effectiveAt: { lte: new Date(now - DAY_MS) },
      },
      select: { id: true, userId: true, keepAccount: true },
      take: 100,
    });

    for (const termination of due) {
      await prisma.$transaction([
        prisma.membershipTermination.update({
          where: { id: termination.id },
          data: { completedAt: new Date(now), openForUserId: null },
        }),
        prisma.user.update({
          where: { id: termination.userId },
          data: {
            status: "KEIN_MITGLIED",
            ...(termination.keepAccount ? {} : { loginDisabled: true }),
          },
        }),
      ]);
    }

    const cutoff = new Date(now);
    cutoff.setUTCFullYear(cutoff.getUTCFullYear() - TERMINATION_RECORD_RETENTION_YEARS);
    await prisma.membershipTermination.deleteMany({
      where: {
        OR: [
          { completedAt: { lt: cutoff } },
          { status: "ZURUECKGEZOGEN", decidedAt: { lt: cutoff } },
        ],
      },
    });
    await pruneArchivedFees(new Date(now));
  } catch (error) {
    console.error("Failed to process membership terminations:", error);
  }
}
