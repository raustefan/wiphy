import { ButtonLink, Container, PageTitle } from "@/components/ui";

export default function NotFound() {
    return (
        <Container size="1" className="grid place-items-center py-24 sm:py-32">
            <div className="grid justify-items-center gap-4 text-center">
                <p className="font-mono text-sm font-semibold tracking-widest text-physics uppercase">
                    404
                </p>
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
