import assert from "node:assert/strict";
import test from "node:test";
import { isCalendarDate, isPlausibleBirthDate, isValidPhone, isValidPostalCode } from "../src/lib/inputRules";

test("Kalenderdaten: Format und echte Tage", () => {
  assert.ok(isCalendarDate("2024-02-29"));
  assert.equal(isCalendarDate("2023-02-29"), false);
  assert.equal(isCalendarDate("2015-02-31"), false);
  assert.equal(isCalendarDate("01.04.2015"), false);
});

test("Postleitzahlen je Land, unbekannte Länder ungeprüft", () => {
  assert.ok(isValidPostalCode("DE", "89073"));
  assert.equal(isValidPostalCode("DE", "8907"), false);
  assert.ok(isValidPostalCode("NL", "1012 AB"));
  assert.ok(isValidPostalCode("US", "10001-1234"));
  assert.ok(isValidPostalCode("SG", "irgendwas"));
});

test("Telefonnummern und Geburtsdaten", () => {
  assert.ok(isValidPhone("+49 (0) 731 / 50-123"));
  assert.equal(isValidPhone("1234"), false);
  assert.equal(isValidPhone("call me"), false);
  assert.ok(isPlausibleBirthDate(new Date("1950-06-01")));
  assert.equal(isPlausibleBirthDate(new Date("1899-12-31")), false);
});
