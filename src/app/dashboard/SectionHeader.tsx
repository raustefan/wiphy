import { cn } from "@/lib/cn";

/**
 * Wiederkehrender Kopf einer Dashboard-Karte: kleine Zeile mit Icon als
 * Kontext, darunter Überschrift und optionale Beschreibung; rechts Platz für
 * einen Zähler oder eine Aktion.
 */
export function SectionHeader({
    icon,
    eyebrow,
    title,
    description,
    aside,
    className,
}: {
    icon?: React.ReactNode;
    eyebrow: string;
    title: string;
    description?: string;
    aside?: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "flex flex-col justify-between gap-3 sm:flex-row sm:items-baseline",
                className,
            )}
        >
            <div className="grid min-w-0 gap-1">
                <p className="flex items-center gap-2 font-serif text-base text-physics italic">
                    {icon && (
                        <span aria-hidden="true">
                            {icon}
                        </span>
                    )}
                    {eyebrow}
                </p>
                <h2 className="headline text-2xl">
                    {title}
                </h2>
                {description && (
                    <p className="max-w-prose text-sm text-muted text-pretty">{description}</p>
                )}
            </div>
            {aside}
        </div>
    );
}
