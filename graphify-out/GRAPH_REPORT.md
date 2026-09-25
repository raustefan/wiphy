# Graph Report - wiphy  (2026-09-25)

## Corpus Check
- 316 files · ~132,509 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1687 nodes · 5482 edges · 91 communities (80 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 39 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `534696ec`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LoginForm.tsx
- mailService.ts
- index.ts
- next
- membershipService.ts
- boardService.ts
- messages.ts
- blogImageProcessing.ts
- ApplicationWizard.tsx
- blogService.ts
- security/page.tsx
- formatEuro
- eventService.ts
- MarketDiffusion.tsx
- ics.ts
- lib/siteUrl.ts
- package.json
- dependencies
- app/kontakt/actions.ts
- app/blog/page.tsx
- schemas.ts
- requireAdmin
- rateLimit.ts
- cn
- securityLabels.ts
- OutcomeTimeline.tsx
- isFeatureEnabled
- blog/actions.ts
- prisma.ts
- membershipCertificate.ts
- dashboard/page.tsx
- mitglied-werden/page.tsx
- feeService.ts
- format.ts
- ref_node_assert
- app/blog/[id]/page.tsx
- events.ts
- compilerOptions
- devDependencies
- EmailBodyField.tsx
- AppError
- lucide-react
- app/layout.tsx
- membershipFormSchemas.ts
- satzung/page.tsx
- mitgliedsantraege/actions.ts
- userService.ts
- RateLimitTable
- EditUserForm.tsx
- mail/page.tsx
- iban.ts
- ActivityHeatmap.tsx
- login/layout.tsx
- MailForm
- accountActions.ts
- securityLog.ts
- app/page.tsx
- EditUserForm
- registerAction.ts
- seed.ts
- MarkdownViewer.tsx
- auth.ts
- verify-email/layout.tsx
- forgot-password/layout.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- berlinTime.ts
- reset-password/layout.tsx
- users/[id]/page.tsx
- formatDate
- CLAUDE.md
- errors.ts
- zertifikat/pdf/route.ts
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- dashboard/kontakt/actions.ts
- blogImages.ts
- eslint.config.mjs
- ApplicationList.tsx
- DeleteMemberSection
- altcha.d.ts
- EmailComposerDialog
- authz.ts
- postcss.config.mjs
- MembershipCertificateCard.tsx
- EventForm.tsx
- sitemap.ts
- { GET, POST }
- rateLimitService.ts

## God Nodes (most connected - your core abstractions)
1. `next` - 105 edges
2. `AppError` - 82 edges
3. `cn()` - 77 edges
4. `lucide-react` - 71 edges
5. `requireAdmin()` - 62 edges
6. `react` - 58 edges
7. `executeAction()` - 58 edges
8. `Card()` - 46 edges
9. `Button()` - 42 edges
10. `isFeatureEnabled()` - 42 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `generateMetadata()` --calls--> `pageMetadata()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/metadata.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `BlogImageManager()` --indirect_call--> `deleteBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `moveBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts

## Import Cycles
- None detected.

## Communities (91 total, 11 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.08
Nodes (35): FeatureFlagToggle(), FeatureFlagToggleProps, ForgotPasswordPage(), FaqItem, LoginFaq(), SECTIONS, AccountPanel(), handleSubmit() (+27 more)

### Community 1 - "mailService.ts"
Cohesion: 0.07
Nodes (42): sanitize-html, compareBy(), displayName(), FeesTable(), selectAllWithOpenFees(), hasOpenFee(), blockHtml(), blockText() (+34 more)

### Community 2 - "index.ts"
Cohesion: 0.11
Nodes (25): DashboardTableUser, SortKey, STATUS_RANK, FeeDefaultRow, FeesSortKey, FeesTableProps, FeesTableUser, InfoTooltip() (+17 more)

### Community 3 - "next"
Cohesion: 0.11
Nodes (27): nextConfig, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, FeatureFlagsPage(), metadata (+19 more)

### Community 4 - "membershipService.ts"
Cohesion: 0.13
Nodes (27): dynamic, MembershipApplicationsPage(), metadata, planApplicationFees(), resolveFeeDefault(), isTerminationDue(), deleteFeeDefault(), findFeeDefaults() (+19 more)

### Community 5 - "boardService.ts"
Cohesion: 0.07
Nodes (50): GET(), POST(), GET(), GET(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile() (+42 more)

### Community 6 - "messages.ts"
Cohesion: 0.24
Nodes (14): POST(), notifyAdminsAboutRegistration(), POST(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), passwordChangedNoticeMessage(), Person, getMailTransporter() (+6 more)

### Community 7 - "blogImageProcessing.ts"
Cohesion: 0.18
Nodes (8): ref_node_fs, sharp, BACKGROUND, icon(), main(), ImageBytes, ProcessedBlogImage, QUALITY_LADDER

### Community 8 - "ApplicationWizard.tsx"
Cohesion: 0.09
Nodes (25): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), ApplicationStage(), toDateInput() (+17 more)

### Community 9 - "blogService.ts"
Cohesion: 0.11
Nodes (33): POST(), MAX_BLOG_IMAGE_UPLOAD_BYTES, processBlogImage(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost(), deleteImage() (+25 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.15
Nodes (22): dynamic, metadata, SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, summarizeByBucket(), addOutcome() (+14 more)

### Community 11 - "formatEuro"
Cohesion: 0.15
Nodes (25): FeeDefaultsCard(), run(), save(), AmountDialog(), explainFee(), UserPaymentHistoryDialog(), BankDetailsForm(), submit() (+17 more)

### Community 12 - "eventService.ts"
Cohesion: 0.13
Nodes (27): AdminEventsPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findLatestPastEvent(), findNextUpcomingEvent() (+19 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (30): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+22 more)

### Community 14 - "ics.ts"
Cohesion: 0.15
Nodes (21): RFC-5545, GET(), GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs() (+13 more)

### Community 15 - "lib/siteUrl.ts"
Cohesion: 0.14
Nodes (11): escapeXml(), GET(), metadata, alt, contentType, size, getPublishedPosts(), SITE_DESCRIPTION (+3 more)

### Community 16 - "package.json"
Cohesion: 0.06
Nodes (30): name, prisma, seed, private, version, altcha, altcha-lib, babel-plugin-react-compiler (+22 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+19 more)

### Community 18 - "app/kontakt/actions.ts"
Cohesion: 0.29
Nodes (10): submitContactRequest(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), ContactInput, hashIp(), scoreSpam() (+2 more)

### Community 19 - "app/blog/page.tsx"
Cohesion: 0.23
Nodes (10): BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props, AdminBlogPage(), BlogGallery(), blogImageSrcSet() (+2 more)

### Community 20 - "schemas.ts"
Cohesion: 0.08
Nodes (18): adminCreateUserSchema, BankUpdateParsed, berlinDateTime(), contactSchema, directMailSchema, emailField, feeAmountUpdateSchema, feeCommentSchema (+10 more)

### Community 21 - "requireAdmin"
Cohesion: 0.20
Nodes (29): deletePost(), savePost(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), toggleFee(), updateFeeAmount() (+21 more)

### Community 22 - "rateLimit.ts"
Cohesion: 0.20
Nodes (13): ref_crypto, ref_node_net, addressKey(), extractClientIp(), HeaderBag, enforceAdminMailRateLimit(), consumeRateLimit(), hashKey() (+5 more)

### Community 23 - "cn"
Cohesion: 0.07
Nodes (29): CtaCard(), categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory, TimelineDetail() (+21 more)

### Community 24 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.16
Nodes (18): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+10 more)

### Community 26 - "isFeatureEnabled"
Cohesion: 0.12
Nodes (19): @prisma/client, ContactRequestsPage(), ContactForm(), dynamic, KontaktPage(), metadata, dynamic, internalPath() (+11 more)

### Community 27 - "blog/actions.ts"
Cohesion: 0.16
Nodes (24): beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+16 more)

### Community 28 - "prisma.ts"
Cohesion: 0.25
Nodes (11): createPrismaClient(), globalForPrisma, ALTCHA_COMPLEXITY, consumeAltchaSolution(), readExpiry(), readSignature(), verifyAltchaPayload(), getAltchaHmacKey() (+3 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.21
Nodes (15): berlinYear(), CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDurationDative(), formatPaidYears(), membershipDuration (+7 more)

### Community 30 - "dashboard/page.tsx"
Cohesion: 0.19
Nodes (10): EmailChangeDialog(), MailSuccessDialog(), ADMIN_ACTIONS, DashboardPage(), QueryParamDialog(), LogoutButton(), getDashboardEvent(), src_lib_server_services_membershipservice_getopenapplication (+2 more)

### Community 31 - "mitglied-werden/page.tsx"
Cohesion: 0.25
Nodes (12): JourneyRail(), dynamic, metadata, MitgliedWerdenPage(), Props, JOURNEY_STEPS, JourneyStage, JourneyState (+4 more)

### Community 32 - "feeService.ts"
Cohesion: 0.15
Nodes (24): FeesDashboardPage(), FeeBreakdown, feeRetentionCutoffYear(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees() (+16 more)

### Community 33 - "format.ts"
Cohesion: 0.14
Nodes (16): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+8 more)

### Community 34 - "ref_node_assert"
Cohesion: 0.09
Nodes (21): ref_node_assert, ref_node_test, evaluatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength, SCORE_LABELS (+13 more)

### Community 35 - "app/blog/[id]/page.tsx"
Cohesion: 0.22
Nodes (15): generateMetadata(), Props, PublicBlogPost(), generateMetadata(), BlogPostingJsonLd(), OrganizationJsonLd(), readingTimeMinutes(), getPublishedPost() (+7 more)

### Community 36 - "events.ts"
Cohesion: 0.12
Nodes (27): DashboardEvent, UpcomingEventAlert(), EventDetailPage(), NextEventCard(), EventCard(), TIME_ZONE, CALENDAR_ICS_PATH, DAY_MONTH (+19 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography, ts-node (+10 more)

### Community 39 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 40 - "AppError"
Cohesion: 0.22
Nodes (16): parseMailForm(), sendEmailAction(), deleteEventAction(), revalidateEvent(), saveEventAction(), parseDirectMailForm(), sendDirectMailAction(), resolveUsersByIds() (+8 more)

### Community 41 - "lucide-react"
Cohesion: 0.09
Nodes (31): lucide-react, react, DeletePostButton(), ContactRequestItem, dateFormat, MailAnnouncement, MailFormProps, MailUserOption (+23 more)

### Community 42 - "app/layout.tsx"
Cohesion: 0.16
Nodes (9): src_app_globals, body, metadata, mono, columns, Footer(), legalLinks, Header() (+1 more)

### Community 43 - "membershipFormSchemas.ts"
Cohesion: 0.10
Nodes (19): MINOR_HINT, STUDENT_YEAR_LOOKAHEAD, applicationBankSchema, applicationPaymentSchema, applicationPersonSchema, applicationStudySchema, bankFieldsOptional, birthDateField (+11 more)

### Community 44 - "satzung/page.tsx"
Cohesion: 0.14
Nodes (14): DATENSCHUTZ, metadata, IMPRESSUM, metadata, dynamic, metadata, SATZUNG, Block() (+6 more)

### Community 45 - "mitgliedsantraege/actions.ts"
Cohesion: 0.29
Nodes (13): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), membershipApprovedMessage(), membershipRejectedMessage(), terminationConfirmedMessage(), findApplicationById() (+5 more)

### Community 46 - "userService.ts"
Cohesion: 0.23
Nodes (14): adminCreatedUserMessage(), emailChangeMessage(), prisma, PendingRegistrationStats, archiveFeesOfUser(), createUser(), deleteUserById(), findUserById() (+6 more)

### Community 47 - "RateLimitTable"
Cohesion: 0.33
Nodes (5): getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo()

### Community 48 - "EditUserForm.tsx"
Cohesion: 0.16
Nodes (8): ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, ROLE_OPTIONS, STATUS_OPTIONS

### Community 49 - "mail/page.tsx"
Cohesion: 0.16
Nodes (13): EditBlogPage(), MailDashboard(), MailEventOption, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage() (+5 more)

### Community 50 - "iban.ts"
Cohesion: 0.36
Nodes (11): IbanInput(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban(), maskIban(), normalizeIban() (+3 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 53 - "MailForm"
Cohesion: 0.16
Nodes (9): compareBy(), DashboardUsersTable(), displayName(), getStatusIcon(), byStatusThenName(), MailForm(), formatStatus(), formatStatusShort() (+1 more)

### Community 54 - "accountActions.ts"
Cohesion: 0.14
Nodes (28): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination(), NewUserPage() (+20 more)

### Community 55 - "securityLog.ts"
Cohesion: 0.32
Nodes (10): POST(), LINK_EXPIRY(), passwordResetMessage(), getSecurityLogPepper(), normalizeEmail(), anonymizeSecurityEventsForUser(), logSecurityEvent(), pruneSecurityEvents() (+2 more)

### Community 56 - "app/page.tsx"
Cohesion: 0.08
Nodes (31): AdminBoardPage(), metadata, heroMetrics, pillars, dynamic, Props, dynamic, metadata (+23 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "registerAction.ts"
Cohesion: 0.32
Nodes (9): checkLoginFeatureEnabled(), createLoginChallenge(), resendVerificationEmail(), LoginForm(), registerUser(), registrationConfirmationMessage(), pruneUnverifiedRegistrations(), UNVERIFIED_TTL_HOURS (+1 more)

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 61 - "auth.ts"
Cohesion: 0.20
Nodes (9): bcryptjs, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginRateLimitedError, signIn (+1 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "berlinTime.ts"
Cohesion: 0.32
Nodes (13): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+5 more)

### Community 68 - "users/[id]/page.tsx"
Cohesion: 0.25
Nodes (11): deleteUserAction(), EditUserPage(), metadata, berlinDateParts(), FEE_RECORD_RETENTION_YEARS, TERMINATION_RECORD_RETENTION_YEARS, terminationDate(), getOpenTermination() (+3 more)

### Community 69 - "formatDate"
Cohesion: 0.12
Nodes (17): statusMeta(), TerminationList(), confirm(), AccountSection(), HomePage(), terminationNoticeMessage(), formatDate(), formatDateShort() (+9 more)

### Community 71 - "errors.ts"
Cohesion: 0.25
Nodes (7): zod, getRedirectTarget(), isRedirectError(), RedirectTarget, AppErrorCode, mapErrorToActionResult(), zodMessage()

### Community 72 - "zertifikat/pdf/route.ts"
Cohesion: 0.36
Nodes (8): @react-pdf/renderer, GET(), GET(), certificateFacts, isCertifiableStatus(), loadLogoDataUrl(), getFeeDashboardData(), getEditableUser()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (7): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), deleteContactRequest(), setContactRequestHandled()

### Community 76 - "blogImages.ts"
Cohesion: 0.19
Nodes (11): BlogImageManager(), handleDrop(), uploadFiles(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, formatBytes() (+3 more)

### Community 77 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 78 - "ApplicationList.tsx"
Cohesion: 0.19
Nodes (12): ApplicationItem, ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), dateFormat (+4 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "EmailComposerDialog"
Cohesion: 0.50
Nodes (4): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 82 - "authz.ts"
Cohesion: 0.24
Nodes (8): setFeatureFlag(), removeRateLimitEntry(), isFeatureFlagKey(), assertCanEditUser(), normalizeRole(), UserContext, setFeatureFlagEnabled(), deleteRateLimitEntry()

### Community 85 - "MembershipCertificateCard.tsx"
Cohesion: 0.38
Nodes (4): MembershipCertificateCard(), SectionHeader(), formatMembershipDuration(), plural()

### Community 86 - "EventForm.tsx"
Cohesion: 0.24
Nodes (8): toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), MarkdownEditor(), useSwipeToClose(), end(), offset()

### Community 87 - "sitemap.ts"
Cohesion: 0.70
Nodes (4): sitemap(), TerminePage(), getPastEvents(), getUpcomingEvents()

### Community 89 - "rateLimitService.ts"
Cohesion: 0.50
Nodes (4): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **403 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+398 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 516 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `index.ts`, `membershipService.ts`, `boardService.ts`, `messages.ts`, `ApplicationWizard.tsx`, `blogService.ts`, `security/page.tsx`, `MarketDiffusion.tsx`, `ics.ts`, `lib/siteUrl.ts`, `package.json`, `app/kontakt/actions.ts`, `app/blog/page.tsx`, `requireAdmin`, `rateLimit.ts`, `cn`, `isFeatureEnabled`, `blog/actions.ts`, `dashboard/page.tsx`, `mitglied-werden/page.tsx`, `app/blog/[id]/page.tsx`, `events.ts`, `AppError`, `lucide-react`, `app/layout.tsx`, `satzung/page.tsx`, `mitgliedsantraege/actions.ts`, `EditUserForm.tsx`, `mail/page.tsx`, `login/layout.tsx`, `accountActions.ts`, `securityLog.ts`, `app/page.tsx`, `registerAction.ts`, `verify-email/layout.tsx`, `forgot-password/layout.tsx`, `reset-password/layout.tsx`, `users/[id]/page.tsx`, `errors.ts`, `zertifikat/pdf/route.ts`, `dashboard/kontakt/actions.ts`, `authz.ts`, `EventForm.tsx`, `sitemap.ts`?**
  _High betweenness centrality (0.179) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `LoginForm.tsx`, `index.ts`, `next`, `users/[id]/page.tsx`, `ApplicationWizard.tsx`, `satzung/page.tsx`, `MarketDiffusion.tsx`, `ApplicationList.tsx`, `package.json`, `EditUserForm.tsx`, `iban.ts`, `app/blog/page.tsx`, `altcha.d.ts`, `EventForm.tsx`, `cn`, `app/page.tsx`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `LoginForm.tsx`, `index.ts`, `next`, `membershipService.ts`, `ApplicationWizard.tsx`, `security/page.tsx`, `MarketDiffusion.tsx`, `package.json`, `app/blog/page.tsx`, `cn`, `OutcomeTimeline.tsx`, `dashboard/page.tsx`, `mitglied-werden/page.tsx`, `format.ts`, `app/blog/[id]/page.tsx`, `events.ts`, `satzung/page.tsx`, `EditUserForm.tsx`, `app/page.tsx`, `users/[id]/page.tsx`, `ApplicationList.tsx`, `MembershipCertificateCard.tsx`, `EventForm.tsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _403 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LoginForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08350168350168351 - nodes in this community are weakly interconnected._
- **Should `mailService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06558441558441558 - nodes in this community are weakly interconnected._