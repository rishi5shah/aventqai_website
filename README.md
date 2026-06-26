# AventeQ AI — Marketing Website

A multi-page marketing site for **AventeQ AI**, an AI transformation company serving operationally complex businesses (accounting/tax firms, law firms, manufacturers, logistics companies).

Built with **Next.js (App Router)** as real, statically-rendered routes — recreated from the high-fidelity design handoff in [`design_handoff_aventeq_website/`](design_handoff_aventeq_website/).

## Stack

- **Next.js 16** (App Router)
- **React 19**
- Fonts via `next/font` — Newsreader (serif), Hanken Grotesk (sans), IBM Plex Mono
- No CSS framework — design tokens + responsive utilities in [`app/globals.css`](app/globals.css)

## Routes

| Path | Page |
|---|---|
| `/` | Home (hero, pillars, industries, method, training, testimonial, cases, security, insights, FAQ) |
| `/solutions` | Solutions + engagement phases |
| `/industries` | Four industries (pain → what we deploy) |
| `/training` | AI training programs |
| `/cases` | Case studies |
| `/about` | Mission, team, advisors, journey |
| `/contact` | Lead-capture form + offices |
| `/privacy` | Privacy policy (what's collected, why, GDPR/DPDP rights) |

## Features

- Real routes for SEO (replaces the prototype's hash routing)
- Sticky header with active-route highlighting + mobile menu (Escape to close, scroll lock)
- FAQ accordion (single-open)
- Contact form: client-side validation, industry-aware placeholder, success state, `localStorage` draft persistence, and a real submission to the lead pipeline (`/api/lead` → GoHighLevel)
- Scroll-driven section reveals (`animation-timeline: view()`) with an IntersectionObserver fallback
- Back-to-top button, full `prefers-reduced-motion` and `:focus-visible` support

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Lead funnel

A lead-capture funnel layered on top of the marketing site. Built in tasks; this section grows as each lands.

### Routes
| Route | What it is |
|---|---|
| `/readiness` | AI Readiness Assessment — 6-question scorecard → lead-capture gate → tier-routed result. |
| `/industries/{accounting\|manufacturing\|logistics\|law}` | Per-industry landing pages — one shared template (`app/industries/[slug]/page.jsx`) driven by `lib/industries.js`. Pain points, use cases, a case study, trust signals, and dual-tier CTAs (book a session / take the assessment), repeated mid-page and at the end. |
| `/contact?context=<key>` | Contact page; the `context` param is shown on the form and stored with the submission. Keys: `strategy-session`, `readiness-workshop`, `prep-playbook`. |
| `POST /api/lead` | Lead submission endpoint (see below). |

### Secondary CTAs + exit-intent capture
Every surface that previously showed only "Book an AI Strategy Session" now also offers a path into the readiness assessment: the homepage hero (small link under the buttons), the global closing CTA band (`components/CTA.jsx`, every page), and the industry pages (`IndustryCtaLinks`, from Task 2).

A dismissible exit-intent popup (`components/ExitIntentModal.jsx`) captures an email, and never appears on `/contact` or `/readiness` (they already run their own capture flow). Trigger logic:
- **Desktop:** cursor leaves the top of the viewport (after a 4s arm delay so it can't fire instantly).
- **Touch devices** (`pointer: coarse`): no mouseleave gesture exists, so it falls back to a 30s timer instead.
- **Frequency:** shown at most once per browser *session* (`sessionStorage`). If the visitor explicitly dismisses it (✕, Escape, or clicking the backdrop) or converts, a separate `localStorage` flag suppresses it **permanently** on that device — it won't reappear in a future session either.

Config in `lib/exitIntent.js`:
- `EXIT_INTENT_ENABLED` — flip to `false` to kill it sitewide.
- `EXIT_INTENT_SKIP_PATHS` — routes where it should never trigger.

### Consent & compliance
Every lead-capture form (`LeadGate`, `ContactForm`, `ExitIntentModal`, `EmailReportCapture`) shows an optional, unchecked-by-default consent checkbox linking to [`/privacy`](app/privacy/page.jsx) (`components/ConsentCheckbox.jsx`). Checking it is **not required to submit** — a lead is still captured either way — but the boolean is forwarded end-to-end (`submitLead` → `/api/lead` → `lib/ghl.js`) as a `consent:yes` / `consent:no` tag. **You must add an If/Else branch in the GHL Workflow keyed on that tag so the speed-to-lead email only fires for `consent:yes`** — the code can't stop GHL from sending an email once the webhook fires, so this tag is the enforcement point. The consent state is persisted with the lead (it's one of the discrete fields forwarded), not just used client-side.

### Bot protection
Every lead-capture form includes an invisible honeypot field (`components/HoneypotField.jsx` — off-screen, no tab stop, `autoComplete="off"`). A real visitor never fills it; a script that blindly fills every input does. `/api/lead` checks it server-side first: if filled, the request is silently accepted (`{ ok: true }`, so the bot gets no signal it was caught) but **never logged as a real lead or forwarded to GHL**.

### Duplicate & retake handling
`lib/leadProfile.js`'s `recordCapture()` checks, before saving, whether the submitted email already matches the cached profile on that device. If so, the lead is forwarded with `isRetake: true` and the *original* `firstCapturedAt` timestamp (never overwritten by later submissions) instead of treating it as a new capture. Both are forwarded to GHL: `firstCapturedAt` as a field, and a `retake` tag when true. **Add a branch in the GHL Workflow that skips the welcome-email step when the `retake` tag is present**, so retaking the assessment updates the score/tier on the existing contact without re-sending the first-touch email. (GHL's own "Create/Update Contact" action already dedupes by email at the CRM level regardless — this just gives your workflow the signal to also skip the *email*.)

### Result persistence & sharing
A completed assessment result is encoded into the URL itself (`?r=<token>` via `lib/readiness.js` `encodeResult`/`decodeResult`) — score, tier, per-dimension breakdown, and industry only, **deliberately no name/email/company**, so the link is safe to forward to a colleague. No database or server-side token. Refreshing `/readiness` mid-result restores it from the URL instead of restarting the quiz; the "↗ Copy share link" button on the result screen copies the current URL. Opening a shared link shows the same result anonymously — no email required to view it.

### Gate placement (`gateBeforeResult`)
`lib/readiness.js` exports `GATE_BEFORE_RESULT` (default `true`):
- **`true`** (current default) — the lead gate (name/email/company/industry/team size) appears before the result, as described above.
- **`false`** — the questions go straight to the result screen, anonymously, with the full score/tier/breakdown visible immediately. The tier CTA falls back to the general `/industries` page (industry is unknown). In place of the gate, the result screen shows an inline **"Want this emailed to you?"** email-only capture (`components/readiness/EmailReportCapture.jsx`) — submitting it is what actually captures the lead at that point, sourced as `readiness` same as the gated flow.

Flip the one constant to A/B test gate-first (more lead volume) against result-first (less friction for skeptical, senior buyers who'd bounce at a gate) — no other code changes needed.

### Progressive profiling
`lib/leadProfile.js` caches known fields (`firstName`, `email`, `company`, `industry`, `teamSize`) in `localStorage` once any form captures them. Later forms — the contact form, the readiness lead gate — pre-fill those fields instead of re-asking, but an in-progress draft always wins over the cached profile. Purely local (no server-side identity resolution); if real identity is added later (login, a CRM-read API), this is the extension point to replace.

### Content/config (edit copy without touching components)
- `lib/readiness.js` — assessment questions/options/scores, tier thresholds (78 / 52 / 28), tier copy + CTA routing, industry→slug map, and `USE_INDUSTRY_SUBPAGES` (now `true` — the lowest-tier CTA deep-links to the `/industries/[slug]` pages).
- `lib/industries.js` — per-industry page content (hero, pain points, use cases, case study, trust signals, CTA copy), keyed by the same slugs as `lib/readiness.js`.
- `lib/exitIntent.js` — exit-intent enable flag + skip paths.

### Analytics events
Centralized in `lib/analytics.js` (`EVENTS` map; `track(event, props)`). Currently emitted: `assessment_started`, `assessment_question_answered` (step, dimension, score), `assessment_gate_viewed`, `lead_captured` (industry, teamSize, tier, score), `assessment_completed` (score, tier), `cta_book_clicked` / `cta_secondary_clicked` (fired from the homepage hero, global CTA band, industry pages, and the readiness result screen — each tagged with a `placement`), `exit_intent_shown` / `exit_intent_converted` (path).

`track()` pushes to `window.dataLayer` and calls `gtag()` if present — **vendor-agnostic, no vendor wired yet**. To enable GA4/GTM, add the tag/script in `app/layout.jsx`; events then flow automatically. No vendor = safe no-op (plus a dev-console line).

### Lead endpoint
`app/api/lead/route.js` validates the payload (only `email` is required — exit-intent captures email alone), logs every lead, then forwards it to GoHighLevel via `lib/ghl.js`. Every lead source — the readiness assessment, the contact form, and exit-intent — POSTs here. The client (`lib/leadSubmit.js`) POSTs asynchronously with retries and a `localStorage` queue, so the UI never blocks and a failed POST is retried on next load. Forwarding to GHL never fails the request — if it's unconfigured or times out, the route still returns `ok:true` and the lead is still logged.

### CRM integration (GoHighLevel)
Leads are forwarded to a GoHighLevel **Workflow** via its **Inbound Webhook** trigger — no API key, and all CRM logic (contact creation, the speed-to-lead email, the internal notification) lives in the Workflow itself, editable in the GHL UI without touching code.

**Env var** (add to `.env.local`, see [`.env.example`](.env.example)):
```
GHL_WEBHOOK_URL=
```
Unset in development by default — leads still log to the console; the GHL forward is just skipped.

**One-time setup in GoHighLevel:**
1. In the sub-account, go to **Automation → Workflows → Create Workflow**.
2. Add trigger **Inbound Webhook**. Save the workflow once to generate its webhook URL — copy that into `GHL_WEBHOOK_URL`.
3. Add a **Create/Update Contact** action as the first step. Map fields from the webhook's sample payload (trigger the route once with a test lead so GHL can detect the keys, or use **Load Sample Webhook Data**): `email` → Email, `firstName` → First Name, `company` → Company Name, `industry`/`teamSize`/`score`/`tier`/`tierLabel`/`message`/`source`/`context` → custom fields (create them once in **Settings → Custom Fields** if you want them queryable on the contact record).
4. Add a **tags → Add** action mapping the webhook's `tags` array — these let you branch automation without mapping every field:
   - `aventeq-lead` — every lead, always.
   - `source:<readiness|contact|exit-intent>` — which surface captured the lead.
   - `tier:<key>` — readiness tier (`build`/`focus`/`prepare`/`explore`), when scored.
   - `industry:<slug>` — when known (`accounting`/`manufacturing`/`logistics`/`law`).
   - `context:<key>` — which CTA the lead came through (`strategy-session`/`readiness-workshop`/`prep-playbook`), when set.
   - `team-size:<bucket>` — `1-20`/`21-100`/`101-500`/`500-plus`, when collected.
   - `consent:<yes|no>` — always present. **Branch on this before sending any email.**
   - `retake` — present only when this email already had a known capture on the same device (see "Duplicate & retake handling" below). **Branch on this to skip the welcome email.**
5. Add the speed-to-lead step: an **Email** (or SMS) action sent to `{{contact.email}}`, gated behind an **If/Else** on `consent:yes` (skip entirely otherwise) and `retake` (skip if present), and ideally branched further on `tier:*`/`context:*` so "Ready to build" leads (or someone who clicked the workshop CTA) get a different message than a cold "Ready to explore" lead.
6. Add the internal notification step: an **Internal Notification** action (email/SMS to your sales inbox) so a human sees every new lead immediately — this one can fire regardless of consent, since it's not contacting the lead.
7. Turn the Workflow **Published**.

Because every lead already carries `source` (`readiness` / `contact` / `exit-intent`) and, where available, `tier`/`score`/`industry`/`consent`/`retake`, the whole speed-to-lead + routing logic can branch on those without any code changes — edit the Workflow, not `lib/ghl.js`.

**Architecture note on the immediate email:** the speed-to-lead email is sent *by the GHL Workflow*, not by code in this repo. This repo never calls an email API directly — doing so would mean adding a new third-party email vendor, which the brief's scope-discipline constraint rules out given none exists in the repo today and you've chosen the no-API-key Inbound Webhook integration. The Workflow you configure above **is** the "immediate email" the brief calls for; everything past that (drip sequences, re-engagement) should live in GHL too, never in code.

## Before production

- Replace placeholder trust-bar segments, case-study stats, and compliance badges with real, permissioned content + logos
- Set `GHL_WEBHOOK_URL` in production env and publish the corresponding GHL Workflow, with the `consent`/`retake` branches described above wired in
- Have a lawyer review [`/privacy`](app/privacy/page.jsx) — it's a functional placeholder covering what's collected and why, not legal sign-off
- Decide `GATE_BEFORE_RESULT` (`lib/readiness.js`) — ship gated, ungated, or A/B test both
