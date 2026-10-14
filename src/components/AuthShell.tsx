import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Gemeinsame Hülle für Login, Registrierung, Passwort-Reset und
 * E-Mail-Bestätigung: eine zentrierte Karte, auf dem Telefon randlos-breit,
 * ab `sm` als abgesetztes Panel.
 *
 * `icon` und `size` sind optional und ändern nichts an den bestehenden
 * Aufrufen: ohne sie steht dort dieselbe Karte wie vorher.
 */
export function AuthShell({
    title,
    description,
    icon,
    size = "md",
    children,
    footer,
}: {
    title: string;
    description?: string;
    /** Symbol über der Überschrift, in einem getönten Feld. */
    icon?: React.ReactNode;
    /** `lg` für Formulare mit zwei Spalten (Registrierung). */
    size?: "md" | "lg";
    children: React.ReactNode;
    footer?: React.ReactNode;
}) {
    return (
        <div className="relative isolate">
            {/* Millimeterpapier hinter dem Formular — rein dekorativ. */}
            <div aria-hidden="true" className="decor paper paper-fade absolute inset-0 -z-10" />
            <div
                className={cn(
                    "mx-auto flex w-full flex-col justify-center px-4 py-12 sm:px-6 sm:py-20",
                    size === "lg" ? "max-w-lg" : "max-w-md",
                )}
            >
                <div className="rounded-[3px] border border-line-strong bg-surface p-6 sm:p-8">
                    <div className="grid gap-2">
                        {icon && (
                            <span className="mb-2 grid size-11 place-items-center rounded-[3px] border border-physics/30 text-physics">
                                {icon}
                            </span>
                        )}
                        <h1 className="headline text-3xl">{title}</h1>
                        {description && (
                            <p className="text-sm leading-relaxed text-muted text-pretty">{description}</p>
                        )}
                    </div>
                    <div className="mt-6 grid gap-4">{children}</div>
                </div>
                {footer && <div className="mt-5 text-center text-sm text-muted">{footer}</div>}
            </div>
        </div>
    );
}

/** Textlink im Fußbereich der Auth-Karten. */
export function AuthLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="link font-semibold"
        >
            {children}
        </Link>
    );
}
