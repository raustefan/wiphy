"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    Banknote,
    BookOpen,
    Check,
    FileText,
    GraduationCap,
    Info,
    Send,
    UserRound,
} from "lucide-react";
import {
    Badge,
    Button,
    Callout,
    Card,
    Checkbox,
    Field,
    Input,
    Separator,
} from "@/components/ui";
import { formatIban } from "@/lib/iban";
import {
    CONSENT_VERSION,
    DATENSCHUTZ_URL,
    SATZUNG_URL,
    SEPA_CREDITOR_ID,
    STEPS,
    formatEuro,
} from "@/lib/membership";
import type { FeeRates } from "@/lib/feeDefaults";
import { annualFee, billableMonths, withSurcharge } from "@/lib/feeCalculation";
import {
    applicationBankSchema,
    applicationPersonSchema,
    applicationStudySchema,
} from "@/lib/membershipFormSchemas";
import { submitMembershipApplication } from "./actions";

type InitialValues = Record<string, string>;

const STEP_ICONS = [FileText, UserRound, GraduationCap, Banknote, Check];

/**
 * Die Schemas, gegen die ein Schritt geprüft wird, bevor es weitergeht. Rein
 * für die Bedienführung — die Autorität liegt beim Server, der beim Absenden
 * ohnehin das vollständige Schema anwendet.
 */
const STEP_SCHEMAS = [null, applicationPersonSchema, applicationStudySchema, applicationBankSchema, null] as const;

