import { Info } from "lucide-react";
import { requireAdmin } from "@/lib/server/authz";
import { getContactRequests } from "@/lib/server/services/contactService";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { ContactRequestList } from "./ContactRequestList";
import { Callout, Card, Container } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function ContactRequestsPage() {
    await requireAdmin();

    const [requests, storageEnabled, mailEnabled] = await Promise.all([
        getContactRequests(),
        isFeatureEnabled("CONTACT_FORM_STORAGE"),
        isFeatureEnabled("CONTACT_FORM_MAIL"),
    ]);

    return (
        <Container size="3" className="py-8 sm:py-12">
            <DashboardPageHeader
                eyebrow="Admin"
                title="Kontaktanfragen"
                description="Eingegangene Nachrichten über das öffentliche Kontaktformular."
                backHref="/dashboard"
            />

            {!storageEnabled && (
                <Callout tone="warning" icon={<Info size={16} />} className="mb-4">
                    Die Speicherung neuer Anfragen ist deaktiviert. Diese Liste zeigt nur noch
                    ältere Einträge — neue Anfragen werden{" "}
                    {mailEnabled ? "ausschließlich per Mail zugestellt" : "nicht angenommen"}.
                </Callout>
            )}

            {!mailEnabled && storageEnabled && (
                <Callout tone="warning" icon={<Info size={16} />} className="mb-4">
                    Der Mailversand für Kontaktanfragen ist deaktiviert. Neue Anfragen landen nur
                    hier — bitte regelmäßig prüfen.
                </Callout>
            )}

            {requests.length === 0 ? (
                <Card className="p-6">
                    <p className="py-8 text-center text-sm text-muted">
                        Noch keine Kontaktanfragen.
                    </p>
                </Card>
            ) : (
                <ContactRequestList requests={requests} />
            )}
        </Container>
    );
}
