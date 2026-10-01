# Graph Report - wiphy  (2026-10-01)

## Corpus Check
- 327 files · ~144,920 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1846 nodes · 6109 edges · 95 communities (83 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cb119f1d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- BankDetailsForm.tsx
- mailHistory.ts
- ApplicationWizard.tsx
- react
- blog/actions.ts
- requireAdmin
- app/blog/[id]/page.tsx
- serverStatus.ts
- blocks.ts
- blogService.ts
- securityLabels.ts
- events.ts
- ics.ts
- MarketDiffusion.tsx
- BulkImport.tsx
- MemberDirectory.tsx
- package.json
- dependencies
- DebugBar.tsx
- MailForm.tsx
- schemas.ts
- EmailBodyField.tsx
- DeleteMemberSection
- app/layout.tsx
- normalizeIban
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- forgot-password/layout.tsx
- sendEmail
- dashboard/page.tsx
- mail/actions.ts
- app/page.tsx
- feeService.ts
- EditUserForm.tsx
- users/[id]/page.tsx
- feeCalculation.ts
- index.ts
- compilerOptions
- devDependencies
- lucide-react
- messages.ts
- next
- rateLimitService.ts
- auth.ts
- datenschutz/page.tsx
- mitgliedsantraege/actions.ts
- securityEventService.ts
- userUpdateData.ts
- BlogImageManager.tsx
- ApplicationList
- app/termine/page.tsx
- ActivityHeatmap.tsx
- mailService.ts
- mitglied-werden/actions.ts
- users/page.tsx
- registerAction.ts
- DirectoryTable.tsx
- EditUserForm
- berlinTime.ts
- seed.ts
- ShareButton
- sepa/route.ts
- formatNumber
- authz.ts
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- getOptionalUser
- MailForm
- mail/page.tsx
- membershipTermination.ts
- CLAUDE.md
- login/page.tsx
- TypeSparklines.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- RegistrationFunnel.tsx
- eventService.ts
- requireDebugAdmin
- ApplicationList.tsx
- app/vorstand/page.tsx
- altcha.d.ts
- eslint.config.mjs
- postcss.config.mjs
- mitgliedsantraege/page.tsx
- ref_node_assert
- { GET, POST }
- MarkdownViewer.tsx
- AppError
- ref_node_fs
- userService.ts
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 116 edges
2. `AppError` - 88 edges
3. `lucide-react` - 81 edges
4. `cn()` - 80 edges
5. `react` - 65 edges
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

## Communities (95 total, 12 thin omitted)

### Community 0 - "BankDetailsForm.tsx"
Cohesion: 0.22
Nodes (6): BankValues, FaqItem, LoginFaq(), SECTIONS, PaymentOption(), SEPA_CREDITOR_ID

### Community 1 - "mailHistory.ts"
Cohesion: 0.29
Nodes (7): SentMailInput, sentMailRecord(), getSentMails(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (31): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), FeeRates, ageAt() (+23 more)

### Community 3 - "react"
Cohesion: 0.08
Nodes (38): next-auth, react, EmailChangeForm(), PasswordChangeButton(), Sample, DeleteMemberSectionProps, ForgotPasswordPage(), createLoginChallenge() (+30 more)

### Community 4 - "blog/actions.ts"
Cohesion: 0.26
Nodes (17): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager() (+9 more)

### Community 5 - "requireAdmin"
Cohesion: 0.06
Nodes (64): POST(), createDraft(), deletePost(), savePost(), ContactRequestsPage(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount() (+56 more)

### Community 6 - "app/blog/[id]/page.tsx"
Cohesion: 0.15
Nodes (23): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props (+15 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.14
Nodes (22): ref_node_os, GET(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG, DEPLOY_SCRIPT (+14 more)

### Community 8 - "blocks.ts"
Cohesion: 0.21
Nodes (20): blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml() (+12 more)

### Community 9 - "blogService.ts"
Cohesion: 0.10
Nodes (35): POST(), AdminBlogPage(), BlogImageVariant, BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost(), deleteImage() (+27 more)

### Community 10 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 11 - "events.ts"
Cohesion: 0.12
Nodes (35): DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, NextEventCard(), EventCard() (+27 more)

### Community 12 - "ics.ts"
Cohesion: 0.15
Nodes (20): RFC-5545, GET(), GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs() (+12 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (29): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+21 more)

### Community 14 - "BulkImport.tsx"
Cohesion: 0.10
Nodes (21): bulkCreateUsersAction(), ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row (+13 more)

### Community 15 - "MemberDirectory.tsx"
Cohesion: 0.14
Nodes (21): DirectoryAccount, MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase, DirectoryFilters, EMPTY_FILTERS, FILTER_VALUES (+13 more)

### Community 16 - "package.json"
Cohesion: 0.10
Nodes (20): name, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer, react-dom (+12 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "DebugBar.tsx"
Cohesion: 0.16
Nodes (11): ref_node_child_process, ref_node_util, FeatureFlagsPage(), commit, LINKS, TIME, DebugConsole(), AppLogs (+3 more)

### Community 19 - "MailForm.tsx"
Cohesion: 0.11
Nodes (18): metadata, MailFormProps, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, toggleAllDay(), EventFormData, toDateTimeValue() (+10 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (26): AdminCreateUserInput, BankUpdateParsed, berlinDateTime(), blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema (+18 more)

### Community 21 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 23 - "app/layout.tsx"
Cohesion: 0.08
Nodes (23): escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono, alt (+15 more)

### Community 24 - "normalizeIban"
Cohesion: 0.30
Nodes (15): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+7 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.15
Nodes (21): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), VerifyPanel() (+13 more)

### Community 28 - "sendEmail"
Cohesion: 0.29
Nodes (11): notifyAdminsAboutRegistration(), POST(), EmailMessage, adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), getMailTransporter(), normalize(), Recipients (+3 more)

### Community 29 - "dashboard/page.tsx"
Cohesion: 0.06
Nodes (56): @react-pdf/renderer, GET(), GET(), MailSuccessDialog(), MembershipCertificateCard(), statusMeta(), TerminationList(), confirm() (+48 more)

### Community 30 - "mail/actions.ts"
Cohesion: 0.29
Nodes (9): parseMailForm(), sendEmailAction(), parseDirectMailForm(), sendDirectMailAction(), resolveUsersByIds(), enforceAdminMailRateLimit(), getAnnouncedEvent(), directMailSchema (+1 more)

### Community 31 - "app/page.tsx"
Cohesion: 0.32
Nodes (6): heroMetrics, HomePage(), pillars, formatDateShort(), findPublishedPosts(), getPublishedPosts()

### Community 32 - "feeService.ts"
Cohesion: 0.14
Nodes (23): calculateFeeAmount(), FeeBreakdown, archiveFeesOfUser(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees() (+15 more)

### Community 33 - "EditUserForm.tsx"
Cohesion: 0.12
Nodes (14): ContactRequestItem, ContactRequestList(), confirmDelete(), run(), dateFormat, ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput() (+6 more)

### Community 34 - "users/[id]/page.tsx"
Cohesion: 0.14
Nodes (21): @prisma/client, KontoPage(), deleteUserAction(), EditUserPage(), metadata, updateUser(), dynamic, KontaktPage() (+13 more)

### Community 35 - "feeCalculation.ts"
Cohesion: 0.16
Nodes (22): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), ApplicationWizard(), currentFormValues() (+14 more)

### Community 36 - "index.ts"
Cohesion: 0.07
Nodes (36): CtaCard(), metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory (+28 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "lucide-react"
Cohesion: 0.08
Nodes (37): lucide-react, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic, metadata, dynamic (+29 more)

### Community 40 - "messages.ts"
Cohesion: 0.29
Nodes (11): accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage(), greeting(), LINK_EXPIRY(), loginDisabledMessage(), membershipApprovedMessage(), membershipRejectedMessage() (+3 more)

### Community 41 - "next"
Cohesion: 0.08
Nodes (26): nextConfig, next, DeletePostButton(), TerminationItem, ActionResult, Mode, OwnTermination, DeleteMemberButton() (+18 more)

### Community 42 - "rateLimitService.ts"
Cohesion: 0.18
Nodes (11): removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), bucketFromKey(), deleteRateLimitEntry() (+3 more)

### Community 43 - "auth.ts"
Cohesion: 0.13
Nodes (18): AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError, signIn (+10 more)

### Community 44 - "datenschutz/page.tsx"
Cohesion: 0.16
Nodes (10): DATENSCHUTZ, metadata, IMPRESSUM, metadata, SATZUNG, LegalPage(), LegalSections(), LegalBlock (+2 more)

### Community 45 - "mitgliedsantraege/actions.ts"
Cohesion: 0.16
Nodes (21): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), MEMBERSHIP_ADMIN_PATH, countOpenApplications(), deleteApplication(), findApplicationById() (+13 more)

### Community 46 - "securityEventService.ts"
Cohesion: 0.16
Nodes (18): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, summarizeByBucket(), addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap() (+10 more)

### Community 47 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 48 - "BlogImageManager.tsx"
Cohesion: 0.31
Nodes (8): ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, formatBytes(), MAX_ADDITIONAL_BLOG_IMAGES, MAX_BLOG_IMAGE_UPLOAD_BYTES, MAX_BLOG_IMAGES, moveInOrder()

### Community 49 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 50 - "app/termine/page.tsx"
Cohesion: 0.24
Nodes (10): sitemap(), dynamic, metadata, SearchParams, TerminePage(), ViewSwitch(), CALENDAR_ICS_PATH, getPastEvents() (+2 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "mailService.ts"
Cohesion: 0.16
Nodes (17): sanitize-html, ENTITIES, htmlToText(), AnnouncedEvent, composeMessage(), eventBlocks(), greeting(), MailTarget (+9 more)

### Community 53 - "mitglied-werden/actions.ts"
Cohesion: 0.15
Nodes (18): ref_crypto, submitContactRequest(), ContactForm(), submitMembershipApplication(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage() (+10 more)

### Community 54 - "users/page.tsx"
Cohesion: 0.31
Nodes (9): DialogButton(), metadata, StatTile(), UserManagementPage(), directoryStats(), getArchivedFees(), getExistingFeeYears(), countCompletedTerminationsSince() (+1 more)

### Community 55 - "registerAction.ts"
Cohesion: 0.18
Nodes (21): ref_node_net, POST(), resendVerificationEmail(), registerUser(), passwordChangedNoticeMessage(), registrationConfirmationMessage(), addressKey(), extractClientIp() (+13 more)

### Community 56 - "DirectoryTable.tsx"
Cohesion: 0.14
Nodes (17): AmountDialog(), chipTones, CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName() (+9 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "berlinTime.ts"
Cohesion: 0.29
Nodes (14): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+6 more)

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 61 - "sepa/route.ts"
Cohesion: 0.23
Nodes (16): field(), POST(), SepaDialog(), TIME_ZONE, agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId() (+8 more)

### Community 62 - "formatNumber"
Cohesion: 0.14
Nodes (16): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, formatBytes(), formatUptime(), ServerDashboard() (+8 more)

### Community 63 - "authz.ts"
Cohesion: 0.24
Nodes (15): GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, DebugBar(), AS_MEMBER_COOKIE, DEBUG_COOKIE (+7 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

### Community 67 - "MailForm"
Cohesion: 0.18
Nodes (6): byStatusThenName(), MailForm(), useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 68 - "mail/page.tsx"
Cohesion: 0.18
Nodes (10): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage() (+2 more)

### Community 69 - "membershipTermination.ts"
Cohesion: 0.29
Nodes (7): berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate(), pruneArchivedFees()

### Community 71 - "login/page.tsx"
Cohesion: 0.31
Nodes (6): dynamic, LoginPage(), metadata, NOTICES, Props, internalPath()

### Community 72 - "TypeSparklines.tsx"
Cohesion: 0.36
Nodes (7): sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 76 - "eventService.ts"
Cohesion: 0.10
Nodes (36): EditBlogPage(), createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), AdminEventsPage(), UPCOMING_ALERT_MONTHS, createEvent() (+28 more)

### Community 77 - "requireDebugAdmin"
Cohesion: 0.23
Nodes (9): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, triggerDeploy(), ServerPage(), DeploySection(), isFeatureFlagKey(), requireDebugAdmin() (+1 more)

### Community 78 - "ApplicationList.tsx"
Cohesion: 0.29
Nodes (4): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META

### Community 79 - "app/vorstand/page.tsx"
Cohesion: 0.47
Nodes (4): getInitials(), metadata, VorstandPage(), boardPhotoUrl()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 85 - "mitgliedsantraege/page.tsx"
Cohesion: 0.14
Nodes (20): dynamic, MembershipApplicationsPage(), metadata, dynamic, metadata, SatzungPage(), FeeDefaultEntry, planApplicationFees() (+12 more)

### Community 87 - "ref_node_assert"
Cohesion: 0.14
Nodes (10): ref_node_assert, ref_node_test, sharp, ImageBytes, processBlogImage(), ProcessedBlogImage, QUALITY_LADDER, SUMMER (+2 more)

### Community 92 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 93 - "AppError"
Cohesion: 0.10
Nodes (42): zod, markContactRequestHandled(), removeContactRequest(), requestEmailChangeAction(), confirmMembershipTermination(), deleteOwnAccount(), disableOwnAccount(), mailLater() (+34 more)

### Community 96 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 99 - "userService.ts"
Cohesion: 0.17
Nodes (25): bcryptjs, POST(), EMAIL_CHANGE_ERRORS, requestPasswordChange(), passwordResetMessage(), globalForPrisma, prisma, getSecurityLogPepper() (+17 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **424 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+419 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 544 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `BankDetailsForm.tsx`, `ApplicationWizard.tsx`, `react`, `blog/actions.ts`, `requireAdmin`, `app/blog/[id]/page.tsx`, `serverStatus.ts`, `blogService.ts`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `MemberDirectory.tsx`, `package.json`, `DebugBar.tsx`, `MailForm.tsx`, `app/layout.tsx`, `mitglied-werden/page.tsx`, `forgot-password/layout.tsx`, `sendEmail`, `dashboard/page.tsx`, `mail/actions.ts`, `app/page.tsx`, `EditUserForm.tsx`, `users/[id]/page.tsx`, `index.ts`, `lucide-react`, `rateLimitService.ts`, `datenschutz/page.tsx`, `mitgliedsantraege/actions.ts`, `BlogImageManager.tsx`, `app/termine/page.tsx`, `mitglied-werden/actions.ts`, `users/page.tsx`, `registerAction.ts`, `DirectoryTable.tsx`, `sepa/route.ts`, `authz.ts`, `getOptionalUser`, `mail/page.tsx`, `login/page.tsx`, `eventService.ts`, `requireDebugAdmin`, `app/vorstand/page.tsx`, `mitgliedsantraege/page.tsx`, `AppError`, `userService.ts`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.178) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `BankDetailsForm.tsx`, `ApplicationWizard.tsx`, `react`, `app/blog/[id]/page.tsx`, `events.ts`, `MemberDirectory.tsx`, `package.json`, `DebugBar.tsx`, `MailForm.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `dashboard/page.tsx`, `app/page.tsx`, `EditUserForm.tsx`, `users/[id]/page.tsx`, `index.ts`, `next`, `BlogImageManager.tsx`, `app/termine/page.tsx`, `users/page.tsx`, `DirectoryTable.tsx`, `formatNumber`, `RegistrationFunnel.tsx`, `ApplicationList.tsx`, `app/vorstand/page.tsx`, `mitgliedsantraege/page.tsx`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `BankDetailsForm.tsx`, `ApplicationWizard.tsx`, `app/blog/[id]/page.tsx`, `MarketDiffusion.tsx`, `BulkImport.tsx`, `MemberDirectory.tsx`, `package.json`, `DebugBar.tsx`, `MailForm.tsx`, `app/layout.tsx`, `normalizeIban`, `dashboard/page.tsx`, `EditUserForm.tsx`, `users/[id]/page.tsx`, `index.ts`, `lucide-react`, `next`, `BlogImageManager.tsx`, `users/page.tsx`, `DirectoryTable.tsx`, `requireDebugAdmin`, `ApplicationList.tsx`, `altcha.d.ts`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _424 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07396870554765292 - nodes in this community are weakly interconnected._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.08391608391608392 - nodes in this community are weakly interconnected._