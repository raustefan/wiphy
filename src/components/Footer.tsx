import { Container, Flex, Grid, Separator, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

const columns: Array<{ heading: string; links: Array<{ href: string; label: string }> }> = [
  {
    heading: "Verein",
    links: [
      { href: "/geschichte", label: "Geschichte" },
      { href: "/vorstand", label: "Vorstand" },
      { href: "/blog", label: "Blog" },
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
      <Container size="4" px="4" py="8">
        <Grid columns={{ initial: "1", sm: "2fr 1fr 1fr 1fr" }} gap="6" mb="7">
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
        </Grid>

        <Separator size="4" />

        <Flex
          justify="between"
          align={{ initial: "start", sm: "center" }}
          direction={{ initial: "column", sm: "row" }}
          gap="3"
          pt="5"
        >
          <Text size="2" color="gray">
            © {new Date().getFullYear()} WirtschaftsPhysik Alumni e.V.
          </Text>
          {/* Signatur: die Bewegungsgleichung, die dieser Seite zugrunde liegt. */}
          <Text className="footer-signature">
            iħ ∂ψ/∂t = Ĥψ &nbsp;·&nbsp; dS = μS dt + σS dW
          </Text>
        </Flex>
      </Container>
    </footer>
  );
}
