import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/server/authz";
import {
  getArchivedFees,
  getFeeDashboardData,
  getExistingFeeYears,
} from "@/lib/server/services/feeService";
import { formatDate, formatEuro } from "@/lib/format";
import { getFeeDefaults } from "@/lib/server/services/feeDefaultService";
import { Card, Container, Separator } from "@/components/ui";
import { FeesTable } from "./FeesTable";
import { FeeDefaultsCard } from "./FeeDefaultsCard";
import { Suspense } from "react";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { DashboardPageHeader } from "../DashboardPageHeader";

export const metadata: Metadata = { title: "Beiträge" };

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
  const archivedFees = isAdmin ? await getArchivedFees() : [];

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

      {/* Gesperrte Aufzeichnungen (Art. 18 DSGVO, § 147 AO): nur lesen, nichts
          ändern — deshalb eine schlichte Tabelle statt der bearbeitbaren oben. */}
      {archivedFees.length > 0 && (
        <Card className="mt-4 p-4 sm:mt-6 sm:p-6">
          <details>
            <summary className="cursor-pointer font-semibold">
              Archiv gelöschter Konten ({archivedFees.length} Beitragszeilen)
            </summary>
            <p className="mt-2 text-sm text-muted text-pretty">
              Beitragszeilen von Konten, die gelöscht wurden. Sie bleiben wegen der steuerlichen
              Aufbewahrungspflicht zehn Jahre nach dem Beitragsjahr gesperrt erhalten und werden
              danach automatisch gelöscht.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead className="text-left text-muted">
                  <tr>
                    <th className="py-1 pr-3 font-medium">Name</th>
                    <th className="py-1 pr-3 font-medium">Nr.</th>
                    <th className="py-1 pr-3 font-medium">Jahr</th>
                    <th className="py-1 pr-3 text-right font-medium">Beitrag</th>
                    <th className="py-1 pr-3 font-medium">Status</th>
                    <th className="py-1 font-medium">Archiviert</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {archivedFees.map((fee) => (
                    <tr key={fee.id}>
                      <td className="py-1.5 pr-3">{fee.archivName ?? "—"}</td>
                      <td className="py-1.5 pr-3 tabular-nums">{fee.archivMitgliedId ?? "—"}</td>
                      <td className="py-1.5 pr-3 tabular-nums">{fee.jahr}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">
                        {formatEuro(fee.beitrag)}
                      </td>
                      <td className="py-1.5 pr-3">{fee.bezahlt ? "Bezahlt" : "Offen"}</td>
                      <td className="py-1.5">{formatDate(fee.archivedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </Card>
      )}
    </Container>
  );
}
