/**
 * Gemeinsame rAF-Schleife für die beiden Canvas-Visualisierungen.
 *
 * Die Schleife läuft nur, wenn sie etwas bewirkt: sie pausiert, sobald das
 * Canvas aus dem Viewport scrollt oder der Tab in den Hintergrund geht. Bei
 * `prefers-reduced-motion: reduce` wird stattdessen genau ein Bild gezeichnet
 * — und erneut, wenn sich die Einstellung während der Sitzung ändert.
 *
 * Optional lässt sich die Bildrate deckeln (`fps`). Auf Telefonen kostet jedes
 * Vollbild spürbar Füllrate; 30 Bilder/s sehen dort identisch aus, halbieren
 * aber die Arbeit. Displays mit 120 Hz (iPhone Pro) laufen ohne Deckel doppelt
 * so schnell wie gedacht — mit Deckel sind alle Geräte gleich schnell.
 */
export type RenderLoopHandle = {
    /** Neu zeichnen, ohne die Schleife zu starten (z. B. nach einem Resize). */
    redraw: () => void;
    stop: () => void;
};

export type RenderLoopFrame = {
    reducedMotion: boolean;
    /** Zeitstempel in ms — für zeitbasierte statt bildzahlbasierte Animation. */
    now: number;
};

export function createRenderLoop(
    canvas: HTMLCanvasElement,
    draw: (options: RenderLoopFrame) => void,
    options: { fps?: number } = {},
): RenderLoopHandle {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Eine Millisekunde Toleranz, sonst fällt bei 60 fps jedes zweite Bild aus.
    const minDelta = options.fps ? 1000 / options.fps - 1 : 0;

    let raf = 0;
    let visible = true;
    let stopped = false;
    let lastDraw = 0;

    const reducedMotion = () => motionQuery.matches;

    const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        if (now - lastDraw < minDelta) return;
        lastDraw = now;
        draw({ reducedMotion: false, now });
    };

    const shouldRun = () => !stopped && visible && !document.hidden && !reducedMotion();

    const sync = () => {
        if (shouldRun()) {
            if (!raf) raf = requestAnimationFrame(frame);
            return;
        }
        if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
        }
        // Statisches Einzelbild, damit die Fläche nie leer bleibt.
        if (!stopped && visible && !document.hidden) {
            draw({ reducedMotion: true, now: performance.now() });
        }
    };

    // Außerhalb des Viewports gibt es nichts zu animieren.
    const observer = new IntersectionObserver(
        (entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
            sync();
        },
        { rootMargin: "120px" },
    );
    observer.observe(canvas);

    document.addEventListener("visibilitychange", sync);
    motionQuery.addEventListener("change", sync);

    sync();

    return {
        redraw: () => draw({ reducedMotion: reducedMotion(), now: performance.now() }),
        stop: () => {
            stopped = true;
            if (raf) cancelAnimationFrame(raf);
            raf = 0;
            observer.disconnect();
            document.removeEventListener("visibilitychange", sync);
            motionQuery.removeEventListener("change", sync);
        },
    };
}

/**
 * Device-Pixel-Ratio-Deckel. Auf schmalen Viewports (meist Telefone mit
 * dpr 3) kostet jedes zusätzliche Pixel spürbar Füllrate, ohne dass man den
 * Unterschied sieht.
 */
export function cappedDpr(viewportWidth: number = window.innerWidth): number {
    const dpr = window.devicePixelRatio || 1;
    return Math.min(dpr, viewportWidth < 640 ? 1.5 : 2);
}

/** `true`, wenn das Layout als „schmal“ gilt — weniger Partikel/Pfade. */
export function isCompactViewport(): boolean {
    return window.innerWidth < 640;
}
