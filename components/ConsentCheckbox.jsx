import Link from "next/link";
import { errorStyle } from "@/lib/forms";

// Shared across every lead-capture form. Required — submission is blocked
// until it's checked. Still forwarded as a discrete boolean with the lead
// (now always true) so the GHL record keeps an explicit consent timestamp.
export default function ConsentCheckbox({ checked, onChange, id = "consent", error }) {
  return (
    <div>
      <label htmlFor={id} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5, lineHeight: 1.5, color: "var(--muted)", cursor: "pointer" }}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{ marginTop: 3, width: 16, height: 16, accentColor: "var(--navy)", flex: "none" }}
        />
        <span>
          I agree to be contacted about this and to AventeQ&apos;s processing of my data per the{" "}
          <Link href="/privacy" className="link-email" style={{ color: "var(--navy)" }}>
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {error && <div style={errorStyle}>{error}</div>}
    </div>
  );
}
