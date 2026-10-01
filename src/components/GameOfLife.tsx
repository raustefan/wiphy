"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAppearance } from "@/components/AppThemeProvider";
import { paletteFor, rgba } from "@/lib/palette";
import { createRenderLoop } from "@/lib/renderLoop";

/**
 * Conways Game of Life als unscharfer Seitenhintergrund, gezeichnet wie das
 * Phononengitter: Zellen sind Gitterknoten, lebende Nachbarn sind durch
 * Bindungen verbunden. Die Ebene ist nach hinten gekippt (Perspektive), und
 * zwischen zwei Generationen wird stetig überblendet — lebende Knoten heben
 * sich dabei leicht aus der Ebene.
 *
 * Jede Zelle trägt eine der beiden Vereinsfarben; Neugeborene erben die
 * Mehrheitsfarbe ihrer drei Eltern. Beim Scrollen läuft die Ebene langsamer
 * als der Inhalt mit (Parallaxe), das verstärkt den Tiefeneindruck.
 */

const CELL = 34;
const GENERATION_MS = 1400;
/** Zufällige Geburten pro Generation, damit das Feld nie ausstirbt. */
const NOISE = 0.002;
/** Neigung der Ebene gegen die Bildschirmebene (rad). */
const TILT = 0.75;
/** Kameraabstand in px — kleiner = stärkere Perspektive. */
const DISTANCE = 1400;
/** Wie weit sich lebende Knoten aus der Ebene heben (px). */
const LIFT = 10;
/** Anteil der Scrollstrecke, um den die Ebene mitläuft. */
const PARALLAX = 0.25;

/** Lange Fließtexte — dort tritt der Hintergrund fast ganz zurück. */
const TEXT_PAGES = ["/blog", "/impressum", "/datenschutz", "/satzung", "/geschichte"];

const NEIGHBORS = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1],
] as const;

