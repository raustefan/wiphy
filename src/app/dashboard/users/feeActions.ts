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

    const { userId, year, beitrag } = parseFormData(feeAmountUpdateSchema, formData);

    await setFeeAmount({ userId, year, amount: beitrag });
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
    // Gleiche Grenzen wie auf der Seite und in den Fee-Schemas.
    const year = Number(formData.get("year"));
    if (!Number.isInteger(year) || year < 2000 || year > 2100) {
      throw new AppError("VALIDATION_ERROR", "Ungültiges Jahr.");
    }

    // Nur beitragspflichtige Mitglieder, die in dem Jahr schon dabei waren —
    // für alle anderen wäre die Zeile sinnlos.
    const users = (await getFeeLiableUsers()).filter((u) => wasMemberInYear(year, u.aufnahmedatum));

    // Status des zuletzt erfassten Jahres je Mitglied, in einer Abfrage:
    // absteigend sortiert liefert `distinct` die jüngste Zeile.
    const lastFees = await prisma.memberFee.findMany({
      where: { userId: { in: users.map((u) => u.id) }, jahr: { lt: year } },
      orderBy: { jahr: "desc" },
      distinct: ["userId"],
      select: { userId: true, isStudent: true },
    });
    const lastIsStudent = new Map(lastFees.map((f) => [f.userId, f.isStudent]));

    await prisma.memberFee.createMany({
      data: users.map((user) => ({
        userId: user.id,
        jahr: year,
        bezahlt: false,
        // Der erklärte Sonderstatus des Mitglieds geht vor; fehlt er, wird der
        // Status des zuletzt erfassten Jahres fortgeschrieben.
        isStudent:
          user.studentYears.length > 0
            ? user.studentYears.includes(year)
            : (lastIsStudent.get(user.id) ?? false),
        // Kein Betrag: die Zeile folgt automatisch den Standard-Beitragssätzen,
        // bis ein Admin sie ausdrücklich als Ausnahme überschreibt.
        beitrag: 0,
        beitragManuell: false,
      })),
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

    const { jahr, regular, student } = parseFormData(feeDefaultSchema, formData);

    await setFeeDefault(jahr, regular, student);
    revalidatePath("/dashboard/users");
  });
}

export async function deleteFeeDefaultYear(formData: FormData) {
  return executeAction(async () => {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("FEE_CHANGES", "/dashboard/users");

    const jahr = Number(formData.get("jahr"));
    if (!Number.isInteger(jahr)) {
      throw new AppError("VALIDATION_ERROR", "Ungültiges Jahr.");
    }

    await removeFeeDefault(jahr);
    revalidatePath("/dashboard/users");
  });
}
