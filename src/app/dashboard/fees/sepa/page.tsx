import type { Metadata } from "next";
import { Download } from "lucide-react";
import { requireAdmin } from "@/lib/server/authz";
import { getSepaCandidates } from "@/lib/server/services/feeService";
import { SEPA_CREDITOR_ID } from "@/lib/membership";
import { CREDITOR_ID_PATTERN, MANDATE_ID_PATTERN, defaultMandateId, isoDate } from "@/lib/sepa";
import { formatDate, formatEuro } from "@/lib/format";
import { formatIban } from "@/lib/iban";
import { IbanInput } from "@/components/IbanInput";
import {
  Badge,
  Button,
  Callout,
  Card,
  Checkbox,
  Container,
  Field,
  Input,
  Select,
  Separator,
  Table,
  TableWrap,
  Td,
  Th,
} from "@/components/ui";
import { DashboardPageHeader } from "../../DashboardPageHeader";

export const metadata: Metadata = { title: "SEPA-Export" };

export default async function SepaExportPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const admin = await requireAdmin();

  const requested = Number((await searchParams).year);
  const year =
    Number.isInteger(requested) && requested >= 2000 && requested <= 2100
      ? requested
      : new Date().getFullYear();

  const candidates = await getSepaCandidates(admin.id, year);
  const ready = candidates.filter((c) => !c.problem);
  const blocked = candidates.filter((c) => c.problem);
  // Basislastschrift: frühestens einen Geschäftstag nach Einreichung.
  const now = new Date();
  const today = isoDate(now);
  const tomorrow = isoDate(new Date(now.getTime() + 24 * 60 * 60 * 1000));
  // Neumitglieder: oft anteiliger Beitrag und erster Einzug des Mandats.
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  return (
    <Container size="4" className="py-8 sm:py-12">
      <DashboardPageHeader
        eyebrow="Internbereich"
        title={`SEPA-Lastschrift ${year}`}
        description="Erzeugt eine Sammellastschrift-Datei (pain.008) für alle offenen Beiträge mit Lastschriftmandat. Die Datei wird im Online-Banking des Vereinskontos hochgeladen und dort per TAN freigegeben."
        backHref={`/dashboard/fees?year=${year}`}
        backLabel="Zurück zu den Beiträgen"
      />

      <form method="post" action="/api/dashboard/fees/sepa" className="grid gap-4 sm:gap-6">
        <input type="hidden" name="year" value={year} />

        <Card className="grid gap-4 p-4 sm:p-6">
          <h2 className="text-lg font-bold tracking-tight">Vereinskonto (Zahlungsempfänger)</h2>
          <div className="grid items-start gap-4 sm:grid-cols-2">
            <Field label="Kontoinhaber" required>
              <Input name="creditorName" required maxLength={70} />
            </Field>
            <Field label="Gläubiger-ID" required>
              <Input
                name="creditorId"
                required
                defaultValue={SEPA_CREDITOR_ID}
                pattern={CREDITOR_ID_PATTERN}
                placeholder="DE98ZZZ09999999999"
              />
            </Field>
            <Field label="IBAN" required>
              <IbanInput name="creditorIban" required />
            </Field>
            <Field label="BIC" hint="Optional">
              <Input name="creditorBic" autoComplete="off" />
            </Field>
          </div>

          <Separator />

          <h2 className="text-lg font-bold tracking-tight">Einzug</h2>
          <div className="grid items-start gap-4 sm:grid-cols-2">
            <Field
              label="Fälligkeitsdatum"
              required
              hint="Die Datei muss mindestens einen Bankarbeitstag vorher eingereicht werden."
            >
              <Input name="collectionDate" type="date" required min={tomorrow} />
            </Field>
            <Field
              label="Lastschriftart"
              hint="„Erstlastschrift“ nur beim allerersten Einzug eines Mandats. Die meisten Banken akzeptieren inzwischen immer „Folgelastschrift“."
            >
              <Select name="sequenceType" defaultValue="RCUR">
                <option value="RCUR">Folgelastschrift (RCUR)</option>
                <option value="FRST">Erstlastschrift (FRST)</option>
              </Select>
            </Field>
            <Field
              label="Verwendungszweck"
              required
              hint="Steht auf dem Kontoauszug jedes Mitglieds. Umlaute werden ausgeschrieben, Sonderzeichen wie & entfallen."
              className="sm:col-span-2"
            >
              <Input
                name="remittance"
                required
                maxLength={140}
                defaultValue={`Mitgliedsbeitrag ${year}`}
              />
            </Field>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <h2 className="text-lg font-bold tracking-tight">
            Mitglieder ({ready.length}, {formatEuro(ready.reduce((s, c) => s + c.amount, 0))})
          </h2>
          <p className="mb-3 text-sm text-muted text-pretty">
            Offene Beiträge {year} mit Lastschriftmandat. Mandatsreferenz und Mandatsdatum
            müssen bei jedem Einzug gleich bleiben. „Mitglied seit …“ markiert Mitglieder, die
            noch kein Jahr dabei sind — oft ihr erster Einzug.
          </p>

          {ready.length === 0 ? (
            <p className="text-sm text-muted">Keine offenen Beiträge per Lastschrift.</p>
          ) : (
            <TableWrap>
              <Table className="min-w-[720px]">
                <thead>
                  <tr>
                    <Th><span className="sr-only">Einziehen</span></Th>
                    <Th>Mitglied</Th>
                    <Th>IBAN</Th>
                    <Th className="text-right">Betrag</Th>
                    <Th>Mandatsreferenz</Th>
                    <Th>Mandat vom</Th>
                  </tr>
                </thead>
                <tbody>
                  {ready.map((c) => (
                    <tr key={c.id}>
                      <Td>
                        <Checkbox
                          name="include"
                          value={c.id}
                          defaultChecked
                          aria-label={`${c.name} einziehen`}
                        />
                      </Td>
                      <Td>
                        {c.name}
                        {c.mitgliedId !== null && (
                          <span className="block text-xs text-muted">Nr. {c.mitgliedId}</span>
                        )}
                        {c.aufnahmedatum && c.aufnahmedatum > oneYearAgo && (
                          <Badge tone="info" className="mt-1">
                            Mitglied seit {formatDate(c.aufnahmedatum)}
                          </Badge>
                        )}
                      </Td>
                      <Td className="whitespace-nowrap tabular-nums">{formatIban(c.iban!)}</Td>
                      <Td className="text-right tabular-nums">{formatEuro(c.amount)}</Td>
                      <Td>
                        <Input
                          name={`mandate_${c.id}`}
                          defaultValue={defaultMandateId(c.mitgliedId)}
                          pattern={MANDATE_ID_PATTERN}
                          aria-label={`Mandatsreferenz ${c.name}`}
                          className="min-w-40"
                        />
                      </Td>
                      <Td>
                        <Input
                          name={`mandateDate_${c.id}`}
                          type="date"
                          defaultValue={c.mandateDate}
                          max={today}
                          aria-label={`Mandatsdatum ${c.name}`}
                        />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrap>
          )}

          {blocked.length > 0 && (
            <Callout tone="warning" className="mt-4">
              <p className="font-semibold">Nicht im Export — Bankdaten fehlen:</p>
              <ul className="mt-1 list-disc pl-5">
                {blocked.map((c) => (
                  <li key={c.id}>
                    {c.name}: {c.problem}
                  </li>
                ))}
              </ul>
            </Callout>
          )}
        </Card>

        <div>
          <Button type="submit" disabled={ready.length === 0}>
            <Download size={16} aria-hidden="true" />
            SEPA-Datei herunterladen
          </Button>
        </div>
      </form>
    </Container>
  );
}
