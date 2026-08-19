"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/server/authz";
import { removeAdminPost, saveAdminPost } from "@/lib/server/services/blogService";
import { AppError, executeAction } from "@/lib/server/errors";
import { blogDeleteSchema, blogSaveSchema } from "@/lib/server/validation/schemas";
import { requireFeatureEnabledOrRedirect } from "@/lib/server/featureGate";

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
    });
}
