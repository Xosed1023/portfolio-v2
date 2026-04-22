"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (x: number, y: number) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const initial: Theme = saved === "light" ? "light" : "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = useCallback(
    (x: number, y: number) => {
      const next: Theme = theme === "dark" ? "light" : "dark";

      document.documentElement.style.setProperty("--tx", `${x}px`);
      document.documentElement.style.setProperty("--ty", `${y}px`);

      const apply = () => {
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };

      // View Transitions API (progressive enhancement)
      const vt = (
        document as Document & {
          startViewTransition?: (fn: () => void) => { ready: Promise<void> };
        }
      ).startViewTransition;

      if (vt) {
        const transition = vt.call(document, apply);
        transition.ready.then(() => {
          const DURATION = 3000;
          // Extend the group lifetime so it doesn't cut our animation short
          document.documentElement.animate(
            [{ opacity: 1 }, { opacity: 1 }],
            { duration: DURATION, pseudoElement: "::view-transition-group(root)" }
          );
          // Circular reveal on the new state
          document.documentElement.animate(
            [
              { clipPath: `circle(0px at ${x}px ${y}px)` },
              { clipPath: `circle(200vmax at ${x}px ${y}px)` },
            ],
            {
              duration: DURATION,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        });
      } else {
        apply();
      }
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
