import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar01Icon } from "@hugeicons/core-free-icons";
import { Badge, EmptyState, Table, TableWrap, Td, Th } from "@/components/ui";
import { formatEuro } from "@/lib/format";
import type { DashboardFee } from "@/lib/server/services/feeService";

export function PaymentHistoryTable({ fees }: { fees: DashboardFee[] }) {
    if (fees.length === 0) {
        return (
            <EmptyState
                icon={<HugeiconsIcon icon={Calendar01Icon} size={22} />}
                title="Noch kein Beitragsjahr"
                description="Sobald der Verein für dich einen Mitgliedsbeitrag angelegt hat, findest du ihn hier — mit Betrag, Stufe und Zahlungsstand."
            />
        );
    }

    return (
        <TableWrap>
            <Table>
                <thead>
                    <tr>
                        <Th>Jahr</Th>
                        <Th>Status</Th>
                        <Th>Stufe</Th>
                        <Th className="text-right">Betrag</Th>
                    </tr>
                </thead>
                <tbody>
                    {fees.map((fee) => (
                        <tr key={fee.year}>
                            <Td className="font-mono font-semibold">{fee.year}</Td>
                            <Td>
                                <Badge tone={fee.paid ? "positive" : "negative"}>
                                    {fee.paid ? "Bezahlt" : "Ausstehend"}
                                </Badge>
                            </Td>
                            <Td>
                                <Badge tone={fee.isStudent ? "info" : "neutral"}>
                                    {fee.isStudent ? "Student" : "Regulär"}
                                </Badge>
                            </Td>
                            <Td className="text-right font-medium">{formatEuro(fee.amount)}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </TableWrap>
    );
}
