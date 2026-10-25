# Graph Report - wiphy  (2026-10-25)

## Corpus Check
- 377 files · ~177,441 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2108 nodes · 6989 edges · 94 communities (84 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4ebb1ae2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- berlinTime.ts
- isFeatureEnabled
- index.ts
- layout.ts
- boardService.ts
- feeService.ts
- userService.ts
- serverStatus.ts
- LegalPage.tsx
- blogService.ts
- dashboard/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- UsageChart.tsx
- getOptionalUser
- package.json
- dependencies
- executeAction
- ServerDashboard.tsx
- schemas.ts
- seed.ts
- requireAdmin
- app/layout.tsx
- DirectoryTable
- security/page.tsx
- OutcomeTimeline.tsx
- gravityPhysics.ts
- @hugeicons/core-free-icons
- membershipFormSchemas.ts
- paymentHistoryPdf.tsx
- mitglied-werden/actions.ts
- convert_alumni.py
- newsletterToken.ts
- KosmosTimeline.tsx
- MarkdownViewer.tsx
- AppError
- compilerOptions
- devDependencies
- next
- zahlungen/page.tsx
- feeCalculation.ts
- format.ts
- EditUserForm.tsx
- Callout
- ApplicationWizard.tsx
- mailService.ts
- membershipService.ts
- iban.ts
- app/blog/[id]/page.tsx
- EmailBodyField.tsx
- ApplicationList
- Button.tsx
- dashboard/kontakt/actions.ts
- sendEmail
- EditUserForm
- ApplicationWizard
- ref_node_assert
- sepa.ts
- rateLimit.ts
- Footer.tsx
- userUpdateData.ts
- rateLimitService.ts
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- featureFlagService.ts
- BulkImport.tsx
- MailForm.tsx
- CLAUDE.md
- NewsletterSettings.tsx
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- mitglied-werden/page.tsx
- mail/actions.ts
- MarkdownEditor.tsx
- DeleteMemberSection
- app/kontakt/page.tsx
- altcha.d.ts
- postcss.config.mjs
- prisma.ts
- passwordStrength.ts
- { GET, POST }
- messages.ts
- app/page.tsx
- sendReport.ts
- bestaetigen/page.tsx
- mailHistory.ts

## God Nodes (most connected - your core abstractions)
1. `next` - 131 edges
2. `cn()` - 91 edges
3. `AppError` - 87 edges
4. `@hugeicons/core-free-icons` - 86 edges
5. `@hugeicons/react` - 86 edges
6. `react` - 75 edges
7. `executeAction()` - 75 edges
8. `requireAdmin()` - 55 edges
9. `isFeatureEnabled()` - 51 edges
10. `Button()` - 47 edges

## Surprising Connections (you probably didn't know these)
- `Befunde vom 2026-10-20` --references--> `siteUrl()`  [INFERRED]
  BETRIEB.md → src/lib/server/siteUrl.ts
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `GET()` --calls--> `siteUrl()`  [EXTRACTED]
  src/app/api/newsletter/abmelden/route.ts → src/lib/server/siteUrl.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts

## Import Cycles
- None detected.

## Communities (94 total, 10 thin omitted)

### Community 0 - "berlinTime.ts"
Cohesion: 0.26
Nodes (15): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+7 more)

### Community 1 - "isFeatureEnabled"
Cohesion: 0.18
Nodes (19): ref_node_net, requestPasswordReset(), resetPassword(), resetSchema, notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage() (+11 more)

### Community 2 - "index.ts"
Cohesion: 0.08
Nodes (40): CtaCard(), SectionHeader(), InfoTooltip(), RateLimitTableProps, chipTones, DirectoryAccount, GROUPS, SortKey (+32 more)

### Community 3 - "layout.ts"
Cohesion: 0.20
Nodes (20): blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml() (+12 more)

