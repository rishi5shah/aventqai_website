"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { fieldStyle, labelStyle, errorStyle, isValidEmail } from "@/lib/forms";
import { submitLead } from "@/lib/leadSubmit";
import { recordCapture } from "@/lib/leadProfile";
import { track, EVENTS } from "@/lib/analytics";
import { EXIT_INTENT_ENABLED, EXIT_INTENT_SKIP_PATHS } from "@/lib/exitIntent";
import ConsentCheckbox from "@/components/ConsentCheckbox";
import HoneypotField from "@/components/HoneypotField";

const SHOWN_KEY = "aq_exit_intent_shown"; // per-session cap
const DISMISSED_KEY = "aq_exit_intent_dismissed"; // permanent "don't show again"
const ARM_DELAY_MS = 4000; // ignore exit gestures during the first few seconds on a page
const MOBILE_FALLBACK_MS = 30000; // touch devices have no mouseleave signal — fall back to a timer

export default function ExitIntentModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const armedRef = useRef(false);

  const skip = !EXIT_INTENT_ENABLED || EXIT_INTENT_SKIP_PATHS.includes(pathname);

  const dismissForever = () => {
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {}
  };

  const close = () => {
    setOpen(false);
    dismissForever();
  };

  useEffect(() => {
    if (skip) return;
    try {
      if (sessionStorage.getItem(SHOWN_KEY) === "1") return;
      if (localStorage.getItem(DISMISSED_KEY) === "1") return;
    } catch {}

    const show = () => {
      armedRef.current = false;
      setOpen(true);
      try {
        sessionStorage.setItem(SHOWN_KEY, "1");
      } catch {}
      track(EVENTS.EXIT_INTENT_SHOWN, { path: pathname });
    };

    const isCoarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches;

    armedRef.current = false;
    const armTimer = setTimeout(() => {
      armedRef.current = true;
    }, ARM_DELAY_MS);

    // Touch devices never fire a real mouseleave-to-top gesture — fall back
    // to a timed prompt instead.
    let fallbackTimer;
    if (isCoarsePointer) {
      fallbackTimer = setTimeout(show, MOBILE_FALLBACK_MS);
    }

    const onMouseOut = (e) => {
      if (!armedRef.current) return;
      // Only fire when the cursor actually leaves the top of the viewport.
      if (e.relatedTarget || e.clientY > 0) return;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      show();
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => {
      clearTimeout(armTimer);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [skip, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError("");
    setSent(true);
    track(EVENTS.EXIT_INTENT_CONVERTED, { path: pathname });
    const { isRetake, firstCapturedAt } = recordCapture({ email: email.trim() });
    dismissForever(); // already converted — never show this again on this device
    submitLead({
      source: "exit-intent",
      email: email.trim(),
      capturedAt: new Date().toISOString(),
      consent,
      hp,
      isRetake,
      firstCapturedAt,
    });
  };

  return (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        background: "rgba(20,19,15,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--card)",
          border: "1px solid rgba(23,21,15,0.12)",
          borderRadius: 14,
          padding: 40,
          maxWidth: 440,
          width: "100%",
          position: "relative",
          boxShadow: "0 30px 70px -30px rgba(20,19,15,0.45)",
        }}
      >
        <button
          onClick={close}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: 20,
            color: "var(--faint)",
            padding: 6,
          }}
        >
          ×
        </button>

        {sent ? (
          <div style={{ textAlign: "center", padding: "14px 0 6px" }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "var(--green)",
                color: "var(--cream)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                margin: "0 auto 18px",
              }}
            >
              ✓
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 24, margin: "0 0 8px", color: "var(--ink)" }}>
              Sent — check your inbox.
            </h2>
            <p style={{ fontSize: 15, color: "var(--muted)", margin: 0 }}>
              We&apos;ve sent the readiness assessment your way.
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11.5,
                letterSpacing: "0.16em",
                color: "var(--terra)",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Before you go
            </div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: 27, lineHeight: 1.2, margin: "0 0 12px", color: "var(--ink)" }}>
              Get the AI Readiness Assessment in your inbox.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--muted)", margin: "0 0 24px" }}>
              Drop your email and we&apos;ll send the 2-minute scorecard your way — take it whenever you&apos;re ready.
            </p>
            <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
              <div>
                <label htmlFor="ei-email" style={labelStyle}>WORK EMAIL</label>
                <input
                  id="ei-email"
                  type="email"
                  className="aq-field"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="jane@company.com"
                  style={fieldStyle}
                />
                {error && <div style={errorStyle}>{error}</div>}
              </div>
              <HoneypotField value={hp} onChange={setHp} />
              <ConsentCheckbox checked={consent} onChange={setConsent} id="ei-consent" />
              <button
                type="submit"
                className="btn-navy"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--cream)",
                  background: "var(--navy)",
                  border: "none",
                  cursor: "pointer",
                  padding: 14,
                  borderRadius: 8,
                }}
              >
                Send it to me →
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
