import { AppError } from "./errors";

function readRequiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function readRequiredMailEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new AppError(
      "INTERNAL_ERROR",
      `E-Mail-Konfiguration unvollständig: ${name} fehlt.`,
    );
  }
  return value;
}

export function getDatabaseUrl() {
  return readRequiredEnv("DATABASE_URL");
}

export function getAltchaHmacKey() {
  return readRequiredEnv("ALTCHA_HMAC_KEY");
}

/**
 * Schlüssel für die Pseudonymisierung im Sicherheitsprotokoll (`securityLog`).
 *
 * Ein blanker SHA-256 über eine IP-Adresse ist kein wirksames Pseudonym: der
 * IPv4-Raum ist in Minuten durchprobiert, eine E-Mail-Adresse aus einer Liste
 * ebenso. Erst der geheime Pepper macht den Hash für jemanden ohne Serverzugriff
 * unumkehrbar (Art. 32 Abs. 1 lit. a DSGVO).
 *
 * Fällt auf das Auth-Secret zurück, damit das Protokoll nicht an einer
 * fehlenden Variable scheitert; ein eigener `SECURITY_LOG_PEPPER` ist besser,
 * weil er unabhängig vom Session-Secret rotiert werden kann. Rotation ist
 * folgenlos — alte Hashes lassen sich dann nur nicht mehr mit neuen
 * vergleichen, was bei 7 bzw. 90 Tagen Aufbewahrung schnell verjährt.
 */
export function getSecurityLogPepper() {
  const dedicated = process.env.SECURITY_LOG_PEPPER?.trim();
  if (dedicated) {
    return dedicated;
  }

  const authSecret = process.env.NEXTAUTH_SECRET?.trim() ?? process.env.AUTH_SECRET?.trim();
  if (!authSecret) {
    throw new Error(
      "Missing required environment variable: SECURITY_LOG_PEPPER (or NEXTAUTH_SECRET)",
    );
  }
  return authSecret;
}

export function getSmtpConfig() {
  const service = process.env.MAIL_SERVICE?.trim();
  const user = readRequiredMailEnv("GMAIL_USER");
  const pass = readRequiredMailEnv("GMAIL_APP_PASSWORD");
  const from = readRequiredMailEnv("EMAIL_FROM");

  if (service === "GmailWorkspace") {
    return {
      transport: {
        service,
        auth: { user, pass },
      },
      from,
    };
  }

  const host = readRequiredMailEnv("SMTP_HOST");
  const rawPort = readRequiredMailEnv("SMTP_PORT");
  const port = Number(rawPort);

  if (!Number.isInteger(port) || port <= 0) {
    throw new AppError("INTERNAL_ERROR", "E-Mail-Konfiguration unvollständig: SMTP_PORT ist ungültig.");
  }

  return {
    transport: {
      host,
      port,
      secure: true,
      auth: { user, pass },
    },
    from,
  };
}
