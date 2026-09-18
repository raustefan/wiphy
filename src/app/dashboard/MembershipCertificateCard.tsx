import { Award, Download } from "lucide-react";
import { Card, buttonClasses } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { formatMembershipDuration, type CertificateFacts } from "@/lib/membershipCertificate";
import { SectionHeader } from "./SectionHeader";

/**
 * Der Einstieg zum Mitgliedschaftszertifikat.
 *
 * Die drei Angaben stehen auch auf dem Blatt — sie hier zu wiederholen ist
 * Absicht: wer wissen will, bis wann seine Mitgliedschaft bezahlt ist, soll
 * dafür kein PDF herunterladen und öffnen müssen. Der Knopf ist dann für die
 * Fälle da, in denen es jemand anderes lesen soll.
 *
 * Bewusst ein `<a>` und kein `Link`: das Ziel ist eine Datei, kein Ziel im
 * Router. `Link` würde sie zu prefetchen versuchen und bei jedem Überfahren der
 * Kachel ein PDF auf dem Server rendern.
 */
export function MembershipCertificateCard({ facts }: { facts: CertificateFacts }) {
  const { coverage, duration, feeExempt, memberSince } = facts;

  const secured = feeExempt
    ? "Unbefristet"
    : coverage.coveredThrough
      ? formatDate(coverage.coveredThrough)
      : "Beitrag offen";

  return (
    <Card className="p-5 sm:p-6">
      <SectionHeader
        icon={<Award size={16} />}
        eyebrow="Nachweis"
        title="Mitgliedschaftszertifikat"
        description="Eine Urkunde mit deinen Mitgliedsdaten, dem Aufnahmedatum und dem Zeitraum, für den deine Beiträge entrichtet sind — zum Vorzeigen als PDF."
        aside={
          <a
            href="/api/dashboard/zertifikat/pdf"
            className={buttonClasses({ size: "sm", className: "self-start" })}
          >
            <Download size={15} aria-hidden="true" />
            Herunterladen
          </a>
        }
      />

      {/*
        `gap-px` auf einer Fläche in Linienfarbe: die Trennstriche zwischen den
        drei Feldern sind die durchscheinende Hintergrundfarbe des Rasters.
        Damit brauchen die Zellen keine Ränder, die sich an den Ecken der
        umgebenden Rundung doppeln würden.
      */}
      <dl className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
        <Entry label="Mitglied seit" value={formatDate(memberSince)} />
        <Entry
          label="Dauer"
          value={duration ? formatMembershipDuration(duration) : "—"}
        />
        <Entry
          label={feeExempt ? "Beitragspflicht" : "Gesichert bis"}
          value={feeExempt ? "Befreit" : secured}
        />
      </dl>
    </Card>
  );
}

function Entry({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface px-4 py-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 font-semibold text-pretty">{value}</dd>
    </div>
  );
}
