import assert from "node:assert/strict";
import test from "node:test";
import {
  feeRetentionCutoffYear,
  isTerminationDue,
  terminationDate,
} from "../src/lib/membershipTermination";

const iso = (d: Date) => d.toISOString().slice(0, 10);

test("Eingang bis 3.12. beendet die Mitgliedschaft zum Jahresende", () => {
  assert.equal(iso(terminationDate(new Date("2026-03-15T10:00:00Z"))), "2026-12-31");
  // 3.12., 23:30 deutscher Zeit
  assert.equal(iso(terminationDate(new Date("2026-12-03T22:30:00Z"))), "2026-12-31");
});

test("Eingang ab 4.12. verschiebt den Austritt ans Ende des Folgejahres", () => {
  // 4.12., 00:30 deutscher Zeit — in UTC noch der 3.12.
  assert.equal(iso(terminationDate(new Date("2026-12-03T23:30:00Z"))), "2027-12-31");
  assert.equal(iso(terminationDate(new Date("2026-12-31T12:00:00Z"))), "2027-12-31");
});

test("Wirksam erst nach Ablauf des Austrittstags", () => {
  const effectiveAt = new Date("2026-12-31T00:00:00Z");
  assert.equal(isTerminationDue(effectiveAt, new Date("2026-12-31T20:00:00Z")), false);
  assert.equal(isTerminationDue(effectiveAt, new Date("2027-01-01T00:00:00Z")), true);
});

test("Beitragszeilen bleiben zehn volle Jahre nach dem Beitragsjahr", () => {
  // 2016 muss bis Ende 2026 bleiben, 2015 darf 2026 weg.
  const cutoff = feeRetentionCutoffYear(new Date("2026-06-01T12:00:00Z"));
  assert.equal(2016 < cutoff, false);
  assert.equal(2015 < cutoff, true);
});
