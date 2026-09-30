"use client";

import { useState, useTransition } from "react";
import { Button, Callout, Checkbox } from "@/components/ui";
import { bulkCreateUsersAction, type ImportRowResult } from "./actions";
import { EXAMPLE, FIELDS, toRow, type Row } from "./importFormat";

/** Einmaliger Import aus der alten DB — bewusst schmucklos. */
export function BulkImport() {
    const [rows, setRows] = useState<Row[]>([]);
    const [results, setResults] = useState<ImportRowResult[]>([]);
    const [notify, setNotify] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const [pending, startTransition] = useTransition();

    function downloadExample() {
        const blob = new Blob([JSON.stringify([EXAMPLE], null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "benutzer-import-beispiel.json";
        a.click();
        URL.revokeObjectURL(a.href);
    }

    async function loadFile(file: File) {
        try {
            const data: unknown = JSON.parse(await file.text());
            const list = (Array.isArray(data) ? data : [data]) as Record<string, unknown>[];
            const unknownKeys = [...new Set(list.flatMap((o) => Object.keys(o)))].filter((k) => !FIELDS.includes(k));
            setRows(list.map(toRow));
            setResults([]);
            setMessage(
                `${list.length} Einträge geladen.` +
                    (unknownKeys.length ? ` Ignorierte Felder: ${unknownKeys.join(", ")}` : ""),
            );
        } catch (error) {
            setMessage(`JSON konnte nicht gelesen werden: ${String(error)}`);
        }
    }

    function update(i: number, key: string, value: string) {
        setRows((rs) => rs.map((r, j) => (j === i ? { ...r, [key]: value } : r)));
    }

    function run(dryRun: boolean) {
        startTransition(async () => {
            const res = await bulkCreateUsersAction(rows, notify, dryRun);
            const failed = res.filter((r) => r.error).length;
            if (dryRun) {
                setResults(res);
                setMessage(failed ? `${failed} Einträge mit Fehlern.` : "Alles in Ordnung.");
                return;
            }
            // Angelegte Zeilen verschwinden, fehlerhafte bleiben zum Korrigieren.
            const created = res.filter((r) => r.created).length;
            const mailFailed = res.filter((r) => r.mailFailed).length;
            setRows(rows.filter((_, i) => !res[i].created));
            setResults(res.filter((r) => !r.created));
            setMessage(
                `${created} angelegt, ${failed} fehlerhaft.` +
                    (mailFailed ? ` ${mailFailed} E-Mails konnten nicht verschickt werden.` : ""),
            );
        });
    }

    return (
        <div className="grid gap-4">
            <div className="flex flex-wrap items-center gap-3">
                <Button type="button" variant="soft" color="neutral" onClick={downloadExample}>
                    Beispiel-JSON herunterladen
                </Button>
                <input
                    type="file"
                    accept="application/json,.json"
                    onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])}
                />
            </div>

            {message && <Callout tone="info">{message}</Callout>}

            {rows.length > 0 && (
                <>
                    <div className="max-h-[70vh] overflow-auto">
                        <table className="text-xs">
                            <thead className="sticky top-0 bg-surface">
                                <tr>
                                    <th className="p-1 text-left">Fehler</th>
                                    {FIELDS.map((key) => (
                                        <th key={key} className="p-1 text-left font-mono">
                                            {key}
                                        </th>
                                    ))}
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, i) => (
                                    <tr key={i} className="border-t">
                                        <td className="p-1 text-red-600">{results[i]?.error}</td>
                                        {FIELDS.map((key) => (
                                            <td key={key} className="p-1">
                                                <input
                                                    aria-label={`${key} Zeile ${i + 1}`}
                                                    className="w-40 rounded border px-1"
                                                    value={row[key]}
                                                    onChange={(e) => update(i, key, e.target.value)}
                                                />
                                            </td>
                                        ))}
                                        <td className="p-1">
                                            <button
                                                type="button"
                                                className="text-red-600"
                                                onClick={() => {
                                                    setRows(rows.filter((_, j) => j !== i));
                                                    setResults(results.filter((_, j) => j !== i));
                                                }}
                                            >
                                                Entfernen
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <label className="flex cursor-pointer items-center gap-2">
                        <Checkbox checked={notify} onChange={(e) => setNotify(e.target.checked)} />
                        <span className="text-sm font-semibold">
                            Zugangsdaten (inkl. Zufallspasswort) per E-Mail an alle schicken
                        </span>
                    </label>

                    <div className="flex gap-3">
                        <Button type="button" variant="soft" color="neutral" disabled={pending} onClick={() => run(true)}>
                            Prüfen
                        </Button>
                        <Button type="button" disabled={pending} onClick={() => run(false)}>
                            {rows.length} Benutzer anlegen
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}
