"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
    Button,
    Callout,
    Card,
    Container,
    Flex,
    Heading,
    Text,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import { CheckCircle2, Info } from "lucide-react";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";
import { MAX_MESSAGE_LENGTH } from "@/lib/contact";
import { submitContactRequest } from "./actions";

export function ContactForm({
    challengeJson,
    enabled,
}: {
    challengeJson: string;
    enabled: boolean;
}) {
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [pending, setPending] = useState(false);
    const [featureDisabled, setFeatureDisabled] = useState(false);
    const [messageLength, setMessageLength] = useState(0);
    // Set on mount rather than on the server, so it measures how long the form
    // was actually on screen instead of when the page was rendered.
    const renderedAt = useRef<number>(0);

    useEffect(() => {
        renderedAt.current = Date.now();
        import("altcha");
    }, []);

    async function handleAction(formData: FormData) {
        setError("");
        setPending(true);
        formData.set("renderedAt", String(renderedAt.current));

        const res = await submitContactRequest(formData);
        setPending(false);

        if (res.ok) {
            setSubmitted(true);
            return;
        }
        if (res.code === "FORBIDDEN") {
            setFeatureDisabled(true);
            return;
        }
        setError(res.message);
    }

    if (submitted) {
        return (
            <Container size="1" px="0" py={{ initial: "4", sm: "8" }}>
                <Card size={{ initial: "3", sm: "4" }} className="panel">
                    <Flex direction="column" gap="4" align="center" py="4">
                        <CheckCircle2 size={40} color="var(--green-9)" />
                        <Heading as="h1" size="6" align="center" className="display-title">
                            Nachricht verschickt
                        </Heading>
                        <Text size="2" color="gray" align="center">
                            Vielen Dank für deine Anfrage. Der Vorstand meldet sich so bald wie
                            möglich bei dir — in der Regel innerhalb weniger Tage.
                        </Text>
                        <Button variant="soft" asChild>
                            <Link href="/">Zurück zur Startseite</Link>
                        </Button>
                    </Flex>
                </Card>
            </Container>
        );
    }

    return (
        <Container size="1" px="0" py={{ initial: "4", sm: "8" }}>
            <FeatureDisabledDialog
                open={featureDisabled}
                featureLabel="Kontaktformular"
                onOpenChange={setFeatureDisabled}
            />
            <Card size={{ initial: "3", sm: "4" }} className="panel">
                <form action={handleAction}>
                    <Flex direction="column" gap="5">
                        <Flex direction="column" gap="2" align="center">
                            <Heading
                                as="h1"
                                size={{ initial: "6", sm: "7" }}
                                align="center"
                                className="display-title"
                            >
                                Kontakt
                            </Heading>
                            <Text size="2" color="gray" align="center">
                                Fragen zur Mitgliedschaft, zum Verein oder zu Veranstaltungen?
                                Schreib uns — deine Nachricht geht direkt an den Vorstand.
                            </Text>
                        </Flex>

                        {!enabled && (
                            <Callout.Root color="amber">
                                <Callout.Icon>
                                    <Info size={16} />
                                </Callout.Icon>
                                <Callout.Text>
                                    Das Kontaktformular ist derzeit deaktiviert. Bitte wende dich
                                    vorübergehend über die Angaben im{" "}
                                    <Link href="/impressum">Impressum</Link> an uns.
                                </Callout.Text>
                            </Callout.Root>
                        )}

                        {error && (
                            <Flex
                                style={{
                                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                                    borderLeft: "4px solid rgb(239, 68, 68)",
                                    padding: "12px 16px",
                                    borderRadius: "4px",
                                }}
                            >
                                <Text color="red" size="2">
                                    {error}
                                </Text>
                            </Flex>
                        )}

                        <Flex direction="column" gap="4">
                            <label>
                                <Text size="2" weight="bold">Name</Text>
                                <TextField.Root
                                    name="name"
                                    required
                                    maxLength={120}
                                    placeholder="Vor- und Nachname"
                                    mt="1"
                                />
                            </label>

                            <label>
                                <Text size="2" weight="bold">E-Mail-Adresse</Text>
                                <TextField.Root
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="mail@beispiel.de"
                                    mt="1"
                                />
                                <Text size="1" color="gray" mt="1">
                                    Wird nur für die Antwort auf deine Anfrage verwendet.
                                </Text>
                            </label>

                            <label>
                                <Text size="2" weight="bold">Betreff</Text>
                                <TextField.Root
                                    name="subject"
                                    required
                                    maxLength={200}
                                    placeholder="Worum geht es?"
                                    mt="1"
                                />
                            </label>

                            <label>
                                <Text size="2" weight="bold">Nachricht</Text>
                                <TextArea
                                    name="message"
                                    required
                                    minLength={20}
                                    maxLength={MAX_MESSAGE_LENGTH}
                                    rows={8}
                                    placeholder="Deine Nachricht an den Vorstand …"
                                    mt="1"
                                    onChange={(e) => setMessageLength(e.currentTarget.value.length)}
                                />
                                <Text size="1" color="gray" mt="1">
                                    {messageLength} / {MAX_MESSAGE_LENGTH} Zeichen
                                </Text>
                            </label>
                        </Flex>

                        {/*
                          Honeypot. Kept in the accessibility tree's blind spot rather
                          than `display: none`, which the more careful bots skip.
                        */}
                        <div aria-hidden="true" className="contact-honeypot">
                            <label htmlFor="contact-website">
                                Website (bitte freilassen)
                                <input
                                    id="contact-website"
                                    type="text"
                                    name="website"
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </label>
                        </div>

                        <label>
                            <Text size="2" weight="bold">Sicherheitsüberprüfung</Text>
                            <altcha-widget
                                challenge={challengeJson}
                                name="altcha"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    marginTop: "4px",
                                    "--altcha-max-width": "100%",
                                    "--altcha-border-radius": "var(--radius-3)",
                                    "--altcha-border-color": "var(--gray-a7)",
                                    "--altcha-color-base": "var(--color-panel)",
                                    "--altcha-color-base-content": "var(--gray-12)",
                                    "--altcha-color-primary": "var(--accent-9)",
                                } as CSSProperties}
                            />
                        </label>

                        <Button type="submit" size="3" disabled={pending || !enabled}>
                            {pending ? "Wird gesendet …" : "Nachricht senden"}
                        </Button>

                        <Text size="1" color="gray" align="center">
                            Mit dem Absenden stimmst du der Verarbeitung deiner Angaben gemäß
                            unserer{" "}
                            <Link
                                href="/datenschutz"
                                style={{ color: "var(--accent-9)", textDecoration: "none" }}
                            >
                                Datenschutzerklärung
                            </Link>{" "}
                            zu.
                        </Text>
                    </Flex>
                </form>
            </Card>
        </Container>
    );
}
