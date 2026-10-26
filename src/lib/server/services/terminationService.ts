import type { Prisma, TerminationReason } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/lib/server/errors";
import { toBerlinDateInput } from "@/lib/berlinTime";
import { deleteUserById } from "@/lib/server/repositories/userRepository";
import { sendEmail } from "@/lib/server/email/mailer";
import { accountDeletedMessage, exitMessage, exitNoticeMessage } from "@/lib/email/messages";
import { getAdminNotificationEmails } from "./contactService";
import { getOpenFees } from "./feeService";
import { isFeatureEnabled } from "./featureFlagService";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Wie lange der Nachweis eines Austritts aufbewahrt wird (Regelverjährung, § 195 BGB). */
const TERMINATION_RECORD_RETENTION_YEARS = 3;

/** Heute als reines Datum, 00:00 UTC — wie `effectiveAt` überall. */
function berlinToday(now: Date): Date {
  return new Date(`${toBerlinDateInput(now)}T00:00:00Z`);
}

const userSelect = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  status: true,
  memberNumber: true,
  loginDisabled: true,
} as const;

/** Sofortiger Austritt mit offenen Beiträgen, der noch auf die Löschung wartet. */
export function getPendingExit(userId: string) {
  return prisma.membershipTermination.findFirst({ where: { userId, deleteWhenSettled: true } });
}

export function getTerminations(limit = 200) {
  return prisma.membershipTermination.findMany({
    orderBy: { submittedAt: "desc" },
    take: limit,
    include: { user: { select: userSelect } },
  });
}

/**
 * Sofortiger Austritt durch das Mitglied. § 6 Satzung sieht nur die Kündigung
 * zum Jahresende vor; der Vorstand stimmt der vorzeitigen Beendigung pauschal
 * zu. Der Jahresbeitrag bleibt geschuldet (§ 5: am 1. Januar fällig).
 *
 * Ohne offene Beiträge wird das Konto sofort restlos gelöscht. Sonst endet nur
 * die Mitgliedschaft; Konto und Zahlungsdaten bleiben, bis
 * `processTerminations` alles bezahlt sieht und das Konto löscht.
 */
export async function resignMembership(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: userSelect });
  if (!user) throw new AppError("NOT_FOUND", "Benutzerkonto nicht gefunden.");
  if (user.status === "NON_MEMBER") {
    throw new AppError("FORBIDDEN", "Für dieses Konto besteht keine Mitgliedschaft.");
  }

  const openFees = await getOpenFees(userId);
  if (openFees.length === 0) {
    await deleteUserById(userId);
    return { user, openFees };
  }

  const now = new Date();
  await prisma.$transaction(async (tx) => {
    // Nur berechnete Beiträge festschreiben: ohne Zeile fiele das Jahr mit
    // NON_MEMBER aus der Beitragsliste (`isInFeeYear`).
    for (const fee of openFees.filter((f) => !f.angelegt)) {
      await tx.memberFee.create({ data: { userId, year: fee.year } });
    }
    // Künftige Jahre schuldet niemand, der heute austritt.
    await tx.memberFee.deleteMany({
      where: { userId, paid: false, year: { gt: now.getFullYear() } },
    });
    // Eine laufende Kündigung zum Jahresende (Altbestand) geht hierin auf.
    await tx.membershipTermination.deleteMany({ where: { openForUserId: userId } });
    await tx.membershipTermination.create({
      data: {
        userId,
        submittedAt: now,
        effectiveAt: berlinToday(now),
        decidedAt: now,
        completedAt: now,
        deleteWhenSettled: true,
      },
    });
    await tx.user.update({
      where: { id: userId },
      data: { status: "NON_MEMBER", newsletter: false, kosmosVisible: false },
    });
  });
  return { user, openFees };
}

/**
 * Mails zum Austritt: an das Mitglied und an den Vorstand. Dürfen den
 * vollzogenen Austritt nie kippen; jede hängt an ihrem Feature-Flag.
 * `settled`: die offenen Beiträge sind bezahlt, das Konto wurde gerade gelöscht.
 */
