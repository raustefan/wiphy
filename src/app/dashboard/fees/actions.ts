 "use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/server/authz";
import {
  setFeeComment,
  setFeePaidStatus,
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
import { requireFeatureEnabledOrRedirect } from "@/lib/server/featureGate";

export async function toggleFee(formData: FormData) {
  await executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/fees");

    const { userId, year, paid } = parseFormData(feeToggleSchema, formData);

    await setFeePaidStatus({ userId, year, paid });
    revalidatePath("/dashboard/fees");
  });
}

export async function updateFeeStatus(formData: FormData) {
  await executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/fees");

    const { userId, year, field, value } = parseFormData(feeStatusUpdateSchema, formData);

    await setFeeStatus({ userId, year, field, value });
    revalidatePath("/dashboard/fees");
  });
}

export async function updateFeeAmount(formData: FormData) {
  await executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/fees");

    const { userId, year, beitrag } = parseFormData(feeAmountUpdateSchema, formData);

    await setFeeAmount({ userId, year, amount: beitrag });
    revalidatePath("/dashboard/fees");
  });
}

export async function updateFeeComment(formData: FormData) {
  await executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/fees");

    const { userId, comment } = parseFormData(feeCommentSchema, formData);

    await setFeeComment({ userId, comment });
    revalidatePath("/dashboard/fees");
  });
}

export async function initializeBillingYear(formData: FormData) {
  await executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/fees");
    const year = parseInt(formData.get("year") as string);
    if (!year || isNaN(year)) return;

    // Nur beitragspflichtige Mitglieder — für alle anderen wäre die Zeile sinnlos.
    const users = await getFeeLiableUsers();

    for (const user of users) {
      // Der erklärte Sonderstatus des Mitglieds geht vor; fehlt er, wird der
      // Status des zuletzt erfassten Jahres fortgeschrieben.
      let isStudentDefault = user.studentYears.includes(year);
      if (user.studentYears.length === 0) {
        const lastFee = await prisma.memberFee.findFirst({
          where: { userId: user.id, jahr: { lt: year } },
          orderBy: { jahr: "desc" },
        });
        isStudentDefault = lastFee?.isStudent ?? false;
      }

      await prisma.memberFee.upsert({
        where: { userId_jahr: { userId: user.id, jahr: year } },
        update: {},
        create: {
          userId: user.id,
          jahr: year,
          bezahlt: false,
          isStudent: isStudentDefault,
          // Kein Betrag: die Zeile folgt automatisch den Standard-Beitragssätzen,
          // bis ein Admin sie ausdrücklich als Ausnahme überschreibt.
          beitrag: 0,
          beitragManuell: false,
        },
      });
    }

    revalidatePath("/dashboard/fees");
  });
}


export async function revertFeeAmount(formData: FormData) {
  await executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/fees");

    const { userId, year } = parseFormData(feeToggleSchema.omit({ paid: true }), formData);

    await resetFeeAmount({ userId, year });
    revalidatePath("/dashboard/fees");
  });
}

export async function saveFeeDefault(formData: FormData) {
  return executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/fees");

    const { jahr, regular, student } = parseFormData(feeDefaultSchema, formData);

    await setFeeDefault(jahr, regular, student);
    revalidatePath("/dashboard/fees");
  });
}

export async function deleteFeeDefaultYear(formData: FormData) {
  return executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/fees");

    const jahr = Number(formData.get("jahr"));
    if (!Number.isInteger(jahr)) {
      throw new AppError("VALIDATION_ERROR", "Ungültiges Jahr.");
    }

    await removeFeeDefault(jahr);
    revalidatePath("/dashboard/fees");
  });
}
