import { redirect } from "next/navigation";
import { assertCanEditUser, requireUser } from "@/lib/server/authz";
import { AppError } from "@/lib/server/errors";
import {
    adminDeleteUser,
    getEditableUser,
    updateUserProfile,
} from "@/lib/server/services/userService";
import { parseFormData } from "@/lib/server/validation/parseFormData";
import { userUpdateSchema } from "@/lib/server/validation/schemas";
import { requireFeatureEnabledOrRedirect } from "@/lib/server/featureGate";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { Card, Container } from "@/components/ui";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import { EditUserForm } from "./EditUserForm";
import { DeleteMemberSection } from "./DeleteMemberSection";
import { EmailChangeDialog } from "../../EmailChangeDialog";
import { DashboardPageHeader } from "../../DashboardPageHeader";

async function updateUser(formData: FormData) {
    "use server";
    const currentUser = await requireUser();
    const idForRedirect = formData.get("id");
    const editPath =
        typeof idForRedirect === "string" && idForRedirect
            ? `/dashboard/users/${idForRedirect}`
            : "/dashboard";

    await requireFeatureEnabledOrRedirect("PROFILE_EDIT", editPath);

    let parsed;
    try {
        parsed = parseFormData(userUpdateSchema, formData);
    } catch (e) {
        if (e instanceof AppError && e.code === "VALIDATION_ERROR") {
            const id = formData.get("id");
            const idStr = typeof id === "string" ? id : "";
            if (idStr) {
                redirect(`/dashboard/users/${idStr}?validationError=1`);
            }
            redirect("/dashboard");
        }
        throw e;
    }

    assertCanEditUser(currentUser, parsed.id);

    const targetUser = await getEditableUser(parsed.id);
    if (targetUser && targetUser.email !== parsed.email && !(await isFeatureEnabled("EMAIL_CHANGE"))) {
        redirect(`${editPath}?featureDisabled=EMAIL_CHANGE`);
    }

    const result = await updateUserProfile({
        idToEdit: parsed.id,
        currentUserRole: currentUser.role,
        currentUserId: currentUser.id,
        // basic
        name: parsed.name,
        vorname: parsed.vorname,
        email: parsed.email,
        titel: parsed.titel,
        // kontakt & adresse
        plz: parsed.plz,
        stadt: parsed.stadt,
        strasse: parsed.strasse,
        telefon: parsed.telefon,
        land: parsed.land,
        geburtsdatum: parsed.geburtsdatum,
        website: parsed.website,
        // studium
        studiengang: parsed.studiengang,
        studienbeginn: parsed.studienbeginn,
        studienende: parsed.studienende,
        diplomarbeit: parsed.diplomarbeit,
        bachelorarbeit: parsed.bachelorarbeit,
        masterarbeit: parsed.masterarbeit,
        dissertation: parsed.dissertation,
        // beruf
        arbeitgeber: parsed.arbeitgeber,
        berufsstand: parsed.berufsstand,
        berufszweig: parsed.berufszweig,
        position: parsed.position,
        praktika: parsed.praktika,
        berufserfahrung: parsed.berufserfahrung,
        // zahlungs/admin
        zahlungsKommentar: parsed.zahlungsKommentar,
        bank: parsed.bank,
        BLZ: parsed.BLZ,
        KTO: parsed.KTO,
        bankeinzug: parsed.bankeinzug,
        zuwendungsbesch: parsed.zuwendungsbesch,
        mahnung: parsed.mahnung,
        IBAN: parsed.IBAN,
        BIC: parsed.BIC,
        mandatserteilung: parsed.mandatserteilung,
        datensperren: parsed.datensperren,
        ausschluss: parsed.ausschluss,
        // Mitglieds- / role (admin only allowed to change)
        role:
            parsed.role === "ADMIN" || parsed.role === "MEMBER"
                ? parsed.role
                : undefined,
        status:
            parsed.status === "ORDENTLICHES_MITGLIED" ||
                parsed.status === "EHRENMITGLIED" ||
                parsed.status === "KEIN_MITGLIED"
                ? parsed.status
                : undefined,
        mitgliedId: parsed.mitgliedId,
    });

    if (!result.ok) {
        if (result.reason === "email_taken") {
            redirect(`${editPath}?emailTakenError=1`);
        }
        redirect(`/dashboard/users/${parsed.id}?mitgliedIdError=1`);
    }

    revalidatePath("/dashboard");
    if (result.emailChanged) {
        redirect(`${editPath}?emailChanged=1`);
    } else {
        redirect("/dashboard");
    }
}

