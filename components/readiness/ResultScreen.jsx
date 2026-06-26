"use client";

import { useState } from "react";
import Link from "next/link";
import { resolveCta } from "@/lib/readiness";
import { track, EVENTS } from "@/lib/analytics";

export default function ResultScreen({ result, profile, onRestart }) {
  const { score, tier, breakdown } = result;
  const cta = resolveCta(tier, profile.industry);
  const [playbookSent, setPlaybookSent] = useState(false);

  const onPrimaryClick = () => {
    const evt = cta.kind === "book" ? EVENTS.CTA_BOOK_CLICKED : EVENTS.CTA_SECONDARY_CLICKED;
    track(evt, { tier: tier.key, score, industry: profile.industry, cta: cta.kind });
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
        Your AI readiness
      </div>

      {/* Score + tier */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 76, lineHeight: 1, color: "var(--navy)", letterSpacing: "-0.02em" }}>
          {score}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--faint)" }}>/ 100</span>
      </div>
      <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 34, margin: "18px 0 12px", color: "var(--ink)" }}>
        {tier.label}
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--muted)", margin: "0 0 36px", maxWidth: "54ch" }}>
        {tier.blurb}
      </p>

      {/* Per-dimension breakdown */}
      <div style={{ borderTop: "1px solid rgba(23,21,15,0.14)", marginBottom: 36 }}>
        {breakdown.map((d) => {
          const pct = Math.round((d.score / 3) * 100);
          return (
            <div
              key={d.dimension}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(140px, 0.8fr) 1.6fr auto",
                gap: 20,
                alignItems: "center",
                padding: "16px 0",
                borderBottom: "1px solid rgba(23,21,15,0.10)",
              }}
            >
              <span style={{ fontSize: 14.5, color: "var(--ink)" }}>{d.dimension}</span>
              <span style={{ height: 6, borderRadius: 100, background: "rgba(23,21,15,0.10)", overflow: "hidden" }}>
                <span style={{ display: "block", height: "100%", width: `${pct}%`, background: "var(--navy)", borderRadius: 100 }} />
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--faint)", textAlign: "right" }}>
                {d.score}/3
              </span>
            </div>
          );
        })}
      </div>

      {/* Tier-routed CTA */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
        {cta.kind === "playbook" ? (
          playbookSent ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 15.5, color: "var(--green)", fontWeight: 600 }}>
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "var(--green)",
                  color: "var(--cream)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                ✓
              </span>
              On its way — check your inbox for the prep playbook.
            </span>
          ) : (
            <button
              onClick={() => {
                setPlaybookSent(true);
                onPrimaryClick();
              }}
              className="btn-navy"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                fontWeight: 600,
                color: "var(--cream)",
                background: "var(--navy)",
                border: "none",
                cursor: "pointer",
                padding: "15px 28px",
                borderRadius: 8,
              }}
            >
              {cta.label}
            </button>
          )
        ) : (
          <Link
            href={cta.href}
            onClick={onPrimaryClick}
            className="btn-navy"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              fontWeight: 600,
              color: "var(--cream)",
              background: "var(--navy)",
              textDecoration: "none",
              padding: "15px 28px",
              borderRadius: 8,
            }}
          >
            {cta.label}
          </Link>
        )}

        {/* Always-available secondary path, except where the primary is already booking */}
        {cta.kind !== "book" && (
          <Link
            href="/contact?context=strategy-session"
            onClick={() =>
              track(EVENTS.CTA_BOOK_CLICKED, { tier: tier.key, score, industry: profile.industry, cta: "book-secondary" })
            }
            className="btn-outline-ink"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              fontWeight: 600,
              color: "var(--ink)",
              background: "none",
              border: "1px solid rgba(23,21,15,0.22)",
              textDecoration: "none",
              padding: "15px 28px",
              borderRadius: 8,
            }}
          >
            Book a strategy session
          </Link>
        )}
      </div>

      <button
        onClick={onRestart}
        style={{
          marginTop: 28,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px 0",
          fontFamily: "var(--font-sans)",
          fontSize: 14.5,
          fontWeight: 600,
          color: "var(--muted-2)",
        }}
      >
        ↺ Retake the assessment
      </button>
    </div>
  );
}
