# Graph Report - wiphy  (2026-11-09)

## Corpus Check
- 407 files · ~199,111 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2275 nodes · 7430 edges · 116 communities (100 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 59 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8bb46093`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- executeAction
- forgot-password/layout.tsx
- next
- mailService.ts
- boardService.ts
- feeService.ts
- DirectoryTable.tsx
- serverStatus.ts
- anleitungen/README.md
- blogService.ts
- app/termine/[id]/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- prisma.ts
- zertifikat/pdf/route.ts
- package.json
- dependencies
- app/kontakt/page.tsx
- mail/page.tsx
- schemas.ts
- seed.ts
- feeCalculation.ts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- DirectoryTable
- mitglied-werden/actions.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- membership.ts
- Beiträge
- satzung/page.tsx
- contact.ts
- campus-plan.py
- bestaetigen/page.tsx
- KosmosTimeline.tsx
- dashboard/page.tsx
- @hugeicons/core-free-icons
- compilerOptions
- devDependencies
- passwordStrength.ts
- Deployment (Hetzner Cloud / Ubuntu)
- Technik
- ServerDashboard.tsx
- Footer.tsx
- useActionForm
- EmailBodyField.tsx
- berlinTime.ts
- ProfileSummary.tsx
- iban.ts
- Konten
- MailForm.tsx
- EditUserForm.tsx
- feature-flags/page.tsx
- userService.ts
- Betrieb: Checkliste für den Produktionsserver
- EditUserForm
- dashboard/kontakt/actions.ts
- securityLabels.ts
- ApplicationWizard.tsx
- authz.ts
- heliFlight.test.ts
- userUpdateData.ts
- sepa.ts
- Site.tsx
- scripts
- Technische Dokumentation
- isFeatureEnabled
- MailForm
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
- server/actions.ts
- securityEventService.ts
- Button.tsx
- { GET, POST }
- BulkImport.tsx
- Inhalte der Website
- bulkCreateUsersAction
- DebugBar.tsx
- countries.ts
- EmailComposerDialog
- MarkdownViewer.tsx
- RateLimitTable
- ActivityHeatmap.tsx
- index.ts
- RegistrationFunnel.tsx
- app/layout.tsx
- formatNumber
- generate-icons.ts
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
3. `@hugeicons/core-free-icons` - 91 edges
4. `@hugeicons/react` - 91 edges
5. `AppError` - 91 edges
6. `react` - 81 edges
7. `executeAction()` - 77 edges
8. `requireAdmin()` - 61 edges
9. `Button()` - 51 edges
10. `isFeatureEnabled()` - 51 edges

## Surprising Connections (you probably didn't know these)
- `Befunde vom 2026-10-20` --references--> `siteUrl()`  [INFERRED]
  BETRIEB.md → src/lib/server/siteUrl.ts
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  ENTWICKLUNG.md → src/lib/server/services/boardService.ts
- `submit()` --calls--> `submitApplication()`  [EXTRACTED]
  tests/db/membership.test.ts → src/lib/server/services/membershipService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts

## Import Cycles
- None detected.

## Communities (116 total, 16 thin omitted)

### Community 0 - "executeAction"
Cohesion: 0.09
Nodes (50): zod, setOwnNewsletterAction(), EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), revealKosmosContactAction(), setKosmosVisibilityAction(), parseMailForm() (+42 more)

### Community 2 - "next"
Cohesion: 0.11
Nodes (23): nextConfig, next, DeletePostButton(), metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, dynamic (+15 more)

### Community 3 - "mailService.ts"
Cohesion: 0.05
Nodes (59): sanitize-html, blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature, nl2br(), renderBlocksEditorHtml() (+51 more)

### Community 4 - "boardService.ts"
Cohesion: 0.13
Nodes (28): EditBoardMemberPage(), moveMemberOrder(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember(), deleteMemberById() (+20 more)

### Community 5 - "feeService.ts"
Cohesion: 0.19
Nodes (17): SepaDebtorAddress, clearFeeAmountOverride(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), setStudentYear(), updateFeeComment(), upsertFeeAmount() (+9 more)

### Community 6 - "DirectoryTable.tsx"
Cohesion: 0.12
Nodes (21): AddFeeYearCard(), DialogButton(), AmountDialog(), chipTones, DirectoryAccount, explainFee(), GROUPS, SortKey (+13 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.09
Nodes (35): ref_node_fs, ref_node_os, GET(), triggerDeploy(), ServerPage(), BackupRun, BackupStatus, cpuPercent() (+27 more)

### Community 8 - "anleitungen/README.md"
Cohesion: 0.36
Nodes (3): Anleitungen für Admins, Einstieg, Gut zu wissen

### Community 9 - "blogService.ts"
Cohesion: 0.05
Nodes (71): sharp, POST(), BlogIndexPage(), beginImageAction(), createDraft(), deleteBlogImage(), deletePost(), moveBlogImage() (+63 more)

### Community 10 - "app/termine/[id]/page.tsx"
Cohesion: 0.11
Nodes (35): escapeXml(), GET(), generateMetadata(), Props, PublicBlogPost(), generateMetadata(), LeadPost(), MetaLine() (+27 more)

### Community 11 - "events.ts"
Cohesion: 0.13
Nodes (30): DashboardEvent, UpcomingEventAlert(), EventCard(), EventCardData, EventDateCube(), EventFacts(), EventFeature(), TIME_ZONE (+22 more)

### Community 12 - "ics.ts"
Cohesion: 0.17
Nodes (18): RFC-5545, GET(), eventLinkLabel(), icsEnd(), addDays(), berlinDateStamp(), buildEventIcs(), calendar() (+10 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.12
Nodes (30): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), deriv() (+22 more)

### Community 14 - "prisma.ts"
Cohesion: 0.11
Nodes (29): bcryptjs, server-only, submitContactRequest(), AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers (+21 more)

### Community 15 - "zertifikat/pdf/route.ts"
Cohesion: 0.16
Nodes (24): GET(), DashboardPage(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative() (+16 more)

### Community 16 - "package.json"
Cohesion: 0.08
Nodes (24): eslintConfig, name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler (+16 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "app/kontakt/page.tsx"
Cohesion: 0.14
Nodes (14): ContactForm(), dynamic, KontaktPage(), metadata, createLoginChallenge(), LoginForm(), dynamic, LoginPage() (+6 more)

### Community 19 - "mail/page.tsx"
Cohesion: 0.14
Nodes (16): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage() (+8 more)

### Community 20 - "schemas.ts"
Cohesion: 0.05
Nodes (46): toCountryCode(), isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, applicationPersonSchema (+38 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "feeCalculation.ts"
Cohesion: 0.15
Nodes (23): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), ApplicationWizard(), currentFormValues() (+15 more)

### Community 23 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.25
Nodes (6): Datenschutz und Sicherheit, Für Besucher:innen, Für den Vorstand, Für Mitglieder, Weiterlesen, WirtschaftsPhysik Alumni e. V. — Vereinswebsite

### Community 24 - "DirectoryTable"
Cohesion: 0.09
Nodes (27): CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), MemberDirectory(), setFilter() (+19 more)

### Community 25 - "mitglied-werden/actions.ts"
Cohesion: 0.12
Nodes (33): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), MembershipApplicationsPage(), submitMembershipApplication(), withdrawMembershipApplication(), membershipApplicationNoticeMessage(), membershipApprovedMessage() (+25 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (13): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+5 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "membership.ts"
Cohesion: 0.12
Nodes (26): setStudentEndYearAction(), StudentStatusEditor(), ageAt(), changedStudentYears(), CONSENT_VERSION, currentStudentEndYear(), DATENSCHUTZ_URL, formatYearRanges() (+18 more)

### Community 29 - "Beiträge"
Cohesion: 0.20
Nodes (10): Ausnahme (abweichender Betrag), Beitragsjahr hinzufügen, Beitragssätze, Beiträge, Hinweis „Erst x von y Mitgliedern haben einen Beitragseintrag“, SEPA-Lastschrift, So rechnet die Website, Sonderstatus umschalten (+2 more)

### Community 30 - "satzung/page.tsx"
Cohesion: 0.14
Nodes (19): UserManagementPage(), dynamic, metadata, SatzungPage(), SATZUNG, FeeDefaultEntry, FeeRates, resolveFeeDefault() (+11 more)

### Community 31 - "contact.ts"
Cohesion: 0.24
Nodes (7): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ContactInput, scoreSpam(), SPAM_KEYWORDS, legitimate

### Community 32 - "campus-plan.py"
Cohesion: 0.10
Nodes (29): datetime, json, math, pathlib, re, d(), main(), outer_rings() (+21 more)

### Community 33 - "bestaetigen/page.tsx"
Cohesion: 0.13
Nodes (18): confirmPrivacyPolicy(), metadata, Props, DATENSCHUTZ, DATENSCHUTZ_VERSION, metadata, impressum(), ImpressumPage() (+10 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (24): CLOUDS, Contact, KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField() (+16 more)

### Community 35 - "dashboard/page.tsx"
Cohesion: 0.06
Nodes (33): ContactRequestItem, ContactRequestList(), confirmDelete(), run(), dateFormat, MailSuccessDialog(), MembershipCertificateCard(), dynamic (+25 more)

### Community 36 - "@hugeicons/core-free-icons"
Cohesion: 0.18
Nodes (17): @hugeicons/core-free-icons, @hugeicons/react, react, ActionResult, Mode, DeleteMemberSectionProps, PhotoMeta, FeatureDisabledDialog() (+9 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "passwordStrength.ts"
Cohesion: 0.21
Nodes (10): NewUserForm(), handleSubmit(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 40 - "Deployment (Hetzner Cloud / Ubuntu)"
Cohesion: 0.29
Nodes (7): Automatische Updates bei jedem Git Push (GitHub Actions), Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, nginx als Reverse Proxy, Option 1: Automatischer Einzeiler über deinen lokalen Rechner (Empfohlen), Option 2: Manuelles Ausführen auf dem Server

### Community 41 - "Technik"
Cohesion: 0.20
Nodes (9): Backup, Debug-Modus, Deploy, Feature Flags, Notfall-Rezepte, Rate-Limit-Sperre aufheben, Server, Sicherheit (+1 more)

### Community 42 - "ServerDashboard.tsx"
Cohesion: 0.24
Nodes (8): BackupHistory(), BackupSection(), DeploySection(), formatUptime(), Sample, ServerDashboard(), timeLabel(), formatBytes()

### Community 43 - "Footer.tsx"
Cohesion: 0.20
Nodes (9): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString(), getDisabledPages, config (+1 more)

### Community 44 - "useActionForm"
Cohesion: 0.07
Nodes (41): next-auth, EmailChangeForm(), PasswordChangeButton(), dynamic, metadata, StudentStatusPrompt(), EventFormData, ForgotPasswordPage() (+33 more)

### Community 45 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 46 - "berlinTime.ts"
Cohesion: 0.18
Nodes (20): EventForm(), toggleAllDay(), toDateTimeValue(), toDayValue(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay() (+12 more)

### Community 47 - "ProfileSummary.tsx"
Cohesion: 0.31
Nodes (8): getStatusIcon(), ProfileSummary(), ProfileSummaryUser, display(), EntryDetails(), EntryRow(), formatStatus(), getStatusTone()

### Community 48 - "iban.ts"
Cohesion: 0.19
Nodes (25): field(), POST(), ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban() (+17 more)

### Community 49 - "Konten"
Cohesion: 0.22
Nodes (9): Benutzerverwaltung, Konten, Konto bearbeiten, Konto löschen, Konto von Hand anlegen, Login sperren, Suche und Filter, Symbole und Badges am Namen (+1 more)

### Community 50 - "MailForm.tsx"
Cohesion: 0.12
Nodes (14): MailAnnouncement, MAIL_KINDS, MailFormProps, MailKind, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS (+6 more)

### Community 51 - "EditUserForm.tsx"
Cohesion: 0.09
Nodes (18): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP (+10 more)

### Community 52 - "feature-flags/page.tsx"
Cohesion: 0.22
Nodes (11): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), metadata, removeRateLimitEntry(), isFeatureFlagKey(), requireDebugAdmin() (+3 more)

### Community 53 - "userService.ts"
Cohesion: 0.10
Nodes (44): ref_crypto, ref_node_net, GET(), POST(), RFC-8058, requestPasswordReset(), resendVerificationEmail(), registerUser() (+36 more)

### Community 54 - "Betrieb: Checkliste für den Produktionsserver"
Cohesion: 0.29
Nodes (7): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (6): markContactRequestHandled(), removeContactRequest(), ContactRequestsPage(), deleteContactRequest(), getContactRequests(), setContactRequestHandled()

### Community 57 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 58 - "ApplicationWizard.tsx"
Cohesion: 0.10
Nodes (22): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, hasControlChars(), addAddressIssues(), addStudyIssues() (+14 more)

### Community 59 - "authz.ts"
Cohesion: 0.20
Nodes (17): GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, DebugBar(), Header(), AS_MEMBER_COOKIE (+9 more)

### Community 60 - "heliFlight.test.ts"
Cohesion: 0.15
Nodes (20): CampusPlan(), Helicopter(), HINTS, hitsContent(), KEYS, PauseOffscreen(), approach(), Bounds (+12 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "sepa.ts"
Cohesion: 0.27
Nodes (11): agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isValidCreditorId(), isValidMandateId(), postalAddress(), SepaCreditor (+3 more)

### Community 63 - "Site.tsx"
Cohesion: 0.11
Nodes (17): facts, metadata, metadata, dynamic, metadata, SearchParams, ViewSwitch(), metadata (+9 more)

### Community 64 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, dev, icons, lint, start, test, test:db (+1 more)

### Community 65 - "Technische Dokumentation"
Cohesion: 0.12
Nodes (17): Admin-Dashboard, Authentifizierung & Konten, Backup & Wiederherstellung, Datenbankmodell, Feature Flags, Funktionen im Detail, Inhalt, Mitgliederbereich (`/dashboard`) (+9 more)

### Community 66 - "isFeatureEnabled"
Cohesion: 0.12
Nodes (25): @prisma/client, POST(), KontoPage(), deleteUserAction(), EditUserPage(), metadata, updateUser(), FEATURE_FLAG_CATEGORIES (+17 more)

### Community 67 - "MailForm"
Cohesion: 0.29
Nodes (4): byStatusThenName(), MailForm(), handleSubmit(), readForm()

### Community 68 - "app/page.tsx"
Cohesion: 0.13
Nodes (13): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline(), levels, STRIP_IDS (+5 more)

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
Nodes (37): EditBlogPage(), createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), AdminEventsPage(), UPCOMING_ALERT_MONTHS, createEvent() (+29 more)

### Community 77 - "mitglied-werden/page.tsx"
Cohesion: 0.14
Nodes (20): ConfirmPrivacyPolicyPage(), JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput() (+12 more)

### Community 78 - "boardImages.ts"
Cohesion: 0.25
Nodes (6): ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, ProcessedBoardPhoto, QUALITY_LADDER

### Community 79 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

### Community 81 - "Mitgliedschaft"
Cohesion: 0.33
Nodes (6): Ablauf einer Aufnahme, Antrag bearbeiten, Austritt von Hand eintragen, Austritte, Mitgliedschaft, Studierendenstatus

### Community 82 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "server/actions.ts"
Cohesion: 0.27
Nodes (10): GET(), message(), requestBackupLink(), backupLinkMessage(), createPrismaClient(), getDatabaseUrl(), dumpDatabase(), BACKUP_LINK_MINUTES (+2 more)

### Community 86 - "securityEventService.ts"
Cohesion: 0.20
Nodes (14): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview(), HeatCell (+6 more)

### Community 87 - "Button.tsx"
Cohesion: 0.25
Nodes (7): ButtonColor, ButtonLinkProps, ButtonProps, ButtonSize, ButtonVariant, colorClasses, sizeClasses

### Community 89 - "BulkImport.tsx"
Cohesion: 0.16
Nodes (13): ImportIssue, ImportRowResult, FALSE_BY_DEFAULT, ImportReport, EXAMPLE, FEE_FIELDS, FEES_EXAMPLE, IMPORT_EXCLUDED_FIELDS (+5 more)

### Community 91 - "Inhalte der Website"
Cohesion: 0.40
Nodes (5): Bilder, Blog, Inhalte der Website, Termine, Vorstand und Signatur

### Community 92 - "bulkCreateUsersAction"
Cohesion: 0.60
Nodes (6): bulkCreateUsersAction(), BulkImport(), check(), create(), loadFile(), replaceEntry()

### Community 93 - "DebugBar.tsx"
Cohesion: 0.19
Nodes (9): ref_node_child_process, ref_node_util, commit, LINKS, TIME, DebugConsole(), AppLogs, ADMIN_SESSION_MAX_MS (+1 more)

### Community 94 - "countries.ts"
Cohesion: 0.13
Nodes (19): @react-pdf/renderer, GET(), SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS (+11 more)

### Community 95 - "EmailComposerDialog"
Cohesion: 0.47
Nodes (6): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose(), handleSubmit(), readForm()

### Community 96 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

### Community 97 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 98 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 99 - "index.ts"
Cohesion: 0.10
Nodes (35): CtaCard(), NewsletterRow(), NewsletterSection(), useOwnNewsletter(), InfoTooltip(), dynamic, metadata, RateLimitTableProps (+27 more)

### Community 100 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 101 - "app/layout.tsx"
Cohesion: 0.10
Nodes (15): DashboardLayout(), metadata, src_app_globals, body, metadata, mono, serif, alt (+7 more)

### Community 102 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 103 - "generate-icons.ts"
Cohesion: 0.67
Nodes (3): BACKGROUND, icon(), main()

### Community 104 - "TypeSparklines.tsx"
Cohesion: 0.38
Nodes (6): sparkGeometry, typeHint(), SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 105 - "BoardPhotoUploader"
Cohesion: 0.28
Nodes (9): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), AdminBoardPage(), getInitials(), VorstandPage(), boardPhotoUrl() (+1 more)

### Community 106 - "ref_node_test"
Cohesion: 0.16
Nodes (14): ref_node_assert, ref_node_test, input, joinedAt, submit(), createMember(), createUser(), dbName (+6 more)

### Community 108 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 119 - "AppError"
Cohesion: 0.13
Nodes (33): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), signOut, EmailMessage, accountDeletedMessage() (+25 more)

### Community 122 - "guides.tsx"
Cohesion: 0.25
Nodes (12): anchoredHeading(), components, findGuide(), GuideMarkdown(), GUIDES, readGuide(), slugify(), textOf() (+4 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **531 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+526 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 672 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `executeAction`, `forgot-password/layout.tsx`, `DirectoryTable.tsx`, `serverStatus.ts`, `blogService.ts`, `app/termine/[id]/page.tsx`, `events.ts`, `ics.ts`, `prisma.ts`, `zertifikat/pdf/route.ts`, `package.json`, `app/kontakt/page.tsx`, `mail/page.tsx`, `mitglied-werden/actions.ts`, `gravityPhysics.ts`, `satzung/page.tsx`, `bestaetigen/page.tsx`, `KosmosTimeline.tsx`, `dashboard/page.tsx`, `@hugeicons/core-free-icons`, `Footer.tsx`, `useActionForm`, `ProfileSummary.tsx`, `iban.ts`, `MailForm.tsx`, `EditUserForm.tsx`, `feature-flags/page.tsx`, `userService.ts`, `dashboard/kontakt/actions.ts`, `ApplicationWizard.tsx`, `authz.ts`, `Site.tsx`, `isFeatureEnabled`, `app/page.tsx`, `eventService.ts`, `mitglied-werden/page.tsx`, `getOptionalUser`, `server/actions.ts`, `Button.tsx`, `DebugBar.tsx`, `countries.ts`, `index.ts`, `app/layout.tsx`, `login/layout.tsx`, `abmelden/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`, `AppError`, `guides.tsx`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/core-free-icons` to `next`, `DirectoryTable.tsx`, `blogService.ts`, `app/termine/[id]/page.tsx`, `MarketDiffusion.tsx`, `package.json`, `gravityPhysics.ts`, `membership.ts`, `bestaetigen/page.tsx`, `KosmosTimeline.tsx`, `dashboard/page.tsx`, `ServerDashboard.tsx`, `Footer.tsx`, `useActionForm`, `iban.ts`, `MailForm.tsx`, `EditUserForm.tsx`, `feature-flags/page.tsx`, `ApplicationWizard.tsx`, `authz.ts`, `heliFlight.test.ts`, `Site.tsx`, `isFeatureEnabled`, `app/page.tsx`, `eventService.ts`, `altcha.d.ts`, `BulkImport.tsx`, `DebugBar.tsx`, `index.ts`, `app/layout.tsx`, `guides.tsx`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `siteUrl()` connect `userService.ts` to `mailService.ts`, `events.ts`, `ics.ts`, `prisma.ts`, `server/actions.ts`, `Betrieb: Checkliste für den Produktionsserver`, `mitglied-werden/actions.ts`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _531 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `executeAction` be split into smaller, more focused modules?**
  _Cohesion score 0.09370199692780339 - nodes in this community are weakly interconnected._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.1064102564102564 - nodes in this community are weakly interconnected._