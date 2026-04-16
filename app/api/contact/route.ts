import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple in-memory rate limiter: max 3 requests per IP per 15 minutes
const rateMap = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 3;

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (entry) {
    if (now < entry.reset) {
      if (entry.count >= MAX_REQUESTS) {
        return NextResponse.json(
          { error: "Demasiadas solicitudes. Intenta de nuevo en 15 minutos." },
          { status: 429 }
        );
      }
      entry.count++;
    } else {
      rateMap.set(ip, { count: 1, reset: now + WINDOW_MS });
    }
  } else {
    rateMap.set(ip, { count: 1, reset: now + WINDOW_MS });
  }

  const { nombre, email, asunto, mensaje } = await req.json();

  if (!nombre || !email || !mensaje) {
    return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_FROM}>`,
    to: process.env.SMTP_USER,
    replyTo: email,
    subject: asunto ? `[Portfolio] ${asunto}` : `[Portfolio] Nuevo mensaje de ${nombre}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border:1px solid rgba(201,169,110,0.25);border-radius:4px">
        <h2 style="color:#c9a96e;font-size:1.1rem;letter-spacing:0.2em;margin:0 0 24px">NUEVO MENSAJE · PORTFOLIO</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.45);font-size:0.78rem;letter-spacing:0.1em;width:90px">NOMBRE</td><td style="padding:8px 0;color:#fff;font-size:0.9rem">${nombre}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.45);font-size:0.78rem;letter-spacing:0.1em">EMAIL</td><td style="padding:8px 0;font-size:0.9rem"><a href="mailto:${email}" style="color:#c9a96e">${email}</a></td></tr>
          ${asunto ? `<tr><td style="padding:8px 0;color:rgba(255,255,255,0.45);font-size:0.78rem;letter-spacing:0.1em">ASUNTO</td><td style="padding:8px 0;color:#fff;font-size:0.9rem">${asunto}</td></tr>` : ""}
        </table>
        <div style="margin-top:24px;padding:20px;background:rgba(255,255,255,0.04);border-left:2px solid #c9a96e">
          <p style="margin:0;color:rgba(255,255,255,0.82);font-size:0.92rem;line-height:1.75;white-space:pre-wrap">${mensaje}</p>
        </div>
        <p style="margin-top:24px;font-size:0.65rem;color:rgba(255,255,255,0.25);letter-spacing:0.2em">ENVIADO DESDE XOSED.DEV · ${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })}</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
