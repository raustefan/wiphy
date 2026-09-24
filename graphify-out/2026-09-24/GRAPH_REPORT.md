# Graph Report - wiphy  (2026-09-24)

## Corpus Check
- 300 files · ~124,361 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1617 nodes · 5151 edges · 91 communities (80 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 38 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `08d48469`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LoginForm.tsx
- mailService.ts
- zahlungen/page.tsx
- next
- featureGate.ts
- boardService.ts
- userService.ts
- berlinTime.ts
- ApplicationWizard.tsx
- blogService.ts
- vorstand/actions.ts
- satzung/page.tsx
- eventService.ts
- MarketDiffusion.tsx
- isFeatureEnabled
- lib/siteUrl.ts
- package.json
- dependencies
- app/kontakt/actions.ts
- BoardPhotoUploader
- schemas.ts
- requireAdmin
- ics.ts
- altcha.ts
- index.ts
- OutcomeTimeline.tsx
- prisma.ts
- dashboard/kontakt/actions.ts
- AppError
- membershipCertificate.ts
- feeService.ts
- mitglied-werden/page.tsx
- blogImageUrl
- blog/actions.ts
- ref_node_assert
- blogImages.ts
- events.ts
- compilerOptions
- devDependencies
- blogPostPath
- security/page.tsx
- lucide-react
- dashboard/page.tsx
- iban.ts
- LegalPage.tsx
- membershipService.ts
- feature-flags/actions.ts
- securityEventService.ts
- format.ts
- app/page.tsx
- mail/page.tsx
- opengraph-image.tsx
- authz.ts
- FeesTable.tsx
- formatNumber
- MailForm
- RateLimitTable
- EditUserForm
- formatEuro
- seed.ts
- paymentHistoryPdf.tsx
- app/layout.tsx
- TypeSparklines.tsx
- errors.ts
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- ActivityHeatmap.tsx
- forgot-password/layout.tsx
- login/layout.tsx
- messages.ts
- CLAUDE.md
- reset-password/layout.tsx
- MarkdownViewer.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- verify-email/layout.tsx
- auth.ts
- eslint.config.mjs
- ApplicationList.tsx
- DeleteMemberSection
- altcha.d.ts
- EditUserForm.tsx
- mitglied-werden/actions.ts
- postcss.config.mjs
- zertifikat/pdf/route.ts
- EventForm.tsx
- boardImages.ts
- { GET, POST }
- photo/route.ts

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

## Communities (91 total, 11 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.08
Nodes (34): altcha, next-auth, ForgotPasswordPage(), FaqItem, LoginFaq(), SECTIONS, AccountPanel(), handleSubmit() (+26 more)

### Community 1 - "mailService.ts"
Cohesion: 0.09
Nodes (37): sanitize-html, blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailMessage, EmailSignature, nl2br() (+29 more)

### Community 2 - "zahlungen/page.tsx"
Cohesion: 0.14
Nodes (14): SectionHeader(), BankValues, dynamic, metadata, PaymentHistoryTable(), categories, categoryIcon(), categoryLabel() (+6 more)

### Community 3 - "next"
Cohesion: 0.12
Nodes (24): nextConfig, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata, metadata (+16 more)

### Community 4 - "featureGate.ts"
Cohesion: 0.16
Nodes (17): FeesDashboardPage(), parseMailForm(), sendEmailAction(), deleteUserAction(), EditUserPage(), NewUserPage(), updateBankDetails(), requireUser() (+9 more)

### Community 5 - "boardService.ts"
Cohesion: 0.16
Nodes (22): EditBoardMemberPage(), moveMemberOrder(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember(), deleteMemberById() (+14 more)

### Community 6 - "userService.ts"
Cohesion: 0.14
Nodes (23): ref_crypto, @prisma/client, emailChangeMessage(), createUser(), deleteUserById(), findUserById(), findUserByMitgliedIdExcludingUser(), findUsersForDashboard() (+15 more)

### Community 7 - "berlinTime.ts"
Cohesion: 0.32
Nodes (13): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+5 more)

### Community 8 - "ApplicationWizard.tsx"
Cohesion: 0.06
Nodes (37): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), ageAt(), CONSENT_VERSION (+29 more)

### Community 9 - "blogService.ts"
Cohesion: 0.11
Nodes (32): ImageBytes, BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost(), deleteImage(), deletePostById(), eventLinkSelect (+24 more)

### Community 10 - "vorstand/actions.ts"
Cohesion: 0.28
Nodes (12): deleteMember(), deletePhotoAction(), moveMemberInList(), parseOrThrow(), revalidateBoard(), saveMember(), removeAdminMember(), removeMemberPhoto() (+4 more)

