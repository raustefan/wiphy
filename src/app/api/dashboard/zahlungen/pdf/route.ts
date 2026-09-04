import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getOptionalUser } from "@/lib/server/authz";
import { getEditableUser } from "@/lib/server/services/userService";
import { getFeeDashboardData } from "@/lib/server/services/feeService";
import { PaymentHistoryPdf } from "@/lib/server/pdf/paymentHistoryPdf";

export async function GET() {
  const currentUser = await getOptionalUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }

  const currentYear = new Date().getFullYear();
  const [profile, feeUsers] = await Promise.all([
    getEditableUser(currentUser.id),
    getFeeDashboardData(currentUser.id, "MEMBER", currentYear),
  ]);

  if (!profile) {
    return NextResponse.json({ error: "User nicht gefunden" }, { status: 404 });
  }

  const myRecord = feeUsers.find((u) => u.id === currentUser.id);
  const fees = (myRecord?.fees ?? []).slice().sort((a, b) => b.jahr - a.jahr);

  const buffer = await renderToBuffer(
    PaymentHistoryPdf({ user: profile, fees, generatedAt: new Date() }),
  );

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="zahlungshistorie-${currentYear}.pdf"`,
    },
  });
}
