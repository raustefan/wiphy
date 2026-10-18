# Graph Report - wiphy  (2026-10-18)

## Corpus Check
- 342 files · ~156,319 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 1944 nodes · 6347 edges · 95 communities (82 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 43 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a95e7854`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- sepa/route.ts
- ApplicationWizard.tsx
- satzung/page.tsx
- AppError
- boardService.ts
- app/page.tsx
- serverStatus.ts
- DirectoryTable.tsx
- blogService.ts
- security/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- feeDefaults.ts
- userService.ts
- package.json
- dependencies
- membershipCertificate.ts
- authz.ts
- schemas.ts
- seed.ts
- requireUser
- app/layout.tsx
- DirectoryTable
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- gravityPhysics.ts
- errors.ts
- DebugBar.tsx
- mailService.ts
- normalizeIban
- feeService.ts
- dashboard/page.tsx
- contact.ts
- feeCalculation.ts
- PhysicsTimeline.tsx
- compilerOptions
- devDependencies
- index.ts
- ref_node_fs
- auth.ts
- ref_node_assert
- BulkImport.tsx
- membership.ts
- eslint.config.mjs
- registerAction.ts
- react
- RateLimitTable
- isFeatureEnabled
- ActivityHeatmap.tsx
- securityEventService.ts
- DeleteMemberSection
- passwordStrength.ts
- EmailBodyField.tsx
- forgot-password/layout.tsx
- EditUserForm
- membershipTermination.ts
- verify-email/layout.tsx
- redirectError.ts
- MailForm
- formatNumber
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- Footer.tsx
- ServerDashboard.tsx
- MailForm.tsx
- EditUserForm.tsx
- CLAUDE.md
- mitglied-werden/actions.ts
- mail/page.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- accountActions.ts
- MarkdownViewer.tsx
- paymentHistoryPdf.tsx
- altcha.d.ts
- getOptionalUser
- RegistrationFunnel.tsx
- postcss.config.mjs
- backup/route.ts
- ApplicationList
- TypeSparklines.tsx
- { GET, POST }
- membershipFees.test.ts
- EmailComposerDialog
- executeAction
- login/layout.tsx
- reset-password/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 120 edges
2. `AppError` - 96 edges
3. `cn()` - 88 edges
4. `lucide-react` - 80 edges
5. `react` - 71 edges
6. `executeAction()` - 69 edges
7. `requireAdmin()` - 56 edges
8. `Button()` - 44 edges
9. `isFeatureEnabled()` - 42 edges
10. `formatDate()` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `BlogIndexPage()` --calls--> `getPublishedPostPage()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/server/services/blogService.ts
- `FeatureFlagToggle()` --indirect_call--> `setFeatureFlag()`  [INFERRED]
  src/app/dashboard/feature-flags/FeatureFlagToggle.tsx → src/app/dashboard/feature-flags/actions.ts

## Import Cycles
- None detected.

## Communities (95 total, 13 thin omitted)

### Community 0 - "next"
Cohesion: 0.12
Nodes (28): nextConfig, lucide-react, next, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic (+20 more)

### Community 1 - "sepa/route.ts"
Cohesion: 0.25
Nodes (15): field(), POST(), SepaDialog(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+7 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (22): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), CONSENT_VERSION, DATENSCHUTZ_URL (+14 more)

### Community 3 - "satzung/page.tsx"
Cohesion: 0.14
Nodes (17): DATENSCHUTZ, metadata, impressum(), ImpressumPage(), metadata, dynamic, metadata, SATZUNG (+9 more)

### Community 4 - "AppError"
Cohesion: 0.08
Nodes (45): zod, acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), dynamic, MembershipApplicationsPage() (+37 more)

### Community 5 - "boardService.ts"
Cohesion: 0.07
Nodes (48): POST(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), AdminBoardPage(), getInitials() (+40 more)

