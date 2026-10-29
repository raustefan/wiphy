# Technik

Alle Seiten hier sind nur im **Debug-Modus** erreichbar, auch nicht über die
direkte Adresse.

## Debug-Modus

**Einschalten:** Dashboard → Karte **Verwaltung** → Knopf **Debug-Modus**
(Badge wechselt auf „An“). Drei gestrichelte Kacheln erscheinen: **Feature
Flags**, **Sicherheit**, **Server**. Der Modus gilt nur in diesem Browser und
endet, wenn du ihn schließt.

Am unteren Rand liegt dann die **Debug-Leiste**:

| Element | Zeigt / tut |
|---|---|
| Sitzung bis … | Ende deiner Admin-Sitzung (12 h ab Login) |
| Flags, z. B. `31/32` | wie viele Feature Flags an sind. Maus darüber: welche aus sind. |
| Commit, Uhrzeit | laufender Code-Stand und wann die Seite erzeugt wurde |
| **Konsole** | Server-Logs live, nur lesen |
| **Als Mitglied** | zeigt jede Seite so, wie ein Mitglied sie sieht. Admin-Seiten sind dann wirklich gesperrt. **Admin-Ansicht** schaltet zurück. |
| **Beenden** | schaltet den Debug-Modus aus |

## Feature Flags

Debug-Modus → **Feature Flags**. Schalter umlegen, fertig: Die Änderung gilt
**sofort für alle**. Was jeder Schalter tut, steht auf der Seite direkt
darunter. Wer eine abgeschaltete Funktion nutzt, sieht einen Hinweisdialog.

Zusammenhänge, die man leicht übersieht:

- **„Mail-Versand (alle Mails)“ ist der Hauptschalter.** Aus = gar keine Mail,
  auch keine Passwort-Links und Bestätigungen. Neue Konten können sich dann
  nicht bestätigen und werden nach 24 Stunden gelöscht (Flag „Registrierung:
  unbestätigte Konten löschen“).
- **„Login“ aus sperrt nur Mitglieder aus**, Admins kommen rein.
- **Seite: …** blendet eine öffentliche Seite aus (Adresse liefert „nicht
  gefunden“, Links verschwinden). Die Verwaltung im Dashboard bleibt nutzbar.
- **Kontaktformular: Benachrichtigung per Mail** und **… Speicherung in der
  Datenbank** beide aus = Anfragen gehen verloren.
- **„Austritt: Benachrichtigung an Admins“** aus = Austritte ohne offene
  Beiträge bemerkt niemand.

**Nach einer Störung alles wieder einschalten.** Ein vergessenes Flag fällt oft
erst Wochen später auf.

### Notfall-Rezepte

| Problem | Schalter aus | Folge |
|---|---|---|
| Spam übers Kontaktformular | Kontaktformular | Formular ist weg |
| Spam, Formular soll bleiben | Kontaktformular: Benachrichtigung per Mail | Anfragen nur noch im Dashboard |
| Fake-Registrierungen | Registrierung | keine neuen Konten |
| Spam-Anträge | Mitgliedsantrag | keine neuen Anträge, alte bleiben bearbeitbar |
| Mails gehen falsch oder doppelt raus | Mail-Versand (alle Mails) | gar keine Mail mehr |
| Rundmails sperren | Mail-Versand an Mitglieder | Systemmails laufen weiter |
| Wartung, nichts soll sich ändern | Profil bearbeiten, Beitragsänderungen | Daten nur lesbar |
| Angriff auf Konten | Login | Mitglieder kommen nicht rein |
| Seite fehlerhaft | Seite: … | Seite „nicht gefunden“ |

Danach: im Sicherheits-Dashboard prüfen, ob es vorbei ist, Schalter wieder an,
Vorstand informieren. Ist die Website selbst kaputt, helfen Flags nicht, siehe
`BETRIEB.md`.

## Sicherheit

