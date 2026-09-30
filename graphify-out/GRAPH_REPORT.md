# Graph Report - wiphy  (2026-09-30)

## Corpus Check
- 323 files · ~142,075 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1820 nodes · 5969 edges · 88 communities (76 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `254e17ce`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Callout
- EditUserForm.tsx
- ApplicationWizard.tsx
- next
- DebugBar.tsx
- requireAdmin
- AppError
- serverStatus.ts
- MailForm.tsx
- blogService.ts
- security/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- BulkImport.tsx
- MemberDirectory.tsx
- package.json
- dependencies
- ref_node_assert
- generate-icons.ts
- schemas.ts
- EmailBodyField.tsx
- DeleteMemberSection
- app/layout.tsx
- normalizeIban
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- reset-password/layout.tsx
- MarkdownEditor.tsx
- membershipCertificate.ts
- format.ts
- feeService.ts
- requireDebugAdmin
- zahlungen/page.tsx
- PhysicsTimeline.tsx
- compilerOptions
- devDependencies
- passwordStrength.ts
- eventPath
- react
- security/actions.ts
- prisma.ts
- satzung/page.tsx
- app/page.tsx
- securityEventService.ts
- userUpdateData.ts
- feeDefaultService.ts
- mitgliedsantraege/actions.ts
- app/blog/[id]/page.tsx
- ActivityHeatmap.tsx
- auth.ts
- authz.ts
- featureFlagService.ts
- userService.ts
- index.ts
- EditUserForm
- app/kontakt/page.tsx
- seed.ts
- sepa/route.ts
- forgot-password/layout.tsx
- RegistrationFunnel.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- messages.ts
- mailHistory.ts
- CLAUDE.md
- blog/actions.ts
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- ServerDashboard.tsx
- eventService.ts
- errors.ts
- dashboard/page.tsx
- altcha.d.ts
- postcss.config.mjs
- blogImageProcessing.ts
- { GET, POST }
- ApplicationList
- EventForm.tsx
- MarkdownViewer.tsx
- mitglied-werden/actions.ts
- rateLimitService.ts
- clientIp.ts
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
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `ContactRequestList()` --indirect_call--> `markContactRequestHandled()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts
- `confirmDelete()` --indirect_call--> `removeContactRequest()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts

## Import Cycles
- None detected.

## Communities (88 total, 12 thin omitted)

### Community 0 - "Callout"
Cohesion: 0.09
Nodes (31): ForgotPasswordPage(), ContactForm(), createLoginChallenge(), FaqItem, LoginFaq(), SECTIONS, LoginForm(), AccountPanel() (+23 more)

### Community 1 - "EditUserForm.tsx"
Cohesion: 0.08
Nodes (23): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, ActionResult, Mode, OwnTermination, ADMIN_ONLY_KEYS (+15 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (36): BankValues, InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), PaymentOption() (+28 more)

### Community 3 - "next"
Cohesion: 0.11
Nodes (24): nextConfig, lucide-react, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+16 more)

### Community 4 - "DebugBar.tsx"
Cohesion: 0.20
Nodes (14): ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, commit, DebugBar(), LINKS (+6 more)

### Community 5 - "requireAdmin"
Cohesion: 0.06
Nodes (73): POST(), createDraft(), deletePost(), savePost(), ContactRequestsPage(), createEventDraft(), deleteFeeDefaultYear(), initializeBillingYear() (+65 more)

