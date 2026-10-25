# Graph Report - wiphy  (2026-10-25)

## Corpus Check
- 366 files · ~174,781 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2083 nodes · 6892 edges · 101 communities (87 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0021bf40`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- forgot-password/layout.tsx
- feeService.ts
- index.ts
- mitglied-werden/page.tsx
- boardService.ts
- getOptionalUser
- AppError
- serverStatus.ts
- format.ts
- blogService.ts
- zertifikat/pdf/route.ts
- app/termine/[id]/page.tsx
- ics.ts
- MarketDiffusion.tsx
- formatNumber
- bestaetigen/page.tsx
- package.json
- dependencies
- executeAction
- server/actions.ts
- schemas.ts
- seed.ts
- dashboard/page.tsx
- app/layout.tsx
- DirectoryTable
- securityEventService.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- @hugeicons/core-free-icons
- authz.ts
- countries.ts
- blog/actions.ts
- convert_alumni.py
- membershipFormSchemas.ts
- KosmosTimeline.tsx
- DirectoryTable.tsx
- messages.ts
- compilerOptions
- devDependencies
- next
- server/route.ts
- mailer.ts
- mail/page.tsx
- feeDefaultService.ts
- Callout
- ApplicationWizard.tsx
- mailService.ts
- mitgliedsantraege/actions.ts
- iban.ts
- ref_node_assert
- EmailBodyField.tsx
- ApplicationList
- EditUserForm.tsx
- security/page.tsx
- prisma.ts
- EditUserForm
- altcha.ts
- blogImages.ts
- events.ts
- featureFlagService.ts
- Footer.tsx
- userService.ts
- RateLimitTable
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- rateLimit.ts
- BulkImport.tsx
- MailForm.tsx
- app/blog/[id]/page.tsx
- CLAUDE.md
- formatStatus
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- satzung/page.tsx
- app/kontakt/actions.ts
- passwordStrength.ts
- altcha.d.ts
- DeleteMemberSection
- ActivityHeatmap.tsx
- postcss.config.mjs
- auth.ts
- ref_node_fs
- mitgliedsantraege/page.tsx
- { GET, POST }
- dashboard/kontakt/actions.ts
- app/page.tsx
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- TypeSparklines.tsx
- RegistrationFunnel.tsx
- MarkdownEditor.tsx
- redirectError.ts
- sessionPolicy.test.ts
- EditBlogPage

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
- `EmailChangeForm()` --indirect_call--> `requestEmailChangeAction()`  [INFERRED]
  src/app/dashboard/konto/AccessForms.tsx → src/app/dashboard/konto/actions.ts
- `DashboardLayout()` --calls--> `requireUser()`  [EXTRACTED]
  src/app/dashboard/layout.tsx → src/lib/server/authz.ts

## Import Cycles
- None detected.

## Communities (101 total, 14 thin omitted)

### Community 1 - "feeService.ts"
Cohesion: 0.16
Nodes (23): field(), POST(), SepaDialog(), FeeBreakdown, agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId() (+15 more)

### Community 2 - "index.ts"
Cohesion: 0.07
Nodes (39): CtaCard(), DeleteEventButton(), dynamic, metadata, FeeDefaultRow, StatTile(), ShareButton(), share() (+31 more)

### Community 3 - "mitglied-werden/page.tsx"
Cohesion: 0.17
Nodes (17): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+9 more)

### Community 4 - "boardService.ts"
Cohesion: 0.07
Nodes (48): POST(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), AdminBoardPage(), getInitials() (+40 more)

### Community 5 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

### Community 6 - "AppError"
Cohesion: 0.11
Nodes (37): zod, requestEmailChangeAction(), revealKosmosEmailAction(), setKosmosVisibilityAction(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema (+29 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.10
Nodes (28): ref_node_os, ServerPage(), DebugConsole(), AppLogs, BackupRun, BackupStatus, cpuPercent(), cpuTimes (+20 more)

### Community 8 - "format.ts"
Cohesion: 0.11
Nodes (19): BackupHistory(), metadata, BackupSection(), DeploySection(), formatUptime(), Sample, ServerDashboard(), timeLabel() (+11 more)

### Community 9 - "blogService.ts"
Cohesion: 0.09
Nodes (44): POST(), BlogIndexPage(), AdminBlogPage(), moveInOrder(), applyImageOrder(), BlogImageRow, BlogPostWriteData, countImagesForPost() (+36 more)

### Community 10 - "zertifikat/pdf/route.ts"
Cohesion: 0.08
Nodes (37): @react-pdf/renderer, GET(), metadata, impressum(), ImpressumPage(), metadata, SATZUNG, anchorOf() (+29 more)

### Community 11 - "app/termine/[id]/page.tsx"
Cohesion: 0.12
Nodes (30): react-markdown, remark-gfm, DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props (+22 more)

### Community 12 - "ics.ts"
Cohesion: 0.15
Nodes (20): RFC-5545, GET(), GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs() (+12 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.11
Nodes (31): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), deriv() (+23 more)

### Community 14 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 15 - "bestaetigen/page.tsx"
Cohesion: 0.26
Nodes (9): confirmPrivacyPolicy(), ConfirmPrivacyPolicyPage(), metadata, Props, DATENSCHUTZ, DATENSCHUTZ_VERSION, LogoutButton(), internalPath() (+1 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): eslintConfig, name, packageManager, private, version, altcha, babel-plugin-react-compiler, eslint (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "executeAction"
Cohesion: 0.15
Nodes (34): createDraft(), deletePost(), savePost(), createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), deleteFeeDefaultYear() (+26 more)

### Community 19 - "server/actions.ts"
Cohesion: 0.30
Nodes (9): removeRateLimitEntry(), requestBackupLink(), triggerDeploy(), backupLinkMessage(), requireDebugAdmin(), startDeploy(), BACKUP_LINK_MINUTES, createBackupLink() (+1 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (31): absent(), addPersonIssues(), AdminCreateUserInput, asDate(), boardDeleteSchema, boardMoveSchema, boardSaveSchema, emailChangeSchema (+23 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "dashboard/page.tsx"
Cohesion: 0.15
Nodes (20): GET(), KontoPage(), MailSuccessDialog(), ADMIN_ACTIONS, DashboardPage(), QueryParamDialog(), SectionHeader(), updateUser() (+12 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.09
Nodes (17): DashboardLayout(), metadata, src_app_globals, body, metadata, mono, serif, alt (+9 more)

### Community 24 - "DirectoryTable"
Cohesion: 0.08
Nodes (30): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), explainFee() (+22 more)

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
Cohesion: 0.11
Nodes (27): @hugeicons/core-free-icons, @hugeicons/react, react, ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat (+19 more)

### Community 29 - "authz.ts"
Cohesion: 0.14
Nodes (23): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage(), commit, DebugBar() (+15 more)

### Community 30 - "countries.ts"
Cohesion: 0.13
Nodes (20): display(), EntryDetails(), SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS (+12 more)

### Community 31 - "blog/actions.ts"
Cohesion: 0.21
Nodes (15): beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager(), handleDrop() (+7 more)

### Community 32 - "convert_alumni.py"
Cohesion: 0.26
Nodes (12): datetime, json, re, admin_note(), convert(), day(), main(), phone() (+4 more)

### Community 33 - "membershipFormSchemas.ts"
Cohesion: 0.11
Nodes (25): hasControlChars(), isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, MINOR_HINT (+17 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (21): KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen(), years() (+13 more)

### Community 35 - "DirectoryTable.tsx"
Cohesion: 0.12
Nodes (16): chipTones, DirectoryAccount, GROUPS, SortKey, StatusChip(), EmailBodyField(), useEmailEditor(), EmailComposerDialog() (+8 more)

### Community 36 - "messages.ts"
Cohesion: 0.12
Nodes (23): MetaLine(), MembershipCertificateCard(), AccountSection(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), accountDeletedMessage() (+15 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "next"
Cohesion: 0.11
Nodes (26): nextConfig, next, DeletePostButton(), metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+18 more)

### Community 40 - "server/route.ts"
Cohesion: 0.31
Nodes (8): GET(), GET(), auth, deployAvailable(), deployRunning(), getAppLogs(), getDeployStatus(), stripAnsi()

### Community 41 - "mailer.ts"
Cohesion: 0.21
Nodes (13): GET(), message(), EmailMessage, getMailTransporter(), normalize(), Recipients, getAltchaHmacKey(), getDatabaseUrl() (+5 more)

### Community 42 - "mail/page.tsx"
Cohesion: 0.19
Nodes (12): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, sitemap() (+4 more)

### Community 43 - "feeDefaultService.ts"
Cohesion: 0.52
Nodes (5): deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeDefaults(), getFeeRatesForYear()

### Community 44 - "Callout"
Cohesion: 0.09
Nodes (33): next-auth, EmailChangeForm(), PasswordChangeButton(), ForgotPasswordPage(), FaqItem, LoginFaq(), SECTIONS, AccountPanel() (+25 more)

### Community 45 - "ApplicationWizard.tsx"
Cohesion: 0.11
Nodes (18): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, FeeDefaultEntry, FeeRates, ageAt() (+10 more)

### Community 46 - "mailService.ts"
Cohesion: 0.07
Nodes (50): sanitize-html, parseMailForm(), sendEmailAction(), blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature (+42 more)

### Community 47 - "mitgliedsantraege/actions.ts"
Cohesion: 0.14
Nodes (26): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), membershipApprovedMessage(), membershipRejectedMessage(), planApplicationFees(), resolveFeeDefault(), countOpenApplications() (+18 more)

### Community 48 - "iban.ts"
Cohesion: 0.22
Nodes (21): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+13 more)

### Community 49 - "ref_node_assert"
Cohesion: 0.24
Nodes (7): ref_node_assert, ref_node_test, membershipApplicationSchema, SUMMER, WINTER, base, directDebit

### Community 50 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 51 - "ApplicationList"
Cohesion: 0.33
Nodes (9): removeMembershipApplication(), ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange() (+1 more)

### Community 52 - "EditUserForm.tsx"
Cohesion: 0.10
Nodes (18): EventFormData, ActionResult, Mode, OwnTermination, ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP (+10 more)

### Community 53 - "security/page.tsx"
Cohesion: 0.17
Nodes (17): dynamic, metadata, SecurityPage(), ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel() (+9 more)

### Community 54 - "prisma.ts"
Cohesion: 0.19
Nodes (26): ref_crypto, EMAIL_CHANGE_ERRORS, requestPasswordChange(), requestPasswordReset(), resendVerificationEmail(), registerUser(), passwordResetMessage(), registrationConfirmationMessage() (+18 more)

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "altcha.ts"
Cohesion: 0.15
Nodes (17): altcha-lib, dynamic, KontaktPage(), metadata, createLoginChallenge(), LoginForm(), dynamic, LoginPage() (+9 more)

### Community 57 - "blogImages.ts"
Cohesion: 0.14
Nodes (12): sharp, ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, MAX_ADDITIONAL_BLOG_IMAGES, MAX_BLOG_IMAGE_UPLOAD_BYTES, MAX_BLOG_IMAGES (+4 more)

### Community 58 - "events.ts"
Cohesion: 0.12
Nodes (27): EventForm(), toggleAllDay(), toDateTimeValue(), toDayValue(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay() (+19 more)

### Community 59 - "featureFlagService.ts"
Cohesion: 0.20
Nodes (11): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, isFeatureFlagKey() (+3 more)

### Community 60 - "Footer.tsx"
Cohesion: 0.20
Nodes (9): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString(), getDisabledPages, config (+1 more)

### Community 61 - "userService.ts"
Cohesion: 0.13
Nodes (24): @prisma/client, calculateFeeAmount(), archiveFeesOfUser(), resolveIsStudentDefault(), syncStudentYear(), upsertFeeAmount(), upsertFeeStatus(), findUserById() (+16 more)

### Community 62 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 63 - "Site.tsx"
Cohesion: 0.13
Nodes (13): facts, metadata, metadata, dynamic, metadata, SearchParams, ViewSwitch(), LorenzAttractor (+5 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "rateLimit.ts"
Cohesion: 0.13
Nodes (19): ref_node_net, resetPassword(), resetSchema, notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), passwordChangedNoticeMessage() (+11 more)

### Community 67 - "BulkImport.tsx"
Cohesion: 0.13
Nodes (19): bulkCreateUsersAction(), ImportIssue, ImportRowResult, BulkImport(), check(), create(), loadFile(), replaceEntry() (+11 more)

### Community 68 - "MailForm.tsx"
Cohesion: 0.22
Nodes (6): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS

### Community 69 - "app/blog/[id]/page.tsx"
Cohesion: 0.13
Nodes (28): escapeXml(), GET(), generateMetadata(), Props, PublicBlogPost(), generateMetadata(), LeadPost(), PostRow() (+20 more)

### Community 71 - "formatStatus"
Cohesion: 0.18
Nodes (8): byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, EntryRow(), formatStatus(), getStatusTone()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.11
Nodes (31): EditEventPage(), AdminEventsPage(), startOfBerlinDay(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents() (+23 more)

### Community 77 - "satzung/page.tsx"
Cohesion: 0.13
Nodes (26): FeeDefaultsCard(), run(), save(), BankDetailsForm(), ApplicationWizard(), currentFormValues(), goToStep(), handleEnter() (+18 more)

### Community 78 - "app/kontakt/actions.ts"
Cohesion: 0.16
Nodes (14): submitContactRequest(), ContactForm(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), ContactInput, scoreSpam() (+6 more)

### Community 79 - "passwordStrength.ts"
Cohesion: 0.21
Nodes (10): NewUserForm(), handleSubmit(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 82 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 85 - "auth.ts"
Cohesion: 0.20
Nodes (9): bcryptjs, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError (+1 more)

### Community 86 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 87 - "mitgliedsantraege/page.tsx"
Cohesion: 0.11
Nodes (24): confirmMembershipTermination(), dynamic, MembershipApplicationsPage(), metadata, statusMeta(), TerminationList(), confirm(), EditUserPage() (+16 more)

### Community 89 - "dashboard/kontakt/actions.ts"
Cohesion: 0.29
Nodes (9): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), ContactRequestsPage(), deleteContactRequest(), getContactRequests() (+1 more)

### Community 91 - "app/page.tsx"
Cohesion: 0.15
Nodes (13): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline(), HomePage(), levels (+5 more)

### Community 95 - "TypeSparklines.tsx"
Cohesion: 0.36
Nodes (7): sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 96 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 97 - "MarkdownEditor.tsx"
Cohesion: 0.50
Nodes (3): @uiw/react-markdown-preview, @uiw/react-md-editor, MDEditor

### Community 98 - "redirectError.ts"
Cohesion: 0.67
Nodes (3): getRedirectTarget(), isRedirectError(), RedirectTarget

### Community 100 - "EditBlogPage"
Cohesion: 0.67
Nodes (3): EditBlogPage(), findEventOptions(), getEventOptions()

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **469 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+464 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 602 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `forgot-password/layout.tsx`, `feeService.ts`, `index.ts`, `mitglied-werden/page.tsx`, `boardService.ts`, `getOptionalUser`, `AppError`, `format.ts`, `zertifikat/pdf/route.ts`, `app/termine/[id]/page.tsx`, `ics.ts`, `MarketDiffusion.tsx`, `bestaetigen/page.tsx`, `package.json`, `executeAction`, `server/actions.ts`, `dashboard/page.tsx`, `app/layout.tsx`, `gravityPhysics.ts`, `@hugeicons/core-free-icons`, `authz.ts`, `blog/actions.ts`, `KosmosTimeline.tsx`, `DirectoryTable.tsx`, `messages.ts`, `server/route.ts`, `mailer.ts`, `mail/page.tsx`, `Callout`, `ApplicationWizard.tsx`, `mitgliedsantraege/actions.ts`, `EditUserForm.tsx`, `security/page.tsx`, `prisma.ts`, `altcha.ts`, `featureFlagService.ts`, `Footer.tsx`, `Site.tsx`, `rateLimit.ts`, `MailForm.tsx`, `app/blog/[id]/page.tsx`, `satzung/page.tsx`, `app/kontakt/actions.ts`, `mitgliedsantraege/page.tsx`, `dashboard/kontakt/actions.ts`, `app/page.tsx`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`, `MarkdownEditor.tsx`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/core-free-icons` to `index.ts`, `serverStatus.ts`, `format.ts`, `blogService.ts`, `zertifikat/pdf/route.ts`, `MarketDiffusion.tsx`, `package.json`, `dashboard/page.tsx`, `app/layout.tsx`, `gravityPhysics.ts`, `authz.ts`, `KosmosTimeline.tsx`, `DirectoryTable.tsx`, `next`, `Callout`, `ApplicationWizard.tsx`, `iban.ts`, `EditUserForm.tsx`, `featureFlagService.ts`, `Footer.tsx`, `Site.tsx`, `BulkImport.tsx`, `MailForm.tsx`, `app/blog/[id]/page.tsx`, `eventService.ts`, `altcha.d.ts`, `app/page.tsx`, `MarkdownEditor.tsx`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `AppError` connect `AppError` to `boardService.ts`, `serverStatus.ts`, `blogService.ts`, `executeAction`, `server/actions.ts`, `messages.ts`, `next`, `mailer.ts`, `mailService.ts`, `mitgliedsantraege/actions.ts`, `prisma.ts`, `blogImages.ts`, `featureFlagService.ts`, `userService.ts`, `rateLimit.ts`, `eventService.ts`, `app/kontakt/actions.ts`, `auth.ts`, `mitgliedsantraege/page.tsx`, `dashboard/kontakt/actions.ts`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _469 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06963645673323093 - nodes in this community are weakly interconnected._
- **Should `boardService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07205387205387205 - nodes in this community are weakly interconnected._