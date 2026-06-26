// Classic honeypot bot trap: invisible to real users (off-screen, no tab
// stop, autocomplete disabled), but a script that blindly fills every input
// will fill this one too. Server-side (/api/lead) rejects any submission
// where it's non-empty.
export default function HoneypotField({ value, onChange }) {
  return (
    <input
      type="text"
      name="company_url"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{ position: "absolute", left: -9999, top: "auto", width: 1, height: 1, opacity: 0, overflow: "hidden" }}
    />
  );
}