async function deleteUserAction(formData: FormData) {
    "use server";
    const currentUser = await requireUser();
    const id = formData.get("id");
    const idStr = typeof id === "string" ? id : "";
    if (currentUser.role !== "ADMIN" || !idStr) return;
    if (currentUser.id === idStr) return; // Selbstlöschung ist nicht erlaubt
    await requireFeatureEnabledOrRedirect("USER_DELETION", `/dashboard/users/${idStr}`);
    await adminDeleteUser(idStr, currentUser.role);
    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export default async function EditUserPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{
        mitgliedIdError?: string;
        validationError?: string;
        emailTakenError?: string;
    }>;
}) {
    const resolvedParams = await params;
    const resolvedSearchParams = searchParams ? await searchParams : undefined;

    const currentUser = await requireUser();
    const isAdmin = currentUser.role === "ADMIN";

    // SICHERHEIT: MEMBER wird beim Zugriff auf fremde Profile aufs Dashboard geschickt
    if (!isAdmin && currentUser.id !== resolvedParams.id) {
        redirect("/dashboard");
    }

    const user = await getEditableUser(resolvedParams.id);
    if (!user) {
        return (
            <Container size="2" className="py-16 text-center text-muted">
                User nicht gefunden
            </Container>
        );
    }

    const canDelete = isAdmin && currentUser.id !== resolvedParams.id;
    const displayName = [user.vorname, user.name].filter(Boolean).join(" ") || user.email;

    const formErrors: { title: string; detail: string }[] = [];
    if (resolvedSearchParams?.validationError === "1") {
        formErrors.push({
            title: "Bitte prüfe deine Eingaben.",
            detail: "Ein oder mehrere Felder sind ungültig oder fehlen.",
        });
    }
    if (resolvedSearchParams?.emailTakenError === "1") {
        formErrors.push({
            title: "Diese E-Mail-Adresse wird bereits verwendet.",
            detail:
                "Bitte wähle eine andere Adresse. Deine übrigen Änderungen wurden nicht gespeichert.",
        });
    }
    if (isAdmin && resolvedSearchParams?.mitgliedIdError === "1") {
        formErrors.push({
            title: "Diese Mitglieds-ID ist bereits einem anderen Mitglied zugeordnet.",
            detail: "Bitte wähle eine andere eindeutige Nummer.",
        });
    }

    return (
        <Container size="2" className="py-8 sm:py-12">
            <Suspense fallback={null}>
                <FeatureDisabledQueryDialog />
            </Suspense>
            <Suspense fallback={null}>
                <EmailChangeDialog />
            </Suspense>

            <DashboardPageHeader
                eyebrow="Mitgliederselbstverwaltung"
                title={isAdmin ? "Benutzer bearbeiten" : "Meine Mitgliedsdaten"}
                description={!isAdmin ? "Halte deine persönlichen Angaben aktuell." : undefined}
                backHref="/dashboard"
                backAsPlainAnchor
            />

            <Card className="p-5 sm:p-6">
                {formErrors.map((formError) => (
                    <div
                        key={formError.title}
                        role="alert"
                        className="mb-4 grid gap-0.5 rounded-xl border-l-4 border-negative bg-negative/8 px-3.5 py-3 text-sm text-negative"
                    >
                        <p className="font-bold">{formError.title}</p>
                        <p>{formError.detail}</p>
                    </div>
                ))}

                <EditUserForm user={user} isAdmin={isAdmin} action={updateUser} />
            </Card>

            {canDelete && (
                <DeleteMemberSection
                    userId={user.id}
                    displayName={displayName}
                    email={user.email}
                    deleteAction={deleteUserAction}
                />
            )}
        </Container>
    );
}
