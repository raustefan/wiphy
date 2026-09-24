# Graph Report - wiphy  (2026-09-24)

## Corpus Check
- 296 files · ~122,535 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1603 nodes · 5113 edges · 81 communities (71 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7976db3b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LoginForm.tsx
- FeesTable.tsx
- cn
- next
- ApplicationList.tsx
- boardService.ts
- userService.ts
- AppError
- ApplicationWizard.tsx
- blogService.ts
- BoardPhotoUploader.tsx
- zahlungen/page.tsx
- eventService.ts
- MarketDiffusion.tsx
- mitgliedsantraege/actions.ts
- app/layout.tsx
- package.json
- dependencies
- app/kontakt/actions.ts
- isFeatureEnabled
- schemas.ts
- requireAdmin
- ics.ts
- altcha.ts
- index.ts
- OutcomeTimeline.tsx
- security/page.tsx
- formatDate
- membershipService.ts
- membershipCertificate.ts
- feeService.ts
- mitglied-werden/page.tsx
- events.ts
- blog/actions.ts
- DashboardUsersTable.tsx
- berlinTime.ts
- app/page.tsx
- compilerOptions
- devDependencies
- messages.ts
- userUpdateData.ts
- blogImages.ts
- dashboard/page.tsx
- iban.ts
- datenschutz/page.tsx
- fees/page.tsx
- mail/page.tsx
- securityEventService.ts
- format.ts
- RateLimitTable
- vorstand/actions.ts
- blogImageProcessing.ts
- authz.ts
- getOptionalUser
- formatNumber
- new/page.tsx
- membershipFees.test.ts
- EditUserForm
- EmailBodyField.tsx
- seed.ts
- getFeeDashboardData
- RegistrationFunnel.tsx
- rateLimitService.ts
- login/layout.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- ActivityHeatmap.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- mitglied-werden/actions.ts
- CLAUDE.md
- MarkdownViewer.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- eslint.config.mjs
- DeleteMemberSection
- altcha.d.ts
- forgot-password/layout.tsx
- postcss.config.mjs
- { GET, POST }

## God Nodes (most connected - your core abstractions)
1. `next` - 102 edges
2. `cn()` - 77 edges
3. `AppError` - 70 edges
4. `lucide-react` - 68 edges
5. `requireAdmin()` - 61 edges
6. `react` - 53 edges
7. `executeAction()` - 52 edges
8. `Card()` - 44 edges
9. `Button()` - 38 edges
10. `isFeatureEnabled()` - 38 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `BlogImageManager()` --indirect_call--> `deleteBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `moveBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `saveBlogImageAlt()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `setBlogCoverImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts

## Import Cycles
- None detected.

## Communities (81 total, 10 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.08
Nodes (33): FeatureFlagToggle(), FeatureFlagToggleProps, EventFormData, ForgotPasswordPage(), FaqItem, LoginFaq(), SECTIONS, AccountPanel() (+25 more)

### Community 1 - "FeesTable.tsx"
Cohesion: 0.05
Nodes (50): sanitize-html, AmountDialog(), compareBy(), displayName(), explainFee(), FeesSortKey, FeesTable(), selectAllWithOpenFees() (+42 more)

### Community 2 - "cn"
Cohesion: 0.06
Nodes (38): CtaCard(), categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory, TimelineDetail() (+30 more)

### Community 3 - "next"
Cohesion: 0.07
Nodes (25): nextConfig, next, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, dynamic, metadata (+17 more)

### Community 4 - "ApplicationList.tsx"
Cohesion: 0.17
Nodes (15): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), ApplicationItem, ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete() (+7 more)

