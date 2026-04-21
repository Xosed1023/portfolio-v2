"use client";

import { useTheme } from "@/contexts/ThemeContext";

interface Props {
  /** Extra classes forwarded to the wrapper/button */
  className?: string;
  /** "sidebar" = vertical layout with label; "icon" = icon-only (mobile header) */
  variant?: "sidebar" | "icon";
}

export default function ThemeToggle({ className = "", variant = "sidebar" }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleTheme(e.clientX, e.clientY);
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
        className={`flex items-center justify-center w-9 h-9 transition-colors duration-300
                    hover:text-accent rounded-sm ${className}`}
        style={{ color: "rgba(var(--rgb), 0.55)" }}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      className={`flex flex-col items-center gap-[5px] py-3 px-2 transition-all duration-300
                  rounded-sm group ${className}`}
    >
      <span
        className="transition-colors duration-300 group-hover:text-accent"
        style={{ color: "rgba(var(--rgb), 0.50)" }}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </span>
      <span
        className="font-poppins font-semibold transition-colors duration-300 group-hover:text-accent"
        style={{
          fontSize: "0.46rem",
          letterSpacing: "0.3em",
          color: "rgba(var(--rgb), 0.42)",
        }}
      >
        {isDark ? "LIGHT" : "DARK"}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="7.05" y2="7.05" />
      <line x1="16.95" y1="16.95" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="7.05" y2="16.95" />
      <line x1="16.95" y1="7.05" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
