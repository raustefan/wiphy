import { auth } from "@/auth";
import { Flex, Button, Container, DropdownMenu, IconButton } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image"; // Next.js Image Komponente für Performance
import { Menu } from "lucide-react";
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

                    {/* Navigation (Desktop) */}
                    <Flex className="site-nav" gap="4" align="center" display={{ initial: "none", sm: "flex" }}>
                        <Link href="/blog" style={{ textDecoration: "none", color: "var(--gray-11)", fontWeight: 500 }}>
                            Blog
                        </Link>
                        <Link href="/geschichte" style={{ textDecoration: "none", color: "var(--gray-11)", fontWeight: 500 }}>
                            Geschichte
                        </Link>
                        <Link href="/vorstand" style={{ textDecoration: "none", color: "var(--gray-11)", fontWeight: 500 }}>
                            Vorstand
                        </Link>
                        <Button color="ruby" variant="soft" asChild>
                            <Link href={session ? "/dashboard" : "/login"}>
                                {session ? "Dashboard" : "Mitgliederbereich"}
                            </Link>
                        </Button>
                        <ThemeToggle />
                    </Flex>

                    {/* Navigation (Mobil) */}
                    <Flex gap="2" align="center" display={{ initial: "flex", sm: "none" }}>
                        <ThemeToggle />
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <IconButton variant="soft" aria-label="Menü öffnen">
                                    <Menu size={18} />
                                </IconButton>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content align="end">
                                <DropdownMenu.Item asChild>
                                    <Link href="/blog">Blog</Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item asChild>
                                    <Link href="/geschichte">Geschichte</Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item asChild>
                                    <Link href="/vorstand">Vorstand</Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator />
                                <DropdownMenu.Item asChild>
                                    <Link href={session ? "/dashboard" : "/login"}>
                                        {session ? "Dashboard" : "Mitgliederbereich"}
                                    </Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </Flex>

                </Flex>
            </Container>
        </header>
    );
}
