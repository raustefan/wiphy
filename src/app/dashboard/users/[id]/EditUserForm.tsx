"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Flex,
    Heading,
    Text,
    Button,
    Card,
    TextField,
    Select,
    Box,
    Grid,
    AlertDialog,
    Separator,
} from "@radix-ui/themes";
import { ArrowLeftIcon, CheckIcon } from "@radix-ui/react-icons";
import { Mail, Info } from "lucide-react";
import { STATUS_OPTIONS, ROLE_OPTIONS } from "@/lib/statusLabels";

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

function formatDiffValue(field: string, value: string): string {
    if (value === "") return "—";
    if (field === "role") return ROLE_LABEL_MAP[value] ?? value;
    if (field === "status") return STATUS_LABEL_MAP[value] ?? value;
    if (field === "bankeinzug" || field === "zuwendungsbesch" || field === "datensperren" || field === "ausschluss") {
        return value === "on" ? "Ja" : "Nein";
    }
    return value;
}

// Felder, die nur Admins sehen/ändern dürfen (nicht im Formular vorhanden, wenn !isAdmin)
const ADMIN_ONLY_KEYS = new Set([
    "mitgliedId",
    "role",
    "status",
    "datensperren",
    "ausschluss",
    "zahlungsKommentar",
    "mahnung",
]);

