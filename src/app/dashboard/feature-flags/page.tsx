import { requireAdmin } from "@/lib/server/authz";
import { getAllFeatureFlags } from "@/lib/server/services/featureFlagService";
import { Badge, Card, Container } from "@/components/ui";
import { FeatureFlagToggle } from "./FeatureFlagToggle";
import { DashboardPageHeader } from "../DashboardPageHeader";

export default async function FeatureFlagsPage() {
    await requireAdmin();
    const flags = await getAllFeatureFlags();

    return (
        <Container size="3" className="py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Admin"
                title="Feature Flags"
                description="Schalte einzelne Funktionen für alle Nutzer ein oder aus. Deaktivierte Funktionen zeigen betroffenen Nutzern einen Hinweis-Dialog an."
                backHref="/dashboard"
            />

            <Card className="divide-y divide-line">
                {flags.map((flag) => (
                    <div
                        key={flag.key}
                        className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center sm:gap-6"
                    >
                        <div className="grid min-w-0 flex-1 gap-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-semibold">{flag.label}</span>
                                <Badge tone={flag.enabled ? "positive" : "negative"}>
                                    {flag.enabled ? "Aktiv" : "Deaktiviert"}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted text-pretty">{flag.description}</p>
                        </div>
                        <FeatureFlagToggle
                            flagKey={flag.key}
                            label={flag.label}
                            enabled={flag.enabled}
                        />
                    </div>
                ))}
            </Card>
        </Container>
    );
}
