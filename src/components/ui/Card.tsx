import { cn } from "@/lib/cn";

/**
 * `min-w-0`: als Grid- oder Flex-Kind wäre die Mindestbreite sonst die
 * Inhaltsbreite — eine breite Tabelle darin (`TableWrap`) scrollte dann nicht
 * in sich, sondern schöbe die ganze Seite auf dem Telefon in die Breite.
 */
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("min-w-0 rounded-2xl border border-line bg-surface", className)}
      {...props}
    />
  );
}
