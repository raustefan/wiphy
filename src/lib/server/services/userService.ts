import type { Prisma, Role } from "@prisma/client";
import {
  findUserById,
  findUserByMemberNumberExcludingUser,
  updateUserById,
} from "@/lib/server/repositories/userRepository";
import { getMaxMemberNumber } from "@/lib/server/repositories/membershipRepository";
import { findFeeDefaults } from "@/lib/server/repositories/feeDefaultRepository";
import { planApplicationFees, resolveFeeDefault } from "@/lib/feeDefaults";
import { calculateFeeAmount } from "@/lib/feeCalculation";
import type { AdminCreateUserInput, UserImportFee } from "@/lib/server/validation/schemas";
import bcrypt from "bcryptjs";
import { buildUserUpdateData, type UpdateUserInput } from "./userUpdateData";
import { normalizeEmail } from "@/lib/server/normalizeEmail";
import { sendEmail } from "@/lib/server/email/mailer";
import { adminCreatedUserMessage, emailChangeMessage } from "@/lib/email/messages";
import { siteUrl } from "@/lib/server/siteUrl";
import { logSecurityEvent } from "@/lib/server/securityLog";
import { newToken } from "@/lib/server/tokens";
import { AppError } from "@/lib/server/errors";
import { consumeRateLimit } from "@/lib/server/rateLimit";
import { deleteAccountWithoutMembership } from "./accountService";
import { removeMembershipByAdmin } from "./terminationService";

export async function getEditableUser(id: string) {
  return findUserById(id);
}

/**
 * Ändert ausschließlich die eigene Bankverbindung eines Mitglieds
 * (`/dashboard/zahlungen`). Bewusst getrennt von `updateUserProfile`: hier
 * gibt es keine Rollen-/Fremdbearbeitungslogik — es ist immer der eigene
 * Account — und ein erneutes SEPA-Mandat setzt `mandateSignedAt` neu. Wer
 * auf Überweisung umstellt, widerruft das Mandat; damit wird auch die
 * Mandatszeit zurückgesetzt.
 */
export async function updateOwnBankDetails(
  userId: string,
  input: {
    accountHolder: string | null;
    iban: string | null;
    bic: string | null;
    directDebit: boolean;
  },
) {
  await updateUserById(userId, {
    accountHolder: input.accountHolder,
    iban: input.iban,
    bic: input.bic,
    directDebit: input.directDebit,
    mandateSignedAt: input.directDebit ? new Date() : null,
  });
}

/**
 * Fordert die Änderung der eigenen Adresse an (`/dashboard/konto`). Geändert
 * wird hier noch nichts: erst der Klick auf den Link an die neue Adresse setzt
 * sie (`verify-email/actions.ts`) und meldet dabei alle Sitzungen ab.
 *
 * Das aktuelle Passwort ist Pflicht: wer die Adresse ändert, kann danach per
 * „Passwort vergessen“ das Passwort setzen. Eine übernommene Session allein
 * soll dafür nicht reichen.
 */
export async function requestEmailChange(userId: string, email: string, currentPassword: string) {
  const { prisma } = await import("@/lib/prisma");
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, passwordHash: true },
  });
  if (!user) throw new Error("User not found");

  const newEmail = normalizeEmail(email);
  if (newEmail === normalizeEmail(user.email)) {
    return { ok: false as const, reason: "unchanged" as const };
  }

  // Pro Konto: bremst das Raten des Passworts über dieses Formular und den
  // Versand von Bestätigungsmails an frei gewählte Adressen.
  try {
    await consumeRateLimit("email-change", [user.id]);
  } catch (error) {
    if (error instanceof AppError && error.code === "TOO_MANY_REQUESTS") {
      await logSecurityEvent({ type: "EMAIL_CHANGE", outcome: "BLOCKED", reason: "rate_limited", userId: user.id });
      return { ok: false as const, reason: "rate_limited" as const };
    }
    throw error;
  }

  if (!(await bcrypt.compare(currentPassword, user.passwordHash))) {
    await logSecurityEvent({
      type: "EMAIL_CHANGE",
      outcome: "FAILURE",
      reason: "invalid_credentials",
      userId: user.id,
    });
    return { ok: false as const, reason: "wrong_password" as const };
  }
  const existing = await prisma.user.findUnique({ where: { email: newEmail } });
  if (existing) {
    await logSecurityEvent({
      type: "EMAIL_CHANGE",
      outcome: "FAILURE",
      reason: "email_taken",
      userId: user.id,
    });
    return { ok: false as const, reason: "email_taken" as const };
  }

  const { token, hash } = newToken();
  const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes

  await prisma.emailVerificationToken.deleteMany({
    where: { userId: user.id },
  });

  await prisma.emailVerificationToken.create({
    data: {
      userId: user.id,
      email: newEmail,
      token: hash,
      expires,
    },
  });

  try {
    await sendEmail({
      to: newEmail,
      message: emailChangeMessage(siteUrl(`/verify-email?token=${token}`)),
    });
  } catch (error) {
    await logSecurityEvent({
      type: "EMAIL_CHANGE",
      outcome: "FAILURE",
      reason: "mail_failed",
      userId: user.id,
    });
    throw error;
  }

  // Der Vorgang ist hier erst *angefordert*: erst der Klick auf den
  // Bestätigungslink ändert die Adresse und erscheint als EMAIL_VERIFICATION
  // mit dem Grund `email_change`. Ohne IP-Bezug, weil dieser Service keinen
  // Request-Kontext hat — das Konto ist hier die relevante Zuordnung.
  await logSecurityEvent({
    type: "EMAIL_CHANGE",
    outcome: "SUCCESS",
    userId: user.id,
  });

  return { ok: true as const };
}

