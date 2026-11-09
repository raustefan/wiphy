# Graph Report - wiphy  (2026-11-09)

## Corpus Check
- 406 files · ~198,723 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2269 nodes · 7390 edges · 116 communities (100 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 58 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3b05a1b6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- executeAction
- forgot-password/layout.tsx
- next
- mailService.ts
- boardService.ts
- feeService.ts
- layout.ts
- serverStatus.ts
- anleitungen/README.md
- blogService.ts
- app/blog/[id]/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- auth.ts
- zertifikat/pdf/route.ts
- package.json
- dependencies
- membershipService.ts
- mail/page.tsx
- schemas.ts
- seed.ts
- feeCalculation.ts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- DirectoryTable.tsx
- messages.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- membership.ts
- Beiträge
- satzung/page.tsx
- contact.ts
- campus-plan.py
- bestaetigen/page.tsx
- KosmosTimeline.tsx
- format.ts
- @hugeicons/core-free-icons
- compilerOptions
- devDependencies
- passwordStrength.ts
- Deployment (Hetzner Cloud / Ubuntu)
- Technik
- membershipFormSchemas.ts
- app/layout.tsx
- useActionForm
- EmailBodyField.tsx
- berlinTime.ts
- newsletterToken.ts
- iban.ts
- Konten
- MailForm.tsx
- EditUserForm.tsx
- reset-password/actions.ts
- mitglied-werden/actions.ts
- Betrieb: Checkliste für den Produktionsserver
- EditUserForm
- dashboard/page.tsx
- securityLabels.ts
- ApplicationWizard.tsx
- authz.ts
- heliFlight.test.ts
- userUpdateData.ts
- sepa.ts
- Site.tsx
- scripts
- Technische Dokumentation
- featureFlagService.ts
- boardPhotoUrl
- app/page.tsx
- SecurityPage
- CLAUDE.md
- Kommunikation
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- mitglied-werden/page.tsx
- boardImages.ts
- getOptionalUser
- DeleteMemberSection
- Mitgliedschaft
- altcha.d.ts
- postcss.config.mjs
- env.ts
- securityEventService.ts
- userService.ts
- { GET, POST }
- BulkImport.tsx
- Inhalte der Website
- mailHistory.ts
- DebugBar.tsx
- paymentHistoryPdf.tsx
- mail/actions.ts
- setMemberPhoto
- RateLimitTable
- ActivityHeatmap.tsx
- index.ts
- RegistrationFunnel.tsx
- opengraph-image.tsx
- formatNumber
- email/actions.ts
- TypeSparklines.tsx
- BoardPhotoUploader
- ref_node_test
- ApplicationList
- login/layout.tsx
- abmelden/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- server-only-stub.cjs
- AppError
- guides.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 135 edges
2. `cn()` - 93 edges
3. `AppError` - 91 edges
4. `@hugeicons/core-free-icons` - 90 edges
5. `@hugeicons/react` - 90 edges
6. `react` - 80 edges
7. `executeAction()` - 76 edges
8. `requireAdmin()` - 59 edges
9. `isFeatureEnabled()` - 51 edges
10. `Button()` - 50 edges

## Surprising Connections (you probably didn't know these)
- `Befunde vom 2026-10-20` --references--> `siteUrl()`  [INFERRED]
  BETRIEB.md → src/lib/server/siteUrl.ts
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  ENTWICKLUNG.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `submit()` --calls--> `submitApplication()`  [EXTRACTED]
  tests/db/membership.test.ts → src/lib/server/services/membershipService.ts
- `GET()` --calls--> `siteUrl()`  [EXTRACTED]
  src/app/api/newsletter/abmelden/route.ts → src/lib/server/siteUrl.ts

## Import Cycles
- None detected.

## Communities (116 total, 16 thin omitted)

### Community 0 - "executeAction"
Cohesion: 0.11
Nodes (41): zod, deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), ContactRequestsPage(), removeMembershipApplication(), deleteEventAction() (+33 more)

### Community 2 - "next"
Cohesion: 0.09
Nodes (35): nextConfig, @hugeicons/react, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+27 more)

### Community 3 - "mailService.ts"
Cohesion: 0.13
Nodes (19): sanitize-html, EmailBlock, ENTITIES, htmlToText(), AnnouncedEvent, composeMessage(), greeting(), MailTarget (+11 more)

