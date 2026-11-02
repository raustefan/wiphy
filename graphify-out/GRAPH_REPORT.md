# Graph Report - wiphy  (2026-11-02)

## Corpus Check
- 398 files · ~194,045 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2228 nodes · 7272 edges · 111 communities (95 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f37a871f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ref_node_fs
- layout.ts
- next
- mailService.ts
- boardService.ts
- feeService.ts
- @hugeicons/core-free-icons
- serverStatus.ts
- anleitungen/README.md
- blogService.ts
- app/blog/[id]/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- formatNumber
- index.ts
- package.json
- dependencies
- AppError
- app/layout.tsx
- schemas.ts
- seed.ts
- zahlungen/page.tsx
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- DirectoryTable
- boardImages.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- app/vorstand/page.tsx
- Beiträge
- countries.ts
- contact.ts
- campus-plan.py
- membership.ts
- KosmosTimeline.tsx
- format.ts
- cn
- compilerOptions
- devDependencies
- passwordStrength.ts
- Deployment (Hetzner Cloud / Ubuntu)
- Technik
- ApplicationWizard.tsx
- ApplicationList.tsx
- useActionForm
- BulkImport.tsx
- getOptionalUser
- photo/route.ts
- iban.ts
- Konten
- EmailBodyField.tsx
- MailForm.tsx
- messages.ts
- userService.ts
- Betrieb: Checkliste für den Produktionsserver
- EditUserForm
- MarkdownViewer.tsx
- security/page.tsx
- sepa.ts
- authz.ts
- newsletterToken.ts
- userUpdateData.ts
- BoardPhotoUploader
- Site.tsx
- scripts
- Technische Dokumentation
- featureFlagService.ts
- ContactRequestList
- app/page.tsx
- sessionPolicy.test.ts
- CLAUDE.md
- Kommunikation
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- mitglied-werden/page.tsx
- executeAction
- LegalPage.tsx
- DeleteMemberSection
- Mitgliedschaft
- altcha.d.ts
- postcss.config.mjs
- prisma.ts
- securityEventService.ts
- registerAction.ts
- { GET, POST }
- AccountSection
- Inhalte der Website
- userImport.test.ts
- forgot-password/layout.tsx
- ApplicationList
- bestaetigen/page.tsx
- login/layout.tsx
- rateLimitService.ts
- ActivityHeatmap.tsx
- RateLimitTable
- Footer.tsx
- abmelden/layout.tsx
- RegistrationFunnel.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- requireFeatureEnabled
- sendEmail
- guides.tsx
- blogPostPath
- ref_node_assert
- mail/actions.ts

## God Nodes (most connected - your core abstractions)
1. `next` - 135 edges
2. `cn()` - 93 edges
3. `AppError` - 91 edges
4. `@hugeicons/core-free-icons` - 90 edges
5. `@hugeicons/react` - 90 edges
6. `react` - 79 edges
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

## Communities (111 total, 16 thin omitted)

### Community 0 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 1 - "layout.ts"
Cohesion: 0.21
Nodes (20): blockHtml(), blockText(), derivePreheader(), EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml(), renderBlocksText() (+12 more)

### Community 2 - "next"
Cohesion: 0.10
Nodes (31): nextConfig, @hugeicons/react, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+23 more)

### Community 3 - "mailService.ts"
Cohesion: 0.10
Nodes (25): sanitize-html, EmailBlock, parseDirectMailForm(), sendDirectMailAction(), ENTITIES, htmlToText(), AnnouncedEvent, composeMessage() (+17 more)

