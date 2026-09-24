# Graph Report - wiphy  (2026-09-24)

## Corpus Check
- 302 files · ~124,433 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1619 nodes · 5153 edges · 81 communities (73 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 38 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `08d48469`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LoginForm.tsx
- mailService.ts
- Container
- index.ts
- AccountPanel.tsx
- boardService.ts
- userService.ts
- berlinTime.ts
- ApplicationWizard.tsx
- blogService.ts
- vorstand/actions.ts
- zahlungen/page.tsx
- eventService.ts
- MarketDiffusion.tsx
- isFeatureEnabled
- lib/siteUrl.ts
- package.json
- dependencies
- mitglied-werden/actions.ts
- userUpdateData.ts
- schemas.ts
- requireAdmin
- ics.ts
- altcha.ts
- cn
- OutcomeTimeline.tsx
- auth.ts
- ContactRequestList.tsx
- AppError
- dashboard/page.tsx
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
- BankDetailsForm.tsx
- LegalPage.tsx
- membershipService.ts
- next
- securityEventService.ts
- IconButton.tsx
- Card
- MailDashboard.tsx
- opengraph-image.tsx
- authz.ts
- MailForm.tsx
- formatNumber
- rateLimitService.ts
- RateLimitTable.tsx
- EditUserForm.tsx
- FeesTable.tsx
- seed.ts
- ShareButton
- app/layout.tsx
- TypeSparklines.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- ActivityHeatmap.tsx
- login/actions.ts
- CLAUDE.md
- MarkdownViewer.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- eslint.config.mjs
- ApplicationList.tsx
- DeleteMemberSection
- altcha.d.ts
- sendEmail
- postcss.config.mjs
- dashboard/blog/[id]/page.tsx
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

## Communities (81 total, 8 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.13
Nodes (21): next-auth, ForgotPasswordPage(), createLoginChallenge(), FaqItem, LoginFaq(), SECTIONS, LoginForm(), VerifyEmailContent() (+13 more)

### Community 1 - "mailService.ts"
Cohesion: 0.08
Nodes (44): sanitize-html, parseMailForm(), sendEmailAction(), blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailMessage (+36 more)

### Community 2 - "Container"
Cohesion: 0.13
Nodes (7): FeatureFlagsPage(), metadata, metadata, Container(), Eyebrow(), PageTitle(), getAllFeatureFlags()

### Community 3 - "index.ts"
Cohesion: 0.18
Nodes (21): metadata, DashboardPageHeader(), DashboardPageHeaderProps, dynamic, metadata, dynamic, metadata, dynamic (+13 more)

### Community 4 - "AccountPanel.tsx"
Cohesion: 0.21
Nodes (9): AccountPanel(), handleSubmit(), FIRST_HALF_FIELDS, FirstHalfField, ResetPasswordForm(), handleSubmit(), NewPasswordFields(), validateNewPassword() (+1 more)

### Community 5 - "boardService.ts"
Cohesion: 0.07
Nodes (47): sharp, BACKGROUND, icon(), main(), GET(), BoardPhotoUploader(), handleDelete(), handleDrop() (+39 more)

### Community 6 - "userService.ts"
Cohesion: 0.25
Nodes (13): ref_crypto, createUser(), deleteUserById(), findUserById(), findUserByMitgliedIdExcludingUser(), findUsersForDashboard(), updateUserById(), anonymizeSecurityEventsForUser() (+5 more)

### Community 7 - "berlinTime.ts"
Cohesion: 0.32
Nodes (13): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+5 more)

### Community 8 - "ApplicationWizard.tsx"
Cohesion: 0.06
Nodes (40): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), FeeDefaultEntry, FeeRates (+32 more)

