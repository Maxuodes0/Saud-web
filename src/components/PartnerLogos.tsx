"use client";

import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { cn } from "@/lib/utils";
import styles from "@/components/partner-logos.module.css";
import type { SiteLanguage } from "@/lib/site-content";

type PartnerLogosProps = {
  language: SiteLanguage;
  className?: string;
};

const CLIENT_LOGOS: Record<
  SiteLanguage,
  Array<{ id: string; description: string; image: string }>
> = {
  ar: [
    {
      id: "client-ministry",
      description: "وزارة الرياضة",
      image: "/partners/ministry-of-sport.png",
    },
    {
      id: "client-hilal",
      description: "الهلال",
      image: "/partners/alhilal-logo.png",
    },
    {
      id: "client-thmanyah",
      description: "ثمانية",
      image: "/partners/thmanyah.png",
    },
    {
      id: "client-kijamii",
      description: "كيجامي",
      image: "/partners/kijamii.png",
    },
    {
      id: "client-t",
      description: "T",
      image: "/partners/t-logo.png",
    },
    {
      id: "client-race-arabia",
      description: "ريس عربية",
      image: "/partners/race-arabia.png",
    },
    {
      id: "client-qissa",
      description: "قصة",
      image: "/partners/qissa.png",
    },
  ],
  en: [
    {
      id: "client-ministry",
      description: "Ministry of Sport",
      image: "/partners/ministry-of-sport.png",
    },
    {
      id: "client-hilal",
      description: "Al Hilal",
      image: "/partners/alhilal-logo.png",
    },
    {
      id: "client-thmanyah",
      description: "Thmanyah",
      image: "/partners/thmanyah.png",
    },
    {
      id: "client-kijamii",
      description: "Kijamii",
      image: "/partners/kijamii.png",
    },
    {
      id: "client-t",
      description: "T",
      image: "/partners/t-logo.png",
    },
    {
      id: "client-race-arabia",
      description: "Race Arabia",
      image: "/partners/race-arabia.png",
    },
    {
      id: "client-qissa",
      description: "Qissa",
      image: "/partners/qissa.png",
    },
  ],
};

export function PartnerLogos({ language, className }: PartnerLogosProps) {
  const isArabic = language === "ar";

  return (
    <section className={cn(styles.section, className)}>
      <div className={styles.headingWrap}>
        <h2 className={cn(styles.heading, isArabic && styles.headingAr)}>
          {isArabic ? "شركاؤنا في النجاح" : "Trusted by our partners"}
        </h2>
      </div>
      <LogoCloud logos={CLIENT_LOGOS[language].map((logo) => ({
        src: logo.image,
        alt: logo.description,
      }))} />
    </section>
  );
}
