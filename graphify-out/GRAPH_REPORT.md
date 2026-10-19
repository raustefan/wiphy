# Graph Report - wiphy  (2026-10-19)

## Corpus Check
- 352 files · ~160,819 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 1975 nodes · 6462 edges · 94 communities (81 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 44 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `69dc0f28`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- sepa/route.ts
- ApplicationWizard.tsx
- forgot-password/layout.tsx
- DirectoryTable.tsx
- auth
- app/blog/[id]/page.tsx
- serverStatus.ts
- index.ts
- blogService.ts
- securityLabels.ts
- events.ts
- lucide-react
- MarketDiffusion.tsx
- feeService.ts
- userService.ts
- package.json
- dependencies
- boardService.ts
- feeDefaultService.ts
- schemas.ts
- seed.ts
- blog/actions.ts
- lib/siteUrl.ts
- MemberDirectory.tsx
- OutcomeTimeline.tsx
- app/kontakt/page.tsx
- gravityPhysics.ts
- redirectError.ts
- DebugBar.tsx
- mailService.ts
- normalizeIban
- mitgliedsantraege/page.tsx
- messages.ts
- KosmosTimeline.tsx
- satzung/page.tsx
- dashboard/page.tsx
- compilerOptions
- devDependencies
- cn
- ref_node_fs
- backup/route.ts
- passwordStrength.ts
- BulkImport.tsx
- Callout
- app/layout.tsx
- EmailComposerDialog
- AppError
- EditUserForm.tsx
- RateLimitTable
- MailForm.tsx
- ActivityHeatmap.tsx
- securityEventService.ts
- ServerDashboard.tsx
- ref_node_assert
- EmailBodyField.tsx
- requireFeatureEnabled
- EditUserForm
- ApplicationList
- MarkdownViewer.tsx
- eslint.config.mjs
- userUpdateData.ts
- formatNumber
- app/termine/[id]/page.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- contact.ts
- app/page.tsx
- authz.ts
- CLAUDE.md
- mitglied-werden/actions.ts
- clientIp.ts
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- login/layout.tsx
- reset-password/layout.tsx
- Footer.tsx
- altcha.d.ts
- isFeatureEnabled
- rateLimitService.ts
- postcss.config.mjs
- verify-email/layout.tsx
- sessionPolicy.test.ts
- ContactRequestList
- { GET, POST }
- executeAction
- RegistrationFunnel.tsx
- TypeSparklines.tsx
- format.ts

## God Nodes (most connected - your core abstractions)
1. `next` - 123 edges
2. `AppError` - 86 edges
3. `cn()` - 85 edges
4. `lucide-react` - 82 edges
5. `react` - 73 edges
6. `executeAction()` - 73 edges
7. `requireAdmin()` - 56 edges
8. `isFeatureEnabled()` - 50 edges
9. `Button()` - 45 edges
10. `formatDate()` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `generateMetadata()` --calls--> `pageMetadata()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/metadata.ts
- `FeatureFlagToggle()` --indirect_call--> `setFeatureFlag()`  [INFERRED]
  src/app/dashboard/feature-flags/FeatureFlagToggle.tsx → src/app/dashboard/feature-flags/actions.ts
- `ContactRequestList()` --indirect_call--> `markContactRequestHandled()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts

## Import Cycles
- None detected.

## Communities (94 total, 13 thin omitted)

### Community 0 - "next"
Cohesion: 0.11
Nodes (19): nextConfig, next, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic, metadata, metadata (+11 more)

### Community 1 - "sepa/route.ts"
Cohesion: 0.25
Nodes (15): field(), POST(), SepaDialog(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+7 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (32): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), FeeDefaultEntry, FeeRates (+24 more)

### Community 4 - "DirectoryTable.tsx"
Cohesion: 0.18
Nodes (13): AmountDialog(), chipTones, CommentDialog(), DirectoryAccount, displayName(), explainFee(), GROUPS, SortKey (+5 more)

### Community 5 - "auth"
Cohesion: 0.83
Nodes (3): GET(), auth, getAppLogs()

### Community 6 - "app/blog/[id]/page.tsx"
Cohesion: 0.16
Nodes (20): generateMetadata(), Props, PublicBlogPost(), generateMetadata(), LeadPost(), PostRow(), Props, sitemap() (+12 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.11
Nodes (28): ref_node_os, GET(), ServerPage(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG (+20 more)

### Community 8 - "index.ts"
Cohesion: 0.13
Nodes (28): metadata, InfoTooltip(), dynamic, metadata, RateLimitTableProps, dynamic, metadata, FeeDefaultRow (+20 more)

### Community 9 - "blogService.ts"
Cohesion: 0.07
Nodes (49): POST(), BlogIndexPage(), createDraft(), EditBlogPage(), AdminBlogPage(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta (+41 more)

### Community 10 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 11 - "events.ts"
Cohesion: 0.15
Nodes (17): AdminEventsPage(), TIME_ZONE, CALENDAR_ICS_PATH, DAY_MONTH, DAY_MONTH_YEAR, DEFAULT_DURATION_MINUTES, eventEnd(), formatEventClock() (+9 more)

### Community 12 - "lucide-react"
Cohesion: 0.12
Nodes (24): lucide-react, react, DeletePostButton(), ContactRequestItem, dateFormat, DeleteEventButton(), ActionResult, Mode (+16 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (33): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+25 more)

### Community 14 - "feeService.ts"
Cohesion: 0.12
Nodes (25): @react-pdf/renderer, GET(), UserManagementPage(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, clearFeeAmountOverride() (+17 more)

### Community 15 - "userService.ts"
Cohesion: 0.09
Nodes (55): bcryptjs, ref_crypto, EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), requestPasswordReset(), resendVerificationEmail(), registerUser() (+47 more)

### Community 16 - "package.json"
Cohesion: 0.10
Nodes (20): name, packageManager, private, version, altcha, babel-plugin-react-compiler, nodemailer, react-dom (+12 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+18 more)

### Community 18 - "boardService.ts"
Cohesion: 0.05
Nodes (61): POST(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), AdminBoardPage(), DATENSCHUTZ (+53 more)

### Community 19 - "feeDefaultService.ts"
Cohesion: 0.46
Nodes (6): deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeRatesForYear(), removeFeeDefault(), setFeeDefault()

### Community 20 - "schemas.ts"
Cohesion: 0.08
Nodes (20): AdminCreateUserInput, berlinDateTime(), boardDeleteSchema, boardMoveSchema, boardSaveSchema, contactSchema, emailChangeSchema, emailField (+12 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "blog/actions.ts"
Cohesion: 0.17
Nodes (22): beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager(), handleDrop() (+14 more)

### Community 23 - "lib/siteUrl.ts"
Cohesion: 0.12
Nodes (17): escapeXml(), GET(), DashboardLayout(), metadata, alt, contentType, size, BlogPostingJsonLd() (+9 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.10
Nodes (25): compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase (+17 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (12): columnPath(), labelStride(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline(), PAD (+4 more)

### Community 26 - "app/kontakt/page.tsx"
Cohesion: 0.18
Nodes (11): dynamic, KontaktPage(), metadata, dynamic, LoginPage(), metadata, NOTICES, Props (+3 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "redirectError.ts"
Cohesion: 0.67
Nodes (3): getRedirectTarget(), isRedirectError(), RedirectTarget

### Community 29 - "DebugBar.tsx"
Cohesion: 0.17
Nodes (16): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage(), commit, DebugBar() (+8 more)

### Community 30 - "mailService.ts"
Cohesion: 0.06
Nodes (57): sanitize-html, parseMailForm(), sendEmailAction(), MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic (+49 more)

### Community 31 - "normalizeIban"
Cohesion: 0.29
Nodes (15): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+7 more)

### Community 32 - "mitgliedsantraege/page.tsx"
Cohesion: 0.13
Nodes (23): dynamic, MembershipApplicationsPage(), metadata, EditUserPage(), planApplicationFees(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear() (+15 more)

### Community 33 - "messages.ts"
Cohesion: 0.11
Nodes (34): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage() (+26 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.15
Nodes (20): KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen(), years() (+12 more)

### Community 35 - "satzung/page.tsx"
Cohesion: 0.12
Nodes (29): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), ApplicationWizard(), currentFormValues() (+21 more)

### Community 36 - "dashboard/page.tsx"
Cohesion: 0.05
Nodes (57): GET(), byStatusThenName(), MailForm(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, DashboardPage(), getStatusIcon() (+49 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "cn"
Cohesion: 0.08
Nodes (24): CtaCard(), SectionHeader(), StatTile(), dynamic, metadata, HeaderChrome(), links, ShareButton() (+16 more)

### Community 40 - "ref_node_fs"
Cohesion: 0.40
Nodes (5): ref_node_fs, sharp, BACKGROUND, icon(), main()

### Community 41 - "backup/route.ts"
Cohesion: 0.48
Nodes (6): GET(), message(), createPrismaClient(), getDatabaseUrl(), dumpDatabase(), consumeBackupToken()

### Community 42 - "passwordStrength.ts"
Cohesion: 0.21
Nodes (10): NewUserForm(), handleSubmit(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 43 - "BulkImport.tsx"
Cohesion: 0.22
Nodes (9): ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row, toRow() (+1 more)

### Community 44 - "Callout"
Cohesion: 0.06
Nodes (42): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, EmailChangeForm(), PasswordChangeButton(), dynamic, metadata, ForgotPasswordPage() (+34 more)

### Community 45 - "app/layout.tsx"
Cohesion: 0.20
Nodes (8): src_app_globals, body, metadata, mono, serif, Header(), InstallHint(), getSession

### Community 46 - "EmailComposerDialog"
Cohesion: 0.50
Nodes (4): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 47 - "AppError"
Cohesion: 0.10
Nodes (40): zod, removeRateLimitEntry(), requestBackupLink(), triggerDeploy(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema (+32 more)

### Community 48 - "EditUserForm.tsx"
Cohesion: 0.07
Nodes (28): metadata, ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, TerminationItem, toggleAllDay(), EventFormData (+20 more)

### Community 49 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 50 - "MailForm.tsx"
Cohesion: 0.22
Nodes (6): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.16
Nodes (18): SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel() (+10 more)

### Community 53 - "ServerDashboard.tsx"
Cohesion: 0.27
Nodes (7): BackupSection(), DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel()

### Community 54 - "ref_node_assert"
Cohesion: 0.21
Nodes (6): ref_node_assert, ref_node_test, membershipApplicationSchema, one, two, base

### Community 55 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 56 - "requireFeatureEnabled"
Cohesion: 0.44
Nodes (7): revealKosmosEmailAction(), setKosmosVisibilityAction(), requireFeatureEnabled(), getKosmosEmail(), isKosmosParticipant(), PARTICIPANT, setKosmosVisibility()

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 59 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 60 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 61 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 63 - "app/termine/[id]/page.tsx"
Cohesion: 0.08
Nodes (36): DashboardEvent, UpcomingEventAlert(), facts, metadata, metadata, dynamic, EventDetailPage(), generateMetadata() (+28 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (25): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Backup & Wiederherstellung, Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server (+17 more)

### Community 66 - "contact.ts"
Cohesion: 0.40
Nodes (4): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, legitimate

### Community 68 - "app/page.tsx"
Cohesion: 0.15
Nodes (13): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline(), HomePage(), levels (+5 more)

### Community 69 - "authz.ts"
Cohesion: 0.20
Nodes (13): GET(), GET(), GET(), AS_MEMBER_COOKIE, assertCanEditUser(), DEBUG_COOKIE, getOptionalUser(), normalizeRole() (+5 more)

### Community 71 - "mitglied-werden/actions.ts"
Cohesion: 0.11
Nodes (30): altcha-lib, server-only, submitContactRequest(), submitMembershipApplication(), EmailMessage, contactRequestMessage(), membershipApplicationNoticeMessage(), membershipReceivedMessage() (+22 more)

### Community 72 - "clientIp.ts"
Cohesion: 0.50
Nodes (3): ref_node_net, addressKey(), HeaderBag

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.05
Nodes (73): RFC-5545, createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), EventForm(), EditEventPage(), GET() (+65 more)

### Community 79 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "isFeatureEnabled"
Cohesion: 0.19
Nodes (15): @prisma/client, setFeatureFlag(), KontoPage(), resetPassword(), resetSchema, passwordChangedNoticeMessage(), FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS (+7 more)

### Community 82 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 87 - "ContactRequestList"
Cohesion: 1.00
Nodes (3): ContactRequestList(), confirmDelete(), run()

### Community 93 - "executeAction"
Cohesion: 0.19
Nodes (26): deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), ContactRequestsPage(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount() (+18 more)

### Community 94 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 97 - "TypeSparklines.tsx"
Cohesion: 0.39
Nodes (7): longDayLabel(), sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines()

### Community 102 - "format.ts"
Cohesion: 0.13
Nodes (16): MetaLine(), statusMeta(), TerminationList(), confirm(), AccountSection(), DATE_TIME, EURO, formatDate() (+8 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **441 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+436 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 567 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `sepa/route.ts`, `ApplicationWizard.tsx`, `forgot-password/layout.tsx`, `DirectoryTable.tsx`, `auth`, `app/blog/[id]/page.tsx`, `serverStatus.ts`, `index.ts`, `blogService.ts`, `lucide-react`, `MarketDiffusion.tsx`, `feeService.ts`, `userService.ts`, `package.json`, `boardService.ts`, `blog/actions.ts`, `lib/siteUrl.ts`, `MemberDirectory.tsx`, `app/kontakt/page.tsx`, `gravityPhysics.ts`, `DebugBar.tsx`, `mailService.ts`, `mitgliedsantraege/page.tsx`, `messages.ts`, `KosmosTimeline.tsx`, `satzung/page.tsx`, `dashboard/page.tsx`, `cn`, `backup/route.ts`, `Callout`, `app/layout.tsx`, `AppError`, `EditUserForm.tsx`, `MailForm.tsx`, `requireFeatureEnabled`, `app/termine/[id]/page.tsx`, `app/page.tsx`, `authz.ts`, `mitglied-werden/actions.ts`, `eventService.ts`, `login/layout.tsx`, `reset-password/layout.tsx`, `Footer.tsx`, `isFeatureEnabled`, `verify-email/layout.tsx`, `executeAction`?**
  _High betweenness centrality (0.219) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `DirectoryTable.tsx`, `app/blog/[id]/page.tsx`, `index.ts`, `blogService.ts`, `MarketDiffusion.tsx`, `package.json`, `boardService.ts`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `DebugBar.tsx`, `normalizeIban`, `KosmosTimeline.tsx`, `dashboard/page.tsx`, `cn`, `BulkImport.tsx`, `Callout`, `app/layout.tsx`, `EditUserForm.tsx`, `MailForm.tsx`, `ServerDashboard.tsx`, `app/termine/[id]/page.tsx`, `app/page.tsx`, `authz.ts`, `eventService.ts`, `Footer.tsx`, `altcha.d.ts`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `DirectoryTable.tsx`, `app/blog/[id]/page.tsx`, `index.ts`, `MarketDiffusion.tsx`, `package.json`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `gravityPhysics.ts`, `DebugBar.tsx`, `mitgliedsantraege/page.tsx`, `KosmosTimeline.tsx`, `dashboard/page.tsx`, `cn`, `Callout`, `EditUserForm.tsx`, `MailForm.tsx`, `ServerDashboard.tsx`, `formatNumber`, `app/termine/[id]/page.tsx`, `Footer.tsx`, `RegistrationFunnel.tsx`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _441 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.1126984126984127 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07200929152148665 - nodes in this community are weakly interconnected._