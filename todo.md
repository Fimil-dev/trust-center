# Trust Center Todo

## P0 — Critical (fix now)

- [x] **Fix StickyNav not rendered on any page** — StickyNav component exists in `src/components/` but is never rendered in `index.astro` or `[slug].astro`. Add it to both pages inside TrustLayout so the logo and company branding are visible at the top during scroll. `[Bug]`
- [x] **Fix ThemeToggle / StickyNav z-index collision** — Both ThemeToggle (`fixed`, `z-50`) and StickyNav (`sticky`, `z-50`) share the same z-index. ThemeToggle can be obscured by StickyNav on scroll. Lower ThemeToggle to `z-40` or integrate it into the StickyNav component. `[Bug]`
- [x] **Add focus styles to all interactive elements** — No `focus:outline` or `focus:ring` classes on any buttons or links across all components. Keyboard users cannot see which element has focus. Add `focus-visible` styles to: ContactCta links, DocumentGrid links, SubprocessorTable DPA links, ThemeToggle button, Hero download button, QuestionnaireCard links, QuestionnaireComparison download buttons. `[Accessibility]`
- [x] **Add aria-labels or aria-hidden to SVG icons** — SVG icons in `Hero.astro` (download icon), `QuestionnaireComparison.astro` (download PDF button), and `[slug].astro` (download icon) lack `aria-label` or `aria-hidden="true"`. Screen readers can't interpret them. `[Accessibility]`
- [ ] **Schedule external penetration test** — Only control marked "planned" (`trust.config.ts` line 447). Consistently flagged across all 4 questionnaires as "the primary remaining gap (ISO A.5.35 FAIL)": MVSP 1.4, CAIQ A&A-02.1/TVM-06.1, VSA Core SI-5a/CORE-19, VSA Full SO-5a. `[Compliance]`

## P1 — High (fix soon)

- [x] **Add focus styles to details/summary expand elements** — `ControlDomain.astro` and `[slug].astro` use `details/summary` for collapsible sections but summaries have no visible focus ring. Add `focus:outline-2 focus:outline-offset-1` to summary elements. `[Accessibility]`
- [x] **Add aria-label to mobile DPA links** — SubprocessorTable mobile view shows just "DPA ->" with no `aria-label`. Add `aria-label="Data Processing Agreement for {name}"` to mobile DPA links. `[Accessibility]`
- [x] **Fix hardcoded company name in PDF generation script** — `scripts/generate-pdfs.ts` hardcodes "FIMIL, INC.", "trust.fimil.dev", and "security@fimil.dev" instead of reading from `config.company`. Makes the open-source template unusable for other companies. `[Bug]`
- [x] **Add error handling to PDF generation script** — `scripts/generate-pdfs.ts` has no try-catch around file operations. `fs.readFileSync(logoPath)` crashes if logo missing. Add proper error handling: check logo exists, wrap in try-catch, exit with non-zero code on failure. `[Bug]`
- [x] **Fix division by zero in PDF percentage calculation** — `scripts/generate-pdfs.ts` line 165: `const pct = (n: number) => ((n / total) * 100).toFixed(1)` — if a questionnaire has zero sections, total is 0, producing `Infinity`/`NaN`. Add guard: `total > 0 ? ... : '0.0'`. `[Bug]`
- [x] **Add string length and date format validation to Zod schema** — `src/config/schema.ts`: All string fields lack `min()`/`max()` constraints. Date fields (`lastVerified`, `certifiedDate`, changelog `date`) have no ISO 8601 format validation. Color fields don't validate hex format. `[Schema]`
- [x] **Fix ControlStatusBar missing "planned" segment in progress bar** — Legend shows a gray dot for "planned" controls, but the progress bar only renders segments for "implemented" and "partial". Add a third bar segment so visualization matches legend. `[UI Bug]`
- [x] **Add Google Fonts fallback font families** — `global.css` defines `--font-heading` and `--font-body` with no system font fallbacks. If Google Fonts fail to load, layout will reflow. Add fallbacks: `'IBM Plex Mono', 'Courier New', monospace` and `'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`. `[Performance]`
- [x] **Create visual data flow diagram** — Multiple questionnaires (MVSP, CAIQ, VSA Core, VSA Full) note "No standalone visual data flow diagram maintained yet." A visual diagram would satisfy compliance requirements and improve trust center value. `[Content]`

## P2 — Medium (next sprint)

