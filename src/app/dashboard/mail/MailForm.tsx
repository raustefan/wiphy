"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
    Calendar01Icon,
    Cancel01Icon,
    CheckmarkCircle02Icon,
    ListIcon,
    Megaphone01Icon,
    News01Icon,
    SentIcon,
} from "@hugeicons/core-free-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    Badge,
    Button,
    ButtonLink,
    Checkbox,
    Dialog,
    DialogFooter,
    Field,
    Input,
    Select,
    Separator,
    Spinner,
} from "@/components/ui";
import { sendEmailAction } from "./actions";
import type { MailAnnouncement } from "./MailDashboard";
import { EmailBodyField, useEmailEditor } from "@/components/EmailBodyField";
import { useActionForm } from "@/lib/client/useActionForm";
import { formatStatus, getStatusTone } from "@/lib/statusLabels";
import type { MailSendReport } from "@/lib/server/email/sendReport";

export type MailUserOption = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    /** `false`: hat den Newsletter abbestellt. */
    newsletter: boolean;
};

type MailFormProps = {
    users: MailUserOption[];
    /** Gesetzt, wenn die Mail einen Termin ankündigt (`?termin=<id>`). */
    announcement?: MailAnnouncement | null;
    onSuccess?: (report: MailSendReport) => void;
};

const MIN_SEARCH_LEN = 2;
const MAX_SEARCH_RESULTS = 50;

/** Sortier- und Anzeigereihenfolge der Empfängergruppen nach Mitgliedsstatus. */
const STATUS_ORDER = ["HONORARY_MEMBER", "REGULAR_MEMBER", "NON_MEMBER"] as const;

const STATUS_RANK: Record<string, number> = Object.fromEntries(
    STATUS_ORDER.map((status, index) => [status, index]),
);

const TARGET_OPTIONS: { value: string; label: string }[] = [
    { value: "ALL", label: "Alle Benutzer" },
    ...STATUS_ORDER.map((status) => ({ value: status, label: formatStatus(status) })),
    { value: "SELECTED", label: "Ausgewählte Nutzer" },
];

type MailKind = "yes" | "no";

/** Die Pflichtfrage „Newsletter oder nicht“ — bewusst ohne Vorauswahl. */
const MAIL_KINDS: { value: MailKind; title: string; description: string; icon: typeof News01Icon }[] = [
    {
        value: "yes",
        title: "Newsletter",
        description:
            "Allgemeine Neuigkeiten aus dem Verein. Geht nur an Abonnenten und bekommt ganz unten einen Abmeldelink.",
        icon: News01Icon,
    },
    {
        value: "no",
        title: "Mitteilung an alle",
        description:
            "Zur Mitgliedschaft, etwa Einladung zur Mitgliederversammlung oder Beitragsfragen. Geht an alle Empfänger, ohne Abmeldelink.",
        icon: Megaphone01Icon,
    },
];

function MailKindChoice({ value, onChange }: { value: MailKind | null; onChange: (kind: MailKind) => void }) {
    return (
        <fieldset className="grid gap-1.5">
            <legend className="mb-1.5 text-sm font-semibold text-foreground">
                Art der Mail
                <span aria-hidden="true" className="text-negative">
                    {" *"}
                </span>
                <span className="sr-only"> (erforderlich)</span>
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
                {MAIL_KINDS.map((kind) => (
                    <label
                        key={kind.value}
                        className="group relative flex cursor-pointer items-start gap-3 rounded-[3px] border border-line-strong bg-surface p-4 transition-colors hover:border-physics has-checked:border-physics has-checked:bg-physics/8 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-physics"
                    >
                        {/* Natives Radio: `required` lässt den Browser das Absenden
                            ohne Auswahl verhindern, Pfeiltasten wechseln die Wahl. */}
                        <input
                            type="radio"
                            name="newsletter"
                            value={kind.value}
                            required
                            checked={value === kind.value}
                            onChange={() => onChange(kind.value)}
                            className="sr-only"
                        />
                        <span
                            aria-hidden="true"
                            className="grid size-9 shrink-0 place-items-center rounded-[3px] border border-physics/40 text-physics transition-colors group-has-checked:bg-physics group-has-checked:text-on-physics"
                        >
                            <HugeiconsIcon icon={kind.icon} size={17} />
                        </span>
                        <span className="grid min-w-0 gap-1 pr-6">
                            <span className="font-semibold text-foreground">{kind.title}</span>
                            <span className="text-sm text-pretty text-muted">{kind.description}</span>
                        </span>
                        <HugeiconsIcon
                            icon={CheckmarkCircle02Icon}
                            size={18}
                            aria-hidden="true"
                            className="absolute top-3 right-3 text-physics opacity-0 transition-opacity group-has-checked:opacity-100"
                        />
                    </label>
                ))}
            </div>
            {value === null && (
                <p className="text-sm text-faint">
                    Pflichtangabe: entscheidet, wer die Mail bekommt und ob sie einen Abmeldelink trägt.
                </p>
            )}
        </fieldset>
    );
}

