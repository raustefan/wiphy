# Graph Report - wiphy  (2026-10-14)

## Corpus Check
- 339 files · ~155,149 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1927 nodes · 6250 edges · 91 communities (76 shown, 15 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c7a06001`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- app/layout.tsx
- ApplicationWizard.tsx
- authz.ts
- mitgliedsantraege/actions.ts
- boardService.ts
- formatDate
- serverStatus.ts
- konto/page.tsx
- blogService.ts
- security/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- feeDefaultService.ts
- userService.ts
- package.json
- dependencies
- mailService.ts
- errors.ts
- schemas.ts
- seed.ts
- DeleteMemberSection
- lib/siteUrl.ts
- MemberDirectory.tsx
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- gravityPhysics.ts
- requireDebugAdmin
- dashboard/page.tsx
- HeaderChrome.tsx
- normalizeIban
- feeService.ts
- eslint.config.mjs
- format.ts
- zahlungen/page.tsx
- PhysicsTimeline.tsx
- compilerOptions
- devDependencies
- index.ts
- blog/actions.ts
- EditUserForm.tsx
- clientIp.ts
- BulkImport.tsx
- Callout
- movePostImage
- sessionPolicy.test.ts
- featureFlagService.ts
- react
- mitglied-werden/actions.ts
- ActivityHeatmap.tsx
- securityEventService.ts
- blogImageProcessing.ts
- passwordStrength.ts
- MailForm.tsx
- forgot-password/layout.tsx
- EditUserForm
- users/[id]/page.tsx
- verify-email/layout.tsx
- userUpdateData.ts
- ServerDashboard.tsx
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- Footer.tsx
- getOptionalUser
- CLAUDE.md
- login/page.tsx
- ref_node_assert
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- accountActions.ts
- app/termine/[id]/page.tsx
- rateLimitService.ts
- altcha.d.ts
- paymentHistoryPdf.tsx
- formatNumber
- postcss.config.mjs
- blogRepository.ts
- ApplicationList
- { GET, POST }
- AppError
- ref_node_fs
- DebugConsole.tsx
- login/layout.tsx
- reset-password/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 119 edges
2. `cn()` - 88 edges
3. `AppError` - 88 edges
4. `lucide-react` - 80 edges
5. `react` - 71 edges
6. `executeAction()` - 62 edges
7. `requireAdmin()` - 56 edges
8. `Button()` - 44 edges
9. `isFeatureEnabled()` - 42 edges
10. `formatDate()` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `ContactRequestList()` --indirect_call--> `markContactRequestHandled()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts
- `confirmDelete()` --indirect_call--> `removeContactRequest()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts
- `EmailChangeForm()` --indirect_call--> `requestEmailChangeAction()`  [INFERRED]
  src/app/dashboard/konto/AccessForms.tsx → src/app/dashboard/konto/actions.ts

## Import Cycles
- None detected.

## Communities (91 total, 15 thin omitted)

### Community 0 - "next"
Cohesion: 0.10
Nodes (34): nextConfig, lucide-react, next, AdminBlogPage(), metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+26 more)

### Community 1 - "app/layout.tsx"
Cohesion: 0.20
Nodes (8): src_app_globals, body, metadata, mono, serif, auth, Header(), InstallHint()

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (33): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, PaymentOption(), FeeDefaultEntry, FeeRates (+25 more)

### Community 3 - "authz.ts"
Cohesion: 0.17
Nodes (19): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage(), commit, DebugBar() (+11 more)

### Community 4 - "mitgliedsantraege/actions.ts"
Cohesion: 0.16
Nodes (20): planApplicationFees(), countOpenApplications(), deleteApplication(), findApplicationById(), findApplications(), getMaxMitgliedId(), findUserByMitgliedIdExcludingUser(), ApplicationWithUser (+12 more)

### Community 5 - "boardService.ts"
Cohesion: 0.05
Nodes (59): POST(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), AdminBoardPage(), DATENSCHUTZ (+51 more)

### Community 6 - "formatDate"
Cohesion: 0.15
Nodes (23): generateMetadata(), Props, PublicBlogPost(), LeadPost(), MetaLine(), PostRow(), Props, HomePage() (+15 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.12
Nodes (27): ref_node_os, GET(), GET(), ServerPage(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK (+19 more)

### Community 8 - "konto/page.tsx"
Cohesion: 0.24
Nodes (5): EmailChangeForm(), PasswordChangeButton(), dynamic, metadata, PasswordInput()

### Community 9 - "blogService.ts"
Cohesion: 0.13
Nodes (24): POST(), BlogIndexPage(), MAX_BLOG_IMAGE_UPLOAD_BYTES, MAX_BLOG_IMAGES, processBlogImage(), countImagesForPost(), deletePostById(), findAllPosts() (+16 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.18
Nodes (17): sparkGeometry, dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel() (+9 more)

### Community 11 - "events.ts"
Cohesion: 0.11
Nodes (36): EventForm(), AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay() (+28 more)

### Community 12 - "ics.ts"
Cohesion: 0.12
Nodes (26): RFC-5545, GET(), GET(), TerminePage(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs() (+18 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (32): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+24 more)

### Community 14 - "feeDefaultService.ts"
Cohesion: 0.42
Nodes (7): deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeDefaults(), getFeeRatesForYear(), removeFeeDefault(), setFeeDefault()

### Community 15 - "userService.ts"
Cohesion: 0.10
Nodes (52): bcryptjs, ref_crypto, POST(), POST(), notifyAdminsAboutRegistration(), POST(), KontoPage(), resendVerificationEmail() (+44 more)

### Community 16 - "package.json"
Cohesion: 0.08
Nodes (23): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+15 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "mailService.ts"
Cohesion: 0.06
Nodes (55): sanitize-html, parseMailForm(), sendEmailAction(), MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml() (+47 more)

### Community 19 - "errors.ts"
Cohesion: 0.18
Nodes (17): zod, EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), bulkCreateUsersAction(), createUserAction(), importRowsSchema, updateBankDetails() (+9 more)

### Community 20 - "schemas.ts"
Cohesion: 0.07
Nodes (23): AdminCreateUserInput, BankUpdateParsed, berlinDateTime(), boardDeleteSchema, boardMoveSchema, boardSaveSchema, contactSchema, directMailSchema (+15 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 23 - "lib/siteUrl.ts"
Cohesion: 0.12
Nodes (18): escapeXml(), GET(), DashboardLayout(), metadata, alt, contentType, size, sitemap() (+10 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.09
Nodes (30): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), explainFee() (+22 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.13
Nodes (20): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), WithdrawApplicationButton() (+12 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "requireDebugAdmin"
Cohesion: 0.36
Nodes (6): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, isFeatureFlagKey(), requireDebugAdmin(), setFeatureFlagEnabled()

### Community 29 - "dashboard/page.tsx"
Cohesion: 0.07
Nodes (40): GET(), CtaCard(), byStatusThenName(), MailForm(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, DashboardPage() (+32 more)

### Community 30 - "HeaderChrome.tsx"
Cohesion: 0.36
Nodes (6): HeaderChrome(), links, ThemeToggle(), useSwipeToClose(), end(), offset()

### Community 31 - "normalizeIban"
Cohesion: 0.14
Nodes (31): field(), POST(), SepaDialog(), SummaryBlock(), ibanError(), IbanInput(), check(), handleChange() (+23 more)

### Community 32 - "feeService.ts"
Cohesion: 0.15
Nodes (25): UserManagementPage(), FeeBreakdown, resolveFeeDefault(), archiveFeesOfUser(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers() (+17 more)

### Community 33 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 34 - "format.ts"
Cohesion: 0.14
Nodes (11): statusMeta(), TerminationList(), confirm(), AccountSection(), DATE_TIME, EURO, formatDateTime(), LONG_DATE (+3 more)

### Community 35 - "zahlungen/page.tsx"
Cohesion: 0.12
Nodes (29): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), dynamic, metadata, ZahlungenPage() (+21 more)

### Community 36 - "PhysicsTimeline.tsx"
Cohesion: 0.27
Nodes (6): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline()

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "index.ts"
Cohesion: 0.09
Nodes (32): chipTones, DirectoryAccount, GROUPS, SortKey, StatusChip(), StatTile(), ShareButton(), share() (+24 more)

### Community 40 - "blog/actions.ts"
Cohesion: 0.19
Nodes (18): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager() (+10 more)

### Community 41 - "EditUserForm.tsx"
Cohesion: 0.07
Nodes (31): metadata, ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, toggleAllDay(), EventFormData, toDateTimeValue() (+23 more)

### Community 42 - "clientIp.ts"
Cohesion: 0.50
Nodes (3): ref_node_net, addressKey(), HeaderBag

### Community 43 - "BulkImport.tsx"
Cohesion: 0.22
Nodes (9): ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row, toRow() (+1 more)

### Community 44 - "Callout"
Cohesion: 0.08
Nodes (34): next-auth, ForgotPasswordPage(), ContactForm(), createLoginChallenge(), FaqItem, LoginFaq(), SECTIONS, LoginForm() (+26 more)

### Community 45 - "movePostImage"
Cohesion: 0.33
Nodes (9): applyImageOrder(), deleteImage(), findImageForPost(), findImagesForPost(), movePostImage(), orderedIds(), removePostImage(), requireImage() (+1 more)

### Community 47 - "featureFlagService.ts"
Cohesion: 0.14
Nodes (19): @prisma/client, dynamic, KontaktPage(), metadata, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, createPrismaClient() (+11 more)

### Community 48 - "react"
Cohesion: 0.09
Nodes (30): react, DeletePostButton(), ContactRequestItem, ContactRequestList(), confirmDelete(), run(), dateFormat, TerminationItem (+22 more)

### Community 50 - "mitglied-werden/actions.ts"
Cohesion: 0.17
Nodes (20): ContactRequestsPage(), submitContactRequest(), submitMembershipApplication(), contactRequestMessage(), membershipApplicationNoticeMessage(), membershipReceivedMessage(), ContactInput, hashIp() (+12 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.14
Nodes (20): SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), DayBucket (+12 more)

### Community 53 - "blogImageProcessing.ts"
Cohesion: 0.29
Nodes (4): sharp, ImageBytes, ProcessedBlogImage, QUALITY_LADDER

### Community 54 - "passwordStrength.ts"
Cohesion: 0.19
Nodes (10): NewUserForm(), handleSubmit(), PasswordStrengthMeter(), evaluatePassword(), generatePassword(), PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 55 - "MailForm.tsx"
Cohesion: 0.13
Nodes (16): @tiptap/react, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, EmailBodyField(), useEmailEditor() (+8 more)

### Community 57 - "EditUserForm"
Cohesion: 0.31
Nodes (7): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), toDateInput()

### Community 58 - "users/[id]/page.tsx"
Cohesion: 0.11
Nodes (27): dynamic, MembershipApplicationsPage(), metadata, deleteUserAction(), EditUserPage(), metadata, updateUser(), berlinDateParts() (+19 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "ServerDashboard.tsx"
Cohesion: 0.14
Nodes (15): triggerDeploy(), DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel(), PAD (+7 more)

### Community 63 - "Site.tsx"
Cohesion: 0.11
Nodes (15): facts, metadata, metadata, dynamic, metadata, SearchParams, ViewSwitch(), LorenzAttractor (+7 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 67 - "getOptionalUser"
Cohesion: 0.31
Nodes (7): GET(), GET(), GET(), getOptionalUser(), withViewOverride(), findImageBytes(), findPhotoBytes()

### Community 71 - "login/page.tsx"
Cohesion: 0.31
Nodes (6): dynamic, LoginPage(), metadata, NOTICES, Props, internalPath()

### Community 72 - "ref_node_assert"
Cohesion: 0.15
Nodes (10): ref_node_assert, ref_node_test, moveInOrder(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, legitimate, SUMMER (+2 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.11
Nodes (34): EditBlogPage(), EditEventPage(), startOfBerlinDay(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents() (+26 more)

### Community 77 - "accountActions.ts"
Cohesion: 0.16
Nodes (24): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination(), signOut (+16 more)

### Community 78 - "app/termine/[id]/page.tsx"
Cohesion: 0.14
Nodes (22): react-markdown, remark-gfm, generateMetadata(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard() (+14 more)

### Community 79 - "rateLimitService.ts"
Cohesion: 0.17
Nodes (12): removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), bucketFromKey(), deleteRateLimitEntry() (+4 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "paymentHistoryPdf.tsx"
Cohesion: 0.33
Nodes (7): @react-pdf/renderer, GET(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee

### Community 82 - "formatNumber"
Cohesion: 0.21
Nodes (11): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+3 more)

### Community 85 - "blogRepository.ts"
Cohesion: 0.14
Nodes (13): createDraft(), BlogImageVariant, BlogImageRow, BlogPostWriteData, createPost(), eventLinkSelect, findPublishedPostById(), findPublishedPosts() (+5 more)

### Community 86 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 93 - "AppError"
Cohesion: 0.11
Nodes (49): deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant() (+41 more)

### Community 94 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **440 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+435 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 562 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `app/layout.tsx`, `ApplicationWizard.tsx`, `authz.ts`, `mitgliedsantraege/actions.ts`, `boardService.ts`, `formatDate`, `serverStatus.ts`, `konto/page.tsx`, `blogService.ts`, `security/page.tsx`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `userService.ts`, `package.json`, `mailService.ts`, `errors.ts`, `lib/siteUrl.ts`, `MemberDirectory.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `requireDebugAdmin`, `dashboard/page.tsx`, `HeaderChrome.tsx`, `normalizeIban`, `zahlungen/page.tsx`, `index.ts`, `blog/actions.ts`, `EditUserForm.tsx`, `Callout`, `featureFlagService.ts`, `react`, `mitglied-werden/actions.ts`, `forgot-password/layout.tsx`, `users/[id]/page.tsx`, `verify-email/layout.tsx`, `Site.tsx`, `Footer.tsx`, `getOptionalUser`, `login/page.tsx`, `accountActions.ts`, `app/termine/[id]/page.tsx`, `rateLimitService.ts`, `paymentHistoryPdf.tsx`, `AppError`, `login/layout.tsx`, `reset-password/layout.tsx`?**
  _High betweenness centrality (0.217) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `next`, `app/layout.tsx`, `ApplicationWizard.tsx`, `boardService.ts`, `formatDate`, `konto/page.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `package.json`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `requireDebugAdmin`, `dashboard/page.tsx`, `HeaderChrome.tsx`, `normalizeIban`, `PhysicsTimeline.tsx`, `index.ts`, `EditUserForm.tsx`, `BulkImport.tsx`, `Callout`, `MailForm.tsx`, `users/[id]/page.tsx`, `ServerDashboard.tsx`, `Site.tsx`, `Footer.tsx`, `eventService.ts`, `altcha.d.ts`, `DebugConsole.tsx`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `next` to `ApplicationWizard.tsx`, `authz.ts`, `formatDate`, `konto/page.tsx`, `security/page.tsx`, `events.ts`, `package.json`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `dashboard/page.tsx`, `HeaderChrome.tsx`, `zahlungen/page.tsx`, `index.ts`, `EditUserForm.tsx`, `Callout`, `react`, `MailForm.tsx`, `users/[id]/page.tsx`, `ServerDashboard.tsx`, `Site.tsx`, `Footer.tsx`, `app/termine/[id]/page.tsx`, `formatNumber`, `DebugConsole.tsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _440 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.09935710111046171 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07084785133565621 - nodes in this community are weakly interconnected._