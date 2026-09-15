import assert from "node:assert/strict";
import test from "node:test";
import {
  JOURNEY_STEPS,
  journeyStepIndex,
  resolveJourneyStage,
  type JourneyState,
} from "../src/lib/membershipJourney";

/** Der häufigste Fall: jemand ruft die Seite auf, ohne angemeldet zu sein. */
const anonymous: JourneyState = {
  signedIn: false,
  emailVerified: false,
  isMember: false,
  hasOpenApplication: false,
  justRegistered: false,
};

test("ohne Konto beginnt der Ablauf beim Konto", () => {
  assert.equal(resolveJourneyStage(anonymous), "konto");
});

test("direkt nach der Registrierung steht die Bestätigung an", () => {
  assert.equal(
    resolveJourneyStage({ ...anonymous, justRegistered: true }),
    "bestaetigung",
  );
});

test("angemeldet mit unbestätigter Adresse bleibt bei der Bestätigung", () => {
  assert.equal(
    resolveJourneyStage({ ...anonymous, signedIn: true, emailVerified: false }),
    "bestaetigung",
  );
});

test("angemeldet und bestätigt führt zum Antrag", () => {
  assert.equal(
    resolveJourneyStage({ ...anonymous, signedIn: true, emailVerified: true }),
    "antrag",
  );
});

test("ein offener Antrag führt zur Prüfung statt zurück ins Formular", () => {
  assert.equal(
    resolveJourneyStage({
      ...anonymous,
      signedIn: true,
      emailVerified: true,
      hasOpenApplication: true,
    }),
    "pruefung",
  );
});

test("für Mitglieder ist der Ablauf beendet — auch mit offenem Altantrag", () => {
  assert.equal(
    resolveJourneyStage({
      ...anonymous,
      signedIn: true,
      emailVerified: true,
      isMember: true,
      hasOpenApplication: true,
    }),
    "mitglied",
  );
});

test("journeyStepIndex zeigt auf die Station, Mitglieder dahinter", () => {
  assert.equal(journeyStepIndex("konto"), 0);
  assert.equal(journeyStepIndex("pruefung"), JOURNEY_STEPS.length - 1);
  assert.equal(journeyStepIndex("mitglied"), JOURNEY_STEPS.length);
});
