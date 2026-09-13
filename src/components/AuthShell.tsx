import Link from "next/link";
import { Card } from "@/components/ui/Card";
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
        <div
            className={cn(
                "relative mx-auto flex w-full flex-col justify-center px-4 py-12 sm:px-6 sm:py-20",
                size === "lg" ? "max-w-lg" : "max-w-md",
            )}
        >
            {/* Farbschleier hinter der Karte: die beiden Vereinsfarben, stark
                weichgezeichnet. Rein dekorativ und deshalb `aria-hidden`. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 opacity-70 blur-3xl [background:radial-gradient(60%_100%_at_30%_0%,color-mix(in_oklab,var(--physics)_18%,transparent),transparent),radial-gradient(50%_100%_at_80%_10%,color-mix(in_oklab,var(--market)_14%,transparent),transparent)]"
            />

            <Card className="p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.12)] sm:p-8">
                <div className="grid justify-items-center gap-1.5 text-center">
                    {icon && (
                        <span className="mb-2 grid size-12 place-items-center rounded-2xl bg-physics/10 text-physics ring-1 ring-physics/15">
                            {icon}
                        </span>
                    )}
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
