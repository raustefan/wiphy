# Graph Report - wiphy  (2026-10-25)

## Corpus Check
- 370 files · ~176,150 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2096 nodes · 6943 edges · 95 communities (80 shown, 15 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8d92df38`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- forgot-password/layout.tsx
- blogImageProcessing.ts
- index.ts
- blocks.ts
- requireAdmin
- formatDate
- userService.ts
- serverStatus.ts
- bestaetigen/page.tsx
- blogService.ts
- dashboard/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- formatNumber
- images/[id]/route.ts
- package.json
- dependencies
- AppError
- ServerDashboard.tsx
- schemas.ts
- seed.ts
- format.ts
- app/layout.tsx
- DirectoryTable
- securityEventService.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- @hugeicons/core-free-icons
- DebugBar.tsx
- countries.ts
- blog/actions.ts
- convert_alumni.py
- movePostImage
- KosmosTimeline.tsx
- serverStatus.test.ts
- accountActions.ts
- compilerOptions
- devDependencies
- next
- zahlungen/page.tsx
- mailHistory.ts
- mail/page.tsx
- server/route.ts
- Callout
- ApplicationWizard.tsx
- mailService.ts
- messages.ts
- feeService.ts
- app/page.tsx
- EmailBodyField.tsx
- ApplicationList
- Button.tsx
- security/page.tsx
- rateLimitService.ts
- EditUserForm
- ref_node_assert
- berlinTime.ts
- authz.ts
- Footer.tsx
- userUpdateData.ts
- RateLimitTable
- app/blog/page.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- registerAction.ts
- BulkImport.tsx
- MailForm.tsx
- blogImages.ts
- CLAUDE.md
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- mitglied-werden/page.tsx
- mail/actions.ts
- EditUserForm.tsx
- altcha.d.ts
- DeleteMemberSection
- ActivityHeatmap.tsx
- postcss.config.mjs
- prisma.ts
- opengraph-image.tsx
- { GET, POST }
- contact.ts
- PhysicsTimeline.tsx
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- RegistrationFunnel.tsx
- sessionPolicy.test.ts
- eslint.config.mjs

## God Nodes (most connected - your core abstractions)
1. `next` - 126 edges
2. `cn()` - 89 edges
3. `AppError` - 87 edges
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

## Communities (95 total, 15 thin omitted)

### Community 1 - "blogImageProcessing.ts"
Cohesion: 0.18
Nodes (9): sharp, BACKGROUND, icon(), main(), MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, processBlogImage(), ProcessedBlogImage (+1 more)

### Community 2 - "index.ts"
Cohesion: 0.08
Nodes (36): CtaCard(), InfoTooltip(), RateLimitTableProps, chipTones, GROUPS, SortKey, StatusChip(), FeeDefaultRow (+28 more)

### Community 3 - "blocks.ts"
Cohesion: 0.20
Nodes (20): blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml() (+12 more)

### Community 4 - "requireAdmin"
Cohesion: 0.06
Nodes (70): GET(), createDraft(), deletePost(), savePost(), ContactRequestsPage(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount() (+62 more)

### Community 5 - "formatDate"
Cohesion: 0.13
Nodes (19): UserPaymentHistoryDialog(), UserManagementPage(), SepaDialog(), calculateFeeAmount(), formatDate(), feeRetentionCutoffYear(), clearFeeAmountOverride(), findArchivedFees() (+11 more)

### Community 6 - "userService.ts"
Cohesion: 0.13
Nodes (25): KontoPage(), deleteUserAction(), EditUserPage(), metadata, updateUser(), updateBankDetails(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS (+17 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.12
Nodes (21): ServerPage(), BackupRun, BackupStatus, cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG, DEPLOY_SCRIPT (+13 more)

### Community 8 - "bestaetigen/page.tsx"
Cohesion: 0.07
Nodes (34): confirmPrivacyPolicy(), ConfirmPrivacyPolicyPage(), metadata, Props, DATENSCHUTZ, DATENSCHUTZ_VERSION, metadata, impressum() (+26 more)

### Community 9 - "blogService.ts"
Cohesion: 0.11
Nodes (30): BlogIndexPage(), AdminBlogPage(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost(), deletePostById(), eventLinkSelect (+22 more)

### Community 10 - "dashboard/page.tsx"
Cohesion: 0.06
Nodes (45): @react-pdf/renderer, GET(), byStatusThenName(), MailForm(), MailSuccessDialog(), MembershipCertificateCard(), dynamic, MembershipApplicationsPage() (+37 more)

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

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "AppError"
Cohesion: 0.12
Nodes (29): zod, GET(), message(), setFeatureFlag(), markContactRequestHandled(), removeContactRequest(), removeRateLimitEntry(), requestBackupLink() (+21 more)

### Community 19 - "ServerDashboard.tsx"
Cohesion: 0.21
Nodes (9): BackupHistory(), BackupSection(), DeploySection(), formatUptime(), Sample, ServerDashboard(), timeLabel(), formatBytes() (+1 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (39): isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, applicationPersonSchema, birthDateField, absent() (+31 more)

### Community 21 - "seed.ts"
Cohesion: 0.40
Nodes (3): adapter, prisma, @prisma/adapter-pg

### Community 22 - "format.ts"
Cohesion: 0.29
Nodes (7): DATE_TIME, EURO, formatDateShort(), LONG_DATE, NUMBER, SHORT_DATE, toDate()

### Community 23 - "app/layout.tsx"
Cohesion: 0.08
Nodes (26): escapeXml(), GET(), DashboardLayout(), metadata, src_app_globals, body, metadata, mono (+18 more)

### Community 24 - "DirectoryTable"
Cohesion: 0.09
Nodes (29): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), explainFee() (+21 more)

### Community 25 - "securityEventService.ts"
Cohesion: 0.18
Nodes (17): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap(), getRegistrationFunnel() (+9 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.17
Nodes (17): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+9 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "@hugeicons/core-free-icons"
Cohesion: 0.09
Nodes (31): @hugeicons/core-free-icons, react, DeletePostButton(), ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat (+23 more)

### Community 29 - "DebugBar.tsx"
Cohesion: 0.16
Nodes (17): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage(), commit, DebugBar() (+9 more)

### Community 30 - "countries.ts"
Cohesion: 0.13
Nodes (20): display(), SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS, countryName() (+12 more)

### Community 31 - "blog/actions.ts"
Cohesion: 0.21
Nodes (15): beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager(), handleDrop() (+7 more)

### Community 32 - "convert_alumni.py"
Cohesion: 0.26
Nodes (12): datetime, json, re, admin_note(), convert(), day(), main(), phone() (+4 more)

### Community 33 - "movePostImage"
Cohesion: 0.29
Nodes (10): moveInOrder(), applyImageOrder(), deleteImage(), findImageForPost(), findImagesForPost(), movePostImage(), orderedIds(), removePostImage() (+2 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (24): CLOUDS, Contact, KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField() (+16 more)

### Community 35 - "serverStatus.test.ts"
Cohesion: 0.28
Nodes (8): ref_node_os, cpuPercent(), getBackupStatus(), getSystemStats(), parseBackupLog(), parseMemAvailable(), pgEnv(), readTail()

### Community 36 - "accountActions.ts"
Cohesion: 0.15
Nodes (24): revealKosmosContactAction(), setKosmosVisibilityAction(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema (+16 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "next"
Cohesion: 0.10
Nodes (30): nextConfig, @hugeicons/react, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+22 more)

### Community 40 - "zahlungen/page.tsx"
Cohesion: 0.09
Nodes (46): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), dynamic, metadata, ZahlungenPage() (+38 more)

### Community 41 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 42 - "mail/page.tsx"
Cohesion: 0.12
Nodes (15): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, statusMeta() (+7 more)

### Community 43 - "server/route.ts"
Cohesion: 0.43
Nodes (6): GET(), GET(), auth, getAppLogs(), getDeployStatus(), stripAnsi()

### Community 44 - "Callout"
Cohesion: 0.07
Nodes (36): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, EmailChangeForm(), PasswordChangeButton(), EventFormData, ForgotPasswordPage(), ContactForm() (+28 more)

### Community 45 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (35): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, hasControlChars(), isValidPostalCode(), ageAt() (+27 more)

### Community 46 - "mailService.ts"
Cohesion: 0.13
Nodes (20): sanitize-html, ENTITIES, htmlToText(), AnnouncedEvent, composeMessage(), greeting(), MailTarget, Recipient (+12 more)

### Community 47 - "messages.ts"
Cohesion: 0.09
Nodes (40): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage() (+32 more)

### Community 48 - "feeService.ts"
Cohesion: 0.14
Nodes (35): field(), POST(), ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban() (+27 more)

### Community 49 - "app/page.tsx"
Cohesion: 0.12
Nodes (26): react-markdown, remark-gfm, generateMetadata(), Props, PublicBlogPost(), LeadPost(), PostRow(), HomePage() (+18 more)

### Community 50 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 51 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 52 - "Button.tsx"
Cohesion: 0.18
Nodes (11): ContactRequestList(), confirmDelete(), run(), buttonClasses(), ButtonColor, ButtonLinkProps, ButtonProps, ButtonSize (+3 more)

### Community 53 - "security/page.tsx"
Cohesion: 0.18
Nodes (14): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+6 more)

### Community 54 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 57 - "ref_node_assert"
Cohesion: 0.21
Nodes (6): ref_node_assert, ref_node_test, SUMMER, WINTER, base, directDebit

### Community 58 - "berlinTime.ts"
Cohesion: 0.24
Nodes (16): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+8 more)

### Community 59 - "authz.ts"
Cohesion: 0.17
Nodes (19): @prisma/client, POST(), POST(), GET(), GET(), FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS (+11 more)

### Community 60 - "Footer.tsx"
Cohesion: 0.31
Nodes (5): ContrastToggle(), columns, legalLinks, GravityTrigger(), PluckedString()

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 63 - "app/blog/page.tsx"
Cohesion: 0.09
Nodes (25): generateMetadata(), MetaLine(), Props, facts, metadata, metadata, dynamic, metadata (+17 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "registerAction.ts"
Cohesion: 0.11
Nodes (45): ref_crypto, ref_node_net, EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), requestPasswordReset(), resendVerificationEmail(), submitMembershipApplication() (+37 more)

### Community 67 - "BulkImport.tsx"
Cohesion: 0.12
Nodes (20): bulkCreateUsersAction(), ImportIssue, ImportRowResult, BulkImport(), check(), create(), loadFile(), replaceEntry() (+12 more)

### Community 68 - "MailForm.tsx"
Cohesion: 0.12
Nodes (15): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, EmailBodyField(), useEmailEditor() (+7 more)

### Community 69 - "blogImages.ts"
Cohesion: 0.25
Nodes (7): ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, formatBytes(), MAX_ADDITIONAL_BLOG_IMAGES, MAX_BLOG_IMAGES

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.10
Nodes (38): EditBlogPage(), createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), AdminEventsPage(), UPCOMING_ALERT_MONTHS, createEvent() (+30 more)

### Community 77 - "mitglied-werden/page.tsx"
Cohesion: 0.14
Nodes (20): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), WithdrawApplicationButton() (+12 more)

### Community 78 - "mail/actions.ts"
Cohesion: 0.29
Nodes (9): parseMailForm(), sendEmailAction(), parseDirectMailForm(), sendDirectMailAction(), resolveUsersByIds(), enforceAdminMailRateLimit(), getAnnouncedEvent(), directMailSchema (+1 more)

### Community 79 - "EditUserForm.tsx"
Cohesion: 0.07
Nodes (32): TerminationItem, ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, NewUserForm() (+24 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 82 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 85 - "prisma.ts"
Cohesion: 0.09
Nodes (36): bcryptjs, server-only, submitContactRequest(), AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers (+28 more)

### Community 86 - "opengraph-image.tsx"
Cohesion: 0.20
Nodes (7): dotenv, ref_node_fs, ref_node_path, prisma, alt, contentType, size

### Community 89 - "contact.ts"
Cohesion: 0.25
Nodes (6): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ContactInput, SPAM_KEYWORDS, legitimate

### Community 91 - "PhysicsTimeline.tsx"
Cohesion: 0.27
Nodes (6): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline()

### Community 96 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 100 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **472 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+467 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 605 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `forgot-password/layout.tsx`, `index.ts`, `requireAdmin`, `userService.ts`, `bestaetigen/page.tsx`, `dashboard/page.tsx`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `images/[id]/route.ts`, `package.json`, `AppError`, `app/layout.tsx`, `gravityPhysics.ts`, `@hugeicons/core-free-icons`, `DebugBar.tsx`, `blog/actions.ts`, `KosmosTimeline.tsx`, `accountActions.ts`, `zahlungen/page.tsx`, `mail/page.tsx`, `server/route.ts`, `Callout`, `ApplicationWizard.tsx`, `messages.ts`, `feeService.ts`, `app/page.tsx`, `Button.tsx`, `security/page.tsx`, `authz.ts`, `Footer.tsx`, `app/blog/page.tsx`, `registerAction.ts`, `MailForm.tsx`, `eventService.ts`, `mitglied-werden/page.tsx`, `EditUserForm.tsx`, `prisma.ts`, `opengraph-image.tsx`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.167) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/core-free-icons` to `index.ts`, `userService.ts`, `bestaetigen/page.tsx`, `blogService.ts`, `dashboard/page.tsx`, `MarketDiffusion.tsx`, `package.json`, `ServerDashboard.tsx`, `app/layout.tsx`, `gravityPhysics.ts`, `KosmosTimeline.tsx`, `next`, `Callout`, `ApplicationWizard.tsx`, `feeService.ts`, `app/page.tsx`, `authz.ts`, `Footer.tsx`, `app/blog/page.tsx`, `BulkImport.tsx`, `MailForm.tsx`, `eventService.ts`, `EditUserForm.tsx`, `altcha.d.ts`, `PhysicsTimeline.tsx`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Why does `AppError` connect `AppError` to `blogImageProcessing.ts`, `registerAction.ts`, `movePostImage`, `accountActions.ts`, `requireAdmin`, `userService.ts`, `serverStatus.ts`, `blogService.ts`, `eventService.ts`, `mailService.ts`, `messages.ts`, `mail/actions.ts`, `prisma.ts`, `authz.ts`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _472 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0798076923076923 - nodes in this community are weakly interconnected._
- **Should `requireAdmin` be split into smaller, more focused modules?**
  _Cohesion score 0.05627705627705628 - nodes in this community are weakly interconnected._