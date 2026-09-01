/**
 * Contact-form constants shared between server actions and client components.
 * Kept out of `contactService` so importing them into a client component does
 * not drag the Prisma client into the browser bundle.
 */

/**
 * Requests scoring at or above this are persisted but never mailed. Keeping them
 * in the database instead of dropping them means a false positive is recoverable
 * from the dashboard rather than lost.
 */
export const SPAM_SCORE_MAIL_THRESHOLD = 4;

/** Fastest a human plausibly fills the form. Anything quicker is scripted. */
export const MIN_FILL_TIME_MS = 3000;

export const MAX_MESSAGE_LENGTH = 5000;
