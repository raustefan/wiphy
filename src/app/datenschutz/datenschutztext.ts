/**
 * Datenschutzerklärung.
 *
 * Als Daten gepflegt, gerendert von `LegalPage` — siehe `src/lib/legal.ts`.
 * Änderungen an der Rechtslage sind hier ein reiner Textdiff.
 *
 * Jede Frist hier muss im Code durchgesetzt sein (oder ausdrücklich als
 * manuelle Prüfung formuliert). Bei inhaltlichen Änderungen `CONSENT_VERSION`
 * in `src/lib/membership.ts` hochzählen.
 */

import type { LegalDocument } from "@/lib/legal";

export const DATENSCHUTZ: LegalDocument = [
  {
    blocks: [
      "Diese Datenschutzerklärung informiert Sie nach Art. 13 und 14 der Datenschutz-Grundverordnung (DSGVO) darüber, welche personenbezogenen Daten wir auf dieser Website und im Mitgliederbereich verarbeiten, zu welchem Zweck, auf welcher Rechtsgrundlage und wie lange — und welche Rechte Sie haben. Begriffe wie „personenbezogene Daten“, „Verarbeitung“ oder „Verantwortlicher“ verwenden wir im Sinne von Art. 4 DSGVO.",
      "Stand: September 2026",
    ],
  },
  {
    title: "Verantwortlicher",
    blocks: [
      {
        lines: [
          "Wirtschaftsphysik Alumni e.V.",
          "c/o Universität Ulm",
          "Studienkommission Physik",
          "Albert-Einstein-Allee 11",
          "89081 Ulm",
          "Deutschland",
        ],
      },
      {
        lines: [
          "E-Mail: [info@wirtschaftsphysik.de](mailto:info@wirtschaftsphysik.de)",
          "Vertretungsberechtigt ist der Vorstand, siehe [Impressum](/impressum).",
        ],
      },
      "Einen Datenschutzbeauftragten haben wir nicht benannt, weil der Verein dazu nach Art. 37 DSGVO und § 38 BDSG nicht verpflichtet ist. Wenden Sie sich mit allen Fragen zum Datenschutz an die oben genannte Adresse.",
    ],
  },
  {
    title: "Überblick",
    blocks: [
      "Wir verarbeiten Daten von Besuchern der Website, von Personen, die uns über das Kontaktformular schreiben, von Inhabern eines Nutzerkontos, von Antragstellern sowie von Mitgliedern und Vorstandsmitgliedern. Wir setzen keine Analyse- oder Tracking-Werkzeuge, keine Werbe-Cookies und keine eingebetteten Inhalte fremder Anbieter (etwa Karten, Videos oder Social-Media-Plugins) ein. Wir erstellen keine Profile und treffen keine automatisierten Entscheidungen im Sinne von Art. 22 DSGVO.",
    ],
  },
  {
    title: "Rechtsgrundlagen",
    blocks: [
      "Soweit wir bei den einzelnen Verarbeitungen nichts anderes angeben, stützen wir uns auf folgende Rechtsgrundlagen:",
      {
        items: [
          "Art. 6 Abs. 1 lit. a DSGVO — Ihre Einwilligung.",
          "Art. 6 Abs. 1 lit. b DSGVO — Durchführung der Mitgliedschaft (die Satzung ist insoweit der Vertrag), der Nutzung Ihres Nutzerkontos oder vorvertraglicher Maßnahmen wie eines Aufnahmeantrags.",
          "Art. 6 Abs. 1 lit. c DSGVO — gesetzliche Pflichten, insbesondere steuerliche Aufbewahrungspflichten.",
          "Art. 6 Abs. 1 lit. f DSGVO — unsere berechtigten Interessen, die wir jeweils benennen.",
        ],
      },
      "Das Speichern von Informationen auf Ihrem Endgerät (Cookies, lokaler Speicher) richtet sich zusätzlich nach § 25 des Telekommunikation-Digitale-Dienste-Datenschutz-Gesetzes (TDDDG).",
    ],
  },
  {
    title: "Hosting und Server-Logfiles",
    blocks: [
      "Die Website läuft auf einem Server der Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, in einem Rechenzentrum in Deutschland. Dort liegen auch die Datenbank und ihre Sicherungskopien. Hetzner verarbeitet die Daten ausschließlich in unserem Auftrag auf Grundlage eines Auftragsverarbeitungsvertrages nach Art. 28 DSGVO.",
      "Beim Aufruf der Website verarbeitet der Webserver technisch notwendig die IP-Adresse, Datum und Uhrzeit, die abgerufene Adresse, den Statuscode, die übertragene Datenmenge, die zuvor besuchte Seite (Referrer) sowie Browsertyp und Betriebssystem. Diese Daten speichern wir in Server-Logfiles, um die Website auszuliefern, Fehler zu analysieren und Angriffe abzuwehren (Art. 6 Abs. 1 lit. f DSGVO). Die Logfiles werden nach spätestens 7 Tagen gelöscht; Einträge, die zur Aufklärung eines konkreten Sicherheitsvorfalls benötigt werden, bis zu dessen Klärung.",
      "Die Verbindung zur Website ist per TLS verschlüsselt.",
    ],
  },
  {
    title: "Cookies und lokaler Speicher",
    blocks: [
      "Wir setzen ausschließlich Cookies ein, die für die Funktion der Website technisch erforderlich sind (§ 25 Abs. 2 Nr. 2 TDDDG); eine Einwilligung ist dafür nicht nötig. Cookies von Drittanbietern gibt es nicht.",
      {
        items: [
          "**Anmelde-Cookie:** Nach dem Login hält ein Cookie Ihre Sitzung aufrecht. Es enthält eine signierte Sitzungskennung und läuft nach 30 Tagen ohne Nutzung ab, bei Administratoren spätestens 12 Stunden nach der Anmeldung. Mit dem Abmelden wird es ungültig.",
          "**Sicherheits-Cookies der Anmeldung:** Schutz gegen gefälschte Anfragen (CSRF) und Rücksprung nach dem Login; sie werden beim Schließen des Browsers gelöscht.",
          "**Ansichts-Cookies für Administratoren:** schalten die Vorschau des Mitgliederbereichs um und werden beim Schließen des Browsers gelöscht.",
        ],
      },
      "Im lokalen Speicher Ihres Browsers (localStorage) legen wir nur ab, ob Sie die helle oder dunkle Darstellung gewählt und ob Sie den Hinweis zur Installation als App ausgeblendet haben. Diese Angaben verlassen Ihr Gerät nicht.",
      "Sie können Cookies und lokalen Speicher in Ihrem Browser jederzeit löschen oder sperren; ohne Anmelde-Cookie ist der Mitgliederbereich allerdings nicht nutzbar.",
    ],
  },
  {
    title: "Schriftarten, Spamschutz und externe Links",
    blocks: [
      "Die verwendeten Schriftarten werden von unserem eigenen Server ausgeliefert; beim Seitenaufruf findet keine Verbindung zu Google oder anderen Schriftanbietern statt.",
      "Formulare schützen wir mit ALTCHA. Dabei löst Ihr Browser eine kleine Rechenaufgabe, die unser eigener Server stellt und prüft. Es werden dabei keine Daten an Dritte übermittelt und keine Cookies gesetzt. Um eine Lösung nicht mehrfach verwenden zu können, speichern wir lediglich ihre Prüfsumme für 30 Minuten.",
      "Links zu externen Angeboten (z. B. LinkedIn-Profile des Vorstands oder Kartenlinks zu OpenStreetMap bei Terminen) sind einfache Verweise. Daten gelangen an diese Anbieter erst, wenn Sie den Link anklicken; ab dann gilt deren Datenschutzerklärung.",
    ],
  },
  {
    title: "Kontaktformular und E-Mail",
    blocks: [
      "Wenn Sie uns über das Kontaktformular oder per E-Mail schreiben, verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse, den Betreff und Ihre Nachricht, um Ihre Anfrage zu beantworten (Art. 6 Abs. 1 lit. b DSGVO, soweit es um eine Mitgliedschaft geht, im Übrigen lit. f). Die Anfrage wird im Verwaltungsbereich gespeichert und per E-Mail an den Vorstand weitergeleitet.",
      "Zum Schutz vor Spam und Missbrauch speichern wir zu jeder Anfrage zusätzlich einen Prüfwert (Hash) Ihrer IP-Adresse, die Browserkennung und eine automatisch berechnete Spam-Einstufung (Art. 6 Abs. 1 lit. f DSGVO). Als Spam eingestufte Anfragen werden gespeichert, aber nicht weitergeleitet.",
      "Wir löschen Anfragen, sobald sie erledigt sind und kein Anschluss-Schriftverkehr mehr zu erwarten ist. Die Erforderlichkeit prüfen wir mindestens alle zwei Jahre.",
    ],
  },
  {
    title: "Nutzerkonto und Registrierung",
    blocks: [
      "Sie können ein Nutzerkonto anlegen, um einen Aufnahmeantrag zu stellen oder als Mitglied den Mitgliederbereich zu nutzen. Dafür verarbeiten wir Vorname, Name, E-Mail-Adresse, Passwort und Geburtsdatum (Art. 6 Abs. 1 lit. b DSGVO). Das Geburtsdatum brauchen wir, weil eine Mitgliedschaft über das Online-Formular erst ab 18 Jahren möglich ist; es wird in einen späteren Aufnahmeantrag übernommen. Das Passwort speichern wir nur als nicht umkehrbaren Hash. Zusätzlich speichern wir den Zeitpunkt der letzten Anmeldung.",
      "Die E-Mail-Adresse müssen Sie über einen zugesandten Link bestätigen. Wird eine Registrierung über das öffentliche Formular nicht innerhalb von 24 Stunden bestätigt, löschen wir das Konto mit allen Angaben automatisch und vollständig. So verhindern wir Konten mit fremden oder erfundenen Adressen und Datenbestände ohne Zweck (Art. 5 Abs. 1 lit. c und e DSGVO). Der Vorstand wird über eine neue Registrierung erst nach der Bestätigung informiert. Von Administratoren angelegte Konten sind von der automatischen Löschung ausgenommen.",
      "Links zum Bestätigen der E-Mail-Adresse und zum Zurücksetzen des Passworts sind nur befristet gültig und werden danach gelöscht.",
      "Über Änderungen, die Ihr Nutzerkonto betreffen (z. B. geänderte Zugangsdaten), informieren wir Sie per E-Mail.",
    ],
  },
  {
    title: "Sicherheitsprotokoll und Missbrauchsschutz",
    blocks: [
      "Um unbefugte Zugriffe auf Nutzerkonten, automatisierte Massenanfragen und Spam zu erkennen und abzuwehren, protokollieren wir sicherheitsrelevante Vorgänge: Anmeldeversuche und erfolgreiche Anmeldungen, Registrierungen über das öffentliche Formular, abgesendete Kontaktanfragen, angeforderte und durchgeführte Passwort-Zurücksetzungen, Bestätigungen und Änderungen der E-Mail-Adresse sowie die automatische Löschung nicht bestätigter Registrierungen.",
      "Zu jedem Vorgang speichern wir Zeitpunkt, Art, Ergebnis (erfolgreich, fehlgeschlagen oder abgewehrt) und einen technischen Kurzcode für den Grund (z. B. „falsche Zugangsdaten“), bei bekannten Konten zusätzlich die Kennung des Kontos. IP-Adresse und E-Mail-Adresse speichern wir nicht im Klartext, sondern nur als Prüfwert (Hash mit geheimem Schlüssel), der lediglich den Vergleich mehrerer Vorgänge erlaubt. Passwörter, Nachrichteninhalte und Zugangs-Links werden nicht protokolliert. Einträge über automatisch gelöschte Registrierungen enthalten nur Zeitpunkt und Grund.",
      "Zusätzlich begrenzen wir die Zahl der Anfragen je Absender. Dafür speichern wir kurzzeitig einen Prüfwert aus IP-Adresse bzw. E-Mail-Adresse und einen Zähler; der Eintrag wird gelöscht, sobald die jeweilige Sperrfrist abgelaufen ist (höchstens 24 Stunden).",
      "Rechtsgrundlage ist unser berechtigtes Interesse an der Sicherheit der Verarbeitung (Art. 6 Abs. 1 lit. f i. V. m. Art. 32 DSGVO). Das Protokoll ist nur für Administratoren zugänglich und wird nicht zur Bewertung von Personen verwendet. Der Prüfwert der IP-Adresse und die Browserkennung werden nach 7 Tagen gelöscht, der übrige Eintrag nach 90 Tagen. Wird ein Nutzerkonto gelöscht, verlieren die zugehörigen Einträge sofort jeden Personenbezug. Einträge, die zur Aufklärung eines konkreten Vorfalls erforderlich sind, bleiben bis zu dessen Klärung erhalten.",
    ],
  },
  {
    title: "Aufnahmeantrag",
    blocks: [
      "Mit einem Aufnahmeantrag verarbeiten wir Ihre Angaben zu Person und Anschrift (Titel, Vorname, Name, Geburtsdatum, Anschrift, optional Telefonnummer), zu Studium und Beruf (z. B. Studiengang, Studienzeiten, Arbeitgeber, Position) sowie gegebenenfalls die Jahre, für die Sie den ermäßigten Beitrag beantragen. Wenn Sie ein SEPA-Lastschriftmandat erteilen, kommen Kontoinhaber, IBAN, BIC, Bank und das Datum des Mandats hinzu; ohne Mandat erheben wir keine Bankdaten.",
      "Die Angaben benötigen wir, um über die Aufnahme zu entscheiden und die Mitgliedschaft durchzuführen (Art. 6 Abs. 1 lit. b DSGVO). Wir speichern den Antrag als unveränderliche Fassung zusammen mit dem Textstand von Satzung und Datenschutzhinweisen, den Sie bestätigt haben, und den zu diesem Zeitpunkt geltenden Beitragssätzen. So bleibt nachweisbar, was beantragt und beschlossen wurde. Zum Schutz vor Missbrauch speichern wir zusätzlich einen Prüfwert (Hash) Ihrer IP-Adresse und die Browserkennung (Art. 6 Abs. 1 lit. f DSGVO).",
      "Den Antrag sieht nur der Vorstand. Sie erhalten eine Eingangsbestätigung per E-Mail. Der Antrag bleibt gespeichert, solange Ihr Nutzerkonto besteht, und wird mit dessen Löschung entfernt.",
    ],
  },
  {
    title: "Mitgliederverwaltung, Beiträge und Lastschrift",
    blocks: [
      "Für die Durchführung der Mitgliedschaft nach der Satzung verarbeiten wir die Daten aus dem Aufnahmeantrag und Ihrem Profil, außerdem die Mitgliedsnummer, das Aufnahmedatum, den Mitgliedsstatus, die Beiträge je Beitragsjahr mit Zahlungsstatus sowie interne Vermerke des Vorstands zu Zahlungs- und Mitgliedschaftsfragen (Art. 6 Abs. 1 lit. b DSGVO). Ihre Profilangaben können Sie im Mitgliederbereich einsehen und selbst ändern.",
      "Bei erteiltem SEPA-Lastschriftmandat übermitteln wir Name, IBAN, BIC, Mandatsreferenz, Mandatsdatum und Betrag zum Einzug der Beiträge an unser kontoführendes Kreditinstitut (Art. 6 Abs. 1 lit. b DSGVO).",
      "Auf Wunsch erstellen wir eine Mitgliedsbescheinigung und Zuwendungsbestätigungen über Ihre Beiträge.",
      "Mitgliederdaten sehen nur der Vorstand und die von ihm bestimmten Administratoren. Eine Mitgliederliste für andere Mitglieder oder eine Weitergabe an Dritte zu Werbezwecken gibt es nicht.",
    ],
  },
  {
    title: "Austritt, Sperrung und Löschung des Nutzerkontos",
    blocks: [
      "Mitglieder können ihren Austritt über den Mitgliederbereich erklären. Dabei speichern wir den Zeitpunkt des Eingangs, das sich daraus nach der Satzung ergebende Austrittsdatum, ob das Nutzerkonto nach dem Austritt weitergeführt werden soll, sowie Zeitpunkt und Vermerk der Bestätigung durch den Vorstand. Diese Angaben dienen dem Nachweis des fristgerechten Zugangs (Art. 6 Abs. 1 lit. b und f DSGVO) und werden drei Jahre nach dem Austritt gelöscht; eine zurückgenommene Kündigung drei Jahre nach der Rücknahme. Beendet der Vorstand eine Mitgliedschaft auf anderem Weg (etwa nach einer Erklärung außerhalb des Mitgliederbereichs oder durch Ausschluss), halten wir Datum und Vermerk ebenso fest; es gelten dieselben Fristen.",
      "Mit dem Austrittsdatum endet die Mitgliedschaft; der Login wird gesperrt, sofern nicht die Weiterführung als Konto ohne Mitgliedschaft gewünscht wurde. Die übrigen Mitgliedsdaten werden gelöscht, sobald offene Beiträge abgewickelt sind; für die Beitragsaufzeichnungen gilt die am Ende dieses Abschnitts genannte Aufbewahrungsfrist.",
      "Mitglieder können ihren Zugang zum Mitgliederbereich jederzeit deaktivieren. Da die Mitgliedschaft fortbesteht, bleiben die dafür erforderlichen Daten (insbesondere Name, Anschrift, Kontakt- und Zahlungsdaten) gespeichert (Art. 6 Abs. 1 lit. b DSGVO); gesperrt wird lediglich die Anmeldung. Auf Wunsch reaktiviert der Vorstand den Zugang.",
      "Nutzerkonten ohne Mitgliedschaft können von den Nutzern selbst oder vom Vorstand jederzeit gelöscht werden. Die Löschung erfolgt sofort und vollständig, einschließlich gestellter Anträge und offener Bestätigungs- oder Passwort-Links; Einträge im Sicherheitsprotokoll und im Versandprotokoll verlieren dabei jeden Personenbezug.",
      "Ausgenommen sind Aufzeichnungen über Mitgliedsbeiträge (Beitragsjahr, Betrag, Zahlungsstatus). Sie bleiben mit Name und Mitgliedsnummer zur Erfüllung der steuerlichen Aufbewahrungspflicht nach § 147 AO (Art. 6 Abs. 1 lit. c, Art. 17 Abs. 3 lit. b DSGVO) zehn Jahre nach Ende des jeweiligen Beitragsjahres erhalten. Ihre Verarbeitung ist in dieser Zeit eingeschränkt (Art. 18 DSGVO): Sie sind nur für den Vorstand einsehbar, werden nicht verändert und nach Ablauf der Frist automatisch gelöscht.",
    ],
  },
  {
    title: "Vereinsmails und Versandprotokoll",
    blocks: [
      "Der Vorstand informiert Mitglieder und Kontoinhaber per E-Mail über Vereinsangelegenheiten, etwa Einladungen zur Mitgliederversammlung, Termine und Beitragsfragen (Art. 6 Abs. 1 lit. b DSGVO). Werbung für Dritte versenden wir nicht; einen Newsletter mit gesonderter Anmeldung gibt es nicht.",
      "Für diese Mails führen wir ein Versandprotokoll mit Betreff, Zeitpunkt und Empfängern: bei einer Mail an eine einzelne Person deren E-Mail-Adresse, bei Rundmails nur die Empfängergruppe (z. B. „Ehrenmitglieder“) und die Anzahl der Empfänger. Den Inhalt speichern wir nicht. Zweck ist der Nachweis, dass etwa eine Einladung verschickt wurde (Art. 6 Abs. 1 lit. f DSGVO). Das Protokoll ist nur für Administratoren zugänglich; Einträge werden nach einem Jahr automatisch gelöscht, bei Löschung eines Nutzerkontos wird dessen E-Mail-Adresse sofort entfernt.",
    ],
  },
  {
    title: "E-Mail-Versand über Google Workspace",
    blocks: [
      "Alle E-Mails der Website (Bestätigungs- und Passwort-Links, Eingangsbestätigungen, Weiterleitung von Kontaktanfragen, Vereinsmails) versenden wir über Google Workspace der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Google verarbeitet dabei Absender, Empfänger, Betreff und Inhalt der Mails in unserem Auftrag auf Grundlage eines Auftragsverarbeitungsvertrages nach Art. 28 DSGVO. Grundlage ist unser berechtigtes Interesse an einem zuverlässigen Mailversand (Art. 6 Abs. 1 lit. f DSGVO).",
      "Dabei ist eine Übermittlung an die Google LLC in den USA nicht auszuschließen. Google LLC ist nach dem EU-US Data Privacy Framework zertifiziert; die Übermittlung stützt sich auf den Angemessenheitsbeschluss der EU-Kommission vom 10. Juli 2023 (Art. 45 DSGVO), ergänzend auf Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO). Datenschutzhinweise von Google: [policies.google.com/privacy](https://policies.google.com/privacy).",
    ],
  },
  {
    title: "Vorstand, Blog und Termine",
    blocks: [
      "Von unseren Vorstandsmitgliedern veröffentlichen wir auf der Seite „Vorstand“ Name und Funktion sowie, wenn gewünscht, ein Profilfoto und einen Link zum LinkedIn-Profil. Zweck ist die Außendarstellung und Erreichbarkeit des Vorstands (Art. 6 Abs. 1 lit. f DSGVO); Foto und LinkedIn-Link veröffentlichen wir nur mit Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die jederzeit widerrufen werden kann. Namen und Funktionen der Vorsitzenden erscheinen außerdem in der Signatur von Vereinsmails und im Impressum. Mit dem Ausscheiden aus dem Amt werden die Angaben entfernt.",
      "In Blogbeiträgen berichten wir über Vereinsveranstaltungen, gelegentlich mit Fotos, auf denen Teilnehmende zu erkennen sind (Art. 6 Abs. 1 lit. f DSGVO, berechtigtes Interesse an der Berichterstattung über das Vereinsleben). Hochgeladene Bilder werden vor der Veröffentlichung verkleinert und von eingebetteten Metadaten (z. B. Aufnahmeort) befreit. Wenn Sie auf einem Foto nicht erscheinen möchten, genügt eine formlose Nachricht; wir entfernen das Bild dann.",
      "Termine und die Kalenderdatei zum Abonnieren enthalten keine Daten über Teilnehmende.",
    ],
  },
  {
    title: "Empfänger und Übermittlung in Drittländer",
    blocks: [
      "Ihre Daten erhalten innerhalb des Vereins nur der Vorstand und die von ihm bestimmten Administratoren, jeweils soweit für ihre Aufgabe erforderlich. Externe Empfänger sind unser Hosting-Anbieter (Hetzner), unser E-Mail-Dienstleister (Google) sowie bei Lastschriften unser Kreditinstitut. Darüber hinaus geben wir Daten nur weiter, wenn wir gesetzlich dazu verpflichtet sind (z. B. gegenüber Finanzbehörden) oder es zur Durchsetzung unserer Ansprüche erforderlich ist.",
      "Eine Übermittlung in Länder außerhalb der EU bzw. des EWR ist nur beim E-Mail-Versand über Google möglich; Einzelheiten stehen im Abschnitt dazu.",
    ],
  },
  {
    title: "Speicherdauer",
    blocks: [
      "Wir löschen personenbezogene Daten, sobald sie für ihren Zweck nicht mehr erforderlich sind und keine gesetzliche Aufbewahrungspflicht entgegensteht; die konkreten Fristen stehen bei den einzelnen Verarbeitungen. Unterliegen Daten einer Aufbewahrungspflicht, schränken wir ihre Verarbeitung bis zum Fristablauf ein. Für steuerlich relevante Unterlagen (z. B. Buchungsbelege und Beitragsaufzeichnungen) beträgt die Frist zehn Jahre (§ 147 Abs. 1 und 3 AO).",
      "Gelöschte Daten können noch bis zu ihrem planmäßigen Überschreiben in Sicherungskopien der Datenbank enthalten sein. Aus Sicherungskopien stellen wir nur im Notfall wieder her; bereits gelöschte Daten löschen wir danach erneut.",
    ],
  },
  {
    title: "Ihre Rechte",
    blocks: [
      "Sie haben gegenüber uns das Recht auf",
      {
        items: [
          "Auskunft über die zu Ihrer Person gespeicherten Daten und eine Kopie davon (Art. 15 DSGVO),",
          "Berichtigung unrichtiger oder Vervollständigung unvollständiger Daten (Art. 16 DSGVO),",
          "Löschung (Art. 17 DSGVO) oder Einschränkung der Verarbeitung (Art. 18 DSGVO),",
          "Erhalt der von Ihnen bereitgestellten Daten in einem gängigen, maschinenlesbaren Format (Art. 20 DSGVO),",
          "Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO); die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung bleibt unberührt.",
        ],
      },
      "Eine formlose Nachricht an [info@wirtschaftsphysik.de](mailto:info@wirtschaftsphysik.de) genügt.",
      "**Widerspruchsrecht (Art. 21 DSGVO):** Soweit wir Daten auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO) verarbeiten, können Sie dem aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen. Wir verarbeiten die Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Ihre Interessen überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.",
      "Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Für uns zuständig ist:",
      {
        lines: [
          "Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg",
          "Lautenschlagerstraße 20, 70173 Stuttgart",
          "[www.baden-wuerttemberg.datenschutz.de](https://www.baden-wuerttemberg.datenschutz.de)",
        ],
      },
    ],
  },
  {
    title: "Pflicht zur Bereitstellung",
    blocks: [
      "Die Nutzung der öffentlichen Website ist ohne Angabe personenbezogener Daten möglich. Für ein Nutzerkonto, einen Aufnahmeantrag und die Mitgliedschaft sind die im Formular als Pflichtfeld gekennzeichneten Angaben erforderlich; ohne sie können wir das Konto nicht anlegen bzw. über die Aufnahme nicht entscheiden. Bankdaten sind nur bei Erteilung eines Lastschriftmandats erforderlich.",
    ],
  },
  {
    title: "Änderungen",
    blocks: [
      "Wir passen diese Datenschutzerklärung an, wenn sich die Website, unsere Verarbeitungen oder die Rechtslage ändern. Es gilt die jeweils hier veröffentlichte Fassung; über wesentliche Änderungen, die Mitglieder betreffen, informieren wir per E-Mail.",
    ],
  },
];
