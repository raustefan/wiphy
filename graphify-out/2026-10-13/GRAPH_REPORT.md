# Graph Report - wiphy  (2026-10-01)

## Corpus Check
- 338 files · ~155,047 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1915 nodes · 6295 edges · 87 communities (74 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f624dfbd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- formatDateTime
- ApplicationWizard.tsx
- HeaderChrome.tsx
- mitgliedsantraege/actions.ts
- boardService.ts
- app/blog/[id]/page.tsx
- serverStatus.ts
- isFeatureEnabled
- blogService.ts
- security/page.tsx
- events.ts
- ics.ts
- app/layout.tsx
- MailForm.tsx
- userService.ts
- package.json
- dependencies
- iban.ts
- requireUser
- schemas.ts
- seed.ts
- DeleteMemberSection
- lib/siteUrl.ts
- DirectoryTable
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- gravityPhysics.ts
- requireDebugAdmin
- dashboard/page.tsx
- DirectoryTable.tsx
- normalizeIban
- feeService.ts
- EmailBodyField.tsx
- mailService.ts
- feeCalculation.ts
- authz.ts
- compilerOptions
- devDependencies
- index.ts
- errors.ts
- lucide-react
- EditUserForm.tsx
- BulkImport.tsx
- feeDefaultService.ts
- feeDefaults.ts
- env.ts
- DebugBar.tsx
- Button.tsx
- berlinTime.ts
- eslint.config.mjs
- ActivityHeatmap.tsx
- securityEventService.ts
- ApplicationList
- passwordStrength.ts
- ApplicationList.tsx
- forgot-password/layout.tsx
- EditUserForm
- mitgliedsantraege/page.tsx
- verify-email/layout.tsx
- TypeSparklines.tsx
- userUpdateData.ts
- ServerDashboard.tsx
- cn
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- ShareButton
- mail/page.tsx
- CLAUDE.md
- ref_node_assert
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- accountActions.ts
- ref_node_fs
- security/actions.ts
- altcha.d.ts
- app/kontakt/actions.ts
- formatNumber
- postcss.config.mjs
- { GET, POST }
- AppError
- login/layout.tsx
- reset-password/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 120 edges
2. `AppError` - 88 edges
3. `lucide-react` - 84 edges
4. `cn()` - 82 edges
5. `react` - 71 edges
6. `executeAction()` - 62 edges
7. `requireAdmin()` - 56 edges
8. `Card()` - 49 edges
9. `Button()` - 47 edges
10. `isFeatureEnabled()` - 42 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `ContactRequestList()` --indirect_call--> `markContactRequestHandled()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts
- `confirmDelete()` --indirect_call--> `removeContactRequest()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts

## Import Cycles
- None detected.

## Communities (87 total, 13 thin omitted)

### Community 0 - "next"
Cohesion: 0.10
Nodes (26): nextConfig, next, DeletePostButton(), metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+18 more)

### Community 1 - "formatDateTime"
Cohesion: 0.16
Nodes (12): statusMeta(), TerminationList(), confirm(), SecurityPage(), formatDateTime(), getPendingRegistrationStats(), bucketFromKey(), getRateLimitEntries() (+4 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (29): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, ageAt(), CONSENT_VERSION, DATENSCHUTZ_URL (+21 more)

### Community 3 - "HeaderChrome.tsx"
Cohesion: 0.15
Nodes (12): toggleAllDay(), toDateTimeValue(), toDayValue(), FaqItem, LoginFaq(), SECTIONS, links, ThemeToggle() (+4 more)

### Community 4 - "mitgliedsantraege/actions.ts"
Cohesion: 0.13
Nodes (28): zod, acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), submitMembershipApplication(), withdrawMembershipApplication(), membershipApplicationNoticeMessage(), MEMBERSHIP_ADMIN_PATH (+20 more)

### Community 5 - "boardService.ts"
Cohesion: 0.05
Nodes (58): POST(), GET(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), DATENSCHUTZ (+50 more)

