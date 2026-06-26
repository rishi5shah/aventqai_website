// Step progress indicator for the assessment. Visual only.

export default function ProgressBar({ current, total, label }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: 36 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontFamily: "var(--font-mono)",
          fontSize: 11.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--faint)",
          marginBottom: 12,
        }}
      >
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div style={{ height: 4, borderRadius: 100, background: "rgba(23,21,15,0.12)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "var(--terra)",
            borderRadius: 100,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