### Community 4 - "boardService.ts"
Cohesion: 0.15
Nodes (24): EditBoardMemberPage(), moveMemberOrder(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember(), deleteMemberById() (+16 more)

### Community 5 - "feeService.ts"
Cohesion: 0.18
Nodes (19): FeeBreakdown, clearFeeAmountOverride(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), setStudentYear(), updateFeeComment(), upsertFeeAmount() (+11 more)

### Community 6 - "@hugeicons/core-free-icons"
Cohesion: 0.12
Nodes (23): @hugeicons/core-free-icons, react, DeletePostButton(), ContactRequestItem, dateFormat, DeleteEventButton(), DialogButton(), ActionResult (+15 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.10
Nodes (33): ref_node_os, GET(), ServerPage(), BackupRun, BackupStatus, cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS (+25 more)

### Community 8 - "anleitungen/README.md"
Cohesion: 0.36
Nodes (3): Anleitungen für Admins, Einstieg, Gut zu wissen

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (66): sharp, POST(), BlogIndexPage(), beginImageAction(), createDraft(), deleteBlogImage(), deletePost(), moveBlogImage() (+58 more)

### Community 10 - "app/blog/[id]/page.tsx"
Cohesion: 0.14
Nodes (21): generateMetadata(), Props, PublicBlogPost(), generateMetadata(), LeadPost(), MetaLine(), PostRow(), Props (+13 more)

### Community 11 - "events.ts"
Cohesion: 0.12
Nodes (35): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), Props, EventCard(), EventCardData (+27 more)

### Community 12 - "ics.ts"
Cohesion: 0.14
Nodes (23): RFC-5545, GET(), generateMetadata(), eventLinkLabel(), icsEnd(), icsAttachment(), addDays(), berlinDateStamp() (+15 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (33): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+25 more)

### Community 14 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 15 - "index.ts"
Cohesion: 0.10
Nodes (33): InfoTooltip(), RateLimitTableProps, BackupHistory(), metadata, chipTones, DirectoryAccount, GROUPS, SortKey (+25 more)

### Community 16 - "package.json"
Cohesion: 0.08
Nodes (24): eslintConfig, name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler (+16 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "AppError"
Cohesion: 0.14
Nodes (26): submitMembershipApplication(), withdrawMembershipApplication(), EmailMessage, membershipApplicationNoticeMessage(), MEMBERSHIP_ADMIN_PATH, studentYearsFromStudy(), AppError, countOpenApplications() (+18 more)

### Community 19 - "app/layout.tsx"
Cohesion: 0.10
Nodes (21): escapeXml(), GET(), DashboardLayout(), metadata, src_app_globals, body, metadata, mono (+13 more)

### Community 20 - "schemas.ts"
Cohesion: 0.05
Nodes (43): isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, applicationPersonSchema, birthDateField, absent() (+35 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "zahlungen/page.tsx"
Cohesion: 0.09
Nodes (44): FeeDefaultsCard(), run(), save(), UserManagementPage(), BankDetailsForm(), submit(), BankValues, dynamic (+36 more)

### Community 23 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.25
Nodes (6): Datenschutz und Sicherheit, Für Besucher:innen, Für den Vorstand, Für Mitglieder, Weiterlesen, WirtschaftsPhysik Alumni e. V. — Vereinswebsite

### Community 24 - "DirectoryTable"
Cohesion: 0.08
Nodes (32): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), displayName(), explainFee() (+24 more)

### Community 25 - "boardImages.ts"
Cohesion: 0.25
Nodes (6): ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, ImageBytes, ProcessedBoardPhoto, QUALITY_LADDER

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.15
Nodes (19): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), sparkGeometry (+11 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "app/vorstand/page.tsx"
Cohesion: 0.36
Nodes (7): AdminBoardPage(), getInitials(), metadata, VorstandPage(), LinkedInGlyph(), boardPhotoUrl(), getPublicMembers()

### Community 29 - "Beiträge"
Cohesion: 0.20
Nodes (10): Ausnahme (abweichender Betrag), Beitragsjahr hinzufügen, Beitragssätze, Beiträge, Hinweis „Erst x von y Mitgliedern haben einen Beitragseintrag“, SEPA-Lastschrift, So rechnet die Website, Sonderstatus umschalten (+2 more)

### Community 30 - "countries.ts"
Cohesion: 0.13
Nodes (21): @react-pdf/renderer, GET(), display(), SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES (+13 more)

### Community 31 - "contact.ts"
Cohesion: 0.24
Nodes (7): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ContactInput, scoreSpam(), SPAM_KEYWORDS, legitimate

### Community 32 - "campus-plan.py"
Cohesion: 0.10
Nodes (29): datetime, json, math, pathlib, re, d(), main(), outer_rings() (+21 more)

### Community 33 - "membership.ts"
Cohesion: 0.20
Nodes (17): setStudentEndYearAction(), StudentStatusEditor(), ageAt(), changedStudentYears(), currentStudentEndYear(), formatYearRanges(), isOldEnough(), MEMBER_STUDENT_LOOKAHEAD (+9 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (23): CLOUDS, Contact, KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField() (+15 more)

### Community 35 - "format.ts"
Cohesion: 0.12
Nodes (19): AdminBlogPage(), MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata (+11 more)

### Community 36 - "cn"
Cohesion: 0.07
Nodes (27): CtaCard(), MailSuccessDialog(), MembershipCertificateCard(), NewsletterRow(), NewsletterSection(), useOwnNewsletter(), ADMIN_ACTIONS, QueryParamDialog() (+19 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "passwordStrength.ts"
Cohesion: 0.15
Nodes (16): bulkCreateUsersAction(), BulkImport(), check(), create(), loadFile(), replaceEntry(), NewUserForm(), handleSubmit() (+8 more)

### Community 40 - "Deployment (Hetzner Cloud / Ubuntu)"
Cohesion: 0.29
Nodes (7): Automatische Updates bei jedem Git Push (GitHub Actions), Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, nginx als Reverse Proxy, Option 1: Automatischer Einzeiler über deinen lokalen Rechner (Empfohlen), Option 2: Manuelles Ausführen auf dem Server

### Community 41 - "Technik"
Cohesion: 0.20
Nodes (9): Backup, Debug-Modus, Deploy, Feature Flags, Notfall-Rezepte, Rate-Limit-Sperre aufheben, Server, Sicherheit (+1 more)

### Community 42 - "ApplicationWizard.tsx"
Cohesion: 0.07
Nodes (31): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, PaymentOption(), hasControlChars(), isValidPostalCode() (+23 more)

### Community 43 - "ApplicationList.tsx"
Cohesion: 0.13
Nodes (15): metadata, ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, toggleAllDay(), EventFormData, toDateTimeValue() (+7 more)

### Community 44 - "useActionForm"
Cohesion: 0.05
Nodes (46): next-auth, FeatureFlagToggle(), FeatureFlagToggleProps, EmailChangeForm(), PasswordChangeButton(), BackupSection(), DeploySection(), formatUptime() (+38 more)

### Community 45 - "BulkImport.tsx"
Cohesion: 0.10
Nodes (18): getStatusIcon(), ProfileSummary(), ProfileSummaryUser, ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP (+10 more)

### Community 46 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), GET(), GET(), getOptionalUser(), findImageBytes(), findPhotoBytes()

### Community 47 - "photo/route.ts"
Cohesion: 0.38
Nodes (6): POST(), processBoardPhoto(), memberExists(), upsertPhoto(), memberExists(), setMemberPhoto()

### Community 48 - "iban.ts"
Cohesion: 0.22
Nodes (21): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+13 more)

### Community 49 - "Konten"
Cohesion: 0.22
Nodes (9): Benutzerverwaltung, Konten, Konto bearbeiten, Konto löschen, Konto von Hand anlegen, Login sperren, Suche und Filter, Symbole und Badges am Namen (+1 more)

### Community 50 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 51 - "MailForm.tsx"
Cohesion: 0.08
Nodes (19): MailAnnouncement, byStatusThenName(), MAIL_KINDS, MailForm(), MailFormProps, MailKind, MailUserOption, STATUS_ORDER (+11 more)

### Community 52 - "messages.ts"
Cohesion: 0.13
Nodes (32): MembershipApplicationsPage(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), signOut, accountDeletedMessage() (+24 more)

### Community 53 - "userService.ts"
Cohesion: 0.12
Nodes (37): EMAIL_CHANGE_ERRORS, requestPasswordChange(), KontoPage(), deleteUserAction(), EditUserPage(), metadata, updateUser(), NewUserPage() (+29 more)

### Community 54 - "Betrieb: Checkliste für den Produktionsserver"
Cohesion: 0.29
Nodes (7): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

### Community 57 - "security/page.tsx"
Cohesion: 0.23
Nodes (11): dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel(), TYPE_LABELS (+3 more)

### Community 58 - "sepa.ts"
Cohesion: 0.22
Nodes (17): field(), POST(), SepaDialog(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+9 more)

### Community 59 - "authz.ts"
Cohesion: 0.14
Nodes (24): ref_node_child_process, ref_node_util, GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage(), auth (+16 more)

### Community 60 - "newsletterToken.ts"
Cohesion: 0.27
Nodes (10): GET(), POST(), RFC-8058, createNewsletterToken(), key(), NEWSLETTER_UNSUBSCRIBE_PATH, newsletterUnsubscribeUrls(), sign() (+2 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "BoardPhotoUploader"
Cohesion: 0.60
Nodes (5): BoardPhotoUploader(), handleDelete(), handleDrop(), uploadFile(), formatBytes()

### Community 63 - "Site.tsx"
Cohesion: 0.13
Nodes (13): facts, metadata, metadata, dynamic, metadata, SearchParams, ViewSwitch(), LorenzAttractor (+5 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "Technische Dokumentation"
Cohesion: 0.12
Nodes (17): Admin-Dashboard, Authentifizierung & Konten, Backup & Wiederherstellung, Datenbankmodell, Feature Flags, Funktionen im Detail, Inhalt, Mitgliederbereich (`/dashboard`) (+9 more)

### Community 66 - "featureFlagService.ts"
Cohesion: 0.28
Nodes (10): @prisma/client, setFeatureFlag(), FEATURE_FLAG_CATEGORIES, FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, isFeatureFlagKey(), PAGE_FLAGS (+2 more)

### Community 67 - "ContactRequestList"
Cohesion: 1.00
Nodes (3): ContactRequestList(), confirmDelete(), run()

### Community 68 - "app/page.tsx"
Cohesion: 0.13
Nodes (14): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline(), HomePage(), levels (+6 more)

### Community 71 - "Kommunikation"
Cohesion: 0.33
Nodes (6): Kommunikation, Kontaktanfragen, Newsletter oder Mitteilung?, Platzhalter, Rundmail verschicken, Zu einem Termin einladen

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.05
Nodes (77): GET(), EditBlogPage(), DashboardPage(), deleteEventAction(), revalidateEvent(), saveEventAction(), EventForm(), EditEventPage() (+69 more)

### Community 77 - "mitglied-werden/page.tsx"
Cohesion: 0.15
Nodes (18): JourneyRail(), ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), WithdrawApplicationButton() (+10 more)

### Community 78 - "executeAction"
Cohesion: 0.10
Nodes (45): zod, setOwnNewsletterAction(), markContactRequestHandled(), removeContactRequest(), ContactRequestsPage(), requestEmailChangeAction(), acceptMembershipApplication(), declineMembershipApplication() (+37 more)

### Community 79 - "LegalPage.tsx"
Cohesion: 0.15
Nodes (15): DATENSCHUTZ, DATENSCHUTZ_VERSION, metadata, impressum(), ImpressumPage(), metadata, anchorOf(), Block() (+7 more)

### Community 81 - "Mitgliedschaft"
Cohesion: 0.33
Nodes (6): Ablauf einer Aufnahme, Antrag bearbeiten, Austritt von Hand eintragen, Austritte, Mitgliedschaft, Studierendenstatus

### Community 82 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "prisma.ts"
Cohesion: 0.14
Nodes (22): server-only, GET(), message(), submitContactRequest(), dynamic, KontaktPage(), metadata, contactRequestMessage() (+14 more)

### Community 86 - "securityEventService.ts"
Cohesion: 0.15
Nodes (19): SecurityPage(), getPendingRegistrationStats(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel() (+11 more)

### Community 87 - "registerAction.ts"
Cohesion: 0.10
Nodes (36): bcryptjs, ref_crypto, ref_node_net, createLoginChallenge(), resendVerificationEmail(), LoginForm(), registerUser(), resetPassword() (+28 more)

### Community 91 - "Inhalte der Website"
Cohesion: 0.40
Nodes (5): Bilder, Blog, Inhalte der Website, Termine, Vorstand und Signatur

### Community 92 - "userImport.test.ts"
Cohesion: 0.24
Nodes (9): EXAMPLE, FEE_FIELDS, FEES_EXAMPLE, IMPORT_EXCLUDED_FIELDS, IMPORT_KEYS, IMPORT_SECTIONS, ImportEntry, ImportField (+1 more)

### Community 94 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 95 - "bestaetigen/page.tsx"
Cohesion: 0.21
Nodes (11): confirmPrivacyPolicy(), ConfirmPrivacyPolicyPage(), metadata, Props, dynamic, LoginPage(), metadata, NOTICES (+3 more)

### Community 97 - "rateLimitService.ts"
Cohesion: 0.40
Nodes (5): bucketFromKey(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem, summarizeByBucket()

### Community 98 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 99 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 100 - "Footer.tsx"
Cohesion: 0.17
Nodes (10): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), Header(), PluckedString(), getDisabledPages (+2 more)

### Community 102 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 111 - "requireFeatureEnabled"
Cohesion: 0.44
Nodes (7): revealKosmosContactAction(), setKosmosVisibilityAction(), requireFeatureEnabled(), getKosmosContact(), isKosmosParticipant(), PARTICIPANT, setKosmosVisibility()

### Community 119 - "sendEmail"
Cohesion: 0.15
Nodes (20): removeRateLimitEntry(), requestBackupLink(), triggerDeploy(), notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), backupLinkMessage(), emailChangedNoticeMessage() (+12 more)

### Community 122 - "guides.tsx"
Cohesion: 0.26
Nodes (11): anchoredHeading(), components, findGuide(), GuideMarkdown(), GUIDES, readGuide(), slugify(), textOf() (+3 more)

### Community 124 - "blogPostPath"
Cohesion: 0.26
Nodes (11): sitemap(), GET(), TerminePage(), buildCalendarIcs(), getPublishedPosts(), getPastEvents(), getUpcomingEvents(), blogPostPath() (+3 more)

### Community 125 - "ref_node_assert"
Cohesion: 0.17
Nodes (10): ref_node_assert, ref_node_test, SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two (+2 more)

### Community 126 - "mail/actions.ts"
Cohesion: 0.53
Nodes (5): parseMailForm(), sendEmailAction(), sendMailForTarget(), getAnnouncedEvent(), mailSendSchema

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **519 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+514 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 660 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `@hugeicons/core-free-icons`, `serverStatus.ts`, `blogService.ts`, `app/blog/[id]/page.tsx`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `index.ts`, `package.json`, `AppError`, `app/layout.tsx`, `zahlungen/page.tsx`, `gravityPhysics.ts`, `app/vorstand/page.tsx`, `countries.ts`, `KosmosTimeline.tsx`, `format.ts`, `cn`, `ApplicationWizard.tsx`, `ApplicationList.tsx`, `useActionForm`, `BulkImport.tsx`, `getOptionalUser`, `photo/route.ts`, `MailForm.tsx`, `messages.ts`, `userService.ts`, `security/page.tsx`, `sepa.ts`, `authz.ts`, `newsletterToken.ts`, `Site.tsx`, `featureFlagService.ts`, `app/page.tsx`, `eventService.ts`, `mitglied-werden/page.tsx`, `executeAction`, `LegalPage.tsx`, `prisma.ts`, `registerAction.ts`, `forgot-password/layout.tsx`, `bestaetigen/page.tsx`, `login/layout.tsx`, `Footer.tsx`, `abmelden/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`, `requireFeatureEnabled`, `sendEmail`, `guides.tsx`, `blogPostPath`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Why does `react` connect `@hugeicons/core-free-icons` to `next`, `blogService.ts`, `app/blog/[id]/page.tsx`, `MarketDiffusion.tsx`, `index.ts`, `package.json`, `app/layout.tsx`, `zahlungen/page.tsx`, `gravityPhysics.ts`, `membership.ts`, `KosmosTimeline.tsx`, `cn`, `ApplicationWizard.tsx`, `ApplicationList.tsx`, `useActionForm`, `BulkImport.tsx`, `iban.ts`, `MailForm.tsx`, `userService.ts`, `authz.ts`, `Site.tsx`, `featureFlagService.ts`, `app/page.tsx`, `eventService.ts`, `LegalPage.tsx`, `altcha.d.ts`, `Footer.tsx`, `guides.tsx`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `siteUrl()` connect `registerAction.ts` to `layout.ts`, `mailService.ts`, `events.ts`, `ics.ts`, `AppError`, `userService.ts`, `Betrieb: Checkliste für den Produktionsserver`, `sendEmail`, `newsletterToken.ts`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _519 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.09506531204644413 - nodes in this community are weakly interconnected._
- **Should `mailService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10483870967741936 - nodes in this community are weakly interconnected._