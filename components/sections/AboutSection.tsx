"use client";

import { motion } from "framer-motion";
import LogoMarquee from "@/components/LogoMarquee";

const STATS = [
  { value: "10+", label: "Años de\nexperiencia" },
  { value: "06",  label: "Empresas" },
  { value: "04",  label: "Sectores" },
  { value: "B1+", label: "Inglés" },
];

const EDUCATION = [
  { degree: "Ingeniería de Software", institution: "Universidad Inpahu", year: "2019" },
  { degree: "Tecnología en ADSI",     institution: "SENA",               year: "2015" },
];

const COMPETENCIES = [
  "Desarrollo móvil y web",
  "Integración de sistemas",
  "Arquitectura de microservicios",
  "Liderazgo técnico",
  "Soluciones empresariales",
  "Clean architecture",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen snap-start overflow-hidden flex items-center"
      style={{ background: "rgba(6,6,6,0.68)" }}
      aria-label="About"
    >
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div className="absolute pointer-events-none"
           style={{ top: "10%", right: "5%", width: "45vw", height: "55vh",
                    background: "radial-gradient(ellipse, rgba(201,169,110,0.04) 0%, transparent 65%)" }} />

      <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 py-16 lg:py-0 pb-20 lg:pb-16"
           style={{ paddingLeft: "clamp(1.5rem, 7vw, 112px)", paddingRight: "clamp(1.5rem, 7vw, 112px)" }}>

        {/* ── LEFT ── */}
        <div className="flex flex-col justify-center">
          <motion.p
            className="font-poppins font-semibold text-accent mb-3"
            style={{ fontSize: "0.65rem", letterSpacing: "0.5em" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            02 / SOBRE MÍ
          </motion.p>

          <motion.h2
            className="font-poppins font-extrabold text-white leading-[0.9] mb-6"
            style={{ fontSize: "clamp(3rem, 5vw, 5.5rem)", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            ABOUT
            <br /><span className="text-accent">ME</span>
          </motion.h2>

          <motion.div className="mb-6 bg-accent/45" style={{ height: "1px", width: "44px" }}
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} />

          <motion.p
            className="font-nunito font-light leading-[1.85] mb-8"
            style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.72)", maxWidth: "480px" }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          >
            Ingeniero de Software con enfoque en soluciones de alto impacto para
            sectores como banca, hotelería, retail y entretenimiento.
            Apasionado por la{" "}
            <span style={{ color: "#ffffff" }}>arquitectura limpia</span>,
            el{" "}
            <span style={{ color: "#ffffff" }}>liderazgo técnico</span>{" "}
            y la entrega de valor real a usuarios.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
          >
            {STATS.map((s) => (
              <div key={s.value}
                   className="border border-white/10 p-4 hover:border-accent/45 transition-colors duration-300">
                <div className="font-poppins font-extrabold text-accent leading-none mb-2"
                     style={{ fontSize: "1.9rem" }}>
                  {s.value}
                </div>
                <div className="font-nunito font-light whitespace-pre-line"
                     style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.45 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex flex-col justify-center gap-8">

          {/* Competencies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-poppins font-semibold text-accent mb-4"
               style={{ fontSize: "0.63rem", letterSpacing: "0.45em" }}>
              COMPETENCIAS CLAVE
            </p>
            <div className="grid grid-cols-2 gap-[10px]">
              {COMPETENCIES.map((c) => (
                <div key={c} className="flex items-center gap-3 group cursor-default">
                  <span className="w-[5px] h-[5px] rounded-full bg-accent/65 flex-shrink-0
                                   group-hover:bg-accent transition-colors duration-300
                                   group-hover:shadow-[0_0_6px_rgba(201,169,110,0.7)]" />
                  <span className="font-nunito font-normal"
                        style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.68)" }}>
                    {c}
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
               style={{ fontSize: "0.63rem", letterSpacing: "0.45em" }}>
              FORMACIÓN ACADÉMICA
            </p>
            <div className="flex flex-col gap-4">
              {EDUCATION.map((e) => (
                <div key={e.degree}
                     className="border-l-2 border-white/12 pl-4 hover:border-accent/50
                                transition-colors duration-300">
                  <p className="font-poppins font-semibold mb-[3px]"
                     style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.88)" }}>
                    {e.degree}
                  </p>
                  <p className="font-nunito font-light"
                     style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>
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
               style={{ fontSize: "0.63rem", letterSpacing: "0.45em" }}>
              IDIOMAS · MODALIDAD
            </p>
            <div className="flex flex-wrap gap-2">
              {["Español (Nativo)", "Inglés (B1+)", "Híbrido / Remoto"].map((tag) => (
                <span key={tag}
                      className="font-poppins font-medium border border-white/15 px-3 py-[5px]
                                 hover:border-accent/50 hover:text-accent transition-colors duration-300"
                      style={{ fontSize: "0.72rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.58)" }}>
                  {tag}
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
