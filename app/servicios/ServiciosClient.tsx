"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import AuroraBackground from "@/components/AuroraBackground";
import TransitionLink from "@/components/TransitionLink";
import WEB_PROJECTS from "@/lib/web-projects";

const ease = [0.22, 1, 0.36, 1] as const;
const PX   = "clamp(1.5rem, 7vw, 112px)";

/* ── Data — real projects from lib/web-projects.ts ── */

const STATUS_LABELS: Record<string, string> = {
  live: "Live",
  development: "En desarrollo",
  soon: "Próximamente",
};

const CATEGORIES = ["Todos", ...Array.from(new Set(WEB_PROJECTS.map(p => STATUS_LABELS[p.status])))];

const PROJECTS = WEB_PROJECTS.map(p => ({
  id:       p.id,
  title:    p.name,
  category: STATUS_LABELS[p.status],
  desc:     p.description,
  tech:     p.tech,
  accent:   p.color,
  mockup:   p.visual,
  notion:   p.url ?? "",
  image:    p.image,
  status:   p.status,
}));

const STEPS = [
  { num: "01", title: "Consulta",   desc: "Hablamos de tu negocio y objetivos. Sin costo." },
  { num: "02", title: "Propuesta",  desc: "Wireframe y presupuesto detallado en 48 horas." },
  { num: "03", title: "Desarrollo", desc: "Construyo con actualizaciones semanales para tu aprobación." },
  { num: "04", title: "Entrega",    desc: "Publicamos, configuro el dominio y te enseño a administrarlo." },
];