/** Die noch nicht bestätigte neue Adresse, falls eine Änderung läuft. */
export async function getPendingEmailChange(userId: string) {
  const { prisma } = await import("@/lib/prisma");
  return prisma.emailVerificationToken.findFirst({
    where: { userId, expires: { gte: new Date() } },
    select: { email: true, expires: true },
  });
}

/**
 * Legt einen frischen Reset-Token an (ältere für die Adresse verfallen) und
 * liefert den Link dazu. Für „Passwort vergessen“ und für die Passwortänderung
 * im Dashboard — beide laufen über denselben Mail-Link.
 */
export async function createPasswordResetUrl(email: string) {
  const { prisma } = await import("@/lib/prisma");
  const { token, hash } = newToken();
  await prisma.passwordResetToken.deleteMany({ where: { email } });
  await prisma.passwordResetToken.create({
    data: { email, token: hash, expires: new Date(Date.now() + 30 * 60 * 1000) },
  });
  return siteUrl(`/reset-password?token=${token}`);
}

/**
 * Die eigene Adresse ändert sich nur über `requestEmailChange`. Ein Admin
 * korrigiert hier dagegen eine fremde Adresse direkt.
 */
export async function updateUserProfile(input: UpdateUserInput) {
  const data = buildUserUpdateData(input);

  const user = await findUserById(input.idToEdit);
  if (!user) {
    throw new Error("User not found");
  }

  const isSelf = input.idToEdit === input.currentUserId;
  const isMember = input.currentUserRole !== "ADMIN";

  if (isSelf || isMember) {
    data.email = user.email;
  } else if (input.email && normalizeEmail(input.email) !== normalizeEmail(user.email)) {
    // Admin korrigiert eine fremde Adresse: Links, die an die alte Adresse
    // gingen, dürfen die Korrektur nicht rückgängig machen.
    const { prisma } = await import("@/lib/prisma");
    data.email = normalizeEmail(input.email);
    await prisma.emailVerificationToken.deleteMany({ where: { userId: user.id } });
    await prisma.passwordResetToken.deleteMany({ where: { email: user.email } });
  }

  // Admin-only updates
  if (input.currentUserRole === "ADMIN") {
    if (typeof input.memberNumber === "string" && input.memberNumber !== "") {
      const parsed = Number(input.memberNumber);
      if (!Number.isNaN(parsed)) {
        const existing = await findUserByMemberNumberExcludingUser(
          parsed,
          input.idToEdit
        );
        if (existing) {
          return { ok: false as const, reason: "memberNumber_conflict" as const };
        }
        data.memberNumber = parsed;
      }
    } else if (input.memberNumber === "" || input.memberNumber === null) {
      data.memberNumber = null;
    }
  }

  const removesMembership =
    input.currentUserRole === "ADMIN" &&
    data.status === "NON_MEMBER" &&
    user.status !== "NON_MEMBER";
  if (removesMembership) {
    // Ein verstorbenes Mitglied meldet sich nicht mehr an.
    if (input.terminationReason === "DECEASED") data.loginDisabled = true;
    const loginDisabledAfter =
      typeof data.loginDisabled === "boolean" ? data.loginDisabled : user.loginDisabled;
    await removeMembershipByAdmin({
      userId: input.idToEdit,
      adminId: input.currentUserId,
      reason: input.terminationReason ?? "RESIGNATION",
      keepAccount: !loginDisabledAfter,
      userData: data,
    });
  } else {
    await updateUserById(input.idToEdit, data);
  }
  return { ok: true as const };
}

/** Formular und JSON-Import liefern dieselben Felder, nur unterschiedlich vollständig. */
type CreateUserInput = Partial<AdminCreateUserInput> &
  Pick<AdminCreateUserInput, "email" | "password" | "firstName" | "lastName" | "role" | "status" | "studentYears">;

/** Spalten, die nur der JSON-Import setzt — das Formular kennt sie nicht. */
type ImportExtra = Partial<
  Pick<
    Prisma.UserUncheckedCreateInput,
    | "title"
    | "phone"
    | "degreeProgram"
    | "studyStart"
    | "studyEnd"
    | "employer"
    | "employmentStatus"
    | "industry"
    | "jobTitle"
    | "linkedinUrl"
    | "loginDisabled"
  >
>;

