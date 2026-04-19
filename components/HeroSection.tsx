"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import SignatureSVG from "@/components/SignatureSVG";
import SocialIcons from "@/components/SocialIcons";

const ease = [0.22, 1, 0.36, 1] as const;

const slideRight = (delay: number) => ({
  initial: { x: 40, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { delay, duration: 0.85, ease },
});

const fadeUp = (delay: number) => ({
  initial: { y: 22, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { delay, duration: 0.8, ease },
});

const SKILLS = ["Apps móviles", "Páginas web", "Software a la medida"];

export default function HeroSection() {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sc   = { stiffness: 28, damping: 20, mass: 1 };
  const sX   = useSpring(rawX, sc);
  const sY   = useSpring(rawY, sc);

  const pX = useTransform(sX, [-1, 1], ["-14px", "14px"]);
  const pY = useTransform(sY, [-1, 1], ["-10px", "10px"]);
  const iX = useTransform(sX, [-1, 1], ["7px",  "-7px"]);
  const iY = useTransform(sY, [-1, 1], ["4px",  "-4px"]);

  const rafPending = useRef(false);

  const onMove = useCallback(
    (e: MouseEvent) => {
      if (rafPending.current) return;
      rafPending.current = true;
      requestAnimationFrame(() => {
        rawX.set((e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2));
        rawY.set((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2));
        rafPending.current = false;
      });
    },
    [rawX, rawY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [onMove]);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden snap-start"
      style={{ background: "rgba(6,6,6,0.68)" }}
      aria-label="Hero"
    >
      {/* Subtle grid on top of aurora */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* ── DESKTOP: Two-column centered layout ── */}
      <div
        className="absolute inset-0 hidden lg:flex items-stretch"
        style={{ paddingLeft: "72px" }}
      >
        {/* Centered container — caps content width on ultrawide */}
        <div className="w-full h-full max-w-[1480px] mx-auto flex items-stretch">

          {/* ── LEFT: Portrait ── */}
          <motion.div
            className="relative flex-shrink-0 self-stretch"
            style={{ width: "clamp(280px, 42%, 620px)" }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease }}
          >
            {/* Portrait photo — parallax on image only */}
            <motion.div className="absolute inset-0" style={{ x: pX, y: pY, zIndex: 1 }}>
              <Image
                src="/portrait.webp"
                alt="Xosed Peñaloza"
                fill
                priority
                sizes="clamp(280px, 42vw, 620px)"
                className="object-contain object-bottom"
                style={{
                  filter: "grayscale(1) sepia(0.35) brightness(0.78) contrast(1.15)",
                  maskImage:
                    "radial-gradient(ellipse 92% 95% at 50% 50%, black 82%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 92% 95% at 50% 50%, black 82%, transparent 100%)",
                }}
              />
            </motion.div>

            {/* Gold rim */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 3,
                background:
                  "radial-gradient(ellipse 60% 70% at 55% 35%, rgba(201,169,110,0.07) 0%, transparent 70%)",
              }}
            />

            {/* Edge fades */}
            <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent" style={{ zIndex: 3 }} />
            <div className="absolute top-0 right-0 bottom-0 w-28 bg-gradient-to-l from-[#0a0a0a]/70 to-transparent" style={{ zIndex: 3 }} />
            <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" style={{ zIndex: 3 }} />
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent" style={{ zIndex: 3 }} />

            {/* Scroll indicator — anchored inside portrait column */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{ zIndex: 4 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.8 }}
              aria-hidden="true"
            >
              <div className="scroll-line" />
              <span
                className="font-poppins text-white/22"
                style={{ fontSize: "0.52rem", letterSpacing: "0.5em" }}
              >
                SCROLL
              </span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Info panel ── */}
          <motion.div
            className="flex-1 flex flex-col justify-center"
            style={{
              paddingLeft: "clamp(2.5rem, 4vw, 5rem)",
              paddingRight: "clamp(2rem, 5vw, 6rem)",
              paddingTop: "clamp(5rem, 10vh, 7rem)",
              paddingBottom: "clamp(5rem, 10vh, 7rem)",
              x: iX,
              y: iY,
            }}
          >
            {/* Location + years */}
            <motion.p
              className="font-poppins font-medium text-accent mb-4"
              style={{ fontSize: "0.65rem", letterSpacing: "0.45em" }}
              {...slideRight(0.3)}
            >
              // BOGOTÁ, COLOMBIA · 10+ AÑOS EXP.
            </motion.p>

            {/* Name */}
            <motion.h1
              className="font-poppins font-extrabold text-white leading-[1] mb-7 select-none"
              style={{ fontSize: "clamp(2.8rem, 4.8vw, 5.8rem)", letterSpacing: "-0.02em" }}
              {...slideRight(0.48)}
            >
              XOSED
              <br />
              PEÑA<span className="text-accent">LOZA</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              className="font-poppins font-semibold text-white/80 mb-6"
              style={{ fontSize: "1rem", letterSpacing: "0.05em" }}
              {...slideRight(0.62)}
            >
              Senior Software Engineer
              <span className="text-accent mx-2">·</span>
              Full Stack Developer
            </motion.p>

            {/* Gold divider */}
            <motion.div
              className="mb-6 bg-accent/45"
              style={{ height: "1px", width: "52px" }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.78, duration: 0.5, ease, originX: 0 }}
            />

            {/* Bio */}
            <motion.p
              className="font-nunito font-light leading-[1.9] mb-4 max-w-[440px]"
              style={{ fontSize: "0.93rem", color: "rgba(255,255,255,0.72)" }}
              {...fadeUp(0.9)}
            >
              Ingeniero de Software con{" "}
              <span style={{ color: "rgba(255,255,255,0.88)" }}>más de 10 años</span> de
              experiencia en desarrollo full stack. Especializado en{" "}
              <span style={{ color: "rgba(255,255,255,0.88)" }}>
                arquitecturas escalables
              </span>
              , microservicios y soluciones empresariales para banca, hotelería,
              retail y entretenimiento.
            </motion.p>

            {/* Stack tags */}
            <motion.div className="flex flex-wrap gap-[6px] mb-2 mt-1" {...fadeUp(1.05)}>
              {SKILLS.map((tag) => (
                <span
                  key={tag}
                  className="font-poppins font-medium border border-white/10 hover:border-accent/55
                             hover:text-accent transition-colors duration-300 cursor-default"
                  style={{
                    fontSize: "0.67rem",
                    letterSpacing: "0.28em",
                    padding: "3px 10px",
                    color: "rgba(255,255,255,0.60)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Signature */}
            <SignatureSVG />

            {/* CTA row */}
            <motion.div className="flex items-center gap-3 mt-5 mb-1" {...fadeUp(1.5)}>
              <a
                href="/CV Xosed Penaloza V2.pdf"
                download
                className="font-poppins font-semibold flex items-center gap-2 px-5 py-[11px] bg-accent hover:bg-accent-dim text-bg-primary transition-colors duration-300 btn-glow"
                style={{ fontSize: "0.65rem", letterSpacing: "0.3em" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                DESCARGAR CV
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="font-poppins font-medium flex items-center gap-2 px-5 py-[10px] transition-all duration-300 hover:border-accent/50 hover:text-accent"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                CONTACTAR
              </a>
            </motion.div>

            {/* Socials */}
            <SocialIcons />

            {/* Status */}
            <motion.div className="flex items-center gap-[10px] mt-4" {...fadeUp(1.9)}>
              <span className="relative flex h-[7px] w-[7px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-45" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-accent" />
              </span>
              <span
                className="font-poppins font-medium text-white/50"
                style={{ fontSize: "0.6rem", letterSpacing: "0.35em" }}
              >
                ACTUALMENTE EN GLOBANT · OPEN TO OPPORTUNITIES
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── MOBILE: Centered full-width layout ── */}
      <div
        className="lg:hidden absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-12 md:px-20 pt-16"
      >
        <motion.p
          className="font-poppins font-medium text-accent mb-3"
          style={{ fontSize: "0.62rem", letterSpacing: "0.45em" }}
          {...slideRight(0.3)}
        >
          // BOGOTÁ, COLOMBIA · 10+ AÑOS EXP.
        </motion.p>
        <motion.h1
          className="font-poppins font-extrabold text-white leading-[1.08] mb-5 select-none"
          style={{ fontSize: "clamp(3rem, 14vw, 5rem)", letterSpacing: "-0.02em" }}
          {...slideRight(0.48)}
        >
          XOSED
          <br />
          PEÑA<span className="text-accent">LOZA</span>
        </motion.h1>
        <motion.p
          className="font-poppins font-semibold text-white/80 mb-5"
          style={{ fontSize: "0.9rem", letterSpacing: "0.04em" }}
          {...slideRight(0.62)}
        >
          Senior Software Engineer
          <span className="text-accent mx-2">·</span>
          Full Stack Developer
        </motion.p>
        <motion.div
          className="mb-5 bg-accent/45 mx-auto"
          style={{ height: "1px", width: "44px" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.78, duration: 0.5, ease, originX: 0.5 }}
        />
        <motion.p
          className="font-nunito font-light leading-[1.85] mb-4 max-w-[340px] sm:max-w-[420px]"
          style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.72)" }}
          {...fadeUp(0.9)}
        >
          Ingeniero de Software con{" "}
          <span style={{ color: "rgba(255,255,255,0.88)" }}>más de 10 años</span>{" "}
          de experiencia en desarrollo full stack.
        </motion.p>
        <motion.div className="flex flex-wrap gap-[6px] mb-4 justify-center" {...fadeUp(1.05)}>
          {SKILLS.map((tag) => (
            <span
              key={tag}
              className="font-poppins font-medium border border-white/10 cursor-default"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.25em",
                padding: "3px 9px",
                color: "rgba(255,255,255,0.60)",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div className="flex items-center gap-3 mt-4 mb-1" {...fadeUp(1.5)}>
          <a
            href="/CV Xosed Penaloza V2.pdf"
            download
            className="font-poppins font-semibold flex items-center gap-2 px-5 py-[10px] bg-accent hover:bg-accent-dim text-bg-primary transition-colors duration-300 btn-glow"
            style={{ fontSize: "0.63rem", letterSpacing: "0.28em" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            CV
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="font-poppins font-medium flex items-center gap-2 px-5 py-[9px] transition-all duration-300 hover:border-accent/50 hover:text-accent"
            style={{
              fontSize: "0.63rem",
              letterSpacing: "0.28em",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            CONTACTAR
          </a>
        </motion.div>

        <SocialIcons />

        <motion.div className="flex items-center gap-[10px] mt-4" {...fadeUp(1.9)}>
          <span className="relative flex h-[7px] w-[7px]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-45" />
            <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-accent" />
          </span>
          <span
            className="font-poppins font-medium text-white/50"
            style={{ fontSize: "0.58rem", letterSpacing: "0.3em" }}
          >
            ACTUALMENTE EN GLOBANT
          </span>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
          style={{ transform: "translateX(-50%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          aria-hidden="true"
        >
          <div className="scroll-line" />
        </motion.div>
      </div>

      {/* ── CHROME ── */}
      <motion.div
        className="absolute top-0 bottom-0 bg-white/[0.04]"
        style={{ left: "72px", width: "1px" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.2, duration: 1, ease }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-white/[0.05]"
        style={{ height: "1px" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1.2, ease }}
      />

      {/* Copyright */}
      <motion.p
        className="absolute bottom-8 right-10 font-poppins hidden lg:block"
        style={{ fontSize: "0.55rem", letterSpacing: "0.38em", color: "rgba(255,255,255,0.18)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        aria-hidden="true"
      >
        © 2026 XOSED PEÑALOZA
      </motion.p>

      <motion.div
        className="absolute top-8 right-10 font-poppins hidden lg:block"
        style={{ fontSize: "0.55rem", letterSpacing: "0.45em", color: "rgba(255,255,255,0.16)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-hidden="true"
      >
        EST. 2014
      </motion.div>
    </section>
  );
}
