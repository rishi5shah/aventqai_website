// Shared form primitives so every form on the site (ContactForm, the
// readiness lead gate, future forms) renders with identical styling and
// validation. No visual change — these are the exact values already in use.

export const fieldStyle = {
  width: "100%",
  padding: "13px 14px",
  border: "1px solid rgba(23,21,15,0.18)",
  borderRadius: 8,
  background: "var(--cream)",
  fontFamily: "var(--font-sans)",
  fontSize: 15,
  color: "var(--ink)",
  outline: "none",
};

export const labelStyle = {
  display: "block",
  fontSize: 13,
  color: "var(--faint)",
  marginBottom: 8,
  fontFamily: "var(--font-mono)",
  letterSpacing: "0.06em",
};

export const errorStyle = {
  fontSize: 13,
  color: "var(--terra)",
  marginTop: 7,
};

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function isValidEmail(value) {
  return EMAIL_RE.test((value || "").trim());
}