/* ── Mockup SVGs ─────────────────────────────────── */
function Mockup({ type, accent: a }: { type: string; accent: string }) {
  const dim  = "rgba(255,255,255,0.06)";
  const line = "rgba(255,255,255,0.1)";
  if (type === "restaurant") return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <rect width="400" height="240" fill="rgba(18,10,4,0.97)" rx="6"/>
      <rect width="400" height="48" fill={`${a}18`} rx="6"/>
      <rect x="16" y="14" width="56" height="18" rx="3" fill={`${a}40`}/>
      <rect x="154" y="16" width="92" height="14" rx="3" fill="rgba(255,255,255,0.07)"/>
      <rect x="330" y="13" width="54" height="20" rx="10" fill={a}/>
      <rect x="0" y="48" width="400" height="90" fill={`${a}10`}/>
      <rect x="134" y="66" width="132" height="10" rx="5" fill={`${a}80`}/>
      <rect x="154" y="82" width="92" height="6" rx="3" fill="rgba(255,255,255,0.18)"/>
      <rect x="164" y="96" width="72" height="20" rx="10" fill={a}/>
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={14+i*126} y="152" width="112" height="76" rx="5" fill={dim} stroke={line} strokeWidth="1"/>
          <rect x={14+i*126} y="152" width="112" height="44" rx="5" fill={`${a}14`}/>
          <rect x={22+i*126} y="202" width="64" height="6" rx="3" fill="rgba(255,255,255,0.18)"/>
          <rect x={22+i*126} y="212" width="42" height="4" rx="2" fill={`${a}55`}/>
        </g>
      ))}
    </svg>
  );
  if (type === "ecommerce") return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <rect width="400" height="240" fill="rgba(4,4,14,0.97)" rx="6"/>
      <rect width="400" height="40" fill="rgba(255,255,255,0.03)" rx="6"/>
      <rect x="16" y="12" width="48" height="14" rx="3" fill={`${a}45`}/>
      <rect x="158" y="13" width="84" height="12" rx="3" fill="rgba(255,255,255,0.06)"/>
      <rect x="352" y="10" width="32" height="18" rx="4" fill={`${a}28`}/>
      {["T","N","S","P"].map((_,i) => (
        <rect key={i} x={14+i*70} y="52" width="58" height="18" rx="9" fill={i===0?a:"rgba(255,255,255,0.04)"} opacity={i===0?1:0.6}/>
      ))}
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={14+(i%2)*196} y={82+Math.floor(i/2)*74} width="178" height="62" rx="5" fill={dim} stroke={line} strokeWidth="1"/>
          <rect x={14+(i%2)*196} y={82+Math.floor(i/2)*74} width="178" height="36" rx="5" fill={`${a}${i===0?"22":"10"}`}/>
          <rect x={22+(i%2)*196} y={124+Math.floor(i/2)*74} width="76" height="6" rx="3" fill="rgba(255,255,255,0.18)"/>
          <rect x={22+(i%2)*196} y={133+Math.floor(i/2)*74} width="48" height="5" rx="2.5" fill={`${a}65`}/>
        </g>
      ))}
    </svg>
  );
  if (type === "landing") return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <defs><radialGradient id="lg1" cx="50%" cy="25%"><stop offset="0%" stopColor={a} stopOpacity="0.13"/><stop offset="100%" stopColor="transparent"/></radialGradient></defs>
      <rect width="400" height="240" fill="rgba(4,4,4,0.97)" rx="6"/>
      <rect width="400" height="240" fill="url(#lg1)" rx="6"/>
      <rect x="16" y="13" width="38" height="14" rx="3" fill={`${a}45`}/>
      {[0,1,2,3].map(i => <rect key={i} x={90+i*58} y="14" width="44" height="12" rx="3" fill="rgba(255,255,255,0.07)"/>)}
      <rect x="340" y="11" width="44" height="18" rx="9" fill={a}/>
      <rect x="96" y="50" width="208" height="10" rx="5" fill={`${a}55`}/>
      <rect x="46" y="66" width="308" height="18" rx="4" fill="rgba(255,255,255,0.88)"/>
      <rect x="68" y="90" width="264" height="14" rx="4" fill="rgba(255,255,255,0.45)"/>
      <rect x="118" y="114" width="80" height="18" rx="9" fill="rgba(255,255,255,0.07)" stroke={`${a}45`} strokeWidth="1"/>
      <rect x="208" y="114" width="74" height="18" rx="9" fill={a}/>
      <rect x="0" y="146" width="400" height="1" fill="rgba(255,255,255,0.05)"/>
      {[0,1,2].map(i => (
        <g key={i}><rect x={38+i*116} y="156" width="52" height="12" rx="3" fill={`${a}65`}/><rect x={28+i*116} y="172" width="72" height="7" rx="3" fill="rgba(255,255,255,0.1)"/></g>
      ))}
      {[0,1,2].map(i => <rect key={i} x={14+i*130} y="194" width="116" height="36" rx="5" fill={dim} stroke={`${a}18`} strokeWidth="1"/>)}
    </svg>
  );
  if (type === "corporate") return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <rect width="400" height="240" fill="rgba(6,8,12,0.97)" rx="6"/>
      <rect x="16" y="13" width="42" height="14" rx="3" fill="rgba(255,255,255,0.14)"/>
      {[0,1,2,3].map(i => <rect key={i} x={100+i*62} y="14" width="48" height="12" rx="3" fill="rgba(255,255,255,0.05)"/>)}
      <rect x="336" y="11" width="48" height="18" rx="4" fill={`${a}35`} stroke={`${a}55`} strokeWidth="1"/>
      <rect x="0" y="42" width="208" height="116" fill={`${a}07`}/>
      <rect x="14" y="56" width="88" height="8" rx="4" fill={`${a}48`}/>
      <rect x="14" y="70" width="180" height="14" rx="4" fill="rgba(255,255,255,0.78)"/>
      <rect x="14" y="90" width="160" height="10" rx="4" fill="rgba(255,255,255,0.32)"/>
      <rect x="14" y="106" width="136" height="10" rx="4" fill="rgba(255,255,255,0.2)"/>
      <rect x="14" y="124" width="78" height="20" rx="10" fill={a}/>
      <rect x="208" y="42" width="192" height="116" fill={`${a}09`}/>
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={14+i*130} y="170" width="114" height="60" rx="5" fill={dim} stroke={line} strokeWidth="1"/>
          <rect x={22+i*130} y="178" width="22" height="22" rx="4" fill={`${a}22`}/>
          <rect x={22+i*130} y="206" width="78" height="6" rx="3" fill="rgba(255,255,255,0.18)"/>
          <rect x={22+i*130} y="216" width="58" height="5" rx="2.5" fill="rgba(255,255,255,0.09)"/>
        </g>
      ))}
    </svg>
  );
  if (type === "portfolio") return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <rect width="400" height="240" fill="rgba(6,4,8,0.97)" rx="6"/>
      <rect x="16" y="14" width="28" height="18" rx="3" fill={`${a}55`}/>
      {[0,1,2].map(i => <rect key={i} x={278+i*34} y="16" width="26" height="14" rx="3" fill="rgba(255,255,255,0.05)"/>)}
      <rect x="14" y="46" width="114" height="130" rx="5" fill={`${a}20`}/>
      <rect x="136" y="46" width="114" height="60" rx="5" fill={`${a}13`}/>
      <rect x="136" y="114" width="114" height="62" rx="5" fill={`${a}17`}/>
      <rect x="258" y="46" width="128" height="84" rx="5" fill={`${a}15`}/>
      <rect x="258" y="138" width="128" height="38" rx="5" fill={`${a}11`}/>
      <rect x="14" y="46" width="114" height="130" rx="5" fill="transparent" stroke={a} strokeWidth="1.5" opacity="0.45"/>
      <rect x="22" y="160" width="68" height="7" rx="3.5" fill="rgba(255,255,255,0.45)"/>
      <rect x="22" y="171" width="48" height="5" rx="2.5" fill={`${a}55`}/>
      <rect x="0" y="192" width="400" height="48" fill="rgba(255,255,255,0.02)" rx="6"/>
      <rect x="14" y="202" width="118" height="8" rx="4" fill="rgba(255,255,255,0.08)"/>
      <rect x="14" y="214" width="78" height="6" rx="3" fill={`${a}38`}/>
      <rect x="310" y="200" width="74" height="24" rx="12" fill={a}/>
    </svg>
  );
  if (type === "clinic") return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <rect width="400" height="240" fill="rgba(4,8,10,0.97)" rx="6"/>
      <rect x="16" y="13" width="42" height="14" rx="3" fill={`${a}45`}/>
      <rect x="298" y="11" width="86" height="18" rx="9" fill={a}/>
      <rect x="0" y="42" width="222" height="106" fill={`${a}07`}/>
      <rect x="14" y="54" width="98" height="9" rx="4" fill={`${a}55`}/>
      <rect x="14" y="69" width="196" height="14" rx="4" fill="rgba(255,255,255,0.7)"/>
      <rect x="14" y="89" width="176" height="9" rx="4" fill="rgba(255,255,255,0.3)"/>
      <rect x="222" y="42" width="178" height="106" rx="5" fill="rgba(255,255,255,0.03)" stroke={`${a}28`} strokeWidth="1"/>
      <rect x="234" y="52" width="78" height="7" rx="3.5" fill={`${a}55`}/>
      {[0,1,2].map(i => <rect key={i} x="234" y={65+i*22} width="154" height="14" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.09)" strokeWidth="1"/>)}
      <rect x="234" y="130" width="154" height="10" rx="5" fill={a}/>
      {[0,1,2,3].map(i => (
        <g key={i}>
          <circle cx={24+i*92} cy={188} r="22" fill={`${a}16`} stroke={`${a}22`} strokeWidth="1"/>
          <rect x={6+i*92} y={215} width="36" height="7" rx="3.5" fill="rgba(255,255,255,0.18)"/>
          <rect x={10+i*92} y={226} width="28" height="5" rx="2.5" fill={`${a}45`}/>
        </g>
      ))}
    </svg>
  );
  if (type === "course") return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <defs><radialGradient id="cg1" cx="50%" cy="20%"><stop offset="0%" stopColor={a} stopOpacity="0.1"/><stop offset="100%" stopColor="transparent"/></radialGradient></defs>
      <rect width="400" height="240" fill="rgba(4,6,4,0.97)" rx="6"/>
      <rect width="400" height="240" fill="url(#cg1)" rx="6"/>
      <rect x="16" y="13" width="42" height="14" rx="3" fill={`${a}45`}/>
      <rect x="328" y="11" width="56" height="18" rx="9" fill={a}/>
      <rect x="58" y="44" width="284" height="10" rx="5" fill={`${a}55`}/>
      <rect x="38" y="60" width="324" height="16" rx="4" fill="rgba(255,255,255,0.83)"/>
      <rect x="58" y="82" width="284" height="10" rx="5" fill="rgba(255,255,255,0.38)"/>
      <rect x="100" y="102" width="200" height="96" rx="8" fill={`${a}13`} stroke={`${a}28`} strokeWidth="1"/>
      <circle cx="200" cy="150" r="22" fill={`${a}28`} stroke={a} strokeWidth="1.5"/>
      <polygon points="193,139 193,161 215,150" fill={a}/>
      <rect x="100" y="206" width="200" height="4" rx="2" fill="rgba(255,255,255,0.07)"/>
      <rect x="100" y="206" width="130" height="4" rx="2" fill={a}/>
      <rect x="100" y="214" width="80" height="6" rx="3" fill="rgba(255,255,255,0.18)"/>
      <rect x="244" y="212" width="56" height="10" rx="5" fill={`${a}38`}/>
    </svg>
  );
  if (type === "church") return (
    <svg viewBox="0 0 440 260" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="scg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`${a}18`}/><stop offset="100%" stopColor={`${a}04`}/>
        </linearGradient>
        <radialGradient id="scglow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={`${a}25`}/><stop offset="100%" stopColor={`${a}00`}/>
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="440" height="160" fill="url(#scg1)"/>
      <rect x="0" y="0" width="440" height="160" fill="url(#scglow)"/>
      <rect x="210" y="28" width="20" height="72" rx="2" fill={`${a}55`}/>
      <rect x="190" y="48" width="60" height="16" rx="2" fill={`${a}55`}/>
      <rect x="100" y="112" width="240" height="10" rx="2" fill="rgba(255,255,255,0.55)"/>
      <rect x="140" y="128" width="160" height="6" rx="2" fill={`${a}50`}/>
      <rect x="0" y="0" width="440" height="22" fill="rgba(0,0,0,0.55)"/>
      {[60,120,180,240,300].map(x => (<rect key={x} x={x} y="8" width="40" height="5" rx="2" fill="rgba(255,255,255,0.18)"/>))}
      <rect x="14" y="7" width="32" height="7" rx="2" fill={`${a}70`}/>
      <rect x="172" y="144" width="96" height="22" rx="2" fill={`${a}80`}/>
      {[14,158,302].map(x => (<rect key={x} x={x} y="172" width="124" height="72" rx="3" fill="rgba(255,255,255,0.04)" stroke={`${a}20`} strokeWidth="1"/>))}
      {[14,158,302].map(x => (<g key={x}><rect x={x+10} y="184" width="60" height="5" rx="2" fill={`${a}45`}/><rect x={x+10} y="196" width="100" height="4" rx="2" fill="rgba(255,255,255,0.15)"/></g>))}
    </svg>
  );
  if (type === "psychology") return (
    <svg viewBox="0 0 440 260" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="spg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`${a}12`}/><stop offset="100%" stopColor={`${a}03`}/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="440" height="22" fill="rgba(255,255,255,0.04)"/>
      {[80,160,240,320].map(x => (<rect key={x} x={x} y="8" width="50" height="5" rx="2" fill="rgba(255,255,255,0.14)"/>))}
      <rect x="14" y="6" width="44" height="9" rx="3" fill={`${a}60`}/>
      <rect x="0" y="22" width="240" height="140" fill="url(#spg1)"/>
      <rect x="240" y="22" width="200" height="140" fill="rgba(255,255,255,0.025)"/>
      <rect x="20" y="42" width="180" height="10" rx="3" fill="rgba(255,255,255,0.5)"/>
      <rect x="20" y="58" width="200" height="8" rx="2" fill="rgba(255,255,255,0.35)"/>
      <rect x="20" y="72" width="160" height="6" rx="2" fill="rgba(255,255,255,0.2)"/>
      <rect x="20" y="100" width="90" height="20" rx="3" fill={`${a}70`}/>
      <circle cx="340" cy="80" r="48" fill={`${a}08`} stroke={`${a}20`} strokeWidth="1"/>
      <circle cx="340" cy="65" r="18" fill={`${a}15`}/>
      <ellipse cx="340" cy="100" rx="28" ry="22" fill={`${a}10`}/>
      {[14,162,310].map(x => (<g key={x}><rect x={x} y="185" width="118" height="64" rx="3" fill="rgba(255,255,255,0.04)" stroke={`${a}18`} strokeWidth="1"/><circle cx={x+24} cy={205} r="12" fill={`${a}12`}/></g>))}
    </svg>
  );
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <rect width="400" height="240" fill="rgba(10,8,6,0.98)" rx="6"/>
      <rect x="16" y="14" width="42" height="14" rx="3" fill="rgba(255,255,255,0.28)"/>
      <rect x="168" y="15" width="64" height="12" rx="3" fill="rgba(255,255,255,0.07)"/>
      <rect x="338" y="12" width="46" height="18" rx="4" fill={`${a}38`} stroke={`${a}55`} strokeWidth="1"/>
      <rect x="0" y="42" width="202" height="128" fill={`${a}09`}/>
      <circle cx="100" cy="106" r="48" fill={`${a}14`} stroke={`${a}28`} strokeWidth="1"/>
      <circle cx="100" cy="106" r="28" fill={`${a}18`} stroke={`${a}38`} strokeWidth="1"/>
      <rect x="210" y="50" width="88" height="8" rx="4" fill={`${a}45`}/>
      <rect x="210" y="64" width="172" height="16" rx="4" fill="rgba(255,255,255,0.72)"/>
      <rect x="210" y="86" width="152" height="8" rx="4" fill="rgba(255,255,255,0.28)"/>
      <rect x="210" y="100" width="132" height="8" rx="4" fill="rgba(255,255,255,0.18)"/>
      <rect x="210" y="118" width="58" height="8" rx="4" fill={`${a}65`}/>
      <rect x="210" y="134" width="98" height="22" rx="11" fill={a}/>
      <rect x="318" y="134" width="62" height="22" rx="11" fill="rgba(255,255,255,0.04)" stroke={`${a}38`} strokeWidth="1"/>
      {[0,1,2,3].map(i => (
        <rect key={i} x={14+i*96} y="182" width="82" height="48" rx="5" fill={`${a}${i===0?"22":"10"}`} stroke={i===0?a:"rgba(255,255,255,0.07)"} strokeWidth={i===0?"1.5":"1"}/>
      ))}
    </svg>
  );
}

