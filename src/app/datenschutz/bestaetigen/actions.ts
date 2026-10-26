"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getOptionalUser } from "@/lib/server/authz";
import { internalPath } from "@/lib/internalPath";
import { DATENSCHUTZ_VERSION } from "../datenschutztext";

export async function confirmPrivacyPolicy(formData: FormData) {
    const user = await getOptionalUser();
    if (!user) redirect("/login");
    await prisma.user.update({
        where: { id: user.id },
        data: { privacyPolicyVersion: DATENSCHUTZ_VERSION },
    });
    // Prefetches aus der Zeit vor der Bestätigung stehen im Client-Cache noch
    // als Weiterleitung hierher — ohne Leeren pendelt der Browser endlos
    // zwischen Ziel und dieser Seite (nur im Production-Build, dev prefetcht nicht).
    revalidatePath("/", "layout");
    redirect(internalPath(String(formData.get("next") ?? "")) ?? "/dashboard");
}
