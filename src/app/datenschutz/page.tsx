import { Container, Heading, Text, Flex, Button, Separator } from "@radix-ui/themes";
import Link from "next/link";

export default function DatenschutzPage() {
    return (
        <Container size="3" px="0" pt={{ initial: "4", sm: "6" }} pb="9">
            <Flex
                direction={{ initial: "column", xs: "row" }}
                justify="between"
                align={{ initial: "start", xs: "center" }}
                gap="3"
                mb={{ initial: "5", sm: "6" }}
            >
                <Heading as="h1" size={{ initial: "7", sm: "8" }} className="display-title">Datenschutzerklärung</Heading>
                <Button variant="soft" radius="full" asChild>
                    <Link href="/">← Zurück zur Startseite</Link>
                </Button>
            </Flex>

            <Flex direction="column" gap="4">
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und
                    Zweck der Verarbeitung von personenbezogenen Daten (nachfolgend
                    kurz „Daten") innerhalb unseres Onlineangebotes und der mit ihm
                    verbundenen Webseiten, Funktionen und Inhalte sowie externen
                    Onlinepräsenzen, wie z.B. unser Social Media Profile auf
                    (nachfolgend gemeinsam bezeichnet als „Onlineangebot"). Im
                    Hinblick auf die verwendeten Begrifflichkeiten, wie z.B.
                    „Verarbeitung" oder „Verantwortlicher" verweisen wir auf die
                    Definitionen im Art. 4 der Datenschutzgrundverordnung (DSGVO).
                </Text>prisma migrate deploy

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Verantwortlicher</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Wirtschaftsphysik Alumni e.V.
                    <br />
                    c/o Universität Ulm
                    <br />
                    Studienkommission Physik
                    <br />
                    Albert-Einstein-Allee 11
                    <br />
                    89081 Ulm
                    <br />
                    Deutschland
                </Text>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    E-Mailadresse:{" "}
                    <a href="mailto:info@wirtschaftsphysik.de">
                        info@wirtschaftsphysik.de
                    </a>
                    <br />
                    Link zum Impressum:{" "}
                    <Link href="/impressum">/impressum</Link>
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Arten der verarbeiteten Daten</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    – Bestandsdaten (z.B., Namen, Adressen).
                    <br />
                    – Kontaktdaten (z.B., E-Mail, Telefonnummern).
                    <br />
                    – Inhaltsdaten (z.B., Texteingaben, Fotografien, Videos).
                    <br />
                    – Nutzungsdaten (z.B., besuchte Webseiten, Interesse an Inhalten,
                    Zugriffszeiten).
                    <br />
                    – Meta-/Kommunikationsdaten (z.B., Geräte-Informationen,
                    IP-Adressen).
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Kategorien betroffener Personen</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Besucher und Nutzer des Onlineangebotes (Nachfolgend bezeichnen
                    wir die betroffenen Personen zusammenfassend auch als „Nutzer").
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Zweck der Verarbeitung</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    – Zurverfügungstellung des Onlineangebotes, seiner Funktionen und
                    Inhalte.
                    <br />
                    – Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern.
                    <br />
                    – Sicherheitsmaßnahmen.
                    <br />
                    – Reichweitenmessung/Marketing
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Verwendete Begrifflichkeiten</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    „Personenbezogene Daten" sind alle Informationen, die sich auf
                    eine identifizierte oder identifizierbare natürliche Person (im
                    Folgenden „betroffene Person") beziehen; als identifizierbar
                    wird eine natürliche Person angesehen, die direkt oder indirekt,
                    insbesondere mittels Zuordnung zu einer Kennung wie einem Namen,
                    zu einer Kennnummer, zu Standortdaten, zu einer
                    Online-Kennung (z.B. Cookie) oder zu einem oder mehreren
                    besonderen Merkmalen identifiziert werden kann, die Ausdruck der
                    physischen, physiologischen, genetischen, psychischen,
                    wirtschaftlichen, kulturellen oder sozialen Identität dieser
                    natürlichen Person sind.
                    <br />
                    <br />
                    „Verarbeitung" ist jeder mit oder ohne Hilfe automatisierter
                    Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im
                    Zusammenhang mit personenbezogenen Daten. Der Begriff reicht weit
                    und umfasst praktisch jeden Umgang mit Daten.
                    <br />
                    <br />
                    „Pseudonymisierung" die Verarbeitung personenbezogener Daten in
                    einer Weise, dass die personenbezogenen Daten ohne Hinzuziehung
                    zusätzlicher Informationen nicht mehr einer spezifischen
                    betroffenen Person zugeordnet werden können, sofern diese
                    zusätzlichen Informationen gesondert aufbewahrt werden und
                    technischen und organisatorischen Maßnahmen unterliegen, die
                    gewährleisten, dass die personenbezogenen Daten nicht einer
                    identifizierten oder identifizierbaren natürlichen Person
                    zugewiesen werden.
                    <br />
                    <br />
                    „Profiling" jede Art der automatisierten Verarbeitung
                    personenbezogener Daten, die darin besteht, dass diese
                    personenbezogenen Daten verwendet werden, um bestimmte
                    persönliche Aspekte, die sich auf eine natürliche Person
                    beziehen, zu bewerten, insbesondere um Aspekte bezüglich
                    Arbeitsleistung, wirtschaftliche Lage, Gesundheit, persönliche
                    Vorlieben, Interessen, Zuverlässigkeit, Verhalten, Aufenthaltsort
                    oder Ortswechsel dieser natürlichen Person zu analysieren oder
                    vorherzusagen.
                    <br />
                    <br />
                    Als „Verantwortlicher" wird die natürliche oder juristische
                    Person, Behörde, Einrichtung oder andere Stelle, die allein oder
                    gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung
                    von personenbezogenen Daten entscheidet, bezeichnet.
                    <br />
                    <br />
                    „Auftragsverarbeiter" eine natürliche oder juristische Person,
                    Behörde, Einrichtung oder andere Stelle, die personenbezogene
                    Daten im Auftrag des Verantwortlichen verarbeitet.
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Maßgebliche Rechtsgrundlagen</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Nach Maßgabe des Art. 13 DSGVO teilen wir Ihnen die
                    Rechtsgrundlagen unserer Datenverarbeitungen mit. Sofern die
                    Rechtsgrundlage in der Datenschutzerklärung nicht genannt wird,
                    gilt Folgendes: Die Rechtsgrundlage für die Einholung von
                    Einwilligungen ist Art. 6 Abs. 1 lit. a und Art. 7 DSGVO, die
                    Rechtsgrundlage für die Verarbeitung zur Erfüllung unserer
                    Leistungen und Durchführung vertraglicher Maßnahmen sowie
                    Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO, die
                    Rechtsgrundlage für die Verarbeitung zur Erfüllung unserer
                    rechtlichen Verpflichtungen ist Art. 6 Abs. 1 lit. c DSGVO, und
                    die Rechtsgrundlage für die Verarbeitung zur Wahrung unserer
                    berechtigten Interessen ist Art. 6 Abs. 1 lit. f DSGVO. Für den
                    Fall, dass lebenswichtige Interessen der betroffenen Person oder
                    einer anderen natürlichen Person eine Verarbeitung
                    personenbezogener Daten erforderlich machen, dient Art. 6 Abs. 1
                    lit. d DSGVO als Rechtsgrundlage.
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Sicherheitsmaßnahmen</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Wir treffen nach Maßgabe des Art. 32 DSGVO unter Berücksichtigung
                    des Stands der Technik, der Implementierungskosten und der Art,
                    des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie
                    der unterschiedlichen Eintrittswahrscheinlichkeit und Schwere des
                    Risikos für die Rechte und Freiheiten natürlicher Personen,
                    geeignete technische und organisatorische Maßnahmen, um ein dem
                    Risiko angemessenes Schutzniveau zu gewährleisten.
                    <br />
                    <br />
                    Zu den Maßnahmen gehören insbesondere die Sicherung der
                    Vertraulichkeit, Integrität und Verfügbarkeit von Daten durch
                    Kontrolle des physischen Zugangs zu den Daten, als auch des sie
                    betreffenden Zugriffs, der Eingabe, Weitergabe, der Sicherung der
                    Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir
                    Verfahren eingerichtet, die eine Wahrnehmung von
                    Betroffenenrechten, Löschung von Daten und Reaktion auf
                    Gefährdung der Daten gewährleisten. Ferner berücksichtigen wir
                    den Schutz personenbezogener Daten bereits bei der Entwicklung,
                    bzw. Auswahl von Hardware, Software sowie Verfahren, entsprechend
                    dem Prinzip des Datenschutzes durch Technikgestaltung und durch
                    datenschutzfreundliche Voreinstellungen (Art. 25 DSGVO).
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">
                    Zusammenarbeit mit Auftragsverarbeitern und Dritten
                </Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Sofern wir im Rahmen unserer Verarbeitung Daten gegenüber anderen
                    Personen und Unternehmen (Auftragsverarbeitern oder Dritten)
                    offenbaren, sie an diese übermitteln oder ihnen sonst Zugriff auf
                    die Daten gewähren, erfolgt dies nur auf Grundlage einer
                    gesetzlichen Erlaubnis (z.B. wenn eine Übermittlung der Daten an
                    Dritte, wie an Zahlungsdienstleister, gem. Art. 6 Abs. 1 lit. b
                    DSGVO zur Vertragserfüllung erforderlich ist), Sie eingewilligt
                    haben, eine rechtliche Verpflichtung dies vorsieht oder auf
                    Grundlage unserer berechtigten Interessen (z.B. beim Einsatz von
                    Beauftragten, Webhostern, etc.).
                    <br />
                    <br />
                    Sofern wir Dritte mit der Verarbeitung von Daten auf Grundlage
                    eines sog. „Auftragsverarbeitungsvertrages" beauftragen,
                    geschieht dies auf Grundlage des Art. 28 DSGVO.
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Übermittlungen in Drittländer</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Sofern wir Daten in einem Drittland (d.h. außerhalb der
                    Europäischen Union (EU) oder des Europäischen Wirtschaftsraums
                    (EWR)) verarbeiten oder dies im Rahmen der Inanspruchnahme von
                    Diensten Dritter oder Offenlegung, bzw. Übermittlung von Daten an
                    Dritte geschieht, erfolgt dies nur, wenn es zur Erfüllung unserer
                    (vor)vertraglichen Pflichten, auf Grundlage Ihrer Einwilligung,
                    aufgrund einer rechtlichen Verpflichtung oder auf Grundlage
                    unserer berechtigten Interessen geschieht. Vorbehaltlich
                    gesetzlicher oder vertraglicher Erlaubnisse, verarbeiten oder
                    lassen wir die Daten in einem Drittland nur beim Vorliegen der
                    besonderen Voraussetzungen der Art. 44 ff. DSGVO verarbeiten.
                    D.h. die Verarbeitung erfolgt z.B. auf Grundlage besonderer
                    Garantien, wie der offiziell anerkannten Feststellung eines der
                    EU entsprechenden Datenschutzniveaus (z.B. für die USA durch das
                    „Privacy Shield") oder Beachtung offiziell anerkannter spezieller
                    vertraglicher Verpflichtungen (so genannte
                    „Standardvertragsklauseln").
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Rechte der betroffenen Personen</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob
                    betreffende Daten verarbeitet werden und auf Auskunft über diese
                    Daten sowie auf weitere Informationen und Kopie der Daten
                    entsprechend Art. 15 DSGVO.
                    <br />
                    <br />
                    Sie haben entsprechend. Art. 16 DSGVO das Recht, die
                    Vervollständigung der Sie betreffenden Daten oder die
                    Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.
                    <br />
                    <br />
                    Sie haben nach Maßgabe des Art. 17 DSGVO das Recht zu verlangen,
                    dass betreffende Daten unverzüglich gelöscht werden, bzw.
                    alternativ nach Maßgabe des Art. 18 DSGVO eine Einschränkung der
                    Verarbeitung der Daten zu verlangen.
                    <br />
                    <br />
                    Sie haben das Recht zu verlangen, dass die Sie betreffenden
                    Daten, die Sie uns bereitgestellt haben nach Maßgabe des Art. 20
                    DSGVO zu erhalten und deren Übermittlung an andere Verantwortliche
                    zu fordern.
                    <br />
                    <br />
                    Sie haben ferner gem. Art. 77 DSGVO das Recht, eine Beschwerde
                    bei der zuständigen Aufsichtsbehörde einzureichen.
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Widerrufsrecht</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Sie haben das Recht, erteilte Einwilligungen gem. Art. 7 Abs. 3
                    DSGVO mit Wirkung für die Zukunft zu widerrufen
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Widerspruchsrecht</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Sie können der künftigen Verarbeitung der Sie betreffenden Daten
                    nach Maßgabe des Art. 21 DSGVO jederzeit widersprechen. Der
                    Widerspruch kann insbesondere gegen die Verarbeitung für Zwecke
                    der Direktwerbung erfolgen.
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">
                    Cookies und Widerspruchsrecht bei Direktwerbung
                </Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Als „Cookies" werden kleine Dateien bezeichnet, die auf Rechnern
                    der Nutzer gespeichert werden. Innerhalb der Cookies können
                    unterschiedliche Angaben gespeichert werden. Ein Cookie dient
                    primär dazu, die Angaben zu einem Nutzer (bzw. dem Gerät auf dem
                    das Cookie gespeichert ist) während oder auch nach seinem Besuch
                    innerhalb eines Onlineangebotes zu speichern. Als temporäre
                    Cookies, bzw. „Session-Cookies" oder „transiente Cookies", werden
                    Cookies bezeichnet, die gelöscht werden, nachdem ein Nutzer ein
                    Onlineangebot verlässt und seinen Browser schließt. In einem
                    solchen Cookie kann z.B. der Inhalt eines Warenkorbs in einem
                    Onlineshop oder ein Login-Status gespeichert werden. Als
                    „permanent" oder „persistent" werden Cookies bezeichnet, die auch
                    nach dem Schließen des Browsers gespeichert bleiben. So kann z.B.
                    der Login-Status gespeichert werden, wenn die Nutzer diese nach
                    mehreren Tagen aufsuchen. Ebenso können in einem solchen Cookie
                    die Interessen der Nutzer gespeichert werden, die für
                    Reichweitenmessung oder Marketingzwecke verwendet werden. Als
                    „Third-Party-Cookie" werden Cookies bezeichnet, die von anderen
                    Anbietern als dem Verantwortlichen, der das Onlineangebot
                    betreibt, angeboten werden (andernfalls, wenn es nur dessen
                    Cookies sind spricht man von „First-Party Cookies").
                    <br />
                    <br />
                    Wir können temporäre und permanente Cookies einsetzen und klären
                    hierüber im Rahmen unserer Datenschutzerklärung auf.
                    <br />
                    <br />
                    Falls die Nutzer nicht möchten, dass Cookies auf ihrem Rechner
                    gespeichert werden, werden sie gebeten die entsprechende Option
                    in den Systemeinstellungen ihres Browsers zu deaktivieren.
                    Gespeicherte Cookies können in den Systemeinstellungen des
                    Browsers gelöscht werden. Der Ausschluss von Cookies kann zu
                    Funktionseinschränkungen dieses Onlineangebotes führen.
                    <br />
                    <br />
                    Ein genereller Widerspruch gegen den Einsatz der zu Zwecken des
                    Onlinemarketing eingesetzten Cookies kann bei einer Vielzahl der
                    Dienste, vor allem im Fall des Trackings, über die
                    US-amerikanische Seite{" "}
                    <a
                        href="http://www.aboutads.info/choices/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        www.aboutads.info/choices
                    </a>{" "}
                    oder die EU-Seite{" "}
                    <a
                        href="http://www.youronlinechoices.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        www.youronlinechoices.com
                    </a>{" "}
                    erklärt werden. Des Weiteren kann die Speicherung von Cookies
                    mittels deren Abschaltung in den Einstellungen des Browsers
                    erreicht werden. Bitte beachten Sie, dass dann gegebenenfalls
                    nicht alle Funktionen dieses Onlineangebotes genutzt werden
                    können.
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Löschung von Daten</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Die von uns verarbeiteten Daten werden nach Maßgabe der Art. 17
                    und 18 DSGVO gelöscht oder in ihrer Verarbeitung eingeschränkt.
                    Sofern nicht im Rahmen dieser Datenschutzerklärung ausdrücklich
                    angegeben, werden die bei uns gespeicherten Daten gelöscht,
                    sobald sie für ihre Zweckbestimmung nicht mehr erforderlich sind
                    und der Löschung keine gesetzlichen Aufbewahrungspflichten
                    entgegenstehen. Sofern die Daten nicht gelöscht werden, weil sie
                    für andere und gesetzlich zulässige Zwecke erforderlich sind,
                    wird deren Verarbeitung eingeschränkt. D.h. die Daten werden
                    gesperrt und nicht für andere Zwecke verarbeitet. Das gilt z.B.
                    für Daten, die aus handels- oder steuerrechtlichen Gründen
                    aufbewahrt werden müssen.
                    <br />
                    <br />
                    Nach gesetzlichen Vorgaben in Deutschland, erfolgt die
                    Aufbewahrung insbesondere für 10 Jahre gemäß §§ 147 Abs. 1 AO,
                    257 Abs. 1 Nr. 1 und 4, Abs. 4 HGB (Bücher, Aufzeichnungen,
                    Lageberichte, Buchungsbelege, Handelsbücher, für Besteuerung
                    relevanter Unterlagen, etc.) und 6 Jahre gemäß § 257 Abs. 1 Nr. 2
                    und 3, Abs. 4 HGB (Handelsbriefe).
                    <br />
                    <br />
                    Nach gesetzlichen Vorgaben in Österreich erfolgt die Aufbewahrung
                    insbesondere für 7 J gemäß § 132 Abs. 1 BAO
                    (Buchhaltungsunterlagen, Belege/Rechnungen, Konten, Belege,
                    Geschäftspapiere, Aufstellung der Einnahmen und Ausgaben, etc.),
                    für 22 Jahre im Zusammenhang mit Grundstücken und für 10 Jahre
                    bei Unterlagen im Zusammenhang mit elektronisch erbrachten
                    Leistungen, Telekommunikations-, Rundfunk- und
                    Fernsehleistungen, die an Nichtunternehmer in EU-Mitgliedstaaten
                    erbracht werden und für die der Mini-One-Stop-Shop (MOSS) in
                    Anspruch genommen wird.
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">
                    Erbringung unserer satzungs- und geschäftsgemäßen Leistungen
                </Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Wir verarbeiten die Daten unserer Mitglieder, Unterstützer,
                    Interessenten, Kunden oder sonstiger Personen entsprechend Art. 6
                    Abs. 1 lit. b. DSGVO, sofern wir ihnen gegenüber vertragliche
                    Leistungen anbieten oder im Rahmen bestehender geschäftlicher
                    Beziehung, z.B. gegenüber Mitgliedern, tätig werden oder selbst
                    Empfänger von Leistungen und Zuwendungen sind. Im Übrigen
                    verarbeiten wir die Daten betroffener Personen gem. Art. 6 Abs. 1
                    lit. f. DSGVO auf Grundlage unserer berechtigten Interessen, z.B.
                    wenn es sich um administrative Aufgaben oder Öffentlichkeitsarbeit
                    handelt.
                    <br />
                    <br />
                    Die hierbei verarbeiteten Daten, die Art, der Umfang und der
                    Zweck und die Erforderlichkeit ihrer Verarbeitung bestimmen sich
                    nach dem zugrundeliegenden Vertragsverhältnis. Dazu gehören
                    grundsätzlich Bestands- und Stammdaten der Personen (z.B., Name,
                    Adresse, etc.), als auch die Kontaktdaten (z.B., E-Mailadresse,
                    Telefon, etc.), die Vertragsdaten (z.B., in Anspruch genommene
                    Leistungen, mitgeteilte Inhalte und Informationen, Namen von
                    Kontaktpersonen) und sofern wir zahlungspflichtige Leistungen
                    oder Produkte anbieten, Zahlungsdaten (z.B., Bankverbindung,
                    Zahlungshistorie, etc.).
                    <br />
                    <br />
                    Wir löschen Daten, die zur Erbringung unserer satzungs- und
                    geschäftsmäßigen Zwecke nicht mehr erforderlich sind. Dies
                    bestimmt sich entsprechend der jeweiligen Aufgaben und
                    vertraglichen Beziehungen. Im Fall geschäftlicher Verarbeitung
                    bewahren wir die Daten so lange auf, wie sie zur
                    Geschäftsabwicklung, als auch im Hinblick auf etwaige
                    Gewährleistungs- oder Haftungspflichten relevant sein können.
                    Die Erforderlichkeit der Aufbewahrung der Daten wird alle drei
                    Jahre überprüft; im Übrigen gelten die gesetzlichen
                    Aufbewahrungspflichten.
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Registrierfunktion</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Nutzer können ein Nutzerkonto anlegen. Im Rahmen der Registrierung
                    werden die erforderlichen Pflichtangaben den Nutzern mitgeteilt
                    und auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO zu Zwecken der
                    Bereitstellung des Nutzerkontos verarbeitet. Zu den verarbeiteten
                    Daten gehören insbesondere die Login-Informationen (Name,
                    Passwort sowie eine E-Mailadresse). Die im Rahmen der
                    Registrierung eingegebenen Daten werden für die Zwecke der
                    Nutzung des Nutzerkontos und dessen Zwecks verwendet.
                    <br />
                    <br />
                    Die Nutzer können über Informationen, die für deren Nutzerkonto
                    relevant sind, wie z.B. technische Änderungen, per E-Mail
                    informiert werden. Wenn Nutzer ihr Nutzerkonto gekündigt haben,
                    werden deren Daten im Hinblick auf das Nutzerkonto, vorbehaltlich
                    einer gesetzlichen Aufbewahrungspflicht, gelöscht. Es obliegt den
                    Nutzern, ihre Daten bei erfolgter Kündigung vor dem Vertragsende
                    zu sichern. Wir sind berechtigt, sämtliche während der
                    Vertragsdauer gespeicherten Daten des Nutzers unwiederbringlich
                    zu löschen.
                    <br />
                    <br />
                    Im Rahmen der Inanspruchnahme unserer Registrierungs- und
                    Anmeldefunktionen sowie der Nutzung des Nutzerkontos, speichern
                    wird die IP-Adresse und den Zeitpunkt der jeweiligen
                    Nutzerhandlung. Die Speicherung erfolgt auf Grundlage unserer
                    berechtigten Interessen, als auch der Nutzer an Schutz vor
                    Missbrauch und sonstiger unbefugter Nutzung. Eine Weitergabe
                    dieser Daten an Dritte erfolgt grundsätzlich nicht, außer sie ist
                    zur Verfolgung unserer Ansprüche erforderlich oder es besteht
                    hierzu besteht eine gesetzliche Verpflichtung gem. Art. 6 Abs. 1
                    lit. c DSGVO. Die IP-Adressen werden spätestens nach 7 Tagen
                    anonymisiert oder gelöscht.
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Kommentare und Beiträge</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Wenn Nutzer Kommentare oder sonstige Beiträge hinterlassen,
                    können ihre IP-Adressen auf Grundlage unserer berechtigten
                    Interessen im Sinne des Art. 6 Abs. 1 lit. f. DSGVO für 7 Tage
                    gespeichert werden. Das erfolgt zu unserer Sicherheit, falls
                    jemand in Kommentaren und Beiträgen widerrechtliche Inhalte
                    hinterlässt (Beleidigungen, verbotene politische Propaganda,
                    etc.). In diesem Fall können wir selbst für den Kommentar oder
                    Beitrag belangt werden und sind daher an der Identität des
                    Verfassers interessiert.
                    <br />
                    <br />
                    Des Weiteren behalten wir uns vor, auf Grundlage unserer
                    berechtigten Interessen gem. Art. 6 Abs. 1 lit. f. DSGVO, die
                    Angaben der Nutzer zwecks Spamerkennung zu verarbeiten.
                    <br />
                    <br />
                    Die im Rahmen der Kommentare und Beiträge angegebenen Daten,
                    werden von uns bis zum Widerspruch der Nutzer dauerhaft
                    gespeichert.
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Abruf von Emojis und Smilies</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Innerhalb unseres WordPress-Blogs werden grafische Emojis (bzw.
                    Smilies), d.h. kleine grafische Dateien, die Gefühle ausdrücken,
                    eingesetzt, die von externen Servern bezogen werden. Hierbei
                    erheben die Anbieter der Server, die IP-Adressen der Nutzer.
                    Dies ist notwendig, damit die Emojie-Dateien an die Browser der
                    Nutzer übermittelt werden können. Der Emojie-Service wird von der
                    Automattic Inc., 60 29th Street #343, San Francisco, CA 94110,
                    USA, angeboten. Datenschutzhinweise von Automattic:{" "}
                    <a
                        href="https://automattic.com/privacy/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        automattic.com/privacy
                    </a>
                    . Die verwendeten Server-Domains sind s.w.org und
                    twemoji.maxcdn.com, wobei es sich unseres Wissens nach um sog.
                    Content-Delivery-Networks handelt, also Server, die lediglich
                    einer schnellen und sicheren Übermittlung der Dateien dienen und
                    die personenbezogenen Daten der Nutzer nach der Übermittlung
                    gelöscht werden.
                    <br />
                    <br />
                    Die Nutzung der Emojis erfolgt auf Grundlage unserer berechtigten
                    Interessen, d.h. Interesse an einer attraktiven Gestaltung
                    unseres Onlineangebotes gem. Art. 6 Abs. 1 lit. f. DSGVO.
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Kontaktaufnahme</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Bei der Kontaktaufnahme mit uns (z.B. per Kontaktformular,
                    E-Mail, Telefon oder via sozialer Medien) werden die Angaben des
                    Nutzers zur Bearbeitung der Kontaktanfrage und deren Abwicklung
                    gem. Art. 6 Abs. 1 lit. b) DSGVO verarbeitet. Die Angaben der
                    Nutzer können in einem Customer-Relationship-Management System
                    („CRM System") oder vergleichbarer Anfragenorganisation
                    gespeichert werden.
                    <br />
                    <br />
                    Wir löschen die Anfragen, sofern diese nicht mehr erforderlich
                    sind. Wir überprüfen die Erforderlichkeit alle zwei Jahre; Ferner
                    gelten die gesetzlichen Archivierungspflichten.
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Newsletter</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Mit den nachfolgenden Hinweisen informieren wir Sie über die
                    Inhalte unseres Newsletters sowie das Anmelde-, Versand- und das
                    statistische Auswertungsverfahren sowie Ihre Widerspruchsrechte
                    auf. Indem Sie unseren Newsletter abonnieren, erklären Sie sich
                    mit dem Empfang und den beschriebenen Verfahren einverstanden.
                    <br />
                    <br />
                    <strong>Inhalt des Newsletters:</strong> Wir versenden
                    Newsletter, E-Mails und weitere elektronische Benachrichtigungen
                    mit werblichen Informationen (nachfolgend „Newsletter") nur mit
                    der Einwilligung der Empfänger oder einer gesetzlichen Erlaubnis.
                    Sofern im Rahmen einer Anmeldung zum Newsletter dessen Inhalte
                    konkret umschrieben werden, sind sie für die Einwilligung der
                    Nutzer maßgeblich. Im Übrigen enthalten unsere Newsletter
                    Informationen zu unseren Leistungen und uns.
                    <br />
                    <br />
                    <strong>Double-Opt-In und Protokollierung:</strong> Die Anmeldung
                    zu unserem Newsletter erfolgt in einem sog.
                    Double-Opt-In-Verfahren. D.h. Sie erhalten nach der Anmeldung
                    eine E-Mail, in der Sie um die Bestätigung Ihrer Anmeldung
                    gebeten werden. Diese Bestätigung ist notwendig, damit sich
                    niemand mit fremden E-Mailadressen anmelden kann. Die Anmeldungen
                    zum Newsletter werden protokolliert, um den Anmeldeprozess
                    entsprechend den rechtlichen Anforderungen nachweisen zu können.
                    Hierzu gehört die Speicherung des Anmelde- und des
                    Bestätigungszeitpunkts, als auch der IP-Adresse. Ebenso werden
                    die Änderungen Ihrer bei dem Versanddienstleister gespeicherten
                    Daten protokolliert.
                    <br />
                    <br />
                    <strong>Anmeldedaten:</strong> Um sich für den Newsletter
                    anzumelden, reicht es aus, wenn Sie Ihre E-Mailadresse angeben.
                    Optional bitten wir Sie einen Namen, zwecks persönlicher
                    Ansprache im Newsletters anzugeben.
                    <br />
                    <br />
                    Der Versand des Newsletters und die mit ihm verbundene
                    Erfolgsmessung erfolgen auf Grundlage einer Einwilligung der
                    Empfänger gem. Art. 6 Abs. 1 lit. a, Art. 7 DSGVO i.V.m § 7 Abs. 2
                    Nr. 3 UWG oder falls eine Einwilligung nicht erforderlich ist,
                    auf Grundlage unserer berechtigten Interessen am Direktmarketing
                    gem. Art. 6 Abs. 1 lt. f. DSGVO i.V.m. § 7 Abs. 3 UWG.
                    <br />
                    <br />
                    Die Protokollierung des Anmeldeverfahrens erfolgt auf Grundlage
                    unserer berechtigten Interessen gem. Art. 6 Abs. 1 lit. f DSGVO.
                    Unser Interesse richtet sich auf den Einsatz eines
                    nutzerfreundlichen sowie sicheren Newslettersystems, das sowohl
                    unseren geschäftlichen Interessen dient, als auch den Erwartungen
                    der Nutzer entspricht und uns ferner den Nachweis von
                    Einwilligungen erlaubt.
                    <br />
                    <br />
                    <strong>Kündigung/Widerruf</strong> – Sie können den Empfang
                    unseres Newsletters jederzeit kündigen, d.h. Ihre Einwilligungen
                    widerrufen. Einen Link zur Kündigung des Newsletters finden Sie
                    am Ende eines jeden Newsletters. Wir können die ausgetragenen
                    E-Mailadressen bis zu drei Jahren auf Grundlage unserer
                    berechtigten Interessen speichern bevor wir sie löschen, um eine
                    ehemals gegebene Einwilligung nachweisen zu können. Die
                    Verarbeitung dieser Daten wird auf den Zweck einer möglichen
                    Abwehr von Ansprüchen beschränkt. Ein individueller
                    Löschungsantrag ist jederzeit möglich, sofern zugleich das
                    ehemalige Bestehen einer Einwilligung bestätigt wird.
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Newsletter – Versanddienstleister</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Der Versand der Newsletter erfolgt mittels des
                    Versanddienstleisters MailPoet, Wysija SARL, 6 rue Dieudé, 13006,
                    Marseille, FRANCE. Die Datenschutzbestimmungen des
                    Versanddienstleisters können Sie hier einsehen:{" "}
                    <a
                        href="https://www.mailpoet.com/privacy-notice/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        mailpoet.com/privacy-notice
                    </a>
                    . Der Versanddienstleister wird auf Grundlage unserer
                    berechtigten Interessen gem. Art. 6 Abs. 1 lit. f DSGVO und eines
                    Auftragsverarbeitungsvertrages gem. Art. 28 Abs. 3 S. 1 DSGVO
                    eingesetzt.
                    <br />
                    <br />
                    Der Versanddienstleister kann die Daten der Empfänger in
                    pseudonymer Form, d.h. ohne Zuordnung zu einem Nutzer, zur
                    Optimierung oder Verbesserung der eigenen Services nutzen, z.B.
                    zur technischen Optimierung des Versandes und der Darstellung
                    der Newsletter oder für statistische Zwecke verwenden. Der
                    Versanddienstleister nutzt die Daten unserer Newsletterempfänger
                    jedoch nicht, um diese selbst anzuschreiben oder um die Daten an
                    Dritte weiterzugeben.
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Hosting und E-Mail-Versand</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Die von uns in Anspruch genommenen Hosting-Leistungen dienen der
                    Zurverfügungstellung der folgenden Leistungen: Infrastruktur- und
                    Plattformdienstleistungen, Rechenkapazität, Speicherplatz und
                    Datenbankdienste, E-Mail-Versand, Sicherheitsleistungen sowie
                    technische Wartungsleistungen, die wir zum Zwecke des Betriebs
                    dieses Onlineangebotes einsetzen.
                    <br />
                    <br />
                    Hierbei verarbeiten wir, bzw. unser Hostinganbieter Bestandsdaten,
                    Kontaktdaten, Inhaltsdaten, Vertragsdaten, Nutzungsdaten, Meta-
                    und Kommunikationsdaten von Kunden, Interessenten und Besuchern
                    dieses Onlineangebotes auf Grundlage unserer berechtigten
                    Interessen an einer effizienten und sicheren
                    Zurverfügungstellung dieses Onlineangebotes gem. Art. 6 Abs. 1
                    lit. f DSGVO i.V.m. Art. 28 DSGVO (Abschluss
                    Auftragsverarbeitungsvertrag).
                </Text>

                <Separator size="4" my="2" />

                <Heading as="h2" size="5">Erhebung von Zugriffsdaten und Logfiles</Heading>
                <Text as="div" color="gray" size={{ initial: "2", sm: "3" }} style={{ lineHeight: 1.7 }}>
                    Wir, bzw. unser Hostinganbieter, erhebt auf Grundlage unserer
                    berechtigten Interessen im Sinne des Art. 6 Abs. 1 lit. f. DSGVO
                    Daten über jeden Zugriff auf den Server, auf dem sich dieser
                    Dienst befindet (sogenannte Serverlogfiles). Zu den
                    Zugriffsdaten gehören Name der abgerufenen Webseite, Datei, Datum
                    und Uhrzeit des Abrufs, übertragene Datenmenge, Meldung über
                    erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem
                    des Nutzers, Referrer URL (die zuvor besuchte Seite), IP-Adresse
                    und der anfragende Provider.
                    <br />
                    <br />
                    Logfile-Informationen werden aus Sicherheitsgründen (z.B. zur
                    Aufklärung von Missbrauchs- oder Betrugshandlungen) für die Dauer
                    von maximal 7 Tagen gespeichert und danach gelöscht. Daten, deren
                    weitere Aufbewahrung zu Beweiszwecken erforderlich ist, sind bis
                    zur endgültigen Klärung des jeweiligen Vorfalls von der Löschung
                    ausgenommen.
                </Text>
            </Flex>
        </Container>
    );
}