# Graph Report - wiphy  (2026-09-30)

## Corpus Check
- 338 files · ~141,500 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1773 nodes · 5827 edges · 88 communities (75 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2337e3a0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- EventForm.tsx
- AccountSection.tsx
- ApplicationWizard.tsx
- next
- auth.ts
- boardService.ts
- mailService.ts
- serverStatus.ts
- berlinTime.ts
- blogService.ts
- security/page.tsx
- blogImageProcessing.ts
- eventService.ts
- MarketDiffusion.tsx
- vorstand/actions.ts
- app/layout.tsx
- package.json
- dependencies
- isFeatureEnabled
- mail/page.tsx
- schemas.ts
- executeAction
- DeleteMemberSection
- app/blog/[id]/page.tsx
- blog/actions.ts
- OutcomeTimeline.tsx
- mitglied-werden/page.tsx
- AppError
- mailHistory.ts
- ref_node_assert
- ServerDashboard.tsx
- format.ts
- feeService.ts
- termine/actions.ts
- ics.ts
- satzung/page.tsx
- sepa/route.ts
- compilerOptions
- devDependencies
- formatEventShort
- feeDefaults.ts
- lucide-react
- MarkdownEditor.tsx
- FeesTable.tsx
- LegalPage.tsx
- events.ts
- securityEventService.ts
- sendEmail
- htmlToText.ts
- mail/actions.ts
- sitemap.ts
- ActivityHeatmap.tsx
- SecurityPage
- EmailBodyField.tsx
- MailForm.tsx
- userService.ts
- index.ts
- EditUserForm
- redirectError.ts
- seed.ts
- ContactRequestList.tsx
- normalizeIban
- forgot-password/layout.tsx
- images/[id]/route.ts
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- mitgliedsantraege/actions.ts
- login/layout.tsx
- prisma.ts
- reset-password/layout.tsx
- CLAUDE.md
- app/blog/page.tsx
- verify-email/layout.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- formatNumber
- ShareButton
- featureFlagService.ts
- dashboard/page.tsx
- altcha.d.ts
- EmailComposerDialog
- postcss.config.mjs
- messages.ts
- { GET, POST }
- ApplicationList
- MarkdownViewer.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 111 edges
2. `AppError` - 84 edges
3. `cn()` - 80 edges
4. `lucide-react` - 77 edges
5. `react` - 61 edges
6. `executeAction()` - 59 edges
7. `requireAdmin()` - 56 edges
8. `Card()` - 48 edges
9. `Button()` - 44 edges
10. `isFeatureEnabled()` - 40 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `FeeDefaultsCard()` --indirect_call--> `deleteFeeDefaultYear()`  [INFERRED]
  src/app/dashboard/fees/FeeDefaultsCard.tsx → src/app/dashboard/fees/actions.ts
- `save()` --indirect_call--> `saveFeeDefault()`  [INFERRED]
  src/app/dashboard/fees/FeeDefaultsCard.tsx → src/app/dashboard/fees/actions.ts
- `StatusChip()` --calls--> `cn()`  [EXTRACTED]
  src/app/dashboard/fees/FeesTable.tsx → src/lib/cn.ts
- `MailForm()` --indirect_call--> `sendEmailAction()`  [INFERRED]
  src/app/dashboard/mail/MailForm.tsx → src/app/dashboard/mail/actions.ts

## Import Cycles
- None detected.

## Communities (88 total, 13 thin omitted)

### Community 0 - "EventForm.tsx"
Cohesion: 0.08
Nodes (40): toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), ForgotPasswordPage(), ContactForm(), createLoginChallenge(), FaqItem (+32 more)

### Community 1 - "AccountSection.tsx"
Cohesion: 0.09
Nodes (28): compareBy(), displayName(), FeesTable(), selectAllWithOpenFees(), hasOpenFee(), ActionResult, Mode, OwnTermination (+20 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (33): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), PaymentOption(), ageAt() (+25 more)

### Community 3 - "next"
Cohesion: 0.07
Nodes (47): nextConfig, next, GET(), DeletePostButton(), metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+39 more)

### Community 4 - "auth.ts"
Cohesion: 0.12
Nodes (22): ref_node_net, POST(), AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError (+14 more)

### Community 5 - "boardService.ts"
Cohesion: 0.07
Nodes (50): POST(), GET(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), PhotoMeta, EditBoardMemberPage() (+42 more)

