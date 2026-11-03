"use client";

import { useEffect, useRef, useState } from "react";
import { CRASH_SPEED, parkedHeli, stepHeli, type HeliMode } from "@/lib/heliFlight";

const KEYS = ["KeyW", "KeyA", "KeyS", "KeyD"];
const HINTS: Record<HeliMode, string> = {
  parked: "",
  manual: "W A S D zum Steuern · Esc oder Klick: zurück zur Basis",
  return: "Zurück zur Basis …",
  crash: "",
  down: "Esc räumt die Seite auf, dann steht er wieder auf der Basis",
};
const HIT = 12; // px um den Rumpf, die schon als Treffer zählen

/** Liegt der Bildschirmpunkt auf Text oder Knopf? Bei Text zählen die Zeilen, nicht der breite Block um sie. */
function hitsContent(x: number, y: number) {
  const range = document.createRange();
  for (const el of document.querySelectorAll("[data-gravity-body]")) {
    range.selectNodeContents(el);
    const boxes = el.matches("a") ? [el.getBoundingClientRect()] : range.getClientRects();
    for (const b of boxes) {
      if (x > b.left - HIT && x < b.right + HIT && y > b.top - HIT && y < b.bottom + HIT) return true;
    }
  }
  return false;
}

/**
 * Christoph 22 auf seiner Basis: startet erst per Klick und wird dann mit WASD
 * gesteuert, ein weiterer Klick oder Esc schickt ihn zurück (Flugmodell in
 * src/lib/heliFlight.ts). Zu schnell gegen Text oder Knöpfe stürzt er ab und
 * löst den Schwerkraft-Effekt aus (GravityEasterEgg); ist die Seite wieder
 * aufgeräumt, steht er auf der Basis. Liegt über dem Text und ohne die Ausblendung des
 * Plans, sonst ließe er sich an der Basis weder sehen noch anklicken. Die
 * Schleife läuft nur im Flug und solange der Hero im Bild ist.
 */
export default function Helicopter({
  base,
  viewBox,
  className,
}: {
  base: readonly number[];
  viewBox: string;
  className: string;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const body = useRef<SVGGElement>(null);
  const blades = useRef<SVGGElement>(null);
  const heli = useRef(parkedHeli(base));
  const [mode, setMode] = useState<HeliMode>("parked");
  const flying = mode === "manual" || mode === "return" || mode === "crash";
  const wrecked = mode === "crash" || mode === "down";

  const draw = () => {
    const h = heli.current;
    body.current?.setAttribute(
      "transform",
      `translate(${h.x} ${h.y}) rotate(${(h.heading * 180) / Math.PI}) scale(${1 + 0.4 * h.alt})`,
    );
    blades.current?.setAttribute("transform", `rotate(${(h.blade * 180) / Math.PI})`);
  };

  const toggle = () => {
    if (heli.current.mode === "crash" || heli.current.mode === "down") return;
    const next = heli.current.mode === "manual" ? "return" : "manual";
    heli.current.mode = next;
    setMode(next);
  };

  useEffect(() => {
    const root = svg.current;
    if (!flying || !root) return;
    const held = new Set<string>();
    const h = heli.current;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape" && h.mode === "manual") toggle();
      if (!KEYS.includes(e.code) || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target instanceof Element && e.target.closest("input, textarea, select, [contenteditable]")) return;
      held.add(e.code);
    };
    const onKeyUp = (e: KeyboardEvent) => held.delete(e.code);
    // Beim Fensterwechsel kommt kein keyup mehr, die Taste klemmte sonst.
    const release = () => held.clear();

    let raf = 0;
    let last = 0;
    const frame = (now: number) => {
      const stick = {
        thrust: Number(held.has("KeyW")) - Number(held.has("KeyS")),
        turn: Number(held.has("KeyD")) - Number(held.has("KeyA")),
      };
      // Sichtbarer Ausschnitt in Plan-Metern: der Plan ist per `slice` beschnitten.
      const box = root.getBoundingClientRect();
      const toPlan = root.getScreenCTM()?.inverse();
      const a = new DOMPoint(box.left, box.top).matrixTransform(toPlan);
      const b = new DOMPoint(box.right, box.bottom).matrixTransform(toPlan);
      const bounds = { left: a.x + 30, top: a.y + 30, right: b.x - 30, bottom: b.y - 30 };

      // Nach einer Pause (Tab im Hintergrund) nicht in einem Satz weiterfliegen.
      stepHeli(h, stick, Math.min(now - last, 50) / 1000, base, bounds);
      last = now;
      draw();

      // Läuft der Schwerkraft-Effekt schon, gibt es nichts mehr zum Anstoßen.
      if (h.mode === "manual" && Math.abs(h.speed) > CRASH_SPEED && !("gravityActive" in document.documentElement.dataset)) {
        const at = new DOMPoint(h.x, h.y).matrixTransform(root.getScreenCTM() ?? undefined);
        if (hitsContent(at.x, at.y)) {
          h.mode = "crash";
          setMode("crash");
          window.dispatchEvent(new CustomEvent("wiphy:gravity-collapse", { detail: { x: at.x, y: at.y } }));
        }
      }

      if (h.mode === "parked" || h.mode === "down") setMode(h.mode);
      else raf = requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (!entry.isIntersecting) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    });
    observer.observe(root);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", release);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", release);
    };
  }, [flying, base]);

  // Die Seite ist wieder aufgeräumt — auch wenn das schon mitten im Fall geschieht.
  useEffect(() => {
    if (!wrecked) return;
    const respawn = () => {
      Object.assign(heli.current, parkedHeli(base));
      draw();
      setMode("parked");
    };
    window.addEventListener("wiphy:gravity-restored", respawn);
    return () => window.removeEventListener("wiphy:gravity-restored", respawn);
  }, [wrecked, base]);

  return (
    <>
      <svg ref={svg} viewBox={viewBox} preserveAspectRatio="xMidYMid slice" className={`plan plan-heli-layer ${className}`}>
        <g
          ref={body}
          className="plan-heli"
          data-flying={flying || undefined}
          visibility={mode === "down" ? "hidden" : undefined}
          role="button"
          tabIndex={0}
          transform={`translate(${base[0]} ${base[1]})`}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key !== "Enter" && e.key !== " ") return;
            e.preventDefault();
            toggle();
          }}
        >
          <title>{mode === "manual" ? "Christoph 22 zurück zur Basis schicken" : "Christoph 22 starten"}</title>
          {/* Trefferfläche: der Umriss allein wäre zum Klicken zu klein. */}
          <circle r={36} />
          <path d="M-10 0H-30M-30-5V5" />
          <rect x={-13} y={-5.5} width={27} height={11} rx={5.5} />
          <g ref={blades} className="plan-heli-rotor">
            <path d="M-19-19 19 19M-19 19 19-19" />
          </g>
        </g>
      </svg>
      <p
        role="status"
        className="plan-heli-layer pointer-events-none absolute top-3 left-1/2 z-10 -translate-x-1/2 text-center text-sm text-muted"
      >
        {HINTS[mode]}
      </p>
    </>
  );
}
