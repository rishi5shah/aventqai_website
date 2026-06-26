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

A dismissible exit-intent popup (`components/ExitIntentModal.jsx`) captures an email when the cursor leaves the top of the viewport, at most once per browser session (`sessionStorage`), and never on `/contact` or `/readiness` (they already run their own capture flow). Config in `lib/exitIntent.js`:
- `EXIT_INTENT_ENABLED` — flip to `false` to kill it sitewide.
- `EXIT_INTENT_SKIP_PATHS` — routes where it should never trigger.

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
5. Add the speed-to-lead step: an **Email** (or SMS) action sent to `{{contact.email}}`, ideally inside an **If/Else** branch keyed off the `tier:*` or `context:*` tags so "Ready to build" leads (or someone who clicked the workshop CTA) get a different message than a cold "Ready to explore" lead.
6. Add the internal notification step: an **Internal Notification** action (email/SMS to your sales inbox) so a human sees every new lead immediately.
7. Turn the Workflow **Published**.

Because every lead already carries `source` (`readiness` / `contact` / `exit-intent`) and, where available, `tier`/`score`/`industry`, the whole speed-to-lead + routing logic can branch on those without any code changes — edit the Workflow, not `lib/ghl.js`.

## Before production

- Replace placeholder trust-bar segments, case-study stats, and compliance badges with real, permissioned content + logos
- Set `GHL_WEBHOOK_URL` in production env and publish the corresponding GHL Workflow (see above)