export default function GameOfLife() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { appearance } = useAppearance();
  const pathname = usePathname();
  const textPage = TEXT_PAGES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = paletteFor(appearance);
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    // 0 = tot, 1 = physics, 2 = market
    let prev = new Uint8Array(0);
    let cells = new Uint8Array(0);
    // Letzte Farbe jeder Zelle, damit sie beim Sterben in ihrer Farbe ausblendet.
    let tint = new Uint8Array(0);
    let px = new Float32Array(0);
    let py = new Float32Array(0);
    let life = new Float32Array(0);
    // Pro gezeichnetem Platz: lebte vorher / lebt jetzt / Farbe (nach Parallaxe-Verschiebung).
    let was = new Uint8Array(0);
    let is = new Uint8Array(0);
    let hue = new Uint8Array(0);
    let lastStep = 0;

    const randomCell = () => (Math.random() < 0.5 ? 1 : 2);

    const resize = () => {
      // Unscharf gezeichnet — volle Pixeldichte wäre verschwendete Füllrate.
      w = canvas.width = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.height = h;
      // Die ferne Kante schrumpft perspektivisch — dort braucht es mehr Spalten.
      cols = Math.ceil((w * 1.9) / CELL);
      rows = Math.ceil((h * 2) / CELL);
      cells = new Uint8Array(cols * rows).map(() => (Math.random() < 0.25 ? randomCell() : 0));
      prev = cells.slice();
      tint = cells.slice();
      px = new Float32Array(cols * rows);
      py = new Float32Array(cols * rows);
      life = new Float32Array(cols * rows);
      was = new Uint8Array(cols * rows);
      is = new Uint8Array(cols * rows);
      hue = new Uint8Array(cols * rows);
    };

    const step = () => {
      const next = new Uint8Array(cols * rows);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let n = 0;
          let market = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (!dx && !dy) continue;
              const c = cells[((y + dy + rows) % rows) * cols + ((x + dx + cols) % cols)];
              if (c) n++;
              if (c === 2) market++;
            }
          }
          const i = y * cols + x;
          if (cells[i]) next[i] = n === 2 || n === 3 ? cells[i] : 0;
          else if (n === 3) next[i] = market >= 2 ? 2 : 1;
          else if (Math.random() < NOISE) next[i] = randomCell();
        }
      }
      prev = cells;
      cells = next;
      for (let i = 0; i < cells.length; i++) if (cells[i]) tint[i] = cells[i];
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      loop.redraw();
    });
    ro.observe(canvas);

    const tc = Math.cos(TILT);
    const ts = Math.sin(TILT);

    const draw = ({ reducedMotion, now }: { reducedMotion: boolean; now: number }) => {
      if (!reducedMotion && now - lastStep > GENERATION_MS) {
        step();
        lastStep = now;
      }
      // Weicher Übergang prev → cells über die ganze Generationsdauer.
      const p = reducedMotion ? 1 : Math.min(1, (now - lastStep) / GENERATION_MS);
      const ease = p * p * (3 - 2 * p);

      // Parallaxe: Die Ebene läuft langsamer als der Inhalt nach hinten weg.
      // Ganze Zeilen rotieren durch das (toroidale) Feld, nur der Rest
      // verschiebt die Geometrie — so ist das Feld in beide Richtungen endlos.
      const shift = window.scrollY * PARALLAX;
      const rowShift = Math.floor(shift / CELL);
      const frac = shift - rowShift * CELL;

      // Ebene um die horizontale Achse kippen; oben liegt hinten.
      const cx = w / 2;
      const cy = h * 0.55;
      for (let j = 0; j < rows; j++) {
        // Mehr Zeilen nach hinten (oben) als nach vorn, die Ferne staucht sie.
        const Y = (j - rows * 0.6) * CELL - frac;
        const f = DISTANCE / (DISTANCE - Y * ts);
        const src = (((j + rowShift) % rows) + rows) % rows;
        for (let i = 0; i < cols; i++) {
          const d = j * cols + i;
          const sIdx = src * cols + i;
          was[d] = prev[sIdx] ? 1 : 0;
          is[d] = cells[sIdx] ? 1 : 0;
          hue[d] = tint[sIdx];
          const l = was[d] + (is[d] - was[d]) * ease;
          life[d] = l;
          px[d] = cx + (i - cols / 2) * CELL * f;
          py[d] = cy + (Y * tc - l * LIFT) * f;
        }
      }

      ctx.clearRect(0, 0, w, h);

      // Ruhendes Gitter: ein einziger Pfad, sonst kostet jede Linie einen Strich.
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(colors.muted, 0.3);
      ctx.beginPath();
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const d = j * cols + i;
          if (i + 1 < cols) {
            ctx.moveTo(px[d], py[d]);
            ctx.lineTo(px[d + 1], py[d + 1]);
          }
          if (j + 1 < rows) {
            ctx.moveTo(px[d], py[d]);
            ctx.lineTo(px[d + cols], py[d + cols]);
          }
        }
      }
      ctx.stroke();

      // Bindungen wachsen: Eine neue Bindung schiebt sich vom schon lebenden
      // Ende zum neuen hinüber (oder von der Mitte aus, wenn beide neu sind);
      // eine sterbende zieht sich zum überlebenden Ende zurück.
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const a = j * cols + i;
          if (!was[a] && !is[a]) continue;
          for (const [di, dj] of NEIGHBORS) {
            const ni = i + di;
            const nj = j + dj;
            if (ni >= cols || nj < 0 || nj >= rows) continue;
            const b = nj * cols + ni;
            const before = was[a] && was[b];
            const after = is[a] && is[b];
            if (!before && !after) continue;

            let len = 1;
            // Anker: 1 = a, 0 = b, 0.5 = Mitte.
            let anchor = 0.5;
            if (!before) {
              len = ease;
              anchor = was[a] ? 1 : was[b] ? 0 : 0.5;
            } else if (!after) {
              len = 1 - ease;
              anchor = is[a] ? 1 : is[b] ? 0 : 0.5;
            }
            if (len < 0.01) continue;
            // Punkt entlang a→b bei Parameter s ∈ [0, 1].
            const at = (s: number): [number, number] => [px[a] + (px[b] - px[a]) * s, py[a] + (py[b] - py[a]) * s];
            const s0 = anchor === 1 ? 0 : anchor === 0 ? 1 - len : 0.5 - len / 2;
            const [x0, y0] = at(s0);
            const [x1, y1] = at(s0 + len);
            ctx.strokeStyle = rgba(hue[a] === 2 ? colors.market : colors.physics, 0.8);
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.stroke();
          }
        }
      }

      // Knoten.
      for (let d = 0; d < life.length; d++) {
        if (life[d] < 0.02) continue;
        ctx.fillStyle = rgba(hue[d] === 2 ? colors.market : colors.physics, life[d]);
        ctx.beginPath();
        ctx.arc(px[d], py[d], 1.5 + 3 * life[d], 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // ponytail: 60 fps nur für flüssige Scroll-Parallaxe; bei Last 30 fps + Redraw im scroll-Handler.
    const loop = createRenderLoop(canvas, draw, { fps: 60 });

    return () => {
      loop.stop();
      ro.disconnect();
    };
  }, [appearance]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      // Hoher Kontrast (Footer-Schalter) blendet das Feld ganz aus; die
      // Render-Schleife pausiert dann von selbst (nicht mehr im Viewport).
      className={`pointer-events-none fixed inset-0 -z-10 block size-full transition-[opacity,filter] duration-700 [html[data-high-contrast]_&]:hidden ${
        textPage ? "opacity-[0.04] blur-[12px]" : "opacity-[0.11] blur-[3px]"
      }`}
    />
  );
}
