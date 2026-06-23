import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — AventeQ",
  description: "Book an AI strategy session. Tell us where AI could move the needle in your operations.",
};

const STEPS = [
  ["01", "We read your note and map it to where AI realistically helps."],
  ["02", "A 30-minute intro call — no pitch, just your operations."],
  ["03", "A short, honest opportunity read: what's worth doing first."],
];

export default function Contact() {
  return (
    <section className="container g-2" style={{ paddingTop: 80, paddingBottom: 96, gap: 80 }}>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", color: "var(--terra)", textTransform: "uppercase", marginBottom: 26 }}>
          Contact
        </div>
        <h1 className="t-56" style={{ fontFamily: "var(--font-serif)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.02em", margin: 0, color: "var(--ink)" }}>
          Book an AI strategy session.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--muted)", maxWidth: "42ch", margin: "28px 0 36px" }}>
          Tell us where AI could move the needle in your operations. We&apos;ll come back with a clear, honest read on what&apos;s worth doing first.
        </p>

        <div style={{ display: "grid", gap: 16, marginBottom: 40 }}>
          {STEPS.map(([num, text]) => (
            <div key={num} style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--terra)" }}>{num}</span>
              <span style={{ fontSize: 15.5, color: "var(--muted)", lineHeight: 1.5 }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(23,21,15,0.14)", paddingTop: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", fontSize: 15 }}>
            <span style={{ color: "var(--faint)" }}>General</span>
            <a href="mailto:hello@aventeqai.com" className="link-email" style={{ color: "var(--navy)", textDecoration: "none" }}>
              hello@aventeqai.com
            </a>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", fontSize: 15 }}>
            <span style={{ color: "var(--faint)" }}>Training</span>
            <a href="mailto:training@aventeqai.com" className="link-email" style={{ color: "var(--navy)", textDecoration: "none" }}>
              training@aventeqai.com
            </a>
          </div>
        </div>

        <div className="g-2" style={{ borderTop: "1px solid rgba(23,21,15,0.14)", marginTop: 28, paddingTop: 28, gap: 32 }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--terra)", textTransform: "uppercase", marginBottom: 12 }}>India Office</div>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>
              3rd Floor, Incuspaze, Building 1969<br />
              Alembic City<br />
              Vadodara, Gujarat – 390009<br />
              India
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: "var(--terra)", textTransform: "uppercase", marginBottom: 12 }}>United Kingdom Office</div>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>
              1 Fore Street, Moorgate<br />
              London – E14 3DQ<br />
              United Kingdom
            </p>
          </div>
        </div>
      </div>

      <ContactForm />
    </section>
  );
}
