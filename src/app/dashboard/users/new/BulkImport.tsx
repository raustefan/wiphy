"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Alert01Icon, ArrowDown01Icon, CheckmarkCircle01Icon, Delete02Icon, Download01Icon, FileScriptIcon, PencilIcon, Upload01Icon } from "@hugeicons/core-free-icons";
import { Fragment, useState, useTransition } from "react";
import {
    Badge,
    Button,
    Callout,
    Checkbox,
    Dialog,
    DialogFooter,
    Table,
    TableWrap,
    Td,
    TextArea,
    Th,
    type CalloutTone,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import { countryName, isCountryCode, toCountryCode } from "@/lib/countries";
import { formatIban } from "@/lib/iban";
import { formatStatus, getStatusTone } from "@/lib/statusLabels";
import { bulkCreateUsersAction, type ImportIssue, type ImportRowResult } from "./actions";
import { EXAMPLE, FEE_FIELDS, FEES_EXAMPLE, IMPORT_SECTIONS, PAYMENT_FIELDS, type ImportEntry } from "./importFormat";

const IMPORT_BATCH_SIZE = 20;

type ImportReport = {
    created: { name: string; email: string; mailFailed: boolean }[];
    notCreated: { name: string; email: string; issues: ImportIssue[] }[];
};

/**
 * JSON-Massenimport für die Übernahme bestehender Alumni. Nach dem Laden wird
 * sofort geprüft; die Vorschau zeigt je Person das Wesentliche in einer Zeile
 * und auf Klick alle Felder — Fehler stehen direkt am betroffenen Feld.
 */
export function BulkImport() {
    const [entries, setEntries] = useState<ImportEntry[]>([]);
    const [results, setResults] = useState<(ImportRowResult | undefined)[]>([]);
    const [fileName, setFileName] = useState<string | null>(null);
    const [notify, setNotify] = useState(true);
    const [notice, setNotice] = useState<{ tone: CalloutTone; text: string } | null>(null);
    const [open, setOpen] = useState<number | null>(null);
    const [onlyErrors, setOnlyErrors] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
    const [report, setReport] = useState<ImportReport | null>(null);
    const [pending, startTransition] = useTransition();

    const ready = entries.filter((_, i) => results[i]?.issues.length === 0).length;
    const failed = entries.filter((_, i) => (results[i]?.issues.length ?? 0) > 0).length;
    const unchecked = entries.length - ready - failed;

    function check(list: ImportEntry[]) {
        startTransition(async () => {
            const res = await bulkCreateUsersAction(list, notify, true);
            setResults(res);
            const errors = res.filter((r) => r.issues.length > 0).length;
            setNotice(
                errors
                    ? { tone: "warning", text: `${errors} von ${list.length} Einträgen haben Fehler. Details mit Klick auf die Zeile.` }
                    : { tone: "success", text: `Alle ${list.length} Einträge sind bereit zum Anlegen.` },
            );
        });
    }

    async function loadFile(file: File) {
        setFileName(file.name);
        setOpen(null);
        setResults([]);
        setReport(null);
        try {
            const data: unknown = JSON.parse(await file.text());
            const list = Array.isArray(data) ? data : [data];
            if (!list.every((e) => e && typeof e === "object" && !Array.isArray(e))) {
                throw new Error("Erwartet wird ein Array von Objekten — ein Objekt je Person.");
            }
            setEntries(list as ImportEntry[]);
            check(list as ImportEntry[]);
        } catch (error) {
            setEntries([]);
            setNotice({ tone: "danger", text: `Die Datei ist kein gültiges Import-JSON: ${(error as Error).message}` });
        }
    }

    function replaceEntry(index: number, entry: ImportEntry | null) {
        const list = entry ? entries.map((e, i) => (i === index ? entry : e)) : entries.filter((_, i) => i !== index);
        setEntries(list);
        setOpen(entry ? index : null);
        if (list.length) check(list);
        else setResults([]);
    }

    /**
     * Legt in Blöcken an: jedes Konto kostet einen bcrypt-Hash und ggf. eine
     * Mail, ein einziger Aufruf für Hunderte Einträge liefe in den
     * Proxy-Timeout (nginx: 60 s). Feste Mitgliedsnummern zuerst über alle
     * Blöcke, sonst könnte eine automatisch vergebene Nummer (max + 1) einer
     * späteren festen in die Quere kommen.
     */
    function create() {
        setConfirming(false);
        setOpen(null);
        setReport(null);
        const order = entries
            .map((_, i) => i)
            .filter((i) => results[i]?.issues.length === 0)
            .sort((a, b) => Number(typeof entries[a].memberNumber !== "number") - Number(typeof entries[b].memberNumber !== "number"));
        startTransition(async () => {
            const res = [...results] as ImportRowResult[];
            for (let start = 0; start < order.length; start += IMPORT_BATCH_SIZE) {
                setProgress({ done: start, total: order.length });
                const batch = order.slice(start, start + IMPORT_BATCH_SIZE);
                try {
                    const out = await bulkCreateUsersAction(batch.map((i) => entries[i]), notify, false);
                    batch.forEach((i, k) => (res[i] = out[k]));
                } catch (error) {
                    console.error("Import batch failed:", error);
                    // Der Server kann trotzdem angelegt haben — „Erneut prüfen“ meldet die dann als vorhanden.
                    const issues = [{ field: "", message: "Keine Antwort vom Server, Konto evtl. trotzdem angelegt. Bitte erneut prüfen." }];
                    batch.forEach((i) => (res[i] = { issues, created: false }));
                }
            }
            setProgress(null);

            const person = (i: number) => ({
                name: [entries[i].firstName, entries[i].lastName].filter(Boolean).join(" ") || "—",
                email: String(entries[i].email ?? "—"),
            });
            const created = order.filter((i) => res[i].created).map((i) => ({ ...person(i), mailFailed: !!res[i].mailFailed }));
            const notCreated = entries
                .map((_, i) => i)
                .filter((i) => !res[i].created)
                .map((i) => ({ ...person(i), issues: res[i].issues }));
            setReport({ created, notCreated });

            // Angelegte Einträge verschwinden, fehlerhafte bleiben zum Korrigieren.
            setEntries(entries.filter((_, i) => !res[i].created));
            setResults(res.filter((r) => !r.created));
            const mailFailed = created.filter((c) => c.mailFailed).length;
            setNotice({
                tone: notCreated.length || mailFailed ? "warning" : "success",
                text:
                    `${created.length} ${created.length === 1 ? "Konto" : "Konten"} angelegt.` +
                    (notCreated.length
                        ? ` ${notCreated.length} ${notCreated.length === 1 ? "Eintrag bleibt" : "Einträge bleiben"} wegen Fehlern stehen.`
                        : "") +
                    (mailFailed ? ` ${mailFailed} E-Mails konnten nicht verschickt werden.` : "") +
                    " Einzelheiten im Ergebnis unten.",
            });
        });
    }

    const visible = entries.map((entry, index) => ({ entry, index })).filter(({ index }) => !onlyErrors || (results[index]?.issues.length ?? 0) > 0);

    return (
        <div className="grid gap-5">
            <p className="text-sm text-muted text-pretty">
                Übernimmt bestehende Alumni aus einer JSON-Datei: ein Array mit einem Objekt je Person.
                Die Feldnamen entsprechen dem Datenmodell; nur Vorname, Nachname und E-Mail sind Pflicht.
                Mit <code className="font-mono text-foreground">allPaid: true</code> legt die App alle
                Beitragsjahre seit dem Beitritt zum Standardsatz an und markiert sie als bezahlt.
            </p>

            <FieldReference />

            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-stretch">
                <label
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragging(false);
                        const file = e.dataTransfer.files[0];
                        if (file) loadFile(file);
                    }}
                    className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-[3px] border-2 border-dashed px-4 py-5 transition-colors",
                        "focus-within:border-physics hover:border-physics",
                        dragging ? "border-physics bg-physics/5" : "border-line-strong",
                    )}
                >
                    <HugeiconsIcon icon={Upload01Icon} size={20} aria-hidden="true" className="shrink-0 text-physics" />
                    <span className="grid min-w-0 text-sm">
                        <span className="font-semibold">
                            {fileName ? (
                                <span className="flex items-center gap-1.5 truncate">
                                    <HugeiconsIcon icon={FileScriptIcon} size={15} aria-hidden="true" /> {fileName}
                                </span>
                            ) : (
                                "JSON-Datei hierher ziehen oder auswählen"
                            )}
                        </span>
                        <span className="text-muted">
                            {fileName ? "Andere Datei wählen, um neu zu laden." : "Bis zu 2000 Einträge je Datei."}
                        </span>
                    </span>
                    <input
                        type="file"
                        accept="application/json,.json"
                        className="sr-only"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) loadFile(file);
                            e.target.value = "";
                        }}
                    />
                </label>
                <Button type="button" variant="soft" color="neutral" className="h-auto" onClick={downloadTemplate}>
                    <HugeiconsIcon icon={Download01Icon} size={16} aria-hidden="true" /> Vorlage herunterladen
                </Button>
            </div>

            {progress ? (
                <Callout tone="info">
                    Lege Konten an … {progress.done} von {progress.total} erledigt. Seite bitte nicht schließen.
                </Callout>
            ) : (
                notice && <Callout tone={notice.tone}>{notice.text}</Callout>
            )}

            {report && !progress && <ImportReportView report={report} />}

            {entries.length > 0 && (
                <>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <Badge>{entries.length} Einträge</Badge>
                        <Badge tone="positive">{ready} bereit</Badge>
                        {failed > 0 && <Badge tone="negative">{failed} mit Fehlern</Badge>}
                        {unchecked > 0 && <Badge tone="warning">{unchecked} ungeprüft</Badge>}
                        {failed > 0 && (
                            <label className="ml-auto flex cursor-pointer items-center gap-2">
                                <Checkbox checked={onlyErrors} onChange={(e) => setOnlyErrors(e.target.checked)} />
                                Nur fehlerhafte zeigen
                            </label>
                        )}
                    </div>

                    <TableWrap className="rounded-[3px] border border-line">
                        <Table className="min-w-[720px]">
                            <thead>
                                <tr>
                                    <Th>Person</Th>
                                    <Th>Nr.</Th>
                                    <Th>Status</Th>
                                    <Th>Land</Th>
                                    <Th>Zahlung</Th>
                                    <Th>Beiträge</Th>
                                    <Th>Prüfung</Th>
                                    <Th>
                                        <span className="sr-only">Details</span>
                                    </Th>
                                </tr>
                            </thead>
                            <tbody>
                                {visible.map(({ entry, index }) => (
                                    <Fragment key={index}>
                                        <EntryRow
                                            entry={entry}
                                            result={results[index]}
                                            open={open === index}
                                            onToggle={() => setOpen(open === index ? null : index)}
                                            detailsId={`import-entry-${index}`}
                                        />
                                        {open === index && (
                                            <tr id={`import-entry-${index}`}>
                                                <td colSpan={8} className="border-t border-line bg-raised/40 p-4 sm:p-5">
                                                    <EntryDetails
                                                        entry={entry}
                                                        issues={results[index]?.issues ?? []}
                                                        onReplace={(next) => replaceEntry(index, next)}
                                                    />
                                                </td>
                                            </tr>
                                        )}
                                    </Fragment>
                                ))}
                            </tbody>
                        </Table>
                    </TableWrap>

                    <div className="sticky bottom-0 z-10 -mx-5 grid gap-3 border-t border-line bg-surface px-5 pt-4 pb-1 sm:-mx-6 sm:flex sm:flex-wrap sm:items-center sm:px-6">
                        <label className="flex cursor-pointer items-start gap-2 text-sm sm:mr-auto">
                            <Checkbox checked={notify} onChange={(e) => setNotify(e.target.checked)} className="mt-0.5" />
                            <span>
                                <span className="font-semibold">Zugangsdaten per E-Mail schicken</span>
                                <span className="block text-muted">Mit Zufallspasswort und der Bitte, es zu ändern.</span>
                            </span>
                        </label>
                        <Button type="button" variant="soft" color="neutral" disabled={pending} onClick={() => check(entries)}>
                            Erneut prüfen
                        </Button>
                        <Button type="button" disabled={pending || ready === 0 || unchecked > 0} onClick={() => setConfirming(true)}>
                            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} aria-hidden="true" />
                            {ready} {ready === 1 ? "Konto" : "Konten"} anlegen
                        </Button>
                    </div>
                </>
            )}

            <Dialog
                open={confirming}
                onClose={() => setConfirming(false)}
                title={`${ready} ${ready === 1 ? "Konto" : "Konten"} anlegen?`}
                description={
                    notify
                        ? "Jede Person bekommt sofort eine E-Mail mit ihren Zugangsdaten. Das lässt sich nicht zurückholen."
                        : "Es werden keine E-Mails verschickt — die Zugangsdaten musst du selbst weitergeben oder per „Passwort vergessen“ setzen lassen."
                }
            >
                {failed > 0 && (
                    <p className="text-sm text-muted">
                        {failed} fehlerhafte {failed === 1 ? "Eintrag bleibt" : "Einträge bleiben"} stehen und
                        {failed === 1 ? " wird" : " werden"} nicht angelegt.
                    </p>
                )}
                <DialogFooter>
                    <Button variant="soft" color="neutral" type="button" onClick={() => setConfirming(false)}>
                        Abbrechen
                    </Button>
                    <Button type="button" onClick={create}>
                        Jetzt anlegen
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

