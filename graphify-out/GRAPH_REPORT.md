# Graph Report - wiphy  (2026-11-09)

## Corpus Check
- 401 files · ~196,961 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2251 nodes · 7326 edges · 113 communities (103 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1165d8e5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- executeAction
- next
- index.ts
- mailService.ts
- boardService.ts
- feeService.ts
- toggleAllDay
- serverStatus.ts
- anleitungen/README.md
- blog/actions.ts
- app/blog/[id]/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- ServerDashboard.tsx
- zertifikat/pdf/route.ts
- package.json
- dependencies
- messages.ts
- lib/siteUrl.ts
- schemas.ts
- seed.ts
- zahlungen/page.tsx
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- MemberDirectory.tsx
- membershipService.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- membership.ts
- Beiträge
- users/page.tsx
- contact.ts
- campus-plan.py
- satzung/page.tsx
- KosmosTimeline.tsx
- security/page.tsx
- @hugeicons/core-free-icons
- compilerOptions
- devDependencies
- passwordStrength.ts
- Deployment (Hetzner Cloud / Ubuntu)
- Technik
- membershipFormSchemas.ts
- app/layout.tsx
- useActionForm
- isDebugMode
- berlinTime.ts
- blogService.ts
- iban.ts
- Konten
- MailForm.tsx
- DirectoryTable.tsx
- AppError
- prisma.ts
- Betrieb: Checkliste für den Produktionsserver
- EditUserForm
- dashboard/page.tsx
- securityLabels.ts
- countries.ts
- authz.ts
- heliFlight.test.ts
- userUpdateData.ts
- sepa.ts
- Site.tsx
- scripts
- Technische Dokumentation
- featureFlagService.ts
- ApplicationWizard.tsx
- PhysicsTimeline.tsx
- blogImageProcessing.ts
- CLAUDE.md
- Kommunikation
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- mitglied-werden/page.tsx
- ProfileSummary.tsx
- getOptionalUser
- DeleteMemberSection
- Mitgliedschaft
- altcha.d.ts
- postcss.config.mjs
- mailer.ts
- securityEventService.ts
- userService.ts
- { GET, POST }
- BulkImport.tsx
- Inhalte der Website
- Funktionen im Detail
- feature-flags/page.tsx
- getEditableUser
- blogRepository.ts
- movePostImage
- RateLimitTable
- ActivityHeatmap.tsx
- cn
- Footer.tsx
- opengraph-image.tsx
- formatNumber
- formatDate
- TypeSparklines.tsx
- eslint.config.mjs
- ref_node_assert
- blogImages.ts
- ApplicationList
- bulkCreateUsersAction
- CampusPlan.tsx
- isFeatureEnabled
- guides.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 135 edges
2. `cn()` - 93 edges
3. `AppError` - 91 edges
4. `@hugeicons/core-free-icons` - 90 edges
5. `@hugeicons/react` - 90 edges
6. `react` - 80 edges
7. `executeAction()` - 76 edges
8. `requireAdmin()` - 59 edges
9. `isFeatureEnabled()` - 51 edges
10. `Button()` - 50 edges

## Surprising Connections (you probably didn't know these)
- `Befunde vom 2026-10-20` --references--> `siteUrl()`  [INFERRED]
  BETRIEB.md → src/lib/server/siteUrl.ts
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  ENTWICKLUNG.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `GET()` --calls--> `siteUrl()`  [EXTRACTED]
  src/app/api/newsletter/abmelden/route.ts → src/lib/server/siteUrl.ts
- `StudentStatusPrompt()` --indirect_call--> `setStudentEndYearAction()`  [INFERRED]
  src/app/dashboard/StudentStatusPrompt.tsx → src/app/dashboard/actions.ts

## Import Cycles
- None detected.

## Communities (113 total, 10 thin omitted)

### Community 0 - "executeAction"
Cohesion: 0.11
Nodes (33): zod, deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), ContactRequestsPage(), createEventDraft(), deleteEventAction() (+25 more)

### Community 1 - "next"
Cohesion: 0.07
Nodes (16): nextConfig, next, metadata, metadata, metadata, levels, STRIP_IDS, STUDY_PROGRAMS (+8 more)

