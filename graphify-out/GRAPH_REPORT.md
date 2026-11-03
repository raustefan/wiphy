# Graph Report - wiphy  (2026-11-03)

## Corpus Check
- 401 files · ~196,542 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2249 nodes · 7315 edges · 110 communities (96 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8d1c97c9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- executeAction
- mail/page.tsx
- authz.ts
- mailService.ts
- requireAdmin
- feeService.ts
- HeaderChrome.tsx
- serverStatus.ts
- anleitungen/README.md
- blogService.ts
- app/blog/[id]/page.tsx
- events.ts
- ics.ts
- MarketDiffusion.tsx
- ServerDashboard.tsx
- dashboard/page.tsx
- package.json
- dependencies
- messages.ts
- lib/siteUrl.ts
- schemas.ts
- seed.ts
- zahlungen/page.tsx
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- MemberDirectory.tsx
- userService.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- membership.ts
- Beiträge
- layout.ts
- ContactRequestList.tsx
- campus-plan.py
- LegalPage.tsx
- KosmosTimeline.tsx
- format.ts
- index.ts
- compilerOptions
- devDependencies
- passwordStrength.ts
- Deployment (Hetzner Cloud / Ubuntu)
- Technik
- ApplicationWizard.tsx
- app/layout.tsx
- next
- isDebugMode
- berlinTime.ts
- mailHistory.ts
- iban.ts
- Konten
- EmailBodyField.tsx
- react
- AppError
- auth.ts
- Betrieb: Checkliste für den Produktionsserver
- EditUserForm
- server/route.ts
- security/page.tsx
- mail/actions.ts
- DebugBar.tsx
- heliFlight.test.ts
- userUpdateData.ts
- app/kontakt/page.tsx
- Site.tsx
- scripts
- Technische Dokumentation
- isFeatureEnabled
- AccountPanel
- app/page.tsx
- ref_node_fs
- CLAUDE.md
- Kommunikation
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- mitglied-werden/page.tsx
- newsletterToken.ts
- bestaetigen/page.tsx
- DeleteMemberSection
- Mitgliedschaft
- altcha.d.ts
- postcss.config.mjs
- prisma.ts
- securityEventService.ts
- sendEmail
- { GET, POST }
- BulkImport.tsx
- Inhalte der Website
- Funktionen im Detail
- forgot-password/layout.tsx
- EmailComposerDialog
- getOptionalUser
- login/layout.tsx
- rateLimitService.ts
- ActivityHeatmap.tsx
- cn
- Footer.tsx
- abmelden/layout.tsx
- formatNumber
- reset-password/layout.tsx
- verify-email/layout.tsx
- eslint.config.mjs
- ref_node_assert
- ApplicationList
- registerAction.ts
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

## Communities (110 total, 14 thin omitted)

### Community 0 - "executeAction"
Cohesion: 0.15
Nodes (19): zod, COOKIE_OPTIONS, setOwnNewsletterAction(), revealKosmosContactAction(), setKosmosVisibilityAction(), setNewsletterByTokenAction(), getRedirectTarget(), isRedirectError() (+11 more)

### Community 1 - "mail/page.tsx"
Cohesion: 0.13
Nodes (18): MailAnnouncement, MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata (+10 more)

### Community 2 - "authz.ts"
Cohesion: 0.06
Nodes (39): DashboardPageHeader(), setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), metadata, ContactRequestsPage(), dynamic (+31 more)

### Community 3 - "mailService.ts"
Cohesion: 0.13
Nodes (18): sanitize-html, ENTITIES, htmlToText(), AnnouncedEvent, composeMessage(), greeting(), MailTarget, Recipient (+10 more)

### Community 4 - "requireAdmin"
Cohesion: 0.07
Nodes (57): POST(), GET(), createDraft(), deleteMember(), deletePhotoAction(), moveMemberInList(), revalidateBoard(), saveMember() (+49 more)

### Community 5 - "feeService.ts"
Cohesion: 0.23
Nodes (14): clearFeeAmountOverride(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), setStudentYear(), updateFeeComment(), upsertFeeAmount(), upsertFeePaid() (+6 more)

### Community 6 - "HeaderChrome.tsx"
Cohesion: 0.33
Nodes (6): allLinks, HeaderChrome(), ThemeToggle(), useSwipeToClose(), end(), offset()

### Community 7 - "serverStatus.ts"
Cohesion: 0.12
Nodes (23): ref_node_os, BackupRun, BackupStatus, cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG (+15 more)

### Community 8 - "anleitungen/README.md"
Cohesion: 0.36
Nodes (3): Anleitungen für Admins, Einstieg, Gut zu wissen

