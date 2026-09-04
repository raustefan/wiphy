import assert from "node:assert/strict";
import test from "node:test";
import {
  annualFee,
  billableMonths,
  calculateFee,
  withSurcharge,
} from "../src/lib/feeCalculation";

/** Die beschlossenen Sätze: 2,- €/Monat regulär, 1,- €/Monat mit Sonderstatus. */
const rates = { monthlyRegular: 2, monthlyStudent: 1 };

test("the annual fee is twelve monthly instalments", () => {
  assert.equal(annualFee(2), 24);
  assert.equal(annualFee(1), 12);
});

test("a full year is charged when there is no joining date", () => {
  assert.equal(billableMonths(2026, null), 12);
});

test("the joining year is reduced by the months already elapsed", () => {
  assert.equal(billableMonths(2026, new Date(2026, 0, 1)), 12);
  assert.equal(billableMonths(2026, new Date(2026, 6, 15)), 6);
  assert.equal(billableMonths(2026, new Date(2026, 11, 31)), 1);
});

test("years around the joining year are all-or-nothing", () => {
  const joined = new Date(2026, 6, 1);
  assert.equal(billableMonths(2025, joined), 0);
  assert.equal(billableMonths(2027, joined), 12);
});

test("the 10% surcharge is rounded up to full euros (§ 5 Abs. 5)", () => {
  // 24,- € + 10 % = 26,40 €
  assert.equal(withSurcharge(24), 27);
  // 12,- € + 10 % = 13,20 €
  assert.equal(withSurcharge(12), 14);
  // Ein bereits glatter Betrag wird nicht künstlich erhöht.
  assert.equal(withSurcharge(10), 11);
});

test("a regular member with direct debit pays exactly the annual fee", () => {
  const fee = calculateFee({ ...rates, isStudent: false, bankeinzug: true, jahr: 2026 });
  assert.equal(fee.total, 24);
  assert.equal(fee.surcharge, 0);
  assert.equal(fee.months, 12);
});

test("special status halves the fee", () => {
  const fee = calculateFee({ ...rates, isStudent: true, bankeinzug: true, jahr: 2026 });
  assert.equal(fee.total, 12);
});

test("without direct debit the surcharge applies to the full amount", () => {
  const fee = calculateFee({ ...rates, isStudent: false, bankeinzug: false, jahr: 2026 });
  assert.equal(fee.base, 24);
  assert.equal(fee.total, 27);
  assert.equal(fee.surcharge, 3);
});

test("the surcharge is applied after the pro-rata reduction, not before", () => {
  // Halbes Jahr = 12,- €; +10 % = 13,20 € -> 14,- €.
  // Andersherum gerechnet (27,- € halbiert) käme 13,50 € heraus.
  const fee = calculateFee({
    ...rates,
    isStudent: false,
    bankeinzug: false,
    jahr: 2026,
    aufnahmedatum: new Date(2026, 6, 1),
  });
  assert.equal(fee.base, 12);
  assert.equal(fee.total, 14);
});

test("a year before joining costs nothing", () => {
  const fee = calculateFee({
    ...rates,
    isStudent: false,
    bankeinzug: true,
    jahr: 2025,
    aufnahmedatum: new Date(2026, 0, 1),
  });
  assert.equal(fee.total, 0);
});
