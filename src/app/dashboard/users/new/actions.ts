"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/server/authz";
import { adminCreateUser } from "@/lib/server/services/userService";
import { AppError } from "@/lib/server/errors";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { adminCreateUserSchema, userImportSchema } from "@/lib/server/validation/schemas";
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

const importEntriesSchema = z.array(z.unknown()).max(2000);

export type ImportIssue = { field: string; message: string };
export type ImportRowResult = { issues: ImportIssue[]; created: boolean; mailFailed?: boolean };

/**
 * JSON-Massenimport (Übernahme bestehender Alumni). `dryRun` prüft nur; sonst
 * wird Eintrag für Eintrag angelegt, jeweils mit Zufallspasswort. Ergebnis hat
 * dieselbe Reihenfolge wie `entries` und nennt alle Fehler je Feld, damit die
 * Vorschau sie am richtigen Feld anzeigen kann.
 */
export async function bulkCreateUsersAction(
    entries: unknown[],
    notify: boolean,
    dryRun: boolean,
): Promise<ImportRowResult[]> {
    const currentUser = await requireUser();
    if (currentUser.role !== "ADMIN") redirect("/dashboard");
    await requireFeatureEnabledOrRedirect("USER_CREATION", "/dashboard/users/new");

    const parsed = importEntriesSchema.parse(entries).map((entry) => {
        const result = userImportSchema.safeParse(entry);
        return {
            data: result.success ? result.data : undefined,
            issues: result.success
                ? []
                : result.error.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message })),
        };
    });

    // Konflikte vorab: gegen die DB und innerhalb der Datei.
    const emails = parsed.map((r) => r.data?.email);
    const numbers = parsed.map((r) => r.data?.memberNumber);
    const existing = await prisma.user.findMany({
        where: {
            OR: [
                { email: { in: emails.filter((e): e is string => !!e) } },
                { memberNumber: { in: numbers.filter((n): n is number => n != null) } },
            ],
        },
        select: { email: true, memberNumber: true },
    });
    for (const [i, r] of parsed.entries()) {
        if (!r.data) continue;
        const { email, memberNumber } = r.data;
        if (existing.some((u) => u.email === email)) {
            r.issues.push({ field: "email", message: "Existiert bereits in der Datenbank." });
        } else if (emails.indexOf(email) !== i) {
            r.issues.push({ field: "email", message: "Doppelt in der Datei." });
        }
        if (memberNumber != null && existing.some((u) => u.memberNumber === memberNumber)) {
            r.issues.push({ field: "memberNumber", message: "Existiert bereits in der Datenbank." });
        } else if (memberNumber != null && numbers.indexOf(memberNumber) !== i) {
            r.issues.push({ field: "memberNumber", message: "Doppelt in der Datei." });
        }
    }

    const results: ImportRowResult[] = parsed.map((r) => ({ issues: r.issues, created: false }));
    if (dryRun) return results;

    // Einträge mit fester Mitgliedsnummer zuerst, sonst könnte eine automatisch
    // vergebene Nummer (max + 1) einer späteren festen in die Quere kommen.
    const order = parsed
        .map((_, i) => i)
        .filter((i) => parsed[i].issues.length === 0)
        .sort((a, b) => Number(parsed[a].data!.memberNumber == null) - Number(parsed[b].data!.memberNumber == null));
    for (const i of order) {
        const { fees, allPaid, directDebit, title, phone, degreeProgram, studyStart, studyEnd, employer, employmentStatus, industry, jobTitle, linkedinUrl, loginDisabled, ...core } =
            parsed[i].data!;
        try {
            const result = await adminCreateUser(
                { ...core, password: generatePassword(), notify, selfPayer: !directDebit, allPaid },
                currentUser.role,
                { title, phone, degreeProgram, studyStart, studyEnd, employer, employmentStatus, industry, jobTitle, linkedinUrl, loginDisabled },
                fees,
            );
            results[i] = result.ok
                ? { issues: [], created: true, mailFailed: notify && !result.mailed }
                : {
                      issues: [
                          result.reason === "email_taken"
                              ? { field: "email", message: "Existiert bereits in der Datenbank." }
                              : { field: "memberNumber", message: "Existiert bereits in der Datenbank." },
                      ],
                      created: false,
                  };
        } catch (error) {
            console.error("Bulk import row failed:", error);
            results[i] = { issues: [{ field: "", message: "Anlegen fehlgeschlagen (siehe Server-Log)." }], created: false };
        }
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/users");
    return results;
}
