# Graph Report - wiphy  (2026-10-18)

## Corpus Check
- 339 files · ~154,828 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 1931 nodes · 6284 edges · 100 communities (89 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eb0eb728`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- SepaDialog.tsx
- ApplicationWizard.tsx
- securityLog.ts
- mitgliedsantraege/actions.ts
- boardService.ts
- app/blog/[id]/page.tsx
- serverStatus.ts
- EditUserForm.tsx
- blogService.ts
- securityLabels.ts
- events.ts
- ics.ts
- MarketDiffusion.tsx
- satzung/page.tsx
- userService.ts
- package.json
- dependencies
- blocks.ts
- app/page.tsx
- schemas.ts
- seed.ts
- EventForm.tsx
- lib/siteUrl.ts
- DirectoryTable.tsx
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- gravityPhysics.ts
- RateLimitTable.tsx
- membershipCertificate.ts
- mailService.ts
- normalizeIban
- feeService.ts
- dashboard/page.tsx
- format.ts
- requireUser
- PhysicsTimeline.tsx
- compilerOptions
- devDependencies
- index.ts
- blog/actions.ts
- registerAction.ts
- ref_node_assert
- BulkImport.tsx
- Callout
- LegalPage.tsx
- auth.ts
- prisma.ts
- react
- RateLimitTable
- isFeatureEnabled
- ActivityHeatmap.tsx
- securityEventService.ts
- photo/route.ts
- passwordStrength.ts
- EmailBodyField.tsx
- forgot-password/layout.tsx
- EditUserForm
- users/[id]/page.tsx
- verify-email/layout.tsx
- mail/page.tsx
- userUpdateData.ts
- formatNumber
- app/blog/page.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- Footer.tsx
- AppError
- MailForm.tsx
- statusLabels.ts
- CLAUDE.md
- ServerDashboard.tsx
- app/layout.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- accountActions.ts
- MarkdownViewer.tsx
- paymentHistoryPdf.tsx
- altcha.d.ts
- getOptionalUser
- RegistrationFunnel.tsx
- postcss.config.mjs
- konto/page.tsx
- ApplicationList
- TypeSparklines.tsx
- { GET, POST }
- login/page.tsx
- mailHistory.ts
- BoardPhotoUploader
- executeAction
- impressum/page.tsx
- MarkdownEditor.tsx
- ApplicationWizard
- createUserAction
- login/layout.tsx
- reset-password/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 119 edges
2. `AppError` - 92 edges
3. `cn()` - 88 edges
4. `lucide-react` - 80 edges
5. `react` - 71 edges
6. `executeAction()` - 68 edges
7. `requireAdmin()` - 56 edges
8. `Button()` - 44 edges
9. `isFeatureEnabled()` - 42 edges
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
- `BlogImageManager()` --indirect_call--> `deleteBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts

## Import Cycles
- None detected.

## Communities (100 total, 11 thin omitted)

### Community 0 - "next"
Cohesion: 0.11
Nodes (33): nextConfig, lucide-react, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+25 more)

