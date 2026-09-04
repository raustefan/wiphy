"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { Callout } from "@/components/ui/Callout";
import { FeatureDisabledDialog } from "@/components/FeatureDisabledDialog";
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

  // Aktion und Callbacks über eine Ref: `submit` behält damit über Renders
  // hinweg dieselbe Identität und darf gefahrlos in einer Effekt-Abhängigkeit
  // stehen, ohne dass ein inline übergebener Callback eine Schleife auslöst.
  const latest = useRef({ action, onSuccess, onError, featureLabel });
  useEffect(() => {
    latest.current = { action, onSuccess, onError, featureLabel };
  });

  const [error, setError] = useState("");
  const [featureDisabled, setFeatureDisabled] = useState(false);
  // useTransition statt eines eigenen `pending`-Flags: so bleibt die UI während
  // des Server-Roundtrips bedienbar und `router.refresh()` im onSuccess zählt
  // noch zum selben Übergang.
  const [pending, startTransition] = useTransition();

  // Das Promise löst auf, wenn der Übergang durch ist — Aufrufer können also
  // `await` nutzen. Ob es geklappt hat, sagen `onSuccess`/`onError`.
  const submit = useCallback(
    (formData: FormData) =>
      new Promise<void>((resolve) => {
        setError("");
        startTransition(async () => {
          const current = latest.current;
          const result = await current.action(formData);

          if (result.ok) {
            current.onSuccess?.(result.data);
          } else if (result.code === "FORBIDDEN" && current.featureLabel) {
            setFeatureDisabled(true);
          } else {
            setError(result.message);
            current.onError?.(result.message);
          }
          resolve();
        });
      }),
    [],
  );

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
