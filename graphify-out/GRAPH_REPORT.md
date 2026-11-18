# Graph Report - wiphy  (2026-11-17)

## Corpus Check
- 413 files · ~204,184 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2332 nodes · 7635 edges · 120 communities (103 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 63 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f20bccf8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- executeAction
- forgot-password/layout.tsx
- next
- ics.ts
- boardService.ts
- feeService.ts
- DirectoryTable.tsx
- serverStatus.ts
- anleitungen/README.md
- blogService.ts
- formatDate
- events.ts
- mailService.ts
- MarketDiffusion.tsx
- prisma
- userService.ts
- package.json
- dependencies
- login/page.tsx
- format.ts
- schemas.ts
- opengraph-image.tsx
- zahlungen/page.tsx
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- MemberDirectory.tsx
- membershipService.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- ApplicationWizard.tsx
- Beiträge
- users/page.tsx
- isFeatureEnabled
- campus-plan.py
- satzung/page.tsx
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
- HeaderChrome.tsx
- ProfileSummary.tsx
- iban.ts
- Konten
- MailForm.tsx
- EditUserForm.tsx
- AppError
- rateLimit.ts
- Betrieb: Checkliste für den Produktionsserver
- EditUserForm
- dashboard/kontakt/actions.ts
- requireUser
- membershipFormSchemas.ts
- authz.ts
- heliFlight.test.ts
- userUpdateData.ts
- sepa.ts
- Site.tsx
- scripts
- Technische Dokumentation
- featureFlagService.ts
- MailForm
- app/page.tsx
- newsletterToken.ts
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
- errors.ts
- Mitgliedschaft
- altcha.d.ts
- postcss.config.mjs
- prisma.ts
- security/page.tsx
- sendEmail
- { GET, POST }
- BulkImport.tsx
- Inhalte der Website
- bulkCreateUsersAction
- sessionPolicy.test.ts
- countries.ts
- EmailComposerDialog
- konto/actions.ts
- RateLimitTable
- ActivityHeatmap.tsx
- index.ts
- mailHistory.ts
- app/layout.tsx
- formatNumber
- rundmail.test.ts
- getMemberForEdit
- BoardPhotoUploader
- ref_node_test
- mailPhotoProcessing.ts
- ApplicationList
- login/layout.tsx
- abmelden/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- server-only-stub.cjs
- MarkdownEditor.tsx
- moveMember
- DebugConsole.tsx
- AGENTS.md
- messages.ts
- guides.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 134 edges
2. `cn()` - 97 edges
3. `AppError` - 97 edges
4. `@hugeicons/core-free-icons` - 91 edges
5. `@hugeicons/react` - 91 edges
6. `react` - 81 edges
7. `executeAction()` - 79 edges
8. `requireAdmin()` - 63 edges
9. `Button()` - 51 edges
10. `isFeatureEnabled()` - 51 edges

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

## Communities (120 total, 17 thin omitted)

### Community 0 - "executeAction"
Cohesion: 0.12
Nodes (42): beginImageAction(), createDraft(), deleteBlogImage(), deletePost(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), savePost() (+34 more)

### Community 2 - "next"
Cohesion: 0.09
Nodes (25): nextConfig, @hugeicons/react, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+17 more)

### Community 3 - "ics.ts"
Cohesion: 0.08
Nodes (43): RFC-5545, GET(), GET(), blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailMessage (+35 more)