### Community 6 - "mailService.ts"
Cohesion: 0.19
Nodes (16): parseDirectMailForm(), sendDirectMailAction(), htmlToText(), AnnouncedEvent, composeMessage(), eventBlocks(), greeting(), MailTarget (+8 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.05
Nodes (48): ref_node_child_process, ref_node_fs, ref_node_os, ref_node_path, ref_node_util, BACKGROUND, icon(), main() (+40 more)

### Community 8 - "berlinTime.ts"
Cohesion: 0.32
Nodes (13): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+5 more)

### Community 9 - "blogService.ts"
Cohesion: 0.09
Nodes (41): EditBlogPage(), metadata, AdminBlogPage(), applyImageOrder(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost() (+33 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.18
Nodes (17): sparkGeometry, dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel() (+9 more)

### Community 11 - "blogImageProcessing.ts"
Cohesion: 0.24
Nodes (6): sharp, MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, processBlogImage(), ProcessedBlogImage, QUALITY_LADDER

### Community 12 - "eventService.ts"
Cohesion: 0.15
Nodes (24): UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findEventOptions(), findLatestPastEvent(), findNextUpcomingEvent(), findPastEvents() (+16 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (29): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+21 more)

### Community 14 - "vorstand/actions.ts"
Cohesion: 0.36
Nodes (9): deleteMember(), deletePhotoAction(), moveMemberInList(), parseOrThrow(), revalidateBoard(), saveMember(), boardDeleteSchema, boardMoveSchema (+1 more)

### Community 15 - "app/layout.tsx"
Cohesion: 0.08
Nodes (20): escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono, alt (+12 more)

### Community 16 - "package.json"
Cohesion: 0.10
Nodes (20): eslintConfig, name, private, version, altcha, babel-plugin-react-compiler, eslint, eslint-config-next (+12 more)

### Community 17 - "dependencies"
Cohesion: 0.08
Nodes (25): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+17 more)

### Community 18 - "isFeatureEnabled"
Cohesion: 0.19
Nodes (17): ContactRequestsPage(), submitContactRequest(), submitMembershipApplication(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), membershipApplicationNoticeMessage() (+9 more)

### Community 19 - "mail/page.tsx"
Cohesion: 0.18
Nodes (12): MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata (+4 more)

### Community 20 - "schemas.ts"
Cohesion: 0.09
Nodes (17): AdminCreateUserInput, BankUpdateParsed, berlinDateTime(), contactSchema, emailField, feeAmountUpdateSchema, feeCommentSchema, feeStatusUpdateSchema (+9 more)

### Community 21 - "executeAction"
Cohesion: 0.30
Nodes (17): createDraft(), deletePost(), savePost(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), updateFeeAmount() (+9 more)

### Community 23 - "app/blog/[id]/page.tsx"
Cohesion: 0.24
Nodes (14): generateMetadata(), Props, PublicBlogPost(), BlogPostingJsonLd(), OrganizationJsonLd(), readingTimeMinutes(), getPublishedPost(), absoluteUrl() (+6 more)

### Community 24 - "blog/actions.ts"
Cohesion: 0.19
Nodes (18): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager() (+10 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 26 - "mitglied-werden/page.tsx"
Cohesion: 0.10
Nodes (28): dynamic, KontaktPage(), metadata, dynamic, LoginPage(), metadata, NOTICES, Props (+20 more)

### Community 27 - "AppError"
Cohesion: 0.15
Nodes (27): zod, deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination() (+19 more)

### Community 28 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 29 - "ref_node_assert"
Cohesion: 0.06
Nodes (46): ref_node_assert, ref_node_test, @react-pdf/renderer, GET(), NewUserForm(), handleSubmit(), PasswordStrengthMeter(), moveInOrder() (+38 more)

### Community 30 - "ServerDashboard.tsx"
Cohesion: 0.36
Nodes (6): DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel()

### Community 31 - "format.ts"
Cohesion: 0.11
Nodes (21): MetaLine(), UserPaymentHistoryDialog(), MembershipCertificateCard(), confirmMembershipTermination(), statusMeta(), TerminationItem, TerminationList(), confirm() (+13 more)

### Community 32 - "feeService.ts"
Cohesion: 0.16
Nodes (22): FeesDashboardPage(), calculateFeeAmount(), FeeBreakdown, archiveFeesOfUser(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers() (+14 more)

### Community 33 - "termine/actions.ts"
Cohesion: 0.39
Nodes (7): deleteEventAction(), revalidateEvent(), saveEventAction(), removeEvent(), saveEvent(), eventDeleteSchema, eventSaveSchema

### Community 34 - "ics.ts"
Cohesion: 0.15
Nodes (21): RFC-5545, GET(), GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs() (+13 more)

### Community 35 - "satzung/page.tsx"
Cohesion: 0.14
Nodes (26): FeeDefaultRow, FeeDefaultsCard(), run(), save(), AmountDialog(), explainFee(), BankDetailsForm(), submit() (+18 more)

### Community 36 - "sepa/route.ts"
Cohesion: 0.26
Nodes (15): field(), POST(), SepaExportPage(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+7 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "formatEventShort"
Cohesion: 0.32
Nodes (7): AdminEventsPage(), eventEnd(), formatEventShort(), isPastEvent(), findAllEvents(), getAdminEvents(), START

### Community 40 - "feeDefaults.ts"
Cohesion: 0.19
Nodes (15): calculateFee(), FeeDefaultEntry, FeeRates, planApplicationFees(), resolveFeeDefault(), deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault() (+7 more)

### Community 41 - "lucide-react"
Cohesion: 0.13
Nodes (23): lucide-react, react, DeleteEventButton(), DeleteMemberSectionProps, EmailComposerDialogProps, FeatureDisabledDialog(), FeatureDisabledDialogProps, HeaderChrome() (+15 more)

### Community 42 - "MarkdownEditor.tsx"
Cohesion: 0.40
Nodes (4): @uiw/react-markdown-preview, @uiw/react-md-editor, MarkdownEditor(), MDEditor

### Community 43 - "FeesTable.tsx"
Cohesion: 0.08
Nodes (16): chipTones, FeesSortKey, FeesTableProps, FeesTableUser, StatusChip(), ApplicationItem, dateFormat, dateTimeFormat (+8 more)

### Community 44 - "LegalPage.tsx"
Cohesion: 0.16
Nodes (12): DATENSCHUTZ, metadata, IMPRESSUM, metadata, SATZUNG, Block(), LegalPage(), LegalSections() (+4 more)

### Community 45 - "events.ts"
Cohesion: 0.11
Nodes (39): generateMetadata(), DashboardEvent, UpcomingEventAlert(), HomePage(), dynamic, EventDetailPage(), generateMetadata(), Props (+31 more)

### Community 46 - "securityEventService.ts"
Cohesion: 0.16
Nodes (17): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap() (+9 more)

### Community 47 - "sendEmail"
Cohesion: 0.29
Nodes (12): notifyAdminsAboutRegistration(), POST(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), renderEmailText(), getMailTransporter(), normalize(), Recipients (+4 more)

### Community 48 - "htmlToText.ts"
Cohesion: 0.33
Nodes (4): sanitize-html, ENTITIES, ALLOWED_TAGS, sanitizeEmailHtml()

### Community 49 - "mail/actions.ts"
Cohesion: 0.53
Nodes (5): parseMailForm(), sendEmailAction(), sendMailForTarget(), getAnnouncedEvent(), mailSendSchema

### Community 50 - "sitemap.ts"
Cohesion: 0.60
Nodes (5): sitemap(), TerminePage(), getPublishedPosts(), getPastEvents(), getUpcomingEvents()

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 52 - "SecurityPage"
Cohesion: 0.13
Nodes (17): removeRateLimitEntry(), SecurityPage(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), ServerPage() (+9 more)

### Community 53 - "EmailBodyField.tsx"
Cohesion: 0.24
Nodes (7): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailBodyField(), EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 54 - "MailForm.tsx"
Cohesion: 0.17
Nodes (7): byStatusThenName(), MailForm(), MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS

### Community 55 - "userService.ts"
Cohesion: 0.16
Nodes (28): bcryptjs, ref_crypto, POST(), resendVerificationEmail(), registerUser(), prisma, getSecurityLogPepper(), normalizeEmail() (+20 more)

### Community 56 - "index.ts"
Cohesion: 0.06
Nodes (38): CtaCard(), InfoTooltip(), metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline() (+30 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "redirectError.ts"
Cohesion: 0.67
Nodes (3): getRedirectTarget(), isRedirectError(), RedirectTarget

### Community 59 - "seed.ts"
Cohesion: 0.25
Nodes (5): adapter, prisma, dotenv, prisma, @prisma/adapter-pg

### Community 60 - "ContactRequestList.tsx"
Cohesion: 0.31
Nodes (9): markContactRequestHandled(), removeContactRequest(), ContactRequestItem, ContactRequestList(), confirmDelete(), run(), dateFormat, deleteContactRequest() (+1 more)

### Community 61 - "normalizeIban"
Cohesion: 0.21
Nodes (19): ibanError(), IbanInput(), check(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+11 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "mitgliedsantraege/actions.ts"
Cohesion: 0.08
Nodes (39): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), MembershipApplicationsPage(), DashboardPage(), EmailMessage, berlinDateParts(), FEE_RECORD_RETENTION_YEARS (+31 more)

### Community 68 - "prisma.ts"
Cohesion: 0.25
Nodes (11): altcha-lib, createPrismaClient(), globalForPrisma, consumeAltchaSolution(), readExpiry(), readSignature(), verifyAltchaPayload(), getAltchaHmacKey() (+3 more)

### Community 71 - "app/blog/page.tsx"
Cohesion: 0.19
Nodes (13): BlogIndexPage(), PostCard(), Props, BlogGallery(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, blogImageSrcSet() (+5 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "formatNumber"
Cohesion: 0.13
Nodes (17): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+9 more)

### Community 78 - "featureFlagService.ts"
Cohesion: 0.18
Nodes (14): @prisma/client, POST(), GET(), setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS (+6 more)

### Community 79 - "dashboard/page.tsx"
Cohesion: 0.09
Nodes (24): compareBy(), DashboardTableUser, DashboardUsersTable(), displayName(), getStatusIcon(), SortKey, STATUS_RANK, EmailChangeDialog() (+16 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "EmailComposerDialog"
Cohesion: 0.50
Nodes (4): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 85 - "messages.ts"
Cohesion: 0.24
Nodes (14): accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage(), greeting(), LINK_EXPIRY(), loginDisabledMessage(), membershipApprovedMessage(), membershipReceivedMessage() (+6 more)

### Community 89 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 92 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **416 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+411 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 532 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `EventForm.tsx`, `AccountSection.tsx`, `ApplicationWizard.tsx`, `auth.ts`, `boardService.ts`, `serverStatus.ts`, `blogService.ts`, `security/page.tsx`, `MarketDiffusion.tsx`, `vorstand/actions.ts`, `app/layout.tsx`, `package.json`, `isFeatureEnabled`, `mail/page.tsx`, `executeAction`, `app/blog/[id]/page.tsx`, `blog/actions.ts`, `mitglied-werden/page.tsx`, `AppError`, `ref_node_assert`, `format.ts`, `termine/actions.ts`, `ics.ts`, `satzung/page.tsx`, `sepa/route.ts`, `lucide-react`, `MarkdownEditor.tsx`, `FeesTable.tsx`, `LegalPage.tsx`, `events.ts`, `sendEmail`, `sitemap.ts`, `SecurityPage`, `userService.ts`, `index.ts`, `ContactRequestList.tsx`, `forgot-password/layout.tsx`, `images/[id]/route.ts`, `mitgliedsantraege/actions.ts`, `login/layout.tsx`, `reset-password/layout.tsx`, `app/blog/page.tsx`, `verify-email/layout.tsx`, `featureFlagService.ts`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `EventForm.tsx`, `AccountSection.tsx`, `ApplicationWizard.tsx`, `next`, `boardService.ts`, `serverStatus.ts`, `blogService.ts`, `security/page.tsx`, `MarketDiffusion.tsx`, `package.json`, `app/blog/[id]/page.tsx`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `ServerDashboard.tsx`, `format.ts`, `satzung/page.tsx`, `FeesTable.tsx`, `events.ts`, `MailForm.tsx`, `index.ts`, `app/blog/page.tsx`, `formatNumber`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `AppError` connect `AppError` to `next`, `auth.ts`, `boardService.ts`, `mailService.ts`, `serverStatus.ts`, `blogService.ts`, `blogImageProcessing.ts`, `eventService.ts`, `vorstand/actions.ts`, `isFeatureEnabled`, `executeAction`, `blog/actions.ts`, `format.ts`, `termine/actions.ts`, `sendEmail`, `mail/actions.ts`, `SecurityPage`, `userService.ts`, `ContactRequestList.tsx`, `mitgliedsantraege/actions.ts`, `prisma.ts`, `featureFlagService.ts`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _416 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `EventForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07978142076502732 - nodes in this community are weakly interconnected._
- **Should `AccountSection.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09230769230769231 - nodes in this community are weakly interconnected._