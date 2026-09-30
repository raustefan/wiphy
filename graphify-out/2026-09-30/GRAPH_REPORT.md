# Graph Report - wiphy  (2026-09-30)

## Corpus Check
- 320 files · ~140,371 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1798 nodes · 5897 edges · 88 communities (78 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `045abc51`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LoginForm.tsx
- blocks.ts
- ApplicationWizard.tsx
- next
- authz.ts
- boardService.ts
- errors.ts
- serverStatus.ts
- mailService.ts
- blogService.ts
- securityLabels.ts
- DirectoryTable.tsx
- eventService.ts
- MarketDiffusion.tsx
- AppError
- app/page.tsx
- package.json
- dependencies
- ContactForm.tsx
- users/page.tsx
- schemas.ts
- MailForm.tsx
- DeleteMemberSection
- app/layout.tsx
- normalizeIban
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- AccountPanel.tsx
- EventForm.tsx
- berlinTime.ts
- lucide-react
- format.ts
- feeService.ts
- mail/page.tsx
- featureFlagService.ts
- zahlungen/page.tsx
- PhysicsTimeline.tsx
- compilerOptions
- devDependencies
- NewUserForm.tsx
- ApplicationList.tsx
- react
- rateLimitService.ts
- EditUserForm.tsx
- satzung/page.tsx
- events.ts
- securityEventService.ts
- userUpdateData.ts
- membershipService.ts
- getEditableUser
- app/blog/[id]/page.tsx
- ActivityHeatmap.tsx
- ref_node_assert
- getOptionalUser
- MailForm
- userService.ts
- index.ts
- EditUserForm
- login/page.tsx
- seed.ts
- ContactRequestList
- SepaDialog.tsx
- forgot-password/layout.tsx
- RegistrationFunnel.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- accountActions.ts
- boardImages.ts
- mailHistory.ts
- TypeSparklines.tsx
- CLAUDE.md
- feeDefaultService.ts
- BoardPhotoUploader
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- ServerDashboard.tsx
- FeatureFlagToggle.tsx
- eslint.config.mjs
- users/[id]/page.tsx
- dashboard/page.tsx
- altcha.d.ts
- postcss.config.mjs
- { GET, POST }
- ApplicationList
- MarkdownViewer.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 111 edges
2. `AppError` - 84 edges
3. `cn()` - 80 edges
4. `lucide-react` - 78 edges
5. `react` - 62 edges
6. `executeAction()` - 59 edges
7. `requireAdmin()` - 56 edges
8. `Card()` - 48 edges
9. `Button()` - 45 edges
10. `isFeatureEnabled()` - 40 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `BlogImageManager()` --indirect_call--> `deleteBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `moveBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `saveBlogImageAlt()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `setBlogCoverImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts

## Import Cycles
- None detected.

## Communities (88 total, 10 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.14
Nodes (21): ForgotPasswordPage(), createLoginChallenge(), FaqItem, LoginFaq(), SECTIONS, LoginForm(), VerifyPanel(), VerifyEmailContent() (+13 more)

### Community 1 - "blocks.ts"
Cohesion: 0.22
Nodes (18): blockHtml(), blockText(), derivePreheader(), EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml(), renderBlocksText() (+10 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (32): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), PaymentOption(), ageAt() (+24 more)

### Community 3 - "next"
Cohesion: 0.07
Nodes (26): nextConfig, next, AdminBlogPage(), metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic (+18 more)

### Community 4 - "authz.ts"
Cohesion: 0.16
Nodes (21): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage(), auth, commit (+13 more)

### Community 5 - "boardService.ts"
Cohesion: 0.13
Nodes (28): POST(), EditBoardMemberPage(), moveMemberOrder(), processBoardPhoto(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers() (+20 more)

### Community 6 - "errors.ts"
Cohesion: 0.16
Nodes (17): parseMailForm(), sendEmailAction(), createUserAction(), updateBankDetails(), parseDirectMailForm(), sendDirectMailAction(), resolveUsersByIds(), enforceAdminMailRateLimit() (+9 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.12
Nodes (23): ref_node_os, GET(), triggerDeploy(), ServerPage(), DeploySection(), requireDebugAdmin(), cpuPercent(), cpuTimes (+15 more)

### Community 8 - "mailService.ts"
Cohesion: 0.15
Nodes (18): sanitize-html, EmailBlock, ENTITIES, htmlToText(), AnnouncedEvent, composeMessage(), eventBlocks(), greeting() (+10 more)

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (58): sharp, BACKGROUND, icon(), main(), POST(), BlogImageManager(), handleDrop(), uploadFiles() (+50 more)

### Community 10 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 11 - "DirectoryTable.tsx"
Cohesion: 0.08
Nodes (30): AmountDialog(), chipTones, compareBy(), compareNullable(), DirectoryAccount, DirectoryTable(), selectAllWithOpenFees(), displayName() (+22 more)

### Community 12 - "eventService.ts"
Cohesion: 0.06
Nodes (57): RFC-5545, sitemap(), GET(), GET(), TerminePage(), icsEnd(), UPCOMING_ALERT_MONTHS, addDays() (+49 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.12
Nodes (27): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+19 more)

### Community 14 - "AppError"
Cohesion: 0.14
Nodes (41): deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant() (+33 more)

### Community 15 - "app/page.tsx"
Cohesion: 0.32
Nodes (4): heroMetrics, pillars, MarketDiffusion, PhysicsHero

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): name, private, version, altcha, altcha-lib, babel-plugin-react-compiler, next-auth, nodemailer (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "ContactForm.tsx"
Cohesion: 0.28
Nodes (5): ContactForm(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, legitimate

### Community 19 - "users/page.tsx"
Cohesion: 0.12
Nodes (22): dynamic, metadata, DialogButton(), metadata, StatTile(), UserManagementPage(), directoryStats(), berlinDateParts() (+14 more)

### Community 20 - "schemas.ts"
Cohesion: 0.07
Nodes (36): zod, beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt() (+28 more)

### Community 21 - "MailForm.tsx"
Cohesion: 0.09
Nodes (26): @tiptap/react, metadata, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, ActionResult (+18 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.08
Nodes (24): ref_node_fs, escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono (+16 more)

### Community 24 - "normalizeIban"
Cohesion: 0.30
Nodes (15): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+7 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.16
Nodes (18): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+10 more)

### Community 27 - "AccountPanel.tsx"
Cohesion: 0.16
Nodes (11): AccountPanel(), handleSubmit(), FIRST_HALF_FIELDS, FirstHalfField, ResetPasswordForm(), handleSubmit(), ALTCHA_STRINGS_DE, ALTCHA_STYLE (+3 more)

### Community 28 - "EventForm.tsx"
Cohesion: 0.21
Nodes (10): @uiw/react-md-editor, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), MarkdownEditor(), MDEditor, useSwipeToClose() (+2 more)

### Community 29 - "berlinTime.ts"
Cohesion: 0.11
Nodes (36): GET(), EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad() (+28 more)

### Community 30 - "lucide-react"
Cohesion: 0.13
Nodes (14): lucide-react, links, BeforeInstallPromptEvent, ShareButton(), share(), ThemeToggle(), ButtonColor, ButtonLinkProps (+6 more)

### Community 31 - "format.ts"
Cohesion: 0.17
Nodes (10): Delta(), StatTileProps, Tone, TONE_DOT, DATE_TIME, EURO, LONG_DATE, NUMBER (+2 more)

### Community 32 - "feeService.ts"
Cohesion: 0.12
Nodes (29): calculateFeeAmount(), FeeBreakdown, FeeDefaultEntry, resolveFeeDefault(), archiveFeesOfUser(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears() (+21 more)

### Community 33 - "mail/page.tsx"
Cohesion: 0.19
Nodes (11): MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata (+3 more)

### Community 34 - "featureFlagService.ts"
Cohesion: 0.35
Nodes (7): setFeatureFlag(), FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, isFeatureFlagKey(), FeatureFlagWithMeta, setFeatureFlagEnabled()

### Community 35 - "zahlungen/page.tsx"
Cohesion: 0.14
Nodes (27): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), BankValues, dynamic, metadata (+19 more)

### Community 36 - "PhysicsTimeline.tsx"
Cohesion: 0.24
Nodes (8): categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory, TimelineDetail(), TimelineEvent

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "NewUserForm.tsx"
Cohesion: 0.18
Nodes (14): NewUserForm(), handleSubmit(), FILL_PERCENT, PasswordInput(), PasswordStrengthMeter(), controlClasses, evaluatePassword(), generatePassword() (+6 more)

### Community 40 - "ApplicationList.tsx"
Cohesion: 0.29
Nodes (4): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META

### Community 41 - "react"
Cohesion: 0.17
Nodes (14): react, DeletePostButton(), ContactRequestItem, dateFormat, TerminationItem, DeleteEventButton(), DeleteMemberSectionProps, DeleteMemberButton() (+6 more)

### Community 42 - "rateLimitService.ts"
Cohesion: 0.18
Nodes (11): removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), bucketFromKey(), deleteRateLimitEntry() (+3 more)

### Community 43 - "EditUserForm.tsx"
Cohesion: 0.20
Nodes (6): ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData

### Community 44 - "satzung/page.tsx"
Cohesion: 0.14
Nodes (14): DATENSCHUTZ, metadata, IMPRESSUM, metadata, dynamic, metadata, SATZUNG, Block() (+6 more)

### Community 45 - "events.ts"
Cohesion: 0.10
Nodes (41): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), HomePage(), dynamic, EventDetailPage(), Props, dynamic (+33 more)

### Community 46 - "securityEventService.ts"
Cohesion: 0.16
Nodes (18): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, summarizeByBucket(), addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap() (+10 more)

### Community 47 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 48 - "membershipService.ts"
Cohesion: 0.25
Nodes (14): @prisma/client, MembershipApplicationsPage(), planApplicationFees(), findFeeDefaults(), deleteApplication(), findApplicationById(), findApplications(), findOpenApplication() (+6 more)

### Community 49 - "getEditableUser"
Cohesion: 0.31
Nodes (8): @react-pdf/renderer, GET(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee, getEditableUser()

### Community 50 - "app/blog/[id]/page.tsx"
Cohesion: 0.10
Nodes (30): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), PostCard(), Props, AdminBoardPage() (+22 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "ref_node_assert"
Cohesion: 0.15
Nodes (10): ref_node_assert, ref_node_net, ref_node_test, addressKey(), HeaderBag, ADMIN_SESSION_MAX_MS, adminSessionExpired(), SUMMER (+2 more)

### Community 53 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

### Community 54 - "MailForm"
Cohesion: 0.16
Nodes (10): byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, formatStatus(), formatStatusShort(), getStatusTone() (+2 more)

### Community 55 - "userService.ts"
Cohesion: 0.07
Nodes (75): bcryptjs, ref_crypto, POST(), POST(), notifyAdminsAboutRegistration(), POST(), dynamic, KontaktPage() (+67 more)

### Community 56 - "index.ts"
Cohesion: 0.11
Nodes (34): CtaCard(), InfoTooltip(), dynamic, metadata, RateLimitTableProps, StatTile(), FeeDefaultRow, Badge() (+26 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "login/page.tsx"
Cohesion: 0.31
Nodes (6): dynamic, LoginPage(), metadata, NOTICES, Props, internalPath()

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "ContactRequestList"
Cohesion: 1.00
Nodes (3): ContactRequestList(), confirmDelete(), run()

### Community 61 - "SepaDialog.tsx"
Cohesion: 0.26
Nodes (15): field(), POST(), SepaDialog(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+7 more)

### Community 63 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "accountActions.ts"
Cohesion: 0.11
Nodes (33): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, signOut, EmailMessage (+25 more)

### Community 67 - "boardImages.ts"
Cohesion: 0.25
Nodes (6): ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, ProcessedBoardPhoto, QUALITY_LADDER

### Community 68 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 69 - "TypeSparklines.tsx"
Cohesion: 0.36
Nodes (7): sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 71 - "feeDefaultService.ts"
Cohesion: 0.48
Nodes (5): FeeRates, deleteFeeDefault(), upsertFeeDefault(), removeFeeDefault(), setFeeDefault()

### Community 72 - "BoardPhotoUploader"
Cohesion: 0.60
Nodes (5): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), formatBytes()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "ServerDashboard.tsx"
Cohesion: 0.22
Nodes (12): formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel(), PAD, PLOT, TICKS (+4 more)

### Community 77 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 78 - "users/[id]/page.tsx"
Cohesion: 0.10
Nodes (29): ContactRequestsPage(), AccountSection(), deleteUserAction(), EditUserPage(), metadata, updateUser(), NewUserPage(), submitContactRequest() (+21 more)

### Community 79 - "dashboard/page.tsx"
Cohesion: 0.12
Nodes (17): MetaLine(), EmailChangeDialog(), MailSuccessDialog(), MembershipCertificateCard(), statusMeta(), TerminationList(), confirm(), ADMIN_ACTIONS (+9 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 89 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 92 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **419 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+414 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 535 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `ApplicationWizard.tsx`, `authz.ts`, `errors.ts`, `serverStatus.ts`, `DirectoryTable.tsx`, `eventService.ts`, `AppError`, `app/page.tsx`, `package.json`, `ContactForm.tsx`, `users/page.tsx`, `schemas.ts`, `MailForm.tsx`, `app/layout.tsx`, `mitglied-werden/page.tsx`, `AccountPanel.tsx`, `EventForm.tsx`, `berlinTime.ts`, `lucide-react`, `mail/page.tsx`, `featureFlagService.ts`, `zahlungen/page.tsx`, `react`, `rateLimitService.ts`, `EditUserForm.tsx`, `satzung/page.tsx`, `events.ts`, `getEditableUser`, `app/blog/[id]/page.tsx`, `getOptionalUser`, `userService.ts`, `index.ts`, `login/page.tsx`, `SepaDialog.tsx`, `forgot-password/layout.tsx`, `accountActions.ts`, `users/[id]/page.tsx`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.184) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `LoginForm.tsx`, `ApplicationWizard.tsx`, `next`, `authz.ts`, `DirectoryTable.tsx`, `app/page.tsx`, `package.json`, `ContactForm.tsx`, `users/page.tsx`, `MailForm.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `AccountPanel.tsx`, `EventForm.tsx`, `format.ts`, `zahlungen/page.tsx`, `PhysicsTimeline.tsx`, `NewUserForm.tsx`, `ApplicationList.tsx`, `react`, `EditUserForm.tsx`, `satzung/page.tsx`, `events.ts`, `app/blog/[id]/page.tsx`, `MailForm`, `index.ts`, `SepaDialog.tsx`, `RegistrationFunnel.tsx`, `ServerDashboard.tsx`, `users/[id]/page.tsx`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `AppError` connect `AppError` to `featureFlagService.ts`, `accountActions.ts`, `boardImages.ts`, `boardService.ts`, `errors.ts`, `serverStatus.ts`, `mailService.ts`, `blogService.ts`, `rateLimitService.ts`, `eventService.ts`, `users/[id]/page.tsx`, `membershipService.ts`, `users/page.tsx`, `schemas.ts`, `userService.ts`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _419 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LoginForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13825757575757575 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07179487179487179 - nodes in this community are weakly interconnected._