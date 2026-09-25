import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/server/authz";
import { Suspense } from "react";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { DashboardPageHeader } from "../../DashboardPageHeader";
import { Card, Container } from "@/components/ui";
import { NewUserForm } from "./NewUserForm";

export const metadata: Metadata = { title: "Benutzer hinzufügen" };

export default async function NewUserPage() {
    const currentUser = await requireUser();
    if (currentUser.role !== "ADMIN") return redirect("/dashboard");

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
                <NewUserForm />
            </Card>
        </Container>
    );
}
