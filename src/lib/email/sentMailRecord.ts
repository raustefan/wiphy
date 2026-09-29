export type SentMailInput = {
  subject: string;
  recipientGroup: string | null;
  recipients: { email: string }[];
};

/** Die Adresse bleibt nur bei genau einer ausgewählten Person stehen. */
export function sentMailRecord(input: SentMailInput) {
  const single = !input.recipientGroup && input.recipients.length === 1;
  return {
    subject: input.subject,
    recipientGroup: input.recipientGroup,
    recipientCount: input.recipients.length,
    recipientEmail: single ? input.recipients[0].email : null,
  };
}
