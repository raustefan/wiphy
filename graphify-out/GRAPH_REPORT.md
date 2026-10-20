# Graph Report - wiphy  (2026-10-20)

## Corpus Check
- 353 files · ~162,122 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 1982 nodes · 6470 edges · 94 communities (84 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 45 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3a552304`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- sepa/route.ts
- ApplicationWizard.tsx
- blog/actions.ts
- MailForm.tsx
- ics.ts
- app/page.tsx
- serverStatus.ts
- index.ts
- blogService.ts
- security/page.tsx
- events.ts
- react
- MarketDiffusion.tsx
- feeService.ts
- userService.ts
- package.json
- dependencies
- boardService.ts
- feeDefaults.ts
- schemas.ts
- seed.ts
- formatEuro
- app/blog/[id]/page.tsx
- MemberDirectory.tsx
- OutcomeTimeline.tsx
- login/page.tsx
- gravityPhysics.ts
- messages.ts
- DebugBar.tsx
- mailService.ts
- normalizeIban
- mitgliedsantraege/page.tsx
- mitgliedsantraege/actions.ts
- KosmosTimeline.tsx
- satzung/page.tsx
- dashboard/page.tsx
- compilerOptions
- devDependencies
- cn
- ref_node_fs
- altcha.ts
- passwordStrength.ts
- BulkImport.tsx
- Callout
- berlinTime.ts
- sendEmail
- AppError
- ApplicationList.tsx
- RateLimitTable
- EditUserForm.tsx
- ActivityHeatmap.tsx
- securityEventService.ts
- zahlungen/pdf/route.ts
- ref_node_assert
- EmailBodyField.tsx
- app/termine/page.tsx
- EditUserForm
- ApplicationList
- MarkdownViewer.tsx
- slug.ts
- userUpdateData.ts
- format.ts
- app/blog/page.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- mail/page.tsx
- securityLabels.ts
- PhysicsTimeline.tsx
- HeaderChrome.tsx
- CLAUDE.md
- contactSpam.ts
- server/actions.ts
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- ServerDashboard.tsx
- sessionPolicy.test.ts
- Footer.tsx
- altcha.d.ts
- featureFlagService.ts
- auth
- postcss.config.mjs
- DeleteMemberSection
- createUserAction
- dashboard/kontakt/page.tsx
- { GET, POST }
- verify-email/layout.tsx
- executeAction
- RegistrationFunnel.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 123 edges
2. `AppError` - 86 edges
3. `cn()` - 85 edges
4. `lucide-react` - 82 edges
5. `react` - 73 edges
6. `executeAction()` - 73 edges
7. `requireAdmin()` - 56 edges
8. `isFeatureEnabled()` - 50 edges
9. `Button()` - 45 edges
10. `formatDate()` - 39 edges

## Surprising Connections (you probably didn't know these)
- `Befunde vom 2026-10-20` --references--> `siteUrl()`  [INFERRED]
  BETRIEB.md → src/lib/server/siteUrl.ts
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `BlogIndexPage()` --calls--> `getPublishedPostPage()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/server/services/blogService.ts
- `EmailChangeForm()` --indirect_call--> `requestEmailChangeAction()`  [INFERRED]
  src/app/dashboard/konto/AccessForms.tsx → src/app/dashboard/konto/actions.ts

## Import Cycles
- None detected.

## Communities (94 total, 10 thin omitted)

### Community 0 - "next"
Cohesion: 0.08
Nodes (23): nextConfig, next, GET(), GET(), POST(), GET(), GET(), DashboardLayout() (+15 more)

### Community 1 - "sepa/route.ts"
Cohesion: 0.24
Nodes (15): field(), POST(), SepaDialog(), TIME_ZONE, agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId() (+7 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (28): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, ageAt(), CONSENT_VERSION, DATENSCHUTZ_URL (+20 more)

### Community 3 - "blog/actions.ts"
Cohesion: 0.17
Nodes (22): beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager(), handleDrop() (+14 more)

### Community 4 - "MailForm.tsx"
Cohesion: 0.13
Nodes (13): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, EmailBodyField(), useEmailEditor() (+5 more)

### Community 5 - "ics.ts"
Cohesion: 0.27
Nodes (14): RFC-5545, icsEnd(), addDays(), berlinDateStamp(), calendar(), describe(), escapeText(), foldLine() (+6 more)

### Community 6 - "app/page.tsx"
Cohesion: 0.15
Nodes (17): LeadPost(), AdminBlogPage(), HomePage(), levels, STRIP_IDS, STUDY_PROGRAMS, tone(), BlogGallery() (+9 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.11
Nodes (26): ref_node_os, ServerPage(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG, DEPLOY_SCRIPT (+18 more)

### Community 8 - "index.ts"
Cohesion: 0.10
Nodes (32): lucide-react, InfoTooltip(), RateLimitTableProps, chipTones, GROUPS, SortKey, StatusChip(), FeeDefaultRow (+24 more)

### Community 9 - "blogService.ts"
Cohesion: 0.08
Nodes (40): sharp, EditBlogPage(), MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, processBlogImage(), ProcessedBlogImage, QUALITY_LADDER, BlogImageRow (+32 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.22
Nodes (12): dynamic, metadata, SecurityPage(), TypeSparklines(), getPendingRegistrationStats(), UNVERIFIED_TTL_HOURS, bucketFromKey(), getRateLimitEntries() (+4 more)

### Community 11 - "events.ts"
Cohesion: 0.11
Nodes (37): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard() (+29 more)

### Community 12 - "react"
Cohesion: 0.10
Nodes (26): react, DeletePostButton(), ContactRequestItem, dateFormat, TerminationItem, DeleteEventButton(), ActionResult, Mode (+18 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (33): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+25 more)

### Community 14 - "feeService.ts"
Cohesion: 0.14
Nodes (26): DialogButton(), metadata, StatTile(), UserManagementPage(), directoryStats(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears() (+18 more)

### Community 15 - "userService.ts"
Cohesion: 0.09
Nodes (47): bcryptjs, ref_crypto, zod, KontoPage(), importRowsSchema, requestPasswordReset(), resetSchema, AccountDisabledError (+39 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): eslintConfig, name, packageManager, private, version, altcha, babel-plugin-react-compiler, eslint (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (26): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+18 more)

### Community 18 - "boardService.ts"
Cohesion: 0.06
Nodes (50): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), DATENSCHUTZ, metadata, impressum() (+42 more)

### Community 19 - "feeDefaults.ts"
Cohesion: 0.18
Nodes (13): FeeDefaultEntry, FeeRates, resolveFeeDefault(), FALLBACK_FEE_DEFAULT, deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeRatesForYear() (+5 more)

### Community 20 - "schemas.ts"
Cohesion: 0.08
Nodes (20): AdminCreateUserInput, berlinDateTime(), boardDeleteSchema, boardMoveSchema, boardSaveSchema, contactSchema, emailChangeSchema, emailField (+12 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "formatEuro"
Cohesion: 0.17
Nodes (12): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), explainFee() (+4 more)

### Community 23 - "app/blog/[id]/page.tsx"
Cohesion: 0.11
Nodes (23): escapeXml(), GET(), generateMetadata(), Props, PublicBlogPost(), src_app_globals, body, metadata (+15 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.15
Nodes (20): DirectoryAccount, MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase, DirectoryFilters, EMPTY_FILTERS, FILTER_VALUES (+12 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.17
Nodes (17): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+9 more)

### Community 26 - "login/page.tsx"
Cohesion: 0.31
Nodes (6): dynamic, LoginPage(), metadata, NOTICES, Props, internalPath()

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "messages.ts"
Cohesion: 0.08
Nodes (43): MetaLine(), AccountSection(), blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailMessage, EmailSignature (+35 more)

### Community 29 - "DebugBar.tsx"
Cohesion: 0.16
Nodes (16): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), commit, DebugBar(), LINKS (+8 more)

### Community 30 - "mailService.ts"
Cohesion: 0.12
Nodes (25): sanitize-html, parseMailForm(), sendEmailAction(), parseDirectMailForm(), sendDirectMailAction(), ENTITIES, htmlToText(), AnnouncedEvent (+17 more)

### Community 31 - "normalizeIban"
Cohesion: 0.25
Nodes (17): SummaryBlock(), ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic() (+9 more)

### Community 32 - "mitgliedsantraege/page.tsx"
Cohesion: 0.10
Nodes (27): confirmMembershipTermination(), dynamic, MembershipApplicationsPage(), metadata, statusMeta(), TerminationList(), confirm(), EditUserPage() (+19 more)

### Community 33 - "mitgliedsantraege/actions.ts"
Cohesion: 0.16
Nodes (21): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), countOpenApplications(), deleteApplication(), findApplicationById(), findApplications(), findOpenApplication() (+13 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.12
Nodes (25): setKosmosVisibilityAction(), KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen() (+17 more)

### Community 35 - "satzung/page.tsx"
Cohesion: 0.13
Nodes (26): FeeDefaultsCard(), run(), save(), updateBankDetails(), BankDetailsForm(), submit(), ApplicationWizard(), currentFormValues() (+18 more)

### Community 36 - "dashboard/page.tsx"
Cohesion: 0.06
Nodes (51): GET(), byStatusThenName(), MailForm(), MailSuccessDialog(), ADMIN_ACTIONS, DashboardPage(), getStatusIcon(), ProfileSummary() (+43 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "cn"
Cohesion: 0.08
Nodes (31): metadata, CtaCard(), DashboardPageHeader(), DashboardPageHeaderProps, MembershipCertificateCard(), SectionHeader(), metadata, dynamic (+23 more)

### Community 40 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 41 - "altcha.ts"
Cohesion: 0.14
Nodes (20): altcha-lib, server-only, GET(), message(), dynamic, KontaktPage(), metadata, createPrismaClient() (+12 more)

### Community 42 - "passwordStrength.ts"
Cohesion: 0.31
Nodes (7): evaluatePassword(), generatePassword(), PasswordCriterion, PasswordScore, PasswordStrength, SCORE_LABELS, WEAK_PATTERNS

### Community 43 - "BulkImport.tsx"
Cohesion: 0.22
Nodes (10): bulkCreateUsersAction(), ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row (+2 more)

### Community 44 - "Callout"
Cohesion: 0.08
Nodes (37): next-auth, EventFormData, ForgotPasswordPage(), ContactForm(), createLoginChallenge(), FaqItem, LoginFaq(), SECTIONS (+29 more)

### Community 45 - "berlinTime.ts"
Cohesion: 0.32
Nodes (13): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+5 more)

### Community 46 - "sendEmail"
Cohesion: 0.19
Nodes (20): resendVerificationEmail(), registerUser(), resetPassword(), notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), passwordChangedNoticeMessage() (+12 more)

### Community 47 - "AppError"
Cohesion: 0.14
Nodes (33): EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), revealKosmosEmailAction(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema (+25 more)

### Community 48 - "ApplicationList.tsx"
Cohesion: 0.15
Nodes (9): @uiw/react-md-editor, metadata, ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, MarkdownEditor(), MDEditor (+1 more)

### Community 49 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 50 - "EditUserForm.tsx"
Cohesion: 0.08
Nodes (22): EmailChangeForm(), PasswordChangeButton(), dynamic, metadata, ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP (+14 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.17
Nodes (16): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview() (+8 more)

### Community 53 - "zahlungen/pdf/route.ts"
Cohesion: 0.33
Nodes (7): @react-pdf/renderer, GET(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee

### Community 54 - "ref_node_assert"
Cohesion: 0.22
Nodes (6): ref_node_assert, ref_node_net, ref_node_test, addressKey(), HeaderBag, base

### Community 55 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 56 - "app/termine/page.tsx"
Cohesion: 0.19
Nodes (13): sitemap(), GET(), dynamic, metadata, SearchParams, TerminePage(), ViewSwitch(), CALENDAR_ICS_PATH (+5 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 59 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 60 - "slug.ts"
Cohesion: 0.23
Nodes (9): GET(), buildEventIcs(), icsFileName(), GERMAN_LETTERS, idFromSegment(), safeDecode(), slugify(), slugSegment() (+1 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "format.ts"
Cohesion: 0.13
Nodes (17): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+9 more)

### Community 63 - "app/blog/page.tsx"
Cohesion: 0.10
Nodes (21): BlogIndexPage(), generateMetadata(), PostRow(), Props, facts, metadata, metadata, getInitials() (+13 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "mail/page.tsx"
Cohesion: 0.15
Nodes (14): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, SentMailInput (+6 more)

### Community 67 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 68 - "PhysicsTimeline.tsx"
Cohesion: 0.27
Nodes (6): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline()

### Community 69 - "HeaderChrome.tsx"
Cohesion: 0.22
Nodes (10): toggleAllDay(), toDateTimeValue(), toDayValue(), Header(), HeaderChrome(), links, useSwipeToClose(), end() (+2 more)

### Community 71 - "contactSpam.ts"
Cohesion: 0.24
Nodes (7): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ContactInput, scoreSpam(), SPAM_KEYWORDS, legitimate

### Community 72 - "server/actions.ts"
Cohesion: 0.33
Nodes (8): removeRateLimitEntry(), requestBackupLink(), triggerDeploy(), backupLinkMessage(), requireDebugAdmin(), startDeploy(), BACKUP_LINK_MINUTES, deleteRateLimitEntry()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.13
Nodes (28): EditEventPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findEventById(), findEventOptions(), findLatestPastEvent() (+20 more)

### Community 77 - "ServerDashboard.tsx"
Cohesion: 0.27
Nodes (7): BackupSection(), DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel()

### Community 78 - "sessionPolicy.test.ts"
Cohesion: 0.60
Nodes (3): now(), ADMIN_SESSION_MAX_MS, adminSessionExpired()

### Community 79 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "featureFlagService.ts"
Cohesion: 0.17
Nodes (16): @prisma/client, POST(), setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), metadata, FEATURE_FLAG_CATEGORIES (+8 more)

### Community 82 - "auth"
Cohesion: 0.83
Nodes (3): GET(), auth, getAppLogs()

### Community 86 - "createUserAction"
Cohesion: 0.67
Nodes (3): createUserAction(), NewUserForm(), handleSubmit()

### Community 87 - "dashboard/kontakt/page.tsx"
Cohesion: 0.24
Nodes (11): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), ContactRequestsPage(), dynamic, metadata (+3 more)

### Community 93 - "executeAction"
Cohesion: 0.14
Nodes (37): createDraft(), deletePost(), savePost(), removeMembershipApplication(), createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction() (+29 more)

### Community 94 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **445 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+440 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 570 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `sepa/route.ts`, `ApplicationWizard.tsx`, `blog/actions.ts`, `MailForm.tsx`, `app/page.tsx`, `index.ts`, `security/page.tsx`, `events.ts`, `react`, `MarketDiffusion.tsx`, `feeService.ts`, `userService.ts`, `package.json`, `boardService.ts`, `app/blog/[id]/page.tsx`, `MemberDirectory.tsx`, `login/page.tsx`, `gravityPhysics.ts`, `DebugBar.tsx`, `mitgliedsantraege/page.tsx`, `mitgliedsantraege/actions.ts`, `KosmosTimeline.tsx`, `satzung/page.tsx`, `dashboard/page.tsx`, `cn`, `altcha.ts`, `Callout`, `sendEmail`, `AppError`, `ApplicationList.tsx`, `EditUserForm.tsx`, `zahlungen/pdf/route.ts`, `app/termine/page.tsx`, `slug.ts`, `app/blog/page.tsx`, `mail/page.tsx`, `HeaderChrome.tsx`, `server/actions.ts`, `Footer.tsx`, `featureFlagService.ts`, `auth`, `dashboard/kontakt/page.tsx`, `verify-email/layout.tsx`, `executeAction`?**
  _High betweenness centrality (0.220) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `next`, `ApplicationWizard.tsx`, `MailForm.tsx`, `app/page.tsx`, `index.ts`, `blogService.ts`, `MarketDiffusion.tsx`, `feeService.ts`, `package.json`, `boardService.ts`, `app/blog/[id]/page.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `DebugBar.tsx`, `normalizeIban`, `KosmosTimeline.tsx`, `dashboard/page.tsx`, `cn`, `BulkImport.tsx`, `Callout`, `ApplicationList.tsx`, `EditUserForm.tsx`, `app/blog/page.tsx`, `PhysicsTimeline.tsx`, `HeaderChrome.tsx`, `eventService.ts`, `ServerDashboard.tsx`, `Footer.tsx`, `altcha.d.ts`, `featureFlagService.ts`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `index.ts` to `ApplicationWizard.tsx`, `MailForm.tsx`, `app/page.tsx`, `security/page.tsx`, `events.ts`, `react`, `MarketDiffusion.tsx`, `feeService.ts`, `package.json`, `app/blog/[id]/page.tsx`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `gravityPhysics.ts`, `DebugBar.tsx`, `mitgliedsantraege/page.tsx`, `KosmosTimeline.tsx`, `dashboard/page.tsx`, `cn`, `Callout`, `ApplicationList.tsx`, `EditUserForm.tsx`, `format.ts`, `app/blog/page.tsx`, `HeaderChrome.tsx`, `ServerDashboard.tsx`, `Footer.tsx`, `featureFlagService.ts`, `dashboard/kontakt/page.tsx`, `RegistrationFunnel.tsx`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _445 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.08076923076923077 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08235294117647059 - nodes in this community are weakly interconnected._