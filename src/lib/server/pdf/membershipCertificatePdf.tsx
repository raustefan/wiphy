import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatDate } from "@/lib/format";
import { VEREIN } from "@/lib/email/branding";
import { formatStatus } from "@/lib/statusLabels";
import {
  berlinYear,
  certificateNumber,
  formatMembershipDuration,
  formatMembershipDurationDative,
  formatPaidYears,
  type CertificateFacts,
} from "@/lib/membershipCertificate";

/**
 * Das Mitgliedschaftszertifikat als Urkunde.
 *
 * Anders als die Zahlungshistorie ist dieses Blatt kein Auszug für die eigene
 * Ablage, sondern etwas, das ein Mitglied jemandem zeigt — dem Arbeitgeber, der
 * Fachschaft, einer Stiftung. Es trägt deshalb bewusst keine Beträge und keine
 * Bankverbindung: bescheinigt wird die Mitgliedschaft, nicht der Kontostand.
 *
 * Gesetzt in den eingebauten Standardschriften (Times für die Urkundenzeilen,
 * Helvetica für Beschriftungen). Eine mitgelieferte Schriftdatei wäre schöner,
 * hinge aber an einem Download zur Laufzeit — die vierzehn Standardschriften
 * sind in jedem PDF-Betrachter vorhanden und kosten kein Byte.
 */

/*
 * Silbentrennung aus: der eingebaute Trenner von react-pdf rechnet nach
 * englischen Mustern und zerlegt deutsche Komposita an der falschen Stelle —
 * aus „Vorstandsvorsitzender“ wurde „VOR-STANDSVORSITZENDER“. Lieber eine
 * Zeile, die früher umbricht, als ein Wort, das falsch getrennt ist.
 */
Font.registerHyphenationCallback((word) => [word]);

const PHYSICS = "#0f766e";
/** Teal auf Papier heruntergezogen — für Linien, die rahmen statt zu rufen. */
const PHYSICS_SOFT = "#a7ccc8";
const INK = "#18181b";
const MUTED = "#52525b";
const FAINT = "#71717a";
const LINE = "#e4e4e7";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: INK,
    backgroundColor: "#ffffff",
  },

  /* Doppelter Rahmen: eine kräftige Linie außen, eine Haarlinie knapp
     innerhalb. Das ist das älteste Urkundenmotiv überhaupt und der billigste
     Weg, ein Blatt als Dokument statt als Ausdruck lesbar zu machen. */
  frameOuter: {
    position: "absolute",
    top: 26,
    right: 26,
    bottom: 26,
    left: 26,
    border: `2pt solid ${PHYSICS}`,
  },
  frameInner: {
    position: "absolute",
    top: 33,
    right: 33,
    bottom: 33,
    left: 33,
    border: `0.75pt solid ${PHYSICS_SOFT}`,
  },

  body: {
    paddingTop: 62,
    paddingBottom: 150,
    paddingHorizontal: 78,
  },

  // ── Kopf ──
  header: {
    alignItems: "center",
  },
  logo: {
    width: 104,
    height: 55,
    marginBottom: 12,
  },
  verein: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: PHYSICS,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  register: {
    fontSize: 8,
    color: FAINT,
    marginTop: 3,
  },

  ornament: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    marginBottom: 22,
  },
  ornamentRule: {
    width: 74,
    height: 0.75,
    backgroundColor: PHYSICS_SOFT,
  },
  ornamentDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: PHYSICS,
    marginHorizontal: 9,
  },

  // ── Titel ──
  title: {
    fontFamily: "Times-Bold",
    fontSize: 29,
    textAlign: "center",
    letterSpacing: 0.4,
  },
  subtitle: {
    fontSize: 8.5,
    textAlign: "center",
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 2.4,
    marginTop: 8,
  },

  // ── Namensblock ──
  intro: {
    fontFamily: "Times-Roman",
    fontSize: 12,
    textAlign: "center",
    color: MUTED,
    marginTop: 34,
  },
  name: {
    fontFamily: "Times-Bold",
    fontSize: 25,
    textAlign: "center",
    marginTop: 10,
  },
  nameRule: {
    height: 0.75,
    backgroundColor: LINE,
    marginTop: 14,
    marginHorizontal: 40,
  },
  identity: {
    fontSize: 8.5,
    textAlign: "center",
    color: FAINT,
    textTransform: "uppercase",
    letterSpacing: 1.4,
    marginTop: 10,
  },
  statement: {
    fontFamily: "Times-Roman",
    fontSize: 12.5,
    lineHeight: 1.65,
    textAlign: "center",
    marginTop: 16,
  },

  // ── Angaben ──
  facts: {
    marginTop: 30,
    borderTop: `0.75pt solid ${LINE}`,
    borderBottom: `0.75pt solid ${LINE}`,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 16,
    paddingBottom: 4,
  },
  fact: {
    width: "50%",
    marginBottom: 14,
    paddingRight: 12,
  },
  factLabel: {
    fontSize: 7.5,
    color: FAINT,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  factValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11.5,
  },
  factNote: {
    fontSize: 8,
    color: MUTED,
    marginTop: 2,
  },

  legal: {
    fontFamily: "Times-Roman",
    fontSize: 9.5,
    lineHeight: 1.6,
    color: MUTED,
    textAlign: "center",
    marginTop: 22,
  },

  // ── Fuß ──
  signatures: {
    position: "absolute",
    left: 78,
    right: 78,
    bottom: 74,
    flexDirection: "row",
    justifyContent: "space-between",
    /* Unten bündig: die rechte Spalte trägt eine Zeile mehr (die Ämter). Ohne
       diese Angabe stünden die beiden Unterschriftsstriche auf verschiedenen
       Höhen — das Blatt sähe schief aus. */
    alignItems: "flex-end",
  },
  signatureBlock: {
    width: "45%",
  },
  signatureValue: {
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    marginBottom: 6,
    minHeight: 14,
  },
  signatureRoles: {
    fontSize: 8,
    color: MUTED,
    marginBottom: 6,
    marginTop: -4,
  },
  signatureRule: {
    height: 0.75,
    backgroundColor: INK,
  },
  signatureLabel: {
    fontSize: 7.5,
    color: FAINT,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 5,
  },
  colophon: {
    position: "absolute",
    left: 78,
    right: 78,
    bottom: 46,
    fontSize: 7.5,
    color: FAINT,
    textAlign: "center",
  },
});

