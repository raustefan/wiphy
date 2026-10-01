# Graph Report - wiphy  (2026-10-01)

## Corpus Check
- 323 files · ~142,660 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1825 nodes · 5984 edges · 86 communities (76 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2e6bd4cf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Callout
- EditUserForm.tsx
- ApplicationWizard.tsx
- next
- executeAction
- boardService.ts
- mailService.ts
- authz.ts
- blocks.ts
- blogService.ts
- securityLabels.ts
- events.ts
- ics.ts
- MarketDiffusion.tsx
- BulkImport.tsx
- MemberDirectory.tsx
- package.json
- dependencies
- ref_node_assert
- MailForm.tsx
- schemas.ts
- EmailBodyField.tsx
- userService.ts
- app/layout.tsx
- normalizeIban
- OutcomeTimeline.tsx
- JourneyRail.tsx
- reset-password/layout.tsx
- blogImages.ts
- dashboard/page.tsx
- errors.ts
- format.ts
- feeService.ts
- dashboard/kontakt/actions.ts
- featureFlagService.ts
- zahlungen/page.tsx
- PhysicsTimeline.tsx
- compilerOptions
- devDependencies
- ApplicationList.tsx
- sitemap.ts
- lucide-react
- RateLimitTable
- prisma.ts
- datenschutz/page.tsx
- app/page.tsx
- securityEventService.ts
- ApplicationList
- mitglied-werden/page.tsx
- mitgliedsantraege/actions.ts
- app/blog/[id]/page.tsx
- ActivityHeatmap.tsx
- auth.ts
- sendEmail
- AppError
- isFeatureEnabled
- index.ts
- EditUserForm
- TypeSparklines.tsx
- seed.ts
- eslint.config.mjs
- sepa/route.ts
- forgot-password/layout.tsx
- RegistrationFunnel.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- mail/page.tsx
- CLAUDE.md
- blog/actions.ts
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- ServerDashboard.tsx
- eventService.ts
- accountActions.ts
- altcha.d.ts
- postcss.config.mjs
- blogImageProcessing.ts
- { GET, POST }
- MarkdownViewer.tsx
- mitglied-werden/actions.ts
- rateLimitService.ts
- registerAction.ts
- login/layout.tsx
- verify-email/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 112 edges
2. `AppError` - 85 edges
3. `cn()` - 80 edges
4. `lucide-react` - 78 edges
5. `react` - 63 edges
6. `executeAction()` - 59 edges
7. `requireAdmin()` - 56 edges
8. `Card()` - 48 edges
9. `Button()` - 46 edges
10. `isFeatureEnabled()` - 40 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `BlogImageManager()` --indirect_call--> `deleteBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `moveBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `saveBlogImageAlt()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts

## Import Cycles
- None detected.

## Communities (86 total, 10 thin omitted)

### Community 0 - "Callout"
Cohesion: 0.08
Nodes (37): altcha, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), ForgotPasswordPage(), createLoginChallenge(), FaqItem (+29 more)

### Community 1 - "EditUserForm.tsx"
Cohesion: 0.09
Nodes (22): ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, NewUserForm(), handleSubmit() (+14 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (30): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), ageAt(), CONSENT_VERSION (+22 more)

### Community 3 - "next"
Cohesion: 0.07
Nodes (33): nextConfig, next, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic, metadata (+25 more)

### Community 4 - "executeAction"
Cohesion: 0.16
Nodes (31): createDraft(), deletePost(), savePost(), removeMembershipApplication(), createEventDraft(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount() (+23 more)

### Community 5 - "boardService.ts"
Cohesion: 0.08
Nodes (44): POST(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE (+36 more)

### Community 6 - "mailService.ts"
Cohesion: 0.14
Nodes (17): sanitize-html, eventContactPath(), EventTiming, ENTITIES, htmlToText(), AnnouncedEvent, composeMessage(), eventBlocks() (+9 more)

### Community 7 - "authz.ts"
Cohesion: 0.05
Nodes (59): ref_node_child_process, ref_node_fs, ref_node_os, ref_node_util, BACKGROUND, icon(), main(), GET() (+51 more)

### Community 8 - "blocks.ts"
Cohesion: 0.21
Nodes (19): blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml() (+11 more)

### Community 9 - "blogService.ts"
Cohesion: 0.09
Nodes (41): POST(), AdminBlogPage(), MAX_BLOG_IMAGE_UPLOAD_BYTES, applyImageOrder(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost() (+33 more)

### Community 10 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 11 - "events.ts"
Cohesion: 0.12
Nodes (23): EditBlogPage(), isSameBerlinDay(), TIME_ZONE, CALENDAR_ICS_PATH, DAY_MONTH, DAY_MONTH_YEAR, daysUntilEvent(), DEFAULT_DURATION_MINUTES (+15 more)

### Community 12 - "ics.ts"
Cohesion: 0.15
Nodes (20): RFC-5545, GET(), GET(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs(), calendar() (+12 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.11
Nodes (28): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+20 more)

### Community 14 - "BulkImport.tsx"
Cohesion: 0.22
Nodes (10): bulkCreateUsersAction(), ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row (+2 more)

### Community 15 - "MemberDirectory.tsx"
Cohesion: 0.09
Nodes (30): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), explainFee() (+22 more)

### Community 16 - "package.json"
Cohesion: 0.10
Nodes (20): name, private, version, altcha-lib, babel-plugin-react-compiler, next-auth, nodemailer, react-dom (+12 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "ref_node_assert"
Cohesion: 0.12
Nodes (16): ref_node_assert, ref_node_test, berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate() (+8 more)

### Community 19 - "MailForm.tsx"
Cohesion: 0.11
Nodes (11): byStatusThenName(), MailForm(), MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, useEmailEditor() (+3 more)

### Community 20 - "schemas.ts"
Cohesion: 0.08
Nodes (22): deleteEventAction(), revalidateEvent(), saveEventAction(), AdminCreateUserInput, BankUpdateParsed, blogImageSchema, boardDeleteSchema, boardMoveSchema (+14 more)

### Community 21 - "EmailBodyField.tsx"
Cohesion: 0.24
Nodes (7): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailBodyField(), EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 22 - "userService.ts"
Cohesion: 0.15
Nodes (16): DeleteMemberSection(), deleteUserAction(), EditUserPage(), metadata, updateUser(), adminCreatedUserMessage(), emailChangeMessage(), assertCanEditUser() (+8 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.08
Nodes (23): escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono, alt (+15 more)

### Community 24 - "normalizeIban"
Cohesion: 0.30
Nodes (15): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+7 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "JourneyRail.tsx"
Cohesion: 0.33
Nodes (8): JourneyRail(), JOURNEY_STEPS, JourneyStage, JourneyState, JourneyStepId, journeyStepIndex(), resolveJourneyStage(), anonymous

### Community 28 - "blogImages.ts"
Cohesion: 0.17
Nodes (12): BlogImageManager(), handleDrop(), uploadFiles(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, formatBytes() (+4 more)

### Community 29 - "dashboard/page.tsx"
Cohesion: 0.05
Nodes (63): @react-pdf/renderer, GET(), GET(), EmailChangeDialog(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, DashboardPage() (+55 more)

### Community 30 - "errors.ts"
Cohesion: 0.23
Nodes (10): zod, createUserAction(), importRowsSchema, getRedirectTarget(), isRedirectError(), RedirectTarget, AppErrorCode, mapErrorToActionResult() (+2 more)

### Community 31 - "format.ts"
Cohesion: 0.29
Nodes (6): DATE_TIME, EURO, LONG_DATE, NUMBER, SHORT_DATE, toDate()

### Community 32 - "feeService.ts"
Cohesion: 0.13
Nodes (28): billableMonths(), calculateFee(), calculateFeeAmount(), FeeBreakdown, FeeInput, NON_DIRECT_DEBIT_SURCHARGE, wasMemberInYear(), clearFeeAmountOverride() (+20 more)

### Community 33 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (7): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), deleteContactRequest(), setContactRequestHandled()

### Community 34 - "featureFlagService.ts"
Cohesion: 0.21
Nodes (11): @prisma/client, setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureDisabledQueryDialog(), FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER (+3 more)

### Community 35 - "zahlungen/page.tsx"
Cohesion: 0.15
Nodes (23): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), BankValues, dynamic, metadata (+15 more)

### Community 36 - "PhysicsTimeline.tsx"
Cohesion: 0.17
Nodes (10): metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory, TimelineDetail() (+2 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "ApplicationList.tsx"
Cohesion: 0.25
Nodes (5): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, TextArea()

### Community 40 - "sitemap.ts"
Cohesion: 0.70
Nodes (4): sitemap(), TerminePage(), getPastEvents(), getUpcomingEvents()

### Community 41 - "lucide-react"
Cohesion: 0.11
Nodes (27): lucide-react, react, DeletePostButton(), ContactRequestItem, dateFormat, TerminationItem, DeleteMemberSectionProps, PhotoMeta (+19 more)

### Community 42 - "RateLimitTable"
Cohesion: 0.33
Nodes (5): getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo()

### Community 43 - "prisma.ts"
Cohesion: 0.16
Nodes (16): ContactForm(), dynamic, KontaktPage(), metadata, createPrismaClient(), globalForPrisma, ALTCHA_COMPLEXITY, consumeAltchaSolution() (+8 more)

### Community 44 - "datenschutz/page.tsx"
Cohesion: 0.16
Nodes (10): DATENSCHUTZ, metadata, IMPRESSUM, metadata, SATZUNG, LegalPage(), LegalSections(), LegalBlock (+2 more)

### Community 45 - "app/page.tsx"
Cohesion: 0.09
Nodes (35): DashboardEvent, UpcomingEventAlert(), metadata, heroMetrics, HomePage(), pillars, dynamic, Props (+27 more)

### Community 46 - "securityEventService.ts"
Cohesion: 0.16
Nodes (18): SecurityPage(), typeLabel, EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap() (+10 more)

### Community 47 - "ApplicationList"
Cohesion: 0.10
Nodes (23): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue() (+15 more)

### Community 48 - "mitglied-werden/page.tsx"
Cohesion: 0.10
Nodes (34): MembershipApplicationsPage(), ApplicationStage(), dynamic, metadata, Props, toDateInput(), VerifyPanel(), dynamic (+26 more)

### Community 49 - "mitgliedsantraege/actions.ts"
Cohesion: 0.13
Nodes (22): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), statusMeta(), TerminationList(), confirm(), membershipRejectedMessage() (+14 more)

### Community 50 - "app/blog/[id]/page.tsx"
Cohesion: 0.14
Nodes (25): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props (+17 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "auth.ts"
Cohesion: 0.20
Nodes (9): AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError, signIn (+1 more)

### Community 53 - "sendEmail"
Cohesion: 0.43
Nodes (7): EmailMessage, renderEmailText(), getMailTransporter(), normalize(), Recipients, sendEmail(), getSmtpConfig()

### Community 54 - "AppError"
Cohesion: 0.17
Nodes (19): parseMailForm(), sendEmailAction(), removeRateLimitEntry(), updateBankDetails(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), parseDirectMailForm() (+11 more)

### Community 55 - "isFeatureEnabled"
Cohesion: 0.18
Nodes (22): bcryptjs, POST(), notifyAdminsAboutRegistration(), POST(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), passwordChangedNoticeMessage(), prisma (+14 more)

### Community 56 - "index.ts"
Cohesion: 0.08
Nodes (39): metadata, CtaCard(), InfoTooltip(), dynamic, metadata, RateLimitTableProps, chipTones, GROUPS (+31 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "TypeSparklines.tsx"
Cohesion: 0.38
Nodes (6): sparkGeometry, typeHint(), SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 61 - "sepa/route.ts"
Cohesion: 0.25
Nodes (15): field(), POST(), SepaDialog(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+7 more)

### Community 63 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 68 - "mail/page.tsx"
Cohesion: 0.13
Nodes (16): MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata (+8 more)

### Community 71 - "blog/actions.ts"
Cohesion: 0.35
Nodes (11): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), blogDeleteSchema (+3 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "ServerDashboard.tsx"
Cohesion: 0.14
Nodes (17): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, formatBytes(), formatUptime(), Sample (+9 more)

### Community 76 - "eventService.ts"
Cohesion: 0.13
Nodes (28): AdminEventsPage(), startOfBerlinDay(), createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findLatestPastEvent(), findNextUpcomingEvent() (+20 more)

### Community 78 - "accountActions.ts"
Cohesion: 0.13
Nodes (29): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination(), AccountSection() (+21 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "blogImageProcessing.ts"
Cohesion: 0.28
Nodes (5): sharp, ImageBytes, processBlogImage(), ProcessedBlogImage, QUALITY_LADDER

### Community 92 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 93 - "mitglied-werden/actions.ts"
Cohesion: 0.16
Nodes (17): ref_crypto, ContactRequestsPage(), submitContactRequest(), submitMembershipApplication(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage() (+9 more)

### Community 97 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 99 - "registerAction.ts"
Cohesion: 0.16
Nodes (21): ref_node_net, POST(), resendVerificationEmail(), registerUser(), LINK_EXPIRY(), passwordResetMessage(), registrationConfirmationMessage(), addressKey() (+13 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **421 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+416 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 538 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `Callout`, `EditUserForm.tsx`, `ApplicationWizard.tsx`, `executeAction`, `boardService.ts`, `authz.ts`, `blogService.ts`, `ics.ts`, `MemberDirectory.tsx`, `package.json`, `MailForm.tsx`, `schemas.ts`, `userService.ts`, `app/layout.tsx`, `reset-password/layout.tsx`, `dashboard/page.tsx`, `errors.ts`, `dashboard/kontakt/actions.ts`, `featureFlagService.ts`, `zahlungen/page.tsx`, `PhysicsTimeline.tsx`, `sitemap.ts`, `lucide-react`, `prisma.ts`, `datenschutz/page.tsx`, `app/page.tsx`, `ApplicationList`, `mitglied-werden/page.tsx`, `mitgliedsantraege/actions.ts`, `app/blog/[id]/page.tsx`, `AppError`, `isFeatureEnabled`, `index.ts`, `sepa/route.ts`, `forgot-password/layout.tsx`, `mail/page.tsx`, `blog/actions.ts`, `accountActions.ts`, `mitglied-werden/actions.ts`, `registerAction.ts`, `login/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `Callout`, `EditUserForm.tsx`, `ApplicationWizard.tsx`, `next`, `authz.ts`, `MarketDiffusion.tsx`, `MemberDirectory.tsx`, `package.json`, `MailForm.tsx`, `userService.ts`, `OutcomeTimeline.tsx`, `JourneyRail.tsx`, `dashboard/page.tsx`, `zahlungen/page.tsx`, `PhysicsTimeline.tsx`, `ApplicationList.tsx`, `app/page.tsx`, `mitglied-werden/page.tsx`, `app/blog/[id]/page.tsx`, `index.ts`, `RegistrationFunnel.tsx`, `ServerDashboard.tsx`, `accountActions.ts`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `Callout`, `EditUserForm.tsx`, `ApplicationWizard.tsx`, `next`, `MarketDiffusion.tsx`, `BulkImport.tsx`, `MemberDirectory.tsx`, `package.json`, `MailForm.tsx`, `userService.ts`, `app/layout.tsx`, `normalizeIban`, `dashboard/page.tsx`, `featureFlagService.ts`, `zahlungen/page.tsx`, `PhysicsTimeline.tsx`, `ApplicationList.tsx`, `app/page.tsx`, `app/blog/[id]/page.tsx`, `index.ts`, `ServerDashboard.tsx`, `accountActions.ts`, `altcha.d.ts`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _421 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Callout` be split into smaller, more focused modules?**
  _Cohesion score 0.08484848484848485 - nodes in this community are weakly interconnected._
- **Should `EditUserForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._