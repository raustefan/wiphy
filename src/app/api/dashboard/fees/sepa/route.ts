import { NextResponse } from "next/server";
import { getOptionalUser } from "@/lib/server/authz";
import { getSepaCandidates } from "@/lib/server/services/feeService";
import { isValidBic, isValidIban, normalizeIban } from "@/lib/iban";
import { buildPain008, isValidCreditorId, isValidMandateId, isoDate, sepaText } from "@/lib/sepa";

function field(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Nimmt das Formular von `/dashboard/fees/sepa` entgegen und liefert die
 * pain.008-Datei. Beträge und Bankdaten der Mitglieder kommen aus der
 * Datenbank, nicht aus dem Formular — von dort nur Auswahl, Mandatsreferenz
 * und das Mandatsdatum für Altmandate ohne erfasstes Datum.
 */
export async function POST(request: Request) {
  const user = await getOptionalUser();
  if (!user) return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  if (user.role !== "ADMIN") return NextResponse.json({ error: "Keine Berechtigung" }, { status: 403 });

  const formData = await request.formData();
  const year = Number(field(formData, "year"));
  const creditorName = field(formData, "creditorName");
  const creditorId = field(formData, "creditorId").toUpperCase();
  const creditorIban = normalizeIban(field(formData, "creditorIban"));
  const creditorBic = field(formData, "creditorBic").replace(/\s/g, "").toUpperCase();
  const collectionDate = field(formData, "collectionDate");
  const sequenceType = field(formData, "sequenceType") === "FRST" ? "FRST" : "RCUR";
  const remittance = sepaText(field(formData, "remittance"), 140);
  const included = new Set(formData.getAll("include").map(String));

  const errors: string[] = [];
  if (!Number.isInteger(year) || year < 2000 || year > 2100) errors.push("Ungültiges Jahr.");
  if (!creditorName) errors.push("Kontoinhaber fehlt.");
  if (!remittance) errors.push("Verwendungszweck fehlt.");
  if (!isValidCreditorId(creditorId)) errors.push("Gläubiger-ID ungültig.");
  if (!isValidIban(creditorIban)) errors.push("IBAN des Vereinskontos ungültig.");
  if (creditorBic && !isValidBic(creditorBic)) errors.push("BIC des Vereinskontos ungültig.");
  if (!DATE.test(collectionDate) || collectionDate <= isoDate(new Date())) {
    errors.push("Fälligkeitsdatum muss in der Zukunft liegen.");
  }

  const candidates = (await getSepaCandidates(user.id, year)).filter(
    (c) => !c.problem && included.has(c.id),
  );
  if (candidates.length === 0) errors.push("Keine Mitglieder ausgewählt.");

  const debits = candidates.map((c) => {
    const mandateId = field(formData, `mandate_${c.id}`);
    const mandateDate = field(formData, `mandateDate_${c.id}`);
    if (!isValidMandateId(mandateId)) errors.push(`${c.name}: Mandatsreferenz fehlt oder ist ungültig.`);
    if (!DATE.test(mandateDate)) errors.push(`${c.name}: Mandatsdatum fehlt.`);
    return {
      name: c.name,
      iban: c.iban!,
      bic: c.bic ?? undefined,
      amount: c.amount,
      mandateId,
      mandateDate,
      endToEndId: `BEITRAG-${year}-${c.mitgliedId ?? c.id}`,
      remittance,
    };
  });

  if (new Set(debits.map((d) => d.mandateId)).size !== debits.length) {
    errors.push("Mandatsreferenzen müssen eindeutig sein.");
  }

  if (errors.length > 0) {
    return new NextResponse(`SEPA-Export nicht möglich:\n\n${errors.join("\n")}\n\nBitte zurückgehen und korrigieren.`, {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const now = new Date();
  const xml = buildPain008({
    messageId: `WIPHY-${year}-${now.getTime()}`,
    createdAt: now,
    collectionDate,
    sequenceType,
    creditor: { name: creditorName, iban: creditorIban, bic: creditorBic || undefined, creditorId },
    debits,
  });

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Content-Disposition": `attachment; filename="sepa-lastschrift-${year}.xml"`,
    },
  });
}
