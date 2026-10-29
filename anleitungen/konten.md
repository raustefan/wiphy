# Konten

## Benutzerverwaltung

Dashboard → **Benutzerverwaltung**. Jedes Konto steht genau einmal in der
Tabelle, getrennt in **Mitglieder**, **Ehrenmitglieder** und **Keine
Mitglieder**. Beitragsspalten, Kennzahlen und Filter gelten immer für das oben
gewählte **Beitragsjahr** (vorausgewählt: das laufende).

> Ist das gewählte Jahr noch nicht angelegt, zeigt die Seite statt der Tabelle
> nur die Karte „… ist noch nicht angelegt“. Das passiert vor allem im Januar.
> Siehe [Beitragsjahr hinzufügen](beitraege.md#beitragsjahr-hinzufügen).

### Was passiert, wenn du klickst

| Klick auf | Ergebnis |
|---|---|
| **Beitragssätze** (oben rechts) | Dialog mit den Monatssätzen, siehe [Beiträge](beitraege.md#beitragssätze) |
| **Neues Konto** | Formular „Benutzer hinzufügen“ |
| **Beitragsjahr** (Auswahl) | lädt Tabelle und Kennzahlen für dieses Jahr. Die Auswahl der Häkchen wird geleert. |
| **Bearbeiten** (Schalter) | schaltet Zahlung, Tarif und Betrag zum Ändern frei, der Tabellenrahmen wird farbig. Nach dem Neuladen ist wieder gesperrt. |
| **Spaltenüberschrift** | sortiert innerhalb jeder Gruppe, zweiter Klick dreht die Richtung |
| **Name** | Beitragsverlauf aller Jahre, mit Knopf „Profil bearbeiten“ |
| **E-Mail-Adresse** | Mail an diese eine Person (Dialog) |
| **Sprechblase** | interne Notiz. Gelb = Notiz vorhanden. Derselbe Text wie „Interner Vermerk“ im Profil. |
| **Stift** (ganz rechts) | öffnet das Profil zum Bearbeiten |
| **Häkchen links** | wählt Konten aus, das Kästchen im Kopf wählt alle sichtbaren |
| **Alle offenen** | wählt alle sichtbaren Konten mit offenem Beitrag im Jahr |
| **E-Mail an Auswahl** / **SEPA-Lastschrift** | siehe [Beiträge](beitraege.md) |

Zahlung, Tarif und Betrag ändern: siehe [Beiträge](beitraege.md#zahlungen-pflegen).

### Suche und Filter

Das Suchfeld findet Name, E-Mail und Mitgliedsnummer. Darunter filterst du nach
Rolle, Zugang (aktiv, Login gesperrt, E-Mail unbestätigt), Lastschrift,
Beitrag (offen/bezahlt) und Tarif (Sonderstatus, regulär, letztes Jahr
ermäßigt). Die Filter stehen in der Adresszeile und bleiben nach dem Zurückkommen
aus einem Profil erhalten. **Filter zurücksetzen** leert alle.

**Wichtig:** Ausgewählt ist nur, was sichtbar ist. Was ein Filter ausblendet,
bekommt keine Mail und landet in keiner SEPA-Datei.

### Symbole und Badges am Namen

| Zeichen | Bedeutung |
|---|---|
| Bankgebäude / Münzen | zahlt per Lastschrift / ohne Lastschrift (+10 %) |
| Schild | Administrator |
| durchgestrichene Person | Login gesperrt |
| rotes ✗ an der E-Mail | Adresse nicht bestätigt |
| „ausgetreten“ | im gewählten Jahr ausgetreten, Beitrag noch geschuldet |
| „neu“ | erst nach dem gewählten Jahr eingetreten, daher kein Beitrag |
| „Studium endet · offen“ | letztes ermäßigtes Jahr, Mitglied hat noch nicht gesagt, ob es weiter studiert |
| „Studium endet · bestätigt“ | Mitglied hat bestätigt: ab nächstem Jahr regulär |

Die Legende unter der Tabelle erklärt alle Symbole. In **vergangenen Jahren**
stehen nur Konten, die damals Mitglied waren. Wie viele ausgeblendet sind,
steht über der Tabelle.

## Konto von Hand anlegen

Normalerweise registrieren sich Leute selbst unter `/mitglied-werden`. Von Hand
nur, wenn das nicht geht (z. B. Papieranmeldung).

1. **Neuer User** (Dashboard) oder **Neues Konto** (Benutzerverwaltung).
2. Vorname, Nachname, E-Mail, Passwort. **Generieren** erzeugt ein sicheres
   Passwort.
3. **Person per E-Mail informieren** anhaken, wenn die Person ihre Zugangsdaten
   samt Passwort per Mail bekommen soll. Sonst musst du es ihr selbst sagen.
4. **Rolle** und **Status** wählen. Für Mitglieder: **Mitglieds-ID** leer lassen
   (= nächste freie), **Vereinsbeitritt** eintragen, Bankdaten oder **Nimmt
   nicht an SEPA teil**.
5. Optional: **Alle Beiträge bezahlt**, **Jahre mit ermäßigtem Beitrag**.
6. **Hinzufügen**.

Was dann passiert:

- Die E-Mail-Adresse gilt sofort als bestätigt. Das Konto wird nie automatisch
  gelöscht.
- Für ordentliche Mitglieder entstehen Beitragseinträge vom Beitrittsjahr bis
  zum laufenden Jahr. **Alle Beiträge bezahlt** setzt sie auf bezahlt.
- **Bemerkung** wird zur internen Notiz.

Den Bereich **Alumni importieren** unten auf der Seite brauchst du nicht mehr,
er war für die einmalige Übernahme der Altdaten.

## Konto bearbeiten

Benutzerverwaltung → **Stift**. Oben stehen dieselben Felder, die das Mitglied
selbst sieht, darunter der **Adminbereich**:

| Feld | Hinweis |
|---|---|
| Lastschrift (SEPA-Mandat erteilt) | ohne Haken: +10 % und nicht in der SEPA-Datei |
| Kontoinhaber:in, IBAN, BIC | BIC nur außerhalb des EWR nötig |
| Mandatsreferenz | leer lassen = angezeigte Standardreferenz. Nur ändern, wenn bei der Bank eine andere hinterlegt ist. |
| Mandat erteilt am | Datum der Unterschrift |
| Mitglieds-ID | muss eindeutig sein, sonst Fehlermeldung |
| Rolle / Status | Status „Kein Mitglied“ = Austritt, siehe [Mitgliedschaft](mitgliedschaft.md#austritt-von-hand-eintragen) |
| Login deaktiviert | siehe unten |
| Interner Vermerk | nur für Admins sichtbar |

**Speichern** öffnet eine Übersicht aller Änderungen (alt → neu).
**Ja, Änderungen speichern** übernimmt sie. Verlässt du die Seite mit
ungespeicherten Änderungen, fragt sie nach.

Änderst du die **E-Mail-Adresse** eines anderen Kontos, gilt sie sofort, ohne
Bestätigungslink. Den **Newsletter** einer anderen Person siehst du nur, ändern
kann sie ihn selbst.

## Login sperren

Die Person soll sich nicht mehr anmelden, ihre Daten und Mitgliedschaft bleiben:

**Login deaktiviert** anhaken → **Speichern**. Am Namen erscheint das
Sperr-Symbol, das Konto verschwindet aus dem Alumni-Kosmos. Wieder freischalten:
Haken entfernen, speichern.

## Konto löschen

Geht nur bei Status **Kein Mitglied**. Bei Mitgliedern steht statt des Knopfs ein
Hinweis.

1. Profil öffnen → ganz unten **Mitglied löschen**.
2. Warnung → **Fortfahren**.
3. E-Mail-Adresse des Kontos eintippen → **Endgültig löschen**.

Das Konto ist sofort weg. Nur die Beitragszeilen bleiben mit Name und
Mitgliedsnummer für die steuerliche Aufbewahrungsfrist gesperrt im Archiv.

Von selbst gelöscht werden: Ausgetretene, sobald alle Beiträge bezahlt sind
(siehe [Mitgliedschaft](mitgliedschaft.md#austritte)), und selbst registrierte
Konten, die ihre E-Mail nicht innerhalb von 24 Stunden bestätigen.
