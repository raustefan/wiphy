# Graph Report - wiphy  (2026-09-29)

## Corpus Check
- 335 files · ~141,004 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1793 nodes · 5860 edges · 85 communities (73 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `29363f5a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LoginForm.tsx
- mailService.ts
- ApplicationWizard.tsx
- next
- authz.ts
- boardService.ts
- users/[id]/page.tsx
- serverStatus.ts
- FeesTable.tsx
- blogService.ts
- securityLabels.ts
- requireDebugAdmin
- eventService.ts
- MarketDiffusion.tsx
- ref_node_assert
- app/layout.tsx
- package.json
- dependencies
- app/kontakt/actions.ts
- events.ts
- schemas.ts
- AppError
- DeleteMemberSection
- blogPostPath
- blog/actions.ts
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- accountActions.ts
- membership.ts
- dashboard/page.tsx
- Badge
- mail/page.tsx
- feeService.ts
- RegistrationFunnel.tsx
- ics.ts
- feeCalculation.ts
- sepa/route.ts
- compilerOptions
- devDependencies
- formatEuro
- feeDefaults.ts
- lucide-react
- security/page.tsx
- EditUserForm.tsx
- satzung/page.tsx
- idFromSegment
- securityEventService.ts
- feature-flags/actions.ts
- EventForm.tsx
- blogImageProcessing.ts
- MarkdownEditor.tsx
- ActivityHeatmap.tsx
- security/actions.ts
- EmailBodyField.tsx
- generate-icons.ts
- userService.ts
- index.ts
- EditUserForm
- ApplicationWizard
- seed.ts
- ContactRequestList
- normalizeIban
- forgot-password/layout.tsx
- login/layout.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- mitgliedsantraege/actions.ts
- reset-password/layout.tsx
- auth.ts
- getOptionalUser
- CLAUDE.md
- app/blog/[id]/page.tsx
- ShareButton
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- ServerDashboard.tsx
- verify-email/layout.tsx
- eslint.config.mjs
- altcha.d.ts
- postcss.config.mjs
- { GET, POST }
- ApplicationList
- format.ts

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
10. `isFeatureEnabled()` - 42 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `FeeDefaultsCard()` --indirect_call--> `deleteFeeDefaultYear()`  [INFERRED]
  src/app/dashboard/fees/FeeDefaultsCard.tsx → src/app/dashboard/fees/actions.ts
- `save()` --indirect_call--> `saveFeeDefault()`  [INFERRED]
  src/app/dashboard/fees/FeeDefaultsCard.tsx → src/app/dashboard/fees/actions.ts
- `StatusChip()` --calls--> `cn()`  [EXTRACTED]
  src/app/dashboard/fees/FeesTable.tsx → src/lib/cn.ts
- `ContactRequestList()` --indirect_call--> `markContactRequestHandled()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts

## Import Cycles
- None detected.

## Communities (85 total, 12 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.10
Nodes (32): altcha, ForgotPasswordPage(), createLoginChallenge(), FaqItem, LoginFaq(), SECTIONS, LoginForm(), AccountPanel() (+24 more)

### Community 1 - "mailService.ts"
Cohesion: 0.06
Nodes (51): sanitize-html, parseMailForm(), sendEmailAction(), blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature (+43 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.09
Nodes (21): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, applicationBankSchema, applicationPaymentSchema, applicationPersonSchema (+13 more)

### Community 3 - "next"
Cohesion: 0.09
Nodes (29): nextConfig, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, metadata (+21 more)

### Community 4 - "authz.ts"
Cohesion: 0.19
Nodes (18): ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, commit, DebugBar(), LINKS (+10 more)

### Community 5 - "boardService.ts"
Cohesion: 0.07
Nodes (48): POST(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), AdminBoardPage(), getInitials() (+40 more)

### Community 6 - "users/[id]/page.tsx"
Cohesion: 0.22
Nodes (12): @prisma/client, deleteUserAction(), EditUserPage(), metadata, updateUser(), FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER (+4 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.13
Nodes (19): ref_node_child_process, ref_node_os, GET(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG (+11 more)

### Community 8 - "FeesTable.tsx"
Cohesion: 0.09
Nodes (22): FeeDefaultRow, chipTones, FeesSortKey, FeesTableProps, FeesTableUser, StatusChip(), metadata, MailAnnouncement (+14 more)

### Community 9 - "blogService.ts"
Cohesion: 0.08
Nodes (47): POST(), EditBlogPage(), AdminBlogPage(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageVariant, MAX_ADDITIONAL_BLOG_IMAGES, MAX_BLOG_IMAGE_UPLOAD_BYTES (+39 more)

### Community 10 - "securityLabels.ts"
Cohesion: 0.17
Nodes (14): sparkGeometry, OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, TYPE_LABELS, TYPE_ORDER, typeHint(), typeLabel (+6 more)

### Community 11 - "requireDebugAdmin"
Cohesion: 0.38
Nodes (6): FeatureFlagsPage(), triggerDeploy(), ServerPage(), DeploySection(), requireDebugAdmin(), startDeploy()

### Community 12 - "eventService.ts"
Cohesion: 0.13
Nodes (29): UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventOptions(), findLatestPastEvent(), findNextUpcomingEvent() (+21 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (29): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+21 more)

### Community 14 - "ref_node_assert"
Cohesion: 0.06
Nodes (32): ref_node_assert, ref_node_test, NewUserForm(), handleSubmit(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue() (+24 more)

### Community 15 - "app/layout.tsx"
Cohesion: 0.08
Nodes (24): escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono, alt (+16 more)

### Community 16 - "package.json"
Cohesion: 0.07
Nodes (26): name, prisma, seed, private, version, altcha-lib, babel-plugin-react-compiler, next-auth (+18 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+19 more)

### Community 18 - "app/kontakt/actions.ts"
Cohesion: 0.23
Nodes (13): ContactRequestsPage(), submitContactRequest(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), ContactInput, hashIp() (+5 more)

### Community 19 - "events.ts"
Cohesion: 0.13
Nodes (30): AdminEventsPage(), UpcomingEventAlert(), HomePage(), dynamic, EventDetailPage(), Props, NextEventCard(), EventCard() (+22 more)

### Community 20 - "schemas.ts"
Cohesion: 0.07
Nodes (22): AdminCreateUserInput, BankUpdateParsed, berlinDateTime(), boardDeleteSchema, boardMoveSchema, boardSaveSchema, contactSchema, emailField (+14 more)

### Community 21 - "AppError"
Cohesion: 0.12
Nodes (45): zod, deletePost(), savePost(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), toggleFee() (+37 more)

### Community 23 - "blogPostPath"
Cohesion: 0.32
Nodes (9): sitemap(), TerminePage(), getPastEvents(), getUpcomingEvents(), blogPostPath(), GERMAN_LETTERS, safeDecode(), slugify() (+1 more)

### Community 24 - "blog/actions.ts"
Cohesion: 0.16
Nodes (21): beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+13 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.08
Nodes (32): ContactForm(), dynamic, KontaktPage(), metadata, dynamic, internalPath(), LoginPage(), metadata (+24 more)

### Community 27 - "accountActions.ts"
Cohesion: 0.16
Nodes (25): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, NewUserPage(), signOut (+17 more)

### Community 28 - "membership.ts"
Cohesion: 0.14
Nodes (14): ageAt(), CONSENT_VERSION, DATENSCHUTZ_URL, isOldEnough(), MEMBERSHIP_JOURNEY_MARKER, MIN_APPLICANT_AGE, MINOR_HINT, REGISTERED_PATH (+6 more)

### Community 29 - "dashboard/page.tsx"
Cohesion: 0.05
Nodes (59): @react-pdf/renderer, GET(), GET(), MetaLine(), compareBy(), DashboardTableUser, DashboardUsersTable(), displayName() (+51 more)

### Community 30 - "Badge"
Cohesion: 0.11
Nodes (15): DashboardEvent, BankValues, categories, categoryIcon(), categoryLabel(), events, TimelineCategory, TimelineDetail() (+7 more)

### Community 31 - "mail/page.tsx"
Cohesion: 0.11
Nodes (16): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, statusMeta() (+8 more)

### Community 32 - "feeService.ts"
Cohesion: 0.13
Nodes (27): FeesDashboardPage(), calculateFeeAmount(), FeeBreakdown, resolveFeeDefault(), archiveFeesOfUser(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears() (+19 more)

### Community 33 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 34 - "ics.ts"
Cohesion: 0.22
Nodes (16): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), calendar(), describe() (+8 more)

### Community 35 - "feeCalculation.ts"
Cohesion: 0.22
Nodes (15): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), SatzungPage(), annualFee() (+7 more)

### Community 36 - "sepa/route.ts"
Cohesion: 0.24
Nodes (16): field(), POST(), SepaExportPage(), TIME_ZONE, agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId() (+8 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography, ts-node (+10 more)

### Community 39 - "formatEuro"
Cohesion: 0.17
Nodes (8): AmountDialog(), compareBy(), displayName(), explainFee(), FeesTable(), selectAllWithOpenFees(), hasOpenFee(), formatEuro()

### Community 40 - "feeDefaults.ts"
Cohesion: 0.26
Nodes (10): FeeDefaultEntry, FeeRates, FALLBACK_FEE_DEFAULT, deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeDefaults(), getFeeRatesForYear() (+2 more)

### Community 41 - "lucide-react"
Cohesion: 0.10
Nodes (26): lucide-react, react, DeletePostButton(), ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat (+18 more)

### Community 42 - "security/page.tsx"
Cohesion: 0.23
Nodes (13): dynamic, metadata, SecurityPage(), ReasonBars(), reasonLabel(), getPendingRegistrationStats(), bucketFromKey(), getRateLimitEntries() (+5 more)

### Community 43 - "EditUserForm.tsx"
Cohesion: 0.09
Nodes (20): ActionResult, Mode, OwnTermination, ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP (+12 more)

### Community 44 - "satzung/page.tsx"
Cohesion: 0.14
Nodes (12): DATENSCHUTZ, metadata, IMPRESSUM, metadata, dynamic, metadata, SATZUNG, LegalPage() (+4 more)

### Community 45 - "idFromSegment"
Cohesion: 0.29
Nodes (7): GET(), generateMetadata(), buildEventIcs(), icsFileName(), getPublicEvent(), idFromSegment(), NOW

### Community 46 - "securityEventService.ts"
Cohesion: 0.17
Nodes (15): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap(), getSecurityOverview(), HeatCell (+7 more)

### Community 47 - "feature-flags/actions.ts"
Cohesion: 0.39
Nodes (5): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, isFeatureFlagKey(), setFeatureFlagEnabled()

### Community 48 - "EventForm.tsx"
Cohesion: 0.20
Nodes (19): EventForm(), toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate() (+11 more)

### Community 49 - "blogImageProcessing.ts"
Cohesion: 0.29
Nodes (4): sharp, ImageBytes, ProcessedBlogImage, QUALITY_LADDER

### Community 50 - "MarkdownEditor.tsx"
Cohesion: 0.40
Nodes (4): @uiw/react-markdown-preview, @uiw/react-md-editor, MarkdownEditor(), MDEditor

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "security/actions.ts"
Cohesion: 0.27
Nodes (7): removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), deleteRateLimitEntry()

### Community 53 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 54 - "generate-icons.ts"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 55 - "userService.ts"
Cohesion: 0.10
Nodes (51): bcryptjs, ref_crypto, ref_node_net, POST(), POST(), notifyAdminsAboutRegistration(), POST(), notifyApplicant() (+43 more)

### Community 56 - "index.ts"
Cohesion: 0.06
Nodes (46): CtaCard(), metadata, PhysicsTimeline(), metadata, heroMetrics, pillars, dynamic, metadata (+38 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "ApplicationWizard"
Cohesion: 0.70
Nodes (5): ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit()

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "ContactRequestList"
Cohesion: 1.00
Nodes (3): ContactRequestList(), confirmDelete(), run()

### Community 61 - "normalizeIban"
Cohesion: 0.29
Nodes (15): SummaryBlock(), ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic() (+7 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "mitgliedsantraege/actions.ts"
Cohesion: 0.12
Nodes (29): confirmMembershipTermination(), MembershipApplicationsPage(), submitMembershipApplication(), withdrawMembershipApplication(), membershipApplicationNoticeMessage(), membershipReceivedMessage(), terminationConfirmedMessage(), planApplicationFees() (+21 more)

### Community 68 - "auth.ts"
Cohesion: 0.11
Nodes (22): AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginRateLimitedError, signIn, EmailMessage (+14 more)

### Community 69 - "getOptionalUser"
Cohesion: 0.31
Nodes (7): GET(), GET(), GET(), getOptionalUser(), withViewOverride(), findImageBytes(), findPhotoBytes()

### Community 71 - "app/blog/[id]/page.tsx"
Cohesion: 0.13
Nodes (20): react-markdown, remark-gfm, generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), PostCard() (+12 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "ServerDashboard.tsx"
Cohesion: 0.15
Nodes (17): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, formatBytes(), formatUptime(), Sample (+9 more)

### Community 77 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 89 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 91 - "format.ts"
Cohesion: 0.29
Nodes (7): DATE_TIME, EURO, formatDateShort(), LONG_DATE, NUMBER, SHORT_DATE, toDate()

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **430 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+425 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 548 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `ApplicationWizard.tsx`, `authz.ts`, `boardService.ts`, `users/[id]/page.tsx`, `serverStatus.ts`, `FeesTable.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `app/layout.tsx`, `package.json`, `app/kontakt/actions.ts`, `events.ts`, `AppError`, `blogPostPath`, `blog/actions.ts`, `mitglied-werden/page.tsx`, `accountActions.ts`, `dashboard/page.tsx`, `Badge`, `mail/page.tsx`, `ics.ts`, `sepa/route.ts`, `lucide-react`, `security/page.tsx`, `EditUserForm.tsx`, `satzung/page.tsx`, `idFromSegment`, `feature-flags/actions.ts`, `MarkdownEditor.tsx`, `security/actions.ts`, `userService.ts`, `index.ts`, `forgot-password/layout.tsx`, `login/layout.tsx`, `mitgliedsantraege/actions.ts`, `reset-password/layout.tsx`, `getOptionalUser`, `app/blog/[id]/page.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.178) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `LoginForm.tsx`, `ApplicationWizard.tsx`, `next`, `authz.ts`, `users/[id]/page.tsx`, `FeesTable.tsx`, `MarketDiffusion.tsx`, `package.json`, `events.ts`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `dashboard/page.tsx`, `Badge`, `RegistrationFunnel.tsx`, `security/page.tsx`, `EditUserForm.tsx`, `satzung/page.tsx`, `EventForm.tsx`, `index.ts`, `app/blog/[id]/page.tsx`, `ServerDashboard.tsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `LoginForm.tsx`, `ApplicationWizard.tsx`, `next`, `users/[id]/page.tsx`, `FeesTable.tsx`, `MarketDiffusion.tsx`, `app/layout.tsx`, `package.json`, `dashboard/page.tsx`, `Badge`, `EditUserForm.tsx`, `feature-flags/actions.ts`, `EventForm.tsx`, `MarkdownEditor.tsx`, `index.ts`, `normalizeIban`, `app/blog/[id]/page.tsx`, `ServerDashboard.tsx`, `altcha.d.ts`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _430 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LoginForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `mailService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06349206349206349 - nodes in this community are weakly interconnected._