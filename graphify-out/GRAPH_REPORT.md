# Graph Report - wiphy  (2026-10-25)

## Corpus Check
- 361 files · ~173,782 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2071 nodes · 6829 edges · 97 communities (83 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8a597d2c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- forgot-password/layout.tsx
- sepa.ts
- index.ts
- mitglied-werden/page.tsx
- isFeatureEnabled
- authz.ts
- AppError
- serverStatus.ts
- userService.ts
- blogService.ts
- login/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- membershipFormSchemas.ts
- LegalPage.tsx
- package.json
- dependencies
- requireAdmin
- formatEuro
- schemas.ts
- seed.ts
- zahlungen/page.tsx
- metadata.ts
- MemberDirectory.tsx
- securityEventService.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- feeService.ts
- DebugBar.tsx
- countries.ts
- iban.ts
- convert_alumni.py
- MailForm.tsx
- KosmosTimeline.tsx
- app/layout.tsx
- getOptionalUser
- compilerOptions
- devDependencies
- next
- BulkImport.tsx
- altcha.ts
- app/termine/page.tsx
- passwordStrength.ts
- Callout
- ApplicationWizard.tsx
- mailService.ts
- messages.ts
- executeAction
- format.ts
- EmailBodyField.tsx
- ApplicationList
- EditUserForm.tsx
- securityLabels.ts
- prisma.ts
- EditUserForm
- paymentHistoryPdf.tsx
- MarkdownViewer.tsx
- berlinTime.ts
- featureFlagService.ts
- Footer.tsx
- userUpdateData.ts
- removeRateLimitEntry
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- registerAction.ts
- dashboard/page.tsx
- @hugeicons/core-free-icons
- app/blog/[id]/page.tsx
- CLAUDE.md
- ref_node_assert
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- satzung/page.tsx
- contact.ts
- TypeSparklines.tsx
- altcha.d.ts
- DeleteMemberSection
- ActivityHeatmap.tsx
- postcss.config.mjs
- rateLimitService.ts
- ref_node_fs
- membershipTermination.ts
- { GET, POST }
- EmailComposerDialog
- formatDate
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- eslint.config.mjs

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

## Communities (97 total, 14 thin omitted)

### Community 1 - "sepa.ts"
Cohesion: 0.23
Nodes (16): field(), POST(), TIME_ZONE, agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+8 more)

### Community 2 - "index.ts"
Cohesion: 0.08
Nodes (38): CtaCard(), InfoTooltip(), RateLimitTableProps, chipTones, GROUPS, SortKey, StatusChip(), FeeDefaultRow (+30 more)

### Community 3 - "mitglied-werden/page.tsx"
Cohesion: 0.17
Nodes (18): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+10 more)

### Community 4 - "isFeatureEnabled"
Cohesion: 0.14
Nodes (26): KontoPage(), revealKosmosEmailAction(), setKosmosVisibilityAction(), KosmosPage(), deleteUserAction(), EditUserPage(), metadata, updateUser() (+18 more)

### Community 5 - "authz.ts"
Cohesion: 0.24
Nodes (14): GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, AS_MEMBER_COOKIE, DEBUG_COOKIE, isDebugMode() (+6 more)

### Community 6 - "AppError"
Cohesion: 0.14
Nodes (26): confirmMembershipTermination(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination() (+18 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.10
Nodes (33): ref_node_os, GET(), ServerPage(), BackupRun, BackupStatus, cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS (+25 more)

### Community 8 - "userService.ts"
Cohesion: 0.11
Nodes (34): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), MembershipApplicationsPage(), planApplicationFees(), resolveFeeDefault(), findFeeDefaults() (+26 more)

### Community 9 - "blogService.ts"
Cohesion: 0.05
Nodes (68): sharp, BlogIndexPage(), beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+60 more)

### Community 10 - "login/page.tsx"
Cohesion: 0.31
Nodes (6): dynamic, LoginPage(), metadata, NOTICES, Props, internalPath()

