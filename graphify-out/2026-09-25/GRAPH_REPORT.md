# Graph Report - wiphy  (2026-09-25)

## Corpus Check
- 316 files · ~132,557 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1687 nodes · 5484 edges · 92 communities (80 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 39 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `70113b64`
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
- prisma.ts
- blog/actions.ts
- eventPath
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
- idFromSegment
- lucide-react
- app/layout.tsx
- userUpdateData.ts
- satzung/page.tsx
- AppError
- userService.ts
- RateLimitTable
- EditUserForm.tsx
- mail/page.tsx
- boardImages.ts
- ActivityHeatmap.tsx
- login/layout.tsx
- MailForm
- accountActions.ts
- auth.ts
- app/page.tsx
- EditUserForm
- registerAction.ts
- seed.ts
- MarkdownViewer.tsx
- Deployment (Hetzner Cloud / Ubuntu)
- verify-email/layout.tsx
- forgot-password/layout.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- getMemberForEdit
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
- BoardPhotoUploader
- { GET, POST }
- rateLimitService.ts
- photo/[id]/route.ts

## God Nodes (most connected - your core abstractions)
1. `next` - 105 edges
2. `AppError` - 82 edges
3. `cn()` - 77 edges
4. `lucide-react` - 72 edges
5. `requireAdmin()` - 62 edges
6. `react` - 58 edges
7. `executeAction()` - 58 edges
8. `Card()` - 46 edges
9. `Button()` - 42 edges
10. `isFeatureEnabled()` - 42 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `GET()` --calls--> `getOptionalUser()`  [EXTRACTED]
  src/app/api/users/route.ts → src/lib/server/authz.ts
- `generateMetadata()` --calls--> `pageMetadata()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/metadata.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `BlogImageManager()` --indirect_call--> `deleteBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts

## Import Cycles
- None detected.

## Communities (92 total, 12 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.08
Nodes (35): FeatureFlagToggle(), FeatureFlagToggleProps, ForgotPasswordPage(), FaqItem, LoginFaq(), SECTIONS, AccountPanel(), handleSubmit() (+27 more)

### Community 1 - "mailService.ts"
Cohesion: 0.06
Nodes (47): sanitize-html, compareBy(), displayName(), FeesTable(), selectAllWithOpenFees(), hasOpenFee(), blockHtml(), blockText() (+39 more)

### Community 2 - "index.ts"
Cohesion: 0.11
Nodes (25): DashboardTableUser, SortKey, STATUS_RANK, FeeDefaultRow, FeesSortKey, FeesTableProps, FeesTableUser, InfoTooltip() (+17 more)

### Community 3 - "next"
Cohesion: 0.10
Nodes (27): nextConfig, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, FeatureFlagsPage(), metadata (+19 more)

### Community 4 - "membershipService.ts"
Cohesion: 0.11
Nodes (31): dynamic, MembershipApplicationsPage(), metadata, FeeDefaultEntry, FeeRates, planApplicationFees(), resolveFeeDefault(), FALLBACK_FEE_DEFAULT (+23 more)

### Community 5 - "boardService.ts"
Cohesion: 0.15
Nodes (24): moveMemberOrder(), processBoardPhoto(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember(), deleteMemberById() (+16 more)

### Community 6 - "messages.ts"
Cohesion: 0.19
Nodes (18): bcryptjs, POST(), notifyAdminsAboutRegistration(), POST(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), emailChangeMessage(), LINK_EXPIRY() (+10 more)

### Community 7 - "blogImageProcessing.ts"
Cohesion: 0.16
Nodes (10): ref_node_fs, sharp, BACKGROUND, icon(), main(), MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, processBlogImage() (+2 more)

### Community 8 - "ApplicationWizard.tsx"
Cohesion: 0.06
Nodes (37): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), ageAt(), CONSENT_VERSION (+29 more)

### Community 9 - "blogService.ts"
Cohesion: 0.11
Nodes (31): GET(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost(), deleteImage(), deletePostById(), eventLinkSelect (+23 more)

### Community 10 - "security/page.tsx"
Cohesion: 0.15
Nodes (22): dynamic, metadata, SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, summarizeByBucket(), addOutcome() (+14 more)

### Community 11 - "formatEuro"
Cohesion: 0.14
Nodes (26): FeeDefaultsCard(), run(), save(), AmountDialog(), explainFee(), UserPaymentHistoryDialog(), BankDetailsForm(), submit() (+18 more)

### Community 12 - "eventService.ts"
Cohesion: 0.12
Nodes (29): AdminEventsPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventOptions(), findLatestPastEvent() (+21 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (30): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+22 more)

### Community 14 - "ics.ts"
Cohesion: 0.27
Nodes (14): RFC-5545, icsEnd(), addDays(), berlinDateStamp(), calendar(), describe(), escapeText(), foldLine() (+6 more)

### Community 15 - "lib/siteUrl.ts"
Cohesion: 0.13
Nodes (13): escapeXml(), GET(), metadata, alt, contentType, size, sitemap(), getPublishedPosts() (+5 more)

### Community 16 - "package.json"
Cohesion: 0.06
Nodes (30): name, prisma, seed, private, version, altcha, altcha-lib, babel-plugin-react-compiler (+22 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+19 more)

### Community 18 - "app/kontakt/actions.ts"
Cohesion: 0.22
Nodes (12): submitContactRequest(), ContactForm(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), ContactInput, hashIp() (+4 more)

### Community 19 - "app/blog/page.tsx"
Cohesion: 0.23
Nodes (10): BlogIndexPage(), generateMetadata(), MetaLine(), PostCard(), Props, AdminBlogPage(), BlogGallery(), blogImageSrcSet() (+2 more)

### Community 20 - "schemas.ts"
Cohesion: 0.07
Nodes (32): deleteMember(), deletePhotoAction(), moveMemberInList(), parseOrThrow(), revalidateBoard(), removeAdminMember(), removeMemberPhoto(), adminCreateUserSchema (+24 more)

### Community 21 - "requireAdmin"
Cohesion: 0.20
Nodes (27): deletePost(), savePost(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), toggleFee(), updateFeeAmount() (+19 more)

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

### Community 26 - "prisma.ts"
Cohesion: 0.11
Nodes (24): @prisma/client, dynamic, KontaktPage(), metadata, dynamic, internalPath(), LoginPage(), metadata (+16 more)

### Community 27 - "blog/actions.ts"
Cohesion: 0.25
Nodes (18): beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+10 more)

### Community 28 - "eventPath"
Cohesion: 0.25
Nodes (13): DashboardEvent, UpcomingEventAlert(), EventDetailPage(), NextEventCard(), EventCard(), eventContactPath(), eventPath(), EventTiming (+5 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.21
Nodes (15): berlinYear(), CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDurationDative(), formatPaidYears(), membershipDuration (+7 more)

### Community 30 - "dashboard/page.tsx"
Cohesion: 0.19
Nodes (10): EmailChangeDialog(), MailSuccessDialog(), ADMIN_ACTIONS, DashboardPage(), QueryParamDialog(), LogoutButton(), getDashboardEvent(), src_lib_server_services_membershipservice_getopenapplication (+2 more)

### Community 31 - "mitglied-werden/page.tsx"
Cohesion: 0.19
Nodes (17): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+9 more)

### Community 32 - "feeService.ts"
Cohesion: 0.17
Nodes (21): FeesDashboardPage(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), resolveIsStudentDefault(), syncStudentYear() (+13 more)

### Community 33 - "format.ts"
Cohesion: 0.14
Nodes (16): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+8 more)

