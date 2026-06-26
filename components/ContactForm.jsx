"use client";

import { useEffect, useState } from "react";
import { fieldStyle, labelStyle, isValidEmail } from "@/lib/forms";
import { submitLead, flushQueue } from "@/lib/leadSubmit";
import { getKnownProfile, recordCapture } from "@/lib/leadProfile";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import HoneypotField from "@/components/HoneypotField";

const PLACEHOLDERS = {
  "Accounting & Tax": "e.g. month-end reconciliation, notice handling, client follow-ups…",
  "Law Firm": "e.g. contract review, legal research, matter & deadline management…",
  Manufacturing: "e.g. vendor delays, procurement coordination, production visibility…",
  Logistics: "e.g. shipment exceptions, delay prediction, escalation chasing…",
  Other: "Which operations or workflows are you hoping AI could help with?",
};

const INDUSTRIES = ["Accounting & Tax", "Law Firm", "Manufacturing", "Logistics", "Other"];

// Human labels for the ?context= param set by readiness-assessment CTAs.
const CONTEXT_LABELS = {
  "strategy-session": "AI Strategy Session",
  "readiness-workshop": "Readiness Workshop",
  "prep-playbook": "Prep Playbook",
};

export default function ContactForm({ context = "" }) {
  const contextLabel = CONTEXT_LABELS[context] || "";
  const [fName, setFName] = useState("");
  const [fEmail, setFEmail] = useState("");
  const [fIndustry, setFIndustry] = useState("Accounting & Tax");
  const [fMessage, setFMessage] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Restore draft on mount; fall back to fields known from earlier forms
  // (progressive profiling) when there's no in-progress draft.
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("aq_form_draft") || "null");
      const known = getKnownProfile();
      setFName(d?.fName || known.firstName || "");
      setFEmail(d?.fEmail || known.email || "");
      setFIndustry(d?.fIndustry || known.industry || "Accounting & Tax");
      setFMessage(d?.fMessage || "");
    } catch {}
    flushQueue(); // retry any leads stranded by an earlier failed POST
  }, []);

  const saveDraft = (next) => {
    try {
      localStorage.setItem(
        "aq_form_draft",
        JSON.stringify({ fName, fEmail, fIndustry, fMessage, ...next })
      );
    } catch {}
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const eName = fName.trim() ? "" : "Please enter your name";
    let eEmail = "";
    if (!fEmail.trim()) eEmail = "Please enter your email";
    else if (!isValidEmail(fEmail)) eEmail = "Enter a valid email address";
    if (eName || eEmail) {
      setErrorName(eName);
      setErrorEmail(eEmail);
      return;
    }
    try {
      const subs = JSON.parse(localStorage.getItem("aq_submissions") || "[]");
      subs.push({ name: fName, email: fEmail, industry: fIndustry, message: fMessage, context: context || null, at: new Date().toISOString() });
      localStorage.setItem("aq_submissions", JSON.stringify(subs));
      localStorage.removeItem("aq_form_draft");
    } catch {}
    const { isRetake, firstCapturedAt } = recordCapture({ firstName: fName.trim(), email: fEmail.trim(), industry: fIndustry });
    // Fire-and-forget: the success state renders immediately either way.
    submitLead({
      source: "contact",
      firstName: fName.trim(),
      email: fEmail.trim(),
      industry: fIndustry,
      message: fMessage,
      context: context || null,
      consent,
      hp,
      isRetake,
      firstCapturedAt,
    });
    setSubmitted(true);
    setErrorName("");
    setErrorEmail("");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setSubmitted(false);
    setFName("");
    setFEmail("");
    setFMessage("");
    setErrorName("");
    setErrorEmail("");
  };

  return (
    <div style={{ background: "var(--card)", border: "1px solid rgba(23,21,15,0.12)", borderRadius: 14, padding: 40 }}>
      {submitted ? (
        <div style={{ textAlign: "center", padding: "26px 10px 18px" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--green)", color: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 22px" }}>
            ✓
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 30, margin: "0 0 12px", color: "var(--ink)" }}>Thanks — we&apos;ll be in touch.</h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--muted)", margin: "0 auto", maxWidth: "38ch" }}>
            Your note is in. Expect a reply within one business day to set up your strategy session.
          </p>
          <button
            onClick={reset}
            className="btn-outline-navy"
            style={{ marginTop: 26, fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600, color: "var(--navy)", background: "none", border: "1px solid rgba(22,50,79,0.3)", cursor: "pointer", padding: "12px 22px", borderRadius: 8 }}
          >
            Send another →
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 22 }}>
          {contextLabel && (
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.08em",
                color: "var(--navy)",
                background: "rgba(22,50,79,0.06)",
                border: "1px solid rgba(22,50,79,0.18)",
                borderRadius: 8,
                padding: "10px 14px",
              }}
            >
              Requested: {contextLabel}
            </div>
          )}
          <div>
            <label htmlFor="aq-name" style={labelStyle}>FULL NAME</label>
            <input
              id="aq-name"
              className="aq-field"
              value={fName}
              onChange={(e) => {
                const v = e.target.value;
                setFName(v);
                setErrorName("");
                saveDraft({ fName: v });
              }}
              placeholder="Jane Okafor"
              style={fieldStyle}
            />
            {errorName && <div style={{ fontSize: 13, color: "var(--terra)", marginTop: 7 }}>{errorName}</div>}
          </div>

          <div>
            <label htmlFor="aq-email" style={labelStyle}>WORK EMAIL</label>
            <input
              id="aq-email"
              type="email"
              className="aq-field"
              value={fEmail}
              onChange={(e) => {
                const v = e.target.value;
                setFEmail(v);
                setErrorEmail("");
                saveDraft({ fEmail: v });
              }}
              placeholder="jane@company.com"
              style={fieldStyle}
            />
            {errorEmail && <div style={{ fontSize: 13, color: "var(--terra)", marginTop: 7 }}>{errorEmail}</div>}
          </div>

          <div>
            <label htmlFor="aq-industry" style={labelStyle}>INDUSTRY</label>
            <select
              id="aq-industry"
              className="aq-field"
              value={fIndustry}
              onChange={(e) => {
                const v = e.target.value;
                setFIndustry(v);
                saveDraft({ fIndustry: v });
              }}
              style={fieldStyle}
            >
              {INDUSTRIES.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="aq-msg" style={labelStyle}>WHAT YOU&apos;RE TRYING TO SOLVE</label>
            <textarea
              id="aq-msg"
              className="aq-field"
              value={fMessage}
              onChange={(e) => {
                const v = e.target.value;
                setFMessage(v);
                saveDraft({ fMessage: v });
              }}
              placeholder={PLACEHOLDERS[fIndustry] || PLACEHOLDERS.Other}
              rows={3}
              style={{ ...fieldStyle, resize: "vertical" }}
            />
          </div>

          <HoneypotField value={hp} onChange={setHp} />
          <ConsentCheckbox checked={consent} onChange={setConsent} id="aq-consent" />

          <button
            type="submit"
            className="btn-navy"
            style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--cream)", background: "var(--navy)", border: "none", cursor: "pointer", padding: 15, borderRadius: 8 }}
          >
            Book an AI Strategy Session →
          </button>
        </form>
      )}
    </div>
  );
}
