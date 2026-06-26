// Exit-intent lead capture config. Flip EXIT_INTENT_ENABLED to false to kill
// the popup sitewide without touching the component.

export const EXIT_INTENT_ENABLED = true;

// Pages that already run their own lead-capture flow — never show the
// exit-intent popup over them.
export const EXIT_INTENT_SKIP_PATHS = ["/contact", "/readiness"];
