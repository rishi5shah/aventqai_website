# Handoff: AventeQ AI — Marketing Website

## Overview
A multi-page marketing website for **AventeQ AI**, an AI transformation company serving operationally complex businesses (accounting/tax firms, law firms, manufacturers, logistics companies). The site presents the company's three pillars (Consulting, Implementation, Training & Enablement), the four industries it serves, its 6-step method, case studies, security posture, an about page, and a contact/lead-capture flow.

It is a single-page-application-style marketing site: one document with client-side "pages" switched via URL hash (`#solutions`, `#industries`, `#training`, `#cases`, `#about`, `#contact`, and home at no-hash).

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing the intended look, layout, copy, and behavior. They are **not** production code to copy verbatim. The task is to **recreate this design in a real codebase** using its established patterns — recommended stack for this kind of static marketing site is **Next.js (App Router) or Astro** with component-per-section structure, but any modern framework is fine. If you keep it as a static site, plain HTML/CSS/JS is also valid.

Two files are included:
- `AventeQ Site.dc.html` — the **authoritative source** for markup, copy, inline styles, and the logic class (routing, form, FAQ, scroll behavior). Read this for exact values. It uses a lightweight in-house component runtime; ignore the runtime mechanics and lift the markup/styles/logic into your framework.
- `standalone_reference.html` — a fully self-contained, inlined build you can open directly in a browser to see and click through the finished design. Use it as the visual source of truth.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, copy, and interactions are all specified. Recreate the UI pixel-accurately. All inline `style="…"` values in the source are the exact intended values.

## Design Tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| Cream (page bg) | `#F4F1E9` | Default page background, dark-section text |
| Cream alt (bands) | `#EFEBE1` | Trust bar, "How we work", engagement band backgrounds |
| Card cream | `#FBFAF6` | Cards (solutions, industries, cases, contact form panel) |
| CTA cream | `#FBF3EC` | Text/buttons on the terracotta CTA band |
| Ink (primary text) | `#17150F` | Headings, primary text |
| Near-black (dark sections) | `#14130F` | "What we do", Security, Footer backgrounds |
| Dark alt | `#1B1A14` | Inset chips inside dark cards |
| Muted text | `#4A463C` | Body copy |
| Muted text 2 | `#6B6658` | Inactive nav labels |
| Faint label | `#8A8475` | Small labels |
| Faintest label | `#B0AA99` | Index markers (A1, M2…) |
| Navy (accent/secondary) | `#16324F` | Primary buttons, links, stat numbers, training band bg |
| Navy hover | `#0F2438` | Button hover |
| Terracotta (brand accent) | `#C2552E` | Eyebrow labels, brand dot, CTA band bg, active nav underline |
| Terracotta light | `#E6A07B` | Eyebrows/accents on navy/dark backgrounds |
| Green (positive) | `#2E7D5B` | "What we deploy" labels, success check |
| Green light | `#6FBF95` | Positive status in hero readout |

Dark-section text uses cream at opacities: `rgba(244,241,233, .9 / .78 / .66 / .6 / .55 / .45)`. Hairlines: `rgba(23,21,15,0.10–0.14)` on light, `rgba(244,241,233,0.14–0.18)` on dark.

### Typography
Three Google Fonts:
- **Newsreader** (serif) — headings, display, stat numbers, large quotes. Weights 400/500; italic 400. Loaded via `opsz 6..72`.
- **Hanken Grotesk** (sans) — body, UI, buttons, nav. Weights 400/500/600/700.
- **IBM Plex Mono** — eyebrows, labels, index markers, the hero readout, fine print. Weights 400/500.

Type scale (px) actually used:
- Hero H1: 76 (serif 400, line-height 1.03, letter-spacing −0.02em)
- Page H1 (subpages): 56–60
- Section H2: 40–44 (serif 400, lh 1.1, ls −0.015em)
- Card H3 / industry titles: 26–34
- Body lead: 17–19 (lh 1.6)
- Body: 14.5–16.5 (lh ~1.6)
- Eyebrow/mono labels: 11–13, letter-spacing 0.12–0.20em, uppercase
- Stat numbers: 38–52 (serif, navy)

