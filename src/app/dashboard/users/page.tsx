import { HugeiconsIcon } from "@hugeicons/react";
import { ArchiveIcon, PercentIcon, UserAdd01Icon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/server/authz";
import {
  getAccountsWithFees,
  getArchivedFees,
  getExistingFeeYears,
  toSepaCandidates,
} from "@/lib/server/services/feeService";
import { getFeeDefaults } from "@/lib/server/services/feeDefaultService";
import {
  countCompletedTerminationsSince,
  processTerminations,
} from "@/lib/server/services/terminationService";
import { directoryStats } from "@/lib/memberDirectory";
import { formatDate, formatEuro } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Badge, ButtonLink, Card, Container } from "@/components/ui";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { FeeDefaultsCard } from "./FeeDefaultsCard";
import { DialogButton } from "./DialogButton";
import { MemberDirectory } from "./MemberDirectory";
import type { DirectoryAccount } from "./DirectoryTable";

export const metadata: Metadata = { title: "Benutzerverwaltung" };

const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

function StatTile({
  label,
  value,
  className,
  children,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Card className={cn("grid content-start gap-1 p-4", className)}>
      <p className="text-sm text-muted">{label}</p>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      {children && <div className="text-xs leading-relaxed text-muted">{children}</div>}
    </Card>
  );
}

