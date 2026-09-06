"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { CheckCircle2, Info } from "lucide-react";
import { MAX_MESSAGE_LENGTH } from "@/lib/contact";
import { useActionForm } from "@/lib/client/useActionForm";
import { submitContactRequest } from "./actions";
import {
    Button,
    ButtonLink,
    Callout,
    Card,
    Container,
    Field,
    Input,
    Prose,
    TextArea,
} from "@/components/ui";

/** Altcha-Widget an die Design-Tokens angleichen. */
const ALTCHA_STYLE = {
    display: "block",
    width: "100%",
    "--altcha-max-width": "100%",
    "--altcha-border-radius": "0.75rem",
    "--altcha-border-color": "var(--line-strong)",
    "--altcha-color-base": "var(--surface)",
    "--altcha-color-base-content": "var(--foreground)",
    "--altcha-color-primary": "var(--physics)",
} as CSSProperties;

export function ContactForm({
    challengeJson,
    enabled,
}: {
    challengeJson: string;
    enabled: boolean;
}) {
    const [submitted, setSubmitted] = useState(false);
    const [messageLength, setMessageLength] = useState(0);
    // Set on mount rather than on the server, so it measures how long the form
    // was actually on screen instead of when the page was rendered.
    const renderedAt = useRef<number>(0);

    useEffect(() => {
        renderedAt.current = Date.now();
        import("altcha");
    }, []);

    const form = useActionForm(submitContactRequest, {
        featureLabel: "Kontaktformular",
        onSuccess: () => setSubmitted(true),
    });

    function handleAction(formData: FormData) {
        formData.set("renderedAt", String(renderedAt.current));
        return form.submit(formData);
    }

    if (submitted) {
        return (
            <Container size="1" className="py-8 sm:py-14">
                <Card className="grid justify-items-center gap-4 p-6 text-center sm:p-8">
                    <CheckCircle2 size={40} className="text-positive" aria-hidden="true" />
                    <h1 className="text-2xl font-bold tracking-tight text-balance">
                        Nachricht verschickt
                    </h1>
                    <Prose>
                        Vielen Dank für deine Anfrage. Der Vorstand meldet sich so bald wie
                        möglich bei dir — in der Regel innerhalb weniger Tage.
                    </Prose>
                    <ButtonLink href="/" variant="soft" color="neutral" className="mt-1">
                        Zurück zur Startseite
                    </ButtonLink>
                </Card>
            </Container>
        );
    }

    return (
        <Container size="1" className="py-8 sm:py-14">
            <Card className="p-6 sm:p-8">
                <div className="grid gap-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                        Kontakt
                    </h1>
                    <Prose>
                        Fragen zur Mitgliedschaft, zum Verein oder zu Veranstaltungen? Schreib
                        uns — deine Nachricht geht direkt an den Vorstand.
                    </Prose>
                </div>

                <form action={handleAction} className="mt-6 grid gap-4">
                    {!enabled && (
                        <Callout tone="warning" icon={<Info size={16} />}>
                            Das Kontaktformular ist derzeit deaktiviert. Bitte wende dich
                            vorübergehend über die Angaben im{" "}
                            <Link
                                href="/impressum"
                                className="font-semibold text-physics underline-offset-4 hover:underline"
                            >
                                Impressum
                            </Link>{" "}
                            an uns.
                        </Callout>
                    )}

                    {form.feedback}

                    <Field label="Name" htmlFor="contact-name">
                        <Input
                            id="contact-name"
                            name="name"
                            autoComplete="name"
                            required
                            maxLength={120}
                            placeholder="Vor- und Nachname"
                        />
                    </Field>

                    <Field
                        label="E-Mail-Adresse"
                        htmlFor="contact-email"
                        hint="Wird nur für die Antwort auf deine Anfrage verwendet."
                    >
                        <Input
                            id="contact-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="mail@beispiel.de"
                        />
                    </Field>

                    <Field label="Betreff" htmlFor="contact-subject">
                        <Input
                            id="contact-subject"
                            name="subject"
                            required
                            maxLength={200}
                            placeholder="Worum geht es?"
                        />
                    </Field>

                    <Field
                        label="Nachricht"
                        htmlFor="contact-message"
                        hint={`${messageLength} / ${MAX_MESSAGE_LENGTH} Zeichen`}
                    >
                        <TextArea
                            id="contact-message"
                            name="message"
                            required
                            minLength={20}
                            maxLength={MAX_MESSAGE_LENGTH}
                            rows={8}
                            placeholder="Deine Nachricht an den Vorstand …"
                            onChange={(e) => setMessageLength(e.currentTarget.value.length)}
                        />
                    </Field>

                    {/*
                      Honeypot. Kept in the accessibility tree's blind spot rather
                      than `display: none`, which the more careful bots skip.
                    */}
                    <div aria-hidden="true" className="form-honeypot">
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

                    <div className="grid gap-1.5">
                        <span className="text-sm font-semibold text-foreground">
                            Sicherheitsüberprüfung
                        </span>
                        <altcha-widget
                            challenge={challengeJson}
                            name="altcha"
                            style={ALTCHA_STYLE}
                        />
                    </div>

                    <Button type="submit" size="lg" loading={form.pending} disabled={!enabled}>
                        {form.pending ? "Wird gesendet …" : "Nachricht senden"}
                    </Button>

                    <p className="text-center text-xs text-faint">
                        Mit dem Absenden stimmst du der Verarbeitung deiner Angaben gemäß unserer{" "}
                        <Link
                            href="/datenschutz"
                            className="font-semibold text-physics underline-offset-4 hover:underline"
                        >
                            Datenschutzerklärung
                        </Link>{" "}
                        zu.
                    </p>
                </form>
            </Card>
        </Container>
    );
}