### Community 6 - "app/blog/[id]/page.tsx"
Cohesion: 0.11
Nodes (27): react-markdown, remark-gfm, generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), MetaLine() (+19 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.16
Nodes (19): ref_node_os, GET(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG, DEPLOY_SCRIPT (+11 more)

### Community 8 - "isFeatureEnabled"
Cohesion: 0.09
Nodes (30): @prisma/client, ContactRequestsPage(), KontoPage(), dynamic, KontaktPage(), metadata, createLoginChallenge(), LoginForm() (+22 more)

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (69): sharp, GET(), POST(), beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages() (+61 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.23
Nodes (11): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+3 more)

### Community 11 - "events.ts"
Cohesion: 0.11
Nodes (40): DashboardEvent, UpcomingEventAlert(), HomePage(), dynamic, EventDetailPage(), generateMetadata(), Props, dynamic (+32 more)

### Community 12 - "ics.ts"
Cohesion: 0.15
Nodes (20): RFC-5545, GET(), GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs() (+12 more)

### Community 13 - "app/layout.tsx"
Cohesion: 0.06
Nodes (48): src_app_globals, body, metadata, mono, Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR (+40 more)

### Community 14 - "MailForm.tsx"
Cohesion: 0.18
Nodes (8): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, EmailBodyField(), useEmailEditor()

### Community 15 - "userService.ts"
Cohesion: 0.10
Nodes (56): bcryptjs, ref_crypto, ref_node_net, POST(), POST(), notifyAdminsAboutRegistration(), POST(), EMAIL_CHANGE_ERRORS (+48 more)

### Community 16 - "package.json"
Cohesion: 0.10
Nodes (20): name, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer, react-dom (+12 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "iban.ts"
Cohesion: 0.31
Nodes (8): SummaryBlock(), ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, maskIban()

### Community 19 - "requireUser"
Cohesion: 0.33
Nodes (8): deleteUserAction(), bulkCreateUsersAction(), createUserAction(), importRowsSchema, NewUserPage(), requireUser(), adminCreateUser(), adminDeleteUser()

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (27): AdminCreateUserInput, BankUpdateParsed, blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema, boardDeleteSchema (+19 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 23 - "lib/siteUrl.ts"
Cohesion: 0.13
Nodes (14): escapeXml(), GET(), metadata, alt, contentType, size, BlogPostingJsonLd(), EventJsonLd() (+6 more)

### Community 24 - "DirectoryTable"
Cohesion: 0.09
Nodes (28): CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), MemberDirectory(), setFilter() (+20 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (12): columnPath(), labelStride(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline(), PAD (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.15
Nodes (19): JourneyRail(), ApplicationStage(), dynamic, metadata, Props, toDateInput(), VerifyPanel(), WithdrawApplicationButton() (+11 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "requireDebugAdmin"
Cohesion: 0.24
Nodes (9): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), ServerPage(), isFeatureFlagKey(), requireDebugAdmin(), getAllFeatureFlags() (+1 more)

### Community 29 - "dashboard/page.tsx"
Cohesion: 0.06
Nodes (51): @react-pdf/renderer, GET(), GET(), GET(), byStatusThenName(), MailForm(), MailSuccessDialog(), ADMIN_ACTIONS (+43 more)

### Community 30 - "DirectoryTable.tsx"
Cohesion: 0.07
Nodes (33): AdminBlogPage(), dynamic, metadata, MembershipCertificateCard(), SectionHeader(), AmountDialog(), chipTones, DirectoryAccount (+25 more)

### Community 31 - "normalizeIban"
Cohesion: 0.19
Nodes (23): field(), POST(), TIME_ZONE, isValidBic(), isValidIban(), normalizeIban(), membershipApplicationSchema, agent() (+15 more)

### Community 32 - "feeService.ts"
Cohesion: 0.14
Nodes (24): feeRetentionCutoffYear(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), pruneArchivedFees(), resolveIsStudentDefault() (+16 more)

### Community 33 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 34 - "mailService.ts"
Cohesion: 0.07
Nodes (49): sanitize-html, EmailComposerDialog(), closeDialog(), handleClose(), blockHtml(), blockText(), derivePreheader(), EmailBlock (+41 more)

### Community 35 - "feeCalculation.ts"
Cohesion: 0.16
Nodes (20): FeeDefaultsCard(), run(), save(), ZahlungenPage(), ApplicationWizard(), currentFormValues(), goToStep(), handleEnter() (+12 more)

### Community 36 - "authz.ts"
Cohesion: 0.22
Nodes (16): GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, DebugBar(), AS_MEMBER_COOKIE, assertCanEditUser() (+8 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "index.ts"
Cohesion: 0.13
Nodes (22): InfoTooltip(), RateLimitTableProps, FeeDefaultRow, DeleteMemberButton(), metadata, CalloutTone, toneClasses, EmptyState() (+14 more)

### Community 40 - "errors.ts"
Cohesion: 0.18
Nodes (10): EditUserPage(), getRedirectTarget(), isRedirectError(), RedirectTarget, AppErrorCode, mapErrorToActionResult(), getOpenTermination(), getTermination() (+2 more)

### Community 41 - "lucide-react"
Cohesion: 0.09
Nodes (43): lucide-react, next-auth, react, EmailChangeForm(), PasswordChangeButton(), TerminationItem, EventFormData, DeleteMemberSectionProps (+35 more)

### Community 42 - "EditUserForm.tsx"
Cohesion: 0.09
Nodes (14): AccountSection(), ActionResult, Mode, OwnTermination, ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP (+6 more)

### Community 43 - "BulkImport.tsx"
Cohesion: 0.22
Nodes (9): ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row, toRow() (+1 more)

### Community 44 - "feeDefaultService.ts"
Cohesion: 0.46
Nodes (6): deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeRatesForYear(), removeFeeDefault(), setFeeDefault()

### Community 45 - "feeDefaults.ts"
Cohesion: 0.36
Nodes (8): calculateFee(), FeeDefaultEntry, FeeRates, planApplicationFees(), resolveFeeDefault(), FALLBACK_FEE_DEFAULT, withResolvedFees(), toDashboardFee()

### Community 46 - "env.ts"
Cohesion: 0.38
Nodes (6): createPrismaClient(), getMailTransporter(), getDatabaseUrl(), getSmtpConfig(), readRequiredEnv(), readRequiredMailEnv()

### Community 47 - "DebugBar.tsx"
Cohesion: 0.19
Nodes (9): ref_node_child_process, ref_node_util, commit, LINKS, TIME, DebugConsole(), AppLogs, ADMIN_SESSION_MAX_MS (+1 more)

### Community 48 - "Button.tsx"
Cohesion: 0.13
Nodes (9): BeforeInstallPromptEvent, ButtonColor, ButtonLinkProps, ButtonProps, ButtonSize, ButtonVariant, colorClasses, sizeClasses (+1 more)

### Community 49 - "berlinTime.ts"
Cohesion: 0.29
Nodes (14): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+6 more)

### Community 50 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.17
Nodes (16): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel() (+8 more)

### Community 53 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 54 - "passwordStrength.ts"
Cohesion: 0.19
Nodes (10): NewUserForm(), handleSubmit(), PasswordStrengthMeter(), evaluatePassword(), generatePassword(), PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 55 - "ApplicationList.tsx"
Cohesion: 0.29
Nodes (4): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "mitgliedsantraege/page.tsx"
Cohesion: 0.16
Nodes (15): dynamic, MembershipApplicationsPage(), metadata, UserManagementPage(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS (+7 more)

### Community 60 - "TypeSparklines.tsx"
Cohesion: 0.33
Nodes (8): longDayLabel(), sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 61 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "ServerDashboard.tsx"
Cohesion: 0.13
Nodes (16): triggerDeploy(), DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel(), PAD (+8 more)

### Community 63 - "cn"
Cohesion: 0.06
Nodes (39): CtaCard(), Delta(), StatTileProps, Tone, TONE_DOT, StatTile(), AdminBoardPage(), metadata (+31 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 68 - "mail/page.tsx"
Cohesion: 0.19
Nodes (12): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, sitemap() (+4 more)

### Community 71 - "ref_node_assert"
Cohesion: 0.15
Nodes (11): ref_node_assert, ref_node_test, dynamic, LoginPage(), metadata, NOTICES, Props, internalPath() (+3 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.11
Nodes (32): EditBlogPage(), EditEventPage(), AdminEventsPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents() (+24 more)

### Community 77 - "accountActions.ts"
Cohesion: 0.17
Nodes (23): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, signOut, accountDeletedMessage() (+15 more)

### Community 78 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 79 - "security/actions.ts"
Cohesion: 0.27
Nodes (7): removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), deleteRateLimitEntry()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "app/kontakt/actions.ts"
Cohesion: 0.14
Nodes (16): ContactRequestItem, ContactRequestList(), confirmDelete(), run(), dateFormat, submitContactRequest(), ContactForm(), MAX_MESSAGE_LENGTH (+8 more)

### Community 82 - "formatNumber"
Cohesion: 0.32
Nodes (7): RegistrationFunnel(), share(), Stage, STAGES, StatTile(), formatNumber(), RegistrationFunnel

### Community 93 - "AppError"
Cohesion: 0.11
Nodes (49): createDraft(), deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), requestEmailChangeAction(), parseMailForm(), sendEmailAction() (+41 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **438 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+433 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 561 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `ApplicationWizard.tsx`, `HeaderChrome.tsx`, `mitgliedsantraege/actions.ts`, `boardService.ts`, `app/blog/[id]/page.tsx`, `serverStatus.ts`, `isFeatureEnabled`, `blogService.ts`, `security/page.tsx`, `events.ts`, `ics.ts`, `app/layout.tsx`, `MailForm.tsx`, `userService.ts`, `package.json`, `requireUser`, `lib/siteUrl.ts`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `requireDebugAdmin`, `dashboard/page.tsx`, `DirectoryTable.tsx`, `normalizeIban`, `authz.ts`, `index.ts`, `lucide-react`, `EditUserForm.tsx`, `DebugBar.tsx`, `Button.tsx`, `forgot-password/layout.tsx`, `mitgliedsantraege/page.tsx`, `verify-email/layout.tsx`, `cn`, `mail/page.tsx`, `ref_node_assert`, `accountActions.ts`, `security/actions.ts`, `app/kontakt/actions.ts`, `AppError`, `login/layout.tsx`, `reset-password/layout.tsx`?**
  _High betweenness centrality (0.190) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `HeaderChrome.tsx`, `boardService.ts`, `app/blog/[id]/page.tsx`, `blogService.ts`, `app/layout.tsx`, `MailForm.tsx`, `package.json`, `iban.ts`, `gravityPhysics.ts`, `requireDebugAdmin`, `dashboard/page.tsx`, `DirectoryTable.tsx`, `index.ts`, `EditUserForm.tsx`, `BulkImport.tsx`, `DebugBar.tsx`, `Button.tsx`, `ApplicationList.tsx`, `ServerDashboard.tsx`, `cn`, `eventService.ts`, `altcha.d.ts`, `app/kontakt/actions.ts`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `HeaderChrome.tsx`, `app/blog/[id]/page.tsx`, `security/page.tsx`, `events.ts`, `app/layout.tsx`, `MailForm.tsx`, `package.json`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `dashboard/page.tsx`, `DirectoryTable.tsx`, `index.ts`, `EditUserForm.tsx`, `DebugBar.tsx`, `Button.tsx`, `ApplicationList.tsx`, `mitgliedsantraege/page.tsx`, `ServerDashboard.tsx`, `cn`, `formatNumber`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _438 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.0971322849213691 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07681365576102418 - nodes in this community are weakly interconnected._