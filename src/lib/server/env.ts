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

export function getSmtpConfig() {
  const service = process.env.MAIL_SERVICE?.trim();
  const user = readRequiredMailEnv("SMTP_USER");
  const pass = readRequiredMailEnv("SMTP_PASS");
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
      secure: port === 465,
      auth: { user, pass },
    },
    from,
  };
}
