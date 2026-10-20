import assert from "node:assert/strict";
import test from "node:test";
import {
  buildPain008,
  defaultMandateId,
  isoDate,
  isValidCreditorId,
  isValidMandateId,
  sepaText,
} from "../src/lib/sepa";

test("default mandate reference follows ID<Mitgliedsnummer>-Mandat0", () => {
  assert.equal(defaultMandateId(158), "ID158-Mandat0");
  assert.equal(defaultMandateId(null), "");
  assert.ok(isValidMandateId("ID158-Mandat0"));
  assert.equal(isValidMandateId("ID 158"), false);
  assert.equal(isValidMandateId("x".repeat(36)), false);
});

test("validates the creditor ID shape", () => {
  assert.ok(isValidCreditorId("DE98ZZZ09999999999"));
  assert.equal(isValidCreditorId("de98ZZZ09999999999"), false);
  assert.equal(isValidCreditorId("DE98"), false);
});

test("reduces text to the SEPA character set", () => {
  assert.equal(sepaText("Jürgen Groß & Söhne <GmbH>"), "Juergen Gross Soehne GmbH");
  assert.equal(sepaText("Café"), "Cafe");
});

test("mandate dates use Berlin calendar days", () => {
  // Mitternacht in Berlin ist in UTC noch der Vortag.
  assert.equal(isoDate(new Date("2020-03-31T22:00:00Z")), "2020-04-01");
});

test("builds a pain.008 with correct totals", () => {
  const xml = buildPain008({
    messageId: "WIPHY-2026-1",
    createdAt: new Date("2026-09-29T10:00:00Z"),
    collectionDate: "2026-10-15",
    sequenceType: "RCUR",
    creditor: { name: "wiphy e.V.", iban: "DE89370400440532013000", creditorId: "DE98ZZZ09999999999" },
    debits: [0.1, 0.2, 24].map((amount, i) => ({
      name: "Müller",
      iban: "DE89370400440532013000",
      amount,
      mandateId: `ID${i}-Mandat0`,
      mandateDate: "2020-01-01",
      endToEndId: `BEITRAG-2026-${i}`,
      remittance: "Mitgliedsbeitrag 2026",
    })),
  });

  assert.equal(xml.match(/<CtrlSum>24\.30<\/CtrlSum>/g)?.length, 2);
  assert.equal(xml.match(/<NbOfTxs>3<\/NbOfTxs>/g)?.length, 2);
  assert.match(xml, /<InstdAmt Ccy="EUR">0\.10<\/InstdAmt>/);
  assert.match(xml, /<Nm>Mueller<\/Nm>/);
  assert.match(xml, /<Othr><Id>NOTPROVIDED<\/Id><\/Othr>/);
  assert.match(xml, /<SeqTp>RCUR<\/SeqTp>/);
});

test("debtors outside the EEA carry BIC and a structured address", () => {
  const xml = buildPain008({
    messageId: "WIPHY-2026-2",
    createdAt: new Date("2026-09-29T10:00:00Z"),
    collectionDate: "2026-10-15",
    sequenceType: "RCUR",
    creditor: { name: "wiphy e.V.", iban: "DE89370400440532013000", creditorId: "DE98ZZZ09999999999" },
    debits: [
      {
        name: "Jürg Meier",
        iban: "CH9300762011623852957",
        bic: "UBSWCHZH80A",
        address: { street: "Bahnhofstr. 1", postalCode: "8001", city: "Zürich", region: null, country: "CH" },
        amount: 24,
        mandateId: "ID7-Mandat0",
        mandateDate: "2020-01-01",
        endToEndId: "BEITRAG-2026-7",
        remittance: "Mitgliedsbeitrag 2026",
      },
      {
        name: "Erika Mustermann",
        iban: "DE89370400440532013000",
        amount: 24,
        mandateId: "ID8-Mandat0",
        mandateDate: "2020-01-01",
        endToEndId: "BEITRAG-2026-8",
        remittance: "Mitgliedsbeitrag 2026",
      },
    ],
  });

  assert.match(xml, /<BICFI>UBSWCHZH80A<\/BICFI>/);
  assert.match(
    xml,
    /<Dbtr><Nm>Juerg Meier<\/Nm><PstlAdr><StrtNm>Bahnhofstr. 1<\/StrtNm><PstCd>8001<\/PstCd><TwnNm>Zuerich<\/TwnNm><Ctry>CH<\/Ctry><\/PstlAdr><\/Dbtr>/,
  );
  // Inlandslastschrift: weiterhin ohne Anschrift.
  assert.match(xml, /<Dbtr><Nm>Erika Mustermann<\/Nm><\/Dbtr>/);
});
