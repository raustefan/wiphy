# WirtschaftsPhysik Alumni e.V. Seite

## Aufbau

- **Framework:** Next.js 16 (App Router) & TypeScript
- **UI & Styling:** Radix UI (`@radix-ui/themes`)
- **Datenbank:** PostgreSQL (lokal via Homebrew)
- **ORM:** Prisma v7 (`prisma`, `@prisma/client`, `@prisma/adapter-pg`, `pg`)
- **Authentifizierung:** NextAuth.js v5 (`next-auth@beta`, `bcryptjs`)
- **Blog / Editor:** `@uiw/react-md-editor`, `@uiw/react-markdown-preview`
- **E-Mail-Versand:** Nodemailer (Rundmails an Mitglieder)

## Features

- **Öffentlicher Bereich:**
  - Startseite mit Hero-Sektion und Info-Cards.
  - Blog-Übersicht (`/blog`) und Lese-Ansicht für Markdown-Artikel.
  - Globaler Header & Footer.
- **Authentifizierung:**
  - Registrierung (`/register`) und Login (`/login`) via E-Mail & Passwort.
- **Rollen-System (ADMIN & MEMBER):**
  - **MEMBER:** Kann sich einloggen, das Dashboard sehen und das eigene Profil (Name, Stadt, Telefon) bearbeiten.
  - **ADMIN:** Sieht alle Benutzer, kann Rollen ändern und hat vollen Zugriff auf das Blog-System (Erstellen, Bearbeiten, Löschen, Veröffentlichen).
- **Blog-System (Markdown):**
  - Integrierter Split-Screen Markdown-Editor im Admin-Bereich.
  - Öffentliche Anzeige der Beiträge im Blog-Bereich.
- **Rundmail-System:**
  - Admins können über `/dashboard/mail` eine Rundmail an definierte Empfänger-Gruppen schicken.
  - Unterstützte Gruppen: **Alle Benutzer**, **nur Mitglieder (MEMBER)**, **nur Administratoren (ADMIN)** oder **ausgewählte Nutzer** (Suche, Mehrfachauswahl).
  - Versand per BCC, damit Empfänger nicht alle Adressen sehen; optional **BCC an mich** (Kopie an den absendenden Admin).
  - Nutzt Nodemailer und SMTP-Zugangsdaten aus der `.env`.

## 🏁 App starten (Ersteinrichtung)

### Voraussetzungen

- **Node.js** 20.19+, 22.12+ oder 24+ (empfohlen für Prisma 7)
- **pnpm** (`npm install -g pnpm`)
- **PostgreSQL** lokal (z. B. via Homebrew: `brew install postgresql@16`)

### 1. Abhängigkeiten installieren

```bash
pnpm install
```

### 2. PostgreSQL starten und Datenbank anlegen

```bash
brew services start postgresql@16
# Alternativ: brew services start postgresql

createdb wiphy
```

Falls `createdb` fehlschlägt, existiert die Datenbank vermutlich schon — dann mit Schritt 3 fortfahren.

### 3. `.env` anlegen

Im Projekt-Root eine Datei `.env` erstellen (wird von Git ignoriert):

```env
DATABASE_URL="postgresql://DEIN_USER@localhost:5432/wiphy?schema=public"
NEXTAUTH_SECRET="ein-langer-zufaelliger-string"
NEXTAUTH_URL="http://localhost:3000"
```

`DEIN_USER` ist in der Regel dein macOS-Benutzername (bei Homebrew-Postgres oft ohne Passwort). Ein Secret kannst du z. B. mit `openssl rand -base64 32` erzeugen.

