"use client";

import { motion, animate, useMotionValue } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { WebProject } from "@/lib/web-projects";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Status badge ─────────────────────────────── */
function StatusBadge({ status }: { status: WebProject["status"] }) {
  const map = {
    live:        { label: "LIVE",         bg: "rgba(60,160,80,0.18)",  border: "rgba(60,160,80,0.45)",  dot: "#3ca050" },
    development: { label: "EN DESARROLLO",bg: "rgba(201,169,110,0.12)",border: "rgba(201,169,110,0.45)",dot: "#c9a96e" },
    soon:        { label: "PRÓXIMAMENTE", bg: "rgba(120,120,120,0.12)",border: "rgba(120,120,120,0.3)", dot: "#888" },
  };
  const s = map[status];
  return (
    <span
      className="font-poppins font-semibold flex items-center gap-[6px]"
      style={{ fontSize: "0.55rem", letterSpacing: "0.3em", padding: "3px 9px",
               background: s.bg, border: `1px solid ${s.border}`, color: s.dot }}
    >
      <span className="relative flex h-[5px] w-[5px] flex-shrink-0">
        {status === "live" && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: s.dot }} />
        )}
        <span className="relative inline-flex h-[5px] w-[5px] rounded-full" style={{ background: s.dot }} />
      </span>
      {s.label}
    </span>
  );
}

