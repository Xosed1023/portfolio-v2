"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function IntroLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("intro-seen");
    if (seen) return;
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("intro-seen", "1");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            backgroundColor: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-poppins)",
          }}
        >
          {/* PORTFOLIO label — above line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.5 } }}
            style={{
              margin: 0,
              marginBottom: "12px",
              fontSize: "0.55rem",
              letterSpacing: "0.6em",
              color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase",
              fontFamily: "var(--font-poppins)",
            }}
          >
            PORTFOLIO
          </motion.p>

          {/* Gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1, transition: { duration: 0.6, ease: "easeInOut" } }}
            style={{
              width: "120px",
              height: "1px",
              backgroundColor: "#c9a96e",
              transformOrigin: "center",
            }}
          />

          {/* Name — below line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.5 } }}
            style={{
              margin: 0,
              marginTop: "12px",
              fontSize: "0.7rem",
              letterSpacing: "0.4em",
              color: "rgba(201,169,110,0.9)",
              textTransform: "uppercase",
              fontFamily: "var(--font-poppins)",
            }}
          >
            XOSED PEÑALOZA
          </motion.p>

          {/* 3-dot pulse loader — bottom center */}
          <div
            style={{
              position: "absolute",
              bottom: "48px",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.15 }}
                animate={{
                  opacity: [0.15, 1, 0.15],
                  transition: {
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  },
                }}
                style={{
                  display: "block",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: "#c9a96e",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
