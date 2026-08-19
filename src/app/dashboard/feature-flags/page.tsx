import { requireAdmin } from "@/lib/server/authz";
import { getAllFeatureFlags } from "@/lib/server/services/featureFlagService";
import { Box, Container, Card, Flex, Heading, Text, Separator, Badge, Button } from "@radix-ui/themes";
import { SlidersHorizontal, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FeatureFlagToggle } from "./FeatureFlagToggle";

export default async function FeatureFlagsPage() {
    await requireAdmin();
    const flags = await getAllFeatureFlags();

    return (
        <Box py={{ initial: "6", sm: "8" }} style={{ minHeight: "100%" }}>
            <Container size="3" px={{ initial: "4", sm: "5" }}>
                <Flex justify="between" align="center" mb="5" wrap="wrap" gap="3">
                    <Flex direction="column" gap="1">
                        <Flex align="center" gap="2">
                            <SlidersHorizontal size={16} color="var(--accent-9)" />
                            <Text size="2" weight="medium" color="blue">
                                Admin
                            </Text>
                        </Flex>
                        <Heading size={{ initial: "6", sm: "7" }}>Feature Flags</Heading>
                        <Text size="2" color="gray" style={{ maxWidth: 640 }}>
                            Schalte einzelne Funktionen für alle Nutzer ein oder aus. Deaktivierte
                            Funktionen zeigen betroffenen Nutzern einen Hinweis-Dialog an.
                        </Text>
                    </Flex>
                    <Button variant="soft" color="gray" asChild>
                        <Link href="/dashboard">
                            <ArrowLeft size={14} /> Zurück zum Dashboard
                        </Link>
                    </Button>
                </Flex>

                <Card size="3">
                    <Flex direction="column">
                        {flags.map((flag, index) => (
                            <Box key={flag.key}>
                                {index > 0 && <Separator size="4" my="4" />}
                                <Flex justify="between" align="center" gap="4" wrap="wrap">
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
