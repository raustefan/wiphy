"use server";

import { revalidatePath } from "next/cache";
import type { ZodType } from "zod";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { requireAdmin } from "@/lib/server/authz";
import {
    createDraftPost,
    movePostImage,
    removeAdminPost,
    removePostImage,
    saveAdminPost,
    setPostCoverImage,
    setPostImageAlt,
} from "@/lib/server/services/blogService";
import { AppError, executeAction } from "@/lib/server/errors";
import {
    blogDeleteSchema,
    blogImageAltSchema,
    blogImageMoveSchema,
    blogImageSchema,
    blogSaveSchema,
} from "@/lib/server/validation/schemas";
import { requireFeatureEnabled, requireFeatureEnabledOrRedirect } from "@/lib/server/featureGate";

/** Wirft die erste Zod-Meldung als Aktionsfehler — sonst steht sie nirgends. */
function parseOrThrow<T>(schema: ZodType<T>, raw: unknown, fallback: string): T {
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
        throw new AppError("VALIDATION_ERROR", parsed.error.issues[0]?.message ?? fallback);
    }
    return parsed.data;
}

/**
 * Legt einen leeren Entwurf an und springt direkt in seine Bearbeitung.
 *
 * „Neuer Beitrag“ ist deshalb ein Knopf und kein Link: erst mit einer echten
 * Beitrags-ID lassen sich Bilder hochladen, und die entsteht nun einmal nur in
 * der Datenbank.
 */
export async function createDraft() {
    await requireAdmin();
    await requireFeatureEnabledOrRedirect("BLOG_MANAGEMENT", "/dashboard/blog");

    const session = await auth();
    const id = await createDraftPost(session?.user?.name ?? "");

    revalidatePath("/dashboard/blog");
    redirect(`/dashboard/blog/${id}`);
}

export async function savePost(formData: FormData) {
    await executeAction(async () => {
        await requireAdmin();
        await requireFeatureEnabledOrRedirect("BLOG_MANAGEMENT", "/dashboard/blog");

        const raw = {
            id: String(formData.get("id") ?? ""),
            title: String(formData.get("title") ?? ""),
            content: String(formData.get("content") ?? ""),
            preview: String(formData.get("preview") ?? ""),
            author: String(formData.get("author") ?? ""),
            publishedAt: String(formData.get("publishedAt") ?? ""),
            published: formData.get("published") === "on",
        };
        const parsed = blogSaveSchema.safeParse(raw);
        if (!parsed.success) {
            throw new AppError(
                "VALIDATION_ERROR",
                parsed.error.issues[0]?.message ?? "Bitte alle Felder ausfüllen.",
            );
        }

        await saveAdminPost(parsed.data);
        revalidatePath("/dashboard/blog");
        revalidatePath("/blog");
        revalidatePath(`/blog/${parsed.data.id}`);
        redirect("/dashboard/blog");
    });
}

export async function deletePost(formData: FormData) {
    await executeAction(async () => {
        await requireAdmin();
        await requireFeatureEnabledOrRedirect("BLOG_MANAGEMENT", "/dashboard/blog");
        const raw = { id: String(formData.get("id") ?? "") };
        const parsed = blogDeleteSchema.safeParse(raw);
        if (!parsed.success) {
            throw new AppError(
                "VALIDATION_ERROR",
                parsed.error.issues[0]?.message ?? "Ungültige Beitrags-ID.",
            );
        }
        await removeAdminPost(parsed.data.id);
        revalidatePath("/dashboard/blog");
        revalidatePath("/blog");
    });
}

// ─────────────────────────── Bilder ───────────────────────────
//
// Anders als `savePost` liefern diese Aktionen ihr `ActionResult` zurück: sie
// werden aus der Galerie-Verwaltung heraus aufgerufen, die Fehler und den
// „Feature abgeschaltet“-Dialog selbst anzeigt. Ein `redirect` gibt es hier
// nicht — die Seite bleibt stehen und lädt nur ihre Daten neu.

/** Gemeinsamer Vorlauf: Rechte, Feature-Flag, Formulardaten prüfen. */
async function beginImageAction() {
    await requireAdmin();
    await requireFeatureEnabled("BLOG_MANAGEMENT");
}

function revalidateBlogImages(postId: string) {
    revalidatePath(`/dashboard/blog/${postId}`);
    revalidatePath("/dashboard/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${postId}`);
}

export async function deleteBlogImage(formData: FormData) {
    return executeAction(async () => {
        await beginImageAction();
        const { postId, imageId } = parseOrThrow(
            blogImageSchema,
            Object.fromEntries(formData),
            "Ungültige Bild-ID.",
        );
        await removePostImage(postId, imageId);
        revalidateBlogImages(postId);
    });
}

export async function setBlogCoverImage(formData: FormData) {
    return executeAction(async () => {
        await beginImageAction();
        const { postId, imageId } = parseOrThrow(
            blogImageSchema,
            Object.fromEntries(formData),
            "Ungültige Bild-ID.",
        );
        await setPostCoverImage(postId, imageId);
        revalidateBlogImages(postId);
    });
}

export async function moveBlogImage(formData: FormData) {
    return executeAction(async () => {
        await beginImageAction();
        const { postId, imageId, direction } = parseOrThrow(
            blogImageMoveSchema,
            Object.fromEntries(formData),
            "Ungültige Bild-ID.",
        );
        await movePostImage(postId, imageId, direction);
        revalidateBlogImages(postId);
    });
}

export async function saveBlogImageAlt(formData: FormData) {
    return executeAction(async () => {
        await beginImageAction();
        const { postId, imageId, alt } = parseOrThrow(
            blogImageAltSchema,
            Object.fromEntries(formData),
            "Der Alternativtext ist zu lang.",
        );
        await setPostImageAlt(postId, imageId, alt);
        revalidateBlogImages(postId);
    });
}
