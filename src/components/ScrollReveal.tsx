"use client";

import { useEffect } from "react";

/**
 * Lässt `[data-reveal]`-Elemente beim Hereinscrollen einfliegen (Stile in
 * globals.css). Ohne JavaScript und bei reduzierter Bewegung bleibt alles
 * sofort sichtbar. Was beim Laden schon im Bild ist, wird nicht erst
 * versteckt — sonst blitzte es nach der Hydration kurz weg.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of document.querySelectorAll("[data-reveal]")) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("revealed");
      else observer.observe(el);
    }
    // Als Attribut statt Klasse: Reacts `className` am <html> bleibt unberührt.
    document.documentElement.dataset.revealReady = "";
    return () => {
      observer.disconnect();
      delete document.documentElement.dataset.revealReady;
    };
  }, []);

  return null;
}