### Community 2 - "index.ts"
Cohesion: 0.12
Nodes (28): metadata, DashboardPageHeader(), DashboardPageHeaderProps, dynamic, metadata, InfoTooltip(), RateLimitTableProps, BackupHistory() (+20 more)

### Community 3 - "mailService.ts"
Cohesion: 0.05
Nodes (62): sanitize-html, GET(), POST(), RFC-8058, parseMailForm(), sendEmailAction(), blockHtml(), blockText() (+54 more)

### Community 4 - "boardService.ts"
Cohesion: 0.06
Nodes (60): POST(), GET(), deleteMember(), deletePhotoAction(), moveMemberInList(), revalidateBoard(), saveMember(), BoardPhotoUploader() (+52 more)

### Community 5 - "feeService.ts"
Cohesion: 0.17
Nodes (24): initializeBillingYear(), FeeBreakdown, wasMemberInYear(), clearFeeAmountOverride(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), setStudentYear() (+16 more)

### Community 6 - "toggleAllDay"
Cohesion: 0.40
Nodes (5): toggleAllDay(), toDateTimeValue(), toDayValue(), end(), offset()

### Community 7 - "serverStatus.ts"
Cohesion: 0.11
Nodes (28): ref_node_os, BackupRun, BackupStatus, cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG (+20 more)

### Community 8 - "anleitungen/README.md"
Cohesion: 0.36
Nodes (3): Anleitungen für Admins, Einstieg, Gut zu wissen

### Community 9 - "blog/actions.ts"
Cohesion: 0.16
Nodes (20): beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager() (+12 more)

### Community 10 - "app/blog/[id]/page.tsx"
Cohesion: 0.12
Nodes (26): generateMetadata(), Props, PublicBlogPost(), generateMetadata(), LeadPost(), PostRow(), Props, EditBlogPage() (+18 more)

### Community 11 - "events.ts"
Cohesion: 0.13
Nodes (35): DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard(), EventCardData (+27 more)

### Community 12 - "ics.ts"
Cohesion: 0.16
Nodes (20): RFC-5545, GET(), GET(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), buildEventIcs() (+12 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.12
Nodes (30): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), deriv() (+22 more)

### Community 14 - "ServerDashboard.tsx"
Cohesion: 0.19
Nodes (11): triggerDeploy(), BackupSection(), DeploySection(), formatUptime(), Sample, ServerDashboard(), timeLabel(), formatBytes() (+3 more)

