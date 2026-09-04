import { prisma } from "@/lib/prisma";
import type { MembershipApplication, Prisma } from "@prisma/client";
import { AppError } from "@/lib/server/errors";
import { planApplicationFees, resolveFeeDefault } from "@/lib/feeDefaults";
import { annualFee } from "@/lib/feeCalculation";
import { CONSENT_VERSION } from "@/lib/membership";
import type { MembershipApplicationInput } from "@/lib/server/validation/membershipSchemas";
import {
  findApplicationById,
  findOpenApplication,
  getMaxMitgliedId,
} from "@/lib/server/repositories/membershipRepository";
import { findFeeDefaults } from "@/lib/server/repositories/feeDefaultRepository";

export {
  countOpenApplications,
  deleteApplication,
  findApplications as getApplications,
  findApplicationById as getApplication,
  findApplicationsForUser as getApplicationsForUser,
  findOpenApplication as getOpenApplication,
  markApplicationMailed,
} from "@/lib/server/repositories/membershipRepository";

export type SubmitContext = {
  userId: string;
  ipHash: string | null;
  userAgent: string | null;
};

/**
 * Nimmt einen Aufnahmeantrag entgegen.
 *
 * Der Status des Accounts bleibt bewusst `KEIN_MITGLIED`: die Mitgliedschaft
 * entsteht erst durch den Aufnahmebeschluss (siehe `approveApplication`). Die
 * Profildaten werden dagegen sofort ins `User`-Objekt übernommen — es sind die
 * eigenen Daten des Nutzers, die er über die Selbstverwaltung ohnehin ändern
 * dürfte, und so steht die Adresse für Post auch dann bereit, wenn der Beschluss
 * noch aussteht. Der Antrag behält davon unabhängig seine eigene Kopie.
 */
export async function submitApplication(
  input: MembershipApplicationInput,
  context: SubmitContext,
): Promise<MembershipApplication> {
  const user = await prisma.user.findUnique({
    where: { id: context.userId },
    select: { id: true, status: true },
  });
  if (!user) {
    throw new AppError("NOT_FOUND", "Benutzerkonto nicht gefunden.");
  }
  if (user.status !== "KEIN_MITGLIED") {
    throw new AppError("FORBIDDEN", "Für dieses Konto besteht bereits eine Mitgliedschaft.");
  }
  if (await findOpenApplication(context.userId)) {
    throw new AppError(
      "CONFLICT",
      "Es liegt bereits ein Antrag von dir vor. Bitte warte die Entscheidung des Vorstands ab.",
    );
  }

  const submittedAt = new Date();
  const monthly = resolveFeeDefault(await findFeeDefaults(), submittedAt.getFullYear());
  const studentYears = [...new Set(input.studentYears)].sort((a, b) => a - b);

  const application = await prisma.$transaction(async (tx) => {
    const created = await tx.membershipApplication.create({
      data: {
        user: { connect: { id: context.userId } },
        openForUserId: context.userId,

        vorname: input.vorname,
        name: input.name,
        titel: input.titel,
        geburtsdatum: input.geburtsdatum,
        strasse: input.strasse,
        plz: input.plz,
        stadt: input.stadt,
        land: input.land,
        telefon: input.telefon,

        studiengang: input.studiengang,
        studienbeginn: input.studienbeginn,
        studienende: input.studienende,
        arbeitgeber: input.arbeitgeber,
        berufsstand: input.berufsstand,
        berufszweig: input.berufszweig,
        position: input.position,
        studentYears,

        kontoinhaber: input.kontoinhaber,
        IBAN: input.IBAN,
        BIC: input.BIC,
        bank: input.bank,
        bankeinzug: true,
        mandatDatum: submittedAt,
        // Mandatsreferenzen werden erst vergeben, wenn dem Verein eine
        // Gläubiger-Identifikationsnummer vorliegt.
        mandatsreferenz: null,

        satzungAccepted: input.satzungAccepted,
        datenschutzAccepted: input.datenschutzAccepted,
        consentVersion: CONSENT_VERSION,

        beitragRegularSnapshot: annualFee(monthly.regular),
        beitragStudentSnapshot: annualFee(monthly.student),

        ipHash: context.ipHash,
        userAgent: context.userAgent,
        submittedAt,
      },
    });

    await tx.user.update({
      where: { id: context.userId },
      data: {
        vorname: input.vorname,
        name: input.name,
        titel: input.titel,
        geburtsdatum: input.geburtsdatum,
        strasse: input.strasse,
        plz: input.plz,
        stadt: input.stadt,
        land: input.land,
        telefon: input.telefon,
        studiengang: input.studiengang,
        studienbeginn: input.studienbeginn,
        studienende: input.studienende,
        studentYears,
        arbeitgeber: input.arbeitgeber,
        berufsstand: input.berufsstand,
        berufszweig: input.berufszweig,
        position: input.position,
        bank: input.bank,
        IBAN: input.IBAN,
        BIC: input.BIC,
        bankeinzug: true,
        mandatserteilung: submittedAt,
      },
    });

    return created;
  });

  return application;
}