export async function adminDeleteUser(userIdToDelete: string, currentUserRole: Role) {
  if (currentUserRole !== "ADMIN") {
    throw new Error("Unauthorized: Only admins can delete users");
  }
  await deleteAccountWithoutMembership(userIdToDelete);
  return { ok: true as const };
}

/**
 * Legt ein Konto durch einen Admin an — vor allem beim Übernehmen von
 * Mitgliedern aus dem alten System. Mit Beitrittsdatum entsteht dasselbe wie
 * nach einem angenommenen Antrag (`approveApplication`): Mitglieds-ID,
 * Studienjahre, Bankdaten und Beitragszeilen — hier bis zum laufenden Jahr,
 * weil die Mitgliedschaft schon länger besteht.
 *
 * Bringt der JSON-Import eigene Beitragsjahre mit (`fees`), gelten genau
 * diese — samt Zahlstatus aus dem alten System — statt des Beitragsplans.
 */
export async function adminCreateUser(
  input: CreateUserInput,
  currentUserRole: Role,
  /** Weitere Spalten aus dem JSON-Massenimport. */
  extra: ImportExtra = {},
  importedFees?: UserImportFee[],
) {
  if (currentUserRole !== "ADMIN") {
    throw new Error("Unauthorized: Only admins can create users");
  }
  const { prisma } = await import("@/lib/prisma");

  if (await prisma.user.findUnique({ where: { email: input.email }, select: { id: true } })) {
    return { ok: false as const, reason: "email_taken" as const };
  }

  const isMember = input.status !== "NON_MEMBER";
  let memberNumber = input.memberNumber;
  if (memberNumber != null) {
    if (await prisma.user.findUnique({ where: { memberNumber }, select: { id: true } })) {
      return { ok: false as const, reason: "memberNumber_conflict" as const };
    }
  } else if (isMember) {
    memberNumber = (await getMaxMemberNumber()) + 1;
  }

  const studentYears = [...new Set(input.studentYears)].sort((a, b) => a - b);
  const directDebit = !input.selfPayer;
  const currentYear = new Date().getFullYear();
  const defaults = await findFeeDefaults();
  // Wie bei der Antragsannahme: Beiträge nur für beitragspflichtige Mitglieder.
  const feePlan =
    input.status === "REGULAR_MEMBER" && input.joinedAt
      ? planApplicationFees({
          joinedAt: input.joinedAt,
          studentYears,
          defaults,
          directDebit,
          untilYear: currentYear,
        })
      : [];
  const fees = importedFees
    ? importedFees.map((fee) => {
        const rates = resolveFeeDefault(defaults, fee.year);
        return {
          year: fee.year,
          isStudent: fee.isStudent,
          paid: fee.paid,
          manualAmount: fee.manualAmount,
          // Ohne festen Betrag gilt der Standardsatz — wie bei jeder anderen Zeile.
          amount: fee.manualAmount
            ? fee.amount!
            : calculateFeeAmount({
                monthlyRegular: rates.regular,
                monthlyStudent: rates.student,
                isStudent: fee.isStudent,
                directDebit,
                year: fee.year,
                joinedAt: input.joinedAt,
              }),
        };
      })
    : feePlan.map((fee) => ({
        year: fee.year,
        isStudent: fee.isStudent,
        amount: fee.amount,
        // Künftige Studienjahre sind noch nicht fällig, also nie „bezahlt“.
        paid: Boolean(input.allPaid) && fee.year <= currentYear,
      }));

  const user = await prisma.user.create({
    data: {
      ...extra,
      email: input.email,
      passwordHash: await bcrypt.hash(input.password, 12),
      lastName: input.lastName,
      firstName: input.firstName,
      role: input.role,
      status: input.status,
      // Vom Admin angelegt = Adresse gilt als bestätigt, Anmelden geht sofort.
      emailVerified: true,
      memberNumber,
      joinedAt: input.joinedAt,
      birthDate: input.birthDate,
      addressLine1: input.addressLine1,
      addressLine2: input.addressLine2,
      postalCode: input.postalCode,
      city: input.city,
      region: input.region,
      countryCode: input.countryCode,
      adminNote: input.adminNote,
      studentYears,
      directDebit: isMember && directDebit,
      mandateSignedAt: directDebit ? input.mandateSignedAt : undefined,
      mandateReference: input.mandateReference,
      // Das alte System kannte keinen Kontoinhaber; eingezogen wurde auf den
      // Namen des Mitglieds.
      accountHolder: input.accountHolder ?? (input.iban ? `${input.firstName} ${input.lastName}` : undefined),
      iban: input.iban,
      bic: input.bic,
      fees: { create: fees },
    },
  });

  if (!input.notify) return { ok: true as const, mailed: false };

  try {
    await sendEmail({
      to: user.email,
      message: adminCreatedUserMessage(user, siteUrl("/login"), input.password),
    });
  } catch (error) {
    console.error("Failed to send admin created user notification email:", error);
    return { ok: true as const, mailed: false };
  }

  return { ok: true as const, mailed: true };
}
