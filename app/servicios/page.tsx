import type { Metadata } from "next";
import ServiciosClient from "./ServiciosClient";

export const metadata: Metadata = {
  title: "Desarrollo Web Profesional — Xosed Peñaloza",
  description:
    "Diseño y desarrollo páginas web profesionales: landing pages, e-commerce, portafolios y sitios corporativos. Resultados rápidos, diseño premium, código limpio.",
  keywords: [
    "desarrollo web Colombia",
    "páginas web profesionales",
    "diseño web Bogotá",
    "landing page",
    "e-commerce Colombia",
    "freelance desarrollo web",
  ],
  openGraph: {
    title: "Desarrollo Web Profesional — Xosed Peñaloza",
    description: "Páginas web que convierten visitas en clientes.",
    type: "website",
  },
};

export default function ServiciosPage() {
  return <ServiciosClient />;
}
