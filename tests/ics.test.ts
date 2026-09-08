import assert from "node:assert/strict";
import test from "node:test";
import { buildCalendarIcs, buildEventIcs, icsFileName } from "../src/lib/server/ics";

const NOW = new Date("2026-07-01T12:00:00Z");

function makeEvent(overrides: Partial<Parameters<typeof buildEventIcs>[0]> = {}) {
  return {
    id: "abc123",
    title: "Sommerstammtisch",
    summary: "Ein Abend im Biergarten.",
    description: "",
    start: new Date("2026-07-14T17:00:00Z"),
    end: new Date("2026-07-14T20:00:00Z"),
    allDay: false,
    location: "Biergarten",
    address: "Albert-Einstein-Allee 11, 89081 Ulm",
    onlineUrl: "",
    updatedAt: new Date("2026-07-01T08:00:00Z"),
    ...overrides,
  };
}

function lines(ics: string): string[] {
  return ics.split("\r\n");
}

test("die Datei ist ein gültiger Kalender mit CRLF-Zeilenenden", () => {
  const ics = buildEventIcs(makeEvent(), NOW);
  assert.ok(ics.startsWith("BEGIN:VCALENDAR\r\n"));
  assert.ok(ics.endsWith("END:VCALENDAR\r\n"));
  assert.equal(ics.includes("\n\n"), false);
  assert.ok(lines(ics).includes("BEGIN:VEVENT"));
  assert.ok(lines(ics).includes("END:VEVENT"));
});

test("Zeiten stehen als UTC in der Datei", () => {
  const ics = buildEventIcs(makeEvent(), NOW);
  assert.ok(lines(ics).includes("DTSTART:20260714T170000Z"));
  assert.ok(lines(ics).includes("DTEND:20260714T200000Z"));
});

test("ohne Ende blockt der Eintrag die Standarddauer, nicht den ganzen Tag", () => {
  const ics = buildEventIcs(makeEvent({ end: null }), NOW);
  assert.ok(lines(ics).includes("DTEND:20260714T190000Z"));
});

test("ganztägige Termine enden am Folgetag, weil DTEND exklusiv ist", () => {
  const ics = buildEventIcs(
    makeEvent({
      allDay: true,
      start: new Date("2026-07-13T22:00:00Z"), // 14. Juli, 00:00 Ortszeit
      end: null,
    }),
    NOW,
  );
  assert.ok(lines(ics).includes("DTSTART;VALUE=DATE:20260714"));
  assert.ok(lines(ics).includes("DTEND;VALUE=DATE:20260715"));
});

test("Sonderzeichen im Text werden maskiert, nicht ausgeliefert", () => {
  const ics = buildEventIcs(
    makeEvent({ title: "Exkursion: Ulm, Ulm; und zurück\\vorwärts" }),
    NOW,
  );
  const summary = lines(ics).find((line) => line.startsWith("SUMMARY:"));
  assert.equal(summary, "SUMMARY:Exkursion: Ulm\\, Ulm\\; und zurück\\\\vorwärts");
});

test("Zeilenumbrüche in der Beschreibung bleiben als \\n erhalten", () => {
  const ics = buildEventIcs(makeEvent(), NOW);
  const description = lines(ics).find((line) => line.startsWith("DESCRIPTION:"));
  assert.ok(description?.includes("\\n"));
  // Die Beschreibung darf den Eintrag nicht über mehrere echte Zeilen sprengen —
  // Fortsetzungszeilen beginnen mit einem Leerzeichen.
  const index = lines(ics).findIndex((line) => line.startsWith("DESCRIPTION:"));
  for (const line of lines(ics).slice(index + 1)) {
    if (!line.startsWith(" ")) {
      assert.ok(/^[A-Z-]+[:;]/.test(line), `unerwartete Zeile nach DESCRIPTION: ${line}`);
      break;
    }
  }
});

test("lange Zeilen werden auf 75 Oktett gefaltet, ohne Umlaute zu zerschneiden", () => {
  const ics = buildEventIcs(makeEvent({ title: `Jubiläumsfeier ${"ä".repeat(120)}` }), NOW);
  for (const line of lines(ics)) {
    assert.ok(
      new TextEncoder().encode(line).length <= 75,
      `Zeile zu lang: ${line.slice(0, 30)}…`,
    );
  }
  // Wieder zusammengesetzt muss der Titel unverändert dastehen.
  const unfolded = ics.replace(/\r\n /g, "");
  assert.ok(unfolded.includes(`SUMMARY:Jubiläumsfeier ${"ä".repeat(120)}`));
});

test("der Sammelkalender enthält jeden Termin genau einmal", () => {
  const ics = buildCalendarIcs(
    [makeEvent(), makeEvent({ id: "def456", title: "Exkursion" })],
    NOW,
  );
  assert.equal(ics.match(/BEGIN:VEVENT/g)?.length, 2);
  assert.ok(ics.includes("UID:termin-abc123@wirtschaftsphysik.de"));
  assert.ok(ics.includes("UID:termin-def456@wirtschaftsphysik.de"));
});

test("der Dateiname bleibt auch bei Umlauten und Satzzeichen brauchbar", () => {
  assert.equal(icsFileName("Jubiläumsfeier: 20 Jahre!"), "termin-jubilaeumsfeier-20-jahre.ics");
  assert.equal(icsFileName("???"), "termin-wirtschaftsphysik.ics");
});
