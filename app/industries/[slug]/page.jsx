import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import IndustryCtaLinks from "@/components/IndustryCtaLinks";
import { INDUSTRY_PAGES, INDUSTRY_SLUGS } from "@/lib/industries";

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
  margin: "0 0 40px",
  color: "var(--ink)",
};

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = INDUSTRY_PAGES[slug];
  if (!data) return {};
  return { title: data.metaTitle, description: data.metaDescription };
}

export default async function IndustryPage({ params }) {
  const { slug } = await params;
  const data = INDUSTRY_PAGES[slug];
  if (!data) notFound();

  return (
    <>
      <PageHero eyebrow={data.hero.eyebrow} title={data.hero.title} lead={data.hero.lead} titleMaxWidth="18ch" leadMaxWidth="56ch" />

      {/* Pain points */}
      <section className="container" style={{ paddingBottom: 80 }}>
        <div style={eyebrow}>The pain</div>
        <h2 className="t-44" style={sectionH2}>Where the hours go.</h2>
        <div className="g-2" style={{ gap: 1, background: "rgba(23,21,15,0.14)", border: "1px solid rgba(23,21,15,0.14)" }}>
          {data.painPoints.map((p) => (
            <div key={p.title} style={{ background: "var(--cream)", padding: "30px 28px 34px" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 22, margin: "0 0 10px", color: "var(--ink)" }}>{p.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="container" style={{ paddingBottom: 80 }}>
        <IndustryCtaLinks cta={data.cta} industrySlug={slug} placement="mid" />
      </section>

      {/* Use cases */}
      <section className="container" style={{ paddingBottom: 80 }}>
        <div style={eyebrow}>What we deploy</div>
        <h2 className="t-44" style={sectionH2}>Where AI plugs in.</h2>
        <div className="g-3" style={{ gap: 1, background: "rgba(23,21,15,0.14)", border: "1px solid rgba(23,21,15,0.14)" }}>
          {data.useCases.map((u) => (
            <div key={u.title} style={{ background: "var(--cream)", padding: "28px 24px 32px" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 20, margin: "0 0 10px", color: "var(--ink)" }}>{u.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case study */}
      <section className="container" style={{ paddingBottom: 80 }}>
        <div style={eyebrow}>Case study</div>
        <h2 className="t-44" style={sectionH2}>Proof, not promises.</h2>
        <div
          className="g-case"
          style={{ background: "var(--card)", border: "1px solid rgba(23,21,15,0.12)", borderRadius: 14, padding: 44, gap: 40, alignItems: "center" }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--faint)", textTransform: "uppercase" }}>
              {data.caseStudy.tag}
            </div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 30, margin: "14px 0 0", color: "var(--ink)", lineHeight: 1.15 }}>
              {data.caseStudy.title}
            </h3>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.64, color: "var(--muted)", margin: 0 }}>{data.caseStudy.body}</p>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 52, color: "var(--navy)", lineHeight: 1 }}>{data.caseStudy.stat}</div>
            <div style={{ fontSize: 13.5, color: "var(--faint)", marginTop: 8 }}>{data.caseStudy.statLabel}</div>
          </div>
        </div>
      </section>

      {/* Security & data, industry-ordered */}
      <section style={{ background: "var(--cream-alt)", borderTop: "1px solid rgba(23,21,15,0.12)", borderBottom: "1px solid rgba(23,21,15,0.12)" }}>
        <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div style={eyebrow}>Security & data</div>
          <h2 className="t-44" style={sectionH2}>Built to be trusted with your data.</h2>
          <div className="g-3" style={{ gap: 1, background: "rgba(23,21,15,0.14)", marginBottom: 36 }}>
            {data.security.items.map((item) => (
              <div key={item.title} style={{ background: "var(--cream)", padding: "28px 24px 32px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--terra)" }}>{item.line}</div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 21, margin: "14px 0 8px", color: "var(--ink)" }}>{item.title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--faint)", textTransform: "uppercase", marginRight: 8 }}>
              Aligned to
            </span>
            {data.security.badges.map((b) => (
              <span key={b} style={{ fontSize: 14.5, color: "var(--navy)", border: "1px solid rgba(22,50,79,0.25)", padding: "9px 18px", borderRadius: 100 }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* End-of-content CTA */}
      <section className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <IndustryCtaLinks cta={data.cta} industrySlug={slug} placement="end" />
      </section>
    </>
  );
}
