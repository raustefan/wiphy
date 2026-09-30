# Graph Report - wiphy  (2026-09-30)

## Corpus Check
- 338 files · ~141,697 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1796 nodes · 5869 edges · 82 communities (75 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2337e3a0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LoginForm.tsx
- mailService.ts
- ApplicationWizard.tsx
- Card
- auth.ts
- boardService.ts
- membershipFormSchemas.ts
- authz.ts
- ref_node_assert
- blogService.ts
- security/page.tsx
- getEditableUser
- eventService.ts
- MarketDiffusion.tsx
- membershipTermination.ts
- app/layout.tsx
- package.json
- dependencies
- mitglied-werden/actions.ts
- mail/page.tsx
- schemas.ts
- executeAction
- DeleteMemberSection
- app/termine/[id]/page.tsx
- blog/actions.ts
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- AppError
- userService.ts
- berlinTime.ts
- dashboard/vorstand/page.tsx
- format.ts
- feeService.ts
- RegistrationFunnel.tsx
- ics.ts
- zahlungen/page.tsx
- sepa/page.tsx
- compilerOptions
- devDependencies
- FeesTable
- feeDefaults.ts
- lucide-react
- PhysicsTimeline.tsx
- EditUserForm.tsx
- LegalPage.tsx
- events.ts
- securityEventService.ts
- sendEmail
- formatIban
- ActivityHeatmap.tsx
- requireDebugAdmin
- EmailBodyField.tsx
- MailForm.tsx
- isFeatureEnabled
- index.ts
- EditUserForm
- seed.ts
- dashboard/kontakt/actions.ts
- normalizeIban
- next
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- membershipService.ts
- prisma.ts
- CLAUDE.md
- app/blog/[id]/page.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- ServerDashboard.tsx
- eslint.config.mjs
- new/page.tsx
- dashboard/page.tsx
- altcha.d.ts
- FeesTable.tsx
- postcss.config.mjs
- messages.ts
- userUpdateData.ts
- { GET, POST }
- ApplicationList
- MarkdownViewer.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 112 edges
2. `AppError` - 84 edges
3. `cn()` - 80 edges
4. `lucide-react` - 77 edges
5. `react` - 61 edges
6. `executeAction()` - 60 edges
7. `requireAdmin()` - 57 edges
8. `Card()` - 48 edges
9. `Button()` - 44 edges
10. `isFeatureEnabled()` - 40 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `FeatureFlagToggle()` --indirect_call--> `setFeatureFlag()`  [INFERRED]
  src/app/dashboard/feature-flags/FeatureFlagToggle.tsx → src/app/dashboard/feature-flags/actions.ts
- `FeeDefaultsCard()` --indirect_call--> `deleteFeeDefaultYear()`  [INFERRED]
  src/app/dashboard/fees/FeeDefaultsCard.tsx → src/app/dashboard/fees/actions.ts
- `save()` --indirect_call--> `saveFeeDefault()`  [INFERRED]
  src/app/dashboard/fees/FeeDefaultsCard.tsx → src/app/dashboard/fees/actions.ts

## Import Cycles
- None detected.

## Communities (82 total, 7 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.07
Nodes (36): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, ForgotPasswordPage(), ContactForm(), createLoginChallenge(), FaqItem, LoginFaq() (+28 more)

### Community 1 - "mailService.ts"
Cohesion: 0.07
Nodes (50): sanitize-html, parseMailForm(), sendEmailAction(), blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature (+42 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.11
Nodes (17): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, CONSENT_VERSION, DATENSCHUTZ_URL, FALLBACK_FEE_DEFAULT (+9 more)

### Community 3 - "Card"
Cohesion: 0.10
Nodes (20): @uiw/react-md-editor, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, ContactRequestsPage(), dynamic, metadata (+12 more)

### Community 4 - "auth.ts"
Cohesion: 0.11
Nodes (18): ref_node_net, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError (+10 more)

### Community 5 - "boardService.ts"
Cohesion: 0.09
Nodes (37): POST(), EditBoardMemberPage(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, moveMemberOrder(), ImageBytes, processBoardPhoto() (+29 more)

### Community 6 - "membershipFormSchemas.ts"
Cohesion: 0.11
Nodes (19): ageAt(), isOldEnough(), applicationBankSchema, applicationPaymentSchema, applicationPersonSchema, applicationStudySchema, bankFieldsOptional, birthDateField (+11 more)

### Community 7 - "authz.ts"
Cohesion: 0.06
Nodes (53): ref_node_child_process, ref_node_fs, ref_node_os, ref_node_util, BACKGROUND, icon(), main(), GET() (+45 more)

### Community 8 - "ref_node_assert"
Cohesion: 0.20
Nodes (9): ref_node_assert, ref_node_test, dynamic, LoginPage(), metadata, NOTICES, Props, internalPath() (+1 more)

### Community 9 - "blogService.ts"
Cohesion: 0.07
Nodes (54): sharp, POST(), EditBlogPage(), AdminBlogPage(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant (+46 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.15
Nodes (20): longDayLabel(), sparkGeometry, dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS (+12 more)

### Community 11 - "getEditableUser"
Cohesion: 0.33
Nodes (8): @react-pdf/renderer, GET(), maskIban(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, getEditableUser()

### Community 12 - "eventService.ts"
Cohesion: 0.12
Nodes (30): dynamic, EditEventPage(), metadata, createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventById() (+22 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.12
Nodes (27): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+19 more)

### Community 14 - "membershipTermination.ts"
Cohesion: 0.29
Nodes (7): berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate(), pruneArchivedFees()

### Community 15 - "app/layout.tsx"
Cohesion: 0.09
Nodes (22): escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono, alt (+14 more)

### Community 16 - "package.json"
Cohesion: 0.07
Nodes (27): name, prisma, seed, private, version, altcha, altcha-lib, babel-plugin-react-compiler (+19 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+19 more)

### Community 18 - "mitglied-werden/actions.ts"
Cohesion: 0.17
Nodes (19): submitContactRequest(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD (+11 more)

### Community 19 - "mail/page.tsx"
Cohesion: 0.23
Nodes (10): MailDashboard(), announcementHtml(), dynamic, MailDashboardPage(), metadata, sitemap(), TerminePage(), getSentMails() (+2 more)

### Community 20 - "schemas.ts"
Cohesion: 0.08
Nodes (25): deletePhotoAction(), moveMemberInList(), parseOrThrow(), revalidateBoard(), handleDelete(), AdminCreateUserInput, BankUpdateParsed, berlinDateTime() (+17 more)

### Community 21 - "executeAction"
Cohesion: 0.19
Nodes (27): createDraft(), deletePost(), savePost(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), toggleFee() (+19 more)

### Community 23 - "app/termine/[id]/page.tsx"
Cohesion: 0.16
Nodes (18): GET(), dynamic, EventDetailPage(), generateMetadata(), Props, MarkdownViewer(), ShareButton(), share() (+10 more)

### Community 24 - "blog/actions.ts"
Cohesion: 0.19
Nodes (18): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager() (+10 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (12): columnPath(), labelStride(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline(), PAD (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.17
Nodes (17): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+9 more)

### Community 27 - "AppError"
Cohesion: 0.11
Nodes (41): zod, acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), deleteOwnAccount(), disableOwnAccount(), mailLater() (+33 more)

### Community 28 - "userService.ts"
Cohesion: 0.35
Nodes (9): @prisma/client, updateBankDetails(), findUserById(), findUserByMitgliedIdExcludingUser(), findUsersForDashboard(), updateUserById(), getDashboardUsers(), updateOwnBankDetails() (+1 more)

### Community 29 - "berlinTime.ts"
Cohesion: 0.11
Nodes (37): GET(), MembershipCertificateCard(), EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay() (+29 more)

### Community 30 - "dashboard/vorstand/page.tsx"
Cohesion: 0.18
Nodes (12): createDraft(), DeleteMemberButton(), BoardPhotoUploader(), handleDrop(), uploadFile(), AdminBoardPage(), metadata, getInitials() (+4 more)

### Community 31 - "format.ts"
Cohesion: 0.14
Nodes (16): statusMeta(), TerminationList(), confirm(), AccountSection(), terminationNoticeMessage(), DATE_TIME, EURO, formatDate() (+8 more)

### Community 32 - "feeService.ts"
Cohesion: 0.12
Nodes (28): FeesDashboardPage(), metadata, calculateFeeAmount(), FeeBreakdown, archiveFeesOfUser(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears() (+20 more)

### Community 33 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 34 - "ics.ts"
Cohesion: 0.17
Nodes (18): RFC-5545, GET(), eventPath(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), calendar() (+10 more)

### Community 35 - "zahlungen/page.tsx"
Cohesion: 0.13
Nodes (29): FeeDefaultsCard(), run(), save(), AmountDialog(), explainFee(), BankDetailsForm(), submit(), dynamic (+21 more)

### Community 36 - "sepa/page.tsx"
Cohesion: 0.24
Nodes (13): metadata, SepaExportPage(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate(), isValidCreditorId() (+5 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography, ts-node (+10 more)

### Community 39 - "FeesTable"
Cohesion: 0.20
Nodes (5): compareBy(), displayName(), FeesTable(), selectAllWithOpenFees(), hasOpenFee()

### Community 40 - "feeDefaults.ts"
Cohesion: 0.30
Nodes (9): FeeDefaultEntry, FeeRates, resolveFeeDefault(), deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeRatesForYear(), getFeeDashboardData() (+1 more)

### Community 41 - "lucide-react"
Cohesion: 0.10
Nodes (29): lucide-react, react, ContactRequestItem, dateFormat, TerminationItem, ActionResult, Mode, OwnTermination (+21 more)

### Community 42 - "PhysicsTimeline.tsx"
Cohesion: 0.24
Nodes (8): categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory, TimelineDetail(), TimelineEvent

### Community 43 - "EditUserForm.tsx"
Cohesion: 0.08
Nodes (24): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP (+16 more)

### Community 44 - "LegalPage.tsx"
Cohesion: 0.16
Nodes (12): DATENSCHUTZ, metadata, IMPRESSUM, metadata, SATZUNG, Block(), LegalPage(), LegalSections() (+4 more)

### Community 45 - "events.ts"
Cohesion: 0.09
Nodes (39): DeleteEventButton(), AdminEventsPage(), dynamic, metadata, DashboardEvent, UpcomingEventAlert(), dynamic, metadata (+31 more)

### Community 46 - "securityEventService.ts"
Cohesion: 0.18
Nodes (17): SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel() (+9 more)

### Community 47 - "sendEmail"
Cohesion: 0.39
Nodes (8): EmailMessage, renderEmailText(), getMailTransporter(), normalize(), Recipients, sendEmail(), getSmtpConfig(), getSignatureBoardLine()

### Community 48 - "formatIban"
Cohesion: 0.60
Nodes (5): SummaryBlock(), IbanInput(), check(), handleChange(), formatIban()

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "requireDebugAdmin"
Cohesion: 0.14
Nodes (15): FeatureFlagsPage(), removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), ServerPage() (+7 more)

### Community 53 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 54 - "MailForm.tsx"
Cohesion: 0.09
Nodes (18): compareBy(), DashboardUsersTable(), displayName(), getStatusIcon(), MailAnnouncement, MailEventOption, MailHistoryEntry, byStatusThenName() (+10 more)

### Community 55 - "isFeatureEnabled"
Cohesion: 0.16
Nodes (30): bcryptjs, ref_crypto, POST(), POST(), notifyAdminsAboutRegistration(), POST(), resendVerificationEmail(), registerUser() (+22 more)

### Community 56 - "index.ts"
Cohesion: 0.09
Nodes (33): DeletePostButton(), metadata, CtaCard(), DashboardTableUser, SortKey, STATUS_RANK, FeeDefaultRow, InfoTooltip() (+25 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (7): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), deleteContactRequest(), setContactRequestHandled()

### Community 61 - "normalizeIban"
Cohesion: 0.36
Nodes (12): field(), POST(), ibanError(), IBAN_LENGTHS, isValidBic(), isValidIban(), normalizeIban(), membershipApplicationSchema (+4 more)

### Community 62 - "next"
Cohesion: 0.08
Nodes (19): nextConfig, next, metadata, metadata, metadata, metadata, heroMetrics, pillars (+11 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "membershipService.ts"
Cohesion: 0.20
Nodes (15): dynamic, MembershipApplicationsPage(), metadata, planApplicationFees(), deleteApplication(), findApplications(), findApplicationsForUser(), findOpenApplication() (+7 more)

### Community 68 - "prisma.ts"
Cohesion: 0.19
Nodes (15): dynamic, KontaktPage(), metadata, createPrismaClient(), globalForPrisma, ALTCHA_COMPLEXITY, consumeAltchaSolution(), createAltchaChallenge() (+7 more)

### Community 71 - "app/blog/[id]/page.tsx"
Cohesion: 0.17
Nodes (19): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props (+11 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "ServerDashboard.tsx"
Cohesion: 0.13
Nodes (19): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, triggerDeploy(), DeploySection(), formatBytes() (+11 more)

### Community 77 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 78 - "new/page.tsx"
Cohesion: 0.10
Nodes (19): setFeatureFlag(), NewUserForm(), handleSubmit(), metadata, NewUserPage(), FeatureDisabledQueryDialog(), PasswordStrengthMeter(), FEATURE_FLAG_DESCRIPTIONS (+11 more)

### Community 79 - "dashboard/page.tsx"
Cohesion: 0.16
Nodes (11): EmailChangeDialog(), MailSuccessDialog(), ADMIN_ACTIONS, DashboardPage(), QueryParamDialog(), SectionHeader(), LogoutButton(), countOpenApplications() (+3 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "FeesTable.tsx"
Cohesion: 0.13
Nodes (12): chipTones, FeesSortKey, FeesTableProps, FeesTableUser, StatusChip(), UserPaymentHistoryDialog(), EmailBodyField(), EmailComposerDialog() (+4 more)

### Community 85 - "messages.ts"
Cohesion: 0.24
Nodes (14): accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage(), feeReminderMessage(), greeting(), LINK_EXPIRY(), loginDisabledMessage(), membershipApprovedMessage() (+6 more)

### Community 86 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 89 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 92 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **431 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+426 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 549 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `mailService.ts`, `ApplicationWizard.tsx`, `Card`, `auth.ts`, `boardService.ts`, `authz.ts`, `ref_node_assert`, `blogService.ts`, `security/page.tsx`, `getEditableUser`, `eventService.ts`, `app/layout.tsx`, `package.json`, `mitglied-werden/actions.ts`, `mail/page.tsx`, `schemas.ts`, `executeAction`, `app/termine/[id]/page.tsx`, `blog/actions.ts`, `mitglied-werden/page.tsx`, `AppError`, `userService.ts`, `berlinTime.ts`, `dashboard/vorstand/page.tsx`, `feeService.ts`, `ics.ts`, `zahlungen/page.tsx`, `sepa/page.tsx`, `lucide-react`, `EditUserForm.tsx`, `LegalPage.tsx`, `events.ts`, `requireDebugAdmin`, `MailForm.tsx`, `isFeatureEnabled`, `index.ts`, `dashboard/kontakt/actions.ts`, `normalizeIban`, `membershipService.ts`, `prisma.ts`, `app/blog/[id]/page.tsx`, `new/page.tsx`, `dashboard/page.tsx`, `FeesTable.tsx`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `LoginForm.tsx`, `ApplicationWizard.tsx`, `Card`, `authz.ts`, `security/page.tsx`, `eventService.ts`, `package.json`, `app/termine/[id]/page.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `AppError`, `dashboard/vorstand/page.tsx`, `feeService.ts`, `RegistrationFunnel.tsx`, `zahlungen/page.tsx`, `sepa/page.tsx`, `PhysicsTimeline.tsx`, `EditUserForm.tsx`, `events.ts`, `MailForm.tsx`, `index.ts`, `next`, `membershipService.ts`, `app/blog/[id]/page.tsx`, `ServerDashboard.tsx`, `dashboard/page.tsx`, `FeesTable.tsx`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `LoginForm.tsx`, `ApplicationWizard.tsx`, `Card`, `MarketDiffusion.tsx`, `app/layout.tsx`, `package.json`, `AppError`, `dashboard/vorstand/page.tsx`, `feeService.ts`, `PhysicsTimeline.tsx`, `EditUserForm.tsx`, `LegalPage.tsx`, `events.ts`, `MailForm.tsx`, `index.ts`, `app/blog/[id]/page.tsx`, `ServerDashboard.tsx`, `new/page.tsx`, `dashboard/page.tsx`, `altcha.d.ts`, `FeesTable.tsx`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _431 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LoginForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07393483709273183 - nodes in this community are weakly interconnected._
- **Should `mailService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06502816180235535 - nodes in this community are weakly interconnected._