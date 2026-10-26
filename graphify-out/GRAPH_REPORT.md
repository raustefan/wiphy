# Graph Report - wiphy  (2026-10-26)

## Corpus Check
- 416 files · ~188,449 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2294 nodes · 7312 edges · 129 communities (114 shown, 15 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 54 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f974c936`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DirectoryTable.tsx
- format.ts
- index.ts
- layout.ts
- boardService.ts
- feeService.ts
- mitglied-werden/actions.ts
- serverStatus.ts
- anleitungen/README.md
- blogService.ts
- dashboard/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- formatNumber
- server-und-logs.md
- package.json
- dependencies
- membershipService.ts
- LegalPage.tsx
- schemas.ts
- seed.ts
- next
- lib/siteUrl.ts
- DirectoryTable
- securityLabels.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- @hugeicons/core-free-icons
- Alle Schalter
- countries.ts
- contact.ts
- convert_alumni.py
- newsletterToken.ts
- KosmosTimeline.tsx
- prisma.ts
- ref_node_assert
- compilerOptions
- devDependencies
- authz.ts
- satzung/page.tsx
- blog/actions.ts
- membership.ts
- EditUserForm.tsx
- useActionForm
- ApplicationWizard.tsx
- rundmail-senden.md
- mailService.ts
- iban.ts
- app/blog/[id]/page.tsx
- EmailBodyField.tsx
- BulkImport.tsx
- mitgliedsantraege/actions.ts
- TypeSparklines.tsx
- inputRules.ts
- EditUserForm
- newsletter.md
- rateLimitService.ts
- sepa.ts
- auth.ts
- app/layout.tsx
- userUpdateData.ts
- userService.ts
- app/blog/page.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- featureFlagService.ts
- passwordStrength.ts
- MailForm.tsx
- CLAUDE.md
- ContactRequestList
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- mitglied-werden/page.tsx
- executeAction
- feeDefaults.ts
- DeleteMemberSection
- app/kontakt/page.tsx
- altcha.d.ts
- postcss.config.mjs
- sendEmail
- securityEventService.ts
- mail/page.tsx
- { GET, POST }
- AppError
- app/page.tsx
- Betrieb: Checkliste für den Produktionsserver
- Bilder im Blog
- ApplicationList
- getOptionalUser
- notfall-abschalten.md
- Anleitungen für Admins
- ActivityHeatmap.tsx
- RateLimitTable
- Mitgliedsantrag bearbeiten
- Zahlungen und Ausnahmen pflegen
- RegistrationFunnel.tsx
- Benutzerverwaltung: Liste, Suche, Filter
- mailHistory.ts
- Dein eigenes Konto
- Konto bearbeiten
- Konto löschen
- Austritte im Blick behalten
- Neues Beitragsjahr anlegen
- SEPA-Lastschrift erzeugen
- eslint.config.mjs
- Der Admin-Bereich im Überblick
- Konto von Hand anlegen
- forgot-password/layout.tsx
- login/layout.tsx
- abmelden/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- dashboard/kontakt/actions.ts
- Button.tsx
- Deployment (Hetzner Cloud / Ubuntu)
- backup/route.ts
- bulkCreateUsersAction
- getMemberForEdit
- sendReport.ts
- BoardPhotoUploader
- ApplicationWizard
- EmailComposerDialog

## God Nodes (most connected - your core abstractions)
1. `next` - 132 edges
2. `cn()` - 93 edges
3. `AppError` - 91 edges
4. `@hugeicons/core-free-icons` - 89 edges
5. `@hugeicons/react` - 89 edges
6. `react` - 76 edges
7. `executeAction()` - 76 edges
8. `requireAdmin()` - 55 edges
9. `isFeatureEnabled()` - 51 edges
10. `Button()` - 50 edges

## Surprising Connections (you probably didn't know these)
- `Befunde vom 2026-10-20` --references--> `siteUrl()`  [INFERRED]
  BETRIEB.md → src/lib/server/siteUrl.ts
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `GET()` --calls--> `siteUrl()`  [EXTRACTED]
  src/app/api/newsletter/abmelden/route.ts → src/lib/server/siteUrl.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts

## Import Cycles
- None detected.

## Communities (129 total, 15 thin omitted)

### Community 0 - "DirectoryTable.tsx"
Cohesion: 0.12
Nodes (16): AddFeeYearCard(), DialogButton(), AmountDialog(), chipTones, DirectoryAccount, explainFee(), GROUPS, SortKey (+8 more)

### Community 1 - "format.ts"
Cohesion: 0.08
Nodes (27): EmailChangeForm(), PasswordChangeButton(), dynamic, metadata, triggerDeploy(), BackupHistory(), BackupSection(), DeploySection() (+19 more)

### Community 2 - "index.ts"
Cohesion: 0.09
Nodes (37): CtaCard(), NewsletterRow(), NewsletterSection(), useOwnNewsletter(), InfoTooltip(), dynamic, metadata, RateLimitTableProps (+29 more)

### Community 3 - "layout.ts"
Cohesion: 0.19
Nodes (21): blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml() (+13 more)

### Community 4 - "boardService.ts"
Cohesion: 0.11
Nodes (30): POST(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, moveMemberOrder(), ImageBytes, processBoardPhoto(), ProcessedBoardPhoto (+22 more)

### Community 5 - "feeService.ts"
Cohesion: 0.19
Nodes (18): clearFeeAmountOverride(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), setStudentYear(), updateFeeComment(), upsertFeeAmount(), upsertFeePaid() (+10 more)

### Community 6 - "mitglied-werden/actions.ts"
Cohesion: 0.13
Nodes (28): ref_node_net, resendVerificationEmail(), submitMembershipApplication(), withdrawMembershipApplication(), registerUser(), resetPassword(), resetSchema, membershipApplicationNoticeMessage() (+20 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.10
Nodes (34): ref_node_fs, ref_node_os, ref_node_path, GET(), GET(), ServerPage(), BackupRun, BackupStatus (+26 more)

### Community 8 - "anleitungen/README.md"
Cohesion: 0.16
Nodes (8): Login sperren, Austritt, Ausschluss oder Tod eintragen, Was dabei passiert, Eintrag, Standard oder Ausnahme, So rechnet die Website Beiträge, Beitragssätze festlegen, So gelten die Sätze, Zahlungserinnerung schicken

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (55): sharp, BACKGROUND, icon(), main(), POST(), BlogImageManager(), handleDrop(), uploadFiles() (+47 more)

### Community 10 - "dashboard/page.tsx"
Cohesion: 0.06
Nodes (52): @react-pdf/renderer, GET(), GET(), byStatusThenName(), MailForm(), MailSuccessDialog(), MembershipCertificateCard(), statusMeta() (+44 more)

### Community 11 - "events.ts"
Cohesion: 0.09
Nodes (50): EventForm(), DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard() (+42 more)

### Community 12 - "ics.ts"
Cohesion: 0.16
Nodes (20): RFC-5545, GET(), GET(), icsEnd(), icsAttachment(), addDays(), berlinDateStamp(), buildCalendarIcs() (+12 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.11
Nodes (31): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), deriv() (+23 more)

### Community 14 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 15 - "server-und-logs.md"
Cohesion: 0.13
Nodes (12): Automatische Backups prüfen, Backup herunterladen, Datenschutz, Komplettes Backup anfordern, Deploy per Knopfdruck, So geht's, Was passiert, Wenn es schiefgeht (+4 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "membershipService.ts"
Cohesion: 0.22
Nodes (14): dynamic, MembershipApplicationsPage(), metadata, planApplicationFees(), studentYearsFromStudy(), deleteApplication(), findApplications(), findOpenApplication() (+6 more)

### Community 19 - "LegalPage.tsx"
Cohesion: 0.15
Nodes (15): metadata, impressum(), ImpressumPage(), metadata, SATZUNG, anchorOf(), Block(), LegalPage() (+7 more)

### Community 20 - "schemas.ts"
Cohesion: 0.05
Nodes (36): absent(), AdminCreateUserInput, blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema, boardDeleteSchema (+28 more)

### Community 21 - "seed.ts"
Cohesion: 0.25
Nodes (5): adapter, prisma, dotenv, prisma, @prisma/adapter-pg

### Community 22 - "next"
Cohesion: 0.10
Nodes (28): nextConfig, next, DeletePostButton(), metadata, DashboardPageHeader(), DashboardPageHeaderProps, dynamic, metadata (+20 more)

### Community 23 - "lib/siteUrl.ts"
Cohesion: 0.13
Nodes (15): escapeXml(), GET(), DashboardLayout(), metadata, alt, contentType, size, BlogPostingJsonLd() (+7 more)

### Community 24 - "DirectoryTable"
Cohesion: 0.09
Nodes (27): CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), MemberDirectory(), setFilter() (+19 more)

### Community 25 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (12): columnPath(), labelStride(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline(), PAD (+4 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "@hugeicons/core-free-icons"
Cohesion: 0.12
Nodes (25): @hugeicons/core-free-icons, @hugeicons/react, react, ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat (+17 more)

### Community 29 - "Alle Schalter"
Cohesion: 0.12
Nodes (15): Als Mitglied ansehen, Debug-Modus und Mitgliederansicht, Die Debug-Leiste, Einschalten, Alle Schalter, Bedienung, E-Mail, Feature Flags (+7 more)

### Community 30 - "countries.ts"
Cohesion: 0.22
Nodes (12): display(), EntryDetails(), SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS (+4 more)

### Community 31 - "contact.ts"
Cohesion: 0.25
Nodes (6): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ContactInput, SPAM_KEYWORDS, legitimate

### Community 32 - "convert_alumni.py"
Cohesion: 0.26
Nodes (12): datetime, json, re, admin_note(), convert(), day(), main(), phone() (+4 more)

### Community 33 - "newsletterToken.ts"
Cohesion: 0.22
Nodes (13): ref_crypto, GET(), POST(), RFC-8058, setNewsletterByTokenAction(), createNewsletterToken(), key(), NEWSLETTER_UNSUBSCRIBE_PATH (+5 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (23): CLOUDS, Contact, KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField() (+15 more)

### Community 35 - "prisma.ts"
Cohesion: 0.16
Nodes (18): server-only, KontoPage(), revealKosmosContactAction(), setKosmosVisibilityAction(), deleteUserAction(), createUserAction(), importEntriesSchema, NewUserPage() (+10 more)

### Community 36 - "ref_node_assert"
Cohesion: 0.19
Nodes (8): ref_node_assert, ref_node_test, ADMIN_SESSION_MAX_MS, adminSessionExpired(), SUMMER, WINTER, base, directDebit

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "authz.ts"
Cohesion: 0.13
Nodes (24): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, setOwnNewsletterAction(), toggleDebugMode(), toggleMemberView(), commit, DebugBar() (+16 more)

### Community 40 - "satzung/page.tsx"
Cohesion: 0.15
Nodes (25): FeeDefaultsCard(), run(), save(), UserManagementPage(), BankDetailsForm(), submit(), ZahlungenPage(), dynamic (+17 more)

### Community 41 - "blog/actions.ts"
Cohesion: 0.35
Nodes (13): beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), applyImageOrder(), movePostImage() (+5 more)

### Community 42 - "membership.ts"
Cohesion: 0.19
Nodes (18): setStudentEndYearAction(), StudentStatusEditor(), ageAt(), changedStudentYears(), currentStudentEndYear(), formatYearRanges(), isOldEnough(), MEMBER_STUDENT_LOOKAHEAD (+10 more)

### Community 43 - "EditUserForm.tsx"
Cohesion: 0.09
Nodes (24): metadata, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput() (+16 more)

### Community 44 - "useActionForm"
Cohesion: 0.08
Nodes (34): next-auth, StudentStatusPrompt(), ForgotPasswordPage(), ContactForm(), createLoginChallenge(), FaqItem, LoginFaq(), SECTIONS (+26 more)

### Community 45 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (31): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, hasControlChars(), isValidPostalCode(), CONSENT_VERSION (+23 more)

### Community 46 - "rundmail-senden.md"
Cohesion: 0.13
Nodes (12): Die Signatur: wichtiger, als der Name sagt, Mitglied anlegen oder bearbeiten, Reihenfolge, Vorstand und Signatur pflegen, Beispiel, Platzhalter in Mails, Warum „Guten Tag“ statt „Liebe/Lieber“?, Mail an einzelne Personen (+4 more)

### Community 47 - "mailService.ts"
Cohesion: 0.14
Nodes (16): sanitize-html, ENTITIES, htmlToText(), AnnouncedEvent, composeMessage(), greeting(), MailTarget, Recipient (+8 more)

### Community 48 - "iban.ts"
Cohesion: 0.25
Nodes (17): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+9 more)

### Community 49 - "app/blog/[id]/page.tsx"
Cohesion: 0.14
Nodes (22): react-markdown, remark-gfm, generateMetadata(), Props, PublicBlogPost(), LeadPost(), PostRow(), AdminBlogPage() (+14 more)

### Community 50 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 51 - "BulkImport.tsx"
Cohesion: 0.16
Nodes (13): ImportIssue, ImportRowResult, FALSE_BY_DEFAULT, ImportReport, EXAMPLE, FEE_FIELDS, FEES_EXAMPLE, IMPORT_EXCLUDED_FIELDS (+5 more)

### Community 52 - "mitgliedsantraege/actions.ts"
Cohesion: 0.21
Nodes (15): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), membershipApprovedMessage(), membershipRejectedMessage(), findApplicationById(), approveApplication(), src_lib_server_services_membershipservice_getapplication (+7 more)

### Community 53 - "TypeSparklines.tsx"
Cohesion: 0.33
Nodes (8): longDayLabel(), sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 54 - "inputRules.ts"
Cohesion: 0.22
Nodes (11): isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, applicationPersonSchema, birthDateField, addPersonIssues() (+3 more)

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "newsletter.md"
Cohesion: 0.14
Nodes (11): Danach, Felder, Termin anlegen, Wo veröffentlichte Termine erscheinen, Newsletter oder Mitteilung?, Wie der Newsletter-Status entsteht, Newsletter oder Mitteilung?, So geht's (+3 more)

### Community 57 - "rateLimitService.ts"
Cohesion: 0.31
Nodes (7): removeRateLimitEntry(), confirmDelete(), bucketFromKey(), deleteRateLimitEntry(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem

### Community 58 - "sepa.ts"
Cohesion: 0.22
Nodes (18): field(), POST(), TIME_ZONE, isValidBic(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId() (+10 more)

### Community 59 - "auth.ts"
Cohesion: 0.18
Nodes (10): bcryptjs, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError (+2 more)

### Community 60 - "app/layout.tsx"
Cohesion: 0.11
Nodes (15): src_app_globals, body, metadata, mono, serif, ContrastToggle(), columns, Footer() (+7 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "userService.ts"
Cohesion: 0.13
Nodes (31): EMAIL_CHANGE_ERRORS, requestPasswordChange(), requestPasswordReset(), notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), emailChangeMessage() (+23 more)

### Community 63 - "app/blog/page.tsx"
Cohesion: 0.09
Nodes (25): BlogIndexPage(), generateMetadata(), MetaLine(), Props, facts, metadata, metadata, dynamic (+17 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.12
Nodes (17): Admin-Dashboard, Authentifizierung & Konten, Backup & Wiederherstellung, Datenbankmodell, Feature Flags, Funktionen im Detail, Inhalt, Mitgliederbereich (`/dashboard`) (+9 more)

### Community 66 - "featureFlagService.ts"
Cohesion: 0.19
Nodes (15): @prisma/client, setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), metadata, FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS (+7 more)

### Community 67 - "passwordStrength.ts"
Cohesion: 0.21
Nodes (10): NewUserForm(), handleSubmit(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 68 - "MailForm.tsx"
Cohesion: 0.13
Nodes (13): MailAnnouncement, MAIL_KINDS, MailFormProps, MailKind, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS (+5 more)

### Community 71 - "ContactRequestList"
Cohesion: 1.00
Nodes (3): ContactRequestList(), confirmDelete(), run()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.10
Nodes (35): EditBlogPage(), EditEventPage(), AdminEventsPage(), startOfBerlinDay(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData (+27 more)

### Community 77 - "mitglied-werden/page.tsx"
Cohesion: 0.14
Nodes (19): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), WithdrawApplicationButton() (+11 more)

### Community 78 - "executeAction"
Cohesion: 0.11
Nodes (44): zod, createDraft(), deletePost(), savePost(), requestEmailChangeAction(), parseMailForm(), sendEmailAction(), createEventDraft() (+36 more)

### Community 79 - "feeDefaults.ts"
Cohesion: 0.27
Nodes (9): FeeDefaultEntry, FeeRates, FALLBACK_FEE_DEFAULT, deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeRatesForYear(), removeFeeDefault() (+1 more)

### Community 81 - "app/kontakt/page.tsx"
Cohesion: 0.20
Nodes (10): dynamic, KontaktPage(), metadata, dynamic, LoginPage(), metadata, NOTICES, Props (+2 more)

### Community 82 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "sendEmail"
Cohesion: 0.18
Nodes (18): submitContactRequest(), EmailMessage, contactRequestMessage(), consumeAltchaSolution(), readExpiry(), readSignature(), verifyAltchaPayload(), scoreSpam() (+10 more)

### Community 86 - "securityEventService.ts"
Cohesion: 0.18
Nodes (17): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, summarizeByBucket(), addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel() (+9 more)

### Community 87 - "mail/page.tsx"
Cohesion: 0.19
Nodes (12): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, sitemap() (+4 more)

### Community 89 - "AppError"
Cohesion: 0.13
Nodes (33): requestBackupLink(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), EditUserPage(), signOut (+25 more)

### Community 91 - "app/page.tsx"
Cohesion: 0.14
Nodes (14): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline(), HomePage(), levels (+6 more)

### Community 92 - "Betrieb: Checkliste für den Produktionsserver"
Cohesion: 0.22
Nodes (7): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person

### Community 93 - "Bilder im Blog"
Cohesion: 0.20
Nodes (8): Alternativtext, Bilder im Blog, Hochladen, Ordnen, Blogbeitrag schreiben, Felder, Markdown in 30 Sekunden, Wo der Beitrag erscheint

### Community 94 - "ApplicationList"
Cohesion: 0.33
Nodes (9): removeMembershipApplication(), ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange() (+1 more)

### Community 95 - "getOptionalUser"
Cohesion: 0.16
Nodes (15): GET(), GET(), GET(), confirmPrivacyPolicy(), ConfirmPrivacyPolicyPage(), metadata, Props, DATENSCHUTZ (+7 more)

### Community 96 - "notfall-abschalten.md"
Cohesion: 0.12
Nodes (12): Badges, Kontaktanfragen bearbeiten, Pro Anfrage, Danach, Notfall: eine Funktion abschalten, Die häufigsten Namen, Rate-Limit-Sperre aufheben, Wenn es eilt (+4 more)

### Community 97 - "Anleitungen für Admins"
Cohesion: 0.25
Nodes (8): 1 · Grundlagen, 2 · Konten, 3 · Aufnahme und Austritt, 4 · Beiträge, 5 · Inhalte der Website, 6 · Kommunikation, 7 · Technik (nur im Debug-Modus), Anleitungen für Admins

### Community 98 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 99 - "RateLimitTable"
Cohesion: 0.28
Nodes (7): RateLimitTable(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 100 - "Mitgliedsantrag bearbeiten"
Cohesion: 0.33
Nodes (5): Ablehnen, Antrag prüfen, Aufnehmen, Löschen, Mitgliedsantrag bearbeiten

### Community 101 - "Zahlungen und Ausnahmen pflegen"
Cohesion: 0.33
Nodes (6): Abweichenden Betrag eintragen (Ausnahme), Als bezahlt markieren, Erst freischalten, Sonderstatus umschalten, Verlauf ansehen, Zahlungen und Ausnahmen pflegen

### Community 102 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 103 - "Benutzerverwaltung: Liste, Suche, Filter"
Cohesion: 0.33
Nodes (6): Beitragsjahr wählen, Benutzerverwaltung: Liste, Suche, Filter, Die Tabelle, Mehrere Konten auswählen, Oben: Kennzahlen, Suchen und filtern

### Community 104 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 105 - "Dein eigenes Konto"
Cohesion: 0.50
Nodes (4): Dein eigenes Konto, Newsletter, Passwort oder E-Mail-Adresse ändern, Profil und Mitgliedsdaten

### Community 106 - "Konto bearbeiten"
Cohesion: 0.50
Nodes (4): Adminbereich, Konto bearbeiten, Newsletter, Persönliche Daten, Adresse, Studium, Beruf

### Community 107 - "Konto löschen"
Cohesion: 0.50
Nodes (4): Konto löschen, So geht's, Voraussetzung, Was du nicht von Hand löschen musst

### Community 108 - "Austritte im Blick behalten"
Cohesion: 0.50
Nodes (4): Austritte im Blick behalten, Typischer Ablauf bei offenen Beiträgen, Was beim Austritt passiert, Wo du Austritte siehst

### Community 109 - "Neues Beitragsjahr anlegen"
Cohesion: 0.40
Nodes (5): Hinweis „Erst x von y Mitgliedern haben einen Beitragseintrag“, Neues Beitragsjahr anlegen, So geht's, Warum manche Jahre weit in der Zukunft liegen, Was dabei passiert

### Community 110 - "SEPA-Lastschrift erzeugen"
Cohesion: 0.50
Nodes (4): Danach, Datei erzeugen, SEPA-Lastschrift erzeugen, Wer in die Datei kommt

### Community 111 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 112 - "Der Admin-Bereich im Überblick"
Cohesion: 0.67
Nodes (3): Der Admin-Bereich im Überblick, Gut zu wissen, Rollen

### Community 113 - "Konto von Hand anlegen"
Cohesion: 0.67
Nodes (3): Konto von Hand anlegen, So geht's, Was dabei passiert

### Community 119 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (6): markContactRequestHandled(), removeContactRequest(), ContactRequestsPage(), deleteContactRequest(), getContactRequests(), setContactRequestHandled()

### Community 120 - "Button.tsx"
Cohesion: 0.25
Nodes (7): ButtonColor, ButtonLinkProps, ButtonProps, ButtonSize, ButtonVariant, colorClasses, sizeClasses

### Community 121 - "Deployment (Hetzner Cloud / Ubuntu)"
Cohesion: 0.29
Nodes (7): Automatische Updates bei jedem Git Push (GitHub Actions), Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, nginx als Reverse Proxy, Option 1: Automatischer Einzeiler über deinen lokalen Rechner (Empfohlen), Option 2: Manuelles Ausführen auf dem Server

### Community 122 - "backup/route.ts"
Cohesion: 0.48
Nodes (6): GET(), message(), createPrismaClient(), getDatabaseUrl(), dumpDatabase(), consumeBackupToken()

### Community 123 - "bulkCreateUsersAction"
Cohesion: 0.60
Nodes (6): bulkCreateUsersAction(), BulkImport(), check(), create(), loadFile(), replaceEntry()

### Community 124 - "getMemberForEdit"
Cohesion: 0.33
Nodes (6): EditBoardMemberPage(), findMemberById(), findPublishedMembers(), getMemberForEdit(), getPublicMembers(), toBoardMember()

### Community 125 - "sendReport.ts"
Cohesion: 0.47
Nodes (3): describeSendError(), sendEach(), SmtpError

### Community 126 - "BoardPhotoUploader"
Cohesion: 0.60
Nodes (5): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), formatBytes()

### Community 127 - "ApplicationWizard"
Cohesion: 0.70
Nodes (5): ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit()

### Community 128 - "EmailComposerDialog"
Cohesion: 0.50
Nodes (4): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **579 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+574 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 714 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `DirectoryTable.tsx`, `format.ts`, `index.ts`, `boardService.ts`, `mitglied-werden/actions.ts`, `serverStatus.ts`, `blogService.ts`, `dashboard/page.tsx`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `package.json`, `membershipService.ts`, `LegalPage.tsx`, `lib/siteUrl.ts`, `gravityPhysics.ts`, `@hugeicons/core-free-icons`, `newsletterToken.ts`, `KosmosTimeline.tsx`, `prisma.ts`, `authz.ts`, `satzung/page.tsx`, `blog/actions.ts`, `EditUserForm.tsx`, `useActionForm`, `ApplicationWizard.tsx`, `app/blog/[id]/page.tsx`, `mitgliedsantraege/actions.ts`, `rateLimitService.ts`, `sepa.ts`, `app/layout.tsx`, `userService.ts`, `app/blog/page.tsx`, `featureFlagService.ts`, `MailForm.tsx`, `mitglied-werden/page.tsx`, `executeAction`, `app/kontakt/page.tsx`, `sendEmail`, `mail/page.tsx`, `AppError`, `app/page.tsx`, `getOptionalUser`, `forgot-password/layout.tsx`, `login/layout.tsx`, `abmelden/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`, `dashboard/kontakt/actions.ts`, `Button.tsx`, `backup/route.ts`?**
  _High betweenness centrality (0.203) - this node is a cross-community bridge._
- **Why does `siteUrl()` connect `mitglied-werden/actions.ts` to `newsletterToken.ts`, `layout.ts`, `prisma.ts`, `events.ts`, `ics.ts`, `mailService.ts`, `Betrieb: Checkliste für den Produktionsserver`, `userService.ts`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `Befunde vom 2026-10-20` connect `Betrieb: Checkliste für den Produktionsserver` to `mitglied-werden/actions.ts`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _579 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DirectoryTable.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12333333333333334 - nodes in this community are weakly interconnected._
- **Should `format.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07507507507507508 - nodes in this community are weakly interconnected._