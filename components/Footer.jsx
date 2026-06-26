import Link from "next/link";

const labelStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  letterSpacing: "0.12em",
  color: "rgba(244,241,233,0.45)",
  textTransform: "uppercase",
  marginBottom: 18,
};

const linkStyle = {
  textAlign: "left",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  fontFamily: "var(--font-sans)",
  fontSize: 14.5,
  color: "rgba(244,241,233,0.78)",
  textDecoration: "none",
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--near-black)", color: "var(--cream)" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 40 }}>
        <div
          className="g-footer"
          style={{ gap: 40, paddingBottom: 56, borderBottom: "1px solid rgba(244,241,233,0.16)" }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: 26, color: "var(--cream)" }}>
                AventeQ AI
              </span>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--terra)",
                  transform: "translateY(-3px)",
                }}
              />
            </div>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "rgba(244,241,233,0.55)",
                maxWidth: "34ch",
                margin: "18px 0 0",
              }}
            >
              AI consulting, implementation, and training for operationally complex businesses.
            </p>
          </div>

          <div>
            <div style={labelStyle}>Explore</div>
            <div style={{ display: "grid", gap: 12 }}>
              <Link href="/solutions" className="footer-link" style={linkStyle}>
                Solutions
              </Link>
              <Link href="/industries" className="footer-link" style={linkStyle}>
                Industries
              </Link>
              <Link href="/training" className="footer-link" style={linkStyle}>
                AI Training
              </Link>
            </div>
          </div>

          <div>
            <div style={labelStyle}>Company</div>
            <div style={{ display: "grid", gap: 12 }}>
              <Link href="/cases" className="footer-link" style={linkStyle}>
                Case Studies
              </Link>
              <Link href="/about" className="footer-link" style={linkStyle}>
                About
              </Link>
              <Link href="/contact" className="footer-link" style={linkStyle}>
                Contact
              </Link>
            </div>
          </div>

          <div>
            <div style={labelStyle}>Connect</div>
            <div style={{ display: "grid", gap: 12 }}>
              <a
                href="mailto:partnerships@aventeqai.com"
                className="footer-link"
                style={{ fontSize: 14.5, color: "rgba(244,241,233,0.78)", textDecoration: "none" }}
              >
                <span>partnerships</span>
                <span>@aventeqai.com</span>
              </a>
            </div>
          </div>
        </div>

        <div
          className="g-2"
          style={{ gap: 40, padding: "44px 0", borderBottom: "1px solid rgba(244,241,233,0.16)" }}
        >
          <div>
            <div style={{ ...labelStyle, marginBottom: 14 }}>India Office</div>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "rgba(244,241,233,0.78)", margin: 0 }}>
              3rd Floor, Incuspaze, Building 1969<br />
              Alembic City<br />
              Vadodara, Gujarat – 390009<br />
              India
            </p>
          </div>
          <div>
            <div style={{ ...labelStyle, marginBottom: 14 }}>United Kingdom Office</div>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "rgba(244,241,233,0.78)", margin: 0 }}>
              1 Fore Street, Moorgate<br />
              London – E14 3DQ<br />
              United Kingdom
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(244,241,233,0.4)" }}>
            © 2026 AventeQ AI · All rights reserved
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(244,241,233,0.4)" }}>
            <Link href="/privacy" className="footer-link" style={{ color: "inherit", textDecoration: "none" }}>Privacy</Link> · Terms · Security
          </span>
        </div>
      </div>
    </footer>
  );
}
