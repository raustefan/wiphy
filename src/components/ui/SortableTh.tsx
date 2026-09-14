"use client";

import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";
import { Th } from "./Table";

export type SortState<K extends string> = { key: K; desc: boolean };

/**
 * Spaltenkopf, der die Tabelle sortiert.
 *
 * `aria-sort` sitzt am `<th>`, nicht am Knopf: Screenreader lesen die
 * Sortierung beim Betreten der Spalte vor, nicht erst beim Fokussieren des
 * Knopfes. Der Pfeil daneben ist `aria-hidden` — er wiederholt nur, was
 * `aria-sort` schon sagt.
 *
 * Mit `icon` wird der Kopf zum reinen Symbol; die Beschriftung bleibt als
 * `title` und für Screenreader erhalten. Das ist für enge Spalten gedacht, in
 * denen „Studierendenstatus“ als Wort mehr Platz bräuchte als die Werte
 * darunter.
 */
export function SortableTh<K extends string>({
    sortKey,
    label,
    icon,
    sort,
    onSort,
    align = "left",
    className,
}: {
    sortKey: K;
    label: string;
    /** Ersetzt den Beschriftungstext — dieser bleibt als `title`/`sr-only`. */
    icon?: React.ReactNode;
    sort: SortState<K>;
    onSort: (key: K) => void;
    align?: "left" | "center" | "right";
    className?: string;
}) {
    const active = sort.key === sortKey;

    return (
        <Th
            aria-sort={active ? (sort.desc ? "descending" : "ascending") : "none"}
            className={cn("p-0", className)}
        >
            <button
                type="button"
                onClick={() => onSort(sortKey)}
                title={icon ? label : undefined}
                className={cn(
                    "flex w-full cursor-pointer items-center gap-1.5 px-2 py-2.5 text-xs font-semibold tracking-wide uppercase transition-colors",
                    "hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-physics",
                    align === "center" && "justify-center",
                    align === "right" && "justify-end",
                    active ? "text-foreground" : "text-faint",
                )}
            >
                {icon ? (
                    <>
                        <span aria-hidden="true">{icon}</span>
                        <span className="sr-only">{label}</span>
                    </>
                ) : (
                    label
                )}
                <ArrowUp
                    size={13}
                    aria-hidden="true"
                    className={cn(
                        "shrink-0 transition-transform motion-reduce:transition-none",
                        active ? "opacity-100" : "opacity-0",
                        active && sort.desc && "rotate-180",
                    )}
                />
            </button>
        </Th>
    );
}
