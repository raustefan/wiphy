"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
    Alert01Icon,
    BankIcon,
    Calendar01Icon,
    Cancel01Icon,
    CheckmarkCircle02Icon,
    Delete02Icon,
    Image01Icon,
    ListIcon,
    Mail01Icon,
    Megaphone01Icon,
    News01Icon,
    Note01Icon,
    SentIcon,
    UserGroupIcon,
    UserIcon,
    UserMultipleIcon,
    ViewIcon,
} from "@hugeicons/core-free-icons";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
    Badge,
    Button,
    ButtonLink,
    Callout,
    Card,
    Checkbox,
    Dialog,
    DialogFooter,
    Field,
    Input,
    Separator,
    Spinner,
} from "@/components/ui";
import { previewRundmailAction, sendEmailAction, sendTestMailAction } from "./actions";
import { EmailBodyField, useEmailEditor } from "@/components/EmailBodyField";
import { EmailPreviewDialog } from "@/components/EmailPreviewButton";
import { useActionForm } from "@/lib/client/useActionForm";
import { formatStatus, getStatusTone } from "@/lib/statusLabels";
import { formatBytes, formatDate } from "@/lib/format";
import { isoDate } from "@/lib/sepa";
import { cn } from "@/lib/cn";
import { MAIL_TARGET_FILTERS, MAIL_TARGET_INFO, MAIL_TARGETS, type MailTarget } from "@/lib/mailTargets";
import { MAIL_PHOTO_LIMITS } from "@/lib/mailPhotos";
import type { MailSendReport } from "@/lib/server/email/sendReport";

export type MailUserOption = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    /** `false`: hat den Newsletter abbestellt. */
    newsletter: boolean;
    directDebit: boolean;
};

export type MailEventOption = { id: string; title: string; when: string; published: boolean };
export type MailPostOption = { id: string; title: string; when: string };

type Template = "EVENT" | "BLOG" | "SEPA" | "OTHER";
type YesNo = "yes" | "no";
type Salutation = "PERSONAL" | "NONE";

/** Was die Seite dem Formular mitgibt. */
export type MailFormSetup = {
    events: MailEventOption[];
    posts: MailPostOption[];
    /** Pro Einzugsjahr: wer per Lastschrift einen offenen Beitrag hat. */
    sepaPayers: Record<number, string[]>;
    adminEmail: string | null;
    /** Vorbelegung aus `?termin=` bzw. `?beitrag=` — muss trotzdem bestätigt werden. */
    initial: { template?: Template; eventId?: string; postId?: string };
};

type MailFormProps = MailFormSetup & {
    users: MailUserOption[];
    onSuccess?: (report: MailSendReport) => void;
};

const MIN_SEARCH_LEN = 2;
const MAX_SEARCH_RESULTS = 50;
/** Ab so vielen Empfängern fragt der Versand noch einmal nach. */
const CONFIRM_FROM = 20;

const STATUS_ORDER = ["HONORARY_MEMBER", "REGULAR_MEMBER", "NON_MEMBER"] as const;
const STATUS_RANK: Record<string, number> = Object.fromEntries(
    STATUS_ORDER.map((status, index) => [status, index]),
);

function byStatusThenName(a: MailUserOption, b: MailUserOption) {
    const rankA = STATUS_RANK[a.status] ?? STATUS_ORDER.length;
    const rankB = STATUS_RANK[b.status] ?? STATUS_ORDER.length;
    if (rankA !== rankB) return rankA - rankB;
    return (a.name || a.email).localeCompare(b.name || b.email, "de");
}

const STEPS = ["template", "kind", "target", "subject", "salutation", "body", "copy", "preview"] as const;
type StepId = (typeof STEPS)[number];

const STEP_TITLES: Record<StepId, string> = {
    template: "Vorlage",
    kind: "Art der Mail",
    target: "Empfänger",
    subject: "Betreff",
    salutation: "Anrede",
    body: "Inhalt",
    copy: "Kopie an mich",
    preview: "Vorschau & Prüfung",
};

const TARGET_ICONS: Record<MailTarget, typeof News01Icon> = {
    ALL: UserGroupIcon,
    MEMBERS: UserMultipleIcon,
    SEPA_YES: BankIcon,
    SEPA_NO: BankIcon,
    HONORARY_MEMBER: UserIcon,
    SELECTED: ListIcon,
};

/**
 * Text der SEPA-Vorlage. Betrag, Datum und Mandatsreferenz setzt der Versand
 * pro Person als Infoblock darunter — hier stehen sie bewusst nicht.
 */
const SEPA_BODY =
    "<p>in Kürze ziehen wir den Mitgliedsbeitrag per SEPA-Lastschrift von deinem Konto ein. Betrag, Einzugsdatum und Mandatsreferenz findest du unten.</p>" +
    "<p>Bitte sorge dafür, dass dein Konto zum Einzugstermin gedeckt ist. Hat sich deine Bankverbindung geändert, gib uns bitte vorher Bescheid – am einfachsten im Mitgliederbereich.</p>";

