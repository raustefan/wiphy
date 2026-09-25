"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Award,
    Banknote,
    Bell,
    BookOpen,
    Briefcase,
    Building,
    Calendar,
    Check,
    CreditCard,
    Flag,
    Globe,
    GraduationCap,
    Hash,
    Home,
    Info,
    KeyRound,
    Landmark,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    ShieldCheck,
    StickyNote,
    User,
} from "lucide-react";
import {
    Badge,
    Button,
    Callout,
    Checkbox,
    Dialog,
    DialogFooter,
    Field,
    Input,
    Select,
    Separator,
} from "@/components/ui";
import { cn } from "@/lib/cn";
import { STATUS_OPTIONS, ROLE_OPTIONS } from "@/lib/statusLabels";
import { IbanInput } from "@/components/IbanInput";
import { PasswordInput } from "@/components/PasswordField";

type UserData = {
    id: string;
    vorname: string | null;
    name: string;
    email: string;
    titel: string | null;
    geburtsdatum: string | Date | null;
    land: string | null;
    plz: string | null;
    stadt: string | null;
    strasse: string | null;
    telefon: string | null;
    website: string | null;
    studiengang: string | null;
    studienbeginn: string | Date | null;
    studienende: string | Date | null;
    diplomarbeit: string | null;
    bachelorarbeit: string | null;
    masterarbeit: string | null;
    dissertation: string | null;
    arbeitgeber: string | null;
    berufsstand: string | null;
    berufszweig: string | null;
    position: string | null;
    praktika: string | null;
    berufserfahrung: string | null;
    zahlungsKommentar: string | null;
    bank: string | null;
    BLZ: string | null;
    KTO: string | null;
    bankeinzug: boolean | null;
    zuwendungsbesch: boolean | null;
    mahnung: string | null;
    IBAN: string | null;
    BIC: string | null;
    mandatserteilung: string | Date | null;
    mitgliedId: number | null;
    role: string;
    status: string;
    datensperren: boolean | null;
    ausschluss: boolean | null;
    loginDisabled: boolean;
};

