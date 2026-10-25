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
} from "@/lib/server/validation/membershipSchemas";
import { sendEmail } from "@/lib/server/email/mailer";
import type { EmailMessage } from "@/lib/email/blocks";
import {
  membershipApprovedMessage,
  membershipRejectedMessage,
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
      joinedAt,
      note,
      memberNumber: memberNumberOverride,
    } = parseFormData(applicationDecisionSchema, formData);

    const application = await getApplication(id);
    if (!application) throw new AppError("NOT_FOUND", "Antrag nicht gefunden.");

    const { memberNumber } = await approveApplication({
      id,
      adminId: admin.id,
      joinedAt,
      note,
      memberNumber: memberNumberOverride,
    });

    await notifyApplicant(
      application.user.email,
      membershipApprovedMessage({
        firstName: application.firstName,
        lastName: application.lastName,
        joinedAt,
        memberNumber,
      }),
    );

    revalidatePath(MEMBERSHIP_ADMIN_PATH);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/users");
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
        firstName: application.firstName,
        lastName: application.lastName,
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
