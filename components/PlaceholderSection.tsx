"use client";

import { motion } from "framer-motion";

interface Props {
  id: string;
  label: string;
  index: number;
}

export default function PlaceholderSection({ id, label, index }: Props) {
  return (
    <section
      id={id}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden snap-start"
      style={{ background: "#0a0a0a" }}
      aria-label={label}
    >
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%", left: "20%",
          width: "60%", height: "60%",
          background: "radial-gradient(ellipse, rgba(201,169,110,0.04) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="font-condensed font-semibold text-accent mb-4"
          style={{ fontSize: "0.65rem", letterSpacing: "0.5em" }}
        >
          0{index} /
        </p>

        <h2
          className="font-condensed font-extrabold text-white leading-none mb-6"
          style={{ fontSize: "clamp(4rem, 9vw, 8rem)", letterSpacing: "-0.01em" }}
        >
          {label}
        </h2>

        <div
          className="mx-auto mb-8"
          style={{ width: "40px", height: "1px", background: "rgba(201,169,110,0.4)" }}
        />

        <p
          className="font-sans font-light max-w-xs mx-auto"
          style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.8 }}
        >
          This section is coming soon.
          <br />
          Content will appear here.
        </p>
      </motion.div>
    </section>
  );
}
