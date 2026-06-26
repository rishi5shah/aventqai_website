// Centralized analytics layer. Event names live here (not as scattered string
// literals) so the funnel is measurable and easy to audit.
//
// Vendor-agnostic by design: events are pushed to window.dataLayer (GTM/GA4
// friendly) and to gtag() if a tag is present. If no analytics vendor is wired
// up, track() is a safe no-op (plus a dev-console line). Hook a real vendor in
// app/layout.jsx and these events flow through automatically.

export const EVENTS = {
  ASSESSMENT_STARTED: "assessment_started",
  ASSESSMENT_QUESTION_ANSWERED: "assessment_question_answered",
  ASSESSMENT_GATE_VIEWED: "assessment_gate_viewed",
  LEAD_CAPTURED: "lead_captured",
  ASSESSMENT_COMPLETED: "assessment_completed",
  CTA_BOOK_CLICKED: "cta_book_clicked",
  CTA_SECONDARY_CLICKED: "cta_secondary_clicked",
  EXIT_INTENT_SHOWN: "exit_intent_shown",
  EXIT_INTENT_CONVERTED: "exit_intent_converted",
};

export function track(event, props = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...props });
    if (typeof window.gtag === "function") {
      window.gtag("event", event, props);
    }
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.debug("[analytics]", event, props);
    }
  } catch {
    /* analytics must never break the UI */
  }
}
