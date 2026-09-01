"use client";

import { useState, useTransition } from "react";
import { Badge, Box, Button, Card, Flex, Separator, Text } from "@radix-ui/themes";
import { markContactRequestHandled, removeContactRequest } from "./actions";
import { SPAM_SCORE_MAIL_THRESHOLD } from "@/lib/contact";

type ContactRequestItem = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    spamScore: number;
    mailedAt: Date | null;
    handledAt: Date | null;
    createdAt: Date;
};

const dateFormat = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
});

export function ContactRequestList({ requests }: { requests: ContactRequestItem[] }) {
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    function run(action: (fd: FormData) => Promise<{ ok: boolean; message?: string }>, fd: FormData) {
        setError("");
        startTransition(async () => {
            const result = await action(fd);
            if (!result.ok) {
                setError(result.message ?? "Aktion fehlgeschlagen.");
            }
        });
    }

    return (
        <Flex direction="column" gap="3">
            {error && (
                <Text size="2" color="red">
                    {error}
                </Text>
            )}

            {requests.map((request) => {
                const suspicious = request.spamScore >= SPAM_SCORE_MAIL_THRESHOLD;
                return (
                    <Card key={request.id} size="3">
                        <Flex direction="column" gap="3">
                            <Flex
                                justify="between"
                                align={{ initial: "start", sm: "center" }}
                                direction={{ initial: "column", sm: "row" }}
                                gap="2"
                            >
                                <Flex direction="column" gap="1" style={{ minWidth: 0 }}>
                                    <Flex align="center" gap="2" wrap="wrap">
                                        <Text weight="medium">{request.subject}</Text>
                                        {request.handledAt && (
                                            <Badge color="green" variant="soft">Erledigt</Badge>
                                        )}
                                        {suspicious && (
                                            <Badge color="orange" variant="soft">
                                                Spam-Verdacht ({request.spamScore})
                                            </Badge>
                                        )}
                                        {!request.mailedAt && !suspicious && (
                                            <Badge color="gray" variant="soft">Nicht gemailt</Badge>
                                        )}
                                    </Flex>
                                    <Text size="2" color="gray">
                                        {request.name} &lt;{request.email}&gt; ·{" "}
                                        {dateFormat.format(new Date(request.createdAt))}
                                    </Text>
                                </Flex>

                                <Flex gap="2" wrap="wrap">
                                    <Button size="2" variant="soft" asChild>
                                        <a
                                            href={`mailto:${encodeURIComponent(request.email)}?subject=${encodeURIComponent(
                                                `Re: ${request.subject}`,
                                            )}`}
                                        >
                                            Antworten
                                        </a>
                                    </Button>
                                    <Button
                                        size="2"
                                        variant="soft"
                                        color="gray"
                                        disabled={isPending}
                                        onClick={() => {
                                            const fd = new FormData();
                                            fd.set("id", request.id);
                                            fd.set("handled", String(!request.handledAt));
                                            run(markContactRequestHandled, fd);
                                        }}
                                    >
                                        {request.handledAt ? "Wieder öffnen" : "Erledigt"}
                                    </Button>
                                    <Button
                                        size="2"
                                        variant="soft"
                                        color="red"
                                        disabled={isPending}
                                        onClick={() => {
                                            if (!confirm("Diese Anfrage endgültig löschen?")) return;
                                            const fd = new FormData();
                                            fd.set("id", request.id);
                                            run(removeContactRequest, fd);
                                        }}
                                    >
                                        Löschen
                                    </Button>
                                </Flex>
                            </Flex>

                            <Separator size="4" />

                            <Box>
                                {/* Visitor-supplied text: rendered as plain text, never as markup. */}
                                <Text size="2" style={{ whiteSpace: "pre-wrap" }}>
                                    {request.message}
                                </Text>
                            </Box>
                        </Flex>
                    </Card>
                );
            })}
        </Flex>
    );
}
