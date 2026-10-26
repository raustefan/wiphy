import assert from "node:assert/strict";
import test from "node:test";
import { planApplicationFees, resolveFeeDefault } from "../src/lib/feeDefaults";
import {
  ageAt,
  changedStudentYears,
  currentStudentEndYear,
  formatYearRanges,
  isOldEnough,
  studentEndYearOptions,
  studentStatusEndsAfter,
  studentYearsFromStudy,
  withStudentEndYear,
} from "../src/lib/membership";

/** Monatsbeträge, wie sie in `FeeDefault` stehen. */
const defaults = [
  { year: 2024, regular: 2, student: 1 },
  { year: 2026, regular: 3, student: 1.5 },
];

/** Aufnahme zum Jahresanfang — volle 12 Monate, keine anteilige Kürzung. */
const januar = (year: number) => new Date(year, 0, 1);

test("a year without its own entry inherits the most recent earlier rate", () => {
  assert.deepEqual(resolveFeeDefault(defaults, 2025), { regular: 2, student: 1 });
  assert.deepEqual(resolveFeeDefault(defaults, 2027), { regular: 3, student: 1.5 });
});

test("a year before every entry falls back to the oldest known rate", () => {
  assert.deepEqual(resolveFeeDefault(defaults, 2020), { regular: 2, student: 1 });
});

test("without any configured rate the fee is zero rather than undefined", () => {
  assert.deepEqual(resolveFeeDefault([], 2026), { regular: 0, student: 0 });
});

test("the fee plan covers only the joining year, later student years included", () => {
  const plan = planApplicationFees({
    joinedAt: januar(2026),
    studentYears: [2024, 2025, 2026, 2027],
    defaults,
    directDebit: true,
  });
  // 2027 entsteht erst mit „Jahr hinzufügen“; der Status steht in studentYears.
  assert.deepEqual(plan, [{ year: 2026, isStudent: true, amount: 18 }]);
});

test("taking over a member plans every year up to untilYear with its own rate", () => {
  const plan = planApplicationFees({
    joinedAt: januar(2024),
    studentYears: [2024, 2026],
    defaults,
    directDebit: true,
    untilYear: 2026,
  });
  assert.deepEqual(plan.map((f) => [f.year, f.isStudent]), [
    [2024, true],
    [2025, false],
    [2026, true],
  ]);
});

test("without student years only the joining year is planned", () => {
  const plan = planApplicationFees({
    joinedAt: januar(2026),
    studentYears: [],
    defaults,
    directDebit: true,
  });
  assert.deepEqual(plan, [{ year: 2026, isStudent: false, amount: 36 }]);
});

test("age is counted in full years, so a birthday tomorrow does not count yet", () => {
  const reference = new Date("2026-09-04T12:00:00Z");
  assert.equal(ageAt(new Date("2008-09-04"), reference), 18);
  assert.equal(ageAt(new Date("2008-09-05"), reference), 17);
  assert.ok(isOldEnough(new Date("2008-09-04"), reference));
  assert.equal(isOldEnough(new Date("2008-09-05"), reference), false);
});

test("every year the studies touch counts in full", () => {
  // 31.12.2026–01.01.2028: drei angebrochene Jahre.
  assert.deepEqual(studentYearsFromStudy(new Date("2026-12-31"), new Date("2028-01-01"), 2026), [2026, 2027, 2028]);
  // Begonnen vor dem Eintritt: erst ab dem laufenden Jahr.
  assert.deepEqual(studentYearsFromStudy(new Date("2022-10-01"), new Date("2027-03-31"), 2026), [2026, 2027]);
  // Ohne Beginn ebenfalls ab dem laufenden Jahr.
  assert.deepEqual(studentYearsFromStudy(null, new Date("2027-03-31"), 2026), [2026, 2027]);
  // Studium bereits beendet oder ohne Ende — keine Ermäßigung.
  assert.deepEqual(studentYearsFromStudy(new Date("2020-10-01"), new Date("2025-03-31"), 2026), []);
  assert.deepEqual(studentYearsFromStudy(new Date("2026-10-01"), null, 2026), []);
});

test("members pick the end of their discount, past and current years stay fixed", () => {
  // Altbestand bis 2031: das bisherige Ende bleibt wählbar.
  assert.deepEqual(studentEndYearOptions([2024, 2025], 2026), [2026, 2027, 2028, 2029]);
  assert.deepEqual(studentEndYearOptions([2026, 2027, 2028, 2029, 2030, 2031], 2026).at(-1), 2031);
  assert.equal(currentStudentEndYear([2024, 2025, 2026, 2027], 2026), 2027);
  assert.equal(currentStudentEndYear([2024], 2026), 2026);

  // 2024–2027 → bis 2029 verlängert.
  assert.deepEqual(withStudentEndYear([2024, 2025, 2026, 2027], 2029, 2026), [2024, 2025, 2026, 2027, 2028, 2029]);
  // Ende 2026: künftige Jahre fallen weg, das laufende bleibt.
  assert.deepEqual(withStudentEndYear([2025, 2026, 2027], 2026, 2026), [2025, 2026]);
  // Kein Student im laufenden Jahr: es bleibt regulär, ab 2027 ermäßigt.
  assert.deepEqual(withStudentEndYear([2023], 2028, 2026), [2023, 2027, 2028]);

  assert.deepEqual(changedStudentYears([2026, 2027], [2026, 2028]).sort(), [2027, 2028]);
  assert.equal(formatYearRanges([2026, 2019, 2020, 2021]), "2019–2021, 2026");
});

test("the status ends after the last discounted year only", () => {
  const member = { studentYears: [2026, 2027] };
  assert.equal(studentStatusEndsAfter(member, 2026), false);
  assert.equal(studentStatusEndsAfter(member, 2027), true);
  assert.equal(studentStatusEndsAfter(member, 2028), false);
});

test("joining mid-year charges only the remaining twelfths (§ 5 Abs. 3)", () => {
  // Beitritt im Juli: Januar bis Juni sind vergangen, es bleiben 6 Monate.
  const plan = planApplicationFees({
    joinedAt: new Date(2026, 6, 15),
    studentYears: [],
    defaults,
    directDebit: true,
  });
  assert.deepEqual(plan, [{ year: 2026, isStudent: false, amount: 18 }]);
});

test("without direct debit the plan carries the rounded-up 10% surcharge", () => {
  const plan = planApplicationFees({
    joinedAt: januar(2026),
    studentYears: [],
    defaults,
    directDebit: false,
  });
  // 36,- € + 10 % = 39,60 € -> auf volle Euro aufgerundet.
  assert.deepEqual(plan, [{ year: 2026, isStudent: false, amount: 40 }]);
});

test("a migrated member gets every year from joining up to untilYear", () => {
  const plan = planApplicationFees({
    joinedAt: januar(2022),
    studentYears: [2023],
    defaults,
    directDebit: true,
    untilYear: 2026,
  });
  assert.deepEqual(
    plan.map((f) => [f.year, f.isStudent]),
    [[2022, false], [2023, true], [2024, false], [2025, false], [2026, false]],
  );
});
