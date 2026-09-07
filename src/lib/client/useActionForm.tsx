"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Callout } from "@/components/ui/Callout";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";
import { getRedirectTarget } from "@/lib/redirectError";
import type { ActionResult } from "@/lib/server/errors";

/**
 * Die Zustandsmaschine hinter jedem Formular: „läuft gerade“, „ist
 * fehlgeschlagen“, „Funktion vom Admin abgeschaltet“.
 *
 * Vorher stand dieselbe Abfolge in vierzehn Komponenten — jeweils mit eigenen
 * `useState`-Tripeln, eigener `res.ok`-Prüfung und leicht abweichender
 * Fehlerdarstellung. Ein abgeschaltetes Feature (`code: "FORBIDDEN"`) wurde
 * dabei mal als Dialog, mal als roter Text behandelt.
 *
 * Nur die *Serveraktion* darf hier durch — der Typ `ActionResult` erzwingt,
 * dass Aufrufer über `executeAction` gehen und Fehler nicht als Exception
 * durchs Formular fallen.
 */
export type ActionFormOptions<T> = {
  /**
   * Name der Funktion für den „ist deaktiviert“-Dialog. Ohne Angabe wird ein
   * `FORBIDDEN` wie jeder andere Fehler als Meldung angezeigt.
   */
  featureLabel?: string;
  onSuccess?: (data: T | undefined) => void;
  onError?: (message: string) => void;
};

export type ActionForm = {
  /** Direkt als `action={…}` eines `<form>` oder mit eigener FormData aufrufbar. */
  submit: (formData: FormData) => Promise<void>;
  /** Kurzform für Aktionen ohne Formular: `run({ id })` statt FormData-Gebastel. */
  run: (fields?: Record<string, string>) => Promise<void>;
  pending: boolean;
  error: string;
  setError: (message: string) => void;
  /** Ob der Server die Aktion als abgeschaltetes Feature abgelehnt hat. */
  featureDisabled: boolean;
  /** Fehlermeldung und Feature-Dialog, fertig gerendert. */
  feedback: ReactNode;
};

export function useActionForm<T>(
  action: (formData: FormData) => Promise<ActionResult<T>>,
  options: ActionFormOptions<T> = {},
): ActionForm {
  const { featureLabel, onSuccess, onError } = options;
  const router = useRouter();

  // Aktion und Callbacks über eine Ref: `submit` behält damit über Renders
  // hinweg dieselbe Identität und darf gefahrlos in einer Effekt-Abhängigkeit
  // stehen, ohne dass ein inline übergebener Callback eine Schleife auslöst.
  const latest = useRef({ action, onSuccess, onError, featureLabel });
  useEffect(() => {
    latest.current = { action, onSuccess, onError, featureLabel };
  });

  const [error, setError] = useState("");
  const [featureDisabled, setFeatureDisabled] = useState(false);
  // Eigenes Pending-Flag statt `useTransition`: das Ergebnis der Aktion wird
  // hier ausgewertet, nicht gerendert, und ein zusätzlicher Übergang um den
  // Aufruf herum bringt nichts außer einer weiteren Fehlerquelle.
  const [pending, setPending] = useState(false);

  // Das Promise löst auf, wenn die Aktion durch ist — Aufrufer können also
  // `await` nutzen. Ob es geklappt hat, sagen `onSuccess`/`onError`.
  const submit = useCallback(async (formData: FormData) => {
    const current = latest.current;
    setError("");
    setPending(true);

    let result: ActionResult<T>;
    try {
      result = await current.action(formData);
    } catch (thrown) {
      // Eine Serveraktion, die `redirect()` aufruft, liefert kein Ergebnis,
      // sondern wirft die Weiterleitung als Fehler bis hierher. Wer sie nur
      // durchreicht, verliert sie: es gibt an dieser Stelle nichts mehr, was
      // sie auffängt — das Formular bliebe stehen, obwohl die Aktion auf dem
      // Server längst durchgelaufen ist. Genau so verhielt sich die
      // Registrierung: Konto angelegt, Mail verschickt, Seite unverändert.
      // Also wird das Ziel aus dem Fehler gelesen und selbst angesteuert.
      const target = getRedirectTarget(thrown);
      if (target) {
        if (target.kind === "replace") router.replace(target.url);
        else router.push(target.url);
        // `pending` bleibt bewusst stehen: die Seite wechselt gerade, und ein
        // wieder freigegebener Knopf lüde nur zum zweiten Absenden ein.
        return;
      }
      setPending(false);
      throw thrown;
    }

    // Erst nach der Auswertung freigeben — ein `router.refresh()` im
    // `onSuccess` soll noch unter dem laufenden Zustand starten.
    try {
      if (result.ok) {
        current.onSuccess?.(result.data);
      } else if (result.code === "FORBIDDEN" && current.featureLabel) {
        setFeatureDisabled(true);
      } else {
        setError(result.message);
        current.onError?.(result.message);
      }
    } finally {
      setPending(false);
    }
  }, [router]);

  const run = useCallback(
    (fields: Record<string, string> = {}) => {
      const formData = new FormData();
      for (const [key, value] of Object.entries(fields)) formData.set(key, value);
      return submit(formData);
    },
    [submit],
  );

  const feedback = useMemo(
    () => (
      <>
        {error && <Callout tone="danger">{error}</Callout>}
        {featureLabel && (
          <FeatureDisabledDialog
            open={featureDisabled}
            featureLabel={featureLabel}
            onOpenChange={setFeatureDisabled}
          />
        )}
      </>
    ),
    [error, featureDisabled, featureLabel],
  );

  return { submit, run, pending, error, setError, featureDisabled, feedback };
}
