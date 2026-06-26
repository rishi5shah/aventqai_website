import Link from "next/link";
import Faq from "@/components/Faq";
import HeroSecondaryCta from "@/components/HeroSecondaryCta";

const eyebrow = {
  fontFamily: "var(--font-mono)",
  fontSize: 11.5,
  letterSpacing: "0.16em",
  color: "var(--terra)",
  textTransform: "uppercase",
  marginBottom: 16,
};

const sectionH2 = {
  fontFamily: "var(--font-serif)",
  fontWeight: 400,
  lineHeight: 1.1,
  letterSpacing: "-0.015em",
  margin: 0,
  color: "var(--ink)",
};

const monoLineDark = { fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(244,241,233,0.5)" };

const AI_PARTNERS = [
  { name: "OpenAI", src: "/logos/openai.png" },
  { name: "Anthropic", src: "/logos/anthropic.png" },
  { name: "Google Gemini", src: "/logos/gemini.png" },
];

const INDUSTRY_ROWS = [
  { id: "A1", slug: "accounting", title: "Accounting & Tax", desc: "Reconciliation, tax optimization, notice handling, and client communication — automated." },
  { id: "M2", slug: "manufacturing", title: "Manufacturing", desc: "Production intelligence, procurement agents, vendor coordination, and predictive alerts." },
  { id: "L3", slug: "logistics", title: "Logistics", desc: "Shipment intelligence, delay prediction, escalation systems, and live visibility dashboards." },
  { id: "F4", slug: "law", title: "Law Firms", desc: "Legal research, contract intelligence, matter management, and compliance — connected." },
];

const STEPS = [
  ["01", "AI Readiness Assessment"],
  ["02", "Operational Workflow Mapping"],
  ["03", "Identify High-Impact Use Cases"],
  ["04", "Build & Deploy AI Systems"],
  ["05", "Train Teams"],
  ["06", "Continuous Optimization"],
];

const CASES = [
  ["Accounting", "70%", "less time on month-end reconciliation at a 40-partner CA firm"],
  ["Manufacturing", "5 days", "earlier warning on vendor delays with a procurement agent"],
  ["Logistics", "3×", "faster shipment-exception handling after workflow automation"],
];

const INSIGHTS = [
  ["Accounting", "Where AI actually pays off in month-end close", "6 min read"],
  ["Manufacturing", "Procurement agents: catching vendor delays before they land", "5 min read"],
  ["Enablement", "Why AI training fails — and what makes it stick", "7 min read"],
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="container" style={{ paddingTop: 64, paddingBottom: 72 }}>
        <div className="g-hero" style={{ gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", color: "var(--terra)", textTransform: "uppercase", marginBottom: 30 }}>
              AI Transformation Partner
            </div>
            <h1 className="t-hero" style={{ fontFamily: "var(--font-serif)", fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.02em", margin: 0, maxWidth: "15ch", color: "var(--ink)" }}>
              AI for real operations. Not just experiments.
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--muted)", maxWidth: "56ch", margin: "34px 0 0" }}>
              AventeQ helps accounting firms, law firms, manufacturers, and logistics companies implement AI across their workflows — through consulting, custom systems, and the training to make it stick.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-navy" style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--cream)", background: "var(--navy)", textDecoration: "none", padding: "15px 28px", borderRadius: 8 }}>
                Book an AI Strategy Session
              </Link>
              <Link href="/solutions" className="btn-outline-ink" style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--ink)", background: "none", border: "1px solid rgba(23,21,15,0.22)", textDecoration: "none", padding: "15px 28px", borderRadius: 8 }}>
                Explore use cases
              </Link>
            </div>
            <HeroSecondaryCta />
          </div>

          {/* operational readout panel */}
          <div className="hero-readout" style={{ background: "var(--near-black)", borderRadius: 14, padding: "26px 26px 28px", boxShadow: "0 24px 60px -28px rgba(20,19,15,0.5)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 16, borderBottom: "1px solid rgba(244,241,233,0.14)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(244,241,233,0.55)" }}>aventeq://operations</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--green-light)", textTransform: "uppercase" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green-light)", animation: "aq-blink 1.8s ease-in-out infinite" }} />
                live
              </span>
            </div>
            <div style={{ display: "grid", gap: 16, padding: "22px 0 4px" }}>
              {[
                ["reconciliation-agent", "1,284 / 1,284 matched", "var(--green-light)"],
                ["procurement-agent", "vendor delay · HIGH ▲", "var(--terra-light)"],
                ["notice-agent", "3 notices triaged", "rgba(244,241,233,0.6)"],
                ["shipment-intel", "ETA variance −5.2d", "var(--green-light)"],
              ].map(([name, status, color]) => (
                <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "rgba(244,241,233,0.85)" }}>{name}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color }}>{status}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(244,241,233,0.14)", fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--terra-light)" }}>
              &gt; optimizing workflows
              <span style={{ display: "inline-block", width: 8, height: 15, background: "var(--terra-light)", marginLeft: 4, transform: "translateY(2px)", animation: "aq-blink 1.1s step-end infinite" }} />
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(23,21,15,0.12)", margin: "64px 0 0" }} />
        <div className="g-3" style={{ gap: 1, background: "rgba(23,21,15,0.12)" }}>
          {[
            ["4 sectors", "accounting, law, manufacturing, and logistics — where we go deep, not wide.", "30px 28px 4px"],
            ["6 steps", "a proven method from readiness assessment to continuous optimization.", "30px 28px 4px"],
            ["Weeks", "to your first AI system running in production — not quarters.", "30px 28px 4px"],
          ].map(([num, desc, padding]) => (
            <div key={num} style={{ background: "var(--cream)", padding }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 46, fontWeight: 400, color: "var(--navy)", letterSpacing: "-0.01em" }}>{num}</div>
              <div style={{ fontSize: 14.5, color: "var(--muted)", marginTop: 6, maxWidth: "26ch" }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ borderTop: "1px solid rgba(23,21,15,0.12)", borderBottom: "1px solid rgba(23,21,15,0.12)", background: "var(--cream-alt)" }}>
        <div className="container" style={{ paddingTop: 26, paddingBottom: 26, display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--faint)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            Trusted in regulated, audited industries
          </span>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "center", opacity: 0.82 }}>
            {["Mid-size CA firms", "Component manufacturers", "Freight & 3PL operators", "Boutique law firms"].map((s) => (
              <span key={s} style={{ fontFamily: "var(--font-serif)", fontSize: 20, color: "var(--ink)" }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* AI Partners */}
      <section style={{ background: "var(--near-black)" }}>
        <div className="container" style={{ paddingTop: 84, paddingBottom: 84 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.16em", color: "var(--terra-light)", textTransform: "uppercase", marginBottom: 16 }}>
                AI Partners
              </div>
              <h2 className="t-44" style={{ ...sectionH2, color: "var(--cream)", maxWidth: "22ch" }}>Partnered with the labs building frontier AI.</h2>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(244,241,233,0.6)", margin: 0, maxWidth: "34ch" }}>
              We implement and train enterprise teams on the platforms actually shipping frontier models — not a layer removed from them.
            </p>
          </div>
          <div className="g-3" style={{ gap: 24 }}>
            {AI_PARTNERS.map((p) => (
              <div
                key={p.name}
                style={{
                  height: 150,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={p.src}
                  alt={p.name}
                  style={{ height: "180%", width: "auto", maxWidth: "none", objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do — 3 pillars (dark) */}
      <section style={{ background: "var(--near-black)", color: "var(--cream)" }}>
        <div className="container" style={{ paddingTop: 92, paddingBottom: 92 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 52, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ ...eyebrow }}>01 — What we do</div>
              <h2 className="t-44" style={{ ...sectionH2, color: "var(--cream)" }}>Three pillars, one transformation.</h2>
            </div>
            <Link href="/solutions" className="btn-outline-cream" style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600, color: "var(--cream)", background: "none", border: "1px solid rgba(244,241,233,0.3)", textDecoration: "none", padding: "12px 22px", borderRadius: 8, whiteSpace: "nowrap" }}>
              All solutions ↗
            </Link>
          </div>
          <div className="g-3" style={{ gap: 1, background: "rgba(244,241,233,0.14)" }}>
            {[
              ["assess · prioritize · roadmap", "AI Consulting", "We find where AI actually pays off, size the ROI, and hand you a transformation roadmap you can act on."],
              ["build · integrate · deploy", "AI Implementation", "We design and deploy AI agents, automations, and private systems that run inside your day-to-day operations."],
              ["upskill · adopt · govern", "AI Training & Enablement", "We turn “we have AI” into teams who use it well — safely, productively, and every day."],
            ].map(([line, title, desc]) => (
              <div key={title} style={{ background: "var(--near-black)", padding: "36px 30px 40px" }}>
                <div style={monoLineDark}>{line}</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 27, margin: "18px 0 12px", color: "var(--cream)" }}>{title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(244,241,233,0.66)", margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries strip */}
      <section className="container" style={{ paddingTop: 92, paddingBottom: 92 }}>
        <div style={{ ...eyebrow }}>02 — Industries</div>
        <h2 className="t-44" style={{ ...sectionH2, margin: "0 0 48px", maxWidth: "18ch" }}>We go deep in four industries.</h2>
        <div style={{ borderTop: "1px solid rgba(23,21,15,0.14)" }}>
          {INDUSTRY_ROWS.map((row) => (
            <Link
              key={row.id}
              href={`/industries/${row.slug}`}
              className="g-irow row-tint"
              style={{ width: "100%", textAlign: "left", textDecoration: "none", borderBottom: "1px solid rgba(23,21,15,0.14)", padding: "30px 8px", gap: 30, alignItems: "center" }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--faintest)" }}>{row.id}</span>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 28, color: "var(--ink)" }}>{row.title}</span>
              <span style={{ fontSize: 15.5, color: "var(--muted)", lineHeight: 1.55 }}>{row.desc}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--navy)" }}>↗</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How we work — 6 steps */}
      <section style={{ background: "var(--cream-alt)", borderTop: "1px solid rgba(23,21,15,0.12)" }}>
        <div className="container" style={{ paddingTop: 88, paddingBottom: 88 }}>
          <div style={{ ...eyebrow }}>03 — How we work</div>
          <h2 className="t-44" style={{ ...sectionH2, margin: "0 0 50px", maxWidth: "20ch" }}>Our six-step transformation method.</h2>
          <div className="g-6" style={{ gap: 1, background: "rgba(23,21,15,0.14)", border: "1px solid rgba(23,21,15,0.14)" }}>
            {STEPS.map(([num, title]) => (
              <div key={num} style={{ background: "var(--cream)", padding: "26px 20px 30px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--terra)" }}>{num}</div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, lineHeight: 1.2, marginTop: 14, color: "var(--ink)" }}>{title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Training band (navy) */}
      <section style={{ background: "var(--navy)", color: "var(--cream)" }}>
        <div className="container g-training" style={{ paddingTop: 84, paddingBottom: 84, gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.16em", color: "var(--terra-light)", textTransform: "uppercase", marginBottom: 18 }}>
              04 — AI Training
            </div>
            <h2 className="t-42" style={{ ...sectionH2, lineHeight: 1.12, color: "var(--cream)" }}>The technology is ready. Most teams aren&apos;t.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.64, color: "rgba(244,241,233,0.72)", margin: "24px 0 32px", maxWidth: "50ch" }}>
              We run corporate AI workshops that take leaders and operators from curiosity to capability — tailored by role, from CXOs to finance, manufacturing, and logistics teams.
            </p>
            <Link href="/training" className="btn-cream" style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, color: "var(--navy)", background: "var(--cream)", textDecoration: "none", padding: "14px 26px", borderRadius: 8 }}>
              See training programs ↗
            </Link>
          </div>
          <div style={{ display: "grid", gap: 1, background: "rgba(244,241,233,0.18)", border: "1px solid rgba(244,241,233,0.18)", borderRadius: 10, overflow: "hidden" }}>
            {["AI for Business Leaders", "AI for Accountants & CAs", "AI for Operations Teams", "Prompt Engineering for Enterprise"].map((p) => (
              <div key={p} style={{ background: "var(--navy)", padding: "16px 20px", fontSize: 15, color: "rgba(244,241,233,0.9)" }}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="container" style={{ paddingTop: 40, paddingBottom: 96 }}>
        <figure style={{ margin: 0, maxWidth: "62ch" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 60, lineHeight: 0, color: "var(--terra)", height: 28 }}>“</div>
          <blockquote style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 36, lineHeight: 1.3, letterSpacing: "-0.01em", color: "var(--ink)", margin: 0, textWrap: "pretty" }}>
            They didn&apos;t sell us a model. They sat inside our month-end close, found the three things actually worth automating, shipped them — then trained our seniors to own it.
          </blockquote>
          <figcaption style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <span style={{ width: 44, height: 1, background: "var(--terra)" }} />
            <span style={{ fontSize: 15, color: "var(--muted)" }}>Managing Partner, mid-size CA firm</span>
          </figcaption>
        </figure>
      </section>

      {/* Case studies teaser */}
      <section className="container" style={{ paddingTop: 92, paddingBottom: 92 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 44, flexWrap: "wrap", gap: 18 }}>
          <div>
            <div style={{ ...eyebrow }}>05 — Case studies</div>
            <h2 style={{ ...sectionH2, fontSize: 40 }}>AI that earned its place.</h2>
          </div>
          <Link href="/cases" className="btn-outline-ink" style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, fontWeight: 600, color: "var(--ink)", background: "none", border: "1px solid rgba(23,21,15,0.22)", textDecoration: "none", padding: "12px 22px", borderRadius: 8 }}>
            All case studies ↗
          </Link>
        </div>
        <div className="g-3" style={{ gap: 32 }}>
          {CASES.map(([tag, stat, headline]) => (
            <Link key={stat} href="/cases" className="case-card" style={{ textAlign: "left", textDecoration: "none", background: "var(--card)", border: "1px solid rgba(23,21,15,0.12)", padding: 30, borderRadius: 12, display: "block" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--faint)", textTransform: "uppercase" }}>{tag}</div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 38, color: "var(--navy)", margin: "18px 0 6px" }}>{stat}</div>
              <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 16, lineHeight: 1.4, margin: 0, color: "var(--ink)" }}>{headline}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Security & data (dark) */}
      <section style={{ background: "var(--near-black)", color: "var(--cream)" }}>
        <div className="container" style={{ paddingTop: 92, paddingBottom: 92 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ ...eyebrow }}>06 — Security &amp; data</div>
              <h2 className="t-44" style={{ ...sectionH2, color: "var(--cream)", maxWidth: "20ch" }}>Built to be trusted with your data.</h2>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(244,241,233,0.6)", margin: 0, maxWidth: "34ch" }}>
              We work inside regulated, audited industries. Trust isn&apos;t a feature here — it&apos;s the precondition.
            </p>
          </div>
          <div className="g-3" style={{ gap: 1, background: "rgba(244,241,233,0.14)" }}>
            {[
              ["/ ownership", "Your data stays yours", "We never train shared or public models on your documents. Your data powers your systems — and only yours."],
              ["/ deployment", "Private & on-prem options", "Deploy behind your own firewall or in your cloud. Sensitive workloads never have to leave your environment."],
              ["/ control", "Access & audit trail", "Role-based access plus an immutable log of every action — so you can always answer who did what, and when."],
            ].map(([line, title, desc]) => (
              <div key={title} style={{ background: "var(--near-black)", padding: "32px 28px 38px" }}>
                <div style={monoLineDark}>{line}</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 23, margin: "16px 0 10px", color: "var(--cream)" }}>{title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "rgba(244,241,233,0.66)", margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginTop: 36, paddingTop: 32, borderTop: "1px solid rgba(244,241,233,0.14)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: "rgba(244,241,233,0.45)", textTransform: "uppercase", marginRight: 8 }}>Aligned to</span>
            {["SOC 2 Type II", "ISO 27001", "GDPR", "India DPDP"].map((b) => (
              <span key={b} style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "rgba(244,241,233,0.82)", border: "1px solid rgba(244,241,233,0.22)", padding: "8px 16px", borderRadius: 100 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="container" style={{ paddingTop: 92, paddingBottom: 0 }}>
        <div style={{ ...eyebrow }}>07 — Insights</div>
        <h2 className="t-44" style={{ ...sectionH2, margin: "0 0 12px", maxWidth: "18ch" }}>Notes from inside the work.</h2>
        <p style={{ fontSize: 15, color: "var(--faint)", margin: "0 0 40px" }}>Field notes from our engagements — published periodically.</p>
        <div style={{ borderTop: "1px solid rgba(23,21,15,0.14)" }}>
          {INSIGHTS.map(([tag, title, read]) => (
            <div key={title} className="g-case" style={{ gap: 30, alignItems: "baseline", padding: "26px 8px", borderBottom: "1px solid rgba(23,21,15,0.14)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--faint)", textTransform: "uppercase" }}>{tag}</span>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 23, color: "var(--ink)", lineHeight: 1.25 }}>{title}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--faintest)", textAlign: "right" }}>{read}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container container-narrow" style={{ paddingTop: 92, paddingBottom: 96 }}>
        <div style={{ ...eyebrow }}>08 — FAQ</div>
        <h2 className="t-44" style={{ ...sectionH2, margin: "0 0 44px", maxWidth: "18ch" }}>The questions we hear first.</h2>
        <Faq />
      </section>
    </>
  );
}
