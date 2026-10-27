# Graph Report - wiphy  (2026-10-27)

## Corpus Check
- 421 files · ~196,553 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2319 nodes · 7356 edges · 132 communities (118 shown, 14 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 55 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `39c5bb5e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- opengraph-image.tsx
- layout.ts
- index.ts
- mailService.ts
- boardService.ts
- feeService.ts
- app/layout.tsx
- serverStatus.ts
- anleitungen/README.md
- blogService.ts
- zertifikat/pdf/route.ts
- events.ts
- ics.ts
- MarketDiffusion.tsx
- formatNumber
- server-und-logs.md
- package.json
- dependencies
- AppError
- app/termine/[id]/page.tsx
- schemas.ts
- seed.ts
- next
- lib/siteUrl.ts
- DirectoryTable
- securityLabels.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- EventForm.tsx
- Alle Schalter
- countries.ts
- contact.ts
- campus-plan.py
- membership.ts
- KosmosTimeline.tsx
- DirectoryTable.tsx
- cn
- compilerOptions
- devDependencies
- passwordStrength.ts
- ApplicationWizard
- blog/actions.ts
- ApplicationWizard.tsx
- EditUserForm.tsx
- @hugeicons/core-free-icons
- dashboard/page.tsx
- rundmail-senden.md
- berlinTime.ts
- iban.ts
- app/blog/page.tsx
- EmailBodyField.tsx
- MailForm.tsx
- messages.ts
- forgot-password/actions.ts
- [id]/kalender.ics/route.ts
- EditUserForm
- newsletter.md
- requireDebugAdmin
- sepa.ts
- authz.ts
- newsletterToken.ts
- userUpdateData.ts
- userService.ts
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- isFeatureEnabled
- vorstand/actions.ts
- app/page.tsx
- ref_node_assert
- CLAUDE.md
- mitglied-werden/actions.ts
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- mitglied-werden/page.tsx
- executeAction
- satzung/page.tsx
- DeleteMemberSection
- app/vorstand/page.tsx
- altcha.d.ts
- postcss.config.mjs
- altcha.ts
- securityEventService.ts
- auth.ts
- { GET, POST }
- errors.ts
- PhysicsTimeline.tsx
- redirectError.ts
- Bilder im Blog
- ApplicationList
- getOptionalUser
- notfall-abschalten.md
- Anleitungen für Admins
- ActivityHeatmap.tsx
- RateLimitTable
- Mitgliedsantrag bearbeiten
- Zahlungen und Ausnahmen pflegen
- RegistrationFunnel.tsx
- Benutzerverwaltung: Liste, Suche, Filter
- ServerDashboard.tsx
- Dein eigenes Konto
- Konto bearbeiten
- Konto löschen
- Austritte im Blick behalten
- Neues Beitragsjahr anlegen
- SEPA-Lastschrift erzeugen
- kosmos/page.tsx
- Der Admin-Bereich im Überblick
- Konto von Hand anlegen
- forgot-password/layout.tsx
- login/layout.tsx
- abmelden/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx
- feature-flags/actions.ts
- dashboard/kontakt/actions.ts
- userImport.test.ts
- MarkdownViewer.tsx
- AccountPanel
- Footer.tsx
- mailHistory.ts
- mail/actions.ts
- bulkCreateUsersAction
- sendReport.ts
- eslint.config.mjs
- clientIp.ts
- FeeDefaultsCard

## God Nodes (most connected - your core abstractions)
1. `next` - 132 edges
2. `cn()` - 93 edges
3. `AppError` - 91 edges
4. `@hugeicons/core-free-icons` - 89 edges
5. `@hugeicons/react` - 89 edges
6. `react` - 78 edges
7. `executeAction()` - 76 edges
8. `requireAdmin()` - 55 edges
9. `isFeatureEnabled()` - 51 edges
10. `Button()` - 50 edges

## Surprising Connections (you probably didn't know these)
- `Befunde vom 2026-10-20` --references--> `siteUrl()`  [INFERRED]
  BETRIEB.md → src/lib/server/siteUrl.ts
- `Datenbankmodell` --references--> `BoardMember`  [INFERRED]
  README.md → src/lib/server/services/boardService.ts
- `settle()` --calls--> `stepBodies()`  [EXTRACTED]
  tests/gravityEasterEgg.test.ts → src/lib/gravityPhysics.ts
- `GET()` --calls--> `siteUrl()`  [EXTRACTED]
  src/app/api/newsletter/abmelden/route.ts → src/lib/server/siteUrl.ts
- `generateMetadata()` --calls--> `pageMetadata()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/metadata.ts

## Import Cycles
- None detected.

## Communities (132 total, 14 thin omitted)

### Community 0 - "opengraph-image.tsx"
Cohesion: 0.20
Nodes (8): ref_node_fs, ref_node_path, BACKGROUND, icon(), main(), alt, contentType, size

### Community 1 - "layout.ts"
Cohesion: 0.21
Nodes (19): blockHtml(), blockText(), derivePreheader(), EmailSignature, nl2br(), renderBlocksEditorHtml(), renderBlocksHtml(), renderBlocksText() (+11 more)

### Community 2 - "index.ts"
Cohesion: 0.12
Nodes (29): ContactRequestItem, dateFormat, InfoTooltip(), dynamic, metadata, RateLimitTableProps, BackupHistory(), FeeDefaultRow (+21 more)

### Community 3 - "mailService.ts"
Cohesion: 0.15
Nodes (15): sanitize-html, EmailBlock, ENTITIES, htmlToText(), composeMessage(), eventBlocks(), greeting(), MailTarget (+7 more)

### Community 4 - "boardService.ts"
Cohesion: 0.16
Nodes (23): EditBoardMemberPage(), moveMemberOrder(), applyMemberOrder(), BoardMemberRow, BoardMemberWriteData, countMembers(), createMember(), deleteMemberById() (+15 more)

### Community 5 - "feeService.ts"
Cohesion: 0.19
Nodes (19): clearFeeAmountOverride(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), setStudentYear(), updateFeeComment(), upsertFeeAmount(), upsertFeePaid() (+11 more)

### Community 6 - "app/layout.tsx"
Cohesion: 0.22
Nodes (6): src_app_globals, body, metadata, mono, serif, InstallHint()

### Community 7 - "serverStatus.ts"
Cohesion: 0.09
Nodes (35): ref_node_os, GET(), GET(), ServerPage(), auth, BackupRun, BackupStatus, cpuPercent() (+27 more)

### Community 8 - "anleitungen/README.md"
Cohesion: 0.16
Nodes (8): Login sperren, Austritt, Ausschluss oder Tod eintragen, Was dabei passiert, Eintrag, Standard oder Ausnahme, So rechnet die Website Beiträge, Beitragssätze festlegen, So gelten die Sätze, Zahlungserinnerung schicken

### Community 9 - "blogService.ts"
Cohesion: 0.06
Nodes (58): sharp, POST(), BlogIndexPage(), AdminBlogPage(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant (+50 more)

### Community 10 - "zertifikat/pdf/route.ts"
Cohesion: 0.08
Nodes (37): @react-pdf/renderer, GET(), metadata, impressum(), ImpressumPage(), metadata, SATZUNG, anchorOf() (+29 more)

### Community 11 - "events.ts"
Cohesion: 0.10
Nodes (36): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, DashboardEvent (+28 more)

### Community 12 - "ics.ts"
Cohesion: 0.23
Nodes (16): RFC-5545, GET(), eventLinkLabel(), icsEnd(), addDays(), berlinDateStamp(), buildCalendarIcs(), calendar() (+8 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (32): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+24 more)

### Community 14 - "formatNumber"
Cohesion: 0.14
Nodes (15): ReasonBars(), reasonLabel(), Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD (+7 more)

### Community 15 - "server-und-logs.md"
Cohesion: 0.13
Nodes (12): Automatische Backups prüfen, Backup herunterladen, Datenschutz, Komplettes Backup anfordern, Deploy per Knopfdruck, So geht's, Was passiert, Wenn es schiefgeht (+4 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "AppError"
Cohesion: 0.12
Nodes (30): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), MembershipApplicationsPage(), DashboardPage(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw() (+22 more)

### Community 19 - "app/termine/[id]/page.tsx"
Cohesion: 0.18
Nodes (22): generateMetadata(), Props, PublicBlogPost(), dynamic, EventDetailPage(), generateMetadata(), Props, BlogPostingJsonLd() (+14 more)

### Community 20 - "schemas.ts"
Cohesion: 0.05
Nodes (34): isCalendarDate(), absent(), AdminCreateUserInput, blogDeleteSchema, blogImageAltSchema, blogImageMoveSchema, blogImageSchema, blogSaveSchema (+26 more)

### Community 21 - "seed.ts"
Cohesion: 0.25
Nodes (5): adapter, prisma, dotenv, prisma, @prisma/adapter-pg

### Community 22 - "next"
Cohesion: 0.09
Nodes (33): nextConfig, next, DeletePostButton(), metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, metadata (+25 more)

### Community 23 - "lib/siteUrl.ts"
Cohesion: 0.16
Nodes (13): escapeXml(), GET(), DashboardLayout(), metadata, sitemap(), TerminePage(), getPublishedPosts(), getPastEvents() (+5 more)

### Community 24 - "DirectoryTable"
Cohesion: 0.10
Nodes (25): compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase (+17 more)

### Community 25 - "securityLabels.ts"
Cohesion: 0.17
Nodes (14): sparkGeometry, OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, TYPE_LABELS, TYPE_ORDER, typeHint(), typeLabel (+6 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.23
Nodes (12): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+4 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "EventForm.tsx"
Cohesion: 0.24
Nodes (7): toggleAllDay(), EventFormData, toDateTimeValue(), toDayValue(), MarkdownEditor(), end(), offset()

### Community 29 - "Alle Schalter"
Cohesion: 0.12
Nodes (15): Als Mitglied ansehen, Debug-Modus und Mitgliederansicht, Die Debug-Leiste, Einschalten, Alle Schalter, Bedienung, E-Mail, Feature Flags (+7 more)

### Community 30 - "countries.ts"
Cohesion: 0.13
Nodes (22): display(), SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS, countryName() (+14 more)

### Community 31 - "contact.ts"
Cohesion: 0.25
Nodes (6): MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, ContactInput, SPAM_KEYWORDS, legitimate

### Community 32 - "campus-plan.py"
Cohesion: 0.10
Nodes (29): datetime, json, math, pathlib, re, d(), main(), outer_rings() (+21 more)

### Community 33 - "membership.ts"
Cohesion: 0.14
Nodes (23): setStudentEndYearAction(), StudentStatusEditor(), ageAt(), changedStudentYears(), currentStudentEndYear(), DATENSCHUTZ_URL, formatYearRanges(), isOldEnough() (+15 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.22
Nodes (14): CLOUDS, Contact, KosmosTimeline(), MemberCard(), random(), starField(), STARS, subscribeFullscreen() (+6 more)

### Community 35 - "DirectoryTable.tsx"
Cohesion: 0.07
Nodes (34): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, statusMeta(), TerminationItem, TerminationList(), AddFeeYearCard() (+26 more)

### Community 36 - "cn"
Cohesion: 0.08
Nodes (24): CtaCard(), MembershipCertificateCard(), NewsletterRow(), NewsletterSection(), useOwnNewsletter(), SectionHeader(), StatTile(), ShareButton() (+16 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "passwordStrength.ts"
Cohesion: 0.21
Nodes (10): NewUserForm(), handleSubmit(), evaluatePassword(), generatePassword(), PASSWORD_MIN_LENGTH, PasswordCriterion, PasswordScore, PasswordStrength (+2 more)

### Community 40 - "ApplicationWizard"
Cohesion: 0.70
Nodes (5): ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit()

### Community 41 - "blog/actions.ts"
Cohesion: 0.36
Nodes (10): beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager(), handleDrop() (+2 more)

### Community 42 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (30): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, hasControlChars(), isPlausibleBirthDate(), isValidPhone() (+22 more)

### Community 43 - "EditUserForm.tsx"
Cohesion: 0.07
Nodes (24): EmailChangeForm(), PasswordChangeButton(), dynamic, metadata, ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP (+16 more)

### Community 44 - "@hugeicons/core-free-icons"
Cohesion: 0.09
Nodes (43): @hugeicons/core-free-icons, @hugeicons/react, next-auth, react, StudentStatusPrompt(), ActionResult, Mode, DeleteMemberSectionProps (+35 more)

### Community 45 - "dashboard/page.tsx"
Cohesion: 0.12
Nodes (13): MailSuccessDialog(), ADMIN_ACTIONS, getStatusIcon(), ProfileSummary(), ProfileSummaryUser, QueryParamDialog(), EntryDetails(), EntryRow() (+5 more)

### Community 46 - "rundmail-senden.md"
Cohesion: 0.13
Nodes (12): Die Signatur: wichtiger, als der Name sagt, Mitglied anlegen oder bearbeiten, Reihenfolge, Vorstand und Signatur pflegen, Beispiel, Platzhalter in Mails, Warum „Guten Tag“ statt „Liebe/Lieber“?, Mail an einzelne Personen (+4 more)

### Community 47 - "berlinTime.ts"
Cohesion: 0.22
Nodes (15): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), isSameBerlinDay(), pad(), parseBerlinLocalInput(), PARTS (+7 more)

### Community 48 - "iban.ts"
Cohesion: 0.22
Nodes (21): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+13 more)

### Community 49 - "app/blog/page.tsx"
Cohesion: 0.25
Nodes (9): generateMetadata(), LeadPost(), MetaLine(), PostRow(), Props, BlogGallery(), blogImageSrcSet(), blogImageUrl() (+1 more)

### Community 50 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 51 - "MailForm.tsx"
Cohesion: 0.09
Nodes (18): MailAnnouncement, byStatusThenName(), MAIL_KINDS, MailForm(), MailFormProps, MailKind, MailUserOption, STATUS_ORDER (+10 more)

### Community 52 - "messages.ts"
Cohesion: 0.20
Nodes (17): accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage(), exitMessage(), exitNoticeMessage(), feeReminderMessage(), greeting(), LINK_EXPIRY() (+9 more)

### Community 53 - "forgot-password/actions.ts"
Cohesion: 0.20
Nodes (18): ref_crypto, EMAIL_CHANGE_ERRORS, requestPasswordChange(), requestPasswordReset(), resetPassword(), passwordResetMessage(), consumeRateLimit(), hashKey() (+10 more)

### Community 54 - "[id]/kalender.ics/route.ts"
Cohesion: 0.33
Nodes (5): GET(), icsAttachment(), buildEventIcs(), icsFileName(), NOW

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "newsletter.md"
Cohesion: 0.14
Nodes (11): Danach, Felder, Termin anlegen, Wo veröffentlichte Termine erscheinen, Newsletter oder Mitteilung?, Wie der Newsletter-Status entsteht, Newsletter oder Mitteilung?, So geht's (+3 more)

### Community 57 - "requireDebugAdmin"
Cohesion: 0.25
Nodes (9): removeRateLimitEntry(), triggerDeploy(), requireDebugAdmin(), bucketFromKey(), deleteRateLimitEntry(), getRateLimitEntries(), RateLimitBucketSummary, RateLimitEntryItem (+1 more)

### Community 58 - "sepa.ts"
Cohesion: 0.23
Nodes (16): field(), POST(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate(), isValidCreditorId() (+8 more)

### Community 59 - "authz.ts"
Cohesion: 0.13
Nodes (24): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), FeatureFlagsPage(), commit, DebugBar() (+16 more)

### Community 60 - "newsletterToken.ts"
Cohesion: 0.27
Nodes (10): GET(), POST(), RFC-8058, createNewsletterToken(), key(), NEWSLETTER_UNSUBSCRIBE_PATH, newsletterUnsubscribeUrls(), sign() (+2 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "userService.ts"
Cohesion: 0.13
Nodes (28): bcryptjs, setOwnNewsletterAction(), setNewsletterByTokenAction(), globalForPrisma, prisma, normalizeEmail(), getPendingRegistrationStats(), PendingRegistrationStats (+20 more)

### Community 63 - "Site.tsx"
Cohesion: 0.11
Nodes (15): facts, metadata, metadata, dynamic, metadata, SearchParams, ViewSwitch(), LorenzAttractor (+7 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "isFeatureEnabled"
Cohesion: 0.12
Nodes (25): @prisma/client, POST(), GET(), ContactRequestsPage(), KontoPage(), deleteUserAction(), EditUserPage(), metadata (+17 more)

### Community 67 - "vorstand/actions.ts"
Cohesion: 0.25
Nodes (13): deleteMember(), deletePhotoAction(), moveMemberInList(), revalidateBoard(), saveMember(), BoardPhotoUploader(), handleDelete(), handleDrop() (+5 more)

### Community 68 - "app/page.tsx"
Cohesion: 0.15
Nodes (13): HomePage(), levels, STRIP_IDS, STUDY_PROGRAMS, tone(), CampusPlan(), MarketDiffusion, PauseOffscreen() (+5 more)

### Community 69 - "ref_node_assert"
Cohesion: 0.17
Nodes (8): ref_node_assert, ref_node_test, ADMIN_SESSION_MAX_MS, adminSessionExpired(), one, two, base, directDebit

### Community 71 - "mitglied-werden/actions.ts"
Cohesion: 0.14
Nodes (32): requestBackupLink(), submitContactRequest(), resendVerificationEmail(), submitMembershipApplication(), registerUser(), notifyAdminsAboutRegistration(), verifyEmail(), EmailMessage (+24 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.11
Nodes (33): EditBlogPage(), EditEventPage(), AdminEventsPage(), startOfBerlinDay(), UPCOMING_ALERT_MONTHS, AnnouncedEvent, createEvent(), deleteEventById() (+25 more)

### Community 77 - "mitglied-werden/page.tsx"
Cohesion: 0.17
Nodes (15): JourneyRail(), ApplicationStage(), dynamic, metadata, Props, toDateInput(), JOURNEY_STEPS, JourneyStage (+7 more)

### Community 78 - "executeAction"
Cohesion: 0.20
Nodes (24): createDraft(), deletePost(), savePost(), removeMembershipApplication(), createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction() (+16 more)

### Community 79 - "satzung/page.tsx"
Cohesion: 0.12
Nodes (32): UserManagementPage(), BankDetailsForm(), submit(), ZahlungenPage(), dynamic, metadata, SatzungPage(), annualFee() (+24 more)

### Community 81 - "app/vorstand/page.tsx"
Cohesion: 0.16
Nodes (12): AdminBoardPage(), getInitials(), metadata, VorstandPage(), LinkedInGlyph(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, boardPhotoUrl() (+4 more)

### Community 82 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "altcha.ts"
Cohesion: 0.12
Nodes (20): server-only, GET(), message(), ContactForm(), dynamic, KontaktPage(), metadata, createPrismaClient() (+12 more)

### Community 86 - "securityEventService.ts"
Cohesion: 0.18
Nodes (17): SecurityPage(), EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), DayBucket, emptyCounts(), getActivityHeatmap(), getRegistrationFunnel() (+9 more)

### Community 87 - "auth.ts"
Cohesion: 0.20
Nodes (9): AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError, signIn (+1 more)

### Community 89 - "errors.ts"
Cohesion: 0.17
Nodes (22): zod, requestEmailChangeAction(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), createUserAction() (+14 more)

### Community 91 - "PhysicsTimeline.tsx"
Cohesion: 0.27
Nodes (6): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline()

### Community 92 - "redirectError.ts"
Cohesion: 0.67
Nodes (3): getRedirectTarget(), isRedirectError(), RedirectTarget

### Community 93 - "Bilder im Blog"
Cohesion: 0.20
Nodes (8): Alternativtext, Bilder im Blog, Hochladen, Ordnen, Blogbeitrag schreiben, Felder, Markdown in 30 Sekunden, Wo der Beitrag erscheint

### Community 94 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 95 - "getOptionalUser"
Cohesion: 0.13
Nodes (21): GET(), GET(), GET(), confirmPrivacyPolicy(), ConfirmPrivacyPolicyPage(), metadata, Props, DATENSCHUTZ (+13 more)

### Community 96 - "notfall-abschalten.md"
Cohesion: 0.12
Nodes (12): Badges, Kontaktanfragen bearbeiten, Pro Anfrage, Danach, Notfall: eine Funktion abschalten, Die häufigsten Namen, Rate-Limit-Sperre aufheben, Wenn es eilt (+4 more)

### Community 97 - "Anleitungen für Admins"
Cohesion: 0.25
Nodes (8): 1 · Grundlagen, 2 · Konten, 3 · Aufnahme und Austritt, 4 · Beiträge, 5 · Inhalte der Website, 6 · Kommunikation, 7 · Technik (nur im Debug-Modus), Anleitungen für Admins

### Community 98 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 99 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 100 - "Mitgliedsantrag bearbeiten"
Cohesion: 0.33
Nodes (5): Ablehnen, Antrag prüfen, Aufnehmen, Löschen, Mitgliedsantrag bearbeiten

### Community 101 - "Zahlungen und Ausnahmen pflegen"
Cohesion: 0.33
Nodes (6): Abweichenden Betrag eintragen (Ausnahme), Als bezahlt markieren, Erst freischalten, Sonderstatus umschalten, Verlauf ansehen, Zahlungen und Ausnahmen pflegen

### Community 102 - "RegistrationFunnel.tsx"
Cohesion: 0.40
Nodes (5): RegistrationFunnel(), share(), Stage, STAGES, RegistrationFunnel

### Community 103 - "Benutzerverwaltung: Liste, Suche, Filter"
Cohesion: 0.33
Nodes (6): Beitragsjahr wählen, Benutzerverwaltung: Liste, Suche, Filter, Die Tabelle, Mehrere Konten auswählen, Oben: Kennzahlen, Suchen und filtern

### Community 104 - "ServerDashboard.tsx"
Cohesion: 0.28
Nodes (6): BackupSection(), DeploySection(), formatUptime(), Sample, ServerDashboard(), timeLabel()

### Community 105 - "Dein eigenes Konto"
Cohesion: 0.50
Nodes (4): Dein eigenes Konto, Newsletter, Passwort oder E-Mail-Adresse ändern, Profil und Mitgliedsdaten

### Community 106 - "Konto bearbeiten"
Cohesion: 0.50
Nodes (4): Adminbereich, Konto bearbeiten, Newsletter, Persönliche Daten, Adresse, Studium, Beruf

### Community 107 - "Konto löschen"
Cohesion: 0.50
Nodes (4): Konto löschen, So geht's, Voraussetzung, Was du nicht von Hand löschen musst

### Community 108 - "Austritte im Blick behalten"
Cohesion: 0.50
Nodes (4): Austritte im Blick behalten, Typischer Ablauf bei offenen Beiträgen, Was beim Austritt passiert, Wo du Austritte siehst

### Community 109 - "Neues Beitragsjahr anlegen"
Cohesion: 0.40
Nodes (5): Hinweis „Erst x von y Mitgliedern haben einen Beitragseintrag“, Neues Beitragsjahr anlegen, So geht's, Warum manche Jahre weit in der Zukunft liegen, Was dabei passiert

### Community 110 - "SEPA-Lastschrift erzeugen"
Cohesion: 0.50
Nodes (4): Danach, Datei erzeugen, SEPA-Lastschrift erzeugen, Wer in die Datei kommt

### Community 111 - "kosmos/page.tsx"
Cohesion: 0.20
Nodes (15): revealKosmosContactAction(), setKosmosVisibilityAction(), KosmosVisibility(), Sky(), dynamic, KosmosPage(), metadata, toYear() (+7 more)

### Community 112 - "Der Admin-Bereich im Überblick"
Cohesion: 0.67
Nodes (3): Der Admin-Bereich im Überblick, Gut zu wissen, Rollen

### Community 113 - "Konto von Hand anlegen"
Cohesion: 0.67
Nodes (3): Konto von Hand anlegen, So geht's, Was dabei passiert

### Community 119 - "feature-flags/actions.ts"
Cohesion: 0.39
Nodes (5): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, isFeatureFlagKey(), setFeatureFlagEnabled()

### Community 120 - "dashboard/kontakt/actions.ts"
Cohesion: 0.39
Nodes (7): markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), deleteContactRequest(), setContactRequestHandled()

### Community 121 - "userImport.test.ts"
Cohesion: 0.24
Nodes (9): EXAMPLE, FEE_FIELDS, FEES_EXAMPLE, IMPORT_EXCLUDED_FIELDS, IMPORT_KEYS, IMPORT_SECTIONS, ImportEntry, ImportField (+1 more)

### Community 122 - "MarkdownViewer.tsx"
Cohesion: 0.40
Nodes (3): react-markdown, remark-gfm, shiftedHeadings

### Community 123 - "AccountPanel"
Cohesion: 0.38
Nodes (5): AccountPanel(), handleSubmit(), ResetPasswordForm(), handleSubmit(), validateNewPassword()

### Community 124 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 125 - "mailHistory.ts"
Cohesion: 0.53
Nodes (4): SentMailInput, sentMailRecord(), logSentMail(), SENT_MAIL_RETENTION_DAYS

### Community 126 - "mail/actions.ts"
Cohesion: 0.23
Nodes (13): parseMailForm(), sendEmailAction(), parseDirectMailForm(), sendDirectMailAction(), resolveRecipientEmails(), resolveUsersByIds(), resolveUsersByTarget(), sendMailForTarget() (+5 more)

### Community 127 - "bulkCreateUsersAction"
Cohesion: 0.60
Nodes (6): bulkCreateUsersAction(), BulkImport(), check(), create(), loadFile(), replaceEntry()

### Community 128 - "sendReport.ts"
Cohesion: 0.47
Nodes (3): describeSendError(), sendEach(), SmtpError

### Community 129 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 130 - "clientIp.ts"
Cohesion: 0.50
Nodes (3): ref_node_net, addressKey(), HeaderBag

### Community 131 - "FeeDefaultsCard"
Cohesion: 1.00
Nodes (3): FeeDefaultsCard(), run(), save()

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **579 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+574 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 720 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `opengraph-image.tsx`, `index.ts`, `app/layout.tsx`, `serverStatus.ts`, `blogService.ts`, `zertifikat/pdf/route.ts`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `package.json`, `AppError`, `app/termine/[id]/page.tsx`, `lib/siteUrl.ts`, `gravityPhysics.ts`, `EventForm.tsx`, `KosmosTimeline.tsx`, `DirectoryTable.tsx`, `cn`, `blog/actions.ts`, `ApplicationWizard.tsx`, `EditUserForm.tsx`, `@hugeicons/core-free-icons`, `dashboard/page.tsx`, `app/blog/page.tsx`, `MailForm.tsx`, `forgot-password/actions.ts`, `[id]/kalender.ics/route.ts`, `requireDebugAdmin`, `sepa.ts`, `authz.ts`, `newsletterToken.ts`, `Site.tsx`, `isFeatureEnabled`, `vorstand/actions.ts`, `app/page.tsx`, `mitglied-werden/actions.ts`, `mitglied-werden/page.tsx`, `executeAction`, `satzung/page.tsx`, `app/vorstand/page.tsx`, `altcha.ts`, `errors.ts`, `getOptionalUser`, `kosmos/page.tsx`, `forgot-password/layout.tsx`, `login/layout.tsx`, `abmelden/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`, `feature-flags/actions.ts`, `dashboard/kontakt/actions.ts`, `Footer.tsx`, `mail/actions.ts`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `siteUrl()` connect `mitglied-werden/actions.ts` to `WirtschaftsPhysik Alumni e. V. — Vereinswebsite`, `layout.ts`, `mailService.ts`, `ics.ts`, `forgot-password/actions.ts`, `newsletterToken.ts`, `userService.ts`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `Befunde vom 2026-10-20` connect `WirtschaftsPhysik Alumni e. V. — Vereinswebsite` to `mitglied-werden/actions.ts`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _579 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1173054587688734 - nodes in this community are weakly interconnected._
- **Should `serverStatus.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0931174089068826 - nodes in this community are weakly interconnected._