const FIELD_LABELS: Record<string, string> = {
    vorname: "Vorname",
    name: "Name",
    email: "E-Mail",
    titel: "Titel",
    geburtsdatum: "Geburtsdatum",
    land: "Land",
    plz: "PLZ",
    stadt: "Stadt",
    strasse: "Straße",
    telefon: "Telefon",
    website: "Website",
    studiengang: "Studiengang",
    studienbeginn: "Studienbeginn",
    studienende: "Studienende",
    diplomarbeit: "Diplomarbeit",
    bachelorarbeit: "Bachelorarbeit",
    masterarbeit: "Masterarbeit",
    dissertation: "Dissertation",
    arbeitgeber: "Arbeitgeber",
    berufsstand: "Berufsstand",
    berufszweig: "Berufszweig",
    position: "Position",
    praktika: "Praktika",
    berufserfahrung: "Berufserfahrung",
    zahlungsKommentar: "Zahlungs-Kommentar",
    bank: "Bank",
    BLZ: "BLZ",
    KTO: "Kontonummer",
    bankeinzug: "Bankeinzug",
    zuwendungsbesch: "Zuwendungsbeschreibung",
    mahnung: "Mahnung",
    IBAN: "IBAN",
    BIC: "BIC",
    mandatserteilung: "Mandatserteilung",
    mitgliedId: "Mitglieds-ID",
    role: "Rolle",
    status: "Status",
    datensperren: "Datensperren",
    ausschluss: "Ausschluss",
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

/** Die vier Ja/Nein-Felder des Formulars — nur Admins sehen sie. */
function isCheckboxKey(key: string) {
    return (
        key === "bankeinzug" ||
        key === "zuwendungsbesch" ||
        key === "datensperren" ||
        key === "ausschluss" ||
        key === "loginDisabled"
    );
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
    return value;
}

// Felder, die nur Admins sehen/ändern dürfen (nicht im Formular vorhanden, wenn !isAdmin)
const ADMIN_ONLY_KEYS = new Set([
    "mitgliedId",
    "role",
    "status",
    "datensperren",
    "ausschluss",
    "loginDisabled",
    "zahlungsKommentar",
    "mahnung",
    "bank",
    "BLZ",
    "KTO",
    "IBAN",
    "BIC",
    "bankeinzug",
    "zuwendungsbesch",
    "mandatserteilung",
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
            vorname: user.vorname || "",
            name: user.name || "",
            email: user.email || "",
            titel: user.titel || "",
            geburtsdatum: toDateInput(user.geburtsdatum),
            land: user.land || "",
            plz: user.plz || "",
            stadt: user.stadt || "",
            strasse: user.strasse || "",
            telefon: user.telefon || "",
            website: user.website || "",
            studiengang: user.studiengang || "",
            studienbeginn: toDateInput(user.studienbeginn),
            studienende: toDateInput(user.studienende),
            diplomarbeit: user.diplomarbeit || "",
            bachelorarbeit: user.bachelorarbeit || "",
            masterarbeit: user.masterarbeit || "",
            dissertation: user.dissertation || "",
            arbeitgeber: user.arbeitgeber || "",
            berufsstand: user.berufsstand || "",
            berufszweig: user.berufszweig || "",
            position: user.position || "",
            praktika: user.praktika || "",
            berufserfahrung: user.berufserfahrung || "",
            zahlungsKommentar: user.zahlungsKommentar || "",
            bank: user.bank || "",
            BLZ: user.BLZ || "",
            KTO: user.KTO || "",
            bankeinzug: user.bankeinzug ? "on" : "",
            zuwendungsbesch: user.zuwendungsbesch ? "on" : "",
            mahnung: user.mahnung || "",
            IBAN: user.IBAN || "",
            BIC: user.BIC || "",
            mandatserteilung: toDateInput(user.mandatserteilung),
            mitgliedId: user.mitgliedId != null ? String(user.mitgliedId) : "",
            role: user.role,
            status: user.status,
            datensperren: user.datensperren ? "on" : "",
            ausschluss: user.ausschluss ? "on" : "",
            loginDisabled: user.loginDisabled ? "on" : "",
        }),
        [user]
    );

    const [isDirty, setIsDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
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
        const form = formRef.current;
        const emailRaw = form ? new FormData(form).get("email") : null;
        setEmailDirty(typeof emailRaw === "string" && emailRaw !== initialValues.email);
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
                    <GroupLabel icon={<User size={15} />} title="Mitgliederbereich" />

                    {/* Persönliche Daten */}
                    <Section
                        icon={<User size={16} />}
                        title="Persönliche Daten"
                        description="Wie du angesprochen werden möchtest."
                    >
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Vorname">
                                <IconInput icon={<User size={15} />} name="vorname" defaultValue={initialValues.vorname} />
                            </Field>
                            <Field label="Name" required>
                                <IconInput icon={<User size={15} />} name="name" defaultValue={initialValues.name} required />
                            </Field>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Titel">
                                <IconInput icon={<Award size={15} />} name="titel" defaultValue={initialValues.titel} />
                            </Field>
                            <Field label="Geburtsdatum">
                                <IconInput
                                    icon={<Calendar size={15} />}
                                    name="geburtsdatum"
                                    type="date"
                                    defaultValue={initialValues.geburtsdatum}
                                />
                            </Field>
                        </div>
                    </Section>

                    <Separator />

                    {/* Kontakt */}
                    <Section icon={<Mail size={16} />} title="Kontakt" description="Wie wir dich erreichen können.">
                        <Field label="E-Mail" required>
                            <IconInput
                                icon={<Mail size={15} />}
                                name="email"
                                type="email"
                                defaultValue={initialValues.email}
                                required
                            />
                            {emailDirty && (
                                <p className="mt-1 flex items-start gap-2 text-xs text-warning">
                                    <Mail size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                                    Nach dem Speichern erhältst du eine Bestätigungs-E-Mail an die
                                    neue Adresse. Die Änderung wird erst nach Bestätigung wirksam.
                                </p>
                            )}
                        </Field>
                        {emailDirty && isSelf && (
                            <Field label="Aktuelles Passwort" required>
                                <PasswordInput
                                    name="currentPassword"
                                    autoComplete="current-password"
                                    required
                                />
                            </Field>
                        )}
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Telefon">
                                <IconInput icon={<Phone size={15} />} name="telefon" defaultValue={initialValues.telefon} />
                            </Field>
                            <Field label="Website">
                                <IconInput icon={<Globe size={15} />} name="website" defaultValue={initialValues.website} />
                            </Field>
                        </div>
                    </Section>

                    <Separator />

                    {/* Adresse */}
                    <Section icon={<MapPin size={16} />} title="Adresse">
                        <Field label="Straße">
                            <IconInput icon={<Home size={15} />} name="strasse" defaultValue={initialValues.strasse} />
                        </Field>
                        <div className="grid gap-3 sm:grid-cols-3">
                            <Field label="PLZ">
                                <IconInput icon={<MapPin size={15} />} name="plz" defaultValue={initialValues.plz} />
                            </Field>
                            <Field label="Stadt">
                                <IconInput icon={<Building size={15} />} name="stadt" defaultValue={initialValues.stadt} />
                            </Field>
                            <Field label="Land">
                                <IconInput icon={<Flag size={15} />} name="land" defaultValue={initialValues.land} />
                            </Field>
                        </div>
                    </Section>

                    <Separator />

                    {/* Studium */}
                    <Section icon={<GraduationCap size={16} />} title="Studium">
                        <Field label="Studiengang">
                            <IconInput icon={<GraduationCap size={15} />} name="studiengang" defaultValue={initialValues.studiengang} />
                        </Field>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Studienbeginn">
                                <IconInput
                                    icon={<Calendar size={15} />}
                                    name="studienbeginn"
                                    type="date"
                                    defaultValue={initialValues.studienbeginn}
                                />
                            </Field>
                            <Field label="Studienende">
                                <IconInput
                                    icon={<Calendar size={15} />}
                                    name="studienende"
                                    type="date"
                                    defaultValue={initialValues.studienende}
                                />
                            </Field>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Diplomarbeit">
                                <IconInput icon={<BookOpen size={15} />} name="diplomarbeit" defaultValue={initialValues.diplomarbeit} />
                            </Field>
                            <Field label="Bachelorarbeit">
                                <IconInput icon={<BookOpen size={15} />} name="bachelorarbeit" defaultValue={initialValues.bachelorarbeit} />
                            </Field>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Masterarbeit">
                                <IconInput icon={<BookOpen size={15} />} name="masterarbeit" defaultValue={initialValues.masterarbeit} />
                            </Field>
                            <Field label="Dissertation">
                                <IconInput icon={<BookOpen size={15} />} name="dissertation" defaultValue={initialValues.dissertation} />
                            </Field>
                        </div>
                    </Section>

                    <Separator />

                    {/* Beruf */}
                    <Section icon={<Briefcase size={16} />} title="Beruf">
                        <Field label="Arbeitgeber">
                            <IconInput icon={<Briefcase size={15} />} name="arbeitgeber" defaultValue={initialValues.arbeitgeber} />
                        </Field>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Berufsstand">
                                <IconInput icon={<Award size={15} />} name="berufsstand" defaultValue={initialValues.berufsstand} />
                            </Field>
                            <Field label="Berufszweig">
                                <IconInput icon={<Briefcase size={15} />} name="berufszweig" defaultValue={initialValues.berufszweig} />
                            </Field>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Field label="Position">
                                <IconInput icon={<Briefcase size={15} />} name="position" defaultValue={initialValues.position} />
                            </Field>
                            <Field label="Praktika">
                                <IconInput icon={<BookOpen size={15} />} name="praktika" defaultValue={initialValues.praktika} />
                            </Field>
                        </div>
                        <Field label="Berufserfahrung">
                            <IconInput icon={<StickyNote size={15} />} name="berufserfahrung" defaultValue={initialValues.berufserfahrung} />
                        </Field>
                    </Section>

                    {!isAdmin && (
                        <>
                            <Separator />

                            <Section icon={<Landmark size={16} />} title="Zahlungsdaten">
                                <Callout tone="info" icon={<Banknote size={16} />}>
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
                                icon={<ShieldCheck size={15} />}
                                title="Adminbereich"
                                adminOnly
                            />

                            {/* Zahlungsdaten */}
                            <Section
                                icon={<Landmark size={16} />}
                                title="Zahlungsdaten"
                                description="Bankverbindung des Mitglieds für den Mitgliedsbeitrag."
                            >
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <Field label="Bank">
                                        <IconInput icon={<Landmark size={15} />} name="bank" defaultValue={initialValues.bank} />
                                    </Field>
                                    <Field label="BLZ">
                                        <IconInput icon={<Hash size={15} />} name="BLZ" defaultValue={initialValues.BLZ} />
                                    </Field>
                                    <Field label="Kontonummer">
                                        <IconInput icon={<Hash size={15} />} name="KTO" defaultValue={initialValues.KTO} />
                                    </Field>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <Field label="IBAN">
                                        <IbanInput name="IBAN" defaultValue={initialValues.IBAN} />
                                    </Field>
                                    <Field label="BIC">
                                        <IconInput icon={<CreditCard size={15} />} name="BIC" defaultValue={initialValues.BIC} />
                                    </Field>
                                </div>
                                <Field label="Mandatserteilung">
                                    <IconInput
                                        icon={<Calendar size={15} />}
                                        name="mandatserteilung"
                                        type="date"
                                        defaultValue={initialValues.mandatserteilung}
                                    />
                                </Field>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <CheckboxField
                                        label="Bankeinzug"
                                        name="bankeinzug"
                                        defaultChecked={Boolean(user.bankeinzug)}
                                    />
                                    <CheckboxField
                                        label="Zuwendungsbeschreibung"
                                        name="zuwendungsbesch"
                                        defaultChecked={Boolean(user.zuwendungsbesch)}
                                    />
                                </div>
                            </Section>

                            <Separator />

                            {/* Mitgliedschaft & Rolle */}
                            <Section
                                icon={<ShieldCheck size={16} />}
                                title="Mitgliedschaft & Rolle"
                                description="Nur für Administratoren sichtbar."
                            >
                                <div className="grid gap-3 sm:grid-cols-3">
                                    <Field label="Mitglieds-ID">
                                        <IconInput
                                            icon={<KeyRound size={15} />}
                                            name="mitgliedId"
                                            type="number"
                                            defaultValue={initialValues.mitgliedId}
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
                                        <Select name="status" defaultValue={initialValues.status}>
                                            {STATUS_OPTIONS.map((o) => (
                                                <option key={o.value} value={o.value}>
                                                    {o.label}
                                                </option>
                                            ))}
                                        </Select>
                                    </Field>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <CheckboxField
                                        label="Datensperren"
                                        name="datensperren"
                                        defaultChecked={Boolean(user.datensperren)}
                                    />
                                    <CheckboxField
                                        label="Ausschluss"
                                        name="ausschluss"
                                        defaultChecked={Boolean(user.ausschluss)}
                                    />
                                </div>
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

                            {/* Admin-interne Zahlungsvermerke */}
                            <Section
                                icon={<StickyNote size={16} />}
                                title="Interne Zahlungsvermerke"
                                description="Nur für Administratoren sichtbar."
                            >
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <Field label="Zahlungs-Kommentar">
                                        <IconInput
                                            icon={<MessageSquare size={15} />}
                                            name="zahlungsKommentar"
                                            defaultValue={initialValues.zahlungsKommentar}
                                        />
                                    </Field>
                                    <Field label="Mahnung">
                                        <IconInput
                                            icon={<Bell size={15} />}
                                            name="mahnung"
                                            defaultValue={initialValues.mahnung}
                                        />
                                    </Field>
                                </div>
                            </Section>
                        </>
                    )}

                    <div className="mt-2 flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
                        <Button size="lg" type="submit">
                            <Check size={16} aria-hidden="true" /> Speichern
                        </Button>
                        <Button
                            size="lg"
                            variant="soft"
                            color="neutral"
                            type="button"
                            onClick={() => guardNavigate("/dashboard")}
                        >
                            <ArrowLeft size={16} aria-hidden="true" /> Abbrechen
                        </Button>
                        {isDirty && (
                            <p className="flex items-center gap-2 text-xs text-warning">
                                <Info size={14} aria-hidden="true" />
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
                        <div key={i} className="rounded-xl border border-line bg-raised/60 p-3">
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
                        <Check size={16} aria-hidden="true" /> Ja, Änderungen speichern
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
                className="grid size-7 shrink-0 place-items-center rounded-lg bg-raised text-faint"
                aria-hidden="true"
            >
                {icon}
            </span>
            <h2 className="text-sm font-bold tracking-wide">{title}</h2>
            {adminOnly && (
                <Badge tone="warning">
                    <ShieldCheck size={12} aria-hidden="true" /> Nur für Admins
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
