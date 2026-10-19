# Graph Report - wiphy  (2026-10-19)

## Corpus Check
- 349 files · ~160,654 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 1980 nodes · 6463 edges · 103 communities (94 shown, 9 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 44 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f285ac46`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- lucide-react
- sepa/route.ts
- ApplicationWizard.tsx
- EditUserForm.tsx
- blog/actions.ts
- satzung/page.tsx
- app/blog/[id]/page.tsx
- serverStatus.ts
- zahlungen/page.tsx
- blogService.ts
- securityLabels.ts
- events.ts
- ics.ts
- MarketDiffusion.tsx
- mitglied-werden/page.tsx
- auth.ts
- package.json
- dependencies
- boardService.ts
- messages.ts
- schemas.ts
- ref_node_path
- AppError
- app/layout.tsx
- MemberDirectory.tsx
- OutcomeTimeline.tsx
- DirectoryTable.tsx
- gravityPhysics.ts
- feature-flags/actions.ts
- DebugBar.tsx
- mailService.ts
- normalizeIban
- feeService.ts
- format.ts
- KosmosTimeline.tsx
- feeCalculation.ts
- membershipCertificate.ts
- compilerOptions
- devDependencies
- index.ts
- ref_node_fs
- prisma.ts
- sendEmail
- BulkImport.tsx
- Callout
- blocks.ts
- dashboard/page.tsx
- userService.ts
- react
- RateLimitTable
- isFeatureEnabled
- ActivityHeatmap.tsx
- securityEventService.ts
- DeleteMemberSection
- ref_node_assert
- EmailBodyField.tsx
- mail/page.tsx
- EditUserForm
- mitgliedsantraege/page.tsx
- berlinTime.ts
- ApplicationList.tsx
- userUpdateData.ts
- formatNumber
- next
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- BoardPhotoUploader
- ServerDashboard.tsx
- membershipService.ts
- requireDebugAdmin
- CLAUDE.md
- app/kontakt/actions.ts
- passwordStrength.ts
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- accountActions.ts
- PhysicsTimeline.tsx
- Footer.tsx
- altcha.d.ts
- authz.ts
- postcss.config.mjs
- formatDate
- ApplicationList
- MarkdownEditor.tsx
- { GET, POST }
- MarkdownViewer.tsx
- redirectError.ts
- app/termine/page.tsx
- executeAction
- RegistrationFunnel.tsx
- vorstand/actions.ts
- feeDefaults.ts
- TypeSparklines.tsx
- mail/actions.ts
- dashboard/termine/[id]/page.tsx
- contact.ts
- EmailComposerDialog
- ContactRequestList

## God Nodes (most connected - your core abstractions)
1. `next` - 123 edges
2. `AppError` - 98 edges
3. `cn()` - 88 edges
4. `lucide-react` - 82 edges
5. `react` - 72 edges
6. `executeAction()` - 72 edges
7. `requireAdmin()` - 56 edges
8. `Button()` - 45 edges
9. `isFeatureEnabled()` - 42 edges
10. `formatDate()` - 39 edges

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

## Communities (103 total, 9 thin omitted)

### Community 0 - "lucide-react"
Cohesion: 0.14
Nodes (22): lucide-react, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic, metadata (+14 more)

### Community 1 - "sepa/route.ts"
Cohesion: 0.26
Nodes (14): field(), POST(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate(), isValidCreditorId() (+6 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (28): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), ageAt(), CONSENT_VERSION (+20 more)

### Community 3 - "EditUserForm.tsx"
Cohesion: 0.09
Nodes (21): EventFormData, ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, EmailBodyField() (+13 more)

### Community 4 - "blog/actions.ts"
Cohesion: 0.25
Nodes (14): beginImageAction(), deleteBlogImage(), deletePost(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+6 more)

### Community 5 - "satzung/page.tsx"
Cohesion: 0.13
Nodes (18): DATENSCHUTZ, metadata, impressum(), ImpressumPage(), metadata, dynamic, metadata, SATZUNG (+10 more)

### Community 6 - "app/blog/[id]/page.tsx"
Cohesion: 0.12
Nodes (28): escapeXml(), GET(), generateMetadata(), Props, PublicBlogPost(), generateMetadata(), LeadPost(), MetaLine() (+20 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.11
Nodes (28): ref_node_os, GET(), ServerPage(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG (+20 more)

### Community 8 - "zahlungen/page.tsx"
Cohesion: 0.14
Nodes (13): MembershipCertificateCard(), SectionHeader(), dynamic, metadata, PaymentHistoryTable(), buttonClasses(), ButtonColor, ButtonLinkProps (+5 more)

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (60): sharp, POST(), BlogIndexPage(), handleDrop(), uploadFiles(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta (+52 more)

### Community 10 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 11 - "events.ts"
Cohesion: 0.11
Nodes (37): DashboardEvent, UpcomingEventAlert(), GET(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard() (+29 more)

### Community 12 - "ics.ts"
Cohesion: 0.17
Nodes (18): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs(), calendar() (+10 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.08
Nodes (40): toggleAllDay(), toDateTimeValue(), toDayValue(), Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext (+32 more)

### Community 14 - "mitglied-werden/page.tsx"
Cohesion: 0.14
Nodes (20): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), VerifyPanel() (+12 more)

### Community 15 - "auth.ts"
Cohesion: 0.11
Nodes (34): ref_crypto, requestPasswordReset(), registerUser(), AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers (+26 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): eslintConfig, name, packageManager, private, version, altcha-lib, babel-plugin-react-compiler, eslint (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "boardService.ts"
Cohesion: 0.11
Nodes (30): ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, moveMemberOrder(), ImageBytes, processBoardPhoto(), ProcessedBoardPhoto, QUALITY_LADDER (+22 more)

### Community 19 - "messages.ts"
Cohesion: 0.12
Nodes (27): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), EmailMessage, emailChangeMessage(), greeting(), LINK_EXPIRY() (+19 more)

### Community 20 - "schemas.ts"
Cohesion: 0.08
Nodes (19): AdminCreateUserInput, BankUpdateParsed, boardDeleteSchema, boardMoveSchema, boardSaveSchema, contactSchema, emailChangeSchema, emailField (+11 more)

### Community 21 - "ref_node_path"
Cohesion: 0.50
Nodes (3): dotenv, ref_node_path, prisma

### Community 22 - "AppError"
Cohesion: 0.17
Nodes (24): zod, EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), withdrawMembershipTermination(), createUserAction(), importRowsSchema, NewUserPage() (+16 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.10
Nodes (16): DashboardLayout(), metadata, src_app_globals, body, metadata, mono, serif, alt (+8 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.15
Nodes (20): MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase, DirectoryFilters, EMPTY_FILTERS, FILTER_VALUES, filtersFromParams() (+12 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (12): columnPath(), labelStride(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline(), PAD (+4 more)

### Community 26 - "DirectoryTable.tsx"
Cohesion: 0.13
Nodes (19): AmountDialog(), chipTones, CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName() (+11 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "feature-flags/actions.ts"
Cohesion: 0.39
Nodes (5): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, isFeatureFlagKey(), setFeatureFlagEnabled()

### Community 29 - "DebugBar.tsx"
Cohesion: 0.14
Nodes (19): ref_node_child_process, ref_node_util, GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage(), auth (+11 more)

### Community 30 - "mailService.ts"
Cohesion: 0.12
Nodes (23): sanitize-html, EmailBlock, eventContactPath(), EventTiming, parseDirectMailForm(), sendDirectMailAction(), ENTITIES, htmlToText() (+15 more)

### Community 31 - "normalizeIban"
Cohesion: 0.30
Nodes (15): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+7 more)

### Community 32 - "feeService.ts"
Cohesion: 0.14
Nodes (22): DialogButton(), DirectoryAccount, FeeDefaultsCard(), run(), save(), metadata, StatTile(), UserManagementPage() (+14 more)

### Community 33 - "format.ts"
Cohesion: 0.13
Nodes (14): statusMeta(), TerminationList(), confirm(), AccountSection(), DATE_TIME, EURO, formatDateShort(), formatDateTime() (+6 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.13
Nodes (26): revealKosmosEmailAction(), setKosmosVisibilityAction(), KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField() (+18 more)

### Community 35 - "feeCalculation.ts"
Cohesion: 0.19
Nodes (19): ZahlungenPage(), ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit(), SatzungPage(), annualFee() (+11 more)

### Community 36 - "membershipCertificate.ts"
Cohesion: 0.16
Nodes (23): GET(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDuration() (+15 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "index.ts"
Cohesion: 0.09
Nodes (37): CtaCard(), InfoTooltip(), dynamic, metadata, RateLimitTableProps, FeeDefaultRow, ShareButton(), share() (+29 more)

### Community 40 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 41 - "prisma.ts"
Cohesion: 0.25
Nodes (11): ref_server_only, GET(), message(), createPrismaClient(), globalForPrisma, getAltchaHmacKey(), getDatabaseUrl(), readRequiredEnv() (+3 more)

### Community 42 - "sendEmail"
Cohesion: 0.16
Nodes (22): requestBackupLink(), triggerDeploy(), resendVerificationEmail(), notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), backupLinkMessage(), emailChangedNoticeMessage() (+14 more)

### Community 43 - "BulkImport.tsx"
Cohesion: 0.22
Nodes (10): bulkCreateUsersAction(), ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row (+2 more)

### Community 44 - "Callout"
Cohesion: 0.08
Nodes (33): altcha, next-auth, EmailChangeForm(), PasswordChangeButton(), ForgotPasswordPage(), createLoginChallenge(), FaqItem, LoginFaq() (+25 more)

### Community 45 - "blocks.ts"
Cohesion: 0.22
Nodes (18): blockHtml(), blockText(), derivePreheader(), EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml(), renderBlocksText() (+10 more)

### Community 46 - "dashboard/page.tsx"
Cohesion: 0.09
Nodes (19): MailAnnouncement, byStatusThenName(), MailForm(), MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS (+11 more)

### Community 47 - "userService.ts"
Cohesion: 0.20
Nodes (17): KontoPage(), updateUser(), adminCreatedUserMessage(), planApplicationFees(), assertCanEditUser(), archiveFeesOfUser(), getMaxMitgliedId(), findUserById() (+9 more)

### Community 48 - "react"
Cohesion: 0.15
Nodes (17): react, DeletePostButton(), ContactRequestItem, dateFormat, TerminationItem, DeleteEventButton(), ActionResult, Mode (+9 more)

### Community 49 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 50 - "isFeatureEnabled"
Cohesion: 0.21
Nodes (13): POST(), ContactRequestsPage(), resetPassword(), resetSchema, passwordChangedNoticeMessage(), FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER (+5 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.18
Nodes (17): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, summarizeByBucket(), addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel() (+9 more)

### Community 54 - "ref_node_assert"
Cohesion: 0.10
Nodes (16): ref_node_assert, ref_node_net, ref_node_test, dynamic, LoginPage(), metadata, NOTICES, Props (+8 more)

### Community 55 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 56 - "mail/page.tsx"
Cohesion: 0.17
Nodes (12): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, SentMailInput (+4 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "mitgliedsantraege/page.tsx"
Cohesion: 0.12
Nodes (24): dynamic, MembershipApplicationsPage(), metadata, DashboardPage(), EditUserPage(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear() (+16 more)

### Community 59 - "berlinTime.ts"
Cohesion: 0.29
Nodes (14): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+6 more)

### Community 60 - "ApplicationList.tsx"
Cohesion: 0.18
Nodes (8): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, BankValues, PaymentOption(), Badge(), SEPA_CREDITOR_ID

### Community 61 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 63 - "next"
Cohesion: 0.07
Nodes (22): nextConfig, next, metadata, facts, metadata, metadata, metadata, levels (+14 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (25): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Backup & Wiederherstellung, Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server (+17 more)

### Community 66 - "BoardPhotoUploader"
Cohesion: 0.28
Nodes (9): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), AdminBoardPage(), getInitials(), VorstandPage(), boardPhotoUrl() (+1 more)

### Community 67 - "ServerDashboard.tsx"
Cohesion: 0.27
Nodes (7): BackupSection(), DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel()

### Community 68 - "membershipService.ts"
Cohesion: 0.21
Nodes (10): adapter, prisma, @prisma/client, countOpenApplications(), deleteApplication(), findOpenApplication(), markApplicationMailed(), ApplicationWithUser (+2 more)

### Community 69 - "requireDebugAdmin"
Cohesion: 0.33
Nodes (7): removeRateLimitEntry(), requireDebugAdmin(), bucketFromKey(), deleteRateLimitEntry(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem

### Community 71 - "app/kontakt/actions.ts"
Cohesion: 0.16
Nodes (16): submitContactRequest(), ContactForm(), dynamic, KontaktPage(), metadata, contactRequestMessage(), ALTCHA_COMPLEXITY, consumeAltchaSolution() (+8 more)

### Community 72 - "passwordStrength.ts"
Cohesion: 0.21
Nodes (9): NewUserForm(), handleSubmit(), evaluatePassword(), generatePassword(), PasswordCriterion, PasswordScore, PasswordStrength, SCORE_LABELS (+1 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.13
Nodes (28): EditBlogPage(), AdminEventsPage(), createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventOptions(), findLatestPastEvent() (+20 more)

### Community 77 - "accountActions.ts"
Cohesion: 0.19
Nodes (18): bcryptjs, deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, deleteUserAction() (+10 more)

### Community 78 - "PhysicsTimeline.tsx"
Cohesion: 0.27
Nodes (6): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline()

### Community 79 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "authz.ts"
Cohesion: 0.24
Nodes (11): GET(), GET(), GET(), AS_MEMBER_COOKIE, getOptionalUser(), normalizeRole(), sessionUser(), UserContext (+3 more)

### Community 85 - "formatDate"
Cohesion: 0.27
Nodes (9): @react-pdf/renderer, GET(), BankDetailsForm(), submit(), formatDate(), PaymentHistoryPdf(), PdfUser, statusLabel() (+1 more)

### Community 86 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 87 - "MarkdownEditor.tsx"
Cohesion: 0.50
Nodes (3): @uiw/react-markdown-preview, @uiw/react-md-editor, MDEditor

### Community 89 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 91 - "redirectError.ts"
Cohesion: 0.67
Nodes (3): getRedirectTarget(), isRedirectError(), RedirectTarget

### Community 92 - "app/termine/page.tsx"
Cohesion: 0.27
Nodes (9): sitemap(), dynamic, metadata, SearchParams, TerminePage(), ViewSwitch(), CALENDAR_ICS_PATH, getPastEvents() (+1 more)

### Community 93 - "executeAction"
Cohesion: 0.11
Nodes (40): createDraft(), savePost(), markContactRequestHandled(), removeContactRequest(), removeMembershipApplication(), createEventDraft(), deleteEventAction(), revalidateEvent() (+32 more)

### Community 94 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 95 - "vorstand/actions.ts"
Cohesion: 0.42
Nodes (9): deleteMember(), deletePhotoAction(), moveMemberInList(), parseOrThrow(), revalidateBoard(), saveMember(), removeAdminMember(), removeMemberPhoto() (+1 more)

### Community 96 - "feeDefaults.ts"
Cohesion: 0.31
Nodes (7): FeeDefaultEntry, FeeRates, FALLBACK_FEE_DEFAULT, deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeRatesForYear()

### Community 97 - "TypeSparklines.tsx"
Cohesion: 0.33
Nodes (8): longDayLabel(), sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 98 - "mail/actions.ts"
Cohesion: 0.53
Nodes (5): parseMailForm(), sendEmailAction(), sendMailForTarget(), getAnnouncedEvent(), mailSendSchema

### Community 99 - "dashboard/termine/[id]/page.tsx"
Cohesion: 0.40
Nodes (5): dynamic, EditEventPage(), metadata, findEventById(), getEventForEdit()

### Community 100 - "contact.ts"
Cohesion: 0.40
Nodes (4): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, legitimate

### Community 101 - "EmailComposerDialog"
Cohesion: 0.67
Nodes (3): EmailComposerDialog(), closeDialog(), handleClose()

### Community 102 - "ContactRequestList"
Cohesion: 1.00
Nodes (3): ContactRequestList(), confirmDelete(), run()

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **445 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+440 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 571 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `lucide-react`, `sepa/route.ts`, `ApplicationWizard.tsx`, `EditUserForm.tsx`, `blog/actions.ts`, `satzung/page.tsx`, `app/blog/[id]/page.tsx`, `serverStatus.ts`, `zahlungen/page.tsx`, `blogService.ts`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `mitglied-werden/page.tsx`, `auth.ts`, `package.json`, `messages.ts`, `AppError`, `app/layout.tsx`, `MemberDirectory.tsx`, `DirectoryTable.tsx`, `gravityPhysics.ts`, `feature-flags/actions.ts`, `DebugBar.tsx`, `feeService.ts`, `KosmosTimeline.tsx`, `membershipCertificate.ts`, `index.ts`, `prisma.ts`, `sendEmail`, `Callout`, `dashboard/page.tsx`, `react`, `isFeatureEnabled`, `ref_node_assert`, `mail/page.tsx`, `mitgliedsantraege/page.tsx`, `ApplicationList.tsx`, `requireDebugAdmin`, `app/kontakt/actions.ts`, `accountActions.ts`, `Footer.tsx`, `authz.ts`, `formatDate`, `MarkdownEditor.tsx`, `app/termine/page.tsx`, `executeAction`, `vorstand/actions.ts`, `dashboard/termine/[id]/page.tsx`?**
  _High betweenness centrality (0.218) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `lucide-react`, `ApplicationWizard.tsx`, `EditUserForm.tsx`, `satzung/page.tsx`, `app/blog/[id]/page.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `package.json`, `app/layout.tsx`, `MemberDirectory.tsx`, `DirectoryTable.tsx`, `gravityPhysics.ts`, `feature-flags/actions.ts`, `DebugBar.tsx`, `normalizeIban`, `feeService.ts`, `KosmosTimeline.tsx`, `index.ts`, `BulkImport.tsx`, `Callout`, `dashboard/page.tsx`, `ApplicationList.tsx`, `next`, `ServerDashboard.tsx`, `eventService.ts`, `PhysicsTimeline.tsx`, `Footer.tsx`, `altcha.d.ts`, `MarkdownEditor.tsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `ApplicationWizard.tsx`, `EditUserForm.tsx`, `app/blog/[id]/page.tsx`, `zahlungen/page.tsx`, `events.ts`, `MarketDiffusion.tsx`, `mitglied-werden/page.tsx`, `package.json`, `app/layout.tsx`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `DirectoryTable.tsx`, `gravityPhysics.ts`, `DebugBar.tsx`, `feeService.ts`, `KosmosTimeline.tsx`, `index.ts`, `Callout`, `dashboard/page.tsx`, `react`, `mitgliedsantraege/page.tsx`, `ApplicationList.tsx`, `formatNumber`, `next`, `ServerDashboard.tsx`, `Footer.tsx`, `RegistrationFunnel.tsx`, `dashboard/termine/[id]/page.tsx`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _445 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `lucide-react` be split into smaller, more focused modules?**
  _Cohesion score 0.13655761024182078 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08067226890756303 - nodes in this community are weakly interconnected._