export function ApplicationWizard({
    initial,
    selectableYears,
    preselectedYears,
    rates,
    feeYear,
}: {
    initial: InitialValues;
    selectableYears: number[];
    preselectedYears: number[];
    rates: FeeRates;
    feeYear: number;
}) {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [step, setStep] = useState(0);
    const [error, setError] = useState("");
    const [studentYears, setStudentYears] = useState<number[]>(preselectedYears);
    const [summary, setSummary] = useState<Record<string, string>>({});
    const [isPending, startTransition] = useTransition();

    function currentFormValues(): Record<string, string> {
        const form = formRef.current;
        if (!form) return {};
        const values: Record<string, string> = {};
        for (const [key, value] of new FormData(form).entries()) {
            if (typeof value === "string" && key !== "studentYears") values[key] = value;
        }
        return values;
    }

    function goToStep(target: number) {
        setError("");
        const schema = STEP_SCHEMAS[step];
        // Rückwärts wird nie validiert — sonst säße man in einem Schritt fest,
        // dessen Fehler man weiter vorne korrigieren wollte.
        if (target > step && schema) {
            const result = schema.safeParse(currentFormValues());
            if (!result.success) {
                setError(result.error.issues[0]?.message ?? "Bitte prüfe deine Eingaben.");
                return;
            }
        }
        if (target === STEPS.length - 1) setSummary(currentFormValues());
        setStep(target);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function submit() {
        setError("");
        const form = formRef.current;
        if (!form) return;
        const formData = new FormData(form);
        for (const year of studentYears) formData.append("studentYears", String(year));

        startTransition(async () => {
            const result = await submitMembershipApplication(formData);
            if (!result.ok) {
                setError(result.message);
                return;
            }
            router.refresh();
        });
    }

    const isLast = step === STEPS.length - 1;
    // Verbleibende Beitragsmonate bei einer Aufnahme im aktuellen Monat (§ 5 Abs. 3).
    const remainingMonths = billableMonths(feeYear, new Date());

    return (
        <form ref={formRef} onSubmit={(event) => event.preventDefault()} className="grid gap-6">
            <StepIndicator step={step} onSelect={goToStep} />

            <Card className="p-5 sm:p-6">
                {/* Alle Schritte bleiben im DOM: so gehen Eingaben beim Blättern
                    nicht verloren und stehen beim Absenden vollständig bereit. */}
                <div hidden={step !== 0}>
                    <IntroStep />
                </div>

                <div hidden={step !== 1} className="grid gap-4">
                    <StepHeading
                        title="Persönliche Daten und Anschrift"
                        description="Diese Angaben führt der Verein im Mitgliederverzeichnis. Ein Beitritt ist erst ab 18 Jahren möglich."
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Vorname">
                            <Input name="vorname" defaultValue={initial.vorname} autoComplete="given-name" />
                        </Field>
                        <Field label="Nachname">
                            <Input name="name" defaultValue={initial.name} autoComplete="family-name" />
                        </Field>
                        <Field label="Titel (optional)">
                            <Input name="titel" defaultValue={initial.titel} />
                        </Field>
                        <Field label="Geburtsdatum">
                            <Input type="date" name="geburtsdatum" defaultValue={initial.geburtsdatum} />
                        </Field>
                    </div>
                    <Field label="Straße und Hausnummer">
                        <Input name="strasse" defaultValue={initial.strasse} autoComplete="street-address" />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <Field label="PLZ">
                            <Input name="plz" defaultValue={initial.plz} autoComplete="postal-code" />
                        </Field>
                        <Field label="Ort">
                            <Input name="stadt" defaultValue={initial.stadt} autoComplete="address-level2" />
                        </Field>
                        <Field label="Land">
                            <Input name="land" defaultValue={initial.land} autoComplete="country-name" />
                        </Field>
                    </div>
                    <Field label="Telefon (optional)">
                        <Input name="telefon" defaultValue={initial.telefon} autoComplete="tel" />
                    </Field>
                </div>

                <div hidden={step !== 2} className="grid gap-4">
                    <StepHeading
                        title="Studium und Beruf"
                        description="Alle Angaben sind freiwillig — außer den Studienjahren, wenn du die ermäßigte Beitragsstufe nutzen möchtest."
                    />
                    <Field label="Studiengang">
                        <Input name="studiengang" defaultValue={initial.studiengang} />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Studienbeginn">
                            <Input type="date" name="studienbeginn" defaultValue={initial.studienbeginn} />
                        </Field>
                        <Field
                            label="Studienende (ggf. voraussichtlich)"
                            hint="Bestimmt die Vorauswahl der Studienjahre."
                        >
                            <Input type="date" name="studienende" defaultValue={initial.studienende} />
                        </Field>
                    </div>

                    <Separator className="my-1" />

                    <fieldset className="grid gap-3">
                        <legend className="text-sm font-semibold">
                            In welchen Jahren bist du Studierende:r?
                        </legend>
                        <p className="text-sm text-muted text-pretty">
                            Für diese Jahre wird der ermäßigte Beitrag angesetzt. Der Verein kann
                            dafür einen Immatrikulationsnachweis anfordern.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {selectableYears.map((year) => {
                                const checked = studentYears.includes(year);
                                return (
                                    <label
                                        key={year}
                                        className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-raised/60 px-3.5 py-2.5 text-sm font-medium"
                                    >
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) =>
                                                setStudentYears((prev) =>
                                                    event.target.checked
                                                        ? [...prev, year].sort((a, b) => a - b)
                                                        : prev.filter((y) => y !== year),
                                                )
                                            }
                                        />
                                        {year}
                                    </label>
                                );
                            })}
                        </div>
                    </fieldset>

                    <Separator className="my-1" />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Arbeitgeber">
                            <Input name="arbeitgeber" defaultValue={initial.arbeitgeber} />
                        </Field>
                        <Field label="Position">
                            <Input name="position" defaultValue={initial.position} />
                        </Field>
                        <Field label="Berufsstand">
                            <Input name="berufsstand" defaultValue={initial.berufsstand} />
                        </Field>
                        <Field label="Berufszweig">
                            <Input name="berufszweig" defaultValue={initial.berufszweig} />
                        </Field>
                    </div>
                </div>

                <div hidden={step !== 3} className="grid gap-4">
                    <StepHeading
                        title="Bankverbindung und SEPA-Lastschriftmandat"
                        description="Der Mitgliedsbeitrag wird per Lastschrift eingezogen."
                    />
                    <Field label="Kontoinhaber:in">
                        <Input name="kontoinhaber" defaultValue={initial.kontoinhaber} autoComplete="name" />
                    </Field>
                    <Field label="IBAN" hint="Wird beim Absenden auf ihre Prüfziffer geprüft.">
                        <Input
                            name="IBAN"
                            defaultValue={initial.IBAN}
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

                    <MandateText />

                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-raised/60 p-4 text-sm">
                        <Checkbox name="bankeinzug" className="mt-0.5" />
                        <span className="text-pretty">
                            Ich ermächtige den WirtschaftsPhysik Alumni e.V., den Mitgliedsbeitrag
                            von meinem Konto mittels Lastschrift einzuziehen, und weise mein
                            Kreditinstitut an, die Lastschriften einzulösen.
                        </span>
                    </label>
                </div>

                <div hidden={!isLast} className="grid gap-5">
                    <StepHeading
                        title="Beitrag und Abschluss"
                        description="Bitte prüfe deine Angaben, bevor du den Antrag absendest."
                    />

                    <div className="grid gap-3 rounded-xl border border-line bg-raised/60 p-4">
                        <p className="text-sm font-semibold">Mitgliedsbeitrag {feeYear}</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                                <p className="text-sm text-muted">Ordentliches Mitglied</p>
                                <p className="text-xl font-bold">
                                    {formatEuro(rates.regular)} pro Monat
                                </p>
                                <p className="text-sm text-muted">
                                    {formatEuro(annualFee(rates.regular))} im Jahr
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted">
                                    Mit Sonderstatus (z. B. Studierende)
                                </p>
                                <p className="text-xl font-bold">
                                    {formatEuro(rates.student)} pro Monat
                                </p>
                                <p className="text-sm text-muted">
                                    {formatEuro(annualFee(rates.student))} im Jahr
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-muted text-pretty">
                            Für {feeYear} zahlst du bei einer Aufnahme im laufenden Monat
                            höchstens{" "}
                            <strong className="text-foreground">
                                {formatEuro(annualFee(rates.regular) * (remainingMonths / 12))}
                            </strong>{" "}
                            bzw.{" "}
                            <strong className="text-foreground">
                                {formatEuro(annualFee(rates.student) * (remainingMonths / 12))}
                            </strong>
                            : Bei Eintritt im laufenden Jahr wird der Beitrag nach § 5 Abs. 3 der
                            Satzung um die bereits vergangenen Monate gekürzt (noch{" "}
                            {remainingMonths} von 12 Monaten). Den endgültigen Betrag setzt der
                            Vorstand mit dem Aufnahmebeschluss fest.
                        </p>
                        <p className="text-sm text-muted text-pretty">
                            Beiträge ohne Teilnahme am Lastschriftverfahren erhöhen sich nach § 5
                            Abs. 5 um 10 %, aufgerundet auf volle Euro (
                            {formatEuro(withSurcharge(annualFee(rates.regular)))} bzw.{" "}
                            {formatEuro(withSurcharge(annualFee(rates.student)))} im vollen Jahr).
                            Mit dem Mandat im vorigen Schritt entfällt dieser Aufschlag.
                        </p>
                        <p className="text-sm text-muted text-pretty">
                            Die Beiträge sind in vollem Umfang steuerlich anrechenbar.
                        </p>
                        {studentYears.length > 0 && (
                            <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
                                Ermäßigung beantragt für:
                                {studentYears.map((year) => (
                                    <Badge key={year} tone="info">
                                        {year}
                                    </Badge>
                                ))}
                            </p>
                        )}
                    </div>

                    <SummaryBlock summary={summary} studentYears={studentYears} />

                    <div className="grid gap-3">
                        <label className="flex cursor-pointer items-start gap-3 text-sm">
                            <Checkbox name="satzungAccepted" className="mt-0.5" />
                            <span className="text-pretty">
                                Ich erkenne die{" "}
                                <a href={SATZUNG_URL} className="font-semibold text-physics underline">
                                    Satzung
                                </a>{" "}
                                des WirtschaftsPhysik Alumni e.V. an und beantrage die Aufnahme als
                                ordentliches Mitglied.
                            </span>
                        </label>
                        <label className="flex cursor-pointer items-start gap-3 text-sm">
                            <Checkbox name="datenschutzAccepted" className="mt-0.5" />
                            <span className="text-pretty">
                                Ich habe die{" "}
                                <a
                                    href={DATENSCHUTZ_URL}
                                    className="font-semibold text-physics underline"
                                >
                                    Datenschutzhinweise
                                </a>{" "}
                                gelesen und willige in die Verarbeitung meiner Daten zum Zweck der
                                Mitgliederverwaltung ein.
                            </span>
                        </label>
                        <p className="text-xs text-faint">Textstand: {CONSENT_VERSION}</p>
                    </div>
                </div>
            </Card>

            {error && (
                <Callout tone="danger" icon={<Info size={16} />}>
                    {error}
                </Callout>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <Button
                    variant="soft"
                    color="neutral"
                    onClick={() => goToStep(step - 1)}
                    disabled={step === 0 || isPending}
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Zurück
                </Button>

                {isLast ? (
                    <Button onClick={submit} loading={isPending}>
                        <Send size={16} aria-hidden="true" />
                        Antrag verbindlich absenden
                    </Button>
                ) : (
                    <Button onClick={() => goToStep(step + 1)}>
                        Weiter
                        <ArrowRight size={16} aria-hidden="true" />
                    </Button>
                )}
            </div>
        </form>
    );
}

function StepIndicator({ step, onSelect }: { step: number; onSelect: (index: number) => void }) {
    return (
        <ol className="grid gap-2 sm:grid-cols-5">
            {STEPS.map((entry, index) => {
                const Icon = STEP_ICONS[index];
                const isDone = index < step;
                const isCurrent = index === step;
                return (
                    <li key={entry.id}>
                        <button
                            type="button"
                            // Vorwärtssprünge würden die Schrittprüfung umgehen.
                            onClick={() => index < step && onSelect(index)}
                            disabled={index >= step}
                            aria-current={isCurrent ? "step" : undefined}
                            className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                                isCurrent
                                    ? "border-physics bg-physics/10 font-semibold text-physics"
                                    : isDone
                                      ? "cursor-pointer border-line bg-raised/60 text-foreground hover:bg-raised"
                                      : "border-line bg-raised/30 text-faint"
                            }`}
                        >
                            {isDone ? (
                                <Check size={16} aria-hidden="true" />
                            ) : (
                                <Icon size={16} aria-hidden="true" />
                            )}
                            <span className="min-w-0 truncate">{entry.label}</span>
                        </button>
                    </li>
                );
            })}
        </ol>
    );
}

function StepHeading({ title, description }: { title: string; description: string }) {
    return (
        <div className="grid gap-1">
            <h2 className="text-lg font-bold tracking-tight text-balance">{title}</h2>
            <p className="max-w-prose text-sm text-muted text-pretty">{description}</p>
        </div>
    );
}

function IntroStep() {
    return (
        <div className="grid gap-4">
            <StepHeading
                title="Mitglied im WirtschaftsPhysik Alumni e.V. werden"
                description="Ein kurzer Überblick, worauf du dich einlässt — danach dauert der Antrag nur wenige Minuten."
            />

            <ul className="grid gap-3 text-sm">
                <li className="flex gap-3">
                    <BookOpen size={16} className="mt-0.5 shrink-0 text-physics" aria-hidden="true" />
                    <span className="text-pretty">
                        <strong>Der Antrag ist noch kein Beitritt.</strong> Über die Aufnahme
                        entscheidet der Vorstand. Erst mit diesem Beschluss beginnt die
                        Mitgliedschaft — und erst dann entsteht eine Beitragspflicht.
                    </span>
                </li>
                <li className="flex gap-3">
                    <Banknote size={16} className="mt-0.5 shrink-0 text-physics" aria-hidden="true" />
                    <span className="text-pretty">
                        <strong>Jahresbeitrag per Lastschrift.</strong> Der Beitrag wird einmal
                        jährlich eingezogen; für Studierende gilt ein ermäßigter Satz. Die genaue
                        Höhe siehst du im letzten Schritt.
                    </span>
                </li>
                <li className="flex gap-3">
                    <UserRound size={16} className="mt-0.5 shrink-0 text-physics" aria-hidden="true" />
                    <span className="text-pretty">
                        <strong>Deine Daten.</strong> Wir verarbeiten sie ausschließlich zur
                        Mitgliederverwaltung. Du kannst sie jederzeit in der
                        Mitgliederselbstverwaltung einsehen und ändern.
                    </span>
                </li>
                <li className="flex gap-3">
                    <FileText size={16} className="mt-0.5 shrink-0 text-physics" aria-hidden="true" />
                    <span className="text-pretty">
                        <strong>Kündigung.</strong> Die Mitgliedschaft kann nach den Regeln der
                        Satzung zum Ende eines Geschäftsjahres gekündigt werden.
                    </span>
                </li>
            </ul>

            <Callout tone="info" icon={<Info size={16} />}>
                Alle Einzelheiten regelt die{" "}
                <a href={SATZUNG_URL} className="font-semibold text-physics underline">
                    Vereinssatzung
                </a>
                . Solange ein Punkt unklar ist, melde dich gern vorher beim Vorstand.
            </Callout>
        </div>
    );
}

function MandateText() {
    return (
        <div className="grid gap-2 rounded-xl border border-line bg-raised/60 p-4 text-sm">
            <p className="font-semibold">SEPA-Lastschriftmandat</p>
            <p className="text-muted text-pretty">
                Zahlungsempfänger: WirtschaftsPhysik Alumni e.V.
                <br />
                Gläubiger-Identifikationsnummer:{" "}
                {SEPA_CREDITOR_ID || "wird nachgereicht"}
                <br />
                Mandatsreferenz: wird dir mit der Aufnahmebestätigung mitgeteilt
            </p>
            <p className="text-muted text-pretty">
                Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die
                Erstattung des belasteten Betrages verlangen. Es gelten dabei die mit meinem
                Kreditinstitut vereinbarten Bedingungen. Jeder Einzug wird vorher angekündigt.
            </p>
        </div>
    );
}

const SUMMARY_FIELDS: Array<[string, string]> = [
    ["vorname", "Vorname"],
    ["name", "Nachname"],
    ["titel", "Titel"],
    ["geburtsdatum", "Geburtsdatum"],
    ["strasse", "Straße"],
    ["plz", "PLZ"],
    ["stadt", "Ort"],
    ["land", "Land"],
    ["telefon", "Telefon"],
    ["studiengang", "Studiengang"],
    ["studienbeginn", "Studienbeginn"],
    ["studienende", "Studienende"],
    ["arbeitgeber", "Arbeitgeber"],
    ["position", "Position"],
    ["berufsstand", "Berufsstand"],
    ["berufszweig", "Berufszweig"],
    ["kontoinhaber", "Kontoinhaber:in"],
    ["IBAN", "IBAN"],
    ["BIC", "BIC"],
    ["bank", "Kreditinstitut"],
];

function SummaryBlock({
    summary,
    studentYears,
}: {
    summary: Record<string, string>;
    studentYears: number[];
}) {
    const rows = SUMMARY_FIELDS.filter(([key]) => summary[key]?.trim());

    return (
        <div className="grid gap-2">
            <p className="text-sm font-semibold">Zusammenfassung</p>
            <dl className="grid gap-x-6 gap-y-2 rounded-xl border border-line p-4 text-sm sm:grid-cols-2">
                {rows.map(([key, label]) => (
                    <div key={key} className="flex justify-between gap-4">
                        <dt className="text-muted">{label}</dt>
                        <dd className="min-w-0 truncate font-medium">
                            {key === "IBAN" ? formatIban(summary[key]) : summary[key]}
                        </dd>
                    </div>
                ))}
                <div className="flex justify-between gap-4">
                    <dt className="text-muted">Studienjahre</dt>
                    <dd className="font-medium">
                        {studentYears.length > 0 ? studentYears.join(", ") : "—"}
                    </dd>
                </div>
            </dl>
        </div>
    );
}
