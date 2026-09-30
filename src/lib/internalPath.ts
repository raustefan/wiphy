const BASE = "http://login.invalid";

/**
 * Nur seiteneigene Pfade sind als Ziel zugelassen. Ein `next`, das irgendwo
 * herkommt, ist sonst eine offene Weiterleitung: `?next=https://…` schickte
 * frisch Angemeldete auf eine fremde Seite. `//host` zählt dabei als absolute
 * URL und muss deshalb mit ausgeschlossen werden.
 */
export function internalPath(value: string | undefined): string | null {
    // Browser lesen `\` wie `/` und ignorieren Tabs, daher `/\host` oder
    // `/<TAB>/host` ebenfalls ablehnen und nur Pfad + Query + Hash zurückgeben.
    if (!value || !value.startsWith("/") || /[\\\x00-\x1f]/.test(value)) return null;
    const url = URL.parse(value, BASE);
    return url?.origin === BASE ? url.pathname + url.search + url.hash : null;
}
