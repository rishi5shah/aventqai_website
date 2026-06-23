import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "AI Training — AventeQ",
  description: "Corporate AI workshops built around real operational work. Tailored by role, run on-site or remote.",
};

const AUDIENCE = ["CXOs", "Finance Teams", "Operations Teams", "Manufacturing Teams", "Logistics Teams"];

const PROGRAMS = [
  "AI for Business Leaders",
  "AI for Accountants & CAs",
  "AI for Operations Teams",
  "AI for Manufacturing",
  "AI for Logistics",
  "AI for Law Firms",
  "Prompt Engineering for Enterprise Teams",
  "AI Productivity Workshops",
];

export default function Training() {
  return (
    <>
      <PageHero
        eyebrow="AI Training"
        title="Your people are the bottleneck. We fix that."
        titleMaxWidth="16ch"
        lead="Corporate AI workshops built around real operational work — not generic prompts. Tailored by role, run on-site or remote, and designed to leave teams genuinely capable."
      />

      <section className="container" style={{ paddingBottom: 40 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.14em", color: "var(--faint)", textTransform: "uppercase", marginBottom: 22 }}>
          Who it&apos;s for
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {AUDIENCE.map((a) => (
            <span key={a} style={{ fontSize: 14.5, color: "var(--navy)", border: "1px solid rgba(22,50,79,0.25)", padding: "9px 18px", borderRadius: 100 }}>{a}</span>
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingTop: 48, paddingBottom: 96 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.14em", color: "var(--faint)", textTransform: "uppercase", marginBottom: 8 }}>
          Programs
        </div>
        <div style={{ borderTop: "1px solid rgba(23,21,15,0.14)" }}>
          {PROGRAMS.map((p, i) => (
            <div
              key={p}
              className="row-tint"
              style={{ display: "grid", gridTemplateColumns: "50px 1fr", gap: 24, alignItems: "center", padding: "26px 8px", borderBottom: "1px solid rgba(23,21,15,0.14)" }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--faintest)" }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 26, color: "var(--ink)" }}>{p}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, background: "var(--navy)", borderRadius: 14, padding: "40px 44px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "var(--cream)", marginBottom: 6 }}>Every program is tailored to your teams.</div>
            <div style={{ fontSize: 15, color: "rgba(244,241,233,0.7)" }}>Run on-site or remote, shaped around your industry, roles, and the tools you already use.</div>
          </div>
          <Link href="/contact" className="btn-cream" style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--navy)", background: "var(--cream)", textDecoration: "none", padding: "14px 26px", borderRadius: 8, whiteSpace: "nowrap" }}>
            Plan a program ↗
          </Link>
        </div>
      </section>
    </>
  );
}
