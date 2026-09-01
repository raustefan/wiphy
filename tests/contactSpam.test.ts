import assert from "node:assert/strict";
import test from "node:test";
import { scoreSpam } from "../src/lib/server/contactSpam";
import { SPAM_SCORE_MAIL_THRESHOLD } from "../src/lib/contact";

const legitimate = {
  name: "Anna Beispiel",
  email: "anna@example.com",
  subject: "Frage zur Mitgliedschaft",
  message:
    "Hallo, ich habe 2019 mein Studium der Wirtschaftsphysik abgeschlossen und würde gerne dem Verein beitreten. Wie läuft die Aufnahme ab?",
};

test("a normal enquiry scores below the mail threshold", () => {
  assert.ok(scoreSpam(legitimate) < SPAM_SCORE_MAIL_THRESHOLD);
});

test("a single link is not enough to block a mail", () => {
  const withLink = {
    ...legitimate,
    message: `${legitimate.message} Mein Profil: https://example.com/anna`,
  };
  assert.ok(scoreSpam(withLink) < SPAM_SCORE_MAIL_THRESHOLD);
});

test("link farms are held back", () => {
  const linkSpam = {
    ...legitimate,
    subject: "SEO backlinks",
    message: "https://a.example https://b.example https://c.example https://d.example",
  };
  assert.ok(scoreSpam(linkSpam) >= SPAM_SCORE_MAIL_THRESHOLD);
});

test("non-Latin script raises suspicion but does not block a mail on its own", () => {
  // Deliberately below the threshold: a genuine enquiry containing e.g. a
  // Cyrillic or CJK name must still reach the board's inbox.
  const cyrillic = { ...legitimate, message: "Привет, это тестовое сообщение для формы." };
  const score = scoreSpam(cyrillic);
  assert.ok(score > scoreSpam(legitimate));
  assert.ok(score < SPAM_SCORE_MAIL_THRESHOLD);
});

test("non-Latin script combined with a second signal is held back", () => {
  const cyrillicLinks = {
    ...legitimate,
    message: "Привет! https://a.example https://b.example",
  };
  assert.ok(scoreSpam(cyrillicLinks) >= SPAM_SCORE_MAIL_THRESHOLD);
});

test("anchor markup in the body is treated as link spam", () => {
  const markup = { ...legitimate, message: `<a href="https://spam.example">click here</a>` };
  assert.ok(scoreSpam(markup) >= SPAM_SCORE_MAIL_THRESHOLD);
});

test("scoring ignores the sender's own name and address", () => {
  const oddName = { ...legitimate, name: "КАЗИНО", email: "crypto@example.com" };
  assert.equal(scoreSpam(oddName), scoreSpam(legitimate));
});