### Community 4 - "boardService.ts"
Cohesion: 0.19
Nodes (17): moveMemberOrder(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember(), deleteMemberById(), deletePhoto() (+9 more)

### Community 5 - "feeService.ts"
Cohesion: 0.18
Nodes (22): UserManagementPage(), wasMemberInYear(), getSepaCreditorDefaults(), findFeeDefaults(), clearFeeAmountOverride(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees() (+14 more)

### Community 6 - "layout.ts"
Cohesion: 0.21
Nodes (20): blockHtml(), blockText(), derivePreheader(), EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml(), renderBlocksText() (+12 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.10
Nodes (31): ref_node_os, ServerPage(), BackupRun, BackupStatus, cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK (+23 more)

### Community 8 - "anleitungen/README.md"
Cohesion: 0.36
Nodes (3): Anleitungen für Admins, Einstieg, Gut zu wissen

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (63): beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager() (+55 more)

### Community 10 - "app/blog/[id]/page.tsx"
Cohesion: 0.08
Nodes (38): escapeXml(), GET(), generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), LeadPost() (+30 more)

### Community 11 - "events.ts"
Cohesion: 0.13
Nodes (35): DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard(), EventCardData (+27 more)

### Community 12 - "ics.ts"
Cohesion: 0.15
Nodes (21): RFC-5545, GET(), GET(), icsEnd(), icsAttachment(), addDays(), berlinDateStamp(), buildCalendarIcs() (+13 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (32): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+24 more)

### Community 14 - "auth.ts"
Cohesion: 0.12
Nodes (17): ref_node_net, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError (+9 more)

### Community 15 - "zertifikat/pdf/route.ts"
Cohesion: 0.10
Nodes (29): GET(), byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, EntryRow(), berlinYear() (+21 more)

### Community 16 - "package.json"
Cohesion: 0.08
Nodes (24): eslintConfig, name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler (+16 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "membershipService.ts"
Cohesion: 0.27
Nodes (11): MembershipApplicationsPage(), DashboardPage(), planApplicationFees(), countOpenApplications(), deleteApplication(), findApplications(), findOpenApplication(), getMaxMemberNumber() (+3 more)

### Community 19 - "mail/page.tsx"
Cohesion: 0.16
Nodes (15): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage() (+7 more)

### Community 20 - "schemas.ts"
Cohesion: 0.05
Nodes (36): isCalendarDate(), absent(), AdminCreateUserInput, blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema (+28 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "feeCalculation.ts"
Cohesion: 0.16
Nodes (21): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ApplicationWizard(), currentFormValues(), goToStep() (+13 more)

### Community 23 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.25
Nodes (6): Datenschutz und Sicherheit, Für Besucher:innen, Für den Vorstand, Für Mitglieder, Weiterlesen, WirtschaftsPhysik Alumni e. V. — Vereinswebsite

### Community 24 - "DirectoryTable.tsx"
Cohesion: 0.07
Nodes (43): AddFeeYearCard(), DialogButton(), AmountDialog(), chipTones, CommentDialog(), compareBy(), compareNullable(), DirectoryAccount (+35 more)

### Community 25 - "messages.ts"
Cohesion: 0.11
Nodes (31): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), notifyAdminsAboutRegistration(), verifyEmail(), EmailMessage, adminRegistrationNoticeMessage(), emailChangedNoticeMessage() (+23 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (13): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+5 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "membership.ts"
Cohesion: 0.15
Nodes (22): setStudentEndYearAction(), StudentStatusEditor(), ageAt(), changedStudentYears(), CONSENT_VERSION, currentStudentEndYear(), DATENSCHUTZ_URL, formatYearRanges() (+14 more)

### Community 29 - "Beiträge"
Cohesion: 0.20
Nodes (10): Ausnahme (abweichender Betrag), Beitragsjahr hinzufügen, Beitragssätze, Beiträge, Hinweis „Erst x von y Mitgliedern haben einen Beitragseintrag“, SEPA-Lastschrift, So rechnet die Website, Sonderstatus umschalten (+2 more)

### Community 30 - "satzung/page.tsx"
Cohesion: 0.18
Nodes (15): ZahlungenPage(), dynamic, metadata, SatzungPage(), FeeDefaultEntry, FeeRates, resolveFeeDefault(), FALLBACK_FEE_DEFAULT (+7 more)

### Community 31 - "contact.ts"
Cohesion: 0.24
Nodes (7): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ContactInput, scoreSpam(), SPAM_KEYWORDS, legitimate

### Community 32 - "campus-plan.py"
Cohesion: 0.10
Nodes (29): datetime, json, math, pathlib, re, d(), main(), outer_rings() (+21 more)

### Community 33 - "bestaetigen/page.tsx"
Cohesion: 0.07
Nodes (34): confirmPrivacyPolicy(), ConfirmPrivacyPolicyPage(), metadata, Props, DATENSCHUTZ, DATENSCHUTZ_VERSION, metadata, impressum() (+26 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (24): CLOUDS, Contact, KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField() (+16 more)

### Community 35 - "format.ts"
Cohesion: 0.08
Nodes (29): ContactRequestList(), confirmDelete(), run(), MembershipCertificateCard(), statusMeta(), TerminationItem, TerminationList(), BackupHistory() (+21 more)

### Community 36 - "@hugeicons/core-free-icons"
Cohesion: 0.08
Nodes (33): @hugeicons/core-free-icons, react, DeletePostButton(), ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat (+25 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "passwordStrength.ts"
Cohesion: 0.15
Nodes (16): bulkCreateUsersAction(), BulkImport(), check(), create(), loadFile(), replaceEntry(), NewUserForm(), handleSubmit() (+8 more)

### Community 40 - "Deployment (Hetzner Cloud / Ubuntu)"
Cohesion: 0.29
Nodes (7): Automatische Updates bei jedem Git Push (GitHub Actions), Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, nginx als Reverse Proxy, Option 1: Automatischer Einzeiler über deinen lokalen Rechner (Empfohlen), Option 2: Manuelles Ausführen auf dem Server

### Community 41 - "Technik"
Cohesion: 0.20
Nodes (9): Backup, Debug-Modus, Deploy, Feature Flags, Notfall-Rezepte, Rate-Limit-Sperre aufheben, Server, Sicherheit (+1 more)

### Community 42 - "membershipFormSchemas.ts"
Cohesion: 0.15
Nodes (20): hasControlChars(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, addAddressIssues(), addStudyIssues() (+12 more)

### Community 43 - "app/layout.tsx"
Cohesion: 0.11
Nodes (17): src_app_globals, body, metadata, mono, serif, ContrastToggle(), columns, Footer() (+9 more)

### Community 44 - "useActionForm"
Cohesion: 0.07
Nodes (39): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, PasswordChangeButton(), StudentStatusPrompt(), ForgotPasswordPage(), ContactForm(), FaqItem (+31 more)

### Community 45 - "EmailBodyField.tsx"
Cohesion: 0.18
Nodes (10): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose(), EmailEditorToolbar() (+2 more)

### Community 46 - "berlinTime.ts"
Cohesion: 0.24
Nodes (16): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+8 more)

### Community 47 - "newsletterToken.ts"
Cohesion: 0.27
Nodes (10): GET(), POST(), RFC-8058, createNewsletterToken(), key(), NEWSLETTER_UNSUBSCRIBE_PATH, newsletterUnsubscribeUrls(), sign() (+2 more)

### Community 48 - "iban.ts"
Cohesion: 0.23
Nodes (19): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+11 more)

### Community 49 - "Konten"
Cohesion: 0.22
Nodes (9): Benutzerverwaltung, Konten, Konto bearbeiten, Konto löschen, Konto von Hand anlegen, Login sperren, Suche und Filter, Symbole und Badges am Namen (+1 more)

### Community 50 - "MailForm.tsx"
Cohesion: 0.13
Nodes (13): MailAnnouncement, MAIL_KINDS, MailFormProps, MailKind, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS (+5 more)

### Community 51 - "EditUserForm.tsx"
Cohesion: 0.09
Nodes (24): metadata, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput() (+16 more)

### Community 52 - "reset-password/actions.ts"
Cohesion: 0.15
Nodes (18): bcryptjs, ref_crypto, setFeatureFlag(), removeRateLimitEntry(), requestBackupLink(), triggerDeploy(), resetPassword(), resetSchema (+10 more)

### Community 53 - "mitglied-werden/actions.ts"
Cohesion: 0.18
Nodes (31): EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), requestPasswordReset(), submitContactRequest(), resendVerificationEmail(), submitMembershipApplication(), registerUser() (+23 more)

### Community 54 - "Betrieb: Checkliste für den Produktionsserver"
Cohesion: 0.29
Nodes (7): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "dashboard/page.tsx"
Cohesion: 0.19
Nodes (8): MailSuccessDialog(), NewsletterRow(), NewsletterSection(), useOwnNewsletter(), ADMIN_ACTIONS, QueryParamDialog(), LogoutButton(), needsStudentStatusAnswer()

### Community 57 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 58 - "ApplicationWizard.tsx"
Cohesion: 0.10
Nodes (19): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), CountryOptions(), byName (+11 more)

### Community 59 - "authz.ts"
Cohesion: 0.21
Nodes (16): GET(), GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, AS_MEMBER_COOKIE, assertCanEditUser() (+8 more)

### Community 60 - "heliFlight.test.ts"
Cohesion: 0.15
Nodes (20): CampusPlan(), Helicopter(), HINTS, hitsContent(), KEYS, PauseOffscreen(), approach(), Bounds (+12 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "sepa.ts"
Cohesion: 0.24
Nodes (17): field(), POST(), isValidBic(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+9 more)

### Community 63 - "Site.tsx"
Cohesion: 0.12
Nodes (15): facts, metadata, metadata, dynamic, metadata, SearchParams, ViewSwitch(), metadata (+7 more)

### Community 64 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, dev, icons, lint, start, test, test:db (+1 more)

### Community 65 - "Technische Dokumentation"
Cohesion: 0.12
Nodes (17): Admin-Dashboard, Authentifizierung & Konten, Backup & Wiederherstellung, Datenbankmodell, Feature Flags, Funktionen im Detail, Inhalt, Mitgliederbereich (`/dashboard`) (+9 more)

### Community 66 - "featureFlagService.ts"
Cohesion: 0.27
Nodes (9): @prisma/client, POST(), FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, PAGE_FLAGS, postExists() (+1 more)

### Community 67 - "boardPhotoUrl"
Cohesion: 0.18
Nodes (12): EditBoardMemberPage(), AdminBoardPage(), getInitials(), VorstandPage(), boardPhotoUrl(), findAllMembers(), findMemberById(), findPublishedMembers() (+4 more)

### Community 68 - "app/page.tsx"
Cohesion: 0.14
Nodes (12): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline(), levels, STRIP_IDS (+4 more)

### Community 69 - "SecurityPage"
Cohesion: 0.28
Nodes (8): SecurityPage(), typeLabel, bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket(), parseWindowDays()

### Community 71 - "Kommunikation"
Cohesion: 0.33
Nodes (6): Kommunikation, Kontaktanfragen, Newsletter oder Mitteilung?, Platzhalter, Rundmail verschicken, Zu einem Termin einladen

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.10
Nodes (37): EditBlogPage(), createEventDraft(), revalidateEvent(), saveEventAction(), AdminEventsPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById() (+29 more)

### Community 77 - "mitglied-werden/page.tsx"
Cohesion: 0.14
Nodes (19): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), WithdrawApplicationButton() (+11 more)

### Community 78 - "boardImages.ts"
Cohesion: 0.25
Nodes (6): ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, ProcessedBoardPhoto, QUALITY_LADDER

### Community 79 - "getOptionalUser"
Cohesion: 0.31
Nodes (7): GET(), GET(), GET(), getOptionalUser(), withViewOverride(), findImageBytes(), findPhotoBytes()

### Community 81 - "Mitgliedschaft"
Cohesion: 0.33
Nodes (6): Ablauf einer Aufnahme, Antrag bearbeiten, Austritt von Hand eintragen, Austritte, Mitgliedschaft, Studierendenstatus

### Community 82 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "env.ts"
Cohesion: 0.19
Nodes (14): server-only, GET(), message(), createPrismaClient(), consumeAltchaSolution(), readExpiry(), readSignature(), getAltchaHmacKey() (+6 more)

### Community 86 - "securityEventService.ts"
Cohesion: 0.20
Nodes (14): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview(), HeatCell (+6 more)

### Community 87 - "userService.ts"
Cohesion: 0.13
Nodes (25): setOwnNewsletterAction(), setNewsletterByTokenAction(), adminCreatedUserMessage(), globalForPrisma, prisma, PendingRegistrationStats, UNVERIFIED_TTL_HOURS, deleteUserById() (+17 more)

### Community 89 - "BulkImport.tsx"
Cohesion: 0.13
Nodes (19): ImportIssue, ImportRowResult, display(), EntryDetails(), FALSE_BY_DEFAULT, ImportReport, EXAMPLE, FEE_FIELDS (+11 more)

### Community 91 - "Inhalte der Website"
Cohesion: 0.40
Nodes (5): Bilder, Blog, Inhalte der Website, Termine, Vorstand und Signatur

### Community 92 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 93 - "DebugBar.tsx"
Cohesion: 0.15
Nodes (12): ref_node_child_process, ref_node_util, FeatureFlagsPage(), commit, DebugBar(), LINKS, TIME, DebugConsole() (+4 more)

### Community 94 - "paymentHistoryPdf.tsx"
Cohesion: 0.27
Nodes (9): @react-pdf/renderer, GET(), formatAddress(), PostalAddress, PaymentHistoryPdf(), PdfUser, statusLabel(), styles (+1 more)

### Community 95 - "mail/actions.ts"
Cohesion: 0.36
Nodes (7): parseMailForm(), sendEmailAction(), resolveRecipientEmails(), resolveUsersByTarget(), sendMailForTarget(), getAnnouncedEvent(), mailSendSchema

### Community 96 - "setMemberPhoto"
Cohesion: 0.33
Nodes (6): POST(), processBoardPhoto(), memberExists(), upsertPhoto(), memberExists(), setMemberPhoto()

### Community 97 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 98 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 99 - "index.ts"
Cohesion: 0.10
Nodes (31): CtaCard(), InfoTooltip(), RateLimitTableProps, FeeDefaultRow, ShareButton(), share(), Badge(), BadgeTone (+23 more)

### Community 100 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 101 - "opengraph-image.tsx"
Cohesion: 0.20
Nodes (8): ref_node_fs, sharp, BACKGROUND, icon(), main(), alt, contentType, size

### Community 102 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 103 - "email/actions.ts"
Cohesion: 0.60
Nodes (4): parseDirectMailForm(), sendDirectMailAction(), resolveUsersByIds(), enforceAdminMailRateLimit()

### Community 104 - "TypeSparklines.tsx"
Cohesion: 0.38
Nodes (6): sparkGeometry, typeHint(), SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 105 - "BoardPhotoUploader"
Cohesion: 0.60
Nodes (5): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), formatBytes()

### Community 106 - "ref_node_test"
Cohesion: 0.14
Nodes (15): ref_node_assert, ref_node_test, submitApplication(), input, joinedAt, submit(), createMember(), createUser() (+7 more)

### Community 108 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 119 - "AppError"
Cohesion: 0.13
Nodes (31): KontoPage(), revealKosmosContactAction(), setKosmosVisibilityAction(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership() (+23 more)

### Community 122 - "guides.tsx"
Cohesion: 0.16
Nodes (15): react-markdown, remark-gfm, anchoredHeading(), components, findGuide(), GuideMarkdown(), GUIDES, readGuide() (+7 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **531 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+526 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 674 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `executeAction`, `forgot-password/layout.tsx`, `blogService.ts`, `app/blog/[id]/page.tsx`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `zertifikat/pdf/route.ts`, `package.json`, `mail/page.tsx`, `DirectoryTable.tsx`, `messages.ts`, `gravityPhysics.ts`, `satzung/page.tsx`, `bestaetigen/page.tsx`, `KosmosTimeline.tsx`, `format.ts`, `@hugeicons/core-free-icons`, `app/layout.tsx`, `useActionForm`, `newsletterToken.ts`, `MailForm.tsx`, `EditUserForm.tsx`, `reset-password/actions.ts`, `mitglied-werden/actions.ts`, `dashboard/page.tsx`, `ApplicationWizard.tsx`, `authz.ts`, `sepa.ts`, `Site.tsx`, `featureFlagService.ts`, `app/page.tsx`, `eventService.ts`, `mitglied-werden/page.tsx`, `getOptionalUser`, `env.ts`, `DebugBar.tsx`, `paymentHistoryPdf.tsx`, `index.ts`, `opengraph-image.tsx`, `email/actions.ts`, `login/layout.tsx`, `abmelden/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`, `AppError`, `guides.tsx`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/core-free-icons` to `next`, `blogService.ts`, `app/blog/[id]/page.tsx`, `MarketDiffusion.tsx`, `package.json`, `DirectoryTable.tsx`, `gravityPhysics.ts`, `membership.ts`, `bestaetigen/page.tsx`, `KosmosTimeline.tsx`, `format.ts`, `app/layout.tsx`, `useActionForm`, `iban.ts`, `MailForm.tsx`, `EditUserForm.tsx`, `dashboard/page.tsx`, `ApplicationWizard.tsx`, `authz.ts`, `heliFlight.test.ts`, `Site.tsx`, `featureFlagService.ts`, `app/page.tsx`, `eventService.ts`, `altcha.d.ts`, `BulkImport.tsx`, `DebugBar.tsx`, `index.ts`, `guides.tsx`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `siteUrl()` connect `mitglied-werden/actions.ts` to `mailService.ts`, `layout.ts`, `events.ts`, `ics.ts`, `newsletterToken.ts`, `reset-password/actions.ts`, `Betrieb: Checkliste für den Produktionsserver`, `userService.ts`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _531 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `executeAction` be split into smaller, more focused modules?**
  _Cohesion score 0.10980392156862745 - nodes in this community are weakly interconnected._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.08825248392752776 - nodes in this community are weakly interconnected._