// components/RandomWalkField.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Badge, Flex, Text } from "@radix-ui/themes";

type Walker = {
  value: number;
  history: number[];
  baseVol: number;
  hue: string;
};

const COLORS = [
  "99, 145, 255", // blue (accent)
  "148, 163, 184", // gray
  "129, 199, 199", // teal-ish
];

export default function RandomWalkField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paths, setPaths] = useState(3);

  const pointer = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let tick = 0;

    const HISTORY_LEN = 340;

    let walkers: Walker[] = [];
    const seed = () => {
      walkers = Array.from({ length: paths }, (_, i) => ({
        value: 0,
        history: Array(HISTORY_LEN).fill(0),
        baseVol: 0.55 + i * 0.18,
        hue: COLORS[i % COLORS.length],
      }));
    };
    seed();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pointer-Handling (Maus + Touch)
    const setPointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = (clientX - rect.left) / rect.width;
      pointer.current.y = (clientY - rect.top) / rect.height;
      pointer.current.active = true;
    };

    const onMouseMove = (e: MouseEvent) => setPointer(e.clientX, e.clientY);
    const onMouseLeave = () => {
      pointer.current.active = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      setPointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => {
      pointer.current.active = false;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("touchcancel", onTouchEnd);

    // sanftes Nachlaufen der "Volatilitätswolke"
    let volBoost = 0;

    const step = () => {
      tick++;
      const stepsPerFrame = reduce ? 1 : 2 /100;

      for (let s = 0; s < stepsPerFrame; s++) {
        walkers.forEach((wk, wi) => {
          // Distanz des letzten Punkts zum Pointer (nur x-Achse zählt für Nähe genügt)
          const idx = HISTORY_LEN - 1;
          const xNorm = idx / (HISTORY_LEN - 1);
          let localVol = wk.baseVol;

          if (pointer.current.active) {
            const dx = xNorm - pointer.current.x;
            const dy = 0.5 - pointer.current.y; // y beeinflusst Stärke leicht
            const dist = Math.hypot(dx, dy * 0.6);
            const influence = Math.max(0, 1 - dist * 2.2);
            localVol += influence * 2.4;
          }

          const drift = -0.015 * wk.value; // leichte Mean-Reversion, damit's nicht explodiert
          const shock = (Math.random() - 0.5) * 0.16 * localVol;
          wk.value += drift + shock;
          wk.value = Math.max(-3.2, Math.min(3.2, wk.value));

          wk.history.push(wk.value);
          if (wk.history.length > HISTORY_LEN) wk.history.shift();
        });
      }

      // globaler "Nervositäts"-Schimmer, folgt dem Pointer sanft
      const targetBoost = pointer.current.active ? 1 : 0;
      volBoost += (targetBoost - volBoost) * 0.05;
    };

    const draw = () => {
      step();
      ctx.clearRect(0, 0, w, h);

      const midY = h * 0.55;
      const ampScale = h * 0.52;

      // --- Hover-Glow (Volatilitätszone) ---
      if (pointer.current.active) {
        const px = pointer.current.x * w;
        const py = pointer.current.y * h;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, w * 0.22);
        grad.addColorStop(0, `rgba(99, 145, 255, ${0.14 * volBoost})`);
        grad.addColorStop(1, "rgba(99, 145, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // --- Nulllinie ---
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // --- Walker-Linien ---
      walkers.forEach((wk) => {
        ctx.beginPath();
        wk.history.forEach((v, i) => {
          const px = (i / (wk.history.length - 1)) * w;
          const py = midY - v * ampScale * 0.4;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        });
        ctx.strokeStyle = `rgba(${wk.hue}, 0.85)`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Endpunkt-Marker
        const lastV = wk.history[wk.history.length - 1];
        const lastPy = midY - lastV * ampScale * 0.4;
        ctx.beginPath();
        ctx.arc(w - 3, lastPy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${wk.hue}, 1)`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [paths]);

  return (
    <Flex direction="column" gap="3">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "260px",
          borderRadius: "var(--radius-4)",
          background: "var(--gray-a2)",
          border: "1px solid var(--gray-a5)",
          overflow: "hidden",
          touchAction: "none",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>

      <Flex justify="between" align="center" wrap="wrap" gap="3">
        <Text size="1" color="gray">
          Geometrische Brownsche Bewegung — bewege den Zeiger (oder tippe), um
          lokal die Volatilität zu erhöhen
        </Text>
        <Flex gap="2">
          {[1, 2, 3, 4].map((n) => (
            <Badge
              key={n}
              variant={n === paths ? "solid" : "surface"}
              color="blue"
              size="1"
              radius="full"
              style={{ cursor: "pointer" }}
              onClick={() => setPaths(n)}
            >
              {n} Pfad{n > 1 ? "e" : ""}
            </Badge>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}