export type CertificateMember = {
  id: string;
  titel: string | null;
  vorname: string | null;
  name: string;
  mitgliedId: number | null;
};

/** Ein Vorstandsmitglied, das die Urkunde zeichnet. */
export type CertificateSigner = {
  name: string;
  role: string;
};

function Fact({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <View style={styles.fact}>
      <Text style={styles.factLabel}>{label}</Text>
      <Text style={styles.factValue}>{value}</Text>
      {note ? <Text style={styles.factNote}>{note}</Text> : null}
    </View>
  );
}

/**
 * „noch 3 Monate“ — die Restlaufzeit als Klammerzusatz, wenn sie etwas sagt.
 *
 * Im Dezember ist sie 0: „noch 0 Monate“ stünde dann neben einem Datum, das
 * noch nicht erreicht ist, und läse sich wie ein Ende. Der Zusatz entfällt.
 */
function remainingNote(months: number): string | undefined {
  if (months <= 0) return undefined;
  return `noch ${months === 1 ? "ein Monat" : `${months} Monate`}`;
}

export function MembershipCertificatePdf({
  member,
  facts,
  signers,
  logoSrc,
  issuedAt,
}: {
  member: CertificateMember;
  facts: CertificateFacts;
  signers: readonly CertificateSigner[];
  /** Die Wortmarke als Data-URL — im PDF gibt es keine URL zum Nachladen. */
  logoSrc: string | null;
  issuedAt: Date;
}) {
  const displayName = [member.titel, member.vorname, member.name].filter(Boolean).join(" ");
  const currentYear = berlinYear(issuedAt);
  const { coverage, duration, feeExempt, memberSince } = facts;

  const identity = [
    member.mitgliedId != null ? `Mitgliedsnummer ${member.mitgliedId}` : null,
    formatStatus(facts.status),
  ]
    .filter(Boolean)
    .join("  ·  ");

  /* Der Vereinsname endet auf „e.V.“ — steht er am Satzende, trägt er den
     Schlusspunkt schon. Ein zweiter ergäbe „e.V..“. */
  const sentence = [
    memberSince ? `ist seit dem ${formatDate(memberSince)}` : "ist",
    `Mitglied des ${VEREIN.name}`,
    duration ? `— seit ${formatMembershipDurationDative(duration)}` : null,
  ]
    .filter(Boolean)
    .join(" ");
  const statement = sentence.endsWith(".") ? sentence : `${sentence}.`;

  /* Die Kernaussage des Blattes: bis wann die Mitgliedschaft steht. Für
     Ehrenmitglieder gibt es sie nicht — § 5 Abs. 7 nimmt sie aus der
     Beitragspflicht, ihre Mitgliedschaft hängt an keinem bezahlten Jahr. */
  const securedLabel = "Mitgliedschaft gesichert bis";
  const secured = feeExempt
    ? { value: "Unbefristet", note: "beitragsfrei nach § 5 Abs. 7" }
    : coverage.coveredThrough
      ? {
          value: formatDate(coverage.coveredThrough),
          note: remainingNote(coverage.remainingMonths),
        }
      : {
          value: "—",
          note: `Beitrag ${currentYear} noch offen`,
        };

  const paidLabel = feeExempt ? "Beitragspflicht" : "Beiträge entrichtet für";
  const paid = feeExempt
    ? { value: "Befreit", note: "§ 5 Abs. 7 der Satzung" }
    : {
        value: formatPaidYears(coverage.paidYears),
        note:
          coverage.paidYears.length > 0
            ? `${coverage.paidYears.length} ${coverage.paidYears.length === 1 ? "Beitragsjahr" : "Beitragsjahre"}`
            : undefined,
      };

  const legal = feeExempt
    ? `Ehrenmitglieder haben nach § 5 Abs. 7 der Satzung die gleichen Rechte wie ordentliche Mitglieder; eine Verpflichtung zur Zahlung des Mitgliedsbeitrages besteht für sie nicht. Die Mitgliedschaft besteht unbefristet fort und endet nach § 6 nur durch Tod, Austritt oder Ausschluss.`
    : coverage.coveredThroughYear != null
      ? `Der Mitgliedsbeitrag ist nach § 5 Abs. 3 der Satzung am 1. Januar im Voraus für das gesamte Geschäftsjahr fällig; das Geschäftsjahr ist nach § 1 das Kalenderjahr. Da ein Austritt nach § 6 Abs. 2 nur zum Ende eines Geschäftsjahres erklärt werden kann, besteht die Mitgliedschaft nach den vorstehenden Angaben mindestens bis zum ${formatDate(coverage.coveredThrough)}.`
      : `Der Mitgliedsbeitrag ist nach § 5 Abs. 3 der Satzung am 1. Januar im Voraus für das gesamte Geschäftsjahr fällig. Für das laufende Geschäftsjahr ${currentYear} ist zum Zeitpunkt der Ausstellung kein Zahlungseingang verbucht; eine Mindestdauer der Mitgliedschaft wird deshalb nicht bescheinigt.`;

  return (
    <Document
      title={`Mitgliedschaftszertifikat ${displayName}`}
      author={VEREIN.name}
      subject={`Bescheinigung der Mitgliedschaft im ${VEREIN.name}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.frameOuter} fixed />
        <View style={styles.frameInner} fixed />

        <View style={styles.body}>
          <View style={styles.header}>
            {/* Kein `alt`: das hier ist nicht das `<img>` des Browsers, sondern
                `Image` von react-pdf — die Regel erkennt den Unterschied nicht,
                und ein unbekanntes Attribut würde beim Rendern verworfen. */}
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            {logoSrc ? <Image style={styles.logo} src={logoSrc} /> : null}
            <Text style={styles.verein}>{VEREIN.name}</Text>
            <Text style={styles.register}>{VEREIN.register}</Text>
          </View>

          <View style={styles.ornament}>
            <View style={styles.ornamentRule} />
            <View style={styles.ornamentDot} />
            <View style={styles.ornamentRule} />
          </View>

          <Text style={styles.title}>Mitgliedschaftszertifikat</Text>
          <Text style={styles.subtitle}>Bescheinigung der Mitgliedschaft</Text>

          <Text style={styles.intro}>Hiermit wird bescheinigt, dass</Text>
          <Text style={styles.name}>{displayName}</Text>
          <View style={styles.nameRule} />
          <Text style={styles.identity}>{identity}</Text>

          <Text style={styles.statement}>{statement}</Text>

          <View style={styles.facts}>
            <Fact label="Mitglied seit" value={formatDate(memberSince)} />
            <Fact
              label="Dauer der Mitgliedschaft"
              value={duration ? formatMembershipDuration(duration) : "—"}
            />
            <Fact label={paidLabel} value={paid.value} note={paid.note} />
            <Fact label={securedLabel} value={secured.value} note={secured.note} />
          </View>

          <Text style={styles.legal}>{legal}</Text>
        </View>

        <View style={styles.signatures}>
          <View style={styles.signatureBlock}>
            <Text style={styles.signatureValue}>Ulm, den {formatDate(issuedAt)}</Text>
            <View style={styles.signatureRule} />
            <Text style={styles.signatureLabel}>Ort und Datum</Text>
          </View>
          <View style={styles.signatureBlock}>
            {/* Ohne gepflegte Signaturliste bleibt die Zeile leer statt einen
                Namen zu erfinden — unterschrieben wird dann von Hand.

                Die Ämter stehen über dem Strich und nicht als Beschriftung
                darunter: „1. Vorsitzender · 2. Vorsitzende“ ist zu lang für
                eine Kleinkapitälchenzeile und brach dort mitten im Wort um. */}
            <Text style={styles.signatureValue}>
              {signers.map((signer) => signer.name).join(" · ")}
            </Text>
            {signers.length > 0 && (
              <Text style={styles.signatureRoles}>
                {signers.map((signer) => signer.role).join(" · ")}
              </Text>
            )}
            <View style={styles.signatureRule} />
            <Text style={styles.signatureLabel}>Für den Vorstand</Text>
          </View>
        </View>

        <Text style={styles.colophon}>
          {certificateNumber({
            mitgliedId: member.mitgliedId,
            userId: member.id,
            issuedAt,
          })}
          {"  ·  "}
          Maschinell aus der Mitgliederverwaltung erstellt und ohne Unterschrift gültig
          {"  ·  "}
          {VEREIN.email}
        </Text>
      </Page>
    </Document>
  );
}
