"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { MAX_MESSAGE_LENGTH } from "@/lib/contact";
import { MEMBERSHIP_APPLICATION_PATH } from "@/lib/membership";
import { useActionForm } from "@/lib/client/useActionForm";
import { submitContactRequest } from "./actions";
import { AltchaField } from "@/components/AltchaField";
import { Callout, Field, Input, Spinner, TextArea } from "@/components/ui";
import { Cta, Frame, PageHead } from "@/components/Site";

export function ContactForm({
    challengeJson,
    enabled,
    defaultSubject = "",
}: {
    challengeJson: string;
    enabled: boolean;
    /** Vorbelegung aus der Adresszeile (`?betreff=…`). */
    defaultSubject?: string;
}) {
    const [submitted, setSubmitted] = useState(false);
    const [messageLength, setMessageLength] = useState(0);
    // Set on mount rather than on the server, so it measures how long the form
    // was actually on screen instead of when the page was rendered.
    const renderedAt = useRef<number>(0);

    useEffect(() => {
        renderedAt.current = Date.now();
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
            <PageHead title="Nachricht verschickt">
                <p>
                    Danke für deine Nachricht. Der Vorstand meldet sich so bald wie möglich bei dir
                    — in der Regel innerhalb weniger Tage.
                </p>
                <div className="mt-8">
                    <Cta href="/" variant="line">
                        Zur Startseite
                    </Cta>
                </div>
            </PageHead>
        );
    }

    return (
        <>
            <PageHead title="Kontakt">
                Fragen zur Mitgliedschaft, zum Verein oder zu einem Termin? Deine Nachricht geht
                direkt an den Vorstand.
            </PageHead>

            <Frame className="grid gap-10 pb-20 sm:pb-28 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
                <dl className="grid content-start gap-6 border-t border-foreground pt-6 text-sm lg:sticky lg:top-28 lg:self-start">
                    <div className="grid gap-1">
                        <dt className="font-serif text-lg italic">Antwortzeit</dt>
                        <dd className="leading-relaxed text-muted">In der Regel wenige Tage, per E-Mail.</dd>
                    </div>
                    <div className="grid gap-1">
                        <dt className="font-serif text-lg italic">Mitglied werden</dt>
                        <dd className="leading-relaxed text-muted">
                            Dafür brauchst du keine Nachricht —{" "}
                            <Link href={MEMBERSHIP_APPLICATION_PATH} className="link">
                                der Antrag geht online
                            </Link>
                            .
                        </dd>
                    </div>
                    <div className="grid gap-1">
                        <dt className="font-serif text-lg italic">Postanschrift</dt>
                        <dd className="leading-relaxed text-muted">
                            Steht im{" "}
                            <Link href="/impressum" className="link">
                                Impressum
                            </Link>
                            .
                        </dd>
                    </div>
                </dl>

                <div className="max-w-2xl border-t border-line pt-6">
                <form action={handleAction} className="grid gap-5">
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
                            placeholder="deine@email.de"
                        />
                    </Field>

                    <Field label="Betreff" htmlFor="contact-subject">
                        <Input
                            id="contact-subject"
                            name="subject"
                            required
                            maxLength={200}
                            defaultValue={defaultSubject}
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

                    <AltchaField challengeJson={challengeJson} />

                    <button
                        type="submit"
                        disabled={!enabled || form.pending}
                        // Der Spinner ist `aria-hidden` — `aria-busy` meldet den
                        // laufenden Versand an Screenreader.
                        aria-busy={form.pending || undefined}
                        className="cta cta-solid w-full disabled:pointer-events-none disabled:opacity-50 sm:w-auto sm:justify-self-start"
                    >
                        {form.pending && <Spinner />}
                        {form.pending ? "Wird gesendet …" : "Nachricht senden"}
                    </button>

                    <p className="text-xs text-muted">
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
                </div>
            </Frame>
        </>
    );
}
