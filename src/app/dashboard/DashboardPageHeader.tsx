import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";

type DashboardPageHeaderProps = {
    eyebrow: string;
    title: string;
    description?: string;
    backHref: string;
    backLabel?: string;
    /** Plain anchor instead of next/link — needed when a beforeunload guard must fire. */
    backAsPlainAnchor?: boolean;
    children?: React.ReactNode;
};

/**
 * Kopf einer Dashboard-Unterseite: Rücksprung, Titel, optionale Aktionen.
 *
 * Der Rücksprung war ein Knopf in voller Zeilenbreite und damit auf dem Telefon
 * das Erste und Größte auf jeder Unterseite — vor der Überschrift, die sagt, wo
 * man ist. Als Textlink darüber nimmt er den Platz nicht mehr weg, den der
 * Inhalt braucht; die Tippfläche bleibt über den Innenabstand trotzdem
 * fingergerecht, denn er ist der einzige Weg zurück.
 */
export function DashboardPageHeader({
    eyebrow,
    title,
    description,
    backHref,
    backLabel = "Zurück zum Dashboard",
    backAsPlainAnchor = false,
    children,
}: DashboardPageHeaderProps) {
    const backClass = cn(
        "-ml-3 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors",
        "hover:bg-raised hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics",
    );
    const backContent = (
        <>
            <ArrowLeft size={15} aria-hidden="true" />
            {backLabel}
        </>
    );

    return (
        <div className="mb-6 grid gap-4 sm:mb-8">
            {backAsPlainAnchor ? (
                <a href={backHref} className={backClass}>
                    {backContent}
                </a>
            ) : (
                <Link href={backHref} className={backClass}>
                    {backContent}
                </Link>
            )}

            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <div className="min-w-0">
                    <p className="text-sm text-muted">{eyebrow}</p>
                    <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-1 max-w-prose text-sm text-muted text-pretty">
                            {description}
                        </p>
                    )}
                </div>
                {children && (
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
