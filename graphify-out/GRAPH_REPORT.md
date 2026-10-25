# Graph Report - wiphy  (2026-10-25)

## Corpus Check
- 361 files · ~173,734 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2069 nodes · 6826 edges · 97 communities (84 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `43fe8529`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- forgot-password/layout.tsx
- sepa.ts
- index.ts
- mitglied-werden/page.tsx
- boardService.ts
- authz.ts
- AppError
- serverStatus.ts
- userService.ts
- blogService.ts
- app/kontakt/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- formatNumber
- LegalPage.tsx
- package.json
- dependencies
- executeAction
- auth.ts
- schemas.ts
- seed.ts
- dashboard/page.tsx
- lib/siteUrl.ts
- DirectoryTable
- securityEventService.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- feeService.ts
- DebugBar.tsx
- countries.ts
- iban.ts
- convert_alumni.py
- BoardPhotoUploader
- KosmosTimeline.tsx
- app/layout.tsx
- Betrieb: Checkliste für den Produktionsserver
- compilerOptions
- devDependencies
- next
- Button.tsx
- sendEmail
- mail/page.tsx
- passwordStrength.ts
- Callout
- ApplicationWizard.tsx
- mailService.ts
- messages.ts
- redirectError.ts
- format.ts
- EmailBodyField.tsx
- ApplicationList
- cn
- securityLabels.ts
- isFeatureEnabled
- EditUserForm
- photo/route.ts
- MarkdownViewer.tsx
- berlinTime.ts
- featureFlagService.ts
- Footer.tsx
- userUpdateData.ts
- RateLimitTable
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- mitglied-werden/actions.ts
- BulkImport.tsx
- @hugeicons/react
- formatDate
- CLAUDE.md
- Deployment (Hetzner Cloud / Ubuntu)
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- zahlungen/page.tsx
- contact.ts
- TypeSparklines.tsx
- altcha.d.ts
- DeleteMemberSection
- ActivityHeatmap.tsx
- postcss.config.mjs
- SecurityPage
- opengraph-image.tsx
- ref_node_assert
- { GET, POST }
- RegistrationFunnel.tsx
- PhysicsTimeline.tsx
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- eslint.config.mjs
- getAdminMembers

## God Nodes (most connected - your core abstractions)
1. `next` - 123 edges
2. `cn()` - 89 edges
3. `AppError` - 86 edges
4. `@hugeicons/core-free-icons` - 84 edges
5. `@hugeicons/react` - 84 edges
6. `react` - 73 edges
7. `executeAction()` - 73 edges
8. `requireAdmin()` - 56 edges
9. `isFeatureEnabled()` - 50 edges
10. `Button()` - 45 edges

## Surprising Connections (you probably didn't know these)
- `Befunde vom 2026-10-20` --references--> `siteUrl()`  [INFERRED]
  BETRIEB.md → src/lib/server/siteUrl.ts
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `FeatureFlagToggle()` --indirect_call--> `setFeatureFlag()`  [INFERRED]
  src/app/dashboard/feature-flags/FeatureFlagToggle.tsx → src/app/dashboard/feature-flags/actions.ts
- `ContactRequestList()` --indirect_call--> `markContactRequestHandled()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts

## Import Cycles
- None detected.

## Communities (97 total, 13 thin omitted)

### Community 1 - "sepa.ts"
Cohesion: 0.23
Nodes (16): field(), POST(), SepaDialog(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+8 more)

### Community 2 - "index.ts"
Cohesion: 0.09
Nodes (34): InfoTooltip(), dynamic, metadata, RateLimitTableProps, chipTones, GROUPS, SortKey, StatusChip() (+26 more)

### Community 3 - "mitglied-werden/page.tsx"
Cohesion: 0.15
Nodes (19): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), WithdrawApplicationButton() (+11 more)

### Community 4 - "boardService.ts"
Cohesion: 0.15
Nodes (20): moveMemberOrder(), ImageBytes, processBoardPhoto(), ProcessedBoardPhoto, QUALITY_LADDER, applyMemberOrder(), BoardMemberRow, BoardMemberWriteData (+12 more)

### Community 5 - "authz.ts"
Cohesion: 0.14
Nodes (23): GET(), GET(), GET(), GET(), GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView() (+15 more)

### Community 6 - "AppError"
Cohesion: 0.13
Nodes (30): removeRateLimitEntry(), requestBackupLink(), triggerDeploy(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership() (+22 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.10
Nodes (31): ref_node_os, ServerPage(), BackupRun, BackupStatus, cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK (+23 more)

### Community 8 - "userService.ts"
Cohesion: 0.11
Nodes (32): KontoPage(), dynamic, MembershipApplicationsPage(), metadata, createUserAction(), importEntriesSchema, UserManagementPage(), planApplicationFees() (+24 more)

### Community 9 - "blogService.ts"
Cohesion: 0.05
Nodes (67): sharp, BlogIndexPage(), beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt() (+59 more)

### Community 10 - "app/kontakt/page.tsx"
Cohesion: 0.15
Nodes (12): ContactForm(), dynamic, KontaktPage(), metadata, dynamic, LoginPage(), metadata, NOTICES (+4 more)

### Community 11 - "events.ts"
Cohesion: 0.11
Nodes (40): generateMetadata(), AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props (+32 more)

### Community 12 - "ics.ts"
Cohesion: 0.17
Nodes (18): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildEventIcs(), calendar(), describe() (+10 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (32): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+24 more)

### Community 14 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 15 - "LegalPage.tsx"
Cohesion: 0.15
Nodes (14): DATENSCHUTZ, metadata, impressum(), ImpressumPage(), metadata, SATZUNG, anchorOf(), Block() (+6 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "executeAction"
Cohesion: 0.10
Nodes (48): zod, deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), ContactRequestsPage(), removeMembershipApplication(), createEventDraft() (+40 more)

### Community 19 - "auth.ts"
Cohesion: 0.18
Nodes (10): bcryptjs, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError (+2 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (42): isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, addAddressIssues(), applicationPersonSchema (+34 more)

### Community 21 - "seed.ts"
Cohesion: 0.40
Nodes (3): adapter, prisma, @prisma/adapter-pg

### Community 22 - "dashboard/page.tsx"
Cohesion: 0.15
Nodes (11): CtaCard(), ContactRequestList(), confirmDelete(), run(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog() (+3 more)

### Community 23 - "lib/siteUrl.ts"
Cohesion: 0.16
Nodes (13): escapeXml(), GET(), DashboardLayout(), metadata, BlogPostingJsonLd(), EventJsonLd(), OrganizationJsonLd(), getPublishedPosts() (+5 more)

### Community 24 - "DirectoryTable"
Cohesion: 0.08
Nodes (30): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), explainFee() (+22 more)

### Community 25 - "securityEventService.ts"
Cohesion: 0.20
Nodes (14): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview(), HeatCell (+6 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (13): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+5 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "feeService.ts"
Cohesion: 0.12
Nodes (32): calculateFee(), calculateFeeAmount(), FeeDefaultEntry, FeeRates, resolveFeeDefault(), FALLBACK_FEE_DEFAULT, deleteFeeDefault(), findFeeDefaults() (+24 more)

### Community 29 - "DebugBar.tsx"
Cohesion: 0.19
Nodes (9): ref_node_child_process, ref_node_util, commit, LINKS, TIME, DebugConsole(), AppLogs, ADMIN_SESSION_MAX_MS (+1 more)

### Community 30 - "countries.ts"
Cohesion: 0.13
Nodes (21): @react-pdf/renderer, GET(), display(), SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES (+13 more)

### Community 31 - "iban.ts"
Cohesion: 0.21
Nodes (22): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+14 more)

### Community 32 - "convert_alumni.py"
Cohesion: 0.26
Nodes (12): datetime, json, re, admin_note(), convert(), day(), main(), phone() (+4 more)

### Community 33 - "BoardPhotoUploader"
Cohesion: 0.22
Nodes (11): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), AdminBoardPage(), getInitials(), VorstandPage(), boardPhotoUrl() (+3 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (21): KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen(), years() (+13 more)

### Community 35 - "app/layout.tsx"
Cohesion: 0.16
Nodes (11): FeatureFlagsPage(), src_app_globals, body, metadata, mono, serif, DebugBar(), Header() (+3 more)

### Community 36 - "Betrieb: Checkliste für den Produktionsserver"
Cohesion: 0.22
Nodes (7): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "next"
Cohesion: 0.09
Nodes (28): nextConfig, @hugeicons/core-free-icons, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+20 more)

### Community 40 - "Button.tsx"
Cohesion: 0.22
Nodes (7): ButtonColor, ButtonLinkProps, ButtonProps, ButtonSize, ButtonVariant, colorClasses, sizeClasses

### Community 41 - "sendEmail"
Cohesion: 0.14
Nodes (23): server-only, GET(), message(), submitContactRequest(), contactRequestMessage(), createPrismaClient(), consumeAltchaSolution(), readExpiry() (+15 more)

### Community 42 - "mail/page.tsx"
Cohesion: 0.17
Nodes (13): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, sitemap() (+5 more)

### Community 43 - "passwordStrength.ts"
Cohesion: 0.21
Nodes (10): NewUserForm(), handleSubmit(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 44 - "Callout"
Cohesion: 0.07
Nodes (34): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, EmailChangeForm(), PasswordChangeButton(), ForgotPasswordPage(), createLoginChallenge(), FaqItem (+26 more)

### Community 45 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (32): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, PaymentOption(), hasControlChars(), ageAt() (+24 more)

### Community 46 - "mailService.ts"
Cohesion: 0.06
Nodes (55): sanitize-html, parseMailForm(), sendEmailAction(), useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose(), blockHtml() (+47 more)

### Community 47 - "messages.ts"
Cohesion: 0.10
Nodes (32): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), statusMeta(), TerminationList(), confirm(), EmailMessage (+24 more)

### Community 48 - "redirectError.ts"
Cohesion: 0.67
Nodes (3): getRedirectTarget(), isRedirectError(), RedirectTarget

### Community 49 - "format.ts"
Cohesion: 0.10
Nodes (20): BackupHistory(), BackupSection(), DeploySection(), formatUptime(), Sample, ServerDashboard(), timeLabel(), AccountSection() (+12 more)

### Community 50 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 51 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 52 - "cn"
Cohesion: 0.08
Nodes (35): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, TerminationItem, toggleAllDay() (+27 more)

### Community 53 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 54 - "isFeatureEnabled"
Cohesion: 0.16
Nodes (25): EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), requestPasswordReset(), notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage() (+17 more)

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "photo/route.ts"
Cohesion: 0.32
Nodes (6): POST(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, memberExists(), memberExists()

### Community 57 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

### Community 58 - "berlinTime.ts"
Cohesion: 0.22
Nodes (17): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+9 more)

### Community 59 - "featureFlagService.ts"
Cohesion: 0.19
Nodes (14): @prisma/client, POST(), setFeatureFlag(), resetPassword(), resetSchema, passwordChangedNoticeMessage(), FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS (+6 more)

### Community 60 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 63 - "Site.tsx"
Cohesion: 0.11
Nodes (17): facts, metadata, metadata, dynamic, metadata, SearchParams, ViewSwitch(), metadata (+9 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.12
Nodes (17): Admin-Dashboard, Authentifizierung & Konten, Backup & Wiederherstellung, Datenbankmodell, Feature Flags, Funktionen im Detail, Inhalt, Mitgliederbereich (`/dashboard`) (+9 more)

### Community 66 - "mitglied-werden/actions.ts"
Cohesion: 0.12
Nodes (32): ref_crypto, ref_node_net, revealKosmosEmailAction(), setKosmosVisibilityAction(), resendVerificationEmail(), submitMembershipApplication(), registerUser(), membershipApplicationNoticeMessage() (+24 more)

### Community 67 - "BulkImport.tsx"
Cohesion: 0.05
Nodes (53): GET(), byStatusThenName(), MailForm(), DashboardPage(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, bulkCreateUsersAction() (+45 more)

### Community 68 - "@hugeicons/react"
Cohesion: 0.09
Nodes (29): @hugeicons/react, react, DeletePostButton(), ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat (+21 more)

### Community 69 - "formatDate"
Cohesion: 0.13
Nodes (28): generateMetadata(), Props, PublicBlogPost(), LeadPost(), MetaLine(), PostRow(), Props, HomePage() (+20 more)

### Community 71 - "Deployment (Hetzner Cloud / Ubuntu)"
Cohesion: 0.29
Nodes (7): Automatische Updates bei jedem Git Push (GitHub Actions), Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, nginx als Reverse Proxy, Option 1: Automatischer Einzeiler über deinen lokalen Rechner (Empfohlen), Option 2: Manuelles Ausführen auf dem Server

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.12
Nodes (30): EditBlogPage(), EditEventPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventById() (+22 more)

### Community 77 - "zahlungen/page.tsx"
Cohesion: 0.13
Nodes (28): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), BankValues, dynamic, metadata (+20 more)

### Community 78 - "contact.ts"
Cohesion: 0.24
Nodes (7): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ContactInput, scoreSpam(), SPAM_KEYWORDS, legitimate

### Community 79 - "TypeSparklines.tsx"
Cohesion: 0.38
Nodes (6): sparkGeometry, typeHint(), SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 82 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 85 - "SecurityPage"
Cohesion: 0.28
Nodes (8): SecurityPage(), typeLabel, bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket(), parseWindowDays()

### Community 86 - "opengraph-image.tsx"
Cohesion: 0.15
Nodes (10): dotenv, ref_node_fs, ref_node_path, prisma, BACKGROUND, icon(), main(), alt (+2 more)

### Community 87 - "ref_node_assert"
Cohesion: 0.14
Nodes (12): ref_node_assert, ref_node_test, berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate() (+4 more)

### Community 89 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 91 - "PhysicsTimeline.tsx"
Cohesion: 0.27
Nodes (6): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline()

### Community 95 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 96 - "getAdminMembers"
Cohesion: 0.33
Nodes (6): EditBoardMemberPage(), findAllMembers(), findMemberById(), getAdminMembers(), getMemberForEdit(), toBoardMember()

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **466 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+461 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 599 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `forgot-password/layout.tsx`, `sepa.ts`, `index.ts`, `mitglied-werden/page.tsx`, `authz.ts`, `AppError`, `userService.ts`, `blogService.ts`, `app/kontakt/page.tsx`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `LegalPage.tsx`, `package.json`, `executeAction`, `dashboard/page.tsx`, `lib/siteUrl.ts`, `gravityPhysics.ts`, `DebugBar.tsx`, `countries.ts`, `KosmosTimeline.tsx`, `app/layout.tsx`, `Button.tsx`, `sendEmail`, `mail/page.tsx`, `Callout`, `ApplicationWizard.tsx`, `messages.ts`, `format.ts`, `cn`, `isFeatureEnabled`, `photo/route.ts`, `featureFlagService.ts`, `Footer.tsx`, `Site.tsx`, `mitglied-werden/actions.ts`, `BulkImport.tsx`, `@hugeicons/react`, `formatDate`, `zahlungen/page.tsx`, `opengraph-image.tsx`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.202) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/react` to `index.ts`, `authz.ts`, `blogService.ts`, `MarketDiffusion.tsx`, `LegalPage.tsx`, `package.json`, `dashboard/page.tsx`, `gravityPhysics.ts`, `DebugBar.tsx`, `iban.ts`, `KosmosTimeline.tsx`, `app/layout.tsx`, `next`, `Callout`, `ApplicationWizard.tsx`, `format.ts`, `cn`, `Footer.tsx`, `Site.tsx`, `BulkImport.tsx`, `formatDate`, `eventService.ts`, `zahlungen/page.tsx`, `altcha.d.ts`, `PhysicsTimeline.tsx`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `AppError` connect `AppError` to `mitglied-werden/actions.ts`, `boardService.ts`, `next`, `userService.ts`, `sendEmail`, `blogService.ts`, `serverStatus.ts`, `eventService.ts`, `mailService.ts`, `messages.ts`, `executeAction`, `auth.ts`, `isFeatureEnabled`, `photo/route.ts`, `featureFlagService.ts`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _466 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08959899749373433 - nodes in this community are weakly interconnected._
- **Should `boardService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14855072463768115 - nodes in this community are weakly interconnected._