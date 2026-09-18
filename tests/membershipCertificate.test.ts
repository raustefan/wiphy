import assert from "node:assert/strict";
import test from "node:test";
import {
  certificateFacts,
  certificateNumber,
  formatMembershipDuration,
  formatMembershipDurationDative,
  formatPaidYears,
  isCertifiableStatus,
  membershipDuration,
  paidCoverage,
} from "../src/lib/membershipCertificate";

/**
 * Das Zertifikat wird Dritten vorgelegt. Jede Zahl darauf ist eine Behauptung
 * über eine Person, deshalb hängen die Rechnungen hier am Test und nicht an der
 * PDF-Komponente, wo sie niemand mehr nachprüfen könnte.
 */

// 18. September 2026, mittags deutscher Zeit.
const NOW = new Date("2026-09-18T10:00:00Z");

test("die Mitgliedschaftsdauer zählt nur vollendete Monate", () => {
  const since = new Date("2021-03-20T00:00:00Z");

  assert.deepEqual(membershipDuration(since, new Date("2021-04-19T12:00:00Z")), {
    years: 0,
    months: 0,
    totalMonths: 0,
  });
  assert.deepEqual(membershipDuration(since, new Date("2021-04-20T12:00:00Z")), {
    years: 0,
    months: 1,
    totalMonths: 1,
  });
  assert.deepEqual(membershipDuration(since, NOW), {
    years: 5,
    months: 5,
    totalMonths: 65,
  });
});

test("ein vordatiertes Aufnahmedatum ergibt keine negative Dauer", () => {
  assert.equal(membershipDuration(new Date("2027-01-01T00:00:00Z"), NOW), null);
});

test("die Dauer wird deutscher Zeit gezählt, nicht nach UTC", () => {
  // 1. Oktober 00:30 Uhr MESZ — in UTC ist es noch der 30. September.
  const since = new Date("2025-09-30T22:30:00Z");
  const duration = membershipDuration(since, new Date("2026-10-01T10:00:00Z"));
  assert.deepEqual(duration, { years: 1, months: 0, totalMonths: 12 });
});

test("die Dauer wird als deutscher Satzteil ausgegeben", () => {
  assert.equal(formatMembershipDuration({ years: 0, months: 0, totalMonths: 0 }), "weniger als ein Monat");
  assert.equal(formatMembershipDuration({ years: 0, months: 1, totalMonths: 1 }), "1 Monat");
  assert.equal(formatMembershipDuration({ years: 1, months: 0, totalMonths: 12 }), "1 Jahr");
  assert.equal(formatMembershipDuration({ years: 5, months: 5, totalMonths: 65 }), "5 Jahre und 5 Monate");
});

test("nach „seit“ steht die Dauer im Dativ", () => {
  const dative = formatMembershipDurationDative;
  assert.equal(dative({ years: 0, months: 0, totalMonths: 0 }), "weniger als einem Monat");
  assert.equal(dative({ years: 0, months: 1, totalMonths: 1 }), "einem Monat");
  assert.equal(dative({ years: 0, months: 7, totalMonths: 7 }), "7 Monaten");
  assert.equal(dative({ years: 1, months: 0, totalMonths: 12 }), "einem Jahr");
  assert.equal(dative({ years: 5, months: 5, totalMonths: 65 }), "5 Jahren und 5 Monaten");
  assert.equal(dative({ years: 1, months: 1, totalMonths: 13 }), "einem Jahr und einem Monat");
});

test("bezahlte Jahre decken bis zum 31. Dezember des letzten lückenlosen Jahres", () => {
  const coverage = paidCoverage(
    [
      { jahr: 2024, bezahlt: true },
      { jahr: 2025, bezahlt: true },
      { jahr: 2026, bezahlt: true },
    ],
    NOW,
  );

  assert.equal(coverage.coveredThroughYear, 2026);
  assert.equal(coverage.coveredThrough?.toISOString(), "2026-12-31T22:59:59.000Z");
  // 18. September bis 31. Dezember — drei vollendete Monate.
  assert.equal(coverage.remainingMonths, 3);
});

