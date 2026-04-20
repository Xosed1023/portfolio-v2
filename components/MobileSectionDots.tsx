"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import T from "@/lib/translations";

const SECTIONS = [
  { id: "hero",     navKey: "home"     as const },
  { id: "about",    navKey: "about"    as const },
  { id: "work",     navKey: "work"     as const },
  { id: "skills",   navKey: "skills"   as const },
  { id: "web",      navKey: "web"      as const },
  { id: "projects", navKey: "projects" as const },
  { id: "contact",  navKey: "contact"  as const },
];

export default function MobileSectionDots() {
  const [active, setActive] = useState("hero");
  const { lang }            = useLanguage();

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: container, threshold: 0.5 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const container = document.getElementById("scroll-container");
    const target = document.getElementById(id);
    if (container && target) {
      container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <nav
      className="lg:hidden fixed right-0 top-1/2 z-30 flex flex-col"
      style={{ transform: "translateY(-50%)" }}
      aria-label="Navegación por secciones"
    >
      {SECTIONS.map(({ id, navKey }) => {
        const isActive = active === id;
        const label    = T.nav[navKey][lang];
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Ir a ${label}`}
            aria-current={isActive ? "true" : undefined}
            style={{
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: "12px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                display: "block",
                width: isActive ? "18px" : "5px",
                height: "5px",
                borderRadius: "3px",
                background: isActive ? "#c9a96e" : "rgba(255,255,255,0.2)",
                transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
