"use client";

import { useEffect } from "react";

const SECTIONS = ["hero", "about", "work", "skills", "web", "projects", "contact"];

export default function ScrollController() {
  // ── Update URL hash as user scrolls ──────────────────────────────────
  // Uses replaceState (no new history entry) so the URL always reflects
  // the visible section. On return from /servicios the hash is preserved.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.id;
            // hero → clear hash; other sections → set #id
            const newHash = id === "hero" ? " " : `#${id}`;
            history.replaceState(null, "", newHash);
            sessionStorage.setItem("last-section", id);
          }
        });
      },
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // ── Restore scroll position on mount ─────────────────────────────────
  // Handles two cases:
  //   1. Direct link with hash:  xosed.dev/#contact
  //   2. Return from /servicios: hash was set before navigating away
  useEffect(() => {
    const hash = window.location.hash.slice(1); // e.g. "contact"
    if (!hash || !SECTIONS.includes(hash)) return;

    const introSeen = sessionStorage.getItem("intro-seen");
    // Page transition overlay takes ~570 ms; add buffer.
    // If intro loader is active (first visit), wait for it too.
    const delay = introSeen ? 700 : 1500;

    const timer = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
