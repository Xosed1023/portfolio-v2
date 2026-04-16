import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#c9a96e",
        "accent-dim": "#a8834a",
        "bg-primary": "#0a0a0a",
        "bg-secondary": "#111111",
        "bg-card": "#141414",
        "text-primary": "#ffffff",
        "text-secondary": "#888888",
        "text-muted": "#444444",
      },
      fontFamily: {
        /* font-sans  → Nunito (body / descriptions) */
        sans: ["var(--font-nunito)", "sans-serif"],
        /* font-condensed → Poppins (headings / nav / labels — preserves existing class names) */
        condensed: ["var(--font-poppins)", "sans-serif"],
        /* also expose them by name */
        poppins: ["var(--font-poppins)", "sans-serif"],
        nunito: ["var(--font-nunito)", "sans-serif"],
      },
      keyframes: {
        "scroll-pulse": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.75" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-3%)" },
          "20%": { transform: "translate(3%,1%)" },
          "30%": { transform: "translate(-1%,3%)" },
          "40%": { transform: "translate(2%,-2%)" },
          "50%": { transform: "translate(-3%,1%)" },
          "60%": { transform: "translate(1%,3%)" },
          "70%": { transform: "translate(-2%,-1%)" },
          "80%": { transform: "translate(3%,2%)" },
          "90%": { transform: "translate(-1%,-3%)" },
        },
      },
      animation: {
        "scroll-pulse": "scroll-pulse 2.5s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
