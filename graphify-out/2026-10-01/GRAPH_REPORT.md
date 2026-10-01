# Graph Report - wiphy  (2026-10-01)

## Corpus Check
- 333 files · ~149,684 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1892 nodes · 6216 edges · 91 communities (78 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a378ed63`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- mitgliedsantraege/actions.ts
- ApplicationWizard.tsx
- Callout
- Button.tsx
- boardService.ts
- app/blog/[id]/page.tsx
- serverStatus.ts
- mailService.ts
- blogService.ts
- security/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- EditUserForm.tsx
- DirectoryTable
- package.json
- dependencies
- mitgliedsantraege/page.tsx
- altcha.ts
- schemas.ts
- EmailBodyField.tsx
- feeDefaults.ts
- lib/siteUrl.ts
- MemberDirectory.tsx
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- gravityPhysics.ts
- users/[id]/page.tsx
- membershipCertificate.ts
- errors.ts
- sepa/route.ts
- feeService.ts
- MailForm.tsx
- requireDebugAdmin
- zahlungen/page.tsx
- app/page.tsx
- compilerOptions
- devDependencies
- index.ts
- normalizeIban
- lucide-react
- rateLimitService.ts
- BulkImport.tsx
- membershipFormSchemas.ts
- mitglied-werden/actions.ts
- passwordStrength.ts
- userUpdateData.ts
- app/layout.tsx
- dashboard/page.tsx
- PhysicsTimeline.tsx
- ActivityHeatmap.tsx
- securityEventService.ts
- ApplicationList
- format.ts
- EmailComposerDialog
- ServerDashboard.tsx
- EditUserForm
- berlinTime.ts
- seed.ts
- clientIp.ts
- formatNumber
- authz.ts
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- forgot-password/layout.tsx
- ShareButton
- mail/page.tsx
- CLAUDE.md
- login/page.tsx
- TypeSparklines.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- accountActions.ts
- altcha.d.ts
- postcss.config.mjs
- membershipService.ts
- ref_node_assert
- { GET, POST }
- MarkdownViewer.tsx
- AppError
- sharp
- userService.ts
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 117 edges
2. `AppError` - 88 edges
3. `lucide-react` - 83 edges
4. `cn()` - 82 edges
5. `react` - 68 edges
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

## Communities (91 total, 13 thin omitted)

### Community 0 - "next"
Cohesion: 0.09
Nodes (27): nextConfig, next, DeletePostButton(), metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic (+19 more)

### Community 1 - "mitgliedsantraege/actions.ts"
Cohesion: 0.13
Nodes (19): acceptMembershipApplication(), confirmMembershipTermination(), notifyApplicant(), statusMeta(), TerminationList(), confirm(), membershipApprovedMessage(), terminationConfirmedMessage() (+11 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.09
Nodes (22): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), columns, Footer() (+14 more)

### Community 3 - "Callout"
Cohesion: 0.08
Nodes (33): next-auth, PasswordChangeButton(), ForgotPasswordPage(), FaqItem, LoginFaq(), SECTIONS, AccountPanel(), handleSubmit() (+25 more)

### Community 4 - "Button.tsx"
Cohesion: 0.18
Nodes (11): ContactRequestList(), confirmDelete(), run(), buttonClasses(), ButtonColor, ButtonLinkProps, ButtonProps, ButtonSize (+3 more)

### Community 5 - "boardService.ts"
Cohesion: 0.05
Nodes (56): POST(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), AdminBoardPage(), DATENSCHUTZ (+48 more)

### Community 6 - "app/blog/[id]/page.tsx"
Cohesion: 0.13
Nodes (26): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props (+18 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.14
Nodes (22): ref_node_fs, ref_node_os, GET(), GET(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK (+14 more)

### Community 8 - "mailService.ts"
Cohesion: 0.07
Nodes (47): sanitize-html, blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailMessage, EmailSignature, nl2br() (+39 more)

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (64): POST(), beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+56 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.22
Nodes (14): dynamic, metadata, SecurityPage(), ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel() (+6 more)

### Community 11 - "events.ts"
Cohesion: 0.10
Nodes (41): DashboardEvent, UpcomingEventAlert(), HomePage(), dynamic, EventDetailPage(), generateMetadata(), Props, dynamic (+33 more)

### Community 12 - "ics.ts"
Cohesion: 0.16
Nodes (19): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildEventIcs(), calendar(), describe() (+11 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (29): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+21 more)

### Community 14 - "EditUserForm.tsx"
Cohesion: 0.11
Nodes (20): metadata, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput() (+12 more)

### Community 15 - "DirectoryTable"
Cohesion: 0.19
Nodes (9): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), explainFee() (+1 more)

### Community 16 - "package.json"
Cohesion: 0.08
Nodes (23): eslintConfig, name, private, version, altcha, altcha-lib, babel-plugin-react-compiler, eslint (+15 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "mitgliedsantraege/page.tsx"
Cohesion: 0.16
Nodes (17): dynamic, MembershipApplicationsPage(), metadata, DashboardPage(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue() (+9 more)

### Community 19 - "altcha.ts"
Cohesion: 0.15
Nodes (17): ContactForm(), dynamic, KontaktPage(), metadata, createLoginChallenge(), LoginForm(), createPrismaClient(), ALTCHA_COMPLEXITY (+9 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (27): AdminCreateUserInput, BankUpdateParsed, berlinDateTime(), blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema (+19 more)

### Community 21 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 22 - "feeDefaults.ts"
Cohesion: 0.22
Nodes (12): calculateFee(), calculateFeeAmount(), FeeDefaultEntry, planApplicationFees(), resolveFeeDefault(), ageAt(), isOldEnough(), birthDateField (+4 more)

### Community 23 - "lib/siteUrl.ts"
Cohesion: 0.13
Nodes (14): escapeXml(), GET(), metadata, alt, contentType, size, BlogPostingJsonLd(), EventJsonLd() (+6 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.15
Nodes (20): DirectoryAccount, MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase, DirectoryFilters, EMPTY_FILTERS, FILTER_VALUES (+12 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (12): columnPath(), labelStride(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline(), PAD (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.19
Nodes (17): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+9 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.10
Nodes (34): collectAndDetachBodies(), GravityEasterEgg(), GravityPreset, PhysicsBody, place(), PRESETS, WebAudioFx, AUDIBLE_IMPACT (+26 more)

### Community 28 - "users/[id]/page.tsx"
Cohesion: 0.12
Nodes (19): @prisma/client, ContactRequestsPage(), KontoPage(), DeleteMemberSection(), deleteUserAction(), EditUserPage(), metadata, updateUser() (+11 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.09
Nodes (30): @react-pdf/renderer, GET(), byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, berlinYear() (+22 more)

### Community 30 - "errors.ts"
Cohesion: 0.16
Nodes (20): zod, EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), createUserAction(), importRowsSchema, NewUserPage(), updateBankDetails() (+12 more)

### Community 31 - "sepa/route.ts"
Cohesion: 0.23
Nodes (16): field(), POST(), TIME_ZONE, agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+8 more)

### Community 32 - "feeService.ts"
Cohesion: 0.15
Nodes (22): DialogButton(), metadata, StatTile(), UserManagementPage(), directoryStats(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears() (+14 more)

### Community 33 - "MailForm.tsx"
Cohesion: 0.22
Nodes (6): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS

### Community 34 - "requireDebugAdmin"
Cohesion: 0.23
Nodes (9): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, triggerDeploy(), ServerPage(), DeploySection(), isFeatureFlagKey(), requireDebugAdmin() (+1 more)

### Community 35 - "zahlungen/page.tsx"
Cohesion: 0.11
Nodes (34): UserPaymentHistoryDialog(), FeeDefaultsCard(), run(), save(), SepaDialog(), BankDetailsForm(), BankValues, dynamic (+26 more)

### Community 36 - "app/page.tsx"
Cohesion: 0.13
Nodes (13): metadata, metadata, heroMetrics, pillars, Block(), renderInline(), MarketDiffusion, ButtonLink() (+5 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "index.ts"
Cohesion: 0.10
Nodes (32): CtaCard(), InfoTooltip(), RateLimitTableProps, chipTones, GROUPS, SortKey, StatusChip(), FeeDefaultRow (+24 more)

### Community 40 - "normalizeIban"
Cohesion: 0.33
Nodes (13): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+5 more)

### Community 41 - "lucide-react"
Cohesion: 0.11
Nodes (25): lucide-react, react, ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat, STATUS_META (+17 more)

### Community 42 - "rateLimitService.ts"
Cohesion: 0.18
Nodes (11): removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), bucketFromKey(), deleteRateLimitEntry() (+3 more)

### Community 43 - "BulkImport.tsx"
Cohesion: 0.22
Nodes (10): bulkCreateUsersAction(), ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row (+2 more)

### Community 44 - "membershipFormSchemas.ts"
Cohesion: 0.14
Nodes (12): MINOR_HINT, STUDENT_YEAR_LOOKAHEAD, applicationBankSchema, applicationPaymentSchema, applicationPersonSchema, applicationStudySchema, bankFieldsOptional, checkedBox (+4 more)

### Community 45 - "mitglied-werden/actions.ts"
Cohesion: 0.16
Nodes (21): submitContactRequest(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), contactRequestMessage(), membershipApplicationNoticeMessage(), membershipReceivedMessage() (+13 more)

### Community 46 - "passwordStrength.ts"
Cohesion: 0.21
Nodes (9): NewUserForm(), handleSubmit(), evaluatePassword(), generatePassword(), PasswordCriterion, PasswordScore, PasswordStrength, SCORE_LABELS (+1 more)

### Community 47 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 48 - "app/layout.tsx"
Cohesion: 0.11
Nodes (17): ref_node_child_process, ref_node_util, FeatureFlagsPage(), src_app_globals, body, metadata, mono, auth (+9 more)

### Community 49 - "dashboard/page.tsx"
Cohesion: 0.14
Nodes (14): GET(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog(), SectionHeader(), LogoutButton(), formatDate() (+6 more)

### Community 50 - "PhysicsTimeline.tsx"
Cohesion: 0.24
Nodes (8): categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory, TimelineDetail(), TimelineEvent

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.16
Nodes (16): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), emptyCounts(), getActivityHeatmap(), getSecurityOverview() (+8 more)

### Community 53 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 54 - "format.ts"
Cohesion: 0.25
Nodes (8): AdminBlogPage(), DATE_TIME, EURO, formatDateShort(), LONG_DATE, NUMBER, SHORT_DATE, toDate()

### Community 55 - "EmailComposerDialog"
Cohesion: 0.50
Nodes (4): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 56 - "ServerDashboard.tsx"
Cohesion: 0.15
Nodes (13): formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel(), PAD, PLOT, TICKS (+5 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "berlinTime.ts"
Cohesion: 0.29
Nodes (14): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+6 more)

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "clientIp.ts"
Cohesion: 0.50
Nodes (3): ref_node_net, addressKey(), HeaderBag

### Community 62 - "formatNumber"
Cohesion: 0.21
Nodes (11): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+3 more)

### Community 63 - "authz.ts"
Cohesion: 0.18
Nodes (18): GET(), GET(), GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), AS_MEMBER_COOKIE, DEBUG_COOKIE (+10 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 68 - "mail/page.tsx"
Cohesion: 0.15
Nodes (15): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, sitemap() (+7 more)

### Community 71 - "login/page.tsx"
Cohesion: 0.31
Nodes (6): dynamic, LoginPage(), metadata, NOTICES, Props, internalPath()

### Community 72 - "TypeSparklines.tsx"
Cohesion: 0.36
Nodes (7): longDayLabel(), sparkGeometry, typeHint(), SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.10
Nodes (36): createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), EditEventPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById() (+28 more)

### Community 77 - "accountActions.ts"
Cohesion: 0.12
Nodes (29): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination(), AccountSection() (+21 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "membershipService.ts"
Cohesion: 0.22
Nodes (14): deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), countOpenApplications(), deleteApplication(), findApplicationById(), findOpenApplication(), getMaxMitgliedId() (+6 more)

### Community 87 - "ref_node_assert"
Cohesion: 0.13
Nodes (11): ref_node_assert, ref_node_test, MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ADMIN_SESSION_MAX_MS, adminSessionExpired(), legitimate (+3 more)

### Community 92 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

### Community 93 - "AppError"
Cohesion: 0.12
Nodes (42): createDraft(), deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), parseMailForm(), sendEmailAction(), declineMembershipApplication() (+34 more)

### Community 96 - "sharp"
Cohesion: 0.50
Nodes (4): sharp, BACKGROUND, icon(), main()

### Community 99 - "userService.ts"
Cohesion: 0.09
Nodes (54): bcryptjs, ref_crypto, POST(), POST(), notifyAdminsAboutRegistration(), POST(), resendVerificationEmail(), registerUser() (+46 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **434 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+429 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 555 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `mitgliedsantraege/actions.ts`, `ApplicationWizard.tsx`, `Callout`, `Button.tsx`, `boardService.ts`, `app/blog/[id]/page.tsx`, `serverStatus.ts`, `blogService.ts`, `security/page.tsx`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `EditUserForm.tsx`, `package.json`, `mitgliedsantraege/page.tsx`, `altcha.ts`, `lib/siteUrl.ts`, `MemberDirectory.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `users/[id]/page.tsx`, `membershipCertificate.ts`, `errors.ts`, `sepa/route.ts`, `feeService.ts`, `MailForm.tsx`, `requireDebugAdmin`, `zahlungen/page.tsx`, `app/page.tsx`, `index.ts`, `lucide-react`, `rateLimitService.ts`, `mitglied-werden/actions.ts`, `app/layout.tsx`, `dashboard/page.tsx`, `authz.ts`, `forgot-password/layout.tsx`, `mail/page.tsx`, `login/page.tsx`, `eventService.ts`, `accountActions.ts`, `AppError`, `userService.ts`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `Callout`, `app/blog/[id]/page.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `EditUserForm.tsx`, `package.json`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `users/[id]/page.tsx`, `feeService.ts`, `MailForm.tsx`, `requireDebugAdmin`, `zahlungen/page.tsx`, `app/page.tsx`, `index.ts`, `normalizeIban`, `BulkImport.tsx`, `app/layout.tsx`, `dashboard/page.tsx`, `PhysicsTimeline.tsx`, `ServerDashboard.tsx`, `eventService.ts`, `accountActions.ts`, `altcha.d.ts`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `Callout`, `boardService.ts`, `app/blog/[id]/page.tsx`, `security/page.tsx`, `events.ts`, `MarketDiffusion.tsx`, `EditUserForm.tsx`, `package.json`, `mitgliedsantraege/page.tsx`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `users/[id]/page.tsx`, `membershipCertificate.ts`, `feeService.ts`, `MailForm.tsx`, `zahlungen/page.tsx`, `app/page.tsx`, `index.ts`, `app/layout.tsx`, `dashboard/page.tsx`, `PhysicsTimeline.tsx`, `ServerDashboard.tsx`, `formatNumber`, `accountActions.ts`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _434 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.09158186864014801 - nodes in this community are weakly interconnected._
- **Should `mitgliedsantraege/actions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1341991341991342 - nodes in this community are weakly interconnected._