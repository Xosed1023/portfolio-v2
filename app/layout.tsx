import type { Metadata } from "next";
import { Poppins, Nunito } from "next/font/google";
import "./globals.css";
import { PageTransitionProvider } from "@/components/PageTransition";
import { LanguageProvider } from "@/contexts/LanguageContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xosed.dev"),
  title: "Xosed Peñaloza — Senior Software Engineer",
  description:
    "Ingeniero de Software Senior con más de 10 años de experiencia en desarrollo full stack. Especializado en arquitecturas escalables, microservicios y soluciones empresariales.",
  keywords: [
    "Full Stack Developer",
    "Senior Software Engineer",
    "React",
    "Angular",
    "Node.js",
    "TypeScript",
    "AWS",
    "Portfolio",
    "Bogotá",
    "Colombia",
  ],
  authors: [{ name: "Xosed Fabian Peñaloza Contreras" }],
  creator: "Xosed Peñaloza",
  openGraph: {
    title: "Xosed Peñaloza — Senior Software Engineer",
    description:
      "10+ years building scalable architectures, enterprise solutions, and high-impact digital products.",
    type: "website",
    locale: "es_CO",
    images: [{ url: "/oc-image.png", width: 1200, height: 630, alt: "Xosed Peñaloza — Senior Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xosed Peñaloza — Senior Software Engineer",
    description: "10+ years building scalable architectures and enterprise solutions.",
    images: ["/oc-image.png"],
  },
  alternates: { canonical: "https://xosed.dev" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Xosed Fabian Peñaloza Contreras",
  alternateName: "Xosed Peñaloza",
  jobTitle: "Senior Software Engineer",
  description:
    "Ingeniero de Software Senior con más de 10 años de experiencia en desarrollo full stack. Especializado en arquitecturas escalables, microservicios y soluciones empresariales.",
  url: "https://xosed.dev",
  image: "https://xosed.dev/portrait.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogotá",
    addressCountry: "CO",
  },
  knowsAbout: [
    "React",
    "Angular",
    "Node.js",
    "TypeScript",
    "AWS",
    "Microservices",
    "Full Stack Development",
  ],
  sameAs: [
    "https://github.com/Xosed1023",
    "https://linkedin.com/in/xosed-penaloza-5b0884178",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} ${nunito.variable} font-sans bg-bg-primary text-text-primary antialiased`}
      >
        <LanguageProvider>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
