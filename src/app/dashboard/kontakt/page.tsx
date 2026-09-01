import { Box, Callout, Card, Container, Flex, Text } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { requireAdmin } from "@/lib/server/authz";
import { getContactRequests } from "@/lib/server/services/contactService";
import { isFeatureEnabled } from "@/lib/server/services/featureFlagService";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { ContactRequestList } from "./ContactRequestList";

export const dynamic = "force-dynamic";

export default async function ContactRequestsPage() {
    await requireAdmin();

    const [requests, storageEnabled, mailEnabled] = await Promise.all([
        getContactRequests(),
        isFeatureEnabled("CONTACT_FORM_STORAGE"),
        isFeatureEnabled("CONTACT_FORM_MAIL"),
    ]);

    return (
        <Box py={{ initial: "6", sm: "8" }} style={{ minHeight: "100%" }}>
            <Container size="3" px={{ initial: "4", sm: "5" }}>
                <DashboardPageHeader
                    eyebrow="Admin"
                    title="Kontaktanfragen"
                    description="Eingegangene Nachrichten über das öffentliche Kontaktformular."
                    backHref="/dashboard"
                />

                {!storageEnabled && (
                    <Callout.Root color="amber" mb="4">
                        <Callout.Icon>
                            <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>
                            Die Speicherung neuer Anfragen ist deaktiviert. Diese Liste zeigt nur
                            noch ältere Einträge — neue Anfragen werden{" "}
                            {mailEnabled ? "ausschließlich per Mail zugestellt" : "nicht angenommen"}.
                        </Callout.Text>
                    </Callout.Root>
                )}

                {!mailEnabled && storageEnabled && (
                    <Callout.Root color="amber" mb="4">
                        <Callout.Icon>
                            <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>
                            Der Mailversand für Kontaktanfragen ist deaktiviert. Neue Anfragen
                            landen nur hier — bitte regelmäßig prüfen.
                        </Callout.Text>
                    </Callout.Root>
                )}

                {requests.length === 0 ? (
                    <Card size="3">
                        <Flex justify="center" py="6">
                            <Text size="2" color="gray">
                                Noch keine Kontaktanfragen.
                            </Text>
                        </Flex>
                    </Card>
                ) : (
                    <ContactRequestList requests={requests} />
                )}
            </Container>
        </Box>
    );
}
