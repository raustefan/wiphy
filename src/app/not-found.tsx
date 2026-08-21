import { Container, Flex, Heading, Text, Button } from "@radix-ui/themes";
import Link from "next/link";

export default function NotFound() {
    return (
        <Container size="1" style={{ paddingTop: "12vh", paddingBottom: "8vh" }}>
            <Flex direction="column" gap="4" align="center">
                <Heading as="h1" size="8" align="center">
                    Seite nicht gefunden
                </Heading>
                <Text size="3" color="gray" align="center">
                    Die aufgerufene Seite existiert nicht oder wurde verschoben.
                </Text>
                <Button size="3" asChild>
                    <Link href="/">Zurück zur Startseite</Link>
                </Button>
            </Flex>
        </Container>
    );
}
