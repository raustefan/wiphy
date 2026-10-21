"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { IconButton } from "@/components/ui";

/**
 * Reiner (i)-Knopf ohne eigenes Popover. Der Erklärtext wird zentral am
 * oberen Seitenrand angezeigt (siehe RateLimitTable) — ein Popover direkt
 * an der Tabellenzeile würde bei Zeilen am unteren Bildschirmrand aus dem
 * sichtbaren Bereich hinauslaufen.
 */
export function InfoTooltip({
    active,
    onShow,
    onHide,
}: {
    active: boolean;
    onShow: () => void;
    onHide: () => void;
}) {
    return (
        <IconButton
            type="button"
            size="sm"
            variant="ghost"
            color="neutral"
            aria-label="Erklärung anzeigen"
            aria-expanded={active}
            title=""
            onClick={() => (active ? onHide() : onShow())}
            onMouseEnter={onShow}
            onMouseLeave={onHide}
            onFocus={onShow}
            onBlur={onHide}
        >
            <HugeiconsIcon icon={InformationCircleIcon} size={14} aria-hidden="true" />
        </IconButton>
    );
}