### Community 6 - "AppError"
Cohesion: 0.09
Nodes (39): sanitize-html, markContactRequestHandled(), removeContactRequest(), parseMailForm(), sendEmailAction(), removeMembershipApplication(), deleteEventAction(), revalidateEvent() (+31 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.13
Nodes (20): ref_node_child_process, ref_node_os, GET(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG (+12 more)

### Community 8 - "MailForm.tsx"
Cohesion: 0.06
Nodes (48): MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, byStatusThenName(), MailForm(), MailFormProps, MailUserOption (+40 more)

### Community 9 - "blogService.ts"
Cohesion: 0.10
Nodes (35): POST(), AdminBlogPage(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost(), deleteImage(), deletePostById() (+27 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.18
Nodes (14): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+6 more)

### Community 11 - "events.ts"
Cohesion: 0.12
Nodes (23): EditBlogPage(), UpcomingEventAlert(), TIME_ZONE, CALENDAR_ICS_PATH, DAY_MONTH, DAY_MONTH_YEAR, daysUntilEvent(), DEFAULT_DURATION_MINUTES (+15 more)

### Community 12 - "ics.ts"
Cohesion: 0.14
Nodes (23): RFC-5545, GET(), GET(), TerminePage(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs() (+15 more)

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
Cohesion: 0.09
Nodes (21): eslintConfig, name, private, version, altcha, altcha-lib, babel-plugin-react-compiler, eslint (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "ref_node_assert"
Cohesion: 0.16
Nodes (9): ref_node_assert, ref_node_test, MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ADMIN_SESSION_MAX_MS, adminSessionExpired(), legitimate (+1 more)

### Community 19 - "generate-icons.ts"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (28): AdminCreateUserInput, BankUpdateParsed, blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema, boardDeleteSchema (+20 more)

### Community 21 - "EmailBodyField.tsx"
Cohesion: 0.24
Nodes (7): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailBodyField(), EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 23 - "app/layout.tsx"
Cohesion: 0.09
Nodes (21): escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono, alt (+13 more)

### Community 24 - "normalizeIban"
Cohesion: 0.30
Nodes (15): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+7 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.17
Nodes (17): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+9 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.19
Nodes (17): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), VerifyPanel() (+9 more)

### Community 28 - "MarkdownEditor.tsx"
Cohesion: 0.40
Nodes (4): @uiw/react-markdown-preview, @uiw/react-md-editor, MarkdownEditor(), MDEditor

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.17
Nodes (22): GET(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDuration() (+14 more)

### Community 31 - "format.ts"
Cohesion: 0.11
Nodes (18): MembershipCertificateCard(), statusMeta(), TerminationList(), confirm(), SectionHeader(), AccountSection(), terminationNoticeMessage(), DATE_TIME (+10 more)

### Community 32 - "feeService.ts"
Cohesion: 0.11
Nodes (31): @react-pdf/renderer, GET(), UserManagementPage(), FeeBreakdown, feeRetentionCutoffYear(), PaymentHistoryPdf(), PdfUser, statusLabel() (+23 more)

### Community 34 - "requireDebugAdmin"
Cohesion: 0.21
Nodes (10): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), triggerDeploy(), ServerPage(), DeploySection(), isFeatureFlagKey() (+2 more)

### Community 35 - "zahlungen/page.tsx"
Cohesion: 0.15
Nodes (25): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), dynamic, metadata, ZahlungenPage() (+17 more)

### Community 36 - "PhysicsTimeline.tsx"
Cohesion: 0.17
Nodes (10): metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory, TimelineDetail() (+2 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "passwordStrength.ts"
Cohesion: 0.19
Nodes (11): NewUserForm(), handleSubmit(), PasswordStrengthMeter(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore (+3 more)

### Community 40 - "eventPath"
Cohesion: 0.24
Nodes (15): generateMetadata(), HomePage(), sitemap(), EventDetailPage(), generateMetadata(), eventPath(), findPublishedPosts(), getPublishedPosts() (+7 more)

### Community 41 - "react"
Cohesion: 0.09
Nodes (30): react, DeletePostButton(), ContactRequestItem, ContactRequestList(), confirmDelete(), run(), dateFormat, TerminationItem (+22 more)

### Community 42 - "security/actions.ts"
Cohesion: 0.27
Nodes (7): removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), deleteRateLimitEntry()

### Community 43 - "prisma.ts"
Cohesion: 0.24
Nodes (12): createPrismaClient(), globalForPrisma, consumeAltchaSolution(), readExpiry(), readSignature(), verifyAltchaPayload(), getMailTransporter(), getAltchaHmacKey() (+4 more)

### Community 44 - "satzung/page.tsx"
Cohesion: 0.12
Nodes (18): DATENSCHUTZ, metadata, IMPRESSUM, metadata, dynamic, metadata, SATZUNG, Block() (+10 more)

### Community 45 - "app/page.tsx"
Cohesion: 0.10
Nodes (25): metadata, heroMetrics, pillars, dynamic, Props, dynamic, metadata, NextEventCard() (+17 more)

### Community 46 - "securityEventService.ts"
Cohesion: 0.16
Nodes (18): SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap() (+10 more)

### Community 47 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 48 - "feeDefaultService.ts"
Cohesion: 0.30
Nodes (10): SatzungPage(), resolveFeeDefault(), deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeDefaults(), getFeeRatesForYear(), removeFeeDefault() (+2 more)

### Community 49 - "mitgliedsantraege/actions.ts"
Cohesion: 0.11
Nodes (31): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), dynamic, MembershipApplicationsPage(), metadata, planApplicationFees() (+23 more)

### Community 50 - "app/blog/[id]/page.tsx"
Cohesion: 0.14
Nodes (19): Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props, BlogGallery() (+11 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "auth.ts"
Cohesion: 0.14
Nodes (15): AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError, signIn (+7 more)

### Community 53 - "authz.ts"
Cohesion: 0.22
Nodes (12): GET(), GET(), GET(), AS_MEMBER_COOKIE, DEBUG_COOKIE, getOptionalUser(), normalizeRole(), sessionUser() (+4 more)

### Community 54 - "featureFlagService.ts"
Cohesion: 0.50
Nodes (5): @prisma/client, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, FeatureFlagWithMeta

### Community 55 - "userService.ts"
Cohesion: 0.14
Nodes (40): bcryptjs, POST(), POST(), notifyAdminsAboutRegistration(), POST(), resendVerificationEmail(), registerUser(), adminRegistrationNoticeMessage() (+32 more)

### Community 56 - "index.ts"
Cohesion: 0.10
Nodes (34): CtaCard(), InfoTooltip(), RateLimitTableProps, chipTones, DirectoryAccount, GROUPS, SortKey, StatusChip() (+26 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "app/kontakt/page.tsx"
Cohesion: 0.18
Nodes (11): dynamic, KontaktPage(), metadata, dynamic, LoginPage(), metadata, NOTICES, Props (+3 more)

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

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

### Community 66 - "messages.ts"
Cohesion: 0.23
Nodes (14): EmailBlock, accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage(), feeReminderMessage(), greeting(), LINK_EXPIRY(), loginDisabledMessage() (+6 more)

### Community 68 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 71 - "blog/actions.ts"
Cohesion: 0.25
Nodes (18): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager() (+10 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "ServerDashboard.tsx"
Cohesion: 0.15
Nodes (17): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, formatBytes(), formatUptime(), Sample (+9 more)

### Community 76 - "eventService.ts"
Cohesion: 0.10
Nodes (33): dynamic, EditEventPage(), metadata, AdminEventsPage(), UPCOMING_ALERT_MONTHS, AnnouncedEvent, createEvent(), deleteEventById() (+25 more)

### Community 78 - "errors.ts"
Cohesion: 0.11
Nodes (35): zod, deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination() (+27 more)

### Community 79 - "dashboard/page.tsx"
Cohesion: 0.18
Nodes (12): EmailChangeDialog(), MailSuccessDialog(), ADMIN_ACTIONS, DashboardPage(), QueryParamDialog(), LogoutButton(), countOpenApplications(), findOpenApplication() (+4 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "blogImageProcessing.ts"
Cohesion: 0.24
Nodes (6): sharp, MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, processBlogImage(), ProcessedBlogImage, QUALITY_LADDER

### Community 89 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 91 - "EventForm.tsx"
Cohesion: 0.18
Nodes (21): EventForm(), toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate() (+13 more)

### Community 92 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 93 - "mitglied-werden/actions.ts"
Cohesion: 0.18
Nodes (17): ref_crypto, submitContactRequest(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), contactRequestMessage(), membershipApplicationNoticeMessage() (+9 more)

### Community 97 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 99 - "clientIp.ts"
Cohesion: 0.50
Nodes (3): ref_node_net, addressKey(), HeaderBag

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **421 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+416 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 538 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `Callout`, `EditUserForm.tsx`, `ApplicationWizard.tsx`, `DebugBar.tsx`, `requireAdmin`, `AppError`, `serverStatus.ts`, `MailForm.tsx`, `blogService.ts`, `security/page.tsx`, `ics.ts`, `MemberDirectory.tsx`, `package.json`, `app/layout.tsx`, `mitglied-werden/page.tsx`, `reset-password/layout.tsx`, `MarkdownEditor.tsx`, `membershipCertificate.ts`, `feeService.ts`, `requireDebugAdmin`, `zahlungen/page.tsx`, `PhysicsTimeline.tsx`, `eventPath`, `react`, `security/actions.ts`, `satzung/page.tsx`, `app/page.tsx`, `mitgliedsantraege/actions.ts`, `app/blog/[id]/page.tsx`, `authz.ts`, `featureFlagService.ts`, `userService.ts`, `index.ts`, `app/kontakt/page.tsx`, `sepa/route.ts`, `forgot-password/layout.tsx`, `blog/actions.ts`, `eventService.ts`, `errors.ts`, `dashboard/page.tsx`, `mitglied-werden/actions.ts`, `login/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `next` to `Callout`, `EditUserForm.tsx`, `ApplicationWizard.tsx`, `DebugBar.tsx`, `MailForm.tsx`, `security/page.tsx`, `MarketDiffusion.tsx`, `MemberDirectory.tsx`, `package.json`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `format.ts`, `zahlungen/page.tsx`, `PhysicsTimeline.tsx`, `react`, `satzung/page.tsx`, `app/page.tsx`, `mitgliedsantraege/actions.ts`, `app/blog/[id]/page.tsx`, `index.ts`, `RegistrationFunnel.tsx`, `ServerDashboard.tsx`, `eventService.ts`, `errors.ts`, `dashboard/page.tsx`, `EventForm.tsx`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `Callout`, `EditUserForm.tsx`, `ApplicationWizard.tsx`, `next`, `MailForm.tsx`, `MarketDiffusion.tsx`, `BulkImport.tsx`, `MemberDirectory.tsx`, `package.json`, `app/layout.tsx`, `normalizeIban`, `MarkdownEditor.tsx`, `requireDebugAdmin`, `PhysicsTimeline.tsx`, `satzung/page.tsx`, `app/page.tsx`, `app/blog/[id]/page.tsx`, `index.ts`, `ServerDashboard.tsx`, `errors.ts`, `dashboard/page.tsx`, `altcha.d.ts`, `EventForm.tsx`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _421 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Callout` be split into smaller, more focused modules?**
  _Cohesion score 0.08653061224489796 - nodes in this community are weakly interconnected._
- **Should `EditUserForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08253968253968254 - nodes in this community are weakly interconnected._