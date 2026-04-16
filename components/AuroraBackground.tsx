"use client";

import { useEffect, useRef, useCallback } from "react";

interface Orb {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  color: readonly [number, number, number];
  /** Primary phase — main orbital drift */
  phase: number;
  phaseSpeed: number;
  /** Secondary phase — adds complexity to path */
  phase2: number;
  phase2Speed: number;
  /** Breathing phase — radius pulsation */
  breathe: number;
  breatheSpeed: number;
  ampX: number;
  ampY: number;
  /** Horizontal stretch (>1 = wide ellipse, <1 = tall) */
  scaleX: number;
  /** Base rotation of the ellipse */
  rotationSpeed: number;
  rotation: number;
}

const PALETTE: readonly (readonly [number, number, number])[] = [
  [215, 155,  65],  // warm gold        — accent match
  [201, 130,  45],  // amber
  [230, 175,  90],  // bright highlight gold
  [175,  80,  20],  // burnt sienna
  [160,  70,  25],  // copper
  [ 20,  75, 145],  // steel blue
  [ 15, 115, 125],  // deep teal
  [ 95,  40, 135],  // indigo-purple
  [105,  55, 155],  // violet
  [ 25,  90,  85],  // emerald teal
  [ 30,  85, 110],  // ocean blue
  [195, 100,  35],  // deep amber glow
];

function buildOrbs(w: number, h: number): Orb[] {
  return PALETTE.map((color, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const bx = (col / 3.5) * w + w * 0.05;
    const by = (row / 2.5) * h + h * 0.1;
    return {
      x: bx + (Math.random() - 0.5) * w * 0.3,
      y: by + (Math.random() - 0.5) * h * 0.3,
      baseX: bx,
      baseY: by,
      radius: Math.random() * 220 + 160,
      color,
      phase:       Math.random() * Math.PI * 2,
      phaseSpeed:  (Math.random() * 0.003 + 0.0012) * (i % 2 === 0 ? 1 : -1),
      phase2:      Math.random() * Math.PI * 2,
      phase2Speed: (Math.random() * 0.002 + 0.0008) * (i % 3 === 0 ? 1 : -1),
      breathe:      Math.random() * Math.PI * 2,
      breatheSpeed: Math.random() * 0.018 + 0.008,   // breathe 8-26× faster than orbit
      ampX: Math.random() * 0.22 + 0.12,
      ampY: Math.random() * 0.16 + 0.08,
      scaleX:       i % 3 === 0 ? 1.7 + Math.random() * 0.5
                  : i % 3 === 1 ? 0.7 + Math.random() * 0.3
                  : 1.1 + Math.random() * 0.3,
      rotationSpeed: (Math.random() * 0.0008 + 0.0002) * (i % 2 === 0 ? 1 : -1),
      rotation: Math.random() * Math.PI,
    };
  });
}

export default function AuroraBackground() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const orbsRef      = useRef<Orb[]>([]);
  const rafRef       = useRef<number>(0);
  const pausedRef    = useRef(false);  // true when tab hidden or reduced-motion

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    orbsRef.current = buildOrbs(canvas.width, canvas.height);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── prefers-reduced-motion: skip animation entirely ──────────────
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      // Paint a single static dark frame and stop
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      return;
    }

    init();

    const onResize    = () => init();
    const onMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave     = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    // ── Pause when tab is hidden, resume when visible ─────────────────
    const onVisibility = () => {
      pausedRef.current = document.hidden;
      if (!document.hidden && rafRef.current === 0) {
        // Re-kick the loop if it was cancelled
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize",     onResize);
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    const draw = () => {
      // Stop scheduling new frames while hidden; loop restarts in onVisibility
      if (pausedRef.current) {
        rafRef.current = 0;
        return;
      }

      const { width: w, height: h } = canvas;
      const { x: mx, y: my } = mouseRef.current;

      /* Longer trail = more atmospheric glow */
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(10,10,10,0.10)";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "screen";

      for (const orb of orbsRef.current) {
        /* ── Update phases ── */
        orb.phase        += orb.phaseSpeed;
        orb.phase2       += orb.phase2Speed;
        orb.breathe      += orb.breatheSpeed;
        orb.rotation     += orb.rotationSpeed;

        /* ── Breathing radius ── */
        const breatheFactor = 0.78 + 0.22 * Math.sin(orb.breathe);

        /* ── Complex orbital target (primary + secondary drift) ── */
        const targetX = orb.baseX
          + Math.sin(orb.phase)          * w * orb.ampX
          + Math.cos(orb.phase2 * 1.4)  * w * 0.06;
        const targetY = orb.baseY
          + Math.cos(orb.phase  * 0.68)  * h * orb.ampY
          + Math.sin(orb.phase2 * 0.85)  * h * 0.05;

        /* ── Mouse attraction ── */
        const dx   = mx - orb.x;
        const dy   = my - orb.y;
        const dist = Math.hypot(dx, dy);
        const pull = Math.max(0, 1 - dist / 700) * 0.005;

        /* ── Lerp toward target ── */
        orb.x += (targetX - orb.x) * 0.014 + dx * pull;
        orb.y += (targetY - orb.y) * 0.014 + dy * pull;

        /* ── Draw elliptical orb ── */
        const rad = orb.radius * breatheFactor;
        const [cr, cg, cb] = orb.color;

        ctx.save();
        ctx.translate(orb.x, orb.y);
        ctx.rotate(orb.rotation);
        ctx.scale(orb.scaleX, 1);

        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rad);
        g.addColorStop(0,    `rgba(${cr},${cg},${cb},0.18)`);
        g.addColorStop(0.40, `rgba(${cr},${cg},${cb},0.08)`);
        g.addColorStop(0.75, `rgba(${cr},${cg},${cb},0.02)`);
        g.addColorStop(1,    `rgba(${cr},${cg},${cb},0)`);

        ctx.beginPath();
        ctx.arc(0, 0, rad, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.restore();
      }

      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",     onResize);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed", inset: 0, zIndex: 0,
        display: "block", background: "#0a0a0a", pointerEvents: "none",
      }}
    />
  );
}