function downloadTemplate() {
    const blob = new Blob([JSON.stringify([EXAMPLE], null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "alumni-import-vorlage.json";
    a.click();
    URL.revokeObjectURL(a.href);
}

/** Ergebnis des letzten Imports: wer angelegt wurde und wer nicht, mit Grund. */
function ImportReportView({ report }: { report: ImportReport }) {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            <section className="rounded-[3px] border border-line p-4">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Badge tone="positive">{report.created.length}</Badge> angelegt
                </h4>
                <ul className="grid max-h-96 gap-1.5 overflow-y-auto text-sm">
                    {report.created.map((c) => (
                        <li key={c.email}>
                            <span className="font-semibold">{c.name}</span>{" "}
                            <span className="break-all text-muted">{c.email}</span>
                            {c.mailFailed && <span className="block text-xs text-negative">E-Mail nicht verschickt</span>}
                        </li>
                    ))}
                    {report.created.length === 0 && <li className="text-muted">Keine.</li>}
                </ul>
            </section>
            <section className="rounded-[3px] border border-line p-4">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Badge tone="negative">{report.notCreated.length}</Badge> nicht angelegt
                </h4>
                <ul className="grid max-h-96 gap-1.5 overflow-y-auto text-sm">
                    {report.notCreated.map((c, i) => (
                        <li key={i}>
                            <span className="font-semibold">{c.name}</span>{" "}
                            <span className="break-all text-muted">{c.email}</span>
                            {c.issues.map((issue, k) => (
                                <span key={k} className="block text-xs text-negative">
                                    {issue.field && <code className="font-mono">{issue.field}: </code>}
                                    {issue.message}
                                </span>
                            ))}
                        </li>
                    ))}
                    {report.notCreated.length === 0 && <li className="text-muted">Keine.</li>}
                </ul>
            </section>
        </div>
    );
}

/** Aufklappbare Liste aller Felder mit Bedeutung und Format. */
function FieldReference() {
    return (
        <details className="group rounded-[3px] border border-line">
            <summary className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3 text-sm font-semibold">
                Welche Felder gibt es?
                <HugeiconsIcon icon={ArrowDown01Icon} size={16} aria-hidden="true" className="text-muted transition-transform group-open:rotate-180" />
            </summary>
            <div className="grid gap-5 border-t border-line px-4 py-4">
                {[
                    ...IMPORT_SECTIONS,
                    { title: "Beiträge", fields: PAYMENT_FIELDS },
                    { title: "fees — ein Objekt je Jahr", fields: FEE_FIELDS },
                ].map((section) => (
                    <div key={section.title}>
                        <h4 className="mb-1.5 text-xs font-semibold tracking-wide text-muted uppercase">{section.title}</h4>
                        <dl className="grid gap-x-4 gap-y-1 text-sm sm:grid-cols-[11rem_1fr]">
                            {section.fields.map((field) => (
                                <div key={field.key} className="contents">
                                    <dt className="font-mono text-xs leading-6 text-physics">{field.key}</dt>
                                    <dd className="text-pretty">
                                        {field.label} <span className="text-muted">· {field.format}</span>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                ))}
                <div>
                    <p className="mb-1.5 text-sm text-muted">
                        Beispiel für <code className="font-mono">fees</code>, wenn nicht alles bezahlt ist
                        (dann <code className="font-mono">allPaid: false</code>):
                    </p>
                    <pre className="overflow-x-auto rounded-[3px] bg-raised p-3 font-mono text-xs">
                        {JSON.stringify(FEES_EXAMPLE, null, 2)}
                    </pre>
                </div>
            </div>
        </details>
    );
}

function EntryRow({
    entry,
    result,
    open,
    onToggle,
    detailsId,
}: {
    entry: ImportEntry;
    result: ImportRowResult | undefined;
    open: boolean;
    onToggle: () => void;
    detailsId: string;
}) {
    const name = [entry.firstName, entry.lastName].filter(Boolean).join(" ") || "—";
    const status = typeof entry.status === "string" && entry.status ? entry.status : "NON_MEMBER";
    const fees = Array.isArray(entry.fees) ? (entry.fees as ImportEntry[]) : null;
    const issueCount = result?.issues.length ?? 0;

    return (
        <tr
            onClick={onToggle}
            className={cn("cursor-pointer hover:bg-raised/60", open && "bg-raised/60", issueCount > 0 && "bg-negative/4")}
        >
            <Td>
                <span className="block font-semibold">{name}</span>
                <span className="block text-xs break-all text-muted">{String(entry.email ?? "—")}</span>
            </Td>
            <Td className="tabular-nums">{entry.memberNumber != null ? String(entry.memberNumber) : <span className="text-muted">neu</span>}</Td>
            <Td>
                <Badge tone={getStatusTone(status)}>{formatStatus(status)}</Badge>
            </Td>
            <Td>{display("countryCode", entry.countryCode)}</Td>
            <Td>{entry.directDebit === true ? "Lastschrift" : "Überweisung"}</Td>
            <Td className="whitespace-nowrap">
                {entry.allPaid === true ? (
                    <>
                        alle bezahlt
                        <span className="block text-xs text-muted">seit {String(entry.joinedAt ?? "—").slice(0, 4)}</span>
                    </>
                ) : fees ? (
                    <>
                        {fees.length} Jahre
                        <span className="block text-xs text-muted">{fees.filter((f) => f.paid === true).length} bezahlt</span>
                    </>
                ) : (
                    <span className="text-muted">automatisch, offen</span>
                )}
            </Td>
            <Td>
                {!result ? (
                    <span className="text-muted">…</span>
                ) : issueCount ? (
                    <Badge tone="negative">
                        <HugeiconsIcon icon={Alert01Icon} size={12} aria-hidden="true" /> {issueCount} Fehler
                    </Badge>
                ) : (
                    <Badge tone="positive">
                        <HugeiconsIcon icon={CheckmarkCircle01Icon} size={12} aria-hidden="true" /> Bereit
                    </Badge>
                )}
            </Td>
            <Td className="text-right">
                <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={detailsId}
                    aria-label={`Details zu ${name}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle();
                    }}
                    className="rounded-[3px] p-1 text-muted hover:text-foreground"
                >
                    <HugeiconsIcon icon={ArrowDown01Icon} size={18} aria-hidden="true" className={cn("transition-transform", open && "rotate-180")} />
                </button>
            </Td>
        </tr>
    );
}

/** Alle Felder eines Eintrags nach Themen, Fehler am jeweiligen Feld. */
function EntryDetails({
    entry,
    issues,
    onReplace,
}: {
    entry: ImportEntry;
    issues: ImportIssue[];
    onReplace: (entry: ImportEntry | null) => void;
}) {
    const [draft, setDraft] = useState<string | null>(null);
    const [draftError, setDraftError] = useState<string | null>(null);
    const issueFor = (field: string) => issues.filter((issue) => issue.field === field);
    // Fehler ohne eigenes Feld in der Übersicht: unbekannte Schlüssel, Serverfehler.
    const known = new Set([...IMPORT_SECTIONS.flatMap((s) => s.fields.map((f) => f.key)), "allPaid"]);
    const general = issues.filter((issue) => !known.has(issue.field) && !issue.field.startsWith("fees"));
    const fees = Array.isArray(entry.fees) ? (entry.fees as ImportEntry[]) : [];

    if (draft !== null) {
        return (
            <div className="grid gap-3">
                <TextArea
                    aria-label="Eintrag als JSON"
                    rows={18}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className="font-mono text-xs"
                    spellCheck={false}
                />
                {draftError && <Callout tone="danger">{draftError}</Callout>}
                <div className="flex gap-2">
                    <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                            try {
                                const next: unknown = JSON.parse(draft);
                                if (!next || typeof next !== "object" || Array.isArray(next)) throw new Error("Erwartet wird ein einzelnes Objekt.");
                                onReplace(next as ImportEntry);
                                setDraft(null);
                            } catch (error) {
                                setDraftError(`Kein gültiges JSON: ${(error as Error).message}`);
                            }
                        }}
                    >
                        Übernehmen und prüfen
                    </Button>
                    <Button type="button" size="sm" variant="soft" color="neutral" onClick={() => setDraft(null)}>
                        Abbrechen
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-5">
            {general.length > 0 && (
                <Callout tone="danger">
                    <ul className="grid gap-1">
                        {general.map((issue, i) => (
                            <li key={i}>
                                {issue.field && <code className="mr-1 font-mono">{issue.field}:</code>}
                                {issue.message}
                            </li>
                        ))}
                    </ul>
                </Callout>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
                {IMPORT_SECTIONS.map((section) => (
                    <section key={section.title}>
                        <h4 className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">{section.title}</h4>
                        <dl className="grid gap-2 text-sm">
                            {section.fields.map((field) => {
                                const fieldIssues = issueFor(field.key);
                                return (
                                    <div key={field.key} className="grid grid-cols-[10rem_1fr] gap-2">
                                        <dt className="text-muted">{field.label}</dt>
                                        <dd className={cn("min-w-0 break-words", fieldIssues.length > 0 && "font-semibold text-negative")}>
                                            {display(field.key, entry[field.key])}
                                            {fieldIssues.map((issue, i) => (
                                                <span key={i} className="mt-0.5 flex items-start gap-1 text-xs font-normal">
                                                    <HugeiconsIcon icon={Alert01Icon} size={12} aria-hidden="true" className="mt-0.5 shrink-0" />
                                                    {issue.message}
                                                </span>
                                            ))}
                                        </dd>
                                    </div>
                                );
                            })}
                        </dl>
                    </section>
                ))}
            </div>

            <section>
                <h4 className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Beiträge</h4>
                {issueFor("allPaid").map((issue, i) => (
                    <p key={i} className="mb-2 flex items-start gap-1 text-sm font-semibold text-negative">
                        <HugeiconsIcon icon={Alert01Icon} size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                        {issue.message}
                    </p>
                ))}
                {entry.allPaid === true && fees.length === 0 ? (
                    <p className="text-sm">
                        Alle Jahre seit dem Beitritt ({display("joinedAt", entry.joinedAt)}) bis heute zum
                        Standardsatz — als <span className="font-semibold">bezahlt</span>.
                    </p>
                ) : fees.length === 0 ? (
                    <p className="text-sm text-muted">
                        Keine angegeben — die App legt die Beitragsjahre ab dem Beitritt an, alle als offen.
                    </p>
                ) : (
                    <Table className="text-sm">
                        <thead>
                            <tr>
                                {FEE_FIELDS.map((field) => (
                                    <Th key={field.key}>{field.label}</Th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {fees.map((fee, i) => {
                                const feeIssues = issues.filter((issue) => issue.field.startsWith(`fees.${i}`) || issue.field === `fees`);
                                return (
                                    <tr key={i} className={cn(feeIssues.length > 0 && "text-negative")}>
                                        {FEE_FIELDS.map((field) => (
                                            <Td key={field.key} className="py-2 tabular-nums">
                                                {field.key === "amount" && fee.manualAmount !== true ? (
                                                    <span className="text-muted">Standardsatz</span>
                                                ) : (
                                                    display(field.key, fee[field.key])
                                                )}
                                                {issueFor(`fees.${i}.${field.key}`).map((issue, j) => (
                                                    <span key={j} className="block text-xs">{issue.message}</span>
                                                ))}
                                            </Td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                )}
            </section>

            <div className="flex flex-wrap gap-2">
                <Button
                    type="button"
                    size="sm"
                    variant="soft"
                    color="neutral"
                    onClick={() => {
                        setDraftError(null);
                        setDraft(JSON.stringify(entry, null, 2));
                    }}
                >
                    <HugeiconsIcon icon={PencilIcon} size={14} aria-hidden="true" /> Als JSON bearbeiten
                </Button>
                <Button type="button" size="sm" variant="soft" color="danger" onClick={() => onReplace(null)}>
                    <HugeiconsIcon icon={Delete02Icon} size={14} aria-hidden="true" /> Aus dem Import entfernen
                </Button>
            </div>
        </div>
    );
}

/** Ja/Nein-Felder: fehlt die Angabe, speichert der Import „Nein“ — so steht es auch da. */
const FALSE_BY_DEFAULT = new Set(["directDebit", "loginDisabled", "paid", "isStudent", "manualAmount"]);

function display(key: string, value: unknown): string {
    if ((value === null || value === undefined) && FALSE_BY_DEFAULT.has(key)) return "Nein";
    if (key === "role") return value === "ADMIN" ? "Administrator" : "Mitglied";
    if (value === null || value === undefined || value === "") return "—";
    if (typeof value === "boolean") return value ? "Ja" : "Nein";
    if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
    if (key === "countryCode") {
        // Wie beim Speichern: „Schweiz“ oder „ch“ wird zu CH.
        const code = toCountryCode(String(value));
        return isCountryCode(code) ? `${countryName(code)} (${code})` : String(value);
    }
    if (key === "status") return formatStatus(String(value));
    if (key === "iban") return formatIban(String(value));
    if (key === "amount") return `${Number(value).toLocaleString("de-DE", { minimumFractionDigits: 2 })} €`;
    return typeof value === "object" ? JSON.stringify(value) : String(value);
}
