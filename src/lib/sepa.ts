/**
 * SEPA-Lastschriftdatei (pain.008.001.08, Basislastschrift CORE) für den
 * Beitragseinzug. Rein und ohne Server-Abhängigkeiten, damit sie testbar bleibt.
 */

import { TIME_ZONE } from "@/lib/berlinTime";

/** Vorbelegte Mandatsreferenz eines Mitglieds, z. B. `ID158-Mandat0`. */
export function defaultMandateId(mitgliedId: number | null): string {
  return mitgliedId === null ? "" : `ID${mitgliedId}-Mandat0`;
}

/** Zeichen, die in Mandatsreferenzen erlaubt sind (max. 35 Stellen, kein Leerzeichen). */
export const MANDATE_ID_PATTERN = "[A-Za-z0-9+?/\\-:().,']{1,35}";

/** Gläubiger-ID: Land, Prüfziffer, Geschäftsbereich, nationale Kennung — z. B. DE98ZZZ09999999999. */
export const CREDITOR_ID_PATTERN = "[A-Z]{2}[0-9]{2}[A-Z0-9]{3}[A-Z0-9]{1,28}";

export function isValidMandateId(value: string): boolean {
  return new RegExp(`^${MANDATE_ID_PATTERN}$`).test(value);
}

export function isValidCreditorId(value: string): boolean {
  return new RegExp(`^${CREDITOR_ID_PATTERN}$`).test(value);
}

/** `2026-09-29` in Berliner Zeit — ein Mandat von Mitternacht bleibt am richtigen Tag. */
export function isoDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(date);
}

/**
 * Auf den SEPA-Grundzeichensatz reduziert: Umlaute ausgeschrieben, alles andere
 * Unerlaubte als Leerzeichen. Danach braucht es kein XML-Escaping mehr, weil
 * `&`, `<`, `>` und `"` nicht zum Zeichensatz gehören.
 */
export function sepaText(value: string, max = 70): string {
  return value
    .replace(/Ä/g, "Ae").replace(/Ö/g, "Oe").replace(/Ü/g, "Ue")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9 /\-?:().,'+]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export type SepaCreditor = { name: string; iban: string; bic?: string; creditorId: string };

export type SepaDebit = {
  name: string;
  iban: string;
  bic?: string;
  amount: number;
  mandateId: string;
  /** YYYY-MM-DD */
  mandateDate: string;
  endToEndId: string;
  remittance: string;
};

function agent(bic?: string): string {
  return bic
    ? `<FinInstnId><BICFI>${bic}</BICFI></FinInstnId>`
    : `<FinInstnId><Othr><Id>NOTPROVIDED</Id></Othr></FinInstnId>`;
}

export function buildPain008(input: {
  messageId: string;
  createdAt: Date;
  /** YYYY-MM-DD */
  collectionDate: string;
  sequenceType: "FRST" | "RCUR";
  creditor: SepaCreditor;
  debits: SepaDebit[];
}): string {
  const { creditor, debits } = input;
  // In Cent summieren — sonst landet 0.1 + 0.2 als 0.30000000000000004 in der Kontrollsumme.
  const cents = debits.reduce((sum, d) => sum + Math.round(d.amount * 100), 0);
  const ctrlSum = (cents / 100).toFixed(2);
  const creditorName = sepaText(creditor.name);
  const createdAt = input.createdAt.toISOString().slice(0, 19);

  const transactions = debits
    .map(
      (d) => `
      <DrctDbtTxInf>
        <PmtId><EndToEndId>${sepaText(d.endToEndId, 35)}</EndToEndId></PmtId>
        <InstdAmt Ccy="EUR">${d.amount.toFixed(2)}</InstdAmt>
        <DrctDbtTx><MndtRltdInf><MndtId>${d.mandateId}</MndtId><DtOfSgntr>${d.mandateDate}</DtOfSgntr></MndtRltdInf></DrctDbtTx>
        <DbtrAgt>${agent(d.bic)}</DbtrAgt>
        <Dbtr><Nm>${sepaText(d.name)}</Nm></Dbtr>
        <DbtrAcct><Id><IBAN>${d.iban}</IBAN></Id></DbtrAcct>
        <RmtInf><Ustrd>${sepaText(d.remittance, 140)}</Ustrd></RmtInf>
      </DrctDbtTxInf>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.08" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <CstmrDrctDbtInitn>
    <GrpHdr>
      <MsgId>${input.messageId}</MsgId>
      <CreDtTm>${createdAt}</CreDtTm>
      <NbOfTxs>${debits.length}</NbOfTxs>
      <CtrlSum>${ctrlSum}</CtrlSum>
      <InitgPty><Nm>${creditorName}</Nm></InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>${input.messageId}</PmtInfId>
      <PmtMtd>DD</PmtMtd>
      <BtchBookg>true</BtchBookg>
      <NbOfTxs>${debits.length}</NbOfTxs>
      <CtrlSum>${ctrlSum}</CtrlSum>
      <PmtTpInf>
        <SvcLvl><Cd>SEPA</Cd></SvcLvl>
        <LclInstrm><Cd>CORE</Cd></LclInstrm>
        <SeqTp>${input.sequenceType}</SeqTp>
      </PmtTpInf>
      <ReqdColltnDt>${input.collectionDate}</ReqdColltnDt>
      <Cdtr><Nm>${creditorName}</Nm></Cdtr>
      <CdtrAcct><Id><IBAN>${creditor.iban}</IBAN></Id></CdtrAcct>
      <CdtrAgt>${agent(creditor.bic)}</CdtrAgt>
      <ChrgBr>SLEV</ChrgBr>
      <CdtrSchmeId><Id><PrvtId><Othr><Id>${creditor.creditorId}</Id><SchmeNm><Prtry>SEPA</Prtry></SchmeNm></Othr></PrvtId></Id></CdtrSchmeId>${transactions}
    </PmtInf>
  </CstmrDrctDbtInitn>
</Document>
`;
}
