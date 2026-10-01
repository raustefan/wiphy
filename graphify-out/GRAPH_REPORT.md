# Graph Report - wiphy  (2026-10-01)

## Corpus Check
- 327 files · ~144,969 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1846 nodes · 6115 edges · 96 communities (84 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8db842e2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- mailHistory.ts
- ApplicationWizard.tsx
- Callout
- blog/actions.ts
- boardService.ts
- app/blog/[id]/page.tsx
- serverStatus.ts
- blocks.ts
- blogService.ts
- securityLabels.ts
- events.ts
- ics.ts
- MarketDiffusion.tsx
- BulkImport.tsx
- DirectoryTable.tsx
- package.json
- dependencies
- DebugBar.tsx
- EditUserForm.tsx
- schemas.ts
- EmailBodyField.tsx
- DeleteMemberSection
- app/layout.tsx
- MemberDirectory.tsx
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- forgot-password/layout.tsx
- userService.ts
- membershipCertificate.ts
- mail/actions.ts
- app/page.tsx
- feeService.ts
- MailForm.tsx
- featureFlagService.ts
- satzung/page.tsx
- cn
- compilerOptions
- devDependencies
- index.ts
- format.ts
- lucide-react
- requireDebugAdmin
- auth.ts
- impressum/page.tsx
- mitgliedsantraege/actions.ts
- securityEventService.ts
- userUpdateData.ts
- BlogImageManager.tsx
- dashboard/page.tsx
- isFeatureEnabled
- ActivityHeatmap.tsx
- mailService.ts
- app/kontakt/actions.ts
- photo/route.ts
- vorstand/actions.ts
- ServerDashboard.tsx
- EditUserForm
- berlinTime.ts
- seed.ts
- ShareButton
- requireAdmin
- formatNumber
- authz.ts
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- getOptionalUser
- MailForm
- mail/page.tsx
- users/page.tsx
- CLAUDE.md
- login/page.tsx
- TypeSparklines.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- RegistrationFunnel.tsx
- eventService.ts
- messages.ts
- formatDate
- termine/actions.ts
- altcha.d.ts
- eslint.config.mjs
- MembershipCertificateCard.tsx
- postcss.config.mjs
- mitgliedsantraege/page.tsx
- ref_node_assert
- { GET, POST }
- MarkdownViewer.tsx
- AppError
- ref_node_fs
- registerAction.ts
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 116 edges
2. `AppError` - 88 edges
3. `lucide-react` - 81 edges
4. `cn()` - 80 edges
5. `react` - 67 edges
6. `executeAction()` - 62 edges
7. `requireAdmin()` - 56 edges
8. `Card()` - 49 edges
9. `Button()` - 47 edges
10. `isFeatureEnabled()` - 42 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `ContactRequestList()` --indirect_call--> `markContactRequestHandled()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts
- `confirmDelete()` --indirect_call--> `removeContactRequest()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts
- `EmailChangeForm()` --indirect_call--> `requestEmailChangeAction()`  [INFERRED]
  src/app/dashboard/konto/AccessForms.tsx → src/app/dashboard/konto/actions.ts

## Import Cycles
- None detected.

## Communities (96 total, 12 thin omitted)

### Community 0 - "next"
Cohesion: 0.10
Nodes (22): nextConfig, next, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic, metadata (+14 more)

### Community 1 - "mailHistory.ts"
Cohesion: 0.29
Nodes (7): SentMailInput, sentMailRecord(), getSentMails(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.05
Nodes (70): field(), POST(), ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run() (+62 more)

### Community 3 - "Callout"
Cohesion: 0.08
Nodes (34): next-auth, PasswordChangeButton(), ForgotPasswordPage(), createLoginChallenge(), FaqItem, LoginFaq(), SECTIONS, LoginForm() (+26 more)

### Community 4 - "blog/actions.ts"
Cohesion: 0.26
Nodes (17): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager() (+9 more)

### Community 5 - "boardService.ts"
Cohesion: 0.15
Nodes (24): EditBoardMemberPage(), AdminBoardPage(), moveMemberOrder(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember() (+16 more)

### Community 6 - "app/blog/[id]/page.tsx"
Cohesion: 0.15
Nodes (23): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props (+15 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.13
Nodes (24): ref_node_os, GET(), triggerDeploy(), DeploySection(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK (+16 more)

### Community 8 - "blocks.ts"
Cohesion: 0.21
Nodes (20): blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml() (+12 more)

### Community 9 - "blogService.ts"
Cohesion: 0.09
Nodes (37): POST(), AdminBlogPage(), BlogImageVariant, processBlogImage(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost() (+29 more)

### Community 10 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 11 - "events.ts"
Cohesion: 0.11
Nodes (39): DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, dynamic, metadata (+31 more)

### Community 12 - "ics.ts"
Cohesion: 0.16
Nodes (19): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildEventIcs(), calendar(), describe() (+11 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (29): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+21 more)

### Community 14 - "BulkImport.tsx"
Cohesion: 0.10
Nodes (21): bulkCreateUsersAction(), ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row (+13 more)

### Community 15 - "DirectoryTable.tsx"
Cohesion: 0.12
Nodes (18): AmountDialog(), chipTones, CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName() (+10 more)

### Community 16 - "package.json"
Cohesion: 0.10
Nodes (20): name, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer, react-dom (+12 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "DebugBar.tsx"
Cohesion: 0.19
Nodes (9): ref_node_child_process, ref_node_util, commit, LINKS, TIME, DebugConsole(), AppLogs, ADMIN_SESSION_MAX_MS (+1 more)

### Community 19 - "EditUserForm.tsx"
Cohesion: 0.07
Nodes (29): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue() (+21 more)

### Community 20 - "schemas.ts"
Cohesion: 0.07
Nodes (23): AdminCreateUserInput, BankUpdateParsed, berlinDateTime(), blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema (+15 more)

### Community 21 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 23 - "app/layout.tsx"
Cohesion: 0.08
Nodes (25): escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono, alt (+17 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.16
Nodes (19): MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase, DirectoryFilters, EMPTY_FILTERS, FILTER_VALUES, filtersFromParams() (+11 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (12): columnPath(), labelStride(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline(), PAD (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.16
Nodes (19): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), VerifyPanel() (+11 more)

### Community 28 - "userService.ts"
Cohesion: 0.13
Nodes (25): bcryptjs, deleteUserAction(), createPrismaClient(), globalForPrisma, getDatabaseUrl(), getSecurityLogPepper(), readRequiredEnv(), readRequiredMailEnv() (+17 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.19
Nodes (19): GET(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDurationDative() (+11 more)

### Community 30 - "mail/actions.ts"
Cohesion: 0.29
Nodes (9): parseMailForm(), sendEmailAction(), parseDirectMailForm(), sendDirectMailAction(), resolveUsersByIds(), enforceAdminMailRateLimit(), getAnnouncedEvent(), directMailSchema (+1 more)

### Community 31 - "app/page.tsx"
Cohesion: 0.40
Nodes (4): heroMetrics, HomePage(), pillars, formatDateShort()

### Community 32 - "feeService.ts"
Cohesion: 0.14
Nodes (24): calculateFeeAmount(), FeeBreakdown, archiveFeesOfUser(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees() (+16 more)

### Community 33 - "MailForm.tsx"
Cohesion: 0.11
Nodes (12): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, metadata, EmailBodyField() (+4 more)

### Community 34 - "featureFlagService.ts"
Cohesion: 0.25
Nodes (10): @prisma/client, setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, isFeatureFlagKey() (+2 more)

### Community 35 - "satzung/page.tsx"
Cohesion: 0.16
Nodes (24): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), ApplicationWizard(), currentFormValues() (+16 more)

### Community 36 - "cn"
Cohesion: 0.07
Nodes (26): CtaCard(), metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory (+18 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "index.ts"
Cohesion: 0.13
Nodes (27): metadata, InfoTooltip(), dynamic, metadata, RateLimitTableProps, dynamic, metadata, FeeDefaultRow (+19 more)

### Community 40 - "format.ts"
Cohesion: 0.14
Nodes (11): statusMeta(), TerminationList(), confirm(), AccountSection(), DATE_TIME, EURO, formatDateTime(), LONG_DATE (+3 more)

### Community 41 - "lucide-react"
Cohesion: 0.09
Nodes (33): lucide-react, react, DeletePostButton(), ContactRequestItem, ContactRequestList(), confirmDelete(), run(), dateFormat (+25 more)

### Community 42 - "requireDebugAdmin"
Cohesion: 0.14
Nodes (15): FeatureFlagsPage(), removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), ServerPage() (+7 more)

### Community 43 - "auth.ts"
Cohesion: 0.11
Nodes (20): ContactForm(), dynamic, KontaktPage(), metadata, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError (+12 more)

### Community 44 - "impressum/page.tsx"
Cohesion: 0.16
Nodes (12): DATENSCHUTZ, metadata, impressum(), ImpressumPage(), metadata, SATZUNG, LegalPage(), LegalSections() (+4 more)

### Community 45 - "mitgliedsantraege/actions.ts"
Cohesion: 0.12
Nodes (27): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), EmailMessage, membershipApprovedMessage(), terminationConfirmedMessage(), MEMBERSHIP_ADMIN_PATH (+19 more)

### Community 46 - "securityEventService.ts"
Cohesion: 0.16
Nodes (18): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, summarizeByBucket(), addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel() (+10 more)

### Community 47 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 48 - "BlogImageManager.tsx"
Cohesion: 0.31
Nodes (8): ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, formatBytes(), MAX_ADDITIONAL_BLOG_IMAGES, MAX_BLOG_IMAGE_UPLOAD_BYTES, MAX_BLOG_IMAGES, moveInOrder()

### Community 49 - "dashboard/page.tsx"
Cohesion: 0.16
Nodes (14): MailSuccessDialog(), ADMIN_ACTIONS, DashboardPage(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, QueryParamDialog(), LogoutButton() (+6 more)

### Community 50 - "isFeatureEnabled"
Cohesion: 0.18
Nodes (19): ContactRequestsPage(), requestPasswordChange(), KontoPage(), EditUserPage(), updateUser(), NewUserPage(), submitMembershipApplication(), withdrawMembershipApplication() (+11 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "mailService.ts"
Cohesion: 0.16
Nodes (17): sanitize-html, ENTITIES, htmlToText(), AnnouncedEvent, composeMessage(), eventBlocks(), greeting(), MailTarget (+9 more)

### Community 53 - "app/kontakt/actions.ts"
Cohesion: 0.23
Nodes (9): ref_crypto, MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), ContactInput, scoreSpam(), SPAM_KEYWORDS (+1 more)

### Community 54 - "photo/route.ts"
Cohesion: 0.17
Nodes (12): POST(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, processBoardPhoto(), ProcessedBoardPhoto, QUALITY_LADDER (+4 more)

### Community 55 - "vorstand/actions.ts"
Cohesion: 0.21
Nodes (15): deleteMember(), deletePhotoAction(), moveMemberInList(), parseOrThrow(), revalidateBoard(), BoardPhotoUploader(), handleDelete(), handleDrop() (+7 more)

### Community 56 - "ServerDashboard.tsx"
Cohesion: 0.36
Nodes (5): formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel()

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "berlinTime.ts"
Cohesion: 0.29
Nodes (14): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+6 more)

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 61 - "requireAdmin"
Cohesion: 0.31
Nodes (14): createDraft(), deletePost(), savePost(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), updateFeeAmount() (+6 more)

### Community 62 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 63 - "authz.ts"
Cohesion: 0.24
Nodes (15): GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, DebugBar(), AS_MEMBER_COOKIE, assertCanEditUser() (+7 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "getOptionalUser"
Cohesion: 0.31
Nodes (7): GET(), GET(), GET(), getOptionalUser(), withViewOverride(), findImageBytes(), findPhotoBytes()

### Community 67 - "MailForm"
Cohesion: 0.18
Nodes (6): byStatusThenName(), MailForm(), useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 68 - "mail/page.tsx"
Cohesion: 0.15
Nodes (13): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage() (+5 more)

### Community 69 - "users/page.tsx"
Cohesion: 0.15
Nodes (16): DialogButton(), DirectoryAccount, metadata, StatTile(), UserManagementPage(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear() (+8 more)

### Community 71 - "login/page.tsx"
Cohesion: 0.31
Nodes (6): dynamic, LoginPage(), metadata, NOTICES, Props, internalPath()

### Community 72 - "TypeSparklines.tsx"
Cohesion: 0.39
Nodes (7): longDayLabel(), sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 76 - "eventService.ts"
Cohesion: 0.12
Nodes (30): EditBlogPage(), AdminEventsPage(), TerminePage(), formatEventShort(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData (+22 more)

### Community 77 - "messages.ts"
Cohesion: 0.20
Nodes (13): EMAIL_CHANGE_ERRORS, createUserAction(), accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage(), greeting(), LINK_EXPIRY(), membershipRejectedMessage() (+5 more)

### Community 78 - "formatDate"
Cohesion: 0.26
Nodes (10): @react-pdf/renderer, GET(), formatDate(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee (+2 more)

### Community 79 - "termine/actions.ts"
Cohesion: 0.31
Nodes (9): createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), createDraftEvent(), removeEvent(), saveEvent(), eventDeleteSchema (+1 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 82 - "MembershipCertificateCard.tsx"
Cohesion: 0.38
Nodes (4): MembershipCertificateCard(), SectionHeader(), formatMembershipDuration(), plural()

### Community 85 - "mitgliedsantraege/page.tsx"
Cohesion: 0.15
Nodes (19): dynamic, MembershipApplicationsPage(), metadata, FeeDefaultEntry, planApplicationFees(), resolveFeeDefault(), deleteFeeDefault(), findFeeDefaults() (+11 more)

### Community 87 - "ref_node_assert"
Cohesion: 0.15
Nodes (9): ref_node_assert, ref_node_test, sharp, ImageBytes, ProcessedBlogImage, QUALITY_LADDER, SUMMER, WINTER (+1 more)

### Community 92 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 93 - "AppError"
Cohesion: 0.13
Nodes (33): zod, markContactRequestHandled(), removeContactRequest(), requestEmailChangeAction(), removeMembershipApplication(), deleteOwnAccount(), disableOwnAccount(), mailLater() (+25 more)

### Community 96 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 99 - "registerAction.ts"
Cohesion: 0.14
Nodes (35): ref_node_net, POST(), POST(), notifyAdminsAboutRegistration(), POST(), resendVerificationEmail(), registerUser(), adminRegistrationNoticeMessage() (+27 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **424 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+419 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 543 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `ApplicationWizard.tsx`, `Callout`, `blog/actions.ts`, `app/blog/[id]/page.tsx`, `serverStatus.ts`, `blogService.ts`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `DirectoryTable.tsx`, `package.json`, `DebugBar.tsx`, `EditUserForm.tsx`, `app/layout.tsx`, `MemberDirectory.tsx`, `mitglied-werden/page.tsx`, `forgot-password/layout.tsx`, `membershipCertificate.ts`, `mail/actions.ts`, `app/page.tsx`, `MailForm.tsx`, `featureFlagService.ts`, `satzung/page.tsx`, `cn`, `index.ts`, `lucide-react`, `requireDebugAdmin`, `auth.ts`, `impressum/page.tsx`, `mitgliedsantraege/actions.ts`, `BlogImageManager.tsx`, `dashboard/page.tsx`, `isFeatureEnabled`, `app/kontakt/actions.ts`, `photo/route.ts`, `vorstand/actions.ts`, `requireAdmin`, `authz.ts`, `getOptionalUser`, `mail/page.tsx`, `users/page.tsx`, `login/page.tsx`, `messages.ts`, `formatDate`, `termine/actions.ts`, `mitgliedsantraege/page.tsx`, `AppError`, `registerAction.ts`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.172) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `Callout`, `app/blog/[id]/page.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `BulkImport.tsx`, `DirectoryTable.tsx`, `package.json`, `DebugBar.tsx`, `EditUserForm.tsx`, `app/layout.tsx`, `MemberDirectory.tsx`, `MailForm.tsx`, `featureFlagService.ts`, `cn`, `index.ts`, `BlogImageManager.tsx`, `dashboard/page.tsx`, `ServerDashboard.tsx`, `users/page.tsx`, `eventService.ts`, `altcha.d.ts`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `Callout`, `app/blog/[id]/page.tsx`, `events.ts`, `DirectoryTable.tsx`, `package.json`, `DebugBar.tsx`, `EditUserForm.tsx`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `app/page.tsx`, `MailForm.tsx`, `satzung/page.tsx`, `cn`, `index.ts`, `BlogImageManager.tsx`, `dashboard/page.tsx`, `ServerDashboard.tsx`, `formatNumber`, `users/page.tsx`, `RegistrationFunnel.tsx`, `MembershipCertificateCard.tsx`, `mitgliedsantraege/page.tsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _424 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.09871794871794871 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0502497796062298 - nodes in this community are weakly interconnected._