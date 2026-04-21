"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import T from "@/lib/translations";
import LangToggle from "@/components/LangToggle";
import ThemeToggle from "@/components/ThemeToggle";

const NAV = [
  {
    id: "hero",
    navKey: "home" as const,
    num: "01",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "about",
    navKey: "about" as const,
    num: "02",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
      </svg>
    ),
  },
  {
    id: "work",
    navKey: "work" as const,
    num: "03",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    id: "skills",
    navKey: "skills" as const,
    num: "04",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "web",
    navKey: "web" as const,
    num: "05",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: "projects",
    navKey: "projects" as const,
    num: "06",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: "contact",
    navKey: "contact" as const,
    num: "07",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 13 19.79 19.79 0 0 1 1.93 4.36 2 2 0 0 1 3.9 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

const containerV = {
  hidden: { x: -90, opacity: 0 },
  show: {
    x: 0, opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.07, delayChildren: 0.35 },
  },
};
const itemV = {
  hidden: { opacity: 0, x: -12 },
  show:   { opacity: 1, x: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.5 } },
};

export default function Sidebar() {
  const [active, setActive]   = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);
  const { lang }              = useLanguage();

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.aside
      className="fixed left-0 top-0 h-full z-40 flex flex-col items-center justify-between py-8"
      style={{
        width: "var(--sidebar-w)",
        background: "var(--sidebar-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRight: "1px solid rgba(var(--rgb),0.07)",
      }}
      variants={containerV}
      initial="hidden"
      animate="show"
    >
      {/* Brand */}
      <motion.div variants={itemV} className="flex flex-col items-center gap-[3px]">
        <span className="font-poppins font-extrabold text-accent leading-none"
              style={{ fontSize: "1.2rem", letterSpacing: "-0.02em" }}>
          XP
        </span>
        <span className="font-poppins font-light"
              style={{ fontSize: "0.49rem", letterSpacing: "0.35em", color: "rgba(var(--rgb),0.20)" }}>
          DEV
        </span>
      </motion.div>

      {/* Nav items */}
      <nav className="flex flex-col items-center gap-1" aria-label="Navegación principal">
        {NAV.map((item) => {
          const label     = T.nav[item.navKey][lang];
          const isActive  = active  === item.id;
          const isHovered = hovered === item.id;
          const highlight = isActive || isHovered;

          return (
            <motion.div key={item.id} variants={itemV} className="relative">
              {/* Tooltip label on hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div
                      className="font-poppins font-semibold whitespace-nowrap rounded-sm px-3 py-[5px]"
                      style={{
                        fontSize: "0.72rem",
                        letterSpacing: "0.22em",
                        background: "rgba(20,18,14,0.95)",
                        border: "1px solid rgba(201,169,110,0.25)",
                        color: "#c9a96e",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {item.num} {label}
                    </div>
                    {/* Arrow */}
                    <div
                      className="absolute right-full top-1/2 -translate-y-1/2"
                      style={{
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderRight: "5px solid rgba(201,169,110,0.25)",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className="relative flex flex-col items-center gap-[5px] py-3 px-2 w-full
                           transition-all duration-300 rounded-sm group"
                style={{ outline: "none" }}
              >
                {/* Active bar */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarBar"
                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full bg-accent"
                    style={{ width: "3px", height: "28px" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <span
                  className="transition-colors duration-300"
                  style={{ color: highlight ? "#c9a96e" : "rgba(var(--rgb),0.50)" }}
                >
                  {item.icon}
                </span>

                {/* Number */}
                <span
                  aria-hidden="true"
                  className="font-poppins font-semibold transition-colors duration-300"
                  style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.15em",
                    color: highlight ? "#c9a96e" : "rgba(var(--rgb),0.42)",
                  }}
                >
                  {item.num}
                </span>
              </button>
            </motion.div>
          );
        })}
      </nav>

      {/* Theme + Lang toggle + Resume */}
      <motion.div variants={itemV} className="flex flex-col items-center gap-4">
        <ThemeToggle />
        <LangToggle className="flex-col gap-[3px]" />

        <a
          href="/CV Xosed Penaloza V2.pdf"
          download
          aria-label={T.nav.cv[lang]}
          className="flex flex-col items-center gap-[6px] py-3 px-2 transition-all duration-300 rounded-sm group"
          style={{ textDecoration: "none" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a96e"
               strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
               className="group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span
            className="font-poppins font-semibold text-accent/70 group-hover:text-accent
                       transition-colors duration-300 text-vertical"
            style={{ fontSize: "0.53rem", letterSpacing: "0.3em" }}
          >
            CV
          </span>
        </a>
      </motion.div>
    </motion.aside>
  );
}
