"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/server/authz";
import { adminCreateUser } from "@/lib/server/services/userService";
import { AppError } from "@/lib/server/errors";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { adminCreateUserSchema } from "@/lib/server/validation/schemas";
import { requireFeatureEnabledOrRedirect } from "@/lib/server/featureGate";

/**
 * Gibt Fehler als Ergebnis zurück statt per Redirect: das Formular hat viele
 * Felder, und ein Redirect würde alles Eingetippte verwerfen.
 */
export async function createUserAction(formData: FormData): Promise<{ error: string }> {
    const currentUser = await requireUser();
    if (currentUser.role !== "ADMIN") redirect("/dashboard");

    await requireFeatureEnabledOrRedirect("USER_CREATION", "/dashboard/users/new");

    let parsed;
    try {
        parsed = parseFormData(adminCreateUserSchema, formData);
    } catch (error) {
        if (error instanceof AppError && error.code === "VALIDATION_ERROR") {
            return { error: error.message };
        }
        throw error;
    }

    const result = await adminCreateUser(parsed, currentUser.role);
    if (!result.ok) {
        return {
            error:
                result.reason === "email_taken"
                    ? "Zu dieser E-Mail-Adresse existiert bereits ein Konto."
                    : "Diese Mitglieds-ID ist bereits vergeben.",
        };
    }

    revalidatePath("/dashboard");
    redirect(parsed.notify && !result.mailed ? "/dashboard?mail=failed" : "/dashboard");
}