test("ein im Voraus bezahltes Jahr verlängert die gesicherte Zeit", () => {
  const coverage = paidCoverage(
    [
      { jahr: 2026, bezahlt: true },
      { jahr: 2027, bezahlt: true },
    ],
    NOW,
  );

  assert.equal(coverage.coveredThroughYear, 2027);
  assert.equal(coverage.remainingMonths, 15);
});

test("ein offenes laufendes Jahr sichert gar nichts — auch nicht rückwirkend", () => {
  const coverage = paidCoverage(
    [
      { jahr: 2024, bezahlt: true },
      { jahr: 2025, bezahlt: true },
      { jahr: 2026, bezahlt: false },
    ],
    NOW,
  );

  assert.equal(coverage.coveredThroughYear, null);
  assert.equal(coverage.coveredThrough, null);
  assert.equal(coverage.remainingMonths, 0);
  // Die Historie bleibt trotzdem vollständig — sie steht auf dem Zertifikat.
  assert.deepEqual(coverage.paidYears, [2024, 2025]);
});

test("eine Lücke vor dem laufenden Jahr verkürzt die Deckung nicht", () => {
  // 2023 bezahlt, 2024/2025 nicht, 2026 wieder: gesichert ist nur 2026.
  const coverage = paidCoverage(
    [
      { jahr: 2023, bezahlt: true },
      { jahr: 2024, bezahlt: false },
      { jahr: 2026, bezahlt: true },
    ],
    NOW,
  );

  assert.equal(coverage.coveredThroughYear, 2026);
  assert.deepEqual(coverage.paidYears, [2023, 2026]);
});

test("ein künftiges Jahr ohne das laufende zählt nicht als Deckung", () => {
  const coverage = paidCoverage(
    [
      { jahr: 2026, bezahlt: false },
      { jahr: 2027, bezahlt: true },
    ],
    NOW,
  );

  assert.equal(coverage.coveredThroughYear, null);
});

test("zusammenhängende Beitragsjahre werden zur Spanne zusammengezogen", () => {
  assert.equal(formatPaidYears([]), "—");
  assert.equal(formatPaidYears([2026]), "2026");
  assert.equal(formatPaidYears([2021, 2022, 2023, 2026]), "2021–2023, 2026");
  assert.equal(formatPaidYears([2019, 2021, 2022]), "2019, 2021–2022");
});

test("die Kennung nutzt die Mitgliedsnummer und weicht sonst auf die Konto-ID aus", () => {
  assert.equal(
    certificateNumber({ mitgliedId: 42, userId: "clx0000abcdef", issuedAt: NOW }),
    "WPA-2026-0042",
  );
  assert.equal(
    certificateNumber({ mitgliedId: null, userId: "clx0000abcdef", issuedAt: NOW }),
    "WPA-2026-ABCDEF",
  );
});

test("nur Mitgliedschaften werden bescheinigt", () => {
  assert.equal(isCertifiableStatus("ORDENTLICHES_MITGLIED"), true);
  assert.equal(isCertifiableStatus("EHRENMITGLIED"), true);
  assert.equal(isCertifiableStatus("KEIN_MITGLIED"), false);
  assert.equal(isCertifiableStatus(null), false);
});

test("Ehrenmitglieder sind beitragsfrei — ihre Deckung hängt an keinem Jahr", () => {
  const facts = certificateFacts({
    status: "EHRENMITGLIED",
    aufnahmedatum: new Date("2010-05-01T00:00:00Z"),
    fees: [],
    issuedAt: NOW,
  });

  assert.equal(facts.feeExempt, true);
  assert.equal(facts.coverage.coveredThroughYear, null);
  assert.deepEqual(facts.duration, { years: 16, months: 4, totalMonths: 196 });
});

test("ohne Aufnahmedatum bleibt die Dauer leer statt geraten zu werden", () => {
  const facts = certificateFacts({
    status: "ORDENTLICHES_MITGLIED",
    aufnahmedatum: null,
    fees: [{ jahr: 2026, bezahlt: true }],
    issuedAt: NOW,
  });

  assert.equal(facts.memberSince, null);
  assert.equal(facts.duration, null);
  assert.equal(facts.coverage.coveredThroughYear, 2026);
});
