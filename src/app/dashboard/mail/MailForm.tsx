"use client";

import { useMemo, useState, useRef } from "react";
import {
    Flex,
    Text,
    TextField,
    Button,
    Badge,
    Box,
} from "@radix-ui/themes";
import { PaperPlaneIcon, MinusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { sendEmailAction } from "./actions";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import { EmailEditorToolbar } from "@/components/EmailEditorToolbar";

export type MailUserOption = {
    id: string;
    name: string;
    email: string;
    role: string;
};

type MailFormProps = {
    users: MailUserOption[];
    onSuccess?: (count: number) => void;
};

const MIN_SEARCH_LEN = 2;
const MAX_SEARCH_RESULTS = 50;

export function MailForm({ users, onSuccess }: MailFormProps) {
    const [target, setTarget] = useState("ALL");
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    
    const editor = useEditor({
        extensions: [
            StarterKit,
            TiptapLink.configure({
            openOnClick: false,
            HTMLAttributes: {
                class: 'text-blue-600 underline cursor-pointer',
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
            .filter((u): u is MailUserOption => u != null);
    }, [selectedIds, userById]);

    const searchResults = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (q.length < MIN_SEARCH_LEN) return [];
        const list = users.filter(
            (u) =>
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q) ||
                u.role.toLowerCase().includes(q),
        );
        return list.slice(0, MAX_SEARCH_RESULTS);
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
                setError(result.message);
            } else {
                const recipientCount = target === "SELECTED" ? selectedIds.size : users.length;
                onSuccess?.(recipientCount);
            }
        } finally {
            setPending(false);
        }
    }

    return (
        <form action={submitAction}>
            <Flex direction="column" gap="4">
                {error && (
                    <Text size="2" color="red" role="alert">
                        {error}
                    </Text>
                )}
                <Box>
                    <Text size="2" weight="bold" mb="1" as="label" htmlFor="mail-target">
                        Empfänger
                    </Text>
                    <select
                        id="mail-target"
                        name="target"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        style={{
                            width: "100%",
                            maxWidth: "100%",
                            padding: "8px 10px",
                            borderRadius: "var(--radius-2)",
                            border: "1px solid var(--gray-6)",
                            backgroundColor: "var(--color-panel)",
                            color: "var(--gray-12)",
                            fontSize: "14px",
                        }}
                    >
                        <option value="ALL">Alle Benutzer (Admins & Members)</option>
                        <option value="MEMBER">Nur normale Mitglieder</option>
                        <option value="ADMIN">Nur Administratoren</option>
                        <option value="SELECTED">Ausgewählte Nutzer</option>
                    </select>
                </Box>

                {target === "SELECTED" && (
                    <Box>
                        <Flex justify="between" align="center" mb="2" gap="2" wrap="wrap">
                            <Text size="2" weight="bold">
                                Empfänger auswählen
                            </Text>
                            <Badge size="1" variant="soft">
                                {selectedIds.size} ausgewählt
                            </Badge>
                        </Flex>

                        {/* Nur ausgewählte Nutzer — kompakt, skaliert mit vielen Accounts */}
                        <Text size="2" weight="medium" mb="1" as="div">
                            Ausgewählt
                        </Text>
                        {selectedUsers.length === 0 ? (
                            <Text size="2" color="gray" mb="3">
                                Noch niemand ausgewählt. Suche unten und setze Häkchen bei den gewünschten
                                Personen.
                            </Text>
                        ) : (
                            <Flex direction="column" gap="1" mb="3">
                                {selectedUsers.map((u) => (
                                    <Flex
                                        key={u.id}
                                        align="center"
                                        justify="between"
                                        gap="2"
                                        py="1"
                                        px="2"
                                        style={{
                                            borderRadius: "var(--radius-2)",
                                            backgroundColor: "var(--gray-3)",
                                        }}
                                    >
                                        <Flex direction="column" gap="0" style={{ flex: 1, minWidth: 0 }}>
                                            <Text size="2" weight="medium" truncate>
                                                {u.name || "—"}
                                            </Text>
                                            <Text size="1" color="gray" truncate>
                                                {u.email}
                                            </Text>
                                        </Flex>
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
                                <Button size="1" variant="outline" type="button" onClick={clearSelection}>
                                    Alle entfernen
                                </Button>
                            </Flex>
                        )}

                        <Text size="2" weight="medium" mb="1" as="div">
                            Suche (min. {MIN_SEARCH_LEN} Zeichen)
                        </Text>
                        <TextField.Root
                            placeholder="Name, E-Mail oder Rolle…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            mb="2"
                            autoComplete="off"
                        />

                        {search.trim().length > 0 && search.trim().length < MIN_SEARCH_LEN && (
                            <Text size="2" color="gray" mb="2">
                                Bitte noch {MIN_SEARCH_LEN - search.trim().length} Zeichen eingeben, damit wir
                                Treffer anzeigen.
                            </Text>
                        )}

                        {search.trim().length >= MIN_SEARCH_LEN && (
                            <Flex gap="2" mb="2" wrap="wrap" align="center">
                                <Text size="1" color="gray">
                                    {searchResults.length === MAX_SEARCH_RESULTS
                                        ? `Erste ${MAX_SEARCH_RESULTS} Treffer (Suche ggf. verfeinern)`
                                        : `${searchResults.length} Treffer`}
                                </Text>
                                {searchResults.length > 0 && (
                                    <Button size="1" variant="soft" type="button" onClick={addAllSearchResults}>
                                        Alle Treffer übernehmen
                                    </Button>
                                )}
                            </Flex>
                        )}

                        {search.trim().length >= MIN_SEARCH_LEN && (
                            <div
                                style={{
                                    maxHeight: 280,
                                    overflowY: "auto",
                                    overflowX: "hidden",
                                    paddingRight: 8,
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
                                            const checkboxId = `mail-pick-${u.id}`;
                                            return (
                                                <Flex
                                                    key={u.id}
                                                    align="center"
                                                    gap="3"
                                                    py="1"
                                                    px="2"
                                                    style={{
                                                        borderRadius: "var(--radius-2)",
                                                    }}
                                                >
                                                    {/* Nur die Checkbox schaltet die Auswahl (kein Radix-Checkbox — vermeidet Update-Loops) */}
                                                    <input
                                                        id={checkboxId}
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggle(u.id)}
                                                        style={{
                                                            width: 18,
                                                            height: 18,
                                                            flexShrink: 0,
                                                            cursor: "pointer",
                                                            accentColor: "var(--accent-9)",
                                                        }}
                                                        aria-label={`${u.name || u.email} auswählen`}
                                                    />
                                                    <Flex direction="column" gap="0" style={{ flex: 1, minWidth: 0 }}>
                                                        <Text size="2" weight="medium" truncate>
                                                            {u.name || "—"}
                                                        </Text>
                                                        <Text size="1" color="gray" truncate>
                                                            {u.email}
                                                        </Text>
                                                    </Flex>
                                                    <Badge
                                                        size="1"
                                                        variant="outline"
                                                        color={u.role === "ADMIN" ? "red" : "blue"}
                                                    >
                                                        {u.role}
                                                    </Badge>
                                                </Flex>
                                            );
                                        })
                                    )}
                                </Flex>
                            </div>
                        )}

                        {Array.from(selectedIds).map((id) => (
                            <input key={id} type="hidden" name="selectedUserIds" value={id} />
                        ))}
                    </Box>
                )}

                <label>
                    <Text size="2" weight="bold">
                        Betreff
                    </Text>
                    <TextField.Root name="subject" required placeholder="Wichtige Info zum Sommerfest..." mt="1" />
                </label>

                <label>
                    <Text size="2" weight="bold">
                        Nachricht
                    </Text>
                    <Text size="1" color="gray" mb="2">
                        Verfügbare Platzhalter: $Vorname, $Nachname, $Name
                    </Text>
                    <Box mt="1">
                        <Box
                            style={{
                                border: "1px solid var(--gray-6)",
                                borderRadius: "var(--radius-2)",
                                minHeight: "250px",
                            }}
                        >
                            <EmailEditorToolbar editor={editor} />
                            <EditorContent editor={editor} />
                        </Box>
                    </Box>
                </label>

                <Flex justify="between" align="center" gap="3" mt="4" wrap="wrap">
                    <Flex gap="3" wrap="wrap" align="center">
                        <Flex direction="column" gap="2">
                            <Button type="submit" color="blue" disabled={pending}>
                                <PaperPlaneIcon /> {pending ? "Wird gesendet…" : "E-Mail senden"}
                            </Button>
                            <Text size="1" color="gray">
                                E-Mail an {target === "SELECTED" ? selectedIds.size : users.length} {target === "SELECTED" ? (selectedIds.size === 1 ? "Person" : "Personen") : (users.length === 1 ? "Person" : "Personen")} senden
                            </Text>
                        </Flex>
                        <Link href="/dashboard">
                            <Button variant="soft" color="gray" type="button">
                                <MinusIcon /> Abbrechen
                            </Button>
                        </Link>
                    </Flex>
                    <Flex
                        align="center"
                        gap="2"
                        style={{ marginLeft: "auto" }}
                    >
                        <input
                            type="checkbox"
                            id="mail-bcc-self"
                            name="bccToSelf"
                            value="on"
                            style={{
                                width: 18,
                                height: 18,
                                cursor: "pointer",
                                accentColor: "var(--accent-9)",
                            }}
                        />
                        <Text size="2" as="label" htmlFor="mail-bcc-self" style={{ cursor: "pointer" }}>
                            BCC an mich
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </form>
    );
}
