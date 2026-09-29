# Graph Report - wiphy  (2026-09-29)

## Corpus Check
- 331 files · ~138,520 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1768 nodes · 5734 edges · 86 communities (73 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a42f88d7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LoginForm.tsx
- mailService.ts
- membershipFormSchemas.ts
- next
- users/[id]/page.tsx
- boardService.ts
- mitgliedsantraege/actions.ts
- serverStatus.ts
- ApplicationWizard.tsx
- blogService.ts
- security/page.tsx
- feeCalculation.ts
- eventService.ts
- MarketDiffusion.tsx
- ics.ts
- lib/siteUrl.ts
- package.json
- dependencies
- mitglied-werden/actions.ts
- app/termine/[id]/page.tsx
- schemas.ts
- executeAction
- DebugBar.tsx
- app/blog/[id]/page.tsx
- blog/actions.ts
- OutcomeTimeline.tsx
- altcha.ts
- userService.ts
- events.ts
- membershipCertificate.ts
- dashboard/page.tsx
- mitglied-werden/page.tsx
- feeService.ts
- ServerDashboard.tsx
- rateLimit.ts
- MarkdownEditor.tsx
- berlinTime.ts
- compilerOptions
- devDependencies
- blogImageProcessing.ts
- auth.ts
- ApplicationList.tsx
- AppError
- login/actions.ts
- satzung/page.tsx
- FeesTable.tsx
- forgot-password/layout.tsx
- authz.ts
- react
- membershipService.ts
- boardImages.ts
- ActivityHeatmap.tsx
- RateLimitTable.tsx
- MailForm.tsx
- accountActions.ts
- isFeatureEnabled
- index.ts
- EditUserForm
- app/layout.tsx
- seed.ts
- MarkdownViewer.tsx
- slug.ts
- Deployment (Hetzner Cloud / Ubuntu)
- errors.ts
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- BoardPhotoUploader
- FeesTable
- prisma.ts
- photo/[id]/route.ts
- CLAUDE.md
- setMemberPhoto
- ShareButton
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- eslint.config.mjs
- DeleteMemberSection
- altcha.d.ts
- postcss.config.mjs
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- { GET, POST }
- format.ts

## God Nodes (most connected - your core abstractions)
1. `next` - 110 edges
2. `AppError` - 84 edges
3. `cn()` - 77 edges
4. `lucide-react` - 75 edges
5. `react` - 61 edges
6. `executeAction()` - 60 edges
7. `requireAdmin()` - 55 edges
8. `Card()` - 47 edges
9. `Button()` - 43 edges
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

## Communities (86 total, 13 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.10
Nodes (26): FeatureFlagToggle(), FeatureFlagToggleProps, ForgotPasswordPage(), ContactForm(), createLoginChallenge(), FaqItem, LoginFaq(), SECTIONS (+18 more)

### Community 1 - "mailService.ts"
Cohesion: 0.06
Nodes (55): sanitize-html, MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage() (+47 more)

### Community 2 - "membershipFormSchemas.ts"
Cohesion: 0.10
Nodes (19): MINOR_HINT, STUDENT_YEAR_LOOKAHEAD, applicationBankSchema, applicationPaymentSchema, applicationPersonSchema, applicationStudySchema, bankFieldsOptional, checkedBox (+11 more)

### Community 3 - "next"
Cohesion: 0.09
Nodes (32): nextConfig, lucide-react, next, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, metadata (+24 more)

### Community 4 - "users/[id]/page.tsx"
Cohesion: 0.20
Nodes (13): deleteUserAction(), EditUserPage(), metadata, updateUser(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, TERMINATION_RECORD_RETENTION_YEARS, terminationDate() (+5 more)

### Community 5 - "boardService.ts"
Cohesion: 0.16
Nodes (23): EditBoardMemberPage(), moveMemberOrder(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember(), deleteMemberById() (+15 more)

### Community 6 - "mitgliedsantraege/actions.ts"
Cohesion: 0.21
Nodes (15): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), statusMeta(), TerminationList(), confirm(), membershipApprovedMessage() (+7 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.16
Nodes (17): ref_node_os, GET(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG, DEPLOY_SCRIPT (+9 more)

### Community 8 - "ApplicationWizard.tsx"
Cohesion: 0.09
Nodes (23): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), PaymentOption(), FeeDefaultEntry (+15 more)

### Community 9 - "blogService.ts"
Cohesion: 0.10
Nodes (38): EditBlogPage(), AdminBlogPage(), BlogImageVariant, applyImageOrder(), BlogImageRow, BlogPostWriteData, countImagesForPost(), deleteImage() (+30 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.11
Nodes (30): dynamic, metadata, SecurityPage(), ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel() (+22 more)

### Community 11 - "feeCalculation.ts"
Cohesion: 0.17
Nodes (20): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), ApplicationWizard(), currentFormValues() (+12 more)

### Community 12 - "eventService.ts"
Cohesion: 0.12
Nodes (31): EditEventPage(), AdminEventsPage(), startOfBerlinDay(), UPCOMING_ALERT_MONTHS, AnnouncedEvent, createEvent(), deleteEventById(), EventWriteData (+23 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.11
Nodes (28): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+20 more)

### Community 14 - "ics.ts"
Cohesion: 0.19
Nodes (18): RFC-5545, GET(), TerminePage(), berlinParts(), addDays(), berlinDateStamp(), buildCalendarIcs(), calendar() (+10 more)

### Community 15 - "lib/siteUrl.ts"
Cohesion: 0.13
Nodes (14): escapeXml(), GET(), metadata, alt, contentType, size, sitemap(), findPublishedPosts() (+6 more)

### Community 16 - "package.json"
Cohesion: 0.07
Nodes (26): name, prisma, seed, private, version, altcha, babel-plugin-react-compiler, pg (+18 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+19 more)

### Community 18 - "mitglied-werden/actions.ts"
Cohesion: 0.17
Nodes (19): ContactRequestsPage(), submitContactRequest(), submitMembershipApplication(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), membershipApplicationNoticeMessage() (+11 more)

### Community 19 - "app/termine/[id]/page.tsx"
Cohesion: 0.15
Nodes (24): HomePage(), dynamic, EventDetailPage(), generateMetadata(), Props, dynamic, metadata, NextEventCard() (+16 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (46): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue() (+38 more)

### Community 21 - "executeAction"
Cohesion: 0.18
Nodes (30): deletePost(), savePost(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), toggleFee(), updateFeeAmount() (+22 more)

### Community 22 - "DebugBar.tsx"
Cohesion: 0.06
Nodes (41): ref_node_assert, ref_node_child_process, ref_node_test, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage() (+33 more)

### Community 23 - "app/blog/[id]/page.tsx"
Cohesion: 0.17
Nodes (19): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props (+11 more)

### Community 24 - "blog/actions.ts"
Cohesion: 0.17
Nodes (22): beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+14 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.15
Nodes (19): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+11 more)

### Community 26 - "altcha.ts"
Cohesion: 0.16
Nodes (17): altcha-lib, dynamic, KontaktPage(), metadata, dynamic, internalPath(), LoginPage(), metadata (+9 more)

### Community 27 - "userService.ts"
Cohesion: 0.27
Nodes (13): emailChangeMessage(), archiveFeesOfUser(), deleteUserById(), findUserById(), findUserByMitgliedIdExcludingUser(), findUsersForDashboard(), updateUserById(), anonymizeSecurityEventsForUser() (+5 more)

### Community 28 - "events.ts"
Cohesion: 0.16
Nodes (18): DashboardEvent, UpcomingEventAlert(), isSameBerlinDay(), DAY_MONTH, DAY_MONTH_YEAR, daysUntilEvent(), DEFAULT_DURATION_MINUTES, EventTiming (+10 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.11
Nodes (33): @react-pdf/renderer, GET(), GET(), DashboardPage(), berlinYear(), certificateFacts, CertificateFee, certificateNumber() (+25 more)

### Community 30 - "dashboard/page.tsx"
Cohesion: 0.11
Nodes (17): CtaCard(), EmailChangeDialog(), ContactRequestItem, ContactRequestList(), confirmDelete(), run(), dateFormat, MailSuccessDialog() (+9 more)

### Community 31 - "mitglied-werden/page.tsx"
Cohesion: 0.18
Nodes (18): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+10 more)

### Community 32 - "feeService.ts"
Cohesion: 0.15
Nodes (24): FeesDashboardPage(), FeeBreakdown, feeRetentionCutoffYear(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees() (+16 more)

### Community 33 - "ServerDashboard.tsx"
Cohesion: 0.12
Nodes (21): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, triggerDeploy(), DeploySection(), formatBytes() (+13 more)

### Community 34 - "rateLimit.ts"
Cohesion: 0.21
Nodes (13): ref_node_net, registerUser(), addressKey(), extractClientIp(), HeaderBag, enforceAdminMailRateLimit(), consumeRateLimit(), hashKey() (+5 more)

### Community 35 - "MarkdownEditor.tsx"
Cohesion: 0.50
Nodes (3): @uiw/react-markdown-preview, @uiw/react-md-editor, MDEditor

### Community 36 - "berlinTime.ts"
Cohesion: 0.26
Nodes (12): EventForm(), berlinOffsetMs(), berlinWallTimeToDate(), endOfBerlinDay(), pad(), parseBerlinLocalInput(), PARTS, TIME_ZONE (+4 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography, ts-node (+10 more)

### Community 39 - "blogImageProcessing.ts"
Cohesion: 0.18
Nodes (9): ref_node_fs, sharp, BACKGROUND, icon(), main(), ImageBytes, processBlogImage(), ProcessedBlogImage (+1 more)

### Community 40 - "auth.ts"
Cohesion: 0.22
Nodes (8): AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginRateLimitedError, signIn, SecurityEventReason

### Community 41 - "ApplicationList.tsx"
Cohesion: 0.11
Nodes (17): next-auth, DeletePostButton(), ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, PhotoMeta, FeatureDisabledDialog() (+9 more)

### Community 42 - "AppError"
Cohesion: 0.18
Nodes (18): parseMailForm(), sendEmailAction(), createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), withdrawMembershipApplication(), WithdrawApplicationButton() (+10 more)

### Community 43 - "login/actions.ts"
Cohesion: 0.35
Nodes (8): POST(), checkLoginFeatureEnabled(), resendVerificationEmail(), LINK_EXPIRY(), passwordResetMessage(), registrationConfirmationMessage(), normalizeEmail(), siteUrl()

### Community 44 - "satzung/page.tsx"
Cohesion: 0.12
Nodes (18): DATENSCHUTZ, metadata, IMPRESSUM, metadata, dynamic, metadata, SATZUNG, Block() (+10 more)

### Community 45 - "FeesTable.tsx"
Cohesion: 0.23
Nodes (8): AmountDialog(), explainFee(), FeesSortKey, FeesTableProps, FeesTableUser, UserPaymentHistoryDialog(), PaymentHistoryTable(), formatEuro()

### Community 47 - "authz.ts"
Cohesion: 0.15
Nodes (20): @prisma/client, GET(), POST(), POST(), GET(), setFeatureFlag(), FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS (+12 more)

### Community 48 - "react"
Cohesion: 0.07
Nodes (36): react, metadata, TerminationItem, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), DeleteMemberSectionProps (+28 more)

### Community 49 - "membershipService.ts"
Cohesion: 0.18
Nodes (18): MembershipApplicationsPage(), SatzungPage(), planApplicationFees(), resolveFeeDefault(), deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), countOpenApplications() (+10 more)

### Community 50 - "boardImages.ts"
Cohesion: 0.25
Nodes (6): ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, ProcessedBoardPhoto, QUALITY_LADDER

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "RateLimitTable.tsx"
Cohesion: 0.15
Nodes (16): removeRateLimitEntry(), InfoTooltip(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), RateLimitTableProps (+8 more)

### Community 53 - "MailForm.tsx"
Cohesion: 0.07
Nodes (25): @tiptap/react, compareBy(), DashboardUsersTable(), displayName(), getStatusIcon(), byStatusThenName(), MailForm(), MailFormProps (+17 more)

### Community 54 - "accountActions.ts"
Cohesion: 0.13
Nodes (29): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination(), AccountSection() (+21 more)

### Community 55 - "isFeatureEnabled"
Cohesion: 0.20
Nodes (20): bcryptjs, ref_crypto, POST(), notifyAdminsAboutRegistration(), POST(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), passwordChangedNoticeMessage() (+12 more)

### Community 56 - "index.ts"
Cohesion: 0.05
Nodes (54): DashboardTableUser, SortKey, STATUS_RANK, FeeDefaultRow, IconInput(), metadata, categories, categoryIcon() (+46 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "app/layout.tsx"
Cohesion: 0.16
Nodes (10): src_app_globals, body, metadata, mono, auth, columns, Footer(), legalLinks (+2 more)

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 61 - "slug.ts"
Cohesion: 0.23
Nodes (9): GET(), buildEventIcs(), icsFileName(), GERMAN_LETTERS, idFromSegment(), safeDecode(), slugify(), slugSegment() (+1 more)

### Community 62 - "Deployment (Hetzner Cloud / Ubuntu)"
Cohesion: 0.25
Nodes (8): Automatische Updates bei jedem Git Push (GitHub Actions), Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Migrationen statt `db push`, nginx als Reverse Proxy, Option 1: Automatischer Einzeiler über deinen lokalen Rechner (Empfohlen), Option 2: Manuelles Ausführen auf dem Server

### Community 63 - "errors.ts"
Cohesion: 0.18
Nodes (10): zod, createUserAction(), NewUserForm(), handleSubmit(), getRedirectTarget(), isRedirectError(), RedirectTarget, AppErrorCode (+2 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.12
Nodes (16): Admin-Dashboard, Authentifizierung & Konten, Datenbankmodell, Feature Flags, Funktionen im Detail, Inhalt, Mitgliederbereich (`/dashboard`), Projektstruktur (+8 more)

### Community 66 - "BoardPhotoUploader"
Cohesion: 0.60
Nodes (5): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), formatBytes()

### Community 67 - "FeesTable"
Cohesion: 0.20
Nodes (5): compareBy(), displayName(), FeesTable(), selectAllWithOpenFees(), hasOpenFee()

### Community 68 - "prisma.ts"
Cohesion: 0.22
Nodes (13): nodemailer, createPrismaClient(), globalForPrisma, getMailTransporter(), normalize(), Recipients, sendEmail(), getDatabaseUrl() (+5 more)

### Community 71 - "setMemberPhoto"
Cohesion: 0.67
Nodes (3): processBoardPhoto(), upsertPhoto(), setMemberPhoto()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 77 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 91 - "format.ts"
Cohesion: 0.16
Nodes (12): RegistrationFunnel(), share(), Stage, STAGES, DATE_TIME, EURO, formatDateShort(), LONG_DATE (+4 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **425 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+420 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 543 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `mailService.ts`, `users/[id]/page.tsx`, `mitgliedsantraege/actions.ts`, `serverStatus.ts`, `ApplicationWizard.tsx`, `security/page.tsx`, `ics.ts`, `lib/siteUrl.ts`, `package.json`, `mitglied-werden/actions.ts`, `app/termine/[id]/page.tsx`, `executeAction`, `DebugBar.tsx`, `app/blog/[id]/page.tsx`, `blog/actions.ts`, `altcha.ts`, `events.ts`, `membershipCertificate.ts`, `dashboard/page.tsx`, `mitglied-werden/page.tsx`, `rateLimit.ts`, `MarkdownEditor.tsx`, `ApplicationList.tsx`, `AppError`, `login/actions.ts`, `satzung/page.tsx`, `FeesTable.tsx`, `forgot-password/layout.tsx`, `authz.ts`, `react`, `RateLimitTable.tsx`, `MailForm.tsx`, `accountActions.ts`, `isFeatureEnabled`, `index.ts`, `app/layout.tsx`, `slug.ts`, `errors.ts`, `photo/[id]/route.ts`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.187) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `next` to `LoginForm.tsx`, `users/[id]/page.tsx`, `ApplicationWizard.tsx`, `security/page.tsx`, `MarketDiffusion.tsx`, `package.json`, `app/termine/[id]/page.tsx`, `DebugBar.tsx`, `app/blog/[id]/page.tsx`, `blog/actions.ts`, `OutcomeTimeline.tsx`, `events.ts`, `dashboard/page.tsx`, `mitglied-werden/page.tsx`, `ServerDashboard.tsx`, `ApplicationList.tsx`, `satzung/page.tsx`, `FeesTable.tsx`, `react`, `RateLimitTable.tsx`, `MailForm.tsx`, `accountActions.ts`, `index.ts`, `format.ts`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `LoginForm.tsx`, `next`, `users/[id]/page.tsx`, `ApplicationWizard.tsx`, `MarketDiffusion.tsx`, `package.json`, `app/blog/[id]/page.tsx`, `blog/actions.ts`, `dashboard/page.tsx`, `ServerDashboard.tsx`, `MarkdownEditor.tsx`, `ApplicationList.tsx`, `satzung/page.tsx`, `FeesTable.tsx`, `RateLimitTable.tsx`, `MailForm.tsx`, `accountActions.ts`, `index.ts`, `app/layout.tsx`, `altcha.d.ts`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _425 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LoginForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10104529616724739 - nodes in this community are weakly interconnected._
- **Should `mailService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05794556628621598 - nodes in this community are weakly interconnected._