### Community 11 - "events.ts"
Cohesion: 0.13
Nodes (35): DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard(), EventCardData (+27 more)

### Community 12 - "ics.ts"
Cohesion: 0.17
Nodes (19): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs(), calendar() (+11 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (32): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+24 more)

### Community 14 - "membershipFormSchemas.ts"
Cohesion: 0.12
Nodes (22): hasControlChars(), isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, addAddressIssues() (+14 more)

### Community 15 - "LegalPage.tsx"
Cohesion: 0.15
Nodes (15): DATENSCHUTZ, metadata, impressum(), ImpressumPage(), metadata, SATZUNG, anchorOf(), Block() (+7 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "requireAdmin"
Cohesion: 0.05
Nodes (79): POST(), createDraft(), deletePost(), savePost(), ContactRequestsPage(), createEventDraft(), deleteEventAction(), revalidateEvent() (+71 more)

### Community 19 - "formatEuro"
Cohesion: 0.15
Nodes (12): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), explainFee() (+4 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (28): absent(), AdminCreateUserInput, boardDeleteSchema, boardMoveSchema, boardSaveSchema, contactSchema, emailChangeSchema, emailField (+20 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "zahlungen/page.tsx"
Cohesion: 0.08
Nodes (21): ContactRequestList(), confirmDelete(), run(), PasswordChangeButton(), dynamic, metadata, SectionHeader(), BankValues (+13 more)

### Community 23 - "metadata.ts"
Cohesion: 0.12
Nodes (15): escapeXml(), GET(), DashboardLayout(), metadata, alt, contentType, size, DEFAULT_OG_IMAGE (+7 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.15
Nodes (21): DirectoryAccount, MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase, DirectoryFilters, directoryStats(), EMPTY_FILTERS (+13 more)

### Community 25 - "securityEventService.ts"
Cohesion: 0.19
Nodes (16): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview() (+8 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (12): columnPath(), labelStride(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline(), PAD (+4 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "feeService.ts"
Cohesion: 0.13
Nodes (26): DialogButton(), metadata, StatTile(), UserManagementPage(), FeeBreakdown, feeRetentionCutoffYear(), SepaDebtorAddress, clearFeeAmountOverride() (+18 more)

### Community 29 - "DebugBar.tsx"
Cohesion: 0.19
Nodes (9): ref_node_child_process, ref_node_util, commit, LINKS, TIME, DebugConsole(), AppLogs, ADMIN_SESSION_MAX_MS (+1 more)

### Community 30 - "countries.ts"
Cohesion: 0.16
Nodes (18): display(), EntryDetails(), SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS (+10 more)

### Community 31 - "iban.ts"
Cohesion: 0.24
Nodes (19): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+11 more)

### Community 32 - "convert_alumni.py"
Cohesion: 0.22
Nodes (14): datetime, json, re, admin_note(), convert(), day(), fees(), main() (+6 more)

### Community 33 - "MailForm.tsx"
Cohesion: 0.22
Nodes (6): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.20
Nodes (13): KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen(), years() (+5 more)

### Community 35 - "app/layout.tsx"
Cohesion: 0.16
Nodes (11): FeatureFlagsPage(), src_app_globals, body, metadata, mono, serif, DebugBar(), Header() (+3 more)

### Community 36 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "next"
Cohesion: 0.10
Nodes (30): nextConfig, @hugeicons/react, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+22 more)

### Community 40 - "BulkImport.tsx"
Cohesion: 0.16
Nodes (13): ImportIssue, ImportRowResult, FALSE_BY_DEFAULT, ImportReport, EXAMPLE, FEE_FIELDS, FEES_EXAMPLE, IMPORT_EXCLUDED_FIELDS (+5 more)

### Community 41 - "altcha.ts"
Cohesion: 0.14
Nodes (20): server-only, GET(), message(), dynamic, KontaktPage(), metadata, createPrismaClient(), ALTCHA_COMPLEXITY (+12 more)

### Community 42 - "app/termine/page.tsx"
Cohesion: 0.23
Nodes (10): sitemap(), GET(), dynamic, metadata, SearchParams, TerminePage(), ViewSwitch(), CALENDAR_ICS_PATH (+2 more)

### Community 43 - "passwordStrength.ts"
Cohesion: 0.15
Nodes (16): bulkCreateUsersAction(), BulkImport(), check(), create(), loadFile(), replaceEntry(), NewUserForm(), handleSubmit() (+8 more)

### Community 44 - "Callout"
Cohesion: 0.07
Nodes (39): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, EmailChangeForm(), BackupSection(), DeploySection(), ForgotPasswordPage(), ContactForm() (+31 more)

### Community 45 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (25): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, FeeDefaultEntry, FeeRates, ageAt() (+17 more)

### Community 46 - "mailService.ts"
Cohesion: 0.06
Nodes (57): sanitize-html, parseMailForm(), sendEmailAction(), MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic (+49 more)

### Community 47 - "messages.ts"
Cohesion: 0.16
Nodes (19): withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage(), feeReminderMessage(), greeting() (+11 more)

### Community 48 - "executeAction"
Cohesion: 0.14
Nodes (20): zod, setFeatureFlag(), markContactRequestHandled(), removeContactRequest(), requestBackupLink(), triggerDeploy(), backupLinkMessage(), isFeatureFlagKey() (+12 more)

### Community 49 - "format.ts"
Cohesion: 0.07
Nodes (35): statusMeta(), TerminationItem, TerminationList(), confirm(), RegistrationFunnel(), share(), Stage, STAGES (+27 more)

### Community 50 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 51 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 52 - "EditUserForm.tsx"
Cohesion: 0.09
Nodes (21): toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), ActionResult, Mode, OwnTermination, ADMIN_ONLY_KEYS (+13 more)

### Community 53 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 54 - "prisma.ts"
Cohesion: 0.08
Nodes (42): bcryptjs, ref_crypto, ref_node_net, resetPassword(), resetSchema, notifyAdminsAboutRegistration(), verifyEmail(), AccountDisabledError (+34 more)

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "paymentHistoryPdf.tsx"
Cohesion: 0.29
Nodes (8): GET(), PostalAddress, PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee, getFeeDashboardData()

### Community 57 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 58 - "berlinTime.ts"
Cohesion: 0.24
Nodes (16): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+8 more)

### Community 59 - "featureFlagService.ts"
Cohesion: 0.31
Nodes (8): @prisma/client, POST(), FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, postExists(), FeatureFlagWithMeta

### Community 60 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "removeRateLimitEntry"
Cohesion: 0.21
Nodes (10): removeRateLimitEntry(), RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket (+2 more)

### Community 63 - "Site.tsx"
Cohesion: 0.16
Nodes (10): facts, metadata, metadata, metadata, LorenzAttractor, Cta(), CtaProps, Frame() (+2 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "registerAction.ts"
Cohesion: 0.20
Nodes (25): EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), requestPasswordReset(), submitContactRequest(), resendVerificationEmail(), submitMembershipApplication(), registerUser() (+17 more)

### Community 67 - "dashboard/page.tsx"
Cohesion: 0.07
Nodes (38): @react-pdf/renderer, GET(), byStatusThenName(), MailForm(), MailSuccessDialog(), ADMIN_ACTIONS, DashboardPage(), getStatusIcon() (+30 more)

### Community 68 - "@hugeicons/core-free-icons"
Cohesion: 0.09
Nodes (29): @hugeicons/core-free-icons, react, DeletePostButton(), ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat (+21 more)

### Community 69 - "app/blog/[id]/page.tsx"
Cohesion: 0.13
Nodes (26): generateMetadata(), Props, PublicBlogPost(), generateMetadata(), LeadPost(), PostRow(), Props, AdminBlogPage() (+18 more)

### Community 71 - "ref_node_assert"
Cohesion: 0.24
Nodes (6): ref_node_assert, ref_node_test, SUMMER, WINTER, one, two

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.11
Nodes (31): EditEventPage(), AdminEventsPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventById() (+23 more)

### Community 77 - "satzung/page.tsx"
Cohesion: 0.13
Nodes (26): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ApplicationWizard(), currentFormValues(), goToStep() (+18 more)

### Community 78 - "contact.ts"
Cohesion: 0.24
Nodes (7): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ContactInput, scoreSpam(), SPAM_KEYWORDS, legitimate

### Community 79 - "TypeSparklines.tsx"
Cohesion: 0.33
Nodes (8): longDayLabel(), sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 82 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 85 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 86 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 87 - "membershipTermination.ts"
Cohesion: 0.36
Nodes (5): berlinDateParts(), FEE_RECORD_RETENTION_YEARS, isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate()

### Community 89 - "EmailComposerDialog"
Cohesion: 0.50
Nodes (4): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 91 - "formatDate"
Cohesion: 0.11
Nodes (16): MetaLine(), MembershipCertificateCard(), AccountSection(), categories, events, TimelineCategory, TimelineEvent, categoryLabel (+8 more)

### Community 95 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **466 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+461 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 600 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `forgot-password/layout.tsx`, `sepa.ts`, `index.ts`, `mitglied-werden/page.tsx`, `isFeatureEnabled`, `authz.ts`, `AppError`, `serverStatus.ts`, `userService.ts`, `blogService.ts`, `login/page.tsx`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `LegalPage.tsx`, `package.json`, `requireAdmin`, `zahlungen/page.tsx`, `metadata.ts`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `feeService.ts`, `DebugBar.tsx`, `MailForm.tsx`, `KosmosTimeline.tsx`, `app/layout.tsx`, `getOptionalUser`, `altcha.ts`, `app/termine/page.tsx`, `Callout`, `ApplicationWizard.tsx`, `mailService.ts`, `messages.ts`, `executeAction`, `format.ts`, `EditUserForm.tsx`, `prisma.ts`, `paymentHistoryPdf.tsx`, `featureFlagService.ts`, `Footer.tsx`, `Site.tsx`, `registerAction.ts`, `dashboard/page.tsx`, `@hugeicons/core-free-icons`, `app/blog/[id]/page.tsx`, `satzung/page.tsx`, `formatDate`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.187) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/core-free-icons` to `index.ts`, `isFeatureEnabled`, `authz.ts`, `blogService.ts`, `MarketDiffusion.tsx`, `LegalPage.tsx`, `package.json`, `zahlungen/page.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `feeService.ts`, `DebugBar.tsx`, `iban.ts`, `MailForm.tsx`, `KosmosTimeline.tsx`, `app/layout.tsx`, `next`, `BulkImport.tsx`, `Callout`, `ApplicationWizard.tsx`, `format.ts`, `EditUserForm.tsx`, `Footer.tsx`, `Site.tsx`, `dashboard/page.tsx`, `app/blog/[id]/page.tsx`, `eventService.ts`, `altcha.d.ts`, `formatDate`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `@hugeicons/core-free-icons` connect `@hugeicons/core-free-icons` to `index.ts`, `mitglied-werden/page.tsx`, `isFeatureEnabled`, `events.ts`, `package.json`, `zahlungen/page.tsx`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `gravityPhysics.ts`, `feeService.ts`, `DebugBar.tsx`, `MailForm.tsx`, `KosmosTimeline.tsx`, `next`, `BulkImport.tsx`, `Callout`, `ApplicationWizard.tsx`, `format.ts`, `EditUserForm.tsx`, `Footer.tsx`, `Site.tsx`, `dashboard/page.tsx`, `app/blog/[id]/page.tsx`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _466 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08448540706605223 - nodes in this community are weakly interconnected._
- **Should `isFeatureEnabled` be split into smaller, more focused modules?**
  _Cohesion score 0.13793103448275862 - nodes in this community are weakly interconnected._