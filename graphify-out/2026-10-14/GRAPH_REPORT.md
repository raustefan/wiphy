# Graph Report - wiphy  (2026-10-13)

## Corpus Check
- 341 files · ~156,198 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1926 nodes · 6253 edges · 91 communities (79 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `876da0f8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- rateLimitService.ts
- ApplicationWizard.tsx
- HeaderChrome.tsx
- mitgliedsantraege/actions.ts
- boardService.ts
- app/blog/[id]/page.tsx
- serverStatus.ts
- prisma.ts
- blogService.ts
- security/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- EmailComposerDialog
- registerAction.ts
- package.json
- dependencies
- mailService.ts
- errors.ts
- schemas.ts
- seed.ts
- DeleteMemberSection
- app/layout.tsx
- MemberDirectory.tsx
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- gravityPhysics.ts
- authz.ts
- getOptionalUser
- DirectoryTable.tsx
- normalizeIban
- feeService.ts
- EmailBodyField.tsx
- blocks.ts
- feeCalculation.ts
- app/page.tsx
- compilerOptions
- devDependencies
- index.ts
- userService.ts
- react
- EditUserForm.tsx
- BulkImport.tsx
- satzung/page.tsx
- membershipService.ts
- isFeatureEnabled
- auth.ts
- lucide-react
- berlinTime.ts
- AppError
- ActivityHeatmap.tsx
- securityEventService.ts
- blogImages.ts
- passwordStrength.ts
- dashboard/kontakt/actions.ts
- forgot-password/layout.tsx
- EditUserForm
- terminationService.ts
- verify-email/layout.tsx
- app/termine/page.tsx
- userUpdateData.ts
- ServerDashboard.tsx
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- Footer.tsx
- mailHistory.ts
- mail/page.tsx
- formatEventShort
- CLAUDE.md
- login/page.tsx
- ref_node_assert
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- accountActions.ts
- MarkdownViewer.tsx
- RateLimitTable
- altcha.d.ts
- app/kontakt/actions.ts
- RegistrationFunnel.tsx
- postcss.config.mjs
- sitemap.ts
- { GET, POST }
- executeAction
- login/layout.tsx
- reset-password/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 121 edges
2. `cn()` - 88 edges
3. `AppError` - 88 edges
4. `lucide-react` - 80 edges
5. `react` - 72 edges
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
- `BlogImageManager()` --indirect_call--> `deleteBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `moveBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts

## Import Cycles
- None detected.

## Communities (91 total, 12 thin omitted)

### Community 0 - "next"
Cohesion: 0.09
Nodes (31): nextConfig, next, metadata, AdminBlogPage(), metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+23 more)

### Community 1 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (31): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), ageAt(), CONSENT_VERSION (+23 more)

### Community 3 - "HeaderChrome.tsx"
Cohesion: 0.27
Nodes (8): toggleAllDay(), toDateTimeValue(), toDayValue(), HeaderChrome(), links, useSwipeToClose(), end(), offset()

### Community 4 - "mitgliedsantraege/actions.ts"
Cohesion: 0.16
Nodes (19): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), membershipApprovedMessage(), membershipRejectedMessage(), MEMBERSHIP_ADMIN_PATH, findApplicationById() (+11 more)

### Community 5 - "boardService.ts"
Cohesion: 0.05
Nodes (59): POST(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), AdminBoardPage(), DATENSCHUTZ (+51 more)

### Community 6 - "app/blog/[id]/page.tsx"
Cohesion: 0.16
Nodes (22): generateMetadata(), Props, PublicBlogPost(), generateMetadata(), LeadPost(), MetaLine(), PostRow(), Props (+14 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.06
Nodes (47): ref_node_child_process, ref_node_fs, ref_node_os, ref_node_util, sharp, BACKGROUND, icon(), main() (+39 more)

### Community 8 - "prisma.ts"
Cohesion: 0.15
Nodes (20): @prisma/client, dynamic, KontaktPage(), metadata, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, createPrismaClient() (+12 more)

### Community 9 - "blogService.ts"
Cohesion: 0.08
Nodes (43): POST(), BlogIndexPage(), EditBlogPage(), MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, processBlogImage(), ProcessedBlogImage, QUALITY_LADDER (+35 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.26
Nodes (10): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+2 more)

### Community 11 - "events.ts"
Cohesion: 0.13
Nodes (32): DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard(), EventCardData (+24 more)

### Community 12 - "ics.ts"
Cohesion: 0.16
Nodes (19): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildEventIcs(), calendar(), describe() (+11 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (35): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), GameOfLife(), isEnabledOn() (+27 more)

### Community 14 - "EmailComposerDialog"
Cohesion: 0.50
Nodes (4): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 15 - "registerAction.ts"
Cohesion: 0.21
Nodes (20): POST(), EMAIL_CHANGE_ERRORS, requestPasswordChange(), resendVerificationEmail(), registerUser(), passwordResetMessage(), registrationConfirmationMessage(), getSecurityLogPepper() (+12 more)

### Community 16 - "package.json"
Cohesion: 0.08
Nodes (23): eslintConfig, name, private, version, altcha, altcha-lib, babel-plugin-react-compiler, eslint (+15 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "mailService.ts"
Cohesion: 0.13
Nodes (24): sanitize-html, parseMailForm(), sendEmailAction(), parseDirectMailForm(), sendDirectMailAction(), ENTITIES, htmlToText(), composeMessage() (+16 more)

### Community 19 - "errors.ts"
Cohesion: 0.16
Nodes (14): zod, deleteUserAction(), bulkCreateUsersAction(), createUserAction(), importRowsSchema, NewUserPage(), updateBankDetails(), getRedirectTarget() (+6 more)

### Community 20 - "schemas.ts"
Cohesion: 0.07
Nodes (35): beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), savePost() (+27 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 23 - "app/layout.tsx"
Cohesion: 0.10
Nodes (20): escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono, serif (+12 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.10
Nodes (26): compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), feeReminderMessage() (+18 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.15
Nodes (19): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+11 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.16
Nodes (18): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), VerifyPanel() (+10 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "authz.ts"
Cohesion: 0.22
Nodes (12): setFeatureFlag(), removeRateLimitEntry(), triggerDeploy(), ServerPage(), isFeatureFlagKey(), normalizeRole(), requireDebugAdmin(), sessionUser() (+4 more)

### Community 29 - "getOptionalUser"
Cohesion: 0.06
Nodes (46): @react-pdf/renderer, GET(), GET(), GET(), GET(), GET(), byStatusThenName(), MailForm() (+38 more)

### Community 30 - "DirectoryTable.tsx"
Cohesion: 0.07
Nodes (35): dynamic, metadata, MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog(), SectionHeader(), AmountDialog() (+27 more)

### Community 31 - "normalizeIban"
Cohesion: 0.11
Nodes (38): field(), POST(), ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run() (+30 more)

### Community 32 - "feeService.ts"
Cohesion: 0.19
Nodes (18): UserManagementPage(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), resolveIsStudentDefault(), syncStudentYear() (+10 more)

### Community 33 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 34 - "blocks.ts"
Cohesion: 0.19
Nodes (21): blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailMessage, EmailSignature, nl2br(), renderBlocksEditorHtml() (+13 more)

### Community 35 - "feeCalculation.ts"
Cohesion: 0.15
Nodes (23): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ApplicationWizard(), currentFormValues(), goToStep() (+15 more)

### Community 36 - "app/page.tsx"
Cohesion: 0.13
Nodes (13): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline(), glossary, levels (+5 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "index.ts"
Cohesion: 0.09
Nodes (34): CtaCard(), InfoTooltip(), RateLimitTableProps, FeeDefaultRow, ShareButton(), share(), BadgeTone, toneClasses (+26 more)

### Community 40 - "userService.ts"
Cohesion: 0.21
Nodes (15): bcryptjs, KontoPage(), updateUser(), assertCanEditUser(), archiveFeesOfUser(), deleteUserById(), findUserById(), findUserByMitgliedIdExcludingUser() (+7 more)

### Community 41 - "react"
Cohesion: 0.06
Nodes (53): next-auth, react, FeatureFlagToggle(), FeatureFlagToggleProps, EmailChangeForm(), PasswordChangeButton(), MailFormProps, STATUS_ORDER (+45 more)

### Community 42 - "EditUserForm.tsx"
Cohesion: 0.17
Nodes (8): ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, ROLE_OPTIONS, STATUS_OPTIONS

### Community 43 - "BulkImport.tsx"
Cohesion: 0.22
Nodes (9): ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row, toRow() (+1 more)

### Community 44 - "satzung/page.tsx"
Cohesion: 0.23
Nodes (12): dynamic, metadata, SatzungPage(), FeeDefaultEntry, FeeRates, resolveFeeDefault(), deleteFeeDefault(), findFeeDefaults() (+4 more)

### Community 45 - "membershipService.ts"
Cohesion: 0.16
Nodes (18): dynamic, MembershipApplicationsPage(), metadata, statusMeta(), TerminationList(), confirm(), planApplicationFees(), countOpenApplications() (+10 more)

### Community 46 - "isFeatureEnabled"
Cohesion: 0.17
Nodes (20): POST(), notifyAdminsAboutRegistration(), POST(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), passwordChangedNoticeMessage(), getMailTransporter(), normalize() (+12 more)

### Community 47 - "auth.ts"
Cohesion: 0.10
Nodes (20): ref_crypto, ref_node_net, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError (+12 more)

### Community 48 - "lucide-react"
Cohesion: 0.10
Nodes (25): lucide-react, DeletePostButton(), ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat, STATUS_META (+17 more)

### Community 49 - "berlinTime.ts"
Cohesion: 0.30
Nodes (13): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+5 more)

### Community 50 - "AppError"
Cohesion: 0.22
Nodes (16): requestEmailChangeAction(), deleteEventAction(), revalidateEvent(), saveEventAction(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw() (+8 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.15
Nodes (19): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), emptyCounts(), getActivityHeatmap() (+11 more)

### Community 53 - "blogImages.ts"
Cohesion: 0.17
Nodes (12): BlogImageManager(), handleDrop(), uploadFiles(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, formatBytes() (+4 more)

### Community 54 - "passwordStrength.ts"
Cohesion: 0.19
Nodes (11): NewUserForm(), handleSubmit(), PasswordStrengthMeter(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore (+3 more)

### Community 55 - "dashboard/kontakt/actions.ts"
Cohesion: 0.29
Nodes (9): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), ContactRequestsPage(), deleteContactRequest(), getContactRequests() (+1 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "terminationService.ts"
Cohesion: 0.19
Nodes (13): EditUserPage(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate(), pruneArchivedFees() (+5 more)

### Community 60 - "app/termine/page.tsx"
Cohesion: 0.24
Nodes (9): GET(), dynamic, metadata, SearchParams, TerminePage(), ViewSwitch(), CALENDAR_ICS_PATH, buildCalendarIcs() (+1 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "ServerDashboard.tsx"
Cohesion: 0.13
Nodes (18): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, DeploySection(), formatBytes(), formatUptime() (+10 more)

### Community 63 - "Site.tsx"
Cohesion: 0.12
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

### Community 67 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 68 - "mail/page.tsx"
Cohesion: 0.19
Nodes (11): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage() (+3 more)

### Community 69 - "formatEventShort"
Cohesion: 0.32
Nodes (7): AdminEventsPage(), eventEnd(), formatEventShort(), isPastEvent(), findAllEvents(), getAdminEvents(), START

### Community 71 - "login/page.tsx"
Cohesion: 0.31
Nodes (6): dynamic, LoginPage(), metadata, NOTICES, Props, internalPath()

### Community 72 - "ref_node_assert"
Cohesion: 0.33
Nodes (5): ref_node_assert, ref_node_test, SUMMER, WINTER, base

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.12
Nodes (30): startOfBerlinDay(), UPCOMING_ALERT_MONTHS, AnnouncedEvent, createEvent(), deleteEventById(), EventWriteData, findEventOptions(), findLatestPastEvent() (+22 more)

### Community 77 - "accountActions.ts"
Cohesion: 0.13
Nodes (28): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination(), AccountSection() (+20 more)

### Community 78 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 79 - "RateLimitTable"
Cohesion: 0.33
Nodes (5): getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "app/kontakt/actions.ts"
Cohesion: 0.25
Nodes (10): submitContactRequest(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), ContactInput, hashIp(), scoreSpam() (+2 more)

### Community 82 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 85 - "sitemap.ts"
Cohesion: 0.60
Nodes (4): sitemap(), findPublishedPosts(), getPublishedPosts(), getPastEvents()

### Community 93 - "executeAction"
Cohesion: 0.19
Nodes (29): deletePost(), removeMembershipApplication(), createEventDraft(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), updateFeeAmount() (+21 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **439 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+434 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 562 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `ApplicationWizard.tsx`, `HeaderChrome.tsx`, `mitgliedsantraege/actions.ts`, `boardService.ts`, `app/blog/[id]/page.tsx`, `serverStatus.ts`, `prisma.ts`, `blogService.ts`, `security/page.tsx`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `registerAction.ts`, `package.json`, `mailService.ts`, `errors.ts`, `schemas.ts`, `app/layout.tsx`, `MemberDirectory.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `authz.ts`, `getOptionalUser`, `DirectoryTable.tsx`, `normalizeIban`, `app/page.tsx`, `index.ts`, `react`, `EditUserForm.tsx`, `satzung/page.tsx`, `membershipService.ts`, `isFeatureEnabled`, `lucide-react`, `AppError`, `dashboard/kontakt/actions.ts`, `forgot-password/layout.tsx`, `verify-email/layout.tsx`, `app/termine/page.tsx`, `Site.tsx`, `Footer.tsx`, `mail/page.tsx`, `login/page.tsx`, `accountActions.ts`, `app/kontakt/actions.ts`, `sitemap.ts`, `executeAction`, `login/layout.tsx`, `reset-password/layout.tsx`?**
  _High betweenness centrality (0.219) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `next`, `ApplicationWizard.tsx`, `HeaderChrome.tsx`, `boardService.ts`, `app/blog/[id]/page.tsx`, `serverStatus.ts`, `blogService.ts`, `MarketDiffusion.tsx`, `package.json`, `app/layout.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `DirectoryTable.tsx`, `normalizeIban`, `app/page.tsx`, `index.ts`, `EditUserForm.tsx`, `BulkImport.tsx`, `lucide-react`, `ServerDashboard.tsx`, `Site.tsx`, `Footer.tsx`, `eventService.ts`, `accountActions.ts`, `altcha.d.ts`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `HeaderChrome.tsx`, `app/blog/[id]/page.tsx`, `serverStatus.ts`, `security/page.tsx`, `events.ts`, `MarketDiffusion.tsx`, `package.json`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `getOptionalUser`, `DirectoryTable.tsx`, `index.ts`, `react`, `EditUserForm.tsx`, `membershipService.ts`, `ServerDashboard.tsx`, `Site.tsx`, `Footer.tsx`, `accountActions.ts`, `RegistrationFunnel.tsx`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _439 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.08874912648497554 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07179487179487179 - nodes in this community are weakly interconnected._