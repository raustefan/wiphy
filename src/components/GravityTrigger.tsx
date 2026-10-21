"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { SparklesIcon } from "@hugeicons/core-free-icons";



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
      className="group inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-sm px-2 text-[13px] text-muted transition-colors hover:text-physics focus-visible:outline-2 focus-visible:outline-physics"
    >
      <HugeiconsIcon icon={SparklesIcon} size={11} className="text-muted transition-transform group-hover:rotate-12 group-hover:text-physics" aria-hidden="true" />
      <span className="math">
        G = 6,674 · 10<sup>−11</sup> <span className="up">m³/(kg s²)</span>
      </span>
    </button>
  );
}
