# Graph Report - wiphy  (2026-10-23)

## Corpus Check
- 358 files · ~171,630 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2049 nodes · 6776 edges · 100 communities (86 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8df0950f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- forgot-password/layout.tsx
- sepa.ts
- membershipFormSchemas.ts
- mitglied-werden/page.tsx
- userService.ts
- ics.ts
- AppError
- serverStatus.ts
- LegalPage.tsx
- blogService.ts
- auth.ts
- events.ts
- @hugeicons/react
- MarketDiffusion.tsx
- feeCalculation.ts
- mitgliedsantraege/actions.ts
- package.json
- dependencies
- boardService.ts
- formatNumber
- schemas.ts
- seed.ts
- dashboard/kontakt/actions.ts
- app/blog/page.tsx
- MemberDirectory.tsx
- securityEventService.ts
- security/page.tsx
- gravityPhysics.ts
- kosmos/actions.ts
- OutcomeTimeline.tsx
- countries.ts
- iban.ts
- photo/route.ts
- mail/page.tsx
- KosmosTimeline.tsx
- requireDebugAdmin
- zertifikat/pdf/route.ts
- compilerOptions
- devDependencies
- next
- userImport.test.ts
- prisma.ts
- feeService.ts
- passwordStrength.ts
- ServerDashboard.tsx
- ApplicationWizard.tsx
- mailService.ts
- messages.ts
- requireAdmin
- app/termine/page.tsx
- MailForm.tsx
- paymentHistoryPdf.tsx
- BulkImport.tsx
- EventForm.tsx
- executeAction
- EmailBodyField.tsx
- authz.ts
- EditUserForm
- berlinTime.ts
- errors.ts
- app/page.tsx
- userUpdateData.ts
- RateLimitTable
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- PhysicsTimeline.tsx
- vorstand/actions.ts
- index.ts
- MarkdownViewer.tsx
- CLAUDE.md
- ref_node_assert
- ActivityHeatmap.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- satzung/page.tsx
- DebugBar.tsx
- Footer.tsx
- altcha.d.ts
- DeleteMemberSection
- sessionPolicy.test.ts
- postcss.config.mjs
- termine/actions.ts
- ref_node_fs
- membershipTermination.ts
- { GET, POST }
- server/route.ts
- dashboard/page.tsx
- getFeeDashboardData
- BoardPhotoUploader
- RegistrationFunnel.tsx
- eslint.config.mjs
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 123 edges
2. `cn()` - 89 edges
3. `AppError` - 86 edges
4. `@hugeicons/core-free-icons` - 83 edges
5. `@hugeicons/react` - 83 edges
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
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `BlogIndexPage()` --calls--> `getPublishedPostPage()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/server/services/blogService.ts

## Import Cycles
- None detected.

## Communities (100 total, 14 thin omitted)

### Community 1 - "sepa.ts"
Cohesion: 0.22
Nodes (17): field(), POST(), TIME_ZONE, agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+9 more)

### Community 2 - "membershipFormSchemas.ts"
Cohesion: 0.17
Nodes (16): hasControlChars(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, addAddressIssues(), applicationPersonSchema (+8 more)

### Community 3 - "mitglied-werden/page.tsx"
Cohesion: 0.06
Nodes (38): ContactForm(), dynamic, KontaktPage(), metadata, createLoginChallenge(), LoginForm(), dynamic, LoginPage() (+30 more)

### Community 4 - "userService.ts"
Cohesion: 0.15
Nodes (24): GET(), KontoPage(), deleteUserAction(), EditUserPage(), metadata, updateUser(), createUserAction(), importEntriesSchema (+16 more)

### Community 5 - "ics.ts"
Cohesion: 0.17
Nodes (18): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs(), calendar() (+10 more)

### Community 6 - "AppError"
Cohesion: 0.16
Nodes (25): confirmMembershipTermination(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination() (+17 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.11
Nodes (26): ref_node_os, ServerPage(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG, DEPLOY_SCRIPT (+18 more)

### Community 8 - "LegalPage.tsx"
Cohesion: 0.16
Nodes (14): DATENSCHUTZ, metadata, impressum(), ImpressumPage(), metadata, anchorOf(), Block(), LegalPage() (+6 more)

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (64): POST(), beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager() (+56 more)

### Community 10 - "auth.ts"
Cohesion: 0.15
Nodes (16): bcryptjs, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError (+8 more)

### Community 11 - "events.ts"
Cohesion: 0.10
Nodes (41): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), GET(), dynamic, EventDetailPage(), generateMetadata(), Props (+33 more)

### Community 12 - "@hugeicons/react"
Cohesion: 0.08
Nodes (33): @hugeicons/react, react, DeletePostButton(), ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat (+25 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (32): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), deriv() (+24 more)

### Community 14 - "feeCalculation.ts"
Cohesion: 0.27
Nodes (10): billableMonths(), calculateFee(), calculateFeeAmount(), FeeBreakdown, FeeInput, NON_DIRECT_DEBIT_SURCHARGE, wasMemberInYear(), withResolvedFees() (+2 more)

### Community 15 - "mitgliedsantraege/actions.ts"
Cohesion: 0.11
Nodes (33): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), MembershipApplicationsPage(), membershipApprovedMessage(), FeeDefaultEntry, FeeRates (+25 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "boardService.ts"
Cohesion: 0.16
Nodes (23): moveMemberOrder(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember(), deleteMemberById(), deletePhoto() (+15 more)

### Community 19 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 20 - "schemas.ts"
Cohesion: 0.05
Nodes (36): isCalendarDate(), absent(), AdminCreateUserInput, berlinDateTime(), blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema (+28 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (7): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), deleteContactRequest(), setContactRequestHandled()

### Community 23 - "app/blog/page.tsx"
Cohesion: 0.07
Nodes (24): BlogIndexPage(), generateMetadata(), MetaLine(), Props, DashboardLayout(), metadata, src_app_globals, body (+16 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.10
Nodes (25): compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase (+17 more)

### Community 25 - "securityEventService.ts"
Cohesion: 0.18
Nodes (17): SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel() (+9 more)

### Community 26 - "security/page.tsx"
Cohesion: 0.19
Nodes (13): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+5 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "kosmos/actions.ts"
Cohesion: 0.25
Nodes (12): server-only, revealKosmosEmailAction(), setKosmosVisibilityAction(), KosmosPage(), toYear(), countKosmosMembers(), getKosmosEmail(), getKosmosMembers() (+4 more)

### Community 29 - "OutcomeTimeline.tsx"
Cohesion: 0.15
Nodes (19): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+11 more)

### Community 30 - "countries.ts"
Cohesion: 0.18
Nodes (15): SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS, countryName(), english (+7 more)

### Community 31 - "iban.ts"
Cohesion: 0.23
Nodes (20): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+12 more)

### Community 32 - "photo/route.ts"
Cohesion: 0.20
Nodes (10): POST(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, processBoardPhoto(), ProcessedBoardPhoto, QUALITY_LADDER (+2 more)

### Community 33 - "mail/page.tsx"
Cohesion: 0.18
Nodes (10): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, AccountSection() (+2 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.20
Nodes (13): KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen(), years() (+5 more)

### Community 35 - "requireDebugAdmin"
Cohesion: 0.21
Nodes (11): FeatureFlagsPage(), removeRateLimitEntry(), confirmDelete(), triggerDeploy(), requireDebugAdmin(), bucketFromKey(), deleteRateLimitEntry(), getRateLimitEntries() (+3 more)

### Community 36 - "zertifikat/pdf/route.ts"
Cohesion: 0.16
Nodes (23): GET(), DashboardPage(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative() (+15 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "next"
Cohesion: 0.10
Nodes (30): nextConfig, @hugeicons/core-free-icons, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+22 more)

### Community 40 - "userImport.test.ts"
Cohesion: 0.24
Nodes (9): EXAMPLE, FEE_FIELDS, FEES_EXAMPLE, IMPORT_EXCLUDED_FIELDS, IMPORT_KEYS, IMPORT_SECTIONS, ImportEntry, ImportField (+1 more)

### Community 41 - "prisma.ts"
Cohesion: 0.11
Nodes (27): ref_crypto, GET(), message(), createPrismaClient(), globalForPrisma, prisma, consumeAltchaSolution(), readExpiry() (+19 more)

### Community 42 - "feeService.ts"
Cohesion: 0.17
Nodes (20): feeRetentionCutoffYear(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), pruneArchivedFees(), resolveIsStudentDefault(), syncStudentYear() (+12 more)

### Community 43 - "passwordStrength.ts"
Cohesion: 0.15
Nodes (16): bulkCreateUsersAction(), BulkImport(), check(), create(), loadFile(), replaceEntry(), NewUserForm(), handleSubmit() (+8 more)

### Community 44 - "ServerDashboard.tsx"
Cohesion: 0.07
Nodes (39): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, EmailChangeForm(), PasswordChangeButton(), BackupSection(), DeploySection(), formatBytes() (+31 more)

### Community 45 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (23): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, ageAt(), CONSENT_VERSION, DATENSCHUTZ_URL (+15 more)

### Community 46 - "mailService.ts"
Cohesion: 0.06
Nodes (51): sanitize-html, parseMailForm(), sendEmailAction(), blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature (+43 more)

### Community 47 - "messages.ts"
Cohesion: 0.13
Nodes (25): submitContactRequest(), submitMembershipApplication(), withdrawMembershipApplication(), EmailMessage, adminCreatedUserMessage(), contactRequestMessage(), emailChangeMessage(), feeReminderMessage() (+17 more)

### Community 48 - "requireAdmin"
Cohesion: 0.21
Nodes (19): createDraft(), deletePost(), savePost(), ContactRequestsPage(), createEventDraft(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount() (+11 more)

### Community 49 - "app/termine/page.tsx"
Cohesion: 0.27
Nodes (9): sitemap(), dynamic, metadata, SearchParams, TerminePage(), ViewSwitch(), CALENDAR_ICS_PATH, getPastEvents() (+1 more)

### Community 50 - "MailForm.tsx"
Cohesion: 0.11
Nodes (13): MailAnnouncement, byStatusThenName(), MailForm(), MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS (+5 more)

### Community 51 - "paymentHistoryPdf.tsx"
Cohesion: 0.18
Nodes (16): @react-pdf/renderer, ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange() (+8 more)

### Community 52 - "BulkImport.tsx"
Cohesion: 0.07
Nodes (28): getStatusIcon(), ProfileSummary(), ProfileSummaryUser, ActionResult, Mode, OwnTermination, ADMIN_ONLY_KEYS, FIELD_LABELS (+20 more)

### Community 53 - "EventForm.tsx"
Cohesion: 0.32
Nodes (5): toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), MarkdownEditor()

### Community 54 - "executeAction"
Cohesion: 0.16
Nodes (33): EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), requestBackupLink(), requestPasswordReset(), resendVerificationEmail(), registerUser(), resetPassword() (+25 more)

### Community 55 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 56 - "authz.ts"
Cohesion: 0.26
Nodes (10): GET(), GET(), GET(), getOptionalUser(), normalizeRole(), sessionUser(), UserContext, withViewOverride() (+2 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "berlinTime.ts"
Cohesion: 0.34
Nodes (12): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), pad(), parseBerlinLocalInput(), PARTS (+4 more)

### Community 59 - "errors.ts"
Cohesion: 0.15
Nodes (16): @prisma/client, zod, setFeatureFlag(), resetSchema, FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER (+8 more)

### Community 60 - "app/page.tsx"
Cohesion: 0.11
Nodes (30): escapeXml(), GET(), generateMetadata(), Props, PublicBlogPost(), LeadPost(), PostRow(), EditBlogPage() (+22 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "RateLimitTable"
Cohesion: 0.28
Nodes (7): RateLimitTable(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 63 - "Site.tsx"
Cohesion: 0.14
Nodes (12): facts, metadata, metadata, getInitials(), metadata, VorstandPage(), LorenzAttractor, Cta() (+4 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "PhysicsTimeline.tsx"
Cohesion: 0.27
Nodes (6): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline()

### Community 67 - "vorstand/actions.ts"
Cohesion: 0.42
Nodes (8): deleteMember(), deletePhotoAction(), moveMemberInList(), revalidateBoard(), saveMember(), removeAdminMember(), removeMemberPhoto(), saveAdminMember()

### Community 68 - "index.ts"
Cohesion: 0.07
Nodes (49): CtaCard(), InfoTooltip(), RateLimitTableProps, AmountDialog(), chipTones, CommentDialog(), DirectoryAccount, displayName() (+41 more)

### Community 69 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 71 - "ref_node_assert"
Cohesion: 0.11
Nodes (13): ref_node_assert, ref_node_net, ref_node_test, MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, addressKey(), HeaderBag (+5 more)

### Community 72 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.13
Nodes (29): EditEventPage(), createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventById(), findEventOptions(), findLatestPastEvent() (+21 more)

### Community 77 - "satzung/page.tsx"
Cohesion: 0.16
Nodes (18): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ApplicationWizard(), currentFormValues(), goToStep() (+10 more)

### Community 78 - "DebugBar.tsx"
Cohesion: 0.15
Nodes (18): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), commit, DebugBar(), LINKS (+10 more)

### Community 79 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "termine/actions.ts"
Cohesion: 0.39
Nodes (7): deleteEventAction(), revalidateEvent(), saveEventAction(), removeEvent(), saveEvent(), eventDeleteSchema, eventSaveSchema

### Community 86 - "ref_node_fs"
Cohesion: 0.40
Nodes (5): ref_node_fs, sharp, BACKGROUND, icon(), main()

### Community 87 - "membershipTermination.ts"
Cohesion: 0.36
Nodes (5): berlinDateParts(), FEE_RECORD_RETENTION_YEARS, isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate()

### Community 89 - "server/route.ts"
Cohesion: 0.48
Nodes (5): GET(), GET(), auth, getAppLogs(), getSystemStats()

### Community 91 - "dashboard/page.tsx"
Cohesion: 0.08
Nodes (26): MailSuccessDialog(), MembershipCertificateCard(), dynamic, metadata, statusMeta(), TerminationItem, TerminationList(), confirm() (+18 more)

### Community 92 - "getFeeDashboardData"
Cohesion: 0.33
Nodes (7): UserManagementPage(), ZahlungenPage(), findUsersWithFees(), getAccountsWithFees(), getFeeDashboardData(), isInFeeYear(), countCompletedTerminationsSince()

### Community 93 - "BoardPhotoUploader"
Cohesion: 0.38
Nodes (7): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), AdminBoardPage(), boardPhotoUrl(), formatBytes()

### Community 94 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 95 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **464 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+459 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 590 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `forgot-password/layout.tsx`, `sepa.ts`, `mitglied-werden/page.tsx`, `userService.ts`, `ics.ts`, `AppError`, `LegalPage.tsx`, `blogService.ts`, `events.ts`, `@hugeicons/react`, `MarketDiffusion.tsx`, `mitgliedsantraege/actions.ts`, `package.json`, `dashboard/kontakt/actions.ts`, `app/blog/page.tsx`, `MemberDirectory.tsx`, `security/page.tsx`, `gravityPhysics.ts`, `kosmos/actions.ts`, `photo/route.ts`, `mail/page.tsx`, `KosmosTimeline.tsx`, `requireDebugAdmin`, `zertifikat/pdf/route.ts`, `prisma.ts`, `ServerDashboard.tsx`, `ApplicationWizard.tsx`, `mailService.ts`, `messages.ts`, `requireAdmin`, `app/termine/page.tsx`, `MailForm.tsx`, `BulkImport.tsx`, `EventForm.tsx`, `executeAction`, `authz.ts`, `errors.ts`, `app/page.tsx`, `Site.tsx`, `vorstand/actions.ts`, `index.ts`, `satzung/page.tsx`, `DebugBar.tsx`, `Footer.tsx`, `termine/actions.ts`, `server/route.ts`, `dashboard/page.tsx`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.180) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/react` to `userService.ts`, `LegalPage.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `package.json`, `app/blog/page.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `iban.ts`, `KosmosTimeline.tsx`, `next`, `ServerDashboard.tsx`, `ApplicationWizard.tsx`, `MailForm.tsx`, `BulkImport.tsx`, `EventForm.tsx`, `authz.ts`, `app/page.tsx`, `Site.tsx`, `PhysicsTimeline.tsx`, `index.ts`, `eventService.ts`, `DebugBar.tsx`, `Footer.tsx`, `altcha.d.ts`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `AppError` connect `AppError` to `photo/route.ts`, `requireDebugAdmin`, `userService.ts`, `serverStatus.ts`, `blogService.ts`, `prisma.ts`, `auth.ts`, `eventService.ts`, `mailService.ts`, `mitgliedsantraege/actions.ts`, `requireAdmin`, `messages.ts`, `boardService.ts`, `termine/actions.ts`, `dashboard/kontakt/actions.ts`, `executeAction`, `errors.ts`, `kosmos/actions.ts`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _464 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `mitglied-werden/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._
- **Should `serverStatus.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10846560846560846 - nodes in this community are weakly interconnected._