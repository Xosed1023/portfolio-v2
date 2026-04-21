"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import T from "@/lib/translations";
import TechBadge from "@/components/TechBadge";

const ease = [0.22, 1, 0.36, 1] as const;

const PROJECTS_STATIC = [
  {
    num: "01",
    company: "Grupo Cinte",
    year: "2024",
    tech: ["React Native", "Node.js", "MongoDB", "AWS", "Firebase", "AdMob"],
    links: { github: null, live: "https://apps.apple.com/co/app/midatacr%C3%A9dito/id6752889575" },
    visual: "mobile",
    accent: "#c9a96e",
  },
  {
    num: "02",
    company: "Assist Consultores",
    year: "2020",
    tech: ["Angular", "Node.js", "Vue.js", "PostgreSQL"],
    links: { github: null, live: "https://juegoresponsable.betplay.com.co/home" },
    visual: "dashboard",
    accent: "#c9a96e",
  },
  {
    num: "03",
    company: "Hoteles Decameron · Assist",
    year: "2021",
    tech: ["Apache Camel", "Spring Boot", "JBoss Fuse", "XSLT", "OAuth 2.0"],
    links: { github: null, live: null },
    visual: "integration",
    accent: "#c9a96e",
  },
  {
    num: "04",
    company: "Patagonian",
    year: "2023",
    tech: ["Angular 12", "Laravel", "AWS", "Sass", "Bootstrap"],
    links: { github: null, live: null },
    visual: "enterprise",
    accent: "#c9a96e",
  },
];

/* ── ESB Integration Visual — interactive ─────── */
const HUB = { cx: 250, cy: 205 };
const ESB_NODES = [
  { cx: 88, cy: 72, label: "AVIANCA", sub: "REST" },
  { cx: 412, cy: 72, label: "CLARO", sub: "SOAP" },
  { cx: 68, cy: 338, label: "ITAÚ", sub: "OAuth" },
  { cx: 432, cy: 338, label: "ICFES", sub: "REST" },
  { cx: 250, cy: 28, label: "FUSE", sub: "JBoss" },
];

