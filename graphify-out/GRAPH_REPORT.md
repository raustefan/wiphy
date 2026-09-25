# Graph Report - wiphy  (2026-09-25)

## Corpus Check
- 323 files · ~135,165 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .toml 1, .prisma 1)

## Summary
- 1730 nodes · 5598 edges · 96 communities (84 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `70113b64`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LoginForm.tsx
- mailService.ts
- membershipFormSchemas.ts
- next
- feeDefaults.ts
- boardService.ts
- sendEmail
- serverStatus.ts
- ApplicationWizard.tsx
- blogService.ts
- securityEventService.ts
- feeCalculation.ts
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
- auth.ts
- index.ts
- security/page.tsx
- OutcomeTimeline.tsx
- prisma.ts
- formatEuro
- events.ts
- membershipCertificate.ts
- dashboard/page.tsx
- mitglied-werden/page.tsx
- feeService.ts
- format.ts
- passwordStrength.ts
- app/blog/[id]/page.tsx
- berlinTime.ts
- compilerOptions
- devDependencies
- EmailBodyField.tsx
- app/termine/page.tsx
- lucide-react
- app/layout.tsx
- userUpdateData.ts
- metadata.ts
- mitgliedsantraege/actions.ts
- userService.ts
- rateLimitService.ts
- EditUserForm.tsx
- mail/page.tsx
- iban.ts
- ActivityHeatmap.tsx
- login/layout.tsx
- DashboardUsersTable.tsx
- AppError
- isFeatureEnabled
- app/page.tsx
- EditUserForm
- featureFlagService.ts
- seed.ts
- MarkdownViewer.tsx
- MailForm.tsx
- verify-email/layout.tsx
- forgot-password/layout.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- paymentHistoryPdf.tsx
- reset-password/layout.tsx
- membershipTermination.ts
- formatDate
- CLAUDE.md
- feature-flags/actions.ts
- zertifikat/pdf/route.ts
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- dashboard/kontakt/actions.ts
- ref_node_assert
- eslint.config.mjs
- ApplicationList.tsx
- DeleteMemberSection
- altcha.d.ts
- EmailComposerDialog
- authz.ts
- postcss.config.mjs
- mitgliedsantraege/page.tsx
- Button.tsx
- vorstand/actions.ts
- { GET, POST }
- ServerDashboard.tsx
- RegistrationFunnel.tsx
- membershipFees.test.ts
- ApplicationWizard
- redirectError.ts
- FeatureFlagsPage

## God Nodes (most connected - your core abstractions)
1. `next` - 107 edges
2. `AppError` - 84 edges
3. `cn()` - 77 edges
4. `lucide-react` - 74 edges
5. `requireAdmin()` - 66 edges
6. `executeAction()` - 60 edges
7. `react` - 59 edges
8. `Card()` - 47 edges
9. `Button()` - 43 edges
10. `isFeatureEnabled()` - 42 edges

## Surprising Connections (you probably didn't know these)
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `FeatureFlagToggle()` --indirect_call--> `setFeatureFlag()`  [INFERRED]
  src/app/dashboard/feature-flags/FeatureFlagToggle.tsx → src/app/dashboard/feature-flags/actions.ts
- `FeeDefaultsCard()` --indirect_call--> `deleteFeeDefaultYear()`  [INFERRED]
  src/app/dashboard/fees/FeeDefaultsCard.tsx → src/app/dashboard/fees/actions.ts
- `save()` --indirect_call--> `saveFeeDefault()`  [INFERRED]
  src/app/dashboard/fees/FeeDefaultsCard.tsx → src/app/dashboard/fees/actions.ts
- `MailForm()` --indirect_call--> `sendEmailAction()`  [INFERRED]
  src/app/dashboard/mail/MailForm.tsx → src/app/dashboard/mail/actions.ts

## Import Cycles
- None detected.

## Communities (96 total, 12 thin omitted)

### Community 0 - "LoginForm.tsx"
Cohesion: 0.08
Nodes (31): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, ForgotPasswordPage(), ContactForm(), FaqItem, LoginFaq(), SECTIONS (+23 more)

### Community 1 - "mailService.ts"
Cohesion: 0.08
Nodes (46): sanitize-html, parseMailForm(), sendEmailAction(), blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature (+38 more)

### Community 2 - "membershipFormSchemas.ts"
Cohesion: 0.12
Nodes (16): applicationBankSchema, applicationPaymentSchema, applicationPersonSchema, applicationStudySchema, bankFieldsOptional, checkedBox, optional(), optionalDate (+8 more)

### Community 3 - "next"
Cohesion: 0.09
Nodes (35): nextConfig, next, DeletePostButton(), metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+27 more)

