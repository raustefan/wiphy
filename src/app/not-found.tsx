import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow, PageTitle } from "@/components/ui";

export const metadata: Metadata = { title: "Seite nicht gefunden" };

export default function NotFound() {
    return (
        <Container size="1" className="grid place-items-center py-24 sm:py-32">
            <div className="grid justify-items-center gap-4 text-center">
                <Eyebrow className="justify-center">Fehler 404</Eyebrow>
                <PageTitle>
                    Seite nicht gefunden
                </PageTitle>
                <p className="max-w-prose text-muted text-pretty">
                    Die aufgerufene Seite existiert nicht oder wurde verschoben.
                </p>
                <ButtonLink href="/" size="lg" className="mt-2">
                    Zurück zur Startseite
                </ButtonLink>
            </div>
        </Container>
    );
}
