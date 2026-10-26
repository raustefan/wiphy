# Notfall: eine Funktion abschalten

Schnelle Rezepte für typische Störungen. Alle Schalter liegen unter
[Feature Flags](feature-flags.md) (Debug-Modus nötig). **Danach wieder
einschalten.**

| Problem | Schalter aus | Folge |
|---|---|---|
| Spam übers Kontaktformular | **Kontaktformular** | Formular unter `/kontakt` ist weg |
| Spam, aber Formular soll bleiben | **Kontaktformular: Benachrichtigung per Mail** | Anfragen landen nur noch im Dashboard, dein Postfach bleibt ruhig |
| Massenhaft Fake-Registrierungen | **Registrierung** | Niemand kann sich neu registrieren. Bestehende Konten sind nicht betroffen. |
| Spam-Anträge | **Mitgliedsantrag** | keine neuen Anträge; eingegangene bleiben bearbeitbar |
| Mails gehen an falsche Leute oder doppelt raus | **Mail-Versand (alle Mails)** | **gar keine** Mail mehr, auch keine Passwort-Links |
| Rundmail-Funktion soll niemand nutzen | **Mail-Versand an Mitglieder** | Systemmails laufen weiter |
| Wartung, Mitglieder sollen nichts ändern | **Profil bearbeiten**, **Beitragsänderungen** | Daten nur noch lesbar |
| Verdacht auf Angriff auf Konten | **Login** | Mitglieder kommen nicht rein, Admins schon |
| Seite mit Fehler oder veraltetem Inhalt | **Seite: …** | Seite liefert „nicht gefunden“ |

## Danach

1. Im [Sicherheits-Dashboard](sicherheit.md) prüfen, ob die Welle vorbei ist
   („Abgewehrt“ und „Fehlgeschlagen“ gehen zurück).
2. Schalter wieder einschalten.
3. Kurz im Vorstand Bescheid geben, was los war.

Ist die Website selbst kaputt (Fehlerseite, nicht erreichbar), helfen Flags
nicht. Dann siehe [Server und Logs](server-und-logs.md) und `BETRIEB.md`.