### Community 9 - "blogService.ts"
Cohesion: 0.10
Nodes (36): POST(), AdminBlogPage(), processBlogImage(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost(), deleteImage() (+28 more)

### Community 10 - "vorstand/actions.ts"
Cohesion: 0.25
Nodes (13): createDraft(), deleteMember(), deletePhotoAction(), moveMemberInList(), parseOrThrow(), revalidateBoard(), saveMember(), removeAdminMember() (+5 more)

### Community 11 - "zahlungen/page.tsx"
Cohesion: 0.12
Nodes (31): FeeDefaultRow, FeeDefaultsCard(), run(), save(), updateBankDetails(), BankDetailsForm(), submit(), dynamic (+23 more)

### Community 12 - "eventService.ts"
Cohesion: 0.13
Nodes (28): createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventOptions(), findLatestPastEvent(), findNextUpcomingEvent(), findPastEvents() (+20 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (30): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+22 more)

### Community 14 - "isFeatureEnabled"
Cohesion: 0.21
Nodes (17): notifyAdminsAboutRegistration(), POST(), adminRegistrationNoticeMessage(), adapter, globalForPrisma, prisma, getSecurityLogPepper(), getPendingRegistrationStats() (+9 more)

### Community 15 - "lib/siteUrl.ts"
Cohesion: 0.16
Nodes (12): escapeXml(), GET(), metadata, BlogPostingJsonLd(), OrganizationJsonLd(), findPublishedPosts(), getPublishedPosts(), absoluteUrl() (+4 more)

### Community 16 - "package.json"
Cohesion: 0.07
Nodes (26): name, prisma, seed, private, version, altcha-lib, babel-plugin-react-compiler, nodemailer (+18 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+19 more)

### Community 18 - "mitglied-werden/actions.ts"
Cohesion: 0.21
Nodes (16): ContactRequestsPage(), submitContactRequest(), submitMembershipApplication(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), membershipApplicationNoticeMessage() (+8 more)

### Community 19 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 20 - "schemas.ts"
Cohesion: 0.08
Nodes (19): adminCreateUserSchema, BankUpdateParsed, berlinDateTime(), blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema (+11 more)

### Community 21 - "requireAdmin"
Cohesion: 0.13
Nodes (31): deletePost(), savePost(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), toggleFee(), updateFeeAmount() (+23 more)

### Community 22 - "ics.ts"
Cohesion: 0.17
Nodes (18): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildEventIcs(), calendar(), describe() (+10 more)

### Community 23 - "altcha.ts"
Cohesion: 0.13
Nodes (19): ContactForm(), dynamic, KontaktPage(), metadata, dynamic, internalPath(), LoginPage(), metadata (+11 more)

### Community 24 - "cn"
Cohesion: 0.15
Nodes (14): CtaCard(), ButtonColor, ButtonLinkProps, ButtonProps, ButtonSize, ButtonVariant, colorClasses, sizeClasses (+6 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (13): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+5 more)

### Community 26 - "auth.ts"
Cohesion: 0.14
Nodes (19): bcryptjs, POST(), registerUser(), CaptchaFailedError, EmailNotVerifiedError, handlers, LoginRateLimitedError, signIn (+11 more)

### Community 27 - "ContactRequestList.tsx"
Cohesion: 0.31
Nodes (9): markContactRequestHandled(), removeContactRequest(), ContactRequestItem, ContactRequestList(), confirmDelete(), run(), dateFormat, deleteContactRequest() (+1 more)

### Community 28 - "AppError"
Cohesion: 0.19
Nodes (18): zod, acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw() (+10 more)

### Community 29 - "dashboard/page.tsx"
Cohesion: 0.05
Nodes (59): @react-pdf/renderer, GET(), MetaLine(), compareBy(), DashboardTableUser, DashboardUsersTable(), displayName(), getStatusIcon() (+51 more)

### Community 30 - "feeService.ts"
Cohesion: 0.17
Nodes (22): FeesDashboardPage(), metadata, resolveFeeDefault(), deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), clearFeeAmountOverride(), findExistingFeeYears() (+14 more)

### Community 31 - "mitglied-werden/page.tsx"
Cohesion: 0.12
Nodes (20): ref_node_assert, ref_node_test, JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props (+12 more)

### Community 32 - "app/blog/[id]/page.tsx"
Cohesion: 0.22
Nodes (16): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), PostCard(), BlogGallery(), blogImageSrcSet(), blogImageUrl() (+8 more)

