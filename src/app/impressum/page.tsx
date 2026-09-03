import { ButtonLink, Container, Separator } from "@/components/ui";

export default function ImpressumPage() {
    return (
        <Container size="2" className="pt-6 pb-16 sm:pt-10">
            <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                    Impressum
                </h1>
                <ButtonLink href="/" variant="soft" color="neutral" size="sm">
                    ← Zurück zur Startseite
                </ButtonLink>
            </div>

            <div className="grid gap-4 [&_a]:text-physics [&_a]:underline [&_a]:underline-offset-2">

                <p className="text-base font-bold sm:text-lg">
                    Wirtschaftsphysik Alumni e.V.
                </p>
                <div className="text-sm leading-relaxed text-muted sm:text-base">
                    c/o Universität Ulm
                    <br />
                    Studienkommission Physik
                    <br />
                    Albert-Einstein-Allee 11
                    <br />
                    D – 89081 Ulm
                </div>

                <div className="text-sm leading-relaxed text-muted sm:text-base">
                    E-Mail:{" "}
                    <a href="mailto:info@wirtschaftsphysik.de">
                        info@wirtschaftsphysik.de
                    </a>
                    <br />
                </div>

                <Separator className="my-2" />

                <p className="text-base font-bold sm:text-lg">
                    Vertretungsberechtigter Vorstand
                </p>
                <div className="text-sm leading-relaxed text-muted sm:text-base">
                    Nikolas Tomek (1. Vorsitzender)
                    <br />
                    Jannes Weghake (2. Vorsitzender)
                </div>

                <Separator className="my-2" />

                <div className="text-sm leading-relaxed text-muted sm:text-base">
                    Registergericht: Amtsgericht Ulm
                    <br />
                    Registernummer: VR 1891
                </div>

                <Separator className="my-2" />

                <p className="text-base font-bold sm:text-lg">
                    Bankverbindung
                </p>
                <div className="text-sm leading-relaxed text-muted sm:text-base">
                    Kontoinhaber: Wirtschaftsphysik Alumni e.V.
                    <br />
                    IBAN: DE23 6305 0000 0021 0300 28
                    <br />
                    BIC: SOLADES1ULM
                    <br />
                    Institut: Sparkasse Ulm
                </div>

                <Separator className="my-2" />

                <div className="text-sm leading-relaxed text-muted sm:text-base">
                    Homepage gestaltet von: Stefan Rau
                </div>

                <Separator className="my-2" />

                <p className="text-base font-bold sm:text-lg">
                    Haftungshinweis
                </p>
                <div className="text-sm leading-relaxed text-muted sm:text-base">
                    Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
                    Haftung für die Inhalte externer Links. Für den Inhalt der
                    verlinkten Seiten sind ausschließlich deren Betreiber
                    verantwortlich. Des Weiteren distanzieren wir uns von sämtlichen
                    schriftlichen Äußerungen der Vereinsmitglieder, die nicht dem
                    Vorstand angehören.
                </div>
            </div>
        </Container>
    );
}
