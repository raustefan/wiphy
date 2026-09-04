"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/server/authz";
import { executeAction } from "@/lib/server/errors";
import { requireFeatureEnabled } from "@/lib/server/featureGate";
import { updateOwnBankDetails } from "@/lib/server/services/userService";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { bankUpdateSchema } from "@/lib/server/validation/schemas";

/**
 * Ändert die eigene Bankverbindung eines Mitglieds. Anders als die
 * generische Profilbearbeitung auf `/dashboard/users/[id]` verlangt dieses
 * Formular zwingend die erneute Bestätigung des SEPA-Lastschriftmandats
 * (`bankUpdateSchema`) — dieselbe Zustimmung wie beim Mitgliedsantrag.
 */
export async function updateBankDetails(formData: FormData) {
    return executeAction(async () => {
        const currentUser = await requireUser();
        await requireFeatureEnabled("PROFILE_EDIT");

        const parsed = parseFormData(bankUpdateSchema, formData);

        await updateOwnBankDetails(currentUser.id, {
            bank: parsed.bank ?? null,
            BLZ: parsed.BLZ ?? null,
            KTO: parsed.KTO ?? null,
            IBAN: parsed.IBAN,
            BIC: parsed.BIC ?? null,
            bankeinzug: parsed.bankeinzug,
        });

        revalidatePath("/dashboard/zahlungen");
        revalidatePath("/dashboard");
        revalidatePath(`/dashboard/users/${currentUser.id}`);
    });
}
