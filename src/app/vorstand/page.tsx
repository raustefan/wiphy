import { Card, Container, Flex, Heading, Separator, Text } from "@radix-ui/themes";

const vorstand = [
  { name: "Nikolas Tomek", role: "1. Vorstandsvorsitzender" },
  { name: "Jannes Weghake", role: "2. Vorstandsvorsitzender" },
  { name: "Carsten Schäfer-Sienert", role: "Finanzen" },
  { name: "Stefan Rau", role: "Medien & IT" },
  { name: "Andreas Dietrich", role: "Schriftführer" },
  { name: "André Knoll", role: "Fachschaftsbotschafter" },
];

export default function VorstandPage() {
  return (
    <Container size="2" mt="7" mb="7">
      <Card size="4">
        <Heading size="6" mb="2">
          Vorstand
        </Heading>
        <Text size="2" color="gray">
          Aktuelle Besetzung des Vorstands
        </Text>

        <Separator my="4" size="4" />

        <Flex direction="column" gap="4">
          {vorstand.map((entry) => (
            <Flex key={entry.name} direction="column" gap="1">
              <Text weight="bold">{entry.name}</Text>
              <Text color="gray">{entry.role}</Text>
            </Flex>
          ))}
        </Flex>
      </Card>
    </Container>
  );
}

