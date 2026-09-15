"use server";

import { revalidatePath } from "next/cache";
import type { ZodType } from "zod";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/server/authz";
import {
    createDraftMember,
    moveMember,
    removeAdminMember,
    removeMemberPhoto,
    saveAdminMember,
} from "@/lib/server/services/boardService";
import { AppError, executeAction } from "@/lib/server/errors";
import {
    boardDeleteSchema,
    boardMoveSchema,
    boardSaveSchema,
} from "@/lib/server/validation/schemas";
import { requireFeatureEnabled, requireFeatureEnabledOrRedirect } from "@/lib/server/featureGate";

function parseOrThrow<T>(schema: ZodType<T>, raw: unknown, fallback: string): T {
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
        throw new AppError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? fallback);
    }
    return parsed.data;
}

function revalidateBoard() {
    revalidatePath("/dashboard/vorstand");
    revalidatePath("/vorstand");
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
        const parsed = boardSaveSchema.safeParse(raw);
        if (!parsed.success) {
            throw new AppError(
                "VALIDATION_ERROR",
                parsed.error.issues[0]?.message ?? "Bitte alle Felder ausfüllen.",
            );
        }

        await saveAdminMember(parsed.data);
        revalidateBoard();
        redirect("/dashboard/vorstand");
    });
}

export async function deleteMember(formData: FormData) {
    await executeAction(async () => {
        await requireAdmin();
        await requireFeatureEnabledOrRedirect("BOARD_MANAGEMENT", "/dashboard/vorstand");
        const { id } = parseOrThrow(boardDeleteSchema, Object.fromEntries(formData), "Ungültige Mitglieds-ID.");
        await removeAdminMember(id);
        revalidateBoard();
    });
}

/** Für `<form action>` aus der Listenseite — Fehler dort bleiben ausnahmsweise stumm (Auf/Ab-Pfeile sind nicht validierungskritisch). */
export async function moveMemberInList(formData: FormData) {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("BOARD_MANAGEMENT", "/dashboard/vorstand");
    const { id, direction } = parseOrThrow(
        boardMoveSchema,
        Object.fromEntries(formData),
        "Ungültige Mitglieds-ID.",
    );
    await moveMember(id, direction);
    revalidateBoard();
}

export async function deletePhotoAction(formData: FormData) {
    return executeAction(async () => {
        await requireAdmin();
        await requireFeatureEnabled("BOARD_MANAGEMENT");
        const { id } = parseOrThrow(boardDeleteSchema, Object.fromEntries(formData), "Ungültige Mitglieds-ID.");
        await removeMemberPhoto(id);
        revalidatePath(`/dashboard/vorstand/${id}`);
        revalidateBoard();
    });
}
