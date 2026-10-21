"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Share02Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Öffnet auf dem Telefon den nativen Teilen-Dialog (WhatsApp, Mail, …). Wo es
 * den nicht gibt — meist Desktop-Firefox —, landet der Link in der Zwischenablage.
 */
export default function ShareButton({ title, className }: { title: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      // Abbrechen des Dialogs wirft AbortError — kein Fehler, nichts zu tun.
      await navigator.share({ title, url }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" onClick={share} className={cn("cta cta-line", className)}>
      {copied ? <HugeiconsIcon icon={Tick01Icon} size={16} aria-hidden="true" /> : <HugeiconsIcon icon={Share02Icon} size={16} aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Link kopiert" : "Teilen"}</span>
    </button>
  );
}
