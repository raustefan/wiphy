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
import { accountDeletedMessage, loginDisabledMessage } from "@/lib/email/messages";
import {
  deleteAccountWithoutMembership,
  disableOwnLogin,
  verifyPasswordForAccountAction,
} from "@/lib/server/services/accountService";
import { resignMembership, sendExitMails } from "@/lib/server/services/terminationService";
import { MEMBERSHIP_ADMIN_PATH } from "@/lib/membership";

const passwordSchema = z.object({ password: z.string().min(1, "Bitte gib dein Passwort ein.") });

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
 * Sofortiger Austritt. Ohne offene Beiträge ist das Konto danach gelöscht und
 * die Sitzung endet; sonst bleibt es bis zur Zahlung bestehen. Ist die
 * Online-Kündigung abgeschaltet, bleibt der Weg über den Vorstand (Hinweis im
 * Profil).
 */
export async function terminateMembership(formData: FormData) {
  return executeAction(async () => {
    const currentUser = await requireUser();
    await requireFeatureEnabled("MEMBERSHIP_TERMINATION");
    // Wie beim Löschen: sonst verschwindet im Zweifel der letzte Admin-Zugang.
    if (currentUser.role === "ADMIN") {
      throw new AppError("FORBIDDEN", "Administratoren müssen vor dem Austritt ihre Adminrolle abgeben.");
    }
    const { password } = parseFormData(passwordSchema, formData);
    await verifyPasswordForAccountAction(currentUser.id, password);

    const { user, openFees } = await resignMembership(currentUser.id);
    after(() => sendExitMails(user, openFees));
    revalidatePath(MEMBERSHIP_ADMIN_PATH);

    if (openFees.length === 0) await signOut({ redirectTo: "/login?konto=geloescht" });
    revalidatePath(`/dashboard/users/${currentUser.id}`);
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
