// Single source of truth for the AI Readiness Assessment: questions, scoring,
// tiers, CTA routing, and the industry profile options. Non-engineers can edit
// copy here without touching component code.

export const ASSESSMENT_ROUTE = "/readiness";

// true (default): capture gate appears before the result (maximizes lead
// volume). false: result shows freely and an inline "email me this report"
// offer becomes the capture point instead (better for skeptical, senior
// buyers who'd bounce at a gate). One-line flip — no other code changes.
export const GATE_BEFORE_RESULT = true;

// The lowest tier deep-links to an industry page. Task 2 shipped the
// per-industry pages at /industries/[slug], so this routes there now.
export const USE_INDUSTRY_SUBPAGES = true;

export const INDUSTRIES = [
  { value: "Accounting & Tax", slug: "accounting" },
  { value: "Manufacturing", slug: "manufacturing" },
  { value: "Logistics", slug: "logistics" },
  { value: "Law Firm", slug: "law" },
  { value: "Other", slug: null },
];

export const TEAM_SIZES = ["1–20", "21–100", "101–500", "500+"];

export function industryHref(industryValue) {
  const match = INDUSTRIES.find((i) => i.value === industryValue);
  if (!match || !match.slug) return "/industries";
  return USE_INDUSTRY_SUBPAGES ? `/industries/${match.slug}` : "/industries";
}

// Six dimensions, four options each (scored 0–3). Raw 0–18 → normalized 0–100.
export const QUESTIONS = [
  {
    key: "leadership",
    dimension: "Leadership & intent",
    question: "Where does leadership stand on AI in your operations?",
    options: [
      { label: "Not on the agenda yet", score: 0 },
      { label: "Curious, but no owner or budget", score: 1 },
      { label: "Committed, with a sponsor and rough budget", score: 2 },
      { label: "A board-level priority with a named owner and budget", score: 3 },
    ],
  },
  {
    key: "workflow",
    dimension: "Workflow clarity",
    question: "How well documented are the workflows you'd want AI to touch?",
    options: [
      { label: "Mostly in people's heads", score: 0 },
      { label: "Partially documented, often outdated", score: 1 },
      { label: "Documented for the core processes", score: 2 },
      { label: "Clearly mapped, with owners and metrics", score: 3 },
    ],
  },
  {
    key: "usecase",
    dimension: "Use-case focus",
    question: "How specific are your target AI use cases?",
    options: [
      { label: "We just know we 'should do AI'", score: 0 },
      { label: "A few vague ideas", score: 1 },
      { label: "A shortlist of concrete use cases", score: 2 },
      { label: "A prioritized backlog tied to ROI", score: 3 },
    ],
  },
  {
    key: "data",
    dimension: "Data foundation",
    question: "What shape is the data those use cases would need?",
    options: [
      { label: "Scattered, manual, hard to access", score: 0 },
      { label: "Available but messy and siloed", score: 1 },
      { label: "Reasonably clean and reachable", score: 2 },
      { label: "Centralized, governed, and queryable", score: 3 },
    ],
  },
  {
    key: "adoption",
    dimension: "Team adoption",
    question: "How ready are the teams who'd use these systems?",
    options: [
      { label: "Skeptical or actively resistant", score: 0 },
      { label: "Willing but untrained", score: 1 },
      { label: "Some early adopters using AI tools", score: 2 },
      { label: "Broad fluency and daily use", score: 3 },
    ],
  },
  {
    key: "governance",
    dimension: "Trust & governance",
    question: "How mature is your AI governance — security, access, audit?",
    options: [
      { label: "Nothing defined", score: 0 },
      { label: "Informal rules, case by case", score: 1 },
      { label: "Basic policies and access controls", score: 2 },
      { label: "Formal governance with audit trails", score: 3 },
    ],
  },
];

export const MAX_RAW = QUESTIONS.length * 3; // 18

export function normalize(raw) {
  return Math.round((raw / MAX_RAW) * 100);
}

// Tiers ordered high → low; tierFor() returns the first whose `min` is met.
export const TIERS = [
  {
    key: "build",
    min: 78,
    label: "Ready to build",
    blurb:
      "Your operations, data, and teams are aligned. The fastest path to ROI is to scope and ship a high-value use case.",
    cta: { label: "Book an AI Strategy Session →", type: "book", context: "strategy-session" },
  },
  {
    key: "focus",
    min: 52,
    label: "Ready to focus",
    blurb:
      "Strong foundations with a few gaps. A focused readiness workshop turns your momentum into a concrete, prioritized plan.",
    cta: { label: "Book a readiness workshop →", type: "workshop", context: "readiness-workshop" },
  },
  {
    key: "prepare",
    min: 28,
    label: "Ready to prepare",
    blurb:
      "The intent is there, but key foundations need work first. Start with our prep playbook to get ready without burning a build cycle.",
    cta: { label: "Get the prep playbook →", type: "playbook", context: "prep-playbook" },
  },
  {
    key: "explore",
    min: 0,
    label: "Ready to explore",
    blurb:
      "Early days. The best next step is to see what AI realistically does in your industry before committing to a build.",
    cta: { label: "Explore use cases for your industry →", type: "industry" },
  },
];

export function tierFor(score) {
  return TIERS.find((t) => score >= t.min) || TIERS[TIERS.length - 1];
}

export function tierByKey(key) {
  return TIERS.find((t) => t.key === key) || null;
}

// Encode/decode a completed result into a compact, URL-shareable token —
// score, tier, per-dimension breakdown, and industry only. Deliberately no
// PII (no name/email/company): the link is meant to be forwarded to a
// colleague, so it must be safe to share. No database or server token
// needed — the URL itself is the persistence layer.
export function encodeResult({ score, tier, breakdown, industry }) {
  try {
    const payload = { s: score, t: tier.key, b: breakdown.map((d) => d.score), i: industry || null };
    return encodeURIComponent(JSON.stringify(payload));
  } catch {
    return null;
  }
}

export function decodeResult(token) {
  try {
    const payload = JSON.parse(decodeURIComponent(token));
    const tier = tierByKey(payload.t);
    if (!tier || typeof payload.s !== "number" || !Array.isArray(payload.b)) return null;
    const breakdown = QUESTIONS.map((q, i) => ({ dimension: q.dimension, score: payload.b[i] ?? 0 }));
    return { score: payload.s, tier, breakdown, industry: payload.i || null };
  } catch {
    return null;
  }
}

// Resolve a tier's CTA into a concrete { label, href } for the result screen.
// "playbook" returns href:null — the result screen handles it inline (the lead
// is already captured at the gate, so the playbook is delivered via email).
export function resolveCta(tier, industryValue) {
  const { cta } = tier;
  if (cta.type === "industry") {
    return { label: cta.label, href: industryHref(industryValue), kind: cta.type };
  }
  if (cta.type === "playbook") {
    return { label: cta.label, href: null, kind: cta.type };
  }
  // book + workshop -> contact page with a context param
  return { label: cta.label, href: `/contact?context=${cta.context}`, kind: cta.type };
}
