"use server";

import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { z } from "zod";
import { signOut } from "@/auth";
import { requireUser } from "@/lib/server/authz";
import { AppError, executeAction } from "@/lib/server/errors";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import type { FeatureFlagKey } from "@prisma/client";
import { requireFeatureEnabled } from "@/lib/server/featureGate";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { sendEmail } from "@/lib/server/email/mailer";
import type { EmailMessage } from "@/lib/email/blocks";
import {
  accountDeletedMessage,
  loginDisabledMessage,
  terminationNoticeMessage,
  terminationReceivedMessage,
} from "@/lib/email/messages";
import { getAdminNotificationEmails } from "@/lib/server/services/contactService";
import {
  deleteAccountWithoutMembership,
  disableOwnLogin,
  verifyPasswordForAccountAction,
} from "@/lib/server/services/accountService";
import { submitTermination, withdrawTermination } from "@/lib/server/services/terminationService";
import { siteUrl } from "@/lib/server/siteUrl";
import { MEMBERSHIP_ADMIN_PATH } from "@/lib/membership";

const passwordSchema = z.object({ password: z.string().min(1, "Bitte gib dein Passwort ein.") });

const terminateSchema = passwordSchema.extend({
  keepAccount: z.preprocess((v) => v === "on" || v === "true", z.boolean()),
});

/**
 * Mails dürfen den bereits gespeicherten Vorgang nie kippen. Jede hängt an
 * ihrem eigenen Feature-Flag; geprüft wird erst nach der Antwort, zusammen mit
 * dem Versand.
 */
function mailLater(
  flag: FeatureFlagKey,
  recipients: { to?: string; bcc?: string[] },
  message: EmailMessage,
) {
  after(async () => {
    try {
      if (!(await isFeatureEnabled(flag))) return;
      await sendEmail({ ...recipients, message });
    } catch (error) {
      console.error("Failed to send account mail:", error);
    }
  });
}

/**
 * Austrittserklärung. Gespeichert wird zuerst — der Zugang zählt, nicht die
 * Mail. Ist die Online-Kündigung abgeschaltet, bleibt der Weg über
 * Kontaktformular oder E-Mail an den Vorstand (Hinweis im Profil).
 */
export async function terminateMembership(formData: FormData) {
  return executeAction(async () => {
    const currentUser = await requireUser();
    await requireFeatureEnabled("MEMBERSHIP_TERMINATION");
    const { password, keepAccount } = parseFormData(terminateSchema, formData);
    await verifyPasswordForAccountAction(currentUser.id, password);

    const { termination, user } = await submitTermination(currentUser.id, keepAccount);

    mailLater(
      "MEMBERSHIP_TERMINATION_CONFIRMATION_MAIL",
      { to: user.email },
      terminationReceivedMessage({
        vorname: user.vorname,
        name: user.name,
        submittedAt: termination.submittedAt,
        effectiveAt: termination.effectiveAt,
        keepAccount,
      }),
    );
    mailLater(
      "MEMBERSHIP_TERMINATION_MAIL",
      // BCC hält die Admin-Verteilerliste aus den sichtbaren Headern heraus.
      { bcc: await getAdminNotificationEmails() },
      terminationNoticeMessage({
        vorname: user.vorname,
        name: user.name,
        email: user.email,
        mitgliedId: user.mitgliedId,
        submittedAt: termination.submittedAt,
        effectiveAt: termination.effectiveAt,
        // Nie aus dem Host-Header: der ist vom Client steuerbar.
        dashboardUrl: siteUrl(MEMBERSHIP_ADMIN_PATH),
      }),
    );

    revalidatePath(`/dashboard/users/${currentUser.id}`);
    revalidatePath(MEMBERSHIP_ADMIN_PATH);
  });
}

export async function withdrawMembershipTermination(formData: FormData) {
  return executeAction(async () => {
    const currentUser = await requireUser();
    const { id } = parseFormData(z.object({ id: z.string().min(1) }), formData);
    await withdrawTermination(id, currentUser.id);
    revalidatePath(`/dashboard/users/${currentUser.id}`);
    revalidatePath(MEMBERSHIP_ADMIN_PATH);
  });
}

/** Mitglied: Login sperren, Mitgliedschaft und Daten bleiben. */
export async function disableOwnAccount(formData: FormData) {
  return executeAction(async () => {
    const currentUser = await requireUser();
    const { password } = parseFormData(passwordSchema, formData);
    await verifyPasswordForAccountAction(currentUser.id, password);

    const user = await disableOwnLogin(currentUser.id);
    mailLater("ACCOUNT_NOTICE_MAIL", { to: user.email }, loginDisabledMessage(user));

    await signOut({ redirectTo: "/login?zugang=deaktiviert" });
  });
}

/** Ohne Mitgliedschaft: Konto restlos löschen. */
export async function deleteOwnAccount(formData: FormData) {
  return executeAction(async () => {
    const currentUser = await requireUser();
    // Wie im Adminbereich: keine Selbstlöschung für Admins, sonst verschwindet
    // im Zweifel der letzte Zugang zur Verwaltung.
    if (currentUser.role === "ADMIN") {
      throw new AppError("FORBIDDEN", "Administratoren können ihr Konto nicht selbst löschen.");
    }
    const { password } = parseFormData(passwordSchema, formData);
    await verifyPasswordForAccountAction(currentUser.id, password);

    const user = await deleteAccountWithoutMembership(currentUser.id);
    mailLater("ACCOUNT_NOTICE_MAIL", { to: user.email }, accountDeletedMessage(user));

    await signOut({ redirectTo: "/login?konto=geloescht" });
  });
}
