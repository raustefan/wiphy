import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatEuro, formatDate } from "@/lib/format";
import { maskIban } from "@/lib/iban";
import type { DashboardFee } from "@/lib/server/services/feeService";

const PHYSICS = "#0f766e";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
  },
  eyebrow: {
    fontSize: 9,
    color: PHYSICS,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 10,
    color: "#555555",
    marginBottom: 20,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: `1pt solid ${PHYSICS}`,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoItem: {
    width: "50%",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 8,
    color: "#777777",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  table: {
    display: "flex",
    flexDirection: "column",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1pt solid #e5e5e5",
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 6,
    fontFamily: "Helvetica-Bold",
  },
  cellYear: { width: "20%" },
  cellStatus: { width: "25%" },
  cellStufe: { width: "25%" },
  cellAmount: { width: "30%", textAlign: "right", paddingRight: 2 },
  totalRow: {
    flexDirection: "row",
    paddingTop: 8,
    paddingHorizontal: 6,
    marginTop: 4,
    borderTop: `1pt solid ${PHYSICS}`,
    fontFamily: "Helvetica-Bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#999999",
    textAlign: "center",
  },
});

type PdfUser = {
  vorname: string | null;
  name: string;
  email: string;
  mitgliedId: number | null;
  status: string;
  strasse: string | null;
  plz: string | null;
  stadt: string | null;
  land: string | null;
  IBAN: string | null;
  bank: string | null;
  bankeinzug: boolean | null;
  aufnahmedatum: Date | null;
};

function statusLabel(status: string) {
  if (status === "ORDENTLICHES_MITGLIED") return "Ordentliches Mitglied";
  if (status === "EHRENMITGLIED") return "Ehrenmitglied";
  return "Kein Mitglied";
}

export function PaymentHistoryPdf({
  user,
  fees,
  generatedAt,
}: {
  user: PdfUser;
  fees: DashboardFee[];
  generatedAt: Date;
}) {
  const displayName = [user.vorname, user.name].filter(Boolean).join(" ");
  const address = [user.strasse, [user.plz, user.stadt].filter(Boolean).join(" "), user.land]
    .filter(Boolean)
    .join(", ");
  const totalPaid = fees.filter((f) => f.bezahlt).reduce((sum, f) => sum + f.beitrag, 0);

  return (
    <Document title={`Zahlungshistorie ${displayName}`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.eyebrow}>WirtschaftsPhysik Alumni e.V.</Text>
        <Text style={styles.title}>Zahlungshistorie</Text>
        <Text style={styles.subtitle}>
          Zusammenfassung der Mitgliedsbeiträge — erstellt am {formatDate(generatedAt)}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mitgliedsdaten</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{displayName || "—"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Mitglieds-ID</Text>
              <Text style={styles.infoValue}>
                {user.mitgliedId != null ? user.mitgliedId : "—"}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>E-Mail</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text style={styles.infoValue}>{statusLabel(user.status)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Anschrift</Text>
              <Text style={styles.infoValue}>{address || "—"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Mitglied seit</Text>
              <Text style={styles.infoValue}>{formatDate(user.aufnahmedatum)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bankverbindung (SEPA-Lastschrift)</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>IBAN</Text>
              <Text style={styles.infoValue}>{user.IBAN ? maskIban(user.IBAN) : "—"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Kreditinstitut</Text>
              <Text style={styles.infoValue}>{user.bank || "—"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Lastschriftmandat</Text>
              <Text style={styles.infoValue}>{user.bankeinzug ? "Erteilt" : "Nicht erteilt"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Beitragsjahre</Text>
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              <Text style={styles.cellYear}>Jahr</Text>
              <Text style={styles.cellStatus}>Status</Text>
              <Text style={styles.cellStufe}>Stufe</Text>
              <Text style={styles.cellAmount}>Betrag</Text>
            </View>
            {fees.map((fee) => (
              <View style={styles.tableRow} key={fee.jahr}>
                <Text style={styles.cellYear}>{fee.jahr}</Text>
                <Text style={styles.cellStatus}>{fee.bezahlt ? "Bezahlt" : "Ausstehend"}</Text>
                <Text style={styles.cellStufe}>{fee.isStudent ? "Student" : "Regulär"}</Text>
                <Text style={styles.cellAmount}>{formatEuro(fee.beitrag)}</Text>
              </View>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.cellYear} />
              <Text style={styles.cellStatus} />
              <Text style={styles.cellStufe}>Bezahlt gesamt</Text>
              <Text style={styles.cellAmount}>{formatEuro(totalPaid)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>
          Automatisch erstellt aus der Mitgliederverwaltung des WirtschaftsPhysik Alumni e.V. —
          dieses Dokument dient als formlose Übersicht, kein amtlicher Steuerbeleg.
        </Text>
      </Page>
    </Document>
  );
}
