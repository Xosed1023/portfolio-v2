"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function ScrollProgress() {
  const raw = useMotionValue(0);
  const progress = useSpring(raw, { stiffness: 80, damping: 20, mass: 0.5 });

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const max = scrollHeight - clientHeight;
      raw.set(max > 0 ? scrollTop / max : 0);
    };

    container.addEventListener("scroll", update, { passive: true });
    update();
    return () => container.removeEventListener("scroll", update);
  }, [raw]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9997] h-[2px]"
      style={{ background: "rgba(201,169,110,0.08)" }}
      aria-hidden="true"
    >
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: progress,
          background:
            "linear-gradient(90deg, rgba(201,169,110,0.5) 0%, #c9a96e 60%, rgba(255,220,160,0.9) 100%)",
        }}
      />
    </div>
  );
}
