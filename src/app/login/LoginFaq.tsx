import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui";

type FaqItem = {
    question: string;
    answer: React.ReactNode;
};

const linkClass = "font-semibold text-physics underline-offset-4 hover:underline";

const SECTIONS: { title: string; items: FaqItem[] }[] = [
    {
        title: "Account & Anmeldung",
        items: [
            {
                question: "Wie erstelle ich einen Account?",
                answer: (
                    <>
                        Über{" "}
                        <Link href="/register" className={linkClass}>
                            „Jetzt Konto erstellen“
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
                        senden“. Der Link in der E-Mail ist 24 Stunden gültig; danach kannst du dir
                        auf demselben Weg einfach einen neuen zuschicken lassen.
                    </>
                ),
            },
            {
                question: "Wie setze ich mein Passwort zurück?",
                answer: (
                    <>
                        Klicke im Anmeldeformular auf{" "}
                        <Link href="/forgot-password" className={linkClass}>
                            „Passwort zurücksetzen“
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
                        <strong className="font-semibold text-foreground">nicht</strong>, dass du
                        Mitglied im WirtschaftsPhysik Alumni e.V. bist. Die Vereinsmitgliedschaft
                        ist ein eigener, formaler Schritt mit Aufnahme durch den Verein und dem
                        jährlichen Mitgliedsbeitrag. Du kannst also einen Account haben, ohne
                        Vereinsmitglied zu sein.
                    </>
                ),
            },
            {
                question: "Wie werde ich Vereinsmitglied?",
                answer: <>Das ist eine gute Frage.</>,
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
        <Card className="p-6 sm:p-8">
            <div className="grid gap-1">
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Häufige Fragen</h2>
                <p className="text-sm text-muted">
                    Rund um Account, Anmeldung und Mitgliedschaft
                </p>
            </div>

            <div className="mt-6 grid gap-6">
                {SECTIONS.map((section) => (
                    <section key={section.title} className="grid gap-1">
                        <h3 className="text-xs font-bold tracking-wider text-faint uppercase">
                            {section.title}
                        </h3>
                        <div className="divide-y divide-line">
                            {section.items.map((item) => (
                                <details key={item.question} className="group">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3.5 text-sm font-medium transition-colors hover:text-physics [&::-webkit-details-marker]:hidden">
                                        <span>{item.question}</span>
                                        <ChevronDown
                                            size={18}
                                            aria-hidden="true"
                                            className="shrink-0 text-faint transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                                        />
                                    </summary>
                                    <div className="pb-4 text-sm leading-relaxed text-muted">
                                        {item.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </Card>
    );
}