### Community 15 - "zertifikat/pdf/route.ts"
Cohesion: 0.18
Nodes (21): GET(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDuration() (+13 more)

### Community 16 - "package.json"
Cohesion: 0.08
Nodes (24): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+16 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "messages.ts"
Cohesion: 0.14
Nodes (26): submitMembershipApplication(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw(), accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage(), exitMessage() (+18 more)

### Community 19 - "lib/siteUrl.ts"
Cohesion: 0.15
Nodes (14): escapeXml(), GET(), DashboardLayout(), metadata, BlogPostingJsonLd(), EventJsonLd(), OrganizationJsonLd(), getPublishedPosts() (+6 more)

### Community 20 - "schemas.ts"
Cohesion: 0.07
Nodes (26): absent(), AdminCreateUserInput, contactSchema, directMailSchema, emailChangeSchema, emailField, eventDeleteSchema, feeAmountUpdateSchema (+18 more)

### Community 21 - "seed.ts"
Cohesion: 0.40
Nodes (3): adapter, prisma, @prisma/adapter-pg

### Community 22 - "zahlungen/page.tsx"
Cohesion: 0.13
Nodes (30): deleteFeeDefaultYear(), saveFeeDefault(), FeeDefaultRow, FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit() (+22 more)

### Community 23 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.25
Nodes (6): Datenschutz und Sicherheit, Für Besucher:innen, Für den Vorstand, Für Mitglieder, Weiterlesen, WirtschaftsPhysik Alumni e. V. — Vereinswebsite

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.09
Nodes (31): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryAccount, DirectoryTable(), selectAllWithOpenFees(), displayName() (+23 more)

### Community 25 - "membershipService.ts"
Cohesion: 0.13
Nodes (26): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), dynamic, MembershipApplicationsPage(), metadata, planApplicationFees() (+18 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "membership.ts"
Cohesion: 0.19
Nodes (19): setStudentEndYearAction(), StudentStatusEditor(), ageAt(), changedStudentYears(), currentStudentEndYear(), formatYearRanges(), isOldEnough(), MEMBER_STUDENT_LOOKAHEAD (+11 more)

### Community 29 - "Beiträge"
Cohesion: 0.20
Nodes (10): Ausnahme (abweichender Betrag), Beitragsjahr hinzufügen, Beitragssätze, Beiträge, Hinweis „Erst x von y Mitgliedern haben einen Beitragseintrag“, SEPA-Lastschrift, So rechnet die Website, Sonderstatus umschalten (+2 more)

### Community 30 - "users/page.tsx"
Cohesion: 0.15
Nodes (20): AddFeeYearCard(), DialogButton(), metadata, StatTile(), UserManagementPage(), FeeDefaultEntry, FeeRates, resolveFeeDefault() (+12 more)

### Community 31 - "contact.ts"
Cohesion: 0.24
Nodes (7): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ContactInput, scoreSpam(), SPAM_KEYWORDS, legitimate

### Community 32 - "campus-plan.py"
Cohesion: 0.10
Nodes (29): datetime, json, math, pathlib, re, d(), main(), outer_rings() (+21 more)

### Community 33 - "satzung/page.tsx"
Cohesion: 0.12
Nodes (20): metadata, Props, DATENSCHUTZ, metadata, impressum(), ImpressumPage(), metadata, dynamic (+12 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (23): CLOUDS, Contact, KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField() (+15 more)

### Community 35 - "security/page.tsx"
Cohesion: 0.09
Nodes (32): AdminBlogPage(), ContactRequestList(), confirmDelete(), run(), dynamic, metadata, SecurityPage(), buttonClasses() (+24 more)

### Community 36 - "@hugeicons/core-free-icons"
Cohesion: 0.11
Nodes (26): @hugeicons/core-free-icons, @hugeicons/react, react, DeletePostButton(), ContactRequestItem, dateFormat, ApplicationItem, dateFormat (+18 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "passwordStrength.ts"
Cohesion: 0.19
Nodes (10): NewUserForm(), handleSubmit(), PasswordStrengthMeter(), evaluatePassword(), generatePassword(), PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 40 - "Deployment (Hetzner Cloud / Ubuntu)"
Cohesion: 0.29
Nodes (7): Automatische Updates bei jedem Git Push (GitHub Actions), Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, nginx als Reverse Proxy, Option 1: Automatischer Einzeiler über deinen lokalen Rechner (Empfohlen), Option 2: Manuelles Ausführen auf dem Server

### Community 41 - "Technik"
Cohesion: 0.20
Nodes (9): Backup, Debug-Modus, Deploy, Feature Flags, Notfall-Rezepte, Rate-Limit-Sperre aufheben, Server, Sicherheit (+1 more)

### Community 42 - "membershipFormSchemas.ts"
Cohesion: 0.10
Nodes (27): hasControlChars(), isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, MINOR_HINT (+19 more)

### Community 43 - "app/layout.tsx"
Cohesion: 0.19
Nodes (9): src_app_globals, body, metadata, mono, serif, DebugBar(), Header(), InstallHint() (+1 more)

### Community 44 - "useActionForm"
Cohesion: 0.07
Nodes (40): next-auth, EmailChangeForm(), PasswordChangeButton(), dynamic, metadata, StudentStatusPrompt(), ForgotPasswordPage(), ContactForm() (+32 more)

### Community 45 - "isDebugMode"
Cohesion: 0.57
Nodes (5): GET(), GET(), auth, isDebugMode(), getAppLogs()

### Community 46 - "berlinTime.ts"
Cohesion: 0.24
Nodes (16): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+8 more)

### Community 47 - "blogService.ts"
Cohesion: 0.16
Nodes (19): POST(), MAX_BLOG_IMAGE_UPLOAD_BYTES, processBlogImage(), countImagesForPost(), deletePostById(), findPostById(), insertImage(), postExists() (+11 more)

### Community 48 - "iban.ts"
Cohesion: 0.23
Nodes (20): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+12 more)

### Community 49 - "Konten"
Cohesion: 0.22
Nodes (9): Benutzerverwaltung, Konten, Konto bearbeiten, Konto löschen, Konto von Hand anlegen, Login sperren, Suche und Filter, Symbole und Badges am Namen (+1 more)

### Community 50 - "MailForm.tsx"
Cohesion: 0.09
Nodes (20): @tiptap/react, MAIL_KINDS, MailFormProps, MailKind, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS (+12 more)

### Community 51 - "DirectoryTable.tsx"
Cohesion: 0.09
Nodes (29): metadata, EventFormData, chipTones, GROUPS, SortKey, StatusChip(), ADMIN_ONLY_KEYS, FIELD_LABELS (+21 more)

### Community 52 - "AppError"
Cohesion: 0.21
Nodes (17): removeRateLimitEntry(), requestBackupLink(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), signOut (+9 more)

### Community 53 - "prisma.ts"
Cohesion: 0.09
Nodes (54): bcryptjs, ref_crypto, ref_node_net, EMAIL_CHANGE_ERRORS, requestPasswordChange(), requestPasswordReset(), resendVerificationEmail(), registerUser() (+46 more)

### Community 54 - "Betrieb: Checkliste für den Produktionsserver"
Cohesion: 0.29
Nodes (7): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "dashboard/page.tsx"
Cohesion: 0.15
Nodes (11): CtaCard(), MailSuccessDialog(), MembershipCertificateCard(), ADMIN_ACTIONS, DashboardPage(), QueryParamDialog(), SectionHeader(), LogoutButton() (+3 more)

### Community 57 - "securityLabels.ts"
Cohesion: 0.20
Nodes (10): ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS, TYPE_ORDER, SecurityEventOutcome (+2 more)

### Community 58 - "countries.ts"
Cohesion: 0.15
Nodes (18): display(), EntryDetails(), SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS (+10 more)

### Community 59 - "authz.ts"
Cohesion: 0.16
Nodes (17): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), commit, LINKS, TIME (+9 more)

### Community 60 - "heliFlight.test.ts"
Cohesion: 0.18
Nodes (18): Helicopter(), HINTS, hitsContent(), KEYS, approach(), Bounds, clamp(), CRASH_SPEED (+10 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "sepa.ts"
Cohesion: 0.23
Nodes (16): field(), POST(), TIME_ZONE, agent(), buildPain008(), CREDITOR_ID_PATTERN, isoDate(), isValidCreditorId() (+8 more)

### Community 63 - "Site.tsx"
Cohesion: 0.13
Nodes (13): facts, metadata, metadata, dynamic, metadata, SearchParams, ViewSwitch(), LorenzAttractor (+5 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "Technische Dokumentation"
Cohesion: 0.17
Nodes (12): Backup & Wiederherstellung, Datenbankmodell, Feature Flags, Inhalt, Projektstruktur, Schnellstart, Sicherheitsmechanismen, Technische Dokumentation (+4 more)

### Community 66 - "featureFlagService.ts"
Cohesion: 0.36
Nodes (7): @prisma/client, FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, PAGE_FLAGS, FeatureFlagWithMeta

### Community 67 - "ApplicationWizard.tsx"
Cohesion: 0.12
Nodes (12): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, PaymentOption(), CONSENT_VERSION, DATENSCHUTZ_URL (+4 more)

### Community 68 - "PhysicsTimeline.tsx"
Cohesion: 0.27
Nodes (6): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline()

### Community 69 - "blogImageProcessing.ts"
Cohesion: 0.20
Nodes (7): sharp, BACKGROUND, icon(), main(), ImageBytes, ProcessedBlogImage, QUALITY_LADDER

### Community 71 - "Kommunikation"
Cohesion: 0.33
Nodes (6): Kommunikation, Kontaktanfragen, Newsletter oder Mitteilung?, Platzhalter, Rundmail verschicken, Zu einem Termin einladen

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.08
Nodes (40): MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata (+32 more)

### Community 77 - "mitglied-werden/page.tsx"
Cohesion: 0.17
Nodes (16): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), JOURNEY_STEPS (+8 more)

### Community 78 - "ProfileSummary.tsx"
Cohesion: 0.18
Nodes (8): byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, EntryRow(), formatStatus(), getStatusTone()

### Community 79 - "getOptionalUser"
Cohesion: 0.13
Nodes (17): GET(), confirmPrivacyPolicy(), ConfirmPrivacyPolicyPage(), DATENSCHUTZ_VERSION, dynamic, KontaktPage(), metadata, dynamic (+9 more)

### Community 81 - "Mitgliedschaft"
Cohesion: 0.33
Nodes (6): Ablauf einer Aufnahme, Antrag bearbeiten, Austritt von Hand eintragen, Austritte, Mitgliedschaft, Studierendenstatus

### Community 82 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "mailer.ts"
Cohesion: 0.15
Nodes (19): server-only, GET(), message(), EmailMessage, createPrismaClient(), consumeAltchaSolution(), readExpiry(), readSignature() (+11 more)

### Community 86 - "securityEventService.ts"
Cohesion: 0.20
Nodes (9): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, DayBucket, HeatCell, OutcomeCounts, RecentEvent, SecurityOverview, WINDOW_DAYS (+1 more)

### Community 87 - "userService.ts"
Cohesion: 0.22
Nodes (12): setOwnNewsletterAction(), setNewsletterByTokenAction(), findUserById(), findUserByMemberNumberExcludingUser(), updateUserById(), berlinToday(), removeMembershipByAdmin(), CreateUserInput (+4 more)

### Community 89 - "BulkImport.tsx"
Cohesion: 0.16
Nodes (13): ImportIssue, ImportRowResult, FALSE_BY_DEFAULT, ImportReport, EXAMPLE, FEE_FIELDS, FEES_EXAMPLE, IMPORT_EXCLUDED_FIELDS (+5 more)

### Community 91 - "Inhalte der Website"
Cohesion: 0.40
Nodes (5): Bilder, Blog, Inhalte der Website, Termine, Vorstand und Signatur

### Community 92 - "Funktionen im Detail"
Cohesion: 0.40
Nodes (5): Admin-Dashboard, Authentifizierung & Konten, Funktionen im Detail, Mitgliederbereich (`/dashboard`), Öffentlicher Bereich

### Community 93 - "feature-flags/page.tsx"
Cohesion: 0.24
Nodes (10): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), metadata, ServerPage(), isFeatureFlagKey(), requireDebugAdmin() (+2 more)

### Community 94 - "getEditableUser"
Cohesion: 0.29
Nodes (9): @react-pdf/renderer, GET(), formatAddress(), PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee (+1 more)

### Community 95 - "blogRepository.ts"
Cohesion: 0.15
Nodes (13): GET(), BlogIndexPage(), BlogImageRow, BlogPostWriteData, eventLinkSelect, findAllPosts(), findImageBytes(), findPublishedPostById() (+5 more)

### Community 96 - "movePostImage"
Cohesion: 0.25
Nodes (10): moveInOrder(), applyImageOrder(), deleteImage(), findImageForPost(), findImagesForPost(), movePostImage(), orderedIds(), removePostImage() (+2 more)

### Community 97 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 98 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 99 - "cn"
Cohesion: 0.08
Nodes (28): NewsletterRow(), NewsletterSection(), useOwnNewsletter(), ShareButton(), share(), BadgeTone, toneClasses, ButtonColor (+20 more)

### Community 100 - "Footer.tsx"
Cohesion: 0.28
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 101 - "opengraph-image.tsx"
Cohesion: 0.20
Nodes (7): dotenv, ref_node_fs, ref_node_path, prisma, alt, contentType, size

### Community 102 - "formatNumber"
Cohesion: 0.13
Nodes (17): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+9 more)