Responsive type clamps via media queries at 940px and 560px (e.g. 76→46→38, 60→40→34, 44→32).

### Spacing & layout
- Max content width: **1320px** (narrow sections like FAQ use **1040px**), centered, horizontal padding **40px** (→24px under 940px).
- Section vertical padding: typically **88–92px** top/bottom; hero **64px/72px**.
- Card padding: 40–48px; inset chips 16px.
- Border radius: buttons/inputs **8px**; cards **12–14px**; pills/chips **100px**; small accents **6px**.
- Grid hairline pattern: 1px gaps with a hairline-colored background showing through (used in stat grids, pillar grids, 6-step grid).
- Shadows: hero readout `0 24px 60px -28px rgba(20,19,15,0.5)`; back-to-top `0 10px 30px -8px rgba(20,19,15,0.5)`.

## Screens / Views

All screens share a **sticky header** (blurred cream, 74px tall, logo left, nav right) and below the page content a shared **terracotta CTA band** + **dark footer**. A **back-to-top** button appears fixed bottom-right after 600px scroll.

### Header (global)
- Sticky, `rgba(244,241,233,0.82)` + `backdrop-filter: blur(14px)`, bottom hairline.
- Logo: "AventeQ AI" (Newsreader 24/500) + a 6px terracotta dot raised −3px.
- Desktop nav (shown >940px): Solutions, Industries, AI Training, Case Studies, About (Hanken 14/500) + a navy "Book a session" pill button. Active item: ink color + 2px terracotta bottom border; inactive: `#6B6658`, transparent border.
- Mobile (<940px): hamburger toggles a stacked menu; opening locks body scroll; Escape closes it; `aria-expanded` reflects state.

### Home (no hash)
1. **Hero** — two-column grid `1.05fr 0.95fr` (collapses to 1 col <940px; right panel hidden <700px). Left: terracotta eyebrow "AI Transformation Partner", H1 "AI for real operations. Not just experiments.", lead paragraph, two buttons (navy primary "Book an AI Strategy Session", outline "Explore use cases"). Right: **operational readout panel** — `#14130F` card, mono header `aventeq://operations` + pulsing green "live" dot, four agent status rows (reconciliation-agent 1,284/1,284 matched [green]; procurement-agent vendor delay HIGH ▲ [terracotta-light]; notice-agent 3 notices triaged [muted]; shipment-intel ETA variance −5.2d [green]), and a `> optimizing workflows` line with a blinking terracotta cursor. Below the grid: full-width hairline + 3-up stat grid (4 sectors / 6 steps / Weeks).
2. **Trust bar** — `#EFEBE1` band: mono label "Trusted in regulated, audited industries" + four serif segment descriptors (Mid-size CA firms, Component manufacturers, Freight & 3PL operators, Boutique law firms). NOTE: these are honest segment descriptors, not client names — replace with real client logos when available.
3. **What we do** (dark `#14130F`) — "01 — What we do", H2 "Three pillars, one transformation.", "All solutions" outline button, 3-up hairline grid: AI Consulting / AI Implementation / AI Training & Enablement, each with a mono process line + serif title + description.
4. **Industries** — "02 — Industries", H2 "We go deep in four industries.", four full-width clickable rows (grid `60px 1fr 2fr auto`): A1 Accounting & Tax, M2 Manufacturing, L3 Logistics, F4 Law Firms — each routes to Industries page; hover tints navy 4%.
5. **How we work** (`#EFEBE1`) — "03", H2 "Our six-step transformation method.", 6-up hairline grid numbered 01–06: AI Readiness Assessment, Operational Workflow Mapping, Identify High-Impact Use Cases, Build & Deploy AI Systems, Train Teams, Continuous Optimization.
6. **AI Training band** (navy `#16324F`) — "04 — AI Training", H2 "The technology is ready. Most teams aren't.", paragraph, cream "See training programs" button, and a list panel of 4 programs.
7. **Testimonial** — large terracotta open-quote, serif 36px blockquote, attribution "Managing Partner, mid-size CA firm".
8. **Case studies teaser** — "05", H2 "AI that earned its place.", "All case studies" button, 3 clickable stat cards (70% / 5 days / 3×) routing to Cases.
9. **Security & data** (dark) — "06", H2 "Built to be trusted with your data.", 3-up grid (Your data stays yours / Private & on-prem options / Access & audit trail), plus a compliance badge row: SOC 2 Type II, ISO 27001, GDPR, India DPDP (pill outlines). NOTE: these are aspirational/aligned claims — confirm before publishing.
10. **Insights** — "07", H2 "Notes from inside the work.", subtitle "Field notes from our engagements — published periodically.", 3 non-interactive list rows (industry tag / serif title / read-time). These intentionally do NOT link anywhere yet.
11. **FAQ** (1040px width) — "08", H2 "The questions we hear first.", accordion of 5 items (single-open). Items: data safety / time to value / clean-data prerequisite / team resistance / engagements & pricing. Toggle shows `+`/`−` and reveals the answer paragraph.

