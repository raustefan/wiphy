"use client";

/**
 * Letzte Rückfallebene: greift nur, wenn das Root-Layout selbst beim Rendern
 * scheitert — dann gibt es weder Kopfzeile noch Fußzeile noch Theme, und
 * `error.tsx` kommt gar nicht erst zum Zug. Deshalb eigenes `<html>`/`<body>`.
 *
 * Bewusst ohne Stylesheet, Schriften und Komponenten: alles davon könnte
 * genau das sein, was gerade kaputt ist. Die Farben stehen als feste Werte im
 * `style`-Attribut, damit die Seite auch dann lesbar ist, wenn kein einziges
 * CSS geladen wurde.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="de">
            <body
                style={{
                    margin: 0,
                    minHeight: "100dvh",
                    display: "grid",
                    placeItems: "center",
                    padding: "2rem",
                    background: "#fafafa",
                    color: "#18181b",
                    fontFamily:
                        "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                }}
            >
                <main style={{ maxWidth: "36rem", textAlign: "center" }}>
                    <p
                        style={{
                            margin: 0,
                            fontSize: "0.8rem",
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "#0f766e",
                            fontWeight: 600,
                        }}
                    >
                        Fehler
                    </p>
                    <h1 style={{ fontSize: "1.75rem", lineHeight: 1.2, margin: "0.75rem 0" }}>
                        Die Seite konnte nicht geladen werden
                    </h1>
                    <p style={{ color: "#52525b", lineHeight: 1.6 }}>
                        Es liegt eine Störung vor. Bitte lade die Seite neu oder versuche es
                        später noch einmal.
                    </p>
                    {error.digest && (
                        <p style={{ color: "#71717a", fontSize: "0.8rem" }}>
                            Kennung: {error.digest}
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={reset}
                        style={{
                            marginTop: "1.5rem",
                            cursor: "pointer",
                            border: 0,
                            borderRadius: "999px",
                            background: "#0f766e",
                            color: "#ffffff",
                            padding: "0.7rem 1.5rem",
                            fontSize: "0.95rem",
                            fontWeight: 600,
                        }}
                    >
                        Erneut versuchen
                    </button>
                </main>
            </body>
        </html>
    );
}
