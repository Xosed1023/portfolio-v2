"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default function LangToggle({ className, style }: Props) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`flex items-center ${className ?? ""}`}
      style={style}
      role="group"
      aria-label="Language selector"
    >
      <button
        onClick={() => setLang("es")}
        className="font-poppins font-semibold transition-colors duration-200"
        style={{
          fontSize: "0.55rem",
          letterSpacing: "0.22em",
          color: lang === "es" ? "#c9a96e" : "rgba(var(--rgb),0.28)",
        }}
        aria-label="Cambiar a español"
        aria-pressed={lang === "es"}
      >
        ES
      </button>
      <span
        className="font-poppins mx-[5px]"
        style={{ fontSize: "0.49rem", color: "rgba(var(--rgb),0.16)", letterSpacing: 0 }}
        aria-hidden="true"
      >
        /
      </span>
      <button
        onClick={() => setLang("en")}
        className="font-poppins font-semibold transition-colors duration-200"
        style={{
          fontSize: "0.55rem",
          letterSpacing: "0.22em",
          color: lang === "en" ? "#c9a96e" : "rgba(var(--rgb),0.28)",
        }}
        aria-label="Switch to English"
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
