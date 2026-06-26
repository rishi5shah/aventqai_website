"use client";

import { useState } from "react";
import { fieldStyle, labelStyle, errorStyle, isValidEmail } from "@/lib/forms";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import HoneypotField from "@/components/HoneypotField";

// Shown on the result screen when GATE_BEFORE_RESULT is false: the result is
// already visible and anonymous, and this becomes the capture offer instead
// of a gate blocking the score.
export default function EmailReportCapture({ onCapture }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [hp, setHp] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const eEmail = isValidEmail(email) ? "" : "Enter a valid email address";
    const eConsent = consent ? "" : "Please agree to continue";
    if (eEmail || eConsent) {
      setError(eEmail);
      setConsentError(eConsent);
      return;
    }
    setError("");
    setConsentError("");
    setSent(true);
    onCapture({ email: email.trim(), consent, hp });
  };

  if (sent) {
    return (
      <div
        style={{
          background: "var(--card)",
          border: "1px solid rgba(23,21,15,0.12)",
          borderRadius: 14,
          padding: "22px 24px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "var(--green)",
            color: "var(--cream)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            flex: "none",
          }}
        >
          ✓
        </span>
        <span style={{ fontSize: 15, color: "var(--ink)" }}>Sent — check your inbox for the full report.</span>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--card)", border: "1px solid rgba(23,21,15,0.12)", borderRadius: 14, padding: 28 }}>
      <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 21, margin: "0 0 8px", color: "var(--ink)" }}>
        Want this emailed to you?
      </h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--muted)", margin: "0 0 18px" }}>
        Get the full report with your score and breakdown sent to your inbox — no obligation.
      </p>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 14 }}>
        <div>
          <label htmlFor="erc-email" style={labelStyle}>WORK EMAIL</label>
          <input
            id="erc-email"
            type="email"
            className="aq-field"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="jane@company.com"
            style={fieldStyle}
          />
          {error && <div style={errorStyle}>{error}</div>}
        </div>
        <HoneypotField value={hp} onChange={setHp} />
        <ConsentCheckbox
          checked={consent}
          onChange={(v) => {
            setConsent(v);
            setConsentError("");
          }}
          id="erc-consent"
          error={consentError}
        />
        <button
          type="submit"
          className="btn-navy"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14.5,
            fontWeight: 600,
            color: "var(--cream)",
            background: "var(--navy)",
            border: "none",
            cursor: "pointer",
            padding: 13,
            borderRadius: 8,
          }}
        >
          Email me this report →
        </button>
      </form>
    </div>
  );
}
