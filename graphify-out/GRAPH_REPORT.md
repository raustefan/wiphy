# Graph Report - wiphy  (2026-10-01)

## Corpus Check
- 333 files · ~151,745 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1900 nodes · 6242 edges · 95 communities (83 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5c1e5a01`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- mitgliedsantraege/actions.ts
- ApplicationWizard.tsx
- Callout
- userService.ts
- boardService.ts
- app/blog/[id]/page.tsx
- serverStatus.ts
- mailService.ts
- blogService.ts
- securityLabels.ts
- events.ts
- ics.ts
- MarketDiffusion.tsx
- DirectoryTable.tsx
- MailForm
- package.json
- dependencies
- membershipService.ts
- mitglied-werden/actions.ts
- schemas.ts
- sendEmail
- slug.ts
- lib/siteUrl.ts
- MemberDirectory.tsx
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- gravityPhysics.ts
- requireDebugAdmin
- membershipCertificate.ts
- redirectError.ts
- sepa/route.ts
- feeService.ts
- EmailBodyField.tsx
- blocks.ts
- annualFee
- cn
- compilerOptions
- devDependencies
- index.ts
- normalizeIban
- lucide-react
- authz.ts
- BulkImport.tsx
- mail/actions.ts
- blog/actions.ts
- blogImages.ts
- userUpdateData.ts
- images/route.ts
- dashboard/page.tsx
- app/page.tsx
- ActivityHeatmap.tsx
- securityEventService.ts
- ApplicationList
- DebugBar.tsx
- app/layout.tsx
- altcha.ts
- EditUserForm
- berlinTime.ts
- seed.ts
- security/page.tsx
- sitemap.ts
- formatNumber
- getOptionalUser
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- forgot-password/layout.tsx
- eslint.config.mjs
- mail/page.tsx
- DeleteMemberSection
- CLAUDE.md
- app/kontakt/page.tsx
- TypeSparklines.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- AppError
- movePostImage
- mailHistory.ts
- altcha.d.ts
- ref_node_fs
- EmailComposerDialog
- postcss.config.mjs
- feeDefaultService.ts
- ref_node_assert
- { GET, POST }
- app/termine/[id]/page.tsx
- executeAction
- prisma.ts
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 117 edges
2. `AppError` - 88 edges
3. `lucide-react` - 83 edges
4. `cn()` - 82 edges
5. `react` - 68 edges
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
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `ContactRequestList()` --indirect_call--> `markContactRequestHandled()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts
- `confirmDelete()` --indirect_call--> `removeContactRequest()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts

## Import Cycles
- None detected.

## Communities (95 total, 12 thin omitted)

### Community 0 - "next"
Cohesion: 0.08
Nodes (22): nextConfig, next, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic, metadata, EmailChangeForm() (+14 more)

### Community 1 - "mitgliedsantraege/actions.ts"
Cohesion: 0.08
Nodes (40): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), statusMeta(), TerminationList(), confirm(), AccountSection() (+32 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (35): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), PaymentOption(), FeeDefaultEntry (+27 more)

### Community 3 - "Callout"
Cohesion: 0.07
Nodes (37): next-auth, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), ForgotPasswordPage(), FaqItem, LoginFaq() (+29 more)

### Community 4 - "userService.ts"
Cohesion: 0.14
Nodes (25): KontoPage(), DashboardPage(), deleteUserAction(), EditUserPage(), metadata, updateUser(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS (+17 more)

### Community 5 - "boardService.ts"
Cohesion: 0.06
Nodes (47): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), AdminBoardPage(), DATENSCHUTZ, impressum() (+39 more)

### Community 6 - "app/blog/[id]/page.tsx"
Cohesion: 0.21
Nodes (15): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), MetaLine(), PostCard(), Props, AdminBlogPage() (+7 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.14
Nodes (22): ref_node_os, GET(), GET(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG (+14 more)

### Community 8 - "mailService.ts"
Cohesion: 0.14
Nodes (22): sanitize-html, EmailBlock, eventContactPath(), parseDirectMailForm(), sendDirectMailAction(), ENTITIES, htmlToText(), composeMessage() (+14 more)

### Community 9 - "blogService.ts"
Cohesion: 0.13
Nodes (27): BlogImageRow, BlogPostWriteData, countImagesForPost(), deletePostById(), eventLinkSelect, findAllPosts(), findPostById(), findPublishedPostById() (+19 more)

### Community 10 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 11 - "events.ts"
Cohesion: 0.12
Nodes (29): DashboardEvent, UpcomingEventAlert(), NextEventCard(), EventCard(), EventCardData, EventDateCube(), EventFacts(), TIME_ZONE (+21 more)

### Community 12 - "ics.ts"
Cohesion: 0.16
Nodes (19): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildEventIcs(), calendar(), describe() (+11 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.11
Nodes (28): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+20 more)

### Community 14 - "DirectoryTable.tsx"
Cohesion: 0.08
Nodes (29): metadata, MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, TerminationItem (+21 more)

### Community 15 - "MailForm"
Cohesion: 0.18
Nodes (8): byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, formatStatus(), formatStatusShort(), getStatusTone()

### Community 16 - "package.json"
Cohesion: 0.10
Nodes (20): name, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer, react-dom (+12 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "membershipService.ts"
Cohesion: 0.18
Nodes (17): dynamic, MembershipApplicationsPage(), metadata, planApplicationFees(), isTerminationDue(), countOpenApplications(), deleteApplication(), findApplications() (+9 more)

### Community 19 - "mitglied-werden/actions.ts"
Cohesion: 0.15
Nodes (20): ContactRequestsPage(), submitContactRequest(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS (+12 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (27): AdminCreateUserInput, BankUpdateParsed, berlinDateTime(), blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema (+19 more)

### Community 21 - "sendEmail"
Cohesion: 0.22
Nodes (18): EMAIL_CHANGE_ERRORS, requestPasswordChange(), resendVerificationEmail(), registerUser(), passwordResetMessage(), registrationConfirmationMessage(), renderEmailText(), getMailTransporter() (+10 more)

### Community 22 - "slug.ts"
Cohesion: 0.52
Nodes (5): GERMAN_LETTERS, idFromSegment(), safeDecode(), slugify(), slugSegment()

### Community 23 - "lib/siteUrl.ts"
Cohesion: 0.13
Nodes (14): escapeXml(), GET(), metadata, alt, contentType, size, BlogPostingJsonLd(), EventJsonLd() (+6 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.08
Nodes (31): CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), UserPaymentHistoryDialog(), MemberDirectory() (+23 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.14
Nodes (20): AccountPanel(), handleSubmit(), JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props (+12 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "requireDebugAdmin"
Cohesion: 0.16
Nodes (13): FeatureFlagsPage(), removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), triggerDeploy() (+5 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.15
Nodes (23): @react-pdf/renderer, GET(), MembershipCertificateCard(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus (+15 more)

### Community 30 - "redirectError.ts"
Cohesion: 0.67
Nodes (3): getRedirectTarget(), isRedirectError(), RedirectTarget

### Community 31 - "sepa/route.ts"
Cohesion: 0.25
Nodes (15): field(), POST(), SepaDialog(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+7 more)

### Community 32 - "feeService.ts"
Cohesion: 0.12
Nodes (31): billableMonths(), calculateFee(), calculateFeeAmount(), FeeBreakdown, FeeInput, NON_DIRECT_DEBIT_SURCHARGE, wasMemberInYear(), resolveFeeDefault() (+23 more)

### Community 33 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 34 - "blocks.ts"
Cohesion: 0.23
Nodes (18): blockHtml(), blockText(), derivePreheader(), EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml(), renderBlocksText() (+10 more)

### Community 35 - "annualFee"
Cohesion: 0.22
Nodes (15): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), ApplicationWizard(), currentFormValues() (+7 more)

### Community 36 - "cn"
Cohesion: 0.07
Nodes (37): ContactRequestList(), confirmDelete(), run(), metadata, metadata, dynamic, metadata, dynamic (+29 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "index.ts"
Cohesion: 0.12
Nodes (24): metadata, InfoTooltip(), RateLimitTableProps, dynamic, metadata, FeeDefaultRow, metadata, FeatureDisabledQueryDialog() (+16 more)

### Community 40 - "normalizeIban"
Cohesion: 0.20
Nodes (20): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+12 more)

### Community 41 - "lucide-react"
Cohesion: 0.15
Nodes (17): lucide-react, react, DeletePostButton(), ContactRequestItem, dateFormat, DeploySection(), Sample, DeleteEventButton() (+9 more)

### Community 42 - "authz.ts"
Cohesion: 0.22
Nodes (15): COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, DebugBar(), Header(), AS_MEMBER_COOKIE, DEBUG_COOKIE (+7 more)

### Community 43 - "BulkImport.tsx"
Cohesion: 0.12
Nodes (18): bulkCreateUsersAction(), ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row (+10 more)

### Community 44 - "mail/actions.ts"
Cohesion: 0.48
Nodes (5): parseMailForm(), sendEmailAction(), enforceAdminMailRateLimit(), getAnnouncedEvent(), mailSendSchema

### Community 45 - "blog/actions.ts"
Cohesion: 0.24
Nodes (16): beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+8 more)

### Community 46 - "blogImages.ts"
Cohesion: 0.14
Nodes (12): sharp, ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, MAX_ADDITIONAL_BLOG_IMAGES, MAX_BLOG_IMAGE_UPLOAD_BYTES, MAX_BLOG_IMAGES (+4 more)

### Community 47 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 48 - "images/route.ts"
Cohesion: 0.20
Nodes (10): POST(), setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, isFeatureFlagKey() (+2 more)

### Community 49 - "dashboard/page.tsx"
Cohesion: 0.08
Nodes (22): CtaCard(), MailSuccessDialog(), ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, ADMIN_ACTIONS, QueryParamDialog() (+14 more)

### Community 50 - "app/page.tsx"
Cohesion: 0.08
Nodes (21): metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory, TimelineDetail() (+13 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.14
Nodes (14): RegistrationFunnel(), share(), Stage, STAGES, EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, DayBucket, HeatCell (+6 more)

### Community 53 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 54 - "DebugBar.tsx"
Cohesion: 0.19
Nodes (9): ref_node_child_process, ref_node_util, commit, LINKS, TIME, DebugConsole(), AppLogs, ADMIN_SESSION_MAX_MS (+1 more)

### Community 55 - "app/layout.tsx"
Cohesion: 0.16
Nodes (9): src_app_globals, body, metadata, mono, columns, Footer(), legalLinks, GravityTrigger() (+1 more)

### Community 56 - "altcha.ts"
Cohesion: 0.31
Nodes (9): createPrismaClient(), consumeAltchaSolution(), readExpiry(), readSignature(), verifyAltchaPayload(), getAltchaHmacKey(), getDatabaseUrl(), readRequiredEnv() (+1 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "berlinTime.ts"
Cohesion: 0.32
Nodes (13): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+5 more)

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "security/page.tsx"
Cohesion: 0.21
Nodes (15): dynamic, metadata, SecurityPage(), bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket() (+7 more)

### Community 61 - "sitemap.ts"
Cohesion: 0.39
Nodes (7): sitemap(), GET(), TerminePage(), buildCalendarIcs(), getPublishedPosts(), getPastEvents(), getUpcomingEvents()

### Community 62 - "formatNumber"
Cohesion: 0.14
Nodes (16): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, formatBytes(), formatUptime(), ServerDashboard() (+8 more)

### Community 63 - "getOptionalUser"
Cohesion: 0.23
Nodes (9): GET(), POST(), GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes() (+1 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 67 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 68 - "mail/page.tsx"
Cohesion: 0.22
Nodes (8): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, getSentMails()

### Community 71 - "app/kontakt/page.tsx"
Cohesion: 0.14
Nodes (14): ContactForm(), dynamic, KontaktPage(), metadata, createLoginChallenge(), LoginForm(), dynamic, LoginPage() (+6 more)

### Community 72 - "TypeSparklines.tsx"
Cohesion: 0.36
Nodes (7): sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.09
Nodes (39): EditBlogPage(), revalidateEvent(), saveEventAction(), EditEventPage(), AdminEventsPage(), UPCOMING_ALERT_MONTHS, AnnouncedEvent, createEvent() (+31 more)

### Community 77 - "AppError"
Cohesion: 0.12
Nodes (32): zod, requestEmailChangeAction(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema (+24 more)

### Community 78 - "movePostImage"
Cohesion: 0.28
Nodes (9): moveInOrder(), applyImageOrder(), deleteImage(), findImageForPost(), findImagesForPost(), movePostImage(), orderedIds(), removePostImage() (+1 more)

### Community 79 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 82 - "EmailComposerDialog"
Cohesion: 0.50
Nodes (4): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 85 - "feeDefaultService.ts"
Cohesion: 0.60
Nodes (4): deleteFeeDefault(), upsertFeeDefault(), removeFeeDefault(), setFeeDefault()

### Community 87 - "ref_node_assert"
Cohesion: 0.23
Nodes (5): ref_node_assert, ref_node_test, SUMMER, WINTER, base

### Community 92 - "app/termine/[id]/page.tsx"
Cohesion: 0.13
Nodes (17): react-markdown, remark-gfm, generateMetadata(), HomePage(), dynamic, EventDetailPage(), generateMetadata(), Props (+9 more)

### Community 93 - "executeAction"
Cohesion: 0.15
Nodes (34): deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), removeMembershipApplication(), createEventDraft(), deleteEventAction(), deleteFeeDefaultYear() (+26 more)

### Community 99 - "prisma.ts"
Cohesion: 0.09
Nodes (47): bcryptjs, ref_crypto, ref_node_net, @prisma/client, POST(), POST(), notifyAdminsAboutRegistration(), POST() (+39 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **435 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+430 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 558 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `mitgliedsantraege/actions.ts`, `ApplicationWizard.tsx`, `Callout`, `userService.ts`, `boardService.ts`, `app/blog/[id]/page.tsx`, `serverStatus.ts`, `events.ts`, `ics.ts`, `DirectoryTable.tsx`, `package.json`, `membershipService.ts`, `mitglied-werden/actions.ts`, `sendEmail`, `lib/siteUrl.ts`, `MemberDirectory.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `requireDebugAdmin`, `membershipCertificate.ts`, `sepa/route.ts`, `cn`, `index.ts`, `lucide-react`, `authz.ts`, `mail/actions.ts`, `blog/actions.ts`, `images/route.ts`, `dashboard/page.tsx`, `app/page.tsx`, `DebugBar.tsx`, `app/layout.tsx`, `security/page.tsx`, `sitemap.ts`, `getOptionalUser`, `forgot-password/layout.tsx`, `mail/page.tsx`, `app/kontakt/page.tsx`, `eventService.ts`, `AppError`, `app/termine/[id]/page.tsx`, `executeAction`, `prisma.ts`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.193) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `Callout`, `userService.ts`, `app/blog/[id]/page.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `DirectoryTable.tsx`, `package.json`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `cn`, `index.ts`, `normalizeIban`, `BulkImport.tsx`, `images/route.ts`, `dashboard/page.tsx`, `app/page.tsx`, `DebugBar.tsx`, `app/layout.tsx`, `eventService.ts`, `AppError`, `altcha.d.ts`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `Callout`, `userService.ts`, `app/blog/[id]/page.tsx`, `events.ts`, `MarketDiffusion.tsx`, `DirectoryTable.tsx`, `MailForm`, `package.json`, `membershipService.ts`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `membershipCertificate.ts`, `cn`, `index.ts`, `dashboard/page.tsx`, `app/page.tsx`, `securityEventService.ts`, `DebugBar.tsx`, `app/layout.tsx`, `security/page.tsx`, `formatNumber`, `AppError`, `app/termine/[id]/page.tsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _435 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.08246225319396051 - nodes in this community are weakly interconnected._
- **Should `mitgliedsantraege/actions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08309178743961353 - nodes in this community are weakly interconnected._