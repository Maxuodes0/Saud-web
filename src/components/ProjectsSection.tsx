"use client";

import { motion } from "framer-motion";
import { ExpandingCards, type CardItem } from "@/components/ui/expanding-cards";
import styles from "@/components/projects-section.module.css";
import type { SiteLanguage } from "@/lib/site-content";

type ProjectsSectionProps = {
  language: SiteLanguage;
};

type ProjectsContent = {
  eyebrow: string;
  title: string;
  lead: string;
  items: CardItem[];
};

const CONTENT: Record<SiteLanguage, ProjectsContent> = {
  ar: {
    eyebrow: "مشاريعنا",
    title: "مشاريعنا",
    lead:
      "نماذج مختارة من أعمالنا في التغطية، والسرد البصري، وتفعيل العلامات داخل المشهد الرياضي. حرّك البطاقة لتكشف تفاصيل كل مشروع.",
    items: [
      {
        id: "super-cup",
        title: "كأس السوبر الإسباني 2026",
        description:
          "قدّمنا فيـلم للسوبر الإسباني المقام في جدة مستلهمين من ثقافة جدة الرحبة والمضيافة، ومن إرث إسبانيا الغني وعراقة رياضة كرة القدم فيها، ودمجناهم في عناصر سردية ومرئية لنقدم قصة واحدة متكاملة: السوبر الإسباني يمر بجدة البلد، وينتهي بملعب الإنماء",
        imgSrc: "/esspain.jpg",
        linkHref: "#",
      },
      {
        id: "venue-activation",
        title: "كأس السوبر الايطالي 2026",
        description:
          "أنتجنا فيلمين احترافيين لنصف نهائي كأس السوبر الإيطالي والنهائي بمستوى عالمي، استعرضنا فيهما لحظات الحماس وبناء التشويق عبر سرد بصري مشوّق، مع توظيف مؤثرات بصرية وسمعية متقدمة، ومزج عناصر من الثقافتين السعودية والإيطالية.",
        imgSrc: "/venue-activation.png",
        linkHref: "#",
      },
      {
        id: "hilal-content",
        title: "سباق درب العلا 2026",
        description:
          "ساهمنا في تقديم الحدث كوجهة رياضية عالمية من خلال إنتاج محتوى سينمائي يعكس هوية المكان وقوة التجربة، ويعزّز الحضور الإعلامي للسباق بأسلوب بصري ملهم وتجربة متكاملة.",
        imgSrc: "/alula-trail-race-2026.png",
        linkHref: "#",
      },
      {
        id: "brand-campaign",
        title: "كتابة محتوى تفاعلي",
        description:
          "قدّمنا محتوى متكاملًا من الفكرة إلى النشر، شمل تنفيذ الفيديوهات وكتابة التغريدات.",
        imgSrc: "/interactive-content-writing-2.png",
        linkHref: "#",
      },
    ],
  },
  en: {
    eyebrow: "Projects",
    title: "Our Projects",
    lead:
      "Selected work across event coverage, visual storytelling, and brand activation inside the sports scene. Hover a card to reveal each project.",
    items: [
      {
        id: "super-cup",
        title: "Supercopa de España 2026",
        description:
          "We delivered a film for the Spanish Super Cup in Jeddah, drawing from Jeddah's welcoming culture, Spain's rich heritage, and the long tradition of football to tell one cohesive story from Al-Balad to Alinma Stadium.",
        imgSrc: "/esspain.jpg",
        linkHref: "#",
      },
      {
        id: "venue-activation",
        title: "Supercoppa Italiana 2026",
        description:
          "We produced two world-class films for the Supercoppa Italiana semifinal and final, capturing the energy and building anticipation through cinematic visual storytelling, advanced visual and sound effects, and a blend of Saudi and Italian cultural elements.",
        imgSrc: "/venue-activation.png",
        linkHref: "#",
      },
      {
        id: "hilal-content",
        title: "AlUla Trail Race 2026",
        description:
          "We helped present the event as a global sports destination through cinematic content that reflects the identity of the place and the strength of the experience, enhancing the race's media presence with an inspiring visual style and an integrated experience.",
        imgSrc: "/alula-trail-race-2026.png",
        linkHref: "#",
      },
      {
        id: "brand-campaign",
        title: "Interactive Content Writing",
        description:
          "We delivered integrated content from concept to publishing, including video execution and tweet writing.",
        imgSrc: "/interactive-content-writing-2.png",
        linkHref: "#",
      },
    ],
  },
};

const introTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function ProjectsSection({ language }: ProjectsSectionProps) {
  const content = CONTENT[language];
  const isArabic = language === "ar";

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.shell}>
        <motion.div
          className={`${styles.intro} ${isArabic ? styles.introAr : styles.introEn}`}
          initial={{ opacity: 0, x: isArabic ? 32 : -32, y: 18 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={introTransition}
        >
          <span className={`${styles.eyebrow} ${isArabic ? styles.eyebrowAr : ""}`}>
            {content.eyebrow}
          </span>
          <h2 className={`${styles.title} ${isArabic ? styles.titleAr : styles.titleEn}`}>
            {content.title}
          </h2>
          <p className={`${styles.lead} ${isArabic ? styles.leadAr : styles.leadEn}`}>
            {content.lead}
          </p>
        </motion.div>

        <motion.div
          className={styles.cardsWrap}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{ ...introTransition, delay: 0.08 }}
        >
          <ExpandingCards items={content.items} defaultActiveIndex={0} />
        </motion.div>
      </div>
    </section>
  );
}
