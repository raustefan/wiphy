/**
 * Gemeinsame rAF-Schleife für die beiden Canvas-Visualisierungen.
 *
 * Die Schleife läuft nur, wenn sie etwas bewirkt: sie pausiert, sobald das
 * Canvas aus dem Viewport scrollt oder der Tab in den Hintergrund geht. Bei
 * `prefers-reduced-motion: reduce` wird stattdessen genau ein Bild gezeichnet
 * — und erneut, wenn sich die Einstellung während der Sitzung ändert.
 */
export type RenderLoopHandle = {
    /** Neu zeichnen, ohne die Schleife zu starten (z. B. nach einem Resize). */
    redraw: () => void;
    stop: () => void;
};

export function createRenderLoop(
    canvas: HTMLCanvasElement,
    draw: (options: { reducedMotion: boolean }) => void,
): RenderLoopHandle {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let visible = true;
    let stopped = false;

    const reducedMotion = () => motionQuery.matches;

    const frame = () => {
        draw({ reducedMotion: false });
        raf = requestAnimationFrame(frame);
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
        if (!stopped && visible && !document.hidden) draw({ reducedMotion: true });
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
        redraw: () => draw({ reducedMotion: reducedMotion() }),
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
