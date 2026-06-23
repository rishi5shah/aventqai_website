import Link from "next/link";

export default function CTA() {
  return (
    <section style={{ background: "var(--terra)" }}>
      <div
        className="container"
        style={{
          paddingTop: 78,
          paddingBottom: 78,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <h2
          className="t-42"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            margin: 0,
            color: "var(--cta-cream)",
            maxWidth: "20ch",
          }}
        >
          Find out where AI actually pays off in your operations.
        </h2>
        <Link
          href="/contact"
          className="btn-cream"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15.5,
            fontWeight: 600,
            color: "var(--terra)",
            background: "var(--cta-cream)",
            textDecoration: "none",
            padding: "16px 32px",
            borderRadius: 8,
            whiteSpace: "nowrap",
          }}
        >
          Book an AI Strategy Session →
        </Link>
      </div>
    </section>
  );
}
