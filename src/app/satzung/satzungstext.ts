/**
 * Satzung des Wirtschaftsphysik Alumni e.V. im Wortlaut.
 *
 * Als Daten und nicht als JSX gepflegt: der Text ändert sich nur durch Beschluss
 * der Mitgliederversammlung, und so bleibt eine Änderung ein reiner Textdiff
 * ohne Layoutrisiko. Jeder Absatz ist ein eigener String; `items` rendert als
 * Aufzählung.
 */

export type Paragraph = {
  id: string;
  title: string;
  blocks: Array<string | { items: string[] }>;
};

export const SATZUNG: Paragraph[] = [
  {
    id: "1",
    title: "§ 1 Name, Sitz und Geschäftsjahr",
    blocks: [
      "Der Verein führt den Namen „Wirtschaftsphysik Alumni“ – im Folgenden Verein genannt.",
      "Er führt nach Eintragung in das Vereinsregister den Zusatz – eingetragener Verein – in abgekürzter Form e.V.",
      "Er hat seinen Sitz in Ulm/Donau.",
      "Das Geschäftsjahr ist das Kalenderjahr.",
    ],
  },
  {
    id: "2",
    title: "§ 2 Zweck des Vereins",
    blocks: [
      "Der Verein ist selbstlos tätig und verfolgt nicht in erster Linie eigenwirtschaftliche Zwecke, sondern ausschließlich und unmittelbar gemeinnützige Zwecke im Sinne des Abschnitts „steuerbegünstigter Zweck“ der Abgabenordnung.",
      "Der Zweck des Vereins ist die Unterstützung der Studiengänge Wirtschaftsphysik und Physik an der Universität Ulm und deren Studierenden, insbesondere beim akademischen Werdegang. Zudem die Förderung von Wissenschaft und Forschung in den Bereichen Physik und Wirtschaftsphysik an der Universität Ulm.",
      "Dies wird verwirklicht insbesondere durch:",
      {
        items: [
          "Bereitstellung einer Kommunikationsplattform für Studierende, Lehrende, Wissenschaftler, Absolventen und Interessierte.",
          "Finanzielle und ideelle Unterstützung von Forschung und Lehre in den Bereichen Wirtschaftsphysik und Physik an der Universität Ulm.",
          "Einbringung von Erfahrungen in die Weiterentwicklung der Studiengänge Physik und Wirtschaftsphysik als verlässlicher Ansprechpartner für die zuständigen Professoren der Universität Ulm.",
          "Organisation von Vorlesungen und Seminaren für Studierende und Absolventen der Universität Ulm in den Bereichen Physik, Wirtschaftswissenschaften, Informatik und den so genannten „Soft Skills“.",
          "Veranstalten von Exkursionen und Betriebsbesichtigungen, um den Ulmer Studenten der Physik und Wirtschaftsphysik einen möglichst frühen Einblick in den beruflichen Alltag von Forschung, Entwicklung und Management zu ermöglichen und ihnen damit die Wahl von Schwerpunkten in ihrem Studium zu erleichtern.",
        ],
      },
      "Mittel des Vereins dürfen nur für satzungsgemäße Zwecke verwendet werden.",
      "Die Mitglieder des Vereins erhalten keine Gewinnanteile und in ihrer Eigenschaft als Mitglieder auch keine sonstigen Zuwendungen aus Mitteln des Vereins. Vereinsämter sind Ehrenämter. Es darf keine Person durch Ausgaben, die dem Zweck des Vereins fremd sind, oder durch unverhältnismäßig hohe Vergütungen begünstigt werden. Beim Ausscheiden oder im Rahmen der Auflösung des Vereins werden keinerlei Vermögensteile des Vereins zurück gewährt.",
    ],
  },
  {
    id: "3",
    title: "§ 3 Eintragung des Vereins in das Vereinsregister",
    blocks: ["Der Verein soll in das Vereinsregister eingetragen werden."],
  },
  {
    id: "4",
    title: "§ 4 Mitgliedschaft",
    blocks: [
      "Mitglied des Vereins kann jede voll geschäftsfähige natürliche Person werden, die bereit ist die Ziele des Vereins zu fördern.",
      "Juristische Personen können als fördernde Mitglieder aufgenommen werden.",
      "Der Aufnahmeantrag bedarf der Schriftform und ist an den Vorstand zu richten.",
      "Über die Aufnahme in den Verein entscheidet der Vorstand. Wird dem Aufnahmeantrag stattgegeben, so erhält der/die Antragssteller/in (per E-Mail oder postalisch) eine Aufforderung, den fälligen Mitgliedsbeitrag zu bezahlen. Der Eintritt wird nach Bezahlung des Mitgliedsbeitrags mit Zugang einer schriftlichen (per E-Mail oder postalisch) Aufnahmeerklärung wirksam. Die Ablehnung eines Aufnahmeantrags muss nicht begründet werden, sie ist nicht anfechtbar.",
      "Es gibt folgende Arten von Mitgliedern:",
      {
        items: [
          "Ordentliche Mitglieder",
          "Außerordentliche Mitglieder",
          "Fördernde Mitglieder",
          "Ehrenmitglieder",
        ],
      },
      "Ehrenmitglieder können auf Vorschlag durch Beschluss des Vorstandes ernannt werden.",
    ],
  },
  {
    id: "5",
    title: "§ 5 Rechte und Pflichten der Mitglieder",
    blocks: [
      "Die ordentlichen Mitglieder haben das Recht, an den Mitgliederversammlungen teilzunehmen, dort Redebeiträge zu leisten und Anträge zu stellen. Sie üben das Stimmrecht sowie das aktive und passive Wahlrecht aus.",
      "Die ordentlichen Mitglieder haben den von der Mitgliederversammlung beschlossenen Mitgliedsbeitrag zu entrichten.",
      "Der Mitgliedsbeitrag ist am 1. Januar eines jeden Jahres im Voraus für das Geschäftsjahr fällig. Bei Eintritt wird der Beitrag für das aktuelle Jahr, abzüglich der schon vergangenen Monate, die jeweils mit einem Zwölftel des Jahresbeitrages bewertet werden, fällig.",
      "Außerordentliche Mitglieder haben kein Recht zur Teilnahme an der Mitgliederversammlung, sowie kein aktives oder passives Wahlrecht. Über die Entrichtung eines Mitgliedsbeitrages entscheidet die Mitgliederversammlung. Sofern ein Mitgliedsbeitrag erhoben wird, muss dieser, in Anbetracht der verminderten Rechte der außerordentlichen Mitglieder, im dementsprechenden Verhältnis zu den Mitgliedsbeiträgen der ordentlichen Mitglieder stehen.",
      "Mitgliedsbeiträge, welche nicht per Abbuchung (Bankeinzugverfahren) beglichen werden, erhöhen sich aus verwaltungstechnischen Gründen um 10% und sind auf volle Euro aufzurunden. Kann die Abbuchung durch die Bank nicht erfolgreich durchgeführt werden, kann der Verein die ihm dadurch entstandenen Kosten dem Mitglied in Rechnung stellen.",
      "Fördernde Mitglieder haben gleiche Rechte wie die ordentlichen Mitglieder, sind aber von der Beitragspflicht freigestellt. Statt dessen unterstützen sie den Zweck des Vereins oder den Verein selbst in finanzieller Hinsicht. Die Art und Weise wird jeweils mit dem Vorstand abgesprochen.",
      "Ehrenmitglieder haben die gleichen Rechte wie ordentliche Mitglieder, die Verpflichtung zur Zahlung des Mitgliedsbeitrages besteht für sie nicht.",
      "Alle Mitglieder haben die Aufgabe, sich im Sinne des Vereins einzubringen und auch in Eigeninitiative, aber in Absprache mit dem Vorstand, den Zweck des Vereins aktiv zu unterstützen.",
      "Sollte ein Mitglied die Mitgliedspflichten verletzen, dem Vereinszweck zuwiderhandeln oder sich vereinsschädigend verhalten (z. B.: durch Verletzung von Bestimmungen der Satzung, Ordnungen, Anordnungen und Beschlüsse der Vereinsorgane, durch Zuwiderhandlung gegen Vereinsinteressen, durch Schädigung des Ansehens des Vereins oder durch unehrenhaftes Verhalten im Zusammenhang mit dem Vereinsleben), steht dem Vorstand das Verhängen von angemessenen Sanktionen wie zum Beispiel Suspendierung von Mitgliedsrechten auf Zeit (Einschränkung der Stimmrechte, Ruhen der Mitgliedschaft etc.) zu. Dasselbe gilt auch bei Weitergabe von Passwörtern, Zugangsdaten sowie persönlichen Informationen von anderen Mitgliedern.",
      "Mitglieder, die einen Sonderstatus genießen (zum Beispiel Studierende) sind verpflichtet, bei Wegfall dieses Status, dies dem Vorstand innerhalb von 6 Wochen mitzuteilen.",
    ],
  },
  {
    id: "6",
    title: "§ 6 Dauer der Mitgliedschaft",
    blocks: [
      "Die Mitgliedschaft endet durch Tod, freiwilligen Austritt und Ausschluss.",
      "Der Austritt kann nur schriftlich und unter Einhaltung einer Kündigungsfrist von mindestens vier Wochen zum Ende des Geschäftsjahres erklärt werden. Zur Einhaltung der Kündigungsfrist ist der rechtzeitige Zugang der Austrittserklärung an ein Mitglied des Vorstands erforderlich.",
      "Der Ausschluss kann vom Vorstand beschlossen werden, wenn grobe Vergehen gegen Vereinszwecke oder vereinsschädigendes Verhalten vorliegen (vgl. § 5), oder wenn das Mitglied trotz Mahnung den Mitgliedsbeitrag nicht entrichtet hat. Dasselbe gilt auch bei Weitergabe von Passwörtern, Zugangsdaten sowie persönlichen Informationen von anderen Mitgliedern. (In diesem Fall behält sich der Verein das Recht zur Einleitung weiterer juristischer Schritte vor.) Hiernach ruht die Mitgliedschaft des betroffenen Mitglieds bis zum Ausschluss oder der Aufhebung des Beschlusses.",
      "Nach dem Beschluss des Ausschlusses ist dem betroffenen Mitglied, unter Setzung einer Frist von zehn Tagen, Gelegenheit zu geben, sich mündlich oder schriftlich gegenüber dem Vorstand zu äußern. Die darauf folgende Entscheidung des Vorstands über den Ausschluss ist schriftlich zu begründen und dem Mitglied postalisch zuzustellen. Das ausgeschlossene Mitglied kann dann innerhalb einer Frist von einem Monat ab Zugang schriftlich Berufung beim Vorstand einlegen. Über die Berufung entscheidet die nächste ordentliche oder außerordentliche Mitgliederversammlung. Diese ist berechtigt, den Vorstandsbeschluss zur Ausschließung aufzuheben. Macht das Mitglied vom Recht der Berufung innerhalb der Frist keinen Gebrauch, unterwirft es sich dem Ausschließungsbeschluss.",
      "Sollten Verfahrenskosten jeglicher Art entstehen, können diese dem Ausgeschlossenen vollständig auferlegt werden.",
    ],
  },
  {
    id: "7",
    title: "§ 7 Verwendung von Vereinsmitteln",
    blocks: [
      "Mittel des Vereins dürfen nur für die satzungsmäßigen Zwecke verwendet werden. Die Mitglieder erhalten keine Zuwendungen aus den Mitteln des Vereins. Der Vorstand ist berechtigt, in besonderen Fällen Vereinsmitgliedern Aufwendungen zu erstatten.",
      "Niemand darf durch Ausgaben, die dem Zweck des Vereins fremd sind, oder durch unverhältnismäßig hohe Vergütungen begünstigt werden.",
    ],
  },
  {
    id: "8",
    title: "§ 8 Organe",
    blocks: [
      "Die Organe des Vereins sind",
      { items: ["der Vorstand", "die Mitgliederversammlung", "der Beirat."] },
    ],
  },
  {
    id: "9",
    title: "§ 9 Vorstand",
    blocks: [
      "Der Vorstand besteht aus",
      {
        items: [
          "1. Vorsitzenden",
          "2. Vorsitzenden",
          "Finanzvorstand",
          "Schriftführer",
          "und weiteren Vorstandsmitgliedern.",
        ],
      },
      "Der Vorstand kann bei Bedarf, durch Ergänzungswahl, weitere Personen selbst in den Vorstand hinzuziehen. Zudem kann der Vorstand besondere Vertreter benennen und abberufen, sofern dies in seinem Sinne notwendig erscheint. Vorstandsmitglieder müssen Vereinsmitglieder sein.",
      "Der Vorstand führt die laufenden Geschäfte des Vereins; ihm obliegt die Verwaltung und Verwendung der Vereinsmittel. Seine Tätigkeit ist ehrenamtlich. Der Verein wird gerichtlich und außergerichtlich durch den 1. Vorsitzenden und den 2. Vorsitzenden des Vorstandes einzeln vertreten.",
      "Für Rechtsgeschäfte über 200,- € ist nur im Innenverhältnis die Zustimmung des Vorstands nötig.",
      "Das Abstimmungsverfahren im Vorstand ist grundsätzlich nicht geheim. Bei Abstimmungen entscheidet die relative Mehrheit. Abstimmungen und Beschlüsse sind per E-Mail, postalisch oder auch durch eine Vorstandssitzung gültig. Bei Stimmengleichheit entscheidet die Stimme des 1. Vorsitzenden. Bei Entscheidungen zu Rechtsgeschäften haben die eingetragenen Vorstände ein Vetorecht.",
      "Der Finanzvorstand ist zur ordnungsgemäßen Buchführung und Rechnungslegung verpflichtet.",
      "Eine Kassenprüfung ist auf Anordnung der Vorsitzenden und zu jeder ordentlichen Mitgliederversammlung durch entsprechend bestellte Mitglieder durchzuführen.",
      "Die Amtszeit aller Vorstände ist der Zeitraum bis zur nächsten ordentlichen Mitgliederversammlung. Wiederwahl ist zulässig.",
      "Die Vorstände bleiben im Amt bis ein neuer Vorstand gewählt wurde. Die Vorsitzenden bleiben so lange im Amt, bis der entsprechende zukünftige Vorsitzende im Vereinsregister eingetragen ist.",
      "Die Vorstände können auf eigenen Wunsch jederzeit zurücktreten. Scheidet ein Vorstandsmitglied vor Ablauf seiner Wahlzeit aus, ist der Vorstand berechtigt, ein kommissarisches Vorstandsmitglied zu berufen. Auf diese Weise bestimmte Vorstandsmitglieder bleiben bis zur nächsten Mitgliederversammlung im Amt.",
    ],
  },
  {
    id: "10",
    title: "§ 10 Beirat",
    blocks: [
      "Der Beirat unterstützt und berät den Vereinsvorstand und den Verein bei der Verwirklichung der Vereinsziele. Er besteht aus verdienten Personen des öffentlichen Lebens aus Wissenschaft, Politik, Kultur und Wirtschaft.",
      "Die Mitglieder des Beirats werden vom Vorstand auf 3 Jahre ernannt. Wiederernennung von Beiratsmitgliedern ist zulässig.",
      "Der Beirat wird vom Vorstandsvorsitzenden einberufen.",
    ],
  },
  {
    id: "11",
    title: "§ 11 Mitgliederversammlung",
    blocks: [
      "Zeit und Ort einer Mitgliederversammlung wird vom Vorstand unter Einhaltung einer Frist von 21 Tagen mit Bekanntgabe der vorläufig festgesetzten Tagesordnung festgelegt. (Maßgeblich ist der Tag der Absendung.) Die Tagesordnung wird unter Berücksichtigung von Anträgen der Mitglieder zur Mitgliederversammlung durch den Vorstand festgelegt.",
      "Ein Vorsitzender oder ein vom Vorsitzenden bestellter Vorstand leitet die Mitgliederversammlung. Auf Vorschlag des Vorsitzenden kann die Mitgliederversammlung einen besonderen Versammlungsleiter bestimmen.",
      "Mindestens alle zweieinhalb Jahre findet eine ordentliche Mitgliederversammlung statt. Der Vorstand sollte den Termin so legen, dass möglichst viele Mitglieder die Möglichkeit haben, an der Versammlung teilzunehmen. Der Vorstand kann auch innerhalb der zweieinhalb Jahre eine ordentliche Mitgliederversammlung einberufen, sofern er dies für notwendig hält. Die Frist für die nächste ordentliche Mitgliederversammlung ist dann ab diesem Zeitpunkt wieder die obige.",
      "Die Mitgliederversammlung ist schriftlich (per E-Mail oder postalisch) an die letztbekannte (E-Mail-) Adresse einzuberufen.",
      "Die Mitgliederversammlung hat insbesondere folgende Aufgaben/Rechte:",
      {
        items: [
          "Wahl des Vorstandes",
          "Konstruktives Misstrauensvotum gegenüber Vorständen",
          "Entgegennahme des Rechenschaftsberichts",
          "Entlastung des Vorstandes",
          "Festsetzung der Mitgliedsbeiträge",
          "Beschlussfassung über die Berufung gegen den Ausschluss eines Mitglieds.",
          "Beschlussfassung über Satzungsänderungen",
          "Beschlussfassung über die Auflösung des Vereins",
        ],
      },
      "Anträge der Mitglieder zur Tagesordnung müssen spätestens drei Tage vor der Mitgliederversammlung schriftlich beim Vorstand eingereicht werden.",
      "Die Mitglieder können sich durch Übertragung des Stimmrechts gegenseitig schriftlich bevollmächtigen, doch ist die Vereinigung von mehr als zehn Stimmen in einer Hand unzulässig. Die übertragenen Stimmen zählen in gleicher Weise, wie wenn die entsprechenden Mitglieder persönlich anwesend wären. Vereinigt ein Mitglied mehrere Stimmen, so kann es auch uneinheitlich abstimmen.",
      "Die Mitgliederversammlung wählt und beschließt mit einfacher Mehrheit der zum Zeitpunkt der Abstimmung vertretenen Stimmen. Sollte im ersten Wahlgang bei mehreren Möglichkeiten keine absolute Mehrheit zustande kommen, findet im zweiten Wahlgang eine Stichwahl zwischen den beiden Punkten statt, die im ersten Wahlgang die meisten Stimmen erhalten haben.",
      "Zu einem Beschluss, der eine Änderung der Satzung enthält, ist eine Mehrheit von drei Viertel der vertretenen Stimmen erforderlich. Zur Änderung des Vereinszwecks ist zuvor die Zustimmung der Finanzbehörde bezüglich „steuerbegünstigter Zweck“ erforderlich.",
      "Die Art des Wahlverfahrens unterliegt dem Leiter der Mitgliederversammlung. Es können allerdings vor Beginn der Abstimmungen von den Mitgliedern Anträge zu der Art der einzelnen Abstimmungen eingebracht werden, über die dann vorab abgestimmt wird.",
      "Der Versammlungsleiter beauftragt ein Mitglied, das nicht dem Vorstand angehört, mit dem Auszählen der Stimmen. Das Abstimmungsergebnis wird anschließend den Mitgliedern mitgeteilt.",
      "Die Mitgliederversammlung ist nur beschlussfähig, wenn wenigstens ein Vorstandsmitglied und mindestens fünf Prozent der möglichen Stimmen vertreten sind.",
      "Eine außerordentliche Mitgliederversammlung muss einberufen werden, wenn:",
      {
        items: [
          "dies nach Ansicht des Vorstandes im Interesse des Vereins erforderlich ist, oder",
          "die Einberufung von einem Drittel der Mitglieder (ordentliche und Ehrenmitglieder) postalisch unter Angabe von Gründen gegenüber dem Vorstand verlangt wird.",
        ],
      },
      "Abstimmungen können in dringenden Fällen auch anstelle einer außerordentlichen Mitgliederversammlung durch schriftliche Stimmabgabe erfolgen. Die schriftliche Stimmabgabe ist innerhalb von zwei Wochen an den Vorsitzenden oder einen von ihm benannten Stellvertreter per Post oder E-Mail zu richten. Ein Beschluss nach Abstimmung durch schriftliche Stimmabgabe ist gültig, wenn die Mehrheit der Mitglieder ihre Zustimmung für den Beschluss erklärt.",
      "Ein konstruktives Misstrauensvotum gegenüber einzelnen Vorständen kann von mindestens einem Drittel der Mitglieder bei den Vorsitzenden beantragt werden. Mit einer Zustimmung von über der Hälfte aller Mitglieder und gleichzeitiger Wahl eines neuen Vorstandsmitglieds bei einer ordentlichen, oder außerordentlichen Mitgliederversammlung kann der Vorstand abgewählt werden und seiner Amtsgeschäfte am Tage der Abwahl entbunden werden. Die Wahl findet im Geheimen statt. Bei den Vorsitzenden ist die Veränderung im Vereinsregister umgehend durchzuführen.",
      "Die Niederschrift über die Beschlüsse der Mitgliederversammlung ist vom Vorsitzenden und dem Schriftführer zu unterzeichnen.",
    ],
  },
  {
    id: "12",
    title: "§ 12 Auflösung des Vereins",
    blocks: [
      "Die Auflösung des Vereins kann nur von einer zu diesem Zweck einberufenen außerordentlichen Mitgliederversammlung mit einer Mehrheit von achtzig Prozent der vertretenen Stimmen beschlossen werden.",
      "Im Falle der Auflösung oder Aufhebung des Vereins oder bei Wegfall steuerbegünstigter Zwecke geht das Vermögen an die Universität Ulm, die es unmittelbar und ausschließlich für Zwecke der Wirtschaftsphysik und Physik zu verwenden hat.",
    ],
  },
];
