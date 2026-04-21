"use client";

import { motion } from "framer-motion";
import LogoMarquee from "@/components/LogoMarquee";
import { useLanguage } from "@/contexts/LanguageContext";
import T from "@/lib/translations";

const EDUCATION = [
  { degree: "Ingeniería de Software", institution: "Universidad Inpahu", year: "2019" },
  { degree: "Tecnología en ADSI", institution: "SENA", year: "2015" },
];

export default function AboutSection() {
  const { lang } = useLanguage();
  const STATS = T.about.stats;
  const COMPETENCIES = T.about.competencies;

  return (
    <section
      id="about"
      className="relative min-h-screen snap-start lg:h-screen lg:overflow-hidden lg:flex lg:items-center"
      style={{ background: "var(--section-bg)" }}
      aria-label="Sobre mí"
    >
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div className="absolute pointer-events-none"
        style={{
          top: "10%", right: "5%", width: "45vw", height: "55vh",
          background: "radial-gradient(ellipse, rgba(201,169,110,0.04) 0%, transparent 65%)"
        }} />

      {/* ── MOBILE layout ── */}
      <div className="lg:hidden relative flex flex-col pb-16"
        style={{ paddingTop: "clamp(28px, 6vh, 48px)", paddingLeft: "clamp(1.5rem, 6vw, 2rem)", paddingRight: "clamp(1.5rem, 6vw, 2rem)" }}>

        <div className="pt-2 pb-4">
          <motion.p className="font-poppins font-semibold text-accent mb-2"
            style={{ fontSize: "0.68rem", letterSpacing: "0.5em" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {T.about.sectionLabel[lang]}
          </motion.p>
          <motion.h2 className="font-poppins font-extrabold text-white leading-[0.9] mb-4"
            style={{ fontSize: "clamp(1.7rem, 8.5vw, 2.3rem)", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            {T.about.heading1[lang]} <span className="text-accent">{T.about.heading2[lang]}</span>
          </motion.h2>

          <motion.p className="font-nunito font-light leading-[1.8] mb-6"
            style={{ fontSize: "0.95rem", color: "rgba(var(--rgb),0.68)" }}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            {T.about.bioMobile[lang]}
          </motion.p>

          {/* Stats 2x2 */}
          <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            {STATS.map((s) => (
              <div key={s.value} className="p-3 text-center" style={{ border: "1px solid rgba(var(--rgb),0.10)" }}>
                <div className="font-poppins font-extrabold text-accent leading-none mb-1"
                  style={{ fontSize: "1.4rem" }}>{s.value}</div>
                <div className="font-nunito font-light whitespace-pre-line"
                  style={{ fontSize: "0.68rem", color: "rgba(var(--rgb),0.52)", lineHeight: 1.4 }}>
                  {s.label[lang]}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Competencies */}
          <motion.div className="mb-5"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}>
            <p className="font-poppins font-semibold text-accent mb-3"
              style={{ fontSize: "0.65rem", letterSpacing: "0.45em" }}>{T.about.competenciesLabel[lang]}</p>
            <div className="grid grid-cols-2 gap-[8px]">
              {COMPETENCIES.map((c) => (
                <div key={c[lang]} className="flex items-center gap-2">
                  <span className="w-[4px] h-[4px] rounded-full bg-accent/65 flex-shrink-0" />
                  <span className="font-nunito font-normal"
                    style={{ fontSize: "0.88rem", color: "rgba(var(--rgb),0.65)" }}>{c[lang]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div className="mb-5"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            <p className="font-poppins font-semibold text-accent mb-3"
              style={{ fontSize: "0.65rem", letterSpacing: "0.45em" }}>{T.about.educationLabel[lang]}</p>
            <div className="flex flex-col gap-3">
              {EDUCATION.map((e) => (
                <div key={e.degree} className="pl-3" style={{ borderLeft: "2px solid rgba(var(--rgb),0.15)" }}>
                  <p className="font-poppins font-semibold"
                    style={{ fontSize: "0.9rem", color: "rgba(var(--rgb),0.88)" }}>{e.degree}</p>
                  <p className="font-nunito font-light"
                    style={{ fontSize: "0.81rem", color: "rgba(var(--rgb),0.45)" }}>
                    {e.institution} · {e.year}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35 }}>
            <p className="font-poppins font-semibold text-accent mb-3"
              style={{ fontSize: "0.65rem", letterSpacing: "0.45em" }}>{T.about.languagesLabel[lang]}</p>
            <div className="flex flex-wrap gap-2">
              {T.about.languageTags.map((tag) => (
                <span key={tag[lang]} className="font-poppins font-medium px-3 py-[4px]"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "rgba(var(--rgb),0.55)", border: "1px solid rgba(var(--rgb),0.15)" }}>
                  {tag[lang]}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── DESKTOP layout (original) ── */}
      <div className="relative hidden lg:grid w-full max-w-[1680px] mx-auto grid-cols-2 gap-8 xl:gap-16 2xl:gap-24 pb-16"
        style={{ paddingLeft: "clamp(1.5rem, 7vw, 112px)", paddingRight: "clamp(1.5rem, 7vw, 112px)" }}>

        {/* ── LEFT ── */}
        <div className="flex flex-col justify-center">
          <motion.p
            className="font-poppins font-semibold text-accent mb-3"
            style={{ fontSize: "0.72rem", letterSpacing: "0.5em" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            {T.about.sectionLabel[lang]}
          </motion.p>

          <motion.h2
            className="font-poppins font-extrabold text-white leading-[0.9] mb-6"
            style={{ fontSize: "clamp(1.8rem, 3.1vw, 3.5rem)", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {T.about.heading1[lang]}<br/><span className="text-accent">{T.about.heading2[lang]}</span>
          </motion.h2>

          <motion.div className="mb-6 bg-accent/45" style={{ height: "1px", width: "44px" }}
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} />

          <motion.p
            className="font-nunito font-light leading-[1.85] lg:mb-5 xl:mb-8"
            style={{ fontSize: "0.99rem", color: "rgba(var(--rgb),0.72)", maxWidth: "480px" }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          >
            {T.about.bioDesktop[lang]}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
          >
            {STATS.map((s) => (
              <div key={s.value}
                className="p-4 2xl:p-5 hover:border-accent/45 transition-colors duration-300"
                style={{ border: "1px solid rgba(var(--rgb),0.10)" }}>
                <div className="font-poppins font-extrabold text-accent leading-none mb-2"
                  style={{ fontSize: "1.9rem" }}>
                  {s.value}
                </div>
                <div className="font-nunito font-light whitespace-pre-line"
                  style={{ fontSize: "0.8rem", color: "rgba(var(--rgb),0.58)", lineHeight: 1.45 }}>
                  {s.label[lang]}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex flex-col justify-center gap-8 2xl:gap-10">

          {/* Competencies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-poppins font-semibold text-accent mb-4"
              style={{ fontSize: "0.7rem", letterSpacing: "0.45em" }}>
              {T.about.competenciesLabel[lang]}
            </p>
            <div className="grid grid-cols-2 gap-[10px]">
              {COMPETENCIES.map((c) => (
                <div key={c[lang]} className="flex items-center gap-3 group cursor-default">
                  <span className="w-[5px] h-[5px] rounded-full bg-accent/65 flex-shrink-0
                                   group-hover:bg-accent transition-colors duration-300
                                   group-hover:shadow-[0_0_6px_rgba(201,169,110,0.7)]" />
                  <span className="font-nunito font-normal"
                    style={{ fontSize: "0.93rem", color: "rgba(var(--rgb),0.68)" }}>
                    {c[lang]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-poppins font-semibold text-accent mb-4"
              style={{ fontSize: "0.7rem", letterSpacing: "0.45em" }}>
              {T.about.educationLabel[lang]}
            </p>
            <div className="flex flex-col gap-4">
              {EDUCATION.map((e) => (
                <div key={e.degree}
                  className="pl-4 transition-colors duration-300 hover:[border-color:rgba(201,169,110,0.5)]"
                  style={{ borderLeft: "2px solid rgba(var(--rgb),0.15)" }}>
                  <p className="font-poppins font-semibold mb-[3px]"
                    style={{ fontSize: "0.93rem", color: "rgba(var(--rgb),0.88)" }}>
                    {e.degree}
                  </p>
                  <p className="font-nunito font-light"
                    style={{ fontSize: "0.86rem", color: "rgba(var(--rgb),0.5)" }}>
                    {e.institution} · {e.year}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Languages + mode */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-poppins font-semibold text-accent mb-3"
              style={{ fontSize: "0.7rem", letterSpacing: "0.45em" }}>
              {T.about.languagesLabel[lang]}
            </p>
            <div className="flex flex-wrap gap-2">
              {T.about.languageTags.map((tag) => (
                <span key={tag[lang]}
                  className="font-poppins font-medium px-3 py-[5px]
                                 hover:border-accent/50 hover:text-accent transition-colors duration-300"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.18em", color: "rgba(var(--rgb),0.58)", border: "1px solid rgba(var(--rgb),0.15)" }}>
                  {tag[lang]}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Logo marquee — fixed to section bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <LogoMarquee />
      </div>
    </section>
  );
}
