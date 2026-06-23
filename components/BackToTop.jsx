"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const show = (window.scrollY || 0) > 600;
      setShowTop((cur) => (cur !== show ? show : cur));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!showTop) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="btn-navy"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 60,
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "var(--navy)",
        color: "var(--cream)",
        border: "none",
        cursor: "pointer",
        fontSize: 18,
        boxShadow: "0 10px 30px -8px rgba(20,19,15,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      ↑
    </button>
  );
}
