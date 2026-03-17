# wiphy - Vereinswebsite

Eine moderne Vereinswebsite mit einem öffentlichen Bereich (Startseite, Blog) und einem geschützten Mitgliederbereich (Dashboard, Profilverwaltung, Blog-Admin).

## 🚀 Tech Stack & Pakete

- **Framework:** Next.js 15 (App Router) & TypeScript
- **UI & Styling:** Radix UI (`@radix-ui/themes`)
- **Datenbank:** PostgreSQL (lokal via Homebrew)
- **ORM:** Prisma v7 (`prisma`, `@prisma/client`, `@prisma/adapter-pg`, `pg`)
- **Authentifizierung:** NextAuth.js v5 (`next-auth@beta`, `bcryptjs`)
- **Blog / Editor:** `@uiw/react-md-editor`, `@uiw/react-markdown-preview`
- **E-Mail-Versand:** Nodemailer (Rundmails an Mitglieder)

## ✨ Features

- **Öffentlicher Bereich:**
  - Schicke Startseite mit Hero-Sektion und Info-Cards.
  - Blog-Übersicht (`/blog`) und Lese-Ansicht für Markdown-Artikel.
  - Globaler Header & Footer.
- **Authentifizierung:**
  - Registrierung (`/register`) und Login (`/login`) via E-Mail & Passwort.
  - Custom Logout-Button mit Bestätigungs-Overlay (Radix UI Dialog).
- **Rollen-System (ADMIN & MEMBER):**
  - **MEMBER:** Kann sich einloggen, das Dashboard sehen und das eigene Profil (Name, Stadt, Telefon) bearbeiten.
  - **ADMIN:** Sieht alle Benutzer, kann Rollen ändern und hat vollen Zugriff auf das Blog-System (Erstellen, Bearbeiten, Löschen, Veröffentlichen).
- **Blog-System (Markdown):**
  - Integrierter Split-Screen Markdown-Editor im Admin-Bereich.
  - Öffentliche Anzeige der Beiträge im Blog-Bereich.
- **Rundmail-System:**
  - Admins können über `/dashboard/mail` eine Rundmail an definierte Empfänger-Gruppen schicken.
  - Unterstützte Gruppen: **Alle Benutzer**, **nur Mitglieder (MEMBER)** oder **nur Administratoren (ADMIN)**.
  - Versand per BCC, damit Empfänger nicht alle Adressen sehen.
  - Nutzt Nodemailer und SMTP-Zugangsdaten aus der `.env`.

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
        │   �?── users/[id]/     # Profil bearbeiten
        │   ├── blog/           # Blog-Admin (nur für Admins)
        │   └── mail/           # Rundmails an Mitglieder (nur für Admins)
        └── api/auth/           # NextAuth API-Routen

## ⚙️ Konfiguration & Umgebungsvariablen

Lege eine `.env` im Projekt-Root an (nicht ins Repo einchecken) und befülle mindestens:

- **Datenbank & NextAuth**
  - `DATABASE_URL` – PostgreSQL-Verbindungs-URL
  - `NEXTAUTH_SECRET` – Secret für NextAuth
  - `NEXTAUTH_URL` – Basis-URL der Anwendung (z.B. `http://localhost:3000`)

- **SMTP / Rundmail**
  - `SMTP_HOST` – SMTP-Server (z.B. Mail-Provider)
  - `SMTP_PORT` – Port (z.B. `587` oder `465`)
  - `SMTP_USER` – SMTP-Benutzername / Login
  - `SMTP_PASS` – SMTP-Passwort / App-Passwort
  - `EMAIL_FROM` – Absender-Adresse, z.B. `"Verein XYZ" <info@verein.de>`

## 🛠 Wichtige Befehle


Entwicklungsserver starten:


	pnpm dev

Datenbank-Schema pushen (nach Änderungen in schema.prisma):


	pnpm dlx prisma generate
	pnpm dlx prisma db push

Datenbank grafisch einsehen (Prisma Studio):


	pnpm dlx prisma studio
