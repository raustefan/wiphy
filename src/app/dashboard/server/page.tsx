import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { requireAdmin } from "@/lib/server/authz";
import { Callout, Container } from "@/components/ui";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { ServerDashboard } from "./ServerDashboard";

export const metadata: Metadata = { title: "Server" };

export default async function ServerPage() {
    await requireAdmin();

    return (
        <Container size="3" className="py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Admin"
                title="Server"
                description="Aktuelle Auslastung des Servers und Deploy der Website per Knopfdruck."
                backHref="/dashboard"
            />

            <Callout
                tone="warning"
                icon={<AlertTriangle size={16} />}
                title="Vorsicht beim Deploy"
                className="mb-6"
            >
                Ein Deploy baut die Website neu und startet sie neu. Starte ihn nur, wenn du dir sicher
                bist, was du tust.
            </Callout>

            <ServerDashboard />
        </Container>
    );
}
