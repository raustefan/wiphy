"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Modaler Dialog auf Basis des nativen <dialog>-Elements: kein Portal, kein
 * Focus-Trap-Code — der Browser erledigt showModal(), Esc und Fokusführung.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  size = "md",
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
  };

  return (
    <dialog
      ref={ref}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      className={cn(
        "dialog-panel m-auto w-[calc(100vw-2rem)] rounded-2xl border border-line bg-surface p-0 text-foreground shadow-2xl",
        "max-h-[calc(100dvh-3rem)] overflow-y-auto",
        "backdrop:bg-black/45",
        sizeClasses[size],
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6">
        <div className="grid gap-1">
          {title && (
            <h2 className="text-lg font-bold tracking-tight text-balance">{title}</h2>
          )}
          {description && <p className="text-sm text-muted">{description}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dialog schließen"
          className="-mt-1 -mr-1 grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-foreground focus-visible:outline-2 focus-visible:outline-physics"
        >
          <X size={18} />
        </button>
      </div>
      <div className="px-5 py-4 sm:px-6">{children}</div>
    </dialog>
  );
}

export function DialogFooter({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
    >
      {children}
    </div>
  );
}
