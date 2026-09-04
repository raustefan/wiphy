import { Calendar } from "lucide-react";
import { Badge, Table, TableWrap, Td, Th } from "@/components/ui";
import { formatEuro } from "@/lib/format";
import type { DashboardFee } from "@/lib/server/services/feeService";

export function PaymentHistoryTable({ fees }: { fees: DashboardFee[] }) {
    if (fees.length === 0) {
        return (
            <p className="flex items-center gap-2 text-sm text-muted">
                <Calendar size={16} className="text-faint" aria-hidden="true" />
                Für dein Konto liegt noch kein Beitragsjahr vor.
            </p>
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
                        <tr key={fee.jahr}>
                            <Td className="font-mono font-semibold">{fee.jahr}</Td>
                            <Td>
                                <Badge tone={fee.bezahlt ? "positive" : "negative"}>
                                    {fee.bezahlt ? "Bezahlt" : "Ausstehend"}
                                </Badge>
                            </Td>
                            <Td>
                                <Badge tone={fee.isStudent ? "info" : "neutral"}>
                                    {fee.isStudent ? "Student" : "Regulär"}
                                </Badge>
                            </Td>
                            <Td className="text-right font-medium">{formatEuro(fee.beitrag)}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </TableWrap>
    );
}