Debug-Modus → **Sicherheit**. Zeigt Logins, Registrierungen, Kontaktanfragen
und Passwort-Zurücksetzungen. Oben wählst du den **Zeitraum** für die ganze
Seite.

- **Kacheln**: Erfolgreich, **Abgewehrt** (Rate Limit, Captcha, Honeypot,
  abgeschaltete Funktion), **Fehlgeschlagen** (falsches Passwort, ungültige
  Links), jeweils mit Vergleich zum Vorzeitraum.
- **Vom Formular zur Mitgliedschaft**: registriert → bestätigt → Antrag →
  aufgenommen. Bricht „bestätigt“ ein, kommen vermutlich Mails nicht an.
- Darunter Verläufe, Gründe für Abweisungen, die letzten 60 Ereignisse und die
  Rate Limits.

Worauf achten: Viele „Falsche Zugangsdaten“ in kurzer Zeit = jemand probiert
Passwörter (Rate Limits bremsen das). Viele Honeypot-/Captcha-Treffer = Bots,
normal, solange abgewehrt.

E-Mail- und IP-Adressen stehen nur als Pseudonym da. Wer etwas versucht hat,
lässt sich bewusst nicht herausfinden.

### Rate-Limit-Sperre aufheben

Wer zu oft etwas versucht, sieht „Zu viele Versuche …“. Die Sperre läuft von
selbst ab (Login: nach 10–15 Minuten). Wenn es eilt:

1. **Sicherheit** → ganz unten **Einzelne Einträge**.
2. Eintrag mit **Blockiert bis …** suchen, passender Name und passende Uhrzeit
   (z. B. `login` = Login-Versuche für eine Adresse, `login-ip` = alle Versuche
   von einer IP). Das ⓘ erklärt jeden Namen.
3. **Löschen**. Die Person kann es sofort wieder versuchen.

Löschen setzt nur den Zähler zurück und ist im Zweifel harmlos. Bei `login-ip`
sperrt eine Grenze alle hinter derselben IP (Uni-WLAN), ein guter Grund zum
Löschen.

## Server

Debug-Modus → **Server**.

- **Auslastung**: CPU und Arbeitsspeicher live, solange die Seite offen ist.
  Dauerhaft fast voller Speicher ist ein Warnsignal (knapp 4 GB, kein Swap).
- **Logs**: die letzten Zeilen live. Meldet ein Mitglied einen Fehler, lass dir
  die Uhrzeit sagen und such dort danach. Harmlose Meldungen stehen in
  `BETRIEB.md`.
- **Versionen**: Node.js, Next.js usw., für Rückfragen an die Technik.

### Deploy

Spielt den neuesten Code-Stand von `main` ein. Nur auf Bitte der Person, die den
Code betreut.

1. **Deploy starten** → im Dialog bestätigen.
2. Das Log läuft live mit. Am Ende steht „✅ Deployment finished
   successfully!“.
3. Beim Neustart meldet die Seite kurz „Server nicht erreichbar“. Normal.
4. Danach Startseite, Login und Dashboard durchklicken.

Scheitert der Build, läuft die alte Version weiter. Datenbankänderungen können
aber schon eingespielt sein: Log kopieren und **sofort** an die Technik
schicken.

### Backup

Der Server sichert die Datenbank **jeden Tag automatisch** und hebt die
Sicherungen 14 Tage auf. **Automatische Backups** listet die letzten Läufe.
Gelbe Warnung „Seit über einem Tag kein Backup“ → Technik informieren.

Komplettes Backup von Hand (nur vor größeren Eingriffen):

1. **Backup anfordern** → Datenschutzhinweis lesen → **Passwort** eingeben →
   bestätigen.
2. Ein Link kommt per Mail, **15 Minuten gültig**.
3. Link **im selben Browser** öffnen, die Datei lädt herunter.

Die Datei enthält **alle personenbezogenen Daten des Vereins** inklusive
Bankdaten. Nur verschlüsselt speichern, nicht weitergeben, nicht in die Cloud,
**spätestens nach 14 Tagen löschen**.
