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
import { Text, Container, Card, Box } from "@radix-ui/themes";
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

    if (!result.ok && result.reason === "mitgliedId_conflict") {
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
    searchParams?: Promise<{ mitgliedIdError?: string; validationError?: string }>;
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
    if (!user) return <Text>User nicht gefunden</Text>;

    const canDelete = isAdmin && currentUser.id !== resolvedParams.id;
    const displayName = [user.vorname, user.name].filter(Boolean).join(" ") || user.email;

    return (
        <Box py={{ initial: "6", sm: "8" }} style={{ minHeight: "100%" }}>
            <Suspense fallback={null}>
                <FeatureDisabledQueryDialog />
            </Suspense>
            <Suspense fallback={null}>
                <EmailChangeDialog />
            </Suspense>
            <Container size="2" px={{ initial: "4", sm: "5" }}>
                <DashboardPageHeader
                    eyebrow="Mitgliederselbstverwaltung"
                    title={isAdmin ? "Benutzer bearbeiten" : "Meine Mitgliedsdaten"}
                    description={!isAdmin ? "Halte deine persönlichen Angaben aktuell." : undefined}
                    backHref="/dashboard"
                    backAsPlainAnchor
                />

                <Card size="3">
                    {resolvedSearchParams?.validationError === "1" && (
                        <Card mb="4" style={{ backgroundColor: "var(--red-3)" }}>
                            <Text weight="bold" color="red" size="2">
                                Bitte prüfe deine Eingaben.
                            </Text>
                            <Text size="2" color="red">
                                Ein oder mehrere Felder sind ungültig oder fehlen.
                            </Text>
                        </Card>
                    )}

                    {isAdmin && resolvedSearchParams?.mitgliedIdError === "1" && (
                        <Card mb="4" style={{ backgroundColor: "var(--red-3)" }}>
                            <Text weight="bold" color="red" size="2">
                                Diese Mitglieds-ID ist bereits einem anderen Mitglied zugeordnet.
                            </Text>
                            <Text size="2" color="red">
                                Bitte wähle eine andere eindeutige Nummer.
                            </Text>
                        </Card>
                    )}

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
        </Box>
    );
}
