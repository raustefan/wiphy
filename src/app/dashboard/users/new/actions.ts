"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/server/authz";
import { adminCreateUser } from "@/lib/server/services/userService";
import { AppError } from "@/lib/server/errors";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { adminCreateUserSchema, userImportExtraSchema } from "@/lib/server/validation/schemas";
import { generatePassword } from "@/lib/passwordStrength";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { requireFeatureEnabledOrRedirect } from "@/lib/server/featureGate";

/**
 * Gibt Fehler als Ergebnis zurück statt per Redirect: das Formular hat viele
 * Felder, und ein Redirect würde alles Eingetippte verwerfen.
 */
export async function createUserAction(formData: FormData): Promise<{ error: string }> {
    const currentUser = await requireUser();
    if (currentUser.role !== "ADMIN") redirect("/dashboard");

    await requireFeatureEnabledOrRedirect("USER_CREATION", "/dashboard/users/new");

    let parsed;
    try {
        parsed = parseFormData(adminCreateUserSchema, formData);
    } catch (error) {
        if (error instanceof AppError && error.code === "VALIDATION_ERROR") {
            return { error: error.message };
        }
        throw error;
    }

    const result = await adminCreateUser(parsed, currentUser.role);
    if (!result.ok) {
        return {
            error:
                result.reason === "email_taken"
                    ? "Zu dieser E-Mail-Adresse existiert bereits ein Konto."
                    : "Diese Mitglieds-ID ist bereits vergeben.",
        };
    }

    revalidatePath("/dashboard");
    redirect(parsed.notify && !result.mailed ? "/dashboard?mail=failed" : "/dashboard");
}

const importRowsSchema = z.array(z.record(z.string(), z.string())).max(2000);

export type ImportRowResult = { error: string | null; created: boolean; mailFailed?: boolean };

/**
 * JSON-Massenimport (einmalige Übernahme aus der alten DB). `dryRun` prüft nur;
 * sonst wird Zeile für Zeile angelegt, jeweils mit Zufallspasswort.
 * Ergebnis hat dieselbe Reihenfolge wie `rows`.
 */
export async function bulkCreateUsersAction(
    rows: Record<string, string>[],
    notify: boolean,
    dryRun: boolean,
): Promise<ImportRowResult[]> {
    const currentUser = await requireUser();
    if (currentUser.role !== "ADMIN") redirect("/dashboard");
    await requireFeatureEnabledOrRedirect("USER_CREATION", "/dashboard/users/new");

    const parsedRows = importRowsSchema.parse(rows).map((row) => {
        const core = adminCreateUserSchema.safeParse({
            ...row,
            // `bankeinzug: false` aus der alten DB heißt hier „Selbstzahler“.
            selbstzahler: row.selbstzahler || (row.bankeinzug === "false" ? "true" : ""),
            password: generatePassword(),
            notify: String(notify),
        });
        const extra = userImportExtraSchema.safeParse(row);
        const issue = !core.success ? core.error.issues[0] : !extra.success ? extra.error.issues[0] : null;
        return {
            core: core.data,
            extra: extra.data,
            error: issue ? `${issue.path.join(".")}: ${issue.message}` : null,
        };
    });

    // Konflikte vorab: gegen die DB und innerhalb der Datei.
    const emails = parsedRows.map((r) => r.core?.email);
    const ids = parsedRows.map((r) => r.core?.mitgliedId);
    const existing = await prisma.user.findMany({
        where: {
            OR: [
                { email: { in: emails.filter((e): e is string => !!e) } },
                { mitgliedId: { in: ids.filter((i): i is number => i != null) } },
            ],
        },
        select: { email: true, mitgliedId: true },
    });
    for (const [i, r] of parsedRows.entries()) {
        if (r.error || !r.core) continue;
        const { email, mitgliedId } = r.core;
        if (existing.some((u) => u.email === email)) r.error = "E-Mail existiert bereits in der DB.";
        else if (emails.indexOf(email) !== i) r.error = "E-Mail doppelt in der Datei.";
        else if (mitgliedId != null && existing.some((u) => u.mitgliedId === mitgliedId))
            r.error = "Mitglieds-ID existiert bereits in der DB.";
        else if (mitgliedId != null && ids.indexOf(mitgliedId) !== i) r.error = "Mitglieds-ID doppelt in der Datei.";
    }

    const results: ImportRowResult[] = parsedRows.map((r) => ({ error: r.error, created: false }));
    if (dryRun) return results;

    // Zeilen mit fester Mitglieds-ID zuerst, sonst könnte eine automatisch
    // vergebene ID (max + 1) einer späteren festen in die Quere kommen.
    const order = parsedRows
        .map((r, i) => i)
        .filter((i) => !parsedRows[i].error)
        .sort((a, b) => Number(parsedRows[a].core!.mitgliedId == null) - Number(parsedRows[b].core!.mitgliedId == null));
    for (const i of order) {
        const { core, extra } = parsedRows[i];
        try {
            const result = await adminCreateUser(core!, currentUser.role, extra);
            results[i] = result.ok
                ? { error: null, created: true, mailFailed: notify && !result.mailed }
                : { error: result.reason, created: false };
        } catch (error) {
            console.error("Bulk import row failed:", error);
            results[i] = { error: "Anlegen fehlgeschlagen (siehe Server-Log).", created: false };
        }
    }

    revalidatePath("/dashboard");
    return results;
}
