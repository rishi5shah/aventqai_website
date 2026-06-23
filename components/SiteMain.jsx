"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Wraps page content in <main>. Re-keys on route change so the page-fade
 * settle animation replays, and sets up the IntersectionObserver reveal
 * fallback for browsers without scroll-driven animation-timeline support.
 */
export default function SiteMain({ children }) {
  const pathname = usePathname();
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const supportsVT =
      typeof CSS !== "undefined" && CSS.supports && CSS.supports("animation-timeline: view()");
    if (supportsVT) return;

    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let io;
    const raf = requestAnimationFrame(() => {
      const sections = ref.current ? ref.current.querySelectorAll("section") : [];
      if (reduce) {
        sections.forEach((s) => {
          s.style.opacity = "1";
          s.style.transform = "none";
        });
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.style.opacity = "1";
              en.target.style.transform = "none";
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.08 }
      );
      sections.forEach((s) => {
        s.style.opacity = "0";
        s.style.transform = "translateY(26px)";
        s.style.transition = "opacity .7s ease, transform .7s ease";
        io.observe(s);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
    };
  }, [pathname]);

  return (
    <main key={pathname} ref={ref}>
      {children}
    </main>
  );
}
