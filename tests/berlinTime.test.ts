import assert from "node:assert/strict";
import test from "node:test";
import {
  endOfBerlinDay,
  isSameBerlinDay,
  parseBerlinLocalInput,
  startOfBerlinDay,
  toBerlinDateInput,
  toBerlinLocalInput,
} from "../src/lib/berlinTime";

/**
 * Terminformulare liefern Wandzeit ohne Zeitzone. Wird die in der Zeitzone der
 * Laufzeitumgebung gelesen — auf dem Server UTC —, steht der Termin je nach
 * Jahreszeit ein bis zwei Stunden falsch in der Datenbank.
 */

test("Winterzeit: 19:00 deutscher Zeit sind 18:00 UTC", () => {
  const date = parseBerlinLocalInput("2026-03-14T19:00");
  assert.equal(date?.toISOString(), "2026-03-14T18:00:00.000Z");
});

test("Sommerzeit: dieselbe Uhrzeit ist eine Stunde früher in UTC", () => {
  const date = parseBerlinLocalInput("2026-07-14T19:00");
  assert.equal(date?.toISOString(), "2026-07-14T17:00:00.000Z");
});

test("die Umstellungsnacht verschiebt den Versatz mitten am Tag", () => {
  // Umstellung 2026: 29. März, 02:00 → 03:00.
  assert.equal(
    parseBerlinLocalInput("2026-03-29T01:30")?.toISOString(),
    "2026-03-29T00:30:00.000Z",
  );
  assert.equal(
    parseBerlinLocalInput("2026-03-29T04:30")?.toISOString(),
    "2026-03-29T02:30:00.000Z",
  );
});

test("Hin- und Rückweg liefern dieselbe Eingabe", () => {
  for (const value of ["2026-01-15T08:05", "2026-07-14T19:00", "2026-12-31T23:59"]) {
    const parsed = parseBerlinLocalInput(value);
    assert.ok(parsed);
    assert.equal(toBerlinLocalInput(parsed), value);
  }
});

test("ein Datum ohne Uhrzeit beginnt um Mitternacht deutscher Zeit", () => {
  const date = parseBerlinLocalInput("2026-07-14");
  assert.equal(date?.toISOString(), "2026-07-13T22:00:00.000Z");
  assert.equal(toBerlinDateInput(date!), "2026-07-14");
});

test("unbrauchbare Eingaben werden abgelehnt statt geraten", () => {
  assert.equal(parseBerlinLocalInput(""), null);
  assert.equal(parseBerlinLocalInput("morgen"), null);
});

test("Tagesgrenzen richten sich nach deutscher Mitternacht, nicht nach UTC", () => {
  // 00:30 Uhr Ortszeit am 8. September — in UTC ist es noch der 7.
  const afterMidnight = new Date("2026-09-07T22:30:00Z");
  assert.equal(toBerlinDateInput(startOfBerlinDay(afterMidnight)), "2026-09-08");
  assert.equal(endOfBerlinDay(afterMidnight).toISOString(), "2026-09-08T21:59:59.999Z");
  assert.equal(isSameBerlinDay(afterMidnight, new Date("2026-09-08T10:00:00Z")), true);
  assert.equal(isSameBerlinDay(afterMidnight, new Date("2026-09-07T10:00:00Z")), false);
});
