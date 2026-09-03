"use client";

import { cn } from "@/lib/cn";

export function Switch({
  checked,
  onCheckedChange,
  disabled,
  "aria-label": ariaLabel,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6.5 w-11.5 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-physics",
        "disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-physics" : "bg-line-strong",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform duration-150",
          checked && "translate-x-5",
        )}
      />
    </button>
  );
}
