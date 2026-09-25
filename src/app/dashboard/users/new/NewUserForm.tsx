"use client";

import { useState, useTransition } from "react";
import { Check, Dices, X } from "lucide-react";
import { PasswordInput } from "@/components/PasswordField";
import { IbanInput } from "@/components/IbanInput";
import { generatePassword, PASSWORD_MIN_LENGTH } from "@/lib/passwordStrength";
import { STUDENT_YEAR_LOOKAHEAD } from "@/lib/membership";
import { STATUS_OPTIONS, ROLE_OPTIONS } from "@/lib/statusLabels";
import {
    Button,
    ButtonLink,
    Callout,
    Checkbox,
    Field,
    Input,
    Select,
    Separator,
    TextArea,
} from "@/components/ui";
import { createUserAction } from "./actions";

/**
 * Per `onSubmit` statt `<form action>`: React setzt ein Formular nach einer
 * Action zurück — bei einem Fehler wären sonst alle Eingaben weg.
 */
export function NewUserForm() {
    const [error, setError] = useState<string | null>(null);
    const [pending, startTransition] = useTransition();
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("KEIN_MITGLIED");
    const [aufnahmedatum, setAufnahmedatum] = useState("");
    const [selbstzahler, setSelbstzahler] = useState(false);
    const [studentYears, setStudentYears] = useState<number[]>([]);

    const currentYear = new Date().getFullYear();
    const joinYear = aufnahmedatum ? Number(aufnahmedatum.slice(0, 4)) : null;
    const feeYears =
        joinYear && joinYear <= currentYear + STUDENT_YEAR_LOOKAHEAD
            ? Array.from(
                  { length: currentYear + STUDENT_YEAR_LOOKAHEAD - joinYear + 1 },
                  (_, i) => joinYear + i,
              )
            : [];
    const showFees = status === "ORDENTLICHES_MITGLIED" && feeYears.length > 0;

    function toggleStudentYear(year: number) {
        setStudentYears((years) =>
            years.includes(year) ? years.filter((y) => y !== year) : [...years, year],
        );
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.set("studentYears", studentYears.filter((y) => !joinYear || y >= joinYear).join(","));
        startTransition(async () => {
            const result = await createUserAction(formData);
            setError(result.error);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            {error && <Callout tone="danger">{error}</Callout>}

            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Vorname" required htmlFor="new-user-vorname">
                    <Input id="new-user-vorname" name="vorname" required />
                </Field>
                <Field label="Nachname" required htmlFor="new-user-name">
                    <Input id="new-user-name" name="name" required />
                </Field>
            </div>

            <Field label="E-Mail" required htmlFor="new-user-email">
                <Input id="new-user-email" name="email" type="email" required />
            </Field>

            {/* Sichtbar schaltbar: wird das Passwort nicht per Mail verschickt,
                muss der Admin es selbst weitergeben. */}
            <Field
                label="Passwort"
                required
                htmlFor="new-user-password"
                hint={`Mindestens ${PASSWORD_MIN_LENGTH} Zeichen.`}
            >
                <div className="flex gap-2">
                    <div className="flex-1">
                        <PasswordInput
                            id="new-user-password"
                            name="password"
                            autoComplete="new-password"
                            minLength={PASSWORD_MIN_LENGTH}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        type="button"
                        variant="soft"
                        color="neutral"
                        onClick={() => setPassword(generatePassword())}
                    >
                        <Dices size={16} aria-hidden="true" /> Generieren
                    </Button>
                </div>
            </Field>

            <label className="flex cursor-pointer items-start gap-2">
                <Checkbox name="notify" />
                <span className="text-sm">
                    <span className="font-semibold">Person per E-Mail informieren</span>
                    <span className="block text-muted">
                        Schickt die Zugangsdaten inkl. Passwort, mit der dringenden Empfehlung, das
                        Passwort zu ändern. Die E-Mail-Adresse gilt so oder so als bestätigt.
                    </span>
                </span>
            </label>

            <Separator />

            <div className="grid items-start gap-4 sm:grid-cols-2">
                <Field label="Rolle" htmlFor="new-user-role">
                    <Select id="new-user-role" name="role" defaultValue="MEMBER">
                        {ROLE_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </Select>
                </Field>
                <Field label="Status" htmlFor="new-user-status">
                    <Select
                        id="new-user-status"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {STATUS_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </Select>
                </Field>
                <Field
                    label="Mitglieds-ID"
                    htmlFor="new-user-mitgliedId"
                    hint="Leer lassen: Mitglieder bekommen automatisch die nächste freie ID."
                >
                    <Input id="new-user-mitgliedId" name="mitgliedId" type="number" min={0} />
                </Field>
                <Field label="Vereinsbeitritt" htmlFor="new-user-aufnahmedatum">
                    <Input
                        id="new-user-aufnahmedatum"
                        name="aufnahmedatum"
                        type="date"
                        value={aufnahmedatum}
                        onChange={(e) => setAufnahmedatum(e.target.value)}
                    />
                </Field>
                <Field label="Geburtsdatum" htmlFor="new-user-geburtsdatum">
                    <Input id="new-user-geburtsdatum" name="geburtsdatum" type="date" />
                </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Straße und Hausnummer" htmlFor="new-user-strasse" className="sm:col-span-2">
                    <Input id="new-user-strasse" name="strasse" autoComplete="off" />
                </Field>
                <Field label="PLZ" htmlFor="new-user-plz">
                    <Input id="new-user-plz" name="plz" autoComplete="off" />
                </Field>
                <Field label="Ort" htmlFor="new-user-stadt">
                    <Input id="new-user-stadt" name="stadt" autoComplete="off" />
                </Field>
                <Field label="Land" htmlFor="new-user-land">
                    <Input id="new-user-land" name="land" autoComplete="off" />
                </Field>
            </div>

            <Separator />

            <label className="flex cursor-pointer items-center gap-2">
                <Checkbox
                    name="selbstzahler"
                    checked={selbstzahler}
                    onChange={(e) => setSelbstzahler(e.target.checked)}
                />
                <span className="text-sm font-semibold">Nimmt nicht an SEPA teil (überweist selbst)</span>
            </label>

            {!selbstzahler && (
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Mandatserteilung" htmlFor="new-user-mandat">
                        <Input id="new-user-mandat" name="mandatserteilung" type="date" />
                    </Field>
                    <Field label="Bankinstitut" htmlFor="new-user-bank">
                        <Input id="new-user-bank" name="bank" autoComplete="off" />
                    </Field>
                    <Field label="IBAN" htmlFor="new-user-iban">
                        <IbanInput id="new-user-iban" name="IBAN" />
                    </Field>
                    <Field label="BIC" htmlFor="new-user-bic">
                        <Input id="new-user-bic" name="BIC" autoComplete="off" />
                    </Field>
                </div>
            )}

            {showFees && (
                <>
                    <label className="flex cursor-pointer items-start gap-2">
                        <Checkbox name="allePaid" />
                        <span className="text-sm">
                            <span className="font-semibold">Alle Beiträge bezahlt</span>
                            <span className="block text-muted">
                                Markiert die Beiträge von {joinYear} bis {currentYear} als bezahlt.
                            </span>
                        </span>
                    </label>

                    <fieldset className="grid gap-2">
                        <legend className="mb-1 text-sm font-semibold">Jahre mit ermäßigtem Beitrag</legend>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                            {feeYears.map((year) => (
                                <label key={year} className="flex cursor-pointer items-center gap-1.5 text-sm">
                                    <Checkbox
                                        checked={studentYears.includes(year)}
                                        onChange={() => toggleStudentYear(year)}
                                    />
                                    {year}
                                </label>
                            ))}
                        </div>
                    </fieldset>
                </>
            )}
            {status === "ORDENTLICHES_MITGLIED" && !showFees && (
                <p className="text-sm text-muted">
                    Mit Vereinsbeitritt werden die Beiträge ab dem Beitrittsjahr angelegt.
                </p>
            )}

            <Field label="Bemerkung" htmlFor="new-user-kommentar" hint="Erscheint als Zahlungskommentar auf der Beitragsseite.">
                <TextArea id="new-user-kommentar" name="zahlungsKommentar" rows={3} />
            </Field>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" type="submit" disabled={pending}>
                    <Check size={16} aria-hidden="true" /> Hinzufügen
                </Button>
                <ButtonLink href="/dashboard" size="lg" variant="soft" color="neutral">
                    <X size={16} aria-hidden="true" /> Abbrechen
                </ButtonLink>
            </div>
        </form>
    );
}