### Community 103 - "formatDate"
Cohesion: 0.28
Nodes (6): MetaLine(), statusMeta(), TerminationItem, TerminationList(), AccountSection(), formatDate()

### Community 104 - "TypeSparklines.tsx"
Cohesion: 0.36
Nodes (7): sparkGeometry, typeHint(), typeLabel, SPARK, TypeCard(), TypeSparklines(), TypeStat

### Community 105 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 106 - "ref_node_assert"
Cohesion: 0.20
Nodes (8): ref_node_assert, ref_node_test, ADMIN_SESSION_MAX_MS, adminSessionExpired(), one, two, base, directDebit

### Community 107 - "blogImages.ts"
Cohesion: 0.29
Nodes (6): ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, MAX_ADDITIONAL_BLOG_IMAGES, MAX_BLOG_IMAGES

### Community 108 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 109 - "bulkCreateUsersAction"
Cohesion: 0.60
Nodes (6): bulkCreateUsersAction(), BulkImport(), check(), create(), loadFile(), replaceEntry()

### Community 119 - "isFeatureEnabled"
Cohesion: 0.14
Nodes (27): requestEmailChangeAction(), KontoPage(), revealKosmosContactAction(), setKosmosVisibilityAction(), deleteUserAction(), EditUserPage(), metadata, updateUser() (+19 more)

