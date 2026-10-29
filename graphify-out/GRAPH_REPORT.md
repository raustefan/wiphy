# Graph Report - wiphy  (2026-10-29)

## Corpus Check
- 397 files · ~193,381 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2221 nodes · 7263 edges · 109 communities (100 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `53de6e73`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ref_node_fs
- layout.ts
- index.ts
- mailService.ts
- requireAdmin
- feeService.ts
- @hugeicons/core-free-icons
- serverStatus.ts
- anleitungen/README.md
- blogService.ts
- membershipCertificate.ts
- events.ts
- ics.ts
- MarketDiffusion.tsx
- formatNumber
- DirectoryTable.tsx
- package.json
- dependencies
- membershipService.ts
- app/blog/[id]/page.tsx
- schemas.ts
- seed.ts
- ApplicationWizard.tsx
- satzung/page.tsx
- DirectoryTable
- TypeSparklines.tsx
- OutcomeTimeline.tsx
- gravityPhysics.ts
- mitglied-werden/actions.ts
- Beiträge
- countries.ts
- contact.ts
- campus-plan.py
- membership.ts
- KosmosTimeline.tsx
- format.ts
- dashboard/page.tsx
- compilerOptions
- devDependencies
- passwordStrength.ts
- ApplicationWizard
- Technik
- membershipFormSchemas.ts
- EditUserForm.tsx
- useActionForm
- BulkImport.tsx
- getOptionalUser
- berlinTime.ts
- iban.ts
- Konten
- EmailBodyField.tsx
- MailForm.tsx
- messages.ts
- userService.ts
- Betrieb: Checkliste für den Produktionsserver
- EditUserForm
- app/kontakt/page.tsx
- securityLabels.ts
- sepa.ts
- authz.ts
- newsletterToken.ts
- userUpdateData.ts
- users/[id]/page.tsx
- next
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- isFeatureEnabled
- Deployment (Hetzner Cloud / Ubuntu)
- app/page.tsx
- ref_node_assert
- CLAUDE.md
- Kommunikation
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- mitglied-werden/page.tsx
- AppError
- LegalPage.tsx
- DeleteMemberSection
- Mitgliedschaft
- altcha.d.ts
- postcss.config.mjs
- prisma.ts
- securityEventService.ts
- sendEmail
- { GET, POST }
- MailForm
- Inhalte der Website
- userImport.test.ts
- paymentHistoryPdf.tsx
- ApplicationList
- bestaetigen/page.tsx
- zertifikat/pdf/route.ts
- SecurityPage
- ActivityHeatmap.tsx
- RateLimitTable
- Footer.tsx
- bulkCreateUsersAction
- RegistrationFunnel.tsx
- requireUser
- requireDebugAdmin
- guides.tsx
- mail/page.tsx
- mailHistory.ts
- mail/actions.ts

## God Nodes (most connected - your core abstractions)
1. `next` - 135 edges
2. `cn()` - 93 edges
3. `AppError` - 91 edges
4. `@hugeicons/core-free-icons` - 90 edges
5. `@hugeicons/react` - 90 edges
6. `react` - 79 edges
7. `executeAction()` - 76 edges
8. `requireAdmin()` - 59 edges
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

## Communities (109 total, 9 thin omitted)

### Community 0 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 1 - "layout.ts"
Cohesion: 0.20
Nodes (20): blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml() (+12 more)

### Community 2 - "index.ts"
Cohesion: 0.09
Nodes (42): metadata, metadata, CtaCard(), DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic, metadata (+34 more)

### Community 3 - "mailService.ts"
Cohesion: 0.11
Nodes (25): sanitize-html, parseDirectMailForm(), sendDirectMailAction(), ENTITIES, htmlToText(), AnnouncedEvent, composeMessage(), greeting() (+17 more)

### Community 4 - "requireAdmin"
Cohesion: 0.06
Nodes (71): POST(), deletePost(), savePost(), createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), deleteFeeDefaultYear() (+63 more)

### Community 5 - "feeService.ts"
Cohesion: 0.18
Nodes (18): FeeBreakdown, SepaDebtorAddress, clearFeeAmountOverride(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), setStudentYear(), updateFeeComment() (+10 more)