### Community 34 - "ref_node_assert"
Cohesion: 0.12
Nodes (13): ref_node_assert, ref_node_test, isTerminationDue(), evaluatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength (+5 more)

### Community 35 - "app/blog/[id]/page.tsx"
Cohesion: 0.22
Nodes (14): generateMetadata(), Props, PublicBlogPost(), EditBlogPage(), BlogPostingJsonLd(), OrganizationJsonLd(), formatEventShort(), readingTimeMinutes() (+6 more)

### Community 36 - "events.ts"
Cohesion: 0.13
Nodes (27): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+19 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography, ts-node (+10 more)

### Community 39 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 40 - "idFromSegment"
Cohesion: 0.26
Nodes (8): GET(), generateMetadata(), buildEventIcs(), icsFileName(), getPublicEvent(), idFromSegment(), safeDecode(), NOW

### Community 41 - "lucide-react"
Cohesion: 0.09
Nodes (31): lucide-react, react, DeletePostButton(), ContactRequestItem, dateFormat, MailAnnouncement, MailFormProps, MailUserOption (+23 more)

### Community 42 - "app/layout.tsx"
Cohesion: 0.16
Nodes (9): src_app_globals, body, metadata, mono, columns, Footer(), legalLinks, Header() (+1 more)

### Community 43 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 44 - "satzung/page.tsx"
Cohesion: 0.14
Nodes (14): DATENSCHUTZ, metadata, IMPRESSUM, metadata, dynamic, metadata, SATZUNG, Block() (+6 more)

