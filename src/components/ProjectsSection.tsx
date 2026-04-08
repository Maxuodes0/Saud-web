"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "@/components/projects-section.module.css";
import type { SiteLanguage } from "@/lib/site-content";

type ProjectsSectionProps = {
  language: SiteLanguage;
};

type ProjectCard = {
  title: string;
  subtitle: string;
  image: string;
};

type ProjectsContent = {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  stats: Array<{ value: string; label: string }>;
  cards: ProjectCard[];
};

const CONTENT: Record<SiteLanguage, ProjectsContent> = {
  ar: {
    eyebrow: "المشاريع",
    title: "مشاريعنا",
    body: "نماذج من أعمالنا في التغطية، السرد البصري، وصناعة الحضور داخل المشهد الرياضي. كل مشروع مصمم ليخدم لحظة الحدث ويترك أثرًا واضحًا بعده.",
    cta: "استعرض الأعمال",
    stats: [
      { value: "03", label: "أعمال مميزة" },
      { value: "360°", label: "تغطية بصرية" },
      { value: "Fast", label: "نشر سريع" },
    ],
    cards: [
      {
        title: "السوبر الإسباني",
        subtitle: "تغطية حدث",
        image: "/services-background.jpg",
      },
      {
        title: "محتوى الهلال",
        subtitle: "سرد بصري",
        image: "/hero-background.jpg",
      },
      {
        title: "تفعيل المكان",
        subtitle: "تجربة حضور",
        image: "/sec23.jpg",
      },
    ],
  },
  en: {
    eyebrow: "Projects",
    title: "Our Projects",
    body: "Selected work across coverage, visual storytelling, and sports-led presence building. Each project is designed to serve the moment and leave value after it.",
    cta: "View work",
    stats: [
      { value: "03", label: "Featured works" },
      { value: "360°", label: "Visual coverage" },
      { value: "Fast", label: "Publishing flow" },
    ],
    cards: [
      {
        title: "Spanish Super Cup",
        subtitle: "Event coverage",
        image: "/services-background.jpg",
      },
      {
        title: "Al Hilal Content",
        subtitle: "Visual storytelling",
        image: "/hero-background.jpg",
      },
      {
        title: "Venue Activation",
        subtitle: "Branded presence",
        image: "/sec23.jpg",
      },
    ],
  },
};

const transition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function ProjectsSection({ language }: ProjectsSectionProps) {
  const isArabic = language === "ar";
  const content = CONTENT[language];

  return (
    <section className={styles.section} aria-label={content.title}>
      <div className={styles.shell}>
        <div className={`${styles.stage} ${isArabic ? styles.stageAr : styles.stageEn}`}>
          <motion.div
            className={`${styles.content} ${isArabic ? styles.contentAr : styles.contentEn}`}
            initial={{ opacity: 0, x: isArabic ? 32 : -32, y: 18 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={transition}
          >
            <span className={`${styles.eyebrow} ${isArabic ? styles.eyebrowAr : ""}`}>
              {content.eyebrow}
            </span>
            <h2 className={`${styles.title} ${isArabic ? styles.titleAr : styles.titleEn}`}>
              {content.title}
            </h2>
            <p className={`${styles.body} ${isArabic ? styles.bodyAr : styles.bodyEn}`}>
              {content.body}
            </p>

            <div className={styles.stats}>
              {content.stats.map((item) => (
                <div key={item.label} className={styles.statCard}>
                  <span className={styles.statValue}>{item.value}</span>
                  <span className={`${styles.statLabel} ${isArabic ? styles.statLabelAr : ""}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <a href="#work" className={styles.cta}>
              {content.cta}
            </a>
          </motion.div>

          <motion.div
            className={styles.visuals}
            initial={{ opacity: 0, x: isArabic ? -24 : 24, y: 18 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...transition, delay: 0.08 }}
          >
            <article className={`${styles.card} ${styles.cardLarge}`}>
              <div className={styles.cardMedia}>
                <Image
                  src={content.cards[0].image}
                  alt={content.cards[0].title}
                  fill
                  sizes="(max-width: 900px) 100vw, 34vw"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardMeta}>
                <h3 className={`${styles.cardTitle} ${isArabic ? styles.cardTitleAr : ""}`}>
                  {content.cards[0].title}
                </h3>
                <p className={`${styles.cardSubtitle} ${isArabic ? styles.cardSubtitleAr : ""}`}>
                  {content.cards[0].subtitle}
                </p>
              </div>
            </article>

            <div className={styles.cardStack}>
              {content.cards.slice(1).map((card) => (
                <article key={card.title} className={styles.card}>
                  <div className={styles.cardMedia}>
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 22vw"
                      className={styles.cardImage}
                    />
                  </div>
                  <div className={styles.cardMeta}>
                    <h3 className={`${styles.cardTitle} ${isArabic ? styles.cardTitleAr : ""}`}>
                      {card.title}
                    </h3>
                    <p className={`${styles.cardSubtitle} ${isArabic ? styles.cardSubtitleAr : ""}`}>
                      {card.subtitle}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
