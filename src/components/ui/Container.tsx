import { cn } from "@/lib/cn";

const sizeClasses = {
  "1": "max-w-xl",
  "2": "max-w-3xl",
  "3": "max-w-5xl",
  "4": "max-w-6xl",
} as const;

export function Container({
  size = "4",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: keyof typeof sizeClasses;
}) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6", sizeClasses[size], className)}
      {...props}
    />
  );
}