export default async function UserManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const admin = await requireAdmin();
  // Huckepack wie auf dem Dashboard: fällige Austritte vor dem Zählen vollziehen.
  await processTerminations();

  const currentYear = new Date().getFullYear();
  const existingYears = await getExistingFeeYears();
  // Ohne jede Beitragszeile gäbe es nichts auszuwählen — dann bleibt das
  // laufende Jahr als einziger Eintrag stehen.
  const yearOptions = existingYears.length > 0 ? existingYears : [currentYear];

  // Gleiche Grenzen wie in den Fee-Schemas — ein "?year=0" darf die Seite nicht
  // auf ein sinnloses Jahr stellen.
  const requestedYear = Number((await searchParams).year);
  const year =
    Number.isInteger(requestedYear) && requestedYear >= 2000 && requestedYear <= 2100
      ? requestedYear
      : // Voreinstellung: das laufende Jahr, sofern dafür Zeilen existieren,
        // sonst das zuletzt angelegte.
        yearOptions.includes(currentYear)
        ? currentYear
        : yearOptions[yearOptions.length - 1];
  // Ein per Link übergebenes Jahr ohne Zeilen bleibt wählbar, sonst zeigte der
  // Selektor etwas anderes an als die Tabelle.
  const availableYears = yearOptions.includes(year)
    ? yearOptions
    : [...yearOptions, year].sort((a, b) => a - b);

  const now = new Date();
  const [users, feeDefaults, archivedFees, exits] = await Promise.all([
    getAccountsWithFees(admin.id, year),
    getFeeDefaults(),
    getArchivedFees(),
    countCompletedTerminationsSince(new Date(now.getTime() - YEAR_MS)),
  ]);

  const sepaCandidates = toSepaCandidates(
    users.filter((u) => u.inFeeYear),
    year,
  );

  // Nur was die Tabellen zeigen — Bankdaten und Profilfelder bleiben auf dem Server.
  const accounts: DirectoryAccount[] = users.map((u) => ({
    id: u.id,
    name: u.lastName,
    firstName: u.firstName,
    email: u.email,
    memberNumber: u.memberNumber,
    adminNote: u.adminNote,
    joinedAt: u.joinedAt?.toISOString() ?? null,
    directDebit: u.directDebit,
    studentYears: u.studentYears,
    role: u.role,
    status: u.status,
    emailVerified: u.emailVerified,
    loginDisabled: u.loginDisabled,
    lastLoginAt: u.lastLoginAt.toISOString(),
    inFeeYear: u.inFeeYear,
    fees: u.fees.map((f) => ({
      year: f.year,
      paid: f.paid,
      isStudent: f.isStudent,
      amount: f.amount,
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

  const stats = directoryStats(accounts, year, now);

  // Archivzeilen je gelöschtem Konto bündeln — mehr als Name und Nummer ist
  // davon nicht übrig (Datenminimierung), also sind beide zusammen der Schlüssel.
  const archiveGroups = [
    ...Map.groupBy(archivedFees, (fee) => `${fee.archivedName ?? ""}\u0000${fee.archivedMemberNumber ?? ""}`),
  ].map(([key, fees]) => ({
    key,
    name: fees[0].archivedName,
    memberNumber: fees[0].archivedMemberNumber,
    fees: fees.toSorted((a, b) => b.year - a.year),
  }));
  const paidShare = stats.feeDue > 0 ? Math.round((stats.feePaid / stats.feeDue) * 100) : 0;

  return (
    <Container size="4" className="py-8 sm:py-12">
      <Suspense fallback={null}>
        <FeatureDisabledQueryDialog />
      </Suspense>

      <DashboardPageHeader
        eyebrow="Internbereich"
        title="Benutzerverwaltung"
        description={`Alle Konten mit Mitgliedschaft, Zugang und Beiträgen ${year}.`}
        backHref="/dashboard"
      >
        <div className="flex flex-wrap gap-2">
          <DialogButton
            label="Beitragssätze"
            icon={<HugeiconsIcon icon={PercentIcon} size={16} aria-hidden="true" />}
            title="Beitragssätze"
            description="Monatliche Standardsätze je Jahr. Sie gelten für alle Beiträge, die nicht als Ausnahme festgelegt sind."
          >
            <FeeDefaultsCard
              defaults={feeDefaults.map((d) => ({
                year: d.year,
                regular: d.regular,
                student: d.student,
              }))}
            />
          </DialogButton>
          {/* Gesperrte Aufzeichnungen (Art. 18 DSGVO, § 147 AO): nur lesen. */}
          {archivedFees.length > 0 && (
            <DialogButton
              label={`Archiv (${archivedFees.length})`}
              icon={<HugeiconsIcon icon={ArchiveIcon} size={16} aria-hidden="true" />}
              title="Archiv gelöschter Konten"
              description="Beitragszeilen gelöschter Konten. Sie bleiben wegen der steuerlichen Aufbewahrungspflicht zehn Jahre nach dem Beitragsjahr gesperrt erhalten und werden danach automatisch gelöscht."
            >
              <div className="grid max-h-96 gap-2 overflow-auto">
                {archiveGroups.map((group) => {
                  const open = group.fees.filter((fee) => !fee.paid).length;
                  return (
                    <details key={group.key} className="rounded-[3px] border border-line">
                      <summary className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm">
                        <span className="min-w-0 flex-1 truncate font-medium">{group.name ?? "—"}</span>
                        <span className="font-mono text-muted tabular-nums">
                          Nr. {group.memberNumber ?? "—"}
                        </span>
                        <Badge>
                          {group.fees.length} {group.fees.length === 1 ? "Eintrag" : "Einträge"}
                        </Badge>
                        {open > 0 && <Badge tone="negative">{open} offen</Badge>}
                      </summary>
                      <table className="w-full text-sm">
                        <thead className="text-left text-muted">
                          <tr>
                            <th className="py-1 pr-3 pl-3 font-medium">Jahr</th>
                            <th className="py-1 pr-3 text-right font-medium">Beitrag</th>
                            <th className="py-1 pr-3 font-medium">Status</th>
                            <th className="py-1 pr-3 font-medium">Archiviert</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {group.fees.map((fee) => (
                            <tr key={fee.id}>
                              <td className="py-1.5 pr-3 pl-3 tabular-nums">{fee.year}</td>
                              <td className="py-1.5 pr-3 text-right tabular-nums">
                                {formatEuro(fee.amount)}
                              </td>
                              <td className="py-1.5 pr-3">{fee.paid ? "Bezahlt" : "Offen"}</td>
                              <td className="py-1.5 pr-3">{formatDate(fee.archivedAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </details>
                  );
                })}
              </div>
            </DialogButton>
          )}
          <ButtonLink href="/dashboard/users/new">
            <HugeiconsIcon icon={UserAdd01Icon} size={16} aria-hidden="true" />
            Neues Konto
          </ButtonLink>
        </div>
      </DashboardPageHeader>

      <section
        aria-label="Kennzahlen"
        className="mb-4 grid grid-cols-2 gap-3 sm:mb-6 sm:gap-4 lg:grid-cols-5"
      >
        <StatTile label="Konten" value={stats.total}>
          {stats.admins} {stats.admins === 1 ? "Admin" : "Admins"} ·{" "}
          {stats.total - stats.admins} Nutzer
        </StatTile>
        <StatTile label="Ordentliche Mitglieder" value={stats.regular}>
          {stats.honorary} Ehrenmitglieder · {stats.none} ohne Mitgliedschaft
        </StatTile>
        <StatTile label={`Sonderstatus ${year}`} value={stats.students}>
          Studierende u. a. nach § 5
        </StatTile>
        <StatTile label="Letzte 365 Tage" value={`+${stats.joined} / −${exits}`}>
          {stats.joined} {stats.joined === 1 ? "Eintritt" : "Eintritte"} · {exits}{" "}
          {exits === 1 ? "Austritt" : "Austritte"}
        </StatTile>
        <StatTile
          label={`Beiträge ${year}`}
          value={formatEuro(stats.feePaid)}
          className="col-span-2 lg:col-span-1"
        >
          von {formatEuro(stats.feeDue)} · offen {formatEuro(stats.feeDue - stats.feePaid)}
          <div
            className="mt-1.5 h-1.5 overflow-hidden rounded-[3px] bg-raised"
            role="img"
            aria-label={`${paidShare} % bezahlt`}
          >
            <div className="h-full rounded-[3px] bg-positive" style={{ width: `${paidShare}%` }} />
          </div>
        </StatTile>
      </section>

      <MemberDirectory
        accounts={accounts}
        year={year}
        availableYears={availableYears}
        sepaCandidates={sepaCandidates}
      />
    </Container>
  );
}