### Community 9 - "blogService.ts"
Cohesion: 0.05
Nodes (69): sharp, BlogIndexPage(), beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage() (+61 more)

### Community 10 - "app/blog/[id]/page.tsx"
Cohesion: 0.12
Nodes (27): generateMetadata(), Props, PublicBlogPost(), generateMetadata(), LeadPost(), MetaLine(), PostRow(), Props (+19 more)

### Community 11 - "events.ts"
Cohesion: 0.12
Nodes (37): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard() (+29 more)

### Community 12 - "ics.ts"
Cohesion: 0.17
Nodes (19): RFC-5545, GET(), icsEnd(), icsAttachment(), addDays(), berlinDateStamp(), buildEventIcs(), calendar() (+11 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (32): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+24 more)

### Community 14 - "ServerDashboard.tsx"
Cohesion: 0.13
Nodes (15): triggerDeploy(), BackupSection(), DeploySection(), formatUptime(), Sample, ServerDashboard(), timeLabel(), PAD (+7 more)

### Community 15 - "dashboard/page.tsx"
Cohesion: 0.07
Nodes (42): @react-pdf/renderer, GET(), GET(), CtaCard(), byStatusThenName(), MailForm(), MailSuccessDialog(), MembershipCertificateCard() (+34 more)

### Community 16 - "package.json"
Cohesion: 0.08
Nodes (23): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+15 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "messages.ts"
Cohesion: 0.11
Nodes (32): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), submitMembershipApplication(), adminCreatedUserMessage(), emailChangeMessage(), exitMessage() (+24 more)

