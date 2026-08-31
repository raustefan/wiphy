import { Card, Heading, Text, Flex, Link } from "@radix-ui/themes";
import { ChevronDownIcon } from "@radix-ui/react-icons";

type FaqItem = {
    question: string;
    answer: React.ReactNode;
};

const SECTIONS: { title: string; items: FaqItem[] }[] = [
    {
        title: "Account & Anmeldung",
        items: [
            {
                question: "Wie erstelle ich einen Account?",
                answer: (
                    <>
                        Über{" "}
                        <Link href="/register" style={{ color: "var(--accent-9)", textDecoration: "none" }}>
                            „Jetzt Konto erstellen"
                        </Link>{" "}
                        gibst du Vorname, Nachname, E-Mail-Adresse und ein Passwort ein. Danach
                        schicken wir dir eine E-Mail mit einem Bestätigungslink. Erst wenn du diesen
                        Link angeklickt hast, ist dein Account aktiv und du kannst dich anmelden.
                    </>
                ),
            },
            {
                question: "Ich habe keine Bestätigungs-E-Mail bekommen – was tun?",
                answer: (
                    <>
                        Schau bitte zuerst in deinem Spam- bzw. Werbung-Ordner nach. Wenn du dich
                        mit einer noch nicht bestätigten Adresse anzumelden versuchst, erscheint auf
                        dieser Seite ein Hinweis mit der Schaltfläche „Bestätigungs-E-Mail erneut
                        senden". Der Link in der E-Mail ist 24 Stunden gültig; danach kannst du dir
                        auf demselben Weg einfach einen neuen zuschicken lassen.
                    </>
                ),
            },
            {
                question: "Wie setze ich mein Passwort zurück?",
                answer: (
                    <>
                        Klicke im Anmeldeformular auf{" "}
                        <Link href="/forgot-password" style={{ color: "var(--accent-9)", textDecoration: "none" }}>
                            „Passwort zurücksetzen"
                        </Link>{" "}
                        und gib deine E-Mail-Adresse ein. Wir senden dir einen Link, über den du ein
                        neues Passwort vergeben kannst. Dieser Link ist aus Sicherheitsgründen nur
                        30 Minuten gültig.
                    </>
                ),
            },
            {
                question: "Kann ich meine E-Mail-Adresse ändern?",
                answer: (
                    <>
                        Ja. Wenn du angemeldet bist, kannst du deine E-Mail-Adresse im Profil im
                        Dashboard anpassen. Zur Bestätigung schicken wir einen Link an die neue
                        Adresse – die Änderung wird erst wirksam, sobald du diesen bestätigt hast.
                    </>
                ),
            },
        ],
    },
    {
        title: "Mitgliedschaft & Dashboard",
        items: [
            {
                question: "Ist ein Account dasselbe wie eine Vereinsmitgliedschaft?",
                answer: (
                    <>
                        Nein. Ein Account ist nur ein Zugang zu diesem Online-Bereich. Er bedeutet{" "}
                        <Text weight="bold">nicht</Text>, dass du Mitglied im WirtschaftsPhysik
                        Alumni e.V. bist. Die Vereinsmitgliedschaft ist ein eigener, formaler Schritt
                        mit Aufnahme durch den Verein und dem jährlichen Mitgliedsbeitrag. Du kannst
                        also einen Account haben, ohne Vereinsmitglied zu sein.
                    </>
                ),
            },
            {
                question: "Wie werde ich Vereinsmitglied?",
                answer: (
                    <>
                        Das ist eine gute Frage.
                    </>
                ),
            },
            {
                question: "Wofür ist das Dashboard da?",
                answer: (
                    <>
                        Das Dashboard ist dein persönlicher Bereich nach der Anmeldung. Dort
                        verwaltest du deine eigenen Daten (Profil, E-Mail-Adresse, Passwort) und
                        findest die Inhalte und Informationen, die für angemeldete Nutzerinnen und
                        Nutzer bzw. Mitglieder bereitgestellt werden.
                    </>
                ),
            },
        ],
    },
];

export function LoginFaq() {
    return (
        <Card size="4" style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)", width: "100%" }}>
            <style>{`
                .login-faq details {
                    border-bottom: 1px solid var(--gray-a5);
                }
                .login-faq details:last-child {
                    border-bottom: none;
                }
                .login-faq summary {
                    list-style: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    padding: 14px 4px;
                    font-weight: 500;
                    color: var(--gray-12);
                    transition: color 0.15s ease;
                }
                .login-faq summary::-webkit-details-marker {
                    display: none;
                }
                .login-faq summary:hover {
                    color: var(--accent-11);
                }
                .login-faq summary .login-faq-chevron {
                    flex-shrink: 0;
                    transition: transform 0.2s ease;
                    color: var(--gray-9);
                }
                .login-faq details[open] summary .login-faq-chevron {
                    transform: rotate(180deg);
                }
                .login-faq .login-faq-answer {
                    padding: 0 4px 16px;
                }
            `}</style>

            <Flex direction="column" gap="5" className="login-faq">
                <Flex direction="column" gap="1">
                    <Heading as="h2" size="6">
                        Häufige Fragen
                    </Heading>
                    <Text size="2" color="gray">
                        Rund um Account, Anmeldung und Mitgliedschaft
                    </Text>
                </Flex>

                {SECTIONS.map((section) => (
                    <Flex key={section.title} direction="column" gap="1">
                        <Text size="2" weight="bold" color="gray" style={{ textTransform: "uppercase", letterSpacing: "0.04em" }}>
                            {section.title}
                        </Text>
                        <div>
                            {section.items.map((item) => (
                                <details key={item.question}>
                                    <summary>
                                        <span>{item.question}</span>
                                        <ChevronDownIcon className="login-faq-chevron" width="18" height="18" />
                                    </summary>
                                    <div className="login-faq-answer">
                                        <Text size="2" color="gray" style={{ lineHeight: 1.6 }}>
                                            {item.answer}
                                        </Text>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </Flex>
                ))}
            </Flex>
        </Card>
    );
}
