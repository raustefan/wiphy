// components/DoubleSlitExperiment.tsx
"use client";

import { useEffect, useRef } from "react";
import { Flex, Text } from "@radix-ui/themes";

const WAVE_COLOR = "99, 145, 255"; // blau — Weg unbekannt, Interferenz
const PARTICLE_COLOR = "245, 166, 35"; // amber — Weg bekannt, kein Interferenzmuster

type Vec3 = { x: number; y: number; z: number };

// Weltgeometrie (beliebige Einheiten). z wächst von der Quelle zum Schirm.
const SOURCE: Vec3 = { x: 0, y: 0, z: -1.15 };
const Z_WALL = -0.1;
const Z_SCREEN = 1.05;
const WALL_HALF_W = 1.0;
const WALL_HALF_H = 0.6;
const SCREEN_HALF_H = WALL_HALF_H * 1.05;
const SLIT_SEP = 0.4; // D: Abstand der Spaltmitten
const SLIT_WIDTH = 0.045; // a: Spaltbreite
const SLIT1_X = -SLIT_SEP / 2;
const SLIT2_X = SLIT_SEP / 2;

// sinc²-Beugung: K bündelt π·(Spaltgröße)/λ·L auf die (vereinfachten) Weltkoordinaten.
const K_FRINGE = 78 * SLIT_SEP;
const K_ENVELOPE = 78 * SLIT_WIDTH;
const SCREEN_HALF_RANGE = WALL_HALF_W * 1.05;
const NUM_BUCKETS = 48;

function sinc(x: number) {
  return x === 0 ? 1 : Math.sin(x) / x;
}

/** Doppelspalt-Interferenz: cos²-Streifen unter sinc²-Einzelspalt-Hüllkurve. */
function sampleInterference() {
  for (let i = 0; i < 60; i++) {
    const x = (Math.random() * 2 - 1) * SCREEN_HALF_RANGE;
    const s = sinc(K_ENVELOPE * x);
    const intensity = Math.cos(K_FRINGE * x) ** 2 * s * s;
    if (Math.random() < intensity) return x;
  }
  return 0;
}

/** Bekannter Weg: reine Einzelspalt-Beugung (sinc²) um den gewählten Spalt, keine Streifen. */
function sampleSingleSlit(centerX: number) {
  const half = SCREEN_HALF_RANGE - Math.abs(centerX);
  for (let i = 0; i < 60; i++) {
    const dx = (Math.random() * 2 - 1) * half;
    const s = sinc(K_ENVELOPE * dx);
    if (Math.random() < s * s) return centerX + dx;
  }
  return centerX;
}

type Particle = {
  slitX: number;
  pathKnown: boolean;
  targetX: number;
  progress: number;
  yJitter: number;
};

/** Dreht einen Weltpunkt um die Kamera (Maus = Kamera) und projiziert ihn auf den Canvas. */
function project(
  p: Vec3,
  yaw: number,
  pitch: number,
  camDist: number,
  fov: number,
  cx: number,
  cy: number,
  scalePx: number,
) {
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const x1 = p.x * cosY + p.z * sinY;
  const z1 = -p.x * sinY + p.z * cosY;

  const cosX = Math.cos(pitch);
  const sinX = Math.sin(pitch);
  const y2 = p.y * cosX - z1 * sinX;
  const z2 = p.y * sinX + z1 * cosX;

  const zCam = z2 + camDist;
  const k = fov / (fov + zCam);
  return { x: cx + x1 * scalePx * k, y: cy - y2 * scalePx * k, k };
}

