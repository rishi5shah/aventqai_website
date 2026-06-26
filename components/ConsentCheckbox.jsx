import Link from "next/link";

// Shared across every lead-capture form. Optional, unchecked by default —
// submission is never blocked on it, but the boolean is forwarded with the
// lead so the GHL workflow can skip the follow-up email when it's false.
export default function ConsentCheckbox({ checked, onChange, id = "consent" }) {
  return (
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
  );
}