### Community 33 - "blog/actions.ts"
Cohesion: 0.35
Nodes (14): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), applyImageOrder() (+6 more)

### Community 34 - "new/page.tsx"
Cohesion: 0.17
Nodes (14): metadata, NewUserPage(), FILL_PERCENT, PasswordInput(), PasswordStrengthMeter(), evaluatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion (+6 more)

### Community 35 - "blogImages.ts"
Cohesion: 0.13
Nodes (15): BlogImageManager(), handleDrop(), uploadFiles(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, formatBytes() (+7 more)

### Community 36 - "events.ts"
Cohesion: 0.09
Nodes (48): EditBlogPage(), AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), heroMetrics, HomePage(), pillars, dynamic (+40 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography, ts-node (+10 more)

### Community 39 - "EmailBodyField.tsx"
Cohesion: 0.24
Nodes (7): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailBodyField(), EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 40 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 41 - "lucide-react"
Cohesion: 0.15
Nodes (19): lucide-react, react, DeletePostButton(), DeleteEventButton(), DeleteMemberSectionProps, DeleteMemberButton(), PhotoMeta, metadata (+11 more)

### Community 42 - "sitemap.ts"
Cohesion: 0.43
Nodes (6): sitemap(), GET(), TerminePage(), buildCalendarIcs(), getPastEvents(), getUpcomingEvents()

### Community 43 - "BankDetailsForm.tsx"
Cohesion: 0.27
Nodes (13): BankValues, IbanInput(), handleChange(), PaymentOption(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+5 more)

### Community 44 - "LegalPage.tsx"
Cohesion: 0.16
Nodes (12): DATENSCHUTZ, metadata, IMPRESSUM, metadata, SATZUNG, Block(), LegalPage(), LegalSections() (+4 more)

### Community 45 - "membershipService.ts"
Cohesion: 0.20
Nodes (15): dynamic, MembershipApplicationsPage(), metadata, planApplicationFees(), countOpenApplications(), deleteApplication(), findApplications(), findApplicationsForUser() (+7 more)

### Community 46 - "next"
Cohesion: 0.10
Nodes (18): nextConfig, next, @prisma/client, POST(), setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, metadata (+10 more)

### Community 47 - "securityEventService.ts"
Cohesion: 0.19
Nodes (16): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview() (+8 more)

### Community 48 - "IconButton.tsx"
Cohesion: 0.29
Nodes (7): colorClasses, iconButtonClasses(), IconButtonColor, IconButtonLink(), IconButtonSize, IconButtonVariant, sizeClasses

### Community 49 - "Card"
Cohesion: 0.10
Nodes (19): generateMetadata(), Props, metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline() (+11 more)

### Community 50 - "MailDashboard.tsx"
Cohesion: 0.15
Nodes (12): MailAnnouncement, MailDashboard(), MailEventOption, announcementHtml(), dynamic, MailDashboardPage(), metadata, dynamic (+4 more)

### Community 51 - "opengraph-image.tsx"
Cohesion: 0.29
Nodes (5): ref_node_fs, ref_node_path, alt, contentType, size

### Community 52 - "authz.ts"
Cohesion: 0.19
Nodes (18): GET(), GET(), GET(), createDraft(), deleteUserAction(), EditUserPage(), metadata, updateUser() (+10 more)

### Community 53 - "MailForm.tsx"
Cohesion: 0.11
Nodes (14): byStatusThenName(), MailForm(), MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, useEmailEditor() (+6 more)

### Community 54 - "formatNumber"
Cohesion: 0.21
Nodes (11): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+3 more)

### Community 55 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 56 - "RateLimitTable.tsx"
Cohesion: 0.24
Nodes (8): InfoTooltip(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), RateLimitTableProps, IconButton()

### Community 57 - "EditUserForm.tsx"
Cohesion: 0.13
Nodes (15): ADMIN_ONLY_KEYS, EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), FIELD_LABELS (+7 more)

### Community 58 - "FeesTable.tsx"
Cohesion: 0.12
Nodes (11): AmountDialog(), compareBy(), displayName(), explainFee(), FeesSortKey, FeesTable(), selectAllWithOpenFees(), FeesTableProps (+3 more)