### Solutions (`#solutions`)
Eyebrow + H1 "AI consulting, implementation, and training — packaged to ship." + lead. Four offering cards (3 cream, 1 dark "Operational Intelligence"), each a `1fr 1.1fr` grid: left = mono process line + serif title + description; right = 2-col chip grid of sub-offerings. Then **How engagements work** band (`#EFEBE1`): 3-up grid Pilot (2–4 wks) / Build & Deploy (4–8 wks) / Scale & Enable (Ongoing).

### Industries (`#industries`)
Eyebrow + H1 "We know your operations before we build." + lead. Four cream cards (A1 Accounting & Tax, M2 Manufacturing, L3 Logistics, F4 Law Firms), each with a 2-col "The pain" (terracotta label, muted items) vs "What we deploy" (green label, ink items) layout, items separated by hairlines.

### AI Training (`#training`)
Eyebrow + H1 "Your people are the bottleneck. We fix that." + lead. "Who it's for" pill row (CXOs, Finance, Operations, Manufacturing, Logistics teams). Programs list (01–08). Closing navy band "Every program is tailored to your teams." + "Plan a program" button.

### Case Studies (`#cases`)
Eyebrow + H1 "AI that earned its place in the work." + lead (notes outcomes are illustrative). Three cards, each `0.9fr 1.4fr 0.7fr`: industry tag + serif headline / narrative paragraph / large navy stat (70% / 5 days / 3×). NOTE: replace with real, permissioned case studies.

### About (`#about`)
Eyebrow + H1 "AventeQ is an AI transformation company for operationally complex businesses." + lead. Then label/content rows (`0.5fr 1.5fr`): Mission; Team (3 columns Founders/Delivery/Enablement with colored 4px accent bars); Advisors; Journey (2023→2026 timeline).

### Contact (`#contact`)
Two-column `1fr 1fr`. Left: eyebrow + H1 "Book an AI strategy session.", lead, a 3-step "what happens next" list, then a contact block with **mailto links** (General hello@aventeqai.com, Training training@aventeqai.com) and **two office addresses** (see Assets/Content). Right: lead-capture **form** in a cream panel.

## Interactions & Behavior

### Routing
- Client-side pages selected by `window.location.hash`. Valid hashes: `solutions, industries, training, cases, about, contact`; anything else = home. `hashchange` updates the page and scrolls to top. In a real framework, implement these as **real routes/pages** (`/`, `/solutions`, …) for SEO instead of hash routing.
- Every nav/footer/teaser button navigates by setting the hash.

