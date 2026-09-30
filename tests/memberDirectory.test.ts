import assert from "node:assert/strict";
import test from "node:test";
import {
  EMPTY_FILTERS,
  directoryStats,
  filtersFromParams,
  filtersToParams,
  groupAccounts,
  matchesFilters,
  type DirectoryAccountBase,
} from "../src/lib/memberDirectory";

function account(overrides: Partial<DirectoryAccountBase & { aufnahmedatum: Date | null }>) {
  return {
    vorname: "Erika",
    name: "Muster",
    email: "erika@example.org",
    mitgliedId: 7,
    role: "MEMBER",
    status: "ORDENTLICHES_MITGLIED",
    emailVerified: true,
    loginDisabled: false,
    bankeinzug: true,
    inFeeYear: true,
    fees: [{ jahr: 2026, bezahlt: false, isStudent: true, beitrag: 30 }],
    aufnahmedatum: new Date("2020-01-01T00:00:00Z"),
    ...overrides,
  };
}

const member = account({});
const leftThisYear = account({
  vorname: "Max",
  status: "KEIN_MITGLIED",
  fees: [{ jahr: 2026, bezahlt: true, isStudent: false, beitrag: 60 }],
  aufnahmedatum: new Date("2026-03-01T00:00:00Z"),
});
const honorary = account({ vorname: "Hanna", status: "EHRENMITGLIED", inFeeYear: false, fees: [] });
const guest = account({
  vorname: "Gast",
  role: "ADMIN",
  status: "KEIN_MITGLIED",
  inFeeYear: false,
  fees: [],
  emailVerified: false,
  aufnahmedatum: null,
});

test("Jedes Konto landet in genau einer Gruppe, Ausgetretene mit Beitrag bei den Mitgliedern", () => {
  const joinsLater = account({ vorname: "Neu", inFeeYear: false, fees: [] });
  const groups = groupAccounts([member, leftThisYear, honorary, guest, joinsLater]);
  assert.deepEqual(groups.members.map((a) => a.vorname), ["Erika", "Max", "Neu"]);
  assert.deepEqual(groups.honorary.map((a) => a.vorname), ["Hanna"]);
  assert.deepEqual(groups.none.map((a) => a.vorname), ["Gast"]);
});

test("Beitragsfilter schließen Konten ohne Beitrag im Jahr aus", () => {
  const open = { ...EMPTY_FILTERS, payment: "open" as const };
  assert.equal(matchesFilters(member, open, 2026), true);
  assert.equal(matchesFilters(leftThisYear, open, 2026), false);
  assert.equal(matchesFilters(honorary, open, 2026), false);
  // Eine Beitragszeile ohne Platz in der Liste des Jahres zählt nicht.
  assert.equal(matchesFilters({ ...member, inFeeYear: false }, open, 2026), false);
});

test("Suche, Rolle und Zugang", () => {
  assert.equal(matchesFilters(guest, { ...EMPTY_FILTERS, search: "gast" }, 2026), true);
  assert.equal(matchesFilters(member, { ...EMPTY_FILTERS, search: "7" }, 2026), true);
  assert.equal(matchesFilters(member, { ...EMPTY_FILTERS, role: "ADMIN" }, 2026), false);
  assert.equal(matchesFilters(guest, { ...EMPTY_FILTERS, access: "unverified" }, 2026), true);
  assert.equal(matchesFilters(guest, { ...EMPTY_FILTERS, access: "active" }, 2026), false);
});

test("Kennzahlen", () => {
  const stats = directoryStats(
    [member, leftThisYear, honorary, guest],
    2026,
    new Date("2026-09-30T12:00:00Z"),
  );
  assert.equal(stats.total, 4);
  assert.equal(stats.admins, 1);
  assert.equal(stats.regular, 1);
  assert.equal(stats.honorary, 1);
  assert.equal(stats.none, 2);
  assert.equal(stats.students, 1);
  assert.equal(stats.feeDue, 90);
  assert.equal(stats.feePaid, 60);
  assert.equal(stats.joined, 1);
});

test("Filter in der Adresszeile: Rundreise, fremde Werte fallen weg, Jahr bleibt", () => {
  const filters = { ...EMPTY_FILTERS, search: "erika", payment: "open" as const };
  const params = filtersToParams(filters, new URLSearchParams("year=2025&role=MEMBER"));
  assert.equal(params.toString(), "year=2025&q=erika&payment=open");
  assert.deepEqual(filtersFromParams(params), filters);
  assert.deepEqual(filtersFromParams(new URLSearchParams("role=ROOT&sepa=yes")), {
    ...EMPTY_FILTERS,
    sepa: "yes",
  });
});