### Community 1 - "SepaDialog.tsx"
Cohesion: 0.22
Nodes (17): field(), POST(), SepaDialog(), TIME_ZONE, SEPA_CREDITOR_ID, agent(), buildPain008(), CREDITOR_ID_PATTERN (+9 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (31): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, PaymentOption(), ageAt(), CONSENT_VERSION (+23 more)

### Community 3 - "securityLog.ts"
Cohesion: 0.27
Nodes (14): EMAIL_CHANGE_ERRORS, requestPasswordChange(), requestPasswordReset(), passwordResetMessage(), getSecurityLogPepper(), normalizeEmail(), pruneUnverifiedRegistrations(), anonymizeSecurityEventsForUser() (+6 more)

### Community 4 - "mitgliedsantraege/actions.ts"
Cohesion: 0.16
Nodes (20): MembershipApplicationsPage(), planApplicationFees(), countOpenApplications(), deleteApplication(), findApplicationById(), findApplications(), getMaxMitgliedId(), markApplicationMailed() (+12 more)

### Community 5 - "boardService.ts"
Cohesion: 0.14
Nodes (25): EditBoardMemberPage(), AdminBoardPage(), moveMemberOrder(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember() (+17 more)

### Community 6 - "app/blog/[id]/page.tsx"
Cohesion: 0.19
Nodes (17): generateMetadata(), Props, PublicBlogPost(), EditBlogPage(), AdminEventsPage(), BlogPostingJsonLd(), EventJsonLd(), OrganizationJsonLd() (+9 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.06
Nodes (53): ref_node_child_process, ref_node_fs, ref_node_os, ref_node_util, BACKGROUND, icon(), main(), GET() (+45 more)

### Community 8 - "EditUserForm.tsx"
Cohesion: 0.08
Nodes (21): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, ActionResult, Mode, OwnTermination, ADMIN_ONLY_KEYS (+13 more)

### Community 9 - "blogService.ts"
Cohesion: 0.09
Nodes (36): sharp, MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, processBlogImage(), ProcessedBlogImage, QUALITY_LADDER, BlogImageRow, BlogPostWriteData (+28 more)

### Community 10 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 11 - "events.ts"
Cohesion: 0.11
Nodes (39): DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, dynamic, metadata (+31 more)

### Community 12 - "ics.ts"
Cohesion: 0.15
Nodes (20): RFC-5545, GET(), GET(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs(), calendar() (+12 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.08
Nodes (35): metadata, Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField() (+27 more)

### Community 14 - "satzung/page.tsx"
Cohesion: 0.22
Nodes (12): dynamic, metadata, SatzungPage(), FeeRates, deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeDefaults() (+4 more)

### Community 15 - "userService.ts"
Cohesion: 0.18
Nodes (16): zod, importRowsSchema, prisma, AppErrorCode, PendingRegistrationStats, UNVERIFIED_TTL_HOURS, archiveFeesOfUser(), deleteUserById() (+8 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): eslintConfig, name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "blocks.ts"
Cohesion: 0.21
Nodes (19): blockHtml(), blockText(), derivePreheader(), EmailMessage, EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml() (+11 more)

### Community 19 - "app/page.tsx"
Cohesion: 0.12
Nodes (21): LeadPost(), BlogImageManager(), handleDrop(), uploadFiles(), AdminBlogPage(), HomePage(), levels, STRIP_IDS (+13 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (29): AdminCreateUserInput, BankUpdateParsed, berlinDateTime(), blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema (+21 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "EventForm.tsx"
Cohesion: 0.24
Nodes (17): EventForm(), toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate() (+9 more)

### Community 23 - "lib/siteUrl.ts"
Cohesion: 0.14
Nodes (12): escapeXml(), GET(), DashboardLayout(), metadata, alt, contentType, size, getPublishedPosts() (+4 more)

### Community 24 - "DirectoryTable.tsx"
Cohesion: 0.07
Nodes (40): AmountDialog(), chipTones, CommentDialog(), compareBy(), compareNullable(), DirectoryAccount, DirectoryTable(), selectAllWithOpenFees() (+32 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (12): columnPath(), labelStride(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline(), PAD (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.17
Nodes (18): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+10 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "RateLimitTable.tsx"
Cohesion: 0.13
Nodes (18): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), removeRateLimitEntry(), InfoTooltip(), RateLimitTableProps, ServerPage() (+10 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.20
Nodes (17): berlinYear(), CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDuration(), formatMembershipDurationDative(), formatPaidYears() (+9 more)

### Community 30 - "mailService.ts"
Cohesion: 0.12
Nodes (25): sanitize-html, parseMailForm(), sendEmailAction(), eventContactPath(), parseDirectMailForm(), sendDirectMailAction(), ENTITIES, htmlToText() (+17 more)

### Community 31 - "normalizeIban"
Cohesion: 0.27
Nodes (16): SummaryBlock(), ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic() (+8 more)

### Community 32 - "feeService.ts"
Cohesion: 0.12
Nodes (31): UserManagementPage(), billableMonths(), calculateFee(), calculateFeeAmount(), FeeBreakdown, FeeInput, NON_DIRECT_DEBIT_SURCHARGE, wasMemberInYear() (+23 more)

### Community 33 - "dashboard/page.tsx"
Cohesion: 0.21
Nodes (12): GET(), MailSuccessDialog(), ADMIN_ACTIONS, DashboardPage(), QueryParamDialog(), LogoutButton(), certificateFacts, isCertifiableStatus() (+4 more)

### Community 34 - "format.ts"
Cohesion: 0.15
Nodes (15): MembershipCertificateCard(), AccountSection(), buttonClasses(), terminationNoticeMessage(), DATE_TIME, EURO, formatDate(), formatDateShort() (+7 more)

### Community 35 - "requireUser"
Cohesion: 0.22
Nodes (17): FeeDefaultsCard(), run(), save(), NewUserPage(), updateBankDetails(), BankDetailsForm(), submit(), BankValues (+9 more)

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
Cohesion: 0.07
Nodes (35): CtaCard(), StatTile(), ShareButton(), share(), BadgeTone, toneClasses, ButtonColor, ButtonLinkProps (+27 more)

### Community 40 - "blog/actions.ts"
Cohesion: 0.22
Nodes (20): beginImageAction(), createDraft(), deleteBlogImage(), deletePost(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt() (+12 more)

### Community 41 - "registerAction.ts"
Cohesion: 0.14
Nodes (29): bcryptjs, resendVerificationEmail(), registerUser(), resetPassword(), resetSchema, notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage() (+21 more)

### Community 42 - "ref_node_assert"
Cohesion: 0.20
Nodes (7): ref_node_assert, ref_node_net, ref_node_test, addressKey(), HeaderBag, legitimate, base

### Community 43 - "BulkImport.tsx"
Cohesion: 0.22
Nodes (10): bulkCreateUsersAction(), ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row (+2 more)

### Community 44 - "Callout"
Cohesion: 0.08
Nodes (36): next-auth, EmailChangeForm(), PasswordChangeButton(), ForgotPasswordPage(), ContactForm(), createLoginChallenge(), FaqItem, LoginFaq() (+28 more)

### Community 45 - "LegalPage.tsx"
Cohesion: 0.18
Nodes (11): DATENSCHUTZ, metadata, SATZUNG, anchorOf(), Block(), LegalPage(), LegalSections(), renderInline() (+3 more)

### Community 46 - "auth.ts"
Cohesion: 0.20
Nodes (9): AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError, signIn (+1 more)

### Community 47 - "prisma.ts"
Cohesion: 0.18
Nodes (16): ref_server_only, dynamic, KontaktPage(), metadata, createPrismaClient(), globalForPrisma, ALTCHA_COMPLEXITY, consumeAltchaSolution() (+8 more)

### Community 48 - "react"
Cohesion: 0.10
Nodes (26): react, DeletePostButton(), ContactRequestItem, dateFormat, TerminationItem, DeleteEventButton(), DialogButton(), DeleteMemberSectionProps (+18 more)

### Community 49 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 50 - "isFeatureEnabled"
Cohesion: 0.16
Nodes (22): ref_crypto, @prisma/client, POST(), ContactRequestsPage(), submitContactRequest(), submitMembershipApplication(), contactRequestMessage(), membershipApplicationNoticeMessage() (+14 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.18
Nodes (17): SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel() (+9 more)

### Community 53 - "photo/route.ts"
Cohesion: 0.17
Nodes (12): POST(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, processBoardPhoto(), ProcessedBoardPhoto, QUALITY_LADDER (+4 more)

### Community 54 - "passwordStrength.ts"
Cohesion: 0.25
Nodes (9): PasswordStrengthMeter(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength, SCORE_LABELS (+1 more)

### Community 55 - "EmailBodyField.tsx"
Cohesion: 0.24
Nodes (7): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailBodyField(), EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "users/[id]/page.tsx"
Cohesion: 0.08
Nodes (29): confirmMembershipTermination(), dynamic, metadata, statusMeta(), TerminationList(), confirm(), DeleteMemberSection(), deleteUserAction() (+21 more)

### Community 60 - "mail/page.tsx"
Cohesion: 0.17
Nodes (13): MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata (+5 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 63 - "app/blog/page.tsx"
Cohesion: 0.13
Nodes (16): BlogIndexPage(), generateMetadata(), MetaLine(), PostRow(), Props, facts, metadata, metadata (+8 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 67 - "AppError"
Cohesion: 0.23
Nodes (12): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw() (+4 more)

### Community 68 - "MailForm.tsx"
Cohesion: 0.16
Nodes (8): byStatusThenName(), MailForm(), MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, useEmailEditor()

### Community 69 - "statusLabels.ts"
Cohesion: 0.29
Nodes (8): getStatusIcon(), ProfileSummary(), ProfileSummaryUser, formatStatus(), formatStatusShort(), getStatusTone(), ROLE_OPTIONS, STATUS_OPTIONS

### Community 71 - "ServerDashboard.tsx"
Cohesion: 0.27
Nodes (7): triggerDeploy(), DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel()

### Community 72 - "app/layout.tsx"
Cohesion: 0.22
Nodes (7): src_app_globals, body, metadata, mono, serif, auth, Header()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.11
Nodes (33): EditEventPage(), UPCOMING_ALERT_MONTHS, AnnouncedEvent, createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventById() (+25 more)

### Community 77 - "accountActions.ts"
Cohesion: 0.16
Nodes (23): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, signOut, EmailBlock (+15 more)

### Community 78 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 79 - "paymentHistoryPdf.tsx"
Cohesion: 0.33
Nodes (7): @react-pdf/renderer, GET(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

### Community 82 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 85 - "konto/page.tsx"
Cohesion: 0.28
Nodes (5): dynamic, KontoPage(), metadata, SectionHeader(), getPendingEmailChange()

### Community 86 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 87 - "TypeSparklines.tsx"
Cohesion: 0.33
Nodes (8): longDayLabel(), sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 89 - "login/page.tsx"
Cohesion: 0.31
Nodes (6): dynamic, LoginPage(), metadata, NOTICES, Props, internalPath()

### Community 91 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 92 - "BoardPhotoUploader"
Cohesion: 0.32
Nodes (8): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), getInitials(), VorstandPage(), boardPhotoUrl(), formatBytes()

### Community 93 - "executeAction"
Cohesion: 0.16
Nodes (35): requestEmailChangeAction(), acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), createEventDraft(), deleteEventAction(), revalidateEvent() (+27 more)

### Community 94 - "impressum/page.tsx"
Cohesion: 0.36
Nodes (6): impressum(), ImpressumPage(), metadata, findSignatureMembers(), getSignatureBoardLine(), getSignatureBoardMembers()

### Community 95 - "MarkdownEditor.tsx"
Cohesion: 0.40
Nodes (4): @uiw/react-markdown-preview, @uiw/react-md-editor, MarkdownEditor(), MDEditor

### Community 96 - "ApplicationWizard"
Cohesion: 0.70
Nodes (5): ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit()

### Community 97 - "createUserAction"
Cohesion: 0.67
Nodes (3): createUserAction(), NewUserForm(), handleSubmit()

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **441 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+436 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 563 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `SepaDialog.tsx`, `ApplicationWizard.tsx`, `securityLog.ts`, `mitgliedsantraege/actions.ts`, `app/blog/[id]/page.tsx`, `serverStatus.ts`, `EditUserForm.tsx`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `satzung/page.tsx`, `userService.ts`, `package.json`, `app/page.tsx`, `lib/siteUrl.ts`, `DirectoryTable.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `RateLimitTable.tsx`, `dashboard/page.tsx`, `requireUser`, `index.ts`, `blog/actions.ts`, `registerAction.ts`, `Callout`, `LegalPage.tsx`, `prisma.ts`, `react`, `isFeatureEnabled`, `photo/route.ts`, `forgot-password/layout.tsx`, `users/[id]/page.tsx`, `verify-email/layout.tsx`, `mail/page.tsx`, `app/blog/page.tsx`, `Footer.tsx`, `AppError`, `app/layout.tsx`, `accountActions.ts`, `paymentHistoryPdf.tsx`, `getOptionalUser`, `konto/page.tsx`, `login/page.tsx`, `executeAction`, `impressum/page.tsx`, `MarkdownEditor.tsx`, `login/layout.tsx`, `reset-password/layout.tsx`?**
  _High betweenness centrality (0.208) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `next`, `ApplicationWizard.tsx`, `serverStatus.ts`, `EditUserForm.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `package.json`, `app/page.tsx`, `EventForm.tsx`, `DirectoryTable.tsx`, `gravityPhysics.ts`, `RateLimitTable.tsx`, `normalizeIban`, `dashboard/page.tsx`, `requireUser`, `PhysicsTimeline.tsx`, `index.ts`, `BulkImport.tsx`, `Callout`, `LegalPage.tsx`, `users/[id]/page.tsx`, `Footer.tsx`, `MailForm.tsx`, `ServerDashboard.tsx`, `app/layout.tsx`, `eventService.ts`, `altcha.d.ts`, `MarkdownEditor.tsx`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `next` to `SepaDialog.tsx`, `ApplicationWizard.tsx`, `app/blog/[id]/page.tsx`, `serverStatus.ts`, `EditUserForm.tsx`, `events.ts`, `MarketDiffusion.tsx`, `package.json`, `app/page.tsx`, `EventForm.tsx`, `DirectoryTable.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `RateLimitTable.tsx`, `dashboard/page.tsx`, `format.ts`, `requireUser`, `index.ts`, `Callout`, `react`, `users/[id]/page.tsx`, `formatNumber`, `app/blog/page.tsx`, `Footer.tsx`, `MailForm.tsx`, `statusLabels.ts`, `ServerDashboard.tsx`, `RegistrationFunnel.tsx`, `konto/page.tsx`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _441 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.10987726475745178 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07073170731707316 - nodes in this community are weakly interconnected._