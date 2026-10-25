# Graph Report - wiphy  (2026-10-25)

## Corpus Check
- 363 files · ~174,310 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2074 nodes · 6848 edges · 93 communities (79 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e5480ddf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- forgot-password/layout.tsx
- normalizeIban
- index.ts
- mitglied-werden/page.tsx
- boardService.ts
- getOptionalUser
- executeAction
- serverStatus.ts
- ServerDashboard.tsx
- blogService.ts
- zertifikat/pdf/route.ts
- events.ts
- ics.ts
- MarketDiffusion.tsx
- formatNumber
- LegalPage.tsx
- package.json
- dependencies
- requireAdmin
- sendEmail
- schemas.ts
- seed.ts
- dashboard/page.tsx
- app/layout.tsx
- MemberDirectory.tsx
- securityEventService.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- feeService.ts
- DebugBar.tsx
- ApplicationWizard.tsx
- blog/actions.ts
- convert_alumni.py
- vorstand/actions.ts
- KosmosTimeline.tsx
- app/page.tsx
- messages.ts
- compilerOptions
- devDependencies
- next
- isDebugMode
- prisma.ts
- mail/page.tsx
- feeDefaultService.ts
- @hugeicons/core-free-icons
- membership.ts
- mailService.ts
- AppError
- format.ts
- EmailBodyField.tsx
- ApplicationList
- EditUserForm.tsx
- security/page.tsx
- userService.ts
- EditUserForm
- boardImages.ts
- MarkdownViewer.tsx
- berlinTime.ts
- isFeatureEnabled
- Footer.tsx
- userUpdateData.ts
- RateLimitTable
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- auth.ts
- BulkImport.tsx
- MailForm.tsx
- app/blog/[id]/page.tsx
- CLAUDE.md
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- BankDetailsForm.tsx
- ContactRequestList.tsx
- altcha.d.ts
- DeleteMemberSection
- ActivityHeatmap.tsx
- postcss.config.mjs
- requireDebugAdmin
- opengraph-image.tsx
- ref_node_assert
- { GET, POST }
- geschichte/page.tsx
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- eslint.config.mjs

## God Nodes (most connected - your core abstractions)
1. `next` - 124 edges
2. `cn()` - 89 edges
3. `AppError` - 86 edges
4. `@hugeicons/core-free-icons` - 84 edges
5. `@hugeicons/react` - 84 edges
6. `react` - 74 edges
7. `executeAction()` - 73 edges
8. `requireAdmin()` - 56 edges
9. `isFeatureEnabled()` - 50 edges
10. `Button()` - 45 edges

## Surprising Connections (you probably didn't know these)
- `Befunde vom 2026-10-20` --references--> `siteUrl()`  [INFERRED]
  BETRIEB.md → src/lib/server/siteUrl.ts
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `EmailChangeForm()` --indirect_call--> `requestEmailChangeAction()`  [INFERRED]
  src/app/dashboard/konto/AccessForms.tsx → src/app/dashboard/konto/actions.ts

## Import Cycles
- None detected.

## Communities (93 total, 14 thin omitted)

### Community 1 - "normalizeIban"
Cohesion: 0.17
Nodes (26): field(), POST(), isSepaIban(), isValidBic(), isValidIban(), normalizeIban(), requiresBic(), addDirectDebitIssues() (+18 more)

### Community 2 - "index.ts"
Cohesion: 0.07
Nodes (46): CtaCard(), InfoTooltip(), RateLimitTableProps, chipTones, GROUPS, SortKey, StatusChip(), FeeDefaultRow (+38 more)

### Community 3 - "mitglied-werden/page.tsx"
Cohesion: 0.07
Nodes (34): ContactForm(), dynamic, KontaktPage(), metadata, createLoginChallenge(), LoginForm(), dynamic, LoginPage() (+26 more)

### Community 4 - "boardService.ts"
Cohesion: 0.15
Nodes (24): moveMemberOrder(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember(), deleteMemberById(), deletePhoto() (+16 more)

### Community 5 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

### Community 6 - "executeAction"
Cohesion: 0.12
Nodes (33): zod, EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), revealKosmosEmailAction(), setKosmosVisibilityAction(), removeMembershipApplication(), deleteOwnAccount(), disableOwnAccount() (+25 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.11
Nodes (27): ref_node_os, ServerPage(), BackupRun, BackupStatus, cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK (+19 more)

### Community 8 - "ServerDashboard.tsx"
Cohesion: 0.08
Nodes (27): EmailChangeForm(), PasswordChangeButton(), dynamic, KontoPage(), metadata, triggerDeploy(), BackupHistory(), BackupSection() (+19 more)

### Community 9 - "blogService.ts"
Cohesion: 0.08
Nodes (40): POST(), BlogIndexPage(), BlogImageVariant, MAX_BLOG_IMAGE_UPLOAD_BYTES, MAX_BLOG_IMAGES, ImageBytes, processBlogImage(), ProcessedBlogImage (+32 more)

### Community 10 - "zertifikat/pdf/route.ts"
Cohesion: 0.17
Nodes (22): GET(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDuration() (+14 more)

### Community 11 - "events.ts"
Cohesion: 0.10
Nodes (40): dynamic, EventDetailPage(), generateMetadata(), Props, dynamic, metadata, SearchParams, TerminePage() (+32 more)

### Community 12 - "ics.ts"
Cohesion: 0.15
Nodes (21): RFC-5545, GET(), GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs() (+13 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.11
Nodes (31): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), deriv() (+23 more)

### Community 14 - "formatNumber"
Cohesion: 0.13
Nodes (17): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+9 more)

### Community 15 - "LegalPage.tsx"
Cohesion: 0.15
Nodes (14): DATENSCHUTZ, metadata, impressum(), ImpressumPage(), metadata, SATZUNG, anchorOf(), Block() (+6 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "requireAdmin"
Cohesion: 0.18
Nodes (22): createDraft(), deletePost(), savePost(), createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), deleteFeeDefaultYear() (+14 more)

### Community 19 - "sendEmail"
Cohesion: 0.17
Nodes (20): requestBackupLink(), resendVerificationEmail(), notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), backupLinkMessage(), emailChangedNoticeMessage(), getMailTransporter() (+12 more)

### Community 20 - "schemas.ts"
Cohesion: 0.04
Nodes (61): toCountryCode(), hasControlChars(), isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS (+53 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "dashboard/page.tsx"
Cohesion: 0.09
Nodes (26): MailSuccessDialog(), MembershipCertificateCard(), MembershipApplicationsPage(), ADMIN_ACTIONS, DashboardPage(), QueryParamDialog(), SectionHeader(), DashboardEvent (+18 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.11
Nodes (20): escapeXml(), GET(), src_app_globals, body, metadata, mono, serif, InstallHint() (+12 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.09
Nodes (31): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryAccount, DirectoryTable(), selectAllWithOpenFees(), displayName() (+23 more)

### Community 25 - "securityEventService.ts"
Cohesion: 0.18
Nodes (15): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview(), HeatCell (+7 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.16
Nodes (18): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+10 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "feeService.ts"
Cohesion: 0.10
Nodes (34): @react-pdf/renderer, GET(), formatAddress(), calculateFeeAmount(), FeeBreakdown, SepaDebtorAddress, PaymentHistoryPdf(), PdfUser (+26 more)

### Community 29 - "DebugBar.tsx"
Cohesion: 0.13
Nodes (18): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), commit, DebugBar(), LINKS (+10 more)

### Community 30 - "ApplicationWizard.tsx"
Cohesion: 0.09
Nodes (26): display(), EntryDetails(), InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock() (+18 more)

### Community 31 - "blog/actions.ts"
Cohesion: 0.21
Nodes (19): beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager(), handleDrop() (+11 more)

### Community 32 - "convert_alumni.py"
Cohesion: 0.26
Nodes (12): datetime, json, re, admin_note(), convert(), day(), main(), phone() (+4 more)

### Community 33 - "vorstand/actions.ts"
Cohesion: 0.25
Nodes (13): deleteMember(), deletePhotoAction(), moveMemberInList(), revalidateBoard(), saveMember(), BoardPhotoUploader(), handleDelete(), handleDrop() (+5 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (21): KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen(), years() (+13 more)

### Community 35 - "app/page.tsx"
Cohesion: 0.18
Nodes (13): PostRow(), levels, STRIP_IDS, STUDY_PROGRAMS, tone(), sitemap(), InterferenceField, blogPostPath() (+5 more)

### Community 36 - "messages.ts"
Cohesion: 0.27
Nodes (12): accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage(), feeReminderMessage(), greeting(), LINK_EXPIRY(), loginDisabledMessage(), membershipApprovedMessage() (+4 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "next"
Cohesion: 0.08
Nodes (43): nextConfig, next, DeletePostButton(), metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+35 more)

### Community 40 - "isDebugMode"
Cohesion: 0.44
Nodes (7): GET(), GET(), auth, isDebugMode(), getAppLogs(), getDeployStatus(), stripAnsi()

### Community 41 - "prisma.ts"
Cohesion: 0.16
Nodes (19): server-only, GET(), message(), submitContactRequest(), contactRequestMessage(), createPrismaClient(), globalForPrisma, consumeAltchaSolution() (+11 more)

### Community 42 - "mail/page.tsx"
Cohesion: 0.18
Nodes (12): MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata (+4 more)

### Community 43 - "feeDefaultService.ts"
Cohesion: 0.46
Nodes (6): deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeRatesForYear(), removeFeeDefault(), setFeeDefault()

### Community 44 - "@hugeicons/core-free-icons"
Cohesion: 0.09
Nodes (39): @hugeicons/core-free-icons, @hugeicons/react, next-auth, react, TerminationItem, ActionResult, Mode, OwnTermination (+31 more)

### Community 45 - "membership.ts"
Cohesion: 0.15
Nodes (13): ageAt(), CONSENT_VERSION, DATENSCHUTZ_URL, isOldEnough(), MEMBERSHIP_JOURNEY_MARKER, MIN_APPLICANT_AGE, MINOR_HINT, REGISTERED_PATH (+5 more)

### Community 46 - "mailService.ts"
Cohesion: 0.06
Nodes (52): sanitize-html, parseMailForm(), sendEmailAction(), blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailMessage (+44 more)

### Community 47 - "AppError"
Cohesion: 0.12
Nodes (34): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), submitMembershipApplication(), withdrawMembershipApplication(), membershipApplicationNoticeMessage(), membershipReceivedMessage() (+26 more)

### Community 49 - "format.ts"
Cohesion: 0.13
Nodes (18): AdminBlogPage(), statusMeta(), TerminationList(), confirm(), AccountSection(), terminationNoticeMessage(), terminationReceivedMessage(), DATE_TIME (+10 more)

### Community 50 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 51 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 52 - "EditUserForm.tsx"
Cohesion: 0.07
Nodes (27): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue() (+19 more)

### Community 53 - "security/page.tsx"
Cohesion: 0.19
Nodes (13): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+5 more)

### Community 54 - "userService.ts"
Cohesion: 0.16
Nodes (26): bcryptjs, requestPasswordChange(), requestPasswordReset(), passwordResetMessage(), prisma, normalizeEmail(), PendingRegistrationStats, pruneUnverifiedRegistrations() (+18 more)

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "boardImages.ts"
Cohesion: 0.25
Nodes (6): ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, ProcessedBoardPhoto, QUALITY_LADDER

### Community 57 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 58 - "berlinTime.ts"
Cohesion: 0.26
Nodes (15): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+7 more)

### Community 59 - "isFeatureEnabled"
Cohesion: 0.17
Nodes (16): @prisma/client, POST(), setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, resetPassword(), resetSchema, passwordChangedNoticeMessage() (+8 more)

### Community 60 - "Footer.tsx"
Cohesion: 0.15
Nodes (13): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), Header(), PluckedString(), getSession (+5 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 63 - "Site.tsx"
Cohesion: 0.16
Nodes (12): AdminBoardPage(), metadata, getInitials(), metadata, VorstandPage(), LorenzAttractor, Cta(), CtaProps (+4 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "auth.ts"
Cohesion: 0.11
Nodes (20): ref_crypto, ref_node_net, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError (+12 more)

### Community 67 - "BulkImport.tsx"
Cohesion: 0.06
Nodes (37): byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, bulkCreateUsersAction(), createUserAction(), ImportIssue (+29 more)

### Community 68 - "MailForm.tsx"
Cohesion: 0.13
Nodes (12): MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, EmailBodyField(), useEmailEditor(), EmailComposerDialog() (+4 more)

### Community 69 - "app/blog/[id]/page.tsx"
Cohesion: 0.15
Nodes (20): generateMetadata(), Props, PublicBlogPost(), generateMetadata(), LeadPost(), MetaLine(), Props, HomePage() (+12 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.12
Nodes (30): EditBlogPage(), AdminEventsPage(), formatEventShort(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents() (+22 more)

### Community 77 - "BankDetailsForm.tsx"
Cohesion: 0.11
Nodes (34): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), BankValues, ZahlungenPage(), PaymentHistoryTable() (+26 more)

### Community 78 - "ContactRequestList.tsx"
Cohesion: 0.14
Nodes (16): markContactRequestHandled(), removeContactRequest(), ContactRequestItem, ContactRequestList(), confirmDelete(), run(), dateFormat, MAX_MESSAGE_LENGTH (+8 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 82 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 85 - "requireDebugAdmin"
Cohesion: 0.21
Nodes (12): FeatureFlagsPage(), removeRateLimitEntry(), SecurityPage(), requireDebugAdmin(), getPendingRegistrationStats(), bucketFromKey(), deleteRateLimitEntry(), getRateLimitEntries() (+4 more)

### Community 86 - "opengraph-image.tsx"
Cohesion: 0.20
Nodes (8): ref_node_fs, sharp, BACKGROUND, icon(), main(), alt, contentType, size

### Community 87 - "ref_node_assert"
Cohesion: 0.17
Nodes (10): ref_node_assert, ref_node_test, berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate() (+2 more)

### Community 91 - "geschichte/page.tsx"
Cohesion: 0.19
Nodes (8): categories, events, TimelineCategory, TimelineEvent, facts, metadata, categoryLabel, PhysicsTimeline()

### Community 95 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **467 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+462 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 600 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `forgot-password/layout.tsx`, `normalizeIban`, `index.ts`, `mitglied-werden/page.tsx`, `getOptionalUser`, `executeAction`, `ServerDashboard.tsx`, `blogService.ts`, `zertifikat/pdf/route.ts`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `LegalPage.tsx`, `package.json`, `requireAdmin`, `sendEmail`, `dashboard/page.tsx`, `app/layout.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `feeService.ts`, `DebugBar.tsx`, `ApplicationWizard.tsx`, `blog/actions.ts`, `vorstand/actions.ts`, `KosmosTimeline.tsx`, `app/page.tsx`, `isDebugMode`, `prisma.ts`, `mail/page.tsx`, `@hugeicons/core-free-icons`, `mailService.ts`, `AppError`, `EditUserForm.tsx`, `security/page.tsx`, `userService.ts`, `isFeatureEnabled`, `Footer.tsx`, `Site.tsx`, `MailForm.tsx`, `app/blog/[id]/page.tsx`, `BankDetailsForm.tsx`, `ContactRequestList.tsx`, `requireDebugAdmin`, `opengraph-image.tsx`, `geschichte/page.tsx`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.199) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/core-free-icons` to `index.ts`, `ServerDashboard.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `LegalPage.tsx`, `package.json`, `dashboard/page.tsx`, `app/layout.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `ApplicationWizard.tsx`, `blog/actions.ts`, `KosmosTimeline.tsx`, `next`, `EditUserForm.tsx`, `isFeatureEnabled`, `Footer.tsx`, `Site.tsx`, `BulkImport.tsx`, `MailForm.tsx`, `app/blog/[id]/page.tsx`, `eventService.ts`, `BankDetailsForm.tsx`, `ContactRequestList.tsx`, `altcha.d.ts`, `geschichte/page.tsx`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `@hugeicons/core-free-icons` connect `@hugeicons/core-free-icons` to `index.ts`, `mitglied-werden/page.tsx`, `ServerDashboard.tsx`, `events.ts`, `formatNumber`, `package.json`, `dashboard/page.tsx`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `gravityPhysics.ts`, `DebugBar.tsx`, `ApplicationWizard.tsx`, `blog/actions.ts`, `KosmosTimeline.tsx`, `next`, `EditUserForm.tsx`, `security/page.tsx`, `Footer.tsx`, `Site.tsx`, `BulkImport.tsx`, `MailForm.tsx`, `app/blog/[id]/page.tsx`, `BankDetailsForm.tsx`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _467 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07355242566510173 - nodes in this community are weakly interconnected._
- **Should `mitglied-werden/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07293868921775898 - nodes in this community are weakly interconnected._