"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SPRING_CONFIG = { stiffness: 120, damping: 18, mass: 0.8 };

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [hovered, setHovered] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const ringX = useSpring(cursorX, SPRING_CONFIG);
  const ringY = useSpring(cursorY, SPRING_CONFIG);

  const dotScale = useSpring(1, SPRING_CONFIG);
  const ringScale = useSpring(1, SPRING_CONFIG);
  const ringOpacity = useSpring(1, SPRING_CONFIG);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isFinePonter = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePonter) return;

    setIsDesktop(true);

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"]')) {
        setHovered(true);
        dotScale.set(0);
        ringScale.set(2.2);
        ringOpacity.set(0.7);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"]')) {
        setHovered(false);
        dotScale.set(1);
        ringScale.set(1);
        ringOpacity.set(1);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [cursorX, cursorY, dotScale, ringScale, ringOpacity]);

  if (!isDesktop) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Dot — raw motion values, no spring */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#c9a96e",
          zIndex: 99999,
          pointerEvents: "none",
          translateX: "-50%",
          translateY: "-50%",
          scale: dotScale,
        }}
      />

      {/* Ring — spring-following */}
      <motion.div
        style={{
          position: "fixed",
          left: ringX,
          top: ringY,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: hovered
            ? "1px solid rgba(201,169,110,0.7)"
            : "1px solid rgba(201,169,110,0.4)",
          zIndex: 99998,
          pointerEvents: "none",
          translateX: "-50%",
          translateY: "-50%",
          scale: ringScale,
          opacity: ringOpacity,
        }}
      />
    </>
  );
}
