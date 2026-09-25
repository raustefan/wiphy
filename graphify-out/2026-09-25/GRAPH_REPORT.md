# Graph Report - wiphy  (2026-09-25)

## Corpus Check
- 325 files · ~136,598 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1737 nodes · 5637 edges · 87 communities (75 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `af3ad588`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LoginForm.tsx
- mailService.ts
- membershipFormSchemas.ts
- next
- membershipService.ts
- boardService.ts
- sendEmail
- serverStatus.ts
- ApplicationWizard.tsx
- blogService.ts
- securityEventService.ts
- satzung/page.tsx
- eventService.ts
- app/layout.tsx
- ics.ts
- lib/siteUrl.ts
- package.json
- dependencies
- isFeatureEnabled
- app/blog/[id]/page.tsx
- schemas.ts
- requireAdmin
- auth.ts
- cn
- security/page.tsx
- OutcomeTimeline.tsx
- prisma.ts
- TypeSparklines.tsx
- events.ts
- membershipCertificate.ts
- dashboard/page.tsx
- mitglied-werden/page.tsx
- feeService.ts
- formatNumber
- passwordStrength.ts
- termine/actions.ts
- berlinTime.ts
- compilerOptions
- devDependencies
- EmailBodyField.tsx
- rateLimitService.ts
- lucide-react
- createUserAction
- userUpdateData.ts
- LegalPage.tsx
- mitgliedsantraege/actions.ts
- userService.ts
- RateLimitTable
- EditUserForm.tsx
- AccountPanel
- iban.ts
- ActivityHeatmap.tsx
- login/layout.tsx
- MailForm.tsx
- accountActions.ts
- registerAction.ts
- index.ts
- EditUserForm
- ShareButton
- seed.ts
- MarkdownViewer.tsx
- verify-email/layout.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- getEditableUser
- reset-password/layout.tsx
- terminationService.ts
- format.ts
- CLAUDE.md
- feature-flags/actions.ts
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- dashboard/kontakt/actions.ts
- ref_node_assert
- eslint.config.mjs
- ApplicationList.tsx
- DeleteMemberSection
- altcha.d.ts
- AppError
- postcss.config.mjs
- vorstand/actions.ts
- { GET, POST }
- ServerDashboard.tsx
- RegistrationFunnel.tsx
- errors.ts

## God Nodes (most connected - your core abstractions)
1. `next` - 108 edges
2. `AppError` - 84 edges
3. `cn()` - 77 edges
4. `lucide-react` - 74 edges
5. `requireAdmin()` - 66 edges
6. `react` - 60 edges
7. `executeAction()` - 60 edges
8. `Card()` - 47 edges
9. `Button()` - 43 edges
10. `isFeatureEnabled()` - 42 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `FeeDefaultsCard()` --indirect_call--> `deleteFeeDefaultYear()`  [INFERRED]
  src/app/dashboard/fees/FeeDefaultsCard.tsx → src/app/dashboard/fees/actions.ts
- `save()` --indirect_call--> `saveFeeDefault()`  [INFERRED]
  src/app/dashboard/fees/FeeDefaultsCard.tsx → src/app/dashboard/fees/actions.ts
- `MailForm()` --indirect_call--> `sendEmailAction()`  [INFERRED]
  src/app/dashboard/mail/MailForm.tsx → src/app/dashboard/mail/actions.ts

## Import Cycles
- None detected.

## Communities (87 total, 12 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.10
Nodes (30): next-auth, ForgotPasswordPage(), ContactForm(), FaqItem, LoginFaq(), SECTIONS, FIRST_HALF_FIELDS, FirstHalfField (+22 more)

### Community 1 - "mailService.ts"
Cohesion: 0.07
Nodes (38): sanitize-html, compareBy(), displayName(), FeesTable(), selectAllWithOpenFees(), hasOpenFee(), blockHtml(), blockText() (+30 more)

### Community 2 - "membershipFormSchemas.ts"
Cohesion: 0.12
Nodes (17): MINOR_HINT, applicationBankSchema, applicationPersonSchema, applicationStudySchema, bankFieldsOptional, checkedBox, optional(), optionalDate (+9 more)

### Community 3 - "next"
Cohesion: 0.11
Nodes (27): nextConfig, next, DashboardPageHeader(), DashboardPageHeaderProps, FeatureFlagsPage(), metadata, metadata, dynamic (+19 more)

### Community 4 - "membershipService.ts"
Cohesion: 0.12
Nodes (30): @prisma/client, dynamic, MembershipApplicationsPage(), metadata, FeeDefaultEntry, FeeRates, planApplicationFees(), resolveFeeDefault() (+22 more)

### Community 5 - "boardService.ts"
Cohesion: 0.05
Nodes (61): GET(), POST(), POST(), GET(), GET(), BoardPhotoUploader(), handleDelete(), handleDrop() (+53 more)

### Community 6 - "sendEmail"
Cohesion: 0.36
Nodes (8): nodemailer, renderEmailText(), signatureText(), getMailTransporter(), normalize(), Recipients, sendEmail(), getSmtpConfig()

### Community 7 - "serverStatus.ts"
Cohesion: 0.11
Nodes (23): ref_node_child_process, ref_node_fs, ref_node_os, BACKGROUND, icon(), main(), GET(), cpuPercent() (+15 more)

### Community 8 - "ApplicationWizard.tsx"
Cohesion: 0.09
Nodes (21): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, ageAt(), CONSENT_VERSION, DATENSCHUTZ_URL (+13 more)

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (66): sharp, beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt() (+58 more)

### Community 10 - "securityEventService.ts"
Cohesion: 0.16
Nodes (18): SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel() (+10 more)

### Community 11 - "satzung/page.tsx"
Cohesion: 0.12
Nodes (29): FeeDefaultsCard(), run(), save(), AmountDialog(), explainFee(), UserPaymentHistoryDialog(), BankDetailsForm(), submit() (+21 more)

### Community 12 - "eventService.ts"
Cohesion: 0.09
Nodes (42): EditBlogPage(), MailDashboard(), announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage(), AdminEventsPage() (+34 more)

### Community 13 - "app/layout.tsx"
Cohesion: 0.07
Nodes (38): src_app_globals, body, metadata, mono, auth, Appearance, applyAppearance(), AppThemeProvider() (+30 more)

### Community 14 - "ics.ts"
Cohesion: 0.15
Nodes (21): RFC-5545, GET(), GET(), berlinParts(), daysUntilEvent(), addDays(), berlinDateStamp(), buildCalendarIcs() (+13 more)

### Community 15 - "lib/siteUrl.ts"
Cohesion: 0.14
Nodes (13): escapeXml(), GET(), metadata, alt, contentType, size, BlogPostingJsonLd(), OrganizationJsonLd() (+5 more)

### Community 16 - "package.json"
Cohesion: 0.07
Nodes (27): name, prisma, seed, private, version, altcha, babel-plugin-react-compiler, pg (+19 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+19 more)

### Community 18 - "isFeatureEnabled"
Cohesion: 0.21
Nodes (17): ContactRequestsPage(), submitContactRequest(), submitMembershipApplication(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, membershipApplicationNoticeMessage(), membershipReceivedMessage() (+9 more)

### Community 19 - "app/blog/[id]/page.tsx"
Cohesion: 0.15
Nodes (22): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props (+14 more)

### Community 20 - "schemas.ts"
Cohesion: 0.07
Nodes (23): AdminCreateUserInput, BankUpdateParsed, berlinDateTime(), blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema (+15 more)

### Community 21 - "requireAdmin"
Cohesion: 0.23
Nodes (23): deletePost(), savePost(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), toggleFee(), updateFeeAmount() (+15 more)

### Community 22 - "auth.ts"
Cohesion: 0.12
Nodes (21): bcryptjs, ref_node_net, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginRateLimitedError (+13 more)

### Community 23 - "cn"
Cohesion: 0.06
Nodes (35): metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory, TimelineDetail() (+27 more)

### Community 24 - "security/page.tsx"
Cohesion: 0.23
Nodes (11): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+3 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (12): columnPath(), labelStride(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline(), PAD (+4 more)

### Community 26 - "prisma.ts"
Cohesion: 0.12
Nodes (22): altcha-lib, dynamic, KontaktPage(), metadata, dynamic, internalPath(), LoginPage(), metadata (+14 more)

### Community 27 - "TypeSparklines.tsx"
Cohesion: 0.33
Nodes (8): longDayLabel(), sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 28 - "events.ts"
Cohesion: 0.10
Nodes (43): DashboardEvent, UpcomingEventAlert(), HomePage(), dynamic, EventDetailPage(), generateMetadata(), Props, dynamic (+35 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.18
Nodes (21): GET(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDuration() (+13 more)

### Community 30 - "dashboard/page.tsx"
Cohesion: 0.14
Nodes (10): CtaCard(), EmailChangeDialog(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog(), SectionHeader(), AccountSection() (+2 more)

### Community 31 - "mitglied-werden/page.tsx"
Cohesion: 0.19
Nodes (17): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+9 more)

### Community 32 - "feeService.ts"
Cohesion: 0.15
Nodes (23): FeesDashboardPage(), FeeBreakdown, clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), resolveIsStudentDefault() (+15 more)

### Community 33 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 34 - "passwordStrength.ts"
Cohesion: 0.29
Nodes (8): evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength, SCORE_LABELS, WEAK_PATTERNS

### Community 35 - "termine/actions.ts"
Cohesion: 0.36
Nodes (7): createEventDraft(), revalidateEvent(), saveEventAction(), createDraftEvent(), saveEvent(), eventDeleteSchema, eventSaveSchema

### Community 36 - "berlinTime.ts"
Cohesion: 0.26
Nodes (12): EventForm(), berlinOffsetMs(), berlinWallTimeToDate(), endOfBerlinDay(), pad(), parseBerlinLocalInput(), PARTS, TIME_ZONE (+4 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography, ts-node (+10 more)

### Community 39 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 40 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 41 - "lucide-react"
Cohesion: 0.15
Nodes (18): lucide-react, react, ContactRequestItem, dateFormat, TerminationItem, DeleteEventButton(), DeleteMemberSectionProps, PhotoMeta (+10 more)

### Community 42 - "createUserAction"
Cohesion: 0.67
Nodes (3): createUserAction(), NewUserForm(), handleSubmit()

### Community 43 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 44 - "LegalPage.tsx"
Cohesion: 0.17
Nodes (11): DATENSCHUTZ, metadata, IMPRESSUM, metadata, Block(), LegalPage(), LegalSections(), renderInline() (+3 more)

### Community 45 - "mitgliedsantraege/actions.ts"
Cohesion: 0.20
Nodes (16): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), statusMeta(), TerminationList(), confirm(), membershipApprovedMessage() (+8 more)

### Community 46 - "userService.ts"
Cohesion: 0.15
Nodes (25): POST(), checkLoginFeatureEnabled(), createLoginChallenge(), resendVerificationEmail(), LoginForm(), adminCreatedUserMessage(), contactRequestMessage(), emailChangeMessage() (+17 more)

### Community 47 - "RateLimitTable"
Cohesion: 0.33
Nodes (5): getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo()

### Community 48 - "EditUserForm.tsx"
Cohesion: 0.08
Nodes (27): metadata, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), ActionResult, Mode, OwnTermination (+19 more)

### Community 50 - "iban.ts"
Cohesion: 0.31
Nodes (13): SummaryBlock(), IbanInput(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban(), maskIban() (+5 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 53 - "MailForm.tsx"
Cohesion: 0.08
Nodes (26): compareBy(), DashboardTableUser, DashboardUsersTable(), displayName(), getStatusIcon(), SortKey, STATUS_RANK, MailAnnouncement (+18 more)

### Community 54 - "accountActions.ts"
Cohesion: 0.18
Nodes (22): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination(), deleteUserAction() (+14 more)

### Community 55 - "registerAction.ts"
Cohesion: 0.18
Nodes (20): ref_crypto, POST(), notifyAdminsAboutRegistration(), POST(), registerUser(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), passwordChangedNoticeMessage() (+12 more)

### Community 56 - "index.ts"
Cohesion: 0.10
Nodes (28): DeletePostButton(), metadata, FeeDefaultRow, FeesSortKey, FeesTableProps, FeesTableUser, InfoTooltip(), RateLimitTableProps (+20 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "getEditableUser"
Cohesion: 0.36
Nodes (7): @react-pdf/renderer, GET(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, getEditableUser()

### Community 68 - "terminationService.ts"
Cohesion: 0.18
Nodes (14): DashboardPage(), EditUserPage(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate() (+6 more)

### Community 69 - "format.ts"
Cohesion: 0.25
Nodes (8): AdminBlogPage(), DATE_TIME, EURO, formatDateShort(), LONG_DATE, NUMBER, SHORT_DATE, toDate()

### Community 71 - "feature-flags/actions.ts"
Cohesion: 0.39
Nodes (5): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, isFeatureFlagKey(), setFeatureFlagEnabled()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (7): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), deleteContactRequest(), setContactRequestHandled()

### Community 76 - "ref_node_assert"
Cohesion: 0.21
Nodes (7): ref_node_assert, ref_node_test, ADMIN_SESSION_MAX_MS, adminSessionExpired(), SUMMER, WINTER, base

### Community 77 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 78 - "ApplicationList.tsx"
Cohesion: 0.19
Nodes (12): ApplicationItem, ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), dateFormat (+4 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 82 - "AppError"
Cohesion: 0.20
Nodes (14): parseMailForm(), sendEmailAction(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), parseDirectMailForm(), sendDirectMailAction(), resolveUsersByIds() (+6 more)

### Community 87 - "vorstand/actions.ts"
Cohesion: 0.39
Nodes (7): deletePhotoAction(), moveMemberInList(), parseOrThrow(), revalidateBoard(), boardDeleteSchema, boardMoveSchema, boardSaveSchema

### Community 89 - "ServerDashboard.tsx"
Cohesion: 0.36
Nodes (6): DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel()

### Community 91 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 94 - "errors.ts"
Cohesion: 0.22
Nodes (9): zod, updateBankDetails(), getRedirectTarget(), isRedirectError(), RedirectTarget, AppErrorCode, mapErrorToActionResult(), updateOwnBankDetails() (+1 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **418 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+413 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 534 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `membershipService.ts`, `boardService.ts`, `serverStatus.ts`, `ApplicationWizard.tsx`, `blogService.ts`, `satzung/page.tsx`, `eventService.ts`, `app/layout.tsx`, `ics.ts`, `lib/siteUrl.ts`, `package.json`, `isFeatureEnabled`, `app/blog/[id]/page.tsx`, `requireAdmin`, `auth.ts`, `cn`, `security/page.tsx`, `prisma.ts`, `events.ts`, `membershipCertificate.ts`, `dashboard/page.tsx`, `mitglied-werden/page.tsx`, `termine/actions.ts`, `lucide-react`, `LegalPage.tsx`, `mitgliedsantraege/actions.ts`, `userService.ts`, `EditUserForm.tsx`, `login/layout.tsx`, `MailForm.tsx`, `accountActions.ts`, `registerAction.ts`, `index.ts`, `verify-email/layout.tsx`, `getEditableUser`, `reset-password/layout.tsx`, `feature-flags/actions.ts`, `dashboard/kontakt/actions.ts`, `DeleteMemberSection`, `AppError`, `vorstand/actions.ts`, `errors.ts`?**
  _High betweenness centrality (0.210) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `LoginForm.tsx`, `next`, `membershipService.ts`, `boardService.ts`, `ApplicationWizard.tsx`, `satzung/page.tsx`, `package.json`, `app/blog/[id]/page.tsx`, `cn`, `security/page.tsx`, `OutcomeTimeline.tsx`, `events.ts`, `dashboard/page.tsx`, `mitglied-werden/page.tsx`, `formatNumber`, `EditUserForm.tsx`, `MailForm.tsx`, `index.ts`, `ApplicationList.tsx`, `ServerDashboard.tsx`, `RegistrationFunnel.tsx`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `LoginForm.tsx`, `next`, `feature-flags/actions.ts`, `ApplicationWizard.tsx`, `LegalPage.tsx`, `app/layout.tsx`, `ApplicationList.tsx`, `package.json`, `EditUserForm.tsx`, `iban.ts`, `app/blog/[id]/page.tsx`, `altcha.d.ts`, `MailForm.tsx`, `cn`, `index.ts`, `ServerDashboard.tsx`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _418 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LoginForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0975177304964539 - nodes in this community are weakly interconnected._
- **Should `mailService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07088989441930618 - nodes in this community are weakly interconnected._