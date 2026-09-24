# Graph Report - wiphy  (2026-09-24)

## Corpus Check
- 297 files · ~122,385 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1630 nodes · 5147 edges · 89 communities (81 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 39 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Feature Flags & Altcha
- Fees Table & Applications UI
- Forms & Header Chrome
- Dashboard Page Shell
- Public Pages & Loading
- Board Member Admin
- Auth & Password Reset
- Mail Sending & Blocks
- Membership Wizard & Schemas
- Blog Image Pipeline
- Dashboard Tables
- Fee Defaults & Amounts
- Events Admin & Listing
- Theme & Hero Visuals
- Blog Feed & SEO
- Root & Dashboard Layout
- Package Manifest
- Runtime Dependencies
- Contact & Application Submit
- Registration & Verification
- Zod Validation Schemas
- Admin Server Actions
- ICS Calendar Export
- Contact Form Page
- Delete Buttons & Icons
- Security Chart Geometry
- Security Dashboard Page
- Contact Request Actions
- Applications Page & Repo
- Membership Certificate Logic
- Fee Calculation Service
- Membership Journey Rail
- Berlin Time & Events
- Blog Actions
- Users Table Sorting
- Event Form
- Upcoming Events
- TypeScript Config
- Dev Dependencies
- NextAuth & Rate Limit
- User Update & Tests
- Blog Index & Gallery
- Dashboard Dialogs
- Bank Details & IBAN
- Legal Texts
- Statute & Fee Defaults
- Mail Dashboard
- Security Event Log
- Formatting Helpers
- Rate Limit Table
- Board Actions
- Icon Generation & Sharp
- Feature Gate & Photos
- Authorized API Routes
- Registration Funnel
- Password Strength
- Tech Stack (README)
- Edit User Form Logic
- Tiptap Email Editor
- Prisma Config & Seed
- Payment History PDF
- Certificate PDF Route
- Blog Pagination & Metadata
- Auth Page Layouts
- npm Scripts
- Features (README)
- Activity Heatmap
- IconButton Component
- Membership Onboarding Docs
- SMTP Mailer
- Markdown Editor
- Data Models & PDFs (README)
- Markdown Viewer
- Deployment
- pnpm Workspace Builds
- Abuse Defense Docs
- Email Composer Dialog
- ESLint Config
- Security Docs
- Delete Member Flow
- Altcha JSX Types
- graphify Workflow
- Forgot Password Layout
- PostCSS Config
- Node Test Runner
- sanitize-html (doc)
- Zod (doc)
- NextAuth Handlers Export

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
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` --conceptually_related_to--> `Prisma v7 ORM`  [INFERRED]
  pnpm-workspace.yaml → README.md
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` --conceptually_related_to--> `sharp Image Processing (WebP)`  [INFERRED]
  pnpm-workspace.yaml → README.md
- `pnpm Package Manager` --references--> `pnpm Workspace Config`  [EXTRACTED]
  README.md → pnpm-workspace.yaml
- `FeeDefaultsCard()` --indirect_call--> `deleteFeeDefaultYear()`  [INFERRED]
  src/app/dashboard/fees/FeeDefaultsCard.tsx → src/app/dashboard/fees/actions.ts
- `save()` --indirect_call--> `saveFeeDefault()`  [INFERRED]
  src/app/dashboard/fees/FeeDefaultsCard.tsx → src/app/dashboard/fees/actions.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Contact/Login Abuse Defense Stack** — readme_altcha_captcha, readme_honeypot_timing, readme_ratelimitentry_model, readme_client_ip_detection, readme_nginx_reverse_proxy [EXTRACTED 1.00]
- **Fee Data to Certificate/Payment PDFs** — readme_feedefault_model, readme_memberfee_model, readme_membership_certificate, readme_payment_overview, readme_react_pdf [EXTRACTED 1.00]
- **Membership Onboarding Flow** — readme_membership_journey, readme_login, readme_membership_application_wizard, readme_membershipapplication_model, readme_registration_cleanup [EXTRACTED 1.00]

## Communities (89 total, 8 thin omitted)

### Community 0 - "Feature Flags & Altcha"
Cohesion: 0.06
Nodes (43): altcha, setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, ForgotPasswordPage(), FaqItem, LoginFaq(), SECTIONS (+35 more)

### Community 1 - "Fees Table & Applications UI"
Cohesion: 0.06
Nodes (43): compareBy(), displayName(), FeesTable(), selectAllWithOpenFees(), hasOpenFee(), acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant() (+35 more)

### Community 2 - "Forms & Header Chrome"
Cohesion: 0.07
Nodes (31): CtaCard(), ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, categories (+23 more)

### Community 3 - "Dashboard Page Shell"
Cohesion: 0.09
Nodes (29): nextConfig, next, metadata, DashboardPageHeader(), DashboardPageHeaderProps, FeatureFlagsPage(), metadata, metadata (+21 more)

### Community 4 - "Public Pages & Loading"
Cohesion: 0.09
Nodes (22): metadata, metadata, heroMetrics, pillars, dynamic, Props, metadata, Block() (+14 more)

### Community 5 - "Board Member Admin"
Cohesion: 0.08
Nodes (40): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), AdminBoardPage(), getInitials(), VorstandPage() (+32 more)

