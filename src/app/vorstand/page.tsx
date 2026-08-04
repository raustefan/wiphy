import { Box, Card, Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Users } from "lucide-react";

const vorstand = [
  { name: "Nikolas Tomek", role: "1. Vorstandsvorsitzender" },
  { name: "Jannes Weghake", role: "2. Vorstandsvorsitzender" },
  { name: "Carsten Schäfer-Sienert", role: "Finanzen" },
  { name: "Stefan Rau", role: "Medien & IT" },
  { name: "Andreas Dietrich", role: "Schriftführer" },
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
        <Heading size={{ initial: "7", sm: "8" }} align="center" style={{ letterSpacing: "-0.03em" }}>
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
            </Flex>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}