export async function sendExitMails(
  user: { firstName: string; lastName: string; email: string },
  openFees: { year: number; amount: number }[],
  settled = false,
) {
  try {
    if (await isFeatureEnabled("MEMBERSHIP_TERMINATION_CONFIRMATION_MAIL")) {
      await sendEmail({
        to: user.email,
        message: settled ? accountDeletedMessage(user) : exitMessage({ ...user, openFees }),
      });
    }
  } catch (error) {
    console.error("Failed to send exit mail:", error);
  }
  try {
    if (await isFeatureEnabled("MEMBERSHIP_TERMINATION_MAIL")) {
      // BCC hält die Admin-Verteilerliste aus den sichtbaren Headern heraus.
      await sendEmail({
        bcc: await getAdminNotificationEmails(),
        message: exitNoticeMessage({ ...user, openFees, settled }),
      });
    }
  } catch (error) {
    console.error("Failed to send exit notice:", error);
  }
}

/**
 * Ein Admin stellt ein Mitglied auf „Kein Mitglied“ um. Damit jeder Austritt
 * als Kündigung nachweisbar bleibt (und in der Statistik zählt), wird die
 * offene Kündigung zum heutigen Tag vollzogen — oder, wenn es keine gibt, eine
 * vollzogene angelegt. Zusammen mit der Änderung am Konto in einer Transaktion.
 */
export async function removeMembershipByAdmin(params: {
  userId: string;
  adminId: string;
  reason: TerminationReason;
  keepAccount: boolean;
  userData: Prisma.UserUpdateInput;
}) {
  const now = new Date();
  const today = berlinToday(now);

  await prisma.$transaction(async (tx) => {
    const open = await tx.membershipTermination.findUnique({
      where: { openForUserId: params.userId },
    });
    if (open) {
      await tx.membershipTermination.update({
        where: { id: open.id },
        data: {
          status: "CONFIRMED",
          reason: params.reason,
          openForUserId: null,
          completedAt: now,
          // Früher als erklärt: dann endete die Mitgliedschaft heute.
          effectiveAt: open.effectiveAt > today ? today : open.effectiveAt,
          decidedAt: open.decidedAt ?? now,
          decidedById: open.decidedById ?? params.adminId,
        },
      });
    } else {
      await tx.membershipTermination.create({
        data: {
          userId: params.userId,
          status: "CONFIRMED",
          reason: params.reason,
          submittedAt: now,
          effectiveAt: today,
          keepAccount: params.keepAccount,
          decidedAt: now,
          decidedById: params.adminId,
          decisionNote: "Vom Vorstand ausgetragen",
          completedAt: now,
        },
      });
    }
    await tx.user.update({ where: { id: params.userId }, data: params.userData });
  });
}

/** Höchstens alle 15 Minuten — häufiger wäre reine DB-Last. */
const RUN_INTERVAL_MS = 15 * 60 * 1000;
let lastRunAt = 0;

/**
 * Löscht die Konten Ausgetretener, sobald ihre offenen Beiträge bezahlt sind,
 * und benachrichtigt Mitglied und Vorstand.
 *
 * Außerdem: Kündigungen zum Jahresende aus der Zeit vor dem sofortigen
 * Austritt werden am Tag nach dem Austrittsdatum vollzogen, und
 * Kündigungsnachweise verschwinden nach Ablauf ihrer Aufbewahrungsfrist.
 *
 * Läuft huckepack auf Dashboard-Aufrufen (gleiches Muster wie
 * `pruneUnverifiedRegistrations`), Fehler werden geschluckt.
 */
export async function processTerminations(force = false): Promise<void> {
  const now = Date.now();
  if (!force && now - lastRunAt < RUN_INTERVAL_MS) return;
  lastRunAt = now;

  try {
    const pending = await prisma.membershipTermination.findMany({
      where: { deleteWhenSettled: true },
      select: { user: { select: { id: true, email: true, firstName: true, lastName: true } } },
      take: 100,
    });
    for (const { user } of pending) {
      if ((await getOpenFees(user.id)).length > 0) continue;
      await deleteUserById(user.id);
      await sendExitMails(user, [], true);
    }

    const due = await prisma.membershipTermination.findMany({
      where: {
        status: "CONFIRMED",
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
            status: "NON_MEMBER",
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
          { status: "WITHDRAWN", decidedAt: { lt: cutoff } },
        ],
      },
    });
  } catch (error) {
    console.error("Failed to process membership terminations:", error);
  }
}
