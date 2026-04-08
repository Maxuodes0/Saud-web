"use client";

import { useEffect, useState } from "react";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesAnimatedSlideshow } from "@/components/ui/animated-slideshow";
import { WorksMediaSection } from "@/components/ui/work-media-section";
import styles from "@/components/hero.module.css";
import type { SiteLanguage } from "@/lib/site-content";
import { siteContent } from "@/lib/site-content";

export function HomePage() {
  const [language, setLanguage] = useState<SiteLanguage>("ar");
  const content = siteContent[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = content.direction;
  }, [content.direction, language]);

  const toggleLanguage = () => {
    setLanguage((current) => (current === "ar" ? "en" : "ar"));
  };

  return (
    <main className={styles.heroPage} dir={content.direction} data-lang={language}>
      <HeroSection language={language} onToggleLanguage={toggleLanguage} />
      <AboutSection language={language} />
      <ServicesAnimatedSlideshow language={language} />
      <ProjectsSection language={language} />
      <WorksMediaSection language={language} />
      <ContactSection language={language} />
    </main>
  );
}
