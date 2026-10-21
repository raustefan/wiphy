"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Building03Icon, Cancel01Icon, InformationCircleIcon, PencilIcon, Tick01Icon, Wallet01Icon } from "@hugeicons/core-free-icons";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Callout, Checkbox, Field, Input } from "@/components/ui";
import { maskIban } from "@/lib/iban";
import { PaymentOption } from "@/components/PaymentOption";
import { IbanInput } from "@/components/IbanInput";
import { formatDate, formatEuro } from "@/lib/format";
import { SEPA_CREDITOR_ID } from "@/lib/membership";
import type { FeeRates } from "@/lib/feeDefaults";
import { annualFee, withSurcharge } from "@/lib/feeCalculation";
import { updateBankDetails } from "./actions";

type BankValues = {
    accountHolder: string;
    iban: string;
    bic: string;
    directDebit: boolean;
};

export function BankDetailsForm({
    initial,
    mandateSignedAt,
    mandateReference,
    rates,
}: {
    initial: BankValues;
    mandateSignedAt: Date | string | null;
    /** Steht bei jedem Einzug auf dem Kontoauszug — daran erkennt das Mitglied die Lastschrift. */
    mandateReference: string;
    rates: FeeRates;
}) {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [editing, setEditing] = useState(false);
    const [zahlungsweise, setZahlungsweise] = useState<"lastschrift" | "ueberweisung">(
        initial.directDebit ? "lastschrift" : "ueberweisung",
    );
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
        const hasIban = initial.iban.trim() !== "";
        return (
            <div className="grid gap-4">
                {hasIban ? (
                    <dl className="grid gap-x-6 gap-y-3 rounded-[3px] border border-line bg-raised/60 p-4 text-sm sm:grid-cols-2">
                        <div>
                            <dt className="text-muted">IBAN</dt>
                            <dd className="font-mono font-medium">{maskIban(initial.iban)}</dd>
                        </div>
                        <div>
                            <dt className="text-muted">Kontoinhaber:in</dt>
                            <dd className="font-medium">{initial.accountHolder || "—"}</dd>
                        </div>
                        {initial.bic && (
                            <div>
                                <dt className="text-muted">BIC</dt>
                                <dd className="font-mono font-medium">{initial.bic}</dd>
                            </div>
                        )}
                        <div>
                            <dt className="text-muted">Lastschriftmandat</dt>
                            <dd>
                                <Badge tone={initial.directDebit ? "positive" : "negative"}>
                                    {initial.directDebit ? "Erteilt" : "Nicht erteilt"}
                                </Badge>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-muted">Mandat vom</dt>
                            <dd className="font-medium">{formatDate(mandateSignedAt)}</dd>
                        </div>
                        {initial.directDebit && mandateReference && (
                            <div>
                                <dt className="text-muted">Mandatsreferenz</dt>
                                <dd className="font-mono font-medium">{mandateReference}</dd>
                            </div>
                        )}
                    </dl>
                ) : (
                    <Callout tone="info" icon={<HugeiconsIcon icon={InformationCircleIcon} size={16} />}>
                        Es ist keine Bankverbindung hinterlegt — dein Beitrag läuft per
                        Überweisung.
                    </Callout>
                )}
                <Button
                    type="button"
                    variant="soft"
                    color="neutral"
                    className="h-auto justify-self-start py-2.5"
                    onClick={() => setEditing(true)}
                >
                    <HugeiconsIcon icon={PencilIcon} size={16} aria-hidden="true" className="shrink-0" />
                    {/* Der Umbruch steht am Text, nicht am Knopf: `cn` führt
                        Tailwind-Klassen nicht zusammen, ein `whitespace-normal`
                        am Knopf träfe also auf dessen `whitespace-nowrap` und
                        welche gewinnt, entscheidet die Reihenfolge im CSS.
                        Ohne Umbruch wäre der Knopf 379px breit. */}
                    <span className="text-left whitespace-normal">
                        Zahlungsweise oder Bankverbindung ändern
                    </span>
                </Button>
            </div>
        );
    }

    return (
        <form ref={formRef} onSubmit={(event) => event.preventDefault()} className="grid gap-4">
            {/* Wie im Antrag: die Wahl als zwei gleichwertige Karten statt als
                ein Kästchen neben Kontoformularen. */}
            <fieldset className="grid gap-3 sm:grid-cols-2">
                <legend className="sr-only">Zahlungsweise</legend>

                <PaymentOption
                    value="lastschrift"
                    checked={zahlungsweise === "lastschrift"}
                    onSelect={setZahlungsweise}
                    icon={<HugeiconsIcon icon={Building03Icon} size={18} aria-hidden="true" />}
                    title="SEPA-Lastschrift"
                    badge="Empfohlen"
                    price={`${formatEuro(annualFee(rates.regular))} im Jahr`}
                    points={[
                        "Der Beitrag wird einmal jährlich eingezogen, angekündigt und jederzeit widerrufbar.",
                        "Du musst an nichts denken und keine Frist im Blick behalten.",
                    ]}
                />

                <PaymentOption
                    value="ueberweisung"
                    checked={zahlungsweise === "ueberweisung"}
                    onSelect={setZahlungsweise}
                    icon={<HugeiconsIcon icon={Wallet01Icon} size={18} aria-hidden="true" />}
                    title="Überweisung"
                    price={`${formatEuro(withSurcharge(annualFee(rates.regular)))} im Jahr`}
                    priceTone="negative"
                    points={[
                        `10 % Aufschlag nach § 5 Abs. 5 der Satzung — ${formatEuro(withSurcharge(annualFee(rates.regular)) - annualFee(rates.regular))} mehr pro Jahr.`,
                        "Du überweist selbst und fristgerecht; bei Verzug mahnt der Verein.",
                        "Für den ehrenamtlichen Vorstand bedeutet jede Einzelüberweisung Nachhalten und Zuordnen von Hand.",
                    ]}
                />
            </fieldset>

            {/* Der Wert reist im Formular mit, nicht nur im React-Zustand:
                das Absenden liest die FormData, nicht den State. */}
            <input type="hidden" name="zahlungsweise" value={zahlungsweise} />

            <Callout tone="info" icon={<HugeiconsIcon icon={InformationCircleIcon} size={16} />}>
                Der Aufschlag deckt den Mehraufwand, den Einzelüberweisungen dem
                ehrenamtlich geführten Verein machen. Er ist keine Strafe — die
                Lastschrift ist schlicht der günstigere Weg für beide Seiten.
            </Callout>

            {zahlungsweise === "lastschrift" ? (
                <>
                    <Field label="Kontoinhaber:in">
                        <Input name="accountHolder" defaultValue={initial.accountHolder} autoComplete="name" />
                    </Field>
                    <Field label="IBAN" hint="Wird beim Speichern auf ihre Prüfziffer geprüft.">
                        <IbanInput defaultValue={initial.iban} />
                    </Field>
                    <Field
                        label="BIC"
                        hint="Nur nötig für Konten außerhalb der EU und des EWR, z. B. in der Schweiz oder in Großbritannien."
                    >
                        <Input name="bic" defaultValue={initial.bic} autoComplete="off" />
                    </Field>

                    <div className="grid gap-2 rounded-[3px] border border-line bg-raised/60 p-4 text-sm">
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

                    <label className="flex cursor-pointer items-start gap-3 rounded-[3px] border border-line bg-raised/60 p-4 text-sm">
                        <Checkbox name="directDebit" defaultChecked={initial.directDebit} className="mt-0.5" />
                        <span className="text-pretty">
                            Ich ermächtige den WirtschaftsPhysik Alumni e.V., den Mitgliedsbeitrag von
                            meinem Konto mittels Lastschrift einzuziehen, und weise mein Kreditinstitut
                            an, die Lastschriften einzulösen.
                        </span>
                    </label>
                </>
            ) : (
                <>
                    {/* Ohne Mandat zieht der Verein nichts ein und hat für
                        Kontodaten keine Verwendung — dann werden sie verworfen. */}
                    <Callout tone="warning" icon={<HugeiconsIcon icon={InformationCircleIcon} size={16} />} title="Was das bedeutet">
                        <ul className="mt-1 grid list-disc gap-1 pl-4 text-pretty">
                            <li>
                                Dein Jahresbeitrag beträgt{" "}
                                <strong className="text-foreground">
                                    {formatEuro(withSurcharge(annualFee(rates.regular)))}
                                </strong>{" "}
                                statt {formatEuro(annualFee(rates.regular))} (§ 5 Abs. 5).
                            </li>
                            <li>
                                Du überweist selbst und fristgerecht. Die Kontoverbindung des
                                Vereins steht in deiner Aufnahmebestätigung.
                            </li>
                            <li>
                                Eine zuvor hinterlegte Bankverbindung und der Zeitpunkt des
                                bisherigen Mandats werden dabei verworfen.
                            </li>
                        </ul>
                    </Callout>
                    <p className="text-sm text-muted text-pretty">
                        Du kannst jederzeit zurück auf Lastschrift wechseln. Ab dem folgenden
                        Beitragsjahr entfällt der Aufschlag dann wieder.
                    </p>
                </>
            )}

            {error && (
                <Callout tone="danger" icon={<HugeiconsIcon icon={InformationCircleIcon} size={16} />}>
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
                    <HugeiconsIcon icon={Cancel01Icon} size={16} aria-hidden="true" />
                    Abbrechen
                </Button>
                {zahlungsweise === "lastschrift" ? (
                    <Button type="button" onClick={submit} loading={isPending}>
                        <HugeiconsIcon icon={Tick01Icon} size={16} aria-hidden="true" />
                        Neues Mandat bestätigen &amp; speichern
                    </Button>
                ) : (
                    <Button type="button" onClick={submit} loading={isPending}>
                        <HugeiconsIcon icon={Tick01Icon} size={16} aria-hidden="true" />
                        Auf Überweisung umstellen
                    </Button>
                )}
            </div>
        </form>
    );
}
