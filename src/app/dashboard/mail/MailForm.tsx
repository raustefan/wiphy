"use client";

import { useMemo, useState } from "react";
import { Send, X, List } from "lucide-react";
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
} from "@/components/ui";
import { sendEmailAction } from "./actions";
import { EmailBodyField, useEmailEditor } from "@/components/EmailBodyField";
import { useActionForm } from "@/lib/client/useActionForm";
import { formatStatus, getStatusTone } from "@/lib/statusLabels";

export type MailUserOption = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
};

type MailFormProps = {
    users: MailUserOption[];
    onSuccess?: (count: number) => void;
};

const MIN_SEARCH_LEN = 2;
const MAX_SEARCH_RESULTS = 50;

/** Sortier- und Anzeigereihenfolge der Empfängergruppen nach Mitgliedsstatus. */
const STATUS_ORDER = ["EHRENMITGLIED", "ORDENTLICHES_MITGLIED", "KEIN_MITGLIED"] as const;

const STATUS_RANK: Record<string, number> = Object.fromEntries(
    STATUS_ORDER.map((status, index) => [status, index]),
);

const TARGET_OPTIONS: { value: string; label: string }[] = [
    { value: "ALL", label: "Alle Benutzer" },
    ...STATUS_ORDER.map((status) => ({ value: status, label: formatStatus(status) })),
    { value: "SELECTED", label: "Ausgewählte Nutzer" },
];

function byStatusThenName(a: MailUserOption, b: MailUserOption) {
    const rankA = STATUS_RANK[a.status] ?? STATUS_ORDER.length;
    const rankB = STATUS_RANK[b.status] ?? STATUS_ORDER.length;
    if (rankA !== rankB) return rankA - rankB;
    return (a.name || a.email).localeCompare(b.name || b.email, "de");
}

export function MailForm({ users, onSuccess }: MailFormProps) {
    const [target, setTarget] = useState("ALL");
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
    const [showRecipients, setShowRecipients] = useState(false);

    const editor = useEmailEditor({ minHeight: 250 });

    const userById = useMemo(() => new Map(users.map((u) => [u.id, u])), [users]);

    const selectedUsers = useMemo(() => {
        return Array.from(selectedIds)
            .map((id) => userById.get(id))
            .filter((u): u is MailUserOption => u != null)
            .sort(byStatusThenName);
    }, [selectedIds, userById]);

    const recipients = useMemo(() => {
        let list: MailUserOption[];
        if (target === "ALL") {
            list = users;
        } else if (target === "SELECTED") {
            list = selectedUsers;
        } else {
            list = users.filter((u) => u.status === target);
        }
        return [...list].sort(byStatusThenName);
    }, [target, users, selectedUsers]);

    const form = useActionForm(sendEmailAction, {
        featureLabel: "Mail-Versand",
        onSuccess: () => onSuccess?.(recipients.length),
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

    function submitAction(formData: FormData) {
        formData.set("message", editor?.getHTML() || "");
        return form.submit(formData);
    }

    return (
        <form action={submitAction}>
            <input type="hidden" name="target" value={target} />

            <div className="grid gap-5">
                {form.feedback}

                {/* Empfängergruppe */}
                <Field
                    label="Empfänger"
                    htmlFor="mail-target"
                    hint={
                        target !== "SELECTED"
                            ? `${recipients.length} ${
                                  recipients.length === 1 ? "Empfänger" : "Empfänger"
                              } in dieser Gruppe.`
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
                    <div className="grid gap-4 rounded-2xl border border-line bg-raised/40 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-semibold">Empfänger auswählen</p>
                            <Badge>{selectedIds.size} ausgewählt</Badge>
                        </div>

                        <div className="grid gap-2">
                            <p className="text-xs font-medium text-faint">Ausgewählt</p>
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
                                            className="flex items-center justify-between gap-3 rounded-xl bg-surface p-2"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium">
                                                    {u.name || "—"}
                                                </p>
                                                <p className="truncate text-xs text-muted">
                                                    {u.email}
                                                </p>
                                            </div>
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
                                                        className={`flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-colors ${
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
                        placeholder="Wichtige Info zum Sommerfest…"
                    />
                </Field>

                {/* Nachricht */}
                <EmailBodyField editor={editor} />

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
                            <List size={16} aria-hidden="true" /> Empfängerliste anzeigen (
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
                            <Send size={16} aria-hidden="true" />{" "}
                            {form.pending
                                ? "Wird gesendet…"
                                : `An ${recipients.length} ${recipients.length === 1 ? "Person" : "Personen"} senden`}
                        </Button>
                        <ButtonLink href="/dashboard" size="lg" variant="soft" color="neutral">
                            <X size={16} aria-hidden="true" /> Abbrechen
                        </ButtonLink>
                    </div>
                </div>
            </div>
        </form>
    );
}