/* ── Live screenshot with scan-reveal hover ──── */
function LiveImageMockup({ src, alt, color }: { src: string; alt: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scanX = useMotionValue(-4);

  useEffect(() => {
    if (hovered && containerRef.current) {
      const w = containerRef.current.offsetWidth + 4;
      animate(scanX, w, { duration: 0.72, ease: [0.22, 1, 0.36, 1] });
    } else {
      // instant reset so next hover starts fresh
      scanX.set(-4);
    }
  }, [hovered, scanX]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Grayscale base — always visible */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-top"
        style={{ filter: "grayscale(1) brightness(0.42) sepia(0.12)" }}
      />

      {/* Full-color layer, revealed by clip-path */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          clipPath: hovered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
        }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={src}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-top"
          initial={false}
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* Scan glow line */}
      <motion.div
        className="absolute inset-y-0 w-[3px] pointer-events-none"
        style={{
          x: scanX,
          background: `linear-gradient(to bottom,
            transparent 0%,
            ${color}44 8%,
            ${color}cc 28%,
            #ffffff 50%,
            ${color}cc 72%,
            ${color}44 92%,
            transparent 100%)`,
          boxShadow: `0 0 12px 6px ${color}66, 0 0 28px 12px ${color}33`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Dark vignette that fades on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.5, delay: hovered ? 0.35 : 0 }}
        style={{
          background: "linear-gradient(160deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* "hover to reveal" label, only visible before hover */}
      <motion.div
        className="absolute bottom-3 right-3 pointer-events-none"
        initial={false}
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span
          className="font-poppins font-semibold flex items-center gap-[5px]"
          style={{
            fontSize: "0.5rem",
            letterSpacing: "0.25em",
            color: `${color}99`,
            background: "rgba(0,0,0,0.55)",
            padding: "3px 8px",
            border: `1px solid ${color}33`,
          }}
        >
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
          </svg>
          HOVER
        </span>
      </motion.div>
    </div>
  );
}

/* ── Browser mockup visuals ───────────────────── */
function BrowserMockup({ visual, color }: { visual: string; color: string }) {
  const [r, g, b] = color.startsWith("#")
    ? [parseInt(color.slice(1,3),16), parseInt(color.slice(3,5),16), parseInt(color.slice(5,7),16)]
    : [201, 169, 110];

  const accent = `rgba(${r},${g},${b}`;

  if (visual === "church") {
    return (
      <svg viewBox="0 0 440 260" className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`${accent},0.18)`} />
            <stop offset="100%" stopColor={`${accent},0.04)`} />
          </linearGradient>
          <radialGradient id="cglow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={`${accent},0.25)`} />
            <stop offset="100%" stopColor={`${accent},0)`} />
          </radialGradient>
        </defs>
        {/* Hero section */}
        <rect x="0" y="0" width="440" height="160" fill="url(#cg1)" />
        <rect x="0" y="0" width="440" height="160" fill="url(#cglow)" />
        {/* Cross */}
        <rect x="210" y="28" width="20" height="72" rx="2" fill={`${accent},0.55)`} />
        <rect x="190" y="48" width="60" height="16" rx="2" fill={`${accent},0.55)`} />
        {/* Church name */}
        <rect x="100" y="112" width="240" height="10" rx="2" fill="rgba(255,255,255,0.55)" />
        <rect x="140" y="128" width="160" height="6" rx="2" fill={`${accent},0.5)`} />
        {/* Nav bar */}
        <rect x="0" y="0" width="440" height="22" fill="rgba(0,0,0,0.55)" />
        {[60,120,180,240,300].map(x => (
          <rect key={x} x={x} y="8" width="40" height="5" rx="2" fill="rgba(255,255,255,0.18)" />
        ))}
        <rect x="14" y="7" width="32" height="7" rx="2" fill={`${accent},0.7)`} />
        {/* CTA button */}
        <rect x="172" y="144" width="96" height="22" rx="2" fill={`${accent},0.8)`} />
        {/* Cards row */}
        {[14, 158, 302].map(x => (
          <rect key={x} x={x} y="172" width="124" height="72" rx="3"
                fill="rgba(255,255,255,0.04)" stroke={`${accent},0.2)`} strokeWidth="1" />
        ))}
        {[14, 158, 302].map(x => (
          <g key={x}>
            <rect x={x+10} y="184" width="60" height="5" rx="2" fill={`${accent},0.45)`} />
            <rect x={x+10} y="196" width="100" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
            <rect x={x+10} y="206" width="80" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
            <rect x={x+10} y="216" width="90" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
          </g>
        ))}
      </svg>
    );
  }

  if (visual === "psychology") {
    return (
      <svg viewBox="0 0 440 260" className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="pg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={`${accent},0.12)`} />
            <stop offset="100%" stopColor={`${accent},0.03)`} />
          </linearGradient>
        </defs>
        {/* Nav */}
        <rect x="0" y="0" width="440" height="22" fill="rgba(255,255,255,0.04)" />
        {[80,160,240,320].map(x => (
          <rect key={x} x={x} y="8" width="50" height="5" rx="2" fill="rgba(255,255,255,0.14)" />
        ))}
        <rect x="14" y="6" width="44" height="9" rx="3" fill={`${accent},0.6)`} />
        {/* Hero split */}
        <rect x="0" y="22" width="240" height="140" fill="url(#pg1)" />
        <rect x="240" y="22" width="200" height="140" fill="rgba(255,255,255,0.025)" />
        {/* Left text */}
        <rect x="20" y="42" width="180" height="10" rx="3" fill="rgba(255,255,255,0.5)" />
        <rect x="20" y="58" width="200" height="8" rx="2" fill="rgba(255,255,255,0.35)" />
        <rect x="20" y="72" width="160" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="20" y="84" width="170" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
        <rect x="20" y="100" width="90" height="20" rx="3" fill={`${accent},0.7)`} />
        <rect x="118" y="100" width="90" height="20" rx="3"
              fill="rgba(0,0,0,0)" stroke={`${accent},0.5)`} strokeWidth="1" />
        {/* Right: avatar/photo placeholder */}
        <circle cx="340" cy="80" r="48" fill={`${accent},0.08)`} stroke={`${accent},0.2)`} strokeWidth="1" />
        <circle cx="340" cy="65" r="18" fill={`${accent},0.15)`} />
        <ellipse cx="340" cy="100" rx="28" ry="22" fill={`${accent},0.1)`} />
        {/* Services */}
        <rect x="0" y="162" width="440" height="98" fill="rgba(255,255,255,0.02)" />
        <rect x="14" y="172" width="120" height="5" rx="2" fill={`${accent},0.5)`} />
        {[14, 162, 310].map(x => (
          <g key={x}>
            <rect x={x} y="185" width="118" height="64" rx="3"
                  fill="rgba(255,255,255,0.04)" stroke={`${accent},0.18)`} strokeWidth="1" />
            <circle cx={x+24} cy={205} r="12" fill={`${accent},0.12)`} />
            <rect x={x+12} y="222" width="94" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
            <rect x={x+12} y="232" width="72" height="3" rx="2" fill="rgba(255,255,255,0.12)" />
          </g>
        ))}
      </svg>
    );
  }

  // default
  return (
    <svg viewBox="0 0 440 260" className="w-full h-full" aria-hidden="true">
      <rect x="0" y="0" width="440" height="260" fill="rgba(255,255,255,0.02)" />
      <rect x="0" y="0" width="440" height="22" fill="rgba(255,255,255,0.05)" />
      <rect x="14" y="7" width="36" height="7" rx="2" fill={`${accent},0.6)`} />
      <rect x="120" y="60" width="200" height="12" rx="3" fill="rgba(255,255,255,0.3)" />
      <rect x="150" y="80" width="140" height="8" rx="2" fill={`${accent},0.4)`} />
      <rect x="170" y="108" width="100" height="22" rx="3" fill={`${accent},0.7)`} />
    </svg>
  );
}

/* ── Project card ─────────────────────────────── */
function ProjectCard({ project, index }: { project: WebProject; index: number }) {
  return (
    <motion.div
      className="flex flex-col group"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.65, ease }}
      whileHover={{
        y: -5,
        borderColor: `${project.color}55`,
        boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px ${project.color}18 inset`,
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex-shrink-0 relative overflow-hidden"
        style={{
          background: "rgba(14,12,10,0.9)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Chrome bar */}
        <div className="flex items-center gap-[6px] px-3 py-2">
          <span className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(255,255,255,0.14)" }} />
          <span className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
          <span className="w-[7px] h-[7px] rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
          {/* URL bar */}
          <div
            className="flex-1 mx-2 flex items-center px-3"
            style={{ background: "rgba(255,255,255,0.05)", borderRadius: "3px", height: "18px" }}
          >
            {project.url ? (
              <span className="font-poppins truncate" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.03em" }}>
                {project.url.replace("https://", "")}
              </span>
            ) : (
              <span className="font-poppins" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.03em" }}>
                localhost:3000
              </span>
            )}
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Mockup visual */}
        <div className="w-full overflow-hidden" style={{ height: "200px", background: "rgba(8,8,8,0.95)" }}>
          {project.image && project.status === "live" ? (
            <LiveImageMockup
              src={project.image}
              alt={project.name}
              color={project.color}
            />
          ) : (
            <BrowserMockup visual={project.visual} color={project.color} />
          )}
        </div>
      </div>

      {/* Card info */}
      <div
        className="flex flex-col flex-1 p-5"
        style={{
          background: "rgba(255,255,255,0.022)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="mb-3">
          <span className="font-poppins font-medium block mb-[4px]"
                style={{ fontSize: "0.6rem", letterSpacing: "0.38em", color: `${project.color}cc` }}>
            {project.category} · {project.year}
          </span>
          <h3 className="font-poppins font-extrabold text-white leading-tight"
              style={{ fontSize: "1.15rem", letterSpacing: "-0.01em" }}>
            {project.name}
          </h3>
          <p className="font-nunito font-light mt-[2px]"
             style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>
            {project.client}
          </p>
        </div>

        <p className="font-nunito font-light leading-[1.75] mb-4 flex-1"
           style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.65)" }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-[5px] mb-4">
          {project.tech.map((t) => (
            <span key={t} className="font-poppins font-medium"
                  style={{ fontSize: "0.58rem", letterSpacing: "0.18em", padding: "2px 8px",
                           border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
              {t}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-2 mt-auto">
          {project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
               className="font-poppins font-semibold flex items-center gap-[6px] px-4 py-[8px] transition-all duration-300 btn-glow"
               style={{ fontSize: "0.6rem", letterSpacing: "0.25em", background: project.color, color: "#0a0a0a" }}>
              VER SITIO
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          ) : (
            <span className="font-poppins font-medium flex items-center gap-[6px] px-4 py-[8px]"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.25em",
                           border: `1px solid ${project.color}44`, color: `${project.color}88`, cursor: "default" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              EN DESARROLLO
            </span>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
               className="font-poppins font-medium flex items-center gap-[6px] px-4 py-[8px] transition-all duration-300 hover:border-white/30 hover:text-white"
               style={{ fontSize: "0.6rem", letterSpacing: "0.25em",
                        border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.45)" }}>
              GITHUB
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function WebSection({ projects }: { projects: WebProject[] }) {
  return (
    <section
      id="web"
      className="relative min-h-screen snap-start lg:h-screen lg:overflow-hidden lg:flex lg:items-center"
      style={{ background: "rgba(6,6,6,0.68)" }}
      aria-label="Web projects"
    >
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div className="absolute pointer-events-none"
           style={{ top: "-5%", right: "0", width: "55vw", height: "70vh",
                    background: "radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 65%)" }} />
      <div className="absolute pointer-events-none"
           style={{ bottom: "0", left: "5%", width: "40vw", height: "45vh",
                    background: "radial-gradient(ellipse, rgba(126,184,201,0.04) 0%, transparent 65%)" }} />

      <div className="relative w-full flex flex-col lg:h-full"
           style={{ paddingLeft: "clamp(1.5rem, 7vw, 112px)", paddingRight: "clamp(1.5rem, 7vw, 112px)", paddingTop: "clamp(28px, 8vh, 80px)", paddingBottom: "40px" }}>

        {/* Header */}
        <div className="flex items-end justify-between mb-6 lg:mb-8 flex-shrink-0">
          <div>
            <motion.p className="font-poppins font-semibold text-accent mb-2"
                      style={{ fontSize: "0.65rem", letterSpacing: "0.5em" }}
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              05 / PÁGINAS WEB
            </motion.p>
            <motion.h2 className="font-poppins font-extrabold text-white leading-[0.9]"
                       style={{ fontSize: "clamp(2.2rem, 3.8vw, 4.2rem)", letterSpacing: "-0.02em" }}
                       initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
              WEB <span className="text-accent">PROJECTS</span>
            </motion.h2>
          </div>

          <motion.p className="font-nunito font-light hidden md:block text-right"
                    style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", maxWidth: "220px", lineHeight: 1.6 }}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.3 }}>
            Sitios desarrollados con<br />
            <span style={{ color: "rgba(255,255,255,0.55)" }}>React · Next.js</span>
          </motion.p>
        </div>

        {/* Grid */}
        <div className="lg:flex-1 lg:min-h-0">
          <div className={`grid gap-5 lg:gap-6 pb-2 ${projects.length === 1 ? "grid-cols-1 max-w-md" : projects.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"}`}>
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* Footer note */}
          <motion.p className="font-poppins font-light mt-6 lg:mt-8"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.28em", color: "rgba(255,255,255,0.2)" }}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ delay: 0.5 }}>
          {projects.filter(p => p.status === "live").length} EN PRODUCCIÓN
          {projects.filter(p => p.status === "development").length > 0 &&
            ` · ${projects.filter(p => p.status === "development").length} EN DESARROLLO`}
          </motion.p>
        </div>{/* end scroll wrapper */}
      </div>
    </section>
  );
}
