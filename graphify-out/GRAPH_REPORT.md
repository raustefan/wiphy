# Graph Report - wiphy  (2026-10-21)

## Corpus Check
- 358 files · ~173,673 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 2, .example 1, .toml 1)

## Summary
- 2049 nodes · 6790 edges · 89 communities (79 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0d59023a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- sepa.ts
- ApplicationWizard.tsx
- mitglied-werden/page.tsx
- users/[id]/page.tsx
- ics.ts
- AppError
- serverStatus.ts
- satzung/page.tsx
- blogService.ts
- redirectError.ts
- events.ts
- Button
- MarketDiffusion.tsx
- feeCalculation.ts
- userService.ts
- package.json
- dependencies
- boardService.ts
- security/page.tsx
- schemas.ts
- opengraph-image.tsx
- dashboard/page.tsx
- app/layout.tsx
- DirectoryTable
- app/kontakt/page.tsx
- mailService.ts
- gravityPhysics.ts
- blog/actions.ts
- securityEventService.ts
- countries.ts
- iban.ts
- blogImages.ts
- mail/actions.ts
- KosmosTimeline.tsx
- feeDefaults.ts
- zertifikat/pdf/route.ts
- compilerOptions
- devDependencies
- @hugeicons/core-free-icons
- messages.ts
- altcha.ts
- feeService.ts
- BulkImport.tsx
- react
- membership.ts
- mail/page.tsx
- isFeatureEnabled
- executeAction
- DebugConsole.tsx
- MailForm.tsx
- ApplicationList
- EditUserForm.tsx
- MarkdownEditor.tsx
- prisma.ts
- EmailBodyField.tsx
- getOptionalUser
- EditUserForm
- berlinTime.ts
- feature-flags/page.tsx
- app/page.tsx
- userUpdateData.ts
- RateLimitTable
- Site.tsx
- scripts
- WirtschaftsPhysik Alumni e. V. — Vereinswebsite
- PhysicsTimeline.tsx
- setBlogCoverImage
- index.ts
- MarkdownViewer.tsx
- CLAUDE.md
- ref_node_assert
- paymentHistoryPdf.tsx
- deploy.sh
- allowBuilds (prisma, esbuild, sharp, unrs-resolver)
- GEMINI.md
- eventService.ts
- ApplicationWizard
- authz.ts
- Footer.tsx
- altcha.d.ts
- DeleteMemberSection
- sessionPolicy.test.ts
- postcss.config.mjs
- blogImageProcessing.ts
- { GET, POST }
- DirectoryTable.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 123 edges
2. `cn()` - 89 edges
3. `AppError` - 86 edges
4. `@hugeicons/core-free-icons` - 80 edges
5. `@hugeicons/react` - 80 edges
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
- `BlogImageManager()` --indirect_call--> `deleteBlogImage()`  [INFERRED]
  src/app/dashboard/blog/[id]/BlogImageManager.tsx → src/app/dashboard/blog/actions.ts

## Import Cycles
- None detected.

## Communities (89 total, 10 thin omitted)

### Community 0 - "next"
Cohesion: 0.10
Nodes (8): nextConfig, next, DashboardLayout(), metadata, metadata, metadata, metadata, metadata

### Community 1 - "sepa.ts"
Cohesion: 0.25
Nodes (15): field(), POST(), TIME_ZONE, agent(), buildPain008(), CREDITOR_ID_PATTERN, defaultMandateId(), isoDate() (+7 more)

### Community 2 - "ApplicationWizard.tsx"
Cohesion: 0.08
Nodes (28): InitialValues, STEP_ICONS, STEP_SCHEMAS, StepIndicator(), SUMMARY_FIELDS, hasControlChars(), isPlausibleBirthDate(), isValidPhone() (+20 more)

### Community 3 - "mitglied-werden/page.tsx"
Cohesion: 0.13
Nodes (21): ApplicationStage(), dynamic, metadata, MitgliedWerdenPage(), Props, toDateInput(), VerifyPanel(), WithdrawApplicationButton() (+13 more)

### Community 4 - "users/[id]/page.tsx"
Cohesion: 0.17
Nodes (19): EMAIL_CHANGE_ERRORS, requestEmailChangeAction(), requestPasswordChange(), revealKosmosEmailAction(), setKosmosVisibilityAction(), deleteUserAction(), EditUserPage(), metadata (+11 more)

### Community 5 - "ics.ts"
Cohesion: 0.12
Nodes (26): RFC-5545, GET(), generateMetadata(), GET(), TerminePage(), icsEnd(), addDays(), berlinDateStamp() (+18 more)

### Community 6 - "AppError"
Cohesion: 0.17
Nodes (22): requestBackupLink(), deleteOwnAccount(), disableOwnAccount(), mailLater(), passwordSchema, terminateMembership(), terminateSchema, withdrawMembershipTermination() (+14 more)

### Community 7 - "serverStatus.ts"
Cohesion: 0.11
Nodes (29): ref_node_os, GET(), ServerPage(), cpuPercent(), cpuTimes, DEPLOY_ENV_KEYS, DEPLOY_LOCK, DEPLOY_LOG (+21 more)

### Community 8 - "satzung/page.tsx"
Cohesion: 0.14
Nodes (17): DATENSCHUTZ, metadata, impressum(), ImpressumPage(), metadata, dynamic, metadata, SATZUNG (+9 more)

### Community 9 - "blogService.ts"
Cohesion: 0.11
Nodes (29): BlogIndexPage(), EditBlogPage(), AdminBlogPage(), BlogImageRow, BlogPostWriteData, countImagesForPost(), deletePostById(), eventLinkSelect (+21 more)

### Community 10 - "redirectError.ts"
Cohesion: 0.67
Nodes (3): getRedirectTarget(), isRedirectError(), RedirectTarget

### Community 11 - "events.ts"
Cohesion: 0.12
Nodes (35): AdminEventsPage(), DashboardEvent, UpcomingEventAlert(), dynamic, EventDetailPage(), Props, EventCard(), EventCardData (+27 more)

### Community 12 - "Button"
Cohesion: 0.09
Nodes (25): DeletePostButton(), ContactRequestItem, dateFormat, DeleteEventButton(), DialogButton(), DeleteMemberButton(), PhotoMeta, FeatureDisabledDialog() (+17 more)

### Community 13 - "MarketDiffusion.tsx"
Cohesion: 0.10
Nodes (33): Appearance, applyAppearance(), AppThemeProvider(), BAR_COLOR, ThemeContext, useAppearance(), InterferenceField(), InterferenceField (+25 more)

### Community 14 - "feeCalculation.ts"
Cohesion: 0.19
Nodes (18): FeeDefaultsCard(), run(), save(), BankDetailsForm(), submit(), ZahlungenPage(), SatzungPage(), annualFee() (+10 more)

### Community 15 - "userService.ts"
Cohesion: 0.10
Nodes (36): @prisma/client, dynamic, MembershipApplicationsPage(), metadata, DashboardPage(), planApplicationFees(), berlinDateParts(), FEE_RECORD_RETENTION_YEARS (+28 more)

### Community 16 - "package.json"
Cohesion: 0.10
Nodes (20): eslintConfig, name, packageManager, private, version, altcha-lib, babel-plugin-react-compiler, eslint (+12 more)

### Community 17 - "dependencies"
Cohesion: 0.07
Nodes (28): dependencies, altcha, altcha-lib, bcryptjs, dotenv, @hugeicons/core-free-icons, @hugeicons/react, lucide-react (+20 more)

### Community 18 - "boardService.ts"
Cohesion: 0.06
Nodes (56): POST(), GET(), deleteMember(), deletePhotoAction(), moveMemberInList(), revalidateBoard(), saveMember(), BoardPhotoUploader() (+48 more)

### Community 19 - "security/page.tsx"
Cohesion: 0.09
Nodes (27): dynamic, metadata, RegistrationFunnel(), share(), Stage, STAGES, Delta(), StatTile() (+19 more)

### Community 20 - "schemas.ts"
Cohesion: 0.06
Nodes (29): isCalendarDate(), absent(), AdminCreateUserInput, berlinDateTime(), contactSchema, emailChangeSchema, emailField, feeAmountUpdateSchema (+21 more)

### Community 21 - "opengraph-image.tsx"
Cohesion: 0.13
Nodes (10): adapter, prisma, dotenv, ref_node_fs, ref_node_path, prisma, @prisma/adapter-pg, alt (+2 more)

### Community 22 - "dashboard/page.tsx"
Cohesion: 0.11
Nodes (15): CtaCard(), ContactRequestList(), confirmDelete(), run(), dynamic, KontoPage(), metadata, MailSuccessDialog() (+7 more)

### Community 23 - "app/layout.tsx"
Cohesion: 0.12
Nodes (16): escapeXml(), src_app_globals, body, metadata, mono, serif, Header(), InstallHint() (+8 more)

### Community 24 - "DirectoryTable"
Cohesion: 0.10
Nodes (23): DirectoryTable(), selectAllWithOpenFees(), MemberDirectory(), setFilter(), setFilters(), DirectoryAccountBase, DirectoryFilters, directoryStats() (+15 more)

### Community 25 - "app/kontakt/page.tsx"
Cohesion: 0.15
Nodes (12): ContactForm(), dynamic, KontaktPage(), metadata, dynamic, LoginPage(), metadata, NOTICES (+4 more)

### Community 26 - "mailService.ts"
Cohesion: 0.17
Nodes (13): sanitize-html, ENTITIES, htmlToText(), composeMessage(), greeting(), MailTarget, Recipient, replacePlaceholders() (+5 more)

### Community 27 - "gravityPhysics.ts"
Cohesion: 0.09
Nodes (40): collectAndDetachBodies(), GravityEasterEgg(), swallow(), GravityPreset, Hole, PhysicsBody, place(), PRESETS (+32 more)

### Community 28 - "blog/actions.ts"
Cohesion: 0.19
Nodes (15): beginImageAction(), createDraft(), deleteBlogImage(), moveBlogImage(), revalidateBlogImages(), saveBlogImageAlt(), createPost(), updateImageAlt() (+7 more)

### Community 29 - "securityEventService.ts"
Cohesion: 0.05
Nodes (58): ActivityHeatmap(), hourLabel(), stepBounds(), stepOf(), WEEKDAYS, WEEKDAYS_LONG, columnPath(), labelStride() (+50 more)

### Community 30 - "countries.ts"
Cohesion: 0.17
Nodes (17): display(), EntryDetails(), SummaryBlock(), CountryOptions(), byName, COUNTRY_CODES, COUNTRY_NAMES, COUNTRY_OPTIONS (+9 more)

### Community 31 - "iban.ts"
Cohesion: 0.22
Nodes (21): ibanError(), IbanInput(), check(), handleChange(), EEA, formatIban(), IBAN_LENGTHS, isSepaIban() (+13 more)

### Community 32 - "blogImages.ts"
Cohesion: 0.17
Nodes (12): BlogImageManager(), handleDrop(), uploadFiles(), ACCEPTED_BLOG_IMAGE_TYPES, BLOG_IMAGE_ACCEPT_ATTRIBUTE, BlogImageMeta, BlogImageVariant, formatBytes() (+4 more)

### Community 33 - "mail/actions.ts"
Cohesion: 0.26
Nodes (11): parseMailForm(), sendEmailAction(), parseDirectMailForm(), sendDirectMailAction(), resolveUsersByIds(), sendMailForTarget(), sendMailToUsers(), enforceAdminMailRateLimit() (+3 more)

### Community 34 - "KosmosTimeline.tsx"
Cohesion: 0.14
Nodes (21): KosmosTimeline(), KosmosVisibility(), MemberCard(), random(), Sky(), starField(), subscribeFullscreen(), years() (+13 more)

### Community 35 - "feeDefaults.ts"
Cohesion: 0.23
Nodes (11): FeeDefaultEntry, FeeRates, resolveFeeDefault(), FALLBACK_FEE_DEFAULT, deleteFeeDefault(), upsertFeeDefault(), getFeeRatesForYear(), removeFeeDefault() (+3 more)

### Community 36 - "zertifikat/pdf/route.ts"
Cohesion: 0.18
Nodes (21): GET(), berlinYear(), certificateFacts, CertificateFee, certificateNumber(), CertificateStatus, dative(), formatMembershipDuration() (+13 more)

### Community 37 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 38 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, tsx, @types/node (+5 more)

### Community 39 - "@hugeicons/core-free-icons"
Cohesion: 0.12
Nodes (28): @hugeicons/core-free-icons, @hugeicons/react, metadata, metadata, DashboardPageHeader(), DashboardPageHeaderProps, dynamic, metadata (+20 more)

### Community 40 - "messages.ts"
Cohesion: 0.25
Nodes (13): accountDeletedMessage(), adminCreatedUserMessage(), emailChangeMessage(), feeReminderMessage(), greeting(), LINK_EXPIRY(), loginDisabledMessage(), membershipApprovedMessage() (+5 more)

### Community 41 - "altcha.ts"
Cohesion: 0.21
Nodes (14): server-only, GET(), message(), createPrismaClient(), consumeAltchaSolution(), readExpiry(), readSignature(), verifyAltchaPayload() (+6 more)

### Community 42 - "feeService.ts"
Cohesion: 0.16
Nodes (22): UserManagementPage(), feeRetentionCutoffYear(), SepaDebtorAddress, clearFeeAmountOverride(), findArchivedFees(), findExistingFeeYears(), findFeeLiableUsers(), findUsersWithFees() (+14 more)

### Community 43 - "BulkImport.tsx"
Cohesion: 0.05
Nodes (40): byStatusThenName(), MailForm(), getStatusIcon(), ProfileSummary(), ProfileSummaryUser, bulkCreateUsersAction(), ImportIssue, ImportRowResult (+32 more)

### Community 44 - "react"
Cohesion: 0.07
Nodes (45): altcha, lucide-react, next-auth, react, EmailChangeForm(), PasswordChangeButton(), toggleAllDay(), EventFormData (+37 more)

### Community 45 - "membership.ts"
Cohesion: 0.19
Nodes (10): ageAt(), CONSENT_VERSION, DATENSCHUTZ_URL, isOldEnough(), MEMBERSHIP_JOURNEY_MARKER, MIN_APPLICANT_AGE, REGISTERED_PATH, SATZUNG_URL (+2 more)

### Community 46 - "mail/page.tsx"
Cohesion: 0.09
Nodes (34): MailDashboard(), MailEventOption, MailHistoryEntry, announcementHtml(), dynamic, MailDashboardPage(), metadata, blockHtml() (+26 more)

### Community 47 - "isFeatureEnabled"
Cohesion: 0.19
Nodes (20): ContactRequestsPage(), submitContactRequest(), submitMembershipApplication(), contactRequestMessage(), membershipApplicationNoticeMessage(), ContactInput, hashIp(), scoreSpam() (+12 more)

### Community 48 - "executeAction"
Cohesion: 0.09
Nodes (48): zod, deletePost(), savePost(), markContactRequestHandled(), removeContactRequest(), acceptMembershipApplication(), confirmMembershipTermination(), declineMembershipApplication() (+40 more)

### Community 50 - "MailForm.tsx"
Cohesion: 0.20
Nodes (7): MailAnnouncement, MailFormProps, MailUserOption, STATUS_ORDER, STATUS_RANK, TARGET_OPTIONS, EmailBodyField()

### Community 51 - "ApplicationList"
Cohesion: 0.39
Nodes (8): ApplicationList(), confirmAccept(), confirmDecline(), confirmDelete(), openAccept(), run(), formatRange(), todayInputValue()

### Community 52 - "EditUserForm.tsx"
Cohesion: 0.16
Nodes (9): ADMIN_ONLY_KEYS, FIELD_LABELS, IconInput(), ROLE_LABEL_MAP, STATUS_LABEL_MAP, UserData, MANDATE_ID_PATTERN, ROLE_OPTIONS (+1 more)

### Community 53 - "MarkdownEditor.tsx"
Cohesion: 0.50
Nodes (3): @uiw/react-markdown-preview, @uiw/react-md-editor, MDEditor

### Community 54 - "prisma.ts"
Cohesion: 0.09
Nodes (53): bcryptjs, ref_crypto, ref_node_net, requestPasswordReset(), resendVerificationEmail(), registerUser(), resetPassword(), resetSchema (+45 more)

### Community 55 - "EmailBodyField.tsx"
Cohesion: 0.28
Nodes (6): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit, EmailEditorToolbar(), EmailEditorToolbarProps, ToolbarButton()

### Community 56 - "getOptionalUser"
Cohesion: 0.36
Nodes (6): GET(), POST(), GET(), getOptionalUser(), findImageBytes(), postExists()

### Community 57 - "EditUserForm"
Cohesion: 0.25
Nodes (9): EditUserForm(), computeChanges(), computeDirty(), guardNavigate(), handleClick(), handleFormSubmit(), formatDiffValue(), isCheckboxKey() (+1 more)

### Community 58 - "berlinTime.ts"
Cohesion: 0.32
Nodes (13): EventForm(), berlinOffsetMs(), berlinParts(), berlinWallTimeToDate(), endOfBerlinDay(), isSameBerlinDay(), pad(), parseBerlinLocalInput() (+5 more)

### Community 59 - "feature-flags/page.tsx"
Cohesion: 0.16
Nodes (15): setFeatureFlag(), FeatureFlagToggle(), FeatureFlagToggleProps, FeatureFlagsPage(), metadata, removeRateLimitEntry(), confirmDelete(), FEATURE_FLAG_CATEGORIES (+7 more)

### Community 60 - "app/page.tsx"
Cohesion: 0.13
Nodes (26): GET(), generateMetadata(), Props, PublicBlogPost(), LeadPost(), MetaLine(), PostRow(), Props (+18 more)

### Community 61 - "userUpdateData.ts"
Cohesion: 0.29
Nodes (9): applyBool(), applyDate(), buildUserUpdateData(), MaybeBool, MaybeDate, parseBoolInput(), parseDateInput(), UpdateUserInput (+1 more)

### Community 62 - "RateLimitTable"
Cohesion: 0.27
Nodes (7): RateLimitTable(), showInfo(), describeRateLimit(), duration(), RATE_LIMITS, RateLimitBucket, RateLimitRule

### Community 63 - "Site.tsx"
Cohesion: 0.10
Nodes (19): generateMetadata(), facts, metadata, metadata, dynamic, metadata, SearchParams, ViewSwitch() (+11 more)

### Community 64 - "scripts"
Cohesion: 0.25
Nodes (8): scripts, build, dev, icons, lint, start, test, typecheck

### Community 65 - "WirtschaftsPhysik Alumni e. V. — Vereinswebsite"
Cohesion: 0.06
Nodes (31): Befunde vom 2026-10-20, Bekannte Log-Meldungen, Betrieb: Checkliste für den Produktionsserver, Checkliste, Der Server, Wo liegt was, Zugang für eine neue Person, Admin-Dashboard (+23 more)

### Community 66 - "PhysicsTimeline.tsx"
Cohesion: 0.27
Nodes (6): categories, events, TimelineCategory, TimelineEvent, categoryLabel, PhysicsTimeline()

### Community 67 - "setBlogCoverImage"
Cohesion: 0.28
Nodes (9): setBlogCoverImage(), applyImageOrder(), deleteImage(), findImageForPost(), findImagesForPost(), orderedIds(), removePostImage(), requireImage() (+1 more)

### Community 68 - "index.ts"
Cohesion: 0.09
Nodes (34): InfoTooltip(), RateLimitTableProps, FeeDefaultRow, JourneyRail(), PasswordStrengthMeter(), ShareButton(), share(), BadgeTone (+26 more)

### Community 69 - "MarkdownViewer.tsx"
Cohesion: 0.33
Nodes (4): react-markdown, remark-gfm, MarkdownViewer(), shiftedHeadings

### Community 71 - "ref_node_assert"
Cohesion: 0.14
Nodes (10): ref_node_assert, ref_node_test, MAX_MESSAGE_LENGTH, MIN_FILL_TIME_MS, SPAM_SCORE_MAIL_THRESHOLD, legitimate, SUMMER, WINTER (+2 more)

### Community 72 - "paymentHistoryPdf.tsx"
Cohesion: 0.29
Nodes (8): @react-pdf/renderer, GET(), PostalAddress, PaymentHistoryPdf(), PdfUser, statusLabel(), styles, DashboardFee

### Community 74 - "allowBuilds (prisma, esbuild, sharp, unrs-resolver)"
Cohesion: 1.00
Nodes (3): allowBuilds (prisma, esbuild, sharp, unrs-resolver), pnpm Workspace Config, ignoredBuiltDependencies (sharp, unrs-resolver)

### Community 76 - "eventService.ts"
Cohesion: 0.09
Nodes (39): createEventDraft(), deleteEventAction(), revalidateEvent(), saveEventAction(), EditEventPage(), UPCOMING_ALERT_MONTHS, AnnouncedEvent, createEvent() (+31 more)

### Community 77 - "ApplicationWizard"
Cohesion: 0.70
Nodes (5): ApplicationWizard(), currentFormValues(), goToStep(), handleEnter(), submit()

### Community 78 - "authz.ts"
Cohesion: 0.16
Nodes (21): ref_node_child_process, ref_node_util, GET(), COOKIE_OPTIONS, toggleDebugMode(), toggleMemberView(), auth, commit (+13 more)

### Community 79 - "Footer.tsx"
Cohesion: 0.27
Nodes (6): ContrastToggle(), columns, Footer(), legalLinks, GravityTrigger(), PluckedString()

### Community 80 - "altcha.d.ts"
Cohesion: 0.50
Nodes (3): IntrinsicElements, JSX, react

### Community 86 - "blogImageProcessing.ts"
Cohesion: 0.18
Nodes (9): sharp, BACKGROUND, icon(), main(), MAX_BLOG_IMAGE_UPLOAD_BYTES, ImageBytes, processBlogImage(), ProcessedBlogImage (+1 more)

### Community 91 - "DirectoryTable.tsx"
Cohesion: 0.06
Nodes (41): ApplicationItem, dateFormat, dateTimeFormat, STATUS_META, statusMeta(), TerminationItem, TerminationList(), confirm() (+33 more)

## Ambiguous Edges - Review These
- `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` → `ignoredBuiltDependencies (sharp, unrs-resolver)`  [AMBIGUOUS]
  pnpm-workspace.yaml · relation: conceptually_related_to

## Knowledge Gaps
- **464 isolated node(s):** `deploy.sh script`, `eslintConfig`, `nextConfig`, `name`, `version` (+459 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 589 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `allowBuilds (prisma, esbuild, sharp, unrs-resolver)` and `ignoredBuiltDependencies (sharp, unrs-resolver)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `next` connect `next` to `sepa.ts`, `ApplicationWizard.tsx`, `mitglied-werden/page.tsx`, `users/[id]/page.tsx`, `ics.ts`, `AppError`, `serverStatus.ts`, `satzung/page.tsx`, `events.ts`, `Button`, `MarketDiffusion.tsx`, `userService.ts`, `package.json`, `boardService.ts`, `security/page.tsx`, `opengraph-image.tsx`, `dashboard/page.tsx`, `app/layout.tsx`, `app/kontakt/page.tsx`, `gravityPhysics.ts`, `blog/actions.ts`, `mail/actions.ts`, `KosmosTimeline.tsx`, `zertifikat/pdf/route.ts`, `@hugeicons/core-free-icons`, `altcha.ts`, `react`, `mail/page.tsx`, `isFeatureEnabled`, `executeAction`, `MailForm.tsx`, `EditUserForm.tsx`, `MarkdownEditor.tsx`, `prisma.ts`, `getOptionalUser`, `feature-flags/page.tsx`, `app/page.tsx`, `Site.tsx`, `index.ts`, `paymentHistoryPdf.tsx`, `eventService.ts`, `authz.ts`, `Footer.tsx`, `DirectoryTable.tsx`?**
  _High betweenness centrality (0.188) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `ApplicationWizard.tsx`, `users/[id]/page.tsx`, `satzung/page.tsx`, `blogService.ts`, `Button`, `MarketDiffusion.tsx`, `package.json`, `security/page.tsx`, `dashboard/page.tsx`, `app/layout.tsx`, `gravityPhysics.ts`, `iban.ts`, `KosmosTimeline.tsx`, `@hugeicons/core-free-icons`, `BulkImport.tsx`, `DebugConsole.tsx`, `MailForm.tsx`, `EditUserForm.tsx`, `MarkdownEditor.tsx`, `feature-flags/page.tsx`, `app/page.tsx`, `Site.tsx`, `PhysicsTimeline.tsx`, `index.ts`, `eventService.ts`, `authz.ts`, `Footer.tsx`, `altcha.d.ts`, `DirectoryTable.tsx`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `AppError` connect `AppError` to `mail/actions.ts`, `setBlogCoverImage`, `users/[id]/page.tsx`, `serverStatus.ts`, `altcha.ts`, `blogService.ts`, `eventService.ts`, `isFeatureEnabled`, `executeAction`, `userService.ts`, `boardService.ts`, `prisma.ts`, `blogImageProcessing.ts`, `getOptionalUser`, `mailService.ts`, `feature-flags/page.tsx`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `deploy.sh script`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _464 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `ApplicationWizard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08377896613190731 - nodes in this community are weakly interconnected._