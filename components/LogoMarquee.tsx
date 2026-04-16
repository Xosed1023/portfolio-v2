"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Logos de clientes — agrega aquí cada empresa.
 * src: ruta relativa a /public  (ej. "/clients/betplay.png")
 * Recomendado: PNG/SVG con fondo transparente, mínimo 200px de ancho.
 */
const CLIENTS = [
  { name: "Assist Consultores",     src: "/clients/assist.png" },
  { name: "BBVA",    src: "/clients/bbva.png" },
  { name: "Grupo Cinte", src: "/clients/cinte.png" },
  { name: "Claro",  src: "/clients/claro.svg" },
  { name: "Hoteles Decameron",  src: "/clients/decameron.png" },
  { name: "Ecopetrol",  src: "/clients/ecopetrol.png" },
  { name: "Experian",  src: "/clients/experian.png" },
  { name: "Globant",  src: "/clients/globant.png" },
  { name: "Halliburton",  src: "/clients/halli.png" },
  { name: "Banco Itaú",  src: "/clients/itau.png" },
  { name: "Patagonian",  src: "/clients/patagonian.png" },
  // Agrega más aquí ↓
];

// Duplicamos para el loop infinito seamless
const TRACK = [...CLIENTS, ...CLIENTS];

export default function LogoMarquee() {
  return (
    <motion.div
      className="relative z-10 w-full overflow-hidden"
      style={{
        background: "rgba(8,8,8,0.72)",
        borderTop:    "1px solid rgba(255,255,255,0.045)",
        borderBottom: "1px solid rgba(255,255,255,0.045)",
        height: "64px",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-label="Clientes y empresas"
    >
      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 z-10 pointer-events-none"
        style={{ width: "120px",
          background: "linear-gradient(to right, rgba(8,8,8,0.95), transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 z-10 pointer-events-none"
        style={{ width: "120px",
          background: "linear-gradient(to left, rgba(8,8,8,0.95), transparent)" }}
      />

      {/* Track */}
      <div className="marquee-track flex items-center h-full" style={{ width: "max-content" }}>
        {TRACK.map((client, i) => (
          <div
            key={i}
            className="group flex items-center justify-center flex-shrink-0"
            style={{ width: "180px", padding: "0 32px" }}
            title={client.name}
          >
            <Image
              src={client.src}
              alt={client.name}
              width={120}
              height={40}
              className="object-contain transition-all duration-500"
              style={{
                maxHeight: "26px",
                width: "auto",
                filter: "grayscale(1) brightness(0.55)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0) brightness(1)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLImageElement).style.filter = "grayscale(1) brightness(0.55)";
              }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
