# Graph Report - wiphy  (2026-09-24)

## Corpus Check
- 302 files · ~124,548 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1619 nodes · 5154 edges · 77 communities (69 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 38 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4bce59cb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LoginForm.tsx
- mailService.ts
- app/page.tsx
- dashboard/blog/page.tsx
- dashboard/page.tsx
- boardService.ts
- userService.ts
- format.ts
- ApplicationWizard.tsx
- blogService.ts
- ref_node_assert
- zahlungen/page.tsx
- eventService.ts
- MarketDiffusion.tsx
- registerAction.ts
- app/layout.tsx
- package.json
- dependencies
- mitglied-werden/actions.ts
- blogImageProcessing.ts
- schemas.ts
- requireAdmin
- termine/actions.ts
- prisma.ts
- Button.tsx
- OutcomeTimeline.tsx
- auth.ts
- dashboard/kontakt/page.tsx
- AppError
- membershipCertificate.ts
- feeService.ts
- mitglied-werden/page.tsx
- app/blog/[id]/page.tsx
- blog/actions.ts
- new/page.tsx
- blogImages.ts
- events.ts
- compilerOptions
- devDependencies
- EmailBodyField.tsx
- securityLabels.ts
- lucide-react
- sitemap.ts
- membershipFormSchemas.ts
- LegalPage.tsx
- membershipService.ts
- featureFlagService.ts
- security/page.tsx
- index.ts
- PhysicsTimeline.tsx
- next
- MailForm.tsx
- formatNumber
- removeRateLimitEntry
- EditUserForm.tsx
- FeesTable
- seed.ts
- ShareButton
- TypeSparklines.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- ActivityHeatmap.tsx
- messages.ts
- CLAUDE.md
- MarkdownViewer.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- eslint.config.mjs
- ApplicationList.tsx
- DeleteMemberSection
- altcha.d.ts
- login/actions.ts
- postcss.config.mjs
- FeesTable.tsx
- { GET, POST }

## God Nodes (most connected - your core abstractions)
1. `next` - 102 edges
2. `cn()` - 77 edges
3. `lucide-react` - 70 edges
4. `AppError` - 70 edges
5. `requireAdmin()` - 61 edges
6. `react` - 56 edges
7. `executeAction()` - 52 edges
8. `Card()` - 44 edges
9. `Button()` - 40 edges
10. `isFeatureEnabled()` - 38 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `generateMetadata()` --calls--> `pageMetadata()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/metadata.ts
- `BlogImageManager()` --indirect_call--> `deleteBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `moveBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts
- `BlogImageManager()` --indirect_call--> `saveBlogImageAlt()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts

## Import Cycles
- None detected.

## Communities (77 total, 8 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.09
Nodes (29): next-auth, ForgotPasswordPage(), ContactForm(), AccountPanel(), handleSubmit(), FIRST_HALF_FIELDS, FirstHalfField, VerifyPanel() (+21 more)

### Community 1 - "mailService.ts"
Cohesion: 0.08
Nodes (44): sanitize-html, parseMailForm(), sendEmailAction(), blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailMessage (+36 more)

### Community 2 - "app/page.tsx"
Cohesion: 0.15
Nodes (11): generateMetadata(), Props, heroMetrics, pillars, metadata, Badge(), BadgeTone, toneClasses (+3 more)

### Community 3 - "dashboard/blog/page.tsx"
Cohesion: 0.15
Nodes (19): DeletePostButton(), metadata, DashboardPageHeader(), DashboardPageHeaderProps, FeeDefaultRow, InfoTooltip(), RateLimitTableProps, DeleteEventButton() (+11 more)

### Community 4 - "dashboard/page.tsx"
Cohesion: 0.16
Nodes (10): CtaCard(), EmailChangeDialog(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog(), SectionHeader(), LogoutButton() (+2 more)

### Community 5 - "boardService.ts"
Cohesion: 0.07
Nodes (43): GET(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), AdminBoardPage(), getInitials() (+35 more)

### Community 6 - "userService.ts"
Cohesion: 0.15
Nodes (21): ref_crypto, createUser(), deleteUserById(), findUserById(), findUserByMitgliedIdExcludingUser(), findUsersForDashboard(), updateUserById(), adminCreateUser() (+13 more)

### Community 7 - "format.ts"
Cohesion: 0.19
Nodes (13): MetaLine(), UserPaymentHistoryDialog(), DATE_TIME, EURO, formatDate(), formatDateShort(), formatDateTime(), LONG_DATE (+5 more)

### Community 8 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (27): BankValues, FaqItem, LoginFaq(), SECTIONS, InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator() (+19 more)

### Community 9 - "blogService.ts"
Cohesion: 0.10
Nodes (35): POST(), AdminBlogPage(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost(), deleteImage(), deletePostById() (+27 more)

### Community 10 - "ref_node_assert"
Cohesion: 0.21
Nodes (7): ref_node_assert, ref_node_test, ageAt(), isOldEnough(), birthDateField, defaults, base

### Community 11 - "zahlungen/page.tsx"
Cohesion: 0.12
Nodes (31): FeeDefaultsCard(), run(), save(), AmountDialog(), explainFee(), updateBankDetails(), BankDetailsForm(), submit() (+23 more)

### Community 12 - "eventService.ts"
Cohesion: 0.05
Nodes (61): RFC-5545, MailAnnouncement, MailDashboard(), MailEventOption, MailUserOption, announcementHtml(), dynamic, MailDashboardPage() (+53 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (30): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+22 more)

### Community 14 - "registerAction.ts"
Cohesion: 0.25
Nodes (14): notifyAdminsAboutRegistration(), POST(), registerUser(), adminRegistrationNoticeMessage(), prisma, getSecurityLogPepper(), PendingRegistrationStats, pruneUnverifiedRegistrations() (+6 more)

### Community 15 - "app/layout.tsx"
Cohesion: 0.10
Nodes (19): escapeXml(), GET(), metadata, src_app_globals, body, metadata, mono, alt (+11 more)

### Community 16 - "package.json"
Cohesion: 0.07
Nodes (27): name, prisma, seed, private, version, altcha, altcha-lib, babel-plugin-react-compiler (+19 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+19 more)

### Community 18 - "mitglied-werden/actions.ts"
Cohesion: 0.26
Nodes (14): submitContactRequest(), submitMembershipApplication(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, membershipApplicationNoticeMessage(), ContactInput, hashIp() (+6 more)

### Community 19 - "blogImageProcessing.ts"
Cohesion: 0.24
Nodes (6): sharp, MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, processBlogImage(), ProcessedBlogImage, QUALITY_LADDER

### Community 20 - "schemas.ts"
Cohesion: 0.09
Nodes (26): zod, createDraft(), deleteMember(), deletePhotoAction(), moveMemberInList(), parseOrThrow(), revalidateBoard(), saveMember() (+18 more)

### Community 21 - "requireAdmin"
Cohesion: 0.13
Nodes (30): deletePost(), savePost(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), toggleFee(), updateFeeAmount() (+22 more)

### Community 22 - "termine/actions.ts"
Cohesion: 0.33
Nodes (8): createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), createDraftEvent(), saveEvent(), eventDeleteSchema, eventSaveSchema

### Community 23 - "prisma.ts"
Cohesion: 0.14
Nodes (20): dynamic, KontaktPage(), metadata, dynamic, internalPath(), LoginPage(), metadata, Props (+12 more)

### Community 24 - "Button.tsx"
Cohesion: 0.15
Nodes (8): ButtonColor, ButtonLinkProps, ButtonProps, ButtonSize, ButtonVariant, colorClasses, sizeClasses, Spinner()

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (12): columnPath(), labelStride(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline(), PAD (+4 more)

### Community 26 - "auth.ts"
Cohesion: 0.14
Nodes (19): bcryptjs, POST(), CaptchaFailedError, EmailNotVerifiedError, handlers, LoginRateLimitedError, signIn, signOut (+11 more)

### Community 27 - "dashboard/kontakt/page.tsx"
Cohesion: 0.20
Nodes (13): markContactRequestHandled(), removeContactRequest(), ContactRequestItem, ContactRequestList(), confirmDelete(), run(), dateFormat, ContactRequestsPage() (+5 more)

### Community 28 - "AppError"
Cohesion: 0.21
Nodes (18): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), AppError (+10 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.09
Nodes (41): ref_node_fs, ref_node_path, BACKGROUND, icon(), main(), GET(), DashboardPage(), EventForm() (+33 more)

### Community 30 - "feeService.ts"
Cohesion: 0.16
Nodes (18): @react-pdf/renderer, FeeBreakdown, PaymentHistoryPdf(), PdfUser, statusLabel(), styles, clearFeeAmountOverride(), findExistingFeeYears() (+10 more)

### Community 31 - "mitglied-werden/page.tsx"
Cohesion: 0.20
Nodes (16): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+8 more)

### Community 32 - "app/blog/[id]/page.tsx"
Cohesion: 0.22
Nodes (16): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), PostCard(), BlogGallery(), blogImageSrcSet(), blogImageUrl() (+8 more)

### Community 33 - "blog/actions.ts"
Cohesion: 0.19
Nodes (21): beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+13 more)

### Community 34 - "new/page.tsx"
Cohesion: 0.15
Nodes (15): metadata, NewUserPage(), FILL_PERCENT, PasswordInput(), PasswordStrengthMeter(), evaluatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion (+7 more)

### Community 35 - "blogImages.ts"
Cohesion: 0.19
Nodes (11): BlogImageManager(), handleDrop(), uploadFiles(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, formatBytes() (+3 more)

### Community 36 - "events.ts"
Cohesion: 0.08
Nodes (49): EditBlogPage(), AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), HomePage(), dynamic, EventDetailPage(), generateMetadata() (+41 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography, ts-node (+10 more)

### Community 39 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 40 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 41 - "lucide-react"
Cohesion: 0.22
Nodes (13): lucide-react, react, DeleteMemberSectionProps, PhotoMeta, FeatureDisabledDialog(), FeatureDisabledDialogProps, BeforeInstallPromptEvent, Button() (+5 more)

### Community 42 - "sitemap.ts"
Cohesion: 0.60
Nodes (4): sitemap(), findPublishedPosts(), getPublishedPosts(), getPastEvents()

### Community 43 - "membershipFormSchemas.ts"
Cohesion: 0.10
Nodes (30): SummaryBlock(), IbanInput(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban(), maskIban() (+22 more)

### Community 44 - "LegalPage.tsx"
Cohesion: 0.16
Nodes (12): DATENSCHUTZ, metadata, IMPRESSUM, metadata, SATZUNG, Block(), LegalPage(), LegalSections() (+4 more)

### Community 45 - "membershipService.ts"
Cohesion: 0.12
Nodes (28): FeesDashboardPage(), metadata, dynamic, MembershipApplicationsPage(), metadata, planApplicationFees(), resolveFeeDefault(), deleteFeeDefault() (+20 more)

### Community 46 - "featureFlagService.ts"
Cohesion: 0.17
Nodes (15): @prisma/client, POST(), setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), metadata, FEATURE_FLAG_DESCRIPTIONS (+7 more)

### Community 47 - "security/page.tsx"
Cohesion: 0.13
Nodes (25): dynamic, metadata, SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, bucketFromKey(), getRateLimitEntries() (+17 more)

### Community 48 - "index.ts"
Cohesion: 0.11
Nodes (25): metadata, HeaderChrome(), links, ButtonLink(), CalloutTone, toneClasses, controlClasses, describeControl() (+17 more)

### Community 49 - "PhysicsTimeline.tsx"
Cohesion: 0.19
Nodes (9): metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory, TimelineDetail() (+1 more)

### Community 52 - "next"
Cohesion: 0.11
Nodes (13): nextConfig, next, GET(), GET(), GET(), metadata, metadata, metadata (+5 more)

### Community 53 - "MailForm.tsx"
Cohesion: 0.10
Nodes (21): compareBy(), DashboardTableUser, DashboardUsersTable(), displayName(), getStatusIcon(), SortKey, STATUS_RANK, byStatusThenName() (+13 more)

### Community 54 - "formatNumber"
Cohesion: 0.21
Nodes (11): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+3 more)

### Community 56 - "removeRateLimitEntry"
Cohesion: 0.28
Nodes (7): removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), deleteRateLimitEntry()

