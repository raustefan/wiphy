# Graph Report - wiphy  (2026-10-25)

## Corpus Check
- 367 files · ~175,048 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2085 nodes · 6906 edges · 102 communities (88 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2a2dbd6f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- forgot-password/layout.tsx
- sepa.ts
- index.ts
- blocks.ts
- requireAdmin
- feeService.ts
- userService.ts
- serverStatus.ts
- LegalPage.tsx
- blogService.ts
- zertifikat/pdf/route.ts
- events.ts
- ics.ts
- MarketDiffusion.tsx
- formatNumber
- getOptionalUser
- package.json
- dependencies
- executeAction
- membershipFormSchemas.ts
- schemas.ts
- seed.ts
- format.ts
- app/layout.tsx
- MemberDirectory.tsx
- securityEventService.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- @hugeicons/core-free-icons
- authz.ts
- countries.ts
- blog/actions.ts
- convert_alumni.py
- prisma.ts
- KosmosTimeline.tsx
- mitgliedsantraege/page.tsx
- AppError
- compilerOptions
- devDependencies
- next
- feeCalculation.ts
- app/page.tsx
- mail/page.tsx
- MarkdownViewer.tsx
- ServerDashboard.tsx
- ApplicationWizard.tsx
- mailService.ts
- messages.ts
- iban.ts
- app/blog/[id]/page.tsx
- EmailBodyField.tsx
- ApplicationList
- cn
- security/page.tsx
- login/actions.ts
- EditUserForm
- app/kontakt/page.tsx
- ref_node_assert
- berlinTime.ts
- featureFlagService.ts
- Footer.tsx
- userUpdateData.ts
- RateLimitTable
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- sendEmail
- BulkImport.tsx
- MailForm.tsx
- app/blog/page.tsx
- CLAUDE.md
- satzung/page.tsx
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- mitglied-werden/page.tsx
- mitglied-werden/actions.ts
- EditUserForm.tsx
- altcha.d.ts
- DeleteMemberSection
- ActivityHeatmap.tsx
- postcss.config.mjs
- isFeatureEnabled
- opengraph-image.tsx
- membershipTermination.ts
- { GET, POST }
- contact.ts
- PhysicsTimeline.tsx
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- TypeSparklines.tsx
- RegistrationFunnel.tsx
- EventForm.tsx
- getEditableUser
- sessionPolicy.test.ts
- eslint.config.mjs
- ContactRequestList

## God Nodes (most connected - your core abstractions)
1. `next` - 126 edges
2. `cn()` - 89 edges
3. `AppError` - 86 edges
4. `@hugeicons/core-free-icons` - 84 edges
5. `@hugeicons/react` - 84 edges
6. `react` - 74 edges
7. `executeAction()` - 73 edges
8. `requireAdmin()` - 56 edges
9. `isFeatureEnabled()` - 50 edges
10. `Button()` - 46 edges

## Surprising Connections (you probably didn't know these)
- `Befunde vom 2026-10-20` --references--> `siteUrl()`  [INFERRED]
  BETRIEB.md → src/lib/server/siteUrl.ts
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `FeatureFlagToggle()` --indirect_call--> `setFeatureFlag()`  [INFERRED]
  src/app/dashboard/feature-flags/FeatureFlagToggle.tsx → src/app/dashboard/feature-flags/actions.ts

## Import Cycles
- None detected.

## Communities (102 total, 14 thin omitted)

### Community 1 - "sepa.ts"
Cohesion: 0.23
Nodes (16): field(), POST(), TIME_ZONE, agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+8 more)

### Community 2 - "index.ts"
Cohesion: 0.08
Nodes (41): InfoTooltip(), RateLimitTableProps, AmountDialog(), chipTones, CommentDialog(), DirectoryAccount, displayName(), explainFee() (+33 more)

### Community 3 - "blocks.ts"
Cohesion: 0.21
Nodes (19): blockHtml(), blockText(), derivePreheader(), EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml(), renderBlocksText() (+11 more)

### Community 4 - "requireAdmin"
Cohesion: 0.05
Nodes (77): POST(), createDraft(), deletePost(), savePost(), ContactRequestsPage(), createEventDraft(), deleteFeeDefaultYear(), initializeBillingYear() (+69 more)

### Community 5 - "feeService.ts"
Cohesion: 0.16
Nodes (20): UserManagementPage(), SepaDebtorAddress, clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), pruneArchivedFees() (+12 more)

