# Graph Report - wiphy  (2026-10-23)

## Corpus Check
- 359 files · ~172,210 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2064 nodes · 6799 edges · 99 communities (86 shown, 13 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c1e79b2d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- forgot-password/layout.tsx
- feeService.ts
- cn
- mitglied-werden/page.tsx
- errors.ts
- ics.ts
- AppError
- authz.ts
- messages.ts
- blogService.ts
- app/kontakt/page.tsx
- events.ts
- @hugeicons/core-free-icons
- MarketDiffusion.tsx
- feeDefaults.ts
- mitgliedsantraege/page.tsx
- package.json
- dependencies
- boardService.ts
- formatNumber
- schemas.ts
- seed.ts
- blog/actions.ts
- app/layout.tsx
- DirectoryTable
- securityEventService.ts
- security/page.tsx
- gravityPhysics.ts
- kosmos/page.tsx
- OutcomeTimeline.tsx
- countries.ts
- membershipFormSchemas.ts
- convert_alumni.py
- mail/page.tsx
- KosmosTimeline.tsx
- requireDebugAdmin
- zertifikat/pdf/route.ts
- compilerOptions
- devDependencies
- next
- userImport.test.ts
- auth.ts
- feeRepository.ts
- passwordStrength.ts
- ServerDashboard.tsx
- ApplicationWizard.tsx
- mailService.ts
- mitglied-werden/actions.ts
- executeAction
- format.ts
- MailForm.tsx
- ApplicationList
- EditUserForm.tsx
- EventForm.tsx
- userService.ts
- EmailBodyField.tsx
- formatStatus
- EditUserForm
- berlinTime.ts
- isFeatureEnabled
- app/page.tsx
- userUpdateData.ts
- rateLimits.ts
- app/blog/page.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- sendEmail
- membershipCertificate.ts
- index.ts
- app/blog/[id]/page.tsx
- CLAUDE.md
- ref_node_assert
- ActivityHeatmap.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- satzung/page.tsx
- TypeSparklines.tsx
- Footer.tsx
- altcha.d.ts
- DeleteMemberSection
- blogImages.ts
- postcss.config.mjs
- movePostImage
- blogImageProcessing.ts
- terminationService.ts
- { GET, POST }
- feeDefaultService.ts
- dashboard/page.tsx
- ApplicationWizard
- RegistrationFunnel.tsx
- eslint.config.mjs
- login/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 123 edges
2. `cn()` - 89 edges
3. `AppError` - 86 edges
4. `@hugeicons/core-free-icons` - 83 edges
5. `@hugeicons/react` - 83 edges
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
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts
- `EmailChangeForm()` --indirect_call--> `requestEmailChangeAction()`  [INFERRED]
  src/app/dashboard/konto/AccessForms.tsx → src/app/dashboard/konto/actions.ts

## Import Cycles
- None detected.

## Communities (99 total, 13 thin omitted)

### Community 1 - "feeService.ts"
Cohesion: 0.16
Nodes (24): field(), POST(), TIME_ZONE, agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+16 more)

### Community 2 - "cn"
Cohesion: 0.06
Nodes (30): CtaCard(), display(), EntryDetails(), EntryRow(), FALSE_BY_DEFAULT, ImportReport, StatTile(), ShareButton() (+22 more)

### Community 3 - "mitglied-werden/page.tsx"
Cohesion: 0.17
Nodes (17): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), deriveStudentYears() (+9 more)

### Community 4 - "errors.ts"
Cohesion: 0.18
Nodes (11): zod, createUserAction(), importEntriesSchema, ImportIssue, ImportRowResult, getRedirectTarget(), isRedirectError(), RedirectTarget (+3 more)

### Community 5 - "ics.ts"
Cohesion: 0.17
Nodes (17): RFC-5545, GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), calendar(), describe() (+9 more)

### Community 6 - "AppError"
Cohesion: 0.12
Nodes (37): EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), KontoPage(), revealKosmosEmailAction(), acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant() (+29 more)

### Community 7 - "authz.ts"
Cohesion: 0.05
Nodes (61): ref_node_child_process, ref_node_os, ref_node_util, GET(), GET(), GET(), GET(), GET() (+53 more)

### Community 8 - "messages.ts"
Cohesion: 0.12
Nodes (24): confirmMembershipTermination(), statusMeta(), TerminationList(), confirm(), accountDeletedMessage(), adminCreatedUserMessage(), feeReminderMessage(), greeting() (+16 more)