### Community 4 - "feeDefaults.ts"
Cohesion: 0.17
Nodes (17): MembershipApplicationsPage(), FeeDefaultEntry, FeeRates, planApplicationFees(), resolveFeeDefault(), FALLBACK_FEE_DEFAULT, deleteFeeDefault(), findFeeDefaults() (+9 more)

### Community 5 - "boardService.ts"
Cohesion: 0.09
Nodes (37): EditBoardMemberPage(), AdminBoardPage(), getInitials(), VorstandPage(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, boardPhotoUrl(), MAX_BOARD_PHOTO_UPLOAD_BYTES (+29 more)

### Community 6 - "sendEmail"
Cohesion: 0.43
Nodes (7): EmailMessage, getMailTransporter(), normalize(), Recipients, sendEmail(), getSmtpConfig(), getSignatureBoardLine()

### Community 7 - "serverStatus.ts"
Cohesion: 0.11
Nodes (24): ref_node_child_process, ref_node_fs, ref_node_os, BACKGROUND, icon(), main(), GET(), cpuPercent() (+16 more)

### Community 8 - "ApplicationWizard.tsx"
Cohesion: 0.11
Nodes (17): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, SummaryBlock(), CONSENT_VERSION, DATENSCHUTZ_URL (+9 more)

### Community 9 - "blogService.ts"
Cohesion: 0.05
Nodes (71): sharp, POST(), beginImageAction(), deleteBlogImage(), moveBlogImage(), parseOrThrow(), revalidateBlogImages(), saveBlogImageAlt() (+63 more)

### Community 10 - "securityEventService.ts"
Cohesion: 0.15
Nodes (19): SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), emptyCounts() (+11 more)

### Community 11 - "feeCalculation.ts"
Cohesion: 0.21
Nodes (16): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), SatzungPage(), annualFee() (+8 more)

### Community 12 - "eventService.ts"
Cohesion: 0.14
Nodes (26): AdminEventsPage(), createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findLatestPastEvent(), findNextUpcomingEvent(), findPastEvents() (+18 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.11
Nodes (28): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), fmt(), gauss() (+20 more)

### Community 14 - "ics.ts"
Cohesion: 0.15
Nodes (20): RFC-5545, GET(), GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs() (+12 more)

### Community 15 - "lib/siteUrl.ts"
Cohesion: 0.15
Nodes (10): escapeXml(), GET(), metadata, alt, contentType, size, SITE_DESCRIPTION, SITE_NAME (+2 more)

### Community 16 - "package.json"
Cohesion: 0.07
Nodes (29): name, prisma, seed, private, version, altcha, altcha-lib, babel-plugin-react-compiler (+21 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, lucide-react, next, next-auth (+19 more)

### Community 18 - "app/kontakt/actions.ts"
Cohesion: 0.23
Nodes (13): ContactRequestsPage(), submitContactRequest(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), ContactInput, hashIp() (+5 more)

### Community 19 - "app/blog/page.tsx"
Cohesion: 0.29
Nodes (8): BlogIndexPage(), PostCard(), Props, BlogGallery(), blogImageSrcSet(), blogImageUrl(), readingTimeMinutes(), BlogPostWithImages

### Community 20 - "schemas.ts"
Cohesion: 0.09
Nodes (17): adminCreateUserSchema, BankUpdateParsed, berlinDateTime(), contactSchema, emailField, feeAmountUpdateSchema, feeCommentSchema, feeStatusUpdateSchema (+9 more)

### Community 21 - "requireAdmin"
Cohesion: 0.16
Nodes (31): createDraft(), deletePost(), savePost(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault(), toggleFee() (+23 more)

### Community 22 - "auth.ts"
Cohesion: 0.12
Nodes (18): ref_node_net, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginRateLimitedError, signIn (+10 more)

### Community 23 - "index.ts"
Cohesion: 0.06
Nodes (41): CtaCard(), metadata, categories, categoryIcon(), categoryLabel(), events, PhysicsTimeline(), TimelineCategory (+33 more)

### Community 24 - "security/page.tsx"
Cohesion: 0.26
Nodes (10): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+2 more)

### Community 25 - "OutcomeTimeline.tsx"
Cohesion: 0.14
Nodes (20): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+12 more)

