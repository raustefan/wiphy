import { cn } from "@/lib/cn";

export type BadgeTone =
  | "neutral"
  | "physics"
  | "market"
  | "positive"
  | "negative"
  | "warning"
  | "info";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-raised text-muted",
  physics: "bg-physics/12 text-physics",
  market: "bg-market/12 text-market",
  positive: "bg-positive/12 text-positive",
  negative: "bg-negative/12 text-negative",
  warning: "bg-warning/15 text-warning",
  info: "bg-info/12 text-info",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