### Community 9 - "blogService.ts"
Cohesion: 0.10
Nodes (35): POST(), BlogIndexPage(), EditBlogPage(), AdminBlogPage(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost() (+27 more)

### Community 10 - "app/kontakt/page.tsx"
Cohesion: 0.14
Nodes (14): ContactForm(), dynamic, KontaktPage(), metadata, createLoginChallenge(), LoginForm(), dynamic, LoginPage() (+6 more)

### Community 11 - "events.ts"
Cohesion: 0.12
Nodes (38): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard() (+30 more)

### Community 12 - "@hugeicons/core-free-icons"
Cohesion: 0.11
Nodes (25): @hugeicons/core-free-icons, react, DeletePostButton(), ContactRequestItem, dateFormat, TerminationItem, DialogButton(), ActionResult (+17 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (32): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+24 more)

### Community 14 - "feeDefaults.ts"
Cohesion: 0.31
Nodes (8): calculateFee(), FeeDefaultEntry, FeeRates, planApplicationFees(), resolveFeeDefault(), withResolvedFees(), toDashboardFee(), defaults

### Community 15 - "mitgliedsantraege/page.tsx"
Cohesion: 0.19
Nodes (17): dynamic, MembershipApplicationsPage(), metadata, isTerminationDue(), countOpenApplications(), deleteApplication(), findApplicationById(), findApplications() (+9 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "boardService.ts"
Cohesion: 0.05
Nodes (58): POST(), BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), EditBoardMemberPage(), AdminBoardPage(), DATENSCHUTZ (+50 more)

### Community 19 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 20 - "schemas.ts"
Cohesion: 0.05
Nodes (52): toCountryCode(), hasControlChars(), isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS (+44 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "blog/actions.ts"
Cohesion: 0.21
Nodes (15): beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager(), handleDrop() (+7 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.09
Nodes (23): ref_node_fs, escapeXml(), GET(), DashboardLayout(), metadata, src_app_globals, body, metadata (+15 more)

### Community 24 - "DirectoryTable"
Cohesion: 0.10
Nodes (25): compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase (+17 more)

### Community 25 - "securityEventService.ts"
Cohesion: 0.15
Nodes (19): SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), emptyCounts() (+11 more)

### Community 26 - "security/page.tsx"
Cohesion: 0.26
Nodes (10): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+2 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "kosmos/page.tsx"
Cohesion: 0.25
Nodes (11): setKosmosVisibilityAction(), KosmosVisibility(), dynamic, KosmosPage(), metadata, toYear(), countKosmosMembers(), getKosmosMembers() (+3 more)

### Community 29 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (12): columnPath(), labelStride(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline(), PAD (+4 more)

### Community 30 - "countries.ts"
Cohesion: 0.15
Nodes (17): SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS, countryName(), DEFAULT_COUNTRY (+9 more)

### Community 31 - "membershipFormSchemas.ts"
Cohesion: 0.17
Nodes (24): SepaDialog(), ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS (+16 more)

### Community 32 - "convert_alumni.py"
Cohesion: 0.22
Nodes (14): datetime, json, re, admin_note(), convert(), day(), fees(), main() (+6 more)

### Community 33 - "mail/page.tsx"
Cohesion: 0.19
Nodes (12): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, sitemap() (+4 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.22
Nodes (12): KosmosTimeline(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen(), years(), endOf() (+4 more)

### Community 35 - "requireDebugAdmin"
Cohesion: 0.20
Nodes (11): removeRateLimitEntry(), RateLimitTable(), confirmDelete(), showInfo(), requireDebugAdmin(), bucketFromKey(), deleteRateLimitEntry(), getRateLimitEntries() (+3 more)

### Community 36 - "zertifikat/pdf/route.ts"
Cohesion: 0.20
Nodes (16): @react-pdf/renderer, GET(), GET(), DashboardPage(), berlinYear(), certificateFacts, certificateNumber(), isCertifiableStatus() (+8 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "next"
Cohesion: 0.11
Nodes (25): nextConfig, @hugeicons/react, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+17 more)

### Community 40 - "userImport.test.ts"
Cohesion: 0.24
Nodes (9): EXAMPLE, FEE_FIELDS, FEES_EXAMPLE, IMPORT_EXCLUDED_FIELDS, IMPORT_KEYS, IMPORT_SECTIONS, ImportEntry, ImportField (+1 more)

### Community 41 - "auth.ts"
Cohesion: 0.11
Nodes (22): server-only, GET(), message(), AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers (+14 more)

### Community 42 - "feeRepository.ts"
Cohesion: 0.21
Nodes (12): calculateFeeAmount(), archiveFeesOfUser(), clearFeeAmountOverride(), findFeeLiableUsers(), findUsersWithFees(), resolveIsStudentDefault(), syncStudentYear(), updateFeeComment() (+4 more)

### Community 43 - "passwordStrength.ts"
Cohesion: 0.15
Nodes (16): bulkCreateUsersAction(), BulkImport(), check(), create(), loadFile(), replaceEntry(), NewUserForm(), handleSubmit() (+8 more)

### Community 44 - "ServerDashboard.tsx"
Cohesion: 0.07
Nodes (41): next-auth, BackupSection(), DeploySection(), formatBytes(), formatUptime(), Sample, ServerDashboard(), timeLabel() (+33 more)

### Community 45 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (24): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, ageAt(), CONSENT_VERSION, DATENSCHUTZ_URL (+16 more)

### Community 46 - "mailService.ts"
Cohesion: 0.07
Nodes (48): sanitize-html, parseMailForm(), sendEmailAction(), blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailMessage (+40 more)

### Community 47 - "mitglied-werden/actions.ts"
Cohesion: 0.16
Nodes (19): submitContactRequest(), submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD (+11 more)

### Community 48 - "executeAction"
Cohesion: 0.12
Nodes (41): createDraft(), deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run() (+33 more)

### Community 49 - "format.ts"
Cohesion: 0.17
Nodes (11): AccountSection(), DATE_TIME, EURO, formatDateShort(), formatDateTime(), LONG_DATE, NUMBER, SHORT_DATE (+3 more)

### Community 50 - "MailForm.tsx"
Cohesion: 0.13
Nodes (13): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, EmailBodyField(), useEmailEditor() (+5 more)

### Community 51 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 52 - "EditUserForm.tsx"
Cohesion: 0.09
Nodes (16): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP (+8 more)

### Community 53 - "EventForm.tsx"
Cohesion: 0.32
Nodes (5): toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), MarkdownEditor()

### Community 54 - "userService.ts"
Cohesion: 0.11
Nodes (48): bcryptjs, ref_crypto, requestPasswordReset(), resendVerificationEmail(), registerUser(), resetPassword(), resetSchema, notifyAdminsAboutRegistration() (+40 more)

### Community 55 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 56 - "formatStatus"
Cohesion: 0.19
Nodes (7): byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, formatStatus(), getStatusTone()

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "berlinTime.ts"
Cohesion: 0.32
Nodes (13): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+5 more)

### Community 59 - "isFeatureEnabled"
Cohesion: 0.21
Nodes (12): @prisma/client, setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER (+4 more)

### Community 60 - "app/page.tsx"
Cohesion: 0.13
Nodes (17): LeadPost(), categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline(), HomePage() (+9 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "rateLimits.ts"
Cohesion: 0.38
Nodes (5): describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 63 - "app/blog/page.tsx"
Cohesion: 0.09
Nodes (22): generateMetadata(), MetaLine(), PostRow(), Props, facts, metadata, metadata, dynamic (+14 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "sendEmail"
Cohesion: 0.25
Nodes (12): requestBackupLink(), triggerDeploy(), backupLinkMessage(), getMailTransporter(), normalize(), Recipients, sendEmail(), getSmtpConfig() (+4 more)

### Community 67 - "membershipCertificate.ts"
Cohesion: 0.29
Nodes (10): CertificateFee, CertificateStatus, dative(), formatMembershipDuration(), formatMembershipDurationDative(), formatPaidYears(), membershipDuration, paidCoverage (+2 more)

### Community 68 - "index.ts"
Cohesion: 0.09
Nodes (39): InfoTooltip(), RateLimitTableProps, DeleteEventButton(), dynamic, metadata, AmountDialog(), chipTones, CommentDialog() (+31 more)

### Community 69 - "app/blog/[id]/page.tsx"
Cohesion: 0.17
Nodes (17): react-markdown, remark-gfm, generateMetadata(), Props, PublicBlogPost(), GET(), MarkdownViewer(), shiftedHeadings (+9 more)

### Community 71 - "ref_node_assert"
Cohesion: 0.14
Nodes (11): ref_node_assert, ref_node_net, ref_node_test, addressKey(), HeaderBag, ADMIN_SESSION_MAX_MS, adminSessionExpired(), one (+3 more)

### Community 72 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.12
Nodes (31): EditEventPage(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById(), EventWriteData, findAllEvents(), findEventById(), findEventOptions() (+23 more)

### Community 77 - "satzung/page.tsx"
Cohesion: 0.17
Nodes (18): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), dynamic, metadata (+10 more)

### Community 78 - "TypeSparklines.tsx"
Cohesion: 0.33
Nodes (8): longDayLabel(), sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 79 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 82 - "blogImages.ts"
Cohesion: 0.28
Nodes (7): ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageVariant, formatBytes(), MAX_ADDITIONAL_BLOG_IMAGES, MAX_BLOG_IMAGES, moveInOrder()

### Community 85 - "movePostImage"
Cohesion: 0.33
Nodes (9): applyImageOrder(), deleteImage(), findImageForPost(), findImagesForPost(), movePostImage(), orderedIds(), removePostImage(), requireImage() (+1 more)

### Community 86 - "blogImageProcessing.ts"
Cohesion: 0.18
Nodes (9): sharp, BACKGROUND, icon(), main(), MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, processBlogImage(), ProcessedBlogImage (+1 more)

### Community 87 - "terminationService.ts"
Cohesion: 0.17
Nodes (14): EditUserPage(), UserManagementPage(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS, feeRetentionCutoffYear(), TERMINATION_RECORD_RETENTION_YEARS, terminationDate(), pruneArchivedFees() (+6 more)

### Community 89 - "feeDefaultService.ts"
Cohesion: 0.46
Nodes (6): deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeRatesForYear(), removeFeeDefault(), setFeeDefault()

### Community 91 - "dashboard/page.tsx"
Cohesion: 0.22
Nodes (7): MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, QueryParamDialog(), SectionHeader(), LogoutButton(), formatDate()

### Community 92 - "ApplicationWizard"
Cohesion: 0.70
Nodes (5): ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit()

### Community 94 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 95 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **464 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+459 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 597 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `forgot-password/layout.tsx`, `feeService.ts`, `cn`, `mitglied-werden/page.tsx`, `errors.ts`, `ics.ts`, `AppError`, `authz.ts`, `messages.ts`, `app/kontakt/page.tsx`, `events.ts`, `@hugeicons/core-free-icons`, `MarketDiffusion.tsx`, `mitgliedsantraege/page.tsx`, `package.json`, `boardService.ts`, `blog/actions.ts`, `app/layout.tsx`, `security/page.tsx`, `gravityPhysics.ts`, `kosmos/page.tsx`, `mail/page.tsx`, `KosmosTimeline.tsx`, `requireDebugAdmin`, `zertifikat/pdf/route.ts`, `auth.ts`, `ServerDashboard.tsx`, `ApplicationWizard.tsx`, `mailService.ts`, `mitglied-werden/actions.ts`, `executeAction`, `MailForm.tsx`, `EditUserForm.tsx`, `EventForm.tsx`, `userService.ts`, `isFeatureEnabled`, `app/page.tsx`, `app/blog/page.tsx`, `index.ts`, `app/blog/[id]/page.tsx`, `satzung/page.tsx`, `Footer.tsx`, `dashboard/page.tsx`, `login/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.186) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/core-free-icons` to `cn`, `authz.ts`, `blogService.ts`, `MarketDiffusion.tsx`, `package.json`, `boardService.ts`, `app/layout.tsx`, `gravityPhysics.ts`, `membershipFormSchemas.ts`, `KosmosTimeline.tsx`, `next`, `ServerDashboard.tsx`, `ApplicationWizard.tsx`, `MailForm.tsx`, `EditUserForm.tsx`, `EventForm.tsx`, `isFeatureEnabled`, `app/page.tsx`, `app/blog/page.tsx`, `index.ts`, `eventService.ts`, `Footer.tsx`, `altcha.d.ts`, `dashboard/page.tsx`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `AppError` connect `AppError` to `errors.ts`, `authz.ts`, `messages.ts`, `blogService.ts`, `mitgliedsantraege/page.tsx`, `boardService.ts`, `requireDebugAdmin`, `next`, `auth.ts`, `mailService.ts`, `mitglied-werden/actions.ts`, `executeAction`, `userService.ts`, `isFeatureEnabled`, `sendEmail`, `eventService.ts`, `movePostImage`, `blogImageProcessing.ts`, `terminationService.ts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _464 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.06382978723404255 - nodes in this community are weakly interconnected._
- **Should `AppError` be split into smaller, more focused modules?**
  _Cohesion score 0.11738648947951273 - nodes in this community are weakly interconnected._