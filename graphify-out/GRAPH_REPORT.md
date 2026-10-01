# Graph Report - wiphy  (2026-10-01)

## Corpus Check
- 323 files · ~142,933 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1826 nodes · 5991 edges · 80 communities (73 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b376f3d7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Callout
- EditUserForm.tsx
- ApplicationWizard.tsx
- Card
- AppError
- boardService.ts
- app/blog/[id]/page.tsx
- ServerDashboard.tsx
- mailService.ts
- blogService.ts
- security/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- BulkImport.tsx
- MemberDirectory.tsx
- package.json
- dependencies
- ref_node_assert
- MailForm.tsx
- schemas.ts
- EmailBodyField.tsx
- users/[id]/page.tsx
- app/layout.tsx
- normalizeIban
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- next
- Button
- membershipCertificate.ts
- errors.ts
- dashboard/page.tsx
- feeService.ts
- dashboard/kontakt/page.tsx
- featureFlagService.ts
- zahlungen/page.tsx
- cn
- compilerOptions
- devDependencies
- Container
- getEditableUser
- lucide-react
- RateLimitTable
- app/kontakt/page.tsx
- datenschutz/page.tsx
- app/page.tsx
- securityEventService.ts
- userUpdateData.ts
- membershipService.ts
- ApplicationList
- app/termine/page.tsx
- ActivityHeatmap.tsx
- TypeSparklines.tsx
- app/kontakt/actions.ts
- auth
- userService.ts
- index.ts
- EditUserForm
- berlinTime.ts
- seed.ts
- ShareButton
- sepa/route.ts
- authz.ts
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- dashboard/termine/[id]/page.tsx
- CLAUDE.md
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- formatNumber
- eventService.ts
- altcha.d.ts
- postcss.config.mjs
- { GET, POST }
- MarkdownViewer.tsx
- accountActions.ts
- SecurityPage
- prisma.ts

## God Nodes (most connected - your core abstractions)
1. `next` - 112 edges
2. `AppError` - 85 edges
3. `cn()` - 80 edges
4. `lucide-react` - 78 edges
5. `react` - 63 edges
6. `executeAction()` - 59 edges
7. `requireAdmin()` - 56 edges
8. `Card()` - 48 edges
9. `Button()` - 46 edges
10. `isFeatureEnabled()` - 40 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `ContactRequestList()` --indirect_call--> `markContactRequestHandled()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts
- `confirmDelete()` --indirect_call--> `removeContactRequest()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts
- `MailForm()` --indirect_call--> `sendEmailAction()`  [INFERRED]
  src/app/dashboard/mail/MailForm.tsx → src/app/dashboard/mail/actions.ts

## Import Cycles
- None detected.

## Communities (80 total, 7 thin omitted)

### Community 0 - "Callout"
Cohesion: 0.08
Nodes (34): PhotoMeta, ForgotPasswordPage(), createLoginChallenge(), FaqItem, LoginFaq(), SECTIONS, LoginForm(), AccountPanel() (+26 more)

### Community 1 - "EditUserForm.tsx"
Cohesion: 0.10
Nodes (22): ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, NewUserForm(), handleSubmit() (+14 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (33): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), PaymentOption(), ageAt() (+25 more)

### Community 3 - "Card"
Cohesion: 0.10
Nodes (22): @uiw/react-md-editor, metadata, TerminationItem, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), ActionResult (+14 more)

### Community 4 - "AppError"
Cohesion: 0.15
Nodes (39): deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant() (+31 more)

### Community 5 - "boardService.ts"
Cohesion: 0.07
Nodes (47): POST(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), AdminBoardPage(), getInitials() (+39 more)

### Community 6 - "app/blog/[id]/page.tsx"
Cohesion: 0.13
Nodes (26): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props (+18 more)

### Community 7 - "ServerDashboard.tsx"
Cohesion: 0.07
Nodes (40): ref_node_child_process, ref_node_fs, ref_node_os, BACKGROUND, icon(), main(), triggerDeploy(), DeploySection() (+32 more)

### Community 8 - "mailService.ts"
Cohesion: 0.05
Nodes (54): sanitize-html, MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, MailUserOption, announcementHtml(), dynamic (+46 more)

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (63): sharp, beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+55 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.26
Nodes (10): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+2 more)

### Community 11 - "events.ts"
Cohesion: 0.11
Nodes (35): MailDashboardPage(), DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard() (+27 more)

### Community 12 - "ics.ts"
Cohesion: 0.17
Nodes (18): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildEventIcs(), calendar(), describe() (+10 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.11
Nodes (28): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+20 more)

### Community 14 - "BulkImport.tsx"
Cohesion: 0.22
Nodes (9): ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row, toRow() (+1 more)

