import { cloneElement, isValidElement } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/* Die Fehlerdarstellung hängt am `aria-invalid` des Feldes selbst, nicht an
   einer eigenen Klasse: so sind rote Umrandung und die Meldung an die
   Unterstützungstechnik immer derselbe Zustand — eines von beiden kann nicht
   mehr ohne das andere gesetzt werden. Gilt für alle drei Steuerelemente, nicht
   nur fürs Eingabefeld. */
export const controlClasses =
  "block w-full rounded-xl border border-line-strong bg-surface px-3.5 py-2.5 text-foreground placeholder:text-faint transition-shadow focus:border-physics focus:ring-2 focus:ring-physics/25 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 aria-[invalid=true]:border-negative aria-[invalid=true]:focus:ring-negative/25";

/**
 * Reicht `aria-describedby` und `aria-invalid` an das Steuerelement weiter,
 * damit Hinweis- und Fehlertext vorgelesen werden und nicht nur dastehen.
 *
 * Bewusst nur für die eigenen drei Steuerelemente: bei allem anderen landete
 * das Attribut auf einem beliebigen Wrapper-`div`, wo es niemand liest.
 */
function describeControl(
  children: React.ReactNode,
  describedBy: string | undefined,
  invalid: boolean,
) {
  if (!describedBy && !invalid) return children;
  if (!isValidElement(children)) return children;
  if (children.type !== Input && children.type !== TextArea && children.type !== Select) {
    return children;
  }
  const own = children.props as {
    "aria-describedby"?: string;
    "aria-invalid"?: boolean | "true" | "false";
  };
  return cloneElement(children, {
    "aria-describedby": own["aria-describedby"] ?? describedBy,
    "aria-invalid": own["aria-invalid"] ?? (invalid || undefined),
  } as Partial<typeof own>);
}

/**
 * Beschriftungstext samt Pflichtmarkierung.
 *
 * Das Sternchen ist `aria-hidden`: vorgelesen würde daraus „Stern“, was niemand
 * als „Pflichtfeld“ versteht. Den Hinweis trägt stattdessen der unsichtbare
 * Zusatz, der so im Feldnamen landet.
 */
function LabelText({ label, required }: { label?: string; required?: boolean }) {
  return (
    <>
      {label}
      {required && (
        <>
          <span aria-hidden="true" className="text-negative">
            {" *"}
          </span>
          <span className="sr-only"> (erforderlich)</span>
        </>
      )}
    </>
  );
}

/**
 * Beschriftetes Formularfeld.
 *
 * Zur Verknüpfung von Beschriftung und Steuerelement gibt es zwei Wege, und
 * welcher greift, entscheidet `htmlFor`:
 *
 *   · **mit `htmlFor`** — klassisch über `for`/`id`. Zusätzlich werden Hinweis-
 *     bzw. Fehlertext über `aria-describedby` angebunden, was eine feste id
 *     voraussetzt.
 *   · **ohne `htmlFor`** — das `<label>` umschließt das Steuerelement und ist
 *     damit implizit verknüpft. Nötig, weil ein Großteil der Aufrufer keine id
 *     vergibt: ohne diesen Zweig hätte das `<label>` dort weder `for` noch
 *     umschlossenes Feld und wäre reine Dekoration — Screenreader lasen „Eingabe
 *     leer“ ohne jeden Hinweis, worum es geht.
 *
 * Der Hinweistext bleibt in beiden Fällen *außerhalb* des `<label>`: innerhalb
 * würde er Teil des Feldnamens statt seiner Beschreibung — aus „IBAN“ würde
 * „IBAN Wird beim Absenden auf ihre Prüfziffer geprüft.“, und bei einem
 * mitzählenden Hinweis („142 / 2000 Zeichen“) änderte sich der Name bei jedem
 * Tastendruck.
 */
export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  className,
  children,
}: {
  label?: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  /** Zeichnet die Pflichtmarkierung — siehe `LabelText`. */
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const message = error || hint;
  const messageId =
    htmlFor && message ? `${htmlFor}-${error ? "error" : "hint"}` : undefined;
  const labelText = <LabelText label={label} required={required} />;

  return (
    <div className={cn("grid gap-1.5", className)}>
      {label && !htmlFor ? (
        <label className="grid gap-1.5">
          <span className="text-sm font-semibold text-foreground">{labelText}</span>
          {children}
        </label>
      ) : (
        <>
          {label && (
            <label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
              {labelText}
            </label>
          )}
          {describeControl(children, messageId, Boolean(error))}
        </>
      )}
      {message && (
        <p id={messageId} className={cn("text-sm", error ? "text-negative" : "text-faint")}>
          {message}
        </p>
      )}
    </div>
  );
}

export function Input({
  className,
  invalid,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(controlClasses, className)}
      {...props}
    />
  );
}

export function TextArea({
  className,
  invalid,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(controlClasses, "min-h-28", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  invalid,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <div className="relative">
      <select
        aria-invalid={invalid || undefined}
        className={cn(controlClasses, "cursor-pointer appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-faint"
      />
    </div>
  );
}

export function Checkbox({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className={cn("size-4.5 shrink-0 cursor-pointer rounded accent-physics", className)}
      {...props}
    />
  );
}
