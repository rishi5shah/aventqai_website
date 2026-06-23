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
- Contact form: client-side validation, industry-aware placeholder, success state, and `localStorage` draft + submission persistence
- Scroll-driven section reveals (`animation-timeline: view()`) with an IntersectionObserver fallback
- Back-to-top button, full `prefers-reduced-motion` and `:focus-visible` support

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Before production

- Replace placeholder trust-bar segments, case-study stats, and compliance badges with real, permissioned content + logos
- Wire the contact form to a real backend/API route (currently persists to `localStorage`)
