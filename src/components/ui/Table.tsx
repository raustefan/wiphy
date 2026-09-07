import { cn } from "@/lib/cn";

/**
 * Horizontal scrollbarer Wrapper — breite Tabellen kippen auf dem Telefon nicht
 * das Layout, sondern scrollen in sich.
 *
 * Bewusst **ohne** negativen Außenabstand: alle Aufrufer stecken in einer
 * `Card` mit eigener Innenabstands­kante. Ein `-mx-4` zöge die Tabelle darüber
 * hinaus, sie liefe dann näher am Kartenrand als jeder andere Inhalt und sähe
 * auf schmalen Bildschirmen aus, als ragte sie heraus.
 */
export function TableWrap({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("overflow-x-auto", className)}>{children}</div>;
}

export function Table({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table
      className={cn("w-full border-collapse text-left text-sm", className)}
      {...props}
    />
  );
}

export function Th({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "px-3 py-2.5 text-xs font-semibold tracking-wide whitespace-nowrap text-faint uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function Td({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn("border-t border-line px-3 py-3 align-middle", className)}
      {...props}
    />
  );
}