### Community 45 - "AppError"
Cohesion: 0.15
Nodes (23): parseMailForm(), sendEmailAction(), acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), membershipApprovedMessage(), membershipRejectedMessage() (+15 more)

### Community 46 - "userService.ts"
Cohesion: 0.24
Nodes (14): checkLoginFeatureEnabled(), createLoginChallenge(), resendVerificationEmail(), LoginForm(), adminCreatedUserMessage(), createUser(), findUserById(), findUserByMitgliedIdExcludingUser() (+6 more)

### Community 47 - "RateLimitTable"
Cohesion: 0.33
Nodes (5): getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo()

### Community 48 - "EditUserForm.tsx"
Cohesion: 0.16
Nodes (8): ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, ROLE_OPTIONS, STATUS_OPTIONS

### Community 49 - "mail/page.tsx"
Cohesion: 0.17
Nodes (13): MailDashboard(), MailEventOption, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage(), GET() (+5 more)

### Community 50 - "boardImages.ts"
Cohesion: 0.25
Nodes (6): ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, ProcessedBoardPhoto, QUALITY_LADDER

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 53 - "MailForm"
Cohesion: 0.16
Nodes (9): compareBy(), DashboardUsersTable(), displayName(), getStatusIcon(), byStatusThenName(), MailForm(), formatStatus(), formatStatusShort() (+1 more)

### Community 54 - "accountActions.ts"
Cohesion: 0.24
Nodes (16): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, signOut, accountDeletedMessage() (+8 more)

### Community 55 - "auth.ts"
Cohesion: 0.18
Nodes (16): POST(), AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginRateLimitedError, signIn (+8 more)

