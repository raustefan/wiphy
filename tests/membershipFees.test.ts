import assert from "node:assert/strict";
import test from "node:test";
import { planApplicationFees, resolveFeeDefault } from "../src/lib/feeDefaults";
import { ageAt, deriveStudentYears, isOldEnough, selectableStudentYears } from "../src/lib/membership";

/** Monatsbeträge, wie sie in `FeeDefault` stehen. */
const defaults = [
  { jahr: 2024, regular: 2, student: 1 },
  { jahr: 2026, regular: 3, student: 1.5 },
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

test("the fee plan starts at the joining year and never before it", () => {
  const plan = planApplicationFees({
    aufnahmedatum: januar(2026),
    studentYears: [2024, 2025, 2026, 2027],
    defaults,
    bankeinzug: true,
  });
  assert.deepEqual(
    plan.map((f) => f.jahr),
    [2026, 2027],
  );
});

test("student years get the reduced rate, gaps in between the regular one", () => {
  const plan = planApplicationFees({
    aufnahmedatum: januar(2026),
    // Unterbrechung im Studium: 2027 ist regulär beitragspflichtig.
    studentYears: [2026, 2028],
    defaults,
    bankeinzug: true,
  });
  assert.deepEqual(plan, [
    { jahr: 2026, isStudent: true, beitrag: 18 },
    { jahr: 2027, isStudent: false, beitrag: 36 },
    { jahr: 2028, isStudent: true, beitrag: 18 },
  ]);
});

test("the plan ends with the joining year when no later student year is claimed", () => {
  const plan = planApplicationFees({
    aufnahmedatum: januar(2026),
    studentYears: [2026],
    defaults,
    bankeinzug: true,
  });
  assert.deepEqual(plan, [{ jahr: 2026, isStudent: true, beitrag: 18 }]);
});

test("without student years only the joining year is planned", () => {
  const plan = planApplicationFees({
    aufnahmedatum: januar(2026),
    studentYears: [],
    defaults,
    bankeinzug: true,
  });
  assert.deepEqual(plan, [{ jahr: 2026, isStudent: false, beitrag: 36 }]);
});

test("age is counted in full years, so a birthday tomorrow does not count yet", () => {
  const reference = new Date("2026-09-04T12:00:00Z");
  assert.equal(ageAt(new Date("2008-09-04"), reference), 18);
  assert.equal(ageAt(new Date("2008-09-05"), reference), 17);
  assert.ok(isOldEnough(new Date("2008-09-04"), reference));
  assert.equal(isOldEnough(new Date("2008-09-05"), reference), false);
});

test("selectable student years span the current year plus five", () => {
  assert.deepEqual(selectableStudentYears(2026), [2026, 2027, 2028, 2029, 2030, 2031]);
});

test("student years are derived from the end of studies and capped at the lookahead", () => {
  assert.deepEqual(deriveStudentYears(new Date("2028-03-31"), 2026), [2026, 2027, 2028]);
  // Studium bereits beendet — keine Ermäßigung.
  assert.deepEqual(deriveStudentYears(new Date("2025-03-31"), 2026), []);
  assert.deepEqual(deriveStudentYears(null, 2026), []);
  assert.equal(deriveStudentYears(new Date("2099-01-01"), 2026).length, 6);
});

test("joining mid-year charges only the remaining twelfths (§ 5 Abs. 3)", () => {
  // Beitritt im Juli: Januar bis Juni sind vergangen, es bleiben 6 Monate.
  const plan = planApplicationFees({
    aufnahmedatum: new Date(2026, 6, 15),
    studentYears: [],
    defaults,
    bankeinzug: true,
  });
  assert.deepEqual(plan, [{ jahr: 2026, isStudent: false, beitrag: 18 }]);
});

test("without direct debit the plan carries the rounded-up 10% surcharge", () => {
  const plan = planApplicationFees({
    aufnahmedatum: januar(2026),
    studentYears: [],
    defaults,
    bankeinzug: false,
  });
  // 36,- € + 10 % = 39,60 € -> auf volle Euro aufgerundet.
  assert.deepEqual(plan, [{ jahr: 2026, isStudent: false, beitrag: 40 }]);
});