### Community 19 - "lib/siteUrl.ts"
Cohesion: 0.13
Nodes (15): escapeXml(), GET(), DashboardLayout(), metadata, alt, contentType, size, BlogPostingJsonLd() (+7 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (40): isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, applicationPersonSchema, birthDateField, absent() (+32 more)

### Community 21 - "seed.ts"
Cohesion: 0.22
Nodes (6): adapter, prisma, dotenv, ref_node_path, prisma, @prisma/adapter-pg

### Community 22 - "zahlungen/page.tsx"
Cohesion: 0.08
Nodes (45): FeeDefaultsCard(), run(), save(), AccountSection(), UserManagementPage(), BankDetailsForm(), submit(), BankValues (+37 more)

### Community 23 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.25
Nodes (6): Datenschutz und Sicherheit, Für Besucher:innen, Für den Vorstand, Für Mitglieder, Weiterlesen, WirtschaftsPhysik Alumni e. V. — Vereinswebsite

### Community 24 - "MemberDirectory.tsx"
Cohesion: 0.08
Nodes (32): AmountDialog(), CommentDialog(), compareBy(), compareNullable(), DirectoryAccount, DirectoryTable(), selectAllWithOpenFees(), displayName() (+24 more)

### Community 25 - "userService.ts"
Cohesion: 0.13
Nodes (27): dynamic, MembershipApplicationsPage(), metadata, updateUser(), createUserAction(), importEntriesSchema, FeeDefaultEntry, planApplicationFees() (+19 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "membership.ts"
Cohesion: 0.13
Nodes (24): setStudentEndYearAction(), StudentStatusEditor(), ageAt(), changedStudentYears(), CONSENT_VERSION, currentStudentEndYear(), DATENSCHUTZ_URL, FALLBACK_FEE_DEFAULT (+16 more)

### Community 29 - "Beiträge"
Cohesion: 0.20
Nodes (10): Ausnahme (abweichender Betrag), Beitragsjahr hinzufügen, Beitragssätze, Beiträge, Hinweis „Erst x von y Mitgliedern haben einen Beitragseintrag“, SEPA-Lastschrift, So rechnet die Website, Sonderstatus umschalten (+2 more)

### Community 30 - "layout.ts"
Cohesion: 0.20
Nodes (20): blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml() (+12 more)

### Community 31 - "ContactRequestList.tsx"
Cohesion: 0.14
Nodes (16): markContactRequestHandled(), removeContactRequest(), ContactRequestItem, ContactRequestList(), confirmDelete(), run(), dateFormat, MAX_MESSAGE_LENGTH (+8 more)

### Community 32 - "campus-plan.py"
Cohesion: 0.10
Nodes (29): datetime, json, math, pathlib, re, d(), main(), outer_rings() (+21 more)

### Community 33 - "LegalPage.tsx"
Cohesion: 0.19
Nodes (12): impressum(), ImpressumPage(), metadata, SATZUNG, anchorOf(), Block(), LegalSections(), renderInline() (+4 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (23): CLOUDS, Contact, KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField() (+15 more)

### Community 35 - "format.ts"
Cohesion: 0.20
Nodes (12): BackupHistory(), DATE_TIME, EURO, formatBytes(), formatDateShort(), formatDateTime(), LONG_DATE, NUMBER (+4 more)

### Community 36 - "index.ts"
Cohesion: 0.10
Nodes (38): @hugeicons/core-free-icons, @hugeicons/react, createDraft(), deletePost(), DeletePostButton(), AdminBlogPage(), metadata, ApplicationItem (+30 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "passwordStrength.ts"
Cohesion: 0.16
Nodes (15): bulkCreateUsersAction(), BulkImport(), check(), create(), loadFile(), replaceEntry(), NewUserForm(), handleSubmit() (+7 more)

### Community 40 - "Deployment (Hetzner Cloud / Ubuntu)"
Cohesion: 0.29
Nodes (7): Automatische Updates bei jedem Git Push (GitHub Actions), Deployment (Hetzner Cloud / Ubuntu), Deployment & Updates via SSH (`deploy.sh`), Einmalige Einrichtung auf dem Server, nginx als Reverse Proxy, Option 1: Automatischer Einzeiler über deinen lokalen Rechner (Empfohlen), Option 2: Manuelles Ausführen auf dem Server

### Community 41 - "Technik"
Cohesion: 0.20
Nodes (9): Backup, Debug-Modus, Deploy, Feature Flags, Notfall-Rezepte, Rate-Limit-Sperre aufheben, Server, Sicherheit (+1 more)

### Community 42 - "ApplicationWizard.tsx"
Cohesion: 0.10
Nodes (23): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, hasControlChars(), isValidPostalCode(), addAddressIssues() (+15 more)

### Community 43 - "app/layout.tsx"
Cohesion: 0.16
Nodes (10): src_app_globals, body, metadata, mono, serif, Header(), InstallHint(), getSession (+2 more)

### Community 44 - "next"
Cohesion: 0.09
Nodes (30): nextConfig, next, next-auth, StudentStatusPrompt(), ForgotPasswordPage(), ContactForm(), FaqItem, LoginFaq() (+22 more)

### Community 45 - "isDebugMode"
Cohesion: 0.29
Nodes (9): GET(), toggleDebugMode(), toggleMemberView(), auth, DebugBar(), isDebugMode(), isViewingAsMember(), requireRealAdmin() (+1 more)

### Community 46 - "berlinTime.ts"
Cohesion: 0.24
Nodes (15): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+7 more)

### Community 47 - "mailHistory.ts"
Cohesion: 0.29
Nodes (7): SentMailInput, sentMailRecord(), getSentMails(), logSentMail(), SENT_MAIL_RETENTION_DAYS, one, two

### Community 48 - "iban.ts"
Cohesion: 0.12
Nodes (37): field(), POST(), SepaDialog(), ibanError(), IbanInput(), check(), handleChange(), EEA (+29 more)

### Community 49 - "Konten"
Cohesion: 0.22
Nodes (9): Benutzerverwaltung, Konten, Konto bearbeiten, Konto löschen, Konto von Hand anlegen, Login sperren, Suche und Filter, Symbole und Badges am Namen (+1 more)

### Community 50 - "EmailBodyField.tsx"
Cohesion: 0.24
Nodes (7): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailBodyField(), EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 51 - "react"
Cohesion: 0.06
Nodes (39): react, savePost(), EditBlogPage(), metadata, MAIL_KINDS, MailFormProps, MailKind, MailUserOption (+31 more)

### Community 52 - "AppError"
Cohesion: 0.16
Nodes (28): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), deleteUserAction(), EditUserPage(), withdrawMembershipApplication() (+20 more)

### Community 53 - "auth.ts"
Cohesion: 0.11
Nodes (25): bcryptjs, ref_node_net, resetPassword(), resetSchema, AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError (+17 more)

### Community 54 - "Betrieb: Checkliste für den Produktionsserver"
Cohesion: 0.29
Nodes (7): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "server/route.ts"
Cohesion: 0.39
Nodes (7): GET(), deployAvailable(), deployRunning(), getAppLogs(), getDeployStatus(), startDeploy(), stripAnsi()

### Community 57 - "security/page.tsx"
Cohesion: 0.18
Nodes (17): sparkGeometry, dynamic, metadata, ReasonBars(), OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, reasonLabel() (+9 more)

### Community 58 - "mail/actions.ts"
Cohesion: 0.36
Nodes (7): parseMailForm(), sendEmailAction(), resolveRecipientEmails(), resolveUsersByTarget(), sendMailForTarget(), getAnnouncedEvent(), mailSendSchema

### Community 59 - "DebugBar.tsx"
Cohesion: 0.19
Nodes (9): ref_node_child_process, ref_node_util, commit, LINKS, TIME, DebugConsole(), AppLogs, ADMIN_SESSION_MAX_MS (+1 more)

### Community 60 - "heliFlight.test.ts"
Cohesion: 0.15
Nodes (20): CampusPlan(), Helicopter(), HINTS, hitsContent(), KEYS, PauseOffscreen(), approach(), Bounds (+12 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "app/kontakt/page.tsx"
Cohesion: 0.29
Nodes (7): dynamic, KontaktPage(), metadata, createLoginChallenge(), LoginForm(), ALTCHA_COMPLEXITY, createAltchaChallenge()

### Community 63 - "Site.tsx"
Cohesion: 0.09
Nodes (20): metadata, facts, metadata, metadata, dynamic, metadata, SearchParams, ViewSwitch() (+12 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "Technische Dokumentation"
Cohesion: 0.17
Nodes (12): Backup & Wiederherstellung, Datenbankmodell, Feature Flags, Inhalt, Projektstruktur, Schnellstart, Sicherheitsmechanismen, Technische Dokumentation (+4 more)

### Community 66 - "isFeatureEnabled"
Cohesion: 0.24
Nodes (12): @prisma/client, POST(), KontoPage(), FEATURE_FLAG_DESCRIPTIONS, FEATURE_FLAG_LABELS, FEATURE_FLAG_ORDER, PAGE_FLAGS, getPendingRegistrationStats() (+4 more)

### Community 67 - "AccountPanel"
Cohesion: 0.38
Nodes (5): AccountPanel(), handleSubmit(), ResetPasswordForm(), handleSubmit(), validateNewPassword()

### Community 68 - "app/page.tsx"
Cohesion: 0.15
Nodes (11): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline(), levels, STRIP_IDS (+3 more)

### Community 69 - "ref_node_fs"
Cohesion: 0.50
Nodes (4): ref_node_fs, BACKGROUND, icon(), main()

### Community 71 - "Kommunikation"
Cohesion: 0.33
Nodes (6): Kommunikation, Kontaktanfragen, Newsletter oder Mitteilung?, Platzhalter, Rundmail verschicken, Zu einem Termin einladen

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.08
Nodes (48): createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault() (+40 more)

### Community 77 - "mitglied-werden/page.tsx"
Cohesion: 0.17
Nodes (15): JourneyRail(), ApplicationStage(), dynamic, metadata, Props, toDateInput(), JOURNEY_STEPS, JourneyStage (+7 more)

### Community 78 - "newsletterToken.ts"
Cohesion: 0.27
Nodes (10): GET(), POST(), RFC-8058, createNewsletterToken(), key(), NEWSLETTER_UNSUBSCRIBE_PATH, newsletterUnsubscribeUrls(), sign() (+2 more)

### Community 79 - "bestaetigen/page.tsx"
Cohesion: 0.17
Nodes (13): confirmPrivacyPolicy(), metadata, Props, DATENSCHUTZ, DATENSCHUTZ_VERSION, dynamic, LoginPage(), metadata (+5 more)

### Community 81 - "Mitgliedschaft"
Cohesion: 0.33
Nodes (6): Ablauf einer Aufnahme, Antrag bearbeiten, Austritt von Hand eintragen, Austritte, Mitgliedschaft, Studierendenstatus

### Community 82 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "prisma.ts"
Cohesion: 0.15
Nodes (20): server-only, GET(), message(), submitContactRequest(), contactRequestMessage(), createPrismaClient(), globalForPrisma, prisma (+12 more)

### Community 86 - "securityEventService.ts"
Cohesion: 0.15
Nodes (19): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, SecurityEventOutcome, SecurityEventType, addOutcome(), DayBucket, emptyCounts() (+11 more)

### Community 87 - "sendEmail"
Cohesion: 0.18
Nodes (20): requestBackupLink(), resendVerificationEmail(), notifyAdminsAboutRegistration(), verifyEmail(), EmailMessage, adminRegistrationNoticeMessage(), backupLinkMessage(), emailChangedNoticeMessage() (+12 more)

### Community 89 - "BulkImport.tsx"
Cohesion: 0.08
Nodes (34): ImportIssue, ImportRowResult, display(), EntryDetails(), EntryRow(), FALSE_BY_DEFAULT, ImportReport, EXAMPLE (+26 more)

### Community 91 - "Inhalte der Website"
Cohesion: 0.40
Nodes (5): Bilder, Blog, Inhalte der Website, Termine, Vorstand und Signatur

### Community 92 - "Funktionen im Detail"
Cohesion: 0.40
Nodes (5): Admin-Dashboard, Authentifizierung & Konten, Funktionen im Detail, Mitgliederbereich (`/dashboard`), Öffentlicher Bereich

### Community 94 - "EmailComposerDialog"
Cohesion: 0.50
Nodes (4): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

### Community 95 - "getOptionalUser"
Cohesion: 0.33
Nodes (7): GET(), GET(), ConfirmPrivacyPolicyPage(), MitgliedWerdenPage(), getOptionalUser(), needsPrivacyConsent(), findImageBytes()

### Community 97 - "rateLimitService.ts"
Cohesion: 0.14
Nodes (15): removeRateLimitEntry(), RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket (+7 more)

### Community 98 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 99 - "cn"
Cohesion: 0.07
Nodes (31): DashboardPageHeaderProps, NewsletterRow(), NewsletterSection(), useOwnNewsletter(), BeforeInstallPromptEvent, PasswordStrengthMeter(), ShareButton(), share() (+23 more)

### Community 100 - "Footer.tsx"
Cohesion: 0.28
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 102 - "formatNumber"
Cohesion: 0.21
Nodes (11): RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile(), StatTileProps, Tone (+3 more)

### Community 105 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 106 - "ref_node_assert"
Cohesion: 0.31
Nodes (4): ref_node_assert, ref_node_test, base, directDebit

### Community 108 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 119 - "registerAction.ts"
Cohesion: 0.17
Nodes (24): ref_crypto, EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), updateBankDetails(), requestPasswordReset(), registerUser(), passwordResetMessage() (+16 more)

### Community 122 - "guides.tsx"
Cohesion: 0.25
Nodes (12): anchoredHeading(), components, findGuide(), GuideMarkdown(), GUIDES, readGuide(), slugify(), textOf() (+4 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **525 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+520 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 666 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `executeAction`, `mail/page.tsx`, `authz.ts`, `requireAdmin`, `HeaderChrome.tsx`, `blogService.ts`, `app/blog/[id]/page.tsx`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `dashboard/page.tsx`, `package.json`, `messages.ts`, `lib/siteUrl.ts`, `zahlungen/page.tsx`, `MemberDirectory.tsx`, `userService.ts`, `gravityPhysics.ts`, `ContactRequestList.tsx`, `LegalPage.tsx`, `KosmosTimeline.tsx`, `index.ts`, `ApplicationWizard.tsx`, `app/layout.tsx`, `isDebugMode`, `iban.ts`, `react`, `AppError`, `auth.ts`, `server/route.ts`, `security/page.tsx`, `DebugBar.tsx`, `app/kontakt/page.tsx`, `Site.tsx`, `isFeatureEnabled`, `app/page.tsx`, `eventService.ts`, `mitglied-werden/page.tsx`, `newsletterToken.ts`, `bestaetigen/page.tsx`, `prisma.ts`, `sendEmail`, `forgot-password/layout.tsx`, `getOptionalUser`, `login/layout.tsx`, `rateLimitService.ts`, `cn`, `Footer.tsx`, `abmelden/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`, `registerAction.ts`, `guides.tsx`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `authz.ts`, `requireAdmin`, `HeaderChrome.tsx`, `blogService.ts`, `app/blog/[id]/page.tsx`, `MarketDiffusion.tsx`, `ServerDashboard.tsx`, `dashboard/page.tsx`, `package.json`, `zahlungen/page.tsx`, `MemberDirectory.tsx`, `gravityPhysics.ts`, `membership.ts`, `ContactRequestList.tsx`, `LegalPage.tsx`, `KosmosTimeline.tsx`, `index.ts`, `ApplicationWizard.tsx`, `app/layout.tsx`, `next`, `iban.ts`, `DebugBar.tsx`, `heliFlight.test.ts`, `Site.tsx`, `isFeatureEnabled`, `app/page.tsx`, `eventService.ts`, `altcha.d.ts`, `BulkImport.tsx`, `cn`, `Footer.tsx`, `guides.tsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `siteUrl()` connect `sendEmail` to `mailService.ts`, `events.ts`, `ics.ts`, `newsletterToken.ts`, `messages.ts`, `Betrieb: Checkliste für den Produktionsserver`, `registerAction.ts`, `userService.ts`, `layout.ts`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _525 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `executeAction` be split into smaller, more focused modules?**
  _Cohesion score 0.1476923076923077 - nodes in this community are weakly interconnected._
- **Should `mail/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12648221343873517 - nodes in this community are weakly interconnected._