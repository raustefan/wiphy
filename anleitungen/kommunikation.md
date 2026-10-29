# Kommunikation

## Rundmail verschicken

Dashboard → **Rundmail**.

1. **Art der Mail** (Pflicht, ohne Vorauswahl):
   - **Newsletter**: Neuigkeiten. Geht nur an Abonnenten, setzt Abmeldelink in E-Mail Footer
   - **Mitteilung an alle**: Mitgliedschaftsthemen (Versammlung, Beiträge,
     Satzung). Geht an alle gewählten Empfänger, ohne Abmeldelink.
2. **Empfänger**: Alle Benutzer (wirklich jedes Konto, auch Nicht-Vereinsmitglieder) · Ordentliches Mitglied ·
   Ehrenmitglied · Kein Mitglied · Ausgewählte Nutzer (per Suche anhaken).
   Darunter steht, wie viele die Mail bekommen und wie viele wegen
   abbestelltem Newsletter fehlen.
3. **Betreff** und **Nachricht**. Platzhalter siehe unten.
4. Optional **Kopie an mich senden (BCC)**.
5. Optional **Empfängerliste anzeigen** zum Prüfen.
6. **… an X Personen senden**.

Was passiert:

- Jede Person bekommt eine **eigene** Mail, niemand sieht die anderen.
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

Die Website speichert bewusst kein Geschlecht, deshalb die neutrale Anrede.
Beginne Mails am besten mit `$Anrede,`.

## Zu einem Termin einladen

Voraussetzung: Der Termin ist **veröffentlicht und gespeichert**. Sonst lehnt
der Versand ab, weil der Knopf in der Mail ins Leere führen würde.

1. Einer dieser Klicks lädt die Vorlage:
   - **Termine** → **Ankündigen** in der Zeile
   - im Termin → **Termin ankündigen**
   - **Rundmail** → oben unter **Termin ankündigen** auf den Termin
2. Es erscheint **Vorlage geladen**. Betreff („Einladung: …“) und Text sind
   vorbefüllt und frei änderbar.
3. Art der Mail und Empfänger wählen:
   - Stammtisch, Fest, Vortrag → **Newsletter**, Alle Benutzer
   - Mitgliederversammlung → **Mitteilung an alle**, Ordentliches Mitglied,
     danach dieselbe Mail an Ehrenmitglied
4. **Kalenderdatei (.ics) anhängen** angehakt lassen.
5. Senden.

Unter deinen Text hängt die Website automatisch Datum, Uhrzeit, Ort und einen
Knopf zur Terminseite. Diesen Block kannst du nicht bearbeiten, er kommt aus dem
gespeicherten Termin. **Vorlage entfernen** macht wieder eine normale Rundmail.

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
