import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Große, anklickbare Kachel als Einstieg in einen Bereich.
 *
 * Zweimal wortgleich im Dashboard: einmal gefüllt für die
 * Mitgliederselbstverwaltung, einmal ruhig für den Mitgliedsantrag. Beide
 * bestanden aus demselben `Link` mit vier Kindern und unterschieden sich in
 * genau zwei Klassenketten — die aber so weit auseinanderstanden, dass eine
 * Änderung an der einen Kachel die andere nie erreichte.
 */
export function CtaCard({
    href,
    eyebrow,
    icon,
    title,
    description,
    action,
    tone = "quiet",
    className,
}: {
    href: string;
    eyebrow: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    /** Beschriftung der Zeile mit dem Pfeil. */
    action: string;
    /** `accent` füllt die Kachel mit der Vereinsfarbe. */
    tone?: "accent" | "quiet";
    className?: string;
}) {
    const accent = tone === "accent";

    return (
        <Link
            href={href}
            className={cn(
                "group grid gap-2 rounded-[3px] p-5 transition-colors sm:p-6",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics",
                accent
                    ? "bg-physics text-on-physics"
                    : "border border-line-strong bg-surface text-foreground hover:border-physics",
                className,
            )}
        >
            <span
                className={cn(
                    "flex items-center gap-2 font-serif text-base italic",
                    accent ? "opacity-90" : "text-physics",
                )}
            >
                {icon}
                {eyebrow}
            </span>
            <span className="headline text-2xl">{title}</span>
            <span
                className={cn(
                    "max-w-prose text-sm text-pretty",
                    accent ? "opacity-90" : "text-muted",
                )}
            >
                {description}
            </span>
            <span
                className={cn(
                    "mt-1 flex items-center gap-2 text-sm font-semibold",
                    !accent && "text-physics",
                )}
            >
                {action}
                <ArrowRight
                    size={16}
                    aria-hidden="true"
                    // Dieselbe Feder wie die Pfeile der öffentlichen Seiten.
                    className="cta-arrow group-hover:translate-x-[5px]"
                />
            </span>
        </Link>
    );
}
