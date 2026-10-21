"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, Award01Icon, Briefcase01Icon, Building01Icon, Building03Icon, Calendar01Icon, Call02Icon, CreditCardIcon, Flag01Icon, GlobeIcon, HashtagIcon, Home01Icon, InformationCircleIcon, Key02Icon, Location01Icon, Mail01Icon, Money01Icon, Mortarboard01Icon, PencilIcon, ShieldCheckIcon, StickyNote01Icon, Tick01Icon, UserIcon } from "@hugeicons/core-free-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Badge,
    Button,
    buttonClasses,
    Callout,
    Checkbox,
    Dialog,
    DialogFooter,
    Field,
    Input,
    Select,
    Separator,
    TextArea,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import { STATUS_OPTIONS, ROLE_OPTIONS } from "@/lib/statusLabels";
import { IbanInput } from "@/components/IbanInput";
import { CountryOptions } from "@/components/CountryOptions";
import { countryName } from "@/lib/countries";
import { defaultMandateId, MANDATE_ID_PATTERN } from "@/lib/sepa";

type UserData = {
    id: string;
    firstName: string | null;
    lastName: string;
    email: string;
    title: string | null;
    birthDate: string | Date | null;
    phone: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    postalCode: string | null;
    city: string | null;
    region: string | null;
    countryCode: string | null;
    degreeProgram: string | null;
    studyStart: string | Date | null;
    studyEnd: string | Date | null;
    employer: string | null;
    employmentStatus: string | null;
    industry: string | null;
    jobTitle: string | null;
    linkedinUrl: string | null;
    adminNote: string | null;
    directDebit: boolean;
    accountHolder: string | null;
    iban: string | null;
    bic: string | null;
    mandateReference: string | null;
    mandateSignedAt: string | Date | null;
    memberNumber: number | null;
    role: string;
    status: string;
    loginDisabled: boolean;
};

const FIELD_LABELS: Record<string, string> = {
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail",
    title: "Titel",
    birthDate: "Geburtsdatum",
    phone: "Telefon",
    addressLine1: "Straße",
    addressLine2: "Adresszusatz",
    postalCode: "PLZ",
    city: "Ort",
    region: "Region",
    countryCode: "Land",
    degreeProgram: "Studiengang",
    studyStart: "Studienbeginn",
    studyEnd: "Studienende",
    employer: "Arbeitgeber",
    employmentStatus: "Berufsstand",
    industry: "Berufszweig",
    jobTitle: "Position",
    linkedinUrl: "LinkedIn",
    adminNote: "Interner Vermerk",
    directDebit: "Lastschrift",
    accountHolder: "Kontoinhaber:in",
    iban: "IBAN",
    bic: "BIC",
    mandateReference: "Mandatsreferenz",
    mandateSignedAt: "Mandat erteilt am",
    memberNumber: "Mitglieds-ID",
    role: "Rolle",
    status: "Status",
    loginDisabled: "Login deaktiviert",
};

const ROLE_LABEL_MAP: Record<string, string> = Object.fromEntries(
    ROLE_OPTIONS.map((o) => [o.value, o.label])
);
const STATUS_LABEL_MAP: Record<string, string> = Object.fromEntries(
    STATUS_OPTIONS.map((o) => [o.value, o.label])
);

function toDateInput(d: string | Date | null): string {
    if (!d) return "";
    return new Date(d).toISOString().slice(0, 10);
}

/** Die Ja/Nein-Felder des Formulars — nur Admins sehen sie. */
function isCheckboxKey(key: string) {
    return key === "directDebit" || key === "loginDisabled";
}

function formatDiffValue(field: string, value: string): string {
    // Kontrollkästchen zuerst: bei ihnen heißt der leere Wert „abgewählt“ und
    // liest sich als „Nein“. Stünde die Leerprüfung davor, meldete der Dialog
    // „Bankeinzug: Ja → —“ — ein Gedankenstrich für ein Feld, das nur zwei
    // Zustände kennt.
    if (isCheckboxKey(field)) return value === "on" ? "Ja" : "Nein";
    if (value === "") return "—";
    if (field === "role") return ROLE_LABEL_MAP[value] ?? value;
    if (field === "status") return STATUS_LABEL_MAP[value] ?? value;
    if (field === "countryCode") return countryName(value);
    return value;
}