### Community 56 - "app/page.tsx"
Cohesion: 0.08
Nodes (31): AdminBoardPage(), metadata, heroMetrics, pillars, dynamic, Props, dynamic, metadata (+23 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "registerAction.ts"
Cohesion: 0.24
Nodes (10): GET(), registerUser(), registrationConfirmationMessage(), prisma, PendingRegistrationStats, pruneUnverifiedRegistrations(), UNVERIFIED_TTL_HOURS, archiveFeesOfUser() (+2 more)

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 61 - "Deployment (Hetzner Cloud / Ubuntu)"
Cohesion: 0.25
Nodes (8): Automatische Updates bei jedem Git Push (GitHub Actions), Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Migrationen statt `db push`, nginx als Reverse Proxy, Option 1: Automatischer Einzeiler über deinen lokalen Rechner (Empfohlen), Option 2: Manuelles Ausführen auf dem Server

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.12
Nodes (16): Admin-Dashboard, Authentifizierung & Konten, Datenbankmodell, Feature Flags, Funktionen im Detail, Inhalt, Mitgliederbereich (`/dashboard`), Projektstruktur (+8 more)

### Community 66 - "getMemberForEdit"
Cohesion: 0.33
Nodes (6): EditBoardMemberPage(), findMemberById(), findPublishedMembers(), getMemberForEdit(), getPublicMembers(), toBoardMember()

### Community 68 - "users/[id]/page.tsx"
Cohesion: 0.23
Nodes (11): deleteUserAction(), EditUserPage(), metadata, updateUser(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, TERMINATION_RECORD_RETENTION_YEARS, terminationDate() (+3 more)

### Community 69 - "formatDate"
Cohesion: 0.12
Nodes (17): statusMeta(), TerminationList(), confirm(), AccountSection(), HomePage(), terminationNoticeMessage(), formatDate(), formatDateShort() (+9 more)

### Community 71 - "errors.ts"
Cohesion: 0.20
Nodes (10): zod, setFeatureFlag(), isFeatureFlagKey(), getRedirectTarget(), isRedirectError(), RedirectTarget, AppErrorCode, mapErrorToActionResult() (+2 more)

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
Cohesion: 0.15
Nodes (22): ApplicationItem, ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), dateFormat (+14 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "EmailComposerDialog"
Cohesion: 0.50
Nodes (4): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 82 - "authz.ts"
Cohesion: 0.16
Nodes (21): POST(), POST(), ContactRequestsPage(), NewUserPage(), updateBankDetails(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton() (+13 more)

### Community 85 - "MembershipCertificateCard.tsx"
Cohesion: 0.38
Nodes (4): MembershipCertificateCard(), SectionHeader(), formatMembershipDuration(), plural()

### Community 86 - "EventForm.tsx"
Cohesion: 0.24
Nodes (8): toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), MarkdownEditor(), useSwipeToClose(), end(), offset()

### Community 87 - "BoardPhotoUploader"
Cohesion: 0.60
Nodes (5): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), formatBytes()

### Community 89 - "rateLimitService.ts"
Cohesion: 0.50
Nodes (4): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **403 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+398 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 516 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `index.ts`, `membershipService.ts`, `messages.ts`, `ApplicationWizard.tsx`, `blogService.ts`, `security/page.tsx`, `MarketDiffusion.tsx`, `lib/siteUrl.ts`, `package.json`, `app/kontakt/actions.ts`, `app/blog/page.tsx`, `schemas.ts`, `requireAdmin`, `rateLimit.ts`, `cn`, `prisma.ts`, `blog/actions.ts`, `eventPath`, `dashboard/page.tsx`, `mitglied-werden/page.tsx`, `app/blog/[id]/page.tsx`, `idFromSegment`, `lucide-react`, `app/layout.tsx`, `satzung/page.tsx`, `AppError`, `userService.ts`, `EditUserForm.tsx`, `mail/page.tsx`, `login/layout.tsx`, `accountActions.ts`, `auth.ts`, `app/page.tsx`, `registerAction.ts`, `verify-email/layout.tsx`, `forgot-password/layout.tsx`, `reset-password/layout.tsx`, `users/[id]/page.tsx`, `errors.ts`, `zertifikat/pdf/route.ts`, `dashboard/kontakt/actions.ts`, `authz.ts`, `EventForm.tsx`, `photo/[id]/route.ts`?**
  _High betweenness centrality (0.179) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `LoginForm.tsx`, `index.ts`, `next`, `users/[id]/page.tsx`, `ApplicationWizard.tsx`, `satzung/page.tsx`, `MarketDiffusion.tsx`, `ApplicationList.tsx`, `package.json`, `EditUserForm.tsx`, `altcha.d.ts`, `app/blog/page.tsx`, `EventForm.tsx`, `cn`, `app/page.tsx`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `LoginForm.tsx`, `index.ts`, `next`, `membershipService.ts`, `ApplicationWizard.tsx`, `security/page.tsx`, `MarketDiffusion.tsx`, `package.json`, `app/blog/page.tsx`, `cn`, `OutcomeTimeline.tsx`, `eventPath`, `dashboard/page.tsx`, `mitglied-werden/page.tsx`, `format.ts`, `app/blog/[id]/page.tsx`, `satzung/page.tsx`, `EditUserForm.tsx`, `app/page.tsx`, `users/[id]/page.tsx`, `ApplicationList.tsx`, `MembershipCertificateCard.tsx`, `EventForm.tsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _403 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LoginForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08350168350168351 - nodes in this community are weakly interconnected._
- **Should `mailService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.061343204653622425 - nodes in this community are weakly interconnected._