/**
 * Aufnahmebeschluss. Setzt den Mitgliedsstatus, vergibt bei Bedarf eine
 * Mitglieds-ID und legt die Beiträge ab dem Beitrittsjahr an — alles in einer
 * Transaktion, damit kein Mitglied ohne Beiträge (oder umgekehrt) entsteht.
 */
export async function approveApplication(params: {
  id: string;
  adminId: string;
  aufnahmedatum: Date;
  note: string | null;
}) {
  const application = await findApplicationById(params.id);
  if (!application) throw new AppError("NOT_FOUND", "Antrag nicht gefunden.");
  if (application.status !== "EINGEREICHT") {
    throw new AppError("CONFLICT", "Über diesen Antrag wurde bereits entschieden.");
  }

  const feePlan = planApplicationFees({
    aufnahmedatum: params.aufnahmedatum,
    studentYears: application.studentYears,
    defaults: await findFeeDefaults(),
    // Der Antrag verlangt das Lastschriftmandat, deshalb kein 10-%-Aufschlag.
    bankeinzug: application.bankeinzug,
  });

  const nextMitgliedId =
    application.user.mitgliedId ?? (await getMaxMitgliedId()) + 1;

  await prisma.$transaction(async (tx) => {
    await tx.membershipApplication.update({
      where: { id: application.id },
      data: {
        status: "ANGENOMMEN",
        openForUserId: null,
        decidedAt: new Date(),
        decidedById: params.adminId,
        decisionNote: params.note,
      },
    });

    await tx.user.update({
      where: { id: application.userId },
      data: {
        status: "ORDENTLICHES_MITGLIED",
        aufnahmedatum: params.aufnahmedatum,
        mitgliedId: nextMitgliedId,
      },
    });

    for (const fee of feePlan) {
      await tx.memberFee.upsert({
        where: { userId_jahr: { userId: application.userId, jahr: fee.jahr } },
        // Bestehende Beitragszeilen werden nicht überschrieben: sie können
        // bereits von einem Admin angepasst oder als bezahlt markiert sein.
        update: {},
        create: {
          userId: application.userId,
          jahr: fee.jahr,
          bezahlt: false,
          isStudent: fee.isStudent,
          beitrag: fee.beitrag,
        },
      });
    }
  });

  return { mitgliedId: nextMitgliedId, feePlan };
}

export async function rejectApplication(params: {
  id: string;
  adminId: string;
  note: string | null;
}) {
  const application = await findApplicationById(params.id);
  if (!application) throw new AppError("NOT_FOUND", "Antrag nicht gefunden.");
  if (application.status !== "EINGEREICHT") {
    throw new AppError("CONFLICT", "Über diesen Antrag wurde bereits entschieden.");
  }

  await prisma.membershipApplication.update({
    where: { id: params.id },
    data: {
      status: "ABGELEHNT",
      openForUserId: null,
      decidedAt: new Date(),
      decidedById: params.adminId,
      decisionNote: params.note,
    },
  });
}

/** Rücknahme durch den Antragsteller selbst, solange nicht entschieden wurde. */
export async function withdrawApplication(id: string, userId: string) {
  const application = await prisma.membershipApplication.findUnique({ where: { id } });
  if (!application || application.userId !== userId) {
    throw new AppError("NOT_FOUND", "Antrag nicht gefunden.");
  }
  if (application.status !== "EINGEREICHT") {
    throw new AppError("CONFLICT", "Über diesen Antrag wurde bereits entschieden.");
  }

  await prisma.membershipApplication.update({
    where: { id },
    data: { status: "ZURUECKGEZOGEN", openForUserId: null, decidedAt: new Date() },
  });
}

export type ApplicationWithUser = Prisma.MembershipApplicationGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        email: true;
        vorname: true;
        name: true;
        status: true;
        mitgliedId: true;
      };
    };
  };
}>;
