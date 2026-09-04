import { redirect } from "next/navigation";
import { requireUser } from "@/lib/server/authz";
import { getFeeDashboardData, getExistingFeeYears } from "@/lib/server/services/feeService";
import { getFeeDefaults } from "@/lib/server/services/feeDefaultService";
import { Card, Container, Separator } from "@/components/ui";
import { FeesTable } from "./FeesTable";
import { FeeDefaultsCard } from "./FeeDefaultsCard";
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
  const existingYears = await getExistingFeeYears();

  // Ohne jede Beitragszeile gäbe es nichts auszuwählen — dann bleibt das
  // laufende Jahr als einziger Eintrag stehen.
  const yearOptions = existingYears.length > 0 ? existingYears : [currentYear];

  // Gleiche Grenzen wie in den Fee-Schemas — ein "?year=0" darf die Seite nicht
  // auf ein sinnloses Jahr stellen.
  const requestedYear = Number(resolvedParams.year ?? resolvedParams.endYear);
  const hasValidRequest =
    Number.isInteger(requestedYear) && requestedYear >= 2000 && requestedYear <= 2100;
  const selectedYear = hasValidRequest
    ? requestedYear
    : // Voreinstellung: das laufende Jahr, sofern dafür Zeilen existieren,
      // sonst das zuletzt angelegte.
      (yearOptions.includes(currentYear) ? currentYear : yearOptions[yearOptions.length - 1]);

  // Ein per Link übergebenes Jahr ohne Zeilen bleibt wählbar, sonst zeigte der
  // Selektor etwas anderes an als die Tabelle darunter.
  const availableYears = yearOptions.includes(selectedYear)
    ? yearOptions
    : [...yearOptions, selectedYear].sort((a, b) => a - b);

  const users = await getFeeDashboardData(currentUser.id, currentUser.role, selectedYear);
  const feeDefaults = isAdmin ? await getFeeDefaults() : [];

  const tableUsers = users.map((u) => ({
    id: u.id,
    name: u.name,
    vorname: u.vorname,
    email: u.email,
    mitgliedId: u.mitgliedId,
    zahlungsKommentar: u.zahlungsKommentar,
    aufnahmedatum: u.aufnahmedatum?.toISOString() ?? null,
    bankeinzug: u.bankeinzug ?? false,
    studentYears: u.studentYears,
    fees: u.fees.map((f) => ({
      jahr: f.jahr,
      bezahlt: f.bezahlt,
      isStudent: f.isStudent,
      beitrag: f.beitrag,
      standard: f.standard,
      manuell: f.manuell,
      angelegt: f.angelegt,
      breakdown: {
        monthly: f.breakdown.monthly,
        months: f.breakdown.months,
        base: f.breakdown.base,
        surcharge: f.breakdown.surcharge,
      },
    })),
  }));

  return (
    <Container size="4" className="py-8 sm:py-12">
      <Suspense fallback={null}>
        <FeatureDisabledQueryDialog />
      </Suspense>

      <DashboardPageHeader
        eyebrow="Internbereich"
        title={isAdmin ? "Zahlungsübersicht der ordentlichen Mitglieder" : "Meine Mitgliedsbeiträge"}
        description={`Beiträge für ${selectedYear}`}
        backHref="/dashboard"
      />

      {isAdmin && (
        <Card className="mb-4 p-4 sm:mb-6 sm:p-6">
          <FeeDefaultsCard
            defaults={feeDefaults.map((d) => ({
              jahr: d.jahr,
              regular: d.regular,
              student: d.student,
            }))}
          />
        </Card>
      )}

      <Card className="p-4 sm:p-6">
        <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
          <div>
            <p className="text-sm text-muted">
              {isAdmin
                ? "Admin-Sicht: beitragspflichtige Mitglieder; Beträge folgen automatisch den Standardsätzen"
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
