export default function PageHero({ eyebrow, title, lead, titleClass = "t-60", titleMaxWidth, leadMaxWidth = "56ch", paddingBottom = 56 }) {
  return (
    <section className="container" style={{ paddingTop: 80, paddingBottom }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", color: "var(--terra)", textTransform: "uppercase", marginBottom: 26 }}>
        {eyebrow}
      </div>
      <h1
        className={titleClass}
        style={{ fontFamily: "var(--font-serif)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.02em", margin: 0, maxWidth: titleMaxWidth, color: "var(--ink)" }}
      >
        {title}
      </h1>
      <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--muted)", maxWidth: leadMaxWidth, margin: "30px 0 0" }}>
        {lead}
      </p>
    </section>
  );
}
