import { prisma } from "@/lib/prisma";
import type { MembershipApplication } from "@prisma/client";
import { AppError } from "@/lib/server/errors";
import { planApplicationFees, resolveFeeDefault } from "@/lib/feeDefaults";
import { annualFee } from "@/lib/feeCalculation";
import { CONSENT_VERSION } from "@/lib/membership";
import type { MembershipApplicationInput } from "@/lib/server/validation/membershipSchemas";
import {
  findApplicationById,
  findOpenApplication,
  getMaxMemberNumber,
} from "@/lib/server/repositories/membershipRepository";
import { findFeeDefaults } from "@/lib/server/repositories/feeDefaultRepository";
import { findUserByMemberNumberExcludingUser } from "@/lib/server/repositories/userRepository";

export {
  countOpenApplications,
  deleteApplication,
  findApplications as getApplications,
  findApplicationById as getApplication,
  findOpenApplication as getOpenApplication,
  getMaxMemberNumber,
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
 * Der Status des Accounts bleibt bewusst `NON_MEMBER`: die Mitgliedschaft
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
  if (user.status !== "NON_MEMBER") {
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

        firstName: input.firstName,
        lastName: input.lastName,
        title: input.title,
        birthDate: input.birthDate,
        addressLine1: input.addressLine1,
        addressLine2: input.addressLine2,
        postalCode: input.postalCode,
        city: input.city,
        region: input.region,
        countryCode: input.countryCode,
        phone: input.phone,

        degreeProgram: input.degreeProgram,
        studyStart: input.studyStart,
        studyEnd: input.studyEnd,
        employer: input.employer,
        employmentStatus: input.employmentStatus,
        industry: input.industry,
        jobTitle: input.jobTitle,
        studentYears,

        accountHolder: input.accountHolder,
        iban: input.iban,
        bic: input.bic,
        // Früher fest `true`, weil das Formular das Mandat verlangte. Seit es
        // den Weg „Überweisung“ gibt, entscheidet die Wahl im Antrag — und
        // ohne Mandat gibt es auch kein Mandatsdatum.
        directDebit: input.directDebit,
        mandateSignedAt: input.directDebit ? submittedAt : null,
        // Mandatsreferenzen werden erst vergeben, wenn dem Verein eine
        // Gläubiger-Identifikationsnummer vorliegt.
        mandateReference: null,

        bylawsAccepted: input.bylawsAccepted,
        privacyAccepted: input.privacyAccepted,
        consentVersion: CONSENT_VERSION,

        regularFeeSnapshot: annualFee(monthly.regular),
        studentFeeSnapshot: annualFee(monthly.student),

        ipHash: context.ipHash,
        userAgent: context.userAgent,
        submittedAt,
      },
    });

    await tx.user.update({
      where: { id: context.userId },
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        title: input.title,
        birthDate: input.birthDate,
        addressLine1: input.addressLine1,
        addressLine2: input.addressLine2,
        postalCode: input.postalCode,
        city: input.city,
        region: input.region,
        countryCode: input.countryCode,
        phone: input.phone,
        degreeProgram: input.degreeProgram,
        studyStart: input.studyStart,
        studyEnd: input.studyEnd,
        studentYears,
        employer: input.employer,
        employmentStatus: input.employmentStatus,
        industry: input.industry,
        jobTitle: input.jobTitle,
        accountHolder: input.accountHolder,
        iban: input.iban,
        bic: input.bic,
        directDebit: input.directDebit,
        mandateSignedAt: input.directDebit ? submittedAt : null,
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
  joinedAt: Date;
  note: string | null;
  // Manuelle Übersteuerung der automatischen Vergabe, z. B. beim Übertragen
  // von Mitgliedern aus dem alten System mit bereits bestehender ID.
  memberNumber?: number;
}) {
  const application = await findApplicationById(params.id);
  if (!application) throw new AppError("NOT_FOUND", "Antrag nicht gefunden.");
  if (application.status !== "SUBMITTED") {
    throw new AppError("CONFLICT", "Über diesen Antrag wurde bereits entschieden.");
  }

  const feePlan = planApplicationFees({
    joinedAt: params.joinedAt,
    studentYears: application.studentYears,
    defaults: await findFeeDefaults(),
    // Ohne Mandat greift der 10-%-Aufschlag nach § 5 Abs. 5.
    directDebit: application.directDebit,
  });

  let nextMemberNumber: number;
  if (params.memberNumber != null) {
    const existing = await findUserByMemberNumberExcludingUser(
      params.memberNumber,
      application.userId,
    );
    if (existing) {
      throw new AppError("CONFLICT", "Diese Mitglieds-ID ist bereits vergeben.");
    }
    nextMemberNumber = params.memberNumber;
  } else {
    nextMemberNumber = application.user.memberNumber ?? (await getMaxMemberNumber()) + 1;
  }

  await prisma.$transaction(async (tx) => {
    await tx.membershipApplication.update({
      where: { id: application.id },
      data: {
        status: "ACCEPTED",
        openForUserId: null,
        decidedAt: new Date(),
        decidedById: params.adminId,
        decisionNote: params.note,
      },
    });

    await tx.user.update({
      where: { id: application.userId },
      data: {
        status: "REGULAR_MEMBER",
        joinedAt: params.joinedAt,
        memberNumber: nextMemberNumber,
      },
    });

    for (const fee of feePlan) {
      await tx.memberFee.upsert({
        where: { userId_year: { userId: application.userId, year: fee.year } },
        // Bestehende Beitragszeilen werden nicht überschrieben: sie können
        // bereits von einem Admin angepasst oder als bezahlt markiert sein.
        update: {},
        create: {
          userId: application.userId,
          year: fee.year,
          paid: false,
          isStudent: fee.isStudent,
          amount: fee.amount,
        },
      });
    }
  });

  return { memberNumber: nextMemberNumber, feePlan };
}

export async function rejectApplication(params: {
  id: string;
  adminId: string;
  note: string | null;
}) {
  const application = await findApplicationById(params.id);
  if (!application) throw new AppError("NOT_FOUND", "Antrag nicht gefunden.");
  if (application.status !== "SUBMITTED") {
    throw new AppError("CONFLICT", "Über diesen Antrag wurde bereits entschieden.");
  }

  await prisma.membershipApplication.update({
    where: { id: params.id },
    data: {
      status: "REJECTED",
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
  if (application.status !== "SUBMITTED") {
    throw new AppError("CONFLICT", "Über diesen Antrag wurde bereits entschieden.");
  }

  await prisma.membershipApplication.update({
    where: { id },
    data: { status: "WITHDRAWN", openForUserId: null, decidedAt: new Date() },
  });
}