### Community 26 - "prisma.ts"
Cohesion: 0.13
Nodes (21): dynamic, KontaktPage(), metadata, dynamic, internalPath(), LoginPage(), metadata, NOTICES (+13 more)

### Community 27 - "formatEuro"
Cohesion: 0.16
Nodes (9): AmountDialog(), compareBy(), displayName(), explainFee(), FeesTable(), selectAllWithOpenFees(), hasOpenFee(), UserPaymentHistoryDialog() (+1 more)

### Community 28 - "events.ts"
Cohesion: 0.11
Nodes (34): DashboardEvent, UpcomingEventAlert(), HomePage(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard() (+26 more)

### Community 29 - "membershipCertificate.ts"
Cohesion: 0.19
Nodes (18): MembershipCertificateCard(), berlinYear(), CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDuration(), formatMembershipDurationDative() (+10 more)

### Community 30 - "dashboard/page.tsx"
Cohesion: 0.21
Nodes (7): EmailChangeDialog(), MailSuccessDialog(), ADMIN_ACTIONS, QueryParamDialog(), LogoutButton(), src_lib_server_services_membershipservice_getopenapplication, countOpenTerminations()

### Community 31 - "mitglied-werden/page.tsx"
Cohesion: 0.19
Nodes (17): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+9 more)

### Community 32 - "feeService.ts"
Cohesion: 0.15
Nodes (24): FeesDashboardPage(), FeeBreakdown, feeRetentionCutoffYear(), clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees() (+16 more)

### Community 33 - "format.ts"
Cohesion: 0.13
Nodes (17): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+9 more)

### Community 34 - "passwordStrength.ts"
Cohesion: 0.28
Nodes (7): evaluatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength, SCORE_LABELS, WEAK_PATTERNS

### Community 35 - "app/blog/[id]/page.tsx"
Cohesion: 0.27
Nodes (13): generateMetadata(), Props, PublicBlogPost(), BlogPostingJsonLd(), OrganizationJsonLd(), getPublishedPost(), absoluteUrl(), blogPostPath() (+5 more)

### Community 36 - "berlinTime.ts"
Cohesion: 0.32
Nodes (13): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+5 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.11
Nodes (18): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @tailwindcss/typography, ts-node (+10 more)

### Community 39 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 40 - "app/termine/page.tsx"
Cohesion: 0.21
Nodes (12): sitemap(), dynamic, metadata, NextEventCard(), SearchParams, TerminePage(), ViewSwitch(), CALENDAR_ICS_PATH (+4 more)

### Community 41 - "lucide-react"
Cohesion: 0.11
Nodes (26): lucide-react, react, FeesSortKey, FeesTableProps, FeesTableUser, ContactRequestItem, dateFormat, TerminationItem (+18 more)

### Community 42 - "app/layout.tsx"
Cohesion: 0.18
Nodes (8): src_app_globals, body, metadata, mono, columns, Footer(), legalLinks, InstallHint()

### Community 43 - "userUpdateData.ts"
Cohesion: 0.31
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 44 - "metadata.ts"
Cohesion: 0.13
Nodes (12): generateMetadata(), DATENSCHUTZ, metadata, IMPRESSUM, metadata, SATZUNG, LegalBlock, LegalDocument (+4 more)

### Community 45 - "mitgliedsantraege/actions.ts"
Cohesion: 0.11
Nodes (35): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), submitMembershipApplication(), accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage(), feeReminderMessage() (+27 more)

