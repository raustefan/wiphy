import { auth } from "@/auth";
import { Flex, Heading, Text, Button, Container, Card, Grid, Box } from "@radix-ui/themes";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth();

  return (
    <Box>
      {/* Hero Section (Großer Willkommensbereich) */}
      <Box style={{ backgroundColor: "var(--accent-3)", padding: "120px 20px", textAlign: "center", borderRadius: "var(--radius-4)", marginBottom: "60px" }}>
        <Container size="3">
          <Heading size="9" mb="4" style={{ letterSpacing: "-0.02em" }}>
            WirtschaftsPhysik Alumni e.V.
          </Heading>

          <Text size="5" color="gray" mb="6" style={{ maxWidth: "600px", margin: "0 auto", display: "block", lineHeight: "1.6" }}>
            Wir sind eine aktive Gemeinschaft, die sich für unseren Sport und Zusammenhalt einsetzt. Entdecke aktuelle Neuigkeiten in unserem Blog oder logge dich in den Mitgliederbereich ein.
          </Text>

          <Flex gap="4" justify="center">
            <Link href="/blog" style={{ textDecoration: "none" }}>
              <Button size="4" variant="solid" color="blue" style={{ cursor: "pointer" }}>
                Neuigkeiten & Blog
              </Button>
            </Link>

            <Link href={session ? "/dashboard" : "/login"} style={{ textDecoration: "none" }}>
              <Button size="4" variant="soft" color="gray" style={{ cursor: "pointer" }}>
                {session ? "Zum Dashboard" : "Mitgliederbereich"}
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>

      {/* Info-Cards (Features / Was wir machen) */}
      <Container size="4" mb="9">
        <Heading size="6" align="center" mb="6">
          Das erwartet dich bei uns
        </Heading>

        <Grid columns={{ initial: "1", md: "3" }} gap="6">
          <Card size="3" style={{ transition: "transform 0.2s" }} className="hover:-translate-y-1">
            <Heading size="4" mb="2">Gemeinschaft</Heading>
            <Text color="gray" size="2">
              Lerne neue Leute kennen und werde Teil einer starken Community, die sich gegenseitig unterstützt.
            </Text>
          </Card>

          <Card size="3" style={{ transition: "transform 0.2s" }} className="hover:-translate-y-1">
            <Heading size="4" mb="2">Veranstaltungen</Heading>
            <Text color="gray" size="2">
              Wir organisieren regelmäßig Turniere, Feiern und Ausflüge. Als Mitglied bist du immer dabei.
            </Text>
          </Card>

          <Card size="3" style={{ transition: "transform 0.2s" }} className="hover:-translate-y-1">
            <Heading size="4" mb="2">Mitgliederportal</Heading>
            <Text color="gray" size="2">
              Verwalte deine Daten, lies interne News und bleibe immer auf dem neuesten Stand.
            </Text>
          </Card>
        </Grid>
      </Container>
    </Box>
  );
}