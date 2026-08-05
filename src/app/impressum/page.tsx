import { Container, Heading, Text, Flex, Button, Separator } from "@radix-ui/themes";
import Link from "next/link";

export default function ImpressumPage() {
    return (
        <Container size="3" mt="6" mb="9">
            <Flex justify="between" mb="6" align="center">
                <Heading size="8">Impressum</Heading>
                <Link href="/">
                    <Button variant="soft">← Zurück zur Startseite</Button>
                </Link>
            </Flex>

            <Flex direction="column" gap="4">
                <Text size="4" weight="bold">
                    Wirtschaftsphysik Alumni e.V.
                </Text>
                <Text as="div" color="gray" size="3" style={{ lineHeight: 1.7 }}>
                    c/o Universität Ulm
                    <br />
                    Studienkommission Physik
                    <br />
                    Albert-Einstein-Allee 11
                    <br />
                    D – 89081 Ulm
                </Text>

                <Text as="div" color="gray" size="3" style={{ lineHeight: 1.7 }}>
                    E-Mail:{" "}
                    <a href="mailto:info@wirtschaftsphysik.de">
                        info@wirtschaftsphysik.de
                    </a>
                    <br />
                </Text>

                <Separator size="4" my="2" />

                <Text size="4" weight="bold">
                    Vertretungsberechtigter Vorstand
                </Text>
                <Text as="div" color="gray" size="3" style={{ lineHeight: 1.7 }}>
                    Nikolas Tomek (1. Vorsitzender)
                    <br />
                    Jannes Weghake (2. Vorsitzender)
                </Text>

                <Separator size="4" my="2" />

                <Text as="div" color="gray" size="3" style={{ lineHeight: 1.7 }}>
                    Registergericht: Amtsgericht Ulm
                    <br />
                    Registernummer: VR 1891
                </Text>

                <Separator size="4" my="2" />

                <Text size="4" weight="bold">
                    Bankverbindung
                </Text>
                <Text as="div" color="gray" size="3" style={{ lineHeight: 1.7 }}>
                    Kontoinhaber: Wirtschaftsphysik Alumni e.V.
                    <br />
                    IBAN: DE23 6305 0000 0021 0300 28
                    <br />
                    BIC: SOLADES1ULM
                    <br />
                    Institut: Sparkasse Ulm
                </Text>

                <Separator size="4" my="2" />

                <Text as="div" color="gray" size="3" style={{ lineHeight: 1.7 }}>
                    Homepage gestaltet von: Stefan Rau
                </Text>

                <Separator size="4" my="2" />

                <Text size="4" weight="bold">
                    Haftungshinweis
                </Text>
                <Text as="div" color="gray" size="3" style={{ lineHeight: 1.7 }}>
                    Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
                    Haftung für die Inhalte externer Links. Für den Inhalt der
                    verlinkten Seiten sind ausschließlich deren Betreiber
                    verantwortlich. Des Weiteren distanzieren wir uns von sämtlichen
                    schriftlichen Äußerungen der Vereinsmitglieder, die nicht dem
                    Vorstand angehören.
                </Text>
            </Flex>
        </Container>
    );
}