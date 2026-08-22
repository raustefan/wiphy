import { redirect } from "next/navigation";
import { requireUser } from "@/lib/server/authz";
import { getFeeDashboardUsers, getDatabaseYearRange } from "@/lib/server/services/feeService";
import { Container, Card, Heading, Text, Flex, Box, Separator } from "@radix-ui/themes";
import { FeesTable } from "./FeesTable";
import type { User, MemberFee } from "@prisma/client";
import { Suspense } from "react";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { DashboardPageHeader } from "../DashboardPageHeader";

export default async function FeesDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; startYear?: string; endYear?: string }>;
}) {
  const currentUser = await requireUser();
  const isAdmin = currentUser.role === "ADMIN";
  if (!currentUser.id) redirect("/login");

  const resolvedParams = await searchParams;
  const currentYear = new Date().getFullYear();
  const { minYear, maxYear } = await getDatabaseYearRange();
  const startBound = Math.min(2020, minYear);
  const endBound = Math.max(currentYear + 2, maxYear);
  const availableYears = Array.from({ length: endBound - startBound + 1 }, (_, i) => startBound + i);

  const selectedYear = resolvedParams.year
    ? parseInt(resolvedParams.year)
    : resolvedParams.endYear
      ? parseInt(resolvedParams.endYear)
      : currentYear;

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
    aufnahmedatum: u.aufnahmedatum?.toISOString() ?? null,
    fees: u.fees.map((f) => ({
      jahr: f.jahr,
      bezahlt: f.bezahlt,
      isStudent: f.isStudent,
      beitrag: f.beitrag ?? 0,
    })),
  }));

  return (
    <Box
      py={{ initial: "6", sm: "8" }}
      style={{
        minHeight: "100%",
      }}
    >
      <Suspense fallback={null}>
        <FeatureDisabledQueryDialog />
      </Suspense>
      <Container size="4" px={{ initial: "4", sm: "5" }}>
        <DashboardPageHeader
          eyebrow="Internbereich"
          title={isAdmin ? "Zahlungsübersicht aller Mitglieder" : "Meine Mitgliedsbeiträge"}
          description={`Beiträge für ${selectedYear}`}
          backHref="/dashboard"
        />

        <Card size="3">
          <Flex
            justify="between"
            align={{ initial: "start", sm: "baseline" }}
            direction={{ initial: "column", sm: "row" }}
            gap="2"
            mb="3"
          >
            <Box>
              <Text size="2" color="gray">
                {isAdmin
                  ? "Admin-Sicht: Alle Benutzer und Jahresbeiträge"
                  : "Nur deine eigenen Beiträge, lesend"}
              </Text>
              <Heading as="h2" size="4">Jahresbeiträge {selectedYear}</Heading>
            </Box>
            <Text size="2" color="gray">
              {users.length} {users.length === 1 ? "Mitglied" : "Mitglieder"}
            </Text>
          </Flex>

          <Separator mb="3" />

          <FeesTable
            users={tableUsers}
            selectedYear={selectedYear}
            isAdmin={isAdmin}
            availableYears={availableYears}
          />
        </Card>
      </Container>
    </Box>
  );
}
