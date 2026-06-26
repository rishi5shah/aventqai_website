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
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
}
