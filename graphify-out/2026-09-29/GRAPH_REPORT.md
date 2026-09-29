# Graph Report - wiphy  (2026-09-29)

## Corpus Check
- 331 files · ~138,202 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1761 nodes · 5716 edges · 91 communities (80 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a42f88d7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LoginForm.tsx
- siteUrl
- ApplicationWizard.tsx
- next
- mitgliedsantraege/page.tsx
- boardService.ts
- mitgliedsantraege/actions.ts
- serverStatus.ts
- membership.ts
- blogService.ts
- securityEventService.ts
- feeCalculation.ts
- eventService.ts
- MarketDiffusion.tsx
- ics.ts
- lib/siteUrl.ts
- package.json
- dependencies
- app/kontakt/actions.ts
- app/page.tsx
- schemas.ts
- executeAction
- userService.ts
- PhysicsTimeline.tsx
- security/page.tsx
- OutcomeTimeline.tsx
- altcha.ts
- TypeSparklines.tsx
- events.ts
- membershipCertificate.ts
- dashboard/page.tsx
- mitglied-werden/page.tsx
- feeService.ts
- formatNumber
- login/actions.ts
- MarkdownEditor.tsx
- EventForm.tsx
- compilerOptions
- devDependencies
- mail/page.tsx
- auth.ts
- lucide-react
- AppError
- mailService.ts
- datenschutz/page.tsx
- messages.ts
- forgot-password/layout.tsx
- authz.ts
- EditUserForm.tsx
- satzung/page.tsx
- iban.ts
- ActivityHeatmap.tsx
- requireDebugAdmin
- MailForm.tsx
- errors.ts
- isFeatureEnabled
- index.ts
- EditUserForm
- app/layout.tsx
- ref_node_path
- MarkdownViewer.tsx
- slug.ts
- HeaderChrome.tsx
- passwordStrength.ts
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- getEditableUser
- FeesTable
- sendEmail
- EmailBodyField.tsx
- CLAUDE.md
- mailHistory.ts
- dashboard/kontakt/actions.ts
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- ref_node_assert
- AccountPanel
- eslint.config.mjs
- ApplicationList
- DeleteMemberSection
- altcha.d.ts
- AppThemeProvider.tsx
- ApplicationWizard
- postcss.config.mjs
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- { GET, POST }
- RegistrationFunnel.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 110 edges
2. `AppError` - 84 edges
3. `cn()` - 77 edges
4. `lucide-react` - 75 edges
5. `react` - 61 edges
6. `executeAction()` - 60 edges
7. `requireAdmin()` - 57 edges
8. `Card()` - 47 edges
9. `Button()` - 43 edges
10. `isFeatureEnabled()` - 42 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `BlogImageManager()` --indirect_call--> `deleteBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `moveBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `saveBlogImageAlt()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `setBlogCoverImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts

## Import Cycles
- None detected.

## Communities (91 total, 11 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.11
Nodes (24): DeploySection(), ForgotPasswordPage(), FaqItem, LoginFaq(), SECTIONS, FIRST_HALF_FIELDS, FirstHalfField, VerifyEmailContent() (+16 more)

### Community 1 - "siteUrl"
Cohesion: 0.20
Nodes (20): blockHtml(), blockText(), derivePreheader(), EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml(), renderBlocksText() (+12 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.11
Nodes (16): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, FeeRates, applicationBankSchema, applicationPaymentSchema (+8 more)

### Community 3 - "next"
Cohesion: 0.13
Nodes (21): nextConfig, next, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, metadata, dynamic (+13 more)

### Community 4 - "mitgliedsantraege/page.tsx"
Cohesion: 0.12
Nodes (23): dynamic, MembershipApplicationsPage(), metadata, DashboardPage(), EditUserPage(), FeeDefaultEntry, planApplicationFees(), berlinDateParts() (+15 more)

### Community 5 - "boardService.ts"
Cohesion: 0.07
Nodes (44): GET(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), PhotoMeta, EditBoardMemberPage(), AdminBoardPage() (+36 more)

### Community 6 - "mitgliedsantraege/actions.ts"
Cohesion: 0.12
Nodes (31): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), membershipApplicationNoticeMessage() (+23 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.07
Nodes (37): ref_node_child_process, ref_node_fs, ref_node_os, ref_node_util, BACKGROUND, icon(), main(), GET() (+29 more)

### Community 8 - "membership.ts"
Cohesion: 0.11
Nodes (20): ApplicationStage(), toDateInput(), ageAt(), CONSENT_VERSION, DATENSCHUTZ_URL, deriveStudentYears(), FALLBACK_FEE_DEFAULT, isOldEnough() (+12 more)

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (55): sharp, GET(), BlogImageManager(), handleDrop(), uploadFiles(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta (+47 more)

### Community 10 - "securityEventService.ts"
Cohesion: 0.18
Nodes (17): SecurityPage(), getPendingRegistrationStats(), SecurityEventType, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview() (+9 more)

### Community 11 - "feeCalculation.ts"
Cohesion: 0.20
Nodes (16): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), annualFee(), billableMonths() (+8 more)

### Community 12 - "eventService.ts"
Cohesion: 0.11
Nodes (32): EditBlogPage(), dynamic, EditEventPage(), metadata, UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData (+24 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.15
Nodes (21): fmt(), gauss(), MarketDiffusion(), PATH_COUNTS, QUANTILES, Tick, TICKS, VOLATILITIES (+13 more)

### Community 14 - "ics.ts"
Cohesion: 0.22
Nodes (16): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), calendar(), describe() (+8 more)

### Community 15 - "lib/siteUrl.ts"
Cohesion: 0.14
Nodes (13): escapeXml(), GET(), metadata, alt, contentType, size, BlogPostingJsonLd(), OrganizationJsonLd() (+5 more)

### Community 16 - "package.json"
Cohesion: 0.08
Nodes (25): name, prisma, seed, private, version, altcha, babel-plugin-react-compiler, nodemailer (+17 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+19 more)

### Community 18 - "app/kontakt/actions.ts"
Cohesion: 0.22
Nodes (14): ContactRequestsPage(), submitContactRequest(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), prisma, ContactInput (+6 more)

### Community 19 - "app/page.tsx"
Cohesion: 0.08
Nodes (46): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), PostCard(), Props, DashboardEvent (+38 more)

### Community 20 - "schemas.ts"
Cohesion: 0.07
Nodes (36): beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), savePost() (+28 more)