### Community 6 - "Auth & Password Reset"
Cohesion: 0.13
Nodes (30): ref_crypto, POST(), checkLoginFeatureEnabled(), createLoginChallenge(), resendVerificationEmail(), LoginForm(), adminCreatedUserMessage(), emailChangeMessage() (+22 more)

### Community 7 - "Mail Sending & Blocks"
Cohesion: 0.11
Nodes (29): sanitize-html, parseMailForm(), sendEmailAction(), EmailBlock, eventContactPath(), parseDirectMailForm(), sendDirectMailAction(), ENTITIES (+21 more)

### Community 8 - "Membership Wizard & Schemas"
Cohesion: 0.06
Nodes (32): zod, InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), ageAt() (+24 more)

### Community 9 - "Blog Image Pipeline"
Cohesion: 0.10
Nodes (36): POST(), AdminBlogPage(), BlogImageVariant, processBlogImage(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost() (+28 more)

### Community 10 - "Dashboard Tables"
Cohesion: 0.10
Nodes (24): DeletePostButton(), metadata, DashboardTableUser, SortKey, STATUS_RANK, FeesSortKey, FeesTableProps, FeesTableUser (+16 more)

### Community 11 - "Fee Defaults & Amounts"
Cohesion: 0.11
Nodes (32): FeeDefaultRow, FeeDefaultsCard(), run(), save(), AmountDialog(), explainFee(), FeesDashboardPage(), deleteUserAction() (+24 more)

### Community 12 - "Events Admin & Listing"
Cohesion: 0.11
Nodes (33): EditBlogPage(), AdminEventsPage(), TerminePage(), formatEventShort(), createEvent(), deleteEventById(), EventWriteData, findAllEvents() (+25 more)

### Community 13 - "Theme & Hero Visuals"
Cohesion: 0.12
Nodes (27): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+19 more)

### Community 14 - "Blog Feed & SEO"
Cohesion: 0.16
Nodes (23): escapeXml(), GET(), generateMetadata(), Props, PublicBlogPost(), HomePage(), sitemap(), EventDetailPage() (+15 more)

### Community 15 - "Root & Dashboard Layout"
Cohesion: 0.10
Nodes (15): metadata, src_app_globals, body, metadata, mono, viewport, alt, contentType (+7 more)

### Community 16 - "Package Manifest"
Cohesion: 0.07
Nodes (26): name, prisma, seed, private, version, altcha-lib, babel-plugin-react-compiler, next-auth (+18 more)

### Community 17 - "Runtime Dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+19 more)

### Community 18 - "Contact & Application Submit"
Cohesion: 0.15
Nodes (21): ContactRequestsPage(), submitContactRequest(), absoluteUrl(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), MAX_MESSAGE_LENGTH (+13 more)

### Community 19 - "Registration & Verification"
Cohesion: 0.19
Nodes (18): POST(), notifyAdminsAboutRegistration(), POST(), registerUser(), adminRegistrationNoticeMessage(), prisma, extractClientIp(), HeaderBag (+10 more)

### Community 20 - "Zod Validation Schemas"
Cohesion: 0.08
Nodes (20): adminCreateUserSchema, BankUpdateParsed, berlinDateTime(), blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema (+12 more)

### Community 21 - "Admin Server Actions"
Cohesion: 0.13
Nodes (24): createDraft(), deletePost(), savePost(), deleteFeeDefaultYear(), saveFeeDefault(), toggleFee(), updateFeeAmount(), updateFeeStatus() (+16 more)

### Community 22 - "ICS Calendar Export"
Cohesion: 0.16
Nodes (19): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildEventIcs(), calendar(), describe() (+11 more)

### Community 23 - "Contact Form Page"
Cohesion: 0.13
Nodes (19): ContactForm(), dynamic, KontaktPage(), metadata, dynamic, internalPath(), LoginPage(), metadata (+11 more)

