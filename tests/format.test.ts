import assert from "node:assert/strict";
import test from "node:test";
import { formatDate, formatDateShort, formatDateTime } from "../src/lib/format";

/**
 * Die Formate müssen deutsche Zeit zeigen, egal wo der Code läuft. Auf dem
 * Server ist die Systemzeitzone UTC — ohne feste Angabe stünde im Protokoll
 * eine Uhrzeit zwei Stunden vor der tatsächlichen.
 */

// 21:15 Uhr MESZ am 7. September 2026 (UTC+2).
const SUMMER = new Date("2026-09-07T19:15:00Z");
// 12:30 Uhr MEZ am 15. Januar 2026 (UTC+1) — Winterzeit, ein anderer Versatz.
const WINTER = new Date("2026-01-15T11:30:00Z");

test("date and time are rendered in German local time, not UTC", () => {
  assert.equal(formatDateTime(SUMMER), "07.09.2026, 21:15");
  assert.equal(formatDateTime(WINTER), "15.01.2026, 12:30");
});

test("the date rolls over at German midnight, not at UTC midnight", () => {
  // 00:30 Uhr Ortszeit am 8. September — in UTC ist es noch der 7.
  const afterMidnight = new Date("2026-09-07T22:30:00Z");
  assert.equal(formatDateShort(afterMidnight), "8.9.2026");
  assert.equal(formatDate(afterMidnight), "8. September 2026");
});

test("an empty value stays a dash instead of becoming a wrong date", () => {
  assert.equal(formatDateTime(null), "—");
  assert.equal(formatDate(undefined), "—");
});
