"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RotateCcw, Search } from "lucide-react";
import {
  EMPTY_FILTERS,
  filtersFromParams,
  filtersToParams,
  hasAnyFilter,
  hasFeeFilter,
  matchesFilters,
  type DirectoryFilters,
} from "@/lib/memberDirectory";
import type { SepaCandidate } from "@/lib/server/services/feeService";
import { Button, Card, Input, Select } from "@/components/ui";
import { DirectoryTable, type DirectoryAccount } from "./DirectoryTable";

function FilterSelect<K extends keyof DirectoryFilters>({
  label,
  name,
  filters,
  onChange,
  options,
}: {
  label: string;
  name: K;
  filters: DirectoryFilters;
  onChange: (name: K, value: DirectoryFilters[K]) => void;
  options: Array<[DirectoryFilters[K], string]>;
}) {
  const id = `directory-filter-${name}`;
  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="text-xs font-medium text-muted">
        {label}
      </label>
      <Select
        id={id}
        value={filters[name]}
        onChange={(e) => onChange(name, e.target.value as DirectoryFilters[K])}
        className="py-1.5"
      >
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </Select>
    </div>
  );
}

/**
 * Alle Konten in einer Tabelle, jedes genau einmal: Mitglieder,
 * Ehrenmitglieder, Konten ohne Mitgliedschaft. Suche und Filter wirken auf
 * alle Gruppen zugleich.
 */
export function MemberDirectory({
  accounts,
  year,
  availableYears,
  sepaCandidates,
}: {
  accounts: DirectoryAccount[];
  year: number;
  availableYears: number[];
  sepaCandidates: SepaCandidate[];
}) {
  const searchParams = useSearchParams();
  // Die Filter stehen auch in der Adresszeile: sie überstehen Neuladen und den
  // Weg zurück vom Profil. `replaceState` statt Router — jeder Tastendruck in
  // der Suche soll die Seite nicht neu vom Server holen.
  const [filters, setFiltersState] = useState(() => filtersFromParams(searchParams));
  function setFilters(next: DirectoryFilters) {
    setFiltersState(next);
    const params = filtersToParams(next, new URLSearchParams(window.location.search));
    window.history.replaceState(null, "", params.size ? `?${params}` : window.location.pathname);
  }

  const visible = useMemo(
    () => accounts.filter((a) => matchesFilters(a, filters, year)),
    [accounts, filters, year],
  );
  const visibleIds = useMemo(() => new Set(visible.map((a) => a.id)), [visible]);
  const filtering = hasAnyFilter(filters);

  function setFilter<K extends keyof DirectoryFilters>(name: K, value: DirectoryFilters[K]) {
    setFilters({ ...filters, [name]: value });
  }

  return (
    <Card className="grid grid-cols-1 gap-3 p-3 sm:p-5">
      <div className="relative">
        <Search
          size={14}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-faint"
        />
        <Input
          type="search"
          placeholder="Name, E-Mail oder Mitgliedsnummer…"
          value={filters.search}
          onChange={(e) => setFilter("search", e.target.value)}
          aria-label="Konten durchsuchen"
          className="pl-9"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
        <FilterSelect
          label="Rolle"
          name="role"
          filters={filters}
          onChange={setFilter}
          options={[
            ["", "Alle"],
            ["ADMIN", "Admins"],
            ["MEMBER", "Mitglieder"],
          ]}
        />
        <FilterSelect
          label="Zugang"
          name="access"
          filters={filters}
          onChange={setFilter}
          options={[
            ["", "Alle"],
            ["active", "Aktiv"],
            ["locked", "Login gesperrt"],
            ["unverified", "E-Mail unbestätigt"],
          ]}
        />
        <FilterSelect
          label="Lastschrift"
          name="sepa"
          filters={filters}
          onChange={setFilter}
          options={[
            ["", "Alle"],
            ["yes", "Mandat erteilt"],
            ["no", "Ohne Mandat"],
          ]}
        />
        <FilterSelect
          label={`Beitrag ${year}`}
          name="payment"
          filters={filters}
          onChange={setFilter}
          options={[
            ["", "Alle"],
            ["open", "Offen"],
            ["paid", "Bezahlt"],
          ]}
        />
        <FilterSelect
          label={`Tarif ${year}`}
          name="tariff"
          filters={filters}
          onChange={setFilter}
          options={[
            ["", "Alle"],
            ["student", "Sonderstatus"],
            ["regular", "Regulär"],
          ]}
        />
      </div>
      {filtering && (
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
          <span>
            <strong className="font-semibold text-foreground tabular-nums">{visible.length}</strong>{" "}
            von {accounts.length} Konten
            {hasFeeFilter(filters) && " — Beitragsfilter zeigen nur Konten mit Beitrag"}
          </span>
          <Button
            size="sm"
            variant="ghost"
            color="neutral"
            type="button"
            onClick={() => setFilters(EMPTY_FILTERS)}
          >
            <RotateCcw size={14} aria-hidden="true" />
            Filter zurücksetzen
          </Button>
        </div>
      )}
      <DirectoryTable
        users={accounts}
        visibleIds={visibleIds}
        selectedYear={year}
        availableYears={availableYears}
        sepaCandidates={sepaCandidates}
      />
    </Card>
  );
}
