"use client";

import { Download } from "lucide-react";
import type { SepaCandidate } from "@/lib/server/services/feeService";
import { SEPA_CREDITOR_ID } from "@/lib/membership";
import { CREDITOR_ID_PATTERN, MANDATE_ID_PATTERN, defaultMandateId, isoDate } from "@/lib/sepa";
import { formatDate, formatEuro } from "@/lib/format";
import { formatIban } from "@/lib/iban";
import { IbanInput } from "@/components/IbanInput";
import {
  Badge,
  Button,
  Callout,
  Dialog,
  DialogFooter,
  Field,
  Input,
  Select,
  Separator,
  Table,
  TableWrap,
  Td,
  Th,
} from "@/components/ui";

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Sammellastschrift (pain.008) für die ausgewählten Zeilen der Beitragsliste.
 * Die Route nimmt nur Auswahl, Mandatsreferenz und Mandatsdatum aus dem
 * Formular — Beträge und Bankdaten liest sie selbst aus der Datenbank.
 */
export function SepaDialog({
  year,
  candidates,
  selectedUsers,
  onClose,
}: {
  year: number;
  candidates: SepaCandidate[];
  selectedUsers: Array<{ id: string; vorname: string; name: string | null }>;
  onClose: () => void;
}) {
  const selected = new Set(selectedUsers.map((u) => u.id));
  const ready = candidates.filter((c) => selected.has(c.id) && !c.problem);
  const blocked = candidates.filter((c) => selected.has(c.id) && c.problem);
  const candidateIds = new Set(candidates.map((c) => c.id));
  // Bezahlt, ohne Mandat, ausgetreten oder beitragsfrei — gehört nicht in die Datei.
  const skipped = selectedUsers.filter((u) => !candidateIds.has(u.id));

  // Basislastschrift: frühestens einen Geschäftstag nach Einreichung.
  const now = new Date();
  const today = isoDate(now);
  const tomorrow = isoDate(new Date(now.getTime() + DAY_MS));
  // Neumitglieder: oft anteiliger Beitrag und erster Einzug des Mandats.
  const oneYearAgo = new Date(now.getTime() - 365 * DAY_MS);

  return (
    <Dialog
      open
      onClose={onClose}
      size="lg"
      title={`SEPA-Lastschrift ${year}`}
      description="Erzeugt eine Sammellastschrift-Datei (pain.008) für die ausgewählten offenen Beiträge mit Lastschriftmandat. Die Datei wird im Online-Banking des Vereinskontos hochgeladen und dort per TAN freigegeben."
    >
      <form method="post" action="/api/dashboard/fees/sepa" className="grid gap-4">
        <input type="hidden" name="year" value={year} />

        <h3 className="font-bold tracking-tight">Vereinskonto (Zahlungsempfänger)</h3>
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

        <h3 className="font-bold tracking-tight">Einzug</h3>
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

        <Separator />

        <h3 className="font-bold tracking-tight">
          Einzug für {ready.length} {ready.length === 1 ? "Mitglied" : "Mitglieder"} (
          {formatEuro(ready.reduce((sum, c) => sum + c.amount, 0))})
        </h3>
        <p className="-mt-2 text-sm text-muted text-pretty">
          Mandatsreferenz und Mandatsdatum müssen bei jedem Einzug gleich bleiben. „Mitglied seit …“
          markiert Mitglieder, die noch kein Jahr dabei sind — oft ihr erster Einzug.
        </p>

        {ready.length === 0 ? (
          <p className="text-sm text-muted">
            Unter den ausgewählten Mitgliedern ist kein offener Beitrag per Lastschrift.
          </p>
        ) : (
          <TableWrap>
            <Table className="min-w-[560px]">
              <thead>
                <tr>
                  <Th>Mitglied</Th>
                  <Th className="text-right">Betrag</Th>
                  <Th>Mandatsreferenz</Th>
                  <Th>Mandat vom</Th>
                </tr>
              </thead>
              <tbody>
                {ready.map((c) => (
                  <tr key={c.id}>
                    <Td>
                      <input type="hidden" name="include" value={c.id} />
                      {c.name}
                      <span className="block text-xs whitespace-nowrap text-muted tabular-nums">
                        {c.mitgliedId !== null && `Nr. ${c.mitgliedId} · `}
                        {formatIban(c.iban!)}
                      </span>
                      {c.aufnahmedatum && new Date(c.aufnahmedatum) > oneYearAgo && (
                        <Badge tone="info" className="mt-1">
                          Mitglied seit {formatDate(c.aufnahmedatum)}
                        </Badge>
                      )}
                    </Td>
                    <Td className="text-right tabular-nums">{formatEuro(c.amount)}</Td>
                    <Td>
                      <Input
                        name={`mandate_${c.id}`}
                        defaultValue={defaultMandateId(c.mitgliedId)}
                        pattern={MANDATE_ID_PATTERN}
                        aria-label={`Mandatsreferenz ${c.name}`}
                        className="min-w-36"
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
          <Callout tone="warning">
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

        {skipped.length > 0 && (
          <details className="text-sm text-muted">
            <summary className="cursor-pointer">
              {skipped.length} ausgewählte {skipped.length === 1 ? "Person" : "Personen"} ohne SEPA
            </summary>
            <p className="mt-1">
              {skipped.map((u) => [u.vorname, u.name].filter(Boolean).join(" ")).join(", ")}
            </p>
          </details>
        )}

        <DialogFooter>
          <Button variant="soft" color="neutral" type="button" onClick={onClose}>
            Schließen
          </Button>
          <Button type="submit" disabled={ready.length === 0}>
            <Download size={16} aria-hidden="true" />
            SEPA-Datei herunterladen
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
