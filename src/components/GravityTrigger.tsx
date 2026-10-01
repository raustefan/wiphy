"use client";

import { Sparkles } from "lucide-react";

export default function GravityTrigger() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wiphy:gravity-collapse"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Physik-Easter-Egg: Gravitationskonstante manipulieren ⚠️"
      aria-label="Gravitationskonstante manipulieren (Easter Egg)"
      className="group inline-flex items-center gap-1.5 rounded-full border border-line/60 bg-raised/50 px-2.5 py-0.5 font-mono text-[11px] text-faint transition-all hover:border-physics/40 hover:bg-physics/10 hover:text-physics focus-visible:outline-2 focus-visible:outline-physics"
    >
      <Sparkles
        size={11}
        className="text-faint transition-transform group-hover:rotate-12 group-hover:text-physics"
        aria-hidden="true"
      />
      <span>G = 6,674 · 10⁻¹¹ m³/(kg·s²)</span>
    </button>
  );
}
