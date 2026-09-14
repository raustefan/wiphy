import { Badge } from "@/components/ui";

/**
 * Eine der beiden Zahlungswege-Karten.
 *
 * Die ganze Karte ist das `<label>`, der Radiobutton sitzt sichtbar darin: So
 * ist die Trefferfläche groß, die Auswahl bleibt aber ein gewöhnliches
 * Formularelement — mit Tastaturbedienung, Pfeiltasten innerhalb der Gruppe und
 * einer Ansage, die Screenreader von sich aus richtig vorlesen.
 *
 * Der Preis steht auf beiden Karten, nicht nur bei der teureren: Ein Betrag
 * allein wirkt wie eine Zusatzgebühr, zwei Beträge nebeneinander sind ein
 * Vergleich.
 *
 * Teilen sich Mitgliedsantrag und Zahlungsverwaltung (`/dashboard/zahlungen`),
 * damit die Entscheidung über die Zahlungsweise dort identisch aussieht.
 */
export function PaymentOption({
    value,
    checked,
    onSelect,
    icon,
    title,
    badge,
    price,
    priceTone,
    points,
}: {
    value: "lastschrift" | "ueberweisung";
    checked: boolean;
    onSelect: (value: "lastschrift" | "ueberweisung") => void;
    icon: React.ReactNode;
    title: string;
    badge?: string;
    price: string;
    priceTone?: "negative";
    points: string[];
}) {
    return (
        <label
            className={`grid cursor-pointer content-start gap-3 rounded-xl border p-4 transition-colors ${
                checked
                    ? "border-physics bg-physics/8"
                    : "border-line bg-raised/40 hover:bg-raised/70"
            }`}
        >
            <span className="flex items-center gap-2.5">
                <input
                    type="radio"
                    name="zahlungsweise-auswahl"
                    value={value}
                    checked={checked}
                    onChange={() => onSelect(value)}
                    className="size-4.5 shrink-0 cursor-pointer accent-physics"
                />
                <span className={checked ? "text-physics" : "text-faint"} aria-hidden="true">
                    {icon}
                </span>
                <span className="font-semibold">{title}</span>
                {badge && (
                    <Badge tone="positive" className="ml-auto">
                        {badge}
                    </Badge>
                )}
            </span>

            <span
                className={`text-lg font-bold tracking-tight ${
                    priceTone === "negative" ? "text-negative" : "text-foreground"
                }`}
            >
                {price}
            </span>

            <ul className="grid gap-1.5 text-sm text-muted">
                {points.map((point) => (
                    <li key={point} className="text-pretty">
                        {point}
                    </li>
                ))}
            </ul>
        </label>
    );
}