### Community 122 - "guides.tsx"
Cohesion: 0.23
Nodes (13): react-markdown, anchoredHeading(), components, findGuide(), GuideMarkdown(), GUIDES, readGuide(), slugify() (+5 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **525 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+520 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 666 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `executeAction`, `index.ts`, `mailService.ts`, `boardService.ts`, `feeService.ts`, `blog/actions.ts`, `app/blog/[id]/page.tsx`, `events.ts`, `ics.ts`, `zertifikat/pdf/route.ts`, `package.json`, `messages.ts`, `lib/siteUrl.ts`, `zahlungen/page.tsx`, `MemberDirectory.tsx`, `membershipService.ts`, `gravityPhysics.ts`, `users/page.tsx`, `satzung/page.tsx`, `KosmosTimeline.tsx`, `security/page.tsx`, `@hugeicons/core-free-icons`, `app/layout.tsx`, `useActionForm`, `isDebugMode`, `blogService.ts`, `MailForm.tsx`, `DirectoryTable.tsx`, `AppError`, `prisma.ts`, `dashboard/page.tsx`, `authz.ts`, `sepa.ts`, `Site.tsx`, `featureFlagService.ts`, `ApplicationWizard.tsx`, `eventService.ts`, `mitglied-werden/page.tsx`, `ProfileSummary.tsx`, `getOptionalUser`, `mailer.ts`, `feature-flags/page.tsx`, `getEditableUser`, `blogRepository.ts`, `cn`, `Footer.tsx`, `opengraph-image.tsx`, `formatDate`, `isFeatureEnabled`, `guides.tsx`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/core-free-icons` to `next`, `index.ts`, `app/blog/[id]/page.tsx`, `MarketDiffusion.tsx`, `ServerDashboard.tsx`, `package.json`, `zahlungen/page.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `membership.ts`, `users/page.tsx`, `satzung/page.tsx`, `KosmosTimeline.tsx`, `app/layout.tsx`, `useActionForm`, `blogService.ts`, `iban.ts`, `MailForm.tsx`, `DirectoryTable.tsx`, `dashboard/page.tsx`, `authz.ts`, `heliFlight.test.ts`, `Site.tsx`, `featureFlagService.ts`, `ApplicationWizard.tsx`, `PhysicsTimeline.tsx`, `eventService.ts`, `altcha.d.ts`, `BulkImport.tsx`, `feature-flags/page.tsx`, `cn`, `Footer.tsx`, `CampusPlan.tsx`, `isFeatureEnabled`, `guides.tsx`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Why does `siteUrl()` connect `prisma.ts` to `mailService.ts`, `events.ts`, `ics.ts`, `messages.ts`, `AppError`, `isFeatureEnabled`, `Betrieb: Checkliste für den Produktionsserver`, `userService.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _525 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `executeAction` be split into smaller, more focused modules?**
  _Cohesion score 0.11097560975609756 - nodes in this community are weakly interconnected._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.07130124777183601 - nodes in this community are weakly interconnected._