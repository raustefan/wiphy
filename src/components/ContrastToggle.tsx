"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ContrastIcon } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";

/** Gleicher Mechanismus wie die Erscheinung: localStorage + Attribut an <html>, gesetzt vom Inline-Skript im Layout. */
const STORAGE_KEY = "high-contrast";

export default function ContrastToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- einmaliger Abgleich mit dem vom Inline-Skript gesetzten Attribut
    setOn(document.documentElement.hasAttribute("data-high-contrast"));
  }, []);

  const toggle = () => {
    const next = !on;
    document.documentElement.toggleAttribute("data-high-contrast", next);
    if (next) window.localStorage.setItem(STORAGE_KEY, "1");
    else window.localStorage.removeItem(STORAGE_KEY);
    setOn(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      title="Animationen und Hintergrundmuster aus- oder einblenden"
      className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-sm px-2 text-[13px] text-muted transition-colors hover:text-physics focus-visible:outline-2 focus-visible:outline-physics aria-pressed:text-physics"
    >
      <HugeiconsIcon icon={ContrastIcon} size={11} aria-hidden="true" />
      <span>Hoher Kontrast</span>
    </button>
  );
}
