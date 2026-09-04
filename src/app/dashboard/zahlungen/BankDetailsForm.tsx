"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Info, Pencil, X } from "lucide-react";
import { Badge, Button, Callout, Checkbox, Field, Input } from "@/components/ui";
import { formatIban, maskIban } from "@/lib/iban";
import { formatDate } from "@/lib/format";
import { SEPA_CREDITOR_ID } from "@/lib/membership";
import { updateBankDetails } from "./actions";

type BankValues = {
    bank: string;
    BLZ: string;
    KTO: string;
    IBAN: string;
    BIC: string;
    bankeinzug: boolean;
};

export function BankDetailsForm({
    initial,
    mandatserteilung,
}: {
    initial: BankValues;
    mandatserteilung: Date | string | null;
}) {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    function submit() {
        setError("");
        const form = formRef.current;
        if (!form) return;
        const formData = new FormData(form);
        startTransition(async () => {
            const result = await updateBankDetails(formData);
            if (!result.ok) {
                setError(result.message);
                return;
            }
            setEditing(false);
            router.refresh();
        });
    }

    if (!editing) {
        const hasIban = initial.IBAN.trim() !== "";
        return (
            <div className="grid gap-4">
                {hasIban ? (
                    <dl className="grid gap-x-6 gap-y-3 rounded-xl border border-line bg-raised/60 p-4 text-sm sm:grid-cols-2">
                        <div>
                            <dt className="text-muted">IBAN</dt>
                            <dd className="font-mono font-medium">{maskIban(initial.IBAN)}</dd>
                        </div>
                        <div>
                            <dt className="text-muted">Kreditinstitut</dt>
                            <dd className="font-medium">{initial.bank || "—"}</dd>
                        </div>
                        <div>
                            <dt className="text-muted">Lastschriftmandat</dt>
                            <dd>
                                <Badge tone={initial.bankeinzug ? "positive" : "negative"}>
                                    {initial.bankeinzug ? "Erteilt" : "Nicht erteilt"}
                                </Badge>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-muted">Mandat vom</dt>
                            <dd className="font-medium">{formatDate(mandatserteilung)}</dd>
                        </div>
                    </dl>
                ) : (
                    <Callout tone="warning" icon={<Info size={16} />}>
                        Für dein Konto ist noch keine Bankverbindung hinterlegt.
                    </Callout>
                )}
                <Button
                    type="button"
                    variant="soft"
                    color="neutral"
                    className="justify-self-start"
                    onClick={() => setEditing(true)}
                >
                    <Pencil size={16} aria-hidden="true" />
                    Bankverbindung ändern
                </Button>
            </div>
        );
    }

    return (
        <form ref={formRef} onSubmit={(event) => event.preventDefault()} className="grid gap-4">
            <Field label="IBAN" hint="Wird beim Speichern auf ihre Prüfziffer geprüft.">
                <Input
                    name="IBAN"
                    defaultValue={formatIban(initial.IBAN)}
                    placeholder="DE00 0000 0000 0000 0000 00"
                    inputMode="text"
                    autoComplete="off"
                />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="BIC (optional)" hint="Für Konten im SEPA-Raum nicht erforderlich.">
                    <Input name="BIC" defaultValue={initial.BIC} autoComplete="off" />
                </Field>
                <Field label="Kreditinstitut (optional)">
                    <Input name="bank" defaultValue={initial.bank} />
                </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="BLZ (optional)">
                    <Input name="BLZ" defaultValue={initial.BLZ} />
                </Field>
                <Field label="Kontonummer (optional)">
                    <Input name="KTO" defaultValue={initial.KTO} />
                </Field>
            </div>

            <div className="grid gap-2 rounded-xl border border-line bg-raised/60 p-4 text-sm">
                <p className="font-semibold">SEPA-Lastschriftmandat</p>
                <p className="text-muted text-pretty">
                    Zahlungsempfänger: WirtschaftsPhysik Alumni e.V.
                    <br />
                    Gläubiger-Identifikationsnummer: {SEPA_CREDITOR_ID || "wird nachgereicht"}
                </p>
                <p className="text-muted text-pretty">
                    Mit dem Speichern erteilst du ein neues SEPA-Lastschriftmandat, das das
                    bisherige ersetzt. Du kannst innerhalb von acht Wochen, beginnend mit dem
                    Belastungsdatum, die Erstattung des belasteten Betrages verlangen. Es gelten
                    dabei die mit deinem Kreditinstitut vereinbarten Bedingungen. Jeder Einzug
                    wird vorher angekündigt.
                </p>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-raised/60 p-4 text-sm">
                <Checkbox name="bankeinzug" defaultChecked={initial.bankeinzug} className="mt-0.5" />
                <span className="text-pretty">
                    Ich ermächtige den WirtschaftsPhysik Alumni e.V., den Mitgliedsbeitrag von
                    meinem Konto mittels Lastschrift einzuziehen, und weise mein Kreditinstitut
                    an, die Lastschriften einzulösen.
                </span>
            </label>

            {error && (
                <Callout tone="danger" icon={<Info size={16} />}>
                    {error}
                </Callout>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <Button
                    type="button"
                    variant="soft"
                    color="neutral"
                    onClick={() => {
                        setError("");
                        setEditing(false);
                    }}
                    disabled={isPending}
                >
                    <X size={16} aria-hidden="true" />
                    Abbrechen
                </Button>
                <Button type="button" onClick={submit} loading={isPending}>
                    <Check size={16} aria-hidden="true" />
                    Neues Mandat bestätigen &amp; speichern
                </Button>
            </div>
        </form>
    );
}
