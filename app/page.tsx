import { getWebProjects } from "@/lib/notion";
import AuroraBackground from "@/components/AuroraBackground";
import Sidebar from "@/components/Sidebar";
import FloatingNav from "@/components/FloatingNav";
import MobileMenu from "@/components/MobileMenu";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WorkSection from "@/components/sections/WorkSection";
import SkillsSection from "@/components/sections/SkillsSection";
import WebSection from "@/components/sections/WebSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import IntroLoader from "@/components/IntroLoader";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollController from "@/components/ScrollController";
import MobileSectionDots from "@/components/MobileSectionDots";
import Footer from "@/components/Footer";

export const revalidate = 300; // revalidate every 5 minutes

export default async function Home() {
  const webProjects = await getWebProjects();

  return (
    <>
      {/* Intro splash loader */}
      <IntroLoader />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Hash + return-from-servicios scroll controller */}
      <ScrollController />

      {/* z-0 — Aurora canvas (fixed, behind everything) */}
      <AuroraBackground />

      {/* z-9999 — Noise grain (fixed overlay) */}
      <div className="noise-texture" aria-hidden="true" />

      {/* z-40 — Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* z-50 — Mobile header */}
      <div className="lg:hidden">
        <MobileMenu />
      </div>

      {/* z-40 — Floating section nav */}
      <div className="hidden lg:block">
        <FloatingNav />
      </div>

      {/* z-30 — Mobile section dots */}
      <MobileSectionDots />

      {/* z-10 — Scroll container (above aurora) */}
      <main
        className="relative z-10 h-screen overflow-y-scroll"
        id="scroll-container"
      >
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <SkillsSection />
        <WebSection projects={webProjects} />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
