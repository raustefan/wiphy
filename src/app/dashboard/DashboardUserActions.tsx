"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import { EnvelopeClosedIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { EmailComposerDialog } from "@/components/EmailComposerDialog";
import { DeleteUserButton } from "./DeleteUserButton";

export type DashboardUserActionsUser = {
  id: string;
  email: string;
  vorname: string;
  name: string;
};

type DashboardUserActionsProps = {
  user: DashboardUserActionsUser;
  isAdmin: boolean;
  currentUserId: string;
  deleteUserAction: (formData: FormData) => Promise<void>;
};

export function DashboardUserActions({
  user,
  isAdmin,
  currentUserId,
  deleteUserAction,
}: DashboardUserActionsProps) {
  const [mailOpen, setMailOpen] = useState(false);
  const displayName = [user.vorname, user.name].filter(Boolean).join(" ") || null;

  return (
    <>
      <Flex gap="2" justify="end" wrap="wrap">
        {isAdmin && (
          <Button size="1" variant="soft" type="button" onClick={() => setMailOpen(true)}>
            <EnvelopeClosedIcon />

          </Button>
        )}
        <Link href={`/dashboard/users/${user.id}`}>
          <Button size="1" variant="soft">
            <Pencil2Icon />

          </Button>
        </Link>
        {isAdmin && user.id !== currentUserId && (
          <form action={deleteUserAction}>
            <input type="hidden" name="id" value={user.id} />
            <DeleteUserButton />
          </form>
        )}
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
