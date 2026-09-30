# Graph Report - wiphy  (2026-09-30)

## Corpus Check
- 320 files · ~140,838 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1803 nodes · 5918 edges · 102 communities (91 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `045abc51`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LoginForm.tsx
- cn
- ApplicationWizard.tsx
- next
- authz.ts
- boardService.ts
- AppError
- serverStatus.ts
- MailForm.tsx
- blogService.ts
- securityLabels.ts
- DirectoryTable.tsx
- mailService.ts
- MarketDiffusion.tsx
- executeAction
- MemberDirectory.tsx
- package.json
- dependencies
- app/kontakt/actions.ts
- users/page.tsx
- schemas.ts
- EmailBodyField.tsx
- DeleteMemberSection
- app/layout.tsx
- normalizeIban
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- AccountPanel.tsx
- MarkdownEditor.tsx
- events.ts
- Button.tsx
- format.ts
- feeService.ts
- mail/page.tsx
- featureFlagService.ts
- FeeDefaultsCard.tsx
- PhysicsTimeline.tsx
- compilerOptions
- devDependencies
- NewUserForm.tsx
- eventPath
- react
- security/actions.ts
- prisma.ts
- satzung/page.tsx
- app/page.tsx
- securityEventService.ts
- userUpdateData.ts
- membershipService.ts
- mitgliedsantraege/actions.ts
- app/blog/[id]/page.tsx
- ActivityHeatmap.tsx
- auth.ts
- getOptionalUser
- @prisma/client
- isFeatureEnabled
- index.ts
- EditUserForm.tsx
- login/page.tsx
- seed.ts
- dashboard/kontakt/actions.ts
- sepa/route.ts
- forgot-password/layout.tsx
- RegistrationFunnel.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- accountActions.ts
- photo/route.ts
- mailHistory.ts
- TypeSparklines.tsx
- CLAUDE.md
- blog/actions.ts
- BoardPhotoUploader
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- ServerDashboard.tsx
- eventService.ts
- userService.ts
- errors.ts
- dashboard/page.tsx
- altcha.d.ts
- eventRepository.ts
- postcss.config.mjs
- blogImageProcessing.ts
- blogImages.ts
- sendEmail
- { GET, POST }
- ApplicationList.tsx
- HeaderChrome.tsx
- MarkdownViewer.tsx
- securityLog.ts
- EmailComposerDialog.tsx
- Input
- app/vorstand/page.tsx
- rateLimitService.ts
- ref_node_path
- clientIp.ts
- login/layout.tsx
- verify-email/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 112 edges
2. `AppError` - 85 edges
3. `cn()` - 80 edges
4. `lucide-react` - 78 edges
5. `react` - 62 edges
6. `executeAction()` - 59 edges
7. `requireAdmin()` - 56 edges
8. `Card()` - 48 edges
9. `Button()` - 45 edges
10. `isFeatureEnabled()` - 40 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `generateMetadata()` --calls--> `pageMetadata()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/metadata.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `BlogImageManager()` --indirect_call--> `deleteBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `moveBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts

## Import Cycles
- None detected.

## Communities (102 total, 11 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.16
Nodes (17): ForgotPasswordPage(), FaqItem, LoginFaq(), SECTIONS, VerifyEmailContent(), AuthLink(), AuthShell(), Callout() (+9 more)

### Community 1 - "cn"
Cohesion: 0.13
Nodes (13): CtaCard(), SectionHeader(), ViewSwitch(), CalloutTone, toneClasses, sizeClasses, controlClasses, Select() (+5 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.06
Nodes (37): BankValues, InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), PaymentOption() (+29 more)

### Community 3 - "next"
Cohesion: 0.10
Nodes (24): nextConfig, lucide-react, next, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic (+16 more)

### Community 4 - "authz.ts"
Cohesion: 0.15
Nodes (22): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage(), auth, commit (+14 more)

### Community 5 - "boardService.ts"
Cohesion: 0.14
Nodes (26): EditBoardMemberPage(), moveMemberOrder(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember(), deleteMemberById() (+18 more)

### Community 6 - "AppError"
Cohesion: 0.27
Nodes (10): deleteEventAction(), revalidateEvent(), saveEventAction(), parseDirectMailForm(), sendDirectMailAction(), resolveUsersByIds(), sendMailToUsers(), enforceAdminMailRateLimit() (+2 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.12
Nodes (23): ref_node_os, GET(), triggerDeploy(), ServerPage(), DeploySection(), requireDebugAdmin(), cpuPercent(), cpuTimes (+15 more)

### Community 8 - "MailForm.tsx"
Cohesion: 0.14
Nodes (12): parseMailForm(), sendEmailAction(), MailAnnouncement, byStatusThenName(), MailForm(), MailFormProps, STATUS_ORDER, STATUS_RANK (+4 more)

### Community 9 - "blogService.ts"
Cohesion: 0.11
Nodes (36): POST(), AdminBlogPage(), applyImageOrder(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost(), deleteImage() (+28 more)

### Community 10 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 11 - "DirectoryTable.tsx"
Cohesion: 0.13
Nodes (19): AmountDialog(), chipTones, CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName() (+11 more)

### Community 12 - "mailService.ts"
Cohesion: 0.06
Nodes (58): RFC-5545, sanitize-html, GET(), GET(), blockHtml(), blockText(), derivePreheader(), EmailBlock (+50 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.12
Nodes (27): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+19 more)

### Community 14 - "executeAction"
Cohesion: 0.23
Nodes (23): deletePost(), removeMembershipApplication(), createEventDraft(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), updateFeeAmount() (+15 more)

### Community 15 - "MemberDirectory.tsx"
Cohesion: 0.16
Nodes (19): MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase, DirectoryFilters, EMPTY_FILTERS, FILTER_VALUES, filtersFromParams() (+11 more)

### Community 16 - "package.json"
Cohesion: 0.11
Nodes (18): eslintConfig, name, private, version, babel-plugin-react-compiler, eslint, eslint-config-next, nodemailer (+10 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "app/kontakt/actions.ts"
Cohesion: 0.15
Nodes (14): ref_node_assert, ref_node_test, submitContactRequest(), ContactForm(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage() (+6 more)

### Community 19 - "users/page.tsx"
Cohesion: 0.13
Nodes (20): DirectoryAccount, EditUserPage(), metadata, StatTile(), UserManagementPage(), directoryStats(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS (+12 more)

### Community 20 - "schemas.ts"
Cohesion: 0.09
Nodes (17): BankUpdateParsed, berlinDateTime(), contactSchema, emailField, eventDeleteSchema, feeAmountUpdateSchema, feeCommentSchema, feeStatusUpdateSchema (+9 more)

### Community 21 - "EmailBodyField.tsx"
Cohesion: 0.24
Nodes (7): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailBodyField(), EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 23 - "app/layout.tsx"
Cohesion: 0.09
Nodes (18): metadata, src_app_globals, body, metadata, mono, alt, contentType, size (+10 more)

### Community 24 - "normalizeIban"
Cohesion: 0.30
Nodes (15): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+7 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.19
Nodes (17): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+9 more)

### Community 27 - "AccountPanel.tsx"
Cohesion: 0.14
Nodes (13): altcha, AccountPanel(), handleSubmit(), FIRST_HALF_FIELDS, FirstHalfField, ResetPasswordForm(), handleSubmit(), ALTCHA_STRINGS_DE (+5 more)

### Community 28 - "MarkdownEditor.tsx"
Cohesion: 0.40
Nodes (4): @uiw/react-markdown-preview, @uiw/react-md-editor, MarkdownEditor(), MDEditor

### Community 29 - "events.ts"
Cohesion: 0.07
Nodes (57): GET(), DashboardPage(), EventForm(), toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), berlinOffsetMs() (+49 more)

### Community 30 - "Button.tsx"
Cohesion: 0.13
Nodes (12): BeforeInstallPromptEvent, InstallHint(), ShareButton(), share(), ButtonColor, ButtonLinkProps, ButtonProps, ButtonSize (+4 more)

### Community 31 - "format.ts"
Cohesion: 0.14
Nodes (20): AccountSection(), adminCreatedUserMessage(), feeReminderMessage(), greeting(), membershipReceivedMessage(), Person, terminationConfirmedMessage(), terminationNoticeMessage() (+12 more)

### Community 32 - "feeService.ts"
Cohesion: 0.11
Nodes (31): @react-pdf/renderer, GET(), FeeBreakdown, PaymentHistoryPdf(), PdfUser, statusLabel(), styles, clearFeeAmountOverride() (+23 more)

### Community 33 - "mail/page.tsx"
Cohesion: 0.15
Nodes (12): MailDashboard(), MailEventOption, MailHistoryEntry, MailUserOption, announcementHtml(), dynamic, MailDashboardPage(), metadata (+4 more)

### Community 34 - "featureFlagService.ts"
Cohesion: 0.25
Nodes (9): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, isFeatureFlagKey(), FeatureFlagWithMeta (+1 more)

### Community 35 - "FeeDefaultsCard.tsx"
Cohesion: 0.15
Nodes (23): FeeDefaultRow, FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), ApplicationWizard() (+15 more)

### Community 36 - "PhysicsTimeline.tsx"
Cohesion: 0.14
Nodes (12): metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory, TimelineDetail() (+4 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "NewUserForm.tsx"
Cohesion: 0.20
Nodes (13): NewUserForm(), handleSubmit(), FILL_PERCENT, PasswordInput(), PasswordStrengthMeter(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH (+5 more)

### Community 40 - "eventPath"
Cohesion: 0.20
Nodes (18): escapeXml(), GET(), HomePage(), sitemap(), EventDetailPage(), generateMetadata(), TerminePage(), eventPath() (+10 more)

### Community 41 - "react"
Cohesion: 0.17
Nodes (15): react, DeletePostButton(), ContactRequestItem, dateFormat, DeleteEventButton(), DialogButton(), DeleteMemberSectionProps, DeleteMemberButton() (+7 more)

### Community 42 - "security/actions.ts"
Cohesion: 0.27
Nodes (7): removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), deleteRateLimitEntry()

### Community 43 - "prisma.ts"
Cohesion: 0.17
Nodes (16): altcha-lib, dynamic, KontaktPage(), metadata, createPrismaClient(), globalForPrisma, ALTCHA_COMPLEXITY, consumeAltchaSolution() (+8 more)

### Community 44 - "satzung/page.tsx"
Cohesion: 0.13
Nodes (17): DATENSCHUTZ, metadata, IMPRESSUM, metadata, dynamic, metadata, SATZUNG, Block() (+9 more)

### Community 45 - "app/page.tsx"
Cohesion: 0.11
Nodes (26): DashboardEvent, UpcomingEventAlert(), metadata, heroMetrics, pillars, dynamic, Props, dynamic (+18 more)

### Community 46 - "securityEventService.ts"
Cohesion: 0.19
Nodes (16): SecurityPage(), typeLabel, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview() (+8 more)

### Community 47 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 48 - "membershipService.ts"
Cohesion: 0.16
Nodes (22): MembershipApplicationsPage(), planApplicationFees(), resolveFeeDefault(), deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), countOpenApplications(), deleteApplication() (+14 more)

### Community 49 - "mitgliedsantraege/actions.ts"
Cohesion: 0.18
Nodes (18): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), membershipApprovedMessage(), membershipRejectedMessage(), findApplicationById(), approveApplication() (+10 more)

### Community 50 - "app/blog/[id]/page.tsx"
Cohesion: 0.18
Nodes (16): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props (+8 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "auth.ts"
Cohesion: 0.13
Nodes (17): next-auth, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError (+9 more)

### Community 53 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

### Community 54 - "@prisma/client"
Cohesion: 0.36
Nodes (7): @prisma/client, getStatusIcon(), ProfileSummary(), ProfileSummaryUser, formatStatus(), formatStatusShort(), getStatusTone()

### Community 55 - "isFeatureEnabled"
Cohesion: 0.21
Nodes (22): POST(), POST(), notifyAdminsAboutRegistration(), POST(), registerUser(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), LINK_EXPIRY() (+14 more)

### Community 56 - "index.ts"
Cohesion: 0.14
Nodes (25): metadata, InfoTooltip(), dynamic, metadata, RateLimitTableProps, dynamic, metadata, metadata (+17 more)

### Community 57 - "EditUserForm.tsx"
Cohesion: 0.11
Nodes (17): ADMIN_ONLY_KEYS, EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), FIELD_LABELS (+9 more)

### Community 58 - "login/page.tsx"
Cohesion: 0.31
Nodes (6): dynamic, LoginPage(), metadata, NOTICES, Props, internalPath()

### Community 59 - "seed.ts"
Cohesion: 0.40
Nodes (3): adapter, prisma, @prisma/adapter-pg

### Community 60 - "dashboard/kontakt/actions.ts"
Cohesion: 0.29
Nodes (9): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), ContactRequestsPage(), deleteContactRequest(), getContactRequests() (+1 more)

### Community 61 - "sepa/route.ts"
Cohesion: 0.26
Nodes (14): field(), POST(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate(), isValidCreditorId() (+6 more)

### Community 63 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "accountActions.ts"
Cohesion: 0.19
Nodes (18): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination(), ActionResult (+10 more)

### Community 67 - "photo/route.ts"
Cohesion: 0.18
Nodes (11): POST(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, processBoardPhoto(), ProcessedBoardPhoto, QUALITY_LADDER (+3 more)

### Community 68 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 69 - "TypeSparklines.tsx"
Cohesion: 0.38
Nodes (6): sparkGeometry, typeHint(), SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 71 - "blog/actions.ts"
Cohesion: 0.20
Nodes (17): beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), savePost() (+9 more)

### Community 72 - "BoardPhotoUploader"
Cohesion: 0.60
Nodes (5): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), formatBytes()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "ServerDashboard.tsx"
Cohesion: 0.15
Nodes (17): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, formatBytes(), formatUptime(), Sample (+9 more)

### Community 76 - "eventService.ts"
Cohesion: 0.15
Nodes (17): EditBlogPage(), AdminEventsPage(), createEvent(), deleteEventById(), findAllEvents(), findEventOptions(), findNextUpcomingEvent(), updateEvent() (+9 more)

### Community 77 - "userService.ts"
Cohesion: 0.24
Nodes (14): bcryptjs, emailChangeMessage(), archiveFeesOfUser(), deleteUserById(), findUserById(), findUserByMitgliedIdExcludingUser(), updateUserById(), anonymizeSecurityEventsForUser() (+6 more)

### Community 78 - "errors.ts"
Cohesion: 0.17
Nodes (19): zod, deleteUserAction(), updateUser(), createUserAction(), NewUserPage(), updateBankDetails(), submitMembershipApplication(), withdrawMembershipApplication() (+11 more)

### Community 79 - "dashboard/page.tsx"
Cohesion: 0.17
Nodes (8): EmailChangeDialog(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog(), metadata, FeatureDisabledQueryDialog(), buttonClasses()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 82 - "eventRepository.ts"
Cohesion: 0.23
Nodes (15): startOfBerlinDay(), EventWriteData, findLatestPastEvent(), findPastEvents(), findPublishedEventById(), findUpcomingEvents(), linkedPostSelect, pastConditions() (+7 more)

### Community 85 - "blogImageProcessing.ts"
Cohesion: 0.16
Nodes (10): ref_node_fs, sharp, BACKGROUND, icon(), main(), MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, processBlogImage() (+2 more)

### Community 86 - "blogImages.ts"
Cohesion: 0.17
Nodes (12): BlogImageManager(), handleDrop(), uploadFiles(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, formatBytes() (+4 more)

### Community 87 - "sendEmail"
Cohesion: 0.25
Nodes (11): createLoginChallenge(), resendVerificationEmail(), LoginForm(), VerifyPanel(), getMailTransporter(), normalize(), Recipients, sendEmail() (+3 more)

### Community 89 - "ApplicationList.tsx"
Cohesion: 0.19
Nodes (12): ApplicationItem, ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), dateFormat (+4 more)

### Community 91 - "HeaderChrome.tsx"
Cohesion: 0.29
Nodes (7): Header(), HeaderChrome(), links, ThemeToggle(), useSwipeToClose(), end(), offset()

### Community 92 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 93 - "securityLog.ts"
Cohesion: 0.25
Nodes (8): ref_crypto, getSecurityLogPepper(), EVENT_RETENTION_DAYS, pruneSecurityEvents(), PSEUDONYM_RETENTION_DAYS, pseudonymize(), SecurityEventInput, SecurityEventReason

### Community 94 - "EmailComposerDialog.tsx"
Cohesion: 0.32
Nodes (6): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose(), EmailComposerDialogProps, MailRecipient

### Community 95 - "Input"
Cohesion: 0.33
Nodes (5): statusMeta(), TerminationItem, TerminationList(), confirm(), Input()

### Community 96 - "app/vorstand/page.tsx"
Cohesion: 0.38
Nodes (5): AdminBoardPage(), getInitials(), metadata, VorstandPage(), boardPhotoUrl()

### Community 97 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 98 - "ref_node_path"
Cohesion: 0.50
Nodes (3): dotenv, ref_node_path, prisma

### Community 99 - "clientIp.ts"
Cohesion: 0.50
Nodes (3): ref_node_net, addressKey(), HeaderBag

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **420 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+415 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 535 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `cn`, `ApplicationWizard.tsx`, `authz.ts`, `AppError`, `serverStatus.ts`, `DirectoryTable.tsx`, `mailService.ts`, `executeAction`, `MemberDirectory.tsx`, `package.json`, `app/kontakt/actions.ts`, `users/page.tsx`, `app/layout.tsx`, `mitglied-werden/page.tsx`, `AccountPanel.tsx`, `MarkdownEditor.tsx`, `events.ts`, `Button.tsx`, `feeService.ts`, `mail/page.tsx`, `featureFlagService.ts`, `PhysicsTimeline.tsx`, `eventPath`, `react`, `security/actions.ts`, `prisma.ts`, `satzung/page.tsx`, `app/page.tsx`, `mitgliedsantraege/actions.ts`, `app/blog/[id]/page.tsx`, `getOptionalUser`, `isFeatureEnabled`, `index.ts`, `EditUserForm.tsx`, `login/page.tsx`, `dashboard/kontakt/actions.ts`, `sepa/route.ts`, `forgot-password/layout.tsx`, `accountActions.ts`, `photo/route.ts`, `blog/actions.ts`, `errors.ts`, `dashboard/page.tsx`, `sendEmail`, `HeaderChrome.tsx`, `Input`, `app/vorstand/page.tsx`, `login/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.199) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `next` to `LoginForm.tsx`, `cn`, `ApplicationWizard.tsx`, `authz.ts`, `MailForm.tsx`, `DirectoryTable.tsx`, `MemberDirectory.tsx`, `package.json`, `app/kontakt/actions.ts`, `users/page.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `AccountPanel.tsx`, `events.ts`, `Button.tsx`, `mail/page.tsx`, `FeeDefaultsCard.tsx`, `PhysicsTimeline.tsx`, `NewUserForm.tsx`, `react`, `satzung/page.tsx`, `app/page.tsx`, `app/blog/[id]/page.tsx`, `@prisma/client`, `index.ts`, `EditUserForm.tsx`, `RegistrationFunnel.tsx`, `accountActions.ts`, `ServerDashboard.tsx`, `dashboard/page.tsx`, `sendEmail`, `ApplicationList.tsx`, `HeaderChrome.tsx`, `EmailComposerDialog.tsx`, `app/vorstand/page.tsx`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `AppError` connect `AppError` to `boardService.ts`, `serverStatus.ts`, `MailForm.tsx`, `blogService.ts`, `mailService.ts`, `executeAction`, `app/kontakt/actions.ts`, `users/page.tsx`, `featureFlagService.ts`, `security/actions.ts`, `prisma.ts`, `membershipService.ts`, `mitgliedsantraege/actions.ts`, `auth.ts`, `isFeatureEnabled`, `dashboard/kontakt/actions.ts`, `accountActions.ts`, `photo/route.ts`, `blog/actions.ts`, `eventService.ts`, `userService.ts`, `errors.ts`, `dashboard/page.tsx`, `blogImageProcessing.ts`, `sendEmail`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _420 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.13230769230769232 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06462585034013606 - nodes in this community are weakly interconnected._