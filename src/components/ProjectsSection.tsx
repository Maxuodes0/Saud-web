"use client";

import { motion } from "framer-motion";
import { Building2, Camera, Megaphone, ShieldCheck, Sparkles } from "lucide-react";
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
        icon: <Camera size={22} strokeWidth={2} />,
        linkHref: "#",
      },
      {
        id: "hilal-content",
        title: "محتوى نادي الهلال",
        description:
          "نظام سرد بصري يومي يحافظ على هوية النادي ويترجم الطاقة الجماهيرية إلى حضور رقمي متماسك.",
        imgSrc: "/hero-background.jpg",
        icon: <ShieldCheck size={22} strokeWidth={2} />,
        linkHref: "#",
      },
      {
        id: "brand-campaign",
        title: "حملة حضور للعلامة الرياضية",
        description:
          "بناء حضور تجاري وإعلامي متصل بالمشهد الرياضي عبر رسائل واضحة ومخرجات قابلة للتوسع عبر القنوات المختلفة.",
        imgSrc: "/sec23.jpg",
        icon: <Megaphone size={22} strokeWidth={2} />,
        linkHref: "#",
      },
      {
        id: "matchday-story",
        title: "سرد يوم المباراة",
        description:
          "تحويل تفاصيل المكان والجمهور والحركة إلى تجربة نشر متصلة بصريًا وتحريريًا قبل وأثناء وبعد المباراة.",
        imgSrc: "/sec21.jpg",
        icon: <Sparkles size={22} strokeWidth={2} />,
        linkHref: "#",
      },
      {
        id: "venue-activation",
        title: "تفعيل تجربة المكان",
        description:
          "تجهيز المكان بصريًا ليعمل كجزء من قيمة الحدث ويضيف بعدًا واضحًا لتجربة الحضور والتوثيق.",
        imgSrc: "/about-us-image.jpg",
        icon: <Building2 size={22} strokeWidth={2} />,
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
        icon: <Camera size={22} strokeWidth={2} />,
        linkHref: "#",
      },
      {
        id: "hilal-content",
        title: "Al Hilal Content System",
        description:
          "A daily visual publishing system that keeps the club identity sharp and the audience engaged.",
        imgSrc: "/hero-background.jpg",
        icon: <ShieldCheck size={22} strokeWidth={2} />,
        linkHref: "#",
      },
      {
        id: "brand-campaign",
        title: "Sports Brand Presence Campaign",
        description:
          "Commercial and editorial presence shaped into a campaign system that scales across channels.",
        imgSrc: "/sec23.jpg",
        icon: <Megaphone size={22} strokeWidth={2} />,
        linkHref: "#",
      },
      {
        id: "matchday-story",
        title: "Matchday Storytelling",
        description:
          "Venue, crowd, and energy turned into a cohesive publishing experience before, during, and after the game.",
        imgSrc: "/sec21.jpg",
        icon: <Sparkles size={22} strokeWidth={2} />,
        linkHref: "#",
      },
      {
        id: "venue-activation",
        title: "Venue Activation",
        description:
          "Designing the visual presence of the place itself so it adds clear value to the event experience.",
        imgSrc: "/about-us-image.jpg",
        icon: <Building2 size={22} strokeWidth={2} />,
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