### Community 4 - "boardService.ts"
Cohesion: 0.08
Nodes (47): POST(), createDraft(), deleteMember(), deletePhotoAction(), moveMemberInList(), revalidateBoard(), saveMember(), BoardPhotoUploader() (+39 more)

### Community 5 - "feeService.ts"
Cohesion: 0.14
Nodes (23): FeeBreakdown, SepaDebtorAddress, clearFeeAmountOverride(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), resolveIsStudentDefault(), syncStudentYear() (+15 more)

### Community 6 - "userService.ts"
Cohesion: 0.15
Nodes (24): EMAIL_CHANGE_ERRORS, requestPasswordChange(), KontoPage(), deleteUserAction(), EditUserPage(), metadata, updateUser(), updateBankDetails() (+16 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.09
Nodes (36): ref_node_fs, ref_node_os, BACKGROUND, icon(), main(), GET(), GET(), auth (+28 more)

### Community 8 - "LegalPage.tsx"
Cohesion: 0.16
Nodes (14): metadata, impressum(), ImpressumPage(), metadata, SATZUNG, anchorOf(), Block(), LegalPage() (+6 more)

### Community 9 - "blogService.ts"
Cohesion: 0.05
Nodes (72): sharp, POST(), beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt() (+64 more)

### Community 10 - "dashboard/page.tsx"
Cohesion: 0.05
Nodes (54): ref_node_child_process, ref_node_util, GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), MailSuccessDialog(), MembershipCertificateCard() (+46 more)

### Community 11 - "events.ts"
Cohesion: 0.11
Nodes (36): DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, TerminePage(), EventCard() (+28 more)

### Community 12 - "ics.ts"
Cohesion: 0.13
Nodes (25): RFC-5545, sitemap(), GET(), GET(), eventPath(), icsAttachment(), addDays(), berlinDateStamp() (+17 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.11
Nodes (31): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+23 more)

### Community 14 - "UsageChart.tsx"
Cohesion: 0.29
Nodes (6): PAD, PLOT, TICKS, UsageChart(), UsagePoint, VIEW

### Community 15 - "getOptionalUser"
Cohesion: 0.31
Nodes (7): GET(), GET(), GET(), getOptionalUser(), withViewOverride(), findImageBytes(), findPhotoBytes()

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): eslintConfig, name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "executeAction"
Cohesion: 0.10
Nodes (39): zod, setOwnNewsletterAction(), requestEmailChangeAction(), acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), deleteFeeDefaultYear() (+31 more)

