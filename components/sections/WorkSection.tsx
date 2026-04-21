"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import T from "@/lib/translations";
import TechBadge from "@/components/TechBadge";

const JOBS_STATIC = [
  {
    company: "Globant",
    period: "Dic 2024 - Presente",
    current: true,
    tech: ["Node.js", "AWS SQS", "AWS SNS", "REST APIs", "AI"],
  },
  {
    company: "Grupo Cinte",
    period: "Feb 2024 – Dic 2024",
    current: false,
    tech: ["React Native", "Node.js", "MongoDB", "AWS", "Firebase", "Google Play", "App Store", "AdMob", "AdManager"],
  },
  {
    company: "Patagonian",
    period: "Sep 2022 – Dic 2023",
    current: false,
    tech: ["Angular 12", "Laravel", "AWS", "Sass", "Bootstrap", "Frontend Performance"],
  },
  {
    company: "Hoteles Decameron",
    period: "Sep 2021 – Sep 2022",
    current: false,
    tech: ["Java", "Apache Camel", "Spring Boot", "JBoss Fuse", "XSLT"],
  },
  {
    company: "Assist Consultores",
    period: "Sep 2017 – Sep 2021",
    current: false,
    tech: ["Angular", "Node.js", "Vue.js", "Java", "OpenShift", "Azure"],
  },
  {
    company: "Grupo CMC Colombia",
    period: "Sep 2016 – Sep 2017",
    current: false,
    tech: ["Java", "JSP", "SQL Server"],
  },
];

