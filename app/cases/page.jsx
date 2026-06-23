import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Case Studies — AventeQ",
  description: "Representative AI engagements across accounting, manufacturing, and logistics.",
};

const CASES = [
  {
    tag: "Accounting & Tax",
    title: "A 40-partner CA firm closes months in days.",
    body: "We deployed an Intelligent Reconciliation agent and a Notice Analysis agent across the firm's tax practice. Manual matching dropped sharply and senior staff moved from data entry back to advisory work.",
    stat: "70%",
    statLabel: "less reconciliation time",
  },
  {
    tag: "Manufacturing",
    title: "A components maker sees vendor risk early.",
    body: "A Procurement Agent now reads vendor communications and order histories, flagging likely delays before they hit the line — with predictive alerts routed straight to planners.",
    stat: "5 days",
    statLabel: "earlier delay warning",
  },
  {
    tag: "Logistics",
    title: "A freight operator clears exceptions faster.",
    body: "Shipment Intelligence plus automated escalation workflows replaced a tangle of email threads, so exceptions get caught, routed, and resolved without manual chasing.",
    stat: "3×",
    statLabel: "faster exception handling",
  },
];

export default function Cases() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="AI that earned its place in the work."
        titleMaxWidth="15ch"
        leadMaxWidth="54ch"
        lead="A few representative engagements across the industries we serve. Outcomes are illustrative and shared with client permission on request."
      />

      <section className="container" style={{ paddingBottom: 96, display: "grid", gap: 24 }}>
        {CASES.map((c) => (
          <div
            key={c.tag}
            className="g-case"
            style={{ background: "var(--card)", border: "1px solid rgba(23,21,15,0.12)", borderRadius: 14, padding: 44, gap: 40, alignItems: "center" }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--faint)", textTransform: "uppercase" }}>{c.tag}</div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 30, margin: "14px 0 0", color: "var(--ink)", lineHeight: 1.15 }}>{c.title}</h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.64, color: "var(--muted)", margin: 0 }}>{c.body}</p>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 52, color: "var(--navy)", lineHeight: 1 }}>{c.stat}</div>
              <div style={{ fontSize: 13.5, color: "var(--faint)", marginTop: 8 }}>{c.statLabel}</div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
