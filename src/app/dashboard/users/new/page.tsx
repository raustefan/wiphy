import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/server/authz";
import { adminCreateUser } from "@/lib/server/services/userService";
import { Check, X } from "lucide-react";
import { revalidatePath } from "next/cache";
import { AppError } from "@/lib/server/errors";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { adminCreateUserSchema } from "@/lib/server/validation/schemas";
import { requireFeatureEnabledOrRedirect } from "@/lib/server/featureGate";
import { Suspense } from "react";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { STATUS_OPTIONS, ROLE_OPTIONS } from "@/lib/statusLabels";
import { DashboardPageHeader } from "../../DashboardPageHeader";
import { PasswordInput } from "@/components/PasswordField";
import { PASSWORD_MIN_LENGTH } from "@/lib/passwordStrength";
import {
    Button,
    ButtonLink,
    Callout,
    Card,
    Container,
    Field,
    Input,
    Select,
} from "@/components/ui";

export const metadata: Metadata = { title: "Benutzer hinzufügen" };

async function createUserAction(formData: FormData) {
    "use server";
    const currentUser = await requireUser();
    if (currentUser.role !== "ADMIN") return redirect("/dashboard");

    await requireFeatureEnabledOrRedirect("USER_CREATION", "/dashboard/users/new");

    let parsed;
    try {
        parsed = parseFormData(adminCreateUserSchema, formData);
    } catch (error) {
        if (error instanceof AppError && error.code === "VALIDATION_ERROR") {
            redirect("/dashboard/users/new?error=missing_fields");
        }
        throw error;
    }

    try {
        await adminCreateUser({
            email: parsed.email,
            password: parsed.password,
            name: parsed.name,
            vorname: parsed.vorname,
            role: parsed.role,
            status: parsed.status,
        }, currentUser.role);
    } catch {
        redirect("/dashboard/users/new?error=creation_failed");
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export default async function NewUserPage({ searchParams }: { searchParams?: Promise<{ error?: string }> }) {
    const currentUser = await requireUser();
    if (currentUser.role !== "ADMIN") return redirect("/dashboard");

    const resolvedSearchParams = searchParams ? await searchParams : undefined;
    const errorMessage =
        resolvedSearchParams?.error === "missing_fields"
            ? "Bitte alle Pflichtfelder ausfüllen."
            : resolvedSearchParams?.error === "creation_failed"
              ? "Ein Fehler ist aufgetreten (evtl. existiert die E-Mail bereits)."
              : null;

    return (
        <Container size="2" className="py-8 sm:py-12">
            <Suspense fallback={null}>
                <FeatureDisabledQueryDialog />
            </Suspense>

            <DashboardPageHeader
                eyebrow="Internbereich"
                title="Benutzer hinzufügen"
                backHref="/dashboard"
            />

            <Card className="p-5 sm:p-6">
                {errorMessage && (
                    <Callout tone="danger" className="mb-4">
                        {errorMessage}
                    </Callout>
                )}

                <form action={createUserAction} className="grid gap-4">
                    <Field label="Vorname" required htmlFor="new-user-vorname">
                        <Input id="new-user-vorname" name="vorname" required />
                    </Field>

                    <Field label="Nachname" required htmlFor="new-user-name">
                        <Input id="new-user-name" name="name" required />
                    </Field>

                    <Field label="E-Mail" required htmlFor="new-user-email">
                        <Input id="new-user-email" name="email" type="email" required />
                    </Field>

                    {/* Sichtbar schaltbar: dieses Passwort muss der Admin
                        anschließend weitergeben — blind getippt landet ein
                        Tippfehler direkt beim neuen Konto. */}
                    <Field
                        label="Passwort"
                        required
                        htmlFor="new-user-password"
                        hint={`Mindestens ${PASSWORD_MIN_LENGTH} Zeichen. Gib es der Person weiter — sie kann es danach selbst ändern.`}
                    >
                        <PasswordInput
                            id="new-user-password"
                            name="password"
                            autoComplete="new-password"
                            minLength={PASSWORD_MIN_LENGTH}
                            required
                        />
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Rolle" htmlFor="new-user-role">
                            <Select id="new-user-role" name="role" defaultValue="MEMBER">
                                {ROLE_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </Select>
                        </Field>
                        <Field label="Status" htmlFor="new-user-status">
                            <Select id="new-user-status" name="status" defaultValue="KEIN_MITGLIED">
                                {STATUS_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </Select>
                        </Field>
                    </div>

                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                        <Button size="lg" type="submit">
                            <Check size={16} aria-hidden="true" /> Hinzufügen
                        </Button>
                        <ButtonLink href="/dashboard" size="lg" variant="soft" color="neutral">
                            <X size={16} aria-hidden="true" /> Abbrechen
                        </ButtonLink>
                    </div>
                </form>
            </Card>
        </Container>
    );
}
