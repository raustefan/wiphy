import { Flex, Text, Container } from "@radix-ui/themes";
import Link from "next/link";

export default function Footer() {
    return (
        <footer style={{ borderTop: "1px solid var(--gray-5)", padding: "32px 0", marginTop: "auto" }}>
            <Container size="4">
                <Flex direction="column" align="center" gap="2">
                    <Text size="2" style={{ color: "var(--gray-11)" }}>
                        © {new Date().getFullYear()} WirtschaftsPhysik Alumni e.V.
                    </Text>
                    <Flex gap="4">
                        <Link href="/impressum" style={{ textDecoration: "none", color: "var(--gray-12)", fontSize: "14px" }}>
                            Impressum
                        </Link>
                        <Link href="/datenschutz" style={{ textDecoration: "none", color: "var(--gray-12)", fontSize: "14px" }}>
                            Datenschutz
                        </Link>
                    </Flex>
                </Flex>
            </Container>
        </footer>
    );
}