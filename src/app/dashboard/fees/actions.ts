 "use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/server/authz";
import { setFeeComment, setFeePaidStatus } from "@/lib/server/services/feeService";
import { executeAction } from "@/lib/server/errors";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { feeCommentSchema, feeToggleSchema } from "@/lib/server/validation/schemas";

export async function toggleFee(formData: FormData) {
  await executeAction(async () => {
    await requireAdmin();

    const { userId, year, paid } = parseFormData(feeToggleSchema, formData);

    await setFeePaidStatus({ userId, year, paid });
    revalidatePath("/dashboard/fees");
  });
}

export async function updateFeeComment(formData: FormData) {
  await executeAction(async () => {
    await requireAdmin();

    const { userId, comment } = parseFormData(feeCommentSchema, formData);

    await setFeeComment({ userId, comment });
    revalidatePath("/dashboard/fees");
  });
}

