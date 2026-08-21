import { Box, Card, Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Users } from "lucide-react";

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--accent-9)" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const vorstand = [
  {
    name: "Nikolas Tomek",
    role: "1. Vorstandsvorsitzender",
    linkedin: "https://www.linkedin.com/in/nikolas-tomek/",
  },
  {
    name: "Jannes Weghake",
    role: "2. Vorstandsvorsitzender",
    linkedin: "https://www.linkedin.com/in/jannes-weghake-317b95274/",
  },
  {
    name: "Carsten Schäfer-Siebert",
    role: "Finanzen",
    linkedin: "https://www.linkedin.com/in/carsten-sch%C3%A4fer-siebert/",
  },
  {
    name: "Stefan Rau",
    role: "Medien & IT",
    linkedin: "https://www.linkedin.com/in/stefan-rau-91243721a/",
  },
  {
    name: "Andreas Dietrich",
    role: "Schriftführer",
    linkedin: "https://www.linkedin.com/in/andreas-dietrich-3934282a6/",
  },
  { name: "André Knoll", role: "Fachschaftsbotschafter" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function VorstandPage() {
  return (
    <Container size="3" px="4" py={{ initial: "6", sm: "8" }}>
      <Flex direction="column" align="center" gap="2" mb={{ initial: "6", sm: "7" }}>
        <Flex align="center" gap="2">
          <Users size={16} color="var(--accent-9)" />
          <Text size="2" weight="medium" color="blue">
            Der Verein
          </Text>
        </Flex>
        <Heading as="h1" size={{ initial: "7", sm: "8" }} align="center" style={{ letterSpacing: "-0.03em" }}>
          Vorstand
        </Heading>
        <Text size="3" color="gray" align="center" style={{ maxWidth: 480 }}>
          Aktuelle Besetzung des Vorstands
        </Text>
      </Flex>

      <Grid columns={{ initial: "1", xs: "2", sm: "3" }} gap="4">
        {vorstand.map((entry) => (
          <Card key={entry.name} size="3" className="feature-card">
            <Flex direction="column" align="center" gap="3" py="2" style={{ textAlign: "center" }}>
              <Flex
                align="center"
                justify="center"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "var(--accent-4)",
                  color: "var(--accent-11)",
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                {getInitials(entry.name)}
              </Flex>
              <Box>
                <Text weight="bold" size="3">
                  {entry.name}
                </Text>
                <Text as="p" color="gray" size="2" mt="1">
                  {entry.role}
                </Text>
              </Box>
              {entry.linkedin && (
                <a href={entry.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${entry.name} auf LinkedIn`}>
                  <LinkedinIcon />
                </a>
              )}
            </Flex>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}