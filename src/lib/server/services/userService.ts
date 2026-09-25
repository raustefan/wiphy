import type { Prisma, Role } from "@prisma/client";
import {
  findUserById,
  findUserByMitgliedIdExcludingUser,
  findUsersForDashboard,
  updateUserById,
  createUser,
} from "@/lib/server/repositories/userRepository";
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

export async function getDashboardUsers(userId: string, role: Role) {
  return findUsersForDashboard(userId, role);
}

export async function getEditableUser(id: string) {
  return findUserById(id);
}

/**
 * Ändert ausschließlich die eigene Bankverbindung eines Mitglieds
 * (`/dashboard/zahlungen`). Bewusst getrennt von `updateUserProfile`: hier
 * gibt es keine Rollen-/Fremdbearbeitungslogik — es ist immer der eigene
 * Account — und ein erneutes SEPA-Mandat setzt `mandatserteilung` neu. Wer
 * auf Überweisung umstellt, widerruft das Mandat; damit wird auch die
 * Mandatszeit zurückgesetzt.
 */
export async function updateOwnBankDetails(
  userId: string,
  input: {
    bank: string | null;
    BLZ: string | null;
    KTO: string | null;
    IBAN: string | null;
    BIC: string | null;
    bankeinzug: boolean;
  },
) {
  await updateUserById(userId, {
    bank: input.bank,
    BLZ: input.BLZ,
    KTO: input.KTO,
    IBAN: input.IBAN,
    BIC: input.BIC,
    bankeinzug: input.bankeinzug,
    mandatserteilung: input.bankeinzug ? new Date() : null,
  });
}

/**
 * `currentPassword` ist nur für die Änderung der eigenen Adresse nötig: wer die
 * Adresse ändert, kann danach per „Passwort vergessen“ das Passwort setzen. Eine
 * übernommene Session allein soll dafür nicht reichen.
 */
export async function updateUserProfile(input: UpdateUserInput, currentPassword?: string) {
  const data = buildUserUpdateData(input);

  const user = await findUserById(input.idToEdit);
  if (!user) {
    throw new Error("User not found");
  }

  let emailChanged = false;
  const isSelf = input.idToEdit === input.currentUserId;
  const isMember = input.currentUserRole !== "ADMIN";

  if ((isSelf || isMember) && input.email && normalizeEmail(input.email) !== normalizeEmail(user.email)) {
    const newEmail = normalizeEmail(input.email);

    const { prisma } = await import("@/lib/prisma");

    // Pro Konto: bremst das Raten des Passworts über dieses Formular und den
    // Versand von Bestätigungsmails an frei gewählte Adressen.
    try {
      await consumeRateLimit({
        bucket: "email-change",
        keyParts: [user.id],
        limit: 5,
        windowMs: 60 * 60 * 1000,
        blockMs: 60 * 60 * 1000,
        message: "Zu viele Versuche, die E-Mail-Adresse zu ändern.",
      });
    } catch (error) {
      if (error instanceof AppError && error.code === "TOO_MANY_REQUESTS") {
        await logSecurityEvent({ type: "EMAIL_CHANGE", outcome: "BLOCKED", reason: "rate_limited", userId: user.id });
        return { ok: false as const, reason: "rate_limited" as const };
      }
      throw error;
    }

    const stored = await prisma.user.findUnique({
      where: { id: user.id },
      select: { password: true },
    });
    if (!currentPassword || !stored || !(await bcrypt.compare(currentPassword, stored.password))) {
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
      // Reported as a result, not thrown: the caller is a plain form action, so
      // a throw would replace the page with the generic error screen and lose
      // everything the user typed.
      await logSecurityEvent({
        type: "EMAIL_CHANGE",
        outcome: "FAILURE",
        reason: "email_taken",
        userId: user.id,
      });
      return { ok: false as const, reason: "email_taken" as const };
    }

    emailChanged = true;

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

    // Keep the old email in updated data
    data.email = user.email;
  }

  // Admin-only updates
  if (input.currentUserRole === "ADMIN") {
    if (typeof input.mitgliedId === "string" && input.mitgliedId !== "") {
      const parsed = Number(input.mitgliedId);
      if (!Number.isNaN(parsed)) {
        const existing = await findUserByMitgliedIdExcludingUser(
          parsed,
          input.idToEdit
        );
        if (existing) {
          return { ok: false as const, reason: "mitgliedId_conflict" as const };
        }
        data.mitgliedId = parsed;
      }
    } else if (input.mitgliedId === "" || input.mitgliedId === null) {
      data.mitgliedId = null;
    }
  }

  await updateUserById(input.idToEdit, data);
  return { ok: true as const, emailChanged };
}

export async function adminDeleteUser(userIdToDelete: string, currentUserRole: Role) {
  if (currentUserRole !== "ADMIN") {
    throw new Error("Unauthorized: Only admins can delete users");
  }
  await deleteAccountWithoutMembership(userIdToDelete);
  return { ok: true as const };
}

export async function adminCreateUser(input: Prisma.UserCreateInput, currentUserRole: Role) {
  if (currentUserRole !== "ADMIN") {
    throw new Error("Unauthorized: Only admins can create users");
  }
  // Hash password before saving
  const hashedPassword = await bcrypt.hash(input.password, 12);
  const data = { ...input, password: hashedPassword, emailVerified: false };
  const user = await createUser(data);

  // Generate email verification token
  const { token, hash } = newToken();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const { prisma } = await import("@/lib/prisma");
  await prisma.emailVerificationToken.create({
    data: {
      userId: user.id,
      email: user.email,
      token: hash,
      expires,
    },
  });

  try {
    await sendEmail({
      to: user.email,
      message: adminCreatedUserMessage(
        { vorname: user.vorname, name: user.name },
        siteUrl(`/verify-email?token=${token}`),
      ),
    });
  } catch (error) {
    console.error("Failed to send admin created user notification email:", error);
  }

  return { ok: true as const };
}
