import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import PhysicsHero from "@/components/PhysicsHero";
import { PhysicsTimeline } from "./PhysicsTimeline";

export const metadata = {
  title: "Geschichte der Physik und Wirtschaftsphysik in Ulm",
  description: "Interaktive Zeitleiste zur Physik und Wirtschaftsphysik an der Universität Ulm.",
};

export default function GeschichtePage() {
  return (
    <Box>
      {/* ---------- Hero ---------- */}
      <Box
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "18px",
          marginBottom: "40px",
          background:
            "radial-gradient(120% 120% at 50% 0%, var(--accent-4) 0%, var(--accent-3) 45%, var(--color-panel-solid) 100%)",
          border: "1px solid var(--accent-6)",
        }}
      >
        <PhysicsHero />

        <Box
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(70% 60% at 50% 45%, var(--color-background) 0%, transparent 75%)",
            opacity: 0.72,
            pointerEvents: "none",
          }}
        />

        <Container size="3" px="4" style={{ position: "relative" }}>
          <Flex
            direction="column"
            align="center"
            gap={{ initial: "4", sm: "5" }}
            py={{ initial: "7", sm: "9" }}
            style={{ textAlign: "center" }}
          >
            <Text className="eyebrow" size="2" color="blue" weight="medium">
              Seit 1960 gewachsen, seit 2004 organisiert
            </Text>

            <Heading as="h1" size={{ initial: "7", sm: "9" }} className="display-title">
              Unsere Geschichte
            </Heading>

            <Text
              size={{ initial: "2", sm: "5" }}
              color="gray"
              style={{ maxWidth: "640px", lineHeight: 1.65 }}
            >
              Von den ersten Bestrebungen für eine Universität in Ulm bis zum
              dreifachen Jubiläum 2024: eine interaktive Zeitleiste über die
              Universität Ulm, die Physik, die Wirtschaftsphysik und den
              Alumni-Verein.
            </Text>
          </Flex>
        </Container>
      </Box>

      {/* ---------- Timeline ---------- */}
      <Container size="4" px="0" mb={{ initial: "7", sm: "9" }}>
        <PhysicsTimeline />
      </Container>
    </Box>
  );
}
