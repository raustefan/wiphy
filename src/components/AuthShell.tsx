import Link from "next/link";
import { Card } from "@/components/ui/Card";

/**
 * Gemeinsame Hülle für Login, Registrierung, Passwort-Reset und
 * E-Mail-Bestätigung: eine zentrierte Karte, auf dem Telefon randlos-breit,
 * ab `sm` als abgesetztes Panel.
 */
export function AuthShell({
    title,
    description,
    children,
    footer,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}) {
    return (
        <div className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-12 sm:px-6 sm:py-20">
            <Card className="p-6 sm:p-8">
                <div className="grid gap-1.5 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-balance">{title}</h1>
                    {description && (
                        <p className="text-sm leading-relaxed text-muted text-pretty">{description}</p>
                    )}
                </div>
                <div className="mt-6 grid gap-4">{children}</div>
            </Card>
            {footer && <div className="mt-5 text-center text-sm text-muted">{footer}</div>}
        </div>
    );
}

/** Textlink im Fußbereich der Auth-Karten. */
export function AuthLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="font-semibold text-physics underline-offset-4 hover:underline"
        >
            {children}
        </Link>
    );
}
