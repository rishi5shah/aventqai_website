// Forwards captured leads to a GoHighLevel "Inbound Webhook" Workflow trigger.
// All CRM logic — contact creation, the speed-to-lead email, the internal
// notification — lives inside that GHL Workflow, built in the GHL UI. This
// module just posts a clean, tagged payload to it. See README.md
// "CRM integration (GoHighLevel)" for the workflow setup.

import { INDUSTRIES, QUESTIONS } from "@/lib/readiness";

const TIMEOUT_MS = 5000;

// Renders the per-dimension answers (readiness assessment only) into a
// single readable line for the internal notification email — e.g.
// "Leadership & intent: 2/3, Workflow clarity: 1/3, ...". Null for leads
// that never took the assessment (contact form, exit-intent).
function formatBreakdown(answers) {
  if (!answers) return null;
  return QUESTIONS.map((q) => `${q.dimension}: ${answers[q.key] ?? 0}/3`).join(", ");
}

// Display value -> tag-safe slug. Mirrors the readiness team-size buckets
// (lib/readiness.js TEAM_SIZES) but kept local since it's purely a tagging
// concern, not assessment content.
const TEAM_SIZE_SLUGS = {
  "1–20": "1-20",
  "21–100": "21-100",
  "101–500": "101-500",
  "500+": "500-plus",
};

function industrySlug(industryValue) {
  const match = INDUSTRIES.find((i) => i.value === industryValue);
  return match?.slug || null;
}

// Tags double as the cheap, no-mapping-required way to drive GHL automation
// branches (e.g. a workflow branch that fires only on `tier:build`, or one
// that sends the "workshop" follow-up only to `context:readiness-workshop`).
function buildTags(lead) {
  const tags = ["aventeq-lead", `source:${lead.source}`];
  if (lead.tier) tags.push(`tier:${lead.tier}`);
  const industry = industrySlug(lead.industry);
  if (industry) tags.push(`industry:${industry}`);
  if (lead.context) tags.push(`context:${lead.context}`);
  const teamSize = TEAM_SIZE_SLUGS[lead.teamSize];
  if (teamSize) tags.push(`team-size:${teamSize}`);
  // Drive workflow branches for consent-gated email and retake suppression —
  // see README "CRM integration (GoHighLevel)".
  tags.push(`consent:${lead.consent ? "yes" : "no"}`);
  if (lead.isRetake) tags.push("retake");
  return tags;
}

/** Returns true on a successful (2xx) webhook delivery, false otherwise. Never throws. */
export async function forwardToGHL(lead) {
  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) return false; // not configured — caller already logs the lead locally

  const payload = {
    email: lead.email,
    firstName: lead.firstName,
    company: lead.company,
    industry: lead.industry,
    teamSize: lead.teamSize,
    score: lead.score,
    tier: lead.tier,
    tierLabel: lead.tierLabel,
    breakdown: formatBreakdown(lead.answers),
    message: lead.message,
    source: lead.source,
    context: lead.context,
    consent: lead.consent,
    isRetake: lead.isRetake,
    firstCapturedAt: lead.firstCapturedAt || lead.receivedAt,
    tags: buildTags(lead),
    capturedAt: lead.receivedAt,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
