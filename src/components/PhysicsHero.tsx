// components/PhysicsHero.tsx
"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; z: number; ph: number };

export default function PhysicsHero() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = ref.current;
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

    const isMobile = () => w < 640;
    const N = () => (isMobile() ? 32 : 60);

    let pts: P[] = [];
    const seed = () => {
      pts = Array.from({ length: N() }, () => ({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        z: Math.random() * 2 - 1,
        ph: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouse.current.active = true;
    };
    const onLeave = () => {
      mouse.current.active = false;
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const accent = "99, 145, 255";
    let t = 0;

    // gedämpfte Trägheit für Maus-Einfluss -> ruhige Bewegung
    let tiltX = 0;
    let tiltY = 0;

    const draw = () => {
      t += reduce ? 0.0008 : 0.0014; // deutlich langsamer als vorher
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h) * 0.4;
      const fov = 2.8;

      // sanftes Nachlaufen (easing) Richtung Mausposition
      const targetX = mouse.current.active ? mouse.current.y * 0.35 : 0;
      const targetY = mouse.current.active ? mouse.current.x * 0.35 : 0;
      tiltX += (targetX - tiltX) * 0.03;
      tiltY += (targetY - tiltY) * 0.03;

      const cosY = Math.cos(t + tiltY);
      const sinY = Math.sin(t + tiltY);
      const cosX = Math.cos(t * 0.5 + tiltX);
      const sinX = Math.sin(t * 0.5 + tiltX);

      const proj = pts.map((p) => {
        const osc = 1 + Math.sin(t * 1.2 + p.ph) * 0.05;
        const x0 = p.x * osc;
        const y0 = p.y * osc;
        const z0 = p.z * osc;

        const x1 = x0 * cosY - z0 * sinY;
        const z1 = x0 * sinY + z0 * cosY;
        const y1 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        const k = fov / (fov + z2);
        return { sx: cx + x1 * scale * k, sy: cy + y1 * scale * k, k };
      });

      const maxD = isMobile() ? 65 : 85;
      ctx.lineWidth = 1;
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const dx = proj[i].sx - proj[j].sx;
          const dy = proj[i].sy - proj[j].sy;
          const d = Math.hypot(dx, dy);
          if (d > maxD) continue;
          ctx.strokeStyle = `rgba(${accent}, ${(1 - d / maxD) * 0.28})`;
          ctx.beginPath();
          ctx.moveTo(proj[i].sx, proj[i].sy);
          ctx.lineTo(proj[j].sx, proj[j].sy);
          ctx.stroke();
        }
      }

      proj.forEach((p) => {
        const r = Math.max(0.6, p.k * (isMobile() ? 1.5 : 2));
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent}, ${Math.min(1, p.k * 0.7)})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        opacity: 0.8,
      }}
    />
  );
}