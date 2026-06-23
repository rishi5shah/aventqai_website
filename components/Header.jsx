"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "AI Training", href: "/training" },
  { label: "Case Studies", href: "/cases" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  // Escape closes menu; body scroll lock while open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  const isActive = (href) => pathname === href;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(244,241,233,0.82)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(23,21,15,0.10)",
      }}
    >
      <div
        className="container"
        style={{ height: 74, display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 9,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
            }}
          >
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
        </Link>

        <nav className="aq-nav-desktop">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 500,
                color: isActive(item.href) ? "var(--ink)" : "var(--muted-2)",
                textDecoration: "none",
                borderBottom: `2px solid ${isActive(item.href) ? "var(--terra)" : "transparent"}`,
                padding: "9px 13px 7px",
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn-navy"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--cream)",
              background: "var(--navy)",
              textDecoration: "none",
              padding: "10px 18px",
              borderRadius: 7,
              marginLeft: 12,
              whiteSpace: "nowrap",
            }}
          >
            Book a session
          </Link>
        </nav>

        <button
          className="aq-burger"
          onClick={() => setNavOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={navOpen}
          style={{
            flexDirection: "column",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
            width: 42,
            height: 42,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <span style={{ display: "block", width: 22, height: 2, background: "var(--ink)" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "var(--ink)" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "var(--ink)" }} />
        </button>
      </div>

      {navOpen && (
        <div
          style={{
            borderTop: "1px solid rgba(23,21,15,0.1)",
            background: "var(--cream)",
            padding: "10px 24px 18px",
            display: "grid",
            gap: 2,
          }}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                textAlign: "left",
                textDecoration: "none",
                padding: "13px 6px",
                fontFamily: "var(--font-sans)",
                fontSize: 16,
                color: "var(--ink)",
                borderBottom: "1px solid rgba(23,21,15,0.07)",
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{
              textAlign: "left",
              background: "var(--navy)",
              color: "var(--cream)",
              textDecoration: "none",
              padding: "14px 12px",
              borderRadius: 8,
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              fontWeight: 600,
              marginTop: 10,
            }}
          >
            Book a session
          </Link>
        </div>
      )}
    </header>
  );
}