### Community 15 - "MemberDirectory.tsx"
Cohesion: 0.09
Nodes (30): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryAccount, DirectoryTable(), selectAllWithOpenFees(), displayName() (+22 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): eslintConfig, name, private, version, altcha, altcha-lib, babel-plugin-react-compiler, eslint (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "ref_node_assert"
Cohesion: 0.29
Nodes (5): ref_node_assert, ref_node_test, ADMIN_SESSION_MAX_MS, adminSessionExpired(), base

### Community 19 - "MailForm.tsx"
Cohesion: 0.16
Nodes (12): MailFormProps, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, EmailBodyField(), useEmailEditor(), EmailComposerDialog(), closeDialog() (+4 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (27): AdminCreateUserInput, BankUpdateParsed, blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema, boardDeleteSchema (+19 more)

### Community 21 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 22 - "users/[id]/page.tsx"
Cohesion: 0.22
Nodes (7): DeleteMemberSection(), deleteUserAction(), EditUserPage(), metadata, assertCanEditUser(), getOpenTermination(), adminDeleteUser()

### Community 23 - "app/layout.tsx"
Cohesion: 0.09
Nodes (22): escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono, alt (+14 more)

### Community 24 - "normalizeIban"
Cohesion: 0.30
Nodes (15): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+7 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.19
Nodes (17): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+9 more)

### Community 27 - "next"
Cohesion: 0.10
Nodes (7): nextConfig, next, metadata, metadata, metadata, metadata, metadata

### Community 28 - "Button"
Cohesion: 0.10
Nodes (13): ContactRequestItem, dateFormat, BeforeInstallPromptEvent, Button(), buttonClasses(), ButtonColor, ButtonLinkProps, ButtonProps (+5 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.09
Nodes (30): GET(), byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, berlinYear(), certificateFacts (+22 more)

### Community 30 - "errors.ts"
Cohesion: 0.15
Nodes (17): zod, parseMailForm(), sendEmailAction(), bulkCreateUsersAction(), createUserAction(), importRowsSchema, updateBankDetails(), sendMailForTarget() (+9 more)

### Community 31 - "dashboard/page.tsx"
Cohesion: 0.08
Nodes (27): EmailChangeDialog(), MailSuccessDialog(), MembershipCertificateCard(), statusMeta(), TerminationList(), confirm(), ADMIN_ACTIONS, DashboardPage() (+19 more)

### Community 32 - "feeService.ts"
Cohesion: 0.09
Nodes (38): DialogButton(), metadata, StatTile(), UserManagementPage(), FeeBreakdown, berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear() (+30 more)

### Community 33 - "dashboard/kontakt/page.tsx"
Cohesion: 0.32
Nodes (7): ContactRequestList(), confirmDelete(), run(), ContactRequestsPage(), dynamic, metadata, getContactRequests()

### Community 34 - "featureFlagService.ts"
Cohesion: 0.20
Nodes (11): POST(), setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, isFeatureFlagKey() (+3 more)

### Community 35 - "zahlungen/page.tsx"
Cohesion: 0.13
Nodes (30): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), BankValues, dynamic, metadata (+22 more)

### Community 36 - "cn"
Cohesion: 0.11
Nodes (20): CtaCard(), categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory, TimelineDetail() (+12 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "Container"
Cohesion: 0.13
Nodes (18): DeletePostButton(), metadata, DashboardPageHeader(), DashboardPageHeaderProps, FeatureFlagsPage(), metadata, metadata, ServerPage() (+10 more)

### Community 40 - "getEditableUser"
Cohesion: 0.31
Nodes (8): @react-pdf/renderer, GET(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee, getEditableUser()

### Community 41 - "lucide-react"
Cohesion: 0.14
Nodes (16): lucide-react, next-auth, react, ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, DeleteMemberButton() (+8 more)

### Community 42 - "RateLimitTable"
Cohesion: 0.33
Nodes (5): getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo()

### Community 43 - "app/kontakt/page.tsx"
Cohesion: 0.18
Nodes (11): dynamic, KontaktPage(), metadata, dynamic, LoginPage(), metadata, NOTICES, Props (+3 more)

### Community 44 - "datenschutz/page.tsx"
Cohesion: 0.16
Nodes (10): DATENSCHUTZ, metadata, IMPRESSUM, metadata, SATZUNG, LegalPage(), LegalSections(), LegalBlock (+2 more)

### Community 45 - "app/page.tsx"
Cohesion: 0.22
Nodes (7): metadata, heroMetrics, pillars, PhysicsHero, sizeClasses, Eyebrow(), Lead()

### Community 46 - "securityEventService.ts"
Cohesion: 0.16
Nodes (17): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap() (+9 more)

### Community 47 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 48 - "membershipService.ts"
Cohesion: 0.14
Nodes (26): dynamic, MembershipApplicationsPage(), metadata, FeeDefaultEntry, FeeRates, planApplicationFees(), resolveFeeDefault(), FALLBACK_FEE_DEFAULT (+18 more)

### Community 49 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 50 - "app/termine/page.tsx"
Cohesion: 0.17
Nodes (17): HomePage(), sitemap(), GET(), dynamic, metadata, NextEventCard(), SearchParams, TerminePage() (+9 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "TypeSparklines.tsx"
Cohesion: 0.36
Nodes (7): sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 53 - "app/kontakt/actions.ts"
Cohesion: 0.12
Nodes (25): submitContactRequest(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), createPrismaClient(), consumeAltchaSolution(), readExpiry() (+17 more)

### Community 54 - "auth"
Cohesion: 0.67
Nodes (3): createDraft(), auth, Header()

### Community 55 - "userService.ts"
Cohesion: 0.31
Nodes (11): bcryptjs, @prisma/client, emailChangeMessage(), archiveFeesOfUser(), deleteUserById(), findUserById(), findUserByMitgliedIdExcludingUser(), updateUserById() (+3 more)

### Community 56 - "index.ts"
Cohesion: 0.13
Nodes (25): InfoTooltip(), RateLimitTableProps, chipTones, GROUPS, SortKey, StatusChip(), FeeDefaultRow, metadata (+17 more)

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

### Community 63 - "authz.ts"
Cohesion: 0.13
Nodes (24): ref_node_util, GET(), GET(), GET(), GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView() (+16 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 68 - "dashboard/termine/[id]/page.tsx"
Cohesion: 0.50
Nodes (4): dynamic, EditEventPage(), metadata, getEventForEdit()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "formatNumber"
Cohesion: 0.21
Nodes (11): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+3 more)

### Community 76 - "eventService.ts"
Cohesion: 0.13
Nodes (29): AdminEventsPage(), createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventById(), findEventOptions(), findLatestPastEvent() (+21 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 92 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

### Community 93 - "accountActions.ts"
Cohesion: 0.08
Nodes (46): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination(), submitMembershipApplication() (+38 more)

### Community 97 - "SecurityPage"
Cohesion: 0.32
Nodes (7): SecurityPage(), bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket(), parseWindowDays()

### Community 99 - "prisma.ts"
Cohesion: 0.10
Nodes (48): ref_crypto, ref_node_net, POST(), POST(), notifyAdminsAboutRegistration(), POST(), resendVerificationEmail(), registerUser() (+40 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **421 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+416 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 538 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `Callout`, `EditUserForm.tsx`, `ApplicationWizard.tsx`, `Card`, `AppError`, `boardService.ts`, `app/blog/[id]/page.tsx`, `mailService.ts`, `blogService.ts`, `security/page.tsx`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `MemberDirectory.tsx`, `package.json`, `users/[id]/page.tsx`, `app/layout.tsx`, `mitglied-werden/page.tsx`, `Button`, `membershipCertificate.ts`, `errors.ts`, `dashboard/page.tsx`, `feeService.ts`, `dashboard/kontakt/page.tsx`, `featureFlagService.ts`, `zahlungen/page.tsx`, `cn`, `Container`, `getEditableUser`, `lucide-react`, `app/kontakt/page.tsx`, `datenschutz/page.tsx`, `app/page.tsx`, `membershipService.ts`, `app/termine/page.tsx`, `app/kontakt/actions.ts`, `index.ts`, `sepa/route.ts`, `authz.ts`, `dashboard/termine/[id]/page.tsx`, `accountActions.ts`, `prisma.ts`?**
  _High betweenness centrality (0.182) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `Callout`, `EditUserForm.tsx`, `ApplicationWizard.tsx`, `Card`, `boardService.ts`, `app/blog/[id]/page.tsx`, `ServerDashboard.tsx`, `mailService.ts`, `security/page.tsx`, `events.ts`, `MemberDirectory.tsx`, `package.json`, `MailForm.tsx`, `users/[id]/page.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `Button`, `membershipCertificate.ts`, `dashboard/page.tsx`, `feeService.ts`, `dashboard/kontakt/page.tsx`, `zahlungen/page.tsx`, `cn`, `Container`, `app/page.tsx`, `membershipService.ts`, `app/termine/page.tsx`, `index.ts`, `authz.ts`, `dashboard/termine/[id]/page.tsx`, `formatNumber`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `Callout`, `EditUserForm.tsx`, `ApplicationWizard.tsx`, `Card`, `app/blog/[id]/page.tsx`, `ServerDashboard.tsx`, `mailService.ts`, `MarketDiffusion.tsx`, `BulkImport.tsx`, `MemberDirectory.tsx`, `package.json`, `MailForm.tsx`, `users/[id]/page.tsx`, `app/layout.tsx`, `normalizeIban`, `Button`, `dashboard/page.tsx`, `feeService.ts`, `featureFlagService.ts`, `zahlungen/page.tsx`, `cn`, `Container`, `index.ts`, `altcha.d.ts`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _421 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Callout` be split into smaller, more focused modules?**
  _Cohesion score 0.07966457023060797 - nodes in this community are weakly interconnected._
- **Should `EditUserForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0989247311827957 - nodes in this community are weakly interconnected._