### Community 57 - "EditUserForm.tsx"
Cohesion: 0.13
Nodes (15): ADMIN_ONLY_KEYS, EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), FIELD_LABELS (+7 more)

### Community 58 - "FeesTable"
Cohesion: 0.20
Nodes (5): compareBy(), displayName(), FeesTable(), selectAllWithOpenFees(), hasOpenFee()

### Community 59 - "seed.ts"
Cohesion: 0.25
Nodes (5): adapter, prisma, dotenv, prisma, @prisma/adapter-pg

### Community 62 - "TypeSparklines.tsx"
Cohesion: 0.39
Nodes (7): longDayLabel(), sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines()

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 69 - "messages.ts"
Cohesion: 0.27
Nodes (11): adminCreatedUserMessage(), contactRequestMessage(), emailChangeMessage(), feeReminderMessage(), greeting(), LINK_EXPIRY(), membershipApprovedMessage(), membershipReceivedMessage() (+3 more)

### Community 72 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 77 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 78 - "ApplicationList.tsx"
Cohesion: 0.19
Nodes (12): ApplicationItem, ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), dateFormat (+4 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 82 - "login/actions.ts"
Cohesion: 0.23
Nodes (15): POST(), checkLoginFeatureEnabled(), createLoginChallenge(), resendVerificationEmail(), LoginForm(), passwordResetMessage(), renderEmailText(), getMailTransporter() (+7 more)

### Community 86 - "FeesTable.tsx"
Cohesion: 0.12
Nodes (17): @uiw/react-md-editor, metadata, FeesSortKey, FeesTableProps, FeesTableUser, toggleAllDay(), EventFormData, toDateTimeValue() (+9 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **393 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+388 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 502 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `app/page.tsx`, `dashboard/blog/page.tsx`, `dashboard/page.tsx`, `boardService.ts`, `ApplicationWizard.tsx`, `zahlungen/page.tsx`, `eventService.ts`, `MarketDiffusion.tsx`, `registerAction.ts`, `app/layout.tsx`, `package.json`, `mitglied-werden/actions.ts`, `schemas.ts`, `requireAdmin`, `termine/actions.ts`, `prisma.ts`, `Button.tsx`, `auth.ts`, `dashboard/kontakt/page.tsx`, `AppError`, `membershipCertificate.ts`, `mitglied-werden/page.tsx`, `app/blog/[id]/page.tsx`, `blog/actions.ts`, `new/page.tsx`, `events.ts`, `lucide-react`, `sitemap.ts`, `LegalPage.tsx`, `membershipService.ts`, `featureFlagService.ts`, `security/page.tsx`, `index.ts`, `PhysicsTimeline.tsx`, `EditUserForm.tsx`, `login/actions.ts`, `FeesTable.tsx`?**
  _High betweenness centrality (0.178) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `LoginForm.tsx`, `app/page.tsx`, `dashboard/blog/page.tsx`, `dashboard/page.tsx`, `ApplicationWizard.tsx`, `zahlungen/page.tsx`, `eventService.ts`, `MarketDiffusion.tsx`, `package.json`, `requireAdmin`, `OutcomeTimeline.tsx`, `dashboard/kontakt/page.tsx`, `mitglied-werden/page.tsx`, `app/blog/[id]/page.tsx`, `new/page.tsx`, `events.ts`, `membershipService.ts`, `security/page.tsx`, `index.ts`, `PhysicsTimeline.tsx`, `MailForm.tsx`, `formatNumber`, `EditUserForm.tsx`, `ApplicationList.tsx`, `FeesTable.tsx`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `LoginForm.tsx`, `dashboard/blog/page.tsx`, `dashboard/page.tsx`, `ApplicationWizard.tsx`, `eventService.ts`, `MarketDiffusion.tsx`, `package.json`, `requireAdmin`, `dashboard/kontakt/page.tsx`, `app/blog/[id]/page.tsx`, `new/page.tsx`, `membershipFormSchemas.ts`, `LegalPage.tsx`, `membershipService.ts`, `featureFlagService.ts`, `index.ts`, `PhysicsTimeline.tsx`, `MailForm.tsx`, `EditUserForm.tsx`, `ApplicationList.tsx`, `altcha.d.ts`, `FeesTable.tsx`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _393 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LoginForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09343200740055504 - nodes in this community are weakly interconnected._
- **Should `mailService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0783744557329463 - nodes in this community are weakly interconnected._