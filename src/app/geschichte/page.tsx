import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { PhysicsTimeline } from "./PhysicsTimeline";

export const metadata = {
  title: "Geschichte der Physik und Wirtschaftsphysik in Ulm",
  description: "Interaktive Zeitleiste zur Physik und Wirtschaftsphysik an der Universität Ulm.",
};

export default function GeschichtePage() {
  return (
    <Box className="history-page">
      <Container size="4">
        <Flex direction="column" gap="5">
          <Box className="history-hero">
            <Text size="2" weight="bold" className="history-kicker">
              Studiengänge an der Universität Ulm
            </Text>
            <Heading size="9" mt="3" mb="4" className="history-title">
              Physik und Wirtschaftsphysik in Ulm
            </Heading>
            <Text size="5" color="gray" className="history-lede">
              Von den frühen Jahren der Universität bis zum dreifachen Jubiläum 2024:
              eine interaktive Zeitleiste über Physik, Wirtschaftsphysik und den Alumni-Verein.
            </Text>
          </Box>

          <PhysicsTimeline />
        </Flex>
      </Container>
    </Box>
  );
}