export function EditUserForm({
    user,
    isAdmin,
    action,
}: {
    user: UserData;
    isAdmin: boolean;
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
        }),
        [user]
    );

    const [isDirty, setIsDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [diff, setDiff] = useState<{ label: string; from: string; to: string }[]>([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
    const [pendingHref, setPendingHref] = useState<string | null>(null);

    function isCheckboxKey(key: string) {
        return key === "bankeinzug" || key === "zuwendungsbesch" || key === "datensperren" || key === "ausschluss";
    }

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

    return (
        <>
            <form ref={formRef} action={action} onSubmit={handleFormSubmit} onChange={computeDirty}>
                <input type="hidden" name="id" value={user.id} />

                <Flex direction="column" gap="6">
                    {/* Persönliche Daten */}
                    <Section title="Persönliche Daten" description="Wie du angesprochen werden möchtest.">
                        <Grid columns={{ initial: "1", sm: "2" }} gap="3">
                            <Field label="Vorname">
                                <TextField.Root name="vorname" defaultValue={initialValues.vorname} />
                            </Field>
                            <Field label="Name" required>
                                <TextField.Root name="name" defaultValue={initialValues.name} required />
                            </Field>
                        </Grid>
                        <Grid columns={{ initial: "1", sm: "2" }} gap="3">
                            <Field label="Titel">
                                <TextField.Root name="titel" defaultValue={initialValues.titel} />
                            </Field>
                            <Field label="Geburtsdatum">
                                <TextField.Root
                                    name="geburtsdatum"
                                    type="date"
                                    defaultValue={initialValues.geburtsdatum}
                                />
                            </Field>
                        </Grid>
                    </Section>

                    <Separator size="4" />

                    {/* Kontakt */}
                    <Section title="Kontakt" description="Wie wir dich erreichen können.">
                        <Field label="E-Mail" required>
                            <TextField.Root
                                name="email"
                                type="email"
                                defaultValue={initialValues.email}
                                required
                            />
                            {emailDirty && (
                                <Flex align="center" gap="2" mt="1">
                                    <Mail size={14} color="var(--amber-9)" />
                                    <Text size="1" color="amber">
                                        Nach dem Speichern erhältst du eine Bestätigungs-E-Mail an die
                                        neue Adresse. Die Änderung wird erst nach Bestätigung wirksam.
                                    </Text>
                                </Flex>
                            )}
                        </Field>
                        <Grid columns={{ initial: "1", sm: "2" }} gap="3">
                            <Field label="Telefon">
                                <TextField.Root name="telefon" defaultValue={initialValues.telefon} />
                            </Field>
                            <Field label="Website">
                                <TextField.Root name="website" defaultValue={initialValues.website} />
                            </Field>
                        </Grid>
                    </Section>

                    <Separator size="4" />

                    {/* Adresse */}
                    <Section title="Adresse">
                        <Field label="Straße">
                            <TextField.Root name="strasse" defaultValue={initialValues.strasse} />
                        </Field>
                        <Grid columns={{ initial: "1", sm: "3" }} gap="3">
                            <Field label="PLZ">
                                <TextField.Root name="plz" defaultValue={initialValues.plz} />
                            </Field>
                            <Field label="Stadt">
                                <TextField.Root name="stadt" defaultValue={initialValues.stadt} />
                            </Field>
                            <Field label="Land">
                                <TextField.Root name="land" defaultValue={initialValues.land} />
                            </Field>
                        </Grid>
                    </Section>

                    <Separator size="4" />

                    {/* Studium */}
                    <Section title="Studium">
                        <Field label="Studiengang">
                            <TextField.Root name="studiengang" defaultValue={initialValues.studiengang} />
                        </Field>
                        <Grid columns={{ initial: "1", sm: "2" }} gap="3">
                            <Field label="Studienbeginn">
                                <TextField.Root
                                    name="studienbeginn"
                                    type="date"
                                    defaultValue={initialValues.studienbeginn}
                                />
                            </Field>
                            <Field label="Studienende">
                                <TextField.Root
                                    name="studienende"
                                    type="date"
                                    defaultValue={initialValues.studienende}
                                />
                            </Field>
                        </Grid>
                        <Grid columns={{ initial: "1", sm: "2" }} gap="3">
                            <Field label="Diplomarbeit">
                                <TextField.Root name="diplomarbeit" defaultValue={initialValues.diplomarbeit} />
                            </Field>
                            <Field label="Bachelorarbeit">
                                <TextField.Root name="bachelorarbeit" defaultValue={initialValues.bachelorarbeit} />
                            </Field>
                        </Grid>
                        <Grid columns={{ initial: "1", sm: "2" }} gap="3">
                            <Field label="Masterarbeit">
                                <TextField.Root name="masterarbeit" defaultValue={initialValues.masterarbeit} />
                            </Field>
                            <Field label="Dissertation">
                                <TextField.Root name="dissertation" defaultValue={initialValues.dissertation} />
                            </Field>
                        </Grid>
                    </Section>

                    <Separator size="4" />

                    {/* Beruf */}
                    <Section title="Beruf">
                        <Field label="Arbeitgeber">
                            <TextField.Root name="arbeitgeber" defaultValue={initialValues.arbeitgeber} />
                        </Field>
                        <Grid columns={{ initial: "1", sm: "2" }} gap="3">
                            <Field label="Berufsstand">
                                <TextField.Root name="berufsstand" defaultValue={initialValues.berufsstand} />
                            </Field>
                            <Field label="Berufszweig">
                                <TextField.Root name="berufszweig" defaultValue={initialValues.berufszweig} />
                            </Field>
                        </Grid>
                        <Grid columns={{ initial: "1", sm: "2" }} gap="3">
                            <Field label="Position">
                                <TextField.Root name="position" defaultValue={initialValues.position} />
                            </Field>
                            <Field label="Praktika">
                                <TextField.Root name="praktika" defaultValue={initialValues.praktika} />
                            </Field>
                        </Grid>
                        <Field label="Berufserfahrung">
                            <TextField.Root name="berufserfahrung" defaultValue={initialValues.berufserfahrung} />
                        </Field>
                    </Section>

                    <Separator size="4" />

                    {/* Zahlungsdaten */}
                    <Section
                        title="Zahlungsdaten"
                        description="Deine Bankverbindung für den Mitgliedsbeitrag."
                    >
                        <Grid columns={{ initial: "1", sm: "3" }} gap="3">
                            <Field label="Bank">
                                <TextField.Root name="bank" defaultValue={initialValues.bank} />
                            </Field>
                            <Field label="BLZ">
                                <TextField.Root name="BLZ" defaultValue={initialValues.BLZ} />
                            </Field>
                            <Field label="Kontonummer">
                                <TextField.Root name="KTO" defaultValue={initialValues.KTO} />
                            </Field>
                        </Grid>
                        <Grid columns={{ initial: "1", sm: "2" }} gap="3">
                            <Field label="IBAN">
                                <TextField.Root name="IBAN" defaultValue={initialValues.IBAN} />
                            </Field>
                            <Field label="BIC">
                                <TextField.Root name="BIC" defaultValue={initialValues.BIC} />
                            </Field>
                        </Grid>
                        <Field label="Mandatserteilung">
                            <TextField.Root
                                name="mandatserteilung"
                                type="date"
                                defaultValue={initialValues.mandatserteilung}
                            />
                        </Field>
                        <Grid columns={{ initial: "1", sm: "2" }} gap="3">
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
                        </Grid>
                    </Section>

                    {isAdmin && (
                        <>
                            <Separator size="4" />

                            {/* Mitgliedschaft & Rolle */}
                            <Section title="Mitgliedschaft & Rolle" description="Nur für Administratoren sichtbar.">
                                <Grid columns={{ initial: "1", sm: "3" }} gap="3">
                                    <Field label="Mitglieds-ID">
                                        <TextField.Root
                                            name="mitgliedId"
                                            type="number"
                                            defaultValue={initialValues.mitgliedId}
                                        />
                                    </Field>
                                    <Field label="Rolle">
                                        <Select.Root name="role" defaultValue={initialValues.role}>
                                            <Select.Trigger />
                                            <Select.Content>
                                                {ROLE_OPTIONS.map((o) => (
                                                    <Select.Item key={o.value} value={o.value}>
                                                        {o.label}
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Root>
                                    </Field>
                                    <Field label="Status">
                                        <Select.Root name="status" defaultValue={initialValues.status}>
                                            <Select.Trigger />
                                            <Select.Content>
                                                {STATUS_OPTIONS.map((o) => (
                                                    <Select.Item key={o.value} value={o.value}>
                                                        {o.label}
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Root>
                                    </Field>
                                </Grid>
                                <Grid columns={{ initial: "1", sm: "2" }} gap="3">
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
                                </Grid>
                            </Section>

                            <Separator size="4" />

                            {/* Admin-interne Zahlungsvermerke */}
                            <Section
                                title="Interne Zahlungsvermerke"
                                description="Nur für Administratoren sichtbar."
                            >
                                <Grid columns={{ initial: "1", sm: "2" }} gap="3">
                                    <Field label="Zahlungs-Kommentar">
                                        <TextField.Root
                                            name="zahlungsKommentar"
                                            defaultValue={initialValues.zahlungsKommentar}
                                        />
                                    </Field>
                                    <Field label="Mahnung">
                                        <TextField.Root name="mahnung" defaultValue={initialValues.mahnung} />
                                    </Field>
                                </Grid>
                            </Section>
                        </>
                    )}

                    <Flex gap="3" mt="2">
                        <Button type="submit">
                            <CheckIcon /> Speichern
                        </Button>
                        <Button
                            variant="soft"
                            color="gray"
                            type="button"
                            onClick={() => guardNavigate("/dashboard")}
                        >
                            <ArrowLeftIcon /> Abbrechen
                        </Button>
                        {isDirty && (
                            <Flex align="center" gap="2" ml="2">
                                <Info size={14} color="var(--amber-9)" />
                                <Text size="1" color="amber">
                                    Ungespeicherte Änderungen
                                </Text>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            </form>

            {/* Bestätigungsabfrage vor dem Speichern */}
            <AlertDialog.Root open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialog.Content maxWidth="480px">
                    <AlertDialog.Title>Änderungen speichern?</AlertDialog.Title>
                    <AlertDialog.Description size="2" mb="3">
                        Bitte prüfe die folgenden {diff.length === 1 ? "Änderung" : "Änderungen"} und
                        bestätige, dass du sie wirklich speichern möchtest:
                    </AlertDialog.Description>
                    <Flex direction="column" gap="2" mb="3" style={{ maxHeight: 320, overflowY: "auto" }}>
                        {diff.map((d, i) => (
                            <Card key={i} size="1" variant="surface">
                                <Text size="2" weight="bold">
                                    {d.label}
                                </Text>
                                <Flex gap="2" align="center" wrap="wrap">
                                    <Text size="2" color="gray" style={{ textDecoration: "line-through" }}>
                                        {d.from}
                                    </Text>
                                    <Text size="2" color="gray">
                                        →
                                    </Text>
                                    <Text size="2" weight="medium">
                                        {d.to}
                                    </Text>
                                </Flex>
                            </Card>
                        ))}
                    </Flex>
                    <Flex gap="3" justify="end" mt="2">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray" type="button">
                                Abbrechen
                            </Button>
                        </AlertDialog.Cancel>
                        <Button type="button" onClick={confirmAndSubmit}>
                            <CheckIcon /> Ja, Änderungen speichern
                        </Button>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

            {/* Warnung bei Verlassen mit ungespeicherten Änderungen */}
            <AlertDialog.Root open={showLeaveConfirm} onOpenChange={setShowLeaveConfirm}>
                <AlertDialog.Content maxWidth="420px">
                    <AlertDialog.Title>Ungespeicherte Änderungen</AlertDialog.Title>
                    <AlertDialog.Description size="2" mb="3">
                        Du hast Änderungen vorgenommen, die noch nicht gespeichert wurden. Wenn du
                        jetzt fortfährst, gehen diese Änderungen verloren.
                    </AlertDialog.Description>
                    <Flex gap="3" justify="end" mt="2">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray" type="button">
                                Zurück zum Formular
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button
                                color="red"
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
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
}

function Section({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <Flex direction="column" gap="3">
            <Box>
                <Heading as="h2" size="4">{title}</Heading>
                {description && (
                    <Text size="2" color="gray">
                        {description}
                    </Text>
                )}
            </Box>
            <Flex direction="column" gap="3">
                {children}
            </Flex>
        </Flex>
    );
}

function Field({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <label>
            <Text size="2" weight="bold" as="div" mb="1">
                {label}
                {required && (
                    <Text color="red">
                        {" "}
                        *
                    </Text>
                )}
            </Text>
            {children}
        </label>
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
        <Flex asChild align="center" gap="2">
            <label>
                <input name={name} type="checkbox" defaultChecked={defaultChecked} />
                <Text size="2" weight="bold">
                    {label}
                </Text>
            </label>
        </Flex>
    );
}
