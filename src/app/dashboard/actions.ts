"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { AppError, executeAction } from "@/lib/server/errors";
import { setNewsletter } from "@/lib/server/services/userService";
import { setOwnStudentEndYear } from "@/lib/server/services/feeService";
import {
    AS_MEMBER_COOKIE,
    DEBUG_COOKIE,
    isDebugMode,
    isViewingAsMember,
    requireRealAdmin,
    requireUser,
} from "@/lib/server/authz";

// Ohne maxAge: Sitzungs-Cookies, enden mit dem Browser.
const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
} as const;

export async function toggleDebugMode() {
    await requireRealAdmin();
    const store = await cookies();
    if (await isDebugMode()) {
        store.delete(DEBUG_COOKIE);
        store.delete(AS_MEMBER_COOKIE);
    } else {
        store.set(DEBUG_COOKIE, "1", COOKIE_OPTIONS);
    }
}

export async function toggleMemberView() {
    await requireRealAdmin();
    if (!(await isDebugMode())) return;
    const store = await cookies();
    if (await isViewingAsMember()) {
        store.delete(AS_MEMBER_COOKIE);
    } else {
        store.set(AS_MEMBER_COOKIE, "1", COOKIE_OPTIONS);
    }
}

/** Newsletter des eigenen Kontos — vom Dashboard und aus der Selbstverwaltung. */
export async function setOwnNewsletterAction(subscribed: boolean) {
    return executeAction(async () => {
        const user = await requireUser();
        await setNewsletter(user.id, subscribed === true);
        revalidatePath("/dashboard");
        revalidatePath(`/dashboard/users/${user.id}`);
        return subscribed === true;
    });
}

/** „Ermäßigt bis einschließlich …“ — von der Zahlungsseite und aus dem Dashboard-Hinweis. */
export async function setStudentEndYearAction(formData: FormData) {
    return executeAction(async () => {
        const user = await requireUser();
        const endYear = Number(formData.get("endYear"));
        if (!Number.isInteger(endYear)) throw new AppError("VALIDATION_ERROR", "Ungültiges Jahr.");
        await setOwnStudentEndYear(user.id, endYear);
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/zahlungen");
    });
}
