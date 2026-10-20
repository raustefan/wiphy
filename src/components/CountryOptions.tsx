import { COUNTRY_OPTIONS, isCountryCode } from "@/lib/countries";

/**
 * Die `<option>`s für eine Länderauswahl — als Inhalt von `<Select>`, damit
 * `Field` Hinweis und Fehler weiterhin an das Steuerelement hängen kann.
 * Ein Altwert im Klartext (aus der Zeit vor den Ländercodes) bleibt als
 * eigene Option stehen, bis jemand ein Land auswählt.
 */
export function CountryOptions({ current, allowEmpty = false }: { current?: string | null; allowEmpty?: boolean }) {
  return (
    <>
      {allowEmpty && <option value="">—</option>}
      {current && !isCountryCode(current) && <option value={current}>{current} (bitte Land auswählen)</option>}
      {COUNTRY_OPTIONS.map((country) => (
        <option key={country.value} value={country.value}>
          {country.label}
        </option>
      ))}
    </>
  );
}