### Community 11 - "satzung/page.tsx"
Cohesion: 0.13
Nodes (26): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ApplicationWizard(), currentFormValues(), goToStep() (+18 more)

### Community 12 - "eventService.ts"
Cohesion: 0.11
Nodes (31): EditBlogPage(), AdminEventsPage(), formatEventShort(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents() (+23 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.11
Nodes (28): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+20 more)

### Community 14 - "isFeatureEnabled"
Cohesion: 0.22
Nodes (16): bcryptjs, notifyAdminsAboutRegistration(), POST(), adminRegistrationNoticeMessage(), getSecurityLogPepper(), getPendingRegistrationStats(), PendingRegistrationStats, pruneUnverifiedRegistrations() (+8 more)

### Community 15 - "lib/siteUrl.ts"
Cohesion: 0.16
Nodes (12): escapeXml(), GET(), metadata, BlogPostingJsonLd(), OrganizationJsonLd(), findPublishedPosts(), getPublishedPosts(), absoluteUrl() (+4 more)

### Community 16 - "package.json"
Cohesion: 0.07
Nodes (28): name, prisma, seed, private, version, altcha-lib, babel-plugin-react-compiler, nodemailer (+20 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+19 more)

### Community 18 - "app/kontakt/actions.ts"
Cohesion: 0.23
Nodes (13): ContactRequestsPage(), submitContactRequest(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), ContactInput, hashIp() (+5 more)

### Community 19 - "BoardPhotoUploader"
Cohesion: 0.28
Nodes (9): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), AdminBoardPage(), getInitials(), VorstandPage(), boardPhotoUrl() (+1 more)

### Community 20 - "schemas.ts"
Cohesion: 0.09
Nodes (17): adminCreateUserSchema, BankUpdateParsed, berlinDateTime(), contactSchema, emailField, feeAmountUpdateSchema, feeCommentSchema, feeStatusUpdateSchema (+9 more)

### Community 21 - "requireAdmin"
Cohesion: 0.22
Nodes (25): createDraft(), deletePost(), savePost(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), toggleFee() (+17 more)

### Community 22 - "ics.ts"
Cohesion: 0.22
Nodes (16): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), calendar(), describe() (+8 more)

### Community 23 - "altcha.ts"
Cohesion: 0.13
Nodes (19): ContactForm(), dynamic, KontaktPage(), metadata, dynamic, internalPath(), LoginPage(), metadata (+11 more)

### Community 24 - "index.ts"
Cohesion: 0.10
Nodes (31): CtaCard(), DashboardTableUser, SortKey, STATUS_RANK, FeeDefaultRow, InfoTooltip(), RateLimitTableProps, CalloutTone (+23 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (13): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+5 more)

### Community 26 - "prisma.ts"
Cohesion: 0.15
Nodes (19): POST(), POST(), FeatureFlagsPage(), registerUser(), adapter, globalForPrisma, prisma, extractClientIp() (+11 more)

### Community 27 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (7): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), deleteContactRequest(), setContactRequestHandled()

### Community 28 - "AppError"
Cohesion: 0.24
Nodes (14): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), removeRateLimitEntry(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), AppError (+6 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.21
Nodes (15): berlinYear(), CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDurationDative(), formatPaidYears(), membershipDuration (+7 more)

### Community 30 - "feeService.ts"
Cohesion: 0.20
Nodes (18): clearFeeAmountOverride(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), resolveIsStudentDefault(), syncStudentYear(), updateFeeComment(), upsertFeeAmount() (+10 more)

### Community 31 - "mitglied-werden/page.tsx"
Cohesion: 0.17
Nodes (18): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), VerifyPanel() (+10 more)

### Community 32 - "blogImageUrl"
Cohesion: 0.26
Nodes (11): generateMetadata(), PublicBlogPost(), BlogIndexPage(), PostCard(), BlogGallery(), BlogImageMeta, blogImageSrcSet(), blogImageUrl() (+3 more)

### Community 33 - "blog/actions.ts"
Cohesion: 0.22
Nodes (19): beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), applyImageOrder() (+11 more)

### Community 34 - "ref_node_assert"
Cohesion: 0.13
Nodes (11): ref_node_assert, ref_node_test, evaluatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength, SCORE_LABELS (+3 more)

