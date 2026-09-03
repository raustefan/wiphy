import { cn } from "@/lib/cn";

export type CalloutTone = "info" | "success" | "warning" | "danger";

const toneClasses: Record<CalloutTone, string> = {
  info: "border-info/25 bg-info/8 text-foreground [&_.callout-icon]:text-info",
  success:
    "border-positive/25 bg-positive/8 text-foreground [&_.callout-icon]:text-positive",
  warning:
    "border-warning/30 bg-warning/8 text-foreground [&_.callout-icon]:text-warning",
  danger:
    "border-negative/30 bg-negative/8 text-foreground [&_.callout-icon]:text-negative",
};

export function Callout({
  tone = "info",
  icon,
  title,
  className,
  children,
}: {
  tone?: CalloutTone;
  icon?: React.ReactNode;
  title?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      role={tone === "danger" ? "alert" : undefined}
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm",
        toneClasses[tone],
        className,
      )}
    >
      {icon && <span className="callout-icon mt-0.5 shrink-0">{icon}</span>}
      <div className="grid gap-0.5">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className="text-muted">{children}</div>}
      </div>
    </div>
  );
}
