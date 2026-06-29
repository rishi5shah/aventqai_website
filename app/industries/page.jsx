import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Industries — AventeQ",
  description: "We know your operations before we build. AI for accounting, manufacturing, logistics, law, and real estate firms.",
};

const INDUSTRIES = [
  {
    id: "A1",
    slug: "accounting",
    title: "Accounting & Tax Consulting",
    pain: ["Manual reconciliations", "Tax planning bottlenecks", "Document collection", "Notice handling", "Client follow-ups"],
    deploy: ["Intelligent Reconciliation", "Tax Optimization Agent", "Notice Analysis Agent", "Client Communication Automation", "Compliance Workflows"],
  },
  {
    id: "M2",
    slug: "manufacturing",
    title: "Manufacturing",
    pain: ["Production delays", "Vendor coordination", "Procurement bottlenecks", "Reporting gaps", "Operational visibility"],
    deploy: ["Production Intelligence", "Procurement Agents", "Vendor Coordination Systems", "Predictive Alerts", "Operational Dashboards"],
  },
  {
    id: "L3",
    slug: "logistics",
    title: "Logistics",
    pain: ["Shipment delays", "Documentation issues", "Communication fragmentation", "Manual escalations", "Poor visibility"],
    deploy: ["Shipment Intelligence", "Workflow Automation", "Delay Prediction", "Escalation Systems", "Logistics Dashboards"],
  },
  {
    id: "F4",
    slug: "law",
    title: "Law Firms",
    pain: ["Manual document review", "Contract analysis & clause extraction", "Legal research across sources", "Matter & deadline management", "Compliance monitoring"],
    deploy: ["Legal Research Intelligence", "Contract Intelligence", "Matter Management Intelligence", "Compliance Intelligence", "Client Operations Intelligence"],
  },
  {
    id: "E5",
    slug: "real-estate",
    title: "Real Estate",
    pain: ["Lease & contract review", "Listing & document prep", "Tenant & buyer communication", "Market & valuation research", "Deal coordination"],
    deploy: ["Lease Abstraction Agent", "Listing Document Automation", "Tenant Communication Automation", "Market Intelligence Agent", "Deal Pipeline Intelligence"],
  },
];

function ItemList({ items, color, weight }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {items.map((item, i) => (
        <div
          key={item}
          style={{
            fontSize: 15,
            color,
            fontWeight: weight,
            borderBottom: i === items.length - 1 ? "none" : "1px solid rgba(23,21,15,0.08)",
            paddingBottom: i === items.length - 1 ? 0 : 10,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="We know your operations before we build."
        titleMaxWidth="16ch"
        leadMaxWidth="54ch"
        lead="Five industries, each with its own bottlenecks. We map the pain, then deploy the AI that removes it."
      />

      <section className="container" style={{ paddingBottom: 96, display: "grid", gap: 24 }}>
        {INDUSTRIES.map((ind) => (
          <div key={ind.id} style={{ background: "var(--card)", border: "1px solid rgba(23,21,15,0.12)", borderRadius: 14, padding: 44 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--faintest)" }}>{ind.id}</span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 34, margin: 0, color: "var(--ink)" }}>{ind.title}</h2>
              </div>
              <Link href={`/industries/${ind.slug}`} className="link-email" style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600, color: "var(--navy)", textDecoration: "none", whiteSpace: "nowrap" }}>
                See the full industry page →
              </Link>
            </div>
            <div className="g-2" style={{ gap: 40 }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--terra)", textTransform: "uppercase", marginBottom: 16 }}>The pain</div>
                <ItemList items={ind.pain} color="var(--muted)" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--green)", textTransform: "uppercase", marginBottom: 16 }}>What we deploy</div>
                <ItemList items={ind.deploy} color="var(--ink)" weight={500} />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
