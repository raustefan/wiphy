# Graph Report - wiphy  (2026-10-23)

## Corpus Check
- 361 files · ~173,311 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2072 nodes · 6831 edges · 89 communities (79 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `363bf63d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- sepa.ts
- cn
- mitglied-werden/page.tsx
- useActionForm
- authz.ts
- AppError
- serverStatus.ts
- mitgliedsantraege/actions.ts
- blogService.ts
- app/kontakt/page.tsx
- events.ts
- react
- MarketDiffusion.tsx
- membershipFormSchemas.ts
- blocks.ts
- package.json
- dependencies
- boardService.ts
- ServerDashboard.tsx
- schemas.ts
- seed.ts
- Button
- app/layout.tsx
- MemberDirectory.tsx
- securityEventService.ts
- rateLimit.ts
- gravityPhysics.ts
- users/page.tsx
- mailHistory.ts
- countries.ts
- iban.ts
- convert_alumni.py
- MailDashboard.tsx
- KosmosTimeline.tsx
- feature-flags/page.tsx
- getOptionalUser
- compilerOptions
- devDependencies
- users/[id]/page.tsx
- BulkImport.tsx
- prisma.ts
- AccountPanel
- NewUserForm.tsx
- Callout
- ApplicationWizard.tsx
- mailService.ts
- messages.ts
- executeAction
- security/page.tsx
- EmailComposerDialog.tsx
- ApplicationList.tsx
- EditUserForm.tsx
- EventForm.tsx
- userService.ts
- bulkCreateUsersAction
- MailForm.tsx
- MarkdownViewer.tsx
- berlinTime.ts
- isFeatureEnabled
- ContactRequestList
- userUpdateData.ts
- removeRateLimitEntry
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- registerAction.ts
- membershipCertificate.ts
- index.ts
- formatDate
- CLAUDE.md
- ref_node_assert
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- feeService.ts
- altcha.d.ts
- DeleteMemberSection
- postcss.config.mjs
- ref_node_fs
- mitgliedsantraege/page.tsx
- { GET, POST }
- dashboard/page.tsx
- eslint.config.mjs

## God Nodes (most connected - your core abstractions)
1. `next` - 123 edges
2. `cn()` - 89 edges
3. `AppError` - 86 edges
4. `@hugeicons/core-free-icons` - 84 edges
5. `@hugeicons/react` - 84 edges
6. `react` - 73 edges
7. `executeAction()` - 73 edges
8. `requireAdmin()` - 56 edges
9. `isFeatureEnabled()` - 50 edges
10. `Button()` - 45 edges

## Surprising Connections (you probably didn't know these)
- `Befunde vom 2026-10-20` --references--> `siteUrl()`  [INFERRED]
  BETRIEB.md → src/lib/server/siteUrl.ts
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `ContactRequestList()` --indirect_call--> `markContactRequestHandled()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts
- `confirmDelete()` --indirect_call--> `removeContactRequest()`  [INFERRED]
  src/app/dashboard/kontakt/ContactRequestList.tsx → src/app/dashboard/kontakt/actions.ts

## Import Cycles
- None detected.

## Communities (89 total, 10 thin omitted)

### Community 0 - "next"
Cohesion: 0.11
Nodes (6): nextConfig, next, metadata, metadata, metadata, metadata

### Community 1 - "sepa.ts"
Cohesion: 0.23
Nodes (16): field(), POST(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate(), isValidCreditorId() (+8 more)

### Community 2 - "cn"
Cohesion: 0.09
Nodes (21): CtaCard(), EmailEditorToolbarProps, ToolbarButton(), ShareButton(), share(), BadgeTone, toneClasses, CalloutTone (+13 more)

### Community 3 - "mitglied-werden/page.tsx"
Cohesion: 0.18
Nodes (15): JourneyRail(), dynamic, metadata, MitgliedWerdenPage(), Props, WithdrawApplicationButton(), withdraw(), JOURNEY_STEPS (+7 more)

### Community 4 - "useActionForm"
Cohesion: 0.21
Nodes (10): EmailChangeForm(), PasswordChangeButton(), ForgotPasswordPage(), VerifyEmailContent(), ActionForm, ActionFormOptions, useActionForm(), getRedirectTarget() (+2 more)

### Community 5 - "authz.ts"
Cohesion: 0.12
Nodes (25): ref_node_child_process, ref_node_util, GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, commit (+17 more)

### Community 6 - "AppError"
Cohesion: 0.12
Nodes (35): zod, EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), revealKosmosEmailAction(), setKosmosVisibilityAction(), deleteOwnAccount(), disableOwnAccount(), mailLater() (+27 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.10
Nodes (34): ref_node_os, GET(), metadata, ServerPage(), BackupRun, BackupStatus, cpuPercent(), cpuTimes (+26 more)

### Community 8 - "mitgliedsantraege/actions.ts"
Cohesion: 0.12
Nodes (28): acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), MembershipApplicationsPage(), planApplicationFees(), countOpenApplications() (+20 more)

### Community 9 - "blogService.ts"
Cohesion: 0.05
Nodes (77): sharp, POST(), BlogIndexPage(), beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages() (+69 more)

### Community 10 - "app/kontakt/page.tsx"
Cohesion: 0.14
Nodes (14): ContactForm(), dynamic, KontaktPage(), metadata, createLoginChallenge(), LoginForm(), dynamic, LoginPage() (+6 more)

### Community 11 - "events.ts"
Cohesion: 0.09
Nodes (44): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, dynamic (+36 more)

### Community 12 - "react"
Cohesion: 0.11
Nodes (20): react, statusMeta(), TerminationItem, TerminationList(), confirm(), ActionResult, Mode, OwnTermination (+12 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.08
Nodes (37): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), links, InterferenceField() (+29 more)

### Community 14 - "membershipFormSchemas.ts"
Cohesion: 0.12
Nodes (21): hasControlChars(), isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, addAddressIssues() (+13 more)

### Community 15 - "blocks.ts"
Cohesion: 0.21
Nodes (19): blockHtml(), blockText(), derivePreheader(), EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml(), renderBlocksText() (+11 more)

### Community 16 - "package.json"
Cohesion: 0.11
Nodes (18): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+10 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "boardService.ts"
Cohesion: 0.07
Nodes (50): POST(), GET(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), AdminBoardPage() (+42 more)

### Community 19 - "ServerDashboard.tsx"
Cohesion: 0.15
Nodes (13): triggerDeploy(), BackupSection(), DeploySection(), formatUptime(), Sample, ServerDashboard(), timeLabel(), PAD (+5 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (33): absent(), addPersonIssues(), AdminCreateUserInput, asDate(), berlinDateTime(), boardDeleteSchema, boardMoveSchema, boardSaveSchema (+25 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "Button"
Cohesion: 0.15
Nodes (13): PhotoMeta, FeatureDisabledDialog(), FeatureDisabledDialogProps, BeforeInstallPromptEvent, InstallHint(), Button(), ButtonColor, ButtonLinkProps (+5 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.07
Nodes (26): escapeXml(), GET(), DashboardLayout(), metadata, src_app_globals, body, metadata, mono (+18 more)

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.11
Nodes (24): DirectoryAccount, DirectoryTable(), selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase, DirectoryFilters (+16 more)

### Community 25 - "securityEventService.ts"
Cohesion: 0.06
Nodes (49): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, columnPath(), labelStride() (+41 more)

### Community 26 - "rateLimit.ts"
Cohesion: 0.22
Nodes (11): ref_crypto, parseMailForm(), sendEmailAction(), enforceAdminMailRateLimit(), hashKey(), KeyParts, makeStoreKey(), normalizeKeyPart() (+3 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "users/page.tsx"
Cohesion: 0.33
Nodes (7): DialogButton(), metadata, StatTile(), UserManagementPage(), getArchivedFees(), getExistingFeeYears(), countCompletedTerminationsSince()

### Community 29 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 30 - "countries.ts"
Cohesion: 0.13
Nodes (20): display(), EntryDetails(), SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS (+12 more)

### Community 31 - "iban.ts"
Cohesion: 0.21
Nodes (22): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+14 more)

### Community 32 - "convert_alumni.py"
Cohesion: 0.22
Nodes (14): datetime, json, re, admin_note(), convert(), day(), fees(), main() (+6 more)

### Community 33 - "MailDashboard.tsx"
Cohesion: 0.13
Nodes (14): MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, MailUserOption, announcementHtml(), dynamic, MailDashboardPage() (+6 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (21): KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen(), years() (+13 more)

### Community 35 - "feature-flags/page.tsx"
Cohesion: 0.26
Nodes (9): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), metadata, FEATURE_FLAG_CATEGORIES, requireDebugAdmin(), getAllFeatureFlags() (+1 more)

### Community 36 - "getOptionalUser"
Cohesion: 0.25
Nodes (10): @react-pdf/renderer, GET(), GET(), GET(), GET(), isCertifiableStatus(), getOptionalUser(), loadLogoDataUrl() (+2 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "users/[id]/page.tsx"
Cohesion: 0.11
Nodes (25): metadata, DashboardPageHeader(), DashboardPageHeaderProps, dynamic, metadata, dynamic, metadata, DeleteEventButton() (+17 more)

### Community 40 - "BulkImport.tsx"
Cohesion: 0.16
Nodes (13): ImportIssue, ImportRowResult, FALSE_BY_DEFAULT, ImportReport, EXAMPLE, FEE_FIELDS, FEES_EXAMPLE, IMPORT_EXCLUDED_FIELDS (+5 more)

### Community 41 - "prisma.ts"
Cohesion: 0.21
Nodes (13): server-only, GET(), message(), KontoPage(), createPrismaClient(), globalForPrisma, getAltchaHmacKey(), getDatabaseUrl() (+5 more)

### Community 42 - "AccountPanel"
Cohesion: 0.38
Nodes (5): AccountPanel(), handleSubmit(), ResetPasswordForm(), handleSubmit(), validateNewPassword()

### Community 43 - "NewUserForm.tsx"
Cohesion: 0.18
Nodes (14): NewUserForm(), handleSubmit(), FILL_PERCENT, NewPasswordFields(), PasswordInput(), PasswordStrengthMeter(), evaluatePassword(), generatePassword() (+6 more)

### Community 44 - "Callout"
Cohesion: 0.24
Nodes (9): next-auth, FaqItem, LoginFaq(), SECTIONS, AuthLink(), AuthShell(), Callout(), Spinner() (+1 more)

### Community 45 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (26): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, ApplicationStage(), toDateInput(), ageAt() (+18 more)

### Community 46 - "mailService.ts"
Cohesion: 0.14
Nodes (21): sanitize-html, EmailBlock, parseDirectMailForm(), sendDirectMailAction(), ENTITIES, htmlToText(), AnnouncedEvent, composeMessage() (+13 more)

### Community 47 - "messages.ts"
Cohesion: 0.12
Nodes (27): submitContactRequest(), submitMembershipApplication(), withdrawMembershipApplication(), accountDeletedMessage(), adminCreatedUserMessage(), contactRequestMessage(), emailChangeMessage(), feeReminderMessage() (+19 more)

### Community 48 - "executeAction"
Cohesion: 0.14
Nodes (33): deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), ContactRequestsPage(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount() (+25 more)

### Community 49 - "security/page.tsx"
Cohesion: 0.09
Nodes (32): AdminBlogPage(), dynamic, metadata, SecurityPage(), ReasonBars(), RegistrationFunnel(), share(), Stage (+24 more)

### Community 50 - "EmailComposerDialog.tsx"
Cohesion: 0.19
Nodes (11): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailBodyField(), useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose() (+3 more)

### Community 51 - "ApplicationList.tsx"
Cohesion: 0.19
Nodes (12): ApplicationItem, ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), dateFormat (+4 more)

### Community 52 - "EditUserForm.tsx"
Cohesion: 0.11
Nodes (18): ADMIN_ONLY_KEYS, EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), FIELD_LABELS (+10 more)

### Community 53 - "EventForm.tsx"
Cohesion: 0.24
Nodes (8): @uiw/react-markdown-preview, @uiw/react-md-editor, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), MarkdownEditor(), MDEditor

### Community 54 - "userService.ts"
Cohesion: 0.12
Nodes (24): bcryptjs, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError (+16 more)

### Community 55 - "bulkCreateUsersAction"
Cohesion: 0.60
Nodes (6): bulkCreateUsersAction(), BulkImport(), check(), create(), loadFile(), replaceEntry()

### Community 56 - "MailForm.tsx"
Cohesion: 0.15
Nodes (12): byStatusThenName(), MailForm(), MailFormProps, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, getStatusIcon(), ProfileSummary() (+4 more)

### Community 57 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

### Community 58 - "berlinTime.ts"
Cohesion: 0.32
Nodes (13): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+5 more)

### Community 59 - "isFeatureEnabled"
Cohesion: 0.16
Nodes (24): ref_node_net, @prisma/client, requestPasswordReset(), resetPassword(), resetSchema, notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage() (+16 more)

### Community 60 - "ContactRequestList"
Cohesion: 1.00
Nodes (3): ContactRequestList(), confirmDelete(), run()

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "removeRateLimitEntry"
Cohesion: 0.21
Nodes (10): removeRateLimitEntry(), RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket (+2 more)

### Community 63 - "Site.tsx"
Cohesion: 0.11
Nodes (14): categories, events, TimelineCategory, TimelineEvent, facts, metadata, categoryLabel, PhysicsTimeline() (+6 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "registerAction.ts"
Cohesion: 0.16
Nodes (26): requestPasswordChange(), requestBackupLink(), resendVerificationEmail(), registerUser(), EmailMessage, backupLinkMessage(), registrationConfirmationMessage(), prisma (+18 more)

### Community 67 - "membershipCertificate.ts"
Cohesion: 0.17
Nodes (20): DashboardPage(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDuration() (+12 more)

### Community 68 - "index.ts"
Cohesion: 0.09
Nodes (43): @hugeicons/core-free-icons, @hugeicons/react, DeletePostButton(), metadata, ContactRequestItem, dateFormat, InfoTooltip(), RateLimitTableProps (+35 more)

### Community 69 - "formatDate"
Cohesion: 0.12
Nodes (29): generateMetadata(), Props, PublicBlogPost(), generateMetadata(), LeadPost(), MetaLine(), PostRow(), Props (+21 more)

### Community 71 - "ref_node_assert"
Cohesion: 0.16
Nodes (10): ref_node_assert, ref_node_test, MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ADMIN_SESSION_MAX_MS, adminSessionExpired(), legitimate (+2 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.06
Nodes (57): RFC-5545, createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), GET(), GET(), icsEnd() (+49 more)

### Community 77 - "feeService.ts"
Cohesion: 0.06
Nodes (65): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), DATENSCHUTZ, metadata (+57 more)

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 86 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 87 - "mitgliedsantraege/page.tsx"
Cohesion: 0.16
Nodes (13): dynamic, metadata, EditUserPage(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), isTerminationDue(), TERMINATION_RECORD_RETENTION_YEARS (+5 more)

### Community 91 - "dashboard/page.tsx"
Cohesion: 0.18
Nodes (8): MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog(), SectionHeader(), LogoutButton(), buttonClasses(), src_lib_server_services_membershipservice_getopenapplication

### Community 95 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **466 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+461 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 600 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `sepa.ts`, `cn`, `mitglied-werden/page.tsx`, `useActionForm`, `authz.ts`, `AppError`, `serverStatus.ts`, `mitgliedsantraege/actions.ts`, `blogService.ts`, `app/kontakt/page.tsx`, `events.ts`, `react`, `MarketDiffusion.tsx`, `package.json`, `boardService.ts`, `Button`, `app/layout.tsx`, `MemberDirectory.tsx`, `rateLimit.ts`, `gravityPhysics.ts`, `users/page.tsx`, `MailDashboard.tsx`, `KosmosTimeline.tsx`, `feature-flags/page.tsx`, `getOptionalUser`, `users/[id]/page.tsx`, `prisma.ts`, `Callout`, `ApplicationWizard.tsx`, `messages.ts`, `executeAction`, `security/page.tsx`, `EditUserForm.tsx`, `EventForm.tsx`, `isFeatureEnabled`, `Site.tsx`, `registerAction.ts`, `index.ts`, `formatDate`, `eventService.ts`, `feeService.ts`, `mitgliedsantraege/page.tsx`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.193) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `cn`, `useActionForm`, `authz.ts`, `blogService.ts`, `MarketDiffusion.tsx`, `package.json`, `ServerDashboard.tsx`, `Button`, `app/layout.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `users/page.tsx`, `iban.ts`, `MailDashboard.tsx`, `KosmosTimeline.tsx`, `feature-flags/page.tsx`, `users/[id]/page.tsx`, `BulkImport.tsx`, `NewUserForm.tsx`, `Callout`, `ApplicationWizard.tsx`, `EmailComposerDialog.tsx`, `ApplicationList.tsx`, `EditUserForm.tsx`, `EventForm.tsx`, `MailForm.tsx`, `Site.tsx`, `index.ts`, `formatDate`, `eventService.ts`, `feeService.ts`, `altcha.d.ts`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `@hugeicons/core-free-icons` connect `index.ts` to `cn`, `mitglied-werden/page.tsx`, `useActionForm`, `authz.ts`, `serverStatus.ts`, `blogService.ts`, `events.ts`, `react`, `MarketDiffusion.tsx`, `package.json`, `ServerDashboard.tsx`, `Button`, `app/layout.tsx`, `MemberDirectory.tsx`, `securityEventService.ts`, `gravityPhysics.ts`, `users/page.tsx`, `MailDashboard.tsx`, `KosmosTimeline.tsx`, `feature-flags/page.tsx`, `users/[id]/page.tsx`, `BulkImport.tsx`, `NewUserForm.tsx`, `Callout`, `ApplicationWizard.tsx`, `security/page.tsx`, `EmailComposerDialog.tsx`, `ApplicationList.tsx`, `EditUserForm.tsx`, `EventForm.tsx`, `MailForm.tsx`, `Site.tsx`, `formatDate`, `mitgliedsantraege/page.tsx`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _466 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.08888888888888889 - nodes in this community are weakly interconnected._