Für **Rundmails** (optional, nur wenn du `/dashboard/mail` nutzen willst) zusätzlich SMTP-Variablen setzen — siehe [Konfiguration](#konfiguration--umgebungsvariablen).

### 4. Datenbank-Schema einrichten (Prisma)

```bash
pnpm dlx prisma generate
pnpm dlx prisma db push
```

Optional einen ersten Admin-Benutzer anlegen:

```bash
pnpm dlx prisma db seed
```

Standard-Login nach dem Seed: `admin@wiphy.de` / `admin123` (siehe `prisma/seed.ts`).

### 5. Entwicklungsserver starten

```bash
pnpm dev
```

Die App läuft unter [http://localhost:3000](http://localhost:3000).

### Kurz-Checkliste (wenn schon eingerichtet)

```bash
brew services start postgresql@16   # falls Postgres nicht läuft
pnpm dev
```

### Häufige Probleme


| Symptom                                     | Lösung                                                                                         |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `datasource.url property is required`       | `.env` fehlt oder `DATABASE_URL` ist nicht gesetzt                                             |
| Verbindung zu PostgreSQL schlägt fehl       | `brew services start postgresql@16` und prüfen, ob die DB `wiphy` existiert (`createdb wiphy`) |
| Prisma-Client veraltet nach Schema-Änderung | `pnpm dlx prisma generate` und ggf. `pnpm dlx prisma db push`                                  |
| Prisma CLI warnt wegen Node-Version         | Node 22 LTS verwenden (z. B. `nvm use 22`)                                                     |


## 📂 Ordnerstruktur

wiphy/
├── .env                        # Datenbank-URL & NextAuth Secret
├── prisma.config.ts            # Prisma 7 Konfiguration
├── prisma/
│   ├── schema.prisma           # Datenbank-Schema (User, BlogPost, MemberFee)
│   └── seed.ts                 # Skript zum Anlegen des ersten Admin-Users
└── src/
    ├── auth.ts                 # NextAuth v5 Konfiguration & Callbacks
    ├── lib/
    │   └── prisma.ts           # Globaler Prisma-Client mit PG-Adapter
    ├── components/             # Wiederverwendbare UI-Komponenten
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── LogoutButton.tsx
    │   ├── MarkdownEditor.tsx  # Client-Komponente für den Blog-Admin
    │   └── MarkdownViewer.tsx  # Client-Komponente für die Blog-Anzeige
    └── app/
        ├── layout.tsx          # Globales Layout (Theme, Header, Footer)
        ├── page.tsx            # Öffentliche Startseite
        ├── login/              # Login-Seite
        ├── register/           # Registrierungs-Seite
        ├── blog/               # Öffentliche Blog-Übersicht & Detailseiten
        ├── dashboard/          # Geschützter Mitgliederbereich
        │   ├── page.tsx        # Dashboard (Nutzerliste / Profil / Admin-Übersicht)
        │   └── users/[id]/     # Profil bearbeiten
        │   ├── blog/           # Blog-Admin (nur für Admins)
        │   └── mail/           # Rundmails an Mitglieder (nur für Admins)
        └── api/auth/           # NextAuth API-Routen

## ⚙️ Konfiguration & Umgebungsvariablen

Für die Ersteinrichtung siehe [App starten](#app-starten-ersteinrichtung). Hier die vollständige Liste der Variablen:

Lege eine `.env` im Projekt-Root an (nicht ins Repo einchecken) und befülle mindestens:

- **Datenbank & NextAuth**
  - `DATABASE_URL` – PostgreSQL-Verbindungs-URL
  - `NEXTAUTH_SECRET` – Secret für NextAuth
  - `NEXTAUTH_URL` – Basis-URL der Anwendung (z.B. `http://localhost:3000`)
- **SMTP / Rundmail**
  - `MAIL_SERVICE` – optionaler Nodemailer-Service, für Google Workspace z.B. `GmailWorkspace`
  - `SMTP_HOST` – SMTP-Server (z.B. Mail-Provider)
  - `SMTP_PORT` – Port (z.B. `587` oder `465`)
  - `SMTP_USER` – SMTP-Benutzername / Login
  - `SMTP_PASS` – SMTP-Passwort / App-Passwort
  - `EMAIL_FROM` – Absender-Adresse, z.B. `"Verein XYZ" <info@verein.de>`

Für **Google Workspace SMTP Relay** kannst du entweder den generischen SMTP-Weg oder den Nodemailer-Shortcut nutzen:

```env
MAIL_SERVICE=GmailWorkspace
SMTP_USER=meine-adresse@meinedomain.de
SMTP_PASS=dein-app-passwort
EMAIL_FROM="Wiphy" <info@meinedomain.de>
```

Alternativ ohne `MAIL_SERVICE`:

```env
SMTP_HOST=smtp-relay.gmail.com
SMTP_PORT=587
SMTP_USER=meine-adresse@meinedomain.de
SMTP_PASS=dein-app-passwort
EMAIL_FROM="Wiphy" <info@meinedomain.de>
```

## 🛠 Weitere Befehle

Nach Änderungen an `prisma/schema.prisma`:

```bash
pnpm dlx prisma generate
pnpm dlx prisma db push
```

Das ist nach diesem Stand besonders wichtig, weil Rate-Limits in der Datenbank
gespeichert werden (`RateLimitEntry`) und nicht mehr nur im Server-Prozess.

Qualitätschecks:

```bash
pnpm lint
pnpm typecheck
pnpm test
```

Datenbank grafisch einsehen (Prisma Studio):

```bash
pnpm dlx prisma studio
```