### Community 24 - "Delete Buttons & Icons"
Cohesion: 0.24
Nodes (12): lucide-react, react, ContactRequestItem, dateFormat, DeleteMemberSectionProps, PhotoMeta, EmailComposerDialogProps, FeatureDisabledDialog() (+4 more)

### Community 25 - "Security Chart Geometry"
Cohesion: 0.15
Nodes (19): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+11 more)

### Community 26 - "Security Dashboard Page"
Cohesion: 0.15
Nodes (19): dynamic, metadata, SecurityPage(), ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel() (+11 more)

### Community 27 - "Contact Request Actions"
Cohesion: 0.19
Nodes (18): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), removeRateLimitEntry(), createEventDraft(), deleteEventAction() (+10 more)

### Community 28 - "Applications Page & Repo"
Cohesion: 0.19
Nodes (18): dynamic, MembershipApplicationsPage(), metadata, planApplicationFees(), countOpenApplications(), deleteApplication(), findApplicationById(), findApplications() (+10 more)

### Community 29 - "Membership Certificate Logic"
Cohesion: 0.20
Nodes (17): berlinYear(), CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDuration(), formatMembershipDurationDative(), formatPaidYears() (+9 more)

### Community 30 - "Fee Calculation Service"
Cohesion: 0.18
Nodes (18): initializeBillingYear(), revertFeeAmount(), updateFeeComment(), FeeBreakdown, clearFeeAmountOverride(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees() (+10 more)

### Community 31 - "Membership Journey Rail"
Cohesion: 0.20
Nodes (16): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+8 more)

### Community 32 - "Berlin Time & Events"
Cohesion: 0.15
Nodes (18): isSameBerlinDay(), TIME_ZONE, CALENDAR_ICS_PATH, DAY_MONTH, DAY_MONTH_YEAR, daysUntilEvent(), DEFAULT_DURATION_MINUTES, eventEnd() (+10 more)

### Community 33 - "Blog Actions"
Cohesion: 0.26
Nodes (17): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager() (+9 more)

### Community 34 - "Users Table Sorting"
Cohesion: 0.13
Nodes (11): compareBy(), DashboardUsersTable(), displayName(), getStatusIcon(), byStatusThenName(), MailForm(), formatStatus(), formatStatusShort() (+3 more)

### Community 35 - "Event Form"
Cohesion: 0.25
Nodes (16): EventForm(), toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate() (+8 more)

### Community 36 - "Upcoming Events"
Cohesion: 0.18
Nodes (16): DashboardEvent, UpcomingEventAlert(), dynamic, metadata, NextEventCard(), SearchParams, ViewSwitch(), EventCard() (+8 more)

### Community 37 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "Dev Dependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography, ts-node (+10 more)

### Community 39 - "NextAuth & Rate Limit"
Cohesion: 0.16
Nodes (14): bcryptjs, CaptchaFailedError, EmailNotVerifiedError, handlers, LoginRateLimitedError, signIn, signOut, consumeRateLimit() (+6 more)

### Community 40 - "User Update & Tests"
Cohesion: 0.16
Nodes (13): ref_node_assert, ref_node_test, applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput() (+5 more)

