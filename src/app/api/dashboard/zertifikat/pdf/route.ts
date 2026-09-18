import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getOptionalUser } from "@/lib/server/authz";
import { getEditableUser } from "@/lib/server/services/userService";
import { getFeeDashboardData } from "@/lib/server/services/feeService";
import { getSignatureBoardMembers } from "@/lib/server/services/boardService";
import { MembershipCertificatePdf } from "@/lib/server/pdf/membershipCertificatePdf";
import { loadLogoDataUrl } from "@/lib/server/pdf/logo";
import { berlinYear, certificateFacts, isCertifiableStatus } from "@/lib/membershipCertificate";

/**
 * Das Mitgliedschaftszertifikat des angemeldeten Mitglieds.
 *
 * Immer das eigene: die Route nimmt keine ID entgegen. Ein Zertifikat für ein
 * fremdes Konto wäre eine Bescheinigung über eine fremde Person — und mit einem
 * Pfadparameter hinge die Trennung an einer Prüfung, die man vergessen kann.
 */
export async function GET() {
  const currentUser = await getOptionalUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }

  const profile = await getEditableUser(currentUser.id);
  if (!profile) {
    return NextResponse.json({ error: "User nicht gefunden" }, { status: 404 });
  }

  /*
   * Der Status kommt aus der Datenbank, nicht aus der Sitzung — im Token steht
   * er seit der Anmeldung fest, ein frisch aufgenommenes Mitglied bekäme sonst
   * bis zum nächsten Login eine Absage (dieselbe Begründung wie auf
   * `/dashboard/zahlungen`).
   */
  if (!isCertifiableStatus(profile.status)) {
    return NextResponse.json(
      { error: "Nur ordentliche Mitglieder und Ehrenmitglieder erhalten ein Zertifikat" },
      { status: 403 },
    );
  }

  const issuedAt = new Date();
  const [feeUsers, signers, logoSrc] = await Promise.all([
    getFeeDashboardData(currentUser.id, "MEMBER"),
    getSignatureBoardMembers(),
    loadLogoDataUrl(),
  ]);

  const fees = feeUsers.find((user) => user.id === currentUser.id)?.fees ?? [];

  const buffer = await renderToBuffer(
    MembershipCertificatePdf({
      member: {
        id: profile.id,
        titel: profile.titel,
        vorname: profile.vorname,
        name: profile.name,
        mitgliedId: profile.mitgliedId,
      },
      facts: certificateFacts({
        status: profile.status,
        aufnahmedatum: profile.aufnahmedatum,
        fees,
        issuedAt,
      }),
      signers,
      logoSrc,
      issuedAt,
    }),
  );

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="mitgliedschaftszertifikat-${berlinYear(issuedAt)}.pdf"`,
      // Ein Zertifikat trägt das Ausstellungsdatum und personenbezogene Daten:
      // weder ein Proxy noch der Browser darf es aufbewahren und beim nächsten
      // Abruf ein altes Blatt ausliefern.
      "Cache-Control": "private, no-store",
    },
  });
}
