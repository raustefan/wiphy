# Graph Report - wiphy  (2026-10-14)

## Corpus Check
- 339 files · ~154,715 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1921 nodes · 6234 edges · 100 communities (86 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `876da0f8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- index.ts
- ApplicationWizard.tsx
- authz.ts
- mitgliedsantraege/actions.ts
- boardService.ts
- app/blog/[id]/page.tsx
- serverStatus.ts
- ContactForm.tsx
- blogService.ts
- securityLabels.ts
- events.ts
- ics.ts
- MarketDiffusion.tsx
- LegalPage.tsx
- userService.ts
- package.json
- dependencies
- mailService.ts
- errors.ts
- schemas.ts
- seed.ts
- DeleteMemberSection
- app/layout.tsx
- memberDirectory.ts
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- gravityPhysics.ts
- requireDebugAdmin
- dashboard/page.tsx
- DirectoryTable.tsx
- normalizeIban
- feeService.ts
- EmailBodyField.tsx
- format.ts
- satzung/page.tsx
- PhysicsTimeline.tsx
- compilerOptions
- devDependencies
- cn
- blog/actions.ts
- EditUserForm.tsx
- sepa/route.ts
- BulkImport.tsx
- useActionForm
- movePostImage
- messages.ts
- auth.ts
- lucide-react
- berlinTime.ts
- mitglied-werden/actions.ts
- ActivityHeatmap.tsx
- securityEventService.ts
- blogImages.ts
- PasswordField.tsx
- MailForm.tsx
- forgot-password/layout.tsx
- EditUserForm
- users/[id]/page.tsx
- verify-email/layout.tsx
- AccountPanel.tsx
- userUpdateData.ts
- ServerDashboard.tsx
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- Footer.tsx
- getOptionalUser
- mail/page.tsx
- boardImages.ts
- CLAUDE.md
- login/page.tsx
- ref_node_assert
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- accountActions.ts
- MarkdownViewer.tsx
- rateLimitService.ts
- altcha.d.ts
- paymentHistoryPdf.tsx
- RegistrationFunnel.tsx
- postcss.config.mjs
- app/page.tsx
- ApplicationList
- LoginForm.tsx
- { GET, POST }
- IconButton.tsx
- useActionForm.tsx
- AccountPanel
- AppError
- ref_node_fs
- BoardPhotoUploader
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
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `ContactRequestList()` --indirect_call--> `markContactRequestHandled()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts
- `confirmDelete()` --indirect_call--> `removeContactRequest()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts

## Import Cycles
- None detected.

## Communities (100 total, 14 thin omitted)

### Community 0 - "next"
Cohesion: 0.09
Nodes (27): nextConfig, next, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic, metadata (+19 more)

### Community 1 - "index.ts"
Cohesion: 0.15
Nodes (20): DeletePostButton(), metadata, InfoTooltip(), RateLimitTableProps, DeleteEventButton(), dynamic, metadata, FeeDefaultRow (+12 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (33): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, FeeDefaultEntry, FeeRates, planApplicationFees() (+25 more)

### Community 3 - "authz.ts"
Cohesion: 0.15
Nodes (22): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage(), auth, commit (+14 more)

### Community 4 - "mitgliedsantraege/actions.ts"
Cohesion: 0.13
Nodes (24): confirmMembershipTermination(), MembershipApplicationsPage(), membershipApprovedMessage(), membershipRejectedMessage(), terminationConfirmedMessage(), deleteApplication(), findApplicationById(), findApplications() (+16 more)

### Community 5 - "boardService.ts"
Cohesion: 0.13
Nodes (28): POST(), EditBoardMemberPage(), AdminBoardPage(), moveMemberOrder(), processBoardPhoto(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData (+20 more)

### Community 6 - "app/blog/[id]/page.tsx"
Cohesion: 0.15
Nodes (20): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), LeadPost(), MetaLine(), PostRow() (+12 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.14
Nodes (22): ref_node_os, GET(), GET(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG (+14 more)

### Community 8 - "ContactForm.tsx"
Cohesion: 0.17
Nodes (10): ContactForm(), dynamic, KontaktPage(), metadata, MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ALTCHA_COMPLEXITY (+2 more)

### Community 9 - "blogService.ts"
Cohesion: 0.11
Nodes (31): POST(), EditBlogPage(), AdminBlogPage(), processBlogImage(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost() (+23 more)

### Community 10 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 11 - "events.ts"
Cohesion: 0.11
Nodes (38): DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), Props, dynamic, metadata, SearchParams (+30 more)

### Community 12 - "ics.ts"
Cohesion: 0.13
Nodes (25): RFC-5545, GET(), generateMetadata(), GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs() (+17 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (32): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+24 more)

### Community 14 - "LegalPage.tsx"
Cohesion: 0.15
Nodes (15): DATENSCHUTZ, metadata, impressum(), ImpressumPage(), metadata, SATZUNG, anchorOf(), Block() (+7 more)

### Community 15 - "userService.ts"
Cohesion: 0.17
Nodes (26): POST(), EMAIL_CHANGE_ERRORS, requestPasswordChange(), passwordResetMessage(), globalForPrisma, prisma, getSecurityLogPepper(), normalizeEmail() (+18 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): eslintConfig, name, private, version, altcha, altcha-lib, babel-plugin-react-compiler, eslint (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "mailService.ts"
Cohesion: 0.06
Nodes (54): sanitize-html, parseMailForm(), sendEmailAction(), EmailComposerDialog(), closeDialog(), handleClose(), blockHtml(), blockText() (+46 more)

### Community 19 - "errors.ts"
Cohesion: 0.17
Nodes (12): zod, createUserAction(), importRowsSchema, NewUserForm(), handleSubmit(), updateBankDetails(), adminCreatedUserMessage(), AppErrorCode (+4 more)

### Community 20 - "schemas.ts"
Cohesion: 0.07
Nodes (22): AdminCreateUserInput, BankUpdateParsed, berlinDateTime(), boardDeleteSchema, boardMoveSchema, boardSaveSchema, contactSchema, emailChangeSchema (+14 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 23 - "app/layout.tsx"
Cohesion: 0.10
Nodes (20): escapeXml(), GET(), DashboardLayout(), metadata, src_app_globals, body, metadata, mono (+12 more)

### Community 24 - "memberDirectory.ts"
Cohesion: 0.13
Nodes (22): selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase, DirectoryFilters, directoryStats(), EMPTY_FILTERS (+14 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.15
Nodes (19): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+11 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.16
Nodes (18): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), VerifyPanel() (+10 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "requireDebugAdmin"
Cohesion: 0.22
Nodes (10): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, triggerDeploy(), ServerPage(), DeploySection(), isFeatureFlagKey(), requireDebugAdmin() (+2 more)

### Community 29 - "dashboard/page.tsx"
Cohesion: 0.06
Nodes (44): @react-pdf/renderer, GET(), byStatusThenName(), MailForm(), MailSuccessDialog(), MembershipCertificateCard(), statusMeta(), TerminationList() (+36 more)

### Community 30 - "DirectoryTable.tsx"
Cohesion: 0.10
Nodes (21): DialogButton(), AmountDialog(), chipTones, CommentDialog(), compareBy(), compareNullable(), DirectoryAccount, DirectoryTable() (+13 more)

### Community 31 - "normalizeIban"
Cohesion: 0.27
Nodes (16): SummaryBlock(), ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic() (+8 more)

### Community 32 - "feeService.ts"
Cohesion: 0.16
Nodes (22): feeRetentionCutoffYear(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), pruneArchivedFees(), resolveIsStudentDefault() (+14 more)

### Community 33 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 34 - "format.ts"
Cohesion: 0.11
Nodes (15): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, BankValues, PaymentOption(), Badge(), DATE_TIME (+7 more)

### Community 35 - "satzung/page.tsx"
Cohesion: 0.10
Nodes (34): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), ApplicationWizard(), currentFormValues() (+26 more)

### Community 36 - "PhysicsTimeline.tsx"
Cohesion: 0.27
Nodes (6): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline()

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "cn"
Cohesion: 0.08
Nodes (29): CtaCard(), dynamic, metadata, Delta(), StatTile(), StatTileProps, Tone, TONE_DOT (+21 more)

### Community 40 - "blog/actions.ts"
Cohesion: 0.19
Nodes (18): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager() (+10 more)

### Community 41 - "EditUserForm.tsx"
Cohesion: 0.09
Nodes (23): @uiw/react-md-editor, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput() (+15 more)

### Community 42 - "sepa/route.ts"
Cohesion: 0.26
Nodes (14): field(), POST(), SepaDialog(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+6 more)

### Community 43 - "BulkImport.tsx"
Cohesion: 0.22
Nodes (10): bulkCreateUsersAction(), ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row (+2 more)

### Community 44 - "useActionForm"
Cohesion: 0.31
Nodes (8): next-auth, ForgotPasswordPage(), VerifyEmailContent(), AuthLink(), AuthShell(), Spinner(), postJson(), useActionForm()

### Community 45 - "movePostImage"
Cohesion: 0.25
Nodes (10): moveInOrder(), applyImageOrder(), deleteImage(), findImageForPost(), findImagesForPost(), movePostImage(), orderedIds(), removePostImage() (+2 more)

### Community 46 - "messages.ts"
Cohesion: 0.16
Nodes (27): bcryptjs, POST(), notifyAdminsAboutRegistration(), POST(), resendVerificationEmail(), registerUser(), EmailMessage, adminRegistrationNoticeMessage() (+19 more)

### Community 47 - "auth.ts"
Cohesion: 0.13
Nodes (18): AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError, signIn (+10 more)

### Community 48 - "lucide-react"
Cohesion: 0.13
Nodes (20): lucide-react, react, ContactRequestItem, dateFormat, TerminationItem, DeleteMemberSectionProps, PhotoMeta, FeatureDisabledDialog() (+12 more)

### Community 49 - "berlinTime.ts"
Cohesion: 0.29
Nodes (14): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+6 more)

### Community 50 - "mitglied-werden/actions.ts"
Cohesion: 0.14
Nodes (24): ref_crypto, submitContactRequest(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), contactRequestMessage(), membershipApplicationNoticeMessage() (+16 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.18
Nodes (17): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview() (+9 more)

### Community 53 - "blogImages.ts"
Cohesion: 0.17
Nodes (10): ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, MAX_ADDITIONAL_BLOG_IMAGES, MAX_BLOG_IMAGE_UPLOAD_BYTES, MAX_BLOG_IMAGES, ImageBytes (+2 more)

### Community 54 - "PasswordField.tsx"
Cohesion: 0.23
Nodes (11): FILL_PERCENT, NewPasswordFields(), PasswordStrengthMeter(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore (+3 more)

### Community 55 - "MailForm.tsx"
Cohesion: 0.14
Nodes (13): ContactRequestList(), confirmDelete(), run(), MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK (+5 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "users/[id]/page.tsx"
Cohesion: 0.12
Nodes (24): @prisma/client, ContactRequestsPage(), deleteUserAction(), EditUserPage(), metadata, updateUser(), FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS (+16 more)

### Community 60 - "AccountPanel.tsx"
Cohesion: 0.22
Nodes (7): FIRST_HALF_FIELDS, FirstHalfField, ALTCHA_STRINGS_DE, ALTCHA_STYLE, AltchaField(), MEMBERSHIP_LOGIN_PATH, birthDateField

### Community 61 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "ServerDashboard.tsx"
Cohesion: 0.20
Nodes (12): formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel(), PAD, PLOT, TICKS (+4 more)

### Community 63 - "Site.tsx"
Cohesion: 0.13
Nodes (14): facts, metadata, metadata, getInitials(), metadata, VorstandPage(), LorenzAttractor, Cta() (+6 more)

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
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

### Community 68 - "mail/page.tsx"
Cohesion: 0.19
Nodes (11): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage() (+3 more)

### Community 69 - "boardImages.ts"
Cohesion: 0.25
Nodes (6): ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, ProcessedBoardPhoto, QUALITY_LADDER

### Community 71 - "login/page.tsx"
Cohesion: 0.31
Nodes (6): dynamic, LoginPage(), metadata, NOTICES, Props, internalPath()

### Community 72 - "ref_node_assert"
Cohesion: 0.12
Nodes (11): ref_node_assert, ref_node_net, ref_node_test, isTerminationDue(), addressKey(), HeaderBag, ADMIN_SESSION_MAX_MS, adminSessionExpired() (+3 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.10
Nodes (34): createEventDraft(), revalidateEvent(), saveEventAction(), AdminEventsPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData (+26 more)

### Community 77 - "accountActions.ts"
Cohesion: 0.14
Nodes (25): KontoPage(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination() (+17 more)

### Community 78 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 79 - "rateLimitService.ts"
Cohesion: 0.17
Nodes (12): removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), bucketFromKey(), deleteRateLimitEntry() (+4 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "paymentHistoryPdf.tsx"
Cohesion: 0.36
Nodes (6): GET(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee

### Community 82 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 85 - "app/page.tsx"
Cohesion: 0.21
Nodes (14): HomePage(), levels, STRIP_IDS, STUDY_PROGRAMS, tone(), sitemap(), findPublishedPosts(), getPublishedPosts() (+6 more)

### Community 86 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 87 - "LoginForm.tsx"
Cohesion: 0.36
Nodes (6): createLoginChallenge(), FaqItem, LoginFaq(), SECTIONS, LoginForm(), MEMBERSHIP_APPLICATION_PATH

### Community 89 - "IconButton.tsx"
Cohesion: 0.29
Nodes (7): colorClasses, iconButtonClasses(), IconButtonColor, IconButtonLink(), IconButtonSize, IconButtonVariant, sizeClasses

### Community 91 - "useActionForm.tsx"
Cohesion: 0.32
Nodes (6): ActionForm, ActionFormOptions, getRedirectTarget(), isRedirectError(), RedirectTarget, ActionResult

### Community 92 - "AccountPanel"
Cohesion: 0.38
Nodes (5): AccountPanel(), handleSubmit(), ResetPasswordForm(), handleSubmit(), validateNewPassword()

### Community 93 - "AppError"
Cohesion: 0.14
Nodes (40): createDraft(), deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), requestEmailChangeAction(), acceptMembershipApplication(), declineMembershipApplication() (+32 more)

### Community 94 - "ref_node_fs"
Cohesion: 0.40
Nodes (5): ref_node_fs, sharp, BACKGROUND, icon(), main()

### Community 95 - "BoardPhotoUploader"
Cohesion: 0.60
Nodes (5): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), formatBytes()

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **438 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+433 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 560 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `index.ts`, `ApplicationWizard.tsx`, `authz.ts`, `mitgliedsantraege/actions.ts`, `app/blog/[id]/page.tsx`, `serverStatus.ts`, `ContactForm.tsx`, `blogService.ts`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `LegalPage.tsx`, `userService.ts`, `package.json`, `mailService.ts`, `errors.ts`, `app/layout.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `requireDebugAdmin`, `dashboard/page.tsx`, `DirectoryTable.tsx`, `format.ts`, `satzung/page.tsx`, `cn`, `blog/actions.ts`, `EditUserForm.tsx`, `sepa/route.ts`, `useActionForm`, `messages.ts`, `lucide-react`, `mitglied-werden/actions.ts`, `MailForm.tsx`, `forgot-password/layout.tsx`, `users/[id]/page.tsx`, `verify-email/layout.tsx`, `AccountPanel.tsx`, `Site.tsx`, `Footer.tsx`, `getOptionalUser`, `mail/page.tsx`, `login/page.tsx`, `eventService.ts`, `accountActions.ts`, `rateLimitService.ts`, `paymentHistoryPdf.tsx`, `app/page.tsx`, `LoginForm.tsx`, `IconButton.tsx`, `useActionForm.tsx`, `AppError`, `login/layout.tsx`, `reset-password/layout.tsx`?**
  _High betweenness centrality (0.207) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `next`, `index.ts`, `ApplicationWizard.tsx`, `app/blog/[id]/page.tsx`, `ContactForm.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `LegalPage.tsx`, `package.json`, `app/layout.tsx`, `gravityPhysics.ts`, `requireDebugAdmin`, `dashboard/page.tsx`, `DirectoryTable.tsx`, `normalizeIban`, `format.ts`, `PhysicsTimeline.tsx`, `EditUserForm.tsx`, `BulkImport.tsx`, `useActionForm`, `PasswordField.tsx`, `MailForm.tsx`, `users/[id]/page.tsx`, `AccountPanel.tsx`, `ServerDashboard.tsx`, `Site.tsx`, `Footer.tsx`, `eventService.ts`, `accountActions.ts`, `altcha.d.ts`, `LoginForm.tsx`, `useActionForm.tsx`, `DebugConsole.tsx`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `next`, `index.ts`, `ApplicationWizard.tsx`, `authz.ts`, `app/blog/[id]/page.tsx`, `ContactForm.tsx`, `events.ts`, `package.json`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `dashboard/page.tsx`, `DirectoryTable.tsx`, `format.ts`, `cn`, `EditUserForm.tsx`, `useActionForm`, `PasswordField.tsx`, `MailForm.tsx`, `users/[id]/page.tsx`, `AccountPanel.tsx`, `ServerDashboard.tsx`, `Site.tsx`, `Footer.tsx`, `accountActions.ts`, `RegistrationFunnel.tsx`, `LoginForm.tsx`, `DebugConsole.tsx`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _438 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.09178743961352658 - nodes in this community are weakly interconnected._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14789915966386555 - nodes in this community are weakly interconnected._