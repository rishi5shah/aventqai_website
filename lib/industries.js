// Per-industry landing page content for /industries/[slug]. Keyed by slug —
// these keys must stay in sync with lib/readiness.js INDUSTRIES[].slug since
// that's what routes the assessment's lowest-tier CTA here.

import { ASSESSMENT_ROUTE } from "@/lib/readiness";

const BOOK_CTA = { label: "Book an AI Strategy Session →", href: "/contact?context=strategy-session" };
const READINESS_CTA = { label: "Take the readiness assessment →", href: ASSESSMENT_ROUTE };

export const INDUSTRY_PAGES = {
  accounting: {
    slug: "accounting",
    industryValue: "Accounting & Tax",
    metaTitle: "AI for Accounting & Tax Firms — AventeQ",
    metaDescription: "Reconciliation, notice handling, and client follow-ups — automated, so your best people get back to advisory work.",
    hero: {
      eyebrow: "Accounting & Tax",
      title: "AI for firms that bill for judgment, not data entry.",
      lead: "Reconciliation, notices, and client follow-ups eat the hours your best people should spend advising. We deploy the agents that take that work off their desk.",
    },
    painPoints: [
      { title: "Manual reconciliations", desc: "Hours each month-end go into matching transactions by hand instead of reviewing the exceptions that actually matter." },
      { title: "Tax planning bottlenecks", desc: "Optimization work queues up behind compliance deadlines, so planning becomes reactive instead of advisory." },
      { title: "Document collection", desc: "Client documents arrive scattered across email, portals, and paper — and chasing them eats into billable time." },
      { title: "Notice handling", desc: "Every notice needs to be read, classified, and routed before anyone can act on it, and that triage rarely gets faster with headcount." },
    ],
    useCases: [
      { title: "Intelligent Reconciliation", desc: "Matches transactions automatically and surfaces only the exceptions a human needs to review." },
      { title: "Tax Optimization Agent", desc: "Flags planning opportunities against current filings instead of waiting for year-end review." },
      { title: "Notice Analysis Agent", desc: "Reads, classifies, and drafts a response plan for incoming notices the moment they arrive." },
      { title: "Client Communication Automation", desc: "Handles routine follow-ups and document requests so staff only step in for judgment calls." },
      { title: "Compliance Workflows", desc: "Keeps filings, deadlines, and approvals moving on a tracked, auditable schedule." },
    ],
    caseStudy: {
      tag: "Accounting & Tax",
      title: "A 40-partner CA firm closes months in days.",
      body: "We deployed an Intelligent Reconciliation agent and a Notice Analysis agent across the firm's tax practice. Manual matching dropped sharply and senior staff moved from data entry back to advisory work.",
      stat: "70%",
      statLabel: "less reconciliation time",
    },
    trustSignals: ["Mid-size CA firms", "Component manufacturers", "Freight & 3PL operators", "Boutique law firms"],
    cta: { primary: BOOK_CTA, secondary: READINESS_CTA },
  },

  manufacturing: {
    slug: "manufacturing",
    industryValue: "Manufacturing",
    metaTitle: "AI for Manufacturers — AventeQ",
    metaDescription: "Production intelligence, procurement agents, and predictive alerts that catch disruption before it hits the line.",
    hero: {
      eyebrow: "Manufacturing",
      title: "AI that sees disruption before it hits the line.",
      lead: "Vendor delays, procurement bottlenecks, and reporting gaps compound quietly until they're a production problem. We build the intelligence that catches them early.",
    },
    painPoints: [
      { title: "Production delays", desc: "Issues on the line surface in a weekly report, days after they could have been caught." },
      { title: "Vendor coordination", desc: "Status updates live in email threads and phone calls, so nobody has a single view of who's at risk." },
      { title: "Procurement bottlenecks", desc: "Purchase decisions wait on manual checks across systems that don't talk to each other." },
      { title: "Operational visibility", desc: "Leadership sees a summary; the floor sees the detail — and the two rarely reconcile in time to act." },
    ],
    useCases: [
      { title: "Production Intelligence", desc: "Surfaces line-level issues as they happen instead of in next week's report." },
      { title: "Procurement Agents", desc: "Reads vendor communications and order histories to flag delays before they hit the schedule." },
      { title: "Vendor Coordination Systems", desc: "Centralizes vendor status so planners aren't reconstructing it from email threads." },
      { title: "Predictive Alerts", desc: "Routes early warnings straight to the planner who can act on them." },
      { title: "Operational Dashboards", desc: "Gives leadership and the floor the same live view of what's actually happening." },
    ],
    caseStudy: {
      tag: "Manufacturing",
      title: "A components maker sees vendor risk early.",
      body: "A Procurement Agent now reads vendor communications and order histories, flagging likely delays before they hit the line — with predictive alerts routed straight to planners.",
      stat: "5 days",
      statLabel: "earlier delay warning",
    },
    trustSignals: ["Component manufacturers", "Mid-size CA firms", "Freight & 3PL operators", "Boutique law firms"],
    cta: { primary: BOOK_CTA, secondary: READINESS_CTA },
  },

  logistics: {
    slug: "logistics",
    industryValue: "Logistics",
    metaTitle: "AI for Logistics & Freight — AventeQ",
    metaDescription: "Shipment intelligence, delay prediction, and automated escalation — fewer exceptions chased by hand.",
    hero: {
      eyebrow: "Logistics",
      title: "Fewer exceptions chased by hand, not more dashboards.",
      lead: "Shipment delays and fragmented communication turn into hours of manual escalation. We deploy the systems that catch exceptions and route them before they cost you a customer.",
    },
    painPoints: [
      { title: "Shipment delays", desc: "Exceptions surface after they've already cost a delivery window, not before." },
      { title: "Documentation issues", desc: "Missing or mismatched paperwork stalls shipments at exactly the wrong moment." },
      { title: "Communication fragmentation", desc: "Status lives across carriers, email, and spreadsheets, so nobody has the full picture in one place." },
      { title: "Manual escalations", desc: "Every exception still needs someone to notice it, chase it down, and decide what happens next." },
    ],
    useCases: [
      { title: "Shipment Intelligence", desc: "Tracks shipments against expected ETAs and flags variance as it emerges." },
      { title: "Workflow Automation", desc: "Replaces email-thread coordination with a tracked, automated handoff." },
      { title: "Delay Prediction", desc: "Forecasts likely delays from carrier and route data before they become a customer-facing problem." },
      { title: "Escalation Systems", desc: "Routes exceptions to the right person automatically instead of waiting for someone to notice." },
      { title: "Logistics Dashboards", desc: "Gives one live view of shipment status instead of a dozen scattered ones." },
    ],
    caseStudy: {
      tag: "Logistics",
      title: "A freight operator clears exceptions faster.",
      body: "Shipment Intelligence plus automated escalation workflows replaced a tangle of email threads, so exceptions get caught, routed, and resolved without manual chasing.",
      stat: "3×",
      statLabel: "faster exception handling",
    },
    trustSignals: ["Freight & 3PL operators", "Mid-size CA firms", "Component manufacturers", "Boutique law firms"],
    cta: { primary: BOOK_CTA, secondary: READINESS_CTA },
  },

  law: {
    slug: "law",
    industryValue: "Law Firm",
    metaTitle: "AI for Law Firms — AventeQ",
    metaDescription: "Contract intelligence, legal research, and matter management — so associates spend hours on the matter, not the admin.",
    hero: {
      eyebrow: "Law Firms",
      title: "AI for firms that bill hours for judgment, not document review.",
      lead: "Contract review, legal research, and matter tracking consume associate hours that should go to the work clients actually pay for. We deploy the systems that take the grind off their plate.",
    },
    painPoints: [
      { title: "Manual document review", desc: "Associates spend hours reading documents line by line before the real analysis can start." },
      { title: "Contract analysis & clause extraction", desc: "Key terms and risk clauses get found by re-reading the contract, not by a system that already knows what to look for." },
      { title: "Legal research across sources", desc: "Research means searching multiple databases by hand and cross-checking citations manually." },
      { title: "Matter & deadline management", desc: "Deadlines and matter status live across calendars, inboxes, and individual memory." },
    ],
    useCases: [
      { title: "Legal Research Intelligence", desc: "Surfaces relevant precedent and citations across sources in minutes, not hours." },
      { title: "Contract Intelligence", desc: "Extracts key terms and flags risk clauses automatically during review." },
      { title: "Matter Management Intelligence", desc: "Tracks deadlines and matter status in one place, with nothing relying on memory." },
      { title: "Compliance Intelligence", desc: "Monitors regulatory and filing obligations and flags what needs attention before it's due." },
      { title: "Client Operations Intelligence", desc: "Handles routine client updates and intake so associates spend their hours on the matter, not the admin." },
    ],
    caseStudy: {
      tag: "Law Firm",
      title: "A boutique firm cuts contract review time in half.",
      body: "A Contract Intelligence agent now reads incoming agreements first — extracting key terms, flagging risk clauses, and surfacing precedent before an associate opens the file. Review that used to take a full afternoon now starts with a head start.",
      stat: "50%",
      statLabel: "less time on contract review",
    },
    trustSignals: ["Boutique law firms", "Mid-size CA firms", "Component manufacturers", "Freight & 3PL operators"],
    cta: { primary: BOOK_CTA, secondary: READINESS_CTA },
  },
};

export const INDUSTRY_SLUGS = Object.keys(INDUSTRY_PAGES);
