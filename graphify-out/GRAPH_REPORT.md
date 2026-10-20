# Graph Report - wiphy  (2026-10-20)

## Corpus Check
- 358 files · ~170,412 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2045 nodes · 6690 edges · 88 communities (76 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `020f0ef2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- forgot-password/layout.tsx
- sepa.ts
- ApplicationWizard.tsx
- mitglied-werden/page.tsx
- executeAction
- ics.ts
- sendEmail
- serverStatus.ts
- DirectoryTable.tsx
- blogService.ts
- errors.ts
- events.ts
- next
- MarketDiffusion.tsx
- feeCalculation.ts
- membershipService.ts
- package.json
- dependencies
- requireAdmin
- ServerDashboard.tsx
- schemas.ts
- seed.ts
- auth.ts
- app/layout.tsx
- MemberDirectory.tsx
- OutcomeTimeline.tsx
- blogPostPath
- gravityPhysics.ts
- dashboard/kontakt/actions.ts
- securityEventService.ts
- countries.ts
- iban.ts
- terminationService.ts
- TypeSparklines.tsx
- KosmosTimeline.tsx
- satzung/page.tsx
- zertifikat/pdf/route.ts
- compilerOptions
- devDependencies
- index.ts
- rateLimitService.ts
- prisma.ts
- feeService.ts
- BulkImport.tsx
- Callout
- eslint.config.mjs
- mailService.ts
- mitglied-werden/actions.ts
- AppError
- DebugConsole.tsx
- ApplicationList
- EditUserForm.tsx
- MarkdownEditor.tsx
- isFeatureEnabled
- EmailBodyField.tsx
- getOptionalUser
- EditUserForm
- EventForm.tsx
- requireDebugAdmin
- app/blog/[id]/page.tsx
- userService.ts
- ActivityHeatmap.tsx
- app/page.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- securityLabels.ts
- cn
- CLAUDE.md
- ref_node_assert
- getEditableUser
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- authz.ts
- Footer.tsx
- altcha.d.ts
- formatNumber
- postcss.config.mjs
- ref_node_fs
- { GET, POST }
- format.ts
- verify-email/layout.tsx
- auth
- login/layout.tsx
- reset-password/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 123 edges
2. `cn()` - 89 edges
3. `AppError` - 86 edges
4. `lucide-react` - 83 edges
5. `react` - 73 edges
6. `executeAction()` - 73 edges
7. `requireAdmin()` - 56 edges
8. `isFeatureEnabled()` - 50 edges
9. `Button()` - 45 edges
10. `formatDate()` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Befunde vom 2026-10-20` --references--> `siteUrl()`  [INFERRED]
  BETRIEB.md → src/lib/server/siteUrl.ts
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `BlogIndexPage()` --calls--> `getPublishedPostPage()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/server/services/blogService.ts

## Import Cycles
- None detected.

## Communities (88 total, 12 thin omitted)

### Community 1 - "sepa.ts"
Cohesion: 0.23
Nodes (16): field(), POST(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate(), isValidCreditorId() (+8 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (30): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, hasControlChars(), ageAt(), CONSENT_VERSION (+22 more)

### Community 3 - "mitglied-werden/page.tsx"
Cohesion: 0.13
Nodes (20): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), VerifyPanel() (+12 more)

### Community 4 - "executeAction"
Cohesion: 0.19
Nodes (21): EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), revealKosmosEmailAction(), setKosmosVisibilityAction(), NewUserPage(), updateBankDetails(), submit() (+13 more)

### Community 5 - "ics.ts"
Cohesion: 0.14
Nodes (23): RFC-5545, GET(), GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs() (+15 more)

### Community 6 - "sendEmail"
Cohesion: 0.20
Nodes (17): requestBackupLink(), resendVerificationEmail(), backupLinkMessage(), registrationConfirmationMessage(), getMailTransporter(), normalize(), Recipients, sendEmail() (+9 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.11
Nodes (28): ref_node_child_process, ref_node_os, GET(), ServerPage(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK (+20 more)

### Community 8 - "DirectoryTable.tsx"
Cohesion: 0.12
Nodes (22): AmountDialog(), chipTones, CommentDialog(), compareBy(), compareNullable(), displayName(), explainFee(), GROUPS (+14 more)

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (66): sharp, POST(), beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+58 more)

### Community 10 - "errors.ts"
Cohesion: 0.23
Nodes (8): zod, importEntriesSchema, getRedirectTarget(), isRedirectError(), RedirectTarget, AppErrorCode, mapErrorToActionResult(), zodMessage()

### Community 11 - "events.ts"
Cohesion: 0.10
Nodes (40): DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, dynamic, metadata (+32 more)

### Community 12 - "next"
Cohesion: 0.10
Nodes (26): nextConfig, lucide-react, next, react, DeletePostButton(), ContactRequestItem, dateFormat, MailSuccessDialog() (+18 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (32): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+24 more)

### Community 14 - "feeCalculation.ts"
Cohesion: 0.24
Nodes (15): ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit(), annualFee(), billableMonths(), calculateFee() (+7 more)

### Community 15 - "membershipService.ts"
Cohesion: 0.20
Nodes (17): dynamic, MembershipApplicationsPage(), metadata, DashboardPage(), planApplicationFees(), countOpenApplications(), deleteApplication(), findApplications() (+9 more)

### Community 16 - "package.json"
Cohesion: 0.11
Nodes (18): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+10 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+18 more)

### Community 18 - "requireAdmin"
Cohesion: 0.06
Nodes (69): createDraft(), deletePost(), savePost(), createEventDraft(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault() (+61 more)

### Community 19 - "ServerDashboard.tsx"
Cohesion: 0.14
Nodes (15): triggerDeploy(), BackupSection(), DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel() (+7 more)

### Community 20 - "schemas.ts"
Cohesion: 0.05
Nodes (49): toCountryCode(), isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, addAddressIssues() (+41 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "auth.ts"
Cohesion: 0.20
Nodes (9): bcryptjs, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError (+1 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.09
Nodes (22): escapeXml(), GET(), DashboardLayout(), metadata, src_app_globals, body, metadata, mono (+14 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.11
Nodes (23): DirectoryTable(), selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase, DirectoryFilters, directoryStats() (+15 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "blogPostPath"
Cohesion: 0.44
Nodes (6): sitemap(), getPastEvents(), blogPostPath(), GERMAN_LETTERS, slugify(), slugSegment()

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (6): markContactRequestHandled(), removeContactRequest(), ContactRequestsPage(), deleteContactRequest(), getContactRequests(), setContactRequestHandled()

### Community 29 - "securityEventService.ts"
Cohesion: 0.18
Nodes (17): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap(), getRegistrationFunnel() (+9 more)

### Community 30 - "countries.ts"
Cohesion: 0.15
Nodes (17): SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS, countryName(), english (+9 more)

### Community 31 - "iban.ts"
Cohesion: 0.23
Nodes (20): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+12 more)

### Community 32 - "terminationService.ts"
Cohesion: 0.21
Nodes (11): EditUserPage(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate(), pruneArchivedFees() (+3 more)

### Community 33 - "TypeSparklines.tsx"
Cohesion: 0.36
Nodes (7): sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (21): KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen(), years() (+13 more)

### Community 35 - "satzung/page.tsx"
Cohesion: 0.20
Nodes (14): dynamic, metadata, SatzungPage(), FeeDefaultEntry, FeeRates, resolveFeeDefault(), deleteFeeDefault(), findFeeDefaults() (+6 more)

### Community 36 - "zertifikat/pdf/route.ts"
Cohesion: 0.08
Nodes (37): @react-pdf/renderer, GET(), DATENSCHUTZ, metadata, impressum(), ImpressumPage(), metadata, SATZUNG (+29 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "index.ts"
Cohesion: 0.10
Nodes (37): metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic, metadata, InfoTooltip(), dynamic (+29 more)

### Community 40 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 41 - "prisma.ts"
Cohesion: 0.13
Nodes (22): server-only, GET(), message(), KontoPage(), dynamic, KontaktPage(), metadata, createPrismaClient() (+14 more)

### Community 42 - "feeService.ts"
Cohesion: 0.14
Nodes (24): UserManagementPage(), FeeBreakdown, clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), resolveIsStudentDefault() (+16 more)

### Community 43 - "BulkImport.tsx"
Cohesion: 0.08
Nodes (28): byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, bulkCreateUsersAction(), ImportIssue, ImportRowResult (+20 more)

### Community 44 - "Callout"
Cohesion: 0.07
Nodes (37): next-auth, EmailChangeForm(), PasswordChangeButton(), dynamic, metadata, ForgotPasswordPage(), ContactForm(), createLoginChallenge() (+29 more)

### Community 45 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 46 - "mailService.ts"
Cohesion: 0.06
Nodes (59): sanitize-html, parseMailForm(), sendEmailAction(), MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic (+51 more)

### Community 47 - "mitglied-werden/actions.ts"
Cohesion: 0.17
Nodes (18): ref_node_net, submitContactRequest(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), contactRequestMessage(), membershipApplicationNoticeMessage() (+10 more)

### Community 48 - "AppError"
Cohesion: 0.09
Nodes (48): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), deleteOwnAccount(), disableOwnAccount(), mailLater() (+40 more)

### Community 51 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 52 - "EditUserForm.tsx"
Cohesion: 0.06
Nodes (34): metadata, MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, ApplicationItem (+26 more)

### Community 53 - "MarkdownEditor.tsx"
Cohesion: 0.40
Nodes (4): @uiw/react-markdown-preview, @uiw/react-md-editor, MarkdownEditor(), MDEditor

### Community 54 - "isFeatureEnabled"
Cohesion: 0.12
Nodes (33): ref_crypto, POST(), updateUser(), requestPasswordReset(), registerUser(), resetPassword(), resetSchema, notifyAdminsAboutRegistration() (+25 more)

### Community 55 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 56 - "getOptionalUser"
Cohesion: 0.31
Nodes (7): GET(), GET(), GET(), getOptionalUser(), withViewOverride(), findImageBytes(), findPhotoBytes()

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "EventForm.tsx"
Cohesion: 0.24
Nodes (17): EventForm(), toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate() (+9 more)

### Community 59 - "requireDebugAdmin"
Cohesion: 0.19
Nodes (11): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), removeRateLimitEntry(), RateLimitTable(), confirmDelete(), isFeatureFlagKey() (+3 more)

### Community 60 - "app/blog/[id]/page.tsx"
Cohesion: 0.12
Nodes (22): react-markdown, remark-gfm, generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), LeadPost() (+14 more)

### Community 61 - "userService.ts"
Cohesion: 0.16
Nodes (20): @prisma/client, adminCreatedUserMessage(), findUserById(), findUserByMemberNumberExcludingUser(), updateUserById(), removeMembershipByAdmin(), adminCreateUser(), CreateUserInput (+12 more)

### Community 62 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 63 - "app/page.tsx"
Cohesion: 0.09
Nodes (22): categories, events, TimelineCategory, TimelineEvent, facts, metadata, categoryLabel, PhysicsTimeline() (+14 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 67 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 68 - "cn"
Cohesion: 0.07
Nodes (25): CtaCard(), SectionHeader(), AuthShell(), ShareButton(), share(), BadgeTone, toneClasses, ButtonColor (+17 more)

### Community 71 - "ref_node_assert"
Cohesion: 0.05
Nodes (36): ref_node_assert, ref_node_test, showInfo(), createUserAction(), NewUserForm(), handleSubmit(), dynamic, LoginPage() (+28 more)

### Community 72 - "getEditableUser"
Cohesion: 0.70
Nodes (4): GET(), ZahlungenPage(), getFeeDashboardData(), getEditableUser()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.09
Nodes (40): EditBlogPage(), deleteEventAction(), revalidateEvent(), saveEventAction(), dynamic, EditEventPage(), metadata, AdminEventsPage() (+32 more)

### Community 78 - "authz.ts"
Cohesion: 0.16
Nodes (20): ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), commit, DebugBar(), LINKS, TIME (+12 more)

### Community 79 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "formatNumber"
Cohesion: 0.21
Nodes (11): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+3 more)

### Community 86 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 91 - "format.ts"
Cohesion: 0.09
Nodes (25): AdminBlogPage(), ContactRequestList(), confirmDelete(), run(), MembershipCertificateCard(), statusMeta(), TerminationItem, TerminationList() (+17 more)

### Community 96 - "auth"
Cohesion: 0.83
Nodes (3): GET(), auth, getAppLogs()

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **462 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+457 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 587 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `forgot-password/layout.tsx`, `sepa.ts`, `ApplicationWizard.tsx`, `mitglied-werden/page.tsx`, `executeAction`, `ics.ts`, `sendEmail`, `serverStatus.ts`, `DirectoryTable.tsx`, `blogService.ts`, `errors.ts`, `events.ts`, `MarketDiffusion.tsx`, `membershipService.ts`, `package.json`, `requireAdmin`, `app/layout.tsx`, `MemberDirectory.tsx`, `blogPostPath`, `gravityPhysics.ts`, `dashboard/kontakt/actions.ts`, `KosmosTimeline.tsx`, `satzung/page.tsx`, `zertifikat/pdf/route.ts`, `index.ts`, `prisma.ts`, `Callout`, `mailService.ts`, `mitglied-werden/actions.ts`, `AppError`, `EditUserForm.tsx`, `MarkdownEditor.tsx`, `isFeatureEnabled`, `getOptionalUser`, `requireDebugAdmin`, `app/blog/[id]/page.tsx`, `app/page.tsx`, `cn`, `ref_node_assert`, `getEditableUser`, `eventService.ts`, `authz.ts`, `Footer.tsx`, `format.ts`, `verify-email/layout.tsx`, `auth`, `login/layout.tsx`, `reset-password/layout.tsx`?**
  _High betweenness centrality (0.193) - this node is a cross-community bridge._
- **Why does `react` connect `next` to `ApplicationWizard.tsx`, `DirectoryTable.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `package.json`, `ServerDashboard.tsx`, `app/layout.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `iban.ts`, `KosmosTimeline.tsx`, `zertifikat/pdf/route.ts`, `index.ts`, `BulkImport.tsx`, `Callout`, `DebugConsole.tsx`, `EditUserForm.tsx`, `MarkdownEditor.tsx`, `EventForm.tsx`, `requireDebugAdmin`, `app/blog/[id]/page.tsx`, `app/page.tsx`, `cn`, `eventService.ts`, `authz.ts`, `Footer.tsx`, `altcha.d.ts`, `format.ts`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `next` to `ApplicationWizard.tsx`, `mitglied-werden/page.tsx`, `DirectoryTable.tsx`, `events.ts`, `membershipService.ts`, `package.json`, `ServerDashboard.tsx`, `app/layout.tsx`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `gravityPhysics.ts`, `KosmosTimeline.tsx`, `index.ts`, `BulkImport.tsx`, `Callout`, `DebugConsole.tsx`, `EditUserForm.tsx`, `EventForm.tsx`, `app/blog/[id]/page.tsx`, `app/page.tsx`, `cn`, `eventService.ts`, `authz.ts`, `Footer.tsx`, `formatNumber`, `format.ts`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _462 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08095238095238096 - nodes in this community are weakly interconnected._
- **Should `mitglied-werden/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13105413105413105 - nodes in this community are weakly interconnected._