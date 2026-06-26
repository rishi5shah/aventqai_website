// Lead capture endpoint. Receives scorecard + profile payloads from the
// readiness assessment, the contact form, and exit-intent capture.
//
// Forwards every lead to GoHighLevel (see lib/ghl.js) — the speed-to-lead
// email and internal notification are configured as a GHL Workflow, not
// here. Forwarding never blocks or fails the user-facing request.

import { forwardToGHL } from "@/lib/ghl";

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { firstName, email, industry, teamSize, score, tier } = data || {};

  // Honeypot: a real user never fills this (it's invisible). Bots that
  // blindly fill every input do. Accept-but-discard so we don't reveal the
  // trap, and never forward it to the CRM.
  if (data?.hp) {
    // eslint-disable-next-line no-console
    console.log("[lead] blocked: honeypot filled");
    return Response.json({ ok: true });
  }

  // Minimal shape validation (the client also validates before submit). Only
  // email is universally required — lighter-weight captures like exit-intent
  // collect email alone.
  if (!email) {
    return Response.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }

  // Discrete, queryable fields preserved for downstream scoring/segmentation.
  const lead = {
    firstName: firstName || null,
    email,
    company: data.company || null,
    industry: industry || null,
    teamSize: teamSize || null,
    score: typeof score === "number" ? score : null,
    tier: tier || null,
    tierLabel: data.tierLabel || null,
    message: data.message || null,
    answers: data.answers || null,
    source: data.source || "readiness",
    context: data.context || null,
    consent: data.consent === true,
    isRetake: data.isRetake === true,
    firstCapturedAt: data.firstCapturedAt || null,
    receivedAt: new Date().toISOString(),
  };

  // eslint-disable-next-line no-console
  console.log("[lead] captured:", JSON.stringify(lead));

  const forwarded = await forwardToGHL(lead);
  // eslint-disable-next-line no-console
  console.log(`[lead] GoHighLevel forward ${forwarded ? "succeeded" : "skipped or failed"}`);

  return Response.json({ ok: true });
}
