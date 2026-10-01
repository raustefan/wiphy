# Graph Report - wiphy  (2026-10-01)

## Corpus Check
- 335 files · ~153,209 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1907 nodes · 6269 edges · 87 communities (75 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8bd423ef`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- mitgliedsantraege/actions.ts
- ApplicationWizard.tsx
- Callout
- userService.ts
- boardService.ts
- app/blog/[id]/page.tsx
- authz.ts
- AppError
- blogService.ts
- security/page.tsx
- app/termine/[id]/page.tsx
- ics.ts
- MarketDiffusion.tsx
- EditUserForm.tsx
- isFeatureEnabled
- package.json
- dependencies
- sitemap.ts
- mitglied-werden/actions.ts
- schemas.ts
- seed.ts
- DeleteMemberSection
- app/layout.tsx
- MemberDirectory.tsx
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- gravityPhysics.ts
- requireDebugAdmin
- dashboard/page.tsx
- errors.ts
- sepa/route.ts
- feeService.ts
- EmailBodyField.tsx
- mailService.ts
- satzung/page.tsx
- MailForm.tsx
- compilerOptions
- devDependencies
- DirectoryTable.tsx
- normalizeIban
- lucide-react
- impressum/page.tsx
- ref_node_assert
- membershipService.ts
- blog/actions.ts
- photo/route.ts
- app/vorstand/page.tsx
- index.ts
- ActivityHeatmap.tsx
- securityEventService.ts
- ApplicationList
- vorstand/actions.ts
- prisma.ts
- EditUserForm
- events.ts
- auth.ts
- rateLimitService.ts
- format.ts
- konto/page.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- forgot-password/layout.tsx
- eslint.config.mjs
- mail/page.tsx
- CLAUDE.md
- dashboard/kontakt/actions.ts
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- accountActions.ts
- RateLimitTable
- altcha.d.ts
- RegistrationFunnel.tsx
- EmailComposerDialog
- postcss.config.mjs
- boardPhotoProcessing.ts
- { GET, POST }
- MarkdownViewer.tsx
- executeAction
- registerAction.ts
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 118 edges
2. `AppError` - 88 edges
3. `lucide-react` - 83 edges
4. `cn()` - 82 edges
5. `react` - 69 edges
6. `executeAction()` - 62 edges
7. `requireAdmin()` - 56 edges
8. `Card()` - 49 edges
9. `Button()` - 47 edges
10. `isFeatureEnabled()` - 42 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `EmailChangeForm()` --indirect_call--> `requestEmailChangeAction()`  [INFERRED]
  src/app/dashboard/konto/AccessForms.tsx → src/app/dashboard/konto/actions.ts
- `MailForm()` --indirect_call--> `sendEmailAction()`  [INFERRED]
  src/app/dashboard/mail/MailForm.tsx → src/app/dashboard/mail/actions.ts

## Import Cycles
- None detected.

## Communities (87 total, 12 thin omitted)

### Community 0 - "next"
Cohesion: 0.10
Nodes (21): nextConfig, next, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic, metadata (+13 more)

### Community 1 - "mitgliedsantraege/actions.ts"
Cohesion: 0.14
Nodes (18): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), statusMeta(), TerminationList(), confirm(), MEMBERSHIP_ADMIN_PATH (+10 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (31): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), ageAt(), CONSENT_VERSION (+23 more)

### Community 3 - "Callout"
Cohesion: 0.07
Nodes (36): next-auth, metadata, DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel() (+28 more)

### Community 4 - "userService.ts"
Cohesion: 0.14
Nodes (25): @prisma/client, KontoPage(), deleteUserAction(), EditUserPage(), metadata, updateUser(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS (+17 more)

### Community 5 - "boardService.ts"
Cohesion: 0.16
Nodes (21): EditBoardMemberPage(), AdminBoardPage(), moveMemberOrder(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember() (+13 more)

### Community 6 - "app/blog/[id]/page.tsx"
Cohesion: 0.13
Nodes (24): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props (+16 more)

### Community 7 - "authz.ts"
Cohesion: 0.06
Nodes (56): ref_node_child_process, ref_node_fs, ref_node_os, ref_node_util, BACKGROUND, icon(), main(), GET() (+48 more)

### Community 8 - "AppError"
Cohesion: 0.29
Nodes (12): requestEmailChangeAction(), parseMailForm(), sendEmailAction(), parseDirectMailForm(), sendDirectMailAction(), resolveUsersByIds(), sendMailForTarget(), sendMailToUsers() (+4 more)

### Community 9 - "blogService.ts"
Cohesion: 0.07
Nodes (42): sharp, POST(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, formatBytes(), MAX_ADDITIONAL_BLOG_IMAGES (+34 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.26
Nodes (10): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+2 more)

### Community 11 - "app/termine/[id]/page.tsx"
Cohesion: 0.11
Nodes (30): HomePage(), GET(), dynamic, EventDetailPage(), generateMetadata(), Props, dynamic, metadata (+22 more)

### Community 12 - "ics.ts"
Cohesion: 0.18
Nodes (16): RFC-5545, icsEnd(), addDays(), berlinDateStamp(), buildEventIcs(), calendar(), describe(), escapeText() (+8 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.11
Nodes (32): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), deriv(), LorenzAttractor() (+24 more)

### Community 14 - "EditUserForm.tsx"
Cohesion: 0.07
Nodes (27): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, ActionResult, Mode, OwnTermination, ADMIN_ONLY_KEYS (+19 more)

### Community 15 - "isFeatureEnabled"
Cohesion: 0.17
Nodes (24): POST(), POST(), notifyAdminsAboutRegistration(), POST(), EMAIL_CHANGE_ERRORS, requestPasswordChange(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage() (+16 more)

### Community 16 - "package.json"
Cohesion: 0.10
Nodes (20): name, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer, react-dom (+12 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "sitemap.ts"
Cohesion: 0.33
Nodes (8): sitemap(), GET(), TerminePage(), buildCalendarIcs(), findPublishedPosts(), getPublishedPosts(), getPastEvents(), getUpcomingEvents()

### Community 19 - "mitglied-werden/actions.ts"
Cohesion: 0.11
Nodes (28): ref_crypto, ref_node_net, ContactRequestsPage(), submitContactRequest(), submitMembershipApplication(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD (+20 more)

### Community 20 - "schemas.ts"
Cohesion: 0.08
Nodes (18): AdminCreateUserInput, BankUpdateParsed, contactSchema, emailChangeSchema, emailField, feeAmountUpdateSchema, feeCommentSchema, feeStatusUpdateSchema (+10 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 23 - "app/layout.tsx"
Cohesion: 0.08
Nodes (23): escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono, alt (+15 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.09
Nodes (30): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryAccount, DirectoryTable(), selectAllWithOpenFees(), displayName() (+22 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.15
Nodes (19): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+11 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.16
Nodes (20): withdrawMembershipApplication(), JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput() (+12 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "requireDebugAdmin"
Cohesion: 0.20
Nodes (11): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, removeRateLimitEntry(), triggerDeploy(), ServerPage(), isFeatureFlagKey(), requireDebugAdmin() (+3 more)

### Community 29 - "dashboard/page.tsx"
Cohesion: 0.05
Nodes (52): @react-pdf/renderer, GET(), GET(), byStatusThenName(), MailForm(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS (+44 more)

### Community 30 - "errors.ts"
Cohesion: 0.17
Nodes (14): zod, createUserAction(), importRowsSchema, NewUserForm(), handleSubmit(), updateBankDetails(), getRedirectTarget(), isRedirectError() (+6 more)

### Community 31 - "sepa/route.ts"
Cohesion: 0.25
Nodes (15): field(), POST(), SepaDialog(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+7 more)

### Community 32 - "feeService.ts"
Cohesion: 0.11
Nodes (31): DialogButton(), metadata, StatTile(), UserManagementPage(), FeeBreakdown, directoryStats(), feeRetentionCutoffYear(), clearFeeAmountOverride() (+23 more)

### Community 33 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 34 - "mailService.ts"
Cohesion: 0.07
Nodes (43): sanitize-html, blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailMessage, EmailSignature, nl2br() (+35 more)

### Community 35 - "satzung/page.tsx"
Cohesion: 0.15
Nodes (25): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), ApplicationWizard(), currentFormValues() (+17 more)

### Community 36 - "MailForm.tsx"
Cohesion: 0.14
Nodes (9): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, metadata, LorenzAttractor (+1 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "DirectoryTable.tsx"
Cohesion: 0.12
Nodes (24): DeletePostButton(), metadata, InfoTooltip(), RateLimitTableProps, DeleteEventButton(), dynamic, metadata, chipTones (+16 more)

### Community 40 - "normalizeIban"
Cohesion: 0.30
Nodes (15): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+7 more)

### Community 41 - "lucide-react"
Cohesion: 0.10
Nodes (29): lucide-react, react, ContactRequestItem, dateFormat, TerminationItem, DeleteMemberSectionProps, PhotoMeta, EmailBodyField() (+21 more)

### Community 42 - "impressum/page.tsx"
Cohesion: 0.15
Nodes (13): DATENSCHUTZ, metadata, impressum(), ImpressumPage(), metadata, SATZUNG, LegalPage(), LegalSections() (+5 more)

### Community 43 - "ref_node_assert"
Cohesion: 0.05
Nodes (39): ref_node_assert, ref_node_test, bulkCreateUsersAction(), ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE (+31 more)

### Community 44 - "membershipService.ts"
Cohesion: 0.11
Nodes (32): dynamic, MembershipApplicationsPage(), metadata, FeeDefaultEntry, FeeRates, planApplicationFees(), resolveFeeDefault(), FALLBACK_FEE_DEFAULT (+24 more)

### Community 45 - "blog/actions.ts"
Cohesion: 0.15
Nodes (26): beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+18 more)

### Community 48 - "photo/route.ts"
Cohesion: 0.24
Nodes (9): POST(), FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, processBoardPhoto(), memberExists(), upsertPhoto(), memberExists() (+1 more)

### Community 49 - "app/vorstand/page.tsx"
Cohesion: 0.20
Nodes (12): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), getInitials(), metadata, VorstandPage(), ACCEPTED_BOARD_PHOTO_TYPES (+4 more)

### Community 50 - "index.ts"
Cohesion: 0.07
Nodes (39): CtaCard(), metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory (+31 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.15
Nodes (19): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), emptyCounts(), getActivityHeatmap() (+11 more)

### Community 53 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 54 - "vorstand/actions.ts"
Cohesion: 0.28
Nodes (12): deleteMember(), deletePhotoAction(), moveMemberInList(), parseOrThrow(), revalidateBoard(), saveMember(), removeAdminMember(), removeMemberPhoto() (+4 more)

### Community 56 - "prisma.ts"
Cohesion: 0.17
Nodes (16): dynamic, KontaktPage(), metadata, createPrismaClient(), globalForPrisma, ALTCHA_COMPLEXITY, consumeAltchaSolution(), createAltchaChallenge() (+8 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "events.ts"
Cohesion: 0.13
Nodes (29): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+21 more)

### Community 59 - "auth.ts"
Cohesion: 0.20
Nodes (9): bcryptjs, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError (+1 more)

### Community 60 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 62 - "format.ts"
Cohesion: 0.13
Nodes (17): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+9 more)

### Community 63 - "konto/page.tsx"
Cohesion: 0.24
Nodes (5): EmailChangeForm(), PasswordChangeButton(), dynamic, metadata, PasswordInput()

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 67 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 68 - "mail/page.tsx"
Cohesion: 0.18
Nodes (12): AdminBlogPage(), MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata (+4 more)

### Community 72 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (7): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), deleteContactRequest(), setContactRequestHandled()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.11
Nodes (33): EditBlogPage(), EditEventPage(), AdminEventsPage(), formatEventShort(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData (+25 more)

### Community 77 - "accountActions.ts"
Cohesion: 0.14
Nodes (28): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination(), NewUserPage() (+20 more)

### Community 79 - "RateLimitTable"
Cohesion: 0.33
Nodes (5): getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 82 - "EmailComposerDialog"
Cohesion: 0.50
Nodes (4): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 86 - "boardPhotoProcessing.ts"
Cohesion: 0.33
Nodes (4): MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, ProcessedBoardPhoto, QUALITY_LADDER

### Community 92 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 93 - "executeAction"
Cohesion: 0.26
Nodes (20): deletePost(), savePost(), removeMembershipApplication(), createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), deleteFeeDefaultYear() (+12 more)

### Community 99 - "registerAction.ts"
Cohesion: 0.22
Nodes (16): createLoginChallenge(), resendVerificationEmail(), LoginForm(), registerUser(), registrationConfirmationMessage(), getMailTransporter(), normalize(), Recipients (+8 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **436 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+431 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 559 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `mitgliedsantraege/actions.ts`, `ApplicationWizard.tsx`, `Callout`, `userService.ts`, `app/blog/[id]/page.tsx`, `authz.ts`, `AppError`, `blogService.ts`, `security/page.tsx`, `app/termine/[id]/page.tsx`, `EditUserForm.tsx`, `isFeatureEnabled`, `package.json`, `sitemap.ts`, `mitglied-werden/actions.ts`, `app/layout.tsx`, `MemberDirectory.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `requireDebugAdmin`, `dashboard/page.tsx`, `errors.ts`, `sepa/route.ts`, `feeService.ts`, `satzung/page.tsx`, `MailForm.tsx`, `DirectoryTable.tsx`, `lucide-react`, `impressum/page.tsx`, `ref_node_assert`, `membershipService.ts`, `blog/actions.ts`, `photo/route.ts`, `app/vorstand/page.tsx`, `index.ts`, `vorstand/actions.ts`, `prisma.ts`, `konto/page.tsx`, `forgot-password/layout.tsx`, `mail/page.tsx`, `dashboard/kontakt/actions.ts`, `accountActions.ts`, `executeAction`, `registerAction.ts`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `Callout`, `userService.ts`, `app/blog/[id]/page.tsx`, `authz.ts`, `blogService.ts`, `MarketDiffusion.tsx`, `EditUserForm.tsx`, `package.json`, `app/layout.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `requireDebugAdmin`, `dashboard/page.tsx`, `feeService.ts`, `MailForm.tsx`, `DirectoryTable.tsx`, `normalizeIban`, `ref_node_assert`, `index.ts`, `konto/page.tsx`, `eventService.ts`, `altcha.d.ts`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `next`, `ApplicationWizard.tsx`, `Callout`, `userService.ts`, `app/blog/[id]/page.tsx`, `authz.ts`, `security/page.tsx`, `app/termine/[id]/page.tsx`, `MarketDiffusion.tsx`, `EditUserForm.tsx`, `package.json`, `app/layout.tsx`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `dashboard/page.tsx`, `feeService.ts`, `satzung/page.tsx`, `MailForm.tsx`, `DirectoryTable.tsx`, `membershipService.ts`, `app/vorstand/page.tsx`, `index.ts`, `format.ts`, `konto/page.tsx`, `RegistrationFunnel.tsx`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _436 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.1036036036036036 - nodes in this community are weakly interconnected._
- **Should `mitgliedsantraege/actions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1380952380952381 - nodes in this community are weakly interconnected._