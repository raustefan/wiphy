"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/server/authz";
import { AppError, executeAction } from "@/lib/server/errors";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import {
  approveApplication,
  deleteApplication,
  getApplication,
  rejectApplication,
} from "@/lib/server/services/membershipService";
import {
  applicationDecisionSchema,
  applicationIdSchema,
  applicationRejectSchema,
  terminationConfirmSchema,
} from "@/lib/server/validation/membershipSchemas";
import { confirmTermination, getTermination } from "@/lib/server/services/terminationService";
import { sendEmail } from "@/lib/server/email/mailer";
import type { EmailMessage } from "@/lib/email/blocks";
import {
  membershipApprovedMessage,
  membershipRejectedMessage,
  terminationConfirmedMessage,
} from "@/lib/email/messages";
import { MEMBERSHIP_ADMIN_PATH } from "@/lib/membership";

/** Mail an den Antragsteller darf die bereits vollzogene Entscheidung nie kippen. */
async function notifyApplicant(email: string | undefined, message: EmailMessage) {
  if (!email) return;
  if (!(await isFeatureEnabled("MEMBERSHIP_APPLICATION_CONFIRMATION_MAIL"))) return;
  try {
    await sendEmail({ to: email, message });
  } catch (error) {
    console.error("Failed to send membership decision mail:", error);
  }
}

export async function acceptMembershipApplication(formData: FormData) {
  return executeAction(async () => {
    const admin = await requireAdmin();
    const {
      id,
      aufnahmedatum,
      note,
      mitgliedId: mitgliedIdOverride,
    } = parseFormData(applicationDecisionSchema, formData);

    const application = await getApplication(id);
    if (!application) throw new AppError("NOT_FOUND", "Antrag nicht gefunden.");

    const { mitgliedId } = await approveApplication({
      id,
      adminId: admin.id,
      aufnahmedatum,
      note,
      mitgliedId: mitgliedIdOverride,
    });

    await notifyApplicant(
      application.user.email,
      membershipApprovedMessage({
        vorname: application.vorname,
        name: application.name,
        aufnahmedatum,
        mitgliedId,
      }),
    );

    revalidatePath(MEMBERSHIP_ADMIN_PATH);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/fees");
  });
}

export async function declineMembershipApplication(formData: FormData) {
  return executeAction(async () => {
    const admin = await requireAdmin();
    const { id, note } = parseFormData(applicationRejectSchema, formData);

    const application = await getApplication(id);
    if (!application) throw new AppError("NOT_FOUND", "Antrag nicht gefunden.");

    await rejectApplication({ id, adminId: admin.id, note });

    await notifyApplicant(
      application.user.email,
      membershipRejectedMessage({
        vorname: application.vorname,
        name: application.name,
        note,
      }),
    );

    revalidatePath(MEMBERSHIP_ADMIN_PATH);
    revalidatePath("/dashboard");
  });
}

export async function removeMembershipApplication(formData: FormData) {
  return executeAction(async () => {
    await requireAdmin();
    const { id } = parseFormData(applicationIdSchema, formData);

    await deleteApplication(id);
    revalidatePath(MEMBERSHIP_ADMIN_PATH);
  });
}

/**
 * Bestätigung einer Austrittserklärung. Die Mail ist die schriftliche
 * Bestätigung des Austrittsdatums; ist sie per Flag aus, muss der Vorstand das
 * Mitglied anderweitig informieren (Hinweis auf der Admin-Seite).
 */
export async function confirmMembershipTermination(formData: FormData) {
  return executeAction(async () => {
    const admin = await requireAdmin();
    const { id, effectiveAt, note } = parseFormData(terminationConfirmSchema, formData);

    const termination = await getTermination(id);
    if (!termination) throw new AppError("NOT_FOUND", "Kündigung nicht gefunden.");

    await confirmTermination({ id, adminId: admin.id, effectiveAt, note });

    if (await isFeatureEnabled("MEMBERSHIP_TERMINATION_CONFIRMATION_MAIL")) {
      try {
        await sendEmail({
          to: termination.user.email,
          message: terminationConfirmedMessage({
            vorname: termination.user.vorname,
            name: termination.user.name,
            effectiveAt,
            keepAccount: termination.keepAccount,
          }),
        });
      } catch (error) {
        console.error("Failed to send termination confirmation mail:", error);
      }
    }

    revalidatePath(MEMBERSHIP_ADMIN_PATH);
  });
}
