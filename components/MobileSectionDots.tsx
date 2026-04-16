"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  "hero", "about", "work", "skills", "web", "projects", "contact",
];

export default function MobileSectionDots() {
  const [active, setActive] = useState("hero");

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

    SECTIONS.forEach((id) => {
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
    <div
      className="lg:hidden fixed right-3 top-1/2 z-30 flex flex-col gap-[9px]"
      style={{ transform: "translateY(-50%)" }}
      aria-label="Section navigation"
    >
      {SECTIONS.map((id) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          aria-label={`Ir a ${id}`}
          style={{
            width: active === id ? "18px" : "5px",
            height: "5px",
            borderRadius: "3px",
            background: active === id ? "#c9a96e" : "rgba(255,255,255,0.2)",
            transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
            border: "none",
            padding: 0,
            cursor: "pointer",
            outline: "none",
          }}
        />
      ))}
    </div>
  );
}
