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
        document as Document & { startViewTransition?: (fn: () => void) => unknown }
      ).startViewTransition;

      if (vt) {
        vt.call(document, apply);
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
