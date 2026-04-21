// No "use client" — renders on server, visible before JS hydrates
// Animations run on the GPU compositor thread, zero JS cost

const ORBS = [
  // color (rgb),           w,    h,    top,    left,   blur, opacity, anim,         dur,   delay
  { c: "215,155,65",  w: 700, h: 500, t: "-10%", l: "-8%",  blur: 110, op: 0.65, a: "aurora-1", d: "20s", delay: "0s"   },
  { c: "201,130,45",  w: 500, h: 420, t:  "5%",  l: "55%",  blur:  85, op: 0.55, a: "aurora-2", d: "16s", delay: "-5s"  },
  { c: "20,75,145",   w: 650, h: 520, t: "55%",  l: "45%",  blur: 100, op: 0.60, a: "aurora-3", d: "24s", delay: "-8s"  },
  { c: "15,115,125",  w: 560, h: 420, t: "50%",  l: "-5%",  blur:  90, op: 0.55, a: "aurora-4", d: "19s", delay: "-3s"  },
  { c: "95,40,135",   w: 420, h: 360, t: "25%",  l: "35%",  blur:  80, op: 0.45, a: "aurora-1", d: "27s", delay: "-12s" },
  { c: "25,90,85",    w: 480, h: 390, t: "30%",  l: "-2%",  blur:  85, op: 0.50, a: "aurora-2", d: "22s", delay: "-7s"  },
] as const;

export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: "var(--bg-primary)",
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="aurora-orb"
          style={{
            width: orb.w,
            height: orb.h,
            top: orb.t,
            left: orb.l,
            filter: `blur(${orb.blur}px)`,
            opacity: orb.op,
            background: `radial-gradient(ellipse at 50% 50%, rgb(${orb.c}) 0%, transparent 70%)`,
            animationName: orb.a,
            animationDuration: orb.d,
            animationDelay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
