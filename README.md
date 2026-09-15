# WirtschaftsPhysik Alumni e. V. — Vereinswebsite

Öffentliche Website und Mitgliederportal des WirtschaftsPhysik Alumni e. V.
(Universität Ulm). Die Seite kombiniert eine öffentliche Präsenz (Blog,
Termine, Vorstand, rechtliche Seiten) mit einem geschützten
Mitgliederbereich (Profile, Mitgliedsbeiträge, Aufnahmeanträge) und einem
Admin-Dashboard zur Vereinsverwaltung (Nutzer, Beiträge, Rundmails,
Sicherheitsprotokoll, Feature Flags).

---

## Inhalt

1. [Schnellstart](#schnellstart)
2. [Technischer Aufbau](#technischer-aufbau)
3. [Datenbankmodell](#datenbankmodell)
4. [Umgebungsvariablen](#umgebungsvariablen)
5. [Funktionen im Detail](#funktionen-im-detail)
6. [Sicherheitsmechanismen](#sicherheitsmechanismen)
7. [Feature Flags](#feature-flags)
8. [Tests, Lint & Typprüfung](#tests-lint--typprüfung)
9. [Deployment (Hetzner Cloud / Ubuntu)](#deployment-hetzner-cloud--ubuntu)

---

## Schnellstart

Voraussetzungen: **Node.js** (aktuelle LTS), **pnpm**, eine erreichbare
**PostgreSQL**-Datenbank.

```bash
# 1. Abhängigkeiten installieren
pnpm install

# 2. .env anlegen (siehe "Umgebungsvariablen" unten für alle Werte)
cp .env.example .env   # falls vorhanden, sonst .env von Hand anlegen

# 3. Datenbankschema anlegen
npx prisma db push

# 4. Admin-Konto erzeugen (admin@wiphy.de / admin123 — Passwort nach dem
#    ersten Login unbedingt ändern)
npx prisma db seed

# 5. Entwicklungsserver starten
pnpm dev
```

Die Seite läuft danach unter `http://localhost:3000`. Für einen
produktionsnahen Test lokal: `pnpm build && pnpm start` (lauscht bewusst nur
auf `127.0.0.1`, siehe [Deployment](#deployment-hetzner-cloud--ubuntu)).

Nützliche Skripte aus `package.json`:

| Befehl            | Zweck                                                        |
| ------------------ | ------------------------------------------------------------ |
| `pnpm dev`          | Entwicklungsserver mit Hot Reload                             |
| `pnpm build`        | Produktions-Build                                             |
| `pnpm start`        | Produktionsserver (nur `127.0.0.1:3000`)                      |
| `pnpm lint`         | ESLint                                                        |
| `pnpm typecheck`    | TypeScript-Prüfung ohne Ausgabe                                |
| `pnpm test`         | Node-Test-Runner über `tests/*.test.ts`                        |
| `pnpm icons`        | Generiert die PWA-Icons in `public/icons` (Inkscape/SVG → PNG) |
| `npx prisma studio` | Grafischer Datenbank-Browser                                  |

---

## Technischer Aufbau

| Bereich              | Technologie                                                                 |
| --------------------- | ---------------------------------------------------------------------------- |
| Framework              | **Next.js 16** (App Router, React Server Components, React Compiler aktiviert) |
| Sprache                | **TypeScript**, React 19                                                     |
| Styling                | **Tailwind CSS v4**, eigene UI-Komponenten in `src/components/ui`             |
| Datenbank              | **PostgreSQL**                                                               |
| ORM                    | **Prisma v7** (`prisma`, `@prisma/client`, `@prisma/adapter-pg` + `pg`, kein Prisma-Binary-Engine) |
| Authentifizierung      | **NextAuth.js v5** (Credentials-Provider, JWT-Sessions), `bcryptjs` fürs Passwort-Hashing |
| Formulare/Validierung  | **Zod**                                                                      |
| Markdown-Editor        | `@uiw/react-md-editor` (Split-Screen), Anzeige über `react-markdown` + `remark-gfm` |
| Rich-Text (Mail)       | `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`               |
| Bildverarbeitung       | **sharp** — verkleinert & re-kodiert Bilder serverseitig zu WebP               |
| PDF-Erzeugung          | `@react-pdf/renderer` für Zahlungshistorien                                   |
| E-Mail-Versand         | **Nodemailer** über SMTP oder Gmail Workspace                                  |
| Captcha / Spamschutz   | **ALTCHA** (Proof-of-Work-Captcha ohne Tracking, `altcha` + `altcha-lib`)       |
| HTML-Sanitizing        | `sanitize-html` für Nutzereingaben, die als HTML ausgeliefert werden           |
| Icons                  | `lucide-react`                                                                |
| Paketmanager           | **pnpm** (Workspace-Konfiguration in `pnpm-workspace.yaml`)                    |

### Projektstruktur

```
src/
  app/                    # Next.js App Router: Seiten, Layouts, Server Actions, API-Routen
    api/                  # REST-artige Endpunkte (NextAuth, Bild-Auslieferung, PDF, Nutzerliste)
    blog/                 # Öffentlicher Blog inkl. RSS-Feed
    dashboard/            # Geschützter Mitglieder- und Admin-Bereich
    mitglied-werden/      # Weg in den Verein: Konto, Bestätigung, Antrag, Aufnahme
    kontakt/, termine/,   # Weitere öffentliche Seiten
    vorstand/, geschichte/, satzung/, impressum/, datenschutz/ ...
  components/              # Wiederverwendbare React-Komponenten
    ui/                    # Design-System-Bausteine (Button, Card, Dialog, Table, …)
  lib/                     # Geteilte Logik
    server/                # Nur serverseitig verwendbar (DB, E-Mail, Auth, Validierung)
      repositories/        # Reine Prisma-Zugriffe
      services/             # Geschäftslogik oberhalb der Repositories
      validation/           # Zod-Schemata für Server Actions
      email/                # Mailversand, HTML-Sanitizing, Layout
      images/               # Bildverarbeitung (Blog-Bilder, Vorstandsfotos)
      pdf/                  # PDF-Generierung
    client/                # Nur clientseitig verwendbar (Fetch-Helfer, Formular-Hooks)
    email/                 # Reine Bausteine für E-Mail-Inhalte (Branding, Textblöcke)
  auth.ts                  # NextAuth-Konfiguration (Credentials-Provider, JWT-Callbacks)
prisma/
  schema.prisma            # Datenmodell
  migrations/               # Versionierte Schemaänderungen
  seed.ts                   # Legt den ersten Admin-Nutzer an
tests/                     # Node-Test-Runner-Tests für reine Funktionen
scripts/                   # Hilfsskripte (z. B. Icon-Generierung)
```

Die Trennung **Repository → Service → Server Action/Seite** zieht sich durch
den gesamten Server-Code: Repositories kapseln reine Prisma-Queries, Services
enthalten die Geschäftsregeln (Berechtigungen, Berechnungen, Feature-Flag-
Prüfungen), und Server Actions bzw. Seiten rufen nur noch Services auf. Reine,
serverunabhängige Berechnungen (z. B. Beitragsberechnung, Alterslogik,
Kalenderformate) liegen bewusst in `src/lib/*.ts` ohne Prisma-Import, damit sie
sowohl im Client-Bundle als auch in Tests ohne Datenbank nutzbar sind.

---

## Datenbankmodell

Das vollständige Schema steht in `prisma/schema.prisma` und ist dort mit
ausführlichen Kommentaren zu den fachlichen Hintergründen versehen. Die
wichtigsten Modelle im Überblick:

- **`User`** — Mitglieds- und Kontodaten: Stammdaten, Adresse, Studium/Beruf,
  Bankverbindung, Rolle (`MEMBER`/`ADMIN`), Mitgliedsstatus
  (`ORDENTLICHES_MITGLIED`, `EHRENMITGLIED`, `KEIN_MITGLIED`).
- **`MemberFee`** — Mitgliedsbeitrag pro Nutzer und Jahr, inkl. manuellem
  Override für Sonderfälle.
- **`FeeDefault`** — Standard-Monatsbeiträge (regulär/Student) je Beitragsjahr,
  von der Mitgliederversammlung beschlossen.
- **`BlogPost`** + **`BlogImage`** — Markdown-Blogbeiträge mit Titelbild und
  Bildergalerie (Bilddaten liegen als Bytes direkt in der Datenbank).
- **`Event`** — Vereinstermine (Stammtische, Exkursionen, Vorträge), optional
  mit Rückblicks-Blogbeitrag verknüpft.
- **`BoardMember`** + **`BoardMemberPhoto`** — Vorstandsmitglieder für
  `/vorstand` und die Mail-Signatur.
- **`MembershipApplication`** — Aufnahmeanträge als Snapshot der zum
  Antragszeitpunkt gültigen Daten (Person, Studium, SEPA, Einwilligungen).
- **`ContactRequest`** — Eingänge des öffentlichen Kontaktformulars.
- **`FeatureFlag`** — Ein- und Ausschalter für einzelne Funktionen (siehe
  [Feature Flags](#feature-flags)).
- **`SecurityEvent`**, **`RateLimitEntry`** — Sicherheitsprotokoll und
  Rate-Limiting-Zustand (siehe [Sicherheitsmechanismen](#sicherheitsmechanismen)).
- **`PasswordResetToken`**, **`EmailVerificationToken`**,
  **`SolvedAltchaChallenge`** — Einmal-Token für Passwort-Reset,
  E-Mail-Bestätigung und verbrauchte Captcha-Lösungen.

Änderungen am Schema werden als Migration angelegt (`npx prisma migrate dev
--name <bezeichnung>`) und mit `npx prisma migrate deploy` auf dem Server
eingespielt.

---

## Umgebungsvariablen

Alle Variablen gehören in eine `.env`-Datei im Projektwurzelverzeichnis.

| Variable                 | Pflicht | Zweck                                                                 |
| -------------------------- | :------: | ------------------------------------------------------------------------ |
| `DATABASE_URL`              | ✅       | PostgreSQL-Verbindung, z. B. `postgresql://user:pass@host:5432/wiphy`    |
| `NEXTAUTH_SECRET`           | ✅       | Signaturschlüssel für Sessions (`openssl rand -base64 32`)               |
| `NEXTAUTH_URL`              | ✅       | Öffentliche Basis-URL der Seite                                         |
| `AUTH_TRUST_HOST`           | Server   | `true`, wenn hinter einem Reverse Proxy (Hetzner/nginx-Setup)            |
| `ALTCHA_HMAC_KEY`           | ✅       | Schlüssel für die ALTCHA-Captcha-Challenges                              |
| `GMAIL_USER` / `GMAIL_APP_PASSWORD` | ✅ | Zugangsdaten für den Mailversand                                   |
| `EMAIL_FROM`                | ✅       | Absenderadresse ausgehender Mails                                        |
| `MAIL_SERVICE`              | optional | `GmailWorkspace` für den Gmail-Versandweg, sonst generisches SMTP        |
| `SMTP_HOST` / `SMTP_PORT`   | wenn nicht `GmailWorkspace` | Generische SMTP-Zugangsdaten                          |
| `SEPA_CREDITOR_ID/NAME/IBAN/BIC` | optional | Gläubigerdaten für SEPA-Lastschriftmandate im Aufnahmeantrag    |
| `SECURITY_LOG_PEPPER`       | optional | Pseudonymisiert IP/E-Mail im Sicherheitsprotokoll; fällt sonst auf `NEXTAUTH_SECRET` zurück |
| `NEXT_PUBLIC_SITE_URL`      | optional | Öffentliche Adresse für Sitemap, `robots.txt`, RSS, Link-Vorschauen; fällt sonst auf `NEXTAUTH_URL` zurück |

Ohne `DATABASE_URL`, `NEXTAUTH_SECRET`/`NEXTAUTH_URL` oder `ALTCHA_HMAC_KEY`
startet die Anwendung nicht bzw. bricht `pnpm build` ab — bewusst kein
stiller Fallback auf unsichere Standardwerte.

---

## Funktionen im Detail

### Öffentlicher Bereich

- **Startseite** (`/`) — Hero-Sektion, drei Vereins-„Säulen“, der nächste
  anstehende Termin (oder ersatzweise der zuletzt vergangene), eine
  interaktive Physik-Visualisierung (geometrische Brownsche Bewegung als
  Analogie zwischen Marktdynamik und statistischer Physik, live im Browser
  simuliert), der neueste Blogbeitrag und ein Aufruf zur Mitgliedschaft.
- **Blog** (`/blog`) — Übersicht veröffentlichter Beiträge mit Titelbild,
  Lesezeit und Vorschautext; Einzelansicht mit Markdown-Rendering und
  Bildergalerie (Vollbild-Lightbox mit Wischgeste). RSS-Feed unter
  `/blog/feed.xml`.
- **Termine** (`/termine`) — Öffentliche Terminliste; kommende Termine direkt
  sichtbar, vergangene erst über den Umschalter „Vergangenes“. Detailseite je
  Termin mit Markdown-Beschreibung, Kartenlink, Kontakt-Verweis und
  herunterladbarer **Kalenderdatei** (`.ics`) — einzeln oder als Sammeldatei
  aller kommenden Termine (`/termine/kalender.ics`). Termine ohne Enddatum
  gelten am Starttag als vorbei; es gibt bewusst kein separates Statusfeld.
- **Mitglied werden** (`/mitglied-werden`) — Der ganze Weg in den Verein auf
  einer Seite: eine Fortschrittsleiste über vier Stationen (Konto →
  E-Mail-Bestätigung → Aufnahmeantrag → Aufnahme durch den Vorstand) und
  darunter genau die Station, die gerade dran ist. Welche das ist, ergibt sich
  aus dem Zustand des Kontos (`src/lib/membershipJourney.ts`), nicht aus einem
  Klickpfad — die Seite zeigt Gästen die Registrierung, frisch Registrierten
  den Hinweis auf die Bestätigungsmail, angemeldeten Nicht-Mitgliedern den
  Antragsassistenten und danach den Bearbeitungsstand. Ersetzt die früheren
  Seiten `/register` und `/dashboard/mitgliedschaft`; beide leiten dauerhaft
  (308) hierher um.
- **Vorstand** (`/vorstand`) — Öffentliche Übersicht der Vorstandsmitglieder
  mit Foto, Rolle und optionalem LinkedIn-Link.
- **Geschichte** (`/geschichte`) — Zeitleiste zur Vereinsgeschichte.
- **Rechtliche Seiten** — Satzung (`/satzung`), Impressum (`/impressum`),
  Datenschutzerklärung (`/datenschutz`), jeweils als eigenständige,
  versionierte Textbausteine gepflegt.
- **Kontaktformular** (`/kontakt`) — Mit Honeypot-Feld, Zeitmessung und
  ALTCHA-Captcha gegen Spam abgesichert (siehe
  [Sicherheitsmechanismen](#sicherheitsmechanismen)). Anfragen können separat
  per Mail an Admins zugestellt und/oder im Dashboard gespeichert werden
  (steuerbar über Feature Flags).
- **SEO/Technik** — automatisch generierte Sitemap (`/sitemap.ts`),
  `robots.txt`, Open-Graph-Bild, strukturierte Daten (JSON-LD) sowie ein
  Web-App-Manifest für „Zum Homescreen hinzufügen“.

### Authentifizierung & Konten

- **Registrierung** (`/mitglied-werden`) — Self-Service-Anmeldung mit E-Mail
  und Passwort, aufgeteilt auf zwei kurze Hälften (Name/E-Mail, dann Passwort
  und Botprüfung); das Konto muss per E-Mail-Bestätigungslink verifiziert
  werden. Unbestätigte Selbstregistrierungen werden nach einer
  konfigurierbaren Frist automatisch gelöscht (`REGISTRATION_CLEANUP`-Flag),
  von Admins angelegte Konten sind davon nie betroffen. Ein Konto ist
  ausdrücklich noch keine Vereinsmitgliedschaft — das sagt die Seite an jeder
  Station.
- **Login** (`/login`) — E-Mail/Passwort über NextAuth Credentials-Provider,
  zusätzlich durch ALTCHA und mehrstufiges Rate-Limiting geschützt. Ein
  `?next=`-Parameter führt nach der Anmeldung zurück an die Stelle, von der
  jemand kam (z. B. den Aufnahmeantrag); zugelassen sind ausschließlich
  seiteneigene Pfade, damit daraus keine offene Weiterleitung wird.
- **Passwort vergessen** (`/forgot-password`, `/reset-password`) — Reset per
  E-Mail-Token; ein Passwortwechsel invalidiert automatisch alle laufenden
  Sitzungen (JWT wird gegen den `passwordChangedAt`-Zeitstempel geprüft).
- **E-Mail-Verifizierung** (`/verify-email`) — schließt sowohl die
  Registrierung als auch spätere E-Mail-Änderungen ab. Links aus einer
  Registrierung tragen `&weiter=mitglied-werden`: die Seite schickt danach zur
  Anmeldung *mit* Ziel Aufnahmeantrag, während eine reine Adressänderung wie
  bisher nur zum Login führt.

### Mitgliederbereich (`/dashboard`)

Zugänglich für eingeloggte Nutzer, Inhalte passen sich an Rolle und
Mitgliedsstatus an:

- **Profil & Stammdaten** — jedes Konto kann seine eigenen Daten (Kontakt,
  Adresse, Studium, Beruf) einsehen und bearbeiten.
- **Zahlungsübersicht** — Mitglieder sehen ihre Beiträge der letzten Jahre
  (bzw. seit Aufnahme), Zahlstatus (bezahlt/offen), Beitragsstufe
  (regulär/Student) und können unter `/dashboard/zahlungen` ihre
  Bankverbindung pflegen sowie ihre Zahlungshistorie als **PDF** exportieren.
- **Mitgliedsantrag** (`/mitglied-werden`) — für Konten ohne Mitgliedschaft
  verlinkt das Dashboard prominent auf die öffentliche Seite; der Antrag
  selbst ist dort die dritte Station. Er bleibt ein sechsstufiger Assistent
  (Mitgliedschaft → Person & Adresse → Studium & Beruf → Zahlungsweise →
  Bankverbindung → Beitrag & Abschluss) inklusive Beitragsvorschau,
  Einwilligungen (Satzung, Datenschutz) und optionalem
  SEPA-Lastschriftmandat. Auf dem Telefon bleiben „Zurück“, der Zähler
  „x/6“ und „Weiter“ als Leiste am unteren Bildschirmrand stehen, statt erst
  am Ende des jeweiligen Schritts aufzutauchen. Anträge lassen sich vor
  Entscheidung zurückziehen; der Beitrag wird zum Antragszeitpunkt
  „eingefroren“ (Snapshot), damit spätere Satzungsänderungen laufende
  Anträge nicht rückwirkend verändern. Mindestalter 18 Jahre.
- **Terminhinweis** — weist Mitglieder im Dashboard auf Termine innerhalb der
  nächsten drei Monate hin.

### Admin-Dashboard

Nur für Konten mit Rolle `ADMIN`:

- **Benutzerverwaltung** (`/dashboard/users`) — Liste aller Konten, Rollen
  ändern, Konten anlegen/löschen, Detailansicht je Nutzer mit vollem
  Bearbeitungszugriff.
- **Blog-Verwaltung** (`/dashboard/blog`) — Split-Screen-Markdown-Editor,
  Veröffentlichen/Entwerfen, Verknüpfung mit einem Termin als „Rückblick“,
  Bildergalerie je Beitrag (Titelbild + bis zu 5 weitere Bilder; Upload wird
  serverseitig zu WebP verkleinert).
- **Termin-Verwaltung** (`/dashboard/termine`) — Anlegen, Bearbeiten,
  Veröffentlichen, Löschen von Terminen.
- **Vorstands-Verwaltung** (`/dashboard/vorstand`) — Mitglieder, Reihenfolge,
  Foto-Upload (quadratisch zugeschnitten, als WebP gespeichert), Steuerung,
  wer in der Mail-Signatur erscheint.
- **Beitragsverwaltung** (`/dashboard/fees`) — Standard-Beitragssätze pro
  Jahr festlegen, einzelne Mitgliedsbeiträge einsehen/ändern (inkl. manueller
  Überschreibung für Sonderfälle).
- **Mitgliedsanträge** (`/dashboard/mitgliedsantraege`) — eingehende Anträge
  prüfen, annehmen oder ablehnen; Anzahl offener Anträge wird im Dashboard als
  Badge angezeigt.
- **Kontaktanfragen** (`/dashboard/kontakt`) — gespeicherte Formular-Eingänge
  einsehen und als bearbeitet markieren.
- **Rundmail-System** (`/dashboard/mail`) — E-Mails an definierbare
  Empfängergruppen (alle Nutzer, nur Mitglieder, nur Admins oder eine freie
  Auswahl per Suche). Ein Rich-Text-Editor (Tiptap) erstellt den Inhalt; ein
  Klick auf einen kommenden Termin füllt Betreff und Einladungstext
  automatisch vor. Platzhalter `$Anrede`, `$Vorname`, `$Nachname`, `$Name`
  werden pro Empfänger ersetzt. Versand per BCC, optional mit Kopie an den
  absendenden Admin.
- **Sicherheits-Dashboard** (`/dashboard/security`) — Auswertung des
  Sicherheitsprotokolls: Aktivitäts-Heatmap, Erfolg/Fehlschlag-Zeitverlauf je
  Ereignistyp, häufigste Ablehnungsgründe, Registrierungs-Funnel (wie viele
  Registrierungen zu bestätigten Konten führen) und aktive Rate-Limit-Sperren.
- **Feature Flags** (`/dashboard/feature-flags`) — zentrale Ein-/Ausschalter
  für einzelne Funktionen, siehe unten.

---

## Sicherheitsmechanismen

- **ALTCHA-Captcha** — Proof-of-Work-Verfahren ohne externe Anfragen oder
  Tracking. Jede gelöste Herausforderung wird beim Verbrauch in
  `SolvedAltchaChallenge` eingetragen; ein zweiter Versuch mit derselben
  Lösung schlägt fehl (Replay-Schutz). Formulare für eingeloggte Aktionen
  nutzen eine niedrigere Rechenkomplexität als vollständig öffentliche
  Formulare.
- **Rate-Limiting** — datenbankgestützte Zähler (`RateLimitEntry`) pro
  Bucket (z. B. `login`, `login-ip`, `contact-ip`, `contact-email`,
  `contact-global`) mit Zeitfenster und Sperrdauer. Login wird sowohl pro
  IP als auch pro (IP, E-Mail)-Kombination begrenzt, um sowohl
  Credential-Spraying als auch gezielte Angriffe auf ein Konto zu erkennen.
- **Honeypot & Zeitprüfung** im Kontaktformular — ein verstecktes Feld sowie
  eine Mindestausfüllzeit filtern automatisierte Einsendungen aus, ohne dem
  Absender einen Hinweis darauf zu geben (stiller Erfolg).
- **Sicherheitsprotokoll** (`SecurityEvent`) — protokolliert Login,
  Registrierung, Kontaktanfragen, Passwort-Resets, E-Mail-Verifizierung und
  automatische Löschungen unbestätigter Konten. Es speichert **keine**
  Klartext-E-Mails, IPs, Passwörter oder Formularinhalte — nur gepfefferte
  Hashes (`SECURITY_LOG_PEPPER`), die nach einer festen Frist wieder entfernt
  werden (DSGVO-Datenminimierung, Rechtsgrundlage Art. 6 Abs. 1 lit. f, Art.
  32 DSGVO).
- **IP-Erkennung hinter Reverse Proxy** — `src/lib/server/clientIp.ts` wertet
  `X-Real-IP` vor dem letzten Eintrag aus `X-Forwarded-For` aus; die
  Anwendung selbst lauscht nur auf `127.0.0.1`, damit dieser Weg nicht
  umgangen werden kann (siehe [Deployment](#deployment-hetzner-cloud--ubuntu)).
- **Session-Invalidierung** — ein Passwortwechsel setzt `passwordChangedAt`
  neu; alle JWT-Sessions, die davor ausgestellt wurden, werden beim nächsten
  Request automatisch abgelehnt.
- **Bildverarbeitung** — hochgeladene Bilder werden serverseitig neu
  kodiert (WebP, begrenzte Kantenlänge, EXIF entfernt) und nie unverändert
  weitergereicht.

---

## Feature Flags

Über `/dashboard/feature-flags` lassen sich einzelne Funktionen unabhängig
voneinander ein- und ausschalten, ohne einen Deploy zu benötigen — praktisch
für Wartungsfenster oder um bei Problemen gezielt eine Funktion
abzuschalten. Verwaltete Schalter (`FeatureFlagKey`):

`LOGIN`, `PASSWORD_RESET`, `REGISTRATION`, `EMAIL_CHANGE`, `PROFILE_EDIT`,
`FEE_CHANGES`, `MAIL_SERVICES`, `USER_CREATION`, `USER_DELETION`,
`BLOG_MANAGEMENT`, `EMAIL_VERIFICATION`, `CONTACT_FORM`,
`CONTACT_FORM_MAIL`, `CONTACT_FORM_STORAGE`, `MEMBERSHIP_APPLICATION`,
`MEMBERSHIP_APPLICATION_MAIL`, `MEMBERSHIP_APPLICATION_CONFIRMATION_MAIL`,
`REGISTRATION_CLEANUP`, `EVENT_MANAGEMENT`, `BOARD_MANAGEMENT`.

Admins können sich unabhängig vom `LOGIN`-Flag immer einloggen, damit ein
versehentlich deaktivierter Login sich selbst nicht aussperrt.

---

## Tests, Lint & Typprüfung

```bash
pnpm test       # Node-Test-Runner über tests/*.test.ts
pnpm lint       # ESLint
pnpm typecheck  # tsc --noEmit
```

Die Tests decken bewusst reine, serverunabhängige Logik ab (Beitragsberechnung,
IBAN-Validierung, ICS-Erzeugung, Bildverarbeitung, Spam-Bewertung,
Client-IP-Auswertung, Passwortstärke u. a.) — Funktionen ohne Datenbank- oder
Netzwerkzugriff, die sich deterministisch prüfen lassen.

---

## Deployment (Hetzner Cloud / Ubuntu)

Diese Anwendung ist so vorkonfiguriert, dass sie reibungslos auf einem
Ubuntu-Server (z. B. in der Hetzner Cloud) betrieben werden kann.

### Einmalige Einrichtung auf dem Server

1. **Abhängigkeiten installieren:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs postgresql postgresql-contrib git
   sudo npm install -g pnpm pm2
   ```

2. **Datenbank vorbereiten:**
   ```bash
   sudo -i -u postgres psql
   # In psql:
   CREATE DATABASE wiphy;
   CREATE USER wiphy_admin WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE wiphy TO wiphy_admin;
   ALTER DATABASE wiphy OWNER TO wiphy_admin;
   \q
   exit
   ```

3. **Repository klonen & einrichten:**
   ```bash
   cd /var/www
   git clone https://github.com/raustefan/wiphy
   cd wiphy
   pnpm install
   ```

4. **Umgebungsvariablen konfigurieren:**
   Erstelle eine `.env` Datei im Stammverzeichnis des Projekts (`/var/www/wiphy/.env`):
   ```env
   DATABASE_URL="postgresql://wiphy_admin:secure_password@localhost:5432/wiphy?schema=public"
   NEXTAUTH_SECRET="DEIN_SESSIONS_GEHEIMNIS" # Erzeugen mit: openssl rand -base64 32
   NEXTAUTH_URL="http://DEINE_SERVER_IP"     # Oder deine Domain
   AUTH_TRUST_HOST=true
   ALTCHA_HMAC_KEY="DEIN_CAPTCHA_GEHEIMNIS"  # Erzeugen mit: openssl rand -base64 32
   GMAIL_USER="deine-adresse@gmail.com"
   GMAIL_APP_PASSWORD="DEIN_APP_PASSWORT"
   EMAIL_FROM="info@deine-domain.de"
   SECURITY_LOG_PEPPER="DEIN_PROTOKOLL_GEHEIMNIS" # Optional, sonst wird NEXTAUTH_SECRET benutzt
   NEXT_PUBLIC_SITE_URL="https://deine-domain.de" # Optional, sonst wird NEXTAUTH_URL benutzt
   ```
   `NEXT_PUBLIC_SITE_URL` ist die öffentliche Adresse der Seite und steckt in
   Sitemap, `robots.txt`, RSS-Feed, Link-Vorschauen und strukturierten Daten.
   Ohne eigenen Wert greift `NEXTAUTH_URL`; fehlen beide, bricht `pnpm build`
   ab — ein stiller Rückfall auf `localhost` würde erst auffallen, wenn jemand
   einen Link in LinkedIn oder WhatsApp einfügt.

   `SECURITY_LOG_PEPPER` pseudonymisiert IP- und E-Mail-Adressen im
   Sicherheitsprotokoll (`SecurityEvent`). Ohne eigenen Wert greift
   `NEXTAUTH_SECRET`; ein separater Wert lässt sich unabhängig von den Sessions
   rotieren.

5. **Datenbank & Anwendung initialisieren:**
   ```bash
   npx prisma db push
   npx prisma db seed # Erstellt den Admin-Nutzer (admin@wiphy.de / admin123)
   pnpm build
   pm2 start pnpm --name "wiphy-app" -- start
   pm2 startup
   pm2 save
   ```

---

### nginx als Reverse Proxy

nginx nimmt HTTPS entgegen und reicht an `127.0.0.1:3000` weiter. Der
`location /`-Block **muss** die Adresse des Besuchers selbst setzen:

```nginx
location / {
    # Bewusst die numerische Adresse: `localhost` kann je nach /etc/hosts
    # zuerst als ::1 aufgelöst werden, und die Anwendung lauscht nur auf
    # 127.0.0.1 — das ergäbe einen 502.
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;

    proxy_set_header Host              $host;
    proxy_set_header Upgrade           $http_upgrade;
    proxy_set_header Connection        'upgrade';

    # Ohne diese drei Zeilen sieht die Anwendung nie die echte Besucher-IP:
    # nginx reicht unbekannte Request-Header unverändert durch, ein Angreifer
    # könnte also seinen eigenen `X-Forwarded-For` mitschicken und sich damit
    # bei jeder Anfrage einen frischen Rate-Limit-Zähler aussuchen. Weil nginx
    # sie hier selbst setzt, wird alles Mitgeschickte überschrieben.
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_cache_bypass $http_upgrade;

    # Blog-Bilder dürfen bis 2 MB groß sein; nginx bricht sonst schon bei 1 MB
    # mit „413 Request Entity Too Large“ ab, bevor die Anwendung das Bild
    # überhaupt zu Gesicht bekommt.
    client_max_body_size 4M;
}
```

Übernehmen mit `nginx -t && systemctl reload nginx`.

Die Anwendung wertet in dieser Reihenfolge aus (`src/lib/server/clientIp.ts`):
`X-Real-IP` zuerst, sonst der **letzte** Eintrag aus `X-Forwarded-For` — der
stammt vom nächstgelegenen Vermittler, während der erste vom Client stammen
kann.

Damit dieser Weg nicht umgangen werden kann, lauscht die Anwendung nur auf
`127.0.0.1` (`next start -H 127.0.0.1` im `start`-Skript). Vorher war Port 3000
auf allen Schnittstellen offen und direkt aus dem Internet erreichbar — an
nginx, HTTPS und den Headern vorbei. Zur Kontrolle:

```bash
ss -tlnp | grep :3000   # soll 127.0.0.1:3000 zeigen, nicht *:3000
```

---

### Deployment & Updates via SSH (`deploy.sh`)

Im Stammverzeichnis befindet sich das Skript `deploy.sh`. Jedes Mal, wenn du Updates in dein Git-Repository gepusht hast, kannst du den Server mit folgenden Wegen aktualisieren:

#### Option 1: Automatischer Einzeiler über deinen lokalen Rechner (Empfohlen)
Du musst dich nicht einmal interaktiv auf dem Server einloggen! Führe diesen Befehl einfach von deiner **lokalen Konsole** aus:

```bash
ssh root@DEINE_SERVER_IP "cd /var/www/wiphy && ./deploy.sh"
```

#### Option 2: Manuelles Ausführen auf dem Server
Logge dich per SSH auf deinem Server ein und führe das Skript aus:
```bash
ssh root@DEINE_SERVER_IP
cd /var/www/wiphy
./deploy.sh
```

*(Hinweis: Falls das Skript auf dem Server noch nicht ausführbar ist, mache es einmalig mit `chmod +x deploy.sh` ausführbar).*

`deploy.sh` zieht den neuesten Code, installiert Abhängigkeiten, generiert
den Prisma-Client, spielt Schemaänderungen per `prisma db push` ein, baut die
Anwendung und startet den PM2-Prozess `wiphy` neu (bzw. legt ihn beim ersten
Mal an).

#### Migrationen statt `db push`

`prisma db push` bricht ab, sobald eine Änderung Daten verlieren würde (z. B.
das Entfernen einer Spalte, in der noch Werte stehen). In solchen Fällen
stattdessen einmalig die entsprechende, im Repository dokumentierte Migration
fahren:

```bash
cd /var/www/wiphy
npx prisma migrate deploy
```

Danach läuft `deploy.sh` wieder unverändert durch.

---

### Automatische Updates bei jedem Git Push (GitHub Actions)

Wenn du möchtest, dass der Server bei jedem `git push` auf GitHub vollautomatisch aktualisiert wird, erstelle eine GitHub Action unter `.github/workflows/deploy.yml` mit folgendem Inhalt:

```yaml
name: Deploy to Hetzner

on:
  push:
    branches:
      - main # Oder master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SERVER_HOST }}     # Deine Server IP
          username: root
          key: ${{ secrets.SSH_PRIVATE_KEY }}   # Dein privater SSH-Schlüssel
          port: 22
          script: |
            cd /var/www/wiphy
            ./deploy.sh
```

Füge einfach `SERVER_HOST` und `SSH_PRIVATE_KEY` als Repository-Secrets in den Einstellungen deines GitHub-Repositorys hinzu!
