"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/server/authz";
import { AppError, executeAction } from "@/lib/server/errors";
import { consumeRateLimit } from "@/lib/server/rateLimit";
import { requireFeatureEnabled } from "@/lib/server/featureGate";
import {
    getKosmosEmail,
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
 * Die Adresse kommt erst auf Klick und nur an Mitglieder, die selbst sichtbar
 * sind — so steht keine vollständige Liste im HTML der Seite.
 */
export async function revealKosmosEmailAction(userId: string) {
    return executeAction(async () => {
        const viewer = await requireUser();
        await requireFeatureEnabled("KOSMOS");
        if (!(await isKosmosParticipant(viewer.id))) {
            throw new AppError("FORBIDDEN", "Der Kosmos ist nur sichtbar, solange du selbst sichtbar bist.");
        }
        await consumeRateLimit("kosmos-email", [viewer.id]);
        const email = await getKosmosEmail(String(userId));
        if (!email) throw new AppError("NOT_FOUND", "Dieses Mitglied ist nicht mehr im Kosmos sichtbar.");
        return email;
    });
}