function byStatusThenName(a: MailUserOption, b: MailUserOption) {
    const rankA = STATUS_RANK[a.status] ?? STATUS_ORDER.length;
    const rankB = STATUS_RANK[b.status] ?? STATUS_ORDER.length;
    if (rankA !== rankB) return rankA - rankB;
    return (a.name || a.email).localeCompare(b.name || b.email, "de");
}

export function MailForm({ users, announcement, onSuccess }: MailFormProps) {
    const [target, setTarget] = useState("ALL");
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
    const [showRecipients, setShowRecipients] = useState(false);
    const [kind, setKind] = useState<MailKind | null>(null);
    const isNewsletter = kind === "yes";

    const editor = useEmailEditor({ minHeight: 250, content: announcement?.html ?? "" });

    const userById = useMemo(() => new Map(users.map((u) => [u.id, u])), [users]);

    const selectedUsers = useMemo(() => {
        return Array.from(selectedIds)
            .map((id) => userById.get(id))
            .filter((u): u is MailUserOption => u != null)
            .sort(byStatusThenName);
    }, [selectedIds, userById]);

    // Dieselbe Auswahl trifft der Server noch einmal selbst — die Liste hier
    // zeigt nur vorab, wer die Mail bekommt.
    const { recipients, optedOut } = useMemo(() => {
        let list: MailUserOption[];
        if (target === "ALL") {
            list = users;
        } else if (target === "SELECTED") {
            list = selectedUsers;
        } else {
            list = users.filter((u) => u.status === target);
        }
        const kept = isNewsletter ? list.filter((u) => u.newsletter) : list;
        return { recipients: [...kept].sort(byStatusThenName), optedOut: list.length - kept.length };
    }, [target, users, selectedUsers, isNewsletter]);
    const optedOutNote =
        optedOut > 0
            ? `${optedOut} ${optedOut === 1 ? "Person hat" : "Personen haben"} den Newsletter abbestellt und ${optedOut === 1 ? "wird" : "werden"} ausgelassen.`
            : "";

    const form = useActionForm(sendEmailAction, {
        featureLabel: "Mail-Versand",
        onSuccess: (report) => report && onSuccess?.(report),
    });

    const searchResults = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (q.length < MIN_SEARCH_LEN) return [];
        const list = users.filter(
            (u) =>
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q) ||
                formatStatus(u.status).toLowerCase().includes(q),
        );
        return list.slice(0, MAX_SEARCH_RESULTS).sort(byStatusThenName);
    }, [users, search]);

    function removeFromSelection(id: string) {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    }

    function toggle(id: string) {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    function addAllSearchResults() {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            for (const u of searchResults) next.add(u.id);
            return next;
        });
    }

    function clearSelection() {
        setSelectedIds(new Set());
    }

    // `onSubmit` statt `action`: in einer Form-Action hält React das
    // Pending-Flag zurück, bis der Versand durch ist — Knopf und Sperre kämen
    // erst, wenn es nichts mehr zu sperren gibt.
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.set("message", editor?.getHTML() || "");
        // Bricht nur die Verbindung ab (Proxy-Timeout, WLAN weg), schickt der
        // Server womöglich weiter — also nicht zum erneuten Senden auffordern.
        form.submit(formData).catch(() =>
            form.setError(
                "Die Verbindung zum Server ist abgebrochen. Der Versand läuft womöglich noch — bitte erst im Versandprotokoll nachsehen, bevor du erneut sendest.",
            ),
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="target" value={target} />
            <SendingOverlay open={form.pending} count={recipients.length} />

            <div className="grid gap-5">
                {form.feedback}

                <MailKindChoice value={kind} onChange={setKind} />

                {/* Empfängergruppe */}
                <Field
                    label="Empfänger"
                    htmlFor="mail-target"
                    hint={
                        target !== "SELECTED"
                            ? `${recipients.length} Empfänger in dieser Gruppe.${optedOutNote ? ` ${optedOutNote}` : ""}`
                            : undefined
                    }
                >
                    <Select
                        id="mail-target"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                    >
                        {TARGET_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </Select>
                </Field>

                {target === "SELECTED" && (
                    <div className="grid gap-4 rounded-[3px] border border-line bg-raised/40 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-semibold">Empfänger auswählen</p>
                            <Badge>{selectedIds.size} ausgewählt</Badge>
                        </div>

                        <div className="grid gap-2">
                            <p className="text-xs font-medium text-faint">Ausgewählt</p>
                            {optedOutNote && <p className="text-sm text-warning">{optedOutNote}</p>}
                            {selectedUsers.length === 0 ? (
                                <p className="text-sm text-muted">
                                    Noch niemand ausgewählt. Suche unten und setze Häkchen bei den
                                    gewünschten Personen.
                                </p>
                            ) : (
                                <div className="grid gap-2">
                                    {selectedUsers.map((u) => (
                                        <div
                                            key={u.id}
                                            className="flex items-center justify-between gap-3 rounded-[3px] bg-surface p-2"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium">
                                                    {u.name || "—"}
                                                </p>
                                                <p className="truncate text-xs text-muted">
                                                    {u.email}
                                                </p>
                                            </div>
                                            {isNewsletter && !u.newsletter && (
                                                <Badge tone="warning">Kein Newsletter</Badge>
                                            )}
                                            <Badge tone={getStatusTone(u.status)}>
                                                {formatStatus(u.status)}
                                            </Badge>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                color="danger"
                                                type="button"
                                                onClick={() => removeFromSelection(u.id)}
                                            >
                                                Entfernen
                                            </Button>
                                        </div>
                                    ))}
                                    <div>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            color="neutral"
                                            type="button"
                                            onClick={clearSelection}
                                        >
                                            Alle entfernen
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Separator />

                        <div className="grid gap-2">
                            <label
                                htmlFor="mail-search"
                                className="text-xs font-medium text-faint"
                            >
                                Suche (min. {MIN_SEARCH_LEN} Zeichen)
                            </label>
                            <Input
                                id="mail-search"
                                placeholder="Name, E-Mail oder Mitgliedsstatus…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                autoComplete="off"
                            />

                            {search.trim().length > 0 &&
                                search.trim().length < MIN_SEARCH_LEN && (
                                    <p className="text-xs text-faint">
                                        Bitte noch {MIN_SEARCH_LEN - search.trim().length} Zeichen
                                        eingeben, damit wir Treffer anzeigen.
                                    </p>
                                )}

                            {search.trim().length >= MIN_SEARCH_LEN && (
                                <div className="flex flex-wrap items-center gap-3">
                                    <p className="text-xs text-faint">
                                        {searchResults.length === MAX_SEARCH_RESULTS
                                            ? `Erste ${MAX_SEARCH_RESULTS} Treffer (Suche ggf. verfeinern)`
                                            : `${searchResults.length} Treffer`}
                                    </p>
                                    {searchResults.length > 0 && (
                                        <Button
                                            size="sm"
                                            variant="soft"
                                            type="button"
                                            onClick={addAllSearchResults}
                                        >
                                            Alle Treffer übernehmen
                                        </Button>
                                    )}
                                </div>
                            )}

                            {search.trim().length >= MIN_SEARCH_LEN && (
                                <div className="max-h-70 overflow-x-hidden overflow-y-auto">
                                    <div className="grid gap-1">
                                        {searchResults.length === 0 ? (
                                            <p className="text-sm text-muted">
                                                Keine Treffer. Passe die Suche an.
                                            </p>
                                        ) : (
                                            searchResults.map((u) => {
                                                const isSelected = selectedIds.has(u.id);
                                                return (
                                                    <label
                                                        key={u.id}
                                                        className={`flex cursor-pointer items-center gap-3 rounded-[3px] p-2 transition-colors ${
                                                            isSelected
                                                                ? "bg-physics/12"
                                                                : "hover:bg-surface"
                                                        }`}
                                                    >
                                                        {/* Nur die Checkbox schaltet die Auswahl (natives input — vermeidet Update-Loops) */}
                                                        <Checkbox
                                                            className="size-5"
                                                            checked={isSelected}
                                                            onChange={() => toggle(u.id)}
                                                            aria-label={`${u.name || u.email} auswählen`}
                                                        />
                                                        <span className="min-w-0 flex-1">
                                                            <span className="block truncate text-sm font-medium">
                                                                {u.name || "—"}
                                                            </span>
                                                            <span className="block truncate text-xs text-muted">
                                                                {u.email}
                                                            </span>
                                                        </span>
                                                        {isNewsletter && !u.newsletter && (
                                                            <Badge tone="warning">Kein Newsletter</Badge>
                                                        )}
                                                        <Badge tone={getStatusTone(u.status)}>
                                                            {formatStatus(u.status)}
                                                        </Badge>
                                                    </label>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {Array.from(selectedIds).map((id) => (
                    <input key={id} type="hidden" name="selectedUserIds" value={id} />
                ))}

                {/* Betreff */}
                <Field label="Betreff" htmlFor="mail-subject">
                    <Input
                        id="mail-subject"
                        name="subject"
                        required
                        defaultValue={announcement?.subject ?? ""}
                        placeholder="Wichtige Info zum Sommerfest…"
                    />
                </Field>

                {/* Nachricht */}
                <EmailBodyField editor={editor} />

                {/* Terminanhang: was der Versand unter den Text setzt. */}
                {announcement && (
                    <>
                        <input type="hidden" name="eventId" value={announcement.id} />
                        <div className="grid gap-2 rounded-[3px] border border-dashed border-line-strong bg-raised/40 p-4">
                            <p className="flex items-center gap-2 text-sm font-semibold">
                                <HugeiconsIcon icon={Calendar01Icon} size={16} aria-hidden="true" className="text-market" />
                                Wird unter die Nachricht gesetzt
                            </p>
                            <p className="text-sm text-muted">
                                <span className="font-semibold text-foreground">
                                    {announcement.title}
                                </span>{" "}
                                · {announcement.when}
                            </p>
                            <p className="text-xs text-faint">
                                Eckdaten, ein Knopf zur Terminseite und der Hinweis auf das
                                Kontaktformular. Der Block entsteht beim Versand aus dem
                                gespeicherten Termin und lässt sich hier nicht verändern.
                            </p>
                            <label htmlFor="mail-attach-ics" className="flex cursor-pointer items-center gap-2 pt-1">
                                <Checkbox
                                    className="size-5"
                                    id="mail-attach-ics"
                                    name="attachIcs"
                                    value="on"
                                    defaultChecked
                                />
                                <span className="text-sm">Kalenderdatei (.ics) anhängen</span>
                            </label>
                        </div>
                    </>
                )}

                <Separator />

                {/* Aktionen */}
                <div className="grid gap-4">
                    <label
                        htmlFor="mail-bcc-self"
                        className="flex cursor-pointer items-center gap-2"
                    >
                        <Checkbox
                            className="size-5"
                            id="mail-bcc-self"
                            name="bccToSelf"
                            value="on"
                        />
                        <span className="text-sm">Kopie an mich senden (BCC)</span>
                    </label>

                    <div>
                        <Button
                            size="sm"
                            variant="ghost"
                            color="neutral"
                            type="button"
                            onClick={() => setShowRecipients(true)}
                        >
                            <HugeiconsIcon icon={ListIcon} size={16} aria-hidden="true" /> Empfängerliste anzeigen (
                            {recipients.length})
                        </Button>
                    </div>

                    <Dialog
                        open={showRecipients}
                        onClose={() => setShowRecipients(false)}
                        title={`Empfängerliste (${recipients.length})`}
                        description="Sortiert nach Mitgliedsstatus. Die E-Mail wird an folgende Empfänger gesendet:"
                    >
                        <div className="max-h-80 divide-y divide-line overflow-y-auto">
                            {recipients.map((u) => (
                                <div
                                    key={u.id}
                                    className="flex items-center justify-between gap-3 py-2"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">
                                            {u.name || "—"}
                                        </p>
                                        <p className="truncate text-xs text-muted">{u.email}</p>
                                    </div>
                                    <Badge tone={getStatusTone(u.status)}>
                                        {formatStatus(u.status)}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                        <DialogFooter>
                            <Button
                                size="sm"
                                variant="soft"
                                color="neutral"
                                onClick={() => setShowRecipients(false)}
                            >
                                Schließen
                            </Button>
                        </DialogFooter>
                    </Dialog>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button size="lg" type="submit" loading={form.pending}>
                            <HugeiconsIcon icon={SentIcon} size={16} aria-hidden="true" />{" "}
                            {form.pending
                                ? "Wird gesendet…"
                                : `${isNewsletter ? "Newsletter an" : "An"} ${recipients.length} ${recipients.length === 1 ? "Person" : "Personen"} senden`}
                        </Button>
                        <ButtonLink href="/dashboard" size="lg" variant="soft" color="neutral">
                            <HugeiconsIcon icon={Cancel01Icon} size={16} aria-hidden="true" /> Abbrechen
                        </ButtonLink>
                    </div>
                </div>
            </div>
        </form>
    );
}

/**
 * Sperrt die ganze Seite, solange der Versand läuft: `showModal()` macht alles
 * dahinter inert, ein zweiter Klick auf „Senden“ ist damit ausgeschlossen.
 */
function SendingOverlay({ open, count }: { open: boolean; count: number }) {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (open && !el.open) el.showModal();
        else if (!open && el.open) el.close();
        if (!open) return;
        // Neu laden leert das Formular und lädt zum zweiten Absenden ein.
        const warn = (event: BeforeUnloadEvent) => event.preventDefault();
        window.addEventListener("beforeunload", warn);
        return () => window.removeEventListener("beforeunload", warn);
    }, [open]);

    return (
        <dialog
            ref={ref}
            aria-label="E-Mails werden versendet"
            // Esc schließt nicht; schließt der Browser trotzdem, geht sie wieder auf.
            onCancel={(event) => event.preventDefault()}
            onClose={() => open && ref.current?.showModal()}
            className="dialog-panel m-auto w-[calc(100vw-2rem)] max-w-sm rounded-[4px] border border-line bg-surface p-6 text-foreground shadow-2xl backdrop:bg-black/45"
        >
            <div role="status" className="grid justify-items-center gap-3 text-center">
                <Spinner className="size-10 text-physics" />
                <p className="text-lg font-bold tracking-tight">E-Mails werden versendet …</p>
                <p className="text-sm text-muted">
                    An {count} {count === 1 ? "Person" : "Personen"}, eine nach der anderen. Das
                    kann einige Minuten dauern — bitte die Seite offen lassen.
                </p>
            </div>
        </dialog>
    );
}