export default function DoubleSlitExperiment() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let t = 0;

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

    const setPointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      pointer.current.y = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
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

    const buckets = new Array(NUM_BUCKETS).fill(0);
    let flying: Particle[] = [];
    let spawnCooldown = 0;
    let yaw = 0;
    let pitch = 0;
    let measurement = 0; // 0 = nicht beobachtet, 1 = an der Wand / voll beobachtet

    const draw = () => {
      t += reduce ? 0.003 : 0.006;
      ctx.clearRect(0, 0, w, h);

      // Maus = Kamera: dreht die Szene; ohne Maus driftet die Kamera sanft von selbst.
      const maxYaw = 0.85; // Stärkerer Seitenwinkel für bessere Seitenansicht
      const maxPitch = 0.25;
      const yawTarget = pointer.current.active
        ? (pointer.current.x - 0.5) * 2 * maxYaw
        : Math.sin(t * 0.35) * maxYaw * 0.7;
      const pitchTarget = pointer.current.active
        ? (pointer.current.y - 0.5) * 2 * maxPitch
        : Math.sin(t * 0.27 + 1) * maxPitch * 0.4;
      yaw += (yawTarget - yaw) * 0.06;
      pitch += (pitchTarget - pitch) * 0.06;

      // Steht die Kamera "an der Wand" (nah an der Bildmitte)? -> Messung, Interferenz bricht zusammen.
      const centerDist = pointer.current.active
        ? Math.hypot(pointer.current.x - 0.5, pointer.current.y - 0.5)
        : 1;
      const measureTarget = pointer.current.active
        ? Math.max(0, 1 - centerDist / 0.3)
        : 0;
      measurement += (measureTarget - measurement) * 0.08;

      // Bucket-Decay: Wenn Messung hoch ist, lasse das aktuelle Muster verfallen
      // und überschreibe es mit dem klassischen Muster (zwei Spalte statt Interferenz)
      if (measurement > 0.5) {
        const decayFactor = 0.88; // Aggresives Verblassen, um alte Interferenz zu entfernen
        for (let i = 0; i < NUM_BUCKETS; i++) {
          buckets[i] *= decayFactor;
        }
      }

      const cx = w / 2;
      const cy = h / 2 + 6;
      const camDist = 1.1;
      const fov = 2.6;
      const scalePx = Math.min(w, h) * 0.62 * (1 + measurement * 0.18);

      const proj = (p: Vec3) => project(p, yaw, pitch, camDist, fov, cx, cy, scalePx);

      // --- Beschriftung ---
      ctx.font = "11px var(--font-mono, monospace)";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "rgba(148, 163, 184, 0.85)";
      ctx.fillText(
        measurement > 0.5
          ? "Kamera an der Wand — Weg bekannt"
          : `Kamera frei — Messwahrscheinlichkeit ${Math.round(measurement * 100)}%`,
        16,
        18,
      );

      // --- Barriere: drei Platten mit zwei Spaltöffnungen ---
      const slabs: Array<[number, number]> = [
        [-WALL_HALF_W, SLIT1_X - SLIT_WIDTH],
        [SLIT1_X + SLIT_WIDTH, SLIT2_X - SLIT_WIDTH],
        [SLIT2_X + SLIT_WIDTH, WALL_HALF_W],
      ];
      slabs.forEach(([x0, x1]) => {
        const corners = [
          proj({ x: x0, y: -WALL_HALF_H, z: Z_WALL }),
          proj({ x: x1, y: -WALL_HALF_H, z: Z_WALL }),
          proj({ x: x1, y: WALL_HALF_H, z: Z_WALL }),
          proj({ x: x0, y: WALL_HALF_H, z: Z_WALL }),
        ];
        ctx.beginPath();
        ctx.moveTo(corners[0].x, corners[0].y);
        for (let i = 1; i < corners.length; i++) ctx.lineTo(corners[i].x, corners[i].y);
        ctx.closePath();
        ctx.fillStyle = "rgba(148, 163, 184, 0.22)";
        ctx.fill();
        ctx.strokeStyle = "rgba(148, 163, 184, 0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Fokus-Glühen auf der Wand, wenn die Kamera dort steht (= Messung).
      if (measurement > 0.03) {
        const wallCenter = proj({ x: 0, y: 0, z: Z_WALL });
        const glow = ctx.createRadialGradient(
          wallCenter.x, wallCenter.y, 0,
          wallCenter.x, wallCenter.y, 120 * wallCenter.k,
        );
        glow.addColorStop(0, `rgba(${PARTICLE_COLOR}, ${0.25 * measurement})`);
        glow.addColorStop(1, `rgba(${PARTICLE_COLOR}, 0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);
      }

      // --- Quelle ---
      const src = proj(SOURCE);
      ctx.beginPath();
      ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
      ctx.arc(src.x, src.y, 3 * src.k, 0, Math.PI * 2);
      ctx.fill();

      // --- neue Teilchen spawnen (optimiert: weniger bei hoher Messung) ---
      spawnCooldown -= 1;
      const spawnInterval = reduce ? 9 : (measurement > 0.7 ? 6 : 4);
      if (spawnCooldown <= 0) {
        spawnCooldown = spawnInterval;
        const useSlit1 = Math.random() < 0.5;
        const slitX = useSlit1 ? SLIT1_X : SLIT2_X;
        const pathKnown = Math.random() < measurement;
        const targetX = pathKnown ? sampleSingleSlit(slitX) : sampleInterference();
        flying.push({
          slitX,
          pathKnown,
          targetX,
          progress: 0,
          yJitter: (Math.random() - 0.5) * WALL_HALF_H * 0.5,
        });
      }

      // --- fliegende Teilchen bewegen + zeichnen (mit Batching) ---
      const tWall = (Z_WALL - SOURCE.z) / (Z_SCREEN - SOURCE.z);
      const speed = reduce ? 0.012 : 0.02;
      const next: Particle[] = [];

      // Batch: Zeichnen starten
      ctx.fillStyle = `rgba(${WAVE_COLOR}, 0.9)`;
      let lastColor = WAVE_COLOR;

      for (const p of flying) {
        p.progress += speed;
        if (p.progress >= 1) {
          const clamped = Math.max(-SCREEN_HALF_RANGE, Math.min(SCREEN_HALF_RANGE, p.targetX));
          const idx = Math.min(
            NUM_BUCKETS - 1,
            Math.max(0, Math.floor(((clamped + SCREEN_HALF_RANGE) / (2 * SCREEN_HALF_RANGE)) * NUM_BUCKETS)),
          );
          buckets[idx] += 1;
          continue;
        }
        next.push(p);

        let world: Vec3;
        if (p.progress < tWall) {
          const seg = p.progress / tWall;
          const throughX = p.pathKnown ? p.slitX : 0;
          world = {
            x: SOURCE.x + (throughX - SOURCE.x) * seg,
            y: SOURCE.y + p.yJitter * seg,
            z: SOURCE.z + (Z_WALL - SOURCE.z) * seg,
          };
        } else {
          const seg = (p.progress - tWall) / (1 - tWall);
          const fromX = p.pathKnown ? p.slitX : 0;
          world = {
            x: fromX + (p.targetX - fromX) * seg,
            y: p.yJitter,
            z: Z_WALL + (Z_SCREEN - Z_WALL) * seg,
          };
        }

        const sp = proj(world);
        const color = p.pathKnown ? PARTICLE_COLOR : WAVE_COLOR;

        // Färb-Wechsel nur bei Bedarf
        if (color !== lastColor) {
          ctx.fillStyle = `rgba(${color}, 0.9)`;
          lastColor = color;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, Math.max(1.2, 2.6 * sp.k), 0, Math.PI * 2);
        ctx.fill();
      }
      flying = next;

      // --- Schirm: Basisebene + Heatmap-Streifen aus den akkumulierten Treffern ---
      const screenCorners = [
        proj({ x: -WALL_HALF_W * 1.05, y: -SCREEN_HALF_H, z: Z_SCREEN }),
        proj({ x: WALL_HALF_W * 1.05, y: -SCREEN_HALF_H, z: Z_SCREEN }),
        proj({ x: WALL_HALF_W * 1.05, y: SCREEN_HALF_H, z: Z_SCREEN }),
        proj({ x: -WALL_HALF_W * 1.05, y: SCREEN_HALF_H, z: Z_SCREEN }),
      ];
      ctx.beginPath();
      ctx.moveTo(screenCorners[0].x, screenCorners[0].y);
      for (let i = 1; i < screenCorners.length; i++) ctx.lineTo(screenCorners[i].x, screenCorners[i].y);
      ctx.closePath();
      ctx.fillStyle = "rgba(148, 163, 184, 0.06)";
      ctx.fill();
      ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Heatmap-Rendering: Cache maxCount statt jedesmal zu berechnen
      const maxCount = Math.max(1, ...buckets);
      const anyPathKnownRecently = measurement > 0.5;
      const heatColor = anyPathKnownRecently ? PARTICLE_COLOR : WAVE_COLOR;

      // Early exit: Wenn maxCount zu klein, zeichne gar nicht
      if (maxCount > 0.5) {
        for (let i = 0; i < NUM_BUCKETS; i++) {
          const alpha = (buckets[i] / maxCount) * 0.85;
          if (alpha < 0.02) continue;

          const x0 = -SCREEN_HALF_RANGE + (i / NUM_BUCKETS) * 2 * SCREEN_HALF_RANGE;
          const x1 = -SCREEN_HALF_RANGE + ((i + 1) / NUM_BUCKETS) * 2 * SCREEN_HALF_RANGE;
          const strip = [
            proj({ x: x0, y: -SCREEN_HALF_H, z: Z_SCREEN }),
            proj({ x: x1, y: -SCREEN_HALF_H, z: Z_SCREEN }),
            proj({ x: x1, y: SCREEN_HALF_H, z: Z_SCREEN }),
            proj({ x: x0, y: SCREEN_HALF_H, z: Z_SCREEN }),
          ];
          ctx.beginPath();
          ctx.moveTo(strip[0].x, strip[0].y);
          for (let j = 1; j < strip.length; j++) ctx.lineTo(strip[j].x, strip[j].y);
          ctx.closePath();
          ctx.fillStyle = `rgba(${heatColor}, ${alpha})`;
          ctx.fill();
        }
      }

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
  }, []);

  return (
    <Flex direction="column" gap="3">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "280px",
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

      <Text size="1" color="gray" style={{ lineHeight: 1.5 }}>
        Bewege den Mauszeiger — er ist die Kamera. Aus der Distanz baut sich ein
        echtes Interferenzmuster auf; steuere die Kamera direkt an die Wand, und
        das Muster bricht zusammen und wird durch das klassische Muster ersetzt.
      </Text>
    </Flex>
  );
}