### Community 46 - "userService.ts"
Cohesion: 0.25
Nodes (13): archiveFeesOfUser(), createUser(), deleteUserById(), findUserById(), findUserByMitgliedIdExcludingUser(), findUsersForDashboard(), updateUserById(), adminCreateUser() (+5 more)

### Community 47 - "rateLimitService.ts"
Cohesion: 0.17
Nodes (12): removeRateLimitEntry(), getRateLimitDescription(), RATE_LIMIT_DESCRIPTIONS, RateLimitTable(), confirmDelete(), showInfo(), bucketFromKey(), deleteRateLimitEntry() (+4 more)

### Community 48 - "EditUserForm.tsx"
Cohesion: 0.08
Nodes (22): toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP (+14 more)

### Community 49 - "mail/page.tsx"
Cohesion: 0.16
Nodes (13): EditBlogPage(), MailDashboard(), MailEventOption, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage() (+5 more)

### Community 50 - "iban.ts"
Cohesion: 0.36
Nodes (11): IbanInput(), handleChange(), formatIban(), IBAN_LENGTHS, isValidBic(), isValidIban(), maskIban(), normalizeIban() (+3 more)

### Community 51 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 53 - "DashboardUsersTable.tsx"
Cohesion: 0.14
Nodes (12): compareBy(), DashboardTableUser, DashboardUsersTable(), displayName(), getStatusIcon(), SortKey, STATUS_RANK, byStatusThenName() (+4 more)

