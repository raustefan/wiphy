import { requireAdmin } from "@/lib/server/authz";
import { getAllFeatureFlags } from "@/lib/server/services/featureFlagService";
import { Box, Container, Card, Flex, Text, Separator, Badge } from "@radix-ui/themes";
import { FeatureFlagToggle } from "./FeatureFlagToggle";
import { DashboardPageHeader } from "../DashboardPageHeader";

export default async function FeatureFlagsPage() {
    await requireAdmin();
    const flags = await getAllFeatureFlags();

    return (
        <Box py={{ initial: "6", sm: "8" }} style={{ minHeight: "100%" }}>
            <Container size="3" px={{ initial: "4", sm: "5" }}>
                <DashboardPageHeader
                    eyebrow="Admin"
                    title="Feature Flags"
                    description="Schalte einzelne Funktionen für alle Nutzer ein oder aus. Deaktivierte Funktionen zeigen betroffenen Nutzern einen Hinweis-Dialog an."
                    backHref="/dashboard"
                />

                <Card size="3">
                    <Flex direction="column">
                        {flags.map((flag, index) => (
                            <Box key={flag.key}>
                                {index > 0 && <Separator size="4" my="4" />}
                                <Flex justify="between" align={{ initial: "start", sm: "center" }} direction={{ initial: "column", sm: "row" }} gap="4">
                                    <Flex direction="column" gap="1" style={{ flex: 1, minWidth: 240 }}>
                                        <Flex align="center" gap="2">
                                            <Text weight="medium">{flag.label}</Text>
                                            <Badge color={flag.enabled ? "green" : "red"} variant="soft">
                                                {flag.enabled ? "Aktiv" : "Deaktiviert"}
                                            </Badge>
                                        </Flex>
                                        <Text size="2" color="gray">
                                            {flag.description}
                                        </Text>
                                    </Flex>
                                    <FeatureFlagToggle flagKey={flag.key} enabled={flag.enabled} />
                                </Flex>
                            </Box>
                        ))}
                    </Flex>
                </Card>
            </Container>
        </Box>
    );
}
