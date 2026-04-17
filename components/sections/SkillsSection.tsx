"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const CATEGORIES = [
  {
    title: "Frontend",
    icon: "◈",
    skills: [
      { name: "React",        level: 95 },
      { name: "Angular 2+",   level: 92 },
      { name: "TypeScript",   level: 90 },
      { name: "Vue.js",       level: 82 },
      { name: "HTML5 / CSS3", level: 95 },
    ],
  },
  {
    title: "Backend",
    icon: "◉",
    skills: [
      { name: "Node.js",          level: 93 },
      { name: "Java / Spring",    level: 85 },
      { name: "Express.js",       level: 90 },
      { name: "Apache Camel",     level: 80 },
      { name: "REST / SOAP APIs", level: 95 },
    ],
  },
  {
    title: "Mobile",
    icon: "◎",
    skills: [
      { name: "React Native", level: 88 },
      { name: "Ionic",        level: 75 },
    ],
  },
  {
    title: "Databases",
    icon: "◌",
    skills: [
      { name: "MongoDB",              level: 88 },
      { name: "PostgreSQL / Oracle",  level: 85 },
      { name: "Firebase",             level: 84 },
      { name: "SQL Server",           level: 82 },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "◍",
    skills: [
      { name: "AWS",       level: 85 },
      { name: "Docker",    level: 82 },
      { name: "Azure",     level: 78 },
      { name: "OpenShift", level: 78 },
      { name: "GCP",       level: 70 },
    ],
  },
  {
    title: "Herramientas",
    icon: "◐",
    skills: [
      { name: "Git / GitHub",  level: 95 },
      { name: "Jira",          level: 90 },
      { name: "Firebase Auth", level: 85 },
      { name: "Apache Solr",   level: 75 },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-[5px]">
        <span className="font-nunito font-normal"
              style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.72)" }}>
          {name}
        </span>
        <span className="font-poppins font-semibold text-accent"
              style={{ fontSize: "0.62rem", letterSpacing: "0.05em" }}>
          {level}%
        </span>
      </div>
      <div className="relative overflow-hidden" style={{ height: "2px", background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent/70 to-accent"
          initial={{ width: "0%" }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0 }}
          transition={{ delay, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="skills"
      className="relative min-h-screen snap-start lg:h-screen lg:overflow-hidden lg:flex lg:items-center"
      style={{ background: "rgba(6,6,6,0.68)" }}
      aria-label="Skills"
    >
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div className="absolute pointer-events-none"
           style={{ top: "0", right: "0", width: "55vw", height: "65vh",
                    background: "radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 65%)" }} />

      <div className="relative w-full flex flex-col"
           style={{ paddingLeft: "clamp(1.5rem, 7vw, 112px)", paddingRight: "clamp(1.5rem, 7vw, 112px)", paddingTop: "clamp(28px, 8vh, 56px)", paddingBottom: "40px" }}>

        {/* Header */}
        <div className="mb-7">
          <motion.p
            className="font-poppins font-semibold text-accent mb-2"
            style={{ fontSize: "0.65rem", letterSpacing: "0.5em" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            04 / COMPETENCIAS TÉCNICAS
          </motion.p>
          <motion.h2
            className="font-poppins font-extrabold text-white leading-[0.9]"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            SKILLS <span className="text-accent">&amp;</span> STACK
          </motion.h2>
        </div>

        {/* ── MOBILE: Tabs ── */}
        <div className="lg:hidden flex flex-col gap-5">
          {/* Tab bar */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.title}
                onClick={() => setActiveTab(i)}
                className="flex-shrink-0 flex items-center gap-[6px] px-3 py-[7px] transition-all duration-300 font-poppins font-semibold"
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  border: "1px solid",
                  borderColor: activeTab === i ? "rgba(201,169,110,0.6)" : "rgba(255,255,255,0.1)",
                  background: activeTab === i ? "rgba(201,169,110,0.1)" : "transparent",
                  color: activeTab === i ? "#c9a96e" : "rgba(255,255,255,0.45)",
                }}
              >
                <span aria-hidden="true">{cat.icon}</span>
                {cat.title.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Active category */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="p-5"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(201,169,110,0.2)",
              }}
            >
              <div className="flex flex-col gap-4">
                {CATEGORIES[activeTab].skills.map((s, si) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} delay={si * 0.08} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── DESKTOP: Grid ── */}
        <div className="hidden lg:grid grid-cols-3 gap-5">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.title}
              className="p-5 flex flex-col relative overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                cursor: "default",
              }}
              whileHover={{
                borderColor: "rgba(201,169,110,0.35)",
                background: "rgba(255,255,255,0.055)",
                y: -4,
                boxShadow: "0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(201,169,110,0.12) inset",
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass-sheen absolute inset-0 pointer-events-none"
                   style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%, rgba(201,169,110,0.04) 100%)" }} />
              <div className="flex items-center gap-2 mb-4">
                <span className="text-accent" style={{ fontSize: "0.95rem" }} aria-hidden="true">{cat.icon}</span>
                <span className="font-poppins font-semibold"
                      style={{ fontSize: "0.72rem", letterSpacing: "0.28em", color: "rgba(255,255,255,0.82)" }}>
                  {cat.title.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col gap-[14px] flex-1">
                {cat.skills.map((s, si) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} delay={ci * 0.09 + si * 0.07 + 0.25} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
