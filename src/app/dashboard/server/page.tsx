import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { requireDebugAdmin } from "@/lib/server/authz";
import { Badge, Callout, Card, Container, SectionTitle } from "@/components/ui";
import { getVersions } from "@/lib/server/serverStatus";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { ServerDashboard } from "./ServerDashboard";

export const metadata: Metadata = { title: "Server" };

export default async function ServerPage() {
    await requireDebugAdmin();
    const versions = await getVersions();

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

            {/* Stand des laufenden Prozesses — ändert sich erst mit dem nächsten Deploy. */}
            <section className="mt-10 grid gap-4">
                <SectionTitle>Versionen</SectionTitle>
                <Card className="p-5">
                    <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-[auto_1fr]">
                        {versions.map(({ name, version, expected }) => (
                            <div key={name} className="contents">
                                <dt className="text-muted">{name}</dt>
                                <dd className="flex flex-wrap items-center gap-2 font-mono">
                                    {version ?? "nicht gefunden"}
                                    {expected && version !== expected && (
                                        <Badge tone="warning">erwartet {expected}</Badge>
                                    )}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </Card>
            </section>
        </Container>
    );
}
