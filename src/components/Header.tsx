import { auth } from "@/auth";
import { Flex, Button, Container } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image"; // Next.js Image Komponente für Performance
import ThemeToggle from "@/components/ThemeToggle";

export default async function Header() {
    const session = await auth();

    return (
        <header style={{
            borderBottom: "1px solid var(--gray-5)",
            padding: "16px 0",
            backgroundColor: "var(--color-background)"
        }}>
            <Container size="4">
                <Flex justify="between" align="center" px="4">

                    {/* Logo (Klickbar zur Startseite) */}
                    <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                        <Image
                            src="/logo-plain.png" // Hier sucht er automatisch im public/ Ordner
                            alt="wiphy Logo"
                            width={60}     // Passe die Breite an dein Logo an
                            height={20}     // Passe die Höhe an dein Logo an
                            style={{ objectFit: "contain" }}
                            priority        // Lädt das Logo sofort (ohne Lazy Loading)
                        />
                    </Link>

                    {/* Navigation */}
                    <Flex gap={{ initial: "2", md: "4" }} align="center" wrap="wrap" justify="end">
                        <Link href="/blog" style={{ textDecoration: "none", color: "var(--gray-11)", fontWeight: 500 }}>
                            Blog
                        </Link>
                        <Link href="/geschichte" style={{ textDecoration: "none", color: "var(--gray-11)", fontWeight: 500 }}>
                            Geschichte
                        </Link>
                        <Link href="/vorstand" style={{ textDecoration: "none", color: "var(--gray-11)", fontWeight: 500 }}>
                            Vorstand
                        </Link>
                        <Link href={session ? "/dashboard" : "/login"}>
                            {/* Hier nutzen wir "ruby" für deinen zweiten Button (Beere) */}
                            <Button color="ruby" variant="soft" style={{ cursor: "pointer" }}>
                                {session ? "Dashboard" : "Mitgliederbereich"}
                            </Button>
                        </Link>
                        <ThemeToggle />
                    </Flex>

                </Flex>
            </Container>
        </header>
    );
}
