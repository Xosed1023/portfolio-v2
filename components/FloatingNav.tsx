"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const SECTIONS = ["hero", "about", "work", "skills", "web", "projects", "contact"];

export default function FloatingNav() {
  const [current, setCurrent] = useState(0);

  // Track which section is in view
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = SECTIONS.indexOf(e.target.id);
            if (idx !== -1) setCurrent(idx);
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

  const go = useCallback(
    (dir: -1 | 1) => {
      const next = Math.max(0, Math.min(SECTIONS.length - 1, current + dir));
      document.getElementById(SECTIONS[next])?.scrollIntoView({ behavior: "smooth" });
      setCurrent(next);
    },
    [current]
  );

  const atTop    = current === 0;
  const atBottom = current === SECTIONS.length - 1;

  return (
    <motion.div
      className="fixed right-7 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2"
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Navegación de secciones"
    >
      {/* Up */}
      <motion.button
        onClick={() => go(-1)}
        disabled={atTop}
        aria-label="Sección anterior"
        className="w-10 h-10 flex items-center justify-center transition-all duration-300 btn-glow font-condensed text-sm"
        style={{
          background: atTop ? "rgba(201,169,110,0.12)" : "#c9a96e",
          color: atTop ? "rgba(201,169,110,0.3)" : "#0a0a0a",
          cursor: atTop ? "not-allowed" : "pointer",
        }}
        whileHover={atTop ? {} : { scale: 1.08 }}
        whileTap={atTop ? {} : { scale: 0.95 }}
      >
        ↑
      </motion.button>

      {/* Section dots */}
      <div className="flex flex-col items-center gap-[6px] py-2">
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              document.getElementById(SECTIONS[i])?.scrollIntoView({ behavior: "smooth" });
              setCurrent(i);
            }}
            aria-label={`Ir a sección ${i + 1}`}
            className="flex items-center justify-center transition-all duration-300"
            style={{ width: "20px", height: "20px", background: "transparent" }}
          >
            <span
              className="rounded-full transition-all duration-300 flex-shrink-0"
              style={{
                width:  i === current ? "6px" : "3px",
                height: i === current ? "6px" : "3px",
                background: i === current ? "#c9a96e" : "rgba(255,255,255,0.2)",
              }}
            />
          </button>
        ))}
      </div>

      {/* Down */}
      <motion.button
        onClick={() => go(1)}
        disabled={atBottom}
        aria-label="Sección siguiente"
        className="w-10 h-10 flex items-center justify-center border transition-all duration-300 font-condensed text-sm"
        style={{
          borderColor: atBottom ? "rgba(201,169,110,0.1)" : "rgba(201,169,110,0.35)",
          color: atBottom ? "rgba(201,169,110,0.2)" : "#c9a96e",
          cursor: atBottom ? "not-allowed" : "pointer",
        }}
        whileHover={atBottom ? {} : { scale: 1.08, backgroundColor: "rgba(201,169,110,0.08)" }}
        whileTap={atBottom ? {} : { scale: 0.95 }}
      >
        ↓
      </motion.button>
    </motion.div>
  );
}
