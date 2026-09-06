import { Info } from "lucide-react";
import { requireAdmin } from "@/lib/server/authz";
import {
    getRateLimitEntries,
    summarizeByBucket,
} from "@/lib/server/services/rateLimitService";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { RateLimitTable } from "./RateLimitTable";
import { Callout, Card, Container } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function RateLimitsPage() {
    await requireAdmin();

    const entries = await getRateLimitEntries();
    const summary = summarizeByBucket(entries);

    return (
        <Container size="3" className="py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Admin"
                title="Rate Limits"
                description="Welche Rate Limits aktuell wie oft ausgelöst wurden, und wer gerade blockiert ist."
                backHref="/dashboard"
            />
            <Callout tone="warning" icon={<Info size={16} />} className="mb-4">
                Abgelaufene Einträge werden automatisch entfernt. Die Zahlen zeigen daher den
                aktuellen Stand, keine historische Gesamtsumme über die Zeit.
            </Callout>
            {entries.length === 0 ? (
                <Card className="p-6">
                    <p className="py-8 text-center text-sm text-muted">
                        Aktuell keine aktiven Rate-Limit-Einträge.
                    </p>
                </Card>
            ) : (
                <RateLimitTable summary={summary} entries={entries} />
            )}
        </Container>
    );
}