/* ── Project Card ─────────────────────────────────── */
function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.article layout
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${hovered ? project.accent+"45" : "rgba(255,255,255,0.08)"}`, transition: "border-color 0.3s, box-shadow 0.3s", boxShadow: hovered ? `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${project.accent}18 inset` : "none" }}>
      {/* Preview */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", background: "rgba(0,0,0,0.5)" }}>
        {project.image && project.status === "live"
          ? <img src={project.image} alt={project.title} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" style={{ filter: "brightness(0.75)" }} />
          : <Mockup type={project.mockup} accent={project.accent} />
        }
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.2 }}
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}>
          <a href="https://wa.me/573165782144" target="_blank" rel="noopener noreferrer"
             className="font-poppins font-semibold text-black px-6 py-[9px] w-44 text-center transition-opacity duration-200 hover:opacity-90"
             style={{ background: project.accent, fontSize: "0.58rem", letterSpacing: "0.26em" }}>
            QUIERO ALGO ASÍ
          </a>
          {project.notion ? (
            <a href={project.notion} target="_blank" rel="noopener noreferrer"
               className="font-poppins font-semibold flex items-center justify-center gap-[6px] px-6 py-[9px] w-44 transition-all duration-200 hover:bg-white/10"
               style={{ fontSize: "0.58rem", letterSpacing: "0.26em", border: `1px solid ${project.accent}66`, color: project.accent }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              VER PROYECTO
            </a>
          ) : (
            <span className="font-poppins font-medium flex items-center justify-center gap-[6px] px-6 py-[9px] w-44 cursor-default"
                  style={{ fontSize: "0.58rem", letterSpacing: "0.26em", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.3)" }}>
              VER PROYECTO
            </span>
          )}
        </motion.div>
      </div>
      {/* Info */}
      <div className="p-4 flex flex-col gap-[6px]">
        <span className="font-poppins font-semibold" style={{ fontSize: "0.55rem", letterSpacing: "0.35em", color: project.accent }}>
          {project.category.toUpperCase()}
        </span>
        <h3 className="font-poppins font-bold text-white" style={{ fontSize: "0.9rem", letterSpacing: "-0.01em" }}>
          {project.title}
        </h3>
        <p className="font-nunito font-light" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-[4px] mt-1">
          {project.tech.map(t => (
            <span key={t} className="font-poppins font-medium"
                  style={{ fontSize: "0.52rem", letterSpacing: "0.12em", padding: "2px 6px", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.35)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ── Main ─────────────────────────────────────────── */
export default function ServiciosClient() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const filtered = activeFilter === "Todos" ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <>
      {/* Aurora + noise — same as portfolio */}
      <AuroraBackground />
      <div className="noise-texture" aria-hidden="true" />

      {/* Fixed header — outside scroll container */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 py-4"
                style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <TransitionLink href="/" className="flex items-center gap-2 group">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="text-white/35 group-hover:text-accent transition-colors duration-200">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-poppins font-medium text-white/35 group-hover:text-white transition-colors duration-200"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}>PORTFOLIO</span>
          </TransitionLink>

          <span className="font-poppins font-extrabold text-accent" style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}>XP</span>

          <a href="https://wa.me/573165782144" target="_blank" rel="noopener noreferrer"
             className="font-poppins font-semibold flex items-center gap-2 px-4 py-[7px] transition-all duration-300 hover:bg-accent/10"
             style={{ fontSize: "0.6rem", letterSpacing: "0.3em", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            CONTACTAR
          </a>
        </header>

      {/* Scroll container — snap on desktop, normal on mobile */}
      <main id="svc-scroll" className="relative z-10 h-screen overflow-y-scroll overflow-x-hidden">

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col"
                 style={{ paddingTop: "80px", background: "rgba(6,6,6,0.55)" }}>
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
          <div className="absolute pointer-events-none"
               style={{ top: "-5%", right: "-5%", width: "55vw", height: "70vh",
                        background: "radial-gradient(ellipse, rgba(201,169,110,0.06) 0%, transparent 65%)" }}/>

          {/* Main content — top */}
          <div className="relative flex-1 flex flex-col justify-center"
               style={{ paddingLeft: PX, paddingRight: PX, paddingTop: "clamp(2rem, 5vh, 4rem)", paddingBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}>
            <motion.p className="font-poppins font-semibold text-accent mb-3"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.55em" }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease }}>
              DISEÑO &amp; DESARROLLO WEB
            </motion.p>
            <motion.h1 className="font-poppins font-extrabold text-white leading-[0.92] mb-5"
                       style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)", letterSpacing: "-0.03em" }}
                       initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.8, delay: 0.08, ease }}>
              Páginas web que<br /><span className="text-accent">convierten</span><br />visitas en clientes.
            </motion.h1>
            <motion.p className="font-nunito font-light mb-8"
                      style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)", color: "rgba(255,255,255,0.52)", lineHeight: 1.75, maxWidth: "480px" }}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.18, ease }}>
              Más de 10 años construyendo productos digitales de alto impacto.
              Diseño premium, código limpio y resultados medibles.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.28, ease }}>
              <button onClick={() => document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="font-poppins font-semibold text-black px-8 py-3 transition-opacity duration-200 hover:opacity-85"
                style={{ background: "#c9a96e", fontSize: "0.68rem", letterSpacing: "0.3em" }}>
                VER PROYECTOS
              </button>
              <a href="https://wa.me/573165782144" target="_blank" rel="noopener noreferrer"
                 className="font-poppins font-semibold px-8 py-3 transition-all duration-300 hover:bg-white/5"
                 style={{ border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.65)", fontSize: "0.68rem", letterSpacing: "0.3em" }}>
                HABLEMOS
              </a>
            </motion.div>
          </div>

          {/* Stats — pinned to bottom */}
          <motion.div className="relative flex flex-wrap gap-10 flex-shrink-0"
                      style={{ paddingLeft: PX, paddingRight: PX, paddingTop: "clamp(1.2rem, 2.5vh, 2rem)", paddingBottom: "clamp(1.5rem, 3vh, 2.5rem)", borderTop: "1px solid rgba(255,255,255,0.07)" }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45, ease }}>
            {[["10+","Años de experiencia"],["50+","Proyectos entregados"],["100%","Clientes satisfechos"]].map(([v,l]) => (
              <div key={l}>
                <div className="font-poppins font-extrabold text-accent" style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)", letterSpacing: "-0.02em" }}>{v}</div>
                <div className="font-nunito font-light" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.38)" }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="proyectos" className="relative py-20"
                 style={{ scrollMarginTop: "80px", background: "rgba(6,6,6,0.72)" }}>
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
          <div className="absolute pointer-events-none"
               style={{ bottom: "0", left: "10%", width: "50vw", height: "50vh",
                        background: "radial-gradient(ellipse, rgba(201,169,110,0.04) 0%, transparent 65%)" }}/>
          <div className="relative" style={{ paddingLeft: PX, paddingRight: PX }}>
            <motion.p className="font-poppins font-semibold text-accent mb-2"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.5em" }}
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              MUESTRA DE TRABAJO
            </motion.p>
            <motion.h2 className="font-poppins font-extrabold text-white mb-10"
                       style={{ fontSize: "clamp(2rem, 4vw, 3.8rem)", letterSpacing: "-0.02em", lineHeight: 0.95 }}
                       initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              Proyectos de referencia
            </motion.h2>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveFilter(cat)}
                  className="font-poppins font-medium transition-all duration-200 px-3 py-[6px]"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.22em", border: "1px solid",
                           borderColor: activeFilter === cat ? "rgba(201,169,110,0.55)" : "rgba(255,255,255,0.1)",
                           background: activeFilter === cat ? "rgba(201,169,110,0.1)" : "transparent",
                           color: activeFilter === cat ? "#c9a96e" : "rgba(255,255,255,0.42)" }}>
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="relative py-20"
                 style={{ background: "rgba(6,6,6,0.6)" }}>
          <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
          <div className="relative" style={{ paddingLeft: PX, paddingRight: PX }}>
            <motion.p className="font-poppins font-semibold text-accent mb-2"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.5em" }}
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              CÓMO TRABAJAMOS
            </motion.p>
            <motion.h2 className="font-poppins font-extrabold text-white mb-14"
                       style={{ fontSize: "clamp(2rem, 4vw, 3.8rem)", letterSpacing: "-0.02em", lineHeight: 0.95 }}
                       initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              Del concepto a la entrega
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {STEPS.map((step, i) => (
                <motion.div key={step.num}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease }}>
                  <div className="font-poppins font-extrabold mb-4"
                       style={{ fontSize: "2.2rem", letterSpacing: "-0.03em", color: "rgba(201,169,110,0.25)" }}>
                    {step.num}
                  </div>
                  <div className="h-px mb-4" style={{ background: "rgba(201,169,110,0.2)" }} />
                  <h3 className="font-poppins font-bold text-white mb-2" style={{ fontSize: "0.95rem" }}>{step.title}</h3>
                  <p className="font-nunito font-light" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.72 }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center"
                 style={{ background: "rgba(6,6,6,0.55)" }}>
          <div className="absolute inset-0 grid-bg opacity-18 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none"
               style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 60%)" }}/>
          <div className="relative text-center w-full" style={{ paddingLeft: PX, paddingRight: PX, paddingTop: "clamp(4rem,8vh,6rem)", paddingBottom: "clamp(4rem,8vh,6rem)" }}>
            <motion.p className="font-poppins font-semibold text-accent mb-4"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.55em" }}
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              ¿LISTO PARA EMPEZAR?
            </motion.p>
            <motion.h2 className="font-poppins font-extrabold text-white mb-5"
                       style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 0.92 }}
                       initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
              Hablemos de<br /><span className="text-accent">tu proyecto.</span>
            </motion.h2>
            <motion.p className="font-nunito font-light mb-10 mx-auto"
                      style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.42)", maxWidth: "420px", lineHeight: 1.8 }}
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                      transition={{ delay: 0.12, duration: 0.7 }}>
              Cuéntame tu idea y te envío una propuesta en 48 horas.
            </motion.p>
            <motion.div className="flex flex-wrap items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.22, duration: 0.7, ease }}>
              <a href="https://wa.me/573165782144" target="_blank" rel="noopener noreferrer"
                 className="font-poppins font-semibold text-black px-10 py-[14px] flex items-center gap-3 transition-opacity duration-200 hover:opacity-85"
                 style={{ background: "#c9a96e", fontSize: "0.68rem", letterSpacing: "0.3em" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WHATSAPP
              </a>
              <a href="mailto:xosedfabian@gmail.com"
                 className="font-poppins font-semibold px-10 py-[14px] transition-all duration-300 hover:bg-white/5"
                 style={{ border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.62)", fontSize: "0.68rem", letterSpacing: "0.3em" }}>
                EMAIL
              </a>
            </motion.div>
          </div>

          {/* Desktop footer bar — incrustado en la última sección */}
          <div className="hidden lg:flex absolute bottom-0 left-0 right-0 items-center justify-between"
               style={{ paddingLeft: PX, paddingRight: PX, paddingTop: "14px", paddingBottom: "18px",
                        borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(4,4,4,0.55)" }}>
            <span className="font-poppins font-extrabold text-accent" style={{ fontSize: "0.9rem", letterSpacing: "-0.02em" }}>XP</span>
            <span className="font-nunito font-light" style={{ fontSize: "0.66rem", color: "rgba(255,255,255,0.2)" }}>
              &copy; {new Date().getFullYear()} Xosed Peñaloza — Bogotá, Colombia
            </span>
            <TransitionLink href="/" className="font-poppins font-medium text-white/28 hover:text-accent transition-colors duration-200 flex items-center gap-2"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}>
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              PORTFOLIO
            </TransitionLink>
          </div>
        </section>

        {/* Mobile footer */}
        <footer className="lg:hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(4,4,4,0.95)" }}>
          <div className="flex flex-col items-center gap-3 py-6" style={{ paddingLeft: PX, paddingRight: PX }}>
            <span className="font-poppins font-extrabold text-accent" style={{ fontSize: "0.95rem", letterSpacing: "-0.02em" }}>XP</span>
            <span className="font-nunito font-light" style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.22)" }}>
              &copy; {new Date().getFullYear()} Xosed Peñaloza — Bogotá, Colombia
            </span>
            <TransitionLink href="/" className="font-poppins font-medium text-white/30 hover:text-accent transition-colors duration-200 flex items-center gap-2"
                  style={{ fontSize: "0.62rem", letterSpacing: "0.2em" }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              VOLVER AL PORTFOLIO
            </TransitionLink>
          </div>
        </footer>

      </main>
    </>
  );
}