### Community 6 - "userService.ts"
Cohesion: 0.11
Nodes (35): EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), KontoPage(), revealKosmosEmailAction(), setKosmosVisibilityAction(), deleteUserAction(), updateUser() (+27 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.09
Nodes (35): ref_node_os, GET(), GET(), ServerPage(), auth, BackupRun, BackupStatus, cpuPercent() (+27 more)

### Community 8 - "LegalPage.tsx"
Cohesion: 0.14
Nodes (16): DATENSCHUTZ, DATENSCHUTZ_VERSION, metadata, impressum(), ImpressumPage(), metadata, SATZUNG, anchorOf() (+8 more)

### Community 9 - "blogService.ts"
Cohesion: 0.08
Nodes (40): POST(), BlogIndexPage(), AdminBlogPage(), MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, processBlogImage(), ProcessedBlogImage, QUALITY_LADDER (+32 more)

### Community 10 - "zertifikat/pdf/route.ts"
Cohesion: 0.17
Nodes (22): @react-pdf/renderer, GET(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative() (+14 more)

### Community 11 - "events.ts"
Cohesion: 0.13
Nodes (35): DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard(), EventCardData (+27 more)

### Community 12 - "ics.ts"
Cohesion: 0.15
Nodes (22): RFC-5545, GET(), GET(), icsEnd(), icsAttachment(), addDays(), berlinDateStamp(), buildCalendarIcs() (+14 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (33): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+25 more)

### Community 14 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 15 - "getOptionalUser"
Cohesion: 0.19
Nodes (13): GET(), GET(), GET(), confirmPrivacyPolicy(), ConfirmPrivacyPolicyPage(), metadata, Props, MitgliedWerdenPage() (+5 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "executeAction"
Cohesion: 0.14
Nodes (21): zod, markContactRequestHandled(), removeContactRequest(), removeRateLimitEntry(), requestBackupLink(), triggerDeploy(), deleteEventAction(), revalidateEvent() (+13 more)

### Community 19 - "membershipFormSchemas.ts"
Cohesion: 0.11
Nodes (23): hasControlChars(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, MINOR_HINT, STUDENT_YEAR_LOOKAHEAD (+15 more)

### Community 20 - "schemas.ts"
Cohesion: 0.05
Nodes (39): toCountryCode(), isCalendarDate(), absent(), addPersonIssues(), AdminCreateUserInput, adminCreateUserSchema, asDate(), berlinDateTime() (+31 more)

### Community 21 - "seed.ts"
Cohesion: 0.40
Nodes (3): adapter, prisma, @prisma/adapter-pg

### Community 22 - "format.ts"
Cohesion: 0.10
Nodes (24): statusMeta(), TerminationItem, TerminationList(), confirm(), BackupHistory(), metadata, AccountSection(), ActionResult (+16 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.12
Nodes (14): escapeXml(), GET(), DashboardLayout(), metadata, src_app_globals, body, metadata, mono (+6 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.10
Nodes (25): compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase (+17 more)

### Community 25 - "securityEventService.ts"
Cohesion: 0.15
Nodes (18): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap() (+10 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "@hugeicons/core-free-icons"
Cohesion: 0.13
Nodes (23): @hugeicons/core-free-icons, @hugeicons/react, react, ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat (+15 more)

### Community 29 - "authz.ts"
Cohesion: 0.12
Nodes (26): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage(), commit, DebugBar() (+18 more)

### Community 30 - "countries.ts"
Cohesion: 0.15
Nodes (17): SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS, countryName(), DEFAULT_COUNTRY (+9 more)

### Community 31 - "blog/actions.ts"
Cohesion: 0.17
Nodes (22): beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager(), handleDrop() (+14 more)

### Community 32 - "convert_alumni.py"
Cohesion: 0.26
Nodes (12): datetime, json, re, admin_note(), convert(), day(), main(), phone() (+4 more)

### Community 33 - "prisma.ts"
Cohesion: 0.20
Nodes (15): server-only, GET(), message(), createPrismaClient(), globalForPrisma, consumeAltchaSolution(), readExpiry(), readSignature() (+7 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (21): KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen(), years() (+13 more)

### Community 35 - "mitgliedsantraege/page.tsx"
Cohesion: 0.20
Nodes (16): dynamic, MembershipApplicationsPage(), metadata, planApplicationFees(), isTerminationDue(), countOpenApplications(), deleteApplication(), findApplications() (+8 more)

### Community 36 - "AppError"
Cohesion: 0.19
Nodes (20): confirmMembershipTermination(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination() (+12 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "next"
Cohesion: 0.11
Nodes (27): nextConfig, next, DeletePostButton(), metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+19 more)

### Community 40 - "feeCalculation.ts"
Cohesion: 0.20
Nodes (17): BankDetailsForm(), submit(), ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit(), annualFee() (+9 more)

### Community 41 - "app/page.tsx"
Cohesion: 0.21
Nodes (12): HomePage(), levels, STRIP_IDS, STUDY_PROGRAMS, tone(), sitemap(), findPublishedPosts(), getPublishedPosts() (+4 more)

### Community 42 - "mail/page.tsx"
Cohesion: 0.17
Nodes (12): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, SentMailInput (+4 more)

### Community 43 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 44 - "ServerDashboard.tsx"
Cohesion: 0.06
Nodes (47): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, EmailChangeForm(), PasswordChangeButton(), dynamic, metadata, BackupSection() (+39 more)

### Community 45 - "ApplicationWizard.tsx"
Cohesion: 0.11
Nodes (19): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, FeeDefaultEntry, FeeRates, ageAt() (+11 more)

### Community 46 - "mailService.ts"
Cohesion: 0.13
Nodes (21): sanitize-html, parseMailForm(), sendEmailAction(), EmailBlock, ENTITIES, htmlToText(), composeMessage(), greeting() (+13 more)

### Community 47 - "messages.ts"
Cohesion: 0.12
Nodes (28): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), EmailMessage, accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage() (+20 more)

### Community 48 - "iban.ts"
Cohesion: 0.22
Nodes (21): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+13 more)

### Community 49 - "app/blog/[id]/page.tsx"
Cohesion: 0.25
Nodes (14): generateMetadata(), Props, PublicBlogPost(), BlogPostingJsonLd(), EventJsonLd(), OrganizationJsonLd(), getPublishedPost, absoluteUrl() (+6 more)

### Community 50 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 51 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 52 - "cn"
Cohesion: 0.07
Nodes (25): CtaCard(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog(), SectionHeader(), StatTile(), LogoutButton() (+17 more)

### Community 53 - "security/page.tsx"
Cohesion: 0.17
Nodes (17): dynamic, metadata, SecurityPage(), ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel() (+9 more)

### Community 54 - "login/actions.ts"
Cohesion: 0.33
Nodes (9): ref_crypto, resendVerificationEmail(), registerUser(), registrationConfirmationMessage(), BACKUP_LINK_MINUTES, createBackupLink(), siteUrl(), hashToken() (+1 more)

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "app/kontakt/page.tsx"
Cohesion: 0.18
Nodes (12): dynamic, KontaktPage(), metadata, createLoginChallenge(), LoginForm(), dynamic, LoginPage(), metadata (+4 more)

### Community 57 - "ref_node_assert"
Cohesion: 0.14
Nodes (9): ref_node_assert, ref_node_net, ref_node_test, addressKey(), HeaderBag, one, two, base (+1 more)

### Community 58 - "berlinTime.ts"
Cohesion: 0.32
Nodes (13): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+5 more)

### Community 59 - "featureFlagService.ts"
Cohesion: 0.28
Nodes (10): @prisma/client, setFeatureFlag(), FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, isFeatureFlagKey(), PAGE_FLAGS (+2 more)

### Community 60 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 63 - "Site.tsx"
Cohesion: 0.12
Nodes (15): facts, metadata, metadata, dynamic, metadata, SearchParams, TerminePage(), ViewSwitch() (+7 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "sendEmail"
Cohesion: 0.29
Nodes (10): bcryptjs, resetPassword(), resetSchema, passwordChangedNoticeMessage(), getMailTransporter(), normalize(), Recipients, sendEmail() (+2 more)

### Community 67 - "BulkImport.tsx"
Cohesion: 0.06
Nodes (39): byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, bulkCreateUsersAction(), ImportIssue, ImportRowResult (+31 more)

### Community 68 - "MailForm.tsx"
Cohesion: 0.14
Nodes (11): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, EmailBodyField(), useEmailEditor() (+3 more)

### Community 69 - "app/blog/page.tsx"
Cohesion: 0.12
Nodes (20): generateMetadata(), LeadPost(), MetaLine(), PostRow(), Props, BlogGallery(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE (+12 more)

### Community 71 - "satzung/page.tsx"
Cohesion: 0.23
Nodes (13): dynamic, metadata, SatzungPage(), resolveFeeDefault(), deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeDefaults() (+5 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.10
Nodes (33): EditBlogPage(), EditEventPage(), AdminEventsPage(), formatEventShort(), UPCOMING_ALERT_MONTHS, AnnouncedEvent, createEvent(), deleteEventById() (+25 more)

### Community 77 - "mitglied-werden/page.tsx"
Cohesion: 0.16
Nodes (17): JourneyRail(), ApplicationStage(), dynamic, metadata, Props, toDateInput(), deriveStudentYears(), selectableStudentYears() (+9 more)

### Community 78 - "mitglied-werden/actions.ts"
Cohesion: 0.14
Nodes (24): submitContactRequest(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), contactRequestMessage(), membershipApplicationNoticeMessage(), membershipReceivedMessage() (+16 more)

### Community 79 - "EditUserForm.tsx"
Cohesion: 0.15
Nodes (10): ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, TextArea(), MANDATE_ID_PATTERN (+2 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 82 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 85 - "isFeatureEnabled"
Cohesion: 0.14
Nodes (26): requestPasswordReset(), notifyAdminsAboutRegistration(), verifyEmail(), AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers (+18 more)

### Community 86 - "opengraph-image.tsx"
Cohesion: 0.14
Nodes (11): dotenv, ref_node_fs, ref_node_path, prisma, sharp, BACKGROUND, icon(), main() (+3 more)

### Community 87 - "membershipTermination.ts"
Cohesion: 0.27
Nodes (7): EditUserPage(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate(), getOpenTermination()

### Community 89 - "contact.ts"
Cohesion: 0.25
Nodes (6): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ContactInput, SPAM_KEYWORDS, legitimate

### Community 91 - "PhysicsTimeline.tsx"
Cohesion: 0.27
Nodes (6): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline()

### Community 95 - "TypeSparklines.tsx"
Cohesion: 0.36
Nodes (7): sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 96 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 97 - "EventForm.tsx"
Cohesion: 0.32
Nodes (5): toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), MarkdownEditor()

### Community 98 - "getEditableUser"
Cohesion: 0.48
Nodes (6): GET(), DashboardPage(), ZahlungenPage(), getFeeDashboardData(), countOpenTerminations(), getEditableUser()

### Community 100 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 101 - "ContactRequestList"
Cohesion: 1.00
Nodes (3): ContactRequestList(), confirmDelete(), run()

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **468 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+463 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 601 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `forgot-password/layout.tsx`, `sepa.ts`, `index.ts`, `requireAdmin`, `userService.ts`, `serverStatus.ts`, `LegalPage.tsx`, `blogService.ts`, `zertifikat/pdf/route.ts`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `getOptionalUser`, `package.json`, `executeAction`, `format.ts`, `app/layout.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `@hugeicons/core-free-icons`, `authz.ts`, `blog/actions.ts`, `prisma.ts`, `KosmosTimeline.tsx`, `mitgliedsantraege/page.tsx`, `AppError`, `app/page.tsx`, `mail/page.tsx`, `ServerDashboard.tsx`, `ApplicationWizard.tsx`, `messages.ts`, `app/blog/[id]/page.tsx`, `cn`, `security/page.tsx`, `login/actions.ts`, `app/kontakt/page.tsx`, `featureFlagService.ts`, `Footer.tsx`, `Site.tsx`, `sendEmail`, `MailForm.tsx`, `app/blog/page.tsx`, `satzung/page.tsx`, `mitglied-werden/page.tsx`, `mitglied-werden/actions.ts`, `EditUserForm.tsx`, `isFeatureEnabled`, `opengraph-image.tsx`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`, `EventForm.tsx`, `getEditableUser`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/core-free-icons` to `index.ts`, `LegalPage.tsx`, `blogService.ts`, `MarketDiffusion.tsx`, `package.json`, `format.ts`, `app/layout.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `authz.ts`, `KosmosTimeline.tsx`, `next`, `ServerDashboard.tsx`, `ApplicationWizard.tsx`, `iban.ts`, `cn`, `featureFlagService.ts`, `Footer.tsx`, `Site.tsx`, `BulkImport.tsx`, `MailForm.tsx`, `app/blog/page.tsx`, `eventService.ts`, `EditUserForm.tsx`, `altcha.d.ts`, `PhysicsTimeline.tsx`, `EventForm.tsx`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Why does `AppError` connect `AppError` to `prisma.ts`, `sendEmail`, `mitgliedsantraege/page.tsx`, `requireAdmin`, `userService.ts`, `next`, `serverStatus.ts`, `blogService.ts`, `eventService.ts`, `mitglied-werden/actions.ts`, `messages.ts`, `mailService.ts`, `executeAction`, `isFeatureEnabled`, `login/actions.ts`, `featureFlagService.ts`, `blog/actions.ts`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _468 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08458646616541353 - nodes in this community are weakly interconnected._
- **Should `requireAdmin` be split into smaller, more focused modules?**
  _Cohesion score 0.05225718194254446 - nodes in this community are weakly interconnected._