### Community 5 - "boardService.ts"
Cohesion: 0.13
Nodes (28): POST(), EditBoardMemberPage(), AdminBoardPage(), moveMemberOrder(), processBoardPhoto(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData (+20 more)

### Community 6 - "userService.ts"
Cohesion: 0.15
Nodes (23): ref_crypto, checkLoginFeatureEnabled(), createLoginChallenge(), resendVerificationEmail(), LoginForm(), adapter, globalForPrisma, getSecurityLogPepper() (+15 more)

### Community 7 - "AppError"
Cohesion: 0.16
Nodes (23): zod, parseMailForm(), sendEmailAction(), removeRateLimitEntry(), deleteEventAction(), revalidateEvent(), saveEventAction(), getRedirectTarget() (+15 more)

### Community 8 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (27): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, ageAt(), CONSENT_VERSION, DATENSCHUTZ_URL (+19 more)

### Community 9 - "blogService.ts"
Cohesion: 0.10
Nodes (34): EditBlogPage(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost(), deleteImage(), deletePostById(), eventLinkSelect (+26 more)

### Community 10 - "BoardPhotoUploader.tsx"
Cohesion: 0.17
Nodes (14): BoardPhotoUploader(), handleDrop(), uploadFile(), PhotoMeta, getInitials(), VorstandPage(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE (+6 more)

### Community 11 - "zahlungen/page.tsx"
Cohesion: 0.12
Nodes (30): FeeDefaultsCard(), run(), save(), updateBankDetails(), BankDetailsForm(), submit(), BankValues, dynamic (+22 more)

### Community 12 - "eventService.ts"
Cohesion: 0.12
Nodes (29): AdminEventsPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventOptions(), findLatestPastEvent() (+21 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (29): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+21 more)

### Community 14 - "mitgliedsantraege/actions.ts"
Cohesion: 0.21
Nodes (11): removeMembershipApplication(), MEMBERSHIP_ADMIN_PATH, applicationStudySchema, deleteApplication(), src_lib_server_services_membershipservice_getapplication, applicationDecisionSchema, applicationIdSchema, applicationRejectSchema (+3 more)

### Community 15 - "app/layout.tsx"
Cohesion: 0.08
Nodes (24): ref_node_fs, ref_node_path, escapeXml(), GET(), metadata, src_app_globals, body, metadata (+16 more)

### Community 16 - "package.json"
Cohesion: 0.07
Nodes (28): name, prisma, seed, private, version, altcha, babel-plugin-react-compiler, next-auth (+20 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+19 more)

### Community 18 - "app/kontakt/actions.ts"
Cohesion: 0.17
Nodes (17): markContactRequestHandled(), removeContactRequest(), ContactRequestsPage(), submitContactRequest(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage() (+9 more)

### Community 19 - "isFeatureEnabled"
Cohesion: 0.12
Nodes (32): bcryptjs, POST(), POST(), notifyAdminsAboutRegistration(), POST(), SecurityPage(), registerUser(), CaptchaFailedError (+24 more)

### Community 20 - "schemas.ts"
Cohesion: 0.07
Nodes (22): BankUpdateParsed, berlinDateTime(), blogDeleteSchema, blogImageSchema, contactSchema, directMailSchema, emailField, eventDeleteSchema (+14 more)

### Community 21 - "requireAdmin"
Cohesion: 0.23
Nodes (20): createDraft(), deletePost(), savePost(), FeatureFlagsPage(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault() (+12 more)

### Community 22 - "ics.ts"
Cohesion: 0.15
Nodes (21): RFC-5545, GET(), GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs() (+13 more)

### Community 23 - "altcha.ts"
Cohesion: 0.13
Nodes (19): altcha-lib, ContactForm(), dynamic, KontaktPage(), metadata, dynamic, internalPath(), LoginPage() (+11 more)

### Community 24 - "index.ts"
Cohesion: 0.13
Nodes (31): lucide-react, react, DeletePostButton(), metadata, FeeDefaultRow, ContactRequestItem, dateFormat, InfoTooltip() (+23 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "security/page.tsx"
Cohesion: 0.19
Nodes (15): sparkGeometry, dynamic, metadata, OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, TYPE_LABELS, TYPE_ORDER (+7 more)

### Community 27 - "formatDate"
Cohesion: 0.23
Nodes (9): MetaLine(), UserPaymentHistoryDialog(), ContactRequestList(), confirmDelete(), run(), MembershipCertificateCard(), SectionHeader(), buttonClasses() (+1 more)

### Community 28 - "membershipService.ts"
Cohesion: 0.20
Nodes (16): dynamic, MembershipApplicationsPage(), metadata, FeeDefaultEntry, planApplicationFees(), resolveFeeDefault(), findApplicationById(), findApplications() (+8 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.17
Nodes (23): @react-pdf/renderer, GET(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative() (+15 more)

### Community 30 - "feeService.ts"
Cohesion: 0.21
Nodes (17): clearFeeAmountOverride(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), resolveIsStudentDefault(), syncStudentYear(), updateFeeComment(), upsertFeeAmount() (+9 more)

### Community 31 - "mitglied-werden/page.tsx"
Cohesion: 0.22
Nodes (14): JourneyRail(), dynamic, metadata, MitgliedWerdenPage(), Props, JOURNEY_STEPS, JourneyStage, JourneyState (+6 more)

### Community 32 - "events.ts"
Cohesion: 0.10
Nodes (21): ref_node_assert, ref_node_test, TIME_ZONE, CALENDAR_ICS_PATH, DAY_MONTH, DAY_MONTH_YEAR, daysUntilEvent(), DEFAULT_DURATION_MINUTES (+13 more)

### Community 33 - "blog/actions.ts"
Cohesion: 0.26
Nodes (17): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), applyImageOrder() (+9 more)

### Community 34 - "DashboardUsersTable.tsx"
Cohesion: 0.11
Nodes (17): @prisma/client, compareBy(), DashboardTableUser, DashboardUsersTable(), displayName(), getStatusIcon(), SortKey, STATUS_RANK (+9 more)

### Community 35 - "berlinTime.ts"
Cohesion: 0.24
Nodes (16): EventForm(), toggleAllDay(), toDateTimeValue(), toDayValue(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay() (+8 more)

### Community 36 - "app/page.tsx"
Cohesion: 0.08
Nodes (50): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), PostCard(), Props, AdminBlogPage() (+42 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography, ts-node (+10 more)

### Community 39 - "messages.ts"
Cohesion: 0.31
Nodes (10): adminCreatedUserMessage(), emailChangeMessage(), feeReminderMessage(), greeting(), LINK_EXPIRY(), membershipApprovedMessage(), membershipRejectedMessage(), passwordResetMessage() (+2 more)

### Community 40 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 41 - "blogImages.ts"
Cohesion: 0.19
Nodes (11): BlogImageManager(), handleDrop(), uploadFiles(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, formatBytes() (+3 more)

### Community 42 - "dashboard/page.tsx"
Cohesion: 0.16
Nodes (16): EmailChangeDialog(), MailSuccessDialog(), ADMIN_ACTIONS, DashboardPage(), QueryParamDialog(), deleteUserAction(), EditUserPage(), metadata (+8 more)

### Community 43 - "iban.ts"
Cohesion: 0.29
Nodes (13): SummaryBlock(), IbanInput(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban(), maskIban() (+5 more)

### Community 44 - "datenschutz/page.tsx"
Cohesion: 0.16
Nodes (10): DATENSCHUTZ, metadata, IMPRESSUM, metadata, SATZUNG, LegalPage(), LegalSections(), LegalBlock (+2 more)

### Community 45 - "fees/page.tsx"
Cohesion: 0.28
Nodes (10): FeesDashboardPage(), metadata, deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeDefaults(), getFeeRatesForYear(), removeFeeDefault() (+2 more)

### Community 46 - "mail/page.tsx"
Cohesion: 0.16
Nodes (15): MailDashboard(), MailEventOption, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage(), sitemap() (+7 more)

### Community 47 - "securityEventService.ts"
Cohesion: 0.15
Nodes (18): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap() (+10 more)

### Community 48 - "format.ts"
Cohesion: 0.22
Nodes (9): DATE_TIME, EURO, formatDateTime(), LONG_DATE, NUMBER, SHORT_DATE, toDate(), SUMMER (+1 more)

### Community 49 - "RateLimitTable"
Cohesion: 0.33
Nodes (5): getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo()

### Community 50 - "vorstand/actions.ts"
Cohesion: 0.22
Nodes (14): deleteMember(), deletePhotoAction(), moveMemberInList(), parseOrThrow(), revalidateBoard(), saveMember(), handleDelete(), deleteMemberById() (+6 more)

### Community 51 - "blogImageProcessing.ts"
Cohesion: 0.18
Nodes (9): sharp, BACKGROUND, icon(), main(), MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, processBlogImage(), ProcessedBlogImage (+1 more)

### Community 52 - "authz.ts"
Cohesion: 0.24
Nodes (9): setFeatureFlag(), FeatureDisabledQueryDialog(), FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, isFeatureFlagKey(), UserContext, FeatureFlagWithMeta (+1 more)

### Community 53 - "getOptionalUser"
Cohesion: 0.27
Nodes (8): GET(), POST(), GET(), GET(), getOptionalUser(), normalizeRole(), findImageBytes(), findPhotoBytes()

### Community 54 - "formatNumber"
Cohesion: 0.25
Nodes (9): ReasonBars(), reasonLabel(), Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, formatNumber() (+1 more)

### Community 55 - "new/page.tsx"
Cohesion: 0.08
Nodes (26): ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, metadata, NewUserPage() (+18 more)

### Community 56 - "membershipFees.test.ts"
Cohesion: 0.38
Nodes (5): ApplicationStage(), toDateInput(), deriveStudentYears(), selectableStudentYears(), defaults

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 59 - "seed.ts"
Cohesion: 0.25
Nodes (5): adapter, prisma, dotenv, prisma, @prisma/adapter-pg

### Community 60 - "getFeeDashboardData"
Cohesion: 0.33
Nodes (7): GET(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee, getFeeDashboardData()

### Community 61 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 62 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 69 - "mitglied-werden/actions.ts"
Cohesion: 0.21
Nodes (15): nodemailer, submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), membershipApplicationNoticeMessage(), membershipReceivedMessage(), getMailTransporter() (+7 more)

### Community 72 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 77 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **393 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+388 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 498 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `FeesTable.tsx`, `cn`, `userService.ts`, `AppError`, `ApplicationWizard.tsx`, `BoardPhotoUploader.tsx`, `zahlungen/page.tsx`, `MarketDiffusion.tsx`, `mitgliedsantraege/actions.ts`, `app/layout.tsx`, `package.json`, `app/kontakt/actions.ts`, `isFeatureEnabled`, `requireAdmin`, `ics.ts`, `altcha.ts`, `index.ts`, `security/page.tsx`, `membershipService.ts`, `membershipCertificate.ts`, `mitglied-werden/page.tsx`, `blog/actions.ts`, `app/page.tsx`, `dashboard/page.tsx`, `datenschutz/page.tsx`, `fees/page.tsx`, `mail/page.tsx`, `vorstand/actions.ts`, `authz.ts`, `getOptionalUser`, `new/page.tsx`, `getFeeDashboardData`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`, `mitglied-werden/actions.ts`, `forgot-password/layout.tsx`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **Why does `react` connect `index.ts` to `LoginForm.tsx`, `FeesTable.tsx`, `DashboardUsersTable.tsx`, `next`, `ApplicationList.tsx`, `cn`, `app/page.tsx`, `ApplicationWizard.tsx`, `dashboard/page.tsx`, `BoardPhotoUploader.tsx`, `zahlungen/page.tsx`, `fees/page.tsx`, `MarketDiffusion.tsx`, `iban.ts`, `package.json`, `altcha.d.ts`, `new/page.tsx`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `index.ts` to `LoginForm.tsx`, `FeesTable.tsx`, `cn`, `next`, `ApplicationList.tsx`, `ApplicationWizard.tsx`, `BoardPhotoUploader.tsx`, `zahlungen/page.tsx`, `MarketDiffusion.tsx`, `package.json`, `OutcomeTimeline.tsx`, `security/page.tsx`, `formatDate`, `membershipService.ts`, `mitglied-werden/page.tsx`, `DashboardUsersTable.tsx`, `app/page.tsx`, `dashboard/page.tsx`, `formatNumber`, `new/page.tsx`, `RegistrationFunnel.tsx`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _393 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LoginForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08176100628930817 - nodes in this community are weakly interconnected._
- **Should `FeesTable.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05311676909569798 - nodes in this community are weakly interconnected._