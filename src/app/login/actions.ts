"use server";

import { prisma } from "@/lib/prisma";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";

// Admins must always be able to log in, even while LOGIN is disabled, so they
// can get back in and re-enable it. Only an email lookup (no password check)
// is needed here — this just gates the UI, `auth.ts` enforces it for real.
export async function checkLoginFeatureEnabled(email: string): Promise<boolean> {
    if (await isFeatureEnabled("LOGIN")) return true;

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return false;

    const user = await prisma.user.findUnique({
        where: { email: trimmedEmail },
        select: { role: true },
    });
    return user?.role === "ADMIN";
}
