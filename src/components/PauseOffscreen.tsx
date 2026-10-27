"use client";

import { useEffect, useRef } from "react";

/**
 * Hält die SMIL-Animationen des enthaltenen SVG an, solange es nicht im Bild
 * ist — sie liefen sonst auch weggescrollt in jedem Bild weiter. Das SVG
 * selbst bleibt serverseitig gerendert.
 */
export default function PauseOffscreen({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;
    const observer = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations(),
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
