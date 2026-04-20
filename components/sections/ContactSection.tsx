"use client";

import { motion } from "framer-motion";
import { useState, FormEvent, ChangeEvent } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import T from "@/lib/translations";

const inputCls = [
  "w-full bg-transparent px-4 py-3",
  "font-nunito font-light text-white/85 placeholder-white/30",
  "outline-none ring-0 focus:outline-none focus:ring-0 focus:text-white transition-all duration-300",
  "border border-white/10 focus:border-accent/55",
  "focus-visible:ring-1 focus-visible:ring-accent/40",
].join(" ");

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const { lang } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });

  const set = (k: keyof typeof fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setFields({ nombre: "", email: "", asunto: "", mensaje: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  // Info cards — values don't change, only labels
  const INFO = [
    {
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      label: "Email",
      value: "xosedfabian@gmail.com",
      href: "mailto:xosedfabian@gmail.com",
    },
    {
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 13 19.79 19.79 0 0 1 1.93 4.36 2 2 0 0 1 3.9 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: lang === "en" ? "Phone" : "Teléfono",
      value: "316 578 2144",
      href: "tel:+573165782144",
    },
    {
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: lang === "en" ? "Location" : "Ubicación",
      value: "Bogotá, Colombia",
      href: "https://maps.google.com/?q=Bogotá,Colombia",
    },
    {
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
      label: lang === "en" ? "Work Mode" : "Modalidad",
      value: lang === "en" ? "Hybrid or Remote" : "Híbrido o Remoto",
      href: undefined,
    },
  ];

  const f = T.contact.fields;
  const p = T.contact.placeholders;
  const s = T.contact.submit;
  const findMeOn = lang === "en" ? "OR FIND ME ON" : "O ENCUÉNTRAME EN";

  return (
    <section
      id="contact"
      className="relative min-h-screen snap-start lg:h-screen lg:overflow-hidden lg:flex lg:items-center"
      style={{ background: "rgba(6,6,6,0.68)" }}
      aria-label="Contacto"
    >
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div className="absolute pointer-events-none"
        style={{
          bottom: "-15%", left: "25%", width: "65vw", height: "65vh",
          background: "radial-gradient(ellipse, rgba(201,169,110,0.06) 0%, transparent 60%)"
        }} />

      <div className="relative w-full max-w-[1680px] mx-auto flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 xl:gap-20 2xl:gap-28 lg:h-full lg:items-center lg:pb-14"
        style={{ paddingLeft: "clamp(1.5rem, 7vw, 112px)", paddingRight: "clamp(1.5rem, 7vw, 112px)" }}>

        {/* MOBILE */}
        <div className="lg:hidden pb-8" style={{ paddingTop: "clamp(28px, 6vh, 48px)" }}>
          <div className="flex-shrink-0 pt-5 pb-1">
            <span className="font-poppins font-semibold text-accent"
              style={{ fontSize: "0.62rem", letterSpacing: "0.45em" }}>
              {T.contact.sectionLabel[lang]}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="font-poppins font-extrabold text-white leading-[0.9] mb-4"
              style={{ fontSize: "clamp(2.2rem, 10vw, 3.2rem)", letterSpacing: "-0.02em" }}>
              <span className="text-accent">{T.contact.headingMobile[lang]}</span>
            </h2>
            <p className="font-nunito font-light leading-[1.8] mb-5"
              style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.62)", maxWidth: "340px" }}>
              {T.contact.bioMobile[lang]}
            </p>
            <div className="flex flex-col gap-2 mb-6">
              {INFO.map((item) => {
                const inner = (
                  <div className="flex items-center gap-3 border border-white/10 px-4 py-3
                                 hover:border-accent/40 group transition-colors duration-300">
                    <span className="text-accent/70 group-hover:text-accent transition-colors duration-300 flex-shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <p className="font-poppins font-medium mb-[2px]"
                        style={{ fontSize: "0.58rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>
                        {item.label.toUpperCase()}
                      </p>
                      <p className="font-poppins font-semibold"
                        style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.85)" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
                return item.href
                  ? <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="block" aria-label={item.label}>{inner}</a>
                  : <div key={item.label}>{inner}</div>;
              })}
            </div>
          </div>

          <p className="font-poppins font-semibold mb-4"
            style={{ fontSize: "0.6rem", letterSpacing: "0.45em", color: "rgba(255,255,255,0.4)" }}>
            {T.contact.sendMessage[lang]}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-[5px]">
                <span className="font-poppins font-medium" style={{ fontSize: "0.58rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>
                  {f.name[lang]} <span className="text-accent">*</span>
                </span>
                <input type="text" placeholder={p.name[lang]} required aria-required="true" value={fields.nombre} onChange={set("nombre")}
                  className={inputCls} style={{ fontSize: "0.85rem" }} />
              </label>
              <label className="flex flex-col gap-[5px]">
                <span className="font-poppins font-medium" style={{ fontSize: "0.58rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>
                  {f.email[lang]} <span className="text-accent">*</span>
                </span>
                <input type="email" placeholder={p.email[lang]} required aria-required="true" value={fields.email} onChange={set("email")}
                  className={inputCls} style={{ fontSize: "0.85rem" }} />
              </label>
            </div>
            <label className="flex flex-col gap-[5px]">
              <span className="font-poppins font-medium" style={{ fontSize: "0.58rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>
                {f.subject[lang]}
              </span>
              <input type="text" placeholder={p.subject[lang]} value={fields.asunto} onChange={set("asunto")}
                className={inputCls} style={{ fontSize: "0.85rem" }} />
            </label>
            <label className="flex flex-col gap-[5px]">
              <span className="font-poppins font-medium" style={{ fontSize: "0.58rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>
                {f.message[lang]} <span className="text-accent">*</span>
              </span>
              <textarea placeholder={p.message[lang]} required aria-required="true" rows={4} value={fields.mensaje} onChange={set("mensaje")}
                className={inputCls} style={{ fontSize: "0.85rem", resize: "none" }} />
            </label>
            <motion.button
              type="submit"
              disabled={status === "sending"}
              className="font-poppins font-semibold px-6 py-[14px] transition-colors duration-300 btn-glow flex items-center justify-center gap-3 disabled:cursor-not-allowed"
              style={{
                fontSize: "0.68rem", letterSpacing: "0.3em",
                background: status === "error" ? "rgba(180,60,60,0.85)" : status === "sent" ? "rgba(60,140,80,0.85)" : "#c9a96e",
                color: "#0a0a0a", opacity: status === "sending" ? 0.7 : 1,
              }}
              whileTap={status === "sending" ? {} : { scale: 0.97 }}
            >
              {status === "sending" && <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>{s.sending[lang]}</>}
              {status === "sent"    && <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>{s.sent[lang]}</>}
              {status === "error"   && <>{s.error[lang]}</>}
              {status === "idle"    && <>{s.idle[lang]}<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg></>}
            </motion.button>
          </form>
        </div>

        {/* DESKTOP ── LEFT: Info */}
        <div className="hidden lg:block">
          <motion.p
            className="font-poppins font-semibold text-accent mb-3"
            style={{ fontSize: "0.65rem", letterSpacing: "0.5em" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            {T.contact.sectionLabel[lang]}
          </motion.p>

          <motion.h2
            className="font-poppins font-extrabold text-white leading-[0.9] mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {T.contact.heading1[lang]}<br /><span className="text-accent">{T.contact.heading2[lang]}</span>
          </motion.h2>

          <motion.p
            className="font-nunito font-light leading-[1.85] mb-9"
            style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.65)", maxWidth: "400px" }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.18, duration: 0.7 }}
          >
            {T.contact.bioDesktop[lang]}
          </motion.p>

          <div className="flex flex-col gap-3">
            {INFO.map((item, i) => {
              const inner = (
                <div className="flex items-center gap-4 border border-white/10 px-5 py-4
                               hover:border-accent/40 group transition-colors duration-300">
                  <span className="text-accent/70 group-hover:text-accent transition-colors duration-300 flex-shrink-0">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-poppins font-medium mb-[3px]"
                      style={{ fontSize: "0.62rem", letterSpacing: "0.35em", color: "rgba(255,255,255,0.45)" }}>
                      {item.label.toUpperCase()}
                    </p>
                    <p className="font-poppins font-semibold"
                      style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.85)" }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              return (
                <motion.div key={item.label}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.09, duration: 0.5 }}
                >
                  {item.href
                    ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="block" aria-label={item.label}>{inner}</a>
                    : inner
                  }
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* DESKTOP ── RIGHT: Form */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          <p className="font-poppins font-semibold mb-6"
            style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "rgba(255,255,255,0.45)" }}>
            {T.contact.sendMessage[lang]}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-[6px]">
                <span className="font-poppins font-medium" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>
                  {f.name[lang]} <span className="text-accent">*</span>
                </span>
                <input type="text" placeholder={p.name[lang]} required aria-required="true" value={fields.nombre} onChange={set("nombre")}
                  className={inputCls} style={{ fontSize: "0.88rem" }} />
              </label>
              <label className="flex flex-col gap-[6px]">
                <span className="font-poppins font-medium" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>
                  {f.email[lang]} <span className="text-accent">*</span>
                </span>
                <input type="email" placeholder={p.email[lang]} required aria-required="true" value={fields.email} onChange={set("email")}
                  className={inputCls} style={{ fontSize: "0.88rem" }} />
              </label>
            </div>
            <label className="flex flex-col gap-[6px]">
              <span className="font-poppins font-medium" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>
                {f.subject[lang]}
              </span>
              <input type="text" placeholder={p.subject[lang]} value={fields.asunto} onChange={set("asunto")}
                className={inputCls} style={{ fontSize: "0.88rem" }} />
            </label>
            <label className="flex flex-col gap-[6px]">
              <span className="font-poppins font-medium" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>
                {f.message[lang]} <span className="text-accent">*</span>
              </span>
              <textarea placeholder={p.message[lang]} required aria-required="true" rows={5} value={fields.mensaje} onChange={set("mensaje")}
                className={inputCls} style={{ fontSize: "0.88rem", resize: "none" }} />
            </label>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              className="font-poppins font-semibold px-8 py-4 transition-colors duration-300 btn-glow flex items-center justify-center gap-3 disabled:cursor-not-allowed"
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.32em",
                background: status === "error" ? "rgba(180,60,60,0.85)" : status === "sent" ? "rgba(60,140,80,0.85)" : "#c9a96e",
                color: "#0a0a0a",
                opacity: status === "sending" ? 0.7 : 1,
              }}
              whileHover={status === "sending" ? {} : { scale: 1.02 }}
              whileTap={status === "sending" ? {} : { scale: 0.97 }}
            >
              {status === "sending" && (
                <><svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>{s.sending[lang]}</>
              )}
              {status === "sent" && (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>{s.sent[lang]}</>
              )}
              {status === "error" && <>{s.error[lang]}</>}
              {status === "idle"  && (
                <>{s.idle[lang]}<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg></>
              )}
            </motion.button>
          </form>

          <div className="flex items-center gap-3 mt-8">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
            <span className="font-poppins font-light px-3"
              style={{ fontSize: "0.6rem", letterSpacing: "0.28em", color: "rgba(255,255,255,0.50)" }}>
              {findMeOn}
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>
          <div className="flex justify-center gap-7 mt-5">
            {[
              {
                href: "https://github.com/Xosed1023", label: "GitHub",
                d: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              },
              {
                href: "https://linkedin.com/in/xosed-penaloza-5b0884178", label: "LinkedIn",
                d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              },
            ].map(({ href, label, d }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="text-white/50 hover:text-accent transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={d} />
                </svg>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* DESKTOP footer bar */}
      <div className="hidden lg:flex absolute bottom-0 left-0 right-0 items-center justify-between"
        style={{
          paddingLeft: "clamp(1.5rem, 7vw, 112px)",
          paddingRight: "clamp(1.5rem, 7vw, 112px)",
          paddingTop: "14px",
          paddingBottom: "18px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(4,4,4,0.6)",
        }}>
        <span className="font-poppins font-extrabold text-accent" style={{ fontSize: "0.95rem", letterSpacing: "-0.02em" }}>
          XP
        </span>

        <span className="font-nunito font-light" style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.22)", letterSpacing: "0.05em" }}>
          &copy; {new Date().getFullYear()} Xosed Penaloza &mdash; Bogotá, Colombia
        </span>

        <div className="flex items-center gap-1">
          {[
            {
              href: "https://github.com/Xosed1023", label: "GitHub",
              d: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z",
              fill: true
            },
            {
              href: "https://linkedin.com/in/xosed-penaloza-5b0884178", label: "LinkedIn",
              d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
              fill: true
            },
            {
              href: "mailto:xosedfabian@gmail.com", label: "Email",
              d: "", fill: false
            },
          ].map(({ href, label, d, fill }) => (
            <a key={label} href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={label}
              className="text-white/30 hover:text-accent transition-colors duration-200"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px" }}>
              {fill ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
