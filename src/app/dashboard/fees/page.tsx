import { redirect } from "next/navigation";
import { requireUser } from "@/lib/server/authz";
import { getFeeDashboardUsers, getFeeYears } from "@/lib/server/services/feeService";
import { Container, Card, Heading, Text, Flex, Box, Separator, Button } from "@radix-ui/themes";
import Link from "next/link";
import { FeesTable } from "./FeesTable";
import type { User, MemberFee } from "@prisma/client";

export default async function FeesDashboardPage() {
  const currentUser = await requireUser();
  const isAdmin = currentUser.role === "ADMIN";
  if (!currentUser.id) redirect("/login");
  const years = getFeeYears(2024);
  const users = (await getFeeDashboardUsers(currentUser.id, currentUser.role)) as Array<
    User & { fees: MemberFee[] }
  >;

  const tableUsers = users.map((u) => ({
    id: u.id,
    name: u.name,
    vorname: u.vorname,
    email: u.email,
    mitgliedId: u.mitgliedId,
    zahlungsKommentar: u.zahlungsKommentar,
    fees: u.fees.map((f) => ({ jahr: f.jahr, bezahlt: f.bezahlt })),
  }));

  return (
    <Box
      py="5"
      style={{
        minHeight: "100%",
      }}
    >
      <Container size="4">
        <Flex justify="between" align="center" mb="4">
          <Box>
            <Text size="2" color="gray">
              Internbereich
            </Text>
            <Heading size="6">
              {isAdmin ? "Zahlungsübersicht aller Mitglieder" : "Meine Mitgliedsbeiträge"}
            </Heading>
            <Text size="2" color="gray">
              Jahre ab {years[0] ?? 2024}
            </Text>
          </Box>
          <Link href="/dashboard">
            <Button variant="soft">Zurück zum Dashboard</Button>
          </Link>
        </Flex>

        <Card size="3">
          <Flex justify="between" align="baseline" mb="3">
            <Box>
              <Text size="2" color="gray">
                {isAdmin
                  ? "Admin-Sicht: Alle Benutzer und Jahresbeiträge"
                  : "Nur deine eigenen Beiträge, lesend"}
              </Text>
              <Heading size="4">Jahresbeiträge</Heading>
            </Box>
            <Text size="2" color="gray">
              {users.length} {users.length === 1 ? "Mitglied" : "Mitglieder"}
            </Text>
          </Flex>

          <Separator mb="3" />

          <FeesTable users={tableUsers} years={years} isAdmin={isAdmin} />
        </Card>
      </Container>
    </Box>
  );
}