### Community 59 - "seed.ts"
Cohesion: 0.25
Nodes (5): adapter, prisma, dotenv, prisma, @prisma/adapter-pg

### Community 61 - "app/layout.tsx"
Cohesion: 0.15
Nodes (10): src_app_globals, body, metadata, mono, columns, Footer(), legalLinks, Header() (+2 more)

### Community 62 - "TypeSparklines.tsx"
Cohesion: 0.36
Nodes (7): sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 69 - "login/actions.ts"
Cohesion: 0.20
Nodes (16): POST(), checkLoginFeatureEnabled(), resendVerificationEmail(), adminCreatedUserMessage(), emailChangeMessage(), feeReminderMessage(), greeting(), LINK_EXPIRY() (+8 more)

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

### Community 82 - "sendEmail"
Cohesion: 0.46
Nodes (7): renderEmailText(), getMailTransporter(), normalize(), Recipients, sendEmail(), getSmtpConfig(), getSignatureBoardLine()

### Community 86 - "dashboard/blog/[id]/page.tsx"
Cohesion: 0.11
Nodes (19): altcha, @uiw/react-md-editor, metadata, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), VerifyPanel() (+11 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **394 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+389 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 503 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `Container`, `index.ts`, `AccountPanel.tsx`, `boardService.ts`, `ApplicationWizard.tsx`, `vorstand/actions.ts`, `zahlungen/page.tsx`, `MarketDiffusion.tsx`, `isFeatureEnabled`, `lib/siteUrl.ts`, `package.json`, `mitglied-werden/actions.ts`, `requireAdmin`, `ics.ts`, `altcha.ts`, `cn`, `auth.ts`, `ContactRequestList.tsx`, `AppError`, `dashboard/page.tsx`, `feeService.ts`, `mitglied-werden/page.tsx`, `app/blog/[id]/page.tsx`, `blog/actions.ts`, `new/page.tsx`, `events.ts`, `lucide-react`, `sitemap.ts`, `BankDetailsForm.tsx`, `LegalPage.tsx`, `membershipService.ts`, `IconButton.tsx`, `Card`, `MailDashboard.tsx`, `opengraph-image.tsx`, `authz.ts`, `EditUserForm.tsx`, `FeesTable.tsx`, `app/layout.tsx`, `login/actions.ts`, `dashboard/blog/[id]/page.tsx`?**
  _High betweenness centrality (0.178) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `LoginForm.tsx`, `index.ts`, `AccountPanel.tsx`, `ApplicationWizard.tsx`, `zahlungen/page.tsx`, `MarketDiffusion.tsx`, `package.json`, `cn`, `OutcomeTimeline.tsx`, `dashboard/page.tsx`, `mitglied-werden/page.tsx`, `app/blog/[id]/page.tsx`, `new/page.tsx`, `events.ts`, `BankDetailsForm.tsx`, `membershipService.ts`, `Card`, `MailDashboard.tsx`, `authz.ts`, `MailForm.tsx`, `formatNumber`, `RateLimitTable.tsx`, `EditUserForm.tsx`, `FeesTable.tsx`, `ApplicationList.tsx`, `dashboard/blog/[id]/page.tsx`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `LoginForm.tsx`, `Container`, `index.ts`, `AccountPanel.tsx`, `ApplicationWizard.tsx`, `zahlungen/page.tsx`, `MarketDiffusion.tsx`, `package.json`, `ContactRequestList.tsx`, `dashboard/page.tsx`, `feeService.ts`, `app/blog/[id]/page.tsx`, `new/page.tsx`, `BankDetailsForm.tsx`, `LegalPage.tsx`, `next`, `Card`, `MailDashboard.tsx`, `authz.ts`, `MailForm.tsx`, `RateLimitTable.tsx`, `EditUserForm.tsx`, `FeesTable.tsx`, `ApplicationList.tsx`, `altcha.d.ts`, `dashboard/blog/[id]/page.tsx`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _394 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LoginForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12878787878787878 - nodes in this community are weakly interconnected._
- **Should `mailService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0783744557329463 - nodes in this community are weakly interconnected._