- [x] **Remove `as any` type casts in PDF generation script** — `generate-pdfs.ts` uses `as any` in two places: line 19 (config import) and line 391 (jsPDF internal API `lastAutoTable`). Add proper type imports. Consider including `scripts/` in tsconfig type checking. `[Code Quality]`
- [x] **Fix PDF table width warnings (200+ during build)** — jsPDF-autotable produces 200+ warnings about table content exceeding page width. Column sizing logic needs refinement — add explicit column widths or use auto-sizing with max-width constraints. `[Code Quality]`
- [x] **Add array length constraints to Zod schema** — Frameworks, controls, subprocessors, and changelog arrays have no min/max length validation. An empty frameworks array would pass schema validation but break rendering. Add `.min(1)` to critical arrays. `[Schema]`
- [x] **Fix Changelog timeline color using undefined CSS variable** — `Changelog.astro` timeline line uses `var(--color-primary-200, #e9d5ff)` but no `--color-primary-200` CSS variable is defined. Falls back to hardcoded purple. Should use `--color-primary-400` or derive from `--trust-primary`. `[UI Bug]`
- [x] **Fix Hero stats counter "0" flicker on load** — Hero counter animation starts at "0" while script runs. Users briefly see "0 Controls implemented" before it animates to the real value. Start with "---" or empty text and animate in. `[UX]`
- [x] **Add transition animation to expand/collapse indicator rotation** — `ControlDomain.astro`: The indicator rotates 90 degrees on open via `group-open:rotate-90` but the change is instant. Add `transition-transform duration-200` for smooth animation. `[UX]`
- [x] **Make section numbers dynamic instead of hardcoded** — `index.astro` hardcodes section numbers ("01 ---", "02 ---", etc.). If sections are conditionally hidden (e.g., empty frameworks), numbering becomes wrong. Calculate dynamically based on visible sections. `[UX]`
- [x] **Make download PDF filenames configurable** — `Hero.astro` hardcodes download path to `/downloads/fimil-compliance-report.pdf`. For the open-source template, this should derive from `config.company.name`. Questionnaire PDF paths should also validate file existence at build time. `[UX]`
- [x] **Add empty state handling for DocumentGrid** — If all document URLs are null/empty, DocumentGrid renders nothing but the parent "Policies" section in `index.astro` still appears with an empty container. Add an empty state message or conditionally hide the section. `[UX]`
- [x] **Fix dark mode contrast for amber progress bar** — `ControlStatusBar` uses `bg-amber-400` for "partial" segment which has low contrast against dark backgrounds. Add `dark:bg-amber-500` for better readability. `[Dark Mode]`
- [x] **Add PDF content validation tests** — `pdf-generation.test.ts` only checks file existence and size, not content. Add tests that validate: PDF contains expected company name, frameworks appear in compliance report, questionnaire PDFs contain correct question counts. `[Testing]`
- [x] **Add schema edge case tests** — `schema.test.ts` lacks tests for: invalid date formats, invalid hex color codes, string length boundaries, questionnaires with zero sections, very long question titles, special characters in answers. `[Testing]`

## P3 — Low (backlog)

- [ ] **Add backdrop-blur to StickyNav in dark mode** — StickyNav uses `bg-white dark:bg-gray-950` with no transparency or blur. In dark mode it blends into the page. Add `bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm` for subtle elevation. `[Dark Mode]`
- [ ] **Add PDF error scenario tests** — No tests for PDF generation failure paths: missing logo file, missing questionnaire data, corrupted config. Add negative test cases once error handling is added to `generate-pdfs.ts`. `[Testing]`
- [ ] **Plan EU Article 27 representative appointment** — GDPR-13 in VSA Core (line 745) marked "no" with note "planned as EU customer base grows." No timeline specified. Add to roadmap and update questionnaire answers when representative is appointed. `[Compliance]`
- [ ] **Fix ControlStatusBar responsive overflow on small screens** — Progress bar has `min-w-[120px]` which can cause horizontal scroll on devices < 320px wide (e.g., iPhone SE). Change to `min-w-[80px] sm:min-w-[120px]`. `[Responsiveness]`
- [ ] **Improve ContactCta mobile layout** — Flex layout with text-only links (`text-sm`) may not wrap well on mobile and links are hard to discover on small screens. Consider adding button styling on mobile or adjusting flex wrap behavior. `[Responsiveness]`
- [ ] **Clean up extraneous npm dependencies** — Extraneous dependencies detected: `@emnapi/core`, `@emnapi/runtime`, `@emnapi/wasm-threads`, `@napi-rs/wasm-runtime`, `@tybys/wasm-util`, `tslib`. Run `npm prune` or investigate if these are phantom deps. `[Code Quality]`