### Contact form
- Controlled fields: Full name, Work email, Industry (select: Accounting & Tax / Law Firm / Manufacturing / Logistics / Other), "What you're trying to solve" textarea.
- **Industry-aware placeholder**: the textarea placeholder changes per selected industry (e.g. Accounting → "e.g. month-end reconciliation, notice handling, client follow-ups…"; Law → contract review/legal research; Manufacturing → vendor delays/procurement; Logistics → shipment exceptions/delay prediction; Other → generic).
- **Validation** on submit: name required ("Please enter your name"); email required + regex `^[^@\s]+@[^@\s]+\.[^@\s]+$` ("Enter a valid email address"). Errors render terracotta under the field.
- **On success**: replaces the form with a centered success state (green check, "Thanks — we'll be in touch.", "Send another →" reset button) and scrolls to top.
- **Persistence**: in-progress field values saved to `localStorage` key `aq_form_draft` on every change and restored on load; on submit, the entry is pushed to `aq_submissions` and the draft is removed. In production, replace localStorage submission with a real backend/endpoint (e.g. form service or API route).

### Motion
- Section reveal: sections fade/rise in on scroll using `animation-timeline: view()` where supported; an **IntersectionObserver fallback** reveals them in browsers without view-timeline. Reveal range ~entry 2%→40%.
- Page change applies a subtle `translateY(8px)` settle on `main` (no opacity, so content is never hidden).
- Hero readout: pulsing "live" dot and a blinking text cursor (CSS keyframes).
- **`prefers-reduced-motion: reduce`** disables all animations and transitions globally (including the blinking cursor/dot).
- Hover states: navy buttons darken to `#0F2438`; cream buttons → `#fff`; outline buttons darken border to ink; industry/program rows tint navy 4%; case cards darken border; footer/email links lighten/underline.

### Accessibility
- Global `:focus-visible` outline: 2px `#16324F`, 2px offset.
- Burger button has `aria-label` + `aria-expanded`; back-to-top has `aria-label`.
- Inputs use `<label for>` pairing.

## State Management
- `page` (current route), `navOpen` (mobile menu), `openFaq` (index or null), `showTop` (scroll > 600px).
- Form: `fName, fEmail, fIndustry, fMessage, errorName, errorEmail, submitted`.
- Side effects: `hashchange`/`scroll`/`keydown` listeners; body scroll lock when `navOpen`; localStorage draft + submissions; IntersectionObserver for reveal fallback (set up on mount and on page change).

## Assets
- **Fonts**: Google Fonts — Newsreader, Hanken Grotesk, IBM Plex Mono (link tag in `<head>`).
- **Favicon**: inline SVG data URI — `#14130F` rounded square, cream serif "A", terracotta dot.
- **No raster images / icons**: all visuals are CSS/type. Arrows use the `↗ ↑ →` glyphs. The hero "readout" is pure markup. (When real brand assets exist, swap in a proper logo + favicon and consider real photography for About/case studies.)
- **Meta**: `<title>`, description, and OpenGraph title/description/type are set.

### Exact contact content
- General email: `hello@aventeqai.com`
- Training email: `training@aventeqai.com`
- Partnerships email (footer): `partnerships@aventeqai.com`
- India Office: 3rd Floor, Incuspaze, Building 1969 / Alembic City / Vadodara, Gujarat – 390009 / India
- United Kingdom Office: 1 Fore Street, Moorgate / London – E14 3DQ / United Kingdom

## Files
- `AventeQ Site.dc.html` — authoritative markup, inline styles, copy, and the logic class (routing, form, FAQ, scroll/reveal, persistence). Treat its inline `style` values as the spec.
- `standalone_reference.html` — open in a browser to view/click the finished design.

## Recommended implementation notes
- Convert hash-pages into real routed pages for SEO; keep the section components reusable (Hero, StatGrid, PillarGrid, IndustryRow, StepGrid, OfferingCard, CaseCard, FAQ, ContactForm, CTA, Footer).
- Lift the color/type/spacing tokens above into your design-token system (CSS variables or theme file).
- Wire the contact form to a real submission endpoint; keep client-side validation + industry-aware placeholder + success state.
- Preserve reduced-motion handling and focus-visible styles.
