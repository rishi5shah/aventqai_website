import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Solutions — AventeQ",
  description: "AI consulting, implementation, and training — packaged to ship.",
};

const OFFERINGS = [
  {
    line: "assess · prioritize · roadmap",
    title: "AI Consulting",
    desc: "We identify high-impact AI opportunities and build a transformation roadmap grounded in your operations and your numbers.",
    chips: ["AI Readiness Assessment", "Workflow Mapping", "Opportunity Identification", "ROI Analysis", "AI Strategy & Roadmap"],
    dark: false,
  },
  {
    line: "build · integrate · deploy",
    title: "AI Implementation",
    desc: "We design and deploy AI systems that integrate into day-to-day operations — agents, automations, and private AI that lives behind your firewall.",
    chips: ["AI Agents", "Workflow Automation", "Private AI Systems", "Enterprise Integrations", "Operational Dashboards"],
    dark: false,
  },
  {
    line: "upskill · adopt · govern",
    title: "AI Training",
    desc: "We train teams to adopt AI safely and effectively — because the biggest barrier to AI isn't the model, it's the people expected to use it.",
    chips: ["Executive Workshops", "Employee AI Training", "Prompt Engineering", "AI Tools Training", "Responsible AI Adoption"],
    dark: false,
  },
  {
    line: "monitor · coordinate · optimize",
    title: "Operational Intelligence",
    desc: "A living layer over your operations — surfacing risks, coordinating across teams, and optimizing the decisions that run the business.",
    chips: ["Production Intelligence", "Procurement Agents", "Predictive Alerts", "Shipment Intelligence", "Operational Dashboards"],
    dark: true,
  },
];

const PHASES = [
  ["Phase 01", "2–4 weeks", "Pilot", "We prove one high-value use case end to end — real data, real workflow, measurable result."],
  ["Phase 02", "4–8 weeks", "Build & Deploy", "We ship production-grade systems into your operations and integrate with the tools you already run."],
  ["Phase 03", "Ongoing", "Scale & Enable", "We expand coverage across teams and train your people to own and extend the systems themselves."],
];

export default function Solutions() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="AI consulting, implementation, and training — packaged to ship."
        titleMaxWidth="17ch"
        lead="Four offerings that take you from “where do we start?” to AI systems running in production and teams who run them well."
      />

      <section className="container" style={{ paddingBottom: 96, display: "grid", gap: 24 }}>
        {OFFERINGS.map((o) => (
          <div
            key={o.title}
            className="g-offering"
            style={{
              background: o.dark ? "var(--near-black)" : "var(--card)",
              border: o.dark ? "none" : "1px solid rgba(23,21,15,0.12)",
              borderRadius: 14,
              padding: 48,
              gap: 48,
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: o.dark ? "var(--terra-light)" : "var(--terra)" }}>{o.line}</div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 38, margin: "14px 0 16px", color: o.dark ? "var(--cream)" : "var(--ink)" }}>{o.title}</h2>
              <p style={{ fontSize: 16.5, lineHeight: 1.64, color: o.dark ? "rgba(244,241,233,0.68)" : "var(--muted)", margin: 0 }}>{o.desc}</p>
            </div>
            <div
              className="g-2"
              style={{
                gap: 1,
                background: o.dark ? "rgba(244,241,233,0.16)" : "rgba(23,21,15,0.1)",
                borderRadius: 10,
                overflow: "hidden",
                alignSelf: "start",
              }}
            >
              {o.chips.map((chip, i) => (
                <div
                  key={chip}
                  style={{
                    background: o.dark ? "var(--dark-alt)" : "var(--cream)",
                    padding: "16px 18px",
                    fontSize: 14.5,
                    color: o.dark ? "var(--cream)" : "var(--ink)",
                    gridColumn: i === o.chips.length - 1 ? "span 2" : undefined,
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section style={{ background: "var(--cream-alt)", borderTop: "1px solid rgba(23,21,15,0.12)" }}>
        <div className="container" style={{ paddingTop: 88, paddingBottom: 88 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.16em", color: "var(--terra)", textTransform: "uppercase", marginBottom: 16 }}>
            How engagements work
          </div>
          <h2 className="t-44" style={{ fontFamily: "var(--font-serif)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.015em", margin: "0 0 50px", color: "var(--ink)", maxWidth: "20ch" }}>
            Start small. Prove it. Then scale.
          </h2>
          <div className="g-3" style={{ gap: 1, background: "rgba(23,21,15,0.14)", border: "1px solid rgba(23,21,15,0.14)" }}>
            {PHASES.map(([phase, time, title, desc]) => (
              <div key={phase} style={{ background: "var(--cream)", padding: "34px 30px 38px" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--terra)" }}>{phase}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--faint)" }}>{time}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 26, margin: "16px 0 10px", color: "var(--ink)" }}>{title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
