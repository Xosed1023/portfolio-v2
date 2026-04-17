"use client";

import { createContext, useContext, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface TransitionCtx {
  navigate: (href: string) => void;
}

const Ctx = createContext<TransitionCtx>({ navigate: () => {} });

export function usePageTransition() {
  return useContext(Ctx);
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router     = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const busy       = useRef(false);

  const navigate = useCallback((href: string) => {
    if (busy.current) return;
    busy.current = true;
    const el = overlayRef.current;
    if (!el) { busy.current = false; return; }

    // 1. Corte a negro instantáneo — fuerza repaint antes de navegar
    el.style.transition    = "none";
    el.style.opacity       = "1";
    el.style.pointerEvents = "all";
    el.getBoundingClientRect(); // flush layout → garantiza que el negro pinta antes del router.push

    // 2. Navega
    router.push(href);

    // 3. Revela la nueva página con fade suave — espera que Next.js pinte el nuevo layout
    setTimeout(() => {
      requestAnimationFrame(() => {
        el.style.transition = "opacity 420ms ease";
        el.style.opacity    = "0";
        setTimeout(() => {
          el.style.pointerEvents = "none";
          busy.current = false;
        }, 420);
      });
    }, 150);
  }, [router]);

  return (
    <Ctx.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        9999,
          background:    "#0a0a0a",
          opacity:       0,
          pointerEvents: "none",
          willChange:    "opacity",
        }}
      />
    </Ctx.Provider>
  );
}
