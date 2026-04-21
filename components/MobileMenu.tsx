"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import T from "@/lib/translations";
import LangToggle from "@/components/LangToggle";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { id: "hero",     navKey: "home"     as const, num: "01" },
  { id: "about",    navKey: "about"    as const, num: "02" },
  { id: "work",     navKey: "work"     as const, num: "03" },
  { id: "skills",   navKey: "skills"   as const, num: "04" },
  { id: "web",      navKey: "web"      as const, num: "05" },
  { id: "projects", navKey: "projects" as const, num: "06" },
  { id: "contact",  navKey: "contact"  as const, num: "07" },
];

export default function MobileMenu() {
  const [open, setOpen]       = useState(false);
  const hamburgerRef          = useRef<HTMLButtonElement>(null);
  const firstNavRef           = useRef<HTMLButtonElement>(null);
  const { lang }              = useLanguage();

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Focus first nav item when menu opens, restore on close
  useEffect(() => {
    if (open) {
      setTimeout(() => firstNavRef.current?.focus(), 50);
    } else {
      hamburgerRef.current?.focus();
    }
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <>
      {/* Header bar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "var(--header-bg)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(var(--rgb),0.06)",
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-poppins font-extrabold text-accent"
              style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
          XP
        </span>

        <div className="flex items-center gap-1">
          <ThemeToggle variant="icon" />
          <LangToggle />
        </div>

        {/* Hamburger */}
        <button
          ref={hamburgerRef}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-nav-overlay"
          className="w-9 h-9 flex flex-col items-end justify-center gap-[4px]"
          style={{ width: "28px" }}
        >
          <motion.span
            className="block h-px origin-right"
            style={{ width: "22px", background: "rgb(var(--rgb))" }}
            animate={open ? { rotate: -45, y: 5, width: "22px" } : { rotate: 0, y: 0, width: "22px" }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block h-px bg-accent"
            animate={open ? { opacity: 0, width: "0px" } : { opacity: 1, width: "14px" }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block h-px origin-right"
            style={{ width: "22px", background: "rgb(var(--rgb))" }}
            animate={open ? { rotate: 45, y: -5, width: "22px" } : { rotate: 0, y: 0, width: "22px" }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.header>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="fixed inset-0 z-40 flex flex-col items-center overflow-y-auto"
            style={{ background: "var(--overlay-bg)", paddingTop: "72px", paddingBottom: "32px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute inset-0 grid-bg opacity-30" />

            {/* Nav items — centered within available space */}
            <div className="relative flex flex-col items-center justify-center flex-1 gap-6 w-full">
              {NAV_ITEMS.map((item, i) => {
                const label = T.nav[item.navKey][lang];
                return (
                  <motion.button
                    key={item.id}
                    ref={i === 0 ? firstNavRef : undefined}
                    onClick={() => scrollTo(item.id)}
                    className="mobile-nav-btn relative font-poppins font-extrabold transition-colors duration-200 group flex items-center gap-4"
                    style={{ color: "rgba(var(--rgb),0.70)" }}
                    style={{ fontSize: "clamp(1.7rem, 7vw, 2.8rem)", letterSpacing: "-0.01em" }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
                  >
                    <span className="font-poppins font-light text-accent/60 group-hover:text-accent transition-colors duration-200"
                          style={{ fontSize: "0.9rem", letterSpacing: "0.15em", minWidth: "28px" }}>
                      {item.num}
                    </span>
                    {label}
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-accent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      style={{ originX: 0, width: "100%" }}
                      transition={{ duration: 0.25 }}
                    />
                  </motion.button>
                );
              })}
            </div>

            <motion.a
              href="/CV Xosed Penaloza V2.pdf"
              download
              className="relative font-poppins font-semibold text-accent border border-accent/30
                         px-8 py-3 hover:bg-accent/10 hover:border-accent/60 transition-all duration-300 flex-shrink-0"
              style={{ fontSize: "0.7rem", letterSpacing: "0.4em" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              {T.nav.downloadCv[lang]}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
