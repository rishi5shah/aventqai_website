// Lightweight progressive profiling: once any form on the site captures a
// field, later forms pre-fill it instead of re-asking. Purely local — no
// server-side identity resolution, no cross-device sync. If a future task
// adds real identity (a logged-in account, a CRM-read API), this is the
// extension point to replace.

const KEY = "aq_lead_profile";
const FIELDS = ["firstName", "email", "company", "industry", "teamSize"];

export function getKnownProfile() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

/** Merges any truthy known fields into the cache. Never overwrites with empty values. */
export function saveKnownProfile(partial) {
  if (typeof window === "undefined") return;
  try {
    const next = { ...getKnownProfile() };
    for (const field of FIELDS) {
      if (partial[field]) next[field] = partial[field];
    }
    if (!next.firstCapturedAt) next.firstCapturedAt = new Date().toISOString();
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
}

/**
 * Saves the capture and reports whether this email was already known on this
 * device (a retake/resubmission) plus the original capture date — so callers
 * can forward the latest score/tier while preserving the first capture date
 * and letting the CRM workflow skip re-firing a welcome email.
 */
export function recordCapture(partial) {
  if (typeof window === "undefined") return { isRetake: false, firstCapturedAt: null };
  const before = getKnownProfile();
  const isRetake = Boolean(
    before.email && partial.email && before.email.toLowerCase() === String(partial.email).toLowerCase()
  );
  saveKnownProfile(partial);
  const after = getKnownProfile();
  return { isRetake, firstCapturedAt: after.firstCapturedAt || null };
}
