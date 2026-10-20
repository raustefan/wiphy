import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/server/authz";
import { Suspense } from "react";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { DashboardPageHeader } from "../../DashboardPageHeader";
import { Card, Container } from "@/components/ui";
import { NewUserForm } from "./NewUserForm";
import { BulkImport } from "./BulkImport";

export const metadata: Metadata = { title: "Benutzer hinzufügen" };

export default async function NewUserPage() {
    const currentUser = await requireUser();
    if (currentUser.role !== "ADMIN") return redirect("/dashboard");

    return (
        <>
            <Container size="2" className="pt-8 pb-6 sm:pt-12">
                <Suspense fallback={null}>
                    <FeatureDisabledQueryDialog />
                </Suspense>

                <DashboardPageHeader
                    eyebrow="Internbereich"
                    title="Benutzer hinzufügen"
                    backHref="/dashboard/users"
                    backLabel="Zurück zur Benutzerverwaltung"
                />

                <Card className="p-5 sm:p-6">
                    <NewUserForm />
                </Card>
            </Container>

            {/* Breiter als das Formular: die Vorschau ist eine Tabelle. */}
            <Container size="3" className="pb-12">
                <Card className="p-5 sm:p-6">
                    <h2 id="import" className="mb-2 text-lg font-semibold">
                        Alumni importieren
                    </h2>
                    <BulkImport />
                </Card>
            </Container>
        </>
    );
}