function IntegrationVisual() {
  const [mouse, setMouse] = useState({ x: HUB.cx, y: HUB.cy });
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 500,
      y: ((e.clientY - rect.top) / rect.height) * 410,
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 500 410"
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse({ x: HUB.cx, y: HUB.cy })}
      style={{ cursor: "crosshair" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="igCursor" gradientUnits="userSpaceOnUse"
          cx={mouse.x} cy={mouse.y} r="170">
          <stop offset="0%" stopColor="rgba(201,169,110,0.2)" />
          <stop offset="100%" stopColor="rgba(201,169,110,0)" />
        </radialGradient>
        <radialGradient id="igHub" gradientUnits="userSpaceOnUse"
          cx={HUB.cx} cy={HUB.cy} r="90">
          <stop offset="0%" stopColor="rgba(201,169,110,0.22)" />
          <stop offset="100%" stopColor="rgba(201,169,110,0)" />
        </radialGradient>
        <marker id="igArr" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill="rgba(201,169,110,0.55)" />
        </marker>
        <filter id="igGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Cursor ambient glow */}
      <rect x="0" y="0" width="500" height="410" fill="url(#igCursor)" />
      {/* Hub ambient glow */}
      <circle cx={HUB.cx} cy={HUB.cy} r={90} fill="url(#igHub)" opacity={0.6} />

      {/* Pulse rings */}
      {[0, 1.1].map((delay, i) => (
        <motion.circle key={i} cx={HUB.cx} cy={HUB.cy} r={54} fill="none"
          stroke="rgba(201,169,110,0.22)" strokeWidth="1"
          animate={{ r: [54, 100], opacity: [0.35, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, delay, ease: "easeOut" }} />
      ))}

      {/* Connection lines */}
      {ESB_NODES.map((n, i) => (
        <g key={i}>
          {/* Wide soft glow line */}
          <line x1={n.cx} y1={n.cy} x2={HUB.cx} y2={HUB.cy}
            stroke="rgba(201,169,110,0.07)" strokeWidth="4" />
          {/* Dashed line → hub */}
          <line x1={n.cx} y1={n.cy} x2={HUB.cx} y2={HUB.cy}
            stroke="rgba(201,169,110,0.22)" strokeWidth="1"
            strokeDasharray="5 4"
            markerEnd="url(#igArr)" />
        </g>
      ))}

      {/* Animated data packets — each node → Camel independently */}
      {ESB_NODES.map((n, i) => (
        <motion.circle key={i}
          cx={HUB.cx} cy={HUB.cy} r={4}
          fill="#c9a96e"
          style={{ filter: "drop-shadow(0 0 5px rgba(201,169,110,0.9))" }}
          animate={{
            x: [n.cx - HUB.cx, 0],
            y: [n.cy - HUB.cy, 0],
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.4, 1.1, 1, 0.3],
          }}
          transition={{
            duration: 2.1,
            repeat: Infinity,
            delay: i * 0.52,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* External nodes — proximity-glow */}
      {ESB_NODES.map((n, i) => {
        const dist = Math.sqrt((mouse.x - n.cx) ** 2 + (mouse.y - n.cy) ** 2);
        const p = Math.max(0, 1 - dist / 140); // 0–1
        return (
          <g key={i}>
            {/* Proximity halo */}
            <circle cx={n.cx} cy={n.cy} r={42}
              fill={`rgba(201,169,110,${p * 0.15})`} />
            {/* Box bg */}
            <rect x={n.cx - 40} y={n.cy - 24} width="80" height="48" rx="5"
              fill={`rgba(10,9,8,${0.82 + p * 0.12})`}
              stroke={`rgba(201,169,110,${0.18 + p * 0.6})`}
              strokeWidth={1 + p * 0.9} />
            <text x={n.cx} y={n.cy - 7} textAnchor="middle"
              fill={`rgba(var(--rgb),${0.62 + p * 0.38})`}
              fontSize="8" fontFamily="monospace" letterSpacing="0.8">
              {n.label}
            </text>
            <text x={n.cx} y={n.cy + 9} textAnchor="middle"
              fill={`rgba(201,169,110,${0.6 + p * 0.4})`}
              fontSize="7" fontFamily="monospace">
              {n.sub}
            </text>
          </g>
        );
      })}

      {/* Central hub */}
      <circle cx={HUB.cx} cy={HUB.cy} r={52} fill="rgba(10,9,8,0.92)"
        stroke="rgba(201,169,110,0.5)" strokeWidth="1.5" filter="url(#igGlow)" />
      <circle cx={HUB.cx} cy={HUB.cy} r={33} fill="rgba(10,9,8,0.95)"
        stroke="rgba(201,169,110,0.28)" strokeWidth="1" />
      <text x={HUB.cx} y={HUB.cy - 6} textAnchor="middle"
        fill="rgba(201,169,110,0.95)" fontSize="9.5" fontFamily="monospace" letterSpacing="1.5">
        CAMEL
      </text>
      <text x={HUB.cx} y={HUB.cy + 10} textAnchor="middle"
        fill="rgba(201,169,110,0.65)" fontSize="8" fontFamily="monospace" letterSpacing="1">
        ESB
      </text>

      {/* Cursor crosshair dot */}
      <circle cx={mouse.x} cy={mouse.y} r={3} fill="rgba(201,169,110,0.35)"
        style={{ pointerEvents: "none" }} />
      <circle cx={mouse.x} cy={mouse.y} r={8} fill="none"
        stroke="rgba(201,169,110,0.2)" strokeWidth="1"
        style={{ pointerEvents: "none" }} />
    </svg>
  );
}

/* ── Abstract project visuals ─────────────────── */
function ProjectVisual({ type }: { type: string }) {
  if (type === "mobile") {
    return (
      <svg viewBox="0 0 360 430" className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="mg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.03" />
          </linearGradient>
          <radialGradient id="mgScore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.03" />
          </radialGradient>
        </defs>

        {/* Floating orbs */}
        <circle cx="42" cy="160" r="38" fill="rgba(201,169,110,0.04)" />
        <circle cx="318" cy="210" r="52" fill="rgba(201,169,110,0.03)" />

        {/* Phone frame */}
        <rect x="88" y="10" width="184" height="330" rx="26"
          fill="rgba(var(--rgb),0.03)" stroke="rgba(201,169,110,0.28)" strokeWidth="1.5" />

        {/* Dynamic Island */}
        <rect x="148" y="20" width="64" height="12" rx="6"
          fill="rgba(var(--rgb),0.1)" />
        {/* Notification badge */}
        <circle cx="247" cy="26" r="5" fill="#c9a96e" opacity="0.75" />
        <text x="247" y="29" textAnchor="middle" fill="rgba(10,9,8,0.9)"
          fontSize="5" fontFamily="monospace" fontWeight="bold">3</text>

        {/* Header bar */}
        <rect x="96" y="42" width="168" height="38" rx="0" fill="url(#mg1)" />
        <rect x="108" y="52" width="72" height="8" rx="3"
          fill="rgba(201,169,110,0.65)" />
        <rect x="244" y="51" width="10" height="10" rx="2"
          fill="rgba(var(--rgb),0.14)" />

        {/* Score card */}
        <rect x="96" y="86" width="168" height="108" rx="0"
          fill="rgba(var(--rgb),0.04)" />
        <circle cx="180" cy="126" r="34" fill="url(#mgScore)"
          stroke="rgba(201,169,110,0.32)" strokeWidth="1" />
        <text x="180" y="122" textAnchor="middle"
          fill="rgba(201,169,110,0.95)" fontSize="17" fontFamily="monospace" fontWeight="bold">
          742
        </text>
        <text x="180" y="134" textAnchor="middle"
          fill="rgba(var(--rgb),0.35)" fontSize="5.5" fontFamily="monospace" letterSpacing="1.2">
          PUNTAJE CREDITICIO
        </text>
        <text x="180" y="182" textAnchor="middle"
          fill="rgba(var(--rgb),0.22)" fontSize="5.5" fontFamily="monospace">
          Actualizado hace 2 min
        </text>

        {/* Two action cards */}
        <rect x="96" y="202" width="80" height="72" rx="3"
          fill="rgba(var(--rgb),0.04)" stroke="rgba(var(--rgb),0.07)" strokeWidth="1" />
        <rect x="184" y="202" width="80" height="72" rx="3"
          fill="rgba(var(--rgb),0.04)" stroke="rgba(var(--rgb),0.07)" strokeWidth="1" />
        {[104, 192].map(x => (
          <g key={x}>
            <rect x={x} y="214" width="56" height="6" rx="2" fill="rgba(201,169,110,0.45)" />
            <rect x={x} y="226" width="44" height="4" rx="2" fill="rgba(var(--rgb),0.12)" />
            <rect x={x} y="236" width="50" height="4" rx="2" fill="rgba(var(--rgb),0.08)" />
            <rect x={x} y="246" width="38" height="4" rx="2" fill="rgba(var(--rgb),0.06)" />
          </g>
        ))}

        {/* CTA button */}
        <rect x="108" y="284" width="144" height="24" rx="4"
          fill="rgba(201,169,110,0.22)" />
        <text x="180" y="299" textAnchor="middle"
          fill="rgba(201,169,110,0.88)" fontSize="7" fontFamily="monospace" letterSpacing="1.2">
          VER HISTORIAL
        </text>

        {/* Bottom nav bar */}
        {[116, 148, 180, 212, 244].map(x => (
          <g key={x}>
            <rect x={x - 10} y="318" width="20" height="3" rx="1.5"
              fill={x === 148 ? "rgba(201,169,110,0.7)" : "rgba(var(--rgb),0.1)"} />
            <rect x={x - 6} y="326" width="12" height="3" rx="1.5"
              fill={x === 148 ? "rgba(201,169,110,0.4)" : "rgba(var(--rgb),0.05)"} />
          </g>
        ))}

        {/* Home indicator */}
        <rect x="152" y="334" width="56" height="3" rx="1.5"
          fill="rgba(var(--rgb),0.22)" />

        {/* ── Store availability text ── */}
        <text x="180" y="374" textAnchor="middle"
          fill="rgba(var(--rgb),0.28)" fontSize="7" fontFamily="monospace" letterSpacing="1">
          DISPONIBLE EN
        </text>
        <text x="180" y="390" textAnchor="middle"
          fill="rgba(201,169,110,0.75)" fontSize="9" fontFamily="monospace" letterSpacing="0.8">
          App Store · Google Play
        </text>
      </svg>
    );
  }

  if (type === "dashboard") {
    return (
      <svg viewBox="0 0 480 320" className="w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="bar1" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="bar2" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Browser chrome */}
        <rect x="20" y="20" width="440" height="280" rx="6" fill="rgba(var(--rgb),0.02)" stroke="rgba(201,169,110,0.2)" strokeWidth="1" />
        <rect x="20" y="20" width="440" height="28" rx="6" fill="rgba(var(--rgb),0.04)" />
        <circle cx="38" cy="34" r="4" fill="rgba(var(--rgb),0.15)" />
        <circle cx="52" cy="34" r="4" fill="rgba(var(--rgb),0.1)" />
        <circle cx="66" cy="34" r="4" fill="rgba(var(--rgb),0.07)" />
        {/* Stats row */}
        {[0, 1, 2, 3].map(i => (
          <g key={i}>
            <rect x={30 + i * 108} y="58" width="98" height="50" rx="3" fill="rgba(var(--rgb),0.03)" stroke="rgba(var(--rgb),0.06)" strokeWidth="1" />
            <rect x={38 + i * 108} y="66" width="30" height="3" rx="1.5" fill="rgba(201,169,110,0.5)" />
            <rect x={38 + i * 108} y="76" width={50 + i * 8} height="5" rx="2" fill="rgba(var(--rgb),0.12)" />
            <rect x={38 + i * 108} y="88" width="20" height="3" rx="1.5" fill={i === 0 ? "rgba(201,169,110,0.6)" : "rgba(var(--rgb),0.2)"} />
          </g>
        ))}
        {/* Bar chart */}
        <rect x="30" y="118" width="260" height="170" rx="3" fill="rgba(var(--rgb),0.02)" stroke="rgba(var(--rgb),0.05)" strokeWidth="1" />
        {[65, 82, 48, 91, 70, 55, 88].map((h, i) => (
          <rect key={i} x={46 + i * 34} y={248 - h * 0.9} width="18" height={h * 0.9} rx="2"
            fill={i === 3 ? "url(#bar1)" : "url(#bar2)"} />
        ))}
        <line x1="38" y1="248" x2="282" y2="248" stroke="rgba(var(--rgb),0.08)" strokeWidth="1" />
        {/* Line chart */}
        <rect x="300" y="118" width="160" height="170" rx="3" fill="rgba(var(--rgb),0.02)" stroke="rgba(var(--rgb),0.05)" strokeWidth="1" />
        <polyline points="310,238 330,215 350,225 370,195 390,210 410,185 430,198 450,175" fill="none" stroke="rgba(201,169,110,0.6)" strokeWidth="1.5" />
        <polyline points="310,238 330,215 350,225 370,195 390,210 410,185 430,198 450,175 450,248 310,248" fill="rgba(201,169,110,0.06)" />
      </svg>
    );
  }

  if (type === "integration") {
    return <IntegrationVisual />;
  }

  if (type === "integration_OLD_UNUSED") {
    return (
      <svg viewBox="0 0 400 360" className="w-full h-full" aria-hidden="true">
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(201,169,110,0.6)" />
          </marker>
        </defs>
        {/* Central hub */}
        <circle cx="200" cy="180" r="36" fill="rgba(201,169,110,0.08)" stroke="rgba(201,169,110,0.4)" strokeWidth="1.5" />
        <circle cx="200" cy="180" r="22" fill="rgba(201,169,110,0.06)" stroke="rgba(201,169,110,0.25)" strokeWidth="1" />
        <text x="200" y="176" textAnchor="middle" fill="rgba(201,169,110,0.8)" fontSize="7" fontFamily="monospace" letterSpacing="1">CAMEL</text>
        <text x="200" y="187" textAnchor="middle" fill="rgba(201,169,110,0.6)" fontSize="6" fontFamily="monospace" letterSpacing="1">ESB</text>
        {/* Nodes */}
        {[
          { cx: 80, cy: 80, label: "AVIANCA", sub: "REST" },
          { cx: 320, cy: 80, label: "CLARO", sub: "SOAP" },
          { cx: 60, cy: 260, label: "ITAÚ", sub: "OAuth" },
          { cx: 330, cy: 260, label: "ICFES", sub: "REST" },
          { cx: 200, cy: 40, label: "FUSE", sub: "JBoss" },
        ].map(({ cx, cy, label, sub }: { cx: number; cy: number; label: string; sub: string }, i) => (
          <g key={i}>
            <rect x={cx - 30} y={cy - 18} width="60" height="36" rx="4"
              fill="rgba(var(--rgb),0.03)" stroke="rgba(var(--rgb),0.12)" strokeWidth="1" />
            <text x={cx} y={cy - 4} textAnchor="middle" fill="rgba(var(--rgb),0.7)" fontSize="6.5" fontFamily="monospace" letterSpacing="0.5">{label}</text>
            <text x={cx} y={cy + 8} textAnchor="middle" fill="rgba(201,169,110,0.6)" fontSize="6" fontFamily="monospace">{sub}</text>
          </g>
        ))}
        {/* Connections */}
        {[
          [110, 98, 168, 155],
          [290, 98, 232, 155],
          [90, 248, 166, 200],
          [300, 248, 234, 200],
          [200, 76, 200, 144],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(201,169,110,0.3)" strokeWidth="1" strokeDasharray="4 3"
            markerEnd="url(#arr)" />
        ))}
        {/* Pulse rings */}
        <circle cx="200" cy="180" r="50" fill="none" stroke="rgba(201,169,110,0.08)" strokeWidth="1" />
        <circle cx="200" cy="180" r="70" fill="none" stroke="rgba(201,169,110,0.05)" strokeWidth="1" />
      </svg>
    );
  }

  // enterprise
  return (
    <svg viewBox="0 0 480 320" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="eg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Browser frame */}
      <rect x="20" y="15" width="440" height="290" rx="6" fill="rgba(var(--rgb),0.02)" stroke="rgba(201,169,110,0.2)" strokeWidth="1" />
      <rect x="20" y="15" width="440" height="26" rx="6" fill="rgba(var(--rgb),0.04)" />
      <circle cx="36" cy="28" r="4" fill="rgba(var(--rgb),0.15)" />
      <circle cx="50" cy="28" r="4" fill="rgba(var(--rgb),0.1)" />
      <circle cx="64" cy="28" r="4" fill="rgba(var(--rgb),0.07)" />
      <rect x="80" y="20" width="220" height="16" rx="3" fill="rgba(var(--rgb),0.04)" />
      <text x="190" y="31" textAnchor="middle" fill="rgba(var(--rgb),0.25)" fontSize="7" fontFamily="monospace">app.patagonian.com</text>
      {/* Sidebar */}
      <rect x="20" y="41" width="80" height="264" fill="rgba(var(--rgb),0.02)" />
      <rect x="28" y="55" width="64" height="8" rx="2" fill="rgba(201,169,110,0.35)" />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <rect key={i} x="28" y={72 + i * 20} width={i === 0 ? 64 : 48} height="6" rx="2"
          fill={i === 0 ? "rgba(var(--rgb),0.15)" : "rgba(var(--rgb),0.06)"} />
      ))}
      {/* Main content */}
      <rect x="108" y="48" width="340" height="40" rx="3" fill="url(#eg1)" stroke="rgba(201,169,110,0.1)" strokeWidth="1" />
      <rect x="116" y="56" width="80" height="6" rx="2" fill="rgba(201,169,110,0.5)" />
      <rect x="116" y="68" width="120" height="4" rx="2" fill="rgba(var(--rgb),0.12)" />
      {/* Table */}
      <rect x="108" y="96" width="340" height="200" rx="3" fill="rgba(var(--rgb),0.02)" stroke="rgba(var(--rgb),0.05)" strokeWidth="1" />
      <rect x="108" y="96" width="340" height="22" fill="rgba(var(--rgb),0.04)" />
      {["ID", "NOMBRE", "ESTADO", "FECHA", "ACCIÓN"].map((h, i) => (
        <text key={h} x={118 + i * 66} y={111} fill="rgba(201,169,110,0.6)" fontSize="6" fontFamily="monospace" letterSpacing="0.5">{h}</text>
      ))}
      {[0, 1, 2, 3, 4, 5].map(r => (
        <g key={r}>
          <line x1="108" y1={118 + r * 26} x2="448" y2={118 + r * 26} stroke="rgba(var(--rgb),0.04)" strokeWidth="1" />
          {[0, 1, 2, 3, 4].map(c => (
            <rect key={c} x={116 + c * 66} y={124 + r * 26} width={c === 4 ? 28 : c === 0 ? 14 : 50} height="5" rx="2"
              fill={c === 2 ? "rgba(201,169,110,0.25)" : r === 0 && c === 0 ? "rgba(201,169,110,0.4)" : "rgba(var(--rgb),0.07)"} />
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function ProjectsSection() {
  const { lang } = useLanguage();
  const PROJECTS = PROJECTS_STATIC.map((p, i) => ({
    ...p,
    title:       T.projects.items[i].title[lang],
    category:    T.projects.items[i].category[lang],
    description: T.projects.items[i].description[lang],
  }));
  const [active, setActive] = useState(0);
  const project = PROJECTS[active];

  return (
    <section
      id="projects"
      className="relative min-h-screen snap-start lg:h-screen lg:overflow-hidden lg:flex lg:items-center"
      style={{ background: "var(--section-bg)" }}
      aria-label="Projects"
    >
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Ambient glow */}
      <div className="absolute pointer-events-none"
        style={{
          top: "10%", right: "8%", width: "50vw", height: "60vh",
          background: "radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 65%)"
        }} />
      <div className="absolute pointer-events-none"
        style={{
          bottom: "0", left: "10%", width: "35vw", height: "40vh",
          background: "radial-gradient(ellipse, rgba(201,169,110,0.03) 0%, transparent 70%)"
        }} />

      {/* ── MOBILE layout ── */}
      <div className="lg:hidden relative flex flex-col pb-12"
        style={{ paddingTop: "clamp(28px, 6vh, 48px)", paddingLeft: "clamp(1.5rem, 6vw, 2rem)", paddingRight: "clamp(1.5rem, 6vw, 2rem)" }}>
        <div className="flex-shrink-0 pt-5 pb-3">
          <motion.p className="font-poppins font-semibold text-accent mb-2"
            style={{ fontSize: "0.68rem", letterSpacing: "0.5em" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {T.projects.sectionLabel[lang]}
          </motion.p>
          <motion.h2 className="font-poppins font-extrabold text-white leading-[0.9]"
            style={{ fontSize: "clamp(1.7rem, 8.5vw, 2.3rem)", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
            {T.projects.heading1[lang]} <span className="text-accent">{T.projects.heading2[lang]}</span>
          </motion.h2>
        </div>

        {/* Project list tabs */}
        <div className="flex-shrink-0 flex flex-col gap-[3px] mb-3">
          {PROJECTS.map((p, i) => (
            <button
              key={p.num}
              onClick={() => setActive(i)}
              className="flex items-center gap-3 px-3 py-[10px] text-left transition-all duration-300"
              style={{
                borderLeft: `2px solid ${i === active ? "#c9a96e" : "rgba(var(--rgb),0.08)"}`,
                background: i === active ? "rgba(201,169,110,0.06)" : "transparent",
              }}
            >
              <span className="font-poppins font-semibold flex-shrink-0"
                style={{ fontSize: "0.65rem", letterSpacing: "0.28em", color: i === active ? "#c9a96e" : "rgba(var(--rgb),0.3)" }}>
                {p.num}
              </span>
              <span className="font-poppins font-semibold truncate"
                style={{ fontSize: "0.9rem", color: i === active ? "rgba(var(--rgb),0.92)" : "rgba(var(--rgb),0.42)" }}>
                {p.title.replace("\n", " ")}
              </span>
              <span className="ml-auto font-nunito font-light flex-shrink-0"
                style={{ fontSize: "0.72rem", color: i === active ? "rgba(201,169,110,0.7)" : "rgba(var(--rgb),0.2)" }}>
                {p.year}
              </span>
            </button>
          ))}
        </div>

        {/* Active project detail */}
        <div className="mt-4 pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease }}
              className="flex flex-col gap-4 pt-1"
            >
              <div className="flex items-center gap-3">
                <span className="font-poppins font-medium"
                  style={{ fontSize: "0.68rem", letterSpacing: "0.35em", color: "rgba(201,169,110,0.8)" }}>
                  {project.category}
                </span>
                <span style={{ color: "rgba(var(--rgb),0.2)", fontSize: "0.77rem" }}>·</span>
                <span className="font-nunito font-light"
                  style={{ fontSize: "0.84rem", color: "rgba(var(--rgb),0.45)" }}>
                  {project.company}
                </span>
              </div>
              <p className="font-nunito font-light leading-[1.8]"
                style={{ fontSize: "0.95rem", color: "rgba(var(--rgb),0.7)" }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-[5px]">
                {project.tech.map((t) => (
                  <TechBadge key={t} name={t} fontSize="0.68rem" padding="3px 8px" />
                ))}
              </div>
              <div className="flex gap-3">
                {project.links.live ? (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                    className="font-poppins font-semibold flex items-center gap-2 px-5 py-[11px] bg-accent text-bg-primary btn-glow"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.25em" }}>
                    {T.projects.viewProject[lang]}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </a>
                ) : (
                  <span className="font-poppins font-medium flex items-center gap-2 px-5 py-[11px]"
                    style={{
                      fontSize: "0.7rem", letterSpacing: "0.25em",
                      border: "1px solid rgba(var(--rgb),0.1)", color: "rgba(var(--rgb),0.28)", cursor: "default"
                    }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    {T.projects.privateNda[lang]}
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── DESKTOP layout (original) ── */}
      <div className="relative hidden lg:flex w-full max-w-[1680px] mx-auto h-full flex-col"
        style={{ paddingLeft: "clamp(1.5rem, 7vw, 112px)", paddingRight: "clamp(1.5rem, 7vw, 112px)", paddingTop: "52px", paddingBottom: "36px" }}>

        {/* Header */}
        <div className="flex items-end justify-between mb-6 flex-shrink-0">
          <div>
            <motion.p
              className="font-poppins font-semibold text-accent mb-2"
              style={{ fontSize: "0.72rem", letterSpacing: "0.5em" }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            >
              {T.projects.sectionLabel[lang]}
            </motion.p>
            <motion.h2
              className="font-poppins font-extrabold text-white leading-[0.9]"
              style={{ fontSize: "clamp(1.8rem, 3.1vw, 3.5rem)", letterSpacing: "-0.02em" }}
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, ease }}
            >
              {T.projects.heading1[lang]} <span className="text-accent">{T.projects.heading2[lang]}</span>
            </motion.h2>
          </div>

          {/* Project counter */}
          <motion.div
            className="font-poppins font-light flex items-baseline gap-1"
            style={{ color: "rgba(var(--rgb),0.25)" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            <span className="text-accent font-semibold" style={{ fontSize: "1.6rem" }}>
              {String(active + 1).padStart(2, "0")}
            </span>
            <span style={{ fontSize: "0.97rem" }}>/</span>
            <span style={{ fontSize: "0.97rem" }}>{String(PROJECTS.length).padStart(2, "0")}</span>
          </motion.div>
        </div>

        {/* Main content */}
        <div className="flex-1 grid grid-cols-[1fr_1.1fr] gap-6 xl:gap-10 min-h-0">

          {/* ── LEFT: Info ── */}
          <div className="flex flex-col justify-center min-h-0">

            {/* Project tabs */}
            <div className="flex flex-col gap-[3px] mb-5 flex-shrink-0">
              {PROJECTS.map((p, i) => (
                <motion.button
                  key={p.num}
                  onClick={() => setActive(i)}
                  className="flex items-center gap-4 px-3 py-[9px] text-left transition-all duration-300 group"
                  style={{
                    borderLeft: `2px solid ${i === active ? "#c9a96e" : "rgba(var(--rgb),0.08)"}`,
                    background: i === active ? "rgba(201,169,110,0.06)" : "transparent",
                  }}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.15 }}
                >
                  <span
                    className="font-poppins font-semibold transition-colors duration-300"
                    style={{
                      fontSize: "0.68rem",
                      letterSpacing: "0.3em",
                      color: i === active ? "#c9a96e" : "rgba(var(--rgb),0.3)",
                    }}
                  >
                    {p.num}
                  </span>
                  <span
                    className="font-poppins font-semibold transition-colors duration-300 truncate"
                    style={{
                      fontSize: "0.86rem",
                      color: i === active ? "rgba(var(--rgb),0.92)" : "rgba(var(--rgb),0.42)",
                    }}
                  >
                    {p.title.replace("\n", " ")}
                  </span>
                  <span
                    className="ml-auto font-nunito font-light flex-shrink-0 hidden sm:block transition-colors duration-300"
                    style={{
                      fontSize: "0.75rem",
                      color: i === active ? "rgba(201,169,110,0.7)" : "rgba(var(--rgb),0.2)",
                    }}
                  >
                    {p.year}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Active project detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
                className="flex flex-col gap-4"
              >
                {/* Category + company */}
                <div className="flex items-center gap-3">
                  <span
                    className="font-poppins font-medium"
                    style={{ fontSize: "0.69rem", letterSpacing: "0.38em", color: "rgba(201,169,110,0.8)" }}
                  >
                    {project.category}
                  </span>
                  <span style={{ color: "rgba(var(--rgb),0.2)", fontSize: "0.77rem" }}>·</span>
                  <span
                    className="font-nunito font-light"
                    style={{ fontSize: "0.86rem", color: "rgba(var(--rgb),0.45)" }}
                  >
                    {project.company}
                  </span>
                </div>

                {/* Description */}
                <p
                  className="font-nunito font-light leading-[1.85]"
                  style={{ fontSize: "0.97rem", color: "rgba(var(--rgb),0.7)", maxWidth: "420px" }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-[6px]">
                  {project.tech.map((t) => (
                    <TechBadge key={t} name={t} />
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-1">
                  {project.links.live ? (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-poppins font-semibold flex items-center gap-2 px-5 py-[10px] bg-accent hover:bg-accent-dim text-bg-primary transition-colors duration-300 btn-glow"
                      style={{ fontSize: "0.72rem", letterSpacing: "0.28em" }}
                    >
                      {T.projects.viewProject[lang]}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    </a>
                  ) : (
                    <span
                      className="font-poppins font-medium flex items-center gap-2 px-5 py-[10px]"
                      style={{
                        fontSize: "0.72rem",
                        letterSpacing: "0.28em",
                        border: "1px solid rgba(var(--rgb),0.1)",
                        color: "rgba(var(--rgb),0.28)",
                        cursor: "default",
                      }}
                      title="Proyecto privado / NDA"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      {T.projects.privateNda[lang]}
                    </span>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-poppins font-medium flex items-center gap-2 px-5 py-[10px] transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                      style={{
                        fontSize: "0.72rem",
                        letterSpacing: "0.28em",
                        border: "1px solid rgba(var(--rgb),0.1)",
                        color: "rgba(var(--rgb),0.5)",
                      }}
                    >
                      GITHUB
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Visual ── */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center min-h-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            {/* Outer frame */}
            <div
              className="relative w-full h-full max-h-[480px]"
              style={{
                border: "1px solid rgba(201,169,110,0.12)",
                background: "rgba(var(--rgb),0.04)",
              }}
            >
              {/* Corner accents */}
              {[
                "top-0 left-0 border-t border-l",
                "top-0 right-0 border-t border-r",
                "bottom-0 left-0 border-b border-l",
                "bottom-0 right-0 border-b border-r",
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-4 h-4 ${cls}`}
                  style={{ borderColor: "rgba(201,169,110,0.5)" }}
                />
              ))}

              {/* Project number watermark */}
              <div
                className="absolute top-4 right-5 font-poppins font-extrabold select-none pointer-events-none"
                style={{ fontSize: "4rem", color: "rgba(201,169,110,0.05)", letterSpacing: "-0.05em", lineHeight: 1 }}
              >
                {project.num}
              </div>

              {/* SVG visual */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="w-full h-full p-6 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <ProjectVisual type={project.visual} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Glow behind visual */}
            <div
              className="absolute inset-0 pointer-events-none -z-10"
              style={{ background: "radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%)" }}
            />
          </motion.div>
        </div>

        {/* Bottom nav dots */}
        <div className="flex items-center gap-3 mt-4 flex-shrink-0">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Project ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === active ? "28px" : "6px",
                height: "2px",
                background: i === active ? "#c9a96e" : "rgba(var(--rgb),0.2)",
                borderRadius: "1px",
              }}
            />
          ))}
          <div className="flex-1 h-px bg-white/[0.06] ml-2" />
        </div>
      </div>
    </section>
  );
}