### Community 4 - "boardService.ts"
Cohesion: 0.17
Nodes (20): POST(), processBoardPhoto(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember(), deleteMemberById() (+12 more)

### Community 5 - "feeService.ts"
Cohesion: 0.13
Nodes (25): StudentStatusEditor(), changedStudentYears(), currentStudentEndYear(), formatYearRanges(), studentEndYearOptions(), studentStatusEndsAfter(), withStudentEndYear(), clearFeeAmountOverride() (+17 more)

### Community 6 - "DirectoryTable.tsx"
Cohesion: 0.11
Nodes (20): AmountDialog(), chipTones, CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName() (+12 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.10
Nodes (32): ref_node_os, GET(), ServerPage(), BackupRun, BackupStatus, cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS (+24 more)

### Community 8 - "anleitungen/README.md"
Cohesion: 0.36
Nodes (3): Anleitungen für Admins, Einstieg, Gut zu wissen

### Community 9 - "blogService.ts"
Cohesion: 0.05
Nodes (61): sharp, BACKGROUND, icon(), main(), POST(), BlogIndexPage(), BlogImageManager(), handleDrop() (+53 more)

### Community 10 - "formatDate"
Cohesion: 0.14
Nodes (27): escapeXml(), GET(), generateMetadata(), Props, PublicBlogPost(), generateMetadata(), LeadPost(), MetaLine() (+19 more)

### Community 11 - "events.ts"
Cohesion: 0.11
Nodes (39): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard() (+31 more)

### Community 12 - "mailService.ts"
Cohesion: 0.11
Nodes (40): sanitize-html, parseMailForm(), prepareMail(), previewRundmailAction(), requireMatchingPreview(), sendEmailAction(), sendTestMailAction(), sepaDebits() (+32 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.12
Nodes (30): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), deriv() (+22 more)

### Community 14 - "prisma"
Cohesion: 0.15
Nodes (20): registerUser(), AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError (+12 more)

### Community 15 - "userService.ts"
Cohesion: 0.20
Nodes (18): EditUserPage(), deleteUserById(), findUserById(), findUserByMemberNumberExcludingUser(), updateUserById(), deleteAccountWithoutMembership(), getOpenFees(), berlinToday() (+10 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): eslintConfig, name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "login/page.tsx"
Cohesion: 0.33
Nodes (5): dynamic, LoginPage(), metadata, NOTICES, Props

### Community 19 - "format.ts"
Cohesion: 0.09
Nodes (28): AdminBlogPage(), MailDashboard(), MailHistoryEntry, MailPostOption, dynamic, groupLabel(), MailDashboardPage(), metadata (+20 more)

### Community 20 - "schemas.ts"
Cohesion: 0.04
Nodes (43): isCalendarDate(), absent(), AdminCreateUserInput, berlinDateTime(), blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema (+35 more)

### Community 21 - "opengraph-image.tsx"
Cohesion: 0.20
Nodes (7): dotenv, ref_node_fs, ref_node_path, prisma, alt, contentType, size

### Community 22 - "zahlungen/page.tsx"
Cohesion: 0.13
Nodes (27): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), dynamic, metadata, ZahlungenPage() (+19 more)

### Community 23 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.25
Nodes (6): Datenschutz und Sicherheit, Für Besucher:innen, Für den Vorstand, Für Mitglieder, Weiterlesen, WirtschaftsPhysik Alumni e. V. — Vereinswebsite

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.13
Nodes (22): DirectoryAccount, MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase, DirectoryFilters, EMPTY_FILTERS, FILTER_VALUES (+14 more)

### Community 25 - "membershipService.ts"
Cohesion: 0.14
Nodes (26): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), MembershipApplicationsPage(), membershipApprovedMessage(), membershipRejectedMessage(), planApplicationFees(), countOpenApplications() (+18 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.15
Nodes (19): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+11 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (27): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, ageAt(), CONSENT_VERSION, DATENSCHUTZ_URL (+19 more)

### Community 29 - "Beiträge"
Cohesion: 0.20
Nodes (10): Ausnahme (abweichender Betrag), Beitragsjahr hinzufügen, Beitragssätze, Beiträge, Hinweis „Erst x von y Mitgliedern haben einen Beitragseintrag“, SEPA-Lastschrift, So rechnet die Website, Sonderstatus umschalten (+2 more)

### Community 30 - "users/page.tsx"
Cohesion: 0.15
Nodes (21): AddFeeYearCard(), DialogButton(), metadata, StatTile(), UserManagementPage(), FeeDefaultEntry, FeeRates, resolveFeeDefault() (+13 more)

### Community 31 - "isFeatureEnabled"
Cohesion: 0.17
Nodes (17): ContactRequestsPage(), submitContactRequest(), submitMembershipApplication(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), membershipApplicationNoticeMessage() (+9 more)

### Community 32 - "campus-plan.py"
Cohesion: 0.10
Nodes (29): datetime, json, math, pathlib, re, d(), main(), outer_rings() (+21 more)

### Community 33 - "satzung/page.tsx"
Cohesion: 0.13
Nodes (17): metadata, impressum(), ImpressumPage(), metadata, dynamic, metadata, SATZUNG, anchorOf() (+9 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (24): CLOUDS, Contact, KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField() (+16 more)

### Community 35 - "dashboard/page.tsx"
Cohesion: 0.10
Nodes (15): CtaCard(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog(), SectionHeader(), LogoutButton(), buttonClasses() (+7 more)

### Community 36 - "@hugeicons/core-free-icons"
Cohesion: 0.11
Nodes (24): @hugeicons/core-free-icons, react, DeletePostButton(), ContactRequestItem, dateFormat, NewsletterRow(), NewsletterSection(), useOwnNewsletter() (+16 more)

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
Cohesion: 0.31
Nodes (5): ContrastToggle(), columns, legalLinks, GravityTrigger(), PluckedString()

### Community 44 - "useActionForm"
Cohesion: 0.07
Nodes (41): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, EmailChangeForm(), PasswordChangeButton(), StudentStatusPrompt(), ForgotPasswordPage(), ContactForm() (+33 more)

### Community 45 - "EmailBodyField.tsx"
Cohesion: 0.24
Nodes (7): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailBodyField(), EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 46 - "HeaderChrome.tsx"
Cohesion: 0.33
Nodes (6): allLinks, HeaderChrome(), ThemeToggle(), useSwipeToClose(), end(), offset()

### Community 47 - "ProfileSummary.tsx"
Cohesion: 0.31
Nodes (8): getStatusIcon(), ProfileSummary(), ProfileSummaryUser, display(), EntryDetails(), EntryRow(), formatStatus(), getStatusTone()

### Community 48 - "iban.ts"
Cohesion: 0.22
Nodes (21): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+13 more)

### Community 49 - "Konten"
Cohesion: 0.22
Nodes (9): Benutzerverwaltung, Konten, Konto bearbeiten, Konto löschen, Konto von Hand anlegen, Login sperren, Suche und Filter, Symbole und Badges am Namen (+1 more)

### Community 50 - "MailForm.tsx"
Cohesion: 0.09
Nodes (22): Choice, ChoiceCards(), MailEventOption, MailFormProps, MailFormSetup, MailUserOption, Salutation, STATUS_ORDER (+14 more)

### Community 51 - "EditUserForm.tsx"
Cohesion: 0.08
Nodes (24): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue() (+16 more)

### Community 52 - "AppError"
Cohesion: 0.19
Nodes (16): setStudentEndYearAction(), setFeatureFlag(), removeRateLimitEntry(), requestBackupLink(), triggerDeploy(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw() (+8 more)

### Community 53 - "rateLimit.ts"
Cohesion: 0.14
Nodes (24): ref_crypto, ref_node_net, createLoginChallenge(), resendVerificationEmail(), LoginForm(), resetPassword(), resetSchema, passwordChangedNoticeMessage() (+16 more)

### Community 54 - "Betrieb: Checkliste für den Produktionsserver"
Cohesion: 0.29
Nodes (7): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (7): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), deleteContactRequest(), setContactRequestHandled()

### Community 57 - "requireUser"
Cohesion: 0.22
Nodes (16): revealKosmosContactAction(), setKosmosVisibilityAction(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), deleteUserAction() (+8 more)

### Community 58 - "membershipFormSchemas.ts"
Cohesion: 0.11
Nodes (25): hasControlChars(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, addAddressIssues(), addStudyIssues() (+17 more)

### Community 59 - "authz.ts"
Cohesion: 0.13
Nodes (25): ref_node_child_process, ref_node_util, GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage(), auth (+17 more)

### Community 60 - "heliFlight.test.ts"
Cohesion: 0.15
Nodes (20): CampusPlan(), Helicopter(), HINTS, hitsContent(), KEYS, PauseOffscreen(), approach(), Bounds (+12 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "sepa.ts"
Cohesion: 0.22
Nodes (17): field(), POST(), TIME_ZONE, agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+9 more)

### Community 63 - "Site.tsx"
Cohesion: 0.11
Nodes (16): facts, metadata, metadata, dynamic, metadata, SearchParams, TerminePage(), ViewSwitch() (+8 more)

### Community 64 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, dev, icons, lint, start, test, test:db (+1 more)

### Community 65 - "Technische Dokumentation"
Cohesion: 0.12
Nodes (17): Admin-Dashboard, Authentifizierung & Konten, Backup & Wiederherstellung, Datenbankmodell, Feature Flags, Funktionen im Detail, Inhalt, Mitgliederbereich (`/dashboard`) (+9 more)

### Community 66 - "featureFlagService.ts"
Cohesion: 0.18
Nodes (11): adapter, prisma, bcryptjs, @prisma/adapter-pg, @prisma/client, FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS (+3 more)

### Community 67 - "MailForm"
Cohesion: 0.18
Nodes (11): byStatusThenName(), MailForm(), addPhotos(), buildFormData(), changeTemplate(), defaultSubject(), runPreview(), send() (+3 more)

### Community 68 - "app/page.tsx"
Cohesion: 0.10
Nodes (17): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline(), levels, STRIP_IDS (+9 more)

### Community 69 - "newsletterToken.ts"
Cohesion: 0.23
Nodes (12): GET(), POST(), RFC-8058, setOwnNewsletterAction(), setNewsletterByTokenAction(), createNewsletterToken(), key(), NEWSLETTER_UNSUBSCRIBE_PATH (+4 more)

### Community 71 - "Kommunikation"
Cohesion: 0.33
Nodes (6): Kommunikation, Kontaktanfragen, Newsletter oder Mitteilung?, Platzhalter, Rundmail verschicken, Zu einem Termin einladen

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.06
Nodes (68): GET(), DashboardPage(), EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay() (+60 more)

### Community 77 - "mitglied-werden/page.tsx"
Cohesion: 0.17
Nodes (15): JourneyRail(), ApplicationStage(), dynamic, metadata, Props, toDateInput(), JOURNEY_STEPS, JourneyStage (+7 more)

### Community 78 - "boardImages.ts"
Cohesion: 0.25
Nodes (6): ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, ProcessedBoardPhoto, QUALITY_LADDER

### Community 79 - "getOptionalUser"
Cohesion: 0.17
Nodes (15): GET(), GET(), GET(), confirmPrivacyPolicy(), ConfirmPrivacyPolicyPage(), metadata, Props, DATENSCHUTZ (+7 more)

### Community 80 - "errors.ts"
Cohesion: 0.18
Nodes (9): zod, getRedirectTarget(), isRedirectError(), RedirectTarget, describeSendError(), sendEach(), SmtpError, AppErrorCode (+1 more)

### Community 81 - "Mitgliedschaft"
Cohesion: 0.33
Nodes (6): Ablauf einer Aufnahme, Antrag bearbeiten, Austritt von Hand eintragen, Austritte, Mitgliedschaft, Studierendenstatus

### Community 82 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "prisma.ts"
Cohesion: 0.14
Nodes (21): server-only, GET(), message(), dynamic, KontaktPage(), metadata, createPrismaClient(), globalForPrisma (+13 more)

### Community 86 - "security/page.tsx"
Cohesion: 0.10
Nodes (35): dynamic, metadata, SecurityPage(), ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel() (+27 more)

### Community 87 - "sendEmail"
Cohesion: 0.33
Nodes (10): notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), getMailTransporter(), normalize(), Recipients, sendEmail() (+2 more)

### Community 89 - "BulkImport.tsx"
Cohesion: 0.16
Nodes (13): ImportIssue, ImportRowResult, FALSE_BY_DEFAULT, ImportReport, EXAMPLE, FEE_FIELDS, FEES_EXAMPLE, IMPORT_EXCLUDED_FIELDS (+5 more)

### Community 91 - "Inhalte der Website"
Cohesion: 0.40
Nodes (5): Bilder, Blog, Inhalte der Website, Termine, Vorstand und Signatur

### Community 92 - "bulkCreateUsersAction"
Cohesion: 0.60
Nodes (6): bulkCreateUsersAction(), BulkImport(), check(), create(), loadFile(), replaceEntry()

### Community 94 - "countries.ts"
Cohesion: 0.13
Nodes (20): @react-pdf/renderer, GET(), SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS (+12 more)

### Community 95 - "EmailComposerDialog"
Cohesion: 0.47
Nodes (6): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose(), handleSubmit(), readForm()

### Community 96 - "konto/actions.ts"
Cohesion: 0.29
Nodes (9): EMAIL_CHANGE_ERRORS, requestPasswordChange(), KontoPage(), updateUser(), requestPasswordReset(), passwordResetMessage(), createPasswordResetUrl(), getEditableUser() (+1 more)

### Community 97 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 98 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 99 - "index.ts"
Cohesion: 0.10
Nodes (33): metadata, InfoTooltip(), RateLimitTableProps, dynamic, metadata, FeeDefaultRow, Badge(), BadgeTone (+25 more)

### Community 100 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 101 - "app/layout.tsx"
Cohesion: 0.12
Nodes (16): DashboardLayout(), metadata, src_app_globals, body, metadata, mono, serif, InstallHint() (+8 more)

### Community 102 - "formatNumber"
Cohesion: 0.13
Nodes (17): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+9 more)

### Community 103 - "rundmail.test.ts"
Cohesion: 0.33
Nodes (6): GroupTarget, MAIL_TARGET_FILTERS, createPreviewToken(), key(), verifyPreviewToken(), people

### Community 104 - "getMemberForEdit"
Cohesion: 0.33
Nodes (6): EditBoardMemberPage(), getInitials(), VorstandPage(), getMemberForEdit(), getPublicMembers(), toBoardMember()

### Community 105 - "BoardPhotoUploader"
Cohesion: 0.38
Nodes (7): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), AdminBoardPage(), boardPhotoUrl(), formatBytes()

