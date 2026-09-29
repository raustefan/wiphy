# Graph Report - wiphy  (2026-09-29)

## Corpus Check
- 335 files · ~141,534 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1794 nodes · 5869 edges · 94 communities (81 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `29363f5a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LoginForm.tsx
- mailService.ts
- ApplicationWizard.tsx
- next
- authz.ts
- boardService.ts
- isFeatureEnabled
- serverStatus.ts
- RateLimitTable.tsx
- blogService.ts
- security/page.tsx
- ServerDashboard.tsx
- eventService.ts
- MarketDiffusion.tsx
- ref_node_assert
- app/layout.tsx
- package.json
- dependencies
- app/kontakt/actions.ts
- events.ts
- schemas.ts
- requireAdmin
- DeleteMemberSection
- app/blog/[id]/page.tsx
- blog/actions.ts
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- executeAction
- userService.ts
- membershipCertificate.ts
- app/vorstand/page.tsx
- format.ts
- feeService.ts
- RegistrationFunnel.tsx
- ics.ts
- zahlungen/page.tsx
- sepa/route.ts
- compilerOptions
- devDependencies
- FeesTable
- feeDefaults.ts
- react
- rateLimitService.ts
- FeesTable.tsx
- datenschutz/page.tsx
- app/page.tsx
- securityEventService.ts
- requireDebugAdmin
- berlinTime.ts
- blogImageProcessing.ts
- MarkdownEditor.tsx
- ActivityHeatmap.tsx
- security/actions.ts
- EmailBodyField.tsx
- DashboardUsersTable.tsx
- registerAction.ts
- index.ts
- EditUserForm
- ApplicationList.tsx
- seed.ts
- ContactRequestList
- normalizeIban
- forgot-password/layout.tsx
- login/layout.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- AppError
- reset-password/layout.tsx
- auth.ts
- getOptionalUser
- CLAUDE.md
- app/blog/page.tsx
- ShareButton
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- formatNumber
- verify-email/layout.tsx
- eslint.config.mjs
- passwordStrength.ts
- dashboard/page.tsx
- altcha.d.ts
- MailForm
- DebugBar.tsx
- postcss.config.mjs
- messages.ts
- userUpdateData.ts
- sitemap.ts
- { GET, POST }
- ApplicationList
- termine/actions.ts
- MarkdownViewer.tsx
- ContactRequestsPage

## God Nodes (most connected - your core abstractions)
1. `next` - 112 edges
2. `AppError` - 84 edges
3. `cn()` - 80 edges
4. `lucide-react` - 77 edges
5. `react` - 61 edges
6. `executeAction()` - 60 edges
7. `requireAdmin()` - 57 edges
8. `Card()` - 48 edges
9. `Button()` - 44 edges
10. `isFeatureEnabled()` - 42 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `generateMetadata()` --calls--> `pageMetadata()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/metadata.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `FeatureFlagToggle()` --indirect_call--> `setFeatureFlag()`  [INFERRED]
  src/app/dashboard/feature-flags/FeatureFlagToggle.tsx → src/app/dashboard/feature-flags/actions.ts
- `FeeDefaultsCard()` --indirect_call--> `deleteFeeDefaultYear()`  [INFERRED]
  src/app/dashboard/fees/FeeDefaultsCard.tsx → src/app/dashboard/fees/actions.ts

## Import Cycles
- None detected.

## Communities (94 total, 13 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.08
Nodes (32): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, ForgotPasswordPage(), ContactForm(), FaqItem, LoginFaq(), SECTIONS (+24 more)

### Community 1 - "mailService.ts"
Cohesion: 0.06
Nodes (52): sanitize-html, parseMailForm(), sendEmailAction(), blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature (+44 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.06
Nodes (38): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), PaymentOption(), ageAt() (+30 more)

### Community 3 - "next"
Cohesion: 0.10
Nodes (34): nextConfig, lucide-react, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+26 more)

### Community 4 - "authz.ts"
Cohesion: 0.24
Nodes (14): COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, DebugBar(), Header(), AS_MEMBER_COOKIE, DEBUG_COOKIE (+6 more)

### Community 5 - "boardService.ts"
Cohesion: 0.10
Nodes (34): POST(), EditBoardMemberPage(), MAX_BOARD_PHOTO_UPLOAD_BYTES, moveMemberOrder(), ImageBytes, processBoardPhoto(), ProcessedBoardPhoto, QUALITY_LADDER (+26 more)