### Community 54 - "AppError"
Cohesion: 0.17
Nodes (21): zod, confirmMembershipTermination(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema (+13 more)

### Community 55 - "isFeatureEnabled"
Cohesion: 0.16
Nodes (30): bcryptjs, ref_crypto, POST(), POST(), notifyAdminsAboutRegistration(), POST(), checkLoginFeatureEnabled(), createLoginChallenge() (+22 more)

### Community 56 - "app/page.tsx"
Cohesion: 0.17
Nodes (10): BankValues, heroMetrics, pillars, EventCardData, EventDateCube(), MarketDiffusion, PaymentOption(), PhysicsHero (+2 more)

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "featureFlagService.ts"
Cohesion: 0.29
Nodes (9): @prisma/client, POST(), FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, processBoardPhoto(), memberExists(), setMemberPhoto() (+1 more)

### Community 59 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 60 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 61 - "MailForm.tsx"
Cohesion: 0.22
Nodes (7): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, EmailBodyField()

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.08
Nodes (24): Admin-Dashboard, Authentifizierung & Konten, Automatische Updates bei jedem Git Push (GitHub Actions), Datenbankmodell, Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, Feature Flags (+16 more)

### Community 66 - "paymentHistoryPdf.tsx"
Cohesion: 0.33
Nodes (7): @react-pdf/renderer, GET(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee

### Community 68 - "membershipTermination.ts"
Cohesion: 0.27
Nodes (7): EditUserPage(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate(), getOpenTermination()

### Community 69 - "formatDate"
Cohesion: 0.22
Nodes (8): MetaLine(), statusMeta(), TerminationList(), confirm(), AccountSection(), formatDate(), formatDateTime(), toDate()

### Community 71 - "feature-flags/actions.ts"
Cohesion: 0.83
Nodes (3): setFeatureFlag(), isFeatureFlagKey(), setFeatureFlagEnabled()

### Community 72 - "zertifikat/pdf/route.ts"
Cohesion: 0.44
Nodes (7): GET(), DashboardPage(), certificateFacts, isCertifiableStatus(), loadLogoDataUrl(), getSignatureBoardMembers(), getEditableUser()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 75 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (7): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), deleteContactRequest(), setContactRequestHandled()

### Community 76 - "ref_node_assert"
Cohesion: 0.17
Nodes (9): ref_node_assert, ref_node_test, AdminBlogPage(), formatDateShort(), ADMIN_SESSION_MAX_MS, adminSessionExpired(), SUMMER, WINTER (+1 more)

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
Cohesion: 0.15
Nodes (18): GET(), GET(), GET(), deleteUserAction(), updateUser(), NewUserPage(), withdrawMembershipApplication(), WithdrawApplicationButton() (+10 more)

### Community 85 - "mitgliedsantraege/page.tsx"
Cohesion: 0.32
Nodes (4): dynamic, metadata, SectionHeader(), src_lib_server_services_membershipservice_getapplications

### Community 86 - "Button.tsx"
Cohesion: 0.16
Nodes (12): HeaderChrome(), links, ButtonColor, ButtonLinkProps, ButtonProps, ButtonSize, ButtonVariant, colorClasses (+4 more)

### Community 87 - "vorstand/actions.ts"
Cohesion: 0.22
Nodes (13): createDraft(), deletePhotoAction(), moveMemberInList(), parseOrThrow(), revalidateBoard(), BoardPhotoUploader(), handleDelete(), handleDrop() (+5 more)

### Community 89 - "ServerDashboard.tsx"
Cohesion: 0.36
Nodes (6): DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel()

### Community 91 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 92 - "membershipFees.test.ts"
Cohesion: 0.40
Nodes (4): ageAt(), isOldEnough(), birthDateField, defaults

### Community 93 - "ApplicationWizard"
Cohesion: 0.70
Nodes (5): ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit()

### Community 94 - "redirectError.ts"
Cohesion: 0.67
Nodes (3): getRedirectTarget(), isRedirectError(), RedirectTarget

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **417 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+412 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 533 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `LoginForm.tsx`, `mailService.ts`, `serverStatus.ts`, `ApplicationWizard.tsx`, `blogService.ts`, `ics.ts`, `lib/siteUrl.ts`, `package.json`, `app/kontakt/actions.ts`, `app/blog/page.tsx`, `requireAdmin`, `auth.ts`, `index.ts`, `security/page.tsx`, `prisma.ts`, `events.ts`, `dashboard/page.tsx`, `mitglied-werden/page.tsx`, `app/blog/[id]/page.tsx`, `app/termine/page.tsx`, `lucide-react`, `app/layout.tsx`, `metadata.ts`, `mitgliedsantraege/actions.ts`, `rateLimitService.ts`, `EditUserForm.tsx`, `mail/page.tsx`, `login/layout.tsx`, `AppError`, `isFeatureEnabled`, `app/page.tsx`, `featureFlagService.ts`, `MailForm.tsx`, `verify-email/layout.tsx`, `forgot-password/layout.tsx`, `paymentHistoryPdf.tsx`, `reset-password/layout.tsx`, `feature-flags/actions.ts`, `zertifikat/pdf/route.ts`, `dashboard/kontakt/actions.ts`, `authz.ts`, `mitgliedsantraege/page.tsx`, `Button.tsx`, `vorstand/actions.ts`?**
  _High betweenness centrality (0.218) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `LoginForm.tsx`, `next`, `ApplicationWizard.tsx`, `MarketDiffusion.tsx`, `package.json`, `app/blog/page.tsx`, `index.ts`, `security/page.tsx`, `OutcomeTimeline.tsx`, `events.ts`, `dashboard/page.tsx`, `mitglied-werden/page.tsx`, `format.ts`, `app/blog/[id]/page.tsx`, `app/termine/page.tsx`, `EditUserForm.tsx`, `DashboardUsersTable.tsx`, `app/page.tsx`, `MailForm.tsx`, `ApplicationList.tsx`, `mitgliedsantraege/page.tsx`, `Button.tsx`, `ServerDashboard.tsx`, `RegistrationFunnel.tsx`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `react` connect `lucide-react` to `LoginForm.tsx`, `next`, `ApplicationWizard.tsx`, `MarketDiffusion.tsx`, `ApplicationList.tsx`, `package.json`, `EditUserForm.tsx`, `iban.ts`, `app/blog/page.tsx`, `altcha.d.ts`, `DashboardUsersTable.tsx`, `Button.tsx`, `index.ts`, `app/page.tsx`, `ServerDashboard.tsx`, `MailForm.tsx`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _417 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LoginForm.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08392156862745098 - nodes in this community are weakly interconnected._
- **Should `mailService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07532467532467532 - nodes in this community are weakly interconnected._