### Community 6 - "app/page.tsx"
Cohesion: 0.12
Nodes (29): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), LeadPost(), MetaLine(), PostRow() (+21 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.11
Nodes (29): ref_node_os, GET(), ServerPage(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG (+21 more)

### Community 8 - "DirectoryTable.tsx"
Cohesion: 0.09
Nodes (23): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, AmountDialog(), chipTones, CommentDialog(), DirectoryAccount (+15 more)

### Community 9 - "blogService.ts"
Cohesion: 0.05
Nodes (72): sharp, POST(), beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages() (+64 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.17
Nodes (17): dynamic, metadata, SecurityPage(), ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel() (+9 more)

### Community 11 - "events.ts"
Cohesion: 0.13
Nodes (34): DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard(), EventCardData (+26 more)

### Community 12 - "ics.ts"
Cohesion: 0.15
Nodes (20): RFC-5545, GET(), GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs() (+12 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (33): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+25 more)

### Community 14 - "feeDefaults.ts"
Cohesion: 0.26
Nodes (10): FeeDefaultEntry, FeeRates, FALLBACK_FEE_DEFAULT, deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeDefaults(), getFeeRatesForYear() (+2 more)

### Community 15 - "userService.ts"
Cohesion: 0.16
Nodes (26): deleteUserAction(), requestPasswordReset(), emailChangeMessage(), globalForPrisma, prisma, getSecurityLogPepper(), normalizeEmail(), PendingRegistrationStats (+18 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "membershipCertificate.ts"
Cohesion: 0.17
Nodes (22): GET(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDuration() (+14 more)

### Community 19 - "authz.ts"
Cohesion: 0.24
Nodes (15): GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, DebugBar(), AS_MEMBER_COOKIE, assertCanEditUser() (+7 more)

### Community 20 - "schemas.ts"
Cohesion: 0.07
Nodes (23): AdminCreateUserInput, BankUpdateParsed, berlinDateTime(), boardDeleteSchema, boardMoveSchema, boardSaveSchema, contactSchema, directMailSchema (+15 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "requireUser"
Cohesion: 0.19
Nodes (19): EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), KontoPage(), withdrawMembershipTermination(), updateUser(), bulkCreateUsersAction(), createUserAction() (+11 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.08
Nodes (23): escapeXml(), GET(), DashboardLayout(), metadata, src_app_globals, body, metadata, mono (+15 more)

### Community 24 - "DirectoryTable"
Cohesion: 0.10
Nodes (25): compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase (+17 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.07
Nodes (34): dynamic, KontaktPage(), metadata, dynamic, LoginPage(), metadata, NOTICES, Props (+26 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "errors.ts"
Cohesion: 0.26
Nodes (9): removeRateLimitEntry(), requestBackupLink(), triggerDeploy(), backupLinkMessage(), requireDebugAdmin(), AppErrorCode, mapErrorToActionResult(), BACKUP_LINK_MINUTES (+1 more)

### Community 29 - "DebugBar.tsx"
Cohesion: 0.16
Nodes (11): ref_node_child_process, ref_node_util, FeatureFlagsPage(), commit, LINKS, TIME, DebugConsole(), AppLogs (+3 more)

### Community 30 - "mailService.ts"
Cohesion: 0.07
Nodes (48): sanitize-html, parseMailForm(), sendEmailAction(), blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature (+40 more)

### Community 31 - "normalizeIban"
Cohesion: 0.30
Nodes (15): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+7 more)

### Community 32 - "feeService.ts"
Cohesion: 0.15
Nodes (24): UserManagementPage(), resolveFeeDefault(), archiveFeesOfUser(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees() (+16 more)

### Community 33 - "dashboard/page.tsx"
Cohesion: 0.12
Nodes (14): MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog(), SectionHeader(), LogoutButton(), buttonClasses(), ButtonColor (+6 more)

### Community 34 - "contact.ts"
Cohesion: 0.40
Nodes (4): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, legitimate

### Community 35 - "feeCalculation.ts"
Cohesion: 0.15
Nodes (23): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), ApplicationWizard(), currentFormValues() (+15 more)

### Community 36 - "PhysicsTimeline.tsx"
Cohesion: 0.27
Nodes (6): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline()

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "index.ts"
Cohesion: 0.09
Nodes (34): CtaCard(), InfoTooltip(), RateLimitTableProps, FeeDefaultRow, StatTile(), ShareButton(), share(), BadgeTone (+26 more)

### Community 40 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 41 - "auth.ts"
Cohesion: 0.12
Nodes (21): bcryptjs, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError (+13 more)

### Community 42 - "ref_node_assert"
Cohesion: 0.16
Nodes (18): ref_node_assert, ref_node_test, EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay() (+10 more)

### Community 43 - "BulkImport.tsx"
Cohesion: 0.22
Nodes (9): ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row, toRow() (+1 more)

### Community 44 - "membership.ts"
Cohesion: 0.09
Nodes (31): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, ForgotPasswordPage(), ContactForm(), createLoginChallenge(), FaqItem, LoginFaq() (+23 more)

### Community 45 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 47 - "registerAction.ts"
Cohesion: 0.13
Nodes (29): ref_node_net, ref_server_only, resendVerificationEmail(), registerUser(), notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage() (+21 more)

### Community 48 - "react"
Cohesion: 0.10
Nodes (27): react, DeletePostButton(), ContactRequestItem, dateFormat, TerminationItem, DeleteEventButton(), DialogButton(), ActionResult (+19 more)

### Community 49 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 50 - "isFeatureEnabled"
Cohesion: 0.25
Nodes (12): @prisma/client, setFeatureFlag(), resetPassword(), resetSchema, passwordChangedNoticeMessage(), FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER (+4 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.15
Nodes (18): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap() (+10 more)

### Community 54 - "passwordStrength.ts"
Cohesion: 0.21
Nodes (10): NewUserForm(), handleSubmit(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 55 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "membershipTermination.ts"
Cohesion: 0.25
Nodes (8): EditUserPage(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate(), getOpenTermination()

### Community 60 - "redirectError.ts"
Cohesion: 0.67
Nodes (3): getRedirectTarget(), isRedirectError(), RedirectTarget

### Community 61 - "MailForm"
Cohesion: 0.11
Nodes (17): byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, applyBool(), applyDate(), buildUserUpdateData() (+9 more)

### Community 62 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 63 - "Site.tsx"
Cohesion: 0.11
Nodes (15): facts, metadata, metadata, dynamic, metadata, SearchParams, ViewSwitch(), LorenzAttractor (+7 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (25): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Backup & Wiederherstellung, Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server (+17 more)

### Community 66 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 67 - "ServerDashboard.tsx"
Cohesion: 0.11
Nodes (15): EmailChangeForm(), PasswordChangeButton(), dynamic, metadata, BackupSection(), DeploySection(), formatBytes(), formatUptime() (+7 more)

### Community 68 - "MailForm.tsx"
Cohesion: 0.22
Nodes (6): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS

### Community 69 - "EditUserForm.tsx"
Cohesion: 0.10
Nodes (22): metadata, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput() (+14 more)

### Community 71 - "mitglied-werden/actions.ts"
Cohesion: 0.18
Nodes (17): ref_crypto, submitContactRequest(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), contactRequestMessage(), membershipApplicationNoticeMessage() (+9 more)

### Community 72 - "mail/page.tsx"
Cohesion: 0.19
Nodes (12): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, sitemap() (+4 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.11
Nodes (32): EditBlogPage(), EditEventPage(), AdminEventsPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents() (+24 more)

### Community 77 - "accountActions.ts"
Cohesion: 0.16
Nodes (24): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, AccountSection(), signOut (+16 more)

### Community 78 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 79 - "paymentHistoryPdf.tsx"
Cohesion: 0.33
Nodes (7): @react-pdf/renderer, GET(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "getOptionalUser"
Cohesion: 0.31
Nodes (7): GET(), GET(), GET(), getOptionalUser(), withViewOverride(), findImageBytes(), findPhotoBytes()

### Community 82 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 85 - "backup/route.ts"
Cohesion: 0.48
Nodes (6): GET(), message(), createPrismaClient(), getDatabaseUrl(), dumpDatabase(), consumeBackupToken()

### Community 86 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 87 - "TypeSparklines.tsx"
Cohesion: 0.36
Nodes (7): sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 89 - "membershipFees.test.ts"
Cohesion: 0.40
Nodes (4): ageAt(), isOldEnough(), birthDateField, defaults

### Community 91 - "EmailComposerDialog"
Cohesion: 0.50
Nodes (4): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 93 - "executeAction"
Cohesion: 0.12
Nodes (40): deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), ContactRequestsPage() (+32 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **442 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+437 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 564 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `sepa/route.ts`, `ApplicationWizard.tsx`, `satzung/page.tsx`, `AppError`, `boardService.ts`, `app/page.tsx`, `serverStatus.ts`, `DirectoryTable.tsx`, `blogService.ts`, `security/page.tsx`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `userService.ts`, `package.json`, `membershipCertificate.ts`, `authz.ts`, `requireUser`, `app/layout.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `errors.ts`, `DebugBar.tsx`, `dashboard/page.tsx`, `index.ts`, `auth.ts`, `membership.ts`, `registerAction.ts`, `react`, `isFeatureEnabled`, `forgot-password/layout.tsx`, `verify-email/layout.tsx`, `Site.tsx`, `Footer.tsx`, `ServerDashboard.tsx`, `MailForm.tsx`, `EditUserForm.tsx`, `mitglied-werden/actions.ts`, `mail/page.tsx`, `accountActions.ts`, `paymentHistoryPdf.tsx`, `getOptionalUser`, `backup/route.ts`, `executeAction`, `login/layout.tsx`, `reset-password/layout.tsx`?**
  _High betweenness centrality (0.188) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `next`, `ApplicationWizard.tsx`, `satzung/page.tsx`, `app/page.tsx`, `DirectoryTable.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `package.json`, `app/layout.tsx`, `gravityPhysics.ts`, `DebugBar.tsx`, `normalizeIban`, `dashboard/page.tsx`, `PhysicsTimeline.tsx`, `index.ts`, `BulkImport.tsx`, `membership.ts`, `Site.tsx`, `Footer.tsx`, `ServerDashboard.tsx`, `MailForm.tsx`, `EditUserForm.tsx`, `eventService.ts`, `altcha.d.ts`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `next` to `ApplicationWizard.tsx`, `AppError`, `app/page.tsx`, `DirectoryTable.tsx`, `security/page.tsx`, `events.ts`, `MarketDiffusion.tsx`, `package.json`, `app/layout.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `DebugBar.tsx`, `dashboard/page.tsx`, `index.ts`, `membership.ts`, `react`, `MailForm`, `formatNumber`, `Site.tsx`, `Footer.tsx`, `ServerDashboard.tsx`, `MailForm.tsx`, `EditUserForm.tsx`, `RegistrationFunnel.tsx`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _442 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.1246376811594203 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08465608465608465 - nodes in this community are weakly interconnected._