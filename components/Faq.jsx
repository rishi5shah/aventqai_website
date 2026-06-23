"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Is our data safe with you?",
    a: "Yes. We never train shared or public models on your documents, support private and on-prem deployment behind your own firewall, and keep a full role-based access and audit trail. We work inside regulated, audited industries where trust is the precondition, not a feature.",
  },
  {
    q: "How long until we see something real?",
    a: "Weeks, not quarters. A typical pilot proves one high-value use case end to end in 2–4 weeks, with production systems following over the next 4–8. You see measurable results before committing to scale.",
  },
  {
    q: "Do we need clean, organized data first?",
    a: "No. Part of our readiness assessment and workflow mapping is meeting your data where it is — messy, fragmented, across systems. We design around real operational conditions rather than an idealized data warehouse.",
  },
  {
    q: "What if our team resists using AI?",
    a: "That is the most common failure point, and why training is one of our three pillars. We run role-tailored enablement that takes teams from skeptical to fluent, so the systems we build actually get used every day.",
  },
  {
    q: "How do engagements and pricing work?",
    a: "We start small with a fixed-scope pilot, then move to build-and-deploy, then ongoing scale-and-enablement. Each phase is scoped and priced up front against expected ROI — no open-ended retainers to start.",
  },
];

export default function Faq() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ borderTop: "1px solid rgba(23,21,15,0.14)" }}>
      {FAQS.map((item, i) => {
        const open = openFaq === i;
        return (
          <div key={i} style={{ borderBottom: "1px solid rgba(23,21,15,0.14)" }}>
            <button
              onClick={() => setOpenFaq(open ? null : i)}
              aria-expanded={open}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "26px 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
              }}
            >
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 23, color: "var(--ink)", lineHeight: 1.3 }}>
                {item.q}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 22, color: "var(--terra)", flex: "none" }}>
                {open ? "−" : "+"}
              </span>
            </button>
            {open && (
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.64,
                  color: "var(--muted)",
                  margin: 0,
                  padding: "0 56px 28px 8px",
                  maxWidth: "72ch",
                }}
              >
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
