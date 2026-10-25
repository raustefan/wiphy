# Graph Report - wiphy  (2026-10-25)

## Corpus Check
- 366 files · ~174,871 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2084 nodes · 6899 edges · 97 communities (83 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6485439b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- forgot-password/layout.tsx
- sepa.ts
- index.ts
- blocks.ts
- requireAdmin
- feeService.ts
- userService.ts
- serverStatus.ts
- ServerDashboard.tsx
- blogService.ts
- zertifikat/pdf/route.ts
- events.ts
- ics.ts
- MarketDiffusion.tsx
- formatNumber
- getOptionalUser
- package.json
- dependencies
- executeAction
- app/termine/page.tsx
- schemas.ts
- seed.ts
- dashboard/page.tsx
- app/layout.tsx
- DirectoryTable
- securityEventService.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- @hugeicons/core-free-icons
- authz.ts
- countries.ts
- blog/actions.ts
- convert_alumni.py
- SecurityPage
- KosmosTimeline.tsx
- DirectoryTable.tsx
- accountActions.ts
- compilerOptions
- devDependencies
- next
- Button.tsx
- getDisabledPages
- mail/page.tsx
- MarkdownViewer.tsx
- Callout
- ApplicationWizard.tsx
- mailService.ts
- AppError
- iban.ts
- ref_node_assert
- EmailBodyField.tsx
- ApplicationList
- cn
- securityLabels.ts
- registerAction.ts
- EditUserForm
- app/kontakt/page.tsx
- blogImageProcessing.ts
- berlinTime.ts
- featureFlagService.ts
- Footer.tsx
- userUpdateData.ts
- requireDebugAdmin
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- sendEmail
- BulkImport.tsx
- MailForm.tsx
- app/blog/[id]/page.tsx
- CLAUDE.md
- MailForm
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- mitglied-werden/page.tsx
- mitglied-werden/actions.ts
- altcha.d.ts
- DeleteMemberSection
- ActivityHeatmap.tsx
- postcss.config.mjs
- prisma.ts
- ref_node_fs
- membershipTermination.ts
- { GET, POST }
- app/page.tsx
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- TypeSparklines.tsx
- RegistrationFunnel.tsx
- MarkdownEditor.tsx
- sessionPolicy.test.ts

## God Nodes (most connected - your core abstractions)
1. `next` - 126 edges
2. `cn()` - 89 edges
3. `AppError` - 86 edges
4. `@hugeicons/core-free-icons` - 84 edges
5. `@hugeicons/react` - 84 edges
6. `react` - 74 edges
7. `executeAction()` - 73 edges
8. `requireAdmin()` - 56 edges
9. `isFeatureEnabled()` - 50 edges
10. `Button()` - 46 edges

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

## Communities (97 total, 14 thin omitted)

### Community 1 - "sepa.ts"
Cohesion: 0.25
Nodes (15): field(), POST(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate(), isValidCreditorId() (+7 more)

### Community 2 - "index.ts"
Cohesion: 0.13
Nodes (28): DeletePostButton(), metadata, InfoTooltip(), dynamic, metadata, RateLimitTableProps, FeeDefaultRow, DeleteMemberButton() (+20 more)

### Community 3 - "blocks.ts"
Cohesion: 0.20
Nodes (20): blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml() (+12 more)

### Community 4 - "requireAdmin"
Cohesion: 0.06
Nodes (67): createDraft(), deletePost(), savePost(), ContactRequestsPage(), createEventDraft(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount() (+59 more)

### Community 5 - "feeService.ts"
Cohesion: 0.16
Nodes (22): isSepaIban(), isValidBic(), requiresBic(), addDirectDebitIssues(), SepaDebtorAddress, clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears() (+14 more)

### Community 6 - "userService.ts"
Cohesion: 0.12
Nodes (33): KontoPage(), withdrawMembershipTermination(), deleteUserAction(), EditUserPage(), metadata, updateUser(), createUserAction(), importEntriesSchema (+25 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.09
Nodes (36): ref_node_os, GET(), GET(), triggerDeploy(), ServerPage(), auth, BackupRun, BackupStatus (+28 more)

### Community 8 - "ServerDashboard.tsx"
Cohesion: 0.24
Nodes (8): BackupHistory(), BackupSection(), DeploySection(), formatUptime(), Sample, ServerDashboard(), timeLabel(), formatBytes()

### Community 9 - "blogService.ts"
Cohesion: 0.11
Nodes (34): POST(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost(), deleteImage(), deletePostById(), eventLinkSelect (+26 more)

### Community 10 - "zertifikat/pdf/route.ts"
Cohesion: 0.09
Nodes (35): GET(), impressum(), ImpressumPage(), metadata, SATZUNG, anchorOf(), Block(), LegalPage() (+27 more)

### Community 11 - "events.ts"
Cohesion: 0.12
Nodes (36): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard() (+28 more)

### Community 12 - "ics.ts"
Cohesion: 0.24
Nodes (15): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), calendar(), describe() (+7 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (32): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), deriv() (+24 more)

### Community 14 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 15 - "getOptionalUser"
Cohesion: 0.15
Nodes (15): GET(), GET(), GET(), confirmPrivacyPolicy(), ConfirmPrivacyPolicyPage(), metadata, Props, DATENSCHUTZ (+7 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): eslintConfig, name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "executeAction"
Cohesion: 0.15
Nodes (19): zod, markContactRequestHandled(), removeContactRequest(), revealKosmosEmailAction(), setKosmosVisibilityAction(), deleteEventAction(), revalidateEvent(), saveEventAction() (+11 more)

### Community 19 - "app/termine/page.tsx"
Cohesion: 0.27
Nodes (9): sitemap(), dynamic, metadata, SearchParams, TerminePage(), ViewSwitch(), CALENDAR_ICS_PATH, getPastEvents() (+1 more)

### Community 20 - "schemas.ts"
Cohesion: 0.05
Nodes (47): toCountryCode(), isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, applicationPersonSchema (+39 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "dashboard/page.tsx"
Cohesion: 0.07
Nodes (29): ContactRequestList(), confirmDelete(), run(), MailSuccessDialog(), MembershipCertificateCard(), dynamic, metadata, statusMeta() (+21 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.10
Nodes (21): escapeXml(), GET(), DashboardLayout(), metadata, src_app_globals, body, metadata, mono (+13 more)

### Community 24 - "DirectoryTable"
Cohesion: 0.10
Nodes (25): compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase (+17 more)

### Community 25 - "securityEventService.ts"
Cohesion: 0.20
Nodes (14): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview(), HeatCell (+6 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (13): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+5 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "@hugeicons/core-free-icons"
Cohesion: 0.12
Nodes (25): @hugeicons/core-free-icons, @hugeicons/react, react, ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat (+17 more)

### Community 29 - "authz.ts"
Cohesion: 0.14
Nodes (22): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage(), commit, DebugBar() (+14 more)

### Community 30 - "countries.ts"
Cohesion: 0.13
Nodes (19): @react-pdf/renderer, GET(), SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS (+11 more)

### Community 31 - "blog/actions.ts"
Cohesion: 0.15
Nodes (26): beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager(), handleDrop() (+18 more)

### Community 32 - "convert_alumni.py"
Cohesion: 0.26
Nodes (12): datetime, json, re, admin_note(), convert(), day(), main(), phone() (+4 more)

### Community 33 - "SecurityPage"
Cohesion: 0.28
Nodes (8): SecurityPage(), typeLabel, bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket(), parseWindowDays()

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (21): KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen(), years() (+13 more)

### Community 35 - "DirectoryTable.tsx"
Cohesion: 0.11
Nodes (24): DialogButton(), AmountDialog(), chipTones, CommentDialog(), DirectoryAccount, displayName(), explainFee(), GROUPS (+16 more)

### Community 36 - "accountActions.ts"
Cohesion: 0.19
Nodes (20): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, signOut, EmailMessage (+12 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "next"
Cohesion: 0.09
Nodes (23): nextConfig, next, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic, metadata (+15 more)

### Community 40 - "Button.tsx"
Cohesion: 0.25
Nodes (7): ButtonColor, ButtonLinkProps, ButtonProps, ButtonSize, ButtonVariant, colorClasses, sizeClasses

### Community 41 - "getDisabledPages"
Cohesion: 0.43
Nodes (5): Header(), getSession, getDisabledPages, config, proxy()

### Community 42 - "mail/page.tsx"
Cohesion: 0.13
Nodes (17): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage() (+9 more)

### Community 43 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 44 - "Callout"
Cohesion: 0.07
Nodes (40): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, EmailChangeForm(), PasswordChangeButton(), toggleAllDay(), EventFormData, toDateTimeValue() (+32 more)

### Community 45 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (35): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, hasControlChars(), ageAt(), CONSENT_VERSION (+27 more)

### Community 46 - "mailService.ts"
Cohesion: 0.11
Nodes (26): sanitize-html, parseMailForm(), sendEmailAction(), parseDirectMailForm(), sendDirectMailAction(), ENTITIES, htmlToText(), AnnouncedEvent (+18 more)

### Community 47 - "AppError"
Cohesion: 0.16
Nodes (22): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), withdrawMembershipApplication(), membershipApprovedMessage(), membershipRejectedMessage(), AppError (+14 more)

### Community 48 - "iban.ts"
Cohesion: 0.34
Nodes (11): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isValidIban() (+3 more)

### Community 49 - "ref_node_assert"
Cohesion: 0.14
Nodes (15): ref_node_assert, ref_node_test, GET(), icsAttachment(), buildEventIcs(), icsFileName(), getPublicEvent, GERMAN_LETTERS (+7 more)

### Community 50 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 51 - "ApplicationList"
Cohesion: 0.33
Nodes (9): removeMembershipApplication(), ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange() (+1 more)

### Community 52 - "cn"
Cohesion: 0.07
Nodes (29): CtaCard(), ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, BankValues (+21 more)

### Community 53 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 54 - "registerAction.ts"
Cohesion: 0.16
Nodes (28): ref_crypto, ref_node_net, EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), requestPasswordReset(), resendVerificationEmail(), registerUser() (+20 more)

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "app/kontakt/page.tsx"
Cohesion: 0.16
Nodes (13): dynamic, KontaktPage(), metadata, createLoginChallenge(), LoginForm(), dynamic, LoginPage(), metadata (+5 more)

### Community 57 - "blogImageProcessing.ts"
Cohesion: 0.28
Nodes (5): sharp, ImageBytes, processBlogImage(), ProcessedBlogImage, QUALITY_LADDER

### Community 58 - "berlinTime.ts"
Cohesion: 0.22
Nodes (17): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+9 more)

### Community 59 - "featureFlagService.ts"
Cohesion: 0.20
Nodes (14): @prisma/client, POST(), setFeatureFlag(), FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, isFeatureFlagKey() (+6 more)

### Community 60 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "requireDebugAdmin"
Cohesion: 0.19
Nodes (11): removeRateLimitEntry(), RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket (+3 more)

### Community 63 - "Site.tsx"
Cohesion: 0.18
Nodes (8): facts, metadata, metadata, LorenzAttractor, Cta(), CtaProps, Frame(), PageHead()

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "sendEmail"
Cohesion: 0.18
Nodes (18): requestBackupLink(), resetPassword(), resetSchema, notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), backupLinkMessage(), emailChangedNoticeMessage() (+10 more)

### Community 67 - "BulkImport.tsx"
Cohesion: 0.07
Nodes (37): getStatusIcon(), ProfileSummary(), ProfileSummaryUser, bulkCreateUsersAction(), ImportIssue, ImportRowResult, BulkImport(), check() (+29 more)

### Community 68 - "MailForm.tsx"
Cohesion: 0.20
Nodes (7): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, EmailBodyField()

### Community 69 - "app/blog/[id]/page.tsx"
Cohesion: 0.16
Nodes (20): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), LeadPost(), MetaLine(), PostRow() (+12 more)

### Community 71 - "MailForm"
Cohesion: 0.18
Nodes (6): byStatusThenName(), MailForm(), useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.12
Nodes (30): EditBlogPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventOptions(), findLatestPastEvent() (+22 more)

### Community 77 - "mitglied-werden/page.tsx"
Cohesion: 0.05
Nodes (72): MembershipApplicationsPage(), DashboardPage(), FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage() (+64 more)

### Community 78 - "mitglied-werden/actions.ts"
Cohesion: 0.17
Nodes (16): submitContactRequest(), submitMembershipApplication(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), membershipApplicationNoticeMessage(), membershipReceivedMessage() (+8 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 82 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 85 - "prisma.ts"
Cohesion: 0.08
Nodes (36): bcryptjs, server-only, GET(), message(), AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError (+28 more)

### Community 86 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 87 - "membershipTermination.ts"
Cohesion: 0.28
Nodes (6): berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, pruneArchivedFees()

### Community 91 - "app/page.tsx"
Cohesion: 0.15
Nodes (13): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline(), HomePage(), levels (+5 more)

### Community 95 - "TypeSparklines.tsx"
Cohesion: 0.38
Nodes (6): sparkGeometry, typeHint(), SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 96 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 97 - "MarkdownEditor.tsx"
Cohesion: 0.50
Nodes (3): @uiw/react-markdown-preview, @uiw/react-md-editor, MDEditor

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **468 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+463 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 601 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `forgot-password/layout.tsx`, `sepa.ts`, `index.ts`, `requireAdmin`, `userService.ts`, `serverStatus.ts`, `blogService.ts`, `zertifikat/pdf/route.ts`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `getOptionalUser`, `package.json`, `executeAction`, `app/termine/page.tsx`, `dashboard/page.tsx`, `app/layout.tsx`, `gravityPhysics.ts`, `@hugeicons/core-free-icons`, `authz.ts`, `countries.ts`, `blog/actions.ts`, `KosmosTimeline.tsx`, `DirectoryTable.tsx`, `accountActions.ts`, `Button.tsx`, `getDisabledPages`, `mail/page.tsx`, `Callout`, `ApplicationWizard.tsx`, `mailService.ts`, `AppError`, `ref_node_assert`, `cn`, `registerAction.ts`, `app/kontakt/page.tsx`, `featureFlagService.ts`, `Footer.tsx`, `requireDebugAdmin`, `Site.tsx`, `sendEmail`, `MailForm.tsx`, `app/blog/[id]/page.tsx`, `mitglied-werden/page.tsx`, `mitglied-werden/actions.ts`, `prisma.ts`, `app/page.tsx`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`, `MarkdownEditor.tsx`?**
  _High betweenness centrality (0.182) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/core-free-icons` to `index.ts`, `userService.ts`, `ServerDashboard.tsx`, `blogService.ts`, `zertifikat/pdf/route.ts`, `MarketDiffusion.tsx`, `package.json`, `dashboard/page.tsx`, `app/layout.tsx`, `gravityPhysics.ts`, `authz.ts`, `blog/actions.ts`, `KosmosTimeline.tsx`, `DirectoryTable.tsx`, `next`, `Callout`, `ApplicationWizard.tsx`, `iban.ts`, `cn`, `featureFlagService.ts`, `Footer.tsx`, `Site.tsx`, `BulkImport.tsx`, `MailForm.tsx`, `app/blog/[id]/page.tsx`, `eventService.ts`, `altcha.d.ts`, `app/page.tsx`, `MarkdownEditor.tsx`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `AppError` connect `AppError` to `sendEmail`, `requireAdmin`, `accountActions.ts`, `userService.ts`, `serverStatus.ts`, `blogService.ts`, `eventService.ts`, `mitglied-werden/page.tsx`, `mitglied-werden/actions.ts`, `mailService.ts`, `executeAction`, `prisma.ts`, `registerAction.ts`, `blogImageProcessing.ts`, `featureFlagService.ts`, `requireDebugAdmin`, `blog/actions.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _468 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1254355400696864 - nodes in this community are weakly interconnected._
- **Should `requireAdmin` be split into smaller, more focused modules?**
  _Cohesion score 0.05945945945945946 - nodes in this community are weakly interconnected._