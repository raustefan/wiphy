import { Flex, Text, Container } from "@radix-ui/themes";
import Link from "next/link";

export default function Footer() {
    return (
        <footer style={{ borderTop: "1px solid var(--gray-5)", padding: "32px 0", marginTop: "auto" }}>
            <Container size="4">
                <Flex direction="column" align="center" gap="2">
                    <Text size="2" color="gray">
                        © {new Date().getFullYear()} wiphy - Vereinswebsite
                    </Text>
                    <Flex gap="4">
                        <Link href="#" style={{ textDecoration: "none", color: "var(--gray-10)", fontSize: "14px" }}>
                            Impressum
                        </Link>
                        <Link href="#" style={{ textDecoration: "none", color: "var(--gray-10)", fontSize: "14px" }}>
                            Datenschutz
                        </Link>
                    </Flex>
                </Flex>
            </Container>
        </footer>
    );
}