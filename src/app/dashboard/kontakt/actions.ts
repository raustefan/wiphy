"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/server/authz";
import { AppError, executeAction } from "@/lib/server/errors";
import {
    deleteContactRequest,
    setContactRequestHandled,
} from "@/lib/server/services/contactService";

export async function markContactRequestHandled(formData: FormData) {
    return executeAction(async () => {
        await requireAdmin();

        const id = formData.get("id");
        if (typeof id !== "string" || id.trim() === "") {
            throw new AppError("VALIDATION_ERROR", "Ungültige Anfrage.");
        }

        await setContactRequestHandled(id, formData.get("handled") === "true");
        revalidatePath("/dashboard/kontakt");
    });
}

export async function removeContactRequest(formData: FormData) {
    return executeAction(async () => {
        await requireAdmin();

        const id = formData.get("id");
        if (typeof id !== "string" || id.trim() === "") {
            throw new AppError("VALIDATION_ERROR", "Ungültige Anfrage.");
        }

        await deleteContactRequest(id);
        revalidatePath("/dashboard/kontakt");
    });
}
