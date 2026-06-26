"use client";

import { useState } from "react";
import { fieldStyle, labelStyle, errorStyle, isValidEmail } from "@/lib/forms";
import { INDUSTRIES, TEAM_SIZES } from "@/lib/readiness";
import { getKnownProfile, saveKnownProfile } from "@/lib/leadProfile";

export default function LeadGate({ onSubmit, onBack }) {
  const [known] = useState(getKnownProfile);
  const [firstName, setFirstName] = useState(known.firstName || "");
  const [email, setEmail] = useState(known.email || "");
  const [company, setCompany] = useState(known.company || "");
  const [industry, setIndustry] = useState(known.industry || "");
  const [teamSize, setTeamSize] = useState(known.teamSize || "");
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!firstName.trim()) next.firstName = "Please enter your first name";
    if (!email.trim()) next.email = "Please enter your work email";
    else if (!isValidEmail(email)) next.email = "Enter a valid email address";
    if (!industry) next.industry = "Please select your industry";
    if (!teamSize) next.teamSize = "Please select your team size";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    const profileData = {
      firstName: firstName.trim(),
      email: email.trim(),
      company: company.trim(),
      industry,
      teamSize,
    };
    saveKnownProfile(profileData);
    onSubmit(profileData);
  };

  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11.5,
          letterSpacing: "0.16em",
          color: "var(--terra)",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        Almost there
      </div>
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          fontSize: 32,
          lineHeight: 1.18,
          letterSpacing: "-0.015em",
          margin: "0 0 10px",
          color: "var(--ink)",
        }}
      >
        Where should we send your readiness score?
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 32px", maxWidth: "46ch" }}>
        Your results are ready. Add a few details and we&apos;ll show your score plus a tailored next step.
      </p>

      <form onSubmit={submit} style={{ display: "grid", gap: 22 }}>
        <div>
          <label htmlFor="rg-name" style={labelStyle}>FIRST NAME</label>
          <input
            id="rg-name"
            className="aq-field"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setErrors((x) => ({ ...x, firstName: "" }));
            }}
            placeholder="Jane"
            style={fieldStyle}
          />
          {errors.firstName && <div style={errorStyle}>{errors.firstName}</div>}
        </div>

        <div>
          <label htmlFor="rg-email" style={labelStyle}>WORK EMAIL</label>
          <input
            id="rg-email"
            type="email"
            className="aq-field"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((x) => ({ ...x, email: "" }));
            }}
            placeholder="jane@company.com"
            style={fieldStyle}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        <div>
          <label htmlFor="rg-company" style={labelStyle}>COMPANY <span style={{ textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
          <input
            id="rg-company"
            className="aq-field"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company name"
            style={fieldStyle}
          />
        </div>

        <div>
          <label htmlFor="rg-industry" style={labelStyle}>INDUSTRY</label>
          <select
            id="rg-industry"
            className="aq-field"
            value={industry}
            onChange={(e) => {
              setIndustry(e.target.value);
              setErrors((x) => ({ ...x, industry: "" }));
            }}
            style={{ ...fieldStyle, color: industry ? "var(--ink)" : "var(--faint)" }}
          >
            <option value="" disabled>Select your industry</option>
            {INDUSTRIES.map((i) => (
              <option key={i.value} value={i.value}>{i.value}</option>
            ))}
          </select>
          {errors.industry && <div style={errorStyle}>{errors.industry}</div>}
        </div>

        <div>
          <label htmlFor="rg-team" style={labelStyle}>TEAM SIZE</label>
          <select
            id="rg-team"
            className="aq-field"
            value={teamSize}
            onChange={(e) => {
              setTeamSize(e.target.value);
              setErrors((x) => ({ ...x, teamSize: "" }));
            }}
            style={{ ...fieldStyle, color: teamSize ? "var(--ink)" : "var(--faint)" }}
          >
            <option value="" disabled>Select team size</option>
            {TEAM_SIZES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.teamSize && <div style={errorStyle}>{errors.teamSize}</div>}
        </div>

        <button
          type="submit"
          className="btn-navy"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--cream)",
            background: "var(--navy)",
            border: "none",
            cursor: "pointer",
            padding: 15,
            borderRadius: 8,
          }}
        >
          See my readiness score →
        </button>

        <button
          type="button"
          onClick={onBack}
          style={{
            justifySelf: "start",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 0",
            fontFamily: "var(--font-sans)",
            fontSize: 14.5,
            fontWeight: 600,
            color: "var(--muted-2)",
          }}
        >
          ← Back
        </button>
      </form>
    </div>
  );
}
