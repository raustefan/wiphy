"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/server/authz";
import { AppError, executeAction } from "@/lib/server/errors";
import { deleteRateLimitEntry } from "@/lib/server/services/rateLimitService";

export async function removeRateLimitEntry(formData: FormData) {
    return executeAction(async () => {
        await requireAdmin();
        const key = formData.get("key");
        if (typeof key !== "string" || key.trim() === "") {
            throw new AppError("VALIDATION_ERROR", "Ungültiger Eintrag.");
        }
        await deleteRateLimitEntry(key);
        revalidatePath("/dashboard/rate-limits");
    });
}
