 "use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/server/authz";
import { setFeeComment, setFeePaidStatus, setFeeStatus, setFeeAmount } from "@/lib/server/services/feeService";
import { executeAction } from "@/lib/server/errors";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { feeCommentSchema, feeToggleSchema, feeStatusUpdateSchema, feeAmountUpdateSchema } from "@/lib/server/validation/schemas";
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

    const users = await prisma.user.findMany({ select: { id: true } });

    for (const user of users) {
      let isStudentDefault = false;
      const lastFee = await prisma.memberFee.findFirst({
        where: { userId: user.id, jahr: { lt: year } },
        orderBy: { jahr: "desc" },
      });
      if (lastFee) {
        isStudentDefault = lastFee.isStudent;
      }

      await prisma.memberFee.upsert({
        where: { userId_jahr: { userId: user.id, jahr: year } },
        update: {},
        create: {
          userId: user.id,
          jahr: year,
          bezahlt: false,
          isStudent: isStudentDefault,
          beitrag: 0,
        },
      });
    }

    revalidatePath("/dashboard/fees");
  });
}

