"use client";

import * as React from "react";
import Image from "next/image";
import { Building2, Camera, Megaphone, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "@/components/ui/expanding-cards.module.css";
import type { SiteLanguage } from "@/lib/site-content";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

type WorksExpandingCardsProps = {
  language: SiteLanguage;
};

const WORK_ITEMS: Record<SiteLanguage, CardItem[]> = {
  ar: [
    {
      id: "super-cup",
      title: "السوبر الإسباني في جدة",
      description: "تغطية بصرية ومخرجات سريعة صُممت للحظة الحدث، مع حضور يعكس قيمة البطولة وحجم المشهد الرياضي.",
      imgSrc: "/services-background.jpg",
      icon: <Camera size={24} strokeWidth={1.9} />,
      linkHref: "#",
    },
    {
      id: "hilal-visuals",
      title: "محتوى بصري لنادي الهلال",
      description: "صياغة مواد مرئية وهوية نشر تخاطب جمهور النادي بلغة حادة وواضحة ومناسبة للإيقاع اليومي.",
      imgSrc: "/hero-background.jpg",
      icon: <ShieldCheck size={24} strokeWidth={1.9} />,
      linkHref: "#",
    },
    {
      id: "brand-campaign",
      title: "حملة حضور للعلامة الرياضية",
      description: "ربط الحضور التجاري بالمشهد الرياضي عبر سرد بصري متماسك ورسائل واضحة قابلة للنشر والتوسع.",
      imgSrc: "/sec23.jpg",
      icon: <Megaphone size={24} strokeWidth={1.9} />,
      linkHref: "#",
    },
    {
      id: "matchday-story",
      title: "سرد يوم المباراة",
      description: "تحويل تفاصيل المكان والجمهور والحركة إلى قصة بصرية قابلة للاستهلاك الفوري عبر القنوات المختلفة.",
      imgSrc: "/sec21.jpg",
      icon: <Sparkles size={24} strokeWidth={1.9} />,
      linkHref: "#",
    },
    {
      id: "venue-activation",
      title: "تفعيل تجربة المكان",
      description: "تنسيق المشهد البصري داخل الفعالية ليظهر المكان كجزء من قيمة الحدث لا مجرد خلفية له.",
      imgSrc: "/about-us-image.jpg",
      icon: <Building2 size={24} strokeWidth={1.9} />,
      linkHref: "#",
    },
  ],
  en: [
    {
      id: "super-cup",
      title: "Spanish Super Cup",
      description: "Fast, high-value visual coverage built to match the scale of the event and the pace of live sports moments.",
      imgSrc: "/services-background.jpg",
      icon: <Camera size={24} strokeWidth={1.9} />,
      linkHref: "#",
    },
    {
      id: "hilal-visuals",
      title: "Al Hilal Visuals",
      description: "Sharp publishing assets and visual storytelling designed for a club audience that expects consistency and energy.",
      imgSrc: "/hero-background.jpg",
      icon: <ShieldCheck size={24} strokeWidth={1.9} />,
      linkHref: "#",
    },
    {
      id: "brand-campaign",
      title: "Sports Brand Campaign",
      description: "A coherent visual rollout connecting commercial presence with sports culture through clear creative direction.",
      imgSrc: "/sec23.jpg",
      icon: <Megaphone size={24} strokeWidth={1.9} />,
      linkHref: "#",
    },
    {
      id: "matchday-story",
      title: "Matchday Storytelling",
      description: "Turning venue, crowd, and atmosphere into an editorial visual system built for immediate publishing.",
      imgSrc: "/sec21.jpg",
      icon: <Sparkles size={24} strokeWidth={1.9} />,
      linkHref: "#",
    },
    {
      id: "venue-activation",
      title: "Venue Activation",
      description: "Designing the visual presence of the place itself so the environment actively adds value to the event.",
      imgSrc: "/about-us-image.jpg",
      icon: <Building2 size={24} strokeWidth={1.9} />,
      linkHref: "#",
    },
  ],
};

export const ExpandingCards = React.forwardRef<HTMLUListElement, ExpandingCardsProps>(
  ({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(defaultActiveIndex);
    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const gridStyle = React.useMemo<React.CSSProperties>(() => {
      if (activeIndex === null) {
        return {};
      }

      if (isDesktop) {
        const columns = items
          .map((_, index) => (index === activeIndex ? "4.8fr" : "1fr"))
          .join(" ");

        return {
          gridTemplateColumns: columns,
          gridTemplateRows: "1fr",
        };
      }

      const rows = items.map((_, index) => (index === activeIndex ? "4fr" : "1fr")).join(" ");

      return {
        gridTemplateColumns: "1fr",
        gridTemplateRows: rows,
      };
    }, [activeIndex, isDesktop, items]);

    const handleInteraction = (index: number) => {
      setActiveIndex(index);
    };

    return (
      <ul ref={ref} className={cn(styles.cards, className)} style={gridStyle} {...props}>
        {items.map((item, index) => (
          <li
            key={item.id}
            className={styles.card}
            onMouseEnter={() => handleInteraction(index)}
            onFocus={() => handleInteraction(index)}
            onClick={() => handleInteraction(index)}
            tabIndex={0}
            data-active={activeIndex === index}
          >
            <Image src={item.imgSrc} alt={item.title} fill sizes="(max-width: 767px) 100vw, 20vw" className={styles.image} />
            <div className={styles.overlay} />

            <article className={styles.content}>
              <h3 className={cn(styles.railTitle, /[\u0600-\u06FF]/.test(item.title) && styles.railTitleAr)}>
                {item.title}
              </h3>

              <div className={styles.iconWrap}>{item.icon}</div>
              <h3 className={cn(styles.title, /[\u0600-\u06FF]/.test(item.title) && styles.titleAr)}>
                {item.title}
              </h3>
              <p
                className={cn(
                  styles.description,
                  /[\u0600-\u06FF]/.test(item.description) && styles.descriptionAr,
                )}
              >
                {item.description}
              </p>
            </article>

            <a
              href={item.linkHref}
              className={styles.linkHitbox}
              aria-label={item.title}
              onClick={(event) => {
                if (item.linkHref === "#") {
                  event.preventDefault();
                }
              }}
            />
          </li>
        ))}
      </ul>
    );
  },
);
ExpandingCards.displayName = "ExpandingCards";

export function WorksExpandingCards({ language }: WorksExpandingCardsProps) {
  const isArabic = language === "ar";
  const items = WORK_ITEMS[language];

  return (
    <section id="work" className={styles.section}>
      <div className={styles.shell}>
        <div className={cn(styles.intro, isArabic ? styles.introRtl : styles.introLtr)}>
          <span className={cn(styles.eyebrow, isArabic && styles.eyebrowAr)}>
            {isArabic ? "الأعمال" : "Work"}
          </span>
          <h2 className={cn(styles.headline, isArabic && styles.headlineAr)}>
            {isArabic ? "مشاريع صنعت حضورًا" : "Work Built To Hold Attention"}
          </h2>
          <p className={cn(styles.lead, isArabic && styles.leadAr)}>
            {isArabic
              ? "نماذج مختارة من أعمالنا في التغطية، السرد البصري، وتفعيل العلامات داخل المشهد الرياضي."
              : "Selected examples of visual coverage, campaign storytelling, and sports brand activation."}
          </p>
        </div>

        <ExpandingCards items={items} defaultActiveIndex={0} />
      </div>
    </section>
  );
}
