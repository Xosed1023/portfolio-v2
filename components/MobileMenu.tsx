"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const NAV = [
  { id: "hero",     label: "HOME",     num: "01" },
  { id: "about",    label: "ABOUT",    num: "02" },
  { id: "work",     label: "WORK",     num: "03" },
  { id: "skills",   label: "SKILLS",   num: "04" },
  { id: "web",      label: "WEB",      num: "05" },
  { id: "projects", label: "PROJECTS", num: "06" },
  { id: "contact",  label: "CONTACT",  num: "07" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* Header bar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-poppins font-extrabold text-accent"
              style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
          XP
        </span>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="w-8 h-8 flex flex-col items-end justify-center gap-[5px]"
        >
          <motion.span
            className="block h-px bg-white origin-right"
            animate={open ? { rotate: -45, y: 6, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block h-px bg-accent"
            animate={open ? { opacity: 0, width: "0%" } : { opacity: 1, width: "65%" }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block h-px bg-white origin-right"
            animate={open ? { rotate: 45, y: -6, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </motion.header>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: "rgba(10,10,10,0.97)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute inset-0 grid-bg opacity-30" />

            {NAV.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative font-poppins font-extrabold text-white/70 hover:text-white
                           transition-colors duration-200 group flex items-center gap-4"
                style={{ fontSize: "clamp(2rem, 8vw, 3rem)", letterSpacing: "-0.01em" }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.07, ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
              >
                <span className="font-poppins font-light text-accent/60 group-hover:text-accent transition-colors duration-200"
                      style={{ fontSize: "0.9rem", letterSpacing: "0.15em", minWidth: "28px" }}>
                  {item.num}
                </span>
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-accent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  style={{ originX: 0, width: "100%" }}
                  transition={{ duration: 0.25 }}
                />
              </motion.button>
            ))}

            <motion.a
              href="/CV Xosed Penaloza V2.pdf"
              download
              className="mt-6 font-poppins font-semibold text-accent border border-accent/30
                         px-8 py-3 hover:bg-accent/10 hover:border-accent/60 transition-all duration-300"
              style={{ fontSize: "0.7rem", letterSpacing: "0.4em" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              DESCARGAR CV
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
