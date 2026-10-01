# Graph Report - wiphy  (2026-10-01)

## Corpus Check
- 323 files · ~142,675 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1825 nodes · 5987 edges · 88 communities (78 shown, 10 thin omitted)
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
- app/blog/page.tsx
- serverStatus.ts
- mailService.ts
- blogService.ts
- security/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- BulkImport.tsx
- MemberDirectory.tsx
- package.json
- dependencies
- DebugBar.tsx
- MailForm.tsx
- schemas.ts
- EmailBodyField.tsx
- users/[id]/page.tsx
- app/layout.tsx
- normalizeIban
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- reset-password/layout.tsx
- BlogImageManager
- membershipCertificate.ts
- errors.ts
- format.ts
- feeService.ts
- dashboard/kontakt/actions.ts
- featureFlagService.ts
- BankDetailsForm.tsx
- cn
- compilerOptions
- devDependencies
- ServerDashboard.tsx
- isFeatureEnabled
- lucide-react
- RateLimitTable
- altcha.ts
- metadata.ts
- app/page.tsx
- securityEventService.ts
- ApplicationList
- membershipService.ts
- mitgliedsantraege/actions.ts
- app/blog/[id]/page.tsx
- ActivityHeatmap.tsx
- dashboard/page.tsx
- sendEmail
- AppError
- userService.ts
- index.ts
- EditUserForm
- berlinTime.ts
- seed.ts
- eslint.config.mjs
- sepa/route.ts
- forgot-password/layout.tsx
- authz.ts
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- getOptionalUser
- app/vorstand/page.tsx
- mail/page.tsx
- ref_node_fs
- CLAUDE.md
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- formatNumber
- eventService.ts
- accountActions.ts
- altcha.d.ts
- postcss.config.mjs
- blogImageProcessing.ts
- { GET, POST }
- MarkdownViewer.tsx
- messages.ts
- rateLimitService.ts
- auth.ts
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
- `generateMetadata()` --calls--> `pageMetadata()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/metadata.ts
- `BlogImageManager()` --indirect_call--> `deleteBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `moveBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `saveBlogImageAlt()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts

## Import Cycles
- None detected.

## Communities (88 total, 10 thin omitted)

### Community 0 - "Callout"
Cohesion: 0.09
Nodes (35): next-auth, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), ForgotPasswordPage(), FaqItem, LoginFaq() (+27 more)

### Community 1 - "EditUserForm.tsx"
Cohesion: 0.09
Nodes (27): ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, createUserAction(), NewUserForm() (+19 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (32): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), PaymentOption(), ageAt() (+24 more)

### Community 3 - "next"
Cohesion: 0.09
Nodes (27): nextConfig, next, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic, metadata (+19 more)

