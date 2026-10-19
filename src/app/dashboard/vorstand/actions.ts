"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/server/authz";
import {
    createDraftMember,
    moveMember,
    removeAdminMember,
    removeMemberPhoto,
    saveAdminMember,
} from "@/lib/server/services/boardService";
import { executeAction } from "@/lib/server/errors";
import {
    boardDeleteSchema,
    boardMoveSchema,
    boardSaveSchema,
} from "@/lib/server/validation/schemas";
import { requireFeatureEnabled, requireFeatureEnabledOrRedirect } from "@/lib/server/featureGate";

function revalidateBoard() {
    revalidatePath("/dashboard/vorstand");
    revalidatePath("/vorstand");
    revalidatePath("/impressum");
}

/**
 * Legt ein leeres Entwurfsmitglied an und springt direkt in seine Bearbeitung.
 *
 * „Neues Mitglied“ ist deshalb ein Knopf und kein Link: erst mit einer echten
 * ID lässt sich ein Foto hochladen (siehe Blog-Beiträge für dasselbe Muster).
 */
export async function createDraft() {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("BOARD_MANAGEMENT", "/dashboard/vorstand");

    const id = await createDraftMember();

    revalidatePath("/dashboard/vorstand");
    redirect(`/dashboard/vorstand/${id}`);
}

export async function saveMember(formData: FormData) {
    await executeAction(async () => {
        await requireAdmin();
        await requireFeatureEnabledOrRedirect("BOARD_MANAGEMENT", "/dashboard/vorstand");

        const raw = {
            id: String(formData.get("id") ?? ""),
            name: String(formData.get("name") ?? ""),
            role: String(formData.get("role") ?? ""),
            linkedin: String(formData.get("linkedin") ?? ""),
            published: formData.get("published"),
            inSignature: formData.get("inSignature"),
        };
        // Ein ZodError wird in `executeAction` zur ersten Zod-Meldung.
        await saveAdminMember(boardSaveSchema.parse(raw));
        revalidateBoard();
        redirect("/dashboard/vorstand");
    });
}

export async function deleteMember(formData: FormData) {
    await executeAction(async () => {
        await requireAdmin();
        await requireFeatureEnabledOrRedirect("BOARD_MANAGEMENT", "/dashboard/vorstand");
        const { id } = boardDeleteSchema.parse(Object.fromEntries(formData));
        await removeAdminMember(id);
        revalidateBoard();
    });
}

/** Für `<form action>` aus der Listenseite — Fehler dort bleiben ausnahmsweise stumm (Auf/Ab-Pfeile sind nicht validierungskritisch). */
export async function moveMemberInList(formData: FormData) {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("BOARD_MANAGEMENT", "/dashboard/vorstand");
    const { id, direction } = boardMoveSchema.parse(Object.fromEntries(formData));
    await moveMember(id, direction);
    revalidateBoard();
}

export async function deletePhotoAction(formData: FormData) {
    return executeAction(async () => {
        await requireAdmin();
        await requireFeatureEnabled("BOARD_MANAGEMENT");
        const { id } = boardDeleteSchema.parse(Object.fromEntries(formData));
        await removeMemberPhoto(id);
        revalidatePath(`/dashboard/vorstand/${id}`);
        revalidateBoard();
    });
}