/** Sichtbarer Text eines Editor-HTMLs — leer, wenn nur `<p></p>` drinsteht. */
function plainText(html: string): string {
    return html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Verkleinert ein Foto im Browser, bevor es hochgeladen wird: Handyfotos
 * bringen 4–8 MB mit, die Serveraktion nimmt nur wenige MB an. Der Server
 * kodiert danach noch einmal neu — das hier spart nur die Leitung.
 */
async function shrinkPhoto(file: File): Promise<File> {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
    if (!blob) throw new Error("toBlob");
    return new File([blob], `${file.name.replace(/\.[^.]*$/, "")}.jpg`, {
        type: "image/jpeg",
        lastModified: file.lastModified,
    });
}

// ───────────────────────────── Bausteine ─────────────────────────────

type Choice<T extends string> = {
    value: T;
    title: string;
    description?: string;
    icon?: typeof News01Icon;
    disabled?: boolean;
    /** Kleine Zusatzangabe rechts oben, z. B. die Anzahl. */
    meta?: string;
};

/**
 * Große Auswahlkarten statt Dropdown. Natives Radio: Pfeiltasten wechseln die
 * Wahl. Ein Klick auf die schon gewählte Karte bestätigt sie erneut — so lässt
 * sich ein wieder geöffneter Schritt ohne Änderung abschließen.
 */
function ChoiceCards<T extends string>({
    name,
    legend,
    value,
    choices,
    onPick,
    columns = 2,
}: {
    name: string;
    legend: string;
    value: T | null;
    choices: Choice<T>[];
    onPick: (value: T) => void;
    columns?: 2 | 3;
}) {
    return (
        <fieldset>
            <legend className="sr-only">{legend}</legend>
            <div className={cn("grid gap-3", columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2")}>
                {choices.map((choice) => (
                    <label
                        key={choice.value}
                        className={cn(
                            "group relative flex items-start gap-3 rounded-[3px] border border-line-strong bg-surface p-4 transition-colors has-checked:border-physics has-checked:bg-physics/8 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-physics",
                            choice.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-physics",
                        )}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={choice.value}
                            disabled={choice.disabled}
                            checked={value === choice.value}
                            onChange={() => onPick(choice.value)}
                            onClick={() => value === choice.value && onPick(choice.value)}
                            className="sr-only"
                        />
                        {choice.icon && (
                            <span
                                aria-hidden="true"
                                className="grid size-9 shrink-0 place-items-center rounded-[3px] border border-physics/40 text-physics transition-colors group-has-checked:bg-physics group-has-checked:text-on-physics"
                            >
                                <HugeiconsIcon icon={choice.icon} size={17} />
                            </span>
                        )}
                        <span className="grid min-w-0 gap-1 pr-6">
                            <span className="font-semibold text-foreground">{choice.title}</span>
                            {choice.meta && <span className="font-mono text-xs text-faint">{choice.meta}</span>}
                            {choice.description && (
                                <span className="text-sm text-pretty text-muted">{choice.description}</span>
                            )}
                        </span>
                        <HugeiconsIcon
                            icon={CheckmarkCircle02Icon}
                            size={18}
                            aria-hidden="true"
                            className="absolute top-3 right-3 text-physics opacity-0 transition-opacity group-has-checked:opacity-100"
                        />
                    </label>
                ))}
            </div>
        </fieldset>
    );
}

type StepState = "open" | "done" | "pending";

/**
 * Ein Schritt des Ablaufs. Abgeschlossen klappt er zu einer Zeile mit der
 * getroffenen Wahl zusammen — so bleiben alle Einstellungen sichtbar, ohne
 * dass die Seite lang wird. Der Inhalt bleibt eingehängt (nur verborgen),
 * damit der Editor seinen Text behält.
 */
function Step({
    number,
    id,
    state,
    summary,
    onEdit,
    children,
}: {
    number: number;
    id: StepId;
    state: StepState;
    summary: ReactNode;
    onEdit: () => void;
    children: ReactNode;
}) {
    return (
        <section
            aria-labelledby={`step-${id}`}
            className={cn(
                "rounded-[4px] border bg-surface transition-colors",
                state === "open" ? "border-physics/60 shadow-sm" : "border-line",
            )}
        >
            <div className="flex items-start gap-3 p-4">
                <span
                    aria-hidden="true"
                    className={cn(
                        "grid size-7 shrink-0 place-items-center rounded-full font-mono text-xs font-semibold",
                        state === "done" && "bg-positive/15 text-positive",
                        state === "open" && "bg-physics text-on-physics",
                        state === "pending" && "bg-raised text-faint",
                    )}
                >
                    {state === "done" ? <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} /> : number}
                </span>
                <div className="grid min-w-0 flex-1 gap-0.5 pt-0.5">
                    <h2
                        id={`step-${id}`}
                        className={cn("text-sm font-semibold", state === "pending" ? "text-faint" : "text-foreground")}
                    >
                        {STEP_TITLES[id]}
                    </h2>
                    {state === "done" && <div className="text-sm break-words text-muted">{summary}</div>}
                </div>
                {state === "done" && (
                    <Button size="sm" variant="ghost" color="neutral" type="button" onClick={onEdit}>
                        Ändern
                    </Button>
                )}
            </div>
            <div hidden={state !== "open"} className="grid gap-4 border-t border-line p-4 sm:p-5">
                {children}
            </div>
        </section>
    );
}

function NextButton({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
    return (
        <div>
            <Button type="button" disabled={disabled} onClick={onClick}>
                Weiter
            </Button>
        </div>
    );
}

// ───────────────────────────── Formular ─────────────────────────────

export function MailForm({ users, events, posts, sepaPayers, adminEmail, initial, onSuccess }: MailFormProps) {
    const [template, setTemplate] = useState<Template | null>(initial.template ?? null);
    const [eventId, setEventId] = useState<string | null>(initial.eventId ?? null);
    const [postId, setPostId] = useState<string | null>(initial.postId ?? null);
    const [attachIcs, setAttachIcs] = useState(true);
    const [sepaDate, setSepaDate] = useState("");
    const [kind, setKind] = useState<YesNo | null>(null);
    const [target, setTarget] = useState<MailTarget | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
    const [search, setSearch] = useState("");
    const [salutation, setSalutation] = useState<Salutation | null>(null);
    const [body, setBody] = useState("");
    const [photos, setPhotos] = useState<File[]>([]);
    const [photoError, setPhotoError] = useState("");
    const [photosBusy, setPhotosBusy] = useState(false);
    const [copy, setCopy] = useState<YesNo | null>(null);

    const [confirmed, setConfirmed] = useState<Set<StepId>>(() => new Set());
    const [editing, setEditing] = useState<StepId | null>(null);

    const [preview, setPreview] = useState<{
        token: string;
        recipients: number;
        skipped: number;
        snapshot: string;
    } | null>(null);
    const [previewHtml, setPreviewHtml] = useState<string | null>(null);
    const [reviewedToken, setReviewedToken] = useState<string | null>(null);
    const [testSentTo, setTestSentTo] = useState<string | null>(null);
    const [showRecipients, setShowRecipients] = useState(false);
    const [confirmSend, setConfirmSend] = useState(false);

    const event = events.find((e) => e.id === eventId) ?? null;
    const post = posts.find((p) => p.id === postId) ?? null;

    function defaultSubject(t: Template | null, e: MailEventOption | null, p: MailPostOption | null): string {
        if (t === "EVENT") return e ? `Einladung: ${e.title}` : "";
        if (t === "BLOG") return p ? `Neuer Beitrag: ${p.title}` : "";
        if (t === "SEPA") return "Ankündigung des SEPA-Lastschrifteinzugs";
        return "";
    }

    const [subject, setSubject] = useState(() => defaultSubject(template, event, post));
    // Was zuletzt automatisch eingesetzt wurde: nur das darf eine andere
    // Vorlage wieder überschreiben, Eigenes bleibt stehen.
    const autoSubject = useRef(subject);
    const autoBody = useRef("");

    const editor = useEmailEditor({ minHeight: 220 });
    useEffect(() => {
        if (!editor) return;
        const update = () => setBody(editor.getHTML());
        editor.on("update", update);
        return () => {
            editor.off("update", update);
        };
    }, [editor]);

    // ─── Schrittlogik ───

    function confirm(id: StepId) {
        setConfirmed((prev) => new Set(prev).add(id));
        setEditing(null);
    }

    function unconfirm(...ids: StepId[]) {
        setConfirmed((prev) => {
            const next = new Set(prev);
            for (const id of ids) next.delete(id);
            return next;
        });
    }

    /** Neue Vorlage oder anderer Termin/Beitrag: Betreff und Text nachziehen. */
    function changeTemplate(next: { template: Template; eventId?: string | null; postId?: string | null }) {
        const nextEvent = events.find((e) => e.id === (next.eventId ?? eventId)) ?? null;
        const nextPost = posts.find((p) => p.id === (next.postId ?? postId)) ?? null;
        setTemplate(next.template);
        if (next.eventId !== undefined) setEventId(next.eventId);
        if (next.postId !== undefined) setPostId(next.postId);

        const stale: StepId[] = ["template"];
        const newSubject = defaultSubject(next.template, nextEvent, nextPost);
        if ((subject.trim() === "" || subject === autoSubject.current) && newSubject !== subject) {
            setSubject(newSubject);
            autoSubject.current = newSubject;
            stale.push("subject");
        }
        if (next.template !== template && editor && (plainText(body) === "" || body === autoBody.current)) {
            editor.commands.setContent(next.template === "SEPA" ? SEPA_BODY : "");
            const html = editor.getHTML();
            setBody(html);
            autoBody.current = html;
            stale.push("body");
        }
        if (next.template === "SEPA" && kind === "yes") {
            setKind(null);
            stale.push("kind");
        }
        unconfirm(...stale);
    }

    // Einmal beim Einhängen: Datumsgrenzen dürfen nicht bei jedem Rendern wandern.
    const [dates] = useState(() => {
        const now = new Date();
        return {
            today: isoDate(now),
            tomorrow: isoDate(new Date(now.getTime() + 86_400_000)),
            lastSepaDay: `${now.getFullYear() + 1}-12-31`,
        };
    });
    const today = dates.today;
    const sepaYear = sepaDate ? Number(sepaDate.slice(0, 4)) : null;
    const sepaPayerSet = useMemo(
        () => new Set(sepaYear ? (sepaPayers[sepaYear] ?? []) : []),
        [sepaPayers, sepaYear],
    );
    const isNewsletter = kind === "yes";
    const bodyOptional = template === "EVENT" || template === "BLOG";

    const userById = useMemo(() => new Map(users.map((u) => [u.id, u])), [users]);
    const selectedUsers = useMemo(
        () =>
            Array.from(selectedIds)
                .map((id) => userById.get(id))
                .filter((u): u is MailUserOption => u != null)
                .sort(byStatusThenName),
        [selectedIds, userById],
    );

    const groupCounts = useMemo(
        () =>
            Object.fromEntries(
                MAIL_TARGETS.map((t) => [t, t === "SELECTED" ? selectedIds.size : users.filter(MAIL_TARGET_FILTERS[t]).length]),
            ) as Record<MailTarget, number>,
        [users, selectedIds],
    );

    // Dieselbe Auswahl trifft der Server noch einmal selbst — die Liste hier
    // zeigt nur vorab, wer die Mail bekommt.
    const { recipients, optedOut, notPaying } = useMemo(() => {
        if (!target) return { recipients: [], optedOut: 0, notPaying: 0 };
        const base = target === "SELECTED" ? selectedUsers : users.filter(MAIL_TARGET_FILTERS[target]);
        const paying = template === "SEPA" ? base.filter((u) => sepaPayerSet.has(u.id)) : base;
        const kept = isNewsletter ? paying.filter((u) => u.newsletter) : paying;
        return {
            recipients: [...kept].sort(byStatusThenName),
            optedOut: paying.length - kept.length,
            notPaying: base.length - paying.length,
        };
    }, [target, users, selectedUsers, template, sepaPayerSet, isNewsletter]);

    // Alles, was die Mail ausmacht. Weicht es von der Vorschau ab, ist die
    // Vorschau veraltet — der Server sieht das genauso (Vorschau-Token).
    const snapshot = JSON.stringify([
        template,
        template === "EVENT" ? [eventId, attachIcs] : null,
        template === "BLOG" ? postId : null,
        template === "SEPA" ? sepaDate : null,
        kind,
        target,
        target === "SELECTED" ? [...selectedIds].sort() : null,
        subject,
        salutation,
        body,
        photos.map((p) => [p.name, p.size, p.lastModified]),
        copy,
    ]);
    const previewFresh = preview !== null && preview.snapshot === snapshot;

    const valid: Record<StepId, boolean> = {
        template:
            template === "OTHER" ||
            (template === "EVENT" && event !== null) ||
            (template === "BLOG" && post !== null) ||
            (template === "SEPA" && sepaDate > today),
        kind: kind !== null && !(template === "SEPA" && kind === "yes"),
        target: target !== null && (target !== "SELECTED" || selectedIds.size > 0),
        subject: subject.trim().length > 0 && subject.length <= 200,
        salutation: salutation !== null,
        body: (bodyOptional || plainText(body) !== "") && !photosBusy,
        copy: copy !== null,
        preview: previewFresh && reviewedToken === preview?.token,
    };
    const isDone = (id: StepId) => valid[id] && (id === "preview" || confirmed.has(id));
    const firstOpen = STEPS.find((id) => !isDone(id)) ?? null;
    const openStep = editing ?? firstOpen;
    const allDone = firstOpen === null;

    function stepState(id: StepId): StepState {
        if (id === openStep) return "open";
        return isDone(id) ? "done" : "pending";
    }

    // ─── Empfängerauswahl ───

    const searchResults = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (q.length < MIN_SEARCH_LEN) return [];
        return users
            .filter(
                (u) =>
                    u.name.toLowerCase().includes(q) ||
                    u.email.toLowerCase().includes(q) ||
                    formatStatus(u.status).toLowerCase().includes(q),
            )
            .slice(0, MAX_SEARCH_RESULTS)
            .sort(byStatusThenName);
    }, [users, search]);

    function toggle(id: string) {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    function addAllSearchResults() {
        setSelectedIds((prev) => new Set([...prev, ...searchResults.map((u) => u.id)]));
    }

    // ─── Fotos ───

    async function addPhotos(list: FileList | null) {
        if (!list || list.length === 0) return;
        setPhotoError("");
        const room = MAIL_PHOTO_LIMITS.count - photos.length;
        const picked = Array.from(list).slice(0, Math.max(room, 0));
        if (list.length > room) setPhotoError(`Höchstens ${MAIL_PHOTO_LIMITS.count} Fotos pro Mail.`);
        setPhotosBusy(true);
        try {
            const shrunk = await Promise.all(picked.map(shrinkPhoto));
            if (shrunk.some((file) => file.size > MAIL_PHOTO_LIMITS.uploadBytes)) {
                setPhotoError("Ein Foto ist auch verkleinert noch zu groß.");
                return;
            }
            setPhotos((prev) => [...prev, ...shrunk]);
        } catch {
            setPhotoError("Mindestens ein Foto ließ sich nicht lesen (z. B. HEIC). Bitte als JPEG oder PNG anhängen.");
        } finally {
            setPhotosBusy(false);
        }
    }

    // ─── Server ───

    function buildFormData(): FormData {
        const formData = new FormData();
        formData.set("template", template ?? "");
        formData.set("newsletter", kind ?? "");
        formData.set("target", target ?? "");
        if (target === "SELECTED") for (const id of selectedIds) formData.append("selectedUserIds", id);
        formData.set("subject", subject);
        formData.set("salutation", salutation ?? "");
        formData.set("message", body);
        formData.set("bccToSelf", copy ?? "");
        if (template === "EVENT" && eventId) {
            formData.set("eventId", eventId);
            if (attachIcs) formData.set("attachIcs", "on");
        }
        if (template === "BLOG" && postId) formData.set("postId", postId);
        if (template === "SEPA") formData.set("sepaDate", sepaDate);
        for (const photo of photos) formData.append("photos", photo);
        if (preview) formData.set("previewToken", preview.token);
        return formData;
    }

    const previewSnapshot = useRef("");
    const previewForm = useActionForm(previewRundmailAction, {
        onSuccess: (result) => {
            if (!result) return;
            setPreview({ token: result.token, recipients: result.recipients, skipped: result.skipped, snapshot: previewSnapshot.current });
            setPreviewHtml(result.html);
            setTestSentTo(null);
        },
    });

    function runPreview() {
        previewSnapshot.current = snapshot;
        void previewForm.submit(buildFormData());
    }

    const testForm = useActionForm(sendTestMailAction, {
        featureLabel: "Mail-Versand",
        onSuccess: (result) => setTestSentTo(result?.to ?? null),
    });

    const form = useActionForm(sendEmailAction, {
        featureLabel: "Mail-Versand",
        onSuccess: (report) => report && onSuccess?.(report),
    });

    function send() {
        setConfirmSend(false);
        // Bricht nur die Verbindung ab (Proxy-Timeout, WLAN weg), schickt der
        // Server womöglich weiter — also nicht zum erneuten Senden auffordern.
        form.submit(buildFormData()).catch(() =>
            form.setError(
                "Die Verbindung zum Server ist abgebrochen. Der Versand läuft womöglich noch — bitte erst im Versandprotokoll nachsehen, bevor du erneut sendest.",
            ),
        );
    }

    const serverCount = preview?.recipients ?? recipients.length;
    const people = (n: number) => `${n} ${n === 1 ? "Person" : "Personen"}`;

    // ─── Zusammenfassungen der zugeklappten Schritte ───

    const summaries: Record<StepId, ReactNode> = {
        template:
            template === "EVENT"
                ? `Termin: ${event?.title ?? "—"}${attachIcs ? " · mit Kalenderdatei (.ics)" : ""}`
                : template === "BLOG"
                  ? `Blogpost: ${post?.title ?? "—"}`
                  : template === "SEPA"
                    ? `SEPA-Ankündigung · Einzug am ${formatDate(new Date(`${sepaDate}T12:00:00`))}`
                    : "Sonstige Nachricht",
        kind: isNewsletter ? "Newsletter — nur Abonnenten, mit Abmeldelink" : "Mitteilung an alle — ohne Abmeldelink",
        target: target
            ? `${MAIL_TARGET_INFO[target].title} · ${people(recipients.length)}${
                  target === "SELECTED"
                      ? ` (${selectedUsers.slice(0, 3).map((u) => u.name || u.email).join(", ")}${selectedUsers.length > 3 ? " …" : ""})`
                      : ""
              }`
            : "",
        subject: subject,
        salutation: salutation === "PERSONAL" ? "„Guten Tag Anna Müller,“ (persönlich)" : "Keine Anrede",
        body: `${plainText(body) ? `${plainText(body).slice(0, 120)}${plainText(body).length > 120 ? " …" : ""}` : "Kein eigener Text — nur der Infoblock"}${
            photos.length > 0 ? ` · ${photos.length} ${photos.length === 1 ? "Foto" : "Fotos"} im Anhang` : ""
        }`,
        copy: copy === "yes" ? `Kopie an ${adminEmail}` : "Keine Kopie",
        preview: preview ? `Geprüft · ${people(preview.recipients)} laut Server` : "",
    };

    const stepContent: Record<StepId, ReactNode> = {
        template: (
            <>
                <ChoiceCards
                    name="template"
                    legend="Vorlage"
                    value={template}
                    onPick={(value) => {
                        changeTemplate({ template: value });
                        if (value === "OTHER") confirm("template");
                    }}
                    choices={[
                        {
                            value: "EVENT",
                            title: "Termin",
                            description: "Einladung zu einem Termin. Eckdaten und Knopf zur Terminseite stehen im Infoblock, optional mit .ics-Datei.",
                            icon: Calendar01Icon,
                        },
                        {
                            value: "BLOG",
                            title: "Blogpost",
                            description: "Neuer Beitrag der letzten sechs Monate, mit Titelbild, Vorschautext und Knopf zum Beitrag.",
                            icon: News01Icon,
                        },
                        {
                            value: "SEPA",
                            title: "SEPA-Ankündigung",
                            description: "Vorabankündigung des Lastschrifteinzugs — mit persönlichem Betrag und Einzugsdatum.",
                            icon: BankIcon,
                        },
                        {
                            value: "OTHER",
                            title: "Sonstige Nachricht",
                            description: "Freier Text ohne Infoblock.",
                            icon: Note01Icon,
                        },
                    ]}
                />

                {template === "EVENT" && (
                    <div className="grid gap-3">
                        <Separator />
                        {events.length === 0 ? (
                            <p className="text-sm text-muted">Es stehen keine kommenden Termine an.</p>
                        ) : (
                            <ChoiceCards
                                name="event"
                                legend="Termin"
                                value={eventId}
                                onPick={(value) => changeTemplate({ template: "EVENT", eventId: value })}
                                choices={events.map((e) => ({
                                    value: e.id,
                                    title: e.title,
                                    meta: e.when,
                                    description: e.published ? undefined : "Entwurf — erst veröffentlichen, sonst lehnt der Versand ab.",
                                }))}
                            />
                        )}
                        {event && !event.published && (
                            <Callout tone="warning" icon={<HugeiconsIcon icon={Alert01Icon} size={16} />} title="Termin ist noch ein Entwurf">
                                Der Knopf in der Mail führte auf eine Seite, die es öffentlich nicht gibt. Bitte erst
                                veröffentlichen.
                            </Callout>
                        )}
                        <label htmlFor="mail-attach-ics" className="flex cursor-pointer items-center gap-2">
                            <Checkbox
                                className="size-5"
                                id="mail-attach-ics"
                                checked={attachIcs}
                                onChange={(e) => setAttachIcs(e.target.checked)}
                            />
                            <span className="text-sm">Kalenderdatei (.ics) anhängen</span>
                        </label>
                        <NextButton disabled={!valid.template} onClick={() => confirm("template")} />
                    </div>
                )}

                {template === "BLOG" && (
                    <div className="grid gap-3">
                        <Separator />
                        {posts.length === 0 ? (
                            <p className="text-sm text-muted">Keine veröffentlichten Beiträge aus den letzten sechs Monaten.</p>
                        ) : (
                            <ChoiceCards
                                name="post"
                                legend="Beitrag"
                                value={postId}
                                onPick={(value) => changeTemplate({ template: "BLOG", postId: value })}
                                choices={posts.map((p) => ({ value: p.id, title: p.title, meta: `veröffentlicht ${p.when}` }))}
                            />
                        )}
                        <NextButton disabled={!valid.template} onClick={() => confirm("template")} />
                    </div>
                )}

                {template === "SEPA" && (
                    <div className="grid gap-3">
                        <Separator />
                        <Field
                            label="Geplantes Einzugsdatum"
                            htmlFor="mail-sepa-date"
                            hint={
                                sepaYear && sepaPayers[sepaYear]
                                    ? `Beitragsjahr ${sepaYear}: ${people(sepaPayers[sepaYear].length)} mit offenem Beitrag per Lastschrift. Der Betrag wird pro Person eingesetzt.`
                                    : "Steht im Infoblock jeder Mail, zusammen mit dem persönlichen Betrag."
                            }
                        >
                            <Input
                                id="mail-sepa-date"
                                type="date"
                                min={dates.tomorrow}
                                max={dates.lastSepaDay}
                                value={sepaDate}
                                onChange={(e) => {
                                    setSepaDate(e.target.value);
                                    unconfirm("template");
                                }}
                                className="max-w-56"
                            />
                        </Field>
                        <NextButton disabled={!valid.template} onClick={() => confirm("template")} />
                    </div>
                )}
            </>
        ),

        kind: (
            <ChoiceCards
                name="newsletter"
                legend="Art der Mail"
                value={kind}
                onPick={(value) => {
                    setKind(value);
                    confirm("kind");
                }}
                choices={[
                    {
                        value: "yes",
                        title: "Newsletter",
                        description:
                            "Allgemeine Neuigkeiten, z. B. ein neuer Blogpost oder eine Termineinladung. Geht nur an Abonnenten und bekommt ganz unten einen Abmeldelink.",
                        icon: News01Icon,
                        disabled: template === "SEPA",
                    },
                    {
                        value: "no",
                        title: "Mitteilung an alle",
                        description:
                            "Pflichtinformationen zur Mitgliedschaft, z. B. Ankündigung des SEPA-Einzugs, Einladung zur Mitgliederversammlung oder Beitragsfragen. Erreicht jeden, ohne Abmeldelink.",
                        icon: Megaphone01Icon,
                    },
                ]}
            />
        ),

        target: (
            <>
                <ChoiceCards
                    name="target"
                    legend="Empfänger"
                    columns={3}
                    value={target}
                    onPick={(value) => {
                        setTarget(value);
                        if (value !== "SELECTED") confirm("target");
                        else unconfirm("target");
                    }}
                    choices={MAIL_TARGETS.map((t) => ({
                        value: t,
                        title: MAIL_TARGET_INFO[t].title,
                        description: MAIL_TARGET_INFO[t].description,
                        icon: TARGET_ICONS[t],
                        meta:
                            t === "SELECTED"
                                ? `${selectedIds.size} ausgewählt`
                                : `${people(groupCounts[t])}${template === "SEPA" && t === "SEPA_YES" ? " · empfohlen" : ""}`,
                    }))}
                />
                {(optedOut > 0 || notPaying > 0) && (
                    <p className="text-sm text-warning">
                        {notPaying > 0 && `${people(notPaying)} ohne offene Lastschrift im Beitragsjahr ${sepaYear} ${notPaying === 1 ? "wird" : "werden"} ausgelassen. `}
                        {optedOut > 0 && `${people(optedOut)} ${optedOut === 1 ? "hat" : "haben"} den Newsletter abbestellt und ${optedOut === 1 ? "wird" : "werden"} ausgelassen.`}
                    </p>
                )}

                {target === "SELECTED" && (
                    <div className="grid gap-4 rounded-[3px] border border-line bg-raised/40 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-semibold">Empfänger auswählen</p>
                            <Badge>{selectedIds.size} ausgewählt</Badge>
                        </div>

                        {selectedUsers.length === 0 ? (
                            <p className="text-sm text-muted">
                                Noch niemand ausgewählt. Suche unten und setze Häkchen bei den gewünschten Personen.
                            </p>
                        ) : (
                            <div className="grid gap-2">
                                {selectedUsers.map((u) => (
                                    <div key={u.id} className="flex items-center justify-between gap-3 rounded-[3px] bg-surface p-2">
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">{u.name || "—"}</p>
                                            <p className="truncate text-xs text-muted">{u.email}</p>
                                        </div>
                                        {isNewsletter && !u.newsletter && <Badge tone="warning">Kein Newsletter</Badge>}
                                        <Badge tone={getStatusTone(u.status)}>{formatStatus(u.status)}</Badge>
                                        <Button size="sm" variant="ghost" color="danger" type="button" onClick={() => toggle(u.id)}>
                                            Entfernen
                                        </Button>
                                    </div>
                                ))}
                                <div>
                                    <Button size="sm" variant="outline" color="neutral" type="button" onClick={() => setSelectedIds(new Set())}>
                                        Alle entfernen
                                    </Button>
                                </div>
                            </div>
                        )}

                        <Separator />

                        <div className="grid gap-2">
                            <label htmlFor="mail-search" className="text-xs font-medium text-faint">
                                Suche (min. {MIN_SEARCH_LEN} Zeichen)
                            </label>
                            <Input
                                id="mail-search"
                                placeholder="Name, E-Mail oder Mitgliedsstatus…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                autoComplete="off"
                            />
                            {search.trim().length >= MIN_SEARCH_LEN && (
                                <>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <p className="text-xs text-faint">
                                            {searchResults.length === MAX_SEARCH_RESULTS
                                                ? `Erste ${MAX_SEARCH_RESULTS} Treffer (Suche ggf. verfeinern)`
                                                : `${searchResults.length} Treffer`}
                                        </p>
                                        {searchResults.length > 0 && (
                                            <Button size="sm" variant="soft" type="button" onClick={addAllSearchResults}>
                                                Alle Treffer übernehmen
                                            </Button>
                                        )}
                                    </div>
                                    <div className="grid max-h-70 gap-1 overflow-x-hidden overflow-y-auto">
                                        {searchResults.length === 0 ? (
                                            <p className="text-sm text-muted">Keine Treffer. Passe die Suche an.</p>
                                        ) : (
                                            searchResults.map((u) => {
                                                const isSelected = selectedIds.has(u.id);
                                                return (
                                                    <label
                                                        key={u.id}
                                                        className={cn(
                                                            "flex cursor-pointer items-center gap-3 rounded-[3px] p-2 transition-colors",
                                                            isSelected ? "bg-physics/12" : "hover:bg-surface",
                                                        )}
                                                    >
                                                        <Checkbox
                                                            className="size-5"
                                                            checked={isSelected}
                                                            onChange={() => toggle(u.id)}
                                                            aria-label={`${u.name || u.email} auswählen`}
                                                        />
                                                        <span className="min-w-0 flex-1">
                                                            <span className="block truncate text-sm font-medium">{u.name || "—"}</span>
                                                            <span className="block truncate text-xs text-muted">{u.email}</span>
                                                        </span>
                                                        {isNewsletter && !u.newsletter && <Badge tone="warning">Kein Newsletter</Badge>}
                                                        <Badge tone={getStatusTone(u.status)}>{formatStatus(u.status)}</Badge>
                                                    </label>
                                                );
                                            })
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        <NextButton disabled={!valid.target} onClick={() => confirm("target")} />
                    </div>
                )}
            </>
        ),

        subject: (
            <>
                <Field
                    label="Betreff"
                    htmlFor="mail-subject"
                    required
                    hint={template === "OTHER" ? undefined : "Aus der Vorlage vorbelegt — jederzeit änderbar."}
                >
                    <Input
                        id="mail-subject"
                        value={subject}
                        maxLength={200}
                        onChange={(e) => {
                            setSubject(e.target.value);
                            unconfirm("subject");
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && valid.subject) {
                                e.preventDefault();
                                confirm("subject");
                            }
                        }}
                        placeholder="Wichtige Info zum Sommerfest…"
                    />
                </Field>
                <NextButton disabled={!valid.subject} onClick={() => confirm("subject")} />
            </>
        ),

        salutation: (
            <ChoiceCards
                name="salutation"
                legend="Anrede"
                value={salutation}
                onPick={(value) => {
                    setSalutation(value);
                    confirm("salutation");
                }}
                choices={[
                    {
                        value: "PERSONAL",
                        title: "„Guten Tag Anna Müller,“",
                        description: "Persönlich mit Vor- und Nachname, über dem Text. Ohne hinterlegten Namen nur „Guten Tag,“.",
                    },
                    { value: "NONE", title: "Keine Anrede", description: "Der Text beginnt direkt." },
                ]}
            />
        ),

        body: (
            <>
                {bodyOptional && (
                    <p className="text-sm text-muted">
                        Optional: {template === "EVENT" ? "Titel, Kurztext und Eckdaten des Termins" : "Titel, Titelbild und Vorschautext des Beitrags"}{" "}
                        stehen schon im Infoblock unter dem Text.
                    </p>
                )}
                <EmailBodyField editor={editor} />

                <div className="grid gap-2">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                        <HugeiconsIcon icon={Image01Icon} size={16} aria-hidden="true" /> Fotos anhängen (optional)
                    </p>
                    <p className="text-sm text-faint">
                        Bis zu {MAIL_PHOTO_LIMITS.count} Fotos. Sie werden verkleinert (max. 1600 px) und ohne
                        Standortdaten verschickt — jede Rundmail geht einzeln raus, große Anhänge verlangsamen den
                        Versand spürbar.
                    </p>
                    {photos.length > 0 && (
                        <ul className="grid gap-1.5">
                            {photos.map((photo, index) => (
                                <li key={`${photo.name}-${index}`} className="flex items-center justify-between gap-3 rounded-[3px] bg-raised/50 px-3 py-2">
                                    <span className="min-w-0 truncate text-sm">{photo.name}</span>
                                    <span className="flex items-center gap-2">
                                        <span className="font-mono text-xs text-faint">{formatBytes(photo.size)}</span>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            color="danger"
                                            type="button"
                                            aria-label={`${photo.name} entfernen`}
                                            onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== index))}
                                        >
                                            <HugeiconsIcon icon={Delete02Icon} size={16} aria-hidden="true" />
                                        </Button>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                    {photos.length < MAIL_PHOTO_LIMITS.count && (
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            disabled={photosBusy}
                            onChange={(e) => {
                                void addPhotos(e.target.files);
                                e.target.value = "";
                            }}
                            className="text-sm file:mr-3 file:rounded-[3px] file:border file:border-line-strong file:bg-surface file:px-3 file:py-1.5 file:text-sm file:font-medium"
                        />
                    )}
                    {photos.length > 0 && target && (
                        <Callout tone="warning" icon={<HugeiconsIcon icon={Alert01Icon} size={16} />} title="Fotos machen den Versand deutlich langsamer">
                            Jede der {people(recipients.length)} bekommt eine eigene Mail mit Anhang — die Fotos gehen
                            also {recipients.length}-mal raus. Für Berichte mit Bildern ist ein Blogbeitrag oft besser.
                        </Callout>
                    )}
                    {photosBusy && <p className="text-sm text-faint">Fotos werden verkleinert …</p>}
                    {photoError && <p className="text-sm text-negative">{photoError}</p>}
                </div>
                <NextButton disabled={!valid.body} onClick={() => confirm("body")} />
            </>
        ),

        copy: (
            <ChoiceCards
                name="copy"
                legend="Kopie an mich"
                value={copy}
                onPick={(value) => {
                    setCopy(value);
                    confirm("copy");
                }}
                choices={[
                    {
                        value: "yes",
                        title: "Kopie an mich",
                        description: adminEmail ? `Geht an ${adminEmail}, Platzhalter bleiben darin stehen.` : "Keine E-Mail-Adresse in der Sitzung.",
                        icon: Mail01Icon,
                        disabled: !adminEmail,
                    },
                    { value: "no", title: "Keine Kopie", description: "Das Versandprotokoll unten hält den Versand trotzdem fest." },
                ]}
            />
        ),

        preview: (
            <>
                <p className="text-sm text-muted">
                    Pflicht vor dem Versand: Die Vorschau zeigt die Mail genau so, wie sie verschickt wird. Ändert sich
                    danach etwas, muss sie neu erstellt werden.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                    <Button type="button" variant={previewFresh ? "outline" : "solid"} loading={previewForm.pending} onClick={runPreview}>
                        <HugeiconsIcon icon={ViewIcon} size={16} aria-hidden="true" />{" "}
                        {previewFresh ? "Vorschau erneut ansehen" : preview ? "Vorschau neu erstellen" : "Vorschau erstellen"}
                    </Button>
                    {preview && !previewFresh && <span className="text-sm text-warning">Seit der letzten Vorschau geändert.</span>}
                </div>
                {previewForm.feedback}
                {previewFresh && (
                    <div className="grid gap-2 rounded-[3px] border border-line bg-raised/40 p-4">
                        <p className="text-sm">
                            Der Server zählt <span className="font-semibold">{people(preview.recipients)}</span> als Empfänger
                            {preview.skipped > 0 && ` (${people(preview.skipped)} ohne offene Lastschrift ausgelassen)`}.
                            {preview.recipients !== recipients.length && " Das weicht von der Zählung oben ab — bitte die Empfänger prüfen."}
                        </p>
                        <label htmlFor="mail-reviewed" className="flex cursor-pointer items-start gap-2">
                            <Checkbox
                                className="mt-0.5 size-5"
                                id="mail-reviewed"
                                checked={reviewedToken === preview.token}
                                onChange={(e) => {
                                    setReviewedToken(e.target.checked ? preview.token : null);
                                    if (e.target.checked) setEditing(null);
                                }}
                            />
                            <span className="text-sm">
                                Ich habe die Vorschau geprüft: Betreff, Text, Infoblock, Anhänge und Empfänger stimmen.
                            </span>
                        </label>
                    </div>
                )}
            </>
        ),
    };

    return (
        <div className="grid gap-3">
            <SendingOverlay open={form.pending} count={serverCount} />
            <EmailPreviewDialog html={previewHtml} onClose={() => setPreviewHtml(null)} />

            {STEPS.map((id, index) => (
                <Step
                    key={id}
                    id={id}
                    number={index + 1}
                    state={stepState(id)}
                    summary={summaries[id]}
                    onEdit={() => setEditing(id)}
                >
                    {stepContent[id]}
                </Step>
            ))}

            <Card className={cn("grid gap-4 p-5 sm:p-6", !allDone && "opacity-60")}>
                <div className="flex items-start gap-3">
                    <span
                        aria-hidden="true"
                        className={cn(
                            "grid size-7 shrink-0 place-items-center rounded-full font-mono text-xs font-semibold",
                            allDone ? "bg-physics text-on-physics" : "bg-raised text-faint",
                        )}
                    >
                        {STEPS.length + 1}
                    </span>
                    <div className="grid gap-0.5 pt-0.5">
                        <h2 className="text-sm font-semibold">Zusammenfassung & Versand</h2>
                        <p className="text-sm text-muted">
                            {allDone
                                ? "Alle Einstellungen stehen oben in den abgehakten Schritten."
                                : "Erst wenn alle Schritte abgehakt sind, lässt sich die Mail senden."}
                        </p>
                    </div>
                </div>

                {allDone && (
                    <>
                        <p className="text-2xl font-bold tracking-tight">
                            {isNewsletter ? "Newsletter" : "Mitteilung"} an {people(serverCount)}
                        </p>

                        {(serverCount >= CONFIRM_FROM || photos.length > 0) && (
                            <Callout tone="info" icon={<HugeiconsIcon icon={Alert01Icon} size={16} />} title="Der Versand kann einige Minuten dauern">
                                Jede Person bekommt eine eigene Mail, eine nach der anderen
                                {photos.length > 0 && " — die angehängten Fotos verlangsamen das zusätzlich deutlich"}.
                                Lass die Seite währenddessen offen und lade sie nicht neu.
                            </Callout>
                        )}

                        <div>
                            <Button size="sm" variant="ghost" color="neutral" type="button" onClick={() => setShowRecipients(true)}>
                                <HugeiconsIcon icon={ListIcon} size={16} aria-hidden="true" /> Empfängerliste anzeigen ({recipients.length})
                            </Button>
                        </div>

                        <div className="grid gap-2 rounded-[3px] border border-dashed border-line-strong p-4">
                            <p className="text-sm font-semibold">Optional: Testmail an mich</p>
                            <p className="text-sm text-muted">
                                Dieselbe Mail an {adminEmail ?? "dich"}, mit deinen eigenen Daten eingesetzt — so siehst du
                                sie in deinem Postfach, bevor alle sie bekommen. Wird nicht protokolliert.
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    color="neutral"
                                    type="button"
                                    loading={testForm.pending}
                                    disabled={!adminEmail}
                                    onClick={() => void testForm.submit(buildFormData())}
                                >
                                    <HugeiconsIcon icon={Mail01Icon} size={16} aria-hidden="true" /> Testmail senden
                                </Button>
                                {testSentTo && <span className="text-sm text-positive">Testmail an {testSentTo} verschickt.</span>}
                            </div>
                            {testForm.feedback}
                        </div>

                        {form.feedback}

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Button
                                size="lg"
                                type="button"
                                loading={form.pending}
                                onClick={() => (serverCount >= CONFIRM_FROM ? setConfirmSend(true) : send())}
                            >
                                <HugeiconsIcon icon={SentIcon} size={16} aria-hidden="true" />{" "}
                                {form.pending ? "Wird gesendet…" : `Jetzt an ${people(serverCount)} senden`}
                            </Button>
                            <ButtonLink href="/dashboard" size="lg" variant="soft" color="neutral">
                                <HugeiconsIcon icon={Cancel01Icon} size={16} aria-hidden="true" /> Abbrechen
                            </ButtonLink>
                        </div>
                    </>
                )}
            </Card>

            <Dialog
                open={showRecipients}
                onClose={() => setShowRecipients(false)}
                title={`Empfängerliste (${recipients.length})`}
                description="Sortiert nach Mitgliedsstatus. Die E-Mail wird an folgende Empfänger gesendet:"
            >
                <div className="max-h-80 divide-y divide-line overflow-y-auto">
                    {recipients.map((u) => (
                        <div key={u.id} className="flex items-center justify-between gap-3 py-2">
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">{u.name || "—"}</p>
                                <p className="truncate text-xs text-muted">{u.email}</p>
                            </div>
                            <Badge tone={getStatusTone(u.status)}>{formatStatus(u.status)}</Badge>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button size="sm" variant="soft" color="neutral" onClick={() => setShowRecipients(false)}>
                        Schließen
                    </Button>
                </DialogFooter>
            </Dialog>

            <Dialog
                open={confirmSend}
                onClose={() => setConfirmSend(false)}
                title={`An ${people(serverCount)} senden?`}
                description={`„${subject}“ geht als ${isNewsletter ? "Newsletter" : "Mitteilung an alle"} an ${MAIL_TARGET_INFO[target ?? "SELECTED"].title}. Das lässt sich nicht zurückholen. Der Versand kann einige Minuten dauern${photos.length > 0 ? ", mit Fotos im Anhang deutlich länger" : ""}.`}
            >
                <DialogFooter>
                    <Button size="sm" variant="soft" color="neutral" onClick={() => setConfirmSend(false)}>
                        Zurück
                    </Button>
                    <Button size="sm" onClick={send}>
                        <HugeiconsIcon icon={SentIcon} size={16} aria-hidden="true" /> Ja, senden
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

/**
 * Sperrt die ganze Seite, solange der Versand läuft: `showModal()` macht alles
 * dahinter inert, ein zweiter Klick auf „Senden“ ist damit ausgeschlossen.
 */
function SendingOverlay({ open, count }: { open: boolean; count: number }) {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (open && !el.open) el.showModal();
        else if (!open && el.open) el.close();
        if (!open) return;
        // Neu laden leert das Formular und lädt zum zweiten Absenden ein.
        const warn = (event: BeforeUnloadEvent) => event.preventDefault();
        window.addEventListener("beforeunload", warn);
        return () => window.removeEventListener("beforeunload", warn);
    }, [open]);

    return (
        <dialog
            ref={ref}
            aria-label="E-Mails werden versendet"
            // Esc schließt nicht; schließt der Browser trotzdem, geht sie wieder auf.
            onCancel={(event) => event.preventDefault()}
            onClose={() => open && ref.current?.showModal()}
            className="dialog-panel m-auto w-[calc(100vw-2rem)] max-w-sm rounded-[4px] border border-line bg-surface p-6 text-foreground shadow-2xl backdrop:bg-black/45"
        >
            <div role="status" className="grid justify-items-center gap-3 text-center">
                <Spinner className="size-10 text-physics" />
                <p className="text-lg font-bold tracking-tight">E-Mails werden versendet …</p>
                <p className="text-sm text-muted">
                    An {count} {count === 1 ? "Person" : "Personen"}, eine nach der anderen. Das kann einige Minuten
                    dauern — bitte die Seite offen lassen.
                </p>
            </div>
        </dialog>
    );
}
