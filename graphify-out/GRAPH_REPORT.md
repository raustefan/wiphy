# Graph Report - wiphy  (2026-10-19)

## Corpus Check
- 351 files · ~161,180 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 1983 nodes · 6492 edges · 93 communities (79 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 44 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ec7ac9a6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- sepa/route.ts
- ApplicationWizard.tsx
- forgot-password/layout.tsx
- DirectoryTable.tsx
- isDebugMode
- app/blog/[id]/page.tsx
- serverStatus.ts
- vorstand/actions.ts
- blogService.ts
- securityLabels.ts
- events.ts
- ics.ts
- MarketDiffusion.tsx
- mitglied-werden/page.tsx
- userService.ts
- package.json
- dependencies
- boardService.ts
- membershipService.ts
- schemas.ts
- seed.ts
- berlinTime.ts
- app/layout.tsx
- users/page.tsx
- OutcomeTimeline.tsx
- sendEmail
- gravityPhysics.ts
- AppError
- DebugBar.tsx
- mailService.ts
- normalizeIban
- feeService.ts
- accountActions.ts
- KosmosTimeline.tsx
- satzung/page.tsx
- zertifikat/pdf/route.ts
- compilerOptions
- devDependencies
- index.ts
- ref_node_fs
- altcha.ts
- registerAction.ts
- BulkImport.tsx
- ServerDashboard.tsx
- blocks.ts
- MailForm
- users/[id]/page.tsx
- lucide-react
- ApplicationList
- mailHistory.ts
- ActivityHeatmap.tsx
- securityEventService.ts
- DeleteMemberSection
- ref_node_assert
- EmailBodyField.tsx
- mail/page.tsx
- EditUserForm
- dashboard/actions.ts
- mail/actions.ts
- eslint.config.mjs
- userUpdateData.ts
- formatNumber
- app/blog/page.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- boardImages.ts
- app/page.tsx
- photo/[id]/route.ts
- CLAUDE.md
- mitglied-werden/actions.ts
- FeeDefaultsCard
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- login/layout.tsx
- reset-password/layout.tsx
- Footer.tsx
- altcha.d.ts
- authz.ts
- SecurityPage
- postcss.config.mjs
- verify-email/layout.tsx
- MarkdownEditor.tsx
- { GET, POST }
- requireAdmin
- RegistrationFunnel.tsx
- TypeSparklines.tsx
- dashboard/page.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 123 edges
2. `AppError` - 98 edges
3. `cn()` - 88 edges
4. `lucide-react` - 82 edges
5. `react` - 73 edges
6. `executeAction()` - 72 edges
7. `requireAdmin()` - 56 edges
8. `isFeatureEnabled()` - 50 edges
9. `Button()` - 45 edges
10. `formatDate()` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `BlogIndexPage()` --calls--> `getPublishedPostPage()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/server/services/blogService.ts
- `FeatureFlagToggle()` --indirect_call--> `setFeatureFlag()`  [INFERRED]
  src/app/dashboard/feature-flags/FeatureFlagToggle.tsx → src/app/dashboard/feature-flags/actions.ts

## Import Cycles
- None detected.

## Communities (93 total, 14 thin omitted)

### Community 0 - "next"
Cohesion: 0.10
Nodes (28): nextConfig, next, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic, metadata (+20 more)

### Community 1 - "sepa/route.ts"
Cohesion: 0.25
Nodes (15): field(), POST(), SepaDialog(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+7 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (33): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, FeeDefaultEntry, FeeRates, ageAt() (+25 more)

### Community 4 - "DirectoryTable.tsx"
Cohesion: 0.10
Nodes (22): AmountDialog(), chipTones, CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName() (+14 more)

### Community 5 - "isDebugMode"
Cohesion: 0.30
Nodes (10): GET(), GET(), auth, isDebugMode(), deployAvailable(), deployRunning(), getAppLogs(), getDeployStatus() (+2 more)

### Community 6 - "app/blog/[id]/page.tsx"
Cohesion: 0.15
Nodes (20): react-markdown, remark-gfm, generateMetadata(), Props, PublicBlogPost(), LeadPost(), PostRow(), BlogGallery() (+12 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.12
Nodes (22): ref_node_os, ServerPage(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG, DEPLOY_SCRIPT (+14 more)

### Community 8 - "vorstand/actions.ts"
Cohesion: 0.30
Nodes (11): deleteMember(), deletePhotoAction(), moveMemberInList(), parseOrThrow(), revalidateBoard(), saveMember(), removeAdminMember(), saveAdminMember() (+3 more)

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (66): sharp, beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+58 more)

### Community 10 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 11 - "events.ts"
Cohesion: 0.12
Nodes (38): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard() (+30 more)

### Community 12 - "ics.ts"
Cohesion: 0.15
Nodes (20): RFC-5545, GET(), GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs() (+12 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.07
Nodes (42): toggleAllDay(), toDateTimeValue(), toDayValue(), Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext (+34 more)

### Community 14 - "mitglied-werden/page.tsx"
Cohesion: 0.15
Nodes (18): JourneyRail(), ApplicationStage(), dynamic, metadata, Props, toDateInput(), WithdrawApplicationButton(), withdraw() (+10 more)

### Community 15 - "userService.ts"
Cohesion: 0.11
Nodes (37): bcryptjs, EMAIL_CHANGE_ERRORS, requestPasswordChange(), requestPasswordReset(), AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError (+29 more)

### Community 16 - "package.json"
Cohesion: 0.11
Nodes (18): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+10 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "boardService.ts"
Cohesion: 0.10
Nodes (33): createDraft(), EditBoardMemberPage(), AdminBoardPage(), moveMemberOrder(), ImageBytes, processBoardPhoto(), ProcessedBoardPhoto, QUALITY_LADDER (+25 more)

### Community 19 - "membershipService.ts"
Cohesion: 0.13
Nodes (27): dynamic, MembershipApplicationsPage(), metadata, DashboardPage(), planApplicationFees(), isTerminationDue(), deleteFeeDefault(), findFeeDefaults() (+19 more)

### Community 20 - "schemas.ts"
Cohesion: 0.07
Nodes (24): AdminCreateUserInput, BankUpdateParsed, berlinDateTime(), blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema (+16 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "berlinTime.ts"
Cohesion: 0.32
Nodes (13): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+5 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.09
Nodes (22): escapeXml(), GET(), DashboardLayout(), metadata, src_app_globals, body, metadata, mono (+14 more)

### Community 24 - "users/page.tsx"
Cohesion: 0.11
Nodes (28): DialogButton(), DirectoryAccount, MemberDirectory(), setFilter(), setFilters(), metadata, StatTile(), UserManagementPage() (+20 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "sendEmail"
Cohesion: 0.33
Nodes (10): notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), getMailTransporter(), normalize(), Recipients, sendEmail() (+2 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "AppError"
Cohesion: 0.14
Nodes (25): setFeatureFlag(), markContactRequestHandled(), removeContactRequest(), acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), removeRateLimitEntry(), requestBackupLink() (+17 more)

### Community 29 - "DebugBar.tsx"
Cohesion: 0.15
Nodes (12): ref_node_child_process, ref_node_util, FeatureFlagsPage(), commit, DebugBar(), LINKS, TIME, DebugConsole() (+4 more)

### Community 30 - "mailService.ts"
Cohesion: 0.14
Nodes (20): sanitize-html, EmailBlock, parseDirectMailForm(), sendDirectMailAction(), ENTITIES, htmlToText(), AnnouncedEvent, composeMessage() (+12 more)

### Community 31 - "normalizeIban"
Cohesion: 0.19
Nodes (21): SummaryBlock(), ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic() (+13 more)

### Community 32 - "feeService.ts"
Cohesion: 0.13
Nodes (25): resolveFeeDefault(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), TERMINATION_RECORD_RETENTION_YEARS, archiveFeesOfUser(), clearFeeAmountOverride(), findArchivedFees() (+17 more)

### Community 33 - "accountActions.ts"
Cohesion: 0.09
Nodes (40): confirmMembershipTermination(), removeMembershipApplication(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema (+32 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (21): KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen(), years() (+13 more)

### Community 35 - "satzung/page.tsx"
Cohesion: 0.17
Nodes (20): ZahlungenPage(), ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit(), dynamic, metadata (+12 more)

### Community 36 - "zertifikat/pdf/route.ts"
Cohesion: 0.06
Nodes (45): @react-pdf/renderer, GET(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, DATENSCHUTZ, metadata, impressum() (+37 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "index.ts"
Cohesion: 0.08
Nodes (35): CtaCard(), SectionHeader(), InfoTooltip(), RateLimitTableProps, ShareButton(), share(), BadgeTone, toneClasses (+27 more)

### Community 40 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 41 - "altcha.ts"
Cohesion: 0.13
Nodes (21): ref_server_only, GET(), message(), dynamic, KontaktPage(), metadata, createLoginChallenge(), MitgliedWerdenPage() (+13 more)

### Community 42 - "registerAction.ts"
Cohesion: 0.22
Nodes (17): resendVerificationEmail(), registerUser(), resetPassword(), registrationConfirmationMessage(), extractClientIp(), consumeRateLimit(), hashKey(), KeyParts (+9 more)

### Community 43 - "BulkImport.tsx"
Cohesion: 0.10
Nodes (21): bulkCreateUsersAction(), ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row (+13 more)

### Community 44 - "ServerDashboard.tsx"
Cohesion: 0.07
Nodes (39): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, EmailChangeForm(), PasswordChangeButton(), BackupSection(), DeploySection(), Sample (+31 more)

### Community 45 - "blocks.ts"
Cohesion: 0.21
Nodes (19): blockHtml(), blockText(), derivePreheader(), EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml(), renderBlocksText() (+11 more)

### Community 46 - "MailForm"
Cohesion: 0.18
Nodes (6): byStatusThenName(), MailForm(), useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 47 - "users/[id]/page.tsx"
Cohesion: 0.13
Nodes (27): zod, requestEmailChangeAction(), KontoPage(), revealKosmosEmailAction(), setKosmosVisibilityAction(), deleteUserAction(), EditUserPage(), metadata (+19 more)

### Community 48 - "lucide-react"
Cohesion: 0.07
Nodes (45): lucide-react, react, DeletePostButton(), metadata, ContactRequestItem, dateFormat, MailAnnouncement, MailFormProps (+37 more)

### Community 49 - "ApplicationList"
Cohesion: 0.09
Nodes (23): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue() (+15 more)

### Community 50 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.18
Nodes (15): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview() (+7 more)

### Community 54 - "ref_node_assert"
Cohesion: 0.13
Nodes (10): ref_node_assert, ref_node_net, ref_node_test, MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, addressKey(), HeaderBag (+2 more)

### Community 55 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 56 - "mail/page.tsx"
Cohesion: 0.24
Nodes (8): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, getSentMails()

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "dashboard/actions.ts"
Cohesion: 0.36
Nodes (7): COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), AS_MEMBER_COOKIE, DEBUG_COOKIE, isViewingAsMember(), requireRealAdmin()

### Community 59 - "mail/actions.ts"
Cohesion: 0.48
Nodes (6): parseMailForm(), sendEmailAction(), sendMailForTarget(), enforceAdminMailRateLimit(), getAnnouncedEvent(), mailSendSchema

### Community 60 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 61 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "formatNumber"
Cohesion: 0.14
Nodes (16): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, formatBytes(), formatUptime(), ServerDashboard() (+8 more)

### Community 63 - "app/blog/page.tsx"
Cohesion: 0.09
Nodes (23): BlogIndexPage(), generateMetadata(), MetaLine(), Props, facts, metadata, metadata, dynamic (+15 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (25): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Backup & Wiederherstellung, Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server (+17 more)

### Community 66 - "boardImages.ts"
Cohesion: 0.21
Nodes (11): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), getInitials(), VorstandPage(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE (+3 more)

### Community 68 - "app/page.tsx"
Cohesion: 0.15
Nodes (13): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline(), HomePage(), levels (+5 more)

### Community 71 - "mitglied-werden/actions.ts"
Cohesion: 0.23
Nodes (13): ref_crypto, submitContactRequest(), submitMembershipApplication(), withdrawMembershipApplication(), contactRequestMessage(), membershipApplicationNoticeMessage(), membershipReceivedMessage(), ContactInput (+5 more)

### Community 72 - "FeeDefaultsCard"
Cohesion: 1.00
Nodes (3): FeeDefaultsCard(), run(), save()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.11
Nodes (34): EditBlogPage(), EditEventPage(), sitemap(), TerminePage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData (+26 more)

### Community 79 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "authz.ts"
Cohesion: 0.14
Nodes (22): @prisma/client, GET(), POST(), POST(), GET(), GET(), ContactRequestsPage(), resetSchema (+14 more)

### Community 82 - "SecurityPage"
Cohesion: 0.28
Nodes (8): SecurityPage(), typeLabel, bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket(), parseWindowDays()

### Community 87 - "MarkdownEditor.tsx"
Cohesion: 0.50
Nodes (3): @uiw/react-markdown-preview, @uiw/react-md-editor, MDEditor

### Community 93 - "requireAdmin"
Cohesion: 0.17
Nodes (25): createDraft(), deletePost(), savePost(), createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), deleteFeeDefaultYear() (+17 more)

### Community 94 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 97 - "TypeSparklines.tsx"
Cohesion: 0.38
Nodes (6): sparkGeometry, typeHint(), SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 102 - "dashboard/page.tsx"
Cohesion: 0.07
Nodes (30): AdminBlogPage(), ContactRequestList(), confirmDelete(), run(), MailSuccessDialog(), MembershipCertificateCard(), statusMeta(), TerminationItem (+22 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **445 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+440 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 571 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `sepa/route.ts`, `ApplicationWizard.tsx`, `forgot-password/layout.tsx`, `DirectoryTable.tsx`, `isDebugMode`, `app/blog/[id]/page.tsx`, `vorstand/actions.ts`, `blogService.ts`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `mitglied-werden/page.tsx`, `userService.ts`, `package.json`, `membershipService.ts`, `app/layout.tsx`, `users/page.tsx`, `sendEmail`, `gravityPhysics.ts`, `AppError`, `DebugBar.tsx`, `accountActions.ts`, `KosmosTimeline.tsx`, `satzung/page.tsx`, `zertifikat/pdf/route.ts`, `index.ts`, `altcha.ts`, `registerAction.ts`, `ServerDashboard.tsx`, `users/[id]/page.tsx`, `lucide-react`, `ApplicationList`, `mail/page.tsx`, `dashboard/actions.ts`, `app/blog/page.tsx`, `app/page.tsx`, `photo/[id]/route.ts`, `mitglied-werden/actions.ts`, `eventService.ts`, `login/layout.tsx`, `reset-password/layout.tsx`, `Footer.tsx`, `authz.ts`, `verify-email/layout.tsx`, `MarkdownEditor.tsx`, `requireAdmin`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `DirectoryTable.tsx`, `app/blog/[id]/page.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `package.json`, `app/layout.tsx`, `users/page.tsx`, `gravityPhysics.ts`, `DebugBar.tsx`, `normalizeIban`, `KosmosTimeline.tsx`, `zertifikat/pdf/route.ts`, `index.ts`, `BulkImport.tsx`, `ServerDashboard.tsx`, `users/[id]/page.tsx`, `app/blog/page.tsx`, `app/page.tsx`, `eventService.ts`, `Footer.tsx`, `altcha.d.ts`, `authz.ts`, `MarkdownEditor.tsx`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `DirectoryTable.tsx`, `app/blog/[id]/page.tsx`, `blogService.ts`, `events.ts`, `MarketDiffusion.tsx`, `mitglied-werden/page.tsx`, `package.json`, `membershipService.ts`, `app/layout.tsx`, `users/page.tsx`, `OutcomeTimeline.tsx`, `gravityPhysics.ts`, `DebugBar.tsx`, `KosmosTimeline.tsx`, `zertifikat/pdf/route.ts`, `index.ts`, `ServerDashboard.tsx`, `users/[id]/page.tsx`, `formatNumber`, `app/blog/page.tsx`, `Footer.tsx`, `RegistrationFunnel.tsx`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _445 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.1027450980392157 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07087486157253599 - nodes in this community are weakly interconnected._