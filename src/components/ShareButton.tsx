"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
    <Button variant="soft" color="neutral" onClick={share} className={className}>
      {copied ? <Check size={16} aria-hidden="true" /> : <Share2 size={16} aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Link kopiert" : "Teilen"}</span>
    </Button>
  );
}
