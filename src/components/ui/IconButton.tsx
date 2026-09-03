import Link from "next/link";
import { cn } from "@/lib/cn";

export type IconButtonVariant = "solid" | "soft" | "outline" | "ghost";
export type IconButtonColor = "accent" | "neutral" | "danger";
export type IconButtonSize = "sm" | "md" | "lg";

const sizeClasses: Record<IconButtonSize, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-11",
};

const colorClasses: Record<IconButtonColor, Record<IconButtonVariant, string>> = {
  accent: {
    solid: "bg-physics text-on-physics hover:bg-physics/85",
    soft: "bg-physics/12 text-physics hover:bg-physics/20",
    outline: "border border-line-strong text-foreground hover:bg-raised",
    ghost: "text-muted hover:bg-raised hover:text-foreground",
  },
  neutral: {
    solid: "bg-foreground text-background hover:bg-foreground/85",
    soft: "bg-raised text-foreground hover:bg-line",
    outline: "border border-line-strong text-foreground hover:bg-raised",
    ghost: "text-muted hover:bg-raised hover:text-foreground",
  },
  danger: {
    solid: "bg-negative text-on-negative hover:bg-negative/85",
    soft: "bg-negative/12 text-negative hover:bg-negative/20",
    outline: "border border-negative/40 text-negative hover:bg-negative/10",
    ghost: "text-negative hover:bg-negative/10",
  },
};

export function iconButtonClasses({
  variant = "ghost",
  color = "neutral",
  size = "md",
  className,
}: {
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  size?: IconButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-grid shrink-0 cursor-pointer place-items-center rounded-full transition-colors duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics",
    "disabled:pointer-events-none disabled:opacity-50",
    sizeClasses[size],
    colorClasses[color][variant],
    className,
  );
}

/**
 * Quadratischer Icon-Knopf. Ein `aria-label` ist Pflicht — das Icon allein
 * trägt keinen zugänglichen Namen. `title` ersetzt zugleich den früheren
 * Radix-Tooltip.
 */
export function IconButton({
  variant = "ghost",
  color = "neutral",
  size = "md",
  className,
  type = "button",
  "aria-label": ariaLabel,
  title,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  size?: IconButtonSize;
  "aria-label": string;
}) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      title={title ?? ariaLabel}
      className={iconButtonClasses({ variant, color, size, className })}
      {...props}
    />
  );
}

export function IconButtonLink({
  variant = "ghost",
  color = "neutral",
  size = "md",
  className,
  "aria-label": ariaLabel,
  title,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "variant" | "color" | "size"> & {
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  size?: IconButtonSize;
  "aria-label": string;
}) {
  return (
    <Link
      aria-label={ariaLabel}
      title={title ?? ariaLabel}
      className={iconButtonClasses({ variant, color, size, className })}
      {...props}
    />
  );
}
