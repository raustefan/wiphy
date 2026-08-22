"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import { EnvelopeClosedIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { EmailComposerDialog } from "@/components/EmailComposerDialog";

export type DashboardUserActionsUser = {
  id: string;
  email: string;
  vorname: string;
  name: string;
};

type DashboardUserActionsProps = {
  user: DashboardUserActionsUser;
  isAdmin: boolean;
};

export function DashboardUserActions({
  user,
  isAdmin,
}: DashboardUserActionsProps) {
  const [mailOpen, setMailOpen] = useState(false);
  const displayName = [user.vorname, user.name].filter(Boolean).join(" ") || null;

  return (
    <>
      <Flex gap="2" justify="end" wrap="wrap">
        {isAdmin && (
          <Button size="2" variant="soft" type="button" onClick={() => setMailOpen(true)}>
            <EnvelopeClosedIcon />
          </Button>
        )}
        <Button size="2" variant="soft" asChild>
          <Link href={`/dashboard/users/${user.id}`}>
            <Pencil2Icon />
          </Link>
        </Button>
      </Flex>

      {isAdmin && (
        <EmailComposerDialog
          open={mailOpen}
          onOpenChange={setMailOpen}
          recipients={[{ id: user.id, name: displayName, email: user.email }]}
          defaultSubject=""
          defaultMessage=""
          submitLabel="E-Mail senden"
        />
      )}
    </>
  );
}
