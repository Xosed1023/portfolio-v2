"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import T from "@/lib/translations";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Xosed1023",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/xosed-penaloza-5b0884178",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:xosedfabian@gmail.com",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { id: "hero",     navKey: "home"     as const },
  { id: "about",    navKey: "about"    as const },
  { id: "work",     navKey: "work"     as const },
  { id: "skills",   navKey: "skills"   as const },
  { id: "web",      navKey: "web"      as const },
  { id: "projects", navKey: "projects" as const },
  { id: "contact",  navKey: "contact"  as const },
];

function scrollTo(id: string) {
  const container = document.getElementById("scroll-container");
  const target    = document.getElementById(id);
  if (container && target) {
    container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  }
}

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <footer
      className="lg:hidden relative"
      style={{
        background: "var(--sidebar-bg)",
        borderTop: "1px solid rgba(var(--rgb),0.06)",
      }}
      aria-label="Footer"
    >
      {/* Grid texture */}
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="relative flex items-center justify-between px-6 py-4" style={{ minHeight: "56px" }}>

        {/* Brand */}
        <span className="font-poppins font-extrabold text-accent" style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
          XP
        </span>

        {/* Copyright */}
        <span className="font-nunito font-light text-center"
              style={{ fontSize: "0.65rem", color: "rgba(var(--rgb),0.45)", letterSpacing: "0.04em" }}>
          &copy; {new Date().getFullYear()} Xosed Peñaloza
        </span>

        {/* Social icons */}
        <div className="flex items-center gap-1">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="hover:text-accent transition-colors duration-200 flex items-center justify-center"
              style={{ width: "38px", height: "38px", color: "rgba(var(--rgb),0.50)" }}
            >
              {s.icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
