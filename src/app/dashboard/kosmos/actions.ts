"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/server/authz";
import { AppError, executeAction } from "@/lib/server/errors";
import { consumeRateLimit } from "@/lib/server/rateLimit";
import { requireFeatureEnabled } from "@/lib/server/featureGate";
import {
    getKosmosContact,
    isKosmosParticipant,
    setKosmosVisibility,
} from "@/lib/server/services/kosmosService";

export async function setKosmosVisibilityAction(visible: boolean) {
    return executeAction(async () => {
        const user = await requireUser();
        // Austreten geht immer — der Widerruf darf nicht an einem Schalter hängen.
        if (visible === true) await requireFeatureEnabled("KOSMOS");
        await setKosmosVisibility(user.id, visible === true);
        revalidatePath("/dashboard/kosmos");
    });
}

/**
 * E-Mail-Adresse und LinkedIn-Link kommen erst auf Klick und nur an
 * Mitglieder, die selbst sichtbar sind — so steht keine vollständige Liste
 * im HTML der Seite.
 */
export async function revealKosmosContactAction(userId: string) {
    return executeAction(async () => {
        const viewer = await requireUser();
        await requireFeatureEnabled("KOSMOS");
        if (!(await isKosmosParticipant(viewer.id))) {
            throw new AppError("FORBIDDEN", "Der Kosmos ist nur sichtbar, solange du selbst sichtbar bist.");
        }
        await consumeRateLimit("kosmos-email", [viewer.id]);
        const contact = await getKosmosContact(String(userId));
        if (!contact) throw new AppError("NOT_FOUND", "Dieses Mitglied ist nicht mehr im Kosmos sichtbar.");
        return contact;
    });
}