// Felder, die nur Admins sehen/ändern dürfen (nicht im Formular vorhanden, wenn !isAdmin)
const ADMIN_ONLY_KEYS = new Set([
    "memberNumber",
    "role",
    "status",
    "loginDisabled",
    "adminNote",
    "directDebit",
    "accountHolder",
    "iban",
    "bic",
    "mandateReference",
    "mandateSignedAt",
]);

export function EditUserForm({
    user,
    isAdmin,
    isSelf,
    action,
}: {
    user: UserData;
    isAdmin: boolean;
    /** Eigene Adresse ändern verlangt das aktuelle Passwort (siehe `updateUserProfile`). */
    isSelf: boolean;
    action: (formData: FormData) => void | Promise<void>;
}) {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const bypassConfirmRef = useRef(false);

    const initialValues = useMemo<Record<string, string>>(
        () => ({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            title: user.title || "",
            birthDate: toDateInput(user.birthDate),
            phone: user.phone || "",
            addressLine1: user.addressLine1 || "",
            addressLine2: user.addressLine2 || "",
            postalCode: user.postalCode || "",
            city: user.city || "",
            region: user.region || "",
            countryCode: user.countryCode || "",
            degreeProgram: user.degreeProgram || "",
            studyStart: toDateInput(user.studyStart),
            studyEnd: toDateInput(user.studyEnd),
            employer: user.employer || "",
            employmentStatus: user.employmentStatus || "",
            industry: user.industry || "",
            jobTitle: user.jobTitle || "",
            linkedinUrl: user.linkedinUrl || "",
            adminNote: user.adminNote || "",
            directDebit: user.directDebit ? "on" : "",
            accountHolder: user.accountHolder || "",
            iban: user.iban || "",
            bic: user.bic || "",
            mandateReference: user.mandateReference || "",
            mandateSignedAt: toDateInput(user.mandateSignedAt),
            memberNumber: user.memberNumber != null ? String(user.memberNumber) : "",
            role: user.role,
            status: user.status,
            loginDisabled: user.loginDisabled ? "on" : "",
        }),
        [user]
    );

    const [isDirty, setIsDirty] = useState(false);
    // Steuert, ob die Frage nach dem Grund für das Ende der Mitgliedschaft erscheint.
    const [status, setStatus] = useState(initialValues.status);
    const [diff, setDiff] = useState<{ label: string; from: string; to: string }[]>([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
    const [pendingHref, setPendingHref] = useState<string | null>(null);

    function computeChanges() {
        const form = formRef.current;
        if (!form) return [] as { key: string; label: string; from: string; to: string }[];
        const fd = new FormData(form);
        const changes: { key: string; label: string; from: string; to: string }[] = [];
        for (const key of Object.keys(initialValues)) {
            if (ADMIN_ONLY_KEYS.has(key) && !isAdmin) continue;
            const raw = fd.get(key);
            const current = isCheckboxKey(key) ? (raw ? "on" : "") : (typeof raw === "string" ? raw : "");
            if (current !== initialValues[key]) {
                changes.push({
                    key,
                    label: FIELD_LABELS[key] || key,
                    from: formatDiffValue(key, initialValues[key]),
                    to: formatDiffValue(key, current),
                });
            }
        }
        return changes;
    }

    function computeDirty() {
        setIsDirty(computeChanges().length > 0);
    }

    useEffect(() => {
        function handleBeforeUnload(e: BeforeUnloadEvent) {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = "";
            }
        }
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        if (bypassConfirmRef.current) {
            // Bestätigt: echte Übermittlung an die Server Action zulassen.
            bypassConfirmRef.current = false;
            return;
        }
        e.preventDefault();
        const changes = computeChanges();
        if (changes.length === 0) {
            bypassConfirmRef.current = true;
            setIsDirty(false);
            formRef.current?.requestSubmit();
            return;
        }
        setDiff(changes);
        setShowConfirmDialog(true);
    }

    function confirmAndSubmit() {
        setShowConfirmDialog(false);
        bypassConfirmRef.current = true;
        setIsDirty(false);
        formRef.current?.requestSubmit();
    }

    function guardNavigate(href: string) {
        if (isDirty) {
            setPendingHref(href);
            setShowLeaveConfirm(true);
        } else {
            router.push(href);
        }
    }

    /* `beforeunload` greift nur bei echten Seitenwechseln. Ein Klick auf einen
       `next/link` — die Abschnittsnavigation über der Seite, die Kopfzeile, die
       Fußzeile — wechselt die Route im Browser, ohne das Dokument zu verlassen:
       das Formular verschwand samt Eingaben, ohne dass jemand gefragt wurde.
       Deshalb werden Klicks auf interne Verweise abgefangen, solange
       ungespeicherte Änderungen offen sind, und durch dieselbe Rückfrage
       geleitet wie der Abbrechen-Knopf. */
    useEffect(() => {
        if (!isDirty) return;
        function handleClick(event: MouseEvent) {
            // Modifiziertes Klicken öffnet einen neuen Tab — die Seite hier
            // bleibt dann stehen, es geht nichts verloren.
            if (event.defaultPrevented || event.button !== 0) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const anchor = (event.target as Element | null)?.closest?.("a");
            if (!(anchor instanceof HTMLAnchorElement)) return;
            if (anchor.target && anchor.target !== "_self") return;
            if (anchor.hasAttribute("download")) return;
            const url = new URL(anchor.href, window.location.href);
            if (url.origin !== window.location.origin) return;
            // Sprungmarken innerhalb der Seite verlassen sie nicht.
            if (url.pathname === window.location.pathname && url.hash) return;
            event.preventDefault();
            guardNavigate(url.pathname + url.search);
        }
        document.addEventListener("click", handleClick, true);
        return () => document.removeEventListener("click", handleClick, true);
    });

    return (
        <>
            <form ref={formRef} action={action} onSubmit={handleFormSubmit} onChange={computeDirty}>
                <input type="hidden" name="id" value={user.id} />

                <div className="grid gap-6">
                    {/* Zur besseren Orientierung getrennte Gruppen: jede(r) darf
                        seine Angaben pflegen, Admins sehen darunter zusätzlich
                        ihren Bereich mit Beitrags- und Verwaltungsfeldern. */}
                    <GroupLabel icon={<HugeiconsIcon icon={UserIcon} size={15} />} title="Mitgliederbereich" />

                    {/* Persönliche Daten */}
                    <Section
                        icon={<HugeiconsIcon icon={UserIcon} size={16} />}
                        title="Persönliche Daten"
                        description="Wie du angesprochen werden möchtest."
                    >
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Vorname">
                                <IconInput icon={<HugeiconsIcon icon={UserIcon} size={15} />} name="firstName" defaultValue={initialValues.firstName} />
                            </Field>
                            <Field label="Name" required>
                                <IconInput icon={<HugeiconsIcon icon={UserIcon} size={15} />} name="lastName" defaultValue={initialValues.lastName} required />
                            </Field>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Titel">
                                <IconInput icon={<HugeiconsIcon icon={Award01Icon} size={15} />} name="title" defaultValue={initialValues.title} />
                            </Field>
                            <Field label="Geburtsdatum">
                                <IconInput
                                    icon={<HugeiconsIcon icon={Calendar01Icon} size={15} />}
                                    name="birthDate"
                                    type="date"
                                    defaultValue={initialValues.birthDate}
                                />
                            </Field>
                        </div>
                    </Section>

                    <Separator />

                    {/* Kontakt */}
                    <Section icon={<HugeiconsIcon icon={Mail01Icon} size={16} />} title="Kontakt" description="Wie wir dich erreichen können.">
                        <Field
                            label="E-Mail"
                            required
                            hint={isSelf ? "Deine Adresse änderst du unter „Login & Sicherheit“ — mit Bestätigung per E-Mail." : undefined}
                        >
                            {/* Die eigene Adresse ist Login-Name und ändert sich nur
                                über /dashboard/konto (Bestätigungslink). `readOnly`
                                statt `disabled`, damit der Wert mitgeschickt wird. */}
                            <div className="flex items-center gap-2">
                                <div className="min-w-0 flex-1">
                                    <IconInput
                                        icon={<HugeiconsIcon icon={Mail01Icon} size={15} />}
                                        name="email"
                                        type="email"
                                        defaultValue={initialValues.email}
                                        required
                                        readOnly={isSelf}
                                        aria-readonly={isSelf || undefined}
                                        className={isSelf ? "cursor-not-allowed opacity-60 focus:border-line-strong focus:ring-0" : undefined}
                                    />
                                </div>
                                {isSelf && (
                                    <a href="/dashboard/konto" className={buttonClasses({ variant: "soft", color: "neutral", size: "sm" })}>
                                        <HugeiconsIcon icon={PencilIcon} size={14} aria-hidden="true" />
                                        Ändern
                                    </a>
                                )}
                            </div>
                        </Field>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Telefon">
                                <IconInput icon={<HugeiconsIcon icon={Call02Icon} size={15} />} name="phone" defaultValue={initialValues.phone} />
                            </Field>
                            <Field label="LinkedIn">
                                <IconInput
                                    icon={<HugeiconsIcon icon={GlobeIcon} size={15} />}
                                    name="linkedinUrl"
                                    type="url"
                                    placeholder="https://www.linkedin.com/in/…"
                                    defaultValue={initialValues.linkedinUrl}
                                />
                            </Field>
                        </div>
                    </Section>

                    <Separator />

                    {/* Adresse */}
                    <Section icon={<HugeiconsIcon icon={Location01Icon} size={16} />} title="Adresse">
                        <Field label="Land">
                            <Select name="countryCode" defaultValue={initialValues.countryCode} autoComplete="country">
                                <CountryOptions current={initialValues.countryCode} allowEmpty />
                            </Select>
                        </Field>
                        <Field label="Straße und Hausnummer">
                            <IconInput icon={<HugeiconsIcon icon={Home01Icon} size={15} />} name="addressLine1" defaultValue={initialValues.addressLine1} />
                        </Field>
                        <Field label="Adresszusatz" hint="c/o, Apartment, Postfach …">
                            <IconInput icon={<HugeiconsIcon icon={Home01Icon} size={15} />} name="addressLine2" defaultValue={initialValues.addressLine2} />
                        </Field>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <Field label="PLZ">
                                <IconInput icon={<HugeiconsIcon icon={Location01Icon} size={15} />} name="postalCode" defaultValue={initialValues.postalCode} />
                            </Field>
                            <Field label="Ort">
                                <IconInput icon={<HugeiconsIcon icon={Building01Icon} size={15} />} name="city" defaultValue={initialValues.city} />
                            </Field>
                            <Field label="Region">
                                <IconInput
                                    icon={<HugeiconsIcon icon={Flag01Icon} size={15} />}
                                    name="region"
                                    placeholder="Bundesstaat, Provinz …"
                                    defaultValue={initialValues.region}
                                />
                            </Field>
                        </div>
                    </Section>

                    <Separator />

                    {/* Studium */}
                    <Section icon={<HugeiconsIcon icon={Mortarboard01Icon} size={16} />} title="Studium">
                        <Field label="Studiengang">
                            <IconInput icon={<HugeiconsIcon icon={Mortarboard01Icon} size={15} />} name="degreeProgram" defaultValue={initialValues.degreeProgram} />
                        </Field>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Studienbeginn">
                                <IconInput
                                    icon={<HugeiconsIcon icon={Calendar01Icon} size={15} />}
                                    name="studyStart"
                                    type="date"
                                    defaultValue={initialValues.studyStart}
                                />
                            </Field>
                            <Field label="Studienende">
                                <IconInput
                                    icon={<HugeiconsIcon icon={Calendar01Icon} size={15} />}
                                    name="studyEnd"
                                    type="date"
                                    defaultValue={initialValues.studyEnd}
                                />
                            </Field>
                        </div>
                    </Section>

                    <Separator />

                    {/* Beruf */}
                    <Section icon={<HugeiconsIcon icon={Briefcase01Icon} size={16} />} title="Beruf">
                        <Field label="Arbeitgeber">
                            <IconInput icon={<HugeiconsIcon icon={Briefcase01Icon} size={15} />} name="employer" defaultValue={initialValues.employer} />
                        </Field>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Berufsstand">
                                <IconInput icon={<HugeiconsIcon icon={Award01Icon} size={15} />} name="employmentStatus" defaultValue={initialValues.employmentStatus} />
                            </Field>
                            <Field label="Berufszweig">
                                <IconInput icon={<HugeiconsIcon icon={Briefcase01Icon} size={15} />} name="industry" defaultValue={initialValues.industry} />
                            </Field>
                        </div>
                        <Field label="Position">
                            <IconInput icon={<HugeiconsIcon icon={Briefcase01Icon} size={15} />} name="jobTitle" defaultValue={initialValues.jobTitle} />
                        </Field>
                    </Section>

                    {!isAdmin && (
                        <>
                            <Separator />

                            <Section icon={<HugeiconsIcon icon={Building03Icon} size={16} />} title="Zahlungsdaten">
                                <Callout tone="info" icon={<HugeiconsIcon icon={Money01Icon} size={16} />}>
                                    Deine Bankverbindung und dein SEPA-Mandat änderst du in der{" "}
                                    <Link
                                        href="/dashboard/zahlungen"
                                        className="font-semibold text-physics underline"
                                    >
                                        Zahlungsverwaltung
                                    </Link>
                                    . Dort findest du auch deine vollständige Beitragshistorie.
                                </Callout>
                            </Section>
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <Separator />

                            <GroupLabel
                                icon={<HugeiconsIcon icon={ShieldCheckIcon} size={15} />}
                                title="Adminbereich"
                                adminOnly
                            />

                            {/* Zahlungsdaten */}
                            <Section
                                icon={<HugeiconsIcon icon={Building03Icon} size={16} />}
                                title="Zahlungsdaten"
                                description="Bankverbindung des Mitglieds für den Mitgliedsbeitrag."
                            >
                                <CheckboxField
                                    label="Lastschrift (SEPA-Mandat erteilt)"
                                    name="directDebit"
                                    defaultChecked={user.directDebit}
                                />
                                <Field label="Kontoinhaber:in">
                                    <IconInput icon={<HugeiconsIcon icon={UserIcon} size={15} />} name="accountHolder" defaultValue={initialValues.accountHolder} />
                                </Field>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <Field label="IBAN">
                                        <IbanInput name="iban" defaultValue={initialValues.iban} />
                                    </Field>
                                    <Field label="BIC" hint="Pflicht für Konten außerhalb des EWR (CH, GB …).">
                                        <IconInput icon={<HugeiconsIcon icon={CreditCardIcon} size={15} />} name="bic" defaultValue={initialValues.bic} />
                                    </Field>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <Field
                                        label="Mandatsreferenz"
                                        hint={`Leer = ${defaultMandateId(user.memberNumber) || "aus der Mitglieds-ID"}`}
                                    >
                                        <IconInput
                                            icon={<HugeiconsIcon icon={HashtagIcon} size={15} />}
                                            name="mandateReference"
                                            defaultValue={initialValues.mandateReference}
                                            pattern={MANDATE_ID_PATTERN}
                                        />
                                    </Field>
                                    <Field label="Mandat erteilt am">
                                        <IconInput
                                            icon={<HugeiconsIcon icon={Calendar01Icon} size={15} />}
                                            name="mandateSignedAt"
                                            type="date"
                                            defaultValue={initialValues.mandateSignedAt}
                                        />
                                    </Field>
                                </div>
                            </Section>

                            <Separator />

                            {/* Mitgliedschaft & Rolle */}
                            <Section
                                icon={<HugeiconsIcon icon={ShieldCheckIcon} size={16} />}
                                title="Mitgliedschaft & Rolle"
                                description="Nur für Administratoren sichtbar."
                            >
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <Field label="Mitglieds-ID">
                                        <IconInput
                                            icon={<HugeiconsIcon icon={Key02Icon} size={15} />}
                                            name="memberNumber"
                                            type="number"
                                            defaultValue={initialValues.memberNumber}
                                        />
                                    </Field>
                                    <Field label="Rolle">
                                        <Select name="role" defaultValue={initialValues.role}>
                                            {ROLE_OPTIONS.map((o) => (
                                                <option key={o.value} value={o.value}>
                                                    {o.label}
                                                </option>
                                            ))}
                                        </Select>
                                    </Field>
                                    <Field label="Status">
                                        <Select
                                            name="status"
                                            defaultValue={initialValues.status}
                                            onChange={(event) => setStatus(event.target.value)}
                                        >
                                            {STATUS_OPTIONS.map((o) => (
                                                <option key={o.value} value={o.value}>
                                                    {o.label}
                                                </option>
                                            ))}
                                        </Select>
                                    </Field>
                                </div>
                                {initialValues.status !== "NON_MEMBER" && status === "NON_MEMBER" && (
                                    <Field
                                        label="Grund für das Ende der Mitgliedschaft"
                                        hint="Bei „Verstorben“ wird der Login gesperrt."
                                    >
                                        <Select name="terminationReason" defaultValue="RESIGNATION">
                                            <option value="RESIGNATION">Austritt</option>
                                            <option value="EXCLUSION">Ausschluss</option>
                                            <option value="DECEASED">Verstorben</option>
                                        </Select>
                                    </Field>
                                )}
                                {/* Gesperrter Login, Datensatz bleibt — so „löschen“
                                    Mitglieder ihren Zugang. Abwählen reaktiviert ihn.
                                    Fürs eigene Konto nicht angeboten: Selbstaussperrung. */}
                                {!isSelf && (
                                    <CheckboxField
                                        label="Login deaktiviert"
                                        name="loginDisabled"
                                        defaultChecked={user.loginDisabled}
                                    />
                                )}
                            </Section>

                            <Separator />

                            {/* Admin-interne Vermerke */}
                            <Section
                                icon={<HugeiconsIcon icon={StickyNote01Icon} size={16} />}
                                title="Interner Vermerk"
                                description="Nur für Administratoren sichtbar — etwa zu Zahlungen, Mahnungen oder Absprachen."
                            >
                                <Field label="Vermerk">
                                    <TextArea name="adminNote" rows={4} defaultValue={initialValues.adminNote} />
                                </Field>
                            </Section>
                        </>
                    )}

                    <div className="mt-2 flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
                        <Button size="lg" type="submit">
                            <HugeiconsIcon icon={Tick01Icon} size={16} aria-hidden="true" /> Speichern
                        </Button>
                        <Button
                            size="lg"
                            variant="soft"
                            color="neutral"
                            type="button"
                            onClick={() => guardNavigate("/dashboard")}
                        >
                            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} aria-hidden="true" /> Abbrechen
                        </Button>
                        {isDirty && (
                            <p className="flex items-center gap-2 text-xs text-warning">
                                <HugeiconsIcon icon={InformationCircleIcon} size={14} aria-hidden="true" />
                                Ungespeicherte Änderungen
                            </p>
                        )}
                    </div>
                </div>
            </form>

            {/* Bestätigungsabfrage vor dem Speichern */}
            <Dialog
                open={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                title="Änderungen speichern?"
                description={`Bitte prüfe die folgenden ${
                    diff.length === 1 ? "Änderung" : "Änderungen"
                } und bestätige, dass du sie wirklich speichern möchtest:`}
            >
                <div className="grid max-h-80 gap-2 overflow-y-auto">
                    {diff.map((d, i) => (
                        <div key={i} className="rounded-[3px] border border-line bg-raised/60 p-3">
                            <p className="text-sm font-bold">{d.label}</p>
                            <p className="flex flex-wrap items-center gap-2 text-sm">
                                <span className="text-muted line-through">{d.from}</span>
                                <span aria-hidden="true" className="text-faint">
                                    →
                                </span>
                                <span className="font-medium">{d.to}</span>
                            </p>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button
                        variant="soft"
                        color="neutral"
                        type="button"
                        onClick={() => setShowConfirmDialog(false)}
                    >
                        Abbrechen
                    </Button>
                    <Button type="button" onClick={confirmAndSubmit}>
                        <HugeiconsIcon icon={Tick01Icon} size={16} aria-hidden="true" /> Ja, Änderungen speichern
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Warnung bei Verlassen mit ungespeicherten Änderungen */}
            <Dialog
                open={showLeaveConfirm}
                onClose={() => setShowLeaveConfirm(false)}
                title="Ungespeicherte Änderungen"
                size="sm"
            >
                <p className="text-sm leading-relaxed text-muted">
                    Du hast Änderungen vorgenommen, die noch nicht gespeichert wurden. Wenn du
                    jetzt fortfährst, gehen diese Änderungen verloren.
                </p>
                <DialogFooter>
                    <Button
                        variant="soft"
                        color="neutral"
                        type="button"
                        onClick={() => setShowLeaveConfirm(false)}
                    >
                        Zurück zum Formular
                    </Button>
                    <Button
                        color="danger"
                        type="button"
                        onClick={() => {
                            if (pendingHref) {
                                setIsDirty(false);
                                router.push(pendingHref);
                            }
                        }}
                    >
                        Änderungen verwerfen
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

function Section({
    icon,
    title,
    description,
    children,
}: {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="grid gap-3">
            <div>
                <h2 className="flex items-center gap-2 text-base font-bold tracking-tight">
                    {icon && (
                        <span className="text-faint" aria-hidden="true">
                            {icon}
                        </span>
                    )}
                    {title}
                </h2>
                {description && <p className="text-sm text-muted">{description}</p>}
            </div>
            <div className="grid gap-3">{children}</div>
        </section>
    );
}

/** Gruppenkopf: kündigt den Mitglieder- bzw. den nur für Admins sichtbaren
    Bereich an und macht die Trennung der Zuständigkeiten sichtbar. */
function GroupLabel({
    icon,
    title,
    adminOnly = false,
}: {
    icon: React.ReactNode;
    title: string;
    adminOnly?: boolean;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2.5">
            <span
                className="grid size-7 shrink-0 place-items-center rounded-[3px] bg-raised text-faint"
                aria-hidden="true"
            >
                {icon}
            </span>
            <h2 className="text-sm font-bold tracking-wide">{title}</h2>
            {adminOnly && (
                <Badge tone="warning">
                    <HugeiconsIcon icon={ShieldCheckIcon} size={12} aria-hidden="true" /> Nur für Admins
                </Badge>
            )}
        </div>
    );
}

/** Eingabefeld mit führendem Symbol: dasselbe Muster wie das Chevron im
    `Select` und die Lupe in der Blog-Suche — rein dekorativ, vorn gepolstert,
    damit der Text nie unter dem Symbol klebt. */
function IconInput({
    icon,
    className,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) {
    return (
        <div className="relative">
            <Input className={cn("pl-10", className)} {...props} />
            <span
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-faint"
                aria-hidden="true"
            >
                {icon}
            </span>
        </div>
    );
}

function CheckboxField({
    label,
    name,
    defaultChecked,
}: {
    label: string;
    name: string;
    defaultChecked: boolean;
}) {
    return (
        <label className="flex cursor-pointer items-center gap-2">
            <Checkbox name={name} defaultChecked={defaultChecked} />
            <span className="text-sm font-semibold">{label}</span>
        </label>
    );
}
