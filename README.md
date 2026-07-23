# WirtschaftsPhysik Alumni e.V. Seite

## Aufbau

- **Framework:** Next.js 16 (App Router) & TypeScript
- **UI & Styling:** Radix UI (`@radix-ui/themes`)
- **Datenbank:** PostgreSQL
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
