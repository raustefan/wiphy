"use client";

import { useMemo, useState } from "react";
import {
    Flex,
    Text,
    TextField,
    Button,
    Badge,
    Box,
    Card,
    Dialog,
    Select,
    Separator,
} from "@radix-ui/themes";
import { PaperPlaneIcon, MinusIcon, ListBulletIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { sendEmailAction } from "./actions";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import { EmailEditorToolbar } from "@/components/EmailEditorToolbar";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";
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
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [featureDisabled, setFeatureDisabled] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            TiptapLink.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-600 underline cursor-pointer",
                },
            }),
        ],
        content: "",
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none focus:outline-none min-h-[250px] p-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1",
            },
        },
    });

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

    async function submitAction(formData: FormData) {
        setError("");
        setPending(true);
        try {
            formData.set("message", editor?.getHTML() || "");
            const result = await sendEmailAction(formData);
            if (result && !result.ok) {
                if (result.code === "FORBIDDEN") {
                    setFeatureDisabled(true);
                } else {
                    setError(result.message);
                }
            } else {
                onSuccess?.(recipients.length);
            }
        } finally {
            setPending(false);
        }
    }

    return (
        <form action={submitAction}>
            <FeatureDisabledDialog
                open={featureDisabled}
                featureLabel="Mail-Versand"
                onOpenChange={setFeatureDisabled}
            />
            <input type="hidden" name="target" value={target} />

            <Flex direction="column" gap="5">
                {error && (
                    <Text size="2" color="red" role="alert">
                        {error}
                    </Text>
                )}

                {/* Empfängergruppe */}
                <Flex direction="column" gap="2">
                    <Text size="2" weight="bold" as="label" htmlFor="mail-target">
                        Empfänger
                    </Text>
                    <Select.Root value={target} onValueChange={setTarget} size="3">
                        <Select.Trigger id="mail-target" style={{ width: "100%" }} />
                        <Select.Content position="popper">
                            {TARGET_OPTIONS.map((opt) => (
                                <Select.Item key={opt.value} value={opt.value}>
                                    {opt.label}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                    {target !== "SELECTED" && (
                        <Text size="1" color="gray">
                            {recipients.length}{" "}
                            {recipients.length === 1 ? "Empfänger" : "Empfänger"} in dieser Gruppe.
                        </Text>
                    )}
                </Flex>

                {target === "SELECTED" && (
                    <Card variant="surface">
                        <Flex direction="column" gap="4">
                            <Flex justify="between" align="center" gap="2" wrap="wrap">
                                <Text size="2" weight="bold">
                                    Empfänger auswählen
                                </Text>
                                <Badge size="1" variant="soft">
                                    {selectedIds.size} ausgewählt
                                </Badge>
                            </Flex>

                            <Flex direction="column" gap="2">
                                <Text size="1" weight="medium" color="gray">
                                    Ausgewählt
                                </Text>
                                {selectedUsers.length === 0 ? (
                                    <Text size="2" color="gray">
                                        Noch niemand ausgewählt. Suche unten und setze Häkchen bei
                                        den gewünschten Personen.
                                    </Text>
                                ) : (
                                    <Flex direction="column" gap="2">
                                        {selectedUsers.map((u) => (
                                            <Flex
                                                key={u.id}
                                                align="center"
                                                justify="between"
                                                gap="3"
                                                p="2"
                                                style={{
                                                    borderRadius: "var(--radius-2)",
                                                    backgroundColor: "var(--gray-3)",
                                                }}
                                            >
                                                <Flex
                                                    direction="column"
                                                    style={{ flex: 1, minWidth: 0 }}
                                                >
                                                    <Text size="2" weight="medium" truncate>
                                                        {u.name || "—"}
                                                    </Text>
                                                    <Text size="1" color="gray" truncate>
                                                        {u.email}
                                                    </Text>
                                                </Flex>
                                                <Badge
                                                    size="1"
                                                    variant="soft"
                                                    color={getStatusTone(u.status)}
                                                >
                                                    {formatStatus(u.status)}
                                                </Badge>
                                                <Button
                                                    size="1"
                                                    variant="ghost"
                                                    color="red"
                                                    type="button"
                                                    onClick={() => removeFromSelection(u.id)}
                                                >
                                                    Entfernen
                                                </Button>
                                            </Flex>
                                        ))}
                                        <Box>
                                            <Button
                                                size="2"
                                                variant="outline"
                                                color="gray"
                                                type="button"
                                                onClick={clearSelection}
                                            >
                                                Alle entfernen
                                            </Button>
                                        </Box>
                                    </Flex>
                                )}
                            </Flex>

                            <Separator size="4" />

                            <Flex direction="column" gap="2">
                                <Text size="1" weight="medium" color="gray">
                                    Suche (min. {MIN_SEARCH_LEN} Zeichen)
                                </Text>
                                <TextField.Root
                                    placeholder="Name, E-Mail oder Mitgliedsstatus…"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    autoComplete="off"
                                    size="3"
                                />

                                {search.trim().length > 0 &&
                                    search.trim().length < MIN_SEARCH_LEN && (
                                        <Text size="1" color="gray">
                                            Bitte noch{" "}
                                            {MIN_SEARCH_LEN - search.trim().length} Zeichen
                                            eingeben, damit wir Treffer anzeigen.
                                        </Text>
                                    )}

                                {search.trim().length >= MIN_SEARCH_LEN && (
                                    <Flex gap="3" wrap="wrap" align="center">
                                        <Text size="1" color="gray">
                                            {searchResults.length === MAX_SEARCH_RESULTS
                                                ? `Erste ${MAX_SEARCH_RESULTS} Treffer (Suche ggf. verfeinern)`
                                                : `${searchResults.length} Treffer`}
                                        </Text>
                                        {searchResults.length > 0 && (
                                            <Button
                                                size="1"
                                                variant="soft"
                                                type="button"
                                                onClick={addAllSearchResults}
                                            >
                                                Alle Treffer übernehmen
                                            </Button>
                                        )}
                                    </Flex>
                                )}

                                {search.trim().length >= MIN_SEARCH_LEN && (
                                    <Box
                                        style={{
                                            maxHeight: 280,
                                            overflowY: "auto",
                                            overflowX: "hidden",
                                        }}
                                    >
                                        <Flex direction="column" gap="1">
                                            {searchResults.length === 0 ? (
                                                <Text size="2" color="gray">
                                                    Keine Treffer. Passe die Suche an.
                                                </Text>
                                            ) : (
                                                searchResults.map((u) => {
                                                    const isSelected = selectedIds.has(u.id);
                                                    return (
                                                        <Flex
                                                            key={u.id}
                                                            align="center"
                                                            gap="3"
                                                            p="2"
                                                            onClick={() => toggle(u.id)}
                                                            style={{
                                                                borderRadius: "var(--radius-2)",
                                                                cursor: "pointer",
                                                                backgroundColor: isSelected
                                                                    ? "var(--accent-3)"
                                                                    : undefined,
                                                            }}
                                                        >
                                                            {/* Nur die Checkbox schaltet die Auswahl (kein Radix-Checkbox — vermeidet Update-Loops) */}
                                                            <input
                                                                type="checkbox"
                                                                checked={isSelected}
                                                                onChange={() => toggle(u.id)}
                                                                onClick={(e) =>
                                                                    e.stopPropagation()
                                                                }
                                                                style={{
                                                                    width: 20,
                                                                    height: 20,
                                                                    flexShrink: 0,
                                                                    cursor: "pointer",
                                                                    accentColor: "var(--accent-9)",
                                                                }}
                                                                aria-label={`${u.name || u.email} auswählen`}
                                                            />
                                                            <Flex
                                                                direction="column"
                                                                style={{ flex: 1, minWidth: 0 }}
                                                            >
                                                                <Text
                                                                    size="2"
                                                                    weight="medium"
                                                                    truncate
                                                                >
                                                                    {u.name || "—"}
                                                                </Text>
                                                                <Text size="1" color="gray" truncate>
                                                                    {u.email}
                                                                </Text>
                                                            </Flex>
                                                            <Badge
                                                                size="1"
                                                                variant="outline"
                                                                color={getStatusTone(u.status)}
                                                            >
                                                                {formatStatus(u.status)}
                                                            </Badge>
                                                        </Flex>
                                                    );
                                                })
                                            )}
                                        </Flex>
                                    </Box>
                                )}
                            </Flex>
                        </Flex>
                    </Card>
                )}

                {Array.from(selectedIds).map((id) => (
                    <input key={id} type="hidden" name="selectedUserIds" value={id} />
                ))}

                {/* Betreff */}
                <Flex direction="column" gap="2">
                    <Text size="2" weight="bold" as="label" htmlFor="mail-subject">
                        Betreff
                    </Text>
                    <TextField.Root
                        id="mail-subject"
                        name="subject"
                        required
                        size="3"
                        placeholder="Wichtige Info zum Sommerfest…"
                    />
                </Flex>

                {/* Nachricht */}
                <Flex direction="column" gap="2">
                    <Text size="2" weight="bold" as="label">
                        Nachricht
                    </Text>
                    <Text size="1" color="gray">
                        Verfügbare Platzhalter: $Vorname, $Nachname, $Name
                    </Text>
                    <Box
                        style={{
                            border: "1px solid var(--gray-6)",
                            borderRadius: "var(--radius-3)",
                            overflow: "hidden",
                        }}
                    >
                        <EmailEditorToolbar editor={editor} />
                        <EditorContent editor={editor} />
                    </Box>
                </Flex>

                <Separator size="4" />

                {/* Aktionen */}
                <Flex direction="column" gap="4">
                    <Flex align="center" gap="2" asChild>
                        <label htmlFor="mail-bcc-self" style={{ cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                id="mail-bcc-self"
                                name="bccToSelf"
                                value="on"
                                style={{
                                    width: 20,
                                    height: 20,
                                    cursor: "pointer",
                                    accentColor: "var(--accent-9)",
                                }}
                            />
                            <Text size="2">Kopie an mich senden (BCC)</Text>
                        </label>
                    </Flex>

                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button size="2" variant="ghost" color="gray" type="button">
                                <ListBulletIcon /> Empfängerliste anzeigen ({recipients.length})
                            </Button>
                        </Dialog.Trigger>
                        <Dialog.Content maxWidth="480px">
                            <Dialog.Title>Empfängerliste ({recipients.length})</Dialog.Title>
                            <Dialog.Description size="2" mb="4" color="gray">
                                Sortiert nach Mitgliedsstatus. Die E-Mail wird an folgende
                                Empfänger gesendet:
                            </Dialog.Description>
                            <Box style={{ maxHeight: 320, overflowY: "auto" }}>
                                <Flex direction="column" gap="2">
                                    {recipients.map((u) => (
                                        <Flex
                                            key={u.id}
                                            justify="between"
                                            align="center"
                                            gap="3"
                                            py="2"
                                            style={{
                                                borderBottom: "1px solid var(--gray-4)",
                                            }}
                                        >
                                            <Box style={{ minWidth: 0 }}>
                                                <Text size="2" weight="medium" truncate as="div">
                                                    {u.name || "—"}
                                                </Text>
                                                <Text size="1" color="gray" truncate as="div">
                                                    {u.email}
                                                </Text>
                                            </Box>
                                            <Badge
                                                size="1"
                                                variant="soft"
                                                color={getStatusTone(u.status)}
                                            >
                                                {formatStatus(u.status)}
                                            </Badge>
                                        </Flex>
                                    ))}
                                </Flex>
                            </Box>
                            <Flex justify="end" mt="4">
                                <Dialog.Close>
                                    <Button size="2" variant="soft" color="gray">
                                        Schließen
                                    </Button>
                                </Dialog.Close>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>

                    <Flex
                        gap="3"
                        direction={{ initial: "column", xs: "row" }}
                        align={{ initial: "stretch", xs: "center" }}
                    >
                        <Button size="3" type="submit" color="blue" disabled={pending}>
                            <PaperPlaneIcon />{" "}
                            {pending
                                ? "Wird gesendet…"
                                : `An ${recipients.length} ${recipients.length === 1 ? "Person" : "Personen"} senden`}
                        </Button>
                        <Button size="3" variant="soft" color="gray" asChild>
                            <Link href="/dashboard">
                                <MinusIcon /> Abbrechen
                            </Link>
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </form>
    );
}
