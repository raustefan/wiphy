import { cn } from "@/lib/cn";

/**
 * „Hier ist noch nichts“ — einheitlich für leere Listen und Tabellen.
 *
 * Vorher stand an sieben Stellen ein nacktes `<p className="py-8 text-center
 * text-sm text-muted">`. Das sagte zwar, dass nichts da ist, aber nicht, wie
 * etwas hinkommt; der Knopf dafür saß jedes Mal weit oben am Seitenkopf. Auf
 * dem Telefon war das der halbe Bildschirm entfernt.
 */
export function EmptyState({
    icon,
    title,
    description,
    action,
    className,
}: {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    /** Nächster Schritt — direkt dort, wo die Leere auffällt. */
    action?: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "grid justify-items-center gap-2 px-4 py-10 text-center sm:py-12",
                className,
            )}
        >
            {icon && (
                <span
                    aria-hidden="true"
                    className="mb-1 grid size-11 place-items-center rounded-2xl bg-raised text-faint"
                >
                    {icon}
                </span>
            )}
            <p className="text-sm font-semibold text-foreground">{title}</p>
            {description && (
                <p className="max-w-sm text-sm text-muted text-pretty">{description}</p>
            )}
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}
