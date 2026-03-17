// src/app/dashboard/blog/actions.ts
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Hilfsfunktion für den Admin-Check
async function checkAdmin() {
    const session = await auth();
    if ((session?.user as any)?.role !== "ADMIN") {
        throw new Error("Keine Berechtigung");
    }
}

export async function savePost(formData: FormData) {
    await checkAdmin();

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const published = formData.get("published") === "on";

    if (id === "new") {
        await prisma.blogPost.create({
            data: { title, content, published },
        });
    } else {
        await prisma.blogPost.update({
            where: { id },
            data: { title, content, published },
        });
    }

    revalidatePath("/dashboard/blog");
    redirect("/dashboard/blog");
}

export async function deletePost(formData: FormData) {
    await checkAdmin();
    const id = formData.get("id") as string;

    await prisma.blogPost.delete({ where: { id } });

    revalidatePath("/dashboard/blog");
}