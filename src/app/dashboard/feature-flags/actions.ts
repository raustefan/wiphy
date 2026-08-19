"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/server/authz";
import { executeAction } from "@/lib/server/errors";
import { setFeatureFlagEnabled } from "@/lib/server/services/featureFlagService";
import { isFeatureFlagKey } from "@/lib/featureFlags";
import { AppError } from "@/lib/server/errors";

export async function setFeatureFlag(formData: FormData) {
    return executeAction(async () => {
        await requireAdmin();

        const key = formData.get("key");
        const enabled = formData.get("enabled") === "true";
        if (typeof key !== "string" || !isFeatureFlagKey(key)) {
            throw new AppError("VALIDATION_ERROR", "Unbekanntes Feature.");
        }

        await setFeatureFlagEnabled(key, enabled);
        revalidatePath("/dashboard/feature-flags");
    });
}