### Community 6 - "isFeatureEnabled"
Cohesion: 0.36
Nodes (8): @prisma/client, POST(), FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, postExists(), FeatureFlagWithMeta, isFeatureEnabled()

### Community 7 - "serverStatus.ts"
Cohesion: 0.13
Nodes (20): ref_node_os, GET(), triggerDeploy(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG (+12 more)

### Community 8 - "RateLimitTable.tsx"
Cohesion: 0.21
Nodes (10): InfoTooltip(), RateLimitTableProps, colorClasses, IconButton(), iconButtonClasses(), IconButtonColor, IconButtonLink(), IconButtonSize (+2 more)

### Community 9 - "blogService.ts"
Cohesion: 0.11
Nodes (33): EditBlogPage(), processBlogImage(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost(), deleteImage(), deletePostById() (+25 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.26
Nodes (10): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+2 more)

### Community 11 - "ServerDashboard.tsx"
Cohesion: 0.36
Nodes (6): DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel()

### Community 12 - "eventService.ts"
Cohesion: 0.12
Nodes (30): EditEventPage(), AdminEventsPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventById() (+22 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (30): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+22 more)

### Community 14 - "ref_node_assert"
Cohesion: 0.19
Nodes (7): ref_node_assert, ref_node_test, berlinDateParts(), FEE_RECORD_RETENTION_YEARS, isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, base

### Community 15 - "app/layout.tsx"
Cohesion: 0.09
Nodes (21): escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono, alt (+13 more)

### Community 16 - "package.json"
Cohesion: 0.07
Nodes (26): name, prisma, seed, private, version, altcha, altcha-lib, babel-plugin-react-compiler (+18 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+19 more)

### Community 18 - "app/kontakt/actions.ts"
Cohesion: 0.20
Nodes (15): markContactRequestHandled(), removeContactRequest(), submitContactRequest(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), ContactInput (+7 more)

### Community 19 - "events.ts"
Cohesion: 0.11
Nodes (23): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, CALENDAR_ICS_PATH (+15 more)

### Community 20 - "schemas.ts"
Cohesion: 0.08
Nodes (20): AdminCreateUserInput, BankUpdateParsed, berlinDateTime(), blogImageMoveSchema, boardDeleteSchema, boardMoveSchema, boardSaveSchema, contactSchema (+12 more)

### Community 21 - "requireAdmin"
Cohesion: 0.13
Nodes (35): createDraft(), deletePost(), savePost(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), toggleFee() (+27 more)

### Community 23 - "app/blog/[id]/page.tsx"
Cohesion: 0.30
Nodes (11): generateMetadata(), Props, PublicBlogPost(), readingTimeMinutes(), getPublishedPost(), blogPostPath(), GERMAN_LETTERS, idFromSegment() (+3 more)

### Community 24 - "blog/actions.ts"
Cohesion: 0.18
Nodes (22): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager() (+14 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.14
Nodes (20): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+12 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.17
Nodes (19): UserPaymentHistoryDialog(), DashboardPage(), JourneyRail(), dynamic, metadata, MitgliedWerdenPage(), Props, WithdrawApplicationButton() (+11 more)

### Community 27 - "executeAction"
Cohesion: 0.11
Nodes (38): zod, removeMembershipApplication(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema (+30 more)

### Community 28 - "userService.ts"
Cohesion: 0.17
Nodes (20): emailChangeMessage(), createPrismaClient(), globalForPrisma, prisma, getDatabaseUrl(), getSecurityLogPepper(), readRequiredEnv(), readRequiredMailEnv() (+12 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.15
Nodes (23): @react-pdf/renderer, GET(), MembershipCertificateCard(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus (+15 more)

### Community 30 - "app/vorstand/page.tsx"
Cohesion: 0.19
Nodes (12): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), AdminBoardPage(), getInitials(), metadata, VorstandPage() (+4 more)

### Community 31 - "format.ts"
Cohesion: 0.13
Nodes (14): statusMeta(), TerminationList(), confirm(), AccountSection(), DATE_TIME, EURO, formatDateShort(), formatDateTime() (+6 more)

### Community 32 - "feeService.ts"
Cohesion: 0.12
Nodes (27): GET(), FeesDashboardPage(), FeeBreakdown, feeRetentionCutoffYear(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles (+19 more)

### Community 33 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 34 - "ics.ts"
Cohesion: 0.16
Nodes (19): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildEventIcs(), calendar(), describe() (+11 more)

### Community 35 - "zahlungen/page.tsx"
Cohesion: 0.12
Nodes (31): FeeDefaultsCard(), run(), save(), AmountDialog(), explainFee(), BankDetailsForm(), submit(), BankValues (+23 more)

### Community 36 - "sepa/route.ts"
Cohesion: 0.26
Nodes (14): field(), POST(), TIME_ZONE, agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+6 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography, ts-node (+10 more)

### Community 39 - "FeesTable"
Cohesion: 0.20
Nodes (5): compareBy(), displayName(), FeesTable(), selectAllWithOpenFees(), hasOpenFee()

### Community 40 - "feeDefaults.ts"
Cohesion: 0.17
Nodes (15): MembershipApplicationsPage(), ApplicationStage(), toDateInput(), FeeDefaultEntry, FeeRates, planApplicationFees(), resolveFeeDefault(), deriveStudentYears() (+7 more)

### Community 41 - "react"
Cohesion: 0.16
Nodes (15): react, DeletePostButton(), ContactRequestItem, dateFormat, TerminationItem, DeleteEventButton(), DeleteMemberSectionProps, DeleteMemberButton() (+7 more)

### Community 42 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 43 - "FeesTable.tsx"
Cohesion: 0.06
Nodes (33): chipTones, FeesSortKey, FeesTableProps, FeesTableUser, StatusChip(), MailAnnouncement, MailFormProps, MailUserOption (+25 more)

### Community 44 - "datenschutz/page.tsx"
Cohesion: 0.16
Nodes (10): DATENSCHUTZ, metadata, IMPRESSUM, metadata, SATZUNG, LegalPage(), LegalSections(), LegalBlock (+2 more)

### Community 45 - "app/page.tsx"
Cohesion: 0.11
Nodes (32): DashboardEvent, UpcomingEventAlert(), heroMetrics, HomePage(), pillars, dynamic, EventDetailPage(), generateMetadata() (+24 more)

### Community 46 - "securityEventService.ts"
Cohesion: 0.15
Nodes (19): SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), emptyCounts() (+11 more)

### Community 47 - "requireDebugAdmin"
Cohesion: 0.36
Nodes (7): setFeatureFlag(), FeatureFlagsPage(), ServerPage(), isFeatureFlagKey(), requireDebugAdmin(), getAllFeatureFlags(), setFeatureFlagEnabled()

### Community 48 - "berlinTime.ts"
Cohesion: 0.32
Nodes (13): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+5 more)

### Community 49 - "blogImageProcessing.ts"
Cohesion: 0.16
Nodes (9): ref_node_fs, sharp, BACKGROUND, icon(), main(), MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, ProcessedBlogImage (+1 more)

### Community 50 - "MarkdownEditor.tsx"
Cohesion: 0.50
Nodes (3): @uiw/react-markdown-preview, @uiw/react-md-editor, MDEditor

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "security/actions.ts"
Cohesion: 0.27
Nodes (7): removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), deleteRateLimitEntry()

### Community 53 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 54 - "DashboardUsersTable.tsx"
Cohesion: 0.24
Nodes (10): compareBy(), DashboardTableUser, DashboardUsersTable(), displayName(), getStatusIcon(), SortKey, STATUS_RANK, formatStatus() (+2 more)

### Community 55 - "registerAction.ts"
Cohesion: 0.10
Nodes (43): bcryptjs, ref_crypto, ref_node_net, POST(), POST(), notifyAdminsAboutRegistration(), POST(), checkLoginFeatureEnabled() (+35 more)

### Community 56 - "index.ts"
Cohesion: 0.06
Nodes (42): CtaCard(), metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory (+34 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "ApplicationList.tsx"
Cohesion: 0.15
Nodes (10): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue() (+2 more)

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "ContactRequestList"
Cohesion: 1.00
Nodes (3): ContactRequestList(), confirmDelete(), run()

### Community 61 - "normalizeIban"
Cohesion: 0.28
Nodes (16): SepaExportPage(), ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic() (+8 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "AppError"
Cohesion: 0.14
Nodes (28): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), submitMembershipApplication(), withdrawMembershipApplication(), membershipApplicationNoticeMessage(), membershipReceivedMessage() (+20 more)

### Community 68 - "auth.ts"
Cohesion: 0.10
Nodes (24): dynamic, KontaktPage(), metadata, dynamic, internalPath(), LoginPage(), metadata, NOTICES (+16 more)

### Community 69 - "getOptionalUser"
Cohesion: 0.31
Nodes (7): GET(), GET(), GET(), getOptionalUser(), withViewOverride(), findImageBytes(), findPhotoBytes()

### Community 71 - "app/blog/page.tsx"
Cohesion: 0.14
Nodes (17): BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props, AdminBlogPage(), BlogGallery(), ACCEPTED_BLOG_IMAGE_TYPES (+9 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 77 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 78 - "passwordStrength.ts"
Cohesion: 0.21
Nodes (10): NewUserForm(), handleSubmit(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 79 - "dashboard/page.tsx"
Cohesion: 0.21
Nodes (7): EmailChangeDialog(), MailSuccessDialog(), ADMIN_ACTIONS, QueryParamDialog(), LogoutButton(), src_lib_server_services_membershipservice_getopenapplication, countOpenTerminations()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "MailForm"
Cohesion: 0.18
Nodes (6): byStatusThenName(), MailForm(), useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 82 - "DebugBar.tsx"
Cohesion: 0.24
Nodes (7): ref_node_child_process, ref_node_util, commit, LINKS, TIME, ADMIN_SESSION_MAX_MS, adminSessionExpired()

### Community 85 - "messages.ts"
Cohesion: 0.33
Nodes (10): accountDeletedMessage(), adminCreatedUserMessage(), feeReminderMessage(), greeting(), loginDisabledMessage(), membershipApprovedMessage(), membershipRejectedMessage(), Person (+2 more)

### Community 86 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 87 - "sitemap.ts"
Cohesion: 0.33
Nodes (8): sitemap(), GET(), TerminePage(), buildCalendarIcs(), findPublishedPosts(), getPublishedPosts(), getPastEvents(), getUpcomingEvents()

### Community 89 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 91 - "termine/actions.ts"
Cohesion: 0.39
Nodes (7): deleteEventAction(), revalidateEvent(), saveEventAction(), removeEvent(), saveEvent(), eventDeleteSchema, eventSaveSchema

### Community 92 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **430 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+425 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 548 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `mailService.ts`, `ApplicationWizard.tsx`, `authz.ts`, `boardService.ts`, `isFeatureEnabled`, `serverStatus.ts`, `RateLimitTable.tsx`, `security/page.tsx`, `MarketDiffusion.tsx`, `app/layout.tsx`, `package.json`, `app/kontakt/actions.ts`, `events.ts`, `requireAdmin`, `app/blog/[id]/page.tsx`, `blog/actions.ts`, `mitglied-werden/page.tsx`, `executeAction`, `membershipCertificate.ts`, `app/vorstand/page.tsx`, `feeService.ts`, `ics.ts`, `zahlungen/page.tsx`, `sepa/route.ts`, `react`, `FeesTable.tsx`, `datenschutz/page.tsx`, `app/page.tsx`, `requireDebugAdmin`, `MarkdownEditor.tsx`, `security/actions.ts`, `registerAction.ts`, `index.ts`, `forgot-password/layout.tsx`, `login/layout.tsx`, `AppError`, `reset-password/layout.tsx`, `auth.ts`, `getOptionalUser`, `app/blog/page.tsx`, `verify-email/layout.tsx`, `dashboard/page.tsx`, `DebugBar.tsx`, `sitemap.ts`, `termine/actions.ts`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `next` to `LoginForm.tsx`, `ApplicationWizard.tsx`, `RateLimitTable.tsx`, `security/page.tsx`, `ServerDashboard.tsx`, `MarketDiffusion.tsx`, `package.json`, `app/blog/[id]/page.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `executeAction`, `membershipCertificate.ts`, `app/vorstand/page.tsx`, `RegistrationFunnel.tsx`, `zahlungen/page.tsx`, `react`, `FeesTable.tsx`, `app/page.tsx`, `DashboardUsersTable.tsx`, `index.ts`, `ApplicationList.tsx`, `app/blog/page.tsx`, `formatNumber`, `dashboard/page.tsx`, `DebugBar.tsx`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `LoginForm.tsx`, `ApplicationWizard.tsx`, `next`, `RateLimitTable.tsx`, `ServerDashboard.tsx`, `MarketDiffusion.tsx`, `app/layout.tsx`, `package.json`, `executeAction`, `zahlungen/page.tsx`, `FeesTable.tsx`, `MarkdownEditor.tsx`, `DashboardUsersTable.tsx`, `index.ts`, `ApplicationList.tsx`, `normalizeIban`, `app/blog/page.tsx`, `dashboard/page.tsx`, `altcha.d.ts`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _430 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LoginForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08446455505279035 - nodes in this community are weakly interconnected._
- **Should `mailService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06298076923076923 - nodes in this community are weakly interconnected._