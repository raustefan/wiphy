import { useRef } from "react";

/** Ab so vielen Pixeln nach unten gilt das Wischen als „schließen“. */
const CLOSE_DISTANCE = 80;

/**
 * Bottom Sheets lassen sich am Kopf nach unten wegwischen — die Geste, die
 * jede:r auf dem Telefon zuerst versucht. Die Handler gehören an den Kopf
 * (Titelzeile), nicht an den scrollbaren Inhalt, sonst kämpfen Wischen und
 * Scrollen um dieselbe Bewegung. Der Kopf braucht deshalb `touch-none`.
 *
 * Verschoben wird das Elternelement des Kopfs — das Sheet selbst.
 *
 * Maus bleibt außen vor: dort gibt es den Schließen-Knopf und Esc.
 */
export function useSwipeToClose(onClose: () => void) {
  const startY = useRef<number | null>(null);

  function offset(event: React.PointerEvent) {
    return startY.current === null ? 0 : Math.max(0, event.clientY - startY.current);
  }

  function end(event: React.PointerEvent) {
    const distance = offset(event);
    startY.current = null;
    const el = event.currentTarget.parentElement;
    if (!el) return;
    // Inline-Werte weg: die Klasse übernimmt wieder und animiert von der
    // gezogenen Position aus zurück oder hinaus.
    el.style.translate = "";
    el.style.transition = "";
    if (distance > CLOSE_DISTANCE) onClose();
  }

  return {
    onPointerDown(event: React.PointerEvent) {
      if (event.pointerType === "mouse") return;
      startY.current = event.clientY;
    },
    onPointerMove(event: React.PointerEvent) {
      const el = event.currentTarget.parentElement;
      const distance = offset(event);
      if (!el || distance === 0) return;
      // Erst beim Ziehen einfangen: sofort gefangen, landete das `click`
      // eines angetippten Knopfs im Kopf nicht mehr beim Knopf.
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      el.style.transition = "none";
      el.style.translate = `0 ${distance}px`;
    },
    onPointerUp: end,
    onPointerCancel: end,
  };
}
