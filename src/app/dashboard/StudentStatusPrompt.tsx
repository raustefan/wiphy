"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Mortarboard01Icon } from "@hugeicons/core-free-icons";
import { Button, ButtonLink, Callout } from "@/components/ui";
import { useActionForm } from "@/lib/client/useActionForm";
import { setStudentEndYearAction } from "./actions";

/**
 * Erscheint nur im letzten Jahr mit ermäßigtem Beitrag. Verlängert wird auf der
 * Zahlungsseite; „Nein“ wird gemerkt, damit der Hinweis verschwindet und der
 * Vorstand sieht, wer geantwortet hat. Einen Nachweis verlangt der Verein nicht.
 */
export function StudentStatusPrompt({ year }: { year: number }) {
    const form = useActionForm(setStudentEndYearAction);

    return (
        <Callout
            icon={<HugeiconsIcon icon={Mortarboard01Icon} size={18} aria-hidden="true" />}
            title={`Studierst du ${year + 1} noch?`}
        >
            <p className="text-pretty">
                Dein ermäßigter Beitrag gilt bis einschließlich {year}. Studierst du weiter, kannst
                du den Status auf der Zahlungsseite verlängern.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
                <ButtonLink href="/dashboard/zahlungen#studium" size="sm">
                    Status verlängern
                    <HugeiconsIcon icon={ArrowRight01Icon} size={15} aria-hidden="true" />
                </ButtonLink>
                <Button
                    size="sm"
                    variant="soft"
                    color="neutral"
                    loading={form.pending}
                    onClick={() => void form.run({ endYear: String(year) })}
                >
                    Nein, ab {year + 1} nicht mehr
                </Button>
            </div>
            {form.feedback}
        </Callout>
    );
}
