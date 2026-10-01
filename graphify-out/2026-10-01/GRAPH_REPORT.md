# Graph Report - wiphy  (2026-10-01)

## Corpus Check
- 337 files · ~154,828 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1912 nodes · 6288 edges · 91 communities (81 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f624dfbd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- events.ts
- ApplicationWizard.tsx
- Callout
- userService.ts
- boardService.ts
- app/blog/[id]/page.tsx
- serverStatus.ts
- users/[id]/page.tsx
- blogService.ts
- security/page.tsx
- app/page.tsx
- ics.ts
- MarketDiffusion.tsx
- MailForm.tsx
- sendEmail
- package.json
- dependencies
- sitemap.ts
- mitglied-werden/actions.ts
- schemas.ts
- seed.ts
- DeleteMemberSection
- lib/siteUrl.ts
- MemberDirectory.tsx
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- gravityPhysics.ts
- requireDebugAdmin
- membershipCertificate.ts
- dashboard/page.tsx
- normalizeIban
- feeService.ts
- EmailComposerDialog.tsx
- mailService.ts
- zahlungen/page.tsx
- authz.ts
- compilerOptions
- devDependencies
- index.ts
- useActionForm
- Button
- EditUserForm.tsx
- BulkImport.tsx
- feeDefaultService.ts
- BlogImageManager.tsx
- blogImageProcessing.ts
- ref_node_assert
- app/layout.tsx
- EventForm.tsx
- ButtonLink
- formatNumber
- securityEventService.ts
- ApplicationList
- NewUserForm.tsx
- format.ts
- getOptionalUser
- EditUserForm
- membershipTermination.ts
- auth.ts
- TypeSparklines.tsx
- userUpdateData.ts
- ServerDashboard.tsx
- cn
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- AccountPanel
- MarkdownEditor.tsx
- mail/page.tsx
- paymentHistoryPdf.tsx
- CLAUDE.md
- app/kontakt/page.tsx
- isDebugMode
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- accountActions.ts
- generate-icons.ts
- RateLimitTable
- react
- contactSpam.ts
- RegistrationFunnel.tsx
- postcss.config.mjs
- { GET, POST }
- MarkdownViewer.tsx
- AppError
- login/layout.tsx
- reset-password/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 119 edges
2. `AppError` - 88 edges
3. `lucide-react` - 83 edges
4. `cn()` - 82 edges
5. `react` - 70 edges
6. `executeAction()` - 62 edges
7. `requireAdmin()` - 56 edges
8. `Card()` - 49 edges
9. `Button()` - 47 edges
10. `isFeatureEnabled()` - 42 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `BlogImageManager()` --indirect_call--> `deleteBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `moveBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `saveBlogImageAlt()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts

## Import Cycles
- None detected.

## Communities (91 total, 10 thin omitted)

### Community 0 - "next"
Cohesion: 0.07
Nodes (33): nextConfig, lucide-react, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+25 more)

### Community 1 - "events.ts"
Cohesion: 0.15
Nodes (17): TIME_ZONE, CALENDAR_ICS_PATH, DAY_MONTH, DAY_MONTH_YEAR, daysUntilEvent(), DEFAULT_DURATION_MINUTES, eventEnd(), formatEventClock() (+9 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.06
Nodes (39): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), ApplicationStage(), toDateInput() (+31 more)

### Community 3 - "Callout"
Cohesion: 0.19
Nodes (13): next-auth, ForgotPasswordPage(), createLoginChallenge(), FaqItem, LoginFaq(), SECTIONS, LoginForm(), VerifyEmailContent() (+5 more)

### Community 4 - "userService.ts"
Cohesion: 0.10
Nodes (38): bcryptjs, @prisma/client, MembershipApplicationsPage(), planApplicationFees(), MEMBERSHIP_ADMIN_PATH, globalForPrisma, prisma, countOpenApplications() (+30 more)

### Community 5 - "boardService.ts"
Cohesion: 0.05
Nodes (56): POST(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), PhotoMeta, EditBoardMemberPage(), AdminBoardPage() (+48 more)

### Community 6 - "app/blog/[id]/page.tsx"
Cohesion: 0.24
Nodes (15): generateMetadata(), Props, PublicBlogPost(), BlogPostingJsonLd(), EventJsonLd(), OrganizationJsonLd(), formatEventShort(), getPublishedPost (+7 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.13
Nodes (21): ref_node_fs, ref_node_os, DebugConsole(), AppLogs, cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK (+13 more)

### Community 8 - "users/[id]/page.tsx"
Cohesion: 0.17
Nodes (19): ContactRequestsPage(), KontoPage(), deleteUserAction(), EditUserPage(), metadata, updateUser(), updateBankDetails(), FEATURE_FLAG_DESCRIPTIONS (+11 more)

### Community 9 - "blogService.ts"
Cohesion: 0.10
Nodes (36): POST(), EditBlogPage(), BlogImageVariant, BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost(), deleteImage() (+28 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.17
Nodes (17): dynamic, metadata, SecurityPage(), ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel() (+9 more)

### Community 11 - "app/page.tsx"
Cohesion: 0.09
Nodes (37): generateMetadata(), Props, AdminBlogPage(), DashboardEvent, UpcomingEventAlert(), metadata, heroMetrics, HomePage() (+29 more)

### Community 12 - "ics.ts"
Cohesion: 0.16
Nodes (19): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildEventIcs(), calendar(), describe() (+11 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (35): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), GameOfLife(), NEIGHBORS (+27 more)

### Community 14 - "MailForm.tsx"
Cohesion: 0.13
Nodes (14): byStatusThenName(), MailForm(), MailFormProps, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, getStatusIcon(), ProfileSummary() (+6 more)

### Community 15 - "sendEmail"
Cohesion: 0.11
Nodes (36): POST(), POST(), notifyAdminsAboutRegistration(), POST(), EMAIL_CHANGE_ERRORS, requestPasswordChange(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage() (+28 more)

### Community 16 - "package.json"
Cohesion: 0.10
Nodes (20): eslintConfig, name, private, version, altcha, altcha-lib, babel-plugin-react-compiler, eslint (+12 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "sitemap.ts"
Cohesion: 0.43
Nodes (6): sitemap(), GET(), TerminePage(), buildCalendarIcs(), getPastEvents(), getUpcomingEvents()

### Community 19 - "mitglied-werden/actions.ts"
Cohesion: 0.13
Nodes (32): ref_crypto, parseMailForm(), sendEmailAction(), submitContactRequest(), resendVerificationEmail(), submitMembershipApplication(), registerUser(), contactRequestMessage() (+24 more)

### Community 20 - "schemas.ts"
Cohesion: 0.07
Nodes (40): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), applyImageOrder() (+32 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 23 - "lib/siteUrl.ts"
Cohesion: 0.13
Nodes (12): escapeXml(), GET(), metadata, alt, contentType, size, findPublishedPosts(), getPublishedPosts() (+4 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.09
Nodes (31): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), explainFee() (+23 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.19
Nodes (15): JourneyRail(), dynamic, metadata, MitgliedWerdenPage(), Props, WithdrawApplicationButton(), withdraw(), JOURNEY_STEPS (+7 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "requireDebugAdmin"
Cohesion: 0.27
Nodes (8): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), ServerPage(), isFeatureFlagKey(), requireDebugAdmin(), setFeatureFlagEnabled()

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.16
Nodes (23): GET(), DashboardPage(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative() (+15 more)

### Community 30 - "dashboard/page.tsx"
Cohesion: 0.15
Nodes (10): CtaCard(), ContactRequestList(), confirmDelete(), run(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog() (+2 more)

### Community 31 - "normalizeIban"
Cohesion: 0.15
Nodes (30): field(), POST(), SepaDialog(), ibanError(), IbanInput(), check(), handleChange(), formatIban() (+22 more)

### Community 32 - "feeService.ts"
Cohesion: 0.11
Nodes (32): UserManagementPage(), calculateFeeAmount(), FeeBreakdown, resolveFeeDefault(), archiveFeesOfUser(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears() (+24 more)

### Community 33 - "EmailComposerDialog.tsx"
Cohesion: 0.15
Nodes (13): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailBodyField(), useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose() (+5 more)

### Community 34 - "mailService.ts"
Cohesion: 0.07
Nodes (46): sanitize-html, blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailMessage, EmailSignature, nl2br() (+38 more)

### Community 35 - "zahlungen/page.tsx"
Cohesion: 0.14
Nodes (28): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), BankValues, dynamic, metadata (+20 more)

### Community 36 - "authz.ts"
Cohesion: 0.16
Nodes (19): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, commit, DebugBar() (+11 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "index.ts"
Cohesion: 0.11
Nodes (30): InfoTooltip(), RateLimitTableProps, dynamic, metadata, chipTones, GROUPS, SortKey, StatusChip() (+22 more)

### Community 40 - "useActionForm"
Cohesion: 0.19
Nodes (10): EmailChangeForm(), PasswordChangeButton(), ContactForm(), ActionForm, ActionFormOptions, useActionForm(), getRedirectTarget(), isRedirectError() (+2 more)

### Community 41 - "Button"
Cohesion: 0.09
Nodes (25): DeletePostButton(), ContactRequestItem, dateFormat, TerminationItem, DeleteEventButton(), DeleteMemberButton(), FeatureDisabledDialog(), FeatureDisabledDialogProps (+17 more)

### Community 42 - "EditUserForm.tsx"
Cohesion: 0.20
Nodes (6): ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData

### Community 43 - "BulkImport.tsx"
Cohesion: 0.22
Nodes (9): ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row, toRow() (+1 more)

### Community 44 - "feeDefaultService.ts"
Cohesion: 0.42
Nodes (7): deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeDefaults(), getFeeRatesForYear(), removeFeeDefault(), setFeeDefault()

### Community 45 - "BlogImageManager.tsx"
Cohesion: 0.16
Nodes (17): BlogIndexPage(), PostCard(), BlogImageManager(), handleDrop(), uploadFiles(), BlogGallery(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE (+9 more)

### Community 46 - "blogImageProcessing.ts"
Cohesion: 0.28
Nodes (5): sharp, ImageBytes, processBlogImage(), ProcessedBlogImage, QUALITY_LADDER

### Community 47 - "ref_node_assert"
Cohesion: 0.19
Nodes (8): ref_node_assert, ref_node_net, ref_node_test, addressKey(), HeaderBag, ADMIN_SESSION_MAX_MS, adminSessionExpired(), base

### Community 48 - "app/layout.tsx"
Cohesion: 0.13
Nodes (12): src_app_globals, body, metadata, mono, columns, Footer(), legalLinks, GameOfLife (+4 more)

### Community 49 - "EventForm.tsx"
Cohesion: 0.24
Nodes (17): EventForm(), toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate() (+9 more)

### Community 50 - "ButtonLink"
Cohesion: 0.36
Nodes (3): metadata, LorenzAttractor, ButtonLink()

### Community 51 - "formatNumber"
Cohesion: 0.29
Nodes (9): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, StatTile(), formatNumber() (+1 more)

### Community 52 - "securityEventService.ts"
Cohesion: 0.15
Nodes (18): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap() (+10 more)

### Community 53 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 54 - "NewUserForm.tsx"
Cohesion: 0.17
Nodes (15): NewUserForm(), handleSubmit(), FILL_PERCENT, PasswordInput(), PasswordStrengthMeter(), describeControl(), Field(), evaluatePassword() (+7 more)

### Community 55 - "format.ts"
Cohesion: 0.12
Nodes (12): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, TextArea(), DATE_TIME, EURO, LONG_DATE (+4 more)

### Community 56 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "membershipTermination.ts"
Cohesion: 0.29
Nodes (7): berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate(), pruneArchivedFees()

### Community 59 - "auth.ts"
Cohesion: 0.22
Nodes (8): AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError, signIn

### Community 60 - "TypeSparklines.tsx"
Cohesion: 0.36
Nodes (7): sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 61 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "ServerDashboard.tsx"
Cohesion: 0.14
Nodes (15): triggerDeploy(), DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel(), PAD (+7 more)

### Community 63 - "cn"
Cohesion: 0.06
Nodes (28): SectionHeader(), Delta(), StatTileProps, Tone, TONE_DOT, categories, categoryIcon(), categoryLabel() (+20 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "AccountPanel"
Cohesion: 0.38
Nodes (5): AccountPanel(), handleSubmit(), ResetPasswordForm(), handleSubmit(), validateNewPassword()

### Community 67 - "MarkdownEditor.tsx"
Cohesion: 0.40
Nodes (4): @uiw/react-markdown-preview, @uiw/react-md-editor, MarkdownEditor(), MDEditor

### Community 68 - "mail/page.tsx"
Cohesion: 0.19
Nodes (11): MailAnnouncement, MailDashboard(), MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage() (+3 more)

### Community 69 - "paymentHistoryPdf.tsx"
Cohesion: 0.33
Nodes (7): @react-pdf/renderer, GET(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee

### Community 71 - "app/kontakt/page.tsx"
Cohesion: 0.18
Nodes (11): dynamic, KontaktPage(), metadata, dynamic, LoginPage(), metadata, NOTICES, Props (+3 more)

### Community 72 - "isDebugMode"
Cohesion: 0.67
Nodes (4): GET(), GET(), isDebugMode(), getAppLogs()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.13
Nodes (29): AdminEventsPage(), createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventOptions(), findLatestPastEvent(), findNextUpcomingEvent() (+21 more)

### Community 77 - "accountActions.ts"
Cohesion: 0.10
Nodes (35): MetaLine(), statusMeta(), TerminationList(), confirm(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema (+27 more)

### Community 78 - "generate-icons.ts"
Cohesion: 0.67
Nodes (3): BACKGROUND, icon(), main()

### Community 79 - "RateLimitTable"
Cohesion: 0.33
Nodes (5): getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo()

### Community 80 - "react"
Cohesion: 0.13
Nodes (14): react, DeleteMemberSectionProps, FIRST_HALF_FIELDS, FirstHalfField, VerifyPanel(), ALTCHA_STRINGS_DE, ALTCHA_STYLE, AltchaField() (+6 more)

### Community 81 - "contactSpam.ts"
Cohesion: 0.24
Nodes (7): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ContactInput, scoreSpam(), SPAM_KEYWORDS, legitimate

### Community 82 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 92 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 93 - "AppError"
Cohesion: 0.10
Nodes (54): zod, createDraft(), deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), requestEmailChangeAction(), acceptMembershipApplication() (+46 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **437 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+432 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 560 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `ApplicationWizard.tsx`, `Callout`, `userService.ts`, `boardService.ts`, `app/blog/[id]/page.tsx`, `users/[id]/page.tsx`, `blogService.ts`, `security/page.tsx`, `app/page.tsx`, `ics.ts`, `MarketDiffusion.tsx`, `sendEmail`, `package.json`, `sitemap.ts`, `mitglied-werden/actions.ts`, `schemas.ts`, `lib/siteUrl.ts`, `MemberDirectory.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `requireDebugAdmin`, `membershipCertificate.ts`, `dashboard/page.tsx`, `normalizeIban`, `zahlungen/page.tsx`, `authz.ts`, `index.ts`, `useActionForm`, `Button`, `EditUserForm.tsx`, `BlogImageManager.tsx`, `app/layout.tsx`, `ButtonLink`, `getOptionalUser`, `cn`, `MarkdownEditor.tsx`, `mail/page.tsx`, `paymentHistoryPdf.tsx`, `app/kontakt/page.tsx`, `isDebugMode`, `accountActions.ts`, `react`, `AppError`, `login/layout.tsx`, `reset-password/layout.tsx`?**
  _High betweenness centrality (0.189) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `next`, `ApplicationWizard.tsx`, `Callout`, `boardService.ts`, `serverStatus.ts`, `users/[id]/page.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `MailForm.tsx`, `package.json`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `requireDebugAdmin`, `dashboard/page.tsx`, `normalizeIban`, `EmailComposerDialog.tsx`, `zahlungen/page.tsx`, `index.ts`, `useActionForm`, `Button`, `EditUserForm.tsx`, `BulkImport.tsx`, `BlogImageManager.tsx`, `app/layout.tsx`, `EventForm.tsx`, `ButtonLink`, `NewUserForm.tsx`, `format.ts`, `ServerDashboard.tsx`, `cn`, `MarkdownEditor.tsx`, `eventService.ts`, `accountActions.ts`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `next` to `ApplicationWizard.tsx`, `Callout`, `boardService.ts`, `app/blog/[id]/page.tsx`, `serverStatus.ts`, `users/[id]/page.tsx`, `security/page.tsx`, `app/page.tsx`, `MarketDiffusion.tsx`, `MailForm.tsx`, `package.json`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `dashboard/page.tsx`, `EmailComposerDialog.tsx`, `zahlungen/page.tsx`, `authz.ts`, `index.ts`, `useActionForm`, `Button`, `EditUserForm.tsx`, `BlogImageManager.tsx`, `app/layout.tsx`, `EventForm.tsx`, `NewUserForm.tsx`, `format.ts`, `ServerDashboard.tsx`, `cn`, `accountActions.ts`, `react`, `RegistrationFunnel.tsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _437 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.06502816180235535 - nodes in this community are weakly interconnected._
- **Should `events.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14619883040935672 - nodes in this community are weakly interconnected._