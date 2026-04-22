"use client";

import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import LangToggle from "@/components/LangToggle";

export default function FloatingControls() {
  return (
    <motion.div
      className="fixed top-6 right-6 z-40 hidden lg:flex items-center gap-1"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "var(--sidebar-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(var(--rgb),0.07)",
        borderRadius: "4px",
        padding: "4px",
      }}
    >
      <ThemeToggle variant="icon" />
      <div
        aria-hidden="true"
        style={{
          width: "1px",
          height: "16px",
          background: "rgba(var(--rgb),0.10)",
          flexShrink: 0,
        }}
      />
      <LangToggle className="px-2 gap-[6px]" />
    </motion.div>
  );
}
