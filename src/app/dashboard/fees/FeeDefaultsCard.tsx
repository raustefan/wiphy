"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
    Button,
    Field,
    IconButton,
    Input,
    Separator,
    Table,
    TableWrap,
    Td,
    Th,
} from "@/components/ui";
import { formatEuro } from "@/lib/membership";
import { annualFee, withSurcharge } from "@/lib/feeCalculation";
import { saveFeeDefault, deleteFeeDefaultYear } from "./actions";

export type FeeDefaultRow = { jahr: number; regular: number; student: number };

export function FeeDefaultsCard({ defaults }: { defaults: FeeDefaultRow[] }) {
    const nextYear = (defaults.at(-1)?.jahr ?? new Date().getFullYear() - 1) + 1;
    const [jahr, setJahr] = useState(String(nextYear));
    const [regular, setRegular] = useState("");
    const [student, setStudent] = useState("");
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    function run(action: (fd: FormData) => Promise<{ ok: boolean; message?: string }>, fd: FormData) {
        setError("");
        startTransition(async () => {
            const result = await action(fd);
            if (!result.ok) setError(result.message ?? "Aktion fehlgeschlagen.");
        });
    }

    function save() {
        const fd = new FormData();
        fd.set("jahr", jahr);
        fd.set("regular", regular);
        fd.set("student", student);
        run(saveFeeDefault, fd);
    }

    return (
        <div className="grid gap-3">
            <div>
                <p className="text-sm text-muted">
                    Grundlage für den Mitgliedsantrag und für neu angelegte Beitragsjahre
                </p>
                <h2 className="text-lg font-bold tracking-tight">Standard-Beitragssätze</h2>
            </div>

            <p className="max-w-prose text-sm text-muted text-pretty">
                Monatsbeiträge, wie sie die Mitgliederversammlung nach § 5 der Satzung
                beschließt. Sie gelten ab dem eingetragenen Jahr, bis ein neueres Jahr
                hinterlegt wird, und bestimmen automatisch alle Beitragszeilen, die nicht
                ausdrücklich als Ausnahme festgelegt sind.
            </p>

            <Separator />

            {error && (
                <p role="alert" className="text-sm text-negative">
                    {error}
                </p>
            )}

            {defaults.length > 0 && (
                <TableWrap>
                    <Table>
                        <thead>
                            <tr>
                                <Th>Ab Jahr</Th>
                                <Th>Regulär / Monat</Th>
                                <Th>Sonderstatus / Monat</Th>
                                <Th>Jahresbeitrag</Th>
                                <Th>Ohne Lastschrift</Th>
                                <Th className="w-12" />
                            </tr>
                        </thead>
                        <tbody>
                            {defaults.map((entry) => (
                                <tr key={entry.jahr}>
                                    <Td className="font-mono font-semibold">{entry.jahr}</Td>
                                    <Td className="tabular-nums">{formatEuro(entry.regular)}</Td>
                                    <Td className="tabular-nums">{formatEuro(entry.student)}</Td>
                                    <Td className="tabular-nums text-muted">
                                        {formatEuro(annualFee(entry.regular))} /{" "}
                                        {formatEuro(annualFee(entry.student))}
                                    </Td>
                                    {/* § 5 Abs. 5: +10 %, auf volle Euro aufgerundet. */}
                                    <Td className="tabular-nums text-muted">
                                        {formatEuro(withSurcharge(annualFee(entry.regular)))} /{" "}
                                        {formatEuro(withSurcharge(annualFee(entry.student)))}
                                    </Td>
                                    <Td>
                                        <IconButton
                                            type="button"
                                            size="sm"
                                            variant="ghost"
                                            color="danger"
                                            aria-label={`Beitragssatz ${entry.jahr} löschen`}
                                            disabled={isPending}
                                            onClick={() => {
                                                const fd = new FormData();
                                                fd.set("jahr", String(entry.jahr));
                                                run(deleteFeeDefaultYear, fd);
                                            }}
                                        >
                                            <Trash2 size={14} />
                                        </IconButton>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableWrap>
            )}

            <div className="grid items-end gap-3 sm:grid-cols-[8rem_1fr_1fr_auto]">
                <Field label="Ab Jahr">
                    <Input
                        type="number"
                        inputMode="numeric"
                        value={jahr}
                        onChange={(event) => setJahr(event.target.value)}
                    />
                </Field>
                <Field label="Regulär (€/Monat)">
                    <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={regular}
                        onChange={(event) => setRegular(event.target.value)}
                    />
                </Field>
                <Field label="Sonderstatus (€/Monat)">
                    <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={student}
                        onChange={(event) => setStudent(event.target.value)}
                    />
                </Field>
                <Button onClick={save} loading={isPending}>
                    <Plus size={16} aria-hidden="true" />
                    Speichern
                </Button>
            </div>
        </div>
    );
}