export default function WorkSection() {
  const { lang } = useLanguage();
  const JOBS = JOBS_STATIC.map((j, i) => ({
    ...j,
    role:       T.work.jobs[i].role[lang],
    type:       T.work.jobs[i].type[lang],
    highlights: T.work.jobs[i].highlights.map(h => h[lang]),
  }));
  const [selected, setSelected] = useState(0);
  const job = JOBS[selected] ?? JOBS[0];

  return (
    <section
      id="work"
      className="relative min-h-screen snap-start lg:h-screen lg:overflow-hidden lg:flex lg:items-center"
      style={{ background: "var(--section-bg)" }}
      aria-label="Experiencia laboral"
    >
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div className="absolute pointer-events-none"
           style={{ bottom: "5%", left: "15%", width: "50vw", height: "50vh",
                    background: "radial-gradient(ellipse, rgba(201,169,110,0.04) 0%, transparent 65%)" }} />

      <div className="relative w-full max-w-[1680px] mx-auto flex flex-col lg:flex-row"
           style={{ paddingLeft: "clamp(1.5rem, 7vw, 112px)", paddingRight: "clamp(1.5rem, 7vw, 112px)", paddingBottom: "24px" }}>

        {/* ── MOBILE: Header + Accordion ── */}
        <div className="lg:hidden flex flex-col pb-12" style={{ paddingTop: "clamp(28px, 6vh, 48px)" }}>
          <div className="flex-shrink-0 mb-3">
            <motion.p className="font-poppins font-semibold text-accent mb-1"
              style={{ fontSize: "0.68rem", letterSpacing: "0.5em" }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {T.work.sectionLabel[lang]}
            </motion.p>
            <motion.h2 className="font-poppins font-extrabold text-white leading-none"
              style={{ fontSize: "clamp(1.7rem, 8.5vw, 2.3rem)", letterSpacing: "-0.02em" }}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              {T.work.heading[lang]}
            </motion.h2>
          </div>

          <div className="flex flex-col gap-[6px] mt-3">
            {JOBS.map((j, i) => {
              const open = selected === i;
              return (
                <motion.div key={j.company}
                  className="border-l-2 overflow-hidden transition-colors duration-300"
                  style={{ borderColor: open ? "#c9a96e" : "rgba(var(--rgb),0.08)",
                           background: open ? "rgba(201,169,110,0.05)" : "transparent" }}
                  initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}>

                  {/* Header row */}
                  <button onClick={() => setSelected(open ? -1 : i)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-[2px]">
                        {j.current && (
                          <span className="relative flex h-[6px] w-[6px] flex-shrink-0">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-55" />
                            <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-accent" />
                          </span>
                        )}
                        <span className="font-poppins font-semibold truncate"
                              style={{ fontSize: "0.93rem", color: open ? "#c9a96e" : "rgba(var(--rgb),0.82)" }}>
                          {j.company}
                        </span>
                      </div>
                      <span className="font-nunito font-light"
                            style={{ fontSize: "0.77rem", color: "rgba(var(--rgb),0.4)" }}>
                        {j.period}
                      </span>
                    </div>
                    {/* Chevron */}
                    <motion.svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                      animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <path d="M2 4L6 8L10 4" stroke="rgba(201,169,110,0.6)" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </button>

                  {/* Expandable content */}
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-4 pb-4">
                          <span className="font-poppins font-medium text-accent/70 block mb-[6px]"
                                style={{ fontSize: "0.65rem", letterSpacing: "0.4em" }}>{j.type}</span>
                          <h3 className="font-poppins font-extrabold text-white mb-3"
                              style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}>{j.role}</h3>
                          <div className="h-px bg-white/10 mb-3" />
                          <ul className="flex flex-col gap-[9px] mb-4">
                            {j.highlights.map((h) => (
                              <li key={h} className="flex items-start gap-[10px]">
                                <span className="w-[4px] h-[4px] rounded-full bg-accent/60 mt-[7px] flex-shrink-0" />
                                <span className="font-nunito font-light"
                                      style={{ fontSize: "0.9rem", color: "rgba(var(--rgb),0.68)", lineHeight: 1.6 }}>{h}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-[6px]">
                            {j.tech.map((t) => (
                              <TechBadge key={t} name={t} fontSize="0.68rem" padding="3px 8px" letterSpacing="0.12em" />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── DESKTOP: Tab + panel ── */}
        <div className="hidden lg:flex flex-col justify-center gap-1 lg:pr-6 xl:pr-10 2xl:pr-14 flex-shrink-0 lg:w-[240px] xl:w-[296px] 2xl:w-[340px]">
          <motion.p
            className="font-poppins font-semibold text-accent mb-3"
            style={{ fontSize: "0.72rem", letterSpacing: "0.5em" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            {T.work.sectionLabel[lang]}
          </motion.p>
          <motion.h2
            className="font-poppins font-extrabold text-white leading-[0.9] mb-5"
            style={{ fontSize: "clamp(1.7rem, 2.9vw, 3rem)", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {T.work.heading[lang]}
          </motion.h2>

          {JOBS.map((j, i) => (
            <motion.button
              key={j.company}
              onClick={() => setSelected(i)}
              className="text-left px-3 py-[10px] border-l-2 transition-all duration-300"
              style={{
                borderColor: selected === i ? "#c9a96e" : "rgba(var(--rgb),0.1)",
                background:  selected === i ? "rgba(201,169,110,0.07)" : "transparent",
              }}
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-[3px]">
                {j.current && (
                  <span className="relative flex h-[6px] w-[6px] flex-shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-55" />
                    <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-accent" />
                  </span>
                )}
                <span className="font-poppins font-semibold transition-colors duration-300"
                      style={{ fontSize: "0.9rem", color: selected === i ? "#c9a96e" : "rgba(var(--rgb),0.78)" }}>
                  {j.company}
                </span>
              </div>
              <span className="font-nunito font-light"
                    style={{ fontSize: "0.8rem", color: "rgba(var(--rgb),0.48)" }}>
                {j.period}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="hidden lg:flex flex-1 flex-col justify-center lg:pl-6 xl:pl-10 2xl:pl-14 lg:border-l border-white/[0.07]">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between mb-3 flex-wrap gap-3">
              <div>
                <span className="font-poppins font-medium text-accent/80 mb-1 block"
                      style={{ fontSize: "0.72rem", letterSpacing: "0.4em" }}>
                  {job.type}
                </span>
                <h3 className="font-poppins font-extrabold text-white leading-tight"
                    style={{ fontSize: "clamp(1.2rem, 2vw, 1.9rem)", letterSpacing: "-0.01em" }}>
                  {job.role}
                </h3>
                <p className="font-poppins font-semibold text-accent mt-1"
                   style={{ fontSize: "1rem" }}>
                  {job.company}
                </p>
              </div>
              <span className="font-poppins font-medium border border-white/15 px-3 py-[6px] flex-shrink-0"
                    style={{ fontSize: "0.75rem", letterSpacing: "0.18em", color: "rgba(var(--rgb),0.55)" }}>
                {job.period}
              </span>
            </div>

            <div className="h-px bg-white/10 my-4" />

            <ul className="flex flex-col gap-[11px] 2xl:gap-[14px] mb-6">
              {job.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="w-[5px] h-[5px] rounded-full bg-accent/65 mt-[7px] flex-shrink-0" />
                  <span className="font-nunito font-light"
                        style={{ fontSize: "0.97rem", color: "rgba(var(--rgb),0.72)", lineHeight: 1.65 }}>
                    {h}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {job.tech.map((t) => (
                <TechBadge key={t} name={t} fontSize="0.75rem" padding="5px 12px" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
