// The dark "operational readout" panel — first used in the homepage hero,
// extracted here so industry pages can show their own live-feeling agent
// status using the same visual language instead of generic imagery.
// className is opt-in (not hardcoded) because the homepage hides this panel
// on narrow screens via the "hero-readout" class (it's decorative there);
// on industry pages it's the central visual, so it should stay visible and
// just stack below the text instead.
export default function OperationalPanel({ label, rows, footerText, className = "" }) {
  return (
    <div
      className={className}
      style={{
        background: "var(--near-black)",
        borderRadius: 14,
        padding: "26px 26px 28px",
        boxShadow: "0 24px 60px -28px rgba(20,19,15,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 16,
          borderBottom: "1px solid rgba(244,241,233,0.14)",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(244,241,233,0.55)" }}>{label}</span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "var(--green-light)",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--green-light)",
              animation: "aq-blink 1.8s ease-in-out infinite",
            }}
          />
          live
        </span>
      </div>
      <div style={{ display: "grid", gap: 16, padding: "22px 0 4px" }}>
        {rows.map(([name, status, color]) => (
          <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "rgba(244,241,233,0.85)" }}>{name}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color }}>{status}</span>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: "1px solid rgba(244,241,233,0.14)",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          color: "var(--terra-light)",
        }}
      >
        &gt; {footerText}
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 15,
            background: "var(--terra-light)",
            marginLeft: 4,
            transform: "translateY(2px)",
            animation: "aq-blink 1.1s step-end infinite",
          }}
        />
      </div>
    </div>
  );
}
