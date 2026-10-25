"use server";

import { redirect } from "next/navigation";
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
    redirect(internalPath(String(formData.get("next") ?? "")) ?? "/dashboard");
}
