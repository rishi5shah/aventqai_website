export const metadata = {
  title: "About — AventeQ",
  description: "AventeQ is an AI transformation company for operationally complex businesses.",
};

const rowLabel = { fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 28, margin: 0, color: "var(--ink)" };
const rowStyle = { gap: 40, padding: "44px 0", borderTop: "1px solid rgba(23,21,15,0.14)" };

const TEAM = [
  ["var(--terra)", "Founders", "Operators and AI engineers who've shipped systems inside finance and industrial businesses."],
  ["var(--navy)", "Delivery", "Solution architects and ML engineers who build, integrate, and deploy in production."],
  ["var(--green)", "Enablement", "Trainers and change leads who get teams from skeptical to fluent."],
];

const JOURNEY = [
  ["2023", "Founded to bring AI into operationally complex businesses."],
  ["2024", "First AI agents deployed across accounting and manufacturing clients."],
  ["2025", "Launched corporate AI training as a standalone practice."],
  ["2026", "Scaling consulting, implementation, and enablement across five sectors."],
];

export default function About() {
  return (
    <>
      <section className="container" style={{ paddingTop: 80, paddingBottom: 64 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", color: "var(--terra)", textTransform: "uppercase", marginBottom: 26 }}>
          About
        </div>
        <h1 className="t-56" style={{ fontFamily: "var(--font-serif)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", margin: 0, maxWidth: "24ch", color: "var(--ink)", textWrap: "pretty" }}>
          AventeQ is an AI transformation company for operationally complex businesses.
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--muted)", maxWidth: "60ch", margin: "30px 0 0" }}>
          We help accounting firms, law firms, manufacturers, logistics companies, and real estate firms identify high-impact AI opportunities, implement intelligent operational systems, and train their workforce to adopt AI effectively.
        </p>
      </section>

      <section className="container" style={{ paddingBottom: 40 }}>
        <div className="g-about" style={rowStyle}>
          <h2 style={rowLabel}>Mission</h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--muted)", margin: 0, maxWidth: "60ch" }}>
            To make AI useful where it&apos;s hardest — inside the messy, regulated, high-stakes operations that actually run a business. Not demos. Systems people rely on.
          </p>
        </div>

        <div className="g-about" style={rowStyle}>
          <h2 style={rowLabel}>Team</h2>
          <div className="g-3" style={{ gap: 28 }}>
            {TEAM.map(([color, title, desc]) => (
              <div key={title}>
                <div style={{ height: 4, width: 40, background: color, marginBottom: 16 }} />
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 21, color: "var(--ink)" }}>{title}</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--muted)", margin: "8px 0 0" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="g-about" style={rowStyle}>
          <h2 style={rowLabel}>Advisors</h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--muted)", margin: 0, maxWidth: "60ch" }}>
            We work alongside senior advisors from accounting, manufacturing, and supply-chain backgrounds — so our AI is grounded in how these industries actually operate, audit, and comply.
          </p>
        </div>

        <div className="g-about" style={{ gap: 40, padding: "44px 0 64px", borderTop: "1px solid rgba(23,21,15,0.14)" }}>
          <h2 style={rowLabel}>Journey</h2>
          <div style={{ display: "grid", gap: 20 }}>
            {JOURNEY.map(([year, text]) => (
              <div key={year} style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 24, alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--terra)" }}>{year}</span>
                <span style={{ fontSize: 16, color: "var(--ink)" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
