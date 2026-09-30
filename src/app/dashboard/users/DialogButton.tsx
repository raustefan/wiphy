"use client";

import { useState } from "react";
import { Button, Dialog } from "@/components/ui";

/** Knopf, der servergerenderten Inhalt in einem Dialog zeigt. */
export function DialogButton({
  label,
  icon,
  title,
  description,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" color="neutral" type="button" onClick={() => setOpen(true)}>
        {icon}
        {label}
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        size="lg"
        title={title}
        description={description}
      >
        {children}
      </Dialog>
    </>
  );
}
