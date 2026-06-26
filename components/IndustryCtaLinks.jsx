"use client";

import Link from "next/link";
import { track, EVENTS } from "@/lib/analytics";

export default function IndustryCtaLinks({ cta, industrySlug, placement }) {
  return (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
      <Link
        href={cta.primary.href}
        onClick={() => track(EVENTS.CTA_BOOK_CLICKED, { industry: industrySlug, placement })}
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
        {cta.primary.label}
      </Link>
      <Link
        href={cta.secondary.href}
        onClick={() => track(EVENTS.CTA_SECONDARY_CLICKED, { industry: industrySlug, placement })}
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
        {cta.secondary.label}
      </Link>
    </div>
  );
}
