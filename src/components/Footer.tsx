import { Container, Flex, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

const columns: Array<{ heading: string; links: Array<{ href: string; label: string }> }> = [
  {
    heading: "Verein",
    links: [
      { href: "/geschichte", label: "Geschichte" },
      { href: "/vorstand", label: "Vorstand" },
      { href: "/blog", label: "Blog" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    heading: "Mitglieder",
    links: [
      { href: "/login", label: "Anmelden" },
      { href: "/register", label: "Mitglied werden" },
      { href: "/forgot-password", label: "Passwort vergessen" },
    ],
  },
  {
    heading: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container size="4" px="0" py={{ initial: "6", sm: "8" }}>
        <div className="footer-grid">
          <Flex direction="column" gap="3" align="start">
            <Image
              src="/logo-plain.png"
              alt="WirtschaftsPhysik Alumni e.V."
              width={64}
              height={34}
              style={{ objectFit: "contain" }}
            />
            <Text size="2" color="gray" style={{ maxWidth: 320, lineHeight: 1.7 }}>
              Gemeinnütziger Verein für Physik- und Wirtschaftsphysik-Alumni
              sowie Studierende der Universität Ulm.
            </Text>
          </Flex>

          {columns.map((column) => (
            <Flex key={column.heading} direction="column" gap="2">
              <Text className="footer-heading">{column.heading}</Text>
              {column.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </Flex>
          ))}
        </div>

        <Separator size="4" mt="6" />

        <Flex pt="5">
          <Text size="2" color="gray">
            © {new Date().getFullYear()} WirtschaftsPhysik Alumni e.V.
          </Text>
        </Flex>
      </Container>
    </footer>
  );
}