### Community 4 - "executeAction"
Cohesion: 0.16
Nodes (32): createDraft(), deletePost(), savePost(), removeMembershipApplication(), createEventDraft(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount() (+24 more)

### Community 5 - "boardService.ts"
Cohesion: 0.08
Nodes (44): POST(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE (+36 more)

### Community 6 - "app/blog/page.tsx"
Cohesion: 0.21
Nodes (12): BlogIndexPage(), generateMetadata(), PostCard(), Props, BlogGallery(), BlogImageMeta, blogImageSrcSet(), blogImageUrl() (+4 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.16
Nodes (20): ref_node_os, GET(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG, DEPLOY_SCRIPT (+12 more)

### Community 8 - "mailService.ts"
Cohesion: 0.07
Nodes (48): sanitize-html, EmailComposerDialog(), closeDialog(), handleClose(), blockHtml(), blockText(), derivePreheader(), EmailBlock (+40 more)

### Community 9 - "blogService.ts"
Cohesion: 0.08
Nodes (45): POST(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageVariant, MAX_ADDITIONAL_BLOG_IMAGES, MAX_BLOG_IMAGE_UPLOAD_BYTES, MAX_BLOG_IMAGES, moveInOrder() (+37 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.18
Nodes (17): sparkGeometry, dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel() (+9 more)

### Community 11 - "events.ts"
Cohesion: 0.17
Nodes (17): UpcomingEventAlert(), isSameBerlinDay(), CALENDAR_ICS_PATH, DAY_MONTH, DAY_MONTH_YEAR, DEFAULT_DURATION_MINUTES, eventEnd(), formatEventClock() (+9 more)

### Community 12 - "ics.ts"
Cohesion: 0.16
Nodes (19): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildEventIcs(), calendar(), describe() (+11 more)

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
Nodes (20): name, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer, react-dom (+12 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "DebugBar.tsx"
Cohesion: 0.17
Nodes (11): ref_node_child_process, ref_node_util, auth, commit, DebugBar(), LINKS, TIME, Header() (+3 more)

### Community 19 - "MailForm.tsx"
Cohesion: 0.13
Nodes (9): byStatusThenName(), MailForm(), MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, useEmailEditor() (+1 more)

### Community 20 - "schemas.ts"
Cohesion: 0.08
Nodes (29): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), AdminCreateUserInput (+21 more)

### Community 21 - "EmailBodyField.tsx"
Cohesion: 0.24
Nodes (7): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailBodyField(), EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 22 - "users/[id]/page.tsx"
Cohesion: 0.12
Nodes (20): DeleteMemberSection(), deleteUserAction(), EditUserPage(), metadata, updateUser(), NewUserPage(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS (+12 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.09
Nodes (21): escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono, alt (+13 more)

### Community 24 - "normalizeIban"
Cohesion: 0.30
Nodes (15): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+7 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.11
Nodes (24): ref_node_assert, ref_node_test, JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props (+16 more)

### Community 28 - "BlogImageManager"
Cohesion: 0.60
Nodes (4): BlogImageManager(), handleDrop(), uploadFiles(), formatBytes()

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.11
Nodes (33): @react-pdf/renderer, GET(), GET(), DashboardPage(), ZahlungenPage(), berlinYear(), certificateFacts, CertificateFee (+25 more)

### Community 30 - "errors.ts"
Cohesion: 0.22
Nodes (11): zod, importRowsSchema, updateBankDetails(), getRedirectTarget(), isRedirectError(), RedirectTarget, AppErrorCode, mapErrorToActionResult() (+3 more)

### Community 31 - "format.ts"
Cohesion: 0.12
Nodes (19): MetaLine(), AdminBlogPage(), statusMeta(), TerminationList(), confirm(), AccountSection(), terminationNoticeMessage(), terminationReceivedMessage() (+11 more)

### Community 32 - "feeService.ts"
Cohesion: 0.18
Nodes (19): UserManagementPage(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), resolveIsStudentDefault(), syncStudentYear() (+11 more)

### Community 33 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (7): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), deleteContactRequest(), setContactRequestHandled()

### Community 34 - "featureFlagService.ts"
Cohesion: 0.25
Nodes (10): @prisma/client, setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, isFeatureFlagKey() (+2 more)

### Community 35 - "BankDetailsForm.tsx"
Cohesion: 0.13
Nodes (25): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), BankValues, ApplicationWizard(), currentFormValues() (+17 more)

### Community 36 - "cn"
Cohesion: 0.06
Nodes (32): CtaCard(), MembershipCertificateCard(), SectionHeader(), categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline() (+24 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "ServerDashboard.tsx"
Cohesion: 0.16
Nodes (13): FeatureFlagsPage(), triggerDeploy(), ServerPage(), DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard() (+5 more)

### Community 40 - "isFeatureEnabled"
Cohesion: 0.26
Nodes (14): POST(), notifyAdminsAboutRegistration(), POST(), ContactRequestsPage(), registerUser(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), passwordChangedNoticeMessage() (+6 more)

### Community 41 - "lucide-react"
Cohesion: 0.13
Nodes (20): lucide-react, react, ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat, STATUS_META (+12 more)

### Community 42 - "RateLimitTable"
Cohesion: 0.33
Nodes (5): getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo()

### Community 43 - "altcha.ts"
Cohesion: 0.11
Nodes (21): ContactForm(), dynamic, KontaktPage(), metadata, dynamic, LoginPage(), metadata, NOTICES (+13 more)

### Community 44 - "metadata.ts"
Cohesion: 0.13
Nodes (12): DATENSCHUTZ, metadata, IMPRESSUM, metadata, SATZUNG, LegalPage(), LegalSections(), LegalBlock (+4 more)

### Community 45 - "app/page.tsx"
Cohesion: 0.08
Nodes (31): DashboardEvent, metadata, metadata, heroMetrics, pillars, dynamic, Props, dynamic (+23 more)

### Community 46 - "securityEventService.ts"
Cohesion: 0.14
Nodes (20): SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), DayBucket (+12 more)

### Community 47 - "ApplicationList"
Cohesion: 0.16
Nodes (17): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue() (+9 more)

### Community 48 - "membershipService.ts"
Cohesion: 0.14
Nodes (25): MembershipApplicationsPage(), dynamic, metadata, SatzungPage(), annualFee(), FeeDefaultEntry, FeeRates, planApplicationFees() (+17 more)

### Community 49 - "mitgliedsantraege/actions.ts"
Cohesion: 0.18
Nodes (18): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), membershipApprovedMessage(), membershipRejectedMessage(), findApplicationById(), approveApplication() (+10 more)

### Community 50 - "app/blog/[id]/page.tsx"
Cohesion: 0.21
Nodes (19): generateMetadata(), Props, PublicBlogPost(), HomePage(), sitemap(), EventDetailPage(), generateMetadata(), eventPath() (+11 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "dashboard/page.tsx"
Cohesion: 0.18
Nodes (8): EmailChangeDialog(), MailSuccessDialog(), ADMIN_ACTIONS, getStatusIcon(), ProfileSummary(), ProfileSummaryUser, QueryParamDialog(), LogoutButton()

### Community 53 - "sendEmail"
Cohesion: 0.24
Nodes (14): POST(), createLoginChallenge(), resendVerificationEmail(), LoginForm(), renderEmailText(), getMailTransporter(), normalize(), Recipients (+6 more)

### Community 54 - "AppError"
Cohesion: 0.18
Nodes (17): parseMailForm(), sendEmailAction(), removeRateLimitEntry(), deleteEventAction(), revalidateEvent(), saveEventAction(), withdrawMembershipApplication(), WithdrawApplicationButton() (+9 more)

### Community 55 - "userService.ts"
Cohesion: 0.20
Nodes (18): bcryptjs, globalForPrisma, prisma, getSecurityLogPepper(), PendingRegistrationStats, UNVERIFIED_TTL_HOURS, archiveFeesOfUser(), deleteUserById() (+10 more)

### Community 56 - "index.ts"
Cohesion: 0.10
Nodes (33): DeletePostButton(), metadata, InfoTooltip(), RateLimitTableProps, dynamic, metadata, chipTones, GROUPS (+25 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "berlinTime.ts"
Cohesion: 0.25
Nodes (14): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), pad(), parseBerlinLocalInput(), PARTS (+6 more)

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 61 - "sepa/route.ts"
Cohesion: 0.25
Nodes (15): field(), POST(), SepaDialog(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+7 more)

### Community 63 - "authz.ts"
Cohesion: 0.29
Nodes (12): COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), AS_MEMBER_COOKIE, DEBUG_COOKIE, isDebugMode(), isViewingAsMember(), normalizeRole() (+4 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

### Community 67 - "app/vorstand/page.tsx"
Cohesion: 0.38
Nodes (5): AdminBoardPage(), getInitials(), metadata, VorstandPage(), boardPhotoUrl()

### Community 68 - "mail/page.tsx"
Cohesion: 0.14
Nodes (16): MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata (+8 more)

### Community 69 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "formatNumber"
Cohesion: 0.13
Nodes (17): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+9 more)

### Community 76 - "eventService.ts"
Cohesion: 0.11
Nodes (33): EditBlogPage(), AdminEventsPage(), startOfBerlinDay(), formatEventShort(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData (+25 more)

### Community 78 - "accountActions.ts"
Cohesion: 0.22
Nodes (16): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination(), ActionResult (+8 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "blogImageProcessing.ts"
Cohesion: 0.28
Nodes (5): sharp, ImageBytes, processBlogImage(), ProcessedBlogImage, QUALITY_LADDER

### Community 92 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 93 - "messages.ts"
Cohesion: 0.13
Nodes (24): submitContactRequest(), submitMembershipApplication(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, EmailMessage, adminCreatedUserMessage(), contactRequestMessage() (+16 more)

### Community 97 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 99 - "auth.ts"
Cohesion: 0.11
Nodes (21): ref_crypto, ref_node_net, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError (+13 more)

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
- **Why does `next` connect `next` to `Callout`, `EditUserForm.tsx`, `ApplicationWizard.tsx`, `executeAction`, `boardService.ts`, `app/blog/page.tsx`, `serverStatus.ts`, `blogService.ts`, `security/page.tsx`, `ics.ts`, `MemberDirectory.tsx`, `package.json`, `DebugBar.tsx`, `MailForm.tsx`, `schemas.ts`, `users/[id]/page.tsx`, `app/layout.tsx`, `mitglied-werden/page.tsx`, `reset-password/layout.tsx`, `membershipCertificate.ts`, `errors.ts`, `dashboard/kontakt/actions.ts`, `featureFlagService.ts`, `BankDetailsForm.tsx`, `cn`, `isFeatureEnabled`, `lucide-react`, `altcha.ts`, `metadata.ts`, `app/page.tsx`, `membershipService.ts`, `mitgliedsantraege/actions.ts`, `app/blog/[id]/page.tsx`, `dashboard/page.tsx`, `sendEmail`, `AppError`, `userService.ts`, `index.ts`, `sepa/route.ts`, `forgot-password/layout.tsx`, `authz.ts`, `getOptionalUser`, `app/vorstand/page.tsx`, `mail/page.tsx`, `accountActions.ts`, `messages.ts`, `auth.ts`, `login/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `Callout`, `EditUserForm.tsx`, `ApplicationWizard.tsx`, `next`, `app/blog/page.tsx`, `security/page.tsx`, `MarketDiffusion.tsx`, `MemberDirectory.tsx`, `package.json`, `DebugBar.tsx`, `MailForm.tsx`, `users/[id]/page.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `BankDetailsForm.tsx`, `cn`, `ServerDashboard.tsx`, `app/page.tsx`, `membershipService.ts`, `app/blog/[id]/page.tsx`, `dashboard/page.tsx`, `index.ts`, `app/vorstand/page.tsx`, `formatNumber`, `accountActions.ts`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `Callout`, `EditUserForm.tsx`, `ApplicationWizard.tsx`, `next`, `app/blog/page.tsx`, `MarketDiffusion.tsx`, `BulkImport.tsx`, `MemberDirectory.tsx`, `package.json`, `MailForm.tsx`, `users/[id]/page.tsx`, `app/layout.tsx`, `normalizeIban`, `featureFlagService.ts`, `BankDetailsForm.tsx`, `cn`, `ServerDashboard.tsx`, `app/page.tsx`, `dashboard/page.tsx`, `index.ts`, `accountActions.ts`, `altcha.d.ts`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _421 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Callout` be split into smaller, more focused modules?**
  _Cohesion score 0.08925979680696662 - nodes in this community are weakly interconnected._
- **Should `EditUserForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08502024291497975 - nodes in this community are weakly interconnected._