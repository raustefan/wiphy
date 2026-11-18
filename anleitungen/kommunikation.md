# Kommunikation

## Rundmail verschicken

Dashboard → **Rundmail**. Die Mail entsteht in neun Schritten. **Nichts ist
vorausgewählt**: Jeder Schritt muss angeklickt oder mit **Weiter** bestätigt
werden. Danach klappt er zu einer Zeile mit deiner Wahl zusammen, so siehst du
alle Einstellungen auf einen Blick. **Ändern** öffnet ihn wieder.

1. **Vorlage**:
   - **Termin**: Einladung zu einem kommenden Termin, siehe
     [Zu einem Termin einladen](#zu-einem-termin-einladen).
   - **Blogpost**: Beitrag der letzten sechs Monate, siehe
     [Blogbeitrag ankündigen](#blogbeitrag-ankündigen).
   - **SEPA-Ankündigung**: Vorabankündigung des Lastschrifteinzugs, siehe
     [SEPA-Einzug ankündigen](#sepa-einzug-ankündigen).
   - **Sonstige Nachricht**: freier Text ohne Infoblock.
2. **Art der Mail**:
   - **Newsletter**: Neuigkeiten. Geht nur an Abonnenten, mit Abmeldelink im
     Fuß der Mail.
   - **Mitteilung an alle**: Mitgliedschaftsthemen (Versammlung, Beiträge,
     SEPA-Einzug, Satzung). Geht an alle gewählten Empfänger, ohne Abmeldelink.
3. **Empfänger**: Alle Nutzer (wirklich jedes Konto, auch Nicht-Mitglieder) ·
   Alle Vereinsmitglieder · Mitglieder mit SEPA-Mandat · Mitglieder ohne
   SEPA-Mandat · Ehrenmitglieder · Ausgewählte Nutzer (per Suche anhaken, dann
   **Weiter**). Jede Karte zeigt, wie viele Personen dazugehören. Darunter steht,
   wer wegen abbestelltem Newsletter fehlt.
4. **Betreff**: Pflicht. Die Vorlage schlägt einen vor, du kannst ihn ändern.
5. **Anrede**: „Guten Tag Anna Müller,“ über dem Text oder keine Anrede.
6. **Inhalt**: dein Text im Editor, optional bis zu drei **Fotos** als Anhang,
   siehe [Fotos anhängen](#fotos-anhängen). Bei Termin und Blogpost ist der Text
   optional, der Infoblock trägt den Inhalt.
7. **Kopie an mich**: ja (an die angezeigte Adresse) oder nein.
8. **Vorschau & Prüfung** (Pflicht): **Vorschau erstellen**, ansehen, dann
   **Ich habe die Vorschau geprüft** anhaken. Darunter steht, wie viele
   Empfänger der Server zählt. Änderst du danach etwas, musst du die Vorschau
   neu erstellen, sonst lehnt der Versand ab.
9. **Zusammenfassung & Versand**: Empfängerzahl, **Empfängerliste anzeigen**,
   optional **Testmail senden** und **Jetzt an X Personen senden**. Ab 20
   Empfängern fragt die Seite noch einmal nach.

Die **Testmail** geht nur an dich, mit deinen eigenen Daten eingesetzt (bei
SEPA mit deinem Betrag, falls du selbst eingezogen wirst). Sie steht nicht im
Versandprotokoll. Gut, um die Mail einmal im echten Postfach zu sehen.

Was passiert:

- Jede Person bekommt eine **eigene** Mail, niemand sieht die anderen.
- Die Mails gehen **eine nach der anderen** raus. Bei vielen Empfängern dauert
  das **einige Minuten**, mit Fotos im Anhang deutlich länger.
- Während des Versands ist die Seite gesperrt. **Nicht neu laden, Fenster
  nicht schließen.**
- Danach siehst du das Ergebnis. Bei „teilweise gesendet“ steht, bei wem es
  scheiterte. Schick die Mail dann nur an diese (Ausgewählte Nutzer).
- Unter jeder Mail steht automatisch die Vereinssignatur, siehe
  [Vorstand](inhalte.md#vorstand-und-signatur).
- Unten auf der Seite steht das **Versandprotokoll**: die letzten 50 Mails mit
  Datum, Betreff, Gruppe und Anzahl, ohne Inhalt. Einträge verschwinden nach
  einem Jahr.

Für eine Mail an einzelne Personen ist die
[Benutzerverwaltung](konten.md#benutzerverwaltung) schneller: E-Mail-Adresse
anklicken oder Konten anhaken → **E-Mail an Auswahl**.

## Newsletter oder Mitteilung?

**Faustregel:** Ist die Mail auch für jemanden wichtig, der keine Werbung will,
ist es eine Mitteilung. Sonst Newsletter. Nutze „Mitteilung an alle“ nicht, um
Abmeldungen zu umgehen.

- Jedes Konto ist anfangs angemeldet.
- Abbestellen: Abmeldelink im Newsletter (ohne Login), Dashboard → **Mein
  Konto → Newsletter**, oder das Abbestellen im Mailprogramm.
- Beim Austritt wird der Newsletter automatisch abbestellt.
- **Als Admin kannst du den Status anderer nicht ändern**, nur sehen (im Profil
  und als Badge „Kein Newsletter“ in der Empfängerauswahl).

## Platzhalter

Funktionieren in Betreff und Nachricht, genau so geschrieben (`$anrede` geht
nicht):

| Platzhalter | wird zu |
|---|---|
| `$Anrede` | „Guten Tag Anna Müller“ (ohne Namen: „Guten Tag“) |
| `$Vorname` / `$Nachname` / `$Name` | Anna / Müller / Anna Müller |

Die Website speichert bewusst kein Geschlecht, deshalb die neutrale Anrede. Für
die Anrede über dem Text brauchst du keinen Platzhalter mehr: Wähl im Schritt
**Anrede** „Guten Tag Anna Müller,“. In Vorschau und Kopie steht dort `$Anrede`,
ersetzt wird erst beim Versand.

## Zu einem Termin einladen

Voraussetzung: Der Termin ist **veröffentlicht und gespeichert**. Sonst lehnt
die Vorschau ab, weil der Knopf in der Mail ins Leere führen würde.

1. Vorlage **Termin** wählen und den Termin anklicken. Schneller geht es über
   **Termine** → **Ankündigen** in der Zeile oder im Termin → **Termin
   ankündigen**: Dann sind Vorlage und Termin schon markiert, du bestätigst sie
   mit **Weiter**.
2. **Kalenderdatei (.ics) anhängen** angehakt lassen → **Weiter**.
3. Art der Mail und Empfänger:
   - Stammtisch, Fest, Vortrag → **Newsletter**, Alle Nutzer
   - Mitgliederversammlung → **Mitteilung an alle**, Alle Vereinsmitglieder
4. Betreff („Einladung: …“) übernehmen oder ändern, Anrede wählen.
5. Text optional, dann wie oben weiter bis zum Versand.

Unter deinen Text hängt die Website automatisch einen Infoblock mit Titel,
Kurzbeschreibung, Datum, Uhrzeit, Ort und einem Knopf zur Terminseite. Er kommt
aus dem gespeicherten Termin und lässt sich in der Mail nicht bearbeiten.
**Schreib Titel und Kurzbeschreibung nicht noch einmal in den Text**, sonst
stehen sie doppelt drin.

## Blogbeitrag ankündigen

Ankündigen lassen sich nur **veröffentlichte Beiträge der letzten sechs
Monate**.

1. Vorlage **Blogpost** wählen und den Beitrag anklicken → **Weiter**. Oder in
   **Blog** → **Per Mail ankündigen** in der Zeile des Beitrags.
2. Meist **Newsletter** und **Alle Nutzer**.
3. Betreff („Neuer Beitrag: …“) übernehmen oder ändern, Anrede wählen, Text
   optional.

Der Infoblock zeigt Titel, Titelbild, Vorschautext und den Knopf **Beitrag
lesen**. Manche Mailprogramme laden Bilder erst nach einem Klick.

## SEPA-Einzug ankündigen

Vor jeder Lastschrift muss der Verein den Einzug mit **Betrag und Datum**
ankündigen (Vorabankündigung). Das erledigt diese Vorlage, mit dem
**persönlichen Betrag** jeder Person.

1. Vorlage **SEPA-Ankündigung** wählen.
2. **Geplantes Einzugsdatum** eintragen. Darunter steht, wie viele Mitglieder
   im Beitragsjahr dieses Datums einen offenen Beitrag per Lastschrift haben →
   **Weiter**.
3. Art der Mail: **Mitteilung an alle** (Newsletter ist gesperrt, die
   Ankündigung ist Pflicht).
4. Empfänger: **Mitglieder mit SEPA-Mandat** (empfohlen).
5. Betreff und Text sind vorbelegt und änderbar.

Jede Mail bekommt einen Infoblock mit **Betrag**, **Einzugsdatum**,
**Mandatsreferenz**, **Gläubiger-ID**, den letzten vier Stellen der **IBAN**
und einem Knopf **Bankverbindung prüfen**.

Die **Gläubiger-ID** kommt aus der Server-Konfiguration (`SEPA_CREDITOR_ID` in
der `.env`, dieselbe wie im SEPA-Dialog). Fehlt sie, lehnt schon die Vorschau
ab. Die Beträge kommen aus derselben
Quelle wie die [SEPA-Datei](beitraege.md#sepa-lastschrift), stimmen also mit
dem Einzug überein. In Vorschau und Kopie steht statt der persönlichen Angaben
„wird pro Person eingesetzt“.

Wer im Beitragsjahr nichts eingezogen bekommt (bezahlt, kein Eintrag, Bankdaten
unvollständig), wird ausgelassen. Die Seite sagt dir vorher, wie viele das sind.

Kündige rechtzeitig an, üblich sind **14 Tage vor dem Einzug**. Das Datum in
der Mail sollte mit dem **Fälligkeitsdatum** der SEPA-Datei übereinstimmen.

## Fotos anhängen

Im Schritt **Inhalt** kannst du bis zu **drei Fotos** anhängen.

- Sie werden automatisch verkleinert (höchstens 1600 px) und **ohne
  Standortdaten** verschickt. Gespeichert wird nichts.
- Zusammen höchstens etwa 3 MB.
- **Fotos machen den Versand deutlich langsamer.** Jede Person bekommt eine
  eigene Mail **mit** Anhang. Bei 100 Empfängern verschickst du die Fotos also
  100-mal, der Versand kann dann viele Minuten dauern. Häng Fotos nur an, wenn sie wirklich in die Mail gehören. Für einen
  Bericht mit Bildern ist ein Blogbeitrag besser.
- iPhone-Fotos im Format HEIC lassen sich nicht in jedem Browser verkleinern.
  Dann erscheint ein Hinweis, das Foto als JPEG oder PNG anzuhängen.

## Kontaktanfragen

Nachrichten aus `/kontakt` kommen per Mail an alle Admins und stehen unter
Dashboard → **Kontaktanfragen** (beides per Feature Flag abschaltbar).

| Klick auf | Ergebnis |
|---|---|
| **Antworten** | öffnet dein Mailprogramm mit Adresse und Betreff. Die Antwort geht von deiner eigenen Adresse raus. |
| **Erledigt** | Badge „Erledigt“, damit andere Admins wissen, dass sich jemand kümmert. **Wieder öffnen** nimmt es zurück. |
| **Löschen** | nach Rückfrage endgültig weg |

Badges: **Spam-Verdacht (Zahl)** = nicht gemailt, steht nur hier, meist löschen.
**Nicht gemailt** = Mail an die Admins ist nicht rausgegangen.

Lösch erledigte Anfragen regelmäßig, sie enthalten personenbezogene Daten.