### Community 106 - "ref_node_test"
Cohesion: 0.20
Nodes (13): ref_node_assert, ref_node_test, submitApplication(), input, joinedAt, submit(), createMember(), createUser() (+5 more)

### Community 107 - "mailPhotoProcessing.ts"
Cohesion: 0.47
Nodes (4): MAIL_PHOTO_LIMITS, jpegName(), MailPhoto, processMailPhotos()

### Community 108 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 114 - "MarkdownEditor.tsx"
Cohesion: 0.50
Nodes (3): @uiw/react-markdown-preview, @uiw/react-md-editor, MDEditor

### Community 115 - "moveMember"
Cohesion: 0.50
Nodes (4): moveMemberOrder(), findAllMembers(), getAdminMembers(), moveMember()

### Community 119 - "messages.ts"
Cohesion: 0.27
Nodes (12): accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage(), exitMessage(), exitNoticeMessage(), greeting(), LINK_EXPIRY(), loginDisabledMessage() (+4 more)

### Community 122 - "guides.tsx"
Cohesion: 0.16
Nodes (15): react-markdown, remark-gfm, anchoredHeading(), components, findGuide(), GuideMarkdown(), GUIDES, readGuide() (+7 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **540 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+535 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 683 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `executeAction`, `forgot-password/layout.tsx`, `ics.ts`, `DirectoryTable.tsx`, `serverStatus.ts`, `formatDate`, `events.ts`, `mailService.ts`, `prisma`, `package.json`, `login/page.tsx`, `format.ts`, `opengraph-image.tsx`, `zahlungen/page.tsx`, `MemberDirectory.tsx`, `membershipService.ts`, `gravityPhysics.ts`, `ApplicationWizard.tsx`, `users/page.tsx`, `isFeatureEnabled`, `satzung/page.tsx`, `KosmosTimeline.tsx`, `dashboard/page.tsx`, `@hugeicons/core-free-icons`, `Footer.tsx`, `useActionForm`, `HeaderChrome.tsx`, `ProfileSummary.tsx`, `EditUserForm.tsx`, `AppError`, `rateLimit.ts`, `dashboard/kontakt/actions.ts`, `requireUser`, `authz.ts`, `sepa.ts`, `Site.tsx`, `featureFlagService.ts`, `app/page.tsx`, `newsletterToken.ts`, `eventService.ts`, `mitglied-werden/page.tsx`, `getOptionalUser`, `prisma.ts`, `security/page.tsx`, `sendEmail`, `countries.ts`, `konto/actions.ts`, `index.ts`, `app/layout.tsx`, `login/layout.tsx`, `abmelden/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`, `MarkdownEditor.tsx`, `guides.tsx`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/core-free-icons` to `next`, `DirectoryTable.tsx`, `blogService.ts`, `formatDate`, `MarketDiffusion.tsx`, `package.json`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `ApplicationWizard.tsx`, `users/page.tsx`, `satzung/page.tsx`, `KosmosTimeline.tsx`, `dashboard/page.tsx`, `ServerDashboard.tsx`, `Footer.tsx`, `useActionForm`, `HeaderChrome.tsx`, `iban.ts`, `MailForm.tsx`, `EditUserForm.tsx`, `authz.ts`, `heliFlight.test.ts`, `Site.tsx`, `featureFlagService.ts`, `app/page.tsx`, `eventService.ts`, `altcha.d.ts`, `BulkImport.tsx`, `index.ts`, `app/layout.tsx`, `MarkdownEditor.tsx`, `DebugConsole.tsx`, `guides.tsx`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Why does `siteUrl()` connect `rateLimit.ts` to `konto/actions.ts`, `ics.ts`, `newsletterToken.ts`, `mailService.ts`, `prisma`, `userService.ts`, `Betrieb: Checkliste für den Produktionsserver`, `membershipService.ts`, `isFeatureEnabled`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _540 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `executeAction` be split into smaller, more focused modules?**
  _Cohesion score 0.12329931972789115 - nodes in this community are weakly interconnected._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.09158186864014801 - nodes in this community are weakly interconnected._