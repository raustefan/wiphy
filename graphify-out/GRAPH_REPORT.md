# Graph Report - wiphy  (2026-10-26)

## Corpus Check
- 411 files · ~185,761 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2273 nodes · 7191 edges · 119 communities (104 shown, 15 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `18fa569d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ref_node_assert
- isFeatureEnabled
- index.ts
- mailService.ts
- boardService.ts
- feeService.ts
- userService.ts
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
- requireAdmin
- schemas.ts
- seed.ts
- next
- app/layout.tsx
- DirectoryTable
- securityLabels.ts
- OutcomeTimeline.tsx
- gravityPhysics.ts
- @hugeicons/react
- Alle Schalter
- countries.ts
- app/kontakt/actions.ts
- convert_alumni.py
- siteUrl
- KosmosTimeline.tsx
- MarkdownViewer.tsx
- auth.ts
- compilerOptions
- devDependencies
- authz.ts
- satzung/page.tsx
- blog/actions.ts
- DirectoryTable.tsx
- EditUserForm.tsx
- ServerDashboard.tsx
- ApplicationWizard.tsx
- rundmail-senden.md
- feeDefaultService.ts
- iban.ts
- app/page.tsx
- EmailBodyField.tsx
- ApplicationList
- Button.tsx
- executeAction
- sendEmail
- EditUserForm
- newsletter.md
- RateLimitTable
- sepa.ts
- blogImageProcessing.ts
- Footer.tsx
- userUpdateData.ts
- security/page.tsx
- app/blog/page.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- featureFlagService.ts
- BulkImport.tsx
- MailForm.tsx
- CLAUDE.md
- dashboard/page.tsx
- backup.sh
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- mitglied-werden/page.tsx
- requireUser
- vorstand/actions.ts
- DeleteMemberSection
- altcha.ts
- altcha.d.ts
- postcss.config.mjs
- prisma.ts
- securityEventService.ts
- mail/page.tsx
- { GET, POST }
- messages.ts
- PhysicsTimeline.tsx
- movePostImage
- Bilder im Blog
- sitemap.ts
- getOptionalUser
- sicherheit.md
- Anleitungen für Admins
- ActivityHeatmap.tsx
- blogImages.ts
- Mitgliedsantrag bearbeiten
- Zahlungen und Ausnahmen pflegen
- RegistrationFunnel.tsx
- Benutzerverwaltung: Liste, Suche, Filter
- EmailComposerDialog
- Dein eigenes Konto
- Konto bearbeiten
- Konto löschen
- Austritte im Blick behalten
- Neues Beitragsjahr anlegen
- SEPA-Lastschrift erzeugen
- eslint.config.mjs
- Der Admin-Bereich im Überblick
- Konto von Hand anlegen
- forgot-password/layout.tsx
- login/layout.tsx
- abmelden/layout.tsx
- reset-password/layout.tsx
- verify-email/layout.tsx

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
- `GET()` --calls--> `getOptionalUser()`  [EXTRACTED]
  src/app/api/users/route.ts → src/lib/server/authz.ts
- `MetaLine()` --calls--> `formatDate()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/format.ts

## Import Cycles
- None detected.

## Communities (119 total, 15 thin omitted)

### Community 0 - "ref_node_assert"
Cohesion: 0.19
Nodes (16): ref_node_assert, ref_node_test, EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay() (+8 more)

### Community 1 - "isFeatureEnabled"
Cohesion: 0.29
Nodes (10): ContactRequestsPage(), KontoPage(), notifyAdminsAboutRegistration(), verifyEmail(), adminRegistrationNoticeMessage(), emailChangedNoticeMessage(), pruneUnverifiedRegistrations(), getContactRequests() (+2 more)

### Community 2 - "index.ts"
Cohesion: 0.10
Nodes (30): CtaCard(), InfoTooltip(), RateLimitTableProps, FeeDefaultRow, ShareButton(), share(), BadgeTone, toneClasses (+22 more)

### Community 3 - "mailService.ts"
Cohesion: 0.06
Nodes (46): sanitize-html, blockHtml(), blockText(), derivePreheader(), EmailBlock, EmailSignature, nl2br(), renderBlocksEditorHtml() (+38 more)

### Community 4 - "boardService.ts"
Cohesion: 0.10
Nodes (34): POST(), EditBoardMemberPage(), ACCEPTED_BOARD_PHOTO_TYPES, BOARD_PHOTO_ACCEPT_ATTRIBUTE, MAX_BOARD_PHOTO_UPLOAD_BYTES, moveMemberOrder(), ImageBytes, processBoardPhoto() (+26 more)

### Community 5 - "feeService.ts"
Cohesion: 0.22
Nodes (16): UserManagementPage(), wasMemberInYear(), clearFeeAmountOverride(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees(), resolveIsStudentDefault(), syncStudentYear() (+8 more)

### Community 6 - "userService.ts"
Cohesion: 0.20
Nodes (20): EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), requestPasswordReset(), emailChangeMessage(), LINK_EXPIRY(), passwordResetMessage(), normalizeEmail() (+12 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.07
Nodes (40): ref_node_fs, ref_node_os, ref_node_path, prisma, GET(), GET(), ServerPage(), alt (+32 more)

### Community 8 - "anleitungen/README.md"
Cohesion: 0.15
Nodes (8): Login sperren, Austritt, Ausschluss oder Tod eintragen, Was dabei passiert, So rechnet die Website Beiträge, Standard oder Ausnahme, Beitragssätze festlegen, So gelten die Sätze, Zahlungserinnerung schicken

### Community 9 - "blogService.ts"
Cohesion: 0.11
Nodes (30): BlogIndexPage(), AdminBlogPage(), BlogImageRow, BlogPostWriteData, countImagesForPost(), createPost(), deletePostById(), eventLinkSelect (+22 more)

### Community 10 - "zertifikat/pdf/route.ts"
Cohesion: 0.08
Nodes (41): @react-pdf/renderer, GET(), GET(), DashboardPage(), ZahlungenPage(), metadata, impressum(), ImpressumPage() (+33 more)

### Community 11 - "events.ts"
Cohesion: 0.11
Nodes (39): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), generateMetadata(), Props, EventCard() (+31 more)

### Community 12 - "ics.ts"
Cohesion: 0.17
Nodes (18): RFC-5545, GET(), icsEnd(), icsAttachment(), addDays(), berlinDateStamp(), buildEventIcs(), calendar() (+10 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (32): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+24 more)

### Community 14 - "formatNumber"
Cohesion: 0.18
Nodes (12): Delta(), StatTile(), StatTileProps, Tone, TONE_DOT, PAD, PLOT, TICKS (+4 more)

### Community 15 - "server-und-logs.md"
Cohesion: 0.10
Nodes (16): Als Mitglied ansehen, Debug-Modus und Mitgliederansicht, Die Debug-Leiste, Einschalten, Automatische Backups prüfen, Backup herunterladen, Datenschutz, Komplettes Backup anfordern (+8 more)

### Community 16 - "package.json"
Cohesion: 0.09
Nodes (21): name, packageManager, private, version, altcha, altcha-lib, babel-plugin-react-compiler, nodemailer (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (27): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, next (+19 more)

### Community 18 - "AppError"
Cohesion: 0.11
Nodes (36): acceptMembershipApplication(), declineMembershipApplication(), notifyApplicant(), removeMembershipApplication(), MembershipApplicationsPage(), withdrawMembershipApplication(), WithdrawApplicationButton(), withdraw() (+28 more)

### Community 19 - "requireAdmin"
Cohesion: 0.23
Nodes (19): createDraft(), deletePost(), savePost(), createEventDraft(), deleteFeeDefaultYear(), initializeBillingYear(), revertFeeAmount(), saveFeeDefault() (+11 more)

### Community 20 - "schemas.ts"
Cohesion: 0.05
Nodes (48): hasControlChars(), isCalendarDate(), isPlausibleBirthDate(), isValidPhone(), isValidPostalCode(), MAX_ANNUAL_FEE, POSTAL_CODE_PATTERNS, addAddressIssues() (+40 more)

### Community 21 - "seed.ts"
Cohesion: 0.33
Nodes (4): adapter, prisma, dotenv, @prisma/adapter-pg

### Community 22 - "next"
Cohesion: 0.10
Nodes (30): nextConfig, @hugeicons/core-free-icons, next, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, dynamic (+22 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.11
Nodes (18): escapeXml(), GET(), DashboardLayout(), metadata, src_app_globals, body, metadata, mono (+10 more)

### Community 24 - "DirectoryTable"
Cohesion: 0.10
Nodes (25): compareBy(), compareNullable(), DirectoryTable(), selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase (+17 more)

### Community 25 - "securityLabels.ts"
Cohesion: 0.17
Nodes (14): sparkGeometry, OUTCOME_LABELS, OUTCOME_TONES, REASON_LABELS, TYPE_LABELS, TYPE_ORDER, typeHint(), typeLabel (+6 more)

### Community 26 - "OutcomeTimeline.tsx"
Cohesion: 0.21
Nodes (13): columnPath(), labelStride(), longDayLabel(), MONTHS, niceScale(), Scale, shortDayLabel(), OutcomeTimeline() (+5 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "@hugeicons/react"
Cohesion: 0.10
Nodes (28): @hugeicons/react, react, DeletePostButton(), ContactRequestItem, dateFormat, ApplicationItem, dateFormat, dateTimeFormat (+20 more)

### Community 29 - "Alle Schalter"
Cohesion: 0.11
Nodes (16): Badges, Kontaktanfragen bearbeiten, Pro Anfrage, Alle Schalter, Bedienung, E-Mail, Feature Flags, Kontaktformular (+8 more)

### Community 30 - "countries.ts"
Cohesion: 0.15
Nodes (17): SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS, countryName(), english (+9 more)

### Community 31 - "app/kontakt/actions.ts"
Cohesion: 0.16
Nodes (16): ref_node_net, submitContactRequest(), submitMembershipApplication(), MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, contactRequestMessage(), addressKey() (+8 more)

### Community 32 - "convert_alumni.py"
Cohesion: 0.26
Nodes (12): datetime, json, re, admin_note(), convert(), day(), main(), phone() (+4 more)

### Community 33 - "siteUrl"
Cohesion: 0.24
Nodes (12): ref_crypto, GET(), POST(), RFC-8058, createNewsletterToken(), key(), NEWSLETTER_UNSUBSCRIBE_PATH, newsletterUnsubscribeUrls() (+4 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (24): CLOUDS, Contact, KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField() (+16 more)

### Community 35 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 36 - "auth.ts"
Cohesion: 0.19
Nodes (10): AccountDisabledError, CaptchaFailedError, dummyPasswordHash, EmailNotVerifiedError, handlers, LoginFeatureDisabledError, LoginRateLimitedError, signIn (+2 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "authz.ts"
Cohesion: 0.13
Nodes (23): ref_node_child_process, ref_node_util, COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), commit, DebugBar(), LINKS (+15 more)

### Community 40 - "satzung/page.tsx"
Cohesion: 0.13
Nodes (27): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ApplicationWizard(), currentFormValues(), goToStep() (+19 more)

### Community 41 - "blog/actions.ts"
Cohesion: 0.19
Nodes (17): beginImageAction(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), setBlogCoverImage(), BlogImageManager(), handleDrop() (+9 more)

### Community 42 - "DirectoryTable.tsx"
Cohesion: 0.07
Nodes (37): statusMeta(), TerminationItem, TerminationList(), BackupHistory(), AmountDialog(), chipTones, CommentDialog(), DirectoryAccount (+29 more)

### Community 43 - "EditUserForm.tsx"
Cohesion: 0.13
Nodes (12): ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, Checkbox(), describeControl() (+4 more)

### Community 44 - "ServerDashboard.tsx"
Cohesion: 0.07
Nodes (43): next-auth, EmailChangeForm(), PasswordChangeButton(), BackupSection(), DeploySection(), formatUptime(), Sample, ServerDashboard() (+35 more)

### Community 45 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (33): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, ApplicationStage(), toDateInput(), FeeDefaultEntry (+25 more)

### Community 46 - "rundmail-senden.md"
Cohesion: 0.13
Nodes (12): Die Signatur: wichtiger, als der Name sagt, Mitglied anlegen oder bearbeiten, Reihenfolge, Vorstand und Signatur pflegen, Beispiel, Platzhalter in Mails, Warum „Guten Tag“ statt „Liebe/Lieber“?, Mail an einzelne Personen (+4 more)

### Community 47 - "feeDefaultService.ts"
Cohesion: 0.42
Nodes (7): deleteFeeDefault(), findFeeDefaults(), upsertFeeDefault(), getFeeDefaults(), getFeeRatesForYear(), removeFeeDefault(), setFeeDefault()

### Community 48 - "iban.ts"
Cohesion: 0.21
Nodes (22): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+14 more)

### Community 49 - "app/page.tsx"
Cohesion: 0.17
Nodes (21): generateMetadata(), Props, PublicBlogPost(), LeadPost(), PostRow(), HomePage(), levels, STRIP_IDS (+13 more)

### Community 50 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 51 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 52 - "Button.tsx"
Cohesion: 0.25
Nodes (7): ButtonColor, ButtonLinkProps, ButtonProps, ButtonSize, ButtonVariant, colorClasses, sizeClasses

### Community 53 - "executeAction"
Cohesion: 0.14
Nodes (19): zod, setOwnNewsletterAction(), markContactRequestHandled(), removeContactRequest(), ContactRequestList(), confirmDelete(), run(), removeRateLimitEntry() (+11 more)

### Community 54 - "sendEmail"
Cohesion: 0.14
Nodes (24): bcryptjs, requestBackupLink(), triggerDeploy(), resendVerificationEmail(), registerUser(), resetPassword(), resetSchema, backupLinkMessage() (+16 more)

### Community 55 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 56 - "newsletter.md"
Cohesion: 0.14
Nodes (11): Danach, Felder, Termin anlegen, Wo veröffentlichte Termine erscheinen, Newsletter oder Mitteilung?, Wie der Newsletter-Status entsteht, Newsletter oder Mitteilung?, So geht's (+3 more)

### Community 57 - "RateLimitTable"
Cohesion: 0.24
Nodes (8): RateLimitTable(), confirmDelete(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 58 - "sepa.ts"
Cohesion: 0.23
Nodes (16): field(), POST(), agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate(), isValidCreditorId() (+8 more)

### Community 59 - "blogImageProcessing.ts"
Cohesion: 0.18
Nodes (9): sharp, BACKGROUND, icon(), main(), MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, processBlogImage(), ProcessedBlogImage (+1 more)

### Community 60 - "Footer.tsx"
Cohesion: 0.31
Nodes (5): ContrastToggle(), columns, legalLinks, GravityTrigger(), PluckedString()

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "security/page.tsx"
Cohesion: 0.18
Nodes (15): dynamic, metadata, SecurityPage(), ReasonBars(), reasonLabel(), getPendingRegistrationStats(), UNVERIFIED_TTL_HOURS, bucketFromKey() (+7 more)

### Community 63 - "app/blog/page.tsx"
Cohesion: 0.09
Nodes (23): generateMetadata(), MetaLine(), Props, facts, metadata, metadata, dynamic, metadata (+15 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "featureFlagService.ts"
Cohesion: 0.15
Nodes (19): @prisma/client, setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), metadata, Footer(), FEATURE_FLAG_CATEGORIES (+11 more)

### Community 67 - "BulkImport.tsx"
Cohesion: 0.06
Nodes (39): byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, bulkCreateUsersAction(), ImportIssue, ImportRowResult (+31 more)

### Community 68 - "MailForm.tsx"
Cohesion: 0.13
Nodes (13): MailAnnouncement, MAIL_KINDS, MailFormProps, MailKind, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS (+5 more)

### Community 71 - "dashboard/page.tsx"
Cohesion: 0.13
Nodes (13): MailSuccessDialog(), MembershipCertificateCard(), dynamic, metadata, NewsletterRow(), NewsletterSection(), useOwnNewsletter(), ADMIN_ACTIONS (+5 more)

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.11
Nodes (35): EditBlogPage(), deleteEventAction(), revalidateEvent(), saveEventAction(), startOfBerlinDay(), UPCOMING_ALERT_MONTHS, createEvent(), deleteEventById() (+27 more)

### Community 77 - "mitglied-werden/page.tsx"
Cohesion: 0.12
Nodes (20): AccountPanel(), handleSubmit(), JourneyRail(), dynamic, metadata, MitgliedWerdenPage(), Props, ResetPasswordForm() (+12 more)

### Community 78 - "requireUser"
Cohesion: 0.12
Nodes (26): revealKosmosContactAction(), setKosmosVisibilityAction(), parseMailForm(), sendEmailAction(), deleteUserAction(), updateUser(), createUserAction(), importEntriesSchema (+18 more)

### Community 79 - "vorstand/actions.ts"
Cohesion: 0.25
Nodes (13): deleteMember(), deletePhotoAction(), moveMemberInList(), revalidateBoard(), saveMember(), BoardPhotoUploader(), handleDelete(), handleDrop() (+5 more)

### Community 81 - "altcha.ts"
Cohesion: 0.14
Nodes (16): ContactForm(), dynamic, KontaktPage(), metadata, createLoginChallenge(), LoginForm(), dynamic, LoginPage() (+8 more)

### Community 82 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 85 - "prisma.ts"
Cohesion: 0.13
Nodes (21): server-only, GET(), message(), GET(), createPrismaClient(), globalForPrisma, prisma, getAltchaHmacKey() (+13 more)

### Community 86 - "securityEventService.ts"
Cohesion: 0.22
Nodes (13): EVENT_RETENTION_DAYS, PSEUDONYM_RETENTION_DAYS, addOutcome(), emptyCounts(), getActivityHeatmap(), getRegistrationFunnel(), getSecurityOverview(), HeatCell (+5 more)

### Community 87 - "mail/page.tsx"
Cohesion: 0.19
Nodes (11): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, EditEventPage() (+3 more)

### Community 89 - "messages.ts"
Cohesion: 0.14
Nodes (31): deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), EditUserPage(), signOut, EmailMessage (+23 more)

### Community 91 - "PhysicsTimeline.tsx"
Cohesion: 0.27
Nodes (6): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline()

### Community 92 - "movePostImage"
Cohesion: 0.25
Nodes (10): moveInOrder(), applyImageOrder(), deleteImage(), findImageForPost(), findImagesForPost(), movePostImage(), orderedIds(), removePostImage() (+2 more)

### Community 93 - "Bilder im Blog"
Cohesion: 0.20
Nodes (8): Alternativtext, Bilder im Blog, Hochladen, Ordnen, Blogbeitrag schreiben, Felder, Markdown in 30 Sekunden, Wo der Beitrag erscheint

### Community 94 - "sitemap.ts"
Cohesion: 0.33
Nodes (8): sitemap(), GET(), TerminePage(), buildCalendarIcs(), findPublishedPosts(), getPublishedPosts(), getPastEvents(), getUpcomingEvents()

### Community 95 - "getOptionalUser"
Cohesion: 0.17
Nodes (15): GET(), POST(), GET(), confirmPrivacyPolicy(), ConfirmPrivacyPolicyPage(), metadata, Props, DATENSCHUTZ (+7 more)

### Community 96 - "sicherheit.md"
Cohesion: 0.22
Nodes (7): Die häufigsten Namen, Rate-Limit-Sperre aufheben, Wenn es eilt, Sicherheits-Dashboard lesen, Von oben nach unten, Was gespeichert wird, Worauf du achten solltest

### Community 97 - "Anleitungen für Admins"
Cohesion: 0.25
Nodes (8): 1 · Grundlagen, 2 · Konten, 3 · Aufnahme und Austritt, 4 · Beiträge, 5 · Inhalte der Website, 6 · Kommunikation, 7 · Technik (nur im Debug-Modus), Anleitungen für Admins

### Community 98 - "ActivityHeatmap.tsx"
Cohesion: 0.36
Nodes (7): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, ActivityHeatmap

### Community 99 - "blogImages.ts"
Cohesion: 0.29
Nodes (6): ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, MAX_ADDITIONAL_BLOG_IMAGES, MAX_BLOG_IMAGES

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
Cohesion: 0.40
Nodes (5): Benutzerverwaltung: Liste, Suche, Filter, Die Tabelle, Mehrere Konten auswählen, Oben: Kennzahlen, Suchen und filtern

### Community 104 - "EmailComposerDialog"
Cohesion: 0.50
Nodes (4): useEmailEditor(), EmailComposerDialog(), closeDialog(), handleClose()

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
Cohesion: 0.50
Nodes (3): Hinweis „noch nicht angelegt“, Neues Beitragsjahr anlegen, Was dabei passiert

### Community 110 - "SEPA-Lastschrift erzeugen"
Cohesion: 0.50
Nodes (4): Danach, Datei erzeugen, SEPA-Lastschrift erzeugen, Wer in die Datei kommt

### Community 111 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 112 - "Der Admin-Bereich im Überblick"
Cohesion: 0.67
Nodes (3): Der Admin-Bereich im Überblick, Gut zu wissen, Rollen

### Community 113 - "Konto von Hand anlegen"
Cohesion: 0.67
Nodes (3): Konto von Hand anlegen, So geht's, Was dabei passiert

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **574 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+569 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 709 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `isFeatureEnabled`, `index.ts`, `boardService.ts`, `userService.ts`, `serverStatus.ts`, `zertifikat/pdf/route.ts`, `events.ts`, `ics.ts`, `MarketDiffusion.tsx`, `package.json`, `AppError`, `requireAdmin`, `app/layout.tsx`, `gravityPhysics.ts`, `@hugeicons/react`, `app/kontakt/actions.ts`, `siteUrl`, `KosmosTimeline.tsx`, `authz.ts`, `satzung/page.tsx`, `blog/actions.ts`, `DirectoryTable.tsx`, `EditUserForm.tsx`, `ServerDashboard.tsx`, `ApplicationWizard.tsx`, `app/page.tsx`, `Button.tsx`, `executeAction`, `sendEmail`, `sepa.ts`, `Footer.tsx`, `security/page.tsx`, `app/blog/page.tsx`, `featureFlagService.ts`, `BulkImport.tsx`, `MailForm.tsx`, `dashboard/page.tsx`, `eventService.ts`, `mitglied-werden/page.tsx`, `requireUser`, `vorstand/actions.ts`, `altcha.ts`, `prisma.ts`, `mail/page.tsx`, `messages.ts`, `sitemap.ts`, `getOptionalUser`, `forgot-password/layout.tsx`, `login/layout.tsx`, `abmelden/layout.tsx`, `reset-password/layout.tsx`, `verify-email/layout.tsx`?**
  _High betweenness centrality (0.167) - this node is a cross-community bridge._
- **Why does `siteUrl()` connect `siteUrl` to `WirtschaftsPhysik Alumni e. V. — Vereinswebsite`, `mailService.ts`, `userService.ts`, `events.ts`, `ics.ts`, `requireUser`, `AppError`, `sendEmail`, `app/kontakt/actions.ts`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `Befunde vom 2026-10-20` connect `WirtschaftsPhysik Alumni e. V. — Vereinswebsite` to `siteUrl`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _574 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10196078431372549 - nodes in this community are weakly interconnected._
- **Should `mailService.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06428988895382817 - nodes in this community are weakly interconnected._