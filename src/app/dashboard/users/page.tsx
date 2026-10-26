import { HugeiconsIcon } from "@hugeicons/react";
import { PercentIcon, UserAdd01Icon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/server/authz";
import {
  getAccountsWithFees,
  getExistingFeeYears,
  toSepaCandidates,
} from "@/lib/server/services/feeService";
import { getFeeDefaults } from "@/lib/server/services/feeDefaultService";
import { processTerminations } from "@/lib/server/services/terminationService";
import { directoryStats } from "@/lib/memberDirectory";
import { wasMemberInYear } from "@/lib/feeCalculation";
import { formatEuro } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ButtonLink, Card, Container } from "@/components/ui";
import { FeatureDisabledQueryDialog } from "@/components/FeatureDisabledQueryDialog";
import { DashboardPageHeader } from "../DashboardPageHeader";
import { FeeDefaultsCard } from "./FeeDefaultsCard";
import { DialogButton } from "./DialogButton";
import { MemberDirectory } from "./MemberDirectory";
import type { DirectoryAccount } from "./DirectoryTable";

export const metadata: Metadata = { title: "Benutzerverwaltung" };

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
  // Wählbar sind die angelegten Jahre plus genau das nächste — angelegt wird
  // über den Hinweis über der Tabelle. Ohne jede Beitragszeile: das laufende Jahr.
  const availableYears =
    existingYears.length > 0
      ? [...existingYears, existingYears[existingYears.length - 1] + 1]
      : [currentYear];

  // Nur wählbare Jahre — ein "?year=2035" darf nicht am nächsten Jahr vorbei.
  const requestedYear = Number((await searchParams).year);
  const year = availableYears.includes(requestedYear)
    ? requestedYear
    : // Voreinstellung: das laufende Jahr, sofern dafür Zeilen existieren,
      // sonst das zuletzt angelegte.
      existingYears.includes(currentYear)
      ? currentYear
      : (existingYears[existingYears.length - 1] ?? currentYear);

  const now = new Date();
  const [users, feeDefaults] = await Promise.all([
    getAccountsWithFees(admin.id, year),
    getFeeDefaults(),
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
      breakdown: {
        monthly: f.breakdown.monthly,
        months: f.breakdown.months,
        base: f.breakdown.base,
        surcharge: f.breakdown.surcharge,
      },
    })),
  }));

  const stats = directoryStats(accounts, year, now);

  // Vergangene Jahre: nur wer damals Mitglied war.
  const shownAccounts =
    year < currentYear
      ? accounts.filter(
          (a) =>
            a.inFeeYear ||
            (a.status === "HONORARY_MEMBER" &&
              wasMemberInYear(year, a.joinedAt ? new Date(a.joinedAt) : null)),
        )
      : accounts;

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
        {/* Keine Austritte: wer austritt, verschwindet samt Konto und zählt nicht mehr. */}
        <StatTile label="Letzte 365 Tage" value={`+${stats.joined}`}>
          {stats.joined === 1 ? "Eintritt" : "Eintritte"}
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
        accounts={shownAccounts}
        hiddenCount={accounts.length - shownAccounts.length}
        year={year}
        availableYears={availableYears}
        sepaCandidates={sepaCandidates}
      />
    </Container>
  );
}