### Community 6 - "@hugeicons/core-free-icons"
Cohesion: 0.15
Nodes (19): @hugeicons/core-free-icons, @hugeicons/react, react, DeletePostButton(), ContactRequestItem, dateFormat, DeleteEventButton(), ActionResult (+11 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.09
Nodes (35): ref_node_os, GET(), GET(), ServerPage(), auth, BackupRun, BackupStatus, cpuPercent() (+27 more)

### Community 8 - "anleitungen/README.md"
Cohesion: 0.36
Nodes (3): Anleitungen für Admins, Einstieg, Gut zu wissen

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (68): sharp, POST(), BlogIndexPage(), beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages() (+60 more)

### Community 10 - "membershipCertificate.ts"
Cohesion: 0.20
Nodes (17): berlinYear(), CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDuration(), formatMembershipDurationDative(), formatPaidYears() (+9 more)

### Community 11 - "events.ts"
Cohesion: 0.10
Nodes (41): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), GET(), dynamic, EventDetailPage(), generateMetadata(), Props (+33 more)

### Community 12 - "ics.ts"
Cohesion: 0.24
Nodes (16): RFC-5545, eventLinkLabel(), icsEnd(), addDays(), berlinDateStamp(), buildEventIcs(), calendar(), describe() (+8 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.08
Nodes (39): toggleAllDay(), toDateTimeValue(), toDayValue(), Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext (+31 more)

### Community 14 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 15 - "DirectoryTable.tsx"
Cohesion: 0.10
Nodes (22): AmountDialog(), chipTones, CommentDialog(), compareBy(), compareNullable(), DirectoryAccount, displayName(), explainFee() (+14 more)

### Community 16 - "package.json"
Cohesion: 0.08
Nodes (24): eslintConfig, name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler (+16 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "membershipService.ts"
Cohesion: 0.19
Nodes (18): dynamic, MembershipApplicationsPage(), metadata, planApplicationFees(), studentYearsFromStudy(), countOpenApplications(), deleteApplication(), findApplicationById() (+10 more)

### Community 19 - "app/blog/[id]/page.tsx"
Cohesion: 0.07
Nodes (38): escapeXml(), GET(), generateMetadata(), Props, PublicBlogPost(), LeadPost(), PostRow(), EditBlogPage() (+30 more)

### Community 20 - "schemas.ts"
Cohesion: 0.05
Nodes (34): absent(), AdminCreateUserInput, blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema, boardDeleteSchema (+26 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "ApplicationWizard.tsx"
Cohesion: 0.10
Nodes (29): AddFeeYearCard(), DialogButton(), FeeDefaultRow, FeeDefaultsCard(), metadata, StatTile(), BankDetailsForm(), BankValues (+21 more)

### Community 23 - "satzung/page.tsx"
Cohesion: 0.19
Nodes (17): UserManagementPage(), dynamic, metadata, SatzungPage(), calculateFee(), FeeDefaultEntry, FeeRates, resolveFeeDefault() (+9 more)

### Community 24 - "DirectoryTable"
Cohesion: 0.10
Nodes (25): DirectoryTable(), selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase, DirectoryFilters, directoryStats() (+17 more)

### Community 25 - "TypeSparklines.tsx"
Cohesion: 0.38
Nodes (6): sparkGeometry, typeHint(), SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (13): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+5 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "mitglied-werden/actions.ts"
Cohesion: 0.22
Nodes (14): submitContactRequest(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), contactRequestMessage(), membershipApplicationNoticeMessage(), membershipReceivedMessage() (+6 more)

### Community 29 - "Beiträge"
Cohesion: 0.20
Nodes (10): Ausnahme (abweichender Betrag), Beitragsjahr hinzufügen, Beitragssätze, Beiträge, Hinweis „Erst x von y Mitgliedern haben einen Beitragseintrag“, SEPA-Lastschrift, So rechnet die Website, Sonderstatus umschalten (+2 more)

### Community 30 - "countries.ts"
Cohesion: 0.18
Nodes (16): display(), EntryDetails(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS, countryName() (+8 more)

### Community 31 - "contact.ts"
Cohesion: 0.25
Nodes (6): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ContactInput, SPAM_KEYWORDS, legitimate

### Community 32 - "campus-plan.py"
Cohesion: 0.10
Nodes (29): datetime, json, math, pathlib, re, d(), main(), outer_rings() (+21 more)

### Community 33 - "membership.ts"
Cohesion: 0.15
Nodes (22): setStudentEndYearAction(), StudentStatusEditor(), ageAt(), changedStudentYears(), CONSENT_VERSION, currentStudentEndYear(), DATENSCHUTZ_URL, formatYearRanges() (+14 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (23): CLOUDS, Contact, KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField() (+15 more)

### Community 35 - "format.ts"
Cohesion: 0.10
Nodes (22): AdminBlogPage(), statusMeta(), TerminationItem, TerminationList(), BackupSection(), formatUptime(), Sample, ServerDashboard() (+14 more)

### Community 36 - "dashboard/page.tsx"
Cohesion: 0.09
Nodes (22): ContactRequestList(), confirmDelete(), run(), MailSuccessDialog(), MembershipCertificateCard(), NewsletterRow(), NewsletterSection(), useOwnNewsletter() (+14 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "passwordStrength.ts"
Cohesion: 0.21
Nodes (10): NewUserForm(), handleSubmit(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 40 - "ApplicationWizard"
Cohesion: 0.70
Nodes (5): ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit()

### Community 41 - "Technik"
Cohesion: 0.20
Nodes (9): Backup, Debug-Modus, Deploy, Feature Flags, Notfall-Rezepte, Rate-Limit-Sperre aufheben, Server, Sicherheit (+1 more)

### Community 42 - "membershipFormSchemas.ts"
Cohesion: 0.10
Nodes (28): hasControlChars(), isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, MINOR_HINT (+20 more)

### Community 43 - "EditUserForm.tsx"
Cohesion: 0.09
Nodes (29): metadata, ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, EventFormData, ADMIN_ONLY_KEYS, FIELD_LABELS (+21 more)

### Community 44 - "useActionForm"
Cohesion: 0.06
Nodes (37): next-auth, EmailChangeForm(), PasswordChangeButton(), dynamic, metadata, ForgotPasswordPage(), ContactForm(), createLoginChallenge() (+29 more)

### Community 45 - "BulkImport.tsx"
Cohesion: 0.17
Nodes (11): getStatusIcon(), ProfileSummary(), ProfileSummaryUser, ImportIssue, ImportRowResult, EntryRow(), FALSE_BY_DEFAULT, ImportReport (+3 more)

### Community 46 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

### Community 47 - "berlinTime.ts"
Cohesion: 0.24
Nodes (16): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+8 more)

### Community 48 - "iban.ts"
Cohesion: 0.25
Nodes (17): ibanError(), EEA, IBAN_LENGTHS, isSepaIban(), isValidBic(), isValidIban(), maskIban(), normalizeIban() (+9 more)

### Community 49 - "Konten"
Cohesion: 0.22
Nodes (9): Benutzerverwaltung, Konten, Konto bearbeiten, Konto löschen, Konto von Hand anlegen, Login sperren, Suche und Filter, Symbole und Badges am Namen (+1 more)

### Community 50 - "EmailBodyField.tsx"
Cohesion: 0.24
Nodes (7): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailBodyField(), EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 51 - "MailForm.tsx"
Cohesion: 0.14
Nodes (10): MailAnnouncement, MAIL_KINDS, MailFormProps, MailKind, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS (+2 more)

### Community 52 - "messages.ts"
Cohesion: 0.19
Nodes (21): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), signOut, accountDeletedMessage(), adminCreatedUserMessage() (+13 more)

### Community 53 - "userService.ts"
Cohesion: 0.11
Nodes (34): EMAIL_CHANGE_ERRORS, requestPasswordChange(), KontoPage(), requestPasswordReset(), AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError (+26 more)

### Community 54 - "Betrieb: Checkliste für den Produktionsserver"
Cohesion: 0.22
Nodes (7): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "app/kontakt/page.tsx"
Cohesion: 0.18
Nodes (11): dynamic, KontaktPage(), metadata, dynamic, LoginPage(), metadata, NOTICES, Props (+3 more)

### Community 57 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 58 - "sepa.ts"
Cohesion: 0.25
Nodes (15): field(), POST(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate(), isValidCreditorId() (+7 more)

### Community 59 - "authz.ts"
Cohesion: 0.13
Nodes (24): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage(), commit, DebugBar() (+16 more)

### Community 60 - "newsletterToken.ts"
Cohesion: 0.27
Nodes (10): GET(), POST(), RFC-8058, createNewsletterToken(), key(), NEWSLETTER_UNSUBSCRIBE_PATH, newsletterUnsubscribeUrls(), sign() (+2 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "users/[id]/page.tsx"
Cohesion: 0.18
Nodes (19): deleteUserAction(), EditUserPage(), metadata, updateUser(), prisma, assertCanEditUser(), deleteUserById(), findUserByMemberNumberExcludingUser() (+11 more)

### Community 63 - "next"
Cohesion: 0.06
Nodes (26): nextConfig, next, generateMetadata(), MetaLine(), Props, metadata, facts, metadata (+18 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.12
Nodes (17): Admin-Dashboard, Authentifizierung & Konten, Backup & Wiederherstellung, Datenbankmodell, Feature Flags, Funktionen im Detail, Inhalt, Mitgliederbereich (`/dashboard`) (+9 more)

### Community 66 - "isFeatureEnabled"
Cohesion: 0.19
Nodes (16): @prisma/client, notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS (+8 more)

### Community 67 - "Deployment (Hetzner Cloud / Ubuntu)"
Cohesion: 0.29
Nodes (7): Automatische Updates bei jedem Git Push (GitHub Actions), Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, nginx als Reverse Proxy, Option 1: Automatischer Einzeiler über deinen lokalen Rechner (Empfohlen), Option 2: Manuelles Ausführen auf dem Server

### Community 68 - "app/page.tsx"
Cohesion: 0.11
Nodes (16): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline(), HomePage(), levels (+8 more)

### Community 69 - "ref_node_assert"
Cohesion: 0.13
Nodes (10): ref_node_assert, ref_node_net, ref_node_test, addressKey(), HeaderBag, ADMIN_SESSION_MAX_MS, adminSessionExpired(), NOW (+2 more)

### Community 71 - "Kommunikation"
Cohesion: 0.33
Nodes (6): Kommunikation, Kontaktanfragen, Newsletter oder Mitteilung?, Platzhalter, Rundmail verschicken, Zu einem Termin einladen

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.12
Nodes (31): EditEventPage(), createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventById(), findEventOptions(), findLatestPastEvent() (+23 more)

### Community 77 - "mitglied-werden/page.tsx"
Cohesion: 0.16
Nodes (16): JourneyRail(), ApplicationStage(), dynamic, metadata, Props, toDateInput(), VerifyPanel(), JOURNEY_STEPS (+8 more)

### Community 78 - "AppError"
Cohesion: 0.09
Nodes (35): zod, setOwnNewsletterAction(), markContactRequestHandled(), removeContactRequest(), ContactRequestsPage(), acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant() (+27 more)

### Community 79 - "LegalPage.tsx"
Cohesion: 0.16
Nodes (13): metadata, impressum(), ImpressumPage(), metadata, SATZUNG, anchorOf(), Block(), LegalPage() (+5 more)

### Community 81 - "Mitgliedschaft"
Cohesion: 0.33
Nodes (6): Ablauf einer Aufnahme, Antrag bearbeiten, Austritt von Hand eintragen, Austritte, Mitgliedschaft, Studierendenstatus

### Community 82 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "prisma.ts"
Cohesion: 0.20
Nodes (15): server-only, GET(), message(), createPrismaClient(), globalForPrisma, consumeAltchaSolution(), readExpiry(), readSignature() (+7 more)

### Community 86 - "securityEventService.ts"
Cohesion: 0.20
Nodes (14): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview(), HeatCell (+6 more)

### Community 87 - "sendEmail"
Cohesion: 0.16
Nodes (24): bcryptjs, ref_crypto, requestBackupLink(), resendVerificationEmail(), registerUser(), resetPassword(), resetSchema, EmailMessage (+16 more)

### Community 89 - "MailForm"
Cohesion: 0.18
Nodes (6): byStatusThenName(), MailForm(), useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 91 - "Inhalte der Website"
Cohesion: 0.40
Nodes (5): Bilder, Blog, Inhalte der Website, Termine, Vorstand und Signatur

### Community 92 - "userImport.test.ts"
Cohesion: 0.24
Nodes (9): EXAMPLE, FEE_FIELDS, FEES_EXAMPLE, IMPORT_EXCLUDED_FIELDS, IMPORT_KEYS, IMPORT_SECTIONS, ImportEntry, ImportField (+1 more)

### Community 93 - "paymentHistoryPdf.tsx"
Cohesion: 0.29
Nodes (8): @react-pdf/renderer, GET(), PostalAddress, PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee

### Community 94 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 95 - "bestaetigen/page.tsx"
Cohesion: 0.29
Nodes (8): confirmPrivacyPolicy(), ConfirmPrivacyPolicyPage(), metadata, Props, DATENSCHUTZ, DATENSCHUTZ_VERSION, internalPath(), needsPrivacyConsent()

### Community 96 - "zertifikat/pdf/route.ts"
Cohesion: 0.38
Nodes (8): GET(), DashboardPage(), certificateFacts, isCertifiableStatus(), loadLogoDataUrl(), getSignatureBoardMembers(), getFeeDashboardData(), isInFeeYear()

### Community 97 - "SecurityPage"
Cohesion: 0.28
Nodes (8): SecurityPage(), typeLabel, bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket(), parseWindowDays()

### Community 98 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 99 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 100 - "Footer.tsx"
Cohesion: 0.32
Nodes (5): ContrastToggle(), columns, legalLinks, GravityTrigger(), PluckedString()

### Community 101 - "bulkCreateUsersAction"
Cohesion: 0.60
Nodes (6): bulkCreateUsersAction(), BulkImport(), check(), create(), loadFile(), replaceEntry()

### Community 102 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 111 - "requireUser"
Cohesion: 0.25
Nodes (13): requestEmailChangeAction(), revealKosmosContactAction(), setKosmosVisibilityAction(), NewUserPage(), updateBankDetails(), submit(), requireUser(), requireFeatureEnabled() (+5 more)

### Community 119 - "requireDebugAdmin"
Cohesion: 0.22
Nodes (10): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, removeRateLimitEntry(), triggerDeploy(), DeploySection(), isFeatureFlagKey(), requireDebugAdmin() (+2 more)

### Community 122 - "guides.tsx"
Cohesion: 0.17
Nodes (14): react-markdown, remark-gfm, anchoredHeading(), components, findGuide(), GuideMarkdown(), GUIDES, readGuide() (+6 more)

### Community 124 - "mail/page.tsx"
Cohesion: 0.12
Nodes (19): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, sitemap() (+11 more)

### Community 125 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 126 - "mail/actions.ts"
Cohesion: 0.43
Nodes (6): parseMailForm(), sendEmailAction(), sendMailForTarget(), enforceAdminMailRateLimit(), getAnnouncedEvent(), mailSendSchema

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **514 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+509 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 655 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `index.ts`, `requireAdmin`, `@hugeicons/core-free-icons`, `serverStatus.ts`, `blogService.ts`, `events.ts`, `MarketDiffusion.tsx`, `DirectoryTable.tsx`, `package.json`, `membershipService.ts`, `app/blog/[id]/page.tsx`, `ApplicationWizard.tsx`, `satzung/page.tsx`, `gravityPhysics.ts`, `mitglied-werden/actions.ts`, `KosmosTimeline.tsx`, `format.ts`, `dashboard/page.tsx`, `EditUserForm.tsx`, `useActionForm`, `BulkImport.tsx`, `getOptionalUser`, `MailForm.tsx`, `messages.ts`, `userService.ts`, `app/kontakt/page.tsx`, `sepa.ts`, `authz.ts`, `newsletterToken.ts`, `users/[id]/page.tsx`, `isFeatureEnabled`, `app/page.tsx`, `mitglied-werden/page.tsx`, `AppError`, `LegalPage.tsx`, `prisma.ts`, `sendEmail`, `paymentHistoryPdf.tsx`, `bestaetigen/page.tsx`, `zertifikat/pdf/route.ts`, `Footer.tsx`, `requireUser`, `requireDebugAdmin`, `guides.tsx`, `mail/page.tsx`, `mail/actions.ts`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/core-free-icons` to `index.ts`, `blogService.ts`, `MarketDiffusion.tsx`, `DirectoryTable.tsx`, `package.json`, `app/blog/[id]/page.tsx`, `ApplicationWizard.tsx`, `gravityPhysics.ts`, `membership.ts`, `KosmosTimeline.tsx`, `format.ts`, `dashboard/page.tsx`, `EditUserForm.tsx`, `useActionForm`, `BulkImport.tsx`, `MailForm.tsx`, `authz.ts`, `users/[id]/page.tsx`, `next`, `isFeatureEnabled`, `app/page.tsx`, `eventService.ts`, `LegalPage.tsx`, `altcha.d.ts`, `Footer.tsx`, `requireDebugAdmin`, `guides.tsx`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `siteUrl()` connect `sendEmail` to `layout.ts`, `mailService.ts`, `events.ts`, `ics.ts`, `mitglied-werden/actions.ts`, `AppError`, `userService.ts`, `Betrieb: Checkliste für den Produktionsserver`, `newsletterToken.ts`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _514 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0867579908675799 - nodes in this community are weakly interconnected._
- **Should `mailService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11088709677419355 - nodes in this community are weakly interconnected._