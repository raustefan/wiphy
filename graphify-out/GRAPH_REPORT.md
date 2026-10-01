# Graph Report - wiphy  (2026-10-01)

## Corpus Check
- 333 files · ~150,183 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1894 nodes · 6226 edges · 91 communities (78 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a378ed63`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- AppError
- ApplicationWizard.tsx
- Callout
- zertifikat/pdf/route.ts
- boardService.ts
- formatDate
- authz.ts
- mailService.ts
- blogService.ts
- security/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- EditUserForm.tsx
- MailForm
- package.json
- dependencies
- users/page.tsx
- isFeatureEnabled
- schemas.ts
- impressum/page.tsx
- slug.ts
- app/layout.tsx
- MemberDirectory.tsx
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- gravityPhysics.ts
- featureFlagService.ts
- membershipCertificate.ts
- errors.ts
- sepa/route.ts
- feeService.ts
- MailForm.tsx
- boardImages.ts
- zahlungen/page.tsx
- ButtonLink
- compilerOptions
- devDependencies
- index.ts
- normalizeIban
- react
- RateLimitTable
- BulkImport.tsx
- mail/actions.ts
- photo/route.ts
- passwordStrength.ts
- userUpdateData.ts
- MarkdownEditor.tsx
- dashboard/page.tsx
- app/page.tsx
- ActivityHeatmap.tsx
- securityEventService.ts
- ApplicationList
- format.ts
- RegistrationFunnel.tsx
- ServerDashboard.tsx
- EditUserForm
- berlinTime.ts
- seed.ts
- rateLimitService.ts
- formatNumber
- getOptionalUser
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- forgot-password/layout.tsx
- eslint.config.mjs
- mail/page.tsx
- DeleteMemberSection
- CLAUDE.md
- login/page.tsx
- TypeSparklines.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- accountActions.ts
- altcha.d.ts
- postcss.config.mjs
- feeDefaults.ts
- ref_node_assert
- { GET, POST }
- app/termine/[id]/page.tsx
- executeAction
- userService.ts
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 117 edges
2. `AppError` - 88 edges
3. `lucide-react` - 83 edges
4. `cn()` - 82 edges
5. `react` - 68 edges
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
- `generateMetadata()` --calls--> `pageMetadata()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/metadata.ts
- `FeatureFlagToggle()` --indirect_call--> `setFeatureFlag()`  [INFERRED]
  src/app/dashboard/feature-flags/FeatureFlagToggle.tsx → src/app/dashboard/feature-flags/actions.ts
- `ContactRequestList()` --indirect_call--> `markContactRequestHandled()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts

## Import Cycles
- None detected.

## Communities (91 total, 13 thin omitted)

### Community 0 - "next"
Cohesion: 0.08
Nodes (36): nextConfig, lucide-react, next, metadata, AdminBlogPage(), metadata, DashboardPageHeader(), DashboardPageHeaderProps (+28 more)

### Community 1 - "AppError"
Cohesion: 0.13
Nodes (31): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), submitMembershipApplication(), withdrawMembershipApplication(), membershipApplicationNoticeMessage(), membershipReceivedMessage() (+23 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (31): BankValues, InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), PaymentOption() (+23 more)

### Community 3 - "Callout"
Cohesion: 0.07
Nodes (40): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, EmailChangeForm(), PasswordChangeButton(), toggleAllDay(), EventFormData, toDateTimeValue() (+32 more)

### Community 4 - "zertifikat/pdf/route.ts"
Cohesion: 0.21
Nodes (15): @react-pdf/renderer, GET(), GET(), DashboardPage(), ZahlungenPage(), certificateFacts, isCertifiableStatus(), loadLogoDataUrl() (+7 more)

### Community 5 - "boardService.ts"
Cohesion: 0.15
Nodes (24): EditBoardMemberPage(), moveMemberOrder(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember(), deleteMemberById() (+16 more)

### Community 6 - "formatDate"
Cohesion: 0.17
Nodes (21): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props (+13 more)

### Community 7 - "authz.ts"
Cohesion: 0.06
Nodes (51): ref_node_child_process, ref_node_fs, ref_node_os, ref_node_util, BACKGROUND, icon(), main(), GET() (+43 more)

### Community 8 - "mailService.ts"
Cohesion: 0.07
Nodes (46): sanitize-html, blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailMessage, EmailSignature, nl2br() (+38 more)

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (63): sharp, POST(), beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages() (+55 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.26
Nodes (10): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+2 more)

### Community 11 - "events.ts"
Cohesion: 0.10
Nodes (40): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), HomePage(), EventDetailPage(), dynamic, metadata, NextEventCard() (+32 more)

### Community 12 - "ics.ts"
Cohesion: 0.22
Nodes (16): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), calendar(), describe() (+8 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.11
Nodes (28): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+20 more)

### Community 14 - "EditUserForm.tsx"
Cohesion: 0.20
Nodes (6): ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData

### Community 15 - "MailForm"
Cohesion: 0.16
Nodes (10): byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, formatStatus(), formatStatusShort(), getStatusTone() (+2 more)

### Community 16 - "package.json"
Cohesion: 0.10
Nodes (19): name, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer, react-dom (+11 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "users/page.tsx"
Cohesion: 0.12
Nodes (22): dynamic, MembershipApplicationsPage(), metadata, DialogButton(), DirectoryAccount, metadata, StatTile(), UserManagementPage() (+14 more)

### Community 19 - "isFeatureEnabled"
Cohesion: 0.10
Nodes (29): ref_crypto, KontoPage(), submitContactRequest(), dynamic, KontaktPage(), metadata, AccountDisabledError, CaptchaFailedError (+21 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (28): AdminCreateUserInput, BankUpdateParsed, berlinDateTime(), blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema (+20 more)

### Community 21 - "impressum/page.tsx"
Cohesion: 0.16
Nodes (11): DATENSCHUTZ, metadata, impressum(), ImpressumPage(), metadata, SATZUNG, LegalBlock, LegalDocument (+3 more)

### Community 22 - "slug.ts"
Cohesion: 0.22
Nodes (10): GET(), buildEventIcs(), icsFileName(), getPublicEvent, GERMAN_LETTERS, idFromSegment(), safeDecode(), slugify() (+2 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.08
Nodes (22): escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono, alt (+14 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.09
Nodes (27): CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), UserPaymentHistoryDialog(), MemberDirectory() (+19 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (12): columnPath(), labelStride(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline(), PAD (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.16
Nodes (20): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), WithdrawApplicationButton() (+12 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.10
Nodes (36): collectAndDetachBodies(), GravityEasterEgg(), GravityPreset, PhysicsBody, place(), PRESETS, WebAudioFx, AUDIBLE_IMPACT (+28 more)

### Community 28 - "featureFlagService.ts"
Cohesion: 0.19
Nodes (14): @prisma/client, setFeatureFlag(), removeRateLimitEntry(), triggerDeploy(), ServerPage(), FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER (+6 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.20
Nodes (17): berlinYear(), CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDuration(), formatMembershipDurationDative(), formatPaidYears() (+9 more)

### Community 30 - "errors.ts"
Cohesion: 0.20
Nodes (11): zod, bulkCreateUsersAction(), createUserAction(), importRowsSchema, getRedirectTarget(), isRedirectError(), RedirectTarget, AppErrorCode (+3 more)

### Community 31 - "sepa/route.ts"
Cohesion: 0.26
Nodes (14): field(), POST(), SepaDialog(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+6 more)

### Community 32 - "feeService.ts"
Cohesion: 0.15
Nodes (21): FeeBreakdown, feeRetentionCutoffYear(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), pruneArchivedFees() (+13 more)

### Community 33 - "MailForm.tsx"
Cohesion: 0.10
Nodes (16): @tiptap/react, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, EmailBodyField(), useEmailEditor() (+8 more)

### Community 34 - "boardImages.ts"
Cohesion: 0.18
Nodes (11): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, formatBytes(), MAX_BOARD_PHOTO_UPLOAD_BYTES (+3 more)

### Community 35 - "zahlungen/page.tsx"
Cohesion: 0.14
Nodes (27): AmountDialog(), explainFee(), FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), dynamic (+19 more)

### Community 36 - "ButtonLink"
Cohesion: 0.19
Nodes (10): metadata, dynamic, metadata, Block(), LegalPage(), LegalSections(), renderInline(), ButtonLink() (+2 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "index.ts"
Cohesion: 0.08
Nodes (38): CtaCard(), InfoTooltip(), RateLimitTableProps, chipTones, GROUPS, SortKey, StatusChip(), FeeDefaultRow (+30 more)

### Community 40 - "normalizeIban"
Cohesion: 0.29
Nodes (15): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+7 more)

### Community 41 - "react"
Cohesion: 0.08
Nodes (30): react, DeletePostButton(), ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat, STATUS_META (+22 more)

### Community 42 - "RateLimitTable"
Cohesion: 0.33
Nodes (5): getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo()

### Community 43 - "BulkImport.tsx"
Cohesion: 0.22
Nodes (9): ImportRowResult, BulkImport(), loadFile(), run(), EXAMPLE, FIELDS, Row, toRow() (+1 more)

### Community 44 - "mail/actions.ts"
Cohesion: 0.43
Nodes (6): parseMailForm(), sendEmailAction(), sendMailForTarget(), enforceAdminMailRateLimit(), getAnnouncedEvent(), mailSendSchema

### Community 45 - "photo/route.ts"
Cohesion: 0.38
Nodes (6): POST(), processBoardPhoto(), memberExists(), upsertPhoto(), memberExists(), setMemberPhoto()

### Community 46 - "passwordStrength.ts"
Cohesion: 0.19
Nodes (10): NewUserForm(), handleSubmit(), PasswordStrengthMeter(), evaluatePassword(), generatePassword(), PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 47 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 48 - "MarkdownEditor.tsx"
Cohesion: 0.40
Nodes (4): @uiw/react-markdown-preview, @uiw/react-md-editor, MarkdownEditor(), MDEditor

### Community 49 - "dashboard/page.tsx"
Cohesion: 0.16
Nodes (11): ContactRequestList(), confirmDelete(), run(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog(), SectionHeader() (+3 more)

### Community 50 - "app/page.tsx"
Cohesion: 0.11
Nodes (15): metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory, TimelineDetail() (+7 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "securityEventService.ts"
Cohesion: 0.15
Nodes (19): SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), emptyCounts() (+11 more)

### Community 53 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 54 - "format.ts"
Cohesion: 0.12
Nodes (13): statusMeta(), TerminationList(), confirm(), AccountSection(), DATE_TIME, EURO, formatDateTime(), LONG_DATE (+5 more)

### Community 55 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 56 - "ServerDashboard.tsx"
Cohesion: 0.31
Nodes (6): DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel()

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "berlinTime.ts"
Cohesion: 0.26
Nodes (15): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+7 more)

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 62 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 63 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

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
Cohesion: 0.17
Nodes (13): MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata (+5 more)

### Community 71 - "login/page.tsx"
Cohesion: 0.31
Nodes (6): dynamic, LoginPage(), metadata, NOTICES, Props, internalPath()

### Community 72 - "TypeSparklines.tsx"
Cohesion: 0.33
Nodes (8): longDayLabel(), sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.12
Nodes (31): EditBlogPage(), EditEventPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventById() (+23 more)

### Community 77 - "accountActions.ts"
Cohesion: 0.11
Nodes (35): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination(), ActionResult (+27 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "feeDefaults.ts"
Cohesion: 0.22
Nodes (13): FeeDefaultEntry, FeeRates, resolveFeeDefault(), FALLBACK_FEE_DEFAULT, deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeDefaults() (+5 more)

### Community 87 - "ref_node_assert"
Cohesion: 0.19
Nodes (8): ref_node_assert, ref_node_test, MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, membershipApplicationSchema, legitimate, base

### Community 92 - "app/termine/[id]/page.tsx"
Cohesion: 0.15
Nodes (12): react-markdown, remark-gfm, dynamic, generateMetadata(), Props, MarkdownViewer(), shiftedHeadings, ShareButton() (+4 more)

### Community 93 - "executeAction"
Cohesion: 0.13
Nodes (41): deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), ContactRequestsPage(), requestEmailChangeAction(), removeMembershipApplication(), createEventDraft() (+33 more)

### Community 99 - "userService.ts"
Cohesion: 0.08
Nodes (65): bcryptjs, ref_node_net, POST(), POST(), notifyAdminsAboutRegistration(), POST(), EMAIL_CHANGE_ERRORS, requestPasswordChange() (+57 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **434 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+429 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 555 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `AppError`, `ApplicationWizard.tsx`, `Callout`, `zertifikat/pdf/route.ts`, `formatDate`, `authz.ts`, `blogService.ts`, `security/page.tsx`, `events.ts`, `ics.ts`, `EditUserForm.tsx`, `package.json`, `users/page.tsx`, `isFeatureEnabled`, `impressum/page.tsx`, `slug.ts`, `app/layout.tsx`, `MemberDirectory.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `featureFlagService.ts`, `errors.ts`, `sepa/route.ts`, `MailForm.tsx`, `zahlungen/page.tsx`, `ButtonLink`, `index.ts`, `react`, `mail/actions.ts`, `photo/route.ts`, `MarkdownEditor.tsx`, `dashboard/page.tsx`, `app/page.tsx`, `getOptionalUser`, `forgot-password/layout.tsx`, `mail/page.tsx`, `login/page.tsx`, `accountActions.ts`, `app/termine/[id]/page.tsx`, `executeAction`, `userService.ts`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `next`, `ApplicationWizard.tsx`, `Callout`, `formatDate`, `authz.ts`, `blogService.ts`, `MarketDiffusion.tsx`, `EditUserForm.tsx`, `package.json`, `users/page.tsx`, `app/layout.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `MailForm.tsx`, `ButtonLink`, `index.ts`, `normalizeIban`, `BulkImport.tsx`, `MarkdownEditor.tsx`, `dashboard/page.tsx`, `app/page.tsx`, `ServerDashboard.tsx`, `eventService.ts`, `accountActions.ts`, `altcha.d.ts`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `next` to `ApplicationWizard.tsx`, `Callout`, `formatDate`, `authz.ts`, `security/page.tsx`, `events.ts`, `MarketDiffusion.tsx`, `EditUserForm.tsx`, `MailForm`, `package.json`, `users/page.tsx`, `app/layout.tsx`, `MemberDirectory.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `gravityPhysics.ts`, `MailForm.tsx`, `zahlungen/page.tsx`, `ButtonLink`, `index.ts`, `react`, `dashboard/page.tsx`, `app/page.tsx`, `RegistrationFunnel.tsx`, `ServerDashboard.tsx`, `formatNumber`, `accountActions.ts`, `app/termine/[id]/page.tsx`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _434 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.07650273224043716 - nodes in this community are weakly interconnected._
- **Should `AppError` be split into smaller, more focused modules?**
  _Cohesion score 0.12612612612612611 - nodes in this community are weakly interconnected._