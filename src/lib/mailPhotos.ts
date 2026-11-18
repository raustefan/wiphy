/**
 * Grenzen für Fotos im Mailanhang — Formular und Server lesen dieselben Zahlen.
 *
 * Jede Rundmail geht einzeln raus: 3 MB Anhang an 150 Personen sind schon
 * 450 MB über SMTP. Deshalb klein: das Formular verkleinert vor dem Upload,
 * der Server kodiert danach noch einmal neu und prüft die Gesamtgröße.
 * `uploadBytes` × `count` muss unter `serverActions.bodySizeLimit` bleiben.
 */
export const MAIL_PHOTO_LIMITS = {
  count: 3,
  /** Pro Datei nach dem Verkleinern im Browser. */
  uploadBytes: 1.5 * 1024 * 1024,
  /** Alle Fotos zusammen, nach dem Neukodieren auf dem Server. */
  totalBytes: 3 * 1024 * 1024,
} as const;
