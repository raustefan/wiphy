"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { blogImageSrcSet, blogImageUrl, type BlogImageMeta } from "@/lib/blogImages";

/**
 * Bildergalerie eines Blogbeitrags: großes Titelbild, darunter die weiteren
 * Bilder, und auf Tipp eine Vollbildansicht zum Durchblättern.
 *
 * Vom Telefon aus gedacht. Die weiteren Bilder liegen deshalb in einer
 * waagerechten Leiste mit `snap-x` statt in einem Raster: auf 375 px Breite
 * ergäbe ein Raster entweder Briefmarken oder eine endlose Spalte, während sich
 * eine Leiste mit dem Daumen durchziehen lässt. Erst ab `sm` wird daraus ein
 * Raster, wo der Platz dafür da ist.
 *
 * Die Vollbildansicht ist ein natives `<dialog>` — wie im übrigen Projekt
 * (siehe `components/ui/Dialog.tsx`) übernimmt der Browser damit Esc,
 * Fokusfalle und das Inertisieren der Seite dahinter.
 */
export function BlogGallery({ images }: { images: BlogImageMeta[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const touchStartX = useRef<number | null>(null);

    const [cover, ...rest] = images;

    const show = useCallback(
        (step: number) =>
            setOpenIndex((current) =>
                current === null ? current : (current + step + images.length) % images.length,
            ),
        [images.length],
    );

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (openIndex !== null && !dialog.open) dialog.showModal();
        else if (openIndex === null && dialog.open) dialog.close();
    }, [openIndex]);

    useEffect(() => {
        if (openIndex === null) return;
        function onKey(event: KeyboardEvent) {
            if (event.key === "ArrowRight") show(1);
            if (event.key === "ArrowLeft") show(-1);
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [openIndex, show]);

    if (images.length === 0) return null;

    const active = openIndex === null ? null : images[openIndex];

    return (
        <section aria-label="Bildergalerie" className="grid gap-3">
            <button
                type="button"
                onClick={() => setOpenIndex(0)}
                aria-label={`Titelbild in voller Größe ansehen${
                    images.length > 1 ? ` (Galerie mit ${images.length} Bildern)` : ""
                }`}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={blogImageUrl(cover.id)}
                    srcSet={blogImageSrcSet(cover.id)}
                    sizes="(min-width: 768px) 720px, 100vw"
                    alt={cover.alt}
                    width={cover.width}
                    height={cover.height}
                    loading="eager"
                    decoding="async"
                    className="aspect-[4/3] w-full bg-raised object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:aspect-[16/9]"
                />
                <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    <Expand size={13} aria-hidden="true" />
                    {images.length > 1 ? `1 / ${images.length}` : "Vergrößern"}
                </span>
            </button>

            {rest.length > 0 && (
                <ul className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
                    {rest.map((image, index) => (
                        <li key={image.id} className="shrink-0 snap-start">
                            <button
                                type="button"
                                onClick={() => setOpenIndex(index + 1)}
                                aria-label={`Bild ${index + 2} von ${images.length} ansehen`}
                                className="block w-24 cursor-zoom-in overflow-hidden rounded-xl border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics sm:w-full"
                            >
                                {/* Ohne `width`/`height`: die Kachel ist per CSS
                                    quadratisch zugeschnitten, die Maße des
                                    Originals würden hier ein falsches
                                    Seitenverhältnis vorgeben. */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={blogImageUrl(image.id, "thumb")}
                                    alt={image.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="aspect-square w-full bg-raised object-cover transition-opacity hover:opacity-85"
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <dialog
                ref={dialogRef}
                onCancel={(event) => {
                    event.preventDefault();
                    setOpenIndex(null);
                }}
                onClick={(event) => {
                    // Klick auf den Hintergrund schließt — das Bild selbst und die
                    // Knöpfe stoppen das Ereignis nicht, liegen aber in einem
                    // eigenen Element, sodass `event.target` sie unterscheidet.
                    if (event.target === dialogRef.current) setOpenIndex(null);
                }}
                onTouchStart={(event) => {
                    touchStartX.current = event.touches[0]?.clientX ?? null;
                }}
                onTouchEnd={(event) => {
                    const start = touchStartX.current;
                    touchStartX.current = null;
                    const end = event.changedTouches[0]?.clientX;
                    if (start === null || end === undefined) return;
                    // 48 px, damit ein leichtes Verwackeln beim Tippen nicht schon
                    // als Wischen durchgeht.
                    if (Math.abs(end - start) > 48) show(end < start ? 1 : -1);
                }}
                className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-black/92"
            >
                {active && (
                    <div className="pointer-events-none flex h-[100dvh] w-full flex-col">
                        <div className="pointer-events-auto flex items-center justify-between gap-3 px-4 pt-4">
                            <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs">
                                {(openIndex ?? 0) + 1} / {images.length}
                            </span>
                            <button
                                type="button"
                                onClick={() => setOpenIndex(null)}
                                aria-label="Galerie schließen"
                                className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
                            >
                                <X size={20} aria-hidden="true" />
                            </button>
                        </div>

                        <div className="flex min-h-0 flex-1 items-center justify-center px-2 py-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={blogImageUrl(active.id)}
                                alt={active.alt}
                                width={active.width}
                                height={active.height}
                                decoding="async"
                                className="pointer-events-auto max-h-full max-w-full rounded-lg object-contain"
                            />
                        </div>

                        <div className="pointer-events-auto grid gap-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                            {active.alt && (
                                <p className="text-center text-sm text-white/80">{active.alt}</p>
                            )}
                            {images.length > 1 && (
                                <div className="flex items-center justify-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => show(-1)}
                                        aria-label="Vorheriges Bild"
                                        className="grid size-12 cursor-pointer place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
                                    >
                                        <ChevronLeft size={22} aria-hidden="true" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => show(1)}
                                        aria-label="Nächstes Bild"
                                        className="grid size-12 cursor-pointer place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
                                    >
                                        <ChevronRight size={22} aria-hidden="true" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </dialog>
        </section>
    );
}