### Community 19 - "ServerDashboard.tsx"
Cohesion: 0.17
Nodes (12): triggerDeploy(), BackupHistory(), BackupSection(), DeploySection(), formatUptime(), Sample, ServerDashboard(), timeLabel() (+4 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (31): absent(), addPersonIssues(), AdminCreateUserInput, asDate(), boardDeleteSchema, boardMoveSchema, boardSaveSchema, contactSchema (+23 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "requireAdmin"
Cohesion: 0.08
Nodes (39): deletePost(), savePost(), DeletePostButton(), EditBlogPage(), metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps (+31 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.08
Nodes (25): escapeXml(), GET(), src_app_globals, body, metadata, mono, serif, alt (+17 more)

### Community 24 - "DirectoryTable"
Cohesion: 0.08
Nodes (30): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), explainFee() (+22 more)

### Community 25 - "security/page.tsx"
Cohesion: 0.08
Nodes (47): sparkGeometry, dynamic, metadata, SecurityPage(), ReasonBars(), RegistrationFunnel(), share(), Stage (+39 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "@hugeicons/core-free-icons"
Cohesion: 0.14
Nodes (21): @hugeicons/core-free-icons, @hugeicons/react, react, ContactRequestItem, dateFormat, ActionResult, Mode, DeleteMemberSectionProps (+13 more)

### Community 29 - "membershipFormSchemas.ts"
Cohesion: 0.12
Nodes (22): hasControlChars(), isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, STUDENT_YEAR_LOOKAHEAD (+14 more)

### Community 30 - "paymentHistoryPdf.tsx"
Cohesion: 0.33
Nodes (8): @react-pdf/renderer, GET(), formatAddress(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, getFeeDashboardData()

### Community 31 - "mitglied-werden/actions.ts"
Cohesion: 0.21
Nodes (13): ref_crypto, submitMembershipApplication(), withdrawMembershipApplication(), membershipApplicationNoticeMessage(), membershipReceivedMessage(), getSecurityLogPepper(), markApplicationMailed(), anonymizeSecurityEventsForUser() (+5 more)

### Community 32 - "convert_alumni.py"
Cohesion: 0.26
Nodes (12): datetime, json, re, admin_note(), convert(), day(), main(), phone() (+4 more)

### Community 33 - "newsletterToken.ts"
Cohesion: 0.27
Nodes (10): GET(), POST(), RFC-8058, createNewsletterToken(), key(), NEWSLETTER_UNSUBSCRIBE_PATH, newsletterUnsubscribeUrls(), sign() (+2 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (24): CLOUDS, Contact, KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField() (+16 more)

### Community 35 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

### Community 36 - "AppError"
Cohesion: 0.16
Nodes (21): bcryptjs, deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), AccountDisabledError, CaptchaFailedError (+13 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "next"
Cohesion: 0.06
Nodes (20): nextConfig, next, FeatureFlagsPage(), metadata, dynamic, metadata, DashboardLayout(), metadata (+12 more)

### Community 40 - "zahlungen/page.tsx"
Cohesion: 0.22
Nodes (16): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), BankValues, dynamic, metadata (+8 more)

### Community 41 - "feeCalculation.ts"
Cohesion: 0.29
Nodes (10): billableMonths(), calculateFee(), calculateFeeAmount(), FeeInput, NON_DIRECT_DEBIT_SURCHARGE, toCents(), wasMemberInYear(), withResolvedFees() (+2 more)

### Community 42 - "format.ts"
Cohesion: 0.08
Nodes (28): AdminBlogPage(), MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata (+20 more)

### Community 43 - "EditUserForm.tsx"
Cohesion: 0.08
Nodes (22): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue() (+14 more)

### Community 44 - "Callout"
Cohesion: 0.07
Nodes (39): next-auth, EmailChangeForm(), PasswordChangeButton(), ForgotPasswordPage(), ContactForm(), createLoginChallenge(), FaqItem, LoginFaq() (+31 more)

### Community 45 - "ApplicationWizard.tsx"
Cohesion: 0.09
Nodes (25): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, ApplicationStage(), toDateInput(), PaymentOption() (+17 more)

### Community 46 - "mailService.ts"
Cohesion: 0.17
Nodes (14): sanitize-html, eventContactPath(), ENTITIES, htmlToText(), composeMessage(), eventBlocks(), greeting(), MailTarget (+6 more)

### Community 47 - "membershipService.ts"
Cohesion: 0.17
Nodes (20): dynamic, MembershipApplicationsPage(), metadata, UserManagementPage(), FeeDefaultEntry, FeeRates, planApplicationFees(), resolveFeeDefault() (+12 more)

### Community 48 - "iban.ts"
Cohesion: 0.21
Nodes (20): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+12 more)

### Community 49 - "app/blog/[id]/page.tsx"
Cohesion: 0.16
Nodes (22): generateMetadata(), Props, PublicBlogPost(), BlogIndexPage(), generateMetadata(), LeadPost(), MetaLine(), PostRow() (+14 more)

### Community 50 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 51 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 52 - "Button.tsx"
Cohesion: 0.22
Nodes (8): buttonClasses(), ButtonColor, ButtonLinkProps, ButtonProps, ButtonSize, ButtonVariant, colorClasses, sizeClasses

### Community 53 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (7): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), deleteContactRequest(), setContactRequestHandled()

### Community 54 - "sendEmail"
Cohesion: 0.18
Nodes (21): requestBackupLink(), resendVerificationEmail(), registerUser(), EmailMessage, backupLinkMessage(), registrationConfirmationMessage(), renderEmailText(), getMailTransporter() (+13 more)

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "ApplicationWizard"
Cohesion: 0.70
Nodes (5): ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit()

### Community 57 - "ref_node_assert"
Cohesion: 0.19
Nodes (10): ref_node_assert, ref_node_test, showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule (+2 more)

### Community 58 - "sepa.ts"
Cohesion: 0.22
Nodes (18): field(), POST(), SepaDialog(), isValidBic(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId() (+10 more)

### Community 59 - "rateLimit.ts"
Cohesion: 0.25
Nodes (12): revealKosmosContactAction(), setKosmosVisibilityAction(), consumeRateLimit(), hashKey(), KeyParts, makeStoreKey(), normalizeKeyPart(), now() (+4 more)

### Community 60 - "Footer.tsx"
Cohesion: 0.32
Nodes (5): ContrastToggle(), columns, legalLinks, GravityTrigger(), PluckedString()

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "rateLimitService.ts"
Cohesion: 0.23
Nodes (9): removeRateLimitEntry(), RateLimitTable(), confirmDelete(), bucketFromKey(), deleteRateLimitEntry(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem (+1 more)

### Community 63 - "Site.tsx"
Cohesion: 0.10
Nodes (19): facts, metadata, metadata, dynamic, metadata, SearchParams, ViewSwitch(), getInitials() (+11 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "featureFlagService.ts"
Cohesion: 0.21
Nodes (12): @prisma/client, setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER (+4 more)

### Community 67 - "BulkImport.tsx"
Cohesion: 0.09
Nodes (27): ImportIssue, ImportRowResult, display(), EntryDetails(), FALSE_BY_DEFAULT, ImportReport, EXAMPLE, FEE_FIELDS (+19 more)

### Community 68 - "MailForm.tsx"
Cohesion: 0.08
Nodes (19): MailAnnouncement, byStatusThenName(), MAIL_KINDS, MailForm(), MailFormProps, MailKind, MailUserOption, STATUS_ORDER (+11 more)

### Community 71 - "NewsletterSettings.tsx"
Cohesion: 0.83
Nodes (3): NewsletterRow(), NewsletterSection(), useOwnNewsletter()

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.10
Nodes (35): createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), UPCOMING_ALERT_MONTHS, AnnouncedEvent, createEvent(), deleteEventById() (+27 more)

### Community 77 - "mitglied-werden/page.tsx"
Cohesion: 0.16
Nodes (17): JourneyRail(), dynamic, metadata, MitgliedWerdenPage(), Props, VerifyPanel(), WithdrawApplicationButton(), withdraw() (+9 more)

### Community 78 - "mail/actions.ts"
Cohesion: 0.25
Nodes (12): parseMailForm(), sendEmailAction(), parseDirectMailForm(), sendDirectMailAction(), resolveRecipientEmails(), resolveUsersByIds(), resolveUsersByTarget(), sendMailForTarget() (+4 more)

### Community 79 - "MarkdownEditor.tsx"
Cohesion: 0.40
Nodes (4): @uiw/react-markdown-preview, @uiw/react-md-editor, MarkdownEditor(), MDEditor

### Community 81 - "app/kontakt/page.tsx"
Cohesion: 0.20
Nodes (10): dynamic, KontaktPage(), metadata, dynamic, LoginPage(), metadata, NOTICES, Props (+2 more)

### Community 82 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "prisma.ts"
Cohesion: 0.20
Nodes (15): server-only, GET(), message(), createPrismaClient(), globalForPrisma, consumeAltchaSolution(), readExpiry(), readSignature() (+7 more)

### Community 87 - "passwordStrength.ts"
Cohesion: 0.14
Nodes (17): bulkCreateUsersAction(), BulkImport(), check(), create(), loadFile(), replaceEntry(), NewUserForm(), handleSubmit() (+9 more)

### Community 89 - "messages.ts"
Cohesion: 0.12
Nodes (27): submitContactRequest(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, accountDeletedMessage(), adminCreatedUserMessage(), contactRequestMessage(), emailChangeMessage() (+19 more)

### Community 91 - "app/page.tsx"
Cohesion: 0.15
Nodes (11): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline(), levels, STRIP_IDS (+3 more)

### Community 94 - "sendReport.ts"
Cohesion: 0.47
Nodes (3): describeSendError(), sendEach(), SmtpError

### Community 95 - "bestaetigen/page.tsx"
Cohesion: 0.26
Nodes (9): confirmPrivacyPolicy(), ConfirmPrivacyPolicyPage(), metadata, Props, DATENSCHUTZ, DATENSCHUTZ_VERSION, LogoutButton(), internalPath() (+1 more)

### Community 97 - "mailHistory.ts"
Cohesion: 0.33
Nodes (6): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **476 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+471 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 611 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `isFeatureEnabled`, `index.ts`, `boardService.ts`, `userService.ts`, `serverStatus.ts`, `LegalPage.tsx`, `blogService.ts`, `dashboard/page.tsx`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `getOptionalUser`, `package.json`, `executeAction`, `requireAdmin`, `app/layout.tsx`, `security/page.tsx`, `gravityPhysics.ts`, `@hugeicons/core-free-icons`, `paymentHistoryPdf.tsx`, `mitglied-werden/actions.ts`, `newsletterToken.ts`, `KosmosTimeline.tsx`, `AppError`, `zahlungen/page.tsx`, `format.ts`, `EditUserForm.tsx`, `Callout`, `ApplicationWizard.tsx`, `membershipService.ts`, `app/blog/[id]/page.tsx`, `Button.tsx`, `dashboard/kontakt/actions.ts`, `sendEmail`, `sepa.ts`, `rateLimit.ts`, `Footer.tsx`, `rateLimitService.ts`, `Site.tsx`, `featureFlagService.ts`, `MailForm.tsx`, `NewsletterSettings.tsx`, `eventService.ts`, `mitglied-werden/page.tsx`, `MarkdownEditor.tsx`, `app/kontakt/page.tsx`, `prisma.ts`, `messages.ts`, `app/page.tsx`, `bestaetigen/page.tsx`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/core-free-icons` to `index.ts`, `userService.ts`, `LegalPage.tsx`, `blogService.ts`, `dashboard/page.tsx`, `MarketDiffusion.tsx`, `package.json`, `ServerDashboard.tsx`, `requireAdmin`, `app/layout.tsx`, `gravityPhysics.ts`, `KosmosTimeline.tsx`, `next`, `zahlungen/page.tsx`, `EditUserForm.tsx`, `Callout`, `ApplicationWizard.tsx`, `iban.ts`, `app/blog/[id]/page.tsx`, `Footer.tsx`, `Site.tsx`, `featureFlagService.ts`, `BulkImport.tsx`, `MailForm.tsx`, `NewsletterSettings.tsx`, `eventService.ts`, `MarkdownEditor.tsx`, `altcha.d.ts`, `app/page.tsx`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `AppError` connect `AppError` to `isFeatureEnabled`, `boardService.ts`, `userService.ts`, `serverStatus.ts`, `blogService.ts`, `executeAction`, `mitglied-werden/actions.ts`, `mailService.ts`, `membershipService.ts`, `dashboard/kontakt/actions.ts`, `sendEmail`, `rateLimit.ts`, `rateLimitService.ts`, `featureFlagService.ts`, `eventService.ts`, `mail/actions.ts`, `prisma.ts`, `messages.ts`, `sendReport.ts`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _476 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08367254635911352 - nodes in this community are weakly interconnected._
- **Should `boardService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07966457023060797 - nodes in this community are weakly interconnected._