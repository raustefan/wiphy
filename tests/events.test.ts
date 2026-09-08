import assert from "node:assert/strict";
import test from "node:test";
import {
  eventEnd,
  formatCountdown,
  formatEventRange,
  formatEventShort,
  icsEnd,
  isPastEvent,
} from "../src/lib/events";

/** 14. Juli 2026 (Dienstag), 19:00 Uhr deutscher Sommerzeit. */
const START = new Date("2026-07-14T17:00:00Z");

test("ohne Ende bleibt ein Termin bis zum Ende seines Tages kommend", () => {
  const event = { start: START, end: null, allDay: false };

  // Eine Minute nach Beginn: noch nicht vorbei — sonst verschwände der
  // Stammtisch aus der Liste, während er läuft.
  assert.equal(isPastEvent(event, new Date("2026-07-14T17:01:00Z")), false);
  assert.equal(isPastEvent(event, new Date("2026-07-14T21:59:00Z")), false);
  // Nach deutscher Mitternacht ist er vorbei.
  assert.equal(isPastEvent(event, new Date("2026-07-14T22:30:00Z")), true);
  assert.equal(eventEnd(event).toISOString(), "2026-07-14T21:59:59.999Z");
});

test("mit Uhrzeit-Ende zählt genau dieses Ende", () => {
  const event = { start: START, end: new Date("2026-07-14T20:00:00Z"), allDay: false };
  assert.equal(isPastEvent(event, new Date("2026-07-14T19:59:00Z")), false);
  assert.equal(isPastEvent(event, new Date("2026-07-14T20:01:00Z")), true);
});

test("bei ganztägigen Terminen zählt der letzte Tag vollständig mit", () => {
  const event = {
    start: new Date("2026-07-13T22:00:00Z"), // 14. Juli, 00:00 Ortszeit
    end: new Date("2026-07-15T22:00:00Z"), // 16. Juli, 00:00 Ortszeit
    allDay: true,
  };
  assert.equal(isPastEvent(event, new Date("2026-07-16T20:00:00Z")), false);
  assert.equal(isPastEvent(event, new Date("2026-07-16T22:30:00Z")), true);
});

test("die Kalenderdatei setzt eine Standarddauer statt bis Mitternacht zu blocken", () => {
  const event = { start: START, end: null, allDay: false };
  assert.equal(icsEnd(event).toISOString(), "2026-07-14T19:00:00.000Z");
});

test("der Zeitraum wird auf Deutsch und in Ortszeit beschriftet", () => {
  assert.equal(
    formatEventRange({ start: START, end: new Date("2026-07-14T20:00:00Z"), allDay: false }),
    "Dienstag, 14. Juli 2026, 19:00–22:00 Uhr",
  );
  assert.equal(
    formatEventRange({ start: START, end: null, allDay: false }),
    "Dienstag, 14. Juli 2026, ab 19:00 Uhr",
  );
  assert.equal(
    formatEventRange({ start: new Date("2026-07-13T22:00:00Z"), end: null, allDay: true }),
    "Dienstag, 14. Juli 2026 · ganztägig",
  );
  assert.equal(formatEventShort({ start: START, end: null, allDay: false }), "Di, 14. Juli 2026, 19:00 Uhr");
});

test("mehrtägige Termine nennen beide Tage", () => {
  const range = formatEventRange({
    start: START,
    end: new Date("2026-07-15T10:00:00Z"),
    allDay: false,
  });
  assert.equal(range, "Di, 14. Juli, 19:00 Uhr – Mi, 15. Juli 2026, 12:00 Uhr");
});

test("der Countdown rechnet in Kalendertagen, nicht in 24-Stunden-Schritten", () => {
  const event = { start: START, end: null, allDay: false };
  // Sechs Stunden vor Beginn ist immer noch „heute“.
  assert.equal(formatCountdown(event, new Date("2026-07-14T11:00:00Z")), "heute");
  // Am Vorabend ist es „morgen“, obwohl weniger als 24 Stunden dazwischen liegen.
  assert.equal(formatCountdown(event, new Date("2026-07-13T20:00:00Z")), "morgen");
  assert.equal(formatCountdown(event, new Date("2026-07-11T10:00:00Z")), "in 3 Tagen");
  assert.equal(formatCountdown(event, new Date("2026-06-14T10:00:00Z")), "in 4 Wochen");
});