### Community 21 - "executeAction"
Cohesion: 0.17
Nodes (32): deletePost(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), toggleFee(), updateFeeAmount(), updateFeeComment() (+24 more)

### Community 22 - "userService.ts"
Cohesion: 0.11
Nodes (25): adapter, prisma, bcryptjs, @prisma/adapter-pg, @prisma/client, updateUser(), emailChangeMessage(), globalForPrisma (+17 more)

### Community 23 - "PhysicsTimeline.tsx"
Cohesion: 0.17
Nodes (10): metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory, TimelineDetail() (+2 more)

### Community 24 - "security/page.tsx"
Cohesion: 0.23
Nodes (11): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+3 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (12): columnPath(), labelStride(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline(), PAD (+4 more)

### Community 26 - "altcha.ts"
Cohesion: 0.14
Nodes (18): altcha-lib, ContactForm(), dynamic, KontaktPage(), metadata, dynamic, internalPath(), LoginPage() (+10 more)

### Community 27 - "TypeSparklines.tsx"
Cohesion: 0.39
Nodes (7): longDayLabel(), sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines()

### Community 28 - "events.ts"
Cohesion: 0.14
Nodes (20): AdminEventsPage(), TIME_ZONE, CALENDAR_ICS_PATH, DAY_MONTH, DAY_MONTH_YEAR, daysUntilEvent(), DEFAULT_DURATION_MINUTES, eventDateBadge() (+12 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.16
Nodes (23): @react-pdf/renderer, GET(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative() (+15 more)

### Community 30 - "dashboard/page.tsx"
Cohesion: 0.07
Nodes (32): MetaLine(), AdminBlogPage(), EmailChangeDialog(), AmountDialog(), explainFee(), FeesSortKey, FeesTableProps, FeesTableUser (+24 more)

### Community 31 - "mitglied-werden/page.tsx"
Cohesion: 0.21
Nodes (14): JourneyRail(), dynamic, metadata, MitgliedWerdenPage(), Props, VerifyPanel(), JOURNEY_STEPS, JourneyStage (+6 more)

### Community 32 - "feeService.ts"
Cohesion: 0.17
Nodes (21): FeesDashboardPage(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), resolveIsStudentDefault(), syncStudentYear() (+13 more)

### Community 33 - "formatNumber"
Cohesion: 0.14
Nodes (16): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, formatBytes(), formatUptime(), ServerDashboard() (+8 more)

### Community 34 - "login/actions.ts"
Cohesion: 0.14
Nodes (21): ref_node_net, POST(), checkLoginFeatureEnabled(), createLoginChallenge(), resendVerificationEmail(), LoginForm(), LINK_EXPIRY(), passwordResetMessage() (+13 more)

### Community 35 - "MarkdownEditor.tsx"
Cohesion: 0.40
Nodes (4): @uiw/react-markdown-preview, @uiw/react-md-editor, MarkdownEditor(), MDEditor

### Community 36 - "EventForm.tsx"
Cohesion: 0.24
Nodes (17): EventForm(), toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate() (+9 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography, ts-node (+10 more)

### Community 39 - "mail/page.tsx"
Cohesion: 0.17
Nodes (14): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, sitemap() (+6 more)

### Community 40 - "auth.ts"
Cohesion: 0.20
Nodes (9): next-auth, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginRateLimitedError, signIn (+1 more)

### Community 41 - "lucide-react"
Cohesion: 0.09
Nodes (30): lucide-react, react, DeletePostButton(), ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat (+22 more)

### Community 42 - "AppError"
Cohesion: 0.21
Nodes (16): parseMailForm(), sendEmailAction(), updateBankDetails(), registerUser(), parseDirectMailForm(), sendDirectMailAction(), resolveUsersByIds(), sendMailForTarget() (+8 more)

### Community 43 - "mailService.ts"
Cohesion: 0.13
Nodes (19): sanitize-html, EmailBlock, EmailMessage, eventContactPath(), EventTiming, ENTITIES, htmlToText(), AnnouncedEvent (+11 more)

### Community 44 - "datenschutz/page.tsx"
Cohesion: 0.16
Nodes (10): DATENSCHUTZ, metadata, IMPRESSUM, metadata, SATZUNG, LegalPage(), LegalSections(), LegalBlock (+2 more)

### Community 45 - "messages.ts"
Cohesion: 0.17
Nodes (18): confirmMembershipTermination(), statusMeta(), TerminationList(), confirm(), accountDeletedMessage(), adminCreatedUserMessage(), feeReminderMessage(), greeting() (+10 more)

### Community 47 - "authz.ts"
Cohesion: 0.15
Nodes (17): POST(), POST(), GET(), setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS (+9 more)

### Community 48 - "EditUserForm.tsx"
Cohesion: 0.11
Nodes (20): metadata, TerminationItem, ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData (+12 more)

### Community 49 - "satzung/page.tsx"
Cohesion: 0.24
Nodes (13): dynamic, metadata, SatzungPage(), resolveFeeDefault(), deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeDefaults() (+5 more)

### Community 50 - "iban.ts"
Cohesion: 0.31
Nodes (13): SummaryBlock(), IbanInput(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban(), maskIban() (+5 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "requireDebugAdmin"
Cohesion: 0.15
Nodes (14): removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), ServerPage(), requireDebugAdmin() (+6 more)

### Community 53 - "MailForm.tsx"
Cohesion: 0.08
Nodes (20): compareBy(), DashboardUsersTable(), displayName(), getStatusIcon(), MailAnnouncement, byStatusThenName(), MailForm(), MailFormProps (+12 more)

### Community 54 - "errors.ts"
Cohesion: 0.14
Nodes (26): zod, deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination() (+18 more)

### Community 55 - "isFeatureEnabled"
Cohesion: 0.17
Nodes (21): ref_crypto, POST(), notifyAdminsAboutRegistration(), POST(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), passwordChangedNoticeMessage(), getSecurityLogPepper() (+13 more)

### Community 56 - "index.ts"
Cohesion: 0.09
Nodes (33): CtaCard(), DashboardTableUser, SortKey, STATUS_RANK, FeeDefaultRow, InfoTooltip(), RateLimitTableProps, Block() (+25 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "app/layout.tsx"
Cohesion: 0.16
Nodes (9): src_app_globals, body, metadata, mono, columns, Footer(), legalLinks, BeforeInstallPromptEvent (+1 more)

### Community 59 - "ref_node_path"
Cohesion: 0.50
Nodes (3): dotenv, ref_node_path, prisma

### Community 60 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

### Community 61 - "slug.ts"
Cohesion: 0.22
Nodes (10): GET(), buildEventIcs(), icsFileName(), getPublicEvent(), GERMAN_LETTERS, idFromSegment(), safeDecode(), slugify() (+2 more)

### Community 62 - "HeaderChrome.tsx"
Cohesion: 0.24
Nodes (9): auth, useAppearance(), Header(), HeaderChrome(), links, ThemeToggle(), useSwipeToClose(), end() (+1 more)

### Community 63 - "passwordStrength.ts"
Cohesion: 0.21
Nodes (10): NewUserForm(), handleSubmit(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "getEditableUser"
Cohesion: 0.33
Nodes (7): GET(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee, getEditableUser()

### Community 67 - "FeesTable"
Cohesion: 0.20
Nodes (5): compareBy(), displayName(), FeesTable(), selectAllWithOpenFees(), hasOpenFee()

### Community 68 - "sendEmail"
Cohesion: 0.29
Nodes (10): createPrismaClient(), getMailTransporter(), normalize(), Recipients, sendEmail(), getDatabaseUrl(), getSmtpConfig(), readRequiredEnv() (+2 more)

### Community 69 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 71 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 72 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (7): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), deleteContactRequest(), setContactRequestHandled()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "ref_node_assert"
Cohesion: 0.33
Nodes (5): ref_node_assert, ref_node_test, SUMMER, WINTER, base

### Community 76 - "AccountPanel"
Cohesion: 0.38
Nodes (5): AccountPanel(), handleSubmit(), ResetPasswordForm(), handleSubmit(), validateNewPassword()

### Community 77 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 78 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "AppThemeProvider.tsx"
Cohesion: 0.40
Nodes (5): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext

### Community 82 - "ApplicationWizard"
Cohesion: 0.70
Nodes (5): ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit()

### Community 91 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **424 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+419 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 542 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `ApplicationWizard.tsx`, `mitgliedsantraege/page.tsx`, `boardService.ts`, `mitgliedsantraege/actions.ts`, `serverStatus.ts`, `blogService.ts`, `eventService.ts`, `ics.ts`, `lib/siteUrl.ts`, `package.json`, `app/kontakt/actions.ts`, `app/page.tsx`, `schemas.ts`, `executeAction`, `PhysicsTimeline.tsx`, `security/page.tsx`, `altcha.ts`, `membershipCertificate.ts`, `dashboard/page.tsx`, `mitglied-werden/page.tsx`, `login/actions.ts`, `MarkdownEditor.tsx`, `mail/page.tsx`, `lucide-react`, `AppError`, `datenschutz/page.tsx`, `forgot-password/layout.tsx`, `authz.ts`, `EditUserForm.tsx`, `satzung/page.tsx`, `requireDebugAdmin`, `MailForm.tsx`, `errors.ts`, `isFeatureEnabled`, `index.ts`, `app/layout.tsx`, `slug.ts`, `HeaderChrome.tsx`, `getEditableUser`, `dashboard/kontakt/actions.ts`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.185) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `LoginForm.tsx`, `ApplicationWizard.tsx`, `next`, `mitgliedsantraege/page.tsx`, `boardService.ts`, `serverStatus.ts`, `eventService.ts`, `package.json`, `app/page.tsx`, `PhysicsTimeline.tsx`, `security/page.tsx`, `OutcomeTimeline.tsx`, `dashboard/page.tsx`, `mitglied-werden/page.tsx`, `formatNumber`, `EventForm.tsx`, `EditUserForm.tsx`, `satzung/page.tsx`, `MailForm.tsx`, `index.ts`, `app/layout.tsx`, `HeaderChrome.tsx`, `RegistrationFunnel.tsx`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `AppError` connect `AppError` to `next`, `mitgliedsantraege/page.tsx`, `boardService.ts`, `mitgliedsantraege/actions.ts`, `serverStatus.ts`, `blogService.ts`, `eventService.ts`, `app/kontakt/actions.ts`, `schemas.ts`, `executeAction`, `userService.ts`, `login/actions.ts`, `auth.ts`, `mailService.ts`, `messages.ts`, `authz.ts`, `requireDebugAdmin`, `errors.ts`, `isFeatureEnabled`, `sendEmail`, `dashboard/kontakt/actions.ts`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _424 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LoginForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10853658536585366 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11255411255411256 - nodes in this community are weakly interconnected._