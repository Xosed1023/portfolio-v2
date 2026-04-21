"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const CLIENTS = [
  { name: "Assist Consultores", src: "/clients/assist.png" },
  { name: "BBVA",               src: "/clients/bbva.png" },
  { name: "Grupo Cinte",        src: "/clients/cinte.png" },
  { name: "Claro",              src: "/clients/claro.svg" },
  { name: "Hoteles Decameron",  src: "/clients/decameron.png" },
  { name: "Ecopetrol",          src: "/clients/ecopetrol.png" },
  { name: "Experian",           src: "/clients/experian.png" },
  { name: "Globant",            src: "/clients/globant.png" },
  { name: "Halliburton",        src: "/clients/halli.png" },
  { name: "Banco Itaú",         src: "/clients/itau.png" },
  { name: "Patagonian",         src: "/clients/patagonian.png" },
];

const TRACK = [...CLIENTS, ...CLIENTS];

export default function LogoMarquee() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  // Dark mode: logos blancos/claros → bajar brillo para que no deslumbren
  // Light mode: logos invertidos (invert) para que sean oscuros sobre fondo claro
  const filterIdle  = isLight ? "grayscale(1) invert(1) brightness(0.55)" : "grayscale(1) brightness(0.45)";
  const filterHover = isLight ? "grayscale(0) invert(0) brightness(1)"    : "grayscale(0) brightness(1)";

  return (
    <motion.div
      className="relative z-10 w-full overflow-hidden"
      style={{
        background:   "var(--section-bg)",
        borderTop:    "1px solid rgba(var(--rgb),0.06)",
        borderBottom: "1px solid rgba(var(--rgb),0.06)",
        height: "64px",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-label="Clientes y empresas"
    >
      {/* Fade edges — match page background */}
      <div className="absolute inset-y-0 left-0 z-10 pointer-events-none"
           style={{ width: "120px",
             background: "linear-gradient(to right, var(--bg-primary), transparent)" }} />
      <div className="absolute inset-y-0 right-0 z-10 pointer-events-none"
           style={{ width: "120px",
             background: "linear-gradient(to left, var(--bg-primary), transparent)" }} />

      {/* Track */}
      <div className="marquee-track flex items-center h-full" style={{ width: "max-content" }}>
        {TRACK.map((client, i) => (
          <div key={i}
               className="flex items-center justify-center flex-shrink-0"
               style={{ width: "180px", padding: "0 32px" }}
               title={client.name}>
            <Image
              src={client.src}
              alt={client.name}
              width={120}
              height={40}
              className="object-contain transition-all duration-500"
              style={{ maxHeight: "26px", width: "auto", filter: filterIdle }}
              onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = filterHover; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = filterIdle; }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
