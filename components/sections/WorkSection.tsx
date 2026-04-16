"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const JOBS = [
  {
    role: "NodeJs Senior",
    company: "Globant",
    period: "Dic 2024 - Presente",
    type: "Banca · Backend",
    current: true,
    highlights: [
      "Desarrollo y mantenimiento de APIs REST en el sector bancario",
      "Sistemas de notificaciones con AWS SQS y SNS",
      "Patrones de integración entre plataformas empresariales",
      "Clean architecture y pruebas unitarias",
    ],
    tech: ["Node.js", "AWS SQS", "AWS SNS", "REST APIs", "AI"],
  },
  {
    role: "Desarrollador Senior Full Stack",
    company: "Grupo Cinte",
    period: "Feb 2024 – Dic 2024",
    type: "Mobile · Full Stack",
    current: false,
    highlights: [
      "App móvil React Native con Node.js, MongoDB y AWS (App Store & Google Play)",
      "Monetización con Google AdManager y AdMob",
      "Firebase Push Notifications para engagement",
      "Refactorización y mejoras de calidad de código",
    ],
    tech: ["React Native", "Node.js", "MongoDB", "AWS", "Firebase", "Google Play", "App Store", "AdMob", "AdManager"],
  },
  {
    role: "Desarrollador Senior Full Stack",
    company: "Patagonian",
    period: "Sep 2022 – Dic 2023",
    type: "Enterprise · Angular",
    current: false,
    highlights: [
      "Aplicación empresarial Angular + Laravel desplegada en AWS",
      "Traducción de diseños Figma a código responsive",
      "Pruebas unitarias y mejoras de arquitectura",
      "Optimización de rendimiento y tiempos de carga",
    ],
    tech: ["Angular 12", "Laravel", "AWS", "Sass", "Bootstrap", "Frontend Performance"],
  },
  {
    role: "Coordinador e Ing. de Integración",
    company: "Hoteles Decameron",
    period: "Sep 2021 – Sep 2022",
    type: "Hotelería · Integración",
    current: false,
    highlights: [
      "Integraciones empresariales con RedHat JBoss Fuse + Apache Camel",
      "APIs REST y SOAP con OAuth 2.0, Basic Auth",
      "Patrones de integración empresarial (EIP)",
      "Coordinación de equipos y gestión de despliegues multi ambiente",
    ],
    tech: ["Java", "Apache Camel", "Spring Boot", "JBoss Fuse", "XSLT"],
  },
  {
    role: "Consultor Senior",
    company: "Assist Consultores",
    period: "Sep 2017 – Sep 2021",
    type: "Consultoría · Multi-sector",
    current: false,
    highlights: [
      "Backoffice completo de Betplay (Angular + Node.js)",
      "Integración ESB RedHat: Avianca, Claro, Banco Itaú, ICFES",
      "APIs REST en Azure Cloud y OpenShift para Sodimac",
      "App Android nativa para Terpel",
    ],
    tech: ["Angular", "Node.js", "Vue.js", "Java", "OpenShift", "Azure"],
  },
  {
    role: "Analista – Programador",
    company: "Grupo CMC Colombia",
    period: "Sep 2016 – Sep 2017",
    type: "Banca · BBVA",
    current: false,
    highlights: [
      "Apps BBVA: Grannet, BBVA Net, BBVA Net Cash",
      "Sistema de cupos y límites de endeudamiento",
      "Sistema de alertamiento bancario",
    ],
    tech: ["Java", "JSP", "SQL Server"],
  },
];

export default function WorkSection() {
  const [selected, setSelected] = useState(0);
  const job = JOBS[selected];

  return (
    <section
      id="work"
      className="relative min-h-screen snap-start overflow-hidden flex items-center"
      style={{ background: "rgba(6,6,6,0.68)" }}
      aria-label="Work experience"
    >
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div className="absolute pointer-events-none"
           style={{ bottom: "5%", left: "15%", width: "50vw", height: "50vh",
                    background: "radial-gradient(ellipse, rgba(201,169,110,0.04) 0%, transparent 65%)" }} />

      <div className="relative w-full flex flex-col lg:flex-row"
           style={{ paddingLeft: "clamp(1.5rem, 7vw, 112px)", paddingRight: "clamp(1.5rem, 7vw, 112px)", paddingTop: "56px", paddingBottom: "40px" }}>

        {/* ── LEFT: Company list ── */}
        <div className="flex flex-col justify-center gap-1 lg:pr-10 flex-shrink-0 mb-6 lg:mb-0 lg:w-[296px] w-full">
          <motion.p
            className="font-poppins font-semibold text-accent mb-3"
            style={{ fontSize: "0.65rem", letterSpacing: "0.5em" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            03 / EXPERIENCIA
          </motion.p>
          <motion.h2
            className="font-poppins font-extrabold text-white leading-[0.9] mb-5"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            WORK
          </motion.h2>

          {JOBS.map((j, i) => (
            <motion.button
              key={j.company}
              onClick={() => setSelected(i)}
              className="text-left px-3 py-[10px] border-l-2 transition-all duration-300"
              style={{
                borderColor: selected === i ? "#c9a96e" : "rgba(255,255,255,0.1)",
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
                      style={{ fontSize: "0.82rem",
                               color: selected === i ? "#c9a96e" : "rgba(255,255,255,0.78)" }}>
                  {j.company}
                </span>
              </div>
              <span className="font-nunito font-light"
                    style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.48)" }}>
                {j.period}
              </span>
            </motion.button>
          ))}
        </div>

        {/* ── RIGHT: Job detail ── */}
        <div className="flex-1 flex flex-col justify-center lg:pl-10 lg:border-l border-t lg:border-t-0 border-white/[0.07] pt-6 lg:pt-0">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between mb-3 flex-wrap gap-3">
              <div>
                <span className="font-poppins font-medium text-accent/80 mb-1 block"
                      style={{ fontSize: "0.65rem", letterSpacing: "0.4em" }}>
                  {job.type}
                </span>
                <h3 className="font-poppins font-extrabold text-white leading-tight"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", letterSpacing: "-0.01em" }}>
                  {job.role}
                </h3>
                <p className="font-poppins font-semibold text-accent mt-1"
                   style={{ fontSize: "1rem" }}>
                  {job.company}
                </p>
              </div>
              <span className="font-poppins font-medium border border-white/15 px-3 py-[6px] flex-shrink-0"
                    style={{ fontSize: "0.68rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.55)" }}>
                {job.period}
              </span>
            </div>

            <div className="h-px bg-white/10 my-4" />

            <ul className="flex flex-col gap-[11px] mb-6">
              {job.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="w-[5px] h-[5px] rounded-full bg-accent/65 mt-[7px] flex-shrink-0" />
                  <span className="font-nunito font-light"
                        style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.65 }}>
                    {h}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {job.tech.map((t) => (
                <span key={t}
                      className="font-poppins font-medium border border-accent/25 text-accent/85 px-3 py-[5px]"
                      style={{ fontSize: "0.68rem", letterSpacing: "0.18em" }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
