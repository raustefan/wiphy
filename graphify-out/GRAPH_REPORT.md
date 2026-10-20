# Graph Report - wiphy  (2026-10-20)

## Corpus Check
- 353 files · ~162,329 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 1983 nodes · 6475 edges · 91 communities (82 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 46 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5ed6be06`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- sepa/route.ts
- ApplicationWizard.tsx
- mitglied-werden/page.tsx
- MailForm.tsx
- ics.ts
- format.ts
- serverStatus.ts
- DirectoryTable.tsx
- blogService.ts
- isFeatureEnabled
- events.ts
- lucide-react
- MarketDiffusion.tsx
- feeService.ts
- userService.ts
- package.json
- dependencies
- boardService.ts
- feeDefaults.ts
- schemas.ts
- seed.ts
- LegalPage.tsx
- app/layout.tsx
- MemberDirectory.tsx
- OutcomeTimeline.tsx
- ref_node_assert
- gravityPhysics.ts
- mail/page.tsx
- authz.ts
- mail/actions.ts
- normalizeIban
- mitgliedsantraege/page.tsx
- mitgliedsantraege/actions.ts
- KosmosTimeline.tsx
- zahlungen/page.tsx
- dashboard/page.tsx
- compilerOptions
- devDependencies
- index.ts
- ref_node_fs
- altcha.ts
- AppError
- BulkImport.tsx
- Callout
- mailService.ts
- registerAction.ts
- executeAction
- messages.ts
- rateLimitService.ts
- EditUserForm.tsx
- ActivityHeatmap.tsx
- securityEventService.ts
- users/page.tsx
- auth.ts
- EmailBodyField.tsx
- getOptionalUser
- EditUserForm
- ApplicationList
- MarkdownViewer.tsx
- app/blog/[id]/page.tsx
- userUpdateData.ts
- formatNumber
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- kosmos/actions.ts
- security/page.tsx
- PhysicsTimeline.tsx
- StatTiles.tsx
- CLAUDE.md
- deletePhotoAction
- ApplicationWizard
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- ServerDashboard.tsx
- DebugBar.tsx
- Footer.tsx
- altcha.d.ts
- feature-flags/page.tsx
- eslint.config.mjs
- postcss.config.mjs
- DeleteMemberSection
- dashboard/kontakt/page.tsx
- { GET, POST }
- requireAdmin

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
- `Befunde vom 2026-10-20` --references--> `siteUrl()`  [INFERRED]
  BETRIEB.md → src/lib/server/siteUrl.ts
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `ContactRequestList()` --indirect_call--> `markContactRequestHandled()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts
- `confirmDelete()` --indirect_call--> `removeContactRequest()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts

## Import Cycles
- None detected.

## Communities (91 total, 9 thin omitted)

### Community 0 - "next"
Cohesion: 0.09
Nodes (13): nextConfig, next, metadata, metadata, HomePage(), levels, STRIP_IDS, STUDY_PROGRAMS (+5 more)

### Community 1 - "sepa/route.ts"
Cohesion: 0.23
Nodes (16): field(), POST(), SepaDialog(), TIME_ZONE, agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId() (+8 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (31): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), PaymentOption(), ageAt() (+23 more)

### Community 3 - "mitglied-werden/page.tsx"
Cohesion: 0.14
Nodes (19): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+11 more)

### Community 4 - "MailForm.tsx"
Cohesion: 0.18
Nodes (11): MailFormProps, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, EmailBodyField(), useEmailEditor(), EmailComposerDialog(), closeDialog() (+3 more)

### Community 5 - "ics.ts"
Cohesion: 0.14
Nodes (23): RFC-5545, GET(), GET(), eventPath(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs() (+15 more)

### Community 6 - "format.ts"
Cohesion: 0.14
Nodes (15): AdminBlogPage(), dynamic, KontoPage(), metadata, DATE_TIME, EURO, formatDateShort(), formatDateTime() (+7 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.11
Nodes (29): ref_node_os, GET(), ServerPage(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG (+21 more)

### Community 8 - "DirectoryTable.tsx"
Cohesion: 0.11
Nodes (19): AmountDialog(), chipTones, CommentDialog(), compareBy(), compareNullable(), displayName(), explainFee(), GROUPS (+11 more)

### Community 9 - "blogService.ts"
Cohesion: 0.05
Nodes (68): sharp, BlogIndexPage(), beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+60 more)

### Community 10 - "isFeatureEnabled"
Cohesion: 0.18
Nodes (17): @prisma/client, POST(), POST(), deleteUserAction(), EditUserPage(), metadata, updateUser(), FEATURE_FLAG_DESCRIPTIONS (+9 more)

### Community 11 - "events.ts"
Cohesion: 0.11
Nodes (34): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), dynamic, generateMetadata(), Props, TerminePage(), EventCard() (+26 more)

### Community 12 - "lucide-react"
Cohesion: 0.12
Nodes (23): lucide-react, react, DeletePostButton(), ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, InfoTooltip() (+15 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.08
Nodes (39): toggleAllDay(), toDateTimeValue(), toDayValue(), Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext (+31 more)

### Community 14 - "feeService.ts"
Cohesion: 0.14
Nodes (22): @react-pdf/renderer, GET(), FeeBreakdown, PaymentHistoryPdf(), PdfUser, statusLabel(), styles, clearFeeAmountOverride() (+14 more)

### Community 15 - "userService.ts"
Cohesion: 0.14
Nodes (31): bcryptjs, EMAIL_CHANGE_ERRORS, requestPasswordChange(), requestPasswordReset(), notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage() (+23 more)

### Community 16 - "package.json"
Cohesion: 0.10
Nodes (19): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+11 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+18 more)

### Community 18 - "boardService.ts"
Cohesion: 0.09
Nodes (37): AdminBoardPage(), getInitials(), VorstandPage(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, boardPhotoUrl(), MAX_BOARD_PHOTO_UPLOAD_BYTES, moveMemberOrder() (+29 more)

### Community 19 - "feeDefaults.ts"
Cohesion: 0.23
Nodes (12): FeeDefaultEntry, FeeRates, resolveFeeDefault(), deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), archiveFeesOfUser(), getFeeDefaults() (+4 more)

### Community 20 - "schemas.ts"
Cohesion: 0.10
Nodes (28): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+20 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "LegalPage.tsx"
Cohesion: 0.15
Nodes (14): DATENSCHUTZ, metadata, impressum(), ImpressumPage(), metadata, SATZUNG, anchorOf(), Block() (+6 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.09
Nodes (21): escapeXml(), GET(), DashboardLayout(), metadata, src_app_globals, body, metadata, mono (+13 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.11
Nodes (23): DirectoryAccount, DirectoryTable(), selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase, DirectoryFilters (+15 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.15
Nodes (19): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+11 more)

### Community 26 - "ref_node_assert"
Cohesion: 0.13
Nodes (13): ref_node_assert, ref_node_test, dynamic, LoginPage(), metadata, NOTICES, Props, MAX_MESSAGE_LENGTH (+5 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "mail/page.tsx"
Cohesion: 0.09
Nodes (36): MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata (+28 more)

### Community 29 - "authz.ts"
Cohesion: 0.20
Nodes (17): GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, DebugBar(), Header(), AS_MEMBER_COOKIE (+9 more)

### Community 30 - "mail/actions.ts"
Cohesion: 0.23
Nodes (13): parseMailForm(), sendEmailAction(), parseDirectMailForm(), sendDirectMailAction(), resolveRecipientEmails(), resolveUsersByIds(), resolveUsersByTarget(), sendMailForTarget() (+5 more)

### Community 31 - "normalizeIban"
Cohesion: 0.27
Nodes (16): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+8 more)

### Community 32 - "mitgliedsantraege/page.tsx"
Cohesion: 0.17
Nodes (15): dynamic, MembershipApplicationsPage(), metadata, planApplicationFees(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue() (+7 more)

### Community 33 - "mitgliedsantraege/actions.ts"
Cohesion: 0.17
Nodes (21): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), countOpenApplications(), deleteApplication(), findApplicationById(), findApplications() (+13 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.15
Nodes (20): KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen(), years() (+12 more)

### Community 35 - "zahlungen/page.tsx"
Cohesion: 0.16
Nodes (24): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), BankValues, dynamic, metadata (+16 more)

### Community 36 - "dashboard/page.tsx"
Cohesion: 0.06
Nodes (43): GET(), MetaLine(), byStatusThenName(), MailForm(), MailSuccessDialog(), MembershipCertificateCard(), statusMeta(), TerminationList() (+35 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "index.ts"
Cohesion: 0.09
Nodes (33): metadata, CtaCard(), DashboardPageHeader(), DashboardPageHeaderProps, MailUserOption, dynamic, metadata, FeeDefaultRow (+25 more)

### Community 40 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 41 - "altcha.ts"
Cohesion: 0.29
Nodes (10): dynamic, KontaktPage(), metadata, ALTCHA_COMPLEXITY, consumeAltchaSolution(), createAltchaChallenge(), readExpiry(), readSignature() (+2 more)

### Community 42 - "AppError"
Cohesion: 0.18
Nodes (16): GET(), message(), confirmMembershipTermination(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), createPrismaClient(), getDatabaseUrl() (+8 more)

### Community 43 - "BulkImport.tsx"
Cohesion: 0.10
Nodes (21): bulkCreateUsersAction(), ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row (+13 more)

### Community 44 - "Callout"
Cohesion: 0.07
Nodes (40): next-auth, EmailChangeForm(), PasswordChangeButton(), BackupSection(), ForgotPasswordPage(), ContactForm(), createLoginChallenge(), FaqItem (+32 more)

### Community 45 - "mailService.ts"
Cohesion: 0.18
Nodes (13): sanitize-html, eventContactPath(), ENTITIES, htmlToText(), composeMessage(), eventBlocks(), greeting(), MailTarget (+5 more)

### Community 46 - "registerAction.ts"
Cohesion: 0.19
Nodes (20): requestBackupLink(), resendVerificationEmail(), registerUser(), backupLinkMessage(), registrationConfirmationMessage(), getMailTransporter(), normalize(), Recipients (+12 more)

### Community 47 - "executeAction"
Cohesion: 0.11
Nodes (41): ref_crypto, zod, markContactRequestHandled(), removeContactRequest(), requestEmailChangeAction(), setKosmosVisibilityAction(), deleteOwnAccount(), disableOwnAccount() (+33 more)

### Community 48 - "messages.ts"
Cohesion: 0.30
Nodes (11): accountDeletedMessage(), adminCreatedUserMessage(), feeReminderMessage(), greeting(), loginDisabledMessage(), membershipApprovedMessage(), membershipReceivedMessage(), membershipRejectedMessage() (+3 more)

### Community 49 - "rateLimitService.ts"
Cohesion: 0.14
Nodes (15): removeRateLimitEntry(), RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket (+7 more)

### Community 50 - "EditUserForm.tsx"
Cohesion: 0.10
Nodes (23): @uiw/react-md-editor, metadata, TerminationItem, EventFormData, ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP (+15 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.18
Nodes (17): SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel() (+9 more)

### Community 53 - "users/page.tsx"
Cohesion: 0.29
Nodes (10): DialogButton(), metadata, StatTile(), UserManagementPage(), directoryStats(), getAccountsWithFees(), getArchivedFees(), getExistingFeeYears() (+2 more)

### Community 54 - "auth.ts"
Cohesion: 0.11
Nodes (23): ref_node_net, resetPassword(), resetSchema, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers (+15 more)

### Community 55 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 56 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 59 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

### Community 60 - "app/blog/[id]/page.tsx"
Cohesion: 0.15
Nodes (24): generateMetadata(), Props, PublicBlogPost(), generateMetadata(), LeadPost(), PostRow(), Props, EventDetailPage() (+16 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "formatNumber"
Cohesion: 0.18
Nodes (12): RegistrationFunnel(), share(), Stage, STAGES, PAD, PLOT, TICKS, UsageChart() (+4 more)

### Community 63 - "Site.tsx"
Cohesion: 0.11
Nodes (16): facts, metadata, metadata, dynamic, metadata, SearchParams, metadata, LorenzAttractor (+8 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "kosmos/actions.ts"
Cohesion: 0.43
Nodes (6): server-only, revealKosmosEmailAction(), getKosmosEmail(), isKosmosParticipant(), PARTICIPANT, setKosmosVisibility()

### Community 67 - "security/page.tsx"
Cohesion: 0.19
Nodes (13): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+5 more)

### Community 68 - "PhysicsTimeline.tsx"
Cohesion: 0.27
Nodes (6): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline()

### Community 69 - "StatTiles.tsx"
Cohesion: 0.33
Nodes (5): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT

### Community 71 - "deletePhotoAction"
Cohesion: 0.53
Nodes (6): deletePhotoAction(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), formatBytes()

### Community 72 - "ApplicationWizard"
Cohesion: 0.70
Nodes (5): ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.10
Nodes (36): EditBlogPage(), dynamic, EditEventPage(), metadata, UPCOMING_ALERT_MONTHS, AnnouncedEvent, createEvent(), deleteEventById() (+28 more)

### Community 77 - "ServerDashboard.tsx"
Cohesion: 0.23
Nodes (9): triggerDeploy(), metadata, DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel() (+1 more)

### Community 78 - "DebugBar.tsx"
Cohesion: 0.19
Nodes (9): ref_node_child_process, ref_node_util, commit, LINKS, TIME, DebugConsole(), AppLogs, ADMIN_SESSION_MAX_MS (+1 more)

### Community 79 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "feature-flags/page.tsx"
Cohesion: 0.24
Nodes (10): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), metadata, FEATURE_FLAG_CATEGORIES, isFeatureFlagKey(), requireDebugAdmin() (+2 more)

### Community 82 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 87 - "dashboard/kontakt/page.tsx"
Cohesion: 0.13
Nodes (15): ContactRequestItem, ContactRequestList(), confirmDelete(), run(), dateFormat, dynamic, metadata, buttonClasses() (+7 more)

### Community 93 - "requireAdmin"
Cohesion: 0.10
Nodes (39): createDraft(), deletePost(), savePost(), ContactRequestsPage(), createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction() (+31 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **445 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+440 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 570 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `sepa/route.ts`, `ApplicationWizard.tsx`, `mitglied-werden/page.tsx`, `ics.ts`, `format.ts`, `serverStatus.ts`, `DirectoryTable.tsx`, `blogService.ts`, `isFeatureEnabled`, `events.ts`, `lucide-react`, `MarketDiffusion.tsx`, `feeService.ts`, `userService.ts`, `package.json`, `LegalPage.tsx`, `app/layout.tsx`, `MemberDirectory.tsx`, `ref_node_assert`, `gravityPhysics.ts`, `mail/page.tsx`, `authz.ts`, `mail/actions.ts`, `mitgliedsantraege/page.tsx`, `mitgliedsantraege/actions.ts`, `KosmosTimeline.tsx`, `zahlungen/page.tsx`, `dashboard/page.tsx`, `index.ts`, `altcha.ts`, `AppError`, `Callout`, `registerAction.ts`, `executeAction`, `rateLimitService.ts`, `EditUserForm.tsx`, `users/page.tsx`, `auth.ts`, `getOptionalUser`, `app/blog/[id]/page.tsx`, `Site.tsx`, `kosmos/actions.ts`, `security/page.tsx`, `eventService.ts`, `ServerDashboard.tsx`, `DebugBar.tsx`, `Footer.tsx`, `feature-flags/page.tsx`, `dashboard/kontakt/page.tsx`, `requireAdmin`?**
  _High betweenness centrality (0.219) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `ApplicationWizard.tsx`, `MailForm.tsx`, `DirectoryTable.tsx`, `blogService.ts`, `isFeatureEnabled`, `MarketDiffusion.tsx`, `package.json`, `LegalPage.tsx`, `app/layout.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `authz.ts`, `normalizeIban`, `KosmosTimeline.tsx`, `zahlungen/page.tsx`, `dashboard/page.tsx`, `index.ts`, `BulkImport.tsx`, `Callout`, `EditUserForm.tsx`, `users/page.tsx`, `app/blog/[id]/page.tsx`, `Site.tsx`, `PhysicsTimeline.tsx`, `eventService.ts`, `ServerDashboard.tsx`, `DebugBar.tsx`, `Footer.tsx`, `altcha.d.ts`, `feature-flags/page.tsx`, `dashboard/kontakt/page.tsx`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `ApplicationWizard.tsx`, `mitglied-werden/page.tsx`, `MailForm.tsx`, `format.ts`, `DirectoryTable.tsx`, `isFeatureEnabled`, `events.ts`, `MarketDiffusion.tsx`, `package.json`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `gravityPhysics.ts`, `mitgliedsantraege/page.tsx`, `KosmosTimeline.tsx`, `zahlungen/page.tsx`, `dashboard/page.tsx`, `index.ts`, `Callout`, `EditUserForm.tsx`, `users/page.tsx`, `app/blog/[id]/page.tsx`, `formatNumber`, `Site.tsx`, `security/page.tsx`, `StatTiles.tsx`, `eventService.ts`, `ServerDashboard.tsx`, `DebugBar.tsx`, `Footer.tsx`, `feature-flags/page.tsx`, `dashboard/kontakt/page.tsx`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _445 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.08831908831908832 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07422402159244265 - nodes in this community are weakly interconnected._