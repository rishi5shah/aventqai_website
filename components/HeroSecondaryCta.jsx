"use client";

import Link from "next/link";
import { track, EVENTS } from "@/lib/analytics";

export default function HeroSecondaryCta() {
  return (
    <div style={{ marginTop: 22 }}>
      <Link
        href="/readiness"
        onClick={() => track(EVENTS.CTA_SECONDARY_CLICKED, { placement: "homepage-hero" })}
        className="link-email"
        style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600, color: "var(--navy)", textDecoration: "none" }}
      >
        Not sure where to start? Take the 2-minute readiness assessment →
      </Link>
    </div>
  );
}
