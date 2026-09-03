import { redirect } from "next/navigation";
import { requireUser } from "@/lib/server/authz";
import { getFeeDashboardUsers, getDatabaseYearRange } from "@/lib/server/services/feeService";
import { Card, Container, Separator } from "@/components/ui";
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
    <Container size="4" className="py-8 sm:py-12">
      <Suspense fallback={null}>
        <FeatureDisabledQueryDialog />
      </Suspense>

      <DashboardPageHeader
        eyebrow="Internbereich"
        title={isAdmin ? "Zahlungsübersicht aller Mitglieder" : "Meine Mitgliedsbeiträge"}
        description={`Beiträge für ${selectedYear}`}
        backHref="/dashboard"
      />

      <Card className="p-4 sm:p-6">
        <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
          <div>
            <p className="text-sm text-muted">
              {isAdmin
                ? "Admin-Sicht: Alle Benutzer und Jahresbeiträge"
                : "Nur deine eigenen Beiträge, lesend"}
            </p>
            <h2 className="text-lg font-bold tracking-tight">
              Jahresbeiträge {selectedYear}
            </h2>
          </div>
          <p className="text-sm text-muted">
            {users.length} {users.length === 1 ? "Mitglied" : "Mitglieder"}
          </p>
        </div>

        <Separator className="mb-3" />

        <FeesTable
          users={tableUsers}
          selectedYear={selectedYear}
          isAdmin={isAdmin}
          availableYears={availableYears}
        />
      </Card>
    </Container>
  );
}