### Community 41 - "Blog Index & Gallery"
Cohesion: 0.22
Nodes (13): BlogIndexPage(), PostCard(), BlogGallery(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, blogImageSrcSet(), blogImageUrl() (+5 more)

### Community 42 - "Dashboard Dialogs"
Cohesion: 0.17
Nodes (9): EmailChangeDialog(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog(), SectionHeader(), LogoutButton(), MEMBERSHIP_ADMIN_PATH (+1 more)

### Community 43 - "Bank Details & IBAN"
Cohesion: 0.27
Nodes (13): BankValues, IbanInput(), handleChange(), PaymentOption(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban() (+5 more)

### Community 44 - "Legal Texts"
Cohesion: 0.16
Nodes (10): DATENSCHUTZ, metadata, IMPRESSUM, metadata, SATZUNG, LegalPage(), LegalSections(), LegalBlock (+2 more)

### Community 45 - "Statute & Fee Defaults"
Cohesion: 0.23
Nodes (13): dynamic, metadata, SatzungPage(), FeeDefaultEntry, FeeRates, resolveFeeDefault(), deleteFeeDefault(), findFeeDefaults() (+5 more)

### Community 46 - "Mail Dashboard"
Cohesion: 0.17
Nodes (13): MailAnnouncement, MailDashboard(), MailEventOption, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage() (+5 more)

### Community 47 - "Security Event Log"
Cohesion: 0.18
Nodes (15): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview(), HeatCell (+7 more)

### Community 48 - "Formatting Helpers"
Cohesion: 0.21
Nodes (12): MetaLine(), DATE_TIME, EURO, formatDate(), formatDateShort(), formatDateTime(), LONG_DATE, NUMBER (+4 more)

### Community 49 - "Rate Limit Table"
Cohesion: 0.20
Nodes (10): InfoTooltip(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), RateLimitTableProps, IconButton() (+2 more)

### Community 50 - "Board Actions"
Cohesion: 0.25
Nodes (13): createDraft(), deleteMember(), deletePhotoAction(), moveMemberInList(), parseOrThrow(), revalidateBoard(), saveMember(), removeAdminMember() (+5 more)

### Community 51 - "Icon Generation & Sharp"
Cohesion: 0.18
Nodes (8): ref_node_fs, sharp, BACKGROUND, icon(), main(), ImageBytes, ProcessedBlogImage, QUALITY_LADDER

### Community 52 - "Feature Gate & Photos"
Cohesion: 0.29
Nodes (9): @prisma/client, POST(), FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, processBoardPhoto(), memberExists(), setMemberPhoto() (+1 more)

### Community 53 - "Authorized API Routes"
Cohesion: 0.27
Nodes (9): GET(), GET(), GET(), assertCanEditUser(), getOptionalUser(), normalizeRole(), UserContext, findImageBytes() (+1 more)

### Community 54 - "Registration Funnel"
Cohesion: 0.21
Nodes (11): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+3 more)

### Community 55 - "Password Strength"
Cohesion: 0.23
Nodes (10): FILL_PERCENT, PasswordInput(), PasswordStrengthMeter(), evaluatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 56 - "Tech Stack (README)"
Cohesion: 0.20
Nodes (11): FeatureFlag System, Login with safe ?next= redirect, NextAuth.js v5 (Credentials, JWT), Next.js 16 App Router, pnpm Package Manager, PostgreSQL, Prisma v7 ORM, REGISTRATION_CLEANUP of unverified accounts (+3 more)

### Community 57 - "Edit User Form Logic"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "Tiptap Email Editor"
Cohesion: 0.24
Nodes (7): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailBodyField(), EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 59 - "Prisma Config & Seed"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "Payment History PDF"
Cohesion: 0.33
Nodes (7): @react-pdf/renderer, GET(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee

### Community 61 - "Certificate PDF Route"
Cohesion: 0.44
Nodes (7): GET(), DashboardPage(), certificateFacts, isCertifiableStatus(), loadLogoDataUrl(), getSignatureBoardMembers(), getEditableUser()

### Community 62 - "Blog Pagination & Metadata"
Cohesion: 0.28
Nodes (6): generateMetadata(), Props, DEFAULT_OG_IMAGE, OgImage, pageMetadata(), BlogPostWithImages

### Community 63 - "Auth Page Layouts"
Cohesion: 0.17
Nodes (3): metadata, metadata, metadata

### Community 64 - "npm Scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "Features (README)"
Cohesion: 0.25
Nodes (8): Admin Dashboard, Public Blog with RSS, BlogPost + BlogImage Models, Event Model, Termine with ICS Calendar Export, Rundmail System with $Anrede placeholders, Nodemailer Email Delivery, Tiptap Rich-Text Mail Editor

### Community 66 - "Activity Heatmap"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 67 - "IconButton Component"
Cohesion: 0.29
Nodes (7): colorClasses, iconButtonClasses(), IconButtonColor, IconButtonLink(), IconButtonSize, IconButtonVariant, sizeClasses

### Community 68 - "Membership Onboarding Docs"
Cohesion: 0.29
Nodes (7): Environment Variables (.env), Six-step Membership Application Wizard, Mitglied-werden Membership Journey, MembershipApplication Model, NEXT_PUBLIC_SITE_URL, SECURITY_LOG_PEPPER, SEPA Direct Debit Mandate

### Community 69 - "SMTP Mailer"
Cohesion: 0.52
Nodes (6): getMailTransporter(), normalize(), Recipients, sendEmail(), getSmtpConfig(), getSignatureBoardLine()

### Community 70 - "Markdown Editor"
Cohesion: 0.40
Nodes (4): @uiw/react-markdown-preview, @uiw/react-md-editor, MarkdownEditor(), MDEditor

### Community 71 - "Data Models & PDFs (README)"
Cohesion: 0.40
Nodes (6): FeeDefault Model, MemberFee Model, Membership Certificate PDF, Payment Overview & History PDF, @react-pdf/renderer PDF Generation, User Model

### Community 72 - "Markdown Viewer"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 73 - "Deployment"
Cohesion: 0.40
Nodes (4): deploy.sh script, GitHub Actions SSH Deploy, Hetzner Cloud / Ubuntu Deployment (pm2), nginx Reverse Proxy Config

### Community 74 - "pnpm Workspace Builds"
Cohesion: 0.50
Nodes (5): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver), BoardMember + BoardMemberPhoto Models, sharp Image Processing (WebP)

### Community 75 - "Abuse Defense Docs"
Cohesion: 0.50
Nodes (5): ALTCHA Proof-of-Work Captcha, Contact Form, ContactRequest Model, Honeypot & Timing Check, PasswordResetToken / EmailVerificationToken / SolvedAltchaChallenge

### Community 76 - "Email Composer Dialog"
Cohesion: 0.50
Nodes (4): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 77 - "ESLint Config"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 78 - "Security Docs"
Cohesion: 0.67
Nodes (4): Client IP Detection behind Reverse Proxy (clientIp.ts), RateLimitEntry DB-backed Rate Limiting, Security Dashboard (heatmap, registration funnel), SecurityEvent Security Log

### Community 80 - "Altcha JSX Types"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "graphify Workflow"
Cohesion: 0.67
Nodes (3): graphify query/path/explain, graphify update (AST-only), graphify Knowledge Graph Workflow

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **394 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+389 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 497 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `Dashboard Page Shell` to `Feature Flags & Altcha`, `Fees Table & Applications UI`, `Forms & Header Chrome`, `Public Pages & Loading`, `Auth & Password Reset`, `Mail Sending & Blocks`, `Membership Wizard & Schemas`, `Blog Image Pipeline`, `Dashboard Tables`, `Fee Defaults & Amounts`, `Blog Feed & SEO`, `Root & Dashboard Layout`, `Package Manifest`, `Contact & Application Submit`, `Registration & Verification`, `Admin Server Actions`, `ICS Calendar Export`, `Contact Form Page`, `Delete Buttons & Icons`, `Security Dashboard Page`, `Contact Request Actions`, `Applications Page & Repo`, `Membership Journey Rail`, `Blog Actions`, `Upcoming Events`, `NextAuth & Rate Limit`, `Blog Index & Gallery`, `Dashboard Dialogs`, `Bank Details & IBAN`, `Legal Texts`, `Statute & Fee Defaults`, `Mail Dashboard`, `Board Actions`, `Feature Gate & Photos`, `Authorized API Routes`, `Payment History PDF`, `Certificate PDF Route`, `Blog Pagination & Metadata`, `Auth Page Layouts`, `IconButton Component`, `Markdown Editor`, `Forgot Password Layout`?**
  _High betweenness centrality (0.175) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `Delete Buttons & Icons` to `Feature Flags & Altcha`, `Fees Table & Applications UI`, `Forms & Header Chrome`, `Dashboard Page Shell`, `Public Pages & Loading`, `Membership Wizard & Schemas`, `Dashboard Tables`, `Fee Defaults & Amounts`, `Blog Feed & SEO`, `Package Manifest`, `Security Chart Geometry`, `Security Dashboard Page`, `Applications Page & Repo`, `Membership Journey Rail`, `Event Form`, `Upcoming Events`, `Blog Index & Gallery`, `Dashboard Dialogs`, `Bank Details & IBAN`, `Statute & Fee Defaults`, `Rate Limit Table`, `Registration Funnel`, `Password Strength`, `Blog Pagination & Metadata`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `react` connect `Delete Buttons & Icons` to `Feature Flags & Altcha`, `Fees Table & Applications UI`, `Forms & Header Chrome`, `Dashboard Page Shell`, `Event Form`, `Public Pages & Loading`, `Markdown Editor`, `Membership Wizard & Schemas`, `Blog Index & Gallery`, `Dashboard Tables`, `Fee Defaults & Amounts`, `Dashboard Dialogs`, `Bank Details & IBAN`, `Theme & Hero Visuals`, `Package Manifest`, `Rate Limit Table`, `Altcha JSX Types`, `Password Strength`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _394 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Feature Flags & Altcha` be split into smaller, more focused modules?**
  _Cohesion score 0.06298076923076923 - nodes in this community are weakly interconnected._
- **Should `Fees Table & Applications UI` be split into smaller, more focused modules?**
  _Cohesion score 0.0647307924984876 - nodes in this community are weakly interconnected._