### Community 35 - "blogImages.ts"
Cohesion: 0.12
Nodes (14): BlogImageManager(), handleDrop(), uploadFiles(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageVariant, formatBytes(), MAX_ADDITIONAL_BLOG_IMAGES (+6 more)

### Community 36 - "events.ts"
Cohesion: 0.14
Nodes (25): UpcomingEventAlert(), HomePage(), EventDetailPage(), NextEventCard(), EventCard(), TIME_ZONE, CALENDAR_ICS_PATH, DAY_MONTH (+17 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography, ts-node (+10 more)

### Community 39 - "blogPostPath"
Cohesion: 0.26
Nodes (12): GET(), generateMetadata(), buildEventIcs(), icsFileName(), findPublishedEventById(), getPublicEvent(), blogPostPath(), GERMAN_LETTERS (+4 more)

### Community 40 - "security/page.tsx"
Cohesion: 0.16
Nodes (16): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+8 more)

### Community 41 - "lucide-react"
Cohesion: 0.11
Nodes (28): lucide-react, react, DeletePostButton(), ContactRequestItem, dateFormat, DeleteEventButton(), DeleteMemberSectionProps, DeleteMemberButton() (+20 more)

### Community 42 - "dashboard/page.tsx"
Cohesion: 0.17
Nodes (10): MetaLine(), EmailChangeDialog(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog(), LogoutButton(), formatDate() (+2 more)

### Community 43 - "iban.ts"
Cohesion: 0.32
Nodes (12): IbanInput(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban(), maskIban(), normalizeIban() (+4 more)

### Community 44 - "LegalPage.tsx"
Cohesion: 0.16
Nodes (12): DATENSCHUTZ, metadata, IMPRESSUM, metadata, SATZUNG, Block(), LegalPage(), LegalSections() (+4 more)

### Community 45 - "membershipService.ts"
Cohesion: 0.13
Nodes (24): dynamic, MembershipApplicationsPage(), metadata, FeeDefaultEntry, FeeRates, planApplicationFees(), FALLBACK_FEE_DEFAULT, deleteFeeDefault() (+16 more)

### Community 46 - "feature-flags/actions.ts"
Cohesion: 0.24
Nodes (8): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, isFeatureFlagKey(), setFeatureFlagEnabled()

### Community 47 - "securityEventService.ts"
Cohesion: 0.18
Nodes (17): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview() (+9 more)

### Community 48 - "format.ts"
Cohesion: 0.21
Nodes (11): AdminBlogPage(), DATE_TIME, EURO, formatDateShort(), formatDateTime(), LONG_DATE, NUMBER, SHORT_DATE (+3 more)

### Community 49 - "app/page.tsx"
Cohesion: 0.06
Nodes (32): Props, generateMetadata(), Props, metadata, PhysicsTimeline(), metadata, heroMetrics, pillars (+24 more)

### Community 50 - "mail/page.tsx"
Cohesion: 0.16
Nodes (14): MailAnnouncement, MailDashboard(), MailEventOption, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage() (+6 more)

### Community 51 - "opengraph-image.tsx"
Cohesion: 0.18
Nodes (9): ref_node_fs, ref_node_path, sharp, BACKGROUND, icon(), main(), alt, contentType (+1 more)

### Community 52 - "authz.ts"
Cohesion: 0.23
Nodes (11): GET(), POST(), GET(), GET(), assertCanEditUser(), getOptionalUser(), normalizeRole(), UserContext (+3 more)

### Community 53 - "FeesTable.tsx"
Cohesion: 0.09
Nodes (23): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, FeesSortKey, FeesTableProps, FeesTableUser, MailFormProps, MailUserOption (+15 more)

### Community 54 - "formatNumber"
Cohesion: 0.21
Nodes (11): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+3 more)

### Community 55 - "MailForm"
Cohesion: 0.16
Nodes (9): compareBy(), DashboardUsersTable(), displayName(), getStatusIcon(), byStatusThenName(), MailForm(), formatStatus(), formatStatusShort() (+1 more)

### Community 56 - "RateLimitTable"
Cohesion: 0.33
Nodes (5): getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo()

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "formatEuro"
Cohesion: 0.16
Nodes (9): AmountDialog(), compareBy(), displayName(), explainFee(), FeesTable(), selectAllWithOpenFees(), hasOpenFee(), UserPaymentHistoryDialog() (+1 more)

### Community 59 - "seed.ts"
Cohesion: 0.25
Nodes (5): adapter, prisma, dotenv, prisma, @prisma/adapter-pg

### Community 60 - "paymentHistoryPdf.tsx"
Cohesion: 0.33
Nodes (7): @react-pdf/renderer, GET(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee

### Community 61 - "app/layout.tsx"
Cohesion: 0.15
Nodes (11): src_app_globals, body, metadata, mono, auth, columns, Footer(), legalLinks (+3 more)

### Community 62 - "TypeSparklines.tsx"
Cohesion: 0.36
Nodes (7): sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 63 - "errors.ts"
Cohesion: 0.27
Nodes (7): zod, getRedirectTarget(), isRedirectError(), RedirectTarget, AppErrorCode, mapErrorToActionResult(), zodMessage()

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
Cohesion: 0.31
Nodes (10): adminCreatedUserMessage(), feeReminderMessage(), greeting(), LINK_EXPIRY(), membershipApprovedMessage(), membershipReceivedMessage(), membershipRejectedMessage(), passwordResetMessage() (+2 more)

### Community 72 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "auth.ts"
Cohesion: 0.20
Nodes (11): checkLoginFeatureEnabled(), createLoginChallenge(), resendVerificationEmail(), LoginForm(), CaptchaFailedError, EmailNotVerifiedError, handlers, LoginRateLimitedError (+3 more)

### Community 77 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 78 - "ApplicationList.tsx"
Cohesion: 0.19
Nodes (12): ApplicationItem, ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), dateFormat (+4 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 81 - "EditUserForm.tsx"
Cohesion: 0.16
Nodes (8): ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, ROLE_OPTIONS, STATUS_OPTIONS

### Community 82 - "mitglied-werden/actions.ts"
Cohesion: 0.31
Nodes (10): submitMembershipApplication(), membershipApplicationNoticeMessage(), renderEmailText(), getMailTransporter(), normalize(), Recipients, sendEmail(), getSmtpConfig() (+2 more)

### Community 85 - "zertifikat/pdf/route.ts"
Cohesion: 0.42
Nodes (9): GET(), DashboardPage(), ZahlungenPage(), certificateFacts, isCertifiableStatus(), loadLogoDataUrl(), getSignatureBoardMembers(), getFeeDashboardData() (+1 more)

### Community 86 - "EventForm.tsx"
Cohesion: 0.28
Nodes (6): toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), MarkdownEditor(), TextArea()

### Community 87 - "boardImages.ts"
Cohesion: 0.25
Nodes (6): ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, ProcessedBoardPhoto, QUALITY_LADDER

### Community 89 - "photo/route.ts"
Cohesion: 0.38
Nodes (6): POST(), processBoardPhoto(), memberExists(), upsertPhoto(), memberExists(), setMemberPhoto()

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **394 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+389 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 501 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `zahlungen/page.tsx`, `featureGate.ts`, `ApplicationWizard.tsx`, `vorstand/actions.ts`, `satzung/page.tsx`, `isFeatureEnabled`, `lib/siteUrl.ts`, `package.json`, `app/kontakt/actions.ts`, `requireAdmin`, `ics.ts`, `altcha.ts`, `index.ts`, `prisma.ts`, `dashboard/kontakt/actions.ts`, `AppError`, `mitglied-werden/page.tsx`, `blog/actions.ts`, `blogPostPath`, `security/page.tsx`, `lucide-react`, `dashboard/page.tsx`, `LegalPage.tsx`, `membershipService.ts`, `feature-flags/actions.ts`, `app/page.tsx`, `mail/page.tsx`, `opengraph-image.tsx`, `authz.ts`, `FeesTable.tsx`, `paymentHistoryPdf.tsx`, `app/layout.tsx`, `forgot-password/layout.tsx`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`, `auth.ts`, `EditUserForm.tsx`, `mitglied-werden/actions.ts`, `zertifikat/pdf/route.ts`, `EventForm.tsx`, `photo/route.ts`?**
  _High betweenness centrality (0.180) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `LoginForm.tsx`, `zahlungen/page.tsx`, `next`, `ApplicationWizard.tsx`, `satzung/page.tsx`, `MarketDiffusion.tsx`, `package.json`, `index.ts`, `OutcomeTimeline.tsx`, `mitglied-werden/page.tsx`, `blogImageUrl`, `security/page.tsx`, `dashboard/page.tsx`, `membershipService.ts`, `app/page.tsx`, `FeesTable.tsx`, `formatNumber`, `ApplicationList.tsx`, `EditUserForm.tsx`, `EventForm.tsx`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `LoginForm.tsx`, `blogImageUrl`, `zahlungen/page.tsx`, `next`, `ApplicationWizard.tsx`, `dashboard/page.tsx`, `iban.ts`, `LegalPage.tsx`, `MarketDiffusion.tsx`, `feature-flags/actions.ts`, `ApplicationList.tsx`, `package.json`, `EditUserForm.tsx`, `app/page.tsx`, `altcha.d.ts`, `FeesTable.tsx`, `EventForm.tsx`, `index.ts`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _394 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LoginForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08455625436757512 - nodes in this community are weakly interconnected._
- **Should `mailService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._