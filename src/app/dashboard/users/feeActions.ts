 "use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/server/authz";
import {
  setFeeComment,
  setFeeStatus,
  setFeeAmount,
  resetFeeAmount,
  getFeeLiableUsers,
} from "@/lib/server/services/feeService";
import { AppError, executeAction } from "@/lib/server/errors";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { feeCommentSchema, feeToggleSchema, feeStatusUpdateSchema, feeAmountUpdateSchema } from "@/lib/server/validation/schemas";
import { feeDefaultSchema } from "@/lib/server/validation/membershipSchemas";
import { removeFeeDefault, setFeeDefault } from "@/lib/server/services/feeDefaultService";
import { prisma } from "@/lib/prisma";
import { wasMemberInYear } from "@/lib/feeCalculation";
import { requireFeatureEnabledOrRedirect } from "@/lib/server/featureGate";

export async function updateFeeStatus(formData: FormData) {
  await executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/users");

    const { userId, year, field, value } = parseFormData(feeStatusUpdateSchema, formData);

    await setFeeStatus({ userId, year, field, value });
    revalidatePath("/dashboard/users");
  });
}

export async function updateFeeAmount(formData: FormData) {
  await executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/users");

    const { userId, year, amount } = parseFormData(feeAmountUpdateSchema, formData);

    await setFeeAmount({ userId, year, amount: amount });
    revalidatePath("/dashboard/users");
  });
}

export async function updateFeeComment(formData: FormData) {
  await executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/users");

    const { userId, comment } = parseFormData(feeCommentSchema, formData);

    await setFeeComment({ userId, comment });
    revalidatePath("/dashboard/users");
  });
}

export async function initializeBillingYear(formData: FormData) {
  return executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/users");
    // Höchstens das nächste Jahr — weiter voraus ist nichts beschlossen.
    const year = Number(formData.get("year"));
    if (!Number.isInteger(year) || year < 2000 || year > new Date().getFullYear() + 1) {
      throw new AppError("VALIDATION_ERROR", "Ungültiges Jahr.");
    }

    // Nur beitragspflichtige Mitglieder, die in dem Jahr schon dabei waren —
    // für alle anderen wäre die Zeile sinnlos.
    const users = (await getFeeLiableUsers()).filter((u) => wasMemberInYear(year, u.joinedAt));

    await prisma.memberFee.createMany({
      // Kein Betrag und kein Status: Die Zeile folgt den Standardsätzen und dem
      // Sonderstatus aus `User.studentYears`, bis ein Admin den Betrag
      // ausdrücklich als Ausnahme festlegt.
      data: users.map((user) => ({ userId: user.id, year, paid: false, amount: 0, manualAmount: false })),
      // Bestehende Zeilen bleiben unangetastet.
      skipDuplicates: true,
    });

    revalidatePath("/dashboard/users");
  });
}

export async function revertFeeAmount(formData: FormData) {
  await executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/users");

    const { userId, year } = parseFormData(feeToggleSchema.omit({ paid: true }), formData);

    await resetFeeAmount({ userId, year });
    revalidatePath("/dashboard/users");
  });
}

export async function saveFeeDefault(formData: FormData) {
  return executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/users");

    const { year, regular, student } = parseFormData(feeDefaultSchema, formData);

    await setFeeDefault(year, regular, student);
    revalidatePath("/dashboard/users");
  });
}

export async function deleteFeeDefaultYear(formData: FormData) {
  return executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/users");

    const year = Number(formData.get("year"));
    if (!Number.isInteger(year)) {
      throw new AppError("VALIDATION_ERROR", "Ungültiges Jahr.");
    }

    await removeFeeDefault(year);
    revalidatePath("/dashboard/users");
  });
}
