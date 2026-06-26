// A single assessment question with four selectable options. Selecting an
// option advances; Back returns without losing answers.

export default function QuestionStep({ question, selected, onSelect, onBack, showBack }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11.5,
          letterSpacing: "0.16em",
          color: "var(--terra)",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        {question.dimension}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 400,
          fontSize: 32,
          lineHeight: 1.18,
          letterSpacing: "-0.015em",
          margin: "0 0 32px",
          color: "var(--ink)",
          maxWidth: "24ch",
        }}
      >
        {question.question}
      </h2>

      <div style={{ display: "grid", gap: 12 }}>
        {question.options.map((opt) => {
          const active = selected === opt.score;
          return (
            <button
              key={opt.score}
              onClick={() => onSelect(opt.score)}
              aria-pressed={active}
              style={{
                textAlign: "left",
                cursor: "pointer",
                background: active ? "rgba(22,50,79,0.06)" : "var(--card)",
                border: `1px solid ${active ? "var(--navy)" : "rgba(23,21,15,0.14)"}`,
                borderRadius: 10,
                padding: "18px 20px",
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                color: "var(--ink)",
                display: "flex",
                alignItems: "center",
                gap: 14,
                transition: "border-color 0.15s ease, background-color 0.15s ease",
              }}
            >
              <span
                style={{
                  flex: "none",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  border: `2px solid ${active ? "var(--navy)" : "rgba(23,21,15,0.28)"}`,
                  background: active ? "var(--navy)" : "transparent",
                  boxShadow: active ? "inset 0 0 0 3px var(--card)" : "none",
                  transition: "all 0.15s ease",
                }}
              />
              {opt.label}
            </button>
          );
        })}
      </div>

      {showBack && (
        <button
          onClick={onBack}
          style={{
            marginTop: 28,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px 0",
            fontFamily: "var(--font-sans)",
            fontSize: 14.5,
            fontWeight: 600,
            color: "var(--muted-2)",
          }}
        >
          ← Back
        </button>
      )}
    </div>
  );
}
