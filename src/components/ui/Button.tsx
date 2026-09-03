import Link from "next/link";
import { cn } from "@/lib/cn";
import { Spinner } from "./Spinner";

export type ButtonVariant = "solid" | "soft" | "outline" | "ghost";
export type ButtonColor = "accent" | "market" | "neutral" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-11 px-6 text-[15px]",
};

const colorClasses: Record<ButtonColor, Record<ButtonVariant, string>> = {
  accent: {
    solid: "bg-physics text-on-physics hover:bg-physics/85",
    soft: "bg-physics/12 text-physics hover:bg-physics/20",
    outline:
      "border border-line-strong bg-transparent text-foreground hover:bg-raised",
    ghost: "text-muted hover:bg-raised hover:text-foreground",
  },
  market: {
    solid: "bg-market text-on-market hover:bg-market/85",
    soft: "bg-market/12 text-market hover:bg-market/20",
    outline:
      "border border-line-strong bg-transparent text-foreground hover:bg-raised",
    ghost: "text-muted hover:bg-raised hover:text-foreground",
  },
  neutral: {
    solid: "bg-foreground text-background hover:bg-foreground/85",
    soft: "bg-raised text-foreground hover:bg-line",
    outline:
      "border border-line-strong bg-transparent text-foreground hover:bg-raised",
    ghost: "text-muted hover:bg-raised hover:text-foreground",
  },
  danger: {
    solid: "bg-negative text-on-negative hover:bg-negative/85",
    soft: "bg-negative/12 text-negative hover:bg-negative/20",
    outline:
      "border border-negative/40 bg-transparent text-negative hover:bg-negative/10",
    ghost: "text-negative hover:bg-negative/10",
  },
};

export function buttonClasses({
  variant = "solid",
  color = "accent",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-colors duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics",
    "disabled:pointer-events-none disabled:opacity-50",
    sizeClasses[size],
    colorClasses[color][variant],
    className,
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  loading?: boolean;
};

export function Button({
  variant = "solid",
  color = "accent",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={buttonClasses({ variant, color, size, className })}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

type ButtonLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  "variant" | "color" | "size"
> & {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
};

export function ButtonLink({
  variant = "solid",
  color = "accent",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonClasses({ variant, color, size, className })}
      {...props}
    >
      {children}
    </Link>
  );
}
