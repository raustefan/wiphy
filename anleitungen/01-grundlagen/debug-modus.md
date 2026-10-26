# Debug-Modus und Mitgliederansicht

Der Debug-Modus schaltet die technischen Seiten frei: **Feature Flags**,
**Sicherheit** und **Server**. Ohne ihn sind diese Seiten nicht erreichbar,
auch nicht über die direkte Adresse. So landet niemand versehentlich dort.

## Einschalten

1. Öffne das Dashboard.
2. Klicke in der Karte **Verwaltung** oben rechts auf **Debug-Modus**.
   Das Badge wechselt von „Aus“ auf „An“.
3. Drei zusätzliche Kacheln (gestrichelt, „Debug“) erscheinen.

Der Debug-Modus gilt nur für diesen Browser und endet, wenn du den Browser
schließt.

## Die Debug-Leiste

Solange der Modus an ist, liegt am unteren Bildschirmrand eine dunkle Leiste:

![Debug-Leiste](../bilder/debug-leiste.png)

Von links nach rechts:

- dein Konto und deine Rolle
- **Sitzung bis …**: wann deine Admin-Sitzung abläuft (12 h ab Login)
- **Flags**: wie viele Feature Flags an sind, z. B. `32/32`. Fahr mit der Maus
  darüber, um zu sehen, welche aus sind.
- der laufende Code-Stand (Git-Commit) und die Uhrzeit, zu der die Seite
  erzeugt wurde
- **Konsole**: zeigt die Server-Logs live (nur lesen), siehe
  [Server und Logs](../07-technik/server-und-logs.md)
- **Als Mitglied**: siehe unten
- **Beenden**: schaltet den Debug-Modus aus

## Als Mitglied ansehen

**Als Mitglied** zeigt dir jede Seite so, wie ein normales Mitglied sie sieht.
Seiten, Aktionen und Schnittstellen behandeln dich dann wirklich wie ein
Mitglied, Admin-Seiten sind also gesperrt. Nützlich, um zu prüfen, was
Mitglieder im Dashboard sehen.

Zurück geht es über denselben Knopf in der Debug-Leiste (jetzt mit
Schild-Symbol